/* Cursos de Actualización en Cirugía Pediátrica · HRR
   Sitio estático: todo el contenido vive en cursos/index.json y cursos/<id>/curso.json */

const $ = (s, el = document) => el.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const ICONOS = {
  fecha: '<path d="M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"/>',
  hora: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  lugar: '<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>',
  modalidad: '<rect x="3.5" y="5" width="17" height="11" rx="1.5"/><path d="M9 20h6M12 16v4"/>',
  cafe: '<path d="M5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5V9z"/><path d="M16 10.5h1.5a2.5 2.5 0 0 1 0 5H16M8 3.5c0 1 1 1.3 1 2.5M11.5 3.5c0 1 1 1.3 1 2.5"/>',
  almuerzo: '<path d="M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10M17 21V3c-2 1-3 4-3 7h3"/>',
  estacionamiento: '<rect x="4" y="4" width="16" height="16" rx="2.5"/><path d="M10 16.5V7.5h3a2.6 2.6 0 0 1 0 5.2h-3"/>',
  acceso: '<rect x="4" y="6" width="16" height="12" rx="1.5"/><circle cx="9" cy="11.5" r="2"/><path d="M6.5 15.5c.6-1.2 1.5-1.8 2.5-1.8s1.9.6 2.5 1.8M14 10h3.5M14 13h3.5"/>',
  wifi: '<path d="M3.5 9.5a12 12 0 0 1 17 0M6.5 12.7a7.6 7.6 0 0 1 11 0M9.5 15.8a3.3 3.3 0 0 1 5 0"/><circle cx="12" cy="18.6" r=".9"/>',
  info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 8h.01"/>',
  video: '<rect x="3.5" y="6.5" width="12" height="11" rx="1.5"/><path d="M15.5 10.5l5-3v9l-5-3"/>',
  formulario: '<rect x="5" y="3.5" width="14" height="17" rx="1.5"/><path d="M8.5 8h7M8.5 12h7M8.5 16h4"/>',
  libro: '<path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5zM20 5.5A1.5 1.5 0 0 0 18.5 4H13v16h5.5a1.5 1.5 0 0 0 1.5-1.5z"/>',
  carpeta: '<path d="M3.5 7a1.5 1.5 0 0 1 1.5-1.5h4l2 2h8a1.5 1.5 0 0 1 1.5 1.5v8.5A1.5 1.5 0 0 1 19 19H5a1.5 1.5 0 0 1-1.5-1.5z"/>',
  calendario: '<path d="M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM12 12v5M9.5 14.5h5"/>',
  flecha: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  copiar: '<rect x="8" y="8" width="12" height="12" rx="1.5"/><path d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8"/>'
};
const ico = (n) => `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true">${ICONOS[n] || ICONOS.info}</svg>`;

/* ---------- utilidades de fecha ---------- */
function fechaLarga(c) {
  if (!c.fecha) return c.fechaTexto || 'Fecha por confirmar';
  const [y, m, d] = c.fecha.split('-').map(Number);
  const s = new Date(y, m - 1, d).toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  return s.charAt(0).toUpperCase() + s.slice(1);
}
function fechaCorta(c) {
  if (!c.fecha) return c.fechaTexto || 'Por confirmar';
  const [y, m, d] = c.fecha.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('es-CL', { day: 'numeric', month: 'short', year: 'numeric' });
}
function yaPaso(c) {
  if (!c.fecha) return false;
  return new Date(`${c.fecha}T${c.horaFin || '23:59'}:00`) < new Date();
}
function esHoy(c) {
  if (!c.fecha) return false;
  const h = new Date();
  const hoy = `${h.getFullYear()}-${String(h.getMonth() + 1).padStart(2, '0')}-${String(h.getDate()).padStart(2, '0')}`;
  return hoy === c.fecha;
}
function ahoraHHMM() {
  const h = new Date();
  return `${String(h.getHours()).padStart(2, '0')}:${String(h.getMinutes()).padStart(2, '0')}`;
}

/* ---------- carga de datos ---------- */
async function getJSON(url) {
  const r = await fetch(url, { cache: 'no-cache' });
  if (!r.ok) throw new Error(`No se pudo cargar ${url} (${r.status})`);
  return r.json();
}

/* ---------- piezas comunes ---------- */
function logoImg(src, nombre, clase = 'logo') {
  if (!src) return `<span class="${clase} logo-ph">${esc(nombre)}</span>`;
  return `<img class="${clase}" src="${esc(src)}" alt="${esc(nombre)}" loading="lazy"
    onerror="this.outerHTML='<span class=&quot;${clase} logo-ph&quot;>'+this.alt+'</span>'">`;
}

