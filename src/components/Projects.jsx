import { useState } from "react";
import ProjectModal from "./ProjectModal.astro";

const PROJECTS = [
    {
        title: "Sistema ERP para la gestión de tiendas de ropa",
        description: "Aplicación para la gestión de una tienda de ropa, incluyendo el registro de empleados y clientes. Integración con API de AFIP/ARCA.",
        image: "/projects/calido-home.png",
        tags: ["Angular", "Node.js", "Tailwind"],
    },
    {
        title: "Caja de Jubilaciones - CIDI - Gobierno de Córdoba",
        description: "Plataforma para la gestión de pensiones y jubilaciones del gobierno de Córdoba.",
        image: "/projects/cj-home.png",
        tags: ["Angular", "Node.js", "Bootstrap"],
    },
    {
        title: "Gestión de Calidad Alimentaria - CIDI - Gobierno de Córdoba",
        description: "Plataforma para la gestión de trámites vinculados al transporte de alimentos en la provincia.",
        link: "",
        github: "",
        image: "public/projects/ga-home.png",
        tags: ["Angular", "Node.js", "Bootstrap"],
    },
];

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <div className="flex flex-col gap-y-16">
            {PROJECTS.map((project, index) => (
                <article
                    key={index}
                    className="flex flex-col space-x-0 space-y-8 group md:flex-row md:space-x-8 md:space-y-0 cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                >
                    <div className="w-full md:w-1/2">
                        <div className="relative flex flex-col items-center col-span-6 row-span-5 gap-8 shadow-xl overflow-clip rounded-xl sm:rounded-xl md:group-hover:-translate-y-1 md:group-hover:shadow-2xl">
                            <img
                                alt={project.title}
                                className="object-cover object-top w-full h-56 transition duration-500 sm:h-full md:scale-110 md:group-hover:scale-105"
                                src={project.image}
                            />
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 md:max-w-lg">
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                            {project.title}
                        </h3>
                        <div className="flex flex-wrap mt-2">
                            <ul className="flex flex-row mb-2 gap-x-2">
                                {project.tags.map((tag, i) => (
                                    <li key={i}>
                    <span className="flex gap-x-2 rounded-full text-xs py-1 px-2 bg-gray-300">
                      {tag}
                    </span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-2 text-gray-700 dark:text-gray-400">{project.description}</div>
                        </div>
                    </div>
                </article>
            ))}

            {selectedProject && <ProjectModal {...selectedProject} onClose={() => setSelectedProject(null)} />}
        </div>
    );
}


