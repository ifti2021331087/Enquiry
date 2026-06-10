"use server";

import { db } from "@/lib/db"
import { notification, problem, reply, user } from "@/lib/db/schema"
import { auth } from "@/lib/utils/auth"
import { desc, eq, relations } from "drizzle-orm";
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

export const getAllProblemAction = async () => {
    try {
        return await db.select().from(problem).orderBy(desc(problem.createdAt));
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
        return await db.select().from(problem).where(eq(problem.id, problemId)).limit(1);
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

// reply-related-action

interface replyProps {
    description: string,
    isApproved: boolean,
    problemId: string,
    problemTitle: string;
    problemOwnerId:string,
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
            name: session?.user?.name|| "Anonymous",
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
            .where(eq(reply.problemId, problemId));

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

export const getNotificationByUserIdAction = async (userId: string) => {

    try {

        const result = await db.select()
            .from(notification)
            .leftJoin(problem,eq(notification.problemId,problem.id))
            .leftJoin(reply,eq(notification.replyId,reply.id))
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

