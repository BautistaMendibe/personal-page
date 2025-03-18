export default function ProjectModal({ title, description, image, tags, onClose }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-lg w-full relative shadow-lg">
                {/* Botón de Cerrar */}
                <button className="absolute top-3 right-3 text-gray-600 dark:text-gray-300" onClick={onClose}>
                    ✖
                </button>

                {/* Imagen */}
                <img src={image} alt={title} className="rounded-lg w-full mb-4" />

                {/* Título */}
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h2>

                {/* Tags */}
                <div className="flex flex-wrap mt-2">
                    {tags.map((tag, i) => (
                        <span key={i} className="flex gap-x-2 text-sm px-2 py-1 rounded-full bg-gray-300 mr-2">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Descripción */}
                <p className="mt-2 text-gray-700 dark:text-gray-300">{description}</p>
            </div>
        </div>
    );
}
