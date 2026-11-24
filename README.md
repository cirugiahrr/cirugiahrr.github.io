# Cursos de Actualización en Cirugía Pediátrica · HRR

Sitio estático (HTML + JS sin dependencias) para GitHub Pages. Todo el contenido está en archivos JSON; no hay que tocar el HTML para publicar un curso nuevo.

```
index.html                 ← curso actual (o cualquier curso con ?curso=<id>)
archivo.html               ← lista de cursos anteriores
assets/
  estilos.css
  app.js
  logos/hrr.png            ← SUBIR logo HRR (PNG fondo transparente, ~200 px alto)
  logos/uchile.png         ← SUBIR logo U. de Chile
cursos/
  index.json               ← lista de cursos + cuál es el "actual"
  proximo/curso.json       ← curso en preparación
  2026-07-hirschsprung/curso.json
```

## Publicar en GitHub Pages

1. Crear un repositorio (ej. `curso-cirugia-hrr`) y subir todo el contenido de esta carpeta.
2. *Settings → Pages → Build and deployment*: Source = **Deploy from a branch**, rama `main`, carpeta `/ (root)`.
3. La página queda en `https://<usuario>.github.io/curso-cirugia-hrr/`.
4. (Opcional) Dominio propio: *Settings → Pages → Custom domain*.

## Completar el próximo curso

Editar `cursos/proximo/curso.json`. Campos principales:

| Campo | Qué va |
|---|---|
| `titulo`, `serie` | Tema del curso y nombre de la serie |
| `fecha` | `AAAA-MM-DD` (dejar `""` mientras no esté definida; se muestra `fechaTexto`) |
| `horaInicio`, `horaFin` | `"08:00"`, `"13:30"` |
| `lugar` | nombre, detalle, dirección y link a Google Maps |
| `links.inscripcion` | Google Form de inscripción |
| `links.transmision` | plataforma, url, id y clave (Zoom/Meet/YouTube) |
| `links.retroalimentacion` | Formulario de retroalimentación (requisito del certificado) |
| `links.encuestas` | Lista de encuestas `{ "titulo", "url" }` |
| `links.materialCarpeta` | Carpeta de Drive con el material |
| `links.grabacion` | Video del curso (se muestra una vez realizado) |
| `logistica` | Tarjetas de café, almuerzo, estacionamiento, acceso, wifi (`icono`: `cafe`, `almuerzo`, `estacionamiento`, `acceso`, `wifi`, `info`) |
| `programa` | Bloques `{ inicio, fin, titulo, docente, nota }`; usar `"tipo": "pausa"` para café/acreditación |
| `material` | Documentos sueltos `{ titulo, url, detalle }` |
| `instituciones` | `{ nombre, logo }` (logo opcional) |

Un link vacío (`""`) aparece como botón gris "Próximamente", así que se puede publicar la página antes de tener todos los enlaces.

**Material bibliográfico:** el repositorio de GitHub Pages es público. Los artículos con derechos de autor conviene dejarlos en una carpeta de Drive restringida a los inscritos y poner solo el link en `materialCarpeta`.

## Comportamiento automático

- Antes del curso: inscripción, conexión en línea, botón "Agregar al calendario" (.ics), información práctica.
- El día del curso: etiqueta "Hoy" y el bloque del programa en curso se resalta.
- Después del curso: se ocultan inscripción y logística; quedan programa, material, grabación y retroalimentación.

## Archivar un curso y crear el siguiente

1. Renombrar la carpeta `cursos/proximo` con un id definitivo, ej. `cursos/2027-04-trauma`, y actualizar su `"id"` dentro de `curso.json`.
2. Copiar esa carpeta como nueva `cursos/proximo` (o con su id) y editar los datos.
3. En `cursos/index.json`: agregar el nuevo curso a `cursos` y poner su id en `"actual"`.

Los cursos anteriores quedan accesibles en `archivo.html` y en `index.html?curso=<id>`.

## Probar en el computador

Los navegadores bloquean la lectura de JSON al abrir `index.html` con doble clic. Desde la carpeta:

```bash
python3 -m http.server 8000
# abrir http://localhost:8000
```
