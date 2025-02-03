import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();

router.get('/api/data', async (ctx) => {
  try {
    const response = await fetch('http://192.168.178.58:5000/data');
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    ctx.response.body = data;
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { error: error.message };
  }
});

router.post('/display_support', async (ctx) => {
  try {
    const body = ctx.request.body({ type: "json" });
    const payload = await body.value;
    const response = await fetch('http://192.168.178.58:5000/display_support', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const result = await response.json();
    ctx.response.body = result;
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { error: error.message };
  }
});

router.post('/farbe', async (ctx) => {
  try {
    const body = ctx.request.body({ type: "json" });
    const payload = await body.value;
    const response = await fetch('http://192.168.178.58:5000/farbe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const result = await response.json();
    ctx.response.body = result;
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { error: error.message };
  }
});

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server läuft auf http://192.168.178.58:8088");
await app.listen({ port: 8088 });
