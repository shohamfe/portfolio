import {
  decisionCard,
  decisionGrid,
  decisionTerm,
  decisionTermAccent,
  decisionTitle,
  decisionTradeOff,
  decisionValue,
} from "./projectStage.variants";
import type { ProjectDecisionCardProps } from "../types/projectStage.types";

/** Constraint, decision, trade-off — the shape the whole page is built around. */
const ProjectDecisionCard: React.FC<ProjectDecisionCardProps> = ({
  decision,
}) => {
  return (
    <article className={decisionCard}>
      <h3 className={decisionTitle}>{decision.title}</h3>

      <dl className={decisionGrid}>
        <dt className={decisionTerm}>Constraint</dt>
        <dd className={decisionValue}>{decision.constraint}</dd>

        <dt className={decisionTerm}>Decision</dt>
        <dd className={decisionValue}>{decision.decision}</dd>

        <dt className={decisionTermAccent}>Trade-off</dt>
        <dd className={decisionTradeOff}>{decision.tradeOff}</dd>
      </dl>
    </article>
  );
};

export default ProjectDecisionCard;
