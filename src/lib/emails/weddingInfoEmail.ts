// Generates a responsive, pure-HTML email with wedding info
// Safe for major email clients (inline styles + simple layout)

type WeddingEmailOptions = {
  guestName?: string;
  novios?: string;
  primaryColor?: string; // hex color
  accentColor?: string; // hex color
  brand?: string; // From name
  civilDate?: string;
  ceremonyDate?: string;
  civilTime?: string;
  ceremonyTime?: string;
  civilPlace?: string;
  ceremonyPlace?: string;
  civilMapUrl?: string;
  ceremonyMapUrl?: string;
};

export function buildWeddingInfoEmailHTML(opts: WeddingEmailOptions = {}) {
  const {
    guestName,
    novios = "Lucas y Caro",
    primaryColor = "#e11d48", // tailwind rose-600
    accentColor = "#be123c", // tailwind rose-700
    brand = "Lucas & Caro",
    civilDate = "5/12",
    ceremonyDate = "7/12",
    civilTime = "13:00 hs",
    ceremonyTime = "16:30 hs",
    civilPlace = "Centro Cultural José Enrique Rodó",
    ceremonyPlace = "Cascada Azul, Santa Lucía, Canelones",
    civilMapUrl = "https://maps.app.goo.gl/mJwZF2Ts6qDtxhYw9",
    ceremonyMapUrl = "https://maps.app.goo.gl/rNP6nwJbik4pY6Ft5",
  } = opts;

  const greet = guestName ? `Hola ${guestName},` : "¡Hola!";

  // Email uses a single centered container, inline styles for compatibility
  // Buttons are anchor tags with table wrappers for wider support
  return `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <title>Información de la boda - ${novios}</title>
    <style>
      /* Dark mode hints (not all clients) */
      @media (prefers-color-scheme: dark) {
        .bg { background-color: #0b0f14 !important; }
        .card { background-color: #10151c !important; color: #e5e7eb !important; }
        .muted { color: #9ca3af !important; }
      }
      @media only screen and (max-width: 600px) {
        .container { width: 100% !important; padding: 0 16px !important; }
        .grid { display: block !important; }
        .grid > div { width: 100% !important; display: block !important; }
        .btn { display: block !important; width: 100% !important; }
      }
    </style>
  </head>
  <body class="bg" style="margin:0;padding:0;background-color:#f8fafc;">
    <div style="display:none;max-height:0;overflow:hidden;">
      Información de la boda ${novios}: fechas, horarios y ubicaciones.
    </div>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:#f8fafc;">
      <tr>
        <td align="center" style="padding:24px 12px;">
          <table class="container" role="presentation" cellpadding="0" cellspacing="0" width="640" style="width:640px;max-width:100%;background:#ffffff;border-radius:14px;box-shadow:0 4px 16px rgba(16,24,40,.08);">
            <tr>
              <td style="padding:28px 28px 0 28px;text-align:center;">
                <div style="display:inline-block;padding:6px 14px;border-radius:999px;background:${primaryColor}10;color:${primaryColor};font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;letter-spacing:.3px;text-transform:uppercase;">Confirmación de boda</div>
                <h1 style="margin:14px 0 0 0;font-family:Georgia, 'Times New Roman', serif;font-size:28px;line-height:1.3;color:#111827;font-weight:700;">
                  Boda ${novios}
                </h1>
                <p style="margin:8px 0 0 0;font-family:Arial,Helvetica,sans-serif;color:#374151;font-size:14px;">${greet} aquí tienes toda la información importante.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 28px 6px 28px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="card" style="border:1px solid #f1f5f9;border-radius:12px;background:#ffffff;">
                  <tr>
                    <td style="padding:20px 20px 8px 20px;">
                      <h2 style="margin:0 0 12px 0;font-family:Georgia, 'Times New Roman', serif;color:#111827;font-size:20px;line-height:1.4;">Detalles del evento</h2>
                      <div class="grid" style="display:flex;gap:16px;flex-wrap:wrap;">
                        <div style="flex:1 1 280px;min-width:260px;border:1px solid #f1f5f9;border-radius:10px;padding:14px;">
                          <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:600;color:${primaryColor};letter-spacing:.2px;text-transform:uppercase;">Civil</div>
                          <div style="margin-top:6px;font-family:Georgia, 'Times New Roman', serif;font-size:18px;color:#111827;font-weight:700;">${civilPlace}</div>
                          <div style="margin-top:6px;font-family:Arial,Helvetica,sans-serif;color:#374151;font-size:14px;">Fecha: <strong>${civilDate}</strong></div>
                          <div style="margin-top:2px;font-family:Arial,Helvetica,sans-serif;color:#374151;font-size:14px;">Hora: <strong>${civilTime}</strong></div>
                          <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:12px;">
                            <tr>
                              <td bgcolor="${primaryColor}" style="border-radius:8px;">
                                <a class="btn" href="${civilMapUrl}" target="_blank" style="display:inline-block;padding:10px 14px;color:#ffffff;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:600;border-radius:8px;">Ver ubicación</a>
                              </td>
                            </tr>
                          </table>
                        </div>
                        <div style="flex:1 1 280px;min-width:260px;border:1px solid #f1f5f9;border-radius:10px;padding:14px;">
                          <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:600;color:${primaryColor};letter-spacing:.2px;text-transform:uppercase;">Ceremonia</div>
                          <div style="margin-top:6px;font-family:Georgia, 'Times New Roman', serif;font-size:18px;color:#111827;font-weight:700;">${ceremonyPlace}</div>
                          <div style="margin-top:6px;font-family:Arial,Helvetica,sans-serif;color:#374151;font-size:14px;">Fecha: <strong>${ceremonyDate}</strong></div>
                          <div style="margin-top:2px;font-family:Arial,Helvetica,sans-serif;color:#374151;font-size:14px;">Hora: <strong>${ceremonyTime}</strong></div>
                          <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:12px;">
                            <tr>
                              <td bgcolor="${primaryColor}" style="border-radius:8px;">
                                <a class="btn" href="${ceremonyMapUrl}" target="_blank" style="display:inline-block;padding:10px 14px;color:#ffffff;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:600;border-radius:8px;">Ver ubicación</a>
                              </td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:0 28px 12px 28px;">
                <p class="muted" style="margin:16px 0 0 0;font-family:Arial,Helvetica,sans-serif;color:#6b7280;font-size:12px;line-height:1.6;">
                  Si necesitas actualizar tu confirmación o tienes alguna consulta,
                  responde a este correo. ¡Gracias por acompañarnos!
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 28px 28px 28px;text-align:center;">
                <div style="display:inline-block;padding:10px 14px;border-radius:999px;background:${primaryColor}10;color:${accentColor};font-family:Georgia, 'Times New Roman', serif;font-size:14px;font-weight:700;">
                  ${brand}
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>`;
}

