export function buildEmailHtml({
  title,
  paragraphs,
  signatureDataUrl,
  companyName = "PSCode",
  companyUrl = "https://www.pscode.com.br",
  companyLinkText = "Visite nosso site",
}: {
  title: string;
  paragraphs: string[];
  signatureDataUrl?: string | null;
  companyName?: string;
  companyUrl?: string;
  companyLinkText?: string;
}) {
  const body = paragraphs
    .map(
      (p) =>
        `<p style="margin:0 0 12px 0; line-height:1.6; font-size:16px; color:#111827;">${p}</p>`
    )
    .join("");

  // Signature image row (centered)
  const signatureImgRow = signatureDataUrl
    ? `
      <tr>
        <td align="center" style="padding:8px 24px 0 24px;">
          <img src="${signatureDataUrl}"
               alt="Assinatura"
               width="320"
               style="display:block; width:320px; max-width:100%; height:auto; border:0; outline:none; text-decoration:none;" />
        </td>
      </tr>`
    : "";

  // Company info row (below the image)
  const companyInfoRow = signatureDataUrl
    ? `
      <tr>
        <td align="center" style="padding:8px 24px 16px 24px; font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;">
          <div style="font-size:12px; line-height:1.5; color:#6b7280;">
            <span>Essa solução foi desenvolvida por <strong style="color:#111827;">${companyName}</strong></span>
            &nbsp;•&nbsp;
            <a href="${companyUrl}"
               style="font-size:12px; color:#3b82f6; text-decoration:none;">${companyLinkText}</a>
          </div>
        </td>
      </tr>`
    : "";

  return `
  <!doctype html>
  <html>
  <body style="margin:0; padding:0; background:#f3f4f6;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f3f4f6; padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:600px; max-width:100%; background:#ffffff; border-radius:8px;">
            <tr>
              <td style="padding:24px 24px 8px 24px; font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;">
                <h1 style="margin:0 0 8px 0; font-size:20px; line-height:1.3; color:#111827; font-weight:700;">${title}</h1>
              </td>
            </tr>

            <tr>
              <td style="padding:0 24px 8px 24px; font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;">
                ${body}
              </td>
            </tr>

            ${signatureImgRow}
            ${companyInfoRow}

            <tr>
              <td style="padding:16px 24px 24px 24px; font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif; color:#6b7280; font-size:12px; line-height:1.5;">
                <p style="margin:0;">Este é um e-mail automático. Por favor, não responda.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>`;
}