function boton(url, texto, icono, variante = '') {
  if (!url) return `<span class="btn btn-off ${variante}" title="Se publicará próximamente">${ico(icono)}<span>${esc(texto)}<small>Próximamente</small></span></span>`;
  return `<a class="btn ${variante}" href="${esc(url)}" target="_blank" rel="noopener">${ico(icono)}<span>${esc(texto)}</span></a>`;
}

function cabecera(sitio) {
  const el = $('#logos-cabecera');
  if (el) el.innerHTML = (sitio.logos || []).map((l) => logoImg(l.archivo, l.nombre, 'logo-cab')).join('') +
    `<span class="marca-txt">${esc(sitio.nombre)}</span>`;
  const pie = $('#pie');
  if (pie) pie.innerHTML = `
    <div class="pie-logos">${(sitio.logos || []).map((l) => logoImg(l.archivo, l.nombre, 'logo-pie')).join('')}</div>
    <p><strong>${esc(sitio.organiza)}</strong></p>
    ${sitio.contacto ? `<p>Contacto: <a href="mailto:${esc(sitio.contacto)}">${esc(sitio.contacto)}</a></p>` : ''}
    <p><a href="archivo.html">Ver cursos anteriores</a></p>`;
}

/* ---------- calendario (.ics) ---------- */
function descargarICS(c) {
  const f = c.fecha.replace(/-/g, '');
  const t = (h) => (h || '08:00').replace(':', '') + '00';
  const lugar = [c.lugar?.nombre, c.lugar?.detalle, c.lugar?.direccion].filter(Boolean).join(', ');
  const url = location.href.split('#')[0];
  const ics = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//HRR//Curso Cirugia Pediatrica//ES', 'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${c.id}@curso-cirugia-hrr`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    `DTSTART;TZID=America/Santiago:${f}T${t(c.horaInicio)}`,
    `DTEND;TZID=America/Santiago:${f}T${t(c.horaFin)}`,
    `SUMMARY:${(c.serie ? c.serie + ': ' : '') + c.titulo}`,
    `LOCATION:${lugar.replace(/,/g, '\\,')}`,
    `DESCRIPTION:Programa y enlaces: ${url}`,
    'END:VEVENT', 'END:VCALENDAR'
  ].join('\r\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
  a.download = `${c.id}.ics`;
  a.click();
}

/* ---------- secciones del curso ---------- */
function secHero(c, pasado, archivado) {
  const L = c.links || {};
  const estado = pasado
    ? `<span class="chip chip-gris">Curso realizado</span>`
    : esHoy(c) ? `<span class="chip chip-vivo">Hoy</span>` : `<span class="chip">Próximo curso</span>`;
  const acciones = pasado
    ? [boton(L.grabacion, 'Ver grabación', 'video', 'btn-claro'), boton(L.materialCarpeta, 'Material del curso', 'carpeta', 'btn-claro')].join('')
    : [
        boton(L.inscripcion, 'Inscribirse', 'formulario', 'btn-principal'),
        boton(L.transmision?.url, 'Conectarse en línea', 'video', 'btn-claro'),
        c.fecha ? `<button class="btn btn-claro" id="btn-ics">${ico('calendario')}<span>Agregar al calendario</span></button>` : ''
      ].join('');
  return `
  <section class="hero">
    <div class="contenedor">
      ${archivado ? `<a class="volver" href="archivo.html">← Cursos anteriores</a>` : ''}
      ${estado}
      <p class="serie">${esc(c.serie || '')}</p>
      <h1>${esc(c.titulo)}</h1>
      <ul class="datos">
        <li>${ico('fecha')}<span>${esc(fechaLarga(c))}</span></li>
        <li>${ico('hora')}<span>${esc(c.horaInicio || '')}${c.horaFin ? ' – ' + esc(c.horaFin) : ''} h</span></li>
        <li>${ico('lugar')}<span>${esc(c.lugar?.nombre || '')}${c.lugar?.detalle ? ', ' + esc(c.lugar.detalle) : ''}</span></li>
        ${c.modalidad ? `<li>${ico('modalidad')}<span>${esc(c.modalidad)}</span></li>` : ''}
      </ul>
      <div class="acciones">${acciones}</div>
    </div>
  </section>`;
}

function secInfo(c) {
  const log = (c.logistica || []).map((x) => `
    <div class="tarjeta">
      <div class="tarjeta-ico">${ico(x.icono)}</div>
      <div><h3>${esc(x.titulo)}</h3><p>${esc(x.texto)}</p></div>
    </div>`).join('');
  const lugar = c.lugar || {};
  return `
  <section class="seccion" id="info">
    <div class="contenedor">
      <h2>Información práctica</h2>
      <div class="info-grid">
        <div class="tarjeta tarjeta-lugar">
          <div class="tarjeta-ico">${ico('lugar')}</div>
          <div>
            <h3>${esc(lugar.nombre || 'Lugar')}</h3>
            <p>${esc(lugar.detalle || '')}${lugar.direccion ? '<br>' + esc(lugar.direccion) : ''}</p>
            ${lugar.mapa ? `<a class="enlace" href="${esc(lugar.mapa)}" target="_blank" rel="noopener">Ver en el mapa ${ico('flecha')}</a>` : ''}
          </div>
        </div>
        ${log}
      </div>
    </div>
  </section>`;
}

