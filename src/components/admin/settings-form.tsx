"use client";

import { useState, useTransition } from "react";
import { updateWeddingConfig } from "@/app/actions/admin";
import { Wedding, WeddingSettings } from "@/types/wedding";
import { Save, Check, Loader2, Plus, Trash2, MapPin, Heart, ShieldAlert } from "lucide-react";

interface Props {
  wedding: Wedding;
  settings: WeddingSettings;
}

export default function SettingsForm({ wedding, settings }: Props) {
  const [isPending, startTransition] = useTransition();
  const [successMsg, setSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Estados del formulario
  const [groomName, setGroomName] = useState(wedding.groom_name);
  const [brideName, setBrideName] = useState(wedding.bride_name);
  const [monogram, setMonogram] = useState(wedding.monogram);
  const [weddingDate, setWeddingDate] = useState(
    wedding.wedding_date ? wedding.wedding_date.slice(0, 16) : "2026-12-19T17:00"
  );
  const [timezone, setTimezone] = useState(wedding.timezone || "America/Managua");

  // Ceremonia
  const [ceremonyTime, setCeremonyTime] = useState(settings.ceremony_time);
  const [ceremonyVenue, setCeremonyVenue] = useState(settings.ceremony_venue);
  const [ceremonyDescription, setCeremonyDescription] = useState(settings.ceremony_description);
  const [ceremonyMapsUrl, setCeremonyMapsUrl] = useState(settings.ceremony_maps_url);

  // Recepción
  const [receptionTime, setReceptionTime] = useState(settings.reception_time);
  const [receptionVenue, setReceptionVenue] = useState(settings.reception_venue);
  const [receptionDescription, setReceptionDescription] = useState(settings.reception_description);
  const [receptionMapsUrl, setReceptionMapsUrl] = useState(settings.reception_maps_url);

  // Dresscode
  const [dresscodeTitle, setDresscodeTitle] = useState(settings.dresscode_title);
  const [dresscodeSubtitle, setDresscodeSubtitle] = useState(settings.dresscode_subtitle);
  const [dresscodeDescription, setDresscodeDescription] = useState(settings.dresscode_description);
  const [restrictedColors, setRestrictedColors] = useState(settings.restricted_colors || []);

  // Detalles especiales
  const [specialAdultsTitle, setSpecialAdultsTitle] = useState(settings.special_adults_title);
  const [specialAdultsText, setSpecialAdultsText] = useState(settings.special_adults_text);
  const [specialEnvelopeTitle, setSpecialEnvelopeTitle] = useState(settings.special_envelope_title);
  const [specialEnvelopeText, setSpecialEnvelopeText] = useState(settings.special_envelope_text);

  // RSVP y WhatsApp
  const [rsvpDeadline, setRsvpDeadline] = useState(
    settings.rsvp_deadline ? settings.rsvp_deadline.slice(0, 16) : "2026-11-19T23:59"
  );
  const [allowRsvpUpdates, setAllowRsvpUpdates] = useState(settings.allow_rsvp_updates);
  const [whatsappTemplate, setWhatsappTemplate] = useState(settings.whatsapp_template);
  const [musicUrl, setMusicUrl] = useState(settings.music_url);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSuccessMsg(false);
    setErrorMsg(null);

    startTransition(async () => {
      const res = await updateWeddingConfig({
        weddingId: wedding.id,
        groom_name: groomName,
        bride_name: brideName,
        monogram,
        wedding_date: new Date(weddingDate).toISOString(),
        timezone,
        ceremony_time: ceremonyTime,
        ceremony_venue: ceremonyVenue,
        ceremony_description: ceremonyDescription,
        ceremony_maps_url: ceremonyMapsUrl,
        reception_time: receptionTime,
        reception_venue: receptionVenue,
        reception_description: receptionDescription,
        reception_maps_url: receptionMapsUrl,
        dresscode_title: dresscodeTitle,
        dresscode_subtitle: dresscodeSubtitle,
        dresscode_description: dresscodeDescription,
        restricted_colors: restrictedColors,
        special_adults_title: specialAdultsTitle,
        special_adults_text: specialAdultsText,
        special_envelope_title: specialEnvelopeTitle,
        special_envelope_text: specialEnvelopeText,
        music_url: musicUrl,
        rsvp_deadline: new Date(rsvpDeadline).toISOString(),
        allow_rsvp_updates: allowRsvpUpdates,
        whatsapp_template: whatsappTemplate,
      });

      if (res.success) {
        setSuccessMsg(true);
        setTimeout(() => setSuccessMsg(false), 3000);
      } else {
        setErrorMsg(res.error || "Ocurrió un error al guardar los ajustes.");
      }
    });
  }

  function addColor() {
    setRestrictedColors([...restrictedColors, { name: "Nuevo Color", color: "#666666" }]);
  }

  function removeColor(index: number) {
    setRestrictedColors(restrictedColors.filter((_, idx) => idx !== index));
  }

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Alertas */}
      {successMsg && (
        <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-emerald-200 text-sm flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>¡Configuración actualizada con éxito!</span>
        </div>
      )}
      {errorMsg && (
        <div className="p-3 bg-red-950/80 border border-red-500/50 rounded-xl text-red-200 text-sm flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-red-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* 1. Datos Generales de los Novios */}
      <div className="bg-[#10243B]/80 border border-[#C8A569]/20 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        <h2 className="text-sm font-semibold text-white tracking-wide flex items-center gap-2">
          <Heart className="w-4 h-4 text-[#C8A569]" />
          Información de los Novios y Fecha
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs text-neutral-300 mb-1">Nombre del Novio</label>
            <input
              type="text"
              value={groomName}
              onChange={(e) => setGroomName(e.target.value)}
              className="w-full bg-[#0A1726] border border-[#C8A569]/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C8A569]"
              required
            />
          </div>
          <div>
            <label className="block text-xs text-neutral-300 mb-1">Nombre de la Novia</label>
            <input
              type="text"
              value={brideName}
              onChange={(e) => setBrideName(e.target.value)}
              className="w-full bg-[#0A1726] border border-[#C8A569]/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C8A569]"
              required
            />
          </div>
          <div>
            <label className="block text-xs text-neutral-300 mb-1">Monograma</label>
            <input
              type="text"
              value={monogram}
              onChange={(e) => setMonogram(e.target.value)}
              className="w-full bg-[#0A1726] border border-[#C8A569]/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C8A569]"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div>
            <label className="block text-xs text-neutral-300 mb-1">Fecha y Hora del Evento</label>
            <input
              type="datetime-local"
              value={weddingDate}
              onChange={(e) => setWeddingDate(e.target.value)}
              className="w-full bg-[#0A1726] border border-[#C8A569]/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C8A569]"
              required
            />
          </div>
          <div>
            <label className="block text-xs text-neutral-300 mb-1">Zona Horaria</label>
            <input
              type="text"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full bg-[#0A1726] border border-[#C8A569]/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C8A569]"
              required
            />
          </div>
        </div>
      </div>

      {/* 2. Ceremonia Religiosa */}
      <div className="bg-[#10243B]/80 border border-[#C8A569]/20 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        <h2 className="text-sm font-semibold text-white tracking-wide flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#C8A569]" />
          Ceremonia Religiosa
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-neutral-300 mb-1">Hora Visible</label>
            <input
              type="text"
              value={ceremonyTime}
              onChange={(e) => setCeremonyTime(e.target.value)}
              className="w-full bg-[#0A1726] border border-[#C8A569]/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C8A569]"
              placeholder="5:00 p. m."
            />
          </div>
          <div>
            <label className="block text-xs text-neutral-300 mb-1">Lugar / Parroquia</label>
            <input
              type="text"
              value={ceremonyVenue}
              onChange={(e) => setCeremonyVenue(e.target.value)}
              className="w-full bg-[#0A1726] border border-[#C8A569]/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C8A569]"
              placeholder="[Nombre de la iglesia]"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs text-neutral-300 mb-1">Enlace de Google Maps</label>
          <input
            type="url"
            value={ceremonyMapsUrl}
            onChange={(e) => setCeremonyMapsUrl(e.target.value)}
            className="w-full bg-[#0A1726] border border-[#C8A569]/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C8A569]"
            placeholder="https://maps.app.goo.gl/..."
          />
        </div>
        <div>
          <label className="block text-xs text-neutral-300 mb-1">Mensaje de Ceremonia</label>
          <textarea
            rows={2}
            value={ceremonyDescription}
            onChange={(e) => setCeremonyDescription(e.target.value)}
            className="w-full bg-[#0A1726] border border-[#C8A569]/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C8A569]"
          />
        </div>
      </div>

      {/* 3. Recepción */}
      <div className="bg-[#10243B]/80 border border-[#C8A569]/20 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        <h2 className="text-sm font-semibold text-white tracking-wide flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#C8A569]" />
          Recepción
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-neutral-300 mb-1">Hora Visible</label>
            <input
              type="text"
              value={receptionTime}
              onChange={(e) => setReceptionTime(e.target.value)}
              className="w-full bg-[#0A1726] border border-[#C8A569]/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C8A569]"
              placeholder="7:00 p. m."
            />
          </div>
          <div>
            <label className="block text-xs text-neutral-300 mb-1">Lugar / Salón</label>
            <input
              type="text"
              value={receptionVenue}
              onChange={(e) => setReceptionVenue(e.target.value)}
              className="w-full bg-[#0A1726] border border-[#C8A569]/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C8A569]"
              placeholder="[Nombre del restaurante o salón]"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs text-neutral-300 mb-1">Enlace de Google Maps</label>
          <input
            type="url"
            value={receptionMapsUrl}
            onChange={(e) => setReceptionMapsUrl(e.target.value)}
            className="w-full bg-[#0A1726] border border-[#C8A569]/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C8A569]"
            placeholder="https://maps.app.goo.gl/..."
          />
        </div>
        <div>
          <label className="block text-xs text-neutral-300 mb-1">Mensaje de Recepción</label>
          <textarea
            rows={2}
            value={receptionDescription}
            onChange={(e) => setReceptionDescription(e.target.value)}
            className="w-full bg-[#0A1726] border border-[#C8A569]/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C8A569]"
          />
        </div>
      </div>

      {/* 4. Código de Vestimenta y Colores Restringidos */}
      <div className="bg-[#10243B]/80 border border-[#C8A569]/20 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        <h2 className="text-sm font-semibold text-white tracking-wide">
          Código de Vestimenta y Colores Prohibidos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-neutral-300 mb-1">Título</label>
            <input
              type="text"
              value={dresscodeTitle}
              onChange={(e) => setDresscodeTitle(e.target.value)}
              className="w-full bg-[#0A1726] border border-[#C8A569]/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C8A569]"
            />
          </div>
          <div>
            <label className="block text-xs text-neutral-300 mb-1">Subtítulo</label>
            <input
              type="text"
              value={dresscodeSubtitle}
              onChange={(e) => setDresscodeSubtitle(e.target.value)}
              className="w-full bg-[#0A1726] border border-[#C8A569]/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C8A569]"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs text-neutral-300 mb-1">Descripción</label>
          <textarea
            rows={2}
            value={dresscodeDescription}
            onChange={(e) => setDresscodeDescription(e.target.value)}
            className="w-full bg-[#0A1726] border border-[#C8A569]/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C8A569]"
          />
        </div>

        {/* Colores restringidos */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#C8A569] font-medium">
              Colores reservados (tachados en la invitación):
            </span>
            <button
              type="button"
              onClick={addColor}
              className="text-xs text-[#C8A569] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3 h-3" /> Agregar Color
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {restrictedColors.map((rc, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 bg-[#0A1726] border border-neutral-700/80 rounded-xl p-2"
              >
                <input
                  type="color"
                  value={rc.color}
                  onChange={(e) => {
                    const updated = [...restrictedColors];
                    updated[idx].color = e.target.value;
                    setRestrictedColors(updated);
                  }}
                  className="w-7 h-7 rounded border-none bg-transparent cursor-pointer shrink-0"
                />
                <input
                  type="text"
                  value={rc.name}
                  onChange={(e) => {
                    const updated = [...restrictedColors];
                    updated[idx].name = e.target.value;
                    setRestrictedColors(updated);
                  }}
                  className="w-full bg-transparent text-xs text-white focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => removeColor(idx)}
                  className="text-neutral-500 hover:text-red-400 p-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Detalles Especiales: Adultos y Lluvia de Sobres */}
      <div className="bg-[#10243B]/80 border border-[#C8A569]/20 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        <h2 className="text-sm font-semibold text-white tracking-wide">
          Apartados Especiales (Adultos & Lluvia de Sobres)
        </h2>
        <div>
          <label className="block text-xs text-neutral-300 mb-1">Título Solo Adultos</label>
          <input
            type="text"
            value={specialAdultsTitle}
            onChange={(e) => setSpecialAdultsTitle(e.target.value)}
            className="w-full bg-[#0A1726] border border-[#C8A569]/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C8A569]"
          />
        </div>
        <div>
          <label className="block text-xs text-neutral-300 mb-1">Texto Solo Adultos</label>
          <textarea
            rows={2}
            value={specialAdultsText}
            onChange={(e) => setSpecialAdultsText(e.target.value)}
            className="w-full bg-[#0A1726] border border-[#C8A569]/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C8A569]"
          />
        </div>
        <div className="pt-2 border-t border-[#C8A569]/10">
          <label className="block text-xs text-neutral-300 mb-1">Título Lluvia de Sobres</label>
          <input
            type="text"
            value={specialEnvelopeTitle}
            onChange={(e) => setSpecialEnvelopeTitle(e.target.value)}
            className="w-full bg-[#0A1726] border border-[#C8A569]/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C8A569]"
          />
        </div>
        <div>
          <label className="block text-xs text-neutral-300 mb-1">Texto Lluvia de Sobres</label>
          <textarea
            rows={2}
            value={specialEnvelopeText}
            onChange={(e) => setSpecialEnvelopeText(e.target.value)}
            className="w-full bg-[#0A1726] border border-[#C8A569]/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C8A569]"
          />
        </div>
      </div>

      {/* 6. Plantilla WhatsApp y Plazo RSVP */}
      <div className="bg-[#10243B]/80 border border-[#C8A569]/20 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        <h2 className="text-sm font-semibold text-white tracking-wide">
          Confirmación RSVP y Plantilla de WhatsApp
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-neutral-300 mb-1">Fecha Límite RSVP</label>
            <input
              type="datetime-local"
              value={rsvpDeadline}
              onChange={(e) => setRsvpDeadline(e.target.value)}
              className="w-full bg-[#0A1726] border border-[#C8A569]/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C8A569]"
            />
          </div>
          <div className="flex items-center pt-5">
            <label className="flex items-center gap-2 cursor-pointer text-sm text-neutral-300">
              <input
                type="checkbox"
                checked={allowRsvpUpdates}
                onChange={(e) => setAllowRsvpUpdates(e.target.checked)}
                className="w-4 h-4 accent-[#C8A569] cursor-pointer"
              />
              <span>Permitir modificar respuesta después de confirmar</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-xs text-neutral-300 mb-1">
            Ruta de Música Ambiental (Audio MP3)
          </label>
          <input
            type="text"
            value={musicUrl}
            onChange={(e) => setMusicUrl(e.target.value)}
            className="w-full bg-[#0A1726] border border-[#C8A569]/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C8A569]"
            placeholder="/audio/ambient-romance.mp3"
          />
        </div>

        <div>
          <label className="block text-xs text-neutral-300 mb-1">
            Plantilla de Mensaje de WhatsApp (Usa {"{destinatario}"} y {"{enlace}"})
          </label>
          <textarea
            rows={2}
            value={whatsappTemplate}
            onChange={(e) => setWhatsappTemplate(e.target.value)}
            className="w-full bg-[#0A1726] border border-[#C8A569]/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C8A569]"
          />
        </div>
      </div>

      {/* Botón flotante o fijo de guardar */}
      <div className="sticky bottom-4 z-20">
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-gradient-to-r from-[#E5C388] to-[#C8A569] hover:from-[#D4B075] hover:to-[#B89456] text-[#10243B] font-bold py-3.5 px-6 rounded-xl shadow-2xl transition flex items-center justify-center gap-2 text-sm cursor-pointer disabled:opacity-50"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Guardando Cambios...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" /> Guardar Toda la Configuración
            </>
          )}
        </button>
      </div>
    </form>
  );
}
