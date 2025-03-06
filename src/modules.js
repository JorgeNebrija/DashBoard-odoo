import { push } from "svelte-spa-router";

export let modules = [
  { name: "Recursos Humanos", icon: "rrhh.png", ruta: "/rrhh" },
  { name: "Facturación", icon: "facturacion.png", ruta: "/facturacion" },
  { name: "Finanzas", icon: "finanzas.png", ruta: "/finanzas" },
  { name: "Inventario", icon: "inventario.png", ruta: "/inventario" },
  { name: "Ventas", icon: "ventas.png", ruta: "/ventas" },
  { name: "Inicio", icon: "inicio.png", ruta: "/inicio" },
];

export function irA(ruta) {
  push(ruta);
}
