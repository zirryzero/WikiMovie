# 🎬 WikiMovie

An interactive web application to discover and search for popular and trending movies in real time, powered by **[The Movie Database (TMDb) API](https://www.themoviedb.org/)**.

[🇪🇸 Leer versión en Español](README.md)

![WikiMovie Preview](assets/img/bg-masthead.jpg)

---

## ✨ Features

- 🌟 **Popular Movies**: Instantly updated catalog showcasing the most trending movies of the moment.
- 🔍 **Integrated Search**: Real-time search by movie title with pagination support and search-on-`Enter` keypress.
- 🎭 **Comprehensive Movie Details**: Interactive modal view featuring high-resolution posters, full synopsis, movie genres, star ratings, production companies, release date, and runtime.
- 📱 **Fully Responsive Design**: Optimized across mobile phones, tablets, and desktop computers using modern Bootstrap 5 styling.
- ⚡ **Automated Deployment**: Configured for continuous deployment to GitHub Pages using GitHub Actions (`.github/workflows/static.yml`).

---

## 🛠️ Built With

- **HTML5** & **CSS3**
- **JavaScript (ES6+)** with Fetch API
- **Bootstrap 5.1** & **Bootstrap Icons**
- **The Movie Database (TMDb) REST API v3**
- **GitHub Pages** (Static hosting)

---

## 🚀 Getting Started Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/zirryzero/WikiMovie.git
   cd WikiMovie
   ```

2. Open `index.html` in your favorite web browser, or launch it with a local server extension such as [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in VS Code.

> **API Key Note**: The application includes a default demo key for TMDb. You can also configure your own free key by registering at [themoviedb.org](https://www.themoviedb.org/documentation/api) and setting it in `js/api.js` or via your browser console: `localStorage.setItem('tmdb_api_key', 'YOUR_API_KEY')`.

---

## 🌐 Deploy to GitHub Pages

This project is pre-configured with automated CI/CD in `.github/workflows/static.yml`:

1. Push your changes to the main branch:
   ```bash
   git add .
   git commit -m "feat: add english readme and documentation"
   git push origin main
   ```
2. In your GitHub repository, go to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. Your website will be live at `https://zirryzero.github.io/WikiMovie/`!

---

## 👨‍💻 Author

Developed by **Harold David Pérez Ortega**  
- 💼 [LinkedIn](https://www.linkedin.com/in/harold-perez-ortega-857955121/)
- 🐙 [GitHub](https://github.com/zirryzero)

---

## 📄 License

This project is open-source and licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

