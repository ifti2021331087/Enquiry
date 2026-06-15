"use server";

import { db } from "@/lib/db"
import { notification, problem, problemLike, reply, user } from "@/lib/db/schema"
import { auth } from "@/lib/utils/auth"
import { and, arrayContains, count, desc, eq, exists, notExists, relations, sql } from "drizzle-orm";
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

type FilterParams = {
    topic?: string,
    sortBy?: "recent" | "trending",
    solved?: true | false
}

export const getAllProblemAction = async (filters: FilterParams) => {
    try {
        const query = db.select({
            id: problem.id,
            title: problem.title,
            description: problem.description,
            fileUrl: problem.fileUrl,
            tags: problem.tags,
            userId: problem.userId,
            authorName: user.name,
            createdAt: problem.createdAt,
            updatedAt: problem.updatedAt,
            likeCount: count(problemLike.userId)
        })
            .from(problem)
            // Join the user table to match the author with the problem
            .leftJoin(user, eq(problem.userId, user.id))
            .leftJoin(problemLike, eq(problemLike.problemId, problem.id))
            .groupBy(problem.id, user.id)


        const conditions = [];
        if (filters.topic) {
            const topicArray = filters.topic.split(",");
            conditions.push(arrayContains(problem.tags, topicArray));
        }
        if (filters.solved == true) {
            conditions.push(
                exists(db.select().from(reply).where(and(eq(reply.problemId, problem.id), eq(reply.isApproved, filters.solved))))
            )
        } else if (filters.solved == false) {
            conditions.push(
                notExists(db.select().from(reply).where(and(eq(reply.problemId, problem.id), eq(reply.isApproved, filters.solved))))
            )
        }
        if (conditions.length > 0) {
            query.where(and(...conditions))
        }
        if (filters.sortBy === "trending") {
            query.orderBy(desc(count(problemLike.userId)), desc(problem.createdAt));
        }
        else query.orderBy(desc(problem.createdAt));

        return await query;
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
            authorName: user.name,
            createdAt: problem.createdAt,
            updatedAt: problem.updatedAt
        })
            .from(problem)
            .leftJoin(user, eq(problem.userId, user.id))
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

export const isReplyApproved = async (replyId: string) => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session?.user) {
        return false;
    }
    try {
        const result = await db.select()
            .from(reply)
            .leftJoin(user, eq(reply.userId, user.id))
            .leftJoin(problem, eq(reply.problemId, problem.id))
            .where(eq(reply.id, replyId)).limit(1);

        return result[0].reply.isApproved;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}

export const updataReplyApproveActionById = async (replyId: string) => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user) {
        return { success: false, error: "You must be logged in." };
    }
    try {
        const result = await db.select()
            .from(reply)
            .leftJoin(user, eq(reply.userId, user.id))
            .leftJoin(problem, eq(reply.problemId, problem.id))
            .where(eq(reply.id, replyId)).limit(1);

        if (result.length === 0) {
            return { success: false, error: "Reply not found" };
        }
        const is_approved = result[0].reply.isApproved;
        const fetchedProblem = result[0].problem;

        if (fetchedProblem?.userId !== session.user.id) {
            return { success: false, error: "Only the problem author can approve replies." };
        }

        if (is_approved) {
            await db.update(reply)
                .set({
                    isApproved: false
                })
                .where(eq(reply.id, replyId))
        }
        else {
            await db.update(reply)
                .set({
                    isApproved: true
                })
                .where(eq(reply.id, replyId))
        }

        return {
            success: true
        }
    }
    catch (e) {
        console.log(e);
        return {
            success: false
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



// profile-related

export const getProfileDataAction = async (targetUserId: string) => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user) {
        return { success: false, error: "You must be logged in to view profiles." };
    }

    try {
        const profileUser = await db.query.user.findFirst({
            where: eq(user.id, targetUserId),
            columns: {
                id: true,
                name: true,
                image: true,
                role: true,
                createdAt: true,
            }
        });

        if (!profileUser) {
            return { success: false, error: "User not found." };
        }

        const [
            [problemsStat],
            [repliesStat],
            [solvedStat],
            userProblems,
            userReplies 
        ] = await Promise.all([
            db.select({ value: count() }).from(problem).where(eq(problem.userId, targetUserId)),

            db.select({ value: count() }).from(reply).where(eq(reply.userId, targetUserId)),

            db.select({ value: count() })
              .from(reply)
              .where(and(eq(reply.userId, targetUserId), eq(reply.isApproved, true))),

            db.query.problem.findMany({
                where: eq(problem.userId, targetUserId),
                orderBy: (problems, { desc }) => [desc(problems.createdAt)],

                with: {
                    replies: {
                        columns: { isApproved: true }
                    }
                }
            }),

            db.query.reply.findMany({
                where: eq(reply.userId, targetUserId),
                orderBy: (replies, { desc }) => [desc(replies.createdAt)],

                with: {
                    problem: {
                        columns: {
                            id: true,
                            title: true,
                            tags: true
                        }
                    }
                }
            })
        ]);

        return {
            success: true,
            data: {
                user: profileUser,
                stats: {
                    problemsCount: problemsStat.value,
                    repliesCount: repliesStat.value,
                    solvedCount: solvedStat.value,
                    reputation: (solvedStat.value * 15) + (repliesStat.value * 2) 
                },

                problems: userProblems.map(p => ({
                    id: p.id,
                    title: p.title,
                    description: p.description,
                    tags: p.tags,
                    createdAt: p.createdAt,
                    replyCount: p.replies.length,
                    isSolved: p.replies.some(r => r.isApproved)
                })),

                replies: userReplies.map(r => ({
                    id: r.id,
                    description: r.description,
                    isApproved: r.isApproved,
                    createdAt: r.createdAt,

                    parentProblem: r.problem ? {
                        id: r.problem.id,
                        title: r.problem.title,
                        tags: r.problem.tags
                    } : null
                }))
            }
        };

    } catch (error) {
        console.error("Profile fetch error:", error);
        return {
            success: false,
            error: "Failed to load profile data."
        };
    }
}

