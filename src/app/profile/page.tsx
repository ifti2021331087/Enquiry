import { getProfileDataAction } from "@/actions/user/userAction";
import ProfileHeader from "@/components/profile/profileHeader";
import ProfileTabs from "@/components/profile/profileTabs";
import { auth } from "@/lib/utils/auth"
import { headers } from "next/headers"

export default async function Profile() {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  
  const userId = session?.user.id;
  
  if (!userId) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-zinc-500 dark:text-zinc-400">
        User not found
      </div>
    )
  }

  const result = await getProfileDataAction(userId);
  
  if(!result?.data?.user){
      return (
        <div className="flex items-center justify-center min-h-[50vh] text-zinc-500 dark:text-zinc-400">
          Please log in to view this profile.
        </div>
      )
  }

  if(!result.data.problems || !result.data.replies){
      return(
        <div className="flex items-center justify-center min-h-[50vh] text-zinc-500 dark:text-zinc-400">
          There is nothing to show here yet.
        </div>
      )
  }

  return (
    <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950/50 pb-16">
      <div className="max-w-4xl mx-auto flex flex-col gap-8 pt-8 md:pt-12 px-4 sm:px-6 lg:px-8">
        <ProfileHeader user={result.data.user} stats={result.data.stats} />
        <ProfileTabs problems={result.data.problems} replies={result.data.replies} />
      </div>
    </div>
  )
}