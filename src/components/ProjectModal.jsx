import { useState } from "react";

export default function ProjectModal({ title, detailDescription, images, tags, onClose }) {
    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-7xl max-h-[90vh] overflow-hidden shadow-lg flex flex-col md:flex-row relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 text-xl md:text-2xl hover:text-red-500"
                    onClick={onClose}
                >
                    ✖
                </button>

                {/* Imágenes */}
                <div className="w-full md:w-2/3 p-4 flex flex-col items-center justify-start space-y-4 overflow-y-auto">
                    {images.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            className="rounded-lg border border-gray-300 dark:border-gray-600 w-full object-cover shadow-md hover:shadow-lg transition duration-300 max-h-48 sm:max-h-56 md:max-h-64"
                            alt={`Imagen ${index}`}
                        />
                    ))}
                </div>

                {/* Detalle */}
                <div className="w-full md:w-1/3 p-4 md:p-6 flex flex-col overflow-y-auto">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h2>
                    <div className="mt-4 text-sm md:text-base text-gray-600 dark:text-gray-300 whitespace-pre-line">
                        {detailDescription}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap mt-4">
                        {tags.map((tag, i) => (
                            <span
                                key={i}
                                className="text-xs md:text-sm px-3 py-1 rounded-full bg-gray-300 dark:bg-gray-600 mr-2"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
