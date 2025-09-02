"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ComparisonDialog from "./ComparisonDialog";

interface RiskFactor {
  label: string;
  level: string;
  color: string;
}

interface Recommendation {
  id?: string;
  _id?: string;
  risk: string;
  recommendation_id?: string;
  riskColor: string;
  cardBg: string;
  amount: string;
  period: string;
  title: string;
  confidence: string;
  description: string;
  confidenceColor: string;
  sources: string;
  paybackPeriod?: string;
  riskAdjustedROI?: string;
  riskProfileDescription?: string;
  riskFactors?: RiskFactor[];
  dependenciesSnapshotImage?: string;
  systemsInvolved?: string[];
}

interface RecommendationCardsProps {
  showRecommendations: boolean;
  recommendations?: Recommendation[];
  loading?: boolean;
}

const RecommendationCards = ({
  showRecommendations,
  recommendations = [],
  loading = false,
}: RecommendationCardsProps) => {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [showComparisonDialog, setShowComparisonDialog] = useState(false);

  // Helper function to get background color based on risk level
  const getRiskBackgroundColor = (risk: string) => {
    const riskLower = risk.toLowerCase();
    if (riskLower.includes("low")) {
      return "rgba(17, 56, 45, 0.40)";
    } else if (riskLower.includes("medium")) {
      return "rgba(107, 70, 31, 0.20)";
    } else if (riskLower.includes("high")) {
      return "rgba(107, 31, 32, 0.20)";
    }
    return "rgba(17, 56, 45, 0.40)"; // default to low risk color
  };

  // Loader component
  const LoaderCard = () => (
    <div className="w-[260px] h-[400px] p-4 flex flex-col items-start gap-4 flex-shrink-0 overflow-hidden rounded-[20px] bg-[rgba(17,56,45,0.40)] animate-pulse">
      <div className="h-7 w-20 bg-gray-600 rounded-[60px]"></div>
      <div className="self-stretch pb-4 border-b border-neutral-600 flex flex-col justify-start items-start gap-2.5">
        <div className="h-8 w-32 bg-gray-600 rounded"></div>
        <div className="h-6 w-full bg-gray-600 rounded"></div>
      </div>
      <div className="self-stretch pb-4 border-b border-neutral-600 flex flex-col justify-start items-start gap-4">
        <div className="h-4 w-full bg-gray-600 rounded"></div>
        <div className="h-4 w-3/4 bg-gray-600 rounded"></div>
      </div>
      <div className="w-full mt-auto">
        <div className="h-4 w-24 bg-gray-600 rounded mb-4"></div>
        <div className="h-5 w-28 bg-gray-600 rounded"></div>
      </div>
    </div>
  );

  const handleCompareClick = (index: number) => {
    setSelectedCards((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const handleCardClick = (rec: Recommendation, index: number) => {
    // Get the ID from the recommendation, fallback to index if no ID is available
    const recommendationId =
      rec.recommendation_id || rec._id || index.toString();
    router.push(`/cardDetails/${recommendationId}`);
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
      <div className="my-16 max-w-7xl mx-auto mb-16">
        <div className="flex justify-center items-end gap-6">
          {loading
            ? // Show loader cards when loading
              Array.from({ length: 3 }).map((_, index) => (
                <LoaderCard key={index} />
              ))
            : recommendations.map((rec, index) => {
                const isSelected = selectedCards.includes(index);
                const isHovered = hoveredCard === index;
                const isAnyCardActive =
                  hoveredCard !== null || selectedCards.length > 0;

                const baseBackgroundColor = getRiskBackgroundColor(rec.risk);

                const cardHeight =
                  isHovered || isSelected ? "h-[405px]" : "h-[390px]";

                const cardDynamicStyles =
                  isHovered || isSelected
                    ? "transform scale-105 border border-white opacity-100 rounded-[20px] shadow-[0_40px_60px_0_rgba(0,0,0,0.60)] z-10"
                    : isAnyCardActive
                    ? "border-2 border-transparent opacity-50 transform scale-y-90 rounded-[20px]"
                    : "border-2 border-transparent opacity-100 rounded-[20px]";

                return (
                  <div
                    key={index}
                    className={`w-[260px] ${cardHeight} p-4 flex flex-col items-start gap-4 flex-shrink-0 overflow-hidden transition-all duration-300 cursor-pointer ${cardDynamicStyles}`}
                    style={{
                      backgroundColor: baseBackgroundColor,
                      transformOrigin: "center center",
                    }}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => handleCardClick(rec, index)}
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
                        <div className="self-stretch text-left text-white text-base font-normal font-helvetica-now leading-tight whitespace-pre-line">
                          {rec.title}
                        </div>
                      </div>

                      {(isHovered || isSelected) && (
                        <div className="self-stretch pb-4 border-b border-neutral-600 flex flex-col justify-start items-start gap-4">
                          <div className="self-stretch text-left text-gray-400 text-xs font-medium leading-relaxed line-clamp-3">
                            {rec.description}
                          </div>
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

                    <div className="w-full ">
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

        {!loading && selectedCards.length > 0 && (
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
