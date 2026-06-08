"use client";

import { AskForm } from "@/components/ask/ask-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";



export default function Ask() {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center">Post a Problem</h1>
      <p className="text-center text-muted-foreground">Describe your issue clearly — better questions get faster, more useful answers.</p>
      <div className="max-w-3/4 mx-auto grid grid-cols-1 md:grid-cols-2 justify-center items-center mt-4 gap-4">
        <div className="">
          <AskForm></AskForm>
        </div>
        <div className="">
          <Card >
            <CardHeader>
              <CardTitle className="text-blue-400 font-bold">Writing a good problem</CardTitle>
            </CardHeader>
            <CardContent className="text-blue-400">
              Include a minimal code example that
              reproduces the issue — not your entire codebase.
              Describe what you expected to happen and what actually happened instead.
              List what you have already tried. This shows effort and avoids duplicate suggestions.
              Add relevant version numbers (Next.js 14, Drizzle 0.30, etc.).
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
