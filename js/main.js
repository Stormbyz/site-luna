/* LUNA CREATIVE STUDIO — interações e animações do site */

// Número de WhatsApp usado no formulário de contato (só números, com 55 + DDD)
var WHATSAPP = "5511963797683";

var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var finePointer = window.matchMedia("(pointer: fine)").matches;

/* ---------- Menu do celular ---------- */
var nav = document.querySelector(".nav");
var toggle = document.querySelector(".nav__toggle");
if (nav && toggle) {
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
}

/* ---------- Ano no rodapé ---------- */
document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

/* ---------- Logo 3D: monta as camadas de profundidade ---------- */
document.querySelectorAll(".logo3d").forEach(function (logo) {
  var depth = parseInt(logo.dataset.depth || "16", 10);
  var front = logo.querySelector(".front");
  for (var i = depth; i >= 1; i--) {
    var layer = document.createElement("img");
    layer.src = "assets/logo-profundidade.png";
    layer.alt = "";
    layer.className = "layer";
    layer.style.setProperty("--z", i);
    logo.insertBefore(layer, front);
  }
});

/* ---------- Revelar ao rolar ----------
   Só esconde o que está FORA da tela no carregamento; o resto já aparece. */
var reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !reduceMotion) {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.remove("is-waiting"); io.unobserve(e.target); }
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  reveals.forEach(function (el) {
    if (el.getBoundingClientRect().top > window.innerHeight * 0.92) {
      el.classList.add("is-waiting");
      io.observe(el);
    }
  });

  // Desenhos à mão (setas e ondas) se desenham quando aparecem
  var drawIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("is-drawing"); drawIO.unobserve(e.target); }
    });
  }, { threshold: 0.4 });
  document.querySelectorAll(".squiggle, .wave").forEach(function (el) { drawIO.observe(el); });
}

/* ---------- Efeitos ligados à rolagem ---------- */
var stage = document.querySelector(".stage");
var heroLogo = document.querySelector(".hero .logo3d");
var parallaxEls = document.querySelectorAll("[data-parallax]");
var aboutFrame = document.querySelector(".about__frame");
var stackCards = document.querySelectorAll(".stack-card");
var mouse = { x: 0, y: 0 };
var ticking = false;

function onScroll() {
  var vh = window.innerHeight;
  var sy = window.scrollY;

  // Palco do hero cresce um pouco e o logo gira conforme a rolagem
  if (stage) {
    var r = stage.getBoundingClientRect();
    var p = Math.min(Math.max(1 - r.top / vh, 0), 1.4);
    stage.style.setProperty("--stage-scale", (0.94 + Math.min(p, 1) * 0.06).toFixed(3));
    if (heroLogo) {
      heroLogo.style.setProperty("--ry", (-18 + sy * 0.06 + mouse.x * 22).toFixed(2) + "deg");
      heroLogo.style.setProperty("--rx", (8 - mouse.y * 14 + sy * 0.01).toFixed(2) + "deg");
    }
  }

  // Formas decorativas flutuam em velocidades diferentes
  parallaxEls.forEach(function (el) {
    var speed = parseFloat(el.dataset.parallax) || 0.1;
    var box = el.parentElement.getBoundingClientRect();
    el.style.setProperty("--py", ((box.top + box.height / 2 - vh / 2) * -speed).toFixed(1) + "px");
  });

  // Foto do "sobre" dá um leve zoom
  if (aboutFrame) {
    var a = aboutFrame.getBoundingClientRect();
    var t = Math.min(Math.max((vh - a.top) / (vh + a.height), 0), 1);
    aboutFrame.style.setProperty("--zoom", (1.25 - t * 0.2).toFixed(3));
  }

  // Cartões empilhados: o de trás encolhe quando o próximo chega por cima
  stackCards.forEach(function (card, i) {
    var next = stackCards[i + 1];
    if (!next) return;
    var cTop = card.getBoundingClientRect().top;
    var nTop = next.getBoundingClientRect().top;
    var dist = nTop - cTop;
    var k = Math.min(Math.max(1 - dist / card.offsetHeight, 0), 1);
    card.style.setProperty("--s", (1 - k * 0.06).toFixed(3));
  });

  ticking = false;
}
function requestTick() { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }
if (!reduceMotion) {
  window.addEventListener("scroll", requestTick, { passive: true });
  window.addEventListener("resize", requestTick);
  onScroll();
}

/* ---------- Mouse: logo 3D segue o cursor ---------- */
if (stage && finePointer && !reduceMotion) {
  stage.addEventListener("pointermove", function (e) {
    var r = stage.getBoundingClientRect();
    mouse.x = (e.clientX - r.left) / r.width - 0.5;
    mouse.y = (e.clientY - r.top) / r.height - 0.5;
    requestTick();
  });
  stage.addEventListener("pointerleave", function () { mouse.x = 0; mouse.y = 0; requestTick(); });
}

