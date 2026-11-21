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

## Animações e 3D
- **Logo 3D** no topo da Home: são camadas da imagem `assets/logo-profundidade.png` empilhadas pelo `js/main.js`. Ele gira com o mouse e com a rolagem.
- **Revelar na rolagem**: qualquer elemento com a classe `reveal` aparece suavemente quando entra na tela.
- **Estrelinhas flutuantes** usam `data-parallax="0.2"`: quanto maior o número, mais rápido elas se movem.
- **Cartões que inclinam** com o mouse usam o atributo `data-tilt`.
- Quem ativa "reduzir movimento" no celular/computador vê o site sem animações.

## Ícones
Os ícones de "vidro fosco" são desenhados em código (SVG): uma forma de trás em gradiente azul→roxo e uma forma da frente translúcida.

## Publicar
Pode ser hospedado de graça no GitHub Pages, Netlify ou Vercel (basta enviar esta pasta).
