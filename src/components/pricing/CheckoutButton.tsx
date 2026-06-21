"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Zap } from "lucide-react";
import { toast } from "sonner";

export default function CheckoutButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      
      // Call the Stripe API route we built in Phase 3
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.url) {
        // Redirect to Stripe's secure checkout page
        window.location.href = data.url;
      } else {
        toast.error("Failed to initialize checkout. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleCheckout} 
      disabled={isLoading}
      className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 transition-all text-base font-semibold active:scale-[0.98]"
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <>
          <Zap className="w-4 h-4 mr-2 fill-current" />
          Get Lifetime Premium
        </>
      )}
    </Button>
  );
}