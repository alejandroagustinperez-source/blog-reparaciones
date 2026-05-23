"use client";

import { useState } from "react";

export function HelpfulButtons() {
  const [vote, setVote] = useState<"up" | "down" | null>(null);

  return (
    <div className="rounded-xl border border-gray-200 bg-[#f8f9fa] p-6 text-center">
      <p className="text-base font-medium text-[#1e3a5f]">
        ¿Te resultó útil este artículo?
      </p>
      <div className="mt-4 flex items-center justify-center gap-4">
        <button
          onClick={() => setVote("up")}
          className={`inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium transition-all ${
            vote === "up"
              ? "border-[#f97316] bg-[#f97316]/10 text-[#ea580c]"
              : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-100"
          }`}
        >
          <span className="text-lg">👍</span> Sí, me sirvió
        </button>
        <button
          onClick={() => setVote("down")}
          className={`inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium transition-all ${
            vote === "down"
              ? "border-gray-300 bg-gray-100 text-gray-600"
              : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-100"
          }`}
        >
          <span className="text-lg">👎</span> No
        </button>
      </div>
      {vote && (
        <p className="mt-3 text-sm text-gray-500">
          {vote === "up"
            ? "¡Gracias por tu feedback!"
            : "Gracias, lo tendremos en cuenta para mejorar."}
        </p>
      )}
    </div>
  );
}
