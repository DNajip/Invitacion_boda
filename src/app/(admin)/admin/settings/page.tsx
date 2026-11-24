import { getActiveWedding } from "@/app/actions/admin";
import SettingsForm from "@/components/admin/settings-form";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const { wedding, settings } = await getActiveWedding();

  if (!wedding || !settings) {
    return (
      <div className="p-8 text-center bg-[#10243B]/60 rounded-2xl border border-[#C8A569]/30">
        <h2 className="text-lg font-serif text-white mb-2">No se encontró la configuración de la boda</h2>
        <p className="text-xs text-neutral-400">
          Por favor asegúrate de ejecutar la migración SQL inicial en Supabase.
        </p>
      </div>
    );
  }

  return <SettingsForm wedding={wedding} settings={settings} />;
}
