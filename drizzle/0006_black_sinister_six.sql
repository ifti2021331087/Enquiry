ALTER TABLE "problem_like" DROP CONSTRAINT "problem_like_id_id_pk";--> statement-breakpoint
ALTER TABLE "reply" ALTER COLUMN "is_approved" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "problem_like" ADD CONSTRAINT "problem_like_user_id_problem_id_pk" PRIMARY KEY("user_id","problem_id");