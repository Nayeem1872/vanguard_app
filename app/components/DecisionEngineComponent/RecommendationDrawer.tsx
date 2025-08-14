"use client";
import { useEffect } from "react";

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

interface RecommendationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  recommendation: Recommendation | null;
}

const RecommendationDrawer = ({
  isOpen,
  onClose,
  recommendation,
}: RecommendationDrawerProps) => {
  // Close drawer on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !recommendation) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[500px] shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          backgroundImage: "url('/images/BG.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-600">
            <div className="flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full ${recommendation.riskColor.replace(
                  "bg-",
                  "bg-"
                )}`}
              ></div>
              <h2 className="text-white text-lg font-medium">
                {recommendation.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-1"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="px-6 pt-4">
            <div className="flex gap-8 border-b border-gray-600">
              <button className="text-white text-sm font-medium pb-3 border-b-2 border-blue-500">
                OVERVIEW
              </button>
              <button className="text-gray-400 text-sm font-medium pb-3 hover:text-white transition-colors">
                ROI
              </button>
              <button className="text-gray-400 text-sm font-medium pb-3 hover:text-white transition-colors">
                Risk
              </button>
              <button className="text-gray-400 text-sm font-medium pb-3 hover:text-white transition-colors">
                Dependencies
              </button>
              <button className="text-gray-400 text-sm font-medium pb-3 hover:text-white transition-colors">
                Trace
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-6 overflow-y-auto">
            {/* Executive Summary */}
            <div className="mb-8">
              <h3 className="text-gray-400 text-xs font-medium uppercase tracking-wide mb-3">
                EXECUTIVE SUMMARY:
              </h3>
              <p className="text-white text-sm leading-relaxed">
                {recommendation.description}
              </p>
            </div>

            {/* Expected Impact & Implementation Timeline */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-black bg-opacity-40 p-4 rounded-lg">
                <h4 className="text-gray-400 text-xs font-medium uppercase tracking-wide mb-3">
                  EXPECTED IMPACT:
                </h4>
                <div className="text-white text-xl font-medium mb-1">
                  {recommendation.amount}
                  <span className="text-sm font-normal">
                    {recommendation.period}
                  </span>
                </div>
                <div className="text-gray-400 text-xs">
                  with {recommendation.confidence} confidence level
                </div>
              </div>

              <div className="bg-black bg-opacity-40 p-4 rounded-lg">
                <h4 className="text-gray-400 text-xs font-medium uppercase tracking-wide mb-3">
                  IMPLEMENTATION TIMELINE:
                </h4>
                <div className="text-white text-xl font-medium mb-1">
                  3-6 months
                </div>
                <div className="text-gray-400 text-xs">
                  with phased rollout approach
                </div>
              </div>
            </div>

            {/* Key Drivers */}
            <div className="mb-8">
              <h3 className="text-gray-400 text-xs font-medium uppercase tracking-wide mb-4">
                KEY DRIVERS:
              </h3>
              <div className="flex gap-3">
                <div className="bg-black bg-opacity-40 px-3 py-2 rounded text-white text-xs">
                  Workforce utilization gaps
                </div>
                <div className="bg-black bg-opacity-40 px-3 py-2 rounded text-white text-xs">
                  Peak demand misalignment
                </div>
                <div className="bg-black bg-opacity-40 px-3 py-2 rounded text-white text-xs">
                  Overtime reduction opportunity
                </div>
              </div>
            </div>

            {/* Data Sources */}
            <div>
              <h3 className="text-gray-400 text-xs font-medium uppercase tracking-wide mb-3">
                DATA SOURCES:
              </h3>
              <div className="text-white text-sm font-medium">
                {recommendation.sources}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecommendationDrawer;
