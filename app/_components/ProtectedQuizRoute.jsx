"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import Loading from "@/app/_components/Loading";

export default function ProtectedQuizRoute({ children }) {
  const router = useRouter();
  const { userData } = useUser();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      if (!userData) {
        router.replace("/");
      } else {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [userData, router]);

  if (isChecking) {
    return <Loading />;
  }

  if (!userData) {
    return null;
  }

  return <>{children}</>;
}