# Portafolio — Franco Indaburu

Sitio personal de portafolio, construido con HTML, CSS y JavaScript puro (sin frameworks ni build step). Tema visual inspirado en un editor de código.

## Desarrollo local

No requiere instalación. Basta con abrir `index.html` en el navegador, o servirlo con cualquier servidor estático, por ejemplo:

```bash
npx serve .
```

## Estructura

- `index.html` — contenido y estructura de todas las secciones.
- `styles.css` — estilos, tema oscuro tipo editor de código.
- `script.js` — efecto de tipeo en el hero, menú móvil, scroll reveal y envío del formulario de contacto.
- `logo.png` — logo/favicon.
- `robots.txt`, `sitemap.xml` — SEO básico.

## Contacto

El formulario de la sección "Contacto" envía a [Formspree](https://formspree.io). El endpoint se configura en el atributo `action` del `<form id="contact-form">` en `index.html`.

## Despliegue

Publicado en [Vercel](https://vercel.com), conectado a este repositorio: cada push a `main` dispara un deploy automático.
