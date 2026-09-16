import { serializeStructuredData } from "@/components/structuredData/helpers/structuredData.helpers";
import type { StructuredDataProps } from "@/components/structuredData/types/structuredData.types";

const StructuredData: React.FC<StructuredDataProps> = ({ graph }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeStructuredData(graph) }}
    />
  );
};

export default StructuredData;
