import {useState} from "react";
import ProjectModal from "./ProjectModal.jsx";

const PROJECTS = [
    {
        title: "Sistema ERP para la gestión de tiendas de ropa",
        description: "Aplicación para la gestión de una tienda de ropa, incluyendo el registro de empleados y clientes. Integración con API de AFIP/ARCA.",
        image: "/projects/calido-home.png",
        images: [
            "/projects/calido/1.png",
            "/projects/calido/2.png",
            "/projects/calido/3.png",
            "/projects/calido/4.png",
            "/projects/calido/5.jpg",
            "/projects/calido/6.png",
            "/projects/calido/7.png",
        ],
        tags: ["Angular", "Node.js", "Tailwind"],
        detailDescription: "Aplicación para la gestión de una tienda de ropa, incluyendo el registro de empleados y clientes.\n" +
            "Aplicación conectada a la API de AFIP/ARCA para la facturación de ventas y a la API de SIRO para el pago con código QR.\n" +
            "Ventas con tarjeta, efectivo y código QR.\n" +
            "Estadísticas de ventas y compras.\n" +
            "PDF personalizables para informes, órdenes de compra y control de inventario.\n" +
            "\n" +
            "El proyecto se desarrolló con Angular, Node y PostgresSQL.",
    },
    {
        title: "Caja de Jubilaciones - CIDI - Gobierno de Córdoba",
        description: "Plataforma para la gestión de pensiones y jubilaciones del gobierno de Córdoba.",
        detailDescription: "Desarrollé parte de la aplicación de la Caja de Jubilaciones y Pensiones de Córdoba Argentina, la cual pueden ver desde el link: https://app.cajajubilaciones.cba.gov.ar/ - Arquitectura en microservicios. - Frontend en Angular. - Backend en NodeJs. - Desarrollo en TypeScript.",
        image: "/projects/cj-home.png",
        tags: ["Angular", "Node.js", "Bootstrap"],
        images: [
            "/projects/caja/1.png",
            "/projects/caja/2.png",
            "/projects/caja/3.png",
            "/projects/caja/4.png",
        ],
    },
    {
        title: "Gestión de Calidad Alimentaria - CIDI - Gobierno de Córdoba",
        description: "Plataforma para la gestión de trámites vinculados al transporte de alimentos en la provincia.",
        detailDescription: "Plataforma para la gestión y evaluación de procedimientos relacionados con la gestión de la calidad alimentaria.\n" +
            "- Arquitectura de microservicios.\n" +
            "- Frontend en Angular.\n" +
            "- Backend en Node.js.\n" +
            "- Desarrollo en TypeScript.",
        image: "/projects/ga-home.png",
        tags: ["Angular", "Node.js", "Bootstrap"],
        images: [
            "/projects/alimentos/1.png",
            "/projects/alimentos/2.png",
            "/projects/alimentos/3.png",
            "/projects/alimentos/4.png",
        ],
    },
    {
        title: "PagameRata - Página para dividir los gastos con amigos",
        description: "Proyecto de fin de semana que ahora cuenta con 33 mil usuarios.",
        detailDescription: "Un fin de semana creé esta página para dividir la cuenta cuando un amigo puso X cantidad, otro Y cantidad\n" +
            "- Lo publiqué en tik tok y se volvió viral con más de 3 millones de vistas.\n" +
            "- 33 Mil usuarios.\n" +
            "- Desplegada en Vercel.\n",
        image: "/projects/pr-home.png",
        tags: ["Angular", "Bootstrap"],
        images: [
            "/projects/pagamerata/1.png",
            "/projects/pagamerata/2.png",
            "/projects/pagamerata/3.png"
        ],
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
                        <div
                            className="relative flex flex-col items-center col-span-6 row-span-5 gap-8 shadow-xl overflow-clip rounded-xl sm:rounded-xl md:group-hover:-translate-y-1 md:group-hover:shadow-2xl">
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
                            <span key={i}
                          className="flex gap-x-2 text-xs md:text-sm px-2 md:px-3 py-1 rounded-full bg-gray-300 dark:bg-gray-600 mr-2">
                                {tag}
                            </span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-2 text-gray-700 dark:text-gray-400">{project.description}</div>
                            <a className={"text-blue-600"}>Ver más</a>
                        </div>
                    </div>
                </article>
            ))}

            {selectedProject && <ProjectModal {...selectedProject} onClose={() => setSelectedProject(null)}/>}
        </div>
    );
}
