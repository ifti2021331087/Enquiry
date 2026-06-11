"use server";

import { db } from "@/lib/db";
import { problem, reply, user } from "@/lib/db/schema";
import { auth } from "@/lib/utils/auth";
import { desc, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";


export const getAllUserAction=async()=>{
    const session=await auth.api.getSession({
        headers:await headers()
    })

    if(!session?.user.id && session?.user.role==='admin'){
        throw new Error("You must be logged in and admin to get all users");
    }

    try{

        const users=await db.select().from(user).orderBy(desc(user.createdAt))
        return users;
    }
    catch(e){
        console.log(e);
        return []
    }
}

export const getAdminProblemsAction=async()=>{
    const session=await auth.api.getSession({
        headers:await headers()
    })

    if(!session?.user.id && session?.user.role==='admin'){
        throw new Error("You must be logged in and admin to get all problems");
    }

    try{
        const result=await db.select({
            id:problem.id,
            title:problem.title,
            author:user.name,
            replies:sql<number>`count(${reply.id})`.mapWith(Number),
            posted:problem.createdAt
        })   
        .from(problem)
        .leftJoin(user,eq(problem.userId,user.id))
        .leftJoin(reply,eq(reply.problemId,problem.id))
        .groupBy(problem.id,user.id).orderBy(desc(problem.createdAt))

        return result;
    }
    catch(e){
        console.log(e);
        return []
    }
}

export const deleteProblemByIdAction=async(problemId:string)=>{
    const session=await auth.api.getSession({
        headers:await headers()
    })

    if(!session?.user.id && session?.user.role==='admin'){
        throw new Error("You must be logged in and admin to get all problems");
    }

    try{
        await db.delete(problem).where(eq(problem.id,problemId));

        revalidatePath("/admin/post");
        revalidatePath("/");
        return{
            success:true,
        }
    }
    catch(e){
        console.log(e);
        return {
            success: false
        }
    }
}

export const getAdminUsersAction=async()=>{
    const session=await auth.api.getSession({
        headers:await headers()
    })

    if(!session?.user.id && session?.user.role==='admin'){
        throw new Error("You must be logged in and admin to get all the users");
    }

    try{
        const result=await db.select({
            id:user.id,
            name:user.name,
            role:user.role,
            posts:sql<number>`count(${problem.id})`.mapWith(Number),
            joined:user.createdAt,
            status:user.banned
        })   
        .from(user)
        .leftJoin(problem,eq(problem.userId,user.id))
        .groupBy(user.id).orderBy(desc(user.createdAt))

        return result;
    }
    catch(e){
        console.log(e);
        return []
    }

}