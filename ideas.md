# Ideias de Design - Rifa Festa de 15 Anos

## Abordagem Escolhida: Glamour Rosa Moderno

**Design Movement:** Contemporary Luxury + Feminine Elegance

**Core Principles:**
1. **Sofisticação Minimalista** - Espaço em branco generoso com elementos rosa estratégicos
2. **Tipografia Hierárquica** - Contraste forte entre display elegante e corpo legível
3. **Movimento Sutil** - Animações suaves que reforçam interatividade sem distrair
4. **Acessibilidade Luxuosa** - Design premium que mantém clareza e usabilidade

**Color Philosophy:**
- **Primário:** Rosa quente (#E91E8C) - energia, celebração, feminilidade
- **Secundário:** Rosa claro (#FFC0CB) - suavidade, confiança
- **Neutro:** Branco (#FFFFFF) e Cinza escuro (#1A1A1A) - contraste limpo
- **Destaque:** Ouro (#D4AF37) - para números vencedores, luxo
- **Intenção:** Celebração vibrante mas sofisticada, transmitindo alegria e confiabilidade

**Layout Paradigm:**
- Hero section assimétrico com gradiente rosa
- Card central para sorteio com sombra suave
- Grid responsivo para exibição de números
- Seção de resultado com destaque visual dramático

**Signature Elements:**
1. Gradiente rosa diagonal como fundo de hero
2. Números em cards com hover effect elegante
3. Confete animado ao ganhar (celebração)

**Interaction Philosophy:**
- Botão de sorteio cresce e brilha ao hover
- Números sorteados ganham destaque com animação suave
- Resultado de vitória com animação de confete
- Feedback visual imediato em todas as ações

**Animation:**
- Entrada de página: fade-in suave (200ms)
- Hover em botão: scale(1.05) com sombra aumentada
- Sorteio: números aparecem com stagger de 50ms
- Vitória: confete cai por 2s com easing ease-out
- Transições padrão: 180-250ms com cubic-bezier(0.23, 1, 0.32, 1)

**Typography System:**
- **Display:** Playfair Display (serif elegante) - títulos e números
- **Body:** Inter (sans-serif limpo) - descrições e instruções
- **Hierarchy:** 
  - H1: 48px bold (Playfair)
  - H2: 32px semi-bold (Playfair)
  - Body: 16px regular (Inter)
  - Small: 14px regular (Inter)

---

## Estrutura Visual Final

```
┌─────────────────────────────────────────┐
│  HERO SECTION (Gradiente Rosa)          │
│  "Rifa Festa de 15 Anos"                │
│  Descrição + CTA                        │
└─────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────┐
│  CARD DE SORTEIO (Centro)               │
│  ┌─────────────────────────────────┐   │
│  │ Seus números: 59, 60, 49...     │   │
│  │ [REALIZAR SORTEIO]              │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────┐
│  GRID DE NÚMEROS SORTEADOS              │
│  [1] [2] [3] [4] [5]...                 │
│  Números destacados em ouro se ganhar   │
└─────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────┐
│  RESULTADO (Confete se ganhar)          │
│  "VOCÊ GANHOU!" ou "Tente novamente"    │
└─────────────────────────────────────────┘
```
