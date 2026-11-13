import QRCode from "qrcode";
import { business } from "@/lib/business";

// WhatsApp QR rendered to inline SVG on the server (no client JS).
export async function WhatsAppQR({
  className = "",
  dark = "#073E2B",
  light = "#F5F4EC",
  label = "QR code that opens a WhatsApp chat with Potomac Green at 301-674-9361",
}: {
  className?: string;
  dark?: string;
  light?: string;
  label?: string;
}) {
  const svg = await QRCode.toString(business.phone.whatsapp, {
    type: "svg",
    errorCorrectionLevel: "M",
    margin: 2,
    color: { dark, light },
  });
  const inner = svg.replace(/^<svg /, `<svg role="img" aria-label="${label}" `);
  return <div className={className} dangerouslySetInnerHTML={{ __html: inner }} />;
}
