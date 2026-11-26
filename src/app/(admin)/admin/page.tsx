import { getDashboardStats, getInvitations, getActiveWedding } from "@/app/actions/admin";
import InvitationDashboard from "@/components/admin/invitation-dashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [stats, invitations, { settings }] = await Promise.all([
    getDashboardStats(),
    getInvitations(),
    getActiveWedding(),
  ]);

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://invitacion-boda-bice.vercel.app");

  return (
    <InvitationDashboard
      initialStats={stats}
      initialInvitations={invitations}
      settings={settings}
      siteUrl={siteUrl}
    />
  );
}
