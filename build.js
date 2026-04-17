import { Eta } from "@bgub/eta";
import getMarkdownData from "./markdown-to-html.js";

const viewpath = `${Deno.cwd()}/templates/`;

const eta = new Eta({ views: viewpath, cache: true });

// Ensure dist/ directory exists
try {
  await Deno.mkdir("dist", { recursive: true });
  await Deno.mkdir("dist/assets", { recursive: true });
} catch (e) {
  console.error(e);
  // directory already exists, skip
}

// generate a page for each template in templates/pages/
for await (const entry of Deno.readDir("templates/pages")) {
  if (entry.isFile) {
    const templateSlug = entry.name.replace(".eta", "");
    const page = eta.render(`pages/${templateSlug}`, { slug: templateSlug, markdownData: getMarkdownData() });
    const destPath = `dist/${templateSlug}.html`;

    Deno.writeTextFileSync(destPath, page);
  }
}


// Copy all files from styles/ to dist/
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
