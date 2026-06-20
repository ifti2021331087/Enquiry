"use client";

import { Controller, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { createReplyAction } from "@/actions/user/userAction";
import { toast } from "sonner";
import { MessageSquarePlus } from "lucide-react";

const formSchema = z.object({
    description: z.string().min(1, "Your message should have at least 1 character")
        .max(500, "Your message should have at most 500 characters.")
})

type replyProps = z.infer<typeof formSchema>;

interface problemProps{
    id: string;
    title: string;
    description: string | null;
    fileUrl: string;
    tags: string[] | null;
    userId: string;
}

export default function ReplyProblem({problem}: {problem: problemProps}) {

    const form = useForm<replyProps>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: "",
        }
    })

    async function onSubmit(data: replyProps) {
        const replyData = {
            description: data.description,
            isApproved: false,
            problemId: problem.id,
            problemTitle: problem.title,
            problemOwnerId: problem.userId
        }

        const result = await createReplyAction(replyData);
        if(result.success){
            toast.success("Thanks for your reply!");
            form.reset();
        } else {
            console.error(result.error);
            toast.error("Something went wrong while sending your message.")
        }
    }

    return (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
                <MessageSquarePlus className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">Write a Reply</h3>
            </div>
            
            <form id="form-rhf-textarea" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FieldGroup>
                    <Controller
                        name="description"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <Label htmlFor="form-rhf-textarea-about" className="sr-only">
                                    Your reply
                                </Label>
                                <Textarea
                                    {...field}
                                    id="form-rhf-textarea-about"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Share your solution or ask for clarification..."
                                    className="min-h-[120px] resize-y bg-zinc-50 dark:bg-zinc-950 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-600"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} className="mt-1 text-sm text-red-500" />
                                )}
                            </Field>
                        )}
                    />
                </FieldGroup>
                
                <div className="flex justify-end">
                    <Button type="submit" form="form-rhf-textarea" className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all rounded-full px-6">
                        Post Reply
                    </Button>
                </div>
            </form>
        </div>
    )
}