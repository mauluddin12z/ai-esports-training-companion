"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TrainingConsole } from "@/components/TrainingConsole";
import { useSession } from "@/lib/session";
import Loading from "@/components/Loading";

export default function Page() {
  const session = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session === null) {
      router.push("/onboarding");
    } else {
      setLoading(false);
    }
  }, [session, router]);

  if (loading) return <Loading />;

  if (!session) return null;

  return (
    <main>
      <TrainingConsole />
    </main>
  );
}
