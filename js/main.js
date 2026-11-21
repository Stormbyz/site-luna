/* LUNA CREATIVE STUDIO — interações do site */

// Número de WhatsApp usado no formulário de contato (só números, com 55 + DDD)
var WHATSAPP = "5511963797683";

// Menu do celular (botão de três linhas)
var nav = document.querySelector(".nav");
var toggle = document.querySelector(".nav__toggle");
if (nav && toggle) {
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
}

// Ano atual no rodapé
document.querySelectorAll("[data-year]").forEach(function (el) {
  el.textContent = new Date().getFullYear();
});

// Filtros do portfólio
var filters = document.querySelectorAll(".filter");
filters.forEach(function (btn) {
  btn.addEventListener("click", function () {
    var cat = btn.dataset.filter;
    filters.forEach(function (b) { b.setAttribute("aria-pressed", b === btn ? "true" : "false"); });
    document.querySelectorAll(".project[data-cat]").forEach(function (card) {
      card.hidden = !(cat === "todos" || card.dataset.cat.split(" ").indexOf(cat) !== -1);
    });
  });
});

// Botões "copiar" na página de contato
document.querySelectorAll("[data-copy]").forEach(function (btn) {
  btn.addEventListener("click", function () {
    var text = btn.dataset.copy;
    var original = btn.textContent;
    function done() { btn.textContent = "Copiado!"; setTimeout(function () { btn.textContent = original; }, 1600); }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () { selectValue(btn); });
    } else {
      selectValue(btn);
    }
  });
});
function selectValue(btn) {
  var value = btn.closest(".contact-card").querySelector(".contact-card__value");
  var range = document.createRange();
  range.selectNodeContents(value);
  var sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}

// Formulário de contato: monta a mensagem e envia pelo WhatsApp
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
    var link = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(texto);
    var doneBox = document.getElementById("form-done");
    doneBox.querySelector("a").href = link;
    doneBox.hidden = false;
    form.querySelector('button[type="submit"]').hidden = true;
    doneBox.querySelector("a").focus();
  });
}
