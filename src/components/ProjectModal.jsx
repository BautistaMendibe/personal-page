import { useState } from "react";

export default function ProjectModal({ title, detailDescription, images, tags, onClose }) {
    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4"
            onClick={onClose} // Cierra el modal si se hace clic fuera
        >
            <div
                className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-7xl max-h-[90vh] md:max-h-[85vh] overflow-hidden shadow-lg flex flex-col md:flex-row"
                onClick={(e) => e.stopPropagation()} // Evita que el clic en el modal lo cierre
            >
                {/* Botón de Cerrar */}
                <button className="absolute top-3 right-3 my-8 mr-2 text-gray-600 dark:text-gray-300 text-xl md:text-2xl " onClick={onClose}>
                    ✖
                </button>

                {/* Sección de Imágenes (Ocupa la mitad de la pantalla en móviles, hace scroll si hay muchas imágenes) */}
                <div className="w-full h-1/2 md:h-auto md:w-2/3 p-4 flex flex-col items-center justify-start space-y-4 overflow-y-auto">
                    {images.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            className="rounded-lg w-full object-cover shadow-lg max-h-52 sm:max-h-64 md:max-h-80"
                            alt={`Imagen ${index}`}
                        />
                    ))}
                </div>

                {/* Sección de Información (Ocupa la otra mitad en móviles, hace scroll si el contenido es grande) */}
                <div className="w-full h-1/2 md:h-auto md:w-1/3 p-4 md:p-6 flex flex-col">
                    <h2 className="md:text-3xl font-bold text-gray-800 dark:text-white">{title}</h2>
                    <p className="mt-2 text-xs md:text-lg text-gray-600 dark:text-gray-300 text-justify">{detailDescription}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap mt-4">
                        {tags.map((tag, i) => (
                            <span key={i} className="flex gap-x-2 text-xs md:text-sm px-2 md:px-3 py-1 rounded-full bg-gray-300 dark:bg-gray-600 mr-2">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
