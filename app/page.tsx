"use client"
import Loading from "@/components/Loading";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    router.push("/login")
  },[])
  return (
   <Loading/>
   
  );
}
