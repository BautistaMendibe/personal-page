import { useState } from "react";

export default function ProjectModal({ title, detailDescription, image, images, tags, onClose }) {
    const [currentImage, setCurrentImage] = useState(0);

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose} // Cierra el modal si se hace clic fuera
        >
            <div
                className="bg-white h-[80vh] dark:bg-gray-800 p-6 rounded-lg w-11/12 max-w-7xl relative shadow-lg flex flex-col md:flex-row"
                onClick={(e) => e.stopPropagation()} // Evita que el clic en el modal lo cierre
            >
                {/* Botón de Cerrar */}
                <button className="absolute top-3 right-2 text-gray-600 dark:text-gray-300 text-2xl" onClick={onClose}>
                    ✖
                </button>

                {/* Sección de Información (Izquierda) */}
                <div className="md:w-1/3 p-8 flex flex-col justify-between mt-4">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">{title}</h2>
                        <p className="mt-2 text-gray-600 dark:text-gray-300 text-justify">{detailDescription}</p>

                        {/* Tags */}
                        <div className="flex flex-wrap mt-4">
                            {tags.map((tag, i) => (
                                <span key={i} className="flex gap-x-2 text-sm px-3 py-1 rounded-full bg-gray-300 dark:bg-gray-600 mr-2">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sección de Imágenes (Derecha) */}
                <div className="md:w-2/3 p-8 flex flex-col items-center justify-start overflow-y-auto scrollbar-custom space-y-4 mr-4">
                    {images.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            className="rounded-lg w-full object-cover shadow-lg"
                            alt={`Imagen ${index}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
