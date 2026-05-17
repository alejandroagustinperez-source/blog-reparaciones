import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  content: string;
  category: string;
};

const categoryKeywords: Record<string, string[]> = {
  electricidad: ["enchufe", "térmica", "llave", "eléctrico", "diferencial", "electricidad"],
  plomeria: ["canilla", "inodoro", "desagote", "flexible", "pérdidas", "agua", "plomería"],
  gas: ["calefón", "estufa", "detector", "gas"],
  electrodomesticos: ["heladera", "lavarropas", "microondas", "electrodomésticos"],
};

export function getCategory(slug: string): string {
  for (const [cat, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some((kw) => slug.includes(kw))) return cat;
  }
  return "general";
}

export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((fn) => fn.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      return {
        slug,
        title: data.title,
        description: data.description,
        date: data.date,
        content,
        category: data.category ?? getCategory(slug),
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      content,
      category: data.category ?? getCategory(slug),
    };
  } catch {
    return null;
  }
}
