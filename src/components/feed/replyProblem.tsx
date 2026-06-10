"use client";

import { Controller, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { createReplyAction } from "@/actions/user/userAction";
import { toast } from "sonner";
import { reply } from "@/lib/db/schema";
const formSchema = z.object({
    description: z.string().min(1, "Your message should have at least 1 character")
        .max(500, "your message should have at most 500 characters.")
})

type replyProps = z.infer<typeof formSchema>;
interface problemProps{
    id: string;
    title: string;
    description: string | null;
    fileUrl: string;
    tags: string[] | null;
    userId:string
}


export default function ReplyProblem({problem}:{problem:problemProps}) {

    const form = useForm<replyProps>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: " ",
        }
    })

    async function onSubmit(data: replyProps) {
        // console.log(data);
        const replyData={
            description:data.description,
            isApproved:false,
            problemId:problem.id,
            problemTitle:problem.title,
            problemOwnerId:problem.userId
        }

        const result=await createReplyAction(replyData);
        if(result.success){
            toast.success("Thanks for your reply");
            form.reset();
        }
        else{
            console.log(result.error);
            toast.error("Something wrong while sending message")
        }

    }

    return (
        <div className="border border-blue-400 rounded-md w-full space-y-4 p-4 ">
            <form id="form-rhf-textarea" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    <Controller
                        name="description"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-textarea-about">
                                    Your reply
                                </FieldLabel>
                                <Textarea
                                    {...field}
                                    id="form-rhf-textarea-about"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="I'm a software engineer..."
                                    className="min-h-[120px]"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </FieldGroup>
            </form>
            <Button type="submit" form="form-rhf-textarea">
                Send Message
            </Button>
        </div>
    )
}
