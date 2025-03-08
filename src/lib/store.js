import { writable } from "svelte/store";

export const usuario = writable({
  correo: "",
  rol: "",
});

export const textoFiltrado = writable("Facturación")

export const btnSideBarMovilActivo = writable(false);