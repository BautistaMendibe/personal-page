import { useCallback, useEffect, useId, useState } from "react";

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
  const descriptionId = useId();
  const [entered, setEntered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const count = images?.length ?? 0;
  const safeIndex = count ? Math.min(activeIndex, count - 1) : 0;
  const currentSrc = count ? images[safeIndex] : "";

  const goPrev = useCallback(() => {
    setActiveIndex((i) => {
      const cur = Math.min(Math.max(0, i), Math.max(0, count - 1));
      return Math.max(0, cur - 1);
    });
  }, [count]);

  const goNext = useCallback(() => {
    setActiveIndex((i) => {
      const cur = Math.min(Math.max(0, i), Math.max(0, count - 1));
      return Math.min(Math.max(0, count - 1), cur + 1);
    });
  }, [count]);

  useEffect(() => {
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    setActiveIndex(0);
  }, [title]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (count <= 1) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setActiveIndex((i) => {
          const cur = Math.min(Math.max(0, i), Math.max(0, count - 1));
          return Math.max(0, cur - 1);
        });
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setActiveIndex((i) => {
          const cur = Math.min(Math.max(0, i), Math.max(0, count - 1));
          return Math.min(Math.max(0, count - 1), cur + 1);
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, count]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pl-[max(0.75rem,env(safe-area-inset-left))] pr-[max(0.75rem,env(safe-area-inset-right))] pt-[max(0.75rem,env(safe-area-inset-top))] transition-opacity duration-200 ease-out sm:p-5 ${
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
        aria-describedby={descriptionId}
        className={`relative z-10 flex max-h-[min(94dvh,920px)] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-gray-200/90 bg-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] transition duration-200 ease-out dark:border-gray-700/90 dark:bg-gray-900 dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] md:max-h-[92vh] ${
          entered ? "translate-y-0 scale-100 opacity-100" : "translate-y-2 scale-[0.98] opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
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

        {/* Galería (prioridad) + descripción en columna lateral con scroll */}
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden md:flex-row md:items-stretch">
          {/* Galería: ocupa casi todo el alto disponible */}
          <div className="flex min-h-0 min-h-[min(52vh,520px)] flex-1 flex-col gap-3 overflow-hidden bg-[linear-gradient(180deg,rgba(243,244,246,0.95)_0%,rgba(229,231,235,0.5)_100%)] p-3 dark:bg-[linear-gradient(180deg,rgba(17,24,39,0.95)_0%,rgba(3,7,18,0.6)_100%)] sm:p-4 md:min-h-0">
          {count > 0 && (
            <>
              <div
                className="relative flex min-h-[220px] flex-1 items-center justify-center overflow-hidden rounded-xl border border-gray-200/90 bg-white/90 shadow-inner ring-1 ring-black/[0.06] dark:border-gray-700/90 dark:bg-gray-950/80 dark:ring-white/[0.08] sm:min-h-[300px]"
                aria-roledescription="Carrusel de capturas"
              >
                <img
                  src={currentSrc}
                  alt={`Captura ${safeIndex + 1} de ${count}: ${title}`}
                  className="h-auto max-h-[min(68vh,620px)] w-full max-w-full object-contain object-center px-1 py-2 sm:px-4 sm:py-4"
                  loading={safeIndex === 0 ? "eager" : "lazy"}
                  decoding="async"
                />

                {count > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        goPrev();
                      }}
                      disabled={safeIndex === 0}
                      className="absolute left-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200/90 bg-white/95 text-gray-700 shadow-md backdrop-blur-sm transition hover:bg-white disabled:pointer-events-none disabled:opacity-30 dark:border-gray-600 dark:bg-gray-900/95 dark:text-gray-100 dark:hover:bg-gray-800 sm:left-2 sm:h-11 sm:w-11"
                      aria-label="Imagen anterior"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        goNext();
                      }}
                      disabled={safeIndex >= count - 1}
                      className="absolute right-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200/90 bg-white/95 text-gray-700 shadow-md backdrop-blur-sm transition hover:bg-white disabled:pointer-events-none disabled:opacity-30 dark:border-gray-600 dark:bg-gray-900/95 dark:text-gray-100 dark:hover:bg-gray-800 sm:right-2 sm:h-11 sm:w-11"
                      aria-label="Imagen siguiente"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                    <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-gray-900/75 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm dark:bg-black/70">
                      {safeIndex + 1} / {count}
                    </div>
                  </>
                )}
              </div>

              {count > 1 && (
                <div className="shrink-0">
                  <p className="mb-2 text-center text-[11px] font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Capturas del proyecto
                  </p>
                  <div className="flex gap-2 overflow-x-auto pb-1 pt-0.5 [scrollbar-width:thin]">
                    {images.map((thumb, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActiveIndex(i)}
                        className={`relative shrink-0 overflow-hidden rounded-lg border-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${
                          i === safeIndex
                            ? "border-blue-500 shadow-md ring-2 ring-blue-500/30"
                            : "border-transparent opacity-80 hover:opacity-100"
                        }`}
                        aria-label={`Ver captura ${i + 1}`}
                        aria-current={i === safeIndex ? "true" : undefined}
                      >
                        <img
                          src={thumb}
                          alt=""
                          className="h-[4.25rem] w-[7.25rem] object-cover sm:h-20 sm:w-36"
                          loading="lazy"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
          </div>

          {/* Descripción: altura limitada en móvil; panel lateral con scroll en md+ */}
          <section
            id={descriptionId}
            className="flex max-h-[min(45dvh,380px)] shrink-0 flex-col overflow-y-auto overscroll-contain border-t border-gray-200/90 bg-gradient-to-b from-white to-gray-50/90 px-3 py-3 dark:border-gray-700/90 dark:from-gray-900 dark:to-gray-950/80 sm:max-h-[min(42vh,360px)] sm:px-4 sm:py-4 md:max-h-none md:h-full md:w-[min(100%,19rem)] md:shrink-0 md:border-l md:border-t-0 md:py-4 lg:w-80"
          >
            <div className="relative overflow-hidden rounded-xl border border-gray-200/80 bg-white/90 shadow-sm ring-1 ring-black/[0.03] dark:border-gray-700/80 dark:bg-gray-900/60 dark:ring-white/[0.06]">
              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500" aria-hidden="true" />
              <div className="px-3 py-3 pl-4 sm:px-4 sm:py-4 sm:pl-5">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.12em] text-blue-600 dark:text-blue-400">
                  Descripción
                </h3>
                <div className="mt-2.5 max-w-none text-sm leading-relaxed text-gray-700 antialiased dark:text-gray-200 [&_a]:break-all md:text-[13px] md:leading-[1.65] lg:text-sm">
                  <div className="whitespace-pre-line [text-wrap:pretty]">
                    <DescriptionWithLinks text={detailDescription} />
                  </div>
                </div>

                {tags?.length > 0 && (
                  <div className="mt-4 border-t border-gray-200/80 pt-3 dark:border-gray-700/80">
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400">
                      Tecnologías
                    </p>
                    <ul className="mt-2 flex flex-wrap gap-1.5">
                      {tags.map((tag, i) => (
                        <li key={i}>
                          <span className="inline-flex items-center rounded-lg border border-blue-200/70 bg-blue-50/90 px-2 py-0.5 text-[11px] font-semibold text-blue-900 shadow-sm dark:border-blue-500/25 dark:bg-blue-950/50 dark:text-blue-100">
                            {tag}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
