"use client";
import { useState } from "react";
import ComparisonDialog from "./ComparisonDialog";

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
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [showComparisonDialog, setShowComparisonDialog] = useState(false);

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
      title: "Consolidate vendor \ncontracts",
      confidence: "64%",
      description:
        "Consolidating multiple vendor relationships can lead to better negotiating power and cost savings, though it requires careful transition management.",
      confidenceColor: "text-red-400",
      sources: "HRIS,CRM",
    },
  ];

  const handleCompareClick = (index: number) => {
    setSelectedCards((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const handleCompareButtonClick = () => {
    setShowComparisonDialog(true);
  };

  const selectedRecommendations = selectedCards.map(
    (index) => recommendations[index]
  );

  if (!showRecommendations) return null;

  return (
    <div>
      <div className="mt-16 max-w-7xl mx-auto mb-16">
        <div className="flex justify-center items-end gap-6">
          {recommendations.map((rec, index) => {
            const isSelected = selectedCards.includes(index);
            const isHovered = hoveredCard === index;
            const isAnyCardActive =
              hoveredCard !== null || selectedCards.length > 0;

            const cardDynamicStyles =
              isHovered || isSelected
                ? "transform scale-105 border border-white opacity-100 rounded-[20px] shadow-[0_40px_60px_0_rgba(0,0,0,0.60)] mb-4 bg-[rgba(107,70,31,0.20)]"
                : isAnyCardActive
                ? "border-2 border-transparent opacity-50 transform scale-y-90 rounded-[20px] bg-[rgba(17,56,45,0.40)]"
                : "border-2 border-transparent opacity-100 rounded-[20px] bg-[rgba(17,56,45,0.40)]";

            return (
              <div
                key={index}
                className={`w-[260px] p-4 flex flex-col items-start gap-4 flex-shrink-0 overflow-hidden transition-all duration-300 cursor-pointer ${cardDynamicStyles}`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="flex flex-col justify-start items-start gap-4 flex-grow">
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
                    {(isHovered || isSelected) && (
                      <div className="self-stretch text-left text-gray-400 text-xs font-medium leading-relaxed line-clamp-3">
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
                      <span className="text-white text-xs font-normal font-helvetica-now leading-none">
                        {" "}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-full mt-auto">
                  <div className="self-stretch text-left text-blue-300 text-xs font-bold font-helvetica-now leading-none mb-4">
                    Why this recommendation?
                  </div>

                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCompareClick(index);
                    }}
                  >
                    <div
                      className={`w-5 h-5 rounded-[5px] border-2 border-[#1A4EFF] flex-shrink-0 flex items-center justify-center transition-colors duration-200 ${
                        selectedCards.includes(index)
                          ? "bg-[#1A4EFF]"
                          : "bg-transparent"
                      }`}
                    >
                      {selectedCards.includes(index) && (
                        <svg
                          width="12"
                          height="9"
                          viewBox="0 0 12 9"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 4.5L4.5 8L11 1.5"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-white text-xs font-normal font-helvetica-now leading-[120%]">
                      Add to Compare
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {selectedCards.length > 0 && (
          <div className="flex justify-center mt-12 mb-4">
            {/* <button
            onClick={handleCompareButtonClick}
            className="w-full max-w-xs px-10 py-5 bg-transparent border-2 border-white rounded-full flex items-center justify-center gap-3 text-white transition-all duration-300 cursor-pointer group"
          >
            <img src="/icons/repeat-circle.svg" className="w-5 h-5" />
            <div className="justify-start text-white text-base font-bold  leading-normal">
              Compare
            </div>
          </button> */}
            <button
              onClick={handleCompareButtonClick}
              className="w-72 h-12 px-10 py-5 cursor-pointer rounded-[60px] shadow-[0px_40px_120px_0px_rgba(1,68,199,0.30)] outline outline-1 outline-white inline-flex justify-center items-center gap-2"
            >
              <div className="w-5 h-5 relative">
                <img src="/icons/repeat-circle.svg" className="w-5 h-5" />
              </div>
              <div className="justify-start text-white text-base font-bold  leading-normal">
                Compare
              </div>
            </button>
          </div>
        )}
      </div>
      <ComparisonDialog
        isOpen={showComparisonDialog}
        onClose={() => setShowComparisonDialog(false)}
        selectedRecommendations={selectedRecommendations}
      />
    </div>
  );
};

export default RecommendationCards;
