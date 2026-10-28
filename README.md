# 🎬 WikiMovie

Aplicación web interactiva para descubrir y buscar películas populares en tiempo real utilizando la API de **[The Movie Database (TMDb)](https://www.themoviedb.org/)**.

[🇬🇧 Read English version](README.en.md)

![WikiMovie Preview](assets/img/bg-masthead.jpg)

---

## ✨ Características

- 🌟 **Películas Populares**: Catálogo actualizado al instante con los títulos más destacados del momento.
- 🔍 **Buscador Integrado**: Búsqueda en tiempo real por título con soporte para paginación y búsqueda al presionar `Enter`.
- 🎭 **Detalles Completos**: Ventana modal interactiva con póster en alta resolución, sinopsis completa, géneros, puntuación con estrellas, productoras, fecha de estreno y duración.
- 📱 **Diseño 100% Responsivo**: Adaptado para dispositivos móviles, tablets y ordenadores con Bootstrap 5 moderno.
- ⚡ **Deploy Automático**: Configurado para GitHub Pages con GitHub Actions (`.github/workflows/static.yml`).

---

## 🛠️ Tecnologías Utilizadas

- **HTML5** & **CSS3**
- **JavaScript (ES6+)** con Fetch API
- **Bootstrap 5.1** & **Bootstrap Icons**
- **The Movie Database (TMDb) REST API v3**
- **GitHub Pages** (Hosting estático)

---

## 🚀 Cómo Usar Localmente

1. Clona el repositorio:
   ```bash
   git clone https://github.com/zirryzero/WikiMovie.git
   cd WikiMovie
   ```

2. Abre `index.html` en tu navegador favorito, o utiliza una extensión de servidor local como [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) en VS Code.

> **Nota sobre la API Key**: La aplicación incluye por defecto una clave de demostración para TMDb. También puedes configurar tu propia clave gratuita registrándote en [themoviedb.org](https://www.themoviedb.org/documentation/api) y asignándola en `js/api.js` o mediante `localStorage.setItem('tmdb_api_key', 'TU_API_KEY')`.

---

## 🌐 Publicación en GitHub Pages

Este proyecto ya cuenta con el flujo automatizado en `.github/workflows/static.yml`:

1. Sube tus cambios a la rama principal (`main`):
   ```bash
   git add .
   git commit -m "feat: mejoras visuales, responsividad y preparacion publica"
   git push origin main
   ```
2. En tu repositorio en GitHub ve a **Settings** > **Pages**.
3. En **Source**, selecciona **GitHub Actions**.
4. ¡Tu sitio estará disponible públicamente en `https://zirryzero.github.io/WikiMovie/`!

---

## 👨‍💻 Autor

Desarrollado por **Harold David Pérez Ortega**  
- 💼 [LinkedIn](https://www.linkedin.com/in/harold-david-perez-ortega-857955121/)
- 🐙 [GitHub](https://github.com/zirryzero)

---

## 📄 Licencia

Este proyecto es de código abierto bajo la licencia MIT.

