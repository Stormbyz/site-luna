# Site — Luna Creative Studio

Site feito só com HTML, CSS e JavaScript. Não precisa instalar nada para abrir ou editar.

| Página | Arquivo |
|---|---|
| Home | `index.html` |
| Serviços | `servicos.html` |
| Portfólio | `portfolio.html` |
| Contato | `contato.html` |

---

## Como editar (do mais simples ao mais avançado)

### 1. Pedir para o Claude (mais simples)
Abra uma sessão do Claude Code com este repositório e descreva a mudança em português, do seu jeito:
> "Troca o texto do topo da Home para..." · "Coloca essa foto no projeto Café Aurora" · "Muda o WhatsApp para..."

Ele altera, confere e salva para você.

### 2. Mudar um texto você mesmo, pelo site do GitHub
1. Entre em github.com, abra o repositório e clique no arquivo da página (ex.: `index.html`).
2. Clique no ícone de lápis (✏️, "Edit this file").
3. Aperte **Ctrl+F** (ou Cmd+F no Mac) e procure a frase que quer mudar.
4. Troque **só o texto**, sem apagar os sinais `<` `>` nem o que está entre aspas.
5. Clique em **Commit changes**.

Se o site estiver publicado pelo GitHub Pages ou Netlify, ele se atualiza sozinho em cerca de 1 minuto.

> Dica: cada parte da página tem um aviso em português no código, como `<!-- ===== CONHEÇA A LUNA ===== -->`.
> Procure por esse aviso para achar a seção certa.

### 3. Ver as mudanças no seu computador
Baixe o projeto (botão verde **Code → Download ZIP**), descompacte e dê dois cliques em `index.html`.

---

## Onde fica cada coisa

| Quero mudar... | Onde |
|---|---|
| Textos de uma página | No arquivo `.html` da página |
| Menu e rodapé | Eles se repetem nas 4 páginas, então mude nas 4 |
| Cores e fontes | Topo do `css/style.css`, no bloco `:root` (ex.: `--blue: #264be5;`) |
| Número do WhatsApp do formulário | Primeira linha do `js/main.js` |
| Logo e imagens | Pasta `assets/` (troque o arquivo mantendo o mesmo nome) |

### Trocar as capas do portfólio por fotos reais
Hoje as capas são ilustrações provisórias feitas em código. Para usar uma foto:
1. Coloque a foto na pasta `assets/` (ex.: `assets/cafe-aurora.jpg`).
2. No HTML, troque a linha `<div class="mock mock--aurora">...</div>` daquele projeto por:
   `<img src="assets/cafe-aurora.jpg" alt="Projeto Café Aurora" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">`

---

## Animações e efeitos
- **Lua 3D** (topo da Home): feita só com HTML e CSS. A fase da lua muda com a rolagem, a luz segue o mouse e os serviços giram em anéis por trás e pela frente dela. Para trocar os nomes que giram, procure por `orbiter__chip` no `index.html` (eles aparecem duas vezes: camada de trás e da frente).
- **Gradiente animado**: qualquer seção com a classe `panel--glow` ganha o fundo roxo com a mancha de cor em movimento (usado no topo, no "Conheça a Luna", na fase 4, na chamada final e no rodapé).
- **Revelar na rolagem**: elementos com a classe `reveal` aparecem suavemente ao entrar na tela.
- **Cartões que inclinam** com o mouse usam o atributo `data-tilt`.
- **Ícones de vidro fosco**: desenhados em código (SVG), com uma forma em gradiente azul→roxo atrás e outra translúcida na frente.
- Quem ativa "reduzir movimento" no aparelho vê o site sem animações.

## Publicar de graça
GitHub Pages (Settings → Pages → escolher a branch) ou Netlify (conectar o repositório). Depois dá para ligar o seu domínio.
