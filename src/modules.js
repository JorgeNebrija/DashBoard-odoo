import { push } from "svelte-spa-router";

export let modules = [
  { name: "Recursos Humanos", icon: "🛒", ruta: "/rrhh" },
  { name: "Facturación", icon: "📑", ruta: "/facturacion" },
  { name: "Finanzas", icon: "💰", ruta: "/finanzas" },
  { name: "Inventario", icon: "📦", ruta: "/inventario" },
  { name: "Ventas", icon: "📊", ruta: "/ventas" },
];

export function irA(ruta) {
  push(ruta);
}
