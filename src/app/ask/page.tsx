"use client";

import { AskForm } from "@/components/ask/ask-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProblemGuidelines from "@/lib/extra/goodProblemText";
import { Lightbulb } from "lucide-react"; // Added a nice icon for visual flair

export default function Ask() {
  return (
    <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950/50 font-sans">
      <div className="max-w-7xl mx-auto pt-10 sm:pt-16 md:pt-20 pb-24 px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center max-w-xl mx-auto text-center mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight mb-4">
            Post a Problem
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400">
            Describe your issue clearly — better questions get faster, more useful answers.
          </p>
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start relative">
          
          {/* Left Column: Form Wrapper */}
          <div className="lg:col-span-7 xl:col-span-8 w-full">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 sm:p-8 shadow-sm">
              <AskForm />
            </div>
          </div>

          {/* Right Column: Sticky Guidelines Sidebar */}
          <div className="lg:col-span-5 xl:col-span-4 w-full lg:sticky lg:top-24">
            <Card className="bg-blue-50/40 dark:bg-blue-950/10 border-blue-100 dark:border-blue-900/30 shadow-sm overflow-hidden rounded-2xl">
              <CardHeader className="bg-blue-100/50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-900/30 pb-4">
                <CardTitle className="text-blue-700 dark:text-blue-400 text-lg font-bold flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 fill-blue-500/20" />
                  Writing a good problem
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ProblemGuidelines />
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  )
}