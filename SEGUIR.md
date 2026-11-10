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

Al cambiar `game.js` o `style.css`, sube el `?v=` en `index.html` (ahora `style.css?v=44` y `game.js?v=77`) para saltar la caché. El espacio de trabajo de Cursor a veces sigue apuntando a la carpeta vieja `blox`; usa la ruta absoluta `.../brunux`.

## Cómo se juega ahora

Al abrir se está en una plaza andable. Delante hay cinco arcos, de izquierda a derecha: La fiesta, La cuesta, El puente, Las nubes y El globo. Pisar un arco abre su ficha, con Fácil, Normal y Difícil. A la izquierda, el puesto Tienda. A la derecha, el espejo Muñeco. Casa devuelve a la plaza, al punto de aparición. Si te caes en la plaza, reapareces ahí, no en el último punto del recorrido.

Flechas o WASD para andar, espacio para saltar. La cámara va detrás. Adelante es −Z. El muñeco tiene cara, gafas, mochila, camiseta con dibujo y un baile, además de pelo, piel, ropa y zapatos. Un sombrero, un rastro y una mascota se compran en la tienda. Hay música en la plaza y una melodía distinta en cada recorrido. Cada punto de control tiene una bandera, y al reaparecer sale una nubecilla.

Monedas y gemas se recogen en los recorridos y se guardan. La primera vez que terminas un mundo ganas su insignia. Cada camino terminado deja una estrella en el botón y en el arco (hasta tres). La insignia del mundo es la misma en los tres caminos. Un camino se puede volver a jugar desde el principio. Cada mundo acaba distinto: La fiesta en una tarta, La cuesta en una piscina de bolas, El puente en un cofre con bandera, Las nubes en una estrella con arcoíris y El globo en globos.

Los tres caminos, en los cinco mundos:

- Fácil es el recorrido de antes. La cuesta tiene una cinta y una rueda. El puente hace zigzag con una tabla. Las nubes sube entre nubes con un puf. La fiesta hace zigzag con una mesa que se mueve en Z. El globo tiene una cinta que empuja a la izquierda y un salto de lado.
- Normal aprieta ese mismo truco: plataformas más estrechas y la trampa del mundo repetida. Sigue siendo justo.
- Difícil mezcla cinta, tabla o mesa, rueda y puf, con los colores y el final del mundo. En El puente y El globo, la cinta deja al niño en el lado de la plataforma siguiente.

Las dos subidas altas de Las nubes en Fácil se bajaron un poco: había que saltar en el borde mismo. El zigzag de El puente, el salto de lado de El globo y la mesa de La fiesta en Fácil se dejan así. Sin temporizadores ni avisos que metan prisa.

Trampas, por si hay que tocarlas:

- Cinta (letrero «Cinta»): empuja en X y se para a 1,25 del borde. Pista: «La cinta empuja».
- Tabla o mesa (letrero «Tabla» o «Mesa»): se desliza. Si te caes estando en ella, reapareces encima. Pista: «La tabla se mueve» o «La mesa se mueve».
- Rueda: gira y empuja. La plataforma tiene que ser ancha (sobre 6,2) para que el empujón no tire al niño.
- Puf (letrero «Puf»): se pone naranja y desaparece un momento. No es punto de control; si te pilla, vuelves a la plataforma anterior. Pista: «¡Se esfuma!».

## Qué queda

Los puntos que había (muñeco, ficha, cinco mundos, tablón, música, bandera, rueda y tres caminos) ya están. No añadas un sexto mundo todavía. Cinco mundos por tres caminos son quince recorridos, y Bruno no los ha jugado. La plaza tiene los cinco arcos en una fila; otro arco obliga a rehacerla.

Cuando los termine y pida más, el mundo nuevo tiene que traer un truco que no sea cinta, tabla, rueda ni puf. En Difícil esos cuatro ya se repiten. Hasta entonces, estos recorridos dan para muchas tardes.

## Datos que no hay que romper

- Guardado en `localStorage`, clave `brunux-save-v1`. Forma: `{ look, coins, gems, badges, owned, gear, paths }`. `paths` guarda, por mundo, qué caminos están hechos (`corto` Fácil, `normal`, `largo` Difícil). Si hay insignia y ese mundo no tiene `paths`, la estrella cae en Fácil. No reescribas un `paths` que ya exista. Si `coins` es null y existen `ribbons`, las monedas son la suma de las cintas antiguas. `persist()` sustituye el objeto entero.
- No gastes las monedas de Natalia al probar la tienda. Si una prueba escribe el guardado, restaura el anterior.
- Aparición de la plaza: `{ x: 0, y: 6, z: 102 }`. Los portales están en z = 86: La fiesta x = −7,2, La cuesta x = −3,6, El puente x = 0, Las nubes x = 3,6, El globo x = 7,2. La tienda en x = −10, z = 99. El espejo en x = 10, z = 99. La plaza está lejos en +Z del recorrido para que la niebla los separe.
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
