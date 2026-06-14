"use server";

import { db } from "@/lib/db"
import { notification, problem, problemLike, reply, user } from "@/lib/db/schema"
import { auth } from "@/lib/utils/auth"
import { and, arrayContains, count, desc, eq, relations } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers"


interface problemProps {
    title: string,
    description: string,
    fileUrl: string,
    tags: string[]
}


// problem-creation-related

export const createProblemAction = async (data: problemProps) => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session?.user) {
        throw new Error("You must be logged in to create a problem")
    }

    try {

        await db.insert(problem).values({
            title: data.title,
            description: data.description,
            fileUrl: data.fileUrl,
            tags: data.tags,
            userId: session.user.id,
        })

        revalidatePath("/ask");

        return {
            success: true
        }
    }
    catch (e) {
        console.log(e);
        return {
            success: false,
            error: "Failed to create a problem"
        }
    }

}

export const getAllProblemAction = async (topic?: string) => {
    try {
        const query = db.select({
            id: problem.id,
            title: problem.title,
            description: problem.description,
            fileUrl: problem.fileUrl,
            tags: problem.tags,
            userId: problem.userId,
            authorName: user.name, // Grab the user's name here
            createdAt: problem.createdAt,
            updatedAt: problem.updatedAt
        })
        .from(problem)
        // Join the user table to match the author with the problem
        .leftJoin(user, eq(problem.userId, user.id)); 

        if (topic) {
            query.where(arrayContains(problem.tags, [topic]));
        }
        
        return await query.orderBy(desc(problem.createdAt));
    }
    catch (e) {
        console.log(e);
        return [];
    }
}

export const getProblemByIdAction = async (problemId: string) => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session?.user) {
        throw new Error("You must be logged in to find the problem")
    }

    try {
        return await db.select({
            id: problem.id,
            title: problem.title,
            description: problem.description,
            fileUrl: problem.fileUrl,
            tags: problem.tags,
            userId: problem.userId,
            authorName:user.name,
            createdAt: problem.createdAt,
            updatedAt: problem.updatedAt
        })
        .from(problem)
        .leftJoin(user,eq(problem.userId,user.id))
        .where(eq(problem.id, problemId)).limit(1);
    }
    catch (e) {
        console.log(e);
        return []
    }
}

export const getProblemByUserIdAction = async (userId: string) => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session?.user) {
        throw new Error("You must be logged in to view your problem")
    }
    try {
        return (await db.select().from(problem).where(eq(problem.userId, userId)).orderBy(desc(problem.createdAt)));
    }
    catch (e) {
        console.log(e);
        return [];
    }
}

export const getProblemLikeCountById = async (problemId: string) => {

    try {
        const result = await db.select({
            totalLikes: count()
        })
            .from(problemLike).where(eq(problemLike.problemId, problemId));

        return result[0].totalLikes;
    }
    catch (e) {
        console.log(e);
        return 0;
    }
}
export const getHasUserLikedProblem = async (problemId: string) => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session?.user) {
        return false;
    }
    try {
        const result = await db.select()
            .from(problemLike).where(
                and(
                    eq(problemLike.problemId, problemId),
                    eq(problemLike.userId, session.user.id)
                )
            ).limit(1);

        return result.length > 0;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}

export const toggleLikeAction = async (problemId: string) => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session?.user) {
        throw new Error("Your must be logged in to like!!")
    }
    const userId = session.user.id;

    const existingLike = await db.select().from(problemLike).where(
        and(
            eq(problemLike.userId, userId),
            eq(problemLike.problemId, problemId)
        )
    ).limit(1);

    if (existingLike.length > 0) {
        await db.delete(problemLike).where(
            and(
                eq(problemLike.userId, userId),
                eq(problemLike.problemId, problemId)
            )
        )
        return { liked: false };
    }
    else {
        await db.insert(problemLike).values(
            {
                problemId,
                userId,
            }
        )
        return { liked: true };
    }
}
// reply-related-action

interface replyProps {
    description: string,
    isApproved: boolean,
    problemId: string,
    problemTitle: string;
    problemOwnerId: string,
}

export const createReplyAction = async (data: replyProps) => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session?.user) {
        throw new Error("You must be logged in to reply");
    }

    try {

        const [newReply] = await db.insert(reply).values({
            name: session?.user?.name,
            description: data.description,
            isApproved: data.isApproved,
            userId: session.user.id,
            problemId: data.problemId,
        }).returning({ id: reply.id })

        await db.insert(notification).values({
            name: session?.user?.name || "Anonymous",
            problemTitle: data.problemTitle,
            isApproved: data.isApproved,
            userId: data.problemOwnerId,
            problemId: data.problemId,
            replyId: newReply.id,
        })

        revalidatePath(`/problem/${data.problemId}`);

        return {
            success: true
        }
    }
    catch (e) {
        console.log(e);
        return {
            success: false,
            error: "Failed to reply"
        }
    }
}

export const getRepliesByIdAction = async (problemId: string) => {

    try {
        const result = await db.select()
            .from(reply)
            .leftJoin(problem, eq(reply.problemId, problem.id))
            .leftJoin(user, eq(reply.userId, user.id))
            .where(eq(reply.problemId, problemId)).orderBy(desc(reply.createdAt));

        return result;
    }
    catch (e) {
        console.log(e);
        return {
            success: false,
            error: "Failed to get the replies"
        }
    }
}

export const getNotificationByUserIdAction = async (userId: string) => {

    try {

        const result = await db.select()
            .from(notification)
            .leftJoin(problem, eq(notification.problemId, problem.id))
            .leftJoin(reply, eq(notification.replyId, reply.id))
            .leftJoin(user, eq(reply.userId, user.id))
            .where(eq(notification.userId, userId))

        return result;

        return {
            success: true
        }
    }
    catch (e) {
        console.log(e);
        return {
            success: false,
            error: "Failed to get the replies"
        }
    }
}


// feed/home page related

