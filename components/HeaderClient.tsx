"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { UserButton, SignInButton, Show } from "@clerk/nextjs";
import { Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PricingModal } from "@/components/PricingModal";

export default function HeaderClient({ credits }: { credits: number | null }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex items-center gap-5">
      <Show when="signed-in">
        <Link
          href="/projects"
          className="text-[13px] font-medium text-white/40 transition-colors hover:text-white/80"
        >
          Projects
        </Link>

        {credits !== null && (
          <PricingModal>
            <span className="inline-flex h-8 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 text-xs text-white/70">
              <Zap className="h-3 w-3 fill-white/70" />
              {credits} credits
            </span>
          </PricingModal>
        )}

        {mounted && <UserButton />}
      </Show>

      <Show when="signed-out">
        <SignInButton mode="modal">
          <Button
            variant="ghost"
            size="sm"
            className="text-[13px] font-medium text-white/50 hover:text-white/90 hover:bg-transparent"
          >
            Sign in
          </Button>
        </SignInButton>

        <SignInButton mode="modal">
          <Button
            size="sm"
            className="inline-flex h-8 items-center gap-1.5 rounded-full bg-white px-4 text-[13px] font-semibold text-black hover:bg-white/90 active:scale-95"
          >
            Get Started
            <ArrowRight className="h-3 w-3 opacity-60" />
          </Button>
        </SignInButton>
      </Show>
    </div>
  );
}