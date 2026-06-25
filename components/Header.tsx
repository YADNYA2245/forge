import Link from "next/link";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";  // or however you access DB directly
import HeaderClient from "@/components/HeaderClient";

export default async function Header() {
  const { userId } = await auth();
  
  let credits = null;
  if (userId) {
    const user = await db.user.findUnique({
      where: { clerkId: userId },
      select: { credits: true }
    });
    credits = user?.credits ?? null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/6 bg-white/7 backdrop-blur-md">
      <nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 select-none">
          <Image
            src="/logo.png"
            alt="Forge"
            width={100}
            height={100}
            className="h-9 w-auto rounded-md"
            loading="eager"
          />
        </Link>

        <HeaderClient credits={credits} />
      </nav>
    </header>
  );
}