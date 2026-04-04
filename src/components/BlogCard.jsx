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
      <ul className="divide-y divide-gray-200/90 rounded-xl border border-gray-200/80 bg-white/60 px-1 py-0.5 shadow-sm backdrop-blur-sm dark:divide-gray-700/80 dark:border-gray-700/80 dark:bg-gray-900/40">
        {sortedPosts.map((post) => (
          <li key={post.slug}>
            <a
              href={`/blog/${post.slug}`}
              className="group flex min-h-[3.25rem] items-center gap-3 rounded-lg px-3 py-3.5 transition-colors [touch-action:manipulation] hover:bg-gray-50/90 active:bg-gray-100/80 sm:min-h-0 sm:gap-5 sm:px-4 sm:py-4 dark:hover:bg-gray-800/50 dark:active:bg-gray-800/70"
            >
              {post.data.img ? (
                <div className="relative h-12 w-14 shrink-0 overflow-hidden rounded-md bg-gray-100 ring-1 ring-gray-200/80 dark:bg-gray-800 dark:ring-gray-700">
                  <img
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                    src={post.data.img}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ) : (
                <div
                  className="h-12 w-14 shrink-0 rounded-md bg-gradient-to-br from-gray-100 to-gray-200/80 ring-1 ring-gray-200/80 dark:from-gray-800 dark:to-gray-800/80 dark:ring-gray-700"
                  aria-hidden="true"
                />
              )}
              <div className="min-w-0 flex-1">
                <p className="text-[15px] font-medium leading-snug text-gray-900 transition group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
                  {post.data.title}
                </p>
                <p className="mt-1 text-xs text-gray-500 tabular-nums dark:text-gray-400">
                  {post.data.date}
                </p>
              </div>
              <span
                className="shrink-0 text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-blue-500 dark:text-gray-600 dark:group-hover:text-blue-400"
                aria-hidden="true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.75}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
