import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const router = new Router();

// CORS middleware
app.use(async (ctx, next) => {
  ctx.response.headers.set("Access-Control-Allow-Origin", "*");
  ctx.response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  ctx.response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  await next();
});

// Data endpoint
router.get('/api/data', async (ctx) => {
  try {
    const response = await fetch('http://192.168.178.58:5000/data');
    if (!response.ok) throw new Error('Failed to fetch data');
    ctx.response.body = await response.json();
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { error: error.message };
  }
});

// Support endpoint
router.post('/display_support', async (ctx) => {
  try {
    const response = await fetch('http://192.168.178.58:5000/display_support', {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Failed to display support');
    ctx.response.body = await response.json();
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { error: error.message };
  }
});

// Color endpoint
router.post('/farbe', async (ctx) => {
  try {
    const body = await ctx.request.body().value;
    ctx.response.body = { status: "success", data: body };
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { error: error.message };
  }
});

router.get('/', async (ctx) => {
  await ctx.send({
    root: Deno.cwd(),
    index: 'wc_MOBS.html'
  });
});

router.get('/wc_script.js', async (ctx) => {
  await ctx.send({
    root: Deno.cwd(),
    path: 'wc_script.js'
  });
});

// Apply routes and allowed methods
app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server läuft auf http://192.168.178.58:8088");
await app.listen({ port: 8088 });