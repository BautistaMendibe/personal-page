import { useState } from "react";
import ProjectModal from "./ProjectModal.jsx";

const PROJECTS = [
  {
    title: "Sistema ERP para la gestión de tiendas de ropa",
    description:
      "Aplicación para la gestión de una tienda de ropa, incluyendo proveedores, empleados, pagos. Integración con API de AFIP/ARCA.",
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
    detailDescription: `Aplicación para la gestión de una tienda de ropa, incluyendo el registro de empleados y clientes.

    ▪️ Facturación automática a través de la API de AFIP/ARCA.
    ▪️ Pago con código QR a través del proveedor SIRO.
    ▪️ Ventas con tarjeta, efectivo y código QR.
    ▪️ Estadísticas de ventas y compras con Grafana.
    ▪️ PDF personalizables para informes, órdenes de compra y control de inventario.

    🔗 Github Frontend: https://github.com/BautistaMendibe/calido-frontend
    🔗 Github Backend: https://github.com/BautistaMendibe/calido-backend

`,
  },
  {
    title: "Caja de Pensión y Jubilaciones - CIDI - Gobierno de Córdoba",
    description:
      "Plataforma para la gestión de pensiones y jubilaciones del gobierno de Córdoba.",
    detailDescription: `Desarrollo e implementación de la aplicación de la Caja de Jubilaciones y Pensiones para el gobierno de Córdoba, Argentina.
    
    ▪️Arquitectura en microservicios.
    ▪️Frontend en Angular.
    ▪️Backend en NodeJs.
    ▪️Desarrollo en TypeScript.
    ▪️Base de datos en PostgreSQL.
    
    🚀 Despliegue en AWS (EC2).

    🔗 La aplicación se accede desde VEDI: https://app.cajajubilaciones.cba.gov.ar/
`,
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
    description:
      "Plataforma para la gestión de trámites vinculados al transporte de alimentos en la provincia.",
    detailDescription: `Plataforma para la gestión y evaluación de procedimientos relacionados con la gestión de la calidad alimentaria para la provincia de Córdoba, Argentina.
    
    ▪️Arquitectura de microservicios.
    ▪️Frontend en Angular.
    ▪️Backend en Node.js.
    ▪️Desarrollo en TypeScript.
    ▪️Base de datos en SQL, ambiente Desarrollo en AWS accedido através de Putty.

    🚀 Despliegue en AWS (EC2).

    🔗 La aplicación se accede desde VEDI: https://calidadalimentariadigital.cordoba.gob.ar/
    `,
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
    title: "PagameRata - Dividir los gastos con amigos",
    description:
      "Proyecto de fin de semana que ahora cuenta con 33 mil usuarios.",
    detailDescription: `Un fin de semana creé esta página para dividir la cuenta cuando un amigo puso X cantidad, otro Y cantidad.

        ▪️ Lo publiqué en TikTok y se volvió viral con más de 3 millones de vistas.
        ▪️ 33 Mil usuarios.

        ⚒️ Desarrollado con Angular y Bootstrap.
        
        🚀 Desplegada en Vercel.

        🔗 https://pagamerata.vercel.app/

    `,
    image: "/projects/pr-home.png",
    tags: ["Angular", "Bootstrap"],
    images: [
      "/projects/pagamerata/1.png",
      "/projects/pagamerata/2.png",
      "/projects/pagamerata/3.png",
    ],
  },
];

const MAX_TAGS = 4;

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <>
      <ul className="mb-6 grid list-none grid-cols-1 gap-5 sm:mb-8 sm:gap-6 md:grid-cols-2 md:gap-7 md:mb-10 xl:grid-cols-3">
        {PROJECTS.map((project, index) => {
          const extraTags = Math.max(0, project.tags.length - MAX_TAGS);
          return (
            <li key={index} className="min-h-0">
              <button
                type="button"
                onClick={() => setSelectedProject(project)}
                className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-gray-200/90 bg-white text-left shadow-md ring-1 ring-black/[0.03] transition [touch-action:manipulation] hover:border-blue-200 hover:shadow-lg hover:ring-blue-500/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:scale-[0.99] dark:border-gray-700/90 dark:bg-gray-900 dark:ring-white/[0.04] dark:hover:border-blue-500/40"
              >
                <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img
                    src={project.image}
                    alt=""
                    className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </div>

                <div className="flex flex-1 flex-col p-4 sm:p-6">
                  <h3 className="text-lg font-bold leading-snug tracking-tight text-gray-900 dark:text-white line-clamp-2 min-h-[2.75rem] sm:text-xl">
                    {project.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-300 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.slice(0, MAX_TAGS).map((tag, i) => (
                      <span
                        key={i}
                        className="rounded-md border border-gray-200/90 bg-gray-50 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-gray-700 dark:border-gray-600 dark:bg-gray-800/80 dark:text-gray-200"
                      >
                        {tag}
                      </span>
                    ))}
                    {extraTags > 0 && (
                      <span className="rounded-md bg-gray-200/80 px-2 py-0.5 text-[11px] font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                        +{extraTags}
                      </span>
                    )}
                  </div>

                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400">
                    Ver detalle
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
              </button>
            </li>
          );
        })}
      </ul>

      {selectedProject && (
        <ProjectModal
          {...selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}
