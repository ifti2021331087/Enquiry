import { Button } from "@/components/ui/button";
import { XCircle, ArrowLeft, RefreshCcw } from "lucide-react";
import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950 px-4 font-sans">
      
      <div className="max-w-md w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 sm:p-10 text-center shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
        
        {/* Decorative Background Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-zinc-400/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Icon */}
        <div className="mx-auto w-16 h-16 bg-zinc-100 dark:bg-zinc-800/50 rounded-full flex items-center justify-center mb-6 border border-zinc-200 dark:border-zinc-700">
          <XCircle className="w-8 h-8 text-zinc-500 dark:text-zinc-400" />
        </div>

        {/* Text */}
        <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight mb-3">
          Checkout Canceled
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-[15px] leading-relaxed mb-8">
          {`Your payment process was interrupted. Don't worry—no charges were made to your account.`}
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3 relative z-10">
          {/* TO-DO: Link this to your pricing/upgrade page if you have one */}
          <Button 
            className="w-full h-12 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 shadow-md transition-all text-base font-semibold"
            asChild
          >
            <Link href="/pricing">
              <RefreshCcw className="w-4 h-4 mr-2" />
              Try Again
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full h-12 rounded-xl border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors group"
            asChild
          >
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2 opacity-70 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </Button>
        </div>

      </div>
    </div>
  );
}