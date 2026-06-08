// <Controller
//                             name="tags"
//                             control={form.control}
//                             render={({ field, fieldState }) => {

//                                 // 1. ADD THIS SAFETY FALLBACK:
//                                 // If field.value is undefined, default to an empty array
//                                 const currentTags = field.value || [];

//                                 const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//                                     if (e.key === 'Enter' || e.key === ',') {
//                                         e.preventDefault();
//                                         const newTag = e.currentTarget.value.trim().toLowerCase();

//                                         // 2. Use currentTags instead of field.value
//                                         if (newTag && currentTags.length < 5 && !currentTags.includes(newTag)) {
//                                             field.onChange([...currentTags, newTag]);
//                                         }
//                                         e.currentTarget.value = '';
//                                     }
//                                 };

//                                 const removeTag = (tagToRemove: string) => {
//                                     // 3. Use currentTags instead of field.value
//                                     field.onChange(currentTags.filter((tag: string) => tag !== tagToRemove));
//                                 };

//                                 return (
//                                     <Field data-invalid={fieldState.invalid}>
//                                         <FieldLabel htmlFor="form-tags" className="font-semibold">
//                                             Tags
//                                         </FieldLabel>

//                                         <div
//                                             // 4. Use currentTags.length
//                                             className={`flex min-h-10 w-full flex-wrap gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ${currentTags.length >= 5 ? 'cursor-not-allowed opacity-50' : ''
//                                                 }`}
//                                         >
//                                             {/* 5. Use currentTags.map */}
//                                             {currentTags.map((tag: string) => (
//                                                 <Badge
//                                                     key={tag}
//                                                     // Remove the variant entirely to avoid conflicts
//                                                     className="flex items-center gap-1 px-2 py-0.5 font-normal rounded-md bg-secondary/60 hover:bg-secondary/80 text-foreground"
//                                                 >
//                                                     {tag}
//                                                     <button
//                                                         type="button"
//                                                         onClick={() => removeTag(tag)}
//                                                         className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
//                                                     >
//                                                         <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
//                                                     </button>
//                                                 </Badge>
//                                             ))}

//                                             <input
//                                                 id="form-tags"
//                                                 className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed min-w-[120px]"
//                                                 // 6. Use currentTags.length
//                                                 placeholder={currentTags.length >= 5 ? "" : "Add a tag..."}
//                                                 onKeyDown={handleKeyDown}
//                                                 disabled={currentTags.length >= 5}
//                                                 aria-invalid={fieldState.invalid}
//                                                 autoComplete="off"
//                                             />
//                                         </div>

//                                         <FieldDescription>
//                                             Add up to 5 tags to categorize your problem.
//                                         </FieldDescription>

//                                         {fieldState.invalid && (
//                                             <FieldError errors={[fieldState.error]} />
//                                         )}
//                                     </Field>
//                                 );
//                             }}
//                         />