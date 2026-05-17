import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { slugifyHeading } from "@/lib/posts";

export function Markdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ children, ...props }) => {
          const text = String(children);
          const id = slugifyHeading(text);
          return <h2 id={id} {...props}>{children}</h2>;
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
