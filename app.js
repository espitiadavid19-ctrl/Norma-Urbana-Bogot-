/**
 * app.js — Norma Urbana Bogotá
 * ------------------------------------------------------------------
 * Flujo:
 *   1. El usuario escribe una dirección en el buscador del hero.
 *   2. resolverDireccion() la normaliza y busca coincidencia en
 *      DIRECCIONES_DEMO (o, si se conecta, en un geocodificador real
 *      — ver INTEGRACIONES.md).
 *   3. Con la UPZ resuelta, se busca la ficha en UPZ_DATABASE.
 *   4. renderResultado() pinta la ficha completa (uso del suelo,
 *      tratamiento, índices, pestañas de marco normativo / decretos /
 *      restricciones, observaciones y entidades de control).
 * ------------------------------------------------------------------
 */

const els = {
  form: document.getElementById("search-form"),
  input: document.getElementById("address-input"),
  status: document.getElementById("status"),
  result: document.getElementById("result"),
  chips: document.querySelectorAll(".chip"),
};

els.form.addEventListener("submit", (e) => {
  e.preventDefault();
  ejecutarBusqueda(els.input.value);
});

els.chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    els.input.value = chip.dataset.address;
    ejecutarBusqueda(chip.dataset.address);
  });
});

function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quita tildes
    .trim();
}

/**
 * Busca la dirección en el índice demo. En una versión conectada a
 * datos reales, esta función se reemplaza por una llamada a un
 * geocodificador (async) que devuelva coordenadas, y luego un cruce
 * espacial contra la capa oficial de UPZ. Ver INTEGRACIONES.md.
 */
function resolverDireccion(direccionRaw) {
  const direccion = normalizar(direccionRaw);
  if (!direccion) return null;

  const coincidencia = DIRECCIONES_DEMO.find((d) =>
    direccion.includes(normalizar(d.patron))
  );
  if (!coincidencia) return null;

  const ficha = UPZ_DATABASE.find((u) => u.upz === coincidencia.upz);
  return ficha || null;
}

