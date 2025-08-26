
// Capa de acceso a datos: JSON-Server
export const API_BASE_URL = "http://localhost:3000";
export const RECURSO = "peliculas";
export const ENDPOINT = `${API_BASE_URL}/${RECURSO}`;

/** @typedef {{ id?: number, titulo: string, poster: string, genero: string, anio_lanzamiento: number }} Pelicula */

/**
 * Obtiene todas las películas.
 * @returns {Promise<Pelicula[]>}
 */
export async function obtenerPeliculas() {
  const resp = await fetch(ENDPOINT);
  if (!resp.ok) {
    throw new Error(`Error al cargar películas: ${resp.status} ${resp.statusText}`);
  }
  /** @type {Pelicula[]} */
  const data = await resp.json();
  return data;
}

/**
 * Crea una nueva película.
 * @param {Pelicula} pelicula
 * @returns {Promise<Pelicula>}
 */
export async function crearPelicula(pelicula) {
  const resp = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pelicula)
  });
  if (!resp.ok) {
    throw new Error(`Error al crear película: ${resp.status} ${resp.statusText}`);
  }
  /** @type {Pelicula} */
  const creada = await resp.json();
  return creada;
}
