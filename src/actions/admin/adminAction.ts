"use server";

import { db } from "@/lib/db";
import { problem, reply, user } from "@/lib/db/schema";
import { auth } from "@/lib/utils/auth";
import { desc, eq, sql } from "drizzle-orm";
import { headers } from "next/headers";


export const getAllUserAction=async()=>{
    const session=await auth.api.getSession({
        headers:await headers()
    })

    if(!session?.user.id){
        throw new Error("You must be logged in to get all users");
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

    if(!session?.user.id){
        throw new Error("You must be logged in to get all problems");
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
        .groupBy(problem.id,user.id)

        return result;
    }
    catch(e){
        console.log(e);
        return []
    }
}