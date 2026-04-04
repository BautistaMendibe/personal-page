import { useEffect, useId, useState } from "react";

const URL_REGEX = /(https?:\/\/[^\s<>"']+)/gi;

function DescriptionWithLinks({ text }) {
  const parts = text.split(URL_REGEX);
  return (
    <>
      {parts.map((part, i) =>
        /^https?:\/\//i.test(part) ? (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-600 underline decoration-blue-600/35 underline-offset-[3px] transition hover:text-blue-700 hover:decoration-blue-700 dark:text-blue-400 dark:decoration-blue-400/35 dark:hover:text-blue-300"
            onClick={(e) => e.stopPropagation()}
          >
            {part}
          </a>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

export default function ProjectModal({ title, detailDescription, images, tags, onClose }) {
  const titleId = useId();
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 transition-opacity duration-200 ease-out ${
        entered ? "opacity-100" : "opacity-0"
      }`}
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 z-0 cursor-default bg-gray-950/70 backdrop-blur-[2px] transition dark:bg-black/75"
        aria-label="Cerrar modal"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`relative z-10 flex max-h-[min(92vh,900px)] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-gray-200/90 bg-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] transition duration-200 ease-out dark:border-gray-700/90 dark:bg-gray-900 dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] md:max-h-[90vh] ${
          entered ? "translate-y-0 scale-100 opacity-100" : "translate-y-2 scale-[0.98] opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <header className="flex shrink-0 items-start justify-between gap-3 border-b border-gray-200/90 bg-gradient-to-b from-gray-50/95 to-white px-4 py-3.5 dark:border-gray-700/90 dark:from-gray-900/95 dark:to-gray-900 sm:px-6 sm:py-4">
          <div className="min-w-0 flex-1 pt-0.5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Proyecto
            </p>
            <h2 id={titleId} className="mt-0.5 text-lg font-bold leading-snug text-gray-900 dark:text-white sm:text-xl">
              {title}
            </h2>
          </div>
          <button
            type="button"
            className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-transparent text-gray-500 transition hover:border-gray-200 hover:bg-gray-100 hover:text-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-800 dark:hover:text-white"
            onClick={onClose}
            aria-label="Cerrar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 transition group-hover:scale-105"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className="flex min-h-0 flex-1 flex-col md:flex-row">
          {/* Galería */}
          <div className="flex min-h-0 flex-[1.55] flex-col gap-3 overflow-y-auto bg-gray-100/70 p-4 dark:bg-gray-950/40 sm:p-5 md:max-h-[min(78vh,720px)]">
            {images.map((img, index) => (
              <figure
                key={index}
                className="overflow-hidden rounded-xl border border-gray-200/90 bg-white shadow-sm ring-1 ring-black/[0.04] dark:border-gray-700/90 dark:bg-gray-900 dark:ring-white/[0.06]"
              >
                <img
                  src={img}
                  className="max-h-[min(22rem,52vh)] w-full object-contain"
                  alt={`Captura ${index + 1} de ${title}`}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </figure>
            ))}
          </div>

          {/* Detalle */}
          <aside className="flex min-h-0 w-full shrink-0 flex-col border-t border-gray-200/90 bg-white dark:border-gray-700/90 dark:bg-gray-900 md:w-[min(100%,22rem)] md:border-l md:border-t-0 lg:w-80">
            <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-4 sm:p-5">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Detalle
                </h3>
                <div className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  <DescriptionWithLinks text={detailDescription} />
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Stack
                </h3>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {tags.map((tag, i) => (
                    <li key={i}>
                      <span className="inline-flex items-center rounded-full border border-gray-200/90 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-800 dark:border-gray-600 dark:bg-gray-800/80 dark:text-gray-100">
                        {tag}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
