/* OPTIONAL — only if you want users to need no key of their own.
   Paste this into a free Cloudflare Worker, add GROQ_KEY as a secret,
   then put the Worker URL into PROXY_URL near the top of index.html. */
export default {
  async fetch(request, env) {
    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST, OPTIONS"
    };
    if (request.method === "OPTIONS") return new Response(null, { headers: cors });
    if (request.method !== "POST") return new Response("POST only", { status: 405, headers: cors });

    const body = await request.text();
    const upstream = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": "Bearer " + env.GROQ_KEY },
      body
    });
    return new Response(await upstream.text(), {
      status: upstream.status,
      headers: { ...cors, "Content-Type": "application/json" }
    });
  }
};
