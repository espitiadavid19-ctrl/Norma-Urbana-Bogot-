# Cómo pasar de datos de ejemplo a normativa oficial real

Esta app se entrega con una base de datos de **demostración** (`data.js`) para
que la interfaz funcione de inmediato. Para usarla frente a clientes reales,
necesitas conectar dos piezas que hoy están fuera del alcance de cualquier
app estática de un solo desarrollador, porque dependen de servicios
distritales:

## 1. Geocodificación (dirección → coordenada → UPZ/predio)

- El geocodificador oficial de Bogotá vive en **Mapas Bogotá** (SDP/IDECA),
  pero **solo está habilitado para funcionarios del Distrito con permisos
  previos** (inicio de sesión institucional). No es un servicio público
  abierto que una app externa pueda consumir libremente.
- Alternativas viables para producción:
  1. **Convenio o acceso institucional** con la SDP/IDECA si tu firma trabaja
     con la Alcaldía o tiene un proyecto que lo justifique — escribe a
     `icde@igac.gov.co` o revisa el portal de IDECA (`ideca.gov.co`).
  2. **Geocodificador comercial** (Google Maps Geocoding API, Mapbox, HERE)
     para pasar de dirección a coordenadas (lat/lon), y luego:
  3. **Cruce geoespacial propio** de esa coordenada contra las capas
     geográficas oficiales y abiertas de UPZ, tratamiento urbanístico y área
     de actividad, publicadas como datos abiertos por IDECA / Bogotá Data
     (`datosabiertos.bogota.gov.co`) — esto sí se puede automatizar con un
     backend (por ejemplo, Python + GeoPandas/Shapely, o PostGIS) que haga
     un "point-in-polygon" y devuelva la ficha correspondiente.
- El backend de ese cruce expondría un endpoint propio, por ejemplo
  `GET /api/normativa?direccion=...`, que `app.js` consumiría con `fetch()`
  en lugar de buscar en `DIRECCIONES_DEMO`.

## 2. Contenido normativo (tratamiento, usos, edificabilidad)

- La fuente legal madre es el **Decreto 555 de 2021** (texto completo en el
  enlace citado en `index.html`), pero el decreto define reglas *generales*
  por tratamiento y área de actividad — no da, artículo por artículo, la
  ficha final de un predio específico.
- La ficha final por predio la produce la SDP combinando el decreto con las
  fichas reglamentarias de cada UPZ y las capas geográficas del predio. La
  forma confiable de obtenerla es:
  - El **certificado de norma urbanística** o el concepto de la
    **curaduría urbana** para el predio puntual, o
  - El **visor normativo de la SDP**, para consulta manual por predio.
- Recomendación práctica: mantén `UPZ_DATABASE` en `data.js` (o muévela a una
  base de datos real) y ve completándola con la información oficial de cada
  UPZ a medida que la vayas verificando en proyectos reales, quitando el
  campo `fuente: "ejemplo"` solo cuando el dato ya esté verificado.

## 3. Dónde conectar el backend en el código actual

En `app.js`, la función `resolverDireccion()` es el único punto que debe
cambiar: hoy busca en un arreglo local; en producción debería ser una
función `async` que llame a tu API propia, por ejemplo:

```js
async function resolverDireccion(direccionRaw) {
  const resp = await fetch(`/api/normativa?direccion=${encodeURIComponent(direccionRaw)}`);
  if (!resp.ok) return null;
  return resp.json(); // debe devolver un objeto con la misma forma que UPZ_DATABASE
}
```

El resto de la interfaz (`renderResultado`, estilos, disclaimers) no
necesita cambios: fue diseñada para que el "sello" de la ficha diga
automáticamente si el dato es de ejemplo o si viene de una fuente marcada
como oficial (`ficha.fuente !== "ejemplo"`).
