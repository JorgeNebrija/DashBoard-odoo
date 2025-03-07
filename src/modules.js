import { push } from "svelte-spa-router";

// Lista de módulos disponibles
export const modulos = {
  admin: [
    { nombre: "Inicio", ruta: "/inicio", icono: "/icons/inicio.png" },
    {
      nombre: "Facturación",
      ruta: "/facturacion",
      icono: "/icons/facturacion.png",
    },
    { nombre: "Finanzas", ruta: "/finanzas", icono: "/icons/finanzas.png" },
    { nombre: "Recursos Humanos", ruta: "/rrhh", icono: "/icons/rrhh.png" },
    { nombre: "Ventas", ruta: "/ventas", icono: "/icons/ventas.png" },
    {
      nombre: "Inventario",
      ruta: "/inventario",
      icono: "/icons/inventario.png",
    },
    {
      nombre: "Fabricación",
      ruta: "/fabricacion",
      icono: "/icons/fabricacion.png",
    },
    {nombre: "Graficas", ruta: "/graficas", icono:"/icons/graficas.png"}

  ],
  empleado: [
    { nombre: "Inicio", ruta: "/inicio", icono: "/icons/inicio.png" },
    { nombre: "Ventas", ruta: "/ventas", icono: "/icons/ventas.png" },
    {
      nombre: "Inventario",
      ruta: "/inventario",
      icono: "/icons/inventario.png",
    },
    {
      nombre: "Fabricación",
      ruta: "/fabricacion",
      icono: "/icons/fabricacion.png",
    },
    {nombre: "Graficas", ruta: "/graficas", icono:"/icons/graficas.png"}
  ],
};

export function irA(ruta) {
  push(ruta);
}