/* ---------- Cartões que inclinam em 3D com o mouse ---------- */
if (finePointer && !reduceMotion) {
  document.querySelectorAll("[data-tilt]").forEach(function (card) {
    card.addEventListener("pointermove", function (e) {
      var r = card.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      card.style.setProperty("--ty", (x * 16).toFixed(2) + "deg");
      card.style.setProperty("--tx", (-y * 16).toFixed(2) + "deg");
    });
    card.addEventListener("pointerleave", function () {
      card.style.setProperty("--ty", "0deg");
      card.style.setProperty("--tx", "0deg");
    });
  });

  // Botões "magnéticos": puxam levemente na direção do cursor
  document.querySelectorAll(".btn--big").forEach(function (btn) {
    btn.addEventListener("pointermove", function (e) {
      var r = btn.getBoundingClientRect();
      btn.style.translate = ((e.clientX - r.left - r.width / 2) * 0.18).toFixed(1) + "px " + ((e.clientY - r.top - r.height / 2) * 0.3).toFixed(1) + "px";
    });
    btn.addEventListener("pointerleave", function () { btn.style.translate = ""; });
  });
}

/* ---------- Números que contam ---------- */
document.querySelectorAll("[data-count]").forEach(function (el) {
  var end = parseInt(el.dataset.count, 10);
  var prefix = el.dataset.prefix || "";
  var suffix = el.dataset.suffix || "";
  if (reduceMotion || !("IntersectionObserver" in window)) return;
  var obs = new IntersectionObserver(function (entries) {
    if (!entries[0].isIntersecting) return;
    obs.disconnect();
    var start = performance.now();
    (function step(now) {
      var t = Math.min((now - start) / 1400, 1);
      var eased = 1 - Math.pow(1 - t, 3);
      el.textContent = prefix + Math.round(end * eased) + suffix;
      if (t < 1) requestAnimationFrame(step);
    })(start);
  }, { threshold: 0.6 });
  obs.observe(el);
});

/* ---------- Carrossel de depoimentos ---------- */
document.querySelectorAll("[data-carousel]").forEach(function (wrap) {
  var track = wrap.querySelector(".quotes");
  wrap.querySelectorAll("[data-dir]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var card = track.querySelector(".quote");
      var step = card ? card.offsetWidth + 19 : 300;
      track.scrollBy({ left: step * parseInt(btn.dataset.dir, 10), behavior: reduceMotion ? "auto" : "smooth" });
    });
  });
});

/* ---------- Filtros do portfólio ---------- */
var filters = document.querySelectorAll(".filter");
filters.forEach(function (btn) {
  btn.addEventListener("click", function () {
    var cat = btn.dataset.filter;
    filters.forEach(function (b) { b.setAttribute("aria-pressed", b === btn ? "true" : "false"); });
    document.querySelectorAll("[data-cat]").forEach(function (card) {
      var show = cat === "todos" || card.dataset.cat.split(" ").indexOf(cat) !== -1;
      card.hidden = !show;
      card.classList.remove("is-entering");
      if (show) { void card.offsetWidth; card.classList.add("is-entering"); }
    });
  });
});

/* ---------- Botões "copiar" ---------- */
document.querySelectorAll("[data-copy]").forEach(function (btn) {
  btn.addEventListener("click", function () {
    var original = btn.textContent;
    function done() { btn.textContent = "Copiado!"; setTimeout(function () { btn.textContent = original; }, 1600); }
    function fallback() {
      var value = btn.closest(".contact-card").querySelector(".contact-card__value");
      var range = document.createRange();
      range.selectNodeContents(value);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(btn.dataset.copy).then(done, fallback);
    } else { fallback(); }
  });
});

/* ---------- Formulário: monta a mensagem para o WhatsApp ---------- */
var form = document.getElementById("form-contato");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var error = form.querySelector(".form__error");
    var nome = form.nome.value.trim();
    var mensagem = form.mensagem.value.trim();
    if (!nome || !mensagem) {
      error.hidden = false;
      error.textContent = "Preencha seu nome e conte um pouco sobre o projeto para continuar.";
      (nome ? form.mensagem : form.nome).focus();
      return;
    }
    error.hidden = true;
    var servicos = Array.prototype.map.call(form.querySelectorAll('input[name="servico"]:checked'), function (i) { return i.value; });
    var texto =
      "Olá, Luna! Vim pelo site.\n\n" +
      "*Nome:* " + nome + "\n" +
      (form.empresa.value.trim() ? "*Empresa:* " + form.empresa.value.trim() + "\n" : "") +
      (form.email.value.trim() ? "*E-mail:* " + form.email.value.trim() + "\n" : "") +
      (servicos.length ? "*Interesse:* " + servicos.join(", ") + "\n" : "") +
      (form.orcamento.value ? "*Investimento:* " + form.orcamento.value + "\n" : "") +
      "\n" + mensagem;
    var doneBox = document.getElementById("form-done");
    var link = doneBox.querySelector("a");
    link.href = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(texto);
    doneBox.hidden = false;
    form.querySelector('button[type="submit"]').hidden = true;
    link.focus();
  });
}
