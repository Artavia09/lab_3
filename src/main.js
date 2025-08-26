
import { obtenerPeliculas } from "./api.js";
import { crearTarjetaPelicula, renderizarTarjetas, mostrarEstado } from "./ui.js";

const estadoEl = document.getElementById("estado");
const gridEl = document.getElementById("grid-peliculas");
const buscarEl = document.getElementById("buscar");
const filtroGeneroEl = document.getElementById("filtro-genero");
const btnRefrescar = document.getElementById("refrescar");

/** @type {import('./api.js').Pelicula[]} */
let peliculas = [];

async function cargarPeliculas() {
  mostrarEstado(estadoEl, "Cargando películas…");
  try {
    peliculas = await obtenerPeliculas();
    const tarjetas = peliculas.map(crearTarjetaPelicula);
    renderizarTarjetas(gridEl, tarjetas);
    mostrarEstado(estadoEl, `Mostrando ${peliculas.length} película(s).`, "ok");
  } catch (err) {
    console.error(err);
    mostrarEstado(estadoEl, "No se pudieron cargar las películas. Revisa la consola.", "error");
  }
}

function aplicarFiltros() {
  const q = String(buscarEl.value || "").toLowerCase().trim();
  const genero = String(filtroGeneroEl.value || "").toLowerCase();

  const filtradas = peliculas.filter(p => {
    const coincideTitulo = !q || p.titulo.toLowerCase().includes(q);
    const coincideGenero = !genero || p.genero.toLowerCase() === genero;
    return coincideTitulo && coincideGenero;
  });

  const tarjetas = filtradas.map(crearTarjetaPelicula);
  renderizarTarjetas(gridEl, tarjetas);
  mostrarEstado(estadoEl, `Mostrando ${filtradas.length} de ${peliculas.length}.`);
}

function iniciarCartelera() {
  cargarPeliculas();
  buscarEl.addEventListener("input", aplicarFiltros);
  filtroGeneroEl.addEventListener("change", aplicarFiltros);
  btnRefrescar.addEventListener("click", cargarPeliculas);
}

document.addEventListener("DOMContentLoaded", iniciarCartelera);
