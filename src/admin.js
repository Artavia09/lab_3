
import { crearPelicula } from "./api.js";
import { validarPelicula, normalizarPelicula, GENEROS } from "./model.js";
import { crearTarjetaPelicula, mostrarEstado } from "./ui.js";

const form = document.getElementById("form-pelicula");
const tituloEl = document.getElementById("titulo");
const anioEl = document.getElementById("anio");
const generoEl = document.getElementById("genero");
const posterEl = document.getElementById("poster");
const mensajeEl = document.getElementById("mensaje");
const previewEl = document.getElementById("preview-tarjeta");

function poblarGeneros() {
  // Asegura que solo estén los géneros permitidos
  const opciones = Array.from(generoEl.querySelectorAll("option")).map(o => o.value).filter(Boolean);
  if (opciones.length !== GENEROS.length) {
    generoEl.innerHTML = '<option value="">Seleccionar…</option>' + GENEROS.map(g => `<option value="${g}">${g.charAt(0).toUpperCase()+g.slice(1)}</option>`).join("");
  }
}

function actualizarPreview() {
  const payload = {
    titulo: tituloEl.value,
    anio_lanzamiento: Number(anioEl.value),
    genero: generoEl.value,
    poster: posterEl.value
  };
  try {
    validarPelicula(payload); // Si es válido, muestra tarjeta real
    const tarjeta = crearTarjetaPelicula(payload);
    previewEl.replaceWith(tarjeta);
    tarjeta.id = "preview-tarjeta";
  } catch {
    // Si no es válido aún, muestra un placeholder simple
    const placeholder = document.createElement("div");
    placeholder.id = "preview-tarjeta";
    placeholder.className = "tarjeta";
    const sk = document.createElement("div");
    sk.className = "poster-skeleton";
    const info = document.createElement("div");
    info.className = "info";
    const h = document.createElement("h3");
    h.textContent = tituloEl.value || "(Título)";
    const meta = document.createElement("p");
    meta.className = "meta";
    const g = generoEl.value || "(Género)";
    const a = anioEl.value || "(Año)";
    meta.innerHTML = `<span>${g}</span> • <span>${a}</span>`;
    info.appendChild(h);
    info.appendChild(meta);
    placeholder.appendChild(sk);
    placeholder.appendChild(info);
    previewEl.replaceWith(placeholder);
  }
}

async function manejarSubmit(ev) {
  ev.preventDefault();
  const payload = normalizarPelicula({
    titulo: tituloEl.value,
    anio_lanzamiento: Number(anioEl.value),
    genero: generoEl.value,
    poster: posterEl.value
  });

  try {
    validarPelicula(payload);
    mostrarEstado(mensajeEl, "Guardando…");
    const creada = await crearPelicula(payload);
    mostrarEstado(mensajeEl, `✔️ Película «${creada.titulo}» agregada.`, "ok");
    form.reset();
    actualizarPreview();
  } catch (err) {
    console.error(err);
    const texto = err instanceof Error ? err.message : "Error desconocido. Revisa la consola.";
    mostrarEstado(mensajeEl, texto, "error");
  }
}

function manejarReset() {
  mostrarEstado(mensajeEl, "");
  actualizarPreview();
}

function iniciarAdmin() {
  poblarGeneros();
  actualizarPreview();
  form.addEventListener("submit", manejarSubmit);
  form.addEventListener("reset", manejarReset);
  tituloEl.addEventListener("input", actualizarPreview);
  anioEl.addEventListener("input", actualizarPreview);
  generoEl.addEventListener("change", actualizarPreview);
  posterEl.addEventListener("input", actualizarPreview);
}

document.addEventListener("DOMContentLoaded", iniciarAdmin);
