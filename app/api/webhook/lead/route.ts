import { NextResponse } from "next/server";

const N8N_WEBHOOK_URL = "https://n8n.sitespdoze.com.br/webhook/lp";

export async function POST(request: Request) {
  let payload = {};
  try {
    payload = await request.json();
  } catch (_) {
    return NextResponse.json(
      { ok: false, error: "Payload inválido para o relay do webhook." },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      return NextResponse.json(
        {
          ok: false,
          error: `Webhook retornou HTTP ${res.status}`,
          detail: txt || undefined,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: "Falha de rede ao enviar webhook.",
        detail: String(error),
      },
      { status: 502 }
    );
  }
}
