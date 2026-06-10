import { getNotificationByUserIdAction } from "@/actions/user/userAction"
import { auth } from "@/lib/utils/auth"
import { headers } from "next/headers"




export default async function Notifications() {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center border rounded-md bg-gray-50/50 mt-8">
        <h3 className="text-lg font-medium">Authentication Required</h3>
        <p className="text-muted-foreground mt-2">You must be logged in to view your notifications.</p>
      </div>
    );
  }

  const notifications = await getNotificationByUserIdAction(session.user.id)
  console.log(notifications);

  if (!Array.isArray(notifications) || notifications.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center">
        <p className="text-muted-foreground">You have no notifications yet.</p>
      </div>
    )
  }
  return (
    <div className="max-w-2xl mx-auto flex flex-col justify-center items-center">
      {
        notifications && notifications.map((notification) => (
            <div key={notification.notification.id} className="h-20 border border-blue-500">
                <div className="p-4">
                  <span className="font-medium text-center">{notification.notification.name}</span> posted an answer on your problem <span className="font-medium">{notification.notification.problemTitle}</span>
                </div>
            </div>
          ))
      }
    </div>
  )
}
