CREATE TABLE "notification" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"problem_title" text NOT NULL,
	"is_approved" boolean,
	"user_id" text,
	"problem_id" uuid,
	"reply_id" uuid
);
--> statement-breakpoint
ALTER TABLE "problem" RENAME COLUMN "text" TO "title";--> statement-breakpoint
ALTER TABLE "notification" ADD CONSTRAINT "notification_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notification" ADD CONSTRAINT "notification_problem_id_problem_id_fk" FOREIGN KEY ("problem_id") REFERENCES "public"."problem"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notification" ADD CONSTRAINT "notification_reply_id_reply_id_fk" FOREIGN KEY ("reply_id") REFERENCES "public"."reply"("id") ON DELETE cascade ON UPDATE no action;