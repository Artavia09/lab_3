// Modelo, validaciones y constantes de dominio.

/** Géneros permitidos (según consigna del usuario). */
export const GENEROS = ["comedia","drama","familiar","terror","romance"];

/** Año mínimo plausible del cine. */
export const ANIO_MIN = 1888;

/** Valida URL de imagen sencilla. */
export function esUrlValida(url) {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * Valida una película. Lanza Error si encuentra problemas.
 * @param {{titulo:any, poster:any, genero:any, anio_lanzamiento:any}} p
 */
export function validarPelicula(p) {
  const errores = [];
  const titulo = String(p.titulo ?? "").trim();
  const genero = String(p.genero ?? "").toLowerCase();
  const poster = String(p.poster ?? "").trim();
  const anio = Number(p.anio_lanzamiento);

  if (!titulo) errores.push("El título es requerido.");
  if (!Number.isInteger(anio)) errores.push("El año debe ser un número entero.");
  const anioActual = new Date().getFullYear();
  if (Number.isInteger(anio) && (anio < ANIO_MIN || anio > anioActual + 1)) {
    errores.push(`El año debe estar entre ${ANIO_MIN} y ${anioActual + 1}.`);
  }
  if (!GENEROS.includes(genero)) {
    errores.push(`Género inválido. Debe ser uno de: ${GENEROS.join(", ")}.`);
  }
  if (!esUrlValida(poster)) {
    errores.push("La URL del póster no es válida.");
  }

  if (errores.length) {
    throw new Error(errores.join(" "));
  }
}

/**
 * Normaliza el payload antes de enviarlo al backend.
 * @param {{titulo:string, poster:string, genero:string, anio_lanzamiento:number}} p
 */
export function normalizarPelicula(p) {
  return {
    titulo: String(p.titulo).trim(),
    poster: String(p.poster).trim(),
    genero: String(p.genero).toLowerCase(),
    anio_lanzamiento: Number(p.anio_lanzamiento)
  };
}
