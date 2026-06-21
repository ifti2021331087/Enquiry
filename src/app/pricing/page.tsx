import { Check, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CheckoutButton from "@/components/pricing/CheckoutButton";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950 font-sans selection:bg-blue-200 dark:selection:bg-blue-900 pb-24 mt-8">
      
      {/* Header Section */}
      <div className="max-w-3xl mx-auto pt-16 sm:pt-24 px-4 text-center mb-12 sm:mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight mb-4">
          Unlock Unlimited Potential
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Choose the plan that fits your needs. No recurring subscriptions—just simple, honest pricing.
        </p>
      </div>

      {/* Pricing Cards Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
          
          {/* FREE TIER CARD */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm transition-all animate-in fade-in slide-in-from-left-8 duration-700">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Basic Tier</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Perfect for casual learners.</p>
            </div>
            
            <div className="mb-8 flex items-baseline text-zinc-900 dark:text-zinc-50">
              <span className="text-5xl font-extrabold tracking-tight">$0</span>
              <span className="text-zinc-500 dark:text-zinc-400 ml-1 font-medium">/forever</span>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                <span><strong className="font-semibold text-zinc-900 dark:text-zinc-100">1 question</strong> per day</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Unlimited answers & replies</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Community access</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-400 dark:text-zinc-600">
                <X className="w-5 h-5 shrink-0" />
                <span>Verified Premium Badge</span>
              </li>
            </ul>

            {/* TO-DO: If user is logged in and free, say "Current Plan" */}
            <Button variant="outline" className="w-full h-12 rounded-xl border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors font-semibold" asChild>
              <Link href="/ask">Continue with Free</Link>
            </Button>
          </div>

          {/* PREMIUM LIFETIME CARD */}
          <div className="relative bg-white dark:bg-zinc-900 border-2 border-blue-500 dark:border-blue-600 rounded-3xl p-8 shadow-xl shadow-blue-500/10 md:scale-105 z-10 animate-in fade-in slide-in-from-right-8 duration-700">
            
            {/* Best Value Badge */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="bg-blue-600 text-white text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full flex items-center gap-1 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                Lifetime Access
              </span>
            </div>

            <div className="mb-6 mt-2">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Premium Pass</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">For serious developers who need answers fast.</p>
            </div>
            
            <div className="mb-8 flex items-baseline text-zinc-900 dark:text-zinc-50">
              <span className="text-5xl font-extrabold tracking-tight">$5</span>
              <span className="text-zinc-500 dark:text-zinc-400 ml-1 font-medium">one-time payment</span>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                <div className="bg-blue-100 dark:bg-blue-900/50 rounded-full p-0.5 shrink-0">
                  <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <span><strong className="font-semibold text-blue-600 dark:text-blue-400">Unlimited</strong> questions forever</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                <div className="bg-blue-100 dark:bg-blue-900/50 rounded-full p-0.5 shrink-0">
                  <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <span>Unlimited answers & replies</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                <div className="bg-blue-100 dark:bg-blue-900/50 rounded-full p-0.5 shrink-0">
                  <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <span>Priority post visibility</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                <div className="bg-blue-100 dark:bg-blue-900/50 rounded-full p-0.5 shrink-0">
                  <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <span>Exclusive <strong className="font-semibold text-zinc-900 dark:text-zinc-100">Verified Badge</strong></span>
              </li>
            </ul>

            {/* This is the interactive Stripe button we built above */}
            <CheckoutButton />
            
            <p className="text-center text-xs text-zinc-400 dark:text-zinc-500 mt-4">
              Secure, one-time payment. No hidden fees.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}