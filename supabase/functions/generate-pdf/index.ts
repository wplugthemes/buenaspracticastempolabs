import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import * as puppeteer from "https://deno.land/x/puppeteer@16.2.0/mod.ts";

serve(async (req) => {
  try {
    const { requirements } = await req.json();

    // Generate HTML content
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; }
            .requirement { margin: 20px 0; padding: 10px; border: 1px solid #ccc; }
            .compliant { color: green; }
            .non-compliant { color: red; }
            img { max-width: 200px; }
          </style>
        </head>
        <body>
          <h1>Hygiene Requirements Report</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          ${requirements
            .map(
              (req) => `
                <div class="requirement">
                  <h3>${req.requirement}</h3>
                  <p class="${req.is_compliant ? "compliant" : "non-compliant"}">
                    Status: ${req.is_compliant ? "Compliant" : "Non-compliant"}
                  </p>
                  ${req.photo_evidence ? `<img src="${req.photo_evidence}" />` : ""}
                </div>
              `,
            )
            .join("")}
        </body>
      </html>
    `;

    // Generate PDF
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html);
    const pdf = await page.pdf();
    await browser.close();

    // Upload PDF to storage
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    const fileName = `report-${Date.now()}.pdf`;
    const { data, error } = await supabase.storage
      .from("reports")
      .upload(fileName, pdf);

    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabase.storage.from("reports").getPublicUrl(fileName);

    return new Response(JSON.stringify({ url: publicUrl }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
