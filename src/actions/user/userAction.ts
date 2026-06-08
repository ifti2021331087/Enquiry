"use server";

import { db } from "@/lib/db"
import { problem } from "@/lib/db/schema"
import { auth } from "@/lib/utils/auth"
import { headers } from "next/headers"


interface problemProps{
    title:string,
    description:string,
    fileUrl:string,
    tags:string[]
}

export const createProblemAction=async(data:problemProps)=>{
    const session=await auth.api.getSession({
        headers:await headers()
    })

    if(!session?.user){
        throw new Error("You must be logged in to create a problem")
    }

    try{

        await db.insert(problem).values({
            title:data.title,
            description:data.description,
            fileUrl:data.fileUrl,
            tags:data.tags,
            userId:session.user.id,
        })

        return{
            success:true
        }
    }
    catch(e){
        console.log(e);
        return{
            success:false,
            error:"Failed to create a problem"
        }
    }

}