function secPrograma(c) {
  const vivo = esHoy(c) ? ahoraHHMM() : null;
  const filas = (c.programa || []).map((p) => {
    const ahora = vivo && p.inicio <= vivo && vivo < p.fin;
    return `
      <li class="bloque ${p.tipo === 'pausa' ? 'bloque-pausa' : ''} ${ahora ? 'bloque-ahora' : ''}">
        <div class="bloque-hora">${esc(p.inicio)}<span>${esc(p.fin)}</span></div>
        <div class="bloque-txt">
          <h3>${esc(p.titulo)}${ahora ? ' <span class="chip chip-vivo">Ahora</span>' : ''}</h3>
          ${p.docente ? `<p class="docente">${esc(p.docente)}</p>` : ''}
          ${p.nota ? `<p class="nota">${esc(p.nota)}</p>` : ''}
        </div>
      </li>`;
  }).join('');
  return `
  <section class="seccion seccion-alt" id="programa">
    <div class="contenedor">
      <h2>Programa</h2>
      ${c.formato ? `<p class="intro">${esc(c.formato)}</p>` : ''}
      <ol class="programa">${filas}</ol>
    </div>
  </section>`;
}

function secAcerca(c) {
  const objs = (c.objetivosEspecificos || []).map((o) => `<li>${esc(o)}</li>`).join('');
  const dato = (t, v) => (v ? `<div><dt>${t}</dt><dd>${esc(v)}</dd></div>` : '');
  return `
  <section class="seccion" id="acerca">
    <div class="contenedor acerca">
      <div>
        <h2>Sobre el curso</h2>
        ${c.objetivoGeneral ? `<p class="intro">${esc(c.objetivoGeneral)}</p>` : ''}
        ${objs ? `<h3 class="sub">Objetivos específicos</h3><ul class="lista">${objs}</ul>` : ''}
      </div>
      <dl class="ficha">
        ${dato('Dirección', (c.directores || []).join(' · '))}
        ${dato('Hospital invitado', c.hospitalInvitado)}
        ${dato('Dirigido a', c.destinatarios)}
        ${dato('Horas', c.horasPedagogicas)}
        ${dato('Evaluación', c.evaluacion)}
        ${dato('Certificación', c.certificacion)}
      </dl>
    </div>
  </section>`;
}

function secEnlaces(c, pasado) {
  const L = c.links || {};
  const T = L.transmision || {};
  const encuestas = (L.encuestas || []).map((e) => boton(e.url, e.titulo, 'formulario')).join('');
  const datosZoom = (T.id || T.clave) ? `
      <p class="zoom">
        ${T.id ? `ID de reunión: <code>${esc(T.id)}</code> <button class="mini" data-copiar="${esc(T.id)}" aria-label="Copiar ID">${ico('copiar')}</button>` : ''}
        ${T.clave ? `&nbsp; Clave: <code>${esc(T.clave)}</code> <button class="mini" data-copiar="${esc(T.clave)}" aria-label="Copiar clave">${ico('copiar')}</button>` : ''}
      </p>` : '';
  return `
  <section class="seccion seccion-alt" id="enlaces">
    <div class="contenedor">
      <h2>${pasado ? 'Grabación y retroalimentación' : 'Conexión en línea y retroalimentación'}</h2>
      <div class="enlaces-grid">
        <div class="panel">
          <h3>${ico('video')} ${pasado ? 'Grabación' : 'Transmisión' + (T.plataforma ? ' por ' + esc(T.plataforma) : '')}</h3>
          ${pasado
            ? `<p>Si el curso fue grabado, el enlace queda aquí.</p>${boton(L.grabacion, 'Ver grabación', 'video', 'btn-principal')}`
            : `<p>El enlace se activa el día del curso. Conéctate 10 minutos antes y usa tu nombre completo para registrar la asistencia.</p>
               ${boton(T.url, 'Entrar a la transmisión', 'video', 'btn-principal')}${datosZoom}`}
        </div>
        <div class="panel">
          <h3>${ico('formulario')} Retroalimentación y encuestas</h3>
          <p>${esc(c.certificacion || 'Completa la retroalimentación al terminar el curso.')}</p>
          ${boton(L.retroalimentacion, 'Formulario de retroalimentación', 'formulario', 'btn-principal')}
          ${encuestas ? `<div class="pila">${encuestas}</div>` : ''}
        </div>
      </div>
    </div>
  </section>`;
}

