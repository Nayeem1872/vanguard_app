"use client";
import { useState } from "react";
import RecommendationDrawer from "./RecommendationDrawer";

interface Recommendation {
  risk: string;
  riskColor: string;
  cardBg: string;
  amount: string;
  period: string;
  title: string;
  confidence: string;
  description: string;
  confidenceColor: string;
  sources: string;
}

interface RecommendationCardsProps {
  showRecommendations: boolean;
}

const RecommendationCards = ({
  showRecommendations,
}: RecommendationCardsProps) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleCardClick = (index: number) => {
    setSelectedCard(index);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedCard(null);
  };

  const recommendations: Recommendation[] = [
    {
      risk: "LOW RISK",
      riskColor: "bg-teal-800",
      cardBg: "card-low-risk",
      amount: "+$127,450",
      period: "/qtr",
      title: "Reconfigure material routing at Site B",
      confidence: "87%",
      description:
        "By optimizing the material flow paths and reducing bottlenecks, this change can significantly improve operational efficiency while maintaining quality standards.",
      confidenceColor: "text-emerald-500",
      sources: "ERP, HRIS",
    },
    {
      risk: "MEDIUM RISK",
      riskColor: "bg-amber-700",
      cardBg: "card-medium-risk",
      amount: "+$89,230",
      period: "/qtr",
      title: "Optimize shift scheduling patterns",
      description:
        "Implementing data-driven shift scheduling can reduce overtime costs and improve employee satisfaction while maintaining productivity levels.",
      confidence: "76%",
      confidenceColor: "text-yellow-500",
      sources: "HRIS,CRM",
    },
    {
      risk: "HIGH RISK",
      riskColor: "bg-red-700",
      cardBg: "card-high-risk",
      amount: "+$156,780",
      period: "/qtr",
      title: "Consolidate vendor contracts",
      confidence: "64%",
      description:
        "Consolidating multiple vendor relationships can lead to better negotiating power and cost savings, though it requires careful transition management.",
      confidenceColor: "text-red-400",
      sources: "HRIS,CRM",
    },
  ];

  if (!showRecommendations) return null;

  return (
    <div className="mt-16 max-w-6xl mx-auto mb-16">
      <div className="flex justify-center gap-6">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className={`w-64 p-4 ${
              rec.cardBg
            } inline-flex flex-col justify-start items-start gap-4 overflow-hidden transition-all duration-300 cursor-pointer ${
              hoveredCard === index
                ? "transform scale-105 border-2 border-white opacity-100"
                : hoveredCard !== null
                ? "border-2 border-transparent opacity-50 transform scale-y-90"
                : "border-2 border-transparent opacity-100"
            }`}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => handleCardClick(index)}
          >
            <div
              className={`h-7 px-5 py-2.5 ${rec.riskColor} rounded-[60px] inline-flex justify-center items-center gap-2.5`}
            >
              <div className="justify-start text-white text-xs font-bold font-helvetica-now uppercase leading-none">
                {rec.risk}
              </div>
            </div>
            <div className="self-stretch pb-4 border-b border-neutral-600 flex flex-col justify-start items-start gap-2.5">
              <div className="self-stretch text-left">
                <span className="text-white text-3xl font-medium font-helvetica-now leading-loose">
                  {rec.amount}
                </span>
                <span className="text-white text-base font-normal font-helvetica-now leading-tight">
                  {rec.period}
                </span>
              </div>
              <div className="self-stretch text-left text-white text-base font-normal font-helvetica-now leading-tight">
                {rec.title}
              </div>
            </div>

            <div className="self-stretch pb-4 border-b border-neutral-600 flex flex-col justify-start items-start gap-4">
              {hoveredCard === index && (
                <div className="self-stretch text-left text-gray-400 text-xs font-medium leading-relaxed line-clamp-2">
                  {rec.description}
                </div>
              )}
              <div className="self-stretch text-left">
                <span className="text-gray-400 text-xs font-normal font-helvetica-now leading-none">
                  Confidence:
                </span>
                <span className="text-white text-xs font-normal font-helvetica-now leading-none">
                  {" "}
                </span>
                <span
                  className={`text-xs font-bold font-helvetica-now leading-none ${rec.confidenceColor}`}
                >
                  {rec.confidence}
                </span>
                <span className="text-white text-xs font-bold font-helvetica-now leading-none">
                  {"  "}
                </span>
                <span className="text-gray-400 text-xs font-normal font-helvetica-now leading-none">
                  |
                </span>
                <span className="text-white text-xs font-normal font-helvetica-now leading-none">
                  {"  "}
                </span>
                <span className="text-gray-400 text-xs font-normal font-helvetica-now leading-none">
                  Sources:
                </span>
                <span className="text-white text-xs font-normal font-helvetica-now leading-none">
                  {" "}
                </span>
                <span className="text-white text-xs font-bold font-helvetica-now leading-none">
                  {rec.sources}
                </span>
              </div>
            </div>
            <div className="self-stretch text-left text-blue-300 text-xs font-bold font-helvetica-now leading-none">
              Why this recommendation?
            </div>
          </div>
        ))}
      </div>

      {/* Drawer */}
      <RecommendationDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        recommendation={
          selectedCard !== null ? recommendations[selectedCard] : null
        }
      />
    </div>
  );
};

export default RecommendationCards;