function ejecutarBusqueda(direccionRaw) {
  const direccion = (direccionRaw || "").trim();
  els.result.innerHTML = "";

  if (!direccion) {
    setStatus("Escribe una dirección para consultar.", "error");
    return;
  }

  setStatus("Buscando…", null);

  // Simulamos una respuesta rápida (en una integración real, aquí
  // iría el await a la API de geocodificación/normativa).
  window.requestAnimationFrame(() => {
    const ficha = resolverDireccion(direccion);

    if (!ficha) {
      setStatus(
        "No encontramos esa dirección en la base de datos de demostración. " +
          "Prueba con una de las direcciones de ejemplo, o conecta la app a " +
          "una fuente normativa real (ver INTEGRACIONES.md).",
        "error"
      );
      return;
    }

    setStatus(`Resultado encontrado para “${direccion}”.`, "ok");
    renderResultado(direccion, ficha);
    els.result.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function nuevaConsulta() {
  els.result.innerHTML = "";
  els.input.value = "";
  setStatus("", null);
  els.input.focus();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setStatus(msg, tone) {
  els.status.textContent = msg;
  if (tone) els.status.setAttribute("data-tone", tone);
  else els.status.removeAttribute("data-tone");
}

function renderResultado(direccionConsultada, ficha) {
  const tratamiento = TRATAMIENTOS_POT_555[ficha.tratamiento];
  const esEjemplo = ficha.fuente === "ejemplo";
  const idx = ficha.indices;

  const wrapper = document.createElement("article");
  wrapper.className = "card";
  wrapper.innerHTML = `
    <div class="card__topline">
      <span class="card__eyebrow">${circleIcon()} Dirección consultada</span>
      <button type="button" class="link-reset" onclick="nuevaConsulta()">${xIcon()} Nueva consulta</button>
    </div>

    <h2 class="card__address">${escapeHtml(direccionConsultada)}</h2>

    <div class="badge-row">
      <span class="badge badge--blue">Localidad: ${escapeHtml(ficha.localidad)}</span>
      <span class="badge badge--blue">UPZ ${escapeHtml(ficha.upz)} · ${escapeHtml(ficha.upzNombre)}</span>
      <span class="badge badge--gray">Barrio: ${escapeHtml(ficha.barrio)}</span>
    </div>

    <div class="notice notice--warn">
      <span class="notice__icon">${warnIcon()}</span>
      <p>
        <strong>Aviso importante:</strong> esta información es orientativa y se
        basa en la norma general vigente. Para obtener la norma específica del
        predio, solicite el <strong>Certificado de Normativa Urbanística</strong>
        ante la Curaduría Urbana o la Secretaría Distrital de Planeación (SDP).
        La normativa puede variar por plan parcial, norma especial de sector o
        acto administrativo particular.
      </p>
    </div>

    <div class="grid-2">
      <div class="panel">
        <div class="panel__label">Uso del suelo</div>
        <span class="pill pill--purple">${escapeHtml(ficha.usoSuelo)}</span>

        <hr class="panel__divider">

        <div class="panel__label">Tratamiento urbanístico</div>
        <div class="tratamiento-row">
          <span class="pill pill--outline-blue">${escapeHtml(tratamiento.nombre.toUpperCase())}</span>
          <span class="tratamiento-desc">${escapeHtml(tratamientoCorto(ficha))}</span>
        </div>
      </div>

      <div class="panel panel--dark">
        <div class="panel__label panel__label--light">Código catastral</div>
        <div class="catastral-code">${escapeHtml(ficha.codigoCatastral)}</div>
        <div class="panel__hint">Número de referencia catastral. Verificar en UAECD.</div>

        <hr class="panel__divider panel__divider--dark">

        <div class="panel__label panel__label--light">Fuente POT</div>
        <div class="fuente-decreto">Decreto 555 de 2021</div>
        <div class="panel__hint">SDP Bogotá D.C.</div>
      </div>
    </div>

    <div class="section-label">Índices y parámetros urbanísticos</div>
    <div class="stat-grid">
      ${statCard("Índice ocupación", idx.ocupacion, "Máx. del lote")}
      ${statCard("Índice construcción", idx.construccion, "Veces el área")}
      ${statCard("Altura máxima", idx.alturaMaxima, idx.alturaMetros)}
      ${statCard("Ais. frontal", idx.aisFrontal, "Antejardín")}
      ${statCard("Ais. lateral", idx.aisLateral, "Entre predios")}
      ${statCard("Ais. posterior", idx.aisPosterior, "Fondo de lote")}
      ${statCard("Área mínima lote", idx.areaMinimaLote, "Loteo mínimo")}
      ${statCard("Frente mínimo", idx.frenteMinimo, "Fachada principal")}
      ${statCard("Cesión pública", idx.cesionPublica, "Del área bruta")}
    </div>

    <div class="tabs">
      <div class="tabs__nav" role="tablist">
        <button type="button" class="tab is-active" data-tab="marco" role="tab">Marco normativo</button>
        <button type="button" class="tab" data-tab="decretos" role="tab">Decretos aplicables</button>
        <button type="button" class="tab" data-tab="restricciones" role="tab">Restricciones</button>
      </div>

      <div class="tabs__panel" data-panel="marco">
        <ol class="numbered-list">
          ${ficha.decretosAplicables.map((d) => `<li><span class="num-badge"></span>${escapeHtml(d)}</li>`).join("")}
        </ol>
      </div>

      <div class="tabs__panel" data-panel="decretos" hidden>
        <ol class="numbered-list">
          ${ficha.decretosAplicables.map((d) => `<li><span class="num-badge"></span>${escapeHtml(d)}</li>`).join("")}
        </ol>
      </div>

      <div class="tabs__panel" data-panel="restricciones" hidden>
        <ul class="warn-list-plain">
          ${ficha.restricciones.map((r) => `<li>${escapeHtml(r)}</li>`).join("")}
        </ul>
      </div>
    </div>

    <div class="notice notice--info">
      <span class="notice__icon">${infoIcon()}</span>
      <p><strong>Observaciones técnicas</strong><br>${escapeHtml(ficha.observacionesTecnicas)}</p>
    </div>

    <div class="section-label">Entidades de control y regulación</div>
    <div class="entities-grid">
      ${ENTIDADES_CONTROL.map(
        (e) => `
        <div class="entity-card">
          <span class="entity-card__icon">${escapeHtml(e.sigla.slice(0, 4))}</span>
          <span>
            <div class="entity-card__sigla">${escapeHtml(e.sigla)}</div>
            <div class="entity-card__nombre">${escapeHtml(e.nombre)}</div>
          </span>
        </div>`
      ).join("")}
    </div>

    <div class="card__foot">
      <p class="disclaimer-inline">
        ${esEjemplo
          ? "Los valores de esta ficha son de <strong>ejemplo</strong> (demostración de estructura). Reemplácelos por datos oficiales antes de presentarlos a un cliente."
          : "Ficha con fuente marcada como oficial."}
      </p>
      <button class="print-btn" type="button" onclick="window.print()">Imprimir / PDF para el cliente</button>
    </div>
  `;

  els.result.appendChild(wrapper);
  wireTabs(wrapper);
}

function tratamientoCorto(ficha) {
  // Frase corta tipo "Consolidación Urbanística con densificación moderada"
  const nombre = TRATAMIENTOS_POT_555[ficha.tratamiento].nombre;
  return `${nombre} urbanística — ver resumen del tratamiento en la ficha oficial`;
}

function statCard(label, value, sub) {
  return `
    <div class="stat-card">
      <div class="stat-card__label">${escapeHtml(label)}</div>
      <div class="stat-card__value">${escapeHtml(value)}</div>
      <div class="stat-card__sub">${escapeHtml(sub)}</div>
    </div>
  `;
}

function wireTabs(scope) {
  const tabs = scope.querySelectorAll(".tab");
  const panels = scope.querySelectorAll(".tabs__panel");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("is-active"));
      tab.classList.add("is-active");
      panels.forEach((p) => {
        p.hidden = p.dataset.panel !== tab.dataset.tab;
      });
    });
  });
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str == null ? "" : String(str);
  return div.innerHTML;
}

/* ---- iconos inline (sin dependencias externas) ---- */
function circleIcon() {
  return '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/></svg>';
}
function xIcon() {
  return '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>';
}
function warnIcon() {
  return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 9v4M12 17h.01M10.3 3.9L2.6 18a1.5 1.5 0 0 0 1.3 2.3h16.2a1.5 1.5 0 0 0 1.3-2.3L13.7 3.9a1.5 1.5 0 0 0-2.6 0z"/></svg>';
}
function infoIcon() {
  return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v5h1"/></svg>';
}
