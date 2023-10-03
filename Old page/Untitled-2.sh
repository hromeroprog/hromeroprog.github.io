#!/bin/bash

# Crear la estructura de directorios
mkdir -p Personal-Website/css
mkdir -p Personal-Website/js/projects
mkdir -p Personal-Website/img
mkdir -p Personal-Website/projects
mkdir -p Personal-Website/curriculum
mkdir -p Personal-Website/assets/fonts
mkdir -p Personal-Website/assets/icons

# Crear archivos HTML
touch Personal-Website/index.html
touch Personal-Website/projects.html
touch Personal-Website/curriculum.html
touch Personal-Website/projects/mandelbrot.html
touch Personal-Website/projects/game-of-life.html
touch Personal-Website/projects/uni-project.html
touch Personal-Website/curriculum/index.html

# Crear archivos CSS
touch Personal-Website/css/main.css
touch Personal-Website/css/land-page.css
touch Personal-Website/css/projects.css
touch Personal-Website/css/curriculum.css

# Crear archivos JavaScript
touch Personal-Website/js/main.js
touch Personal-Website/js/projects/mandelbrot.js
touch Personal-Website/js/projects/game-of-life.js
touch Personal-Website/js/projects/uni-projects.js

# Crear archivo PDF de ejemplo para el currículum
touch Personal-Website/curriculum/your-cv.pdf

# Crear imágenes de muestra (vacías)
touch Personal-Website/img/profile.jpg
touch Personal-Website/img/project1.jpg
touch Personal-Website/img/project2.jpg

# Mostrar mensaje de finalización
echo "Estructura de archivos creada con éxito."
