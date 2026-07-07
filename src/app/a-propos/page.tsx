import { AboutPage } from "@/ui-kit/pages/About/AboutPage";
import { getQaScores } from "@/usecases/qa-scores";

export default function Page() {
  const qaScores = getQaScores();

  return <AboutPage qaScores={qaScores} />;
}
