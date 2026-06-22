import { Check, Sparkles, X, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CheckoutButton from "@/components/pricing/CheckoutButton";
import { auth } from "@/lib/utils/auth";
import { headers } from "next/headers";

import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";

export default async function PricingPage() {
  // 1. Get the current session
  const session = await auth.api.getSession({ headers: await headers() });
  
  let isPremium = false;
  const isLoggedIn = !!session?.user;

  // 2. If logged in, fetch their fresh premium status directly from the database
  // (We do this because the webhook updates the DB, not their browser session!)
  if (isLoggedIn && session?.user?.id) {
    const dbUser = await db.query.user.findFirst({
      where: eq(user.id, session.user.id),
      columns: { isPremium: true }
    });
    isPremium = dbUser?.isPremium || false;
  }

  return (
    <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950 font-sans selection:bg-blue-200 dark:selection:bg-blue-900 pb-24 mt-2">
      
      {/* Header Section */}
      <div className="max-w-3xl mx-auto pt-4 sm:pt-8 px-4 text-center mb-12 sm:mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm transition-all animate-in fade-in slide-in-from-left-8 duration-700 flex flex-col h-full">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Basic Tier</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Perfect for casual learners.</p>
            </div>
            
            <div className="mb-8 flex items-baseline text-zinc-900 dark:text-zinc-50">
              <span className="text-5xl font-extrabold tracking-tight">$0</span>
              <span className="text-zinc-500 dark:text-zinc-400 ml-1 font-medium">/forever</span>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
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

            {/* Dynamic Free Tier Button */}
            {isPremium ? (
              <Button variant="outline" disabled className="w-full h-12 rounded-xl border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-600 font-semibold opacity-100 cursor-not-allowed">
                Included in Premium
              </Button>
            ) : isLoggedIn ? (
              <Button variant="outline" disabled className="w-full h-12 rounded-xl border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800 font-semibold opacity-100 cursor-default">
                Current Plan
              </Button>
            ) : (
              <Button variant="outline" className="w-full h-12 rounded-xl border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors font-semibold" asChild>
                <Link href="/auth/signIn">Sign in to start</Link>
              </Button>
            )}
          </div>

          {/* PREMIUM LIFETIME CARD */}
          <div className="relative bg-white dark:bg-zinc-900 border-2 border-blue-500 dark:border-blue-600 rounded-3xl p-8 shadow-xl shadow-blue-500/10 md:scale-105 z-10 animate-in fade-in slide-in-from-right-8 duration-700 flex flex-col h-full">
            
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

            <ul className="space-y-4 mb-8 flex-1">
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

            {/* Dynamic Premium Tier Button */}
            {isPremium ? (
              <div className="mt-auto">
                <Button disabled className="w-full h-12 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 transition-all text-base font-semibold opacity-100 cursor-default">
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  You are Premium
                </Button>
                <p className="text-center text-xs text-emerald-600/70 dark:text-emerald-400/70 mt-4 font-medium">
                  Your account has lifetime access.
                </p>
              </div>
            ) : !isLoggedIn ? (
               <div className="mt-auto">
                 <Button className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 transition-all text-base font-semibold active:scale-[0.98]" asChild>
                   <Link href="/auth/signIn">Sign in to Upgrade</Link>
                 </Button>
                 <p className="text-center text-xs text-zinc-400 dark:text-zinc-500 mt-4">
                   Secure, one-time payment. No hidden fees.
                 </p>
               </div>
            ) : (
              <div className="mt-auto">
                <CheckoutButton />
                <p className="text-center text-xs text-zinc-400 dark:text-zinc-500 mt-4">
                  Secure, one-time payment. No hidden fees.
                </p>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}