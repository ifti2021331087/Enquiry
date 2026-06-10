import { Spinner } from "@/components/ui/spinner";


export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex min-h-screen items-center justify-center">
        <Spinner className="size-12" />
    </div>
  )
}