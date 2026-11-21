# Site — Luna Creative Studio

Site estático (HTML + CSS + JavaScript, sem instalação) com 4 páginas:

| Página | Arquivo |
|---|---|
| Home | `index.html` |
| Serviços | `servicos.html` |
| Portfólio | `portfolio.html` |
| Contato | `contato.html` |

## Como ver no computador
Dê dois cliques em `index.html` e ele abre no navegador.

## Onde mudar cada coisa
- **Textos**: direto nos arquivos `.html` (procure a frase com Ctrl+F e troque).
- **Cores e fontes**: no topo de `css/style.css` (bloco `:root`).
- **WhatsApp do formulário**: primeira linha de `js/main.js`.
- **Logo e imagens**: pasta `assets/`.
- **Capas do portfólio**: hoje são ilustrações provisórias feitas em código (classes `mock--...`).
  Para usar uma foto real, troque o `<div class="mock ...">...</div>` de cada projeto por
  `<img src="assets/nome-da-foto.jpg" alt="Descrição" style="width:100%;height:100%;object-fit:cover">`.

## Publicar
Pode ser hospedado de graça no GitHub Pages, Netlify ou Vercel (basta enviar esta pasta).
