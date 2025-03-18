export default function BlogCard({ posts }) {
    return (
        <div className="blog-container grid grid-cols-3 gap-4">
            {posts.map((post) => (
                <a
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="block rounded-lg shadow-md overflow-hidden bg-white hover:shadow-lg transition"
                >
                    <div className="h-64 w-full">
                        <img
                            className="w-full h-full object-cover"
                            src={post.data.img}
                            alt={post.data.title}
                        />
                    </div>
                    <div className="p-4 flex flex-col">
                        <h1 className="text-xl font-semibold text-gray-900 hover:text-blue-500 transition">
                            {post.data.title}
                        </h1>
                        <p className="text-gray-600">{post.data.description}</p>
                    </div>
                </a>
            ))}
        </div>
    );
}
