# Vídeo do hero — briefing para o Flow

## A ideia que eu recomendo: "papel recortado"

O lettering da ÚNICA parece **papel recortado à mão** (bordas irregulares, levemente torto). O vídeo pode ser
a assinatura disso: peças de papel off-white, cortadas à tesoura, deslizam em stop-motion sobre uma superfície
preta e se encaixam até formar o layout de um site. Uma única peça laranja pousa por último, como o botão.
Corte para preto. É a própria história da marca: **ideias que ganham forma**.

Por que funciona:
- Combina com o logo (nenhuma outra marca de site tem isso) e foge do "visual de IA" (brilho, partículas, hologramas).
- É abstrato, não mostra gente fake nem código, e continua elegante mesmo bem pequeno.
- Começa e termina em preto, então o loop fica natural, sem emenda.

Plano B (mais seguro): "da linha à interface" — é a animação que já roda hoje no site (uma linha branca
se divide e forma uma interface com um quadradinho laranja). Use o prompt B abaixo.

## O que mandar de base no Flow

1. **Imagem de referência de estilo:** `public/unica-logo-white.png` (o lettering recortado, branco sobre preto).
2. **Paleta (diga no prompt):** preto `#0B0B0B`, off-white `#F1EEE7`, e **um único** laranja `#FF4B1F`.
3. Opcional, se o Flow aceitar "frames": primeiro quadro = preto puro; último quadro = o layout pronto
   (use uma das tentativas que você gostar).

## Prompt A — papel recortado (principal)

```
Top-down macro shot of a matte black surface with a soft single side light. Off-white hand-cut paper pieces with
slightly irregular, imperfect scissor-cut edges (not perfect geometry) slide in one by one in slow stop-motion and
settle into the layout of a clean website: a thin header bar, one large hero block, three small cards side by side,
and a few short lines of text. A single small square of vivid orange paper (#FF4B1F) lands last, like a button.
It is the only color in the scene. The camera pushes in very slowly. The finished layout holds for a moment, then
everything cuts to pure black. Minimal, editorial, tactile and handmade, matte paper texture, subtle real shadows.
Centered composition with generous empty black space around it.
No people, no hands, no text, no letters, no logos, no code, no laptops, no phones, no particles, no glow,
no holograms, no neon, no gradients, no lens flare. Silent, no audio. Starts and ends on pure black.
```

## Prompt B — da linha à interface (plano B)

```
Pure black background. A single thin off-white line appears at the center and slowly draws across the frame.
It splits into fine lines and rectangles that arrange themselves, one by one, into the wireframe of a clean website
interface: a header, a sidebar, three content cards and a small bar chart. One small square turns vivid orange
(#FF4B1F), the only color. Slow, steady camera push-in. Hold for a moment, then cut to pure black.
Minimal, editorial, flat, matte. Centered with lots of empty black space.
No people, no code, no laptops, no phones, no particles, no glow, no holograms, no neon, no gradients, no lens flare.
Silent, no audio. Starts and ends on pure black.
```

## Dicas para gerar

- Gere **3 a 4 versões** e escolha a melhor. Se o movimento vier rápido demais, acrescente: "slow, deliberate, calm pacing".
- Mantenha tudo **no centro**: o site recorta o vídeo (desktop 5:4, celular 4:5). Deixe a ação nos ~50% do meio da largura.
- **Formato:** 16:9 em 1080p, 8 s. Para o celular, gere também uma versão **9:16** com o mesmo prompt e a frase
  "vertical composition" (depois recorta para 4:5). Se der trabalho, uma só versão 16:9 já serve.
- **Sem áudio:** se o Flow gerar som, remova (comando abaixo).

## Como preparar os arquivos (ffmpeg)

Tenho o `ffmpeg`? Instale com `winget install ffmpeg`. Troque `entrada.mp4` pelo arquivo do Flow.

```bash
# Desktop (recorte 5:4, sem áudio) — MP4 e WebM
ffmpeg -i entrada.mp4 -an -vf "crop=ih*5/4:ih,scale=1280:1024" -c:v libx264 -crf 28 -preset slow -pix_fmt yuv420p -movflags +faststart hero.mp4
ffmpeg -i entrada.mp4 -an -vf "crop=ih*5/4:ih,scale=1280:1024" -c:v libvpx-vp9 -crf 34 -b:v 0 hero.webm

# Celular (recorte 4:5, sem áudio)
ffmpeg -i entrada.mp4 -an -vf "crop=ih*4/5:ih,scale=720:900" -c:v libx264 -crf 28 -preset slow -pix_fmt yuv420p -movflags +faststart hero-m.mp4
ffmpeg -i entrada.mp4 -an -vf "crop=ih*4/5:ih,scale=720:900" -c:v libvpx-vp9 -crf 34 -b:v 0 hero-m.webm

# Poster (um quadro bonito, por volta dos 5–6 s)
ffmpeg -i entrada.mp4 -ss 5.5 -frames:v 1 -vf "crop=ih*5/4:ih,scale=1280:1024" -q:v 3 hero-poster.jpg
```

Metas de peso: celular até ~1,5 MB, desktop até ~3 MB.

## Como ligar no site

1. Coloque os arquivos em `public/video/`.
2. Em `src/content.ts`, preencha `HERO_MEDIA`:

```ts
export const HERO_MEDIA: HeroMedia | null = {
  poster: '/video/hero-poster.jpg',
  desktop: { webm: '/video/hero.webm', mp4: '/video/hero.mp4' },
  mobile: { webm: '/video/hero-m.webm', mp4: '/video/hero-m.mp4' },
}
```

O componente já cuida do resto: toca mudo, em loop, inline, só enquanto está na tela; mostra o poster se a pessoa
pediu "reduzir movimento", está em economia de dados ou se o vídeo falhar.
