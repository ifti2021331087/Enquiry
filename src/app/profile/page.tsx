import { getProfileDataAction } from "@/actions/user/userAction";
import ProfileHeader from "@/components/profile/profileHeader";
import ProfileTabs from "@/components/profile/profileTabs";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/utils/auth"
import { headers } from "next/headers"


export default async function Profile() {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  const userId = session?.user.id;
  if (!userId) {
    return (
      <div>
        User not found
      </div>
    )
  }
  const result=await getProfileDataAction(userId);
  if(!result?.data?.user){
      return (
        <div>Please log in</div>
      )
  }
  if(!result.data.problems || !result.data.replies){
      return(
        <div>There nothings to show.</div>
      )
  }
  // console.log(result);
  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-2 mt-12">
      <ProfileHeader user={result.data.user} stats={result.data.stats}></ProfileHeader>
      <Separator className="mt-5"></Separator>
      <ProfileTabs problems={result.data.problems} replies={result.data.replies}></ProfileTabs>
    </div>
  )
}
