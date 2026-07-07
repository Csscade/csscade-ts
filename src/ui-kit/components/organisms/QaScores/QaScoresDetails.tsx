import type { QaScores } from "@/entities/qa-scores/qa-scores";

type QaScoresDetailsProps = {
  qaScores: QaScores | null;
};

export const QaScoresDetails = ({ qaScores }: QaScoresDetailsProps) => {
  if (!qaScores) return null;

  const generatedAt = new Date(qaScores.generatedAt).toLocaleDateString(
    "fr-FR",
    { day: "numeric", month: "long", year: "numeric" },
  );

  return (
    <section
      className="about-page__section"
      id="qualite"
      aria-labelledby="qualite-title"
    >
      <h2 id="qualite-title">Qualité &amp; Accessibilité</h2>
      <p>
        Nous auditons automatiquement chaque page du site avec{" "}
        <strong>Lighthouse</strong> et <strong>Axe-core</strong>. Dernière
        mesure : {generatedAt}.
      </p>

      <div className="about-page__subsection">
        <h3>Lighthouse</h3>
        <ul className="about-page__content-list">
          <li className="about-page__content-item">
            <h4>Performance</h4>
            <p>{qaScores.lighthouse.performance}/100</p>
          </li>
          <li className="about-page__content-item">
            <h4>Accessibilité</h4>
            <p>{qaScores.lighthouse.accessibility}/100</p>
          </li>
          <li className="about-page__content-item">
            <h4>Bonnes pratiques</h4>
            <p>{qaScores.lighthouse.bestPractices}/100</p>
          </li>
          <li className="about-page__content-item">
            <h4>SEO</h4>
            <p>{qaScores.lighthouse.seo}/100</p>
          </li>
        </ul>
      </div>

      <div className="about-page__subsection">
        <h3>Axe-core</h3>
        <ul className="about-page__content-list">
          <li className="about-page__content-item">
            <h4>Accessibilité (WCAG 2.2 / RGAA 4)</h4>
            <p>
              {qaScores.axe.score}% — {qaScores.axe.rulesPassed}/
              {qaScores.axe.rulesTotal} règles validées
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
};
