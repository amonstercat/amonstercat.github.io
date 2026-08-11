import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const title = process.argv.slice(2).join(" ").trim();

if (!title) {
  console.error("Usage: npm run new-post -- \"文章标题\"");
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .normalize("NFKD")
  .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
  .replace(/^-+|-+$/g, "")
  .slice(0, 80);

const today = new Date().toISOString().slice(0, 10);
const dir = path.join(process.cwd(), "src/content/blog");
const file = path.join(dir, `${today}-${slug || "untitled"}.md`);

if (existsSync(file)) {
  console.error(`Post already exists: ${file}`);
  process.exit(1);
}

await mkdir(dir, { recursive: true });
await writeFile(
  file,
  `---\ntitle: "${title.replaceAll('"', '\\"')}"\ndescription: "这里写一句文章摘要。"\npubDate: "${today}"\ntags: ["Note"]\ndraft: true\n---\n\n从这里开始写正文。\n`,
  "utf8",
);

console.log(file);
