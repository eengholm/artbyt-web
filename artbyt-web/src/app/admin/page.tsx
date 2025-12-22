"use client";

import { useEffect } from "react";

export default function AdminPage() {
  useEffect(() => {
    // Redirect to the static admin page
    window.location.href = "/admin/index.html";
  }, []);

  return null;
}
