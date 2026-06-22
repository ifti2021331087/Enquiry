"use server";

import { db } from "@/lib/db";
import { notification, problem, reply, session, user } from "@/lib/db/schema";
import { auth } from "@/lib/utils/auth";
import { desc, eq, ne, sql, count, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";


export const getAdminAllProblemsAction = async () => {

    try {
        const result = await db.select({ value: count() }).from(problem)

        return {
            success: true,
            totalPosts: result[0].value
        }
    }
    catch (e) {
        console.log(e);
        return 0;
    }
}
export const getAllUserAction = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session?.user.id && session?.user.role === 'admin') {
        throw new Error("You must be logged in and admin to get all users");
    }

    try {

        const users = await db.select().from(user).orderBy(desc(user.createdAt))
        return users;
    }
    catch (e) {
        console.log(e);
        return []
    }
}

export const getSolveRateAction = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session?.user.id && session?.user.role === 'admin') {
        throw new Error("You must be logged in and admin to get the solved rate.");
    }
    try {
        const [
            [totalProblem],
            [solvedProblem]
        ] = await Promise.all([
            await db.select({ value: count() }).from(problem),
            await db.select({ value: count() }).from(problem)
            .innerJoin(reply, 
                and(
                    eq(reply.problemId,problem.id),
                    eq(reply.isApproved,true)
                )
            )
        ])

        const problemCount=totalProblem.value;
        const solvedCount=solvedProblem.value;

        if(problemCount==0){
            return {
                success:false,
                data:{solvedRate:0}
            }
        }

        const rate=(solvedCount/problemCount)*100;
        const formatedRate=Math.round(rate*10)/10;
        return {
            success:true,
            data:{
                solvedRate:formatedRate
            }
        }
    }
    catch(e){
        console.log(e);
        return{
            success:false,
            error:"Failed to get the solved rate."
        }
    }

}

// post-related-actions

export const getAdminProblemsAction = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session?.user.id && session?.user.role === 'admin') {
        throw new Error("You must be logged in and admin to get all problems");
    }

    try {
        const result = await db.select({
            id: problem.id,
            title: problem.title,
            author: user.name,
            replies: sql<number>`count(${reply.id})`.mapWith(Number),
            posted: problem.createdAt
        })
            .from(problem)
            .leftJoin(user, eq(problem.userId, user.id))
            .leftJoin(reply, eq(reply.problemId, problem.id))
            .groupBy(problem.id, user.id).orderBy(desc(problem.createdAt))

        return result;
    }
    catch (e) {
        console.log(e);
        return []
    }
}

export const deleteProblemByIdAction = async (problemId: string) => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session?.user.id && session?.user.role === 'admin') {
        throw new Error("You must be logged in and admin to get all problems");
    }

    try {
        await db.delete(problem).where(eq(problem.id, problemId));

        revalidatePath("/admin/post");
        revalidatePath("/");
        return {
            success: true,
        }
    }
    catch (e) {
        console.log(e);
        return {
            success: false
        }
    }
}

// user-related-actions

export const getAdminUsersAction = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session?.user.id && session?.user.role === 'admin') {
        throw new Error("You must be logged in and admin to get all the users");
    }

    try {
        const result = await db.select({
            id: user.id,
            name: user.name,
            role: user.role,
            posts: sql<number>`count(${problem.id})`.mapWith(Number),
            joined: user.createdAt,
            status: user.banned
        })
            .from(user)
            .leftJoin(problem, eq(problem.userId, user.id))
            .where(ne(user.role, 'admin'))
            .groupBy(user.id).orderBy(desc(user.createdAt))

        return result;
    }
    catch (e) {
        console.log(e);
        return []
    }

}

export const banUserByIdAction = async (targetUserId: string) => {
    const userSession = await auth.api.getSession({
        headers: await headers()
    })

    if (!userSession?.user.id && userSession?.user.role === 'admin') {
        throw new Error("You must be logged in and admin to ban a user");
    }

    try {
        await db.update(user).set({ banned: true }).where(eq(user.id, targetUserId));
        await db.delete(session).where(eq(session.userId, targetUserId));
        revalidatePath("/admin/user")
        return {
            success: true,
        }
    }
    catch (e) {
        console.log(e);
        return {
            success: false
        }
    }
}

export const unBanUserByIdAction = async (targetUserId: string) => {
    const userSession = await auth.api.getSession({
        headers: await headers()
    })

    if (!userSession?.user.id && userSession?.user.role === 'admin') {
        throw new Error("You must be logged in and admin to unban a user");
    }

    try {
        await db.update(user).set({
            banned: false,
            banReason: null,
            banExpires: null,
        }).where(eq(user.id, targetUserId));

        revalidatePath("/admin/user")
        return {
            success: true,
        }
    }
    catch (e) {
        console.log(e);
        return {
            success: false
        }
    }
}

export const deleteUserByIdAction = async (userId: string) => {
    const userSession = await auth.api.getSession({
        headers: await headers()
    })

    if (!userSession?.user.id && userSession?.user.role === 'admin') {
        throw new Error("You must be logged in and admin to delete a user");
    }

    try {
        await db.delete(user).where(eq(user.id, userId));

        revalidatePath("/admin/user");
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