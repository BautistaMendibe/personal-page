import { useState } from "react";
import ProjectModal from "./ProjectModal.jsx";

const PROJECTS = [
  {
    title: "Sistema ERP para la gestión de tiendas de ropa ",
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

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section className="flex flex-col gap-y-20 mb-10">
      {PROJECTS.map((project, index) => (
        <article
          key={index}
          className="flex flex-col-reverse items-center md:flex-row gap-6 items-start bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer overflow-hidden"
          onClick={() => setSelectedProject(project)}
        >
          {/* Texto */}
          <div className="flex flex-col justify-between w-full md:w-1/2 p-6">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              {project.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <span className="text-blue-600 dark:text-blue-400 font-medium">
              Ver más →
            </span>
          </div>

          {/* Imagen */}
          <div className="w-full mx-2 my-2 md:w-1/2 ">
            <img
              src={project.image}
              alt={project.title}
              className="object-cover w-full h-64 md:h-full rounded-t-xl md:rounded-r-xl md:rounded-l-none border border-gray-300 dark:border-gray-700 transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </article>
      ))}

      {selectedProject && (
        <ProjectModal
          {...selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
