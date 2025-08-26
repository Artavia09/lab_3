// Utilidades de UI (creación de tarjetas, mensajes, etc.).
/**
 * Crea un elemento con nombre y clases.
 * @param {string} tag
 * @param {string[]} classNames
 * @returns {HTMLElement}
 */
export function el(tag, classNames = []) {
  const node = document.createElement(tag);
  if (classNames.length) node.className = classNames.join(" ");
  return node;
}

/**
 * Construye la tarjeta DOM de una película.
 * @param {{titulo:string, poster:string, genero:string, anio_lanzamiento:number}} p
 * @returns {HTMLElement}
 */
export function crearTarjetaPelicula(p) {
  const card = el("article", ["tarjeta", "card"]);
  const img = el("img", ["poster"]);
  img.alt = `Póster de ${p.titulo}`;
  img.loading = "lazy";
  img.referrerPolicy = "no-referrer";
  img.src = p.poster;

  const info = el("div", ["info"]);
  const h3 = el("h3");
  h3.textContent = p.titulo;
  const meta = el("p", ["meta"]);
  meta.innerHTML = `<span>${capitalizar(p.genero)}</span> • <span>${p.anio_lanzamiento}</span>`;

  info.appendChild(h3);
  info.appendChild(meta);

  card.appendChild(img);
  card.appendChild(info);
  return card;
}

/**
 * Limpia y muestra un conjunto de tarjetas en un contenedor.
 * @param {HTMLElement} cont
 * @param {HTMLElement[]} tarjetas
 */
export function renderizarTarjetas(cont, tarjetas) {
  cont.innerHTML = "";
  for (let i = 0; i < tarjetas.length; i++) cont.appendChild(tarjetas[i]);
}

/**
 * Muestra un mensaje de estado.
 * @param {HTMLElement} cont
 * @param {string} texto
 * @param {"ok"|"error"|"info"} tipo
 */
export function mostrarEstado(cont, texto, tipo = "info") {
  cont.textContent = texto;
  cont.classList.remove("ok","error");
  if (tipo === "ok") cont.classList.add("ok");
  if (tipo === "error") cont.classList.add("error");
}

/**
 * Capitaliza la primera letra.
 * @param {string} s
 */
export function capitalizar(s) {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}
