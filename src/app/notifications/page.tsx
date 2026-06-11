import { getNotificationByUserIdAction } from "@/actions/user/userAction"
import { Label } from "@/components/ui/label";
import { auth } from "@/lib/utils/auth"
import { headers } from "next/headers"

export default async function Notifications() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/20 mt-12 max-w-2xl mx-auto">
        <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Authentication Required</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">You must be logged in to view your notifications.</p>
      </div>
    );
  }

  const notifications = await getNotificationByUserIdAction(session.user.id)
  console.log(notifications);

  if (!Array.isArray(notifications) || notifications.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center py-20 px-4 mt-8">
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900/50 py-3 px-6 rounded-full border border-zinc-200 dark:border-zinc-800">
          You have no notifications yet.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col w-full py-8 px-4">
      <div className="space-y-2 text-lg font-medium italic">
          <span>Notifications</span>
      </div>
      <div>
        {
          notifications && notifications.map((notification) => (
            <div
              key={notification.notification.id}
              className="py-5 border-b border-zinc-100 dark:border-zinc-800 transition-colors hover:bg-zinc-50/80 dark:hover:bg-white/[0.02] first:border-t"
            >
              <div className="px-4 text-[15px] sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {notification.notification.name}
                </span>
                {' '}posted an answer on your problem{' '}
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {notification.notification.problemTitle}
                </span>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}