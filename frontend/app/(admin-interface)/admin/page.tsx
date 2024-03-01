"use client";

import { useRouter } from "next/navigation";

const AdminHomePage = () => {
  const router = useRouter()
  // default page redirect
  router.replace("/admin/statistics");
  return (
    <></>
  );
}

export default AdminHomePage;