import { Application, Router, Context, send } from "https://deno.land/x/oak@v12.6.1/mod.ts";

// Initialize application and router
const app = new Application();
const router = new Router();

// CORS middleware
app.use(async (ctx, next) => {
  ctx.response.headers.set("Access-Control-Allow-Origin", "*");
  ctx.response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  ctx.response.headers.set("Access-Control-Allow-Headers", "Content-Type");

  if (ctx.request.method === "OPTIONS") {
    ctx.response.status = 204;
    return;
  }

  await next();
});

// Error handling middleware
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.response.status = err.status || 500;
    ctx.response.body = {
      success: false,
      message: err.message,
    };
    console.error(`Error: ${err.message}`);
  }
});

// Utility function for validating color input
function isValidColor(color: unknown): boolean {
  return (
    Array.isArray(color) &&
    color.length === 3 &&
    color.every((value) => typeof value === "number" && value >= 0 && value <= 255)
  );
}

// Get sensor data route
router.get("/api/data", async (ctx: Context) => {
  try {
    const response = await fetch("http://192.168.178.58:5000/data");
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const data = await response.json();
    ctx.response.body = {
      success: true,
      data,
    };
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = {
      success: false,
      error: error.message,
    };
  }
});

// Display support route
router.post("/display_support", async (ctx: Context) => {
  try {
    const response = await fetch("http://192.168.178.58:5000/display_support", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to display support: ${response.statusText}`);
    }

    const data = await response.json();
    ctx.response.body = {
      success: true,
      data,
    };
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = {
      success: false,
      error: error.message,
    };
  }
});

router.post('/farbe', async (ctx: Context) => {
  try {
    if (!ctx.request.hasBody) {
      throw new Error('No body provided');
    }

    const body = await ctx.request.body();
    if (body.type !== 'json') {
      throw new Error('Expected JSON content type');
    }

    const value = await body.value;
    
    if (!value.color || !isValidColor(value.color)) {
      throw new Error('Invalid color format. Expected an array of three numbers between 0 and 255.');
    }

    ctx.response.status = 200;
    ctx.response.body = {
      success: true,
      data: value.color
    };

  } catch (error) {
    ctx.response.status = 400;
    ctx.response.body = {
      success: false,
      error: error.message
    };
  }
});

app.use(async (ctx, next) => {
  try {
    await ctx.send({
      root: `${Deno.cwd()}`,
      index: "wc_MOBS.html",
    });
  } catch {
    await next();
  }
});

// Add root route
router.get("/", async (ctx) => {
  await ctx.send({
    root: `${Deno.cwd()}`,
    index: "wc_MOBS.html"
  });
});

// Apply router middleware
app.use(router.routes());
app.use(router.allowedMethods());

// Start server
console.log("Server running on http://192.168.178.58:8088");
await app.listen({ port: 8088 });