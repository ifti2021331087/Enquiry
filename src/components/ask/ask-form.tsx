"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { v4 as uuid } from 'uuid'
import { Button } from "@/components/ui/button"
import { CldUploadWidget } from 'next-cloudinary'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
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
import { Loader2, XIcon } from "lucide-react"
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
// const defaultTags: Tag[] = [];

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
        // console.log(data);
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
                toast.success("Your problem created successfully")
                form.reset();
                setTags([]);
            }
            else {
                toast.error(result.error || "Something went wrong")
            }

        }
        catch (e) {
            toast.error("A critical error occurred!");
        }
        finally {
            setSubmitLoading(false);
        }
    }
    const uploadedImage = form.watch("imageUrl");

    return (
        <Card className="w-full sm:max-w-md">
            <CardContent>
                <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="title"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-title">
                                        Title
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-rhf-demo-title"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Login button not working on mobile"
                                        autoComplete="off"
                                        required
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="description"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-description">
                                        Description
                                    </FieldLabel>
                                    <InputGroup>
                                        <InputGroupTextarea
                                            {...field}
                                            id="form-rhf-demo-description"
                                            placeholder="I'm having an issue with the login button on mobile."
                                            rows={6}
                                            className="min-h-24 resize-none"
                                            aria-invalid={fieldState.invalid}
                                            required
                                        />
                                        <InputGroupAddon align="block-end">
                                            <InputGroupText className="tabular-nums">
                                                {field.value.length}/500 characters
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="imageUrl"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>
                                        Upload a file
                                    </FieldLabel>
                                    {
                                        uploadedImage ? (
                                            (
                                                <div className="relative w-full h-48 rounded-md overflow-hidden border">
                                                    <Image
                                                        src={uploadedImage}
                                                        alt="Uploaded screenshot"
                                                        fill
                                                        className="object-cover"
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        size="icon"
                                                        className="absolute top-2 right-2 h-8 w-8 rounded-full"
                                                        onClick={() => form.setValue("imageUrl", "", { shouldValidate: true })}
                                                    >
                                                        <XIcon className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            )
                                        ) :
                                            (
                                                <div className="bg-blue-100 text-center rounded-2xl h-6">
                                                    <CldUploadWidget
                                                        signatureEndpoint="/api/sign-cloudinary-params"

                                                        options={
                                                            {
                                                                maxFileSize: 10000000,
                                                                clientAllowedFormats: ['jpg', 'png', 'gif'],
                                                                folder: 'Enquiry',
                                                                styles: {
                                                                    palette: {
                                                                        window: '#FFFFFF',
                                                                        windowBorder: '#90A0B3',
                                                                        tabIcon: '#0078FF',
                                                                        menuIcons: '#5A616A',
                                                                        textDark: '#000000',
                                                                        textLight: '#FFFFFF',
                                                                        link: '#0078FF',
                                                                        action: '#FF620C',
                                                                        inactiveTabIcon: '#0E2F5A',
                                                                        error: '#F44235',
                                                                        inProgress: '#0078FF',
                                                                        complete: '#20B832',
                                                                        sourceBg: '#E4EBF1'
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        onSuccess={(result, { widget }) => {
                                                            if (result && typeof result.info === 'object' && result.info.secure_url) {
                                                                const secureUrl = result.info.secure_url;
                                                                form.setValue("imageUrl", secureUrl, { shouldValidate: true });
                                                                console.log('Upload successful! URL:', secureUrl);
                                                            }
                                                            console.log('Upload successful:', result?.info);
                                                        }}
                                                        onQueuesEnd={(result, { widget }) => {
                                                            console.log('All uploads complete');
                                                            widget.close();
                                                        }}
                                                        onError={(error, { widget }) => {
                                                            console.error('Upload error:', error);
                                                        }}
                                                    >
                                                        {({ open }) => {
                                                            return (
                                                                <button onClick={() => open()}>
                                                                    Upload Files
                                                                </button>
                                                            );
                                                        }}
                                                    </CldUploadWidget>
                                                </div>

                                            )}
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="topics"
                            control={form.control}
                            render={({ field }) => (
                                <TagInput
                                    {...field}
                                    placeholder="Enter a topic"
                                    tags={tags}
                                    className="max-w-[250px]"
                                    setTags={(newTags) => {
                                        setTags(newTags);
                                        form.setValue('topics', newTags as [Tag, ...Tag[]]);
                                    }}
                                    activeTagIndex={activeTagIndex}
                                    setActiveTagIndex={setActiveTagIndex}
                                    required
                                />
                            )}
                        />
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter>
                <Field orientation="horizontal">
                    {
                        SubmitLoading ? (
                            <div>
                                <Loader2></Loader2> Submitting...
                            </div>
                        ) : (

                            <Button type="submit" form="form-rhf-demo">
                                Submit
                            </Button>
                        )
                    }
                </Field>
            </CardFooter>
        </Card>
    )
}
