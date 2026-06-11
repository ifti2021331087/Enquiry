"use client";

import { AskForm } from "@/components/ask/ask-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProblemGuidelines from "@/lib/extra/goodProblemText";

export default function Ask() {
  return (
    <div className="container mx-auto pt-10 pb-20 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-3">Post a Problem</h1>
      <p className="text-center text-muted-foreground mb-12">
        Describe your issue clearly — better questions get faster, more useful answers.
      </p>
      
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 items-start gap-8 lg:gap-12">
        <div className="">
          <AskForm></AskForm>
        </div>
        <div className="">
          <Card className="border-zinc-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-blue-500 text-lg font-semibold">
                Writing a good problem
              </CardTitle>
            </CardHeader>
            <CardContent className="text-blue-500/90 text-sm leading-relaxed">
              <ProblemGuidelines></ProblemGuidelines>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}