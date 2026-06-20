"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { CldUploadWidget } from 'next-cloudinary'
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group"
import { Tag, TagInput } from 'emblor';
import Image from "next/image"
import { Loader2, XIcon, UploadCloud } from "lucide-react"
import { createProblemAction } from "@/actions/user/userAction"

const formSchema = z.object({
    title: z
        .string()
        .min(5, "Bug title must be at least 5 characters.")
        .max(100, "Bug title must be at most 100 characters."),
    description: z
        .string()
        .min(10, "Description must be at least 10 characters.")
        .max(500, "Description must be at most 500 characters."),
    topics: z.array(
        z.object({
            id: z.string(),
            text: z.string(),
        }),
    ),
    imageUrl: z.string().min(1, "One image is required for the problem")
})

type askFormValues = z.infer<typeof formSchema>

export function AskForm() {
    const [tags, setTags] = React.useState<Tag[]>([]);
    const [activeTagIndex, setActiveTagIndex] = React.useState<number | null>(null);
    const [SubmitLoading, setSubmitLoading] = React.useState(false);

    const form = useForm<askFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            topics: [],
            imageUrl: "",
        },
    })

    async function onSubmit(data: askFormValues) {
        const savedTags = data.topics.map((tag) => tag.text);

        const problemData = {
            title: data.title,
            description: data.description,
            fileUrl: data.imageUrl,
            tags: savedTags
        }

        try {
            setSubmitLoading(true);
            const result = await createProblemAction(problemData);

            if (result.success) {
                toast.success("Your problem was posted successfully!")
                form.reset();
                setTags([]);
            } else {
                toast.error(result.error || "Something went wrong")
            }
        } catch (e) {
            toast.error("A critical error occurred!");
        } finally {
            setSubmitLoading(false);
        }
    }

    return (
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-8">
            
            {/* Header Details */}
            <div className="flex flex-col gap-1.5">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Problem Details</h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Fill out the information below to get help from the community.</p>
            </div>

            <FieldGroup className="flex flex-col gap-6">
                
                {/* Title Field */}
                <Controller
                    name="title"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className="w-full">
                            <FieldLabel htmlFor="form-rhf-demo-title" className="text-zinc-900 dark:text-zinc-200 font-semibold mb-1">
                                Problem Title
                            </FieldLabel>
                            <Input
                                {...field}
                                id="form-rhf-demo-title"
                                aria-invalid={fieldState.invalid}
                                placeholder="e.g., Login button not working on mobile Safari"
                                autoComplete="off"
                                className="h-11 bg-zinc-50 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 focus-visible:ring-blue-500"
                                required
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} className="mt-1 text-red-500" />
                            )}
                        </Field>
                    )}
                />

                {/* Description Field */}
                <Controller
                    name="description"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className="w-full">
                            <FieldLabel htmlFor="form-rhf-demo-description" className="text-zinc-900 dark:text-zinc-200 font-semibold mb-1">
                                Detailed Description
                            </FieldLabel>
                            <InputGroup className="bg-zinc-50 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 focus-within:ring-blue-500 rounded-lg overflow-hidden border">
                                <InputGroupTextarea
                                    {...field}
                                    id="form-rhf-demo-description"
                                    placeholder="Describe what you were trying to do, what happened, and what you expected to happen..."
                                    rows={6}
                                    className="min-h-[150px] resize-y p-3 bg-transparent border-none focus:ring-0"
                                    aria-invalid={fieldState.invalid}
                                    required
                                />
                                <InputGroupAddon align="block-end" className="bg-zinc-100 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 py-2 px-3">
                                    <InputGroupText className="text-xs text-zinc-500 font-medium tabular-nums w-full text-right">
                                        {field.value.length}/500
                                    </InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} className="mt-1 text-red-500" />
                            )}
                        </Field>
                    )}
                />

                {/* Topics / Tags Field */}
                <Controller
                    name="topics"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className="w-full">
                            <FieldLabel className="text-zinc-900 dark:text-zinc-200 font-semibold mb-1">
                                Related Topics
                            </FieldLabel>
                            <div className="bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 transition-all">
                                <TagInput
                                    {...field}
                                    placeholder="Add topics (e.g. Next.js, React, Tailwind) and press Enter"
                                    tags={tags}
                                    className="w-full border-none bg-transparent"
                                    setTags={(newTags) => {
                                        setTags(newTags);
                                        // Update the RHF field correctly 
                                        field.onChange(newTags);
                                    }}
                                    activeTagIndex={activeTagIndex}
                                    setActiveTagIndex={setActiveTagIndex}
                                    // Removed the HTML5 required attribute to prevent invisible browser validation blocking
                                />
                            </div>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} className="mt-1 text-red-500" />
                            )}
                        </Field>
                    )}
                />

                {/* File Upload Field */}
                <Controller
                    name="imageUrl"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className="w-full">
                            <FieldLabel className="text-zinc-900 dark:text-zinc-200 font-semibold mb-1">
                                Attach a Screenshot
                            </FieldLabel>
                            
                            {/* Instead of unmounting the widget, we hide it with CSS to prevent crashes */}
                            <div className={field.value ? "hidden" : "block"}>
                                <CldUploadWidget
                                    signatureEndpoint="/api/sign-cloudinary-params"
                                    options={{
                                        maxFileSize: 10000000,
                                        clientAllowedFormats: ['jpg', 'png', 'gif'],
                                        folder: 'Enquiry',
                                    }}
                                    onSuccess={(result) => {
                                        if (result && typeof result.info === 'object' && result.info.secure_url) {
                                            // Safely sync value directly to the RHF controller
                                            field.onChange(result.info.secure_url);
                                        }
                                    }}
                                >
                                    {({ open }) => (
                                        <button 
                                            type="button" 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                open();
                                            }}
                                            className="w-full border-2 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-blue-500 dark:hover:border-blue-500 rounded-xl p-8 sm:p-10 flex flex-col items-center justify-center gap-3 bg-zinc-50 hover:bg-blue-50/50 dark:bg-zinc-950/50 dark:hover:bg-blue-900/10 transition-all cursor-pointer group"
                                        >
                                            <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <UploadCloud className="w-6 h-6" />
                                            </div>
                                            <div className="text-center">
                                                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Click to upload an image</p>
                                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Supports JPG, PNG and GIF (Max 10MB)</p>
                                            </div>
                                        </button>
                                    )}
                                </CldUploadWidget>
                            </div>

                            {/* Image Preview Area */}
                            {field.value && (
                                <div className="relative w-full aspect-video rounded-xl overflow-hidden border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 group">
                                    <Image
                                        src={field.value}
                                        alt="Uploaded screenshot"
                                        fill
                                        className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            className="rounded-full shadow-lg"
                                            onClick={() => field.onChange("")}
                                        >
                                            <XIcon className="h-4 w-4 mr-2" /> Remove Image
                                        </Button>
                                    </div>
                                </div>
                            )}
                            
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} className="mt-1 text-red-500" />
                            )}
                        </Field>
                    )}
                />
            </FieldGroup>

            {/* Submit Section */}
            <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex justify-end">
                <Button 
                    type="submit" 
                    disabled={SubmitLoading}
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 h-12 shadow-sm shadow-blue-600/20 transition-all active:scale-[0.98]"
                >
                    {SubmitLoading ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> 
                            Posting...
                        </>
                    ) : (
                        "Post Problem"
                    )}
                </Button>
            </div>
        </form>
    )
}