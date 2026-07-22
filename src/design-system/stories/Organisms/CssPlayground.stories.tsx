import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CssPlayground } from "@/ui-kit/components/organisms/CssPlayground/CssPlayground";

const meta: Meta<typeof CssPlayground> = {
  title: "Organisms/CSS Playground",
  component: CssPlayground,
  parameters: {
    layout: "padded",
    a11y: { test: "error" },
    docs: {
      description: {
        component: `Éditeur HTML + CSS avec aperçu <small lang="en">live</small> rendu dans une \`iframe\` (\`sandbox=""\`).

### Détection d'erreurs dans le rendu

Le navigateur ne signale rien quand du HTML ou du CSS est mal formé : il récupère ou ignore en silence, et abandonne tout ce qui suit une erreur de structure.
Le composant analyse donc le code à chaque frappe (<small lang="en">debounce</small> 250 ms) et affiche une bannière accessible (\`role="status"\`) uniquement pour les erreurs qui cassent réellement le rendu en avalant le code qui suit.

#### CSS analysé

| Détection | Exemple |
|---|---|
| Accolade \`{\` ouvrante non fermée | \`.a { color: red\` |
| Accolade \`}\` fermante en trop | \`.a {} }\` |
| Commentaire \`/* … */\` non fermé | \`.a { color: red } /* oups\` |
| Chaîne \`"…"\` / \`'…'\` non fermée | \`content: "oups\` |

**Volontairement non signalé :**

- les chaînes et commentaires
- les valeurs CSS invalides (<small lang="en">\`color: notacolor\`</small>)

#### HTML analysé

| Détection | Exemple |
|---|---|
| Guillemet d'attribut non fermé | \`<div class="box>…\` |
| Balise non terminée (\`>\` manquant) | \`<p>texte <span\` |
| Commentaire \`<!-- … -->\` non fermé | \`<p>x</p><!-- oups\` |

**Volontairement NON signalé :**

- balise non fermée (\`<div><b>gras</div>\`)
- balises auto-fermantes (\`<br>\`, \`<img>\`)
- balises à fermeture optionnelle (\`<li>\`, \`<p>\`)
- \`<\` littéral dans le texte (\`5 < 10\`)
`,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CssPlayground>;

export const Flexbox: Story = {
  args: {
    label: "Flexbox space-between",
    html: `<div class="row">
  <div class="box">1</div>
  <div class="box">2</div>
  <div class="box">3</div>
</div>`,
    css: `.row {
  display: flex;
  gap: 1rem;
  justify-content: space-between;
}

.box {
  flex: 1;
  display: grid;
  place-items: center;
  padding: 1.5rem;
  border-radius: 8px;
  background: #6c5ce7;
  color: #fff;
  font-family: sans-serif;
}`,
  },
};

export const WithCssError: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "L'accolade fermante de `.note` manque : le navigateur ignore la règle.",
      },
    },
  },
  args: {
    label: "CSS avec accolade manquante",
    html: `<p class="note">Csscade</p>`,
    css: `.note {
  color: rebeccapurple;
  font-weight: 600;
/* accolade fermante manquante */`,
  },
};

export const WithHtmlError: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Le guillemet ouvrant de l'attribut `class` n'est jamais fermé : le navigateur ignore le texte suivant dans la valeur d'attribut.",
      },
    },
  },
  args: {
    label: "HTML avec guillemet d'attribut non fermé",
    html: `<p class="note>Csscade</p>`,
    css: `.note {
  color: rebeccapurple;
}`,
  },
};

export const CssDrawing: Story = {
  args: {
    label: "Un cœur dessiné en CSS",
    html: `<div class="heart"></div>`,
    css: `.heart {
  width: 100px;
  height: 90px;
  margin: 3rem auto;
  position: relative;
}

.heart::before,
.heart::after {
  content: "";
  position: absolute;
  top: 0;
  width: 50px;
  height: 80px;
  border-radius: 50px 50px 0 0;
  background: #59b7d3;
}

.heart::before {
  left: 50px;
  transform: rotate(-45deg);
  transform-origin: 0 100%;
}

.heart::after {
  left: 0;
  transform: rotate(45deg);
  transform-origin: 100% 100%;
}`,
  },
};
