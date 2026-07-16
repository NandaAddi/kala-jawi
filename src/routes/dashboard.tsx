import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getMockUser } from "@/lib/auth";

export const Route = createFileRoute("/dashboard")({
  component: DashboardRoot,
});

function DashboardRoot() {
  const navigate = useNavigate();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const user = getMockUser();
    if (!user || user.role !== "guru") {
      navigate({ to: "/login" });
    }
  }, [navigate]);

  if (!isClient) {
    return null;
  }

  return <Outlet />;
}
