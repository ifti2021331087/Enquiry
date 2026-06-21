
import { Button } from "@/components/ui/button";
import { CheckCircle2, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950 px-4 font-sans">
      
      <div className="max-w-md w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 sm:p-10 text-center shadow-xl shadow-emerald-500/5 dark:shadow-emerald-500/10 animate-in fade-in zoom-in-95 duration-700 relative overflow-hidden">
        
        {/* Decorative Background Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Icon */}
        <div className="relative mx-auto w-20 h-20 bg-emerald-100 dark:bg-emerald-950/50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-emerald-200 dark:border-emerald-900/80">
          <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping"></div>
          <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 relative z-10" />
        </div>

        {/* Text */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight mb-3">
          Payment Successful!
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-[15px] leading-relaxed mb-8">
          Thank you for upgrading. Your account has been instantly unlocked. You now have <span className="font-semibold text-zinc-900 dark:text-zinc-200">Lifetime Premium Access</span> to ask unlimited questions.
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3 relative z-10">
          <Button
            className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 transition-all text-base font-semibold group"
            asChild
          >
            <Link href="/ask">
              <Sparkles className="w-4 h-4 mr-2" />
              Ask a Question Now
              <ArrowRight className="w-4 h-4 ml-2 opacity-70 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full h-12 rounded-xl text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
            asChild
          >
            <Link href="/">
              Return to Dashboard
            </Link>
          </Button>
        </div>

      </div>
    </div>
  );
}