# Brunux

Juego de obstáculos para el navegador, de un solo jugador. Cinco mundos, cada uno con tres caminos: Fácil, Normal y Difícil. Se puede cambiar el idioma entre inglés y español. El inglés es el de partida.

No hay cuentas, ni chat, ni otros jugadores. Las monedas, las gemas y el muñeco se guardan en ese navegador.

## Cómo abrirlo

Hace falta un servidor local, porque el juego usa módulos de JavaScript:

```bash
python3 -m http.server 8753
```

Luego abre http://127.0.0.1:8753/

En GitHub Pages el sitio es la raíz del repositorio: https://nataliasa13.github.io/brunux/

## Cómo se juega

Camina hasta un arco y elige un camino. Flechas o WASD para moverse, espacio para saltar. En el móvil están los botones de la pantalla. ES / EN, arriba a la derecha, cambia el idioma y recuerda la elección.

## Créditos

El dibujo 3D usa [Three.js](https://github.com/mrdoob/three.js) r170, licencia MIT, incluido en `vendor/three.module.js`. La letra es [Fredoka](https://fonts.google.com/specimen/Fredoka), de Google Fonts.
