# Prompt para seguir Brunux en otra sesión

Copia desde la línea siguiente y pégalo en el chat nuevo, con esta carpeta abierta.

---

Sigue el juego Brunux. Responde siempre en español. No hagas commit ni publiques nada salvo que yo lo pida. Si cambias la pantalla, pruébalo en el navegador antes de darlo por hecho.

## Qué es

Brunux es un juego de navegador, privado, para Bruno (7 años). Tiene que sentirse como un obby de Roblox para un niño, sin la marca Roblox: ni el nombre, ni el logo, ni el muñeco clásico, ni el sonido «oof», ni la palabra Blox. Sin cuentas, sin chat, sin otros jugadores reales y sin pagos.

Es una página estática de módulos ES. Three.js está en `vendor/three.module.js` (r170), importado directo, sin bundler ni import map. Carpeta del proyecto: `/Users/nataliasanchez/Fuentes/brunux`. El nombre público, si algún día se publica y yo lo pido, sería `nataliasa13.github.io/brunux/`.

## Cómo se abre

Desde la carpeta del proyecto:

```bash
python3 -m http.server 8753
```

Luego http://127.0.0.1:8753/

Al cambiar `game.js` o `style.css`, sube el `?v=` en `index.html` (ahora `style.css?v=15` y `game.js?v=25`) para saltar la caché. El espacio de trabajo de Cursor a veces sigue apuntando a la carpeta vieja `blox`; usa la ruta absoluta `.../brunux`.

## Cómo se juega ahora

Al abrir se está en una plaza andable. Delante hay tres arcos: La cuesta, El puente y Las nubes. Entrar en un arco empieza ese recorrido. A la izquierda, el puesto Tienda. A la derecha, el espejo Muñeco. Casa devuelve a la plaza, al punto de aparición. Si te caes en la plaza, reapareces ahí, no en el último punto del recorrido.

Flechas o WASD para andar, espacio para saltar. La cámara va detrás. Adelante es −Z. El muñeco tiene cabeza de esfera, camiseta, pantalón, zapatos y pelo editables. Un sombrero, un rastro y una mascota se compran en la tienda.

Monedas y gemas se recogen en los recorridos y se guardan. La primera vez que terminas un recorrido ganas su insignia, y el arco de la plaza enseña una estrella. Cada recorrido acaba distinto: La cuesta en una piscina de bolas, El puente en un cofre con bandera, Las nubes en una estrella con arcoíris.

Cada recorrido tiene un truco:

- La cuesta: una cinta (letrero «Cinta») que empuja hacia +X y se para antes del borde. Pista: «La cinta empuja».
- El puente: una tabla (letrero «Tabla») que se desliza en X. Si te caes estando en ella, reapareces encima. Pista: «La tabla se mueve».
- Las nubes: una nube (letrero «Puf») que se pone naranja y desaparece un momento. No es punto de control; si te pilla, vuelves a la plataforma anterior. Pista: «¡Se esfuma!».

## Qué queda, en este orden

1. Más muñeco: cara, gafas, mochila, una camiseta con dibujo y un gesto para saludar o bailar.
2. La ficha del juego: al pisar un arco, una tarjeta con el dibujo, el nombre y un botón grande de Jugar, en vez de entrar solo por rozar el suelo.
3. Dos recorridos más y un tablón de fotos en la plaza.
4. Música de la plaza y una melodía distinta en cada recorrido.
5. Una bandera en el punto de control y una nubecilla al reaparecer.
6. Una rueda que gira y empuja, en algún recorrido.
7. Tres caminos por mundo: Cortito, Normal y Largo. Se eligen en la ficha del arco (la que sale al pisarlo), sin menú extra. El Normal es el recorrido de hoy. El Cortito tiene menos saltos y casi sin trampas; el Largo añade plataformas, cintas y ruedas. Cada camino se puede jugar desde el principio y la insignia del mundo es la misma. Un camino completado deja una estrella en el arco. Empezar por La cuesta: montar Cortito y Largo, probarlo, y solo después hacerlo en los cinco mundos. Sin temporizadores ni avisos que metan prisa.

Empieza por el punto 1 salvo que yo pida otro.

## Datos que no hay que romper

- Guardado en `localStorage`, clave `brunux-save-v1`. Forma: `{ look, coins, gems, badges, owned, gear }`. Si `coins` es null y existen `ribbons`, las monedas son la suma de las cintas antiguas. `persist()` sustituye el objeto entero.
- No gastes las monedas de Natalia al probar la tienda. Si una prueba escribe el guardado, restaura el anterior.
- Aparición de la plaza: `{ x: 0, y: 6, z: 102 }`. Los portales están en z = 86. La tienda en x = −10, z = 99. El espejo en x = 10, z = 99. La plaza está lejos en +Z del recorrido para que la niebla los separe.
- Caer en un recorrido (y < 1.2) vuelve al último punto de control. Caer en la plaza vuelve a la aparición.
- Cerrar tienda o muñeco no teletransporta: la zona armada evita que se abra otra vez al momento. Casa sí lleva a la aparición.
- Física propia, sin motor: carrera 7, salto 11, gravedad −32. Un salto quieto dura unos 0,7 s, llega a unos 4,8 de largo y 1,9 de alto. Huecos seguros sobre 3,2–3,5 y subidas de hasta unos 1,4. La diagonal no se normaliza.
- Los sólidos del recorrido y los de la plaza van separados. `clearCourse` limpia el recorrido y no la plaza.
- Los desencadenantes (portal, tienda, espejo) no son suelo. Solo actúan al estar pisando y una vez hasta salir de la zona.
- En casa la cámara sigue al muñeco. En tienda y muñeco lo encuadra entero, por encima de la ficha, y solo ahí mira a la cámara.
- Hay código muerto del estornudo y el pompón (`achoo`). No lo borres si no estorba.
- Los muñecos quietos de la plaza tienen sus propios materiales, para que pintar al protagonista no los recoloree.

## Archivos

`index.html`, `style.css`, `game.js`, `vendor/three.module.js`. Casi toda la lógica está en `game.js`.