function secMaterial(c) {
  const L = c.links || {};
  const items = (c.material || []).map((m) => `
    <li>
      ${ico('libro')}
      <div>
        ${m.url ? `<a href="${esc(m.url)}" target="_blank" rel="noopener">${esc(m.titulo)}</a>` : `<span>${esc(m.titulo)}</span> <small class="pronto">Próximamente</small>`}
        ${m.detalle ? `<p>${esc(m.detalle)}</p>` : ''}
      </div>
    </li>`).join('');
  return `
  <section class="seccion" id="material">
    <div class="contenedor">
      <h2>Material de estudio</h2>
      <p class="intro">El material bibliográfico se comparte con los inscritos la semana previa al curso. Las presentaciones se agregan aquí después del curso, con autorización de cada docente.</p>
      <div class="material">
        ${boton(L.materialCarpeta, 'Abrir carpeta de material', 'carpeta', 'btn-principal')}
        ${items ? `<ul class="docs">${items}</ul>` : ''}
      </div>
    </div>
  </section>`;
}

function secInstituciones(c) {
  if (!(c.instituciones || []).length) return '';
  return `
  <section class="seccion seccion-alt" id="instituciones">
    <div class="contenedor">
      <h2>Instituciones asociadas</h2>
      <ul class="instituciones">
        ${c.instituciones.map((i) => `<li>${logoImg(i.logo, i.nombre, 'logo-inst')}<span>${esc(i.nombre)}</span></li>`).join('')}
      </ul>
    </div>
  </section>`;
}

/* ---------- páginas ---------- */
async function paginaCurso(indice) {
  const id = new URLSearchParams(location.search).get('curso') || indice.actual;
  const c = await getJSON(`cursos/${encodeURIComponent(id)}/curso.json`);
  const pasado = yaPaso(c);
  const archivado = id !== indice.actual;
  document.title = `${c.titulo} · Cirugía Pediátrica HRR`;

  $('#app').innerHTML = [
    secHero(c, pasado, archivado),
    pasado ? '' : secInfo(c),
    secPrograma(c),
    secEnlaces(c, pasado),
    secMaterial(c),
    secAcerca(c),
    secInstituciones(c)
  ].join('');

  $('#btn-ics')?.addEventListener('click', () => descargarICS(c));
  document.querySelectorAll('[data-copiar]').forEach((b) =>
    b.addEventListener('click', () => {
      navigator.clipboard?.writeText(b.dataset.copiar);
      b.classList.add('ok');
      setTimeout(() => b.classList.remove('ok'), 1200);
    }));
}

async function paginaArchivo(indice) {
  const cursos = await Promise.all(indice.cursos.map(async (e) => {
    try { return { ...e, ...(await getJSON(`cursos/${e.id}/curso.json`)) }; } catch { return e; }
  }));
  const anteriores = cursos.filter((c) => c.id !== indice.actual)
    .sort((a, b) => (b.fecha || '').localeCompare(a.fecha || ''));
  const actual = cursos.find((c) => c.id === indice.actual);

  const tarjeta = (c) => `
    <a class="curso-card" href="./?curso=${encodeURIComponent(c.id)}">
      <span class="curso-fecha">${esc(fechaCorta(c))}</span>
      <h3>${esc(c.titulo)}</h3>
      ${c.directores ? `<p>${esc(c.directores.join(' · '))}</p>` : ''}
      <span class="enlace">Ver programa y material ${ico('flecha')}</span>
    </a>`;

  $('#app').innerHTML = `
    <section class="hero hero-bajo">
      <div class="contenedor">
        <p class="serie">Archivo</p>
        <h1>Cursos anteriores</h1>
        <p class="hero-txt">Programa, material y grabaciones de cada versión del curso de actualización.</p>
      </div>
    </section>
    <section class="seccion">
      <div class="contenedor">
        ${actual ? `<p class="aviso">Próximo curso: <a href="./">${esc(actual.titulo)}</a> · ${esc(fechaCorta(actual))}</p>` : ''}
        ${anteriores.length ? `<div class="cursos-grid">${anteriores.map(tarjeta).join('')}</div>` : '<p>Aún no hay cursos anteriores.</p>'}
      </div>
    </section>`;
}

(async function init() {
  try {
    const indice = await getJSON('cursos/index.json');
    cabecera(indice.sitio || {});
    if (document.body.dataset.page === 'archivo') await paginaArchivo(indice);
    else await paginaCurso(indice);
  } catch (e) {
    console.error(e);
    $('#app').innerHTML = `<div class="contenedor seccion"><h2>No se pudo cargar la información</h2>
      <p>${esc(e.message)}</p>
      <p class="nota">Si abriste el archivo directamente desde tu computador, usa un servidor local (ver README) o la versión publicada en GitHub Pages.</p></div>`;
  }
})();
