CREATE TABLE "problem_like" (
	"user_id" text NOT NULL,
	"problem_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "problem_like_id_id_pk" PRIMARY KEY("id","id")
);
--> statement-breakpoint
ALTER TABLE "problem_like" ADD CONSTRAINT "problem_like_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "problem_like" ADD CONSTRAINT "problem_like_problem_id_problem_id_fk" FOREIGN KEY ("problem_id") REFERENCES "public"."problem"("id") ON DELETE cascade ON UPDATE no action;