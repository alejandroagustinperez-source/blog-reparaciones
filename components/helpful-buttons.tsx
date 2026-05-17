"use client";

import { useState } from "react";

export function HelpfulButtons() {
  const [vote, setVote] = useState<"up" | "down" | null>(null);

  return (
    <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-6 text-center">
      <p className="text-base font-medium text-zinc-800">
        ¿Te resultó útil este artículo?
      </p>
      <div className="mt-4 flex items-center justify-center gap-4">
        <button
          onClick={() => setVote("up")}
          className={`inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium transition-all ${
            vote === "up"
              ? "border-blue-200 bg-blue-50 text-blue-700"
              : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-100"
          }`}
        >
          <span className="text-lg">👍</span> Sí, me sirvió
        </button>
        <button
          onClick={() => setVote("down")}
          className={`inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium transition-all ${
            vote === "down"
              ? "border-zinc-300 bg-zinc-100 text-zinc-600"
              : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-100"
          }`}
        >
          <span className="text-lg">👎</span> No
        </button>
      </div>
      {vote && (
        <p className="mt-3 text-sm text-zinc-500">
          {vote === "up"
            ? "¡Gracias por tu feedback!"
            : "Gracias, lo tendremos en cuenta para mejorar."}
        </p>
      )}
    </div>
  );
}
