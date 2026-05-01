"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TrainingConsole } from "@/components/TrainingConsole";
import { useSession } from "@/lib/session";

export default function DashboardPage() {
  const session = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Add loading state to prevent SSR mismatch

  useEffect(() => {
    if (session === null) {
      router.push("/onboarding");
    } else {
      setLoading(false);
    }
  }, [session, router]);

  if (loading) return <div>Loading...</div>;

  if (!session) return null;

  return (
    <main>
      <TrainingConsole />
    </main>
  );
}
