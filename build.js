import { Eta } from "@bgub/eta";

const viewpath = `${Deno.cwd()}/templates/`;
const eta = new Eta({ views: viewpath, cache: true });

const Home = eta.render("index", { title: "that's my title" });

Deno.writeTextFileSync("dist/index.html", Home);

// Copy all files from styles/ to dist/ using Deno APIs

// Ensure dist/ directory exists
try {
  await Deno.mkdir("dist", { recursive: true });
  await Deno.mkdir("dist/assets", { recursive: true });
} catch (e) {
  // directory already exists, skip
}

for await (const entry of Deno.readDir("styles")) {
  if (entry.isFile) {
    const sourcePath = `styles/${entry.name}`;
    const destPath = `dist/${entry.name}`;
    await Deno.copyFile(sourcePath, destPath);
  }
}

// Copy all files from assets/ to dist/assets/ using Deno APIs
for await (const entry of Deno.readDir("assets")) {
  if (entry.isFile) {
    const sourcePath = `assets/${entry.name}`;
    const destPath = `dist/assets/${entry.name}`;
    await Deno.copyFile(sourcePath, destPath);
  }
}
