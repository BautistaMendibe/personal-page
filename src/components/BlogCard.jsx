function PostThumbPlaceholder() {
  return (
    <div
      className="flex h-full min-h-[7rem] w-full items-center justify-center bg-gradient-to-br from-slate-100 via-gray-50 to-blue-50/80 dark:from-gray-800 dark:via-gray-800 dark:to-slate-900"
      aria-hidden="true"
    >
      <svg
        className="h-10 w-10 text-gray-400/90 dark:text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.25}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
        />
      </svg>
    </div>
  );
}

export default function BlogCard({ posts }) {
  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split("/");
    return new Date(`${year}-${month}-${day}`);
  };

  const sortedPosts = [...posts].sort(
    (a, b) => parseDate(b.data.date) - parseDate(a.data.date),
  );

  return (
    <nav aria-label="Entradas del blog">
      <ul className="grid list-none gap-4 sm:gap-5">
        {sortedPosts.map((post) => (
          <li key={post.slug}>
            <a
              href={`/blog/${post.slug}`}
              className="group relative flex min-h-0 flex-col overflow-hidden rounded-2xl border border-gray-200/90 bg-white/90 shadow-sm ring-1 ring-black/[0.04] transition [touch-action:manipulation] hover:border-blue-200/80 hover:shadow-md hover:ring-blue-500/10 active:scale-[0.99] dark:border-gray-700/90 dark:bg-gray-900/60 dark:ring-white/[0.06] dark:hover:border-blue-500/35 sm:flex-row sm:items-stretch"
            >
              <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-gray-100 sm:aspect-auto sm:h-auto sm:w-[min(42%,13.5rem)] sm:max-w-[13.5rem] md:w-56">
                {post.data.img ? (
                  <img
                    className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
                    src={post.data.img}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <PostThumbPlaceholder />
                )}
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-900/25 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100 sm:bg-gradient-to-r sm:from-transparent sm:via-transparent sm:to-gray-900/10"
                  aria-hidden="true"
                />
              </div>

              <div className="flex min-w-0 flex-1 flex-col justify-center p-4 sm:p-5 md:pr-6">
                <time
                  dateTime={parseDate(post.data.date).toISOString().slice(0, 10)}
                  className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
                >
                  {post.data.date}
                </time>
                <h3 className="mt-1.5 text-[15px] font-semibold leading-snug tracking-tight text-gray-900 transition group-hover:text-blue-600 dark:text-gray-50 dark:group-hover:text-blue-400 sm:text-base md:text-[17px]">
                  {post.data.title}
                </h3>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400">
                  Leer artículo
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
