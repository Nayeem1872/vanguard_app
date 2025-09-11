"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Lottie from "lottie-react";
import RecommendationCards from "./RecommendationCards";
import rippleAnimation from "../../../public/Ripple loading animation.json";

// Create axios instance with extended timeout
const apiClient = axios.create({
  timeout: 120000, // 2 minutes
  headers: {
    "Content-Type": "application/json",
  },
});

interface RiskFactor {
  label: string;
  level: string;
  color: string;
}

interface Recommendation {
  id?: string;
  _id?: string;
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
  paybackPeriod?: string;
  riskAdjustedROI?: string;
  riskProfileDescription?: string;
  riskFactors?: RiskFactor[];
  dependenciesSnapshotImage?: string;
  systemsInvolved?: string[];
}

interface MainContentProps {
  message: string;
  setMessage: (message: string) => void;
  regionOpen: boolean;
  setRegionOpen: (open: boolean) => void;
  functionOpen: boolean;
  setFunctionOpen: (open: boolean) => void;
  periodOpen: boolean;
  setPeriodOpen: (open: boolean) => void;
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
  selectedFunction: string;
  setSelectedFunction: (func: string) => void;
  selectedPeriod: string;
  setSelectedPeriod: (period: string) => void;
  showRecommendations: boolean;
  handleGenerateRecommendations: () => void;
}

const MainContent = ({
  message,
  setMessage,
  regionOpen,
  setRegionOpen,
  functionOpen,
  setFunctionOpen,
  periodOpen,
  setPeriodOpen,
  selectedRegion,
  setSelectedRegion,
  selectedFunction,
  setSelectedFunction,
  selectedPeriod,
  setSelectedPeriod,
  showRecommendations,
  handleGenerateRecommendations,
}: MainContentProps) => {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  // Loading text rotation state
  const [currentLoadingTextIndex, setCurrentLoadingTextIndex] = useState(0);
  const [isTextTransitioning, setIsTextTransitioning] = useState(false);

  const loadingMessages = [
    "Analyzing material flow across regions…",
    "Scanning for hidden inefficiencies…",
    "Cross-checking ERP and CRM signals…",
    "Tracing dependencies across workflows…",
    "Evaluating procurement cycle bottlenecks…",
    "Assessing risk factors and execution barriers…",
  ];

  // Effect to cycle through loading messages
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (loading) {
      interval = setInterval(() => {
        setIsTextTransitioning(true);

        setTimeout(() => {
          setCurrentLoadingTextIndex(
            (prevIndex) => (prevIndex + 1) % loadingMessages.length
          );
          setIsTextTransitioning(false);
        }, 300); // Half of transition duration for smooth effect
      }, 7000); // Change every 7 seconds
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [loading, loadingMessages.length]);

  // Reset loading text index when loading starts
  useEffect(() => {
    if (loading) {
      setCurrentLoadingTextIndex(0);
      setIsTextTransitioning(false);
    }
  }, [loading]);
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const requestBody = {
        question: message,
        filters: {
          region: selectedRegion,
          func: selectedFunction,
          domain: "",
        },
        period: selectedPeriod,
        org_id: "", // You can add org_id if available
      };

      const response = await apiClient.post("/api/ai/ask", requestBody);
      console.log("API Response:", response.data);

      // Extract recommendations from API response
      if (response.data.success && response.data.data) {
        setRecommendations(response.data.data);
      }

      // Call the existing handler after successful API call
      handleGenerateRecommendations();
    } catch (error) {
      console.error("Error making API request:", error);

      // Check if it's a timeout error
      if (axios.isAxiosError(error)) {
        if (error.code === "ECONNABORTED") {
          console.error("Request timed out after 2 minutes");
          alert("Request is taking longer than expected. Please try again.");
        } else if (error.response) {
          console.error(
            "Server responded with error:",
            error.response.status,
            error.response.data
          );
        } else {
          console.error("Network error:", error.message);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const regions = ["North America", "Europe", "Asia Pacific", "Latin America"];
  const functions = ["Operations", "Marketing", "Finance", "HR", "IT"];
  const periods = [
    "Last 3 months",
    "Last 6 months",
    "Last 12 months",
    "Last 24 months",
    "Custom",
  ];

  return (
    <div className="relative z-10 flex flex-col items-center justify-center px-8 mt-16">
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-neutral-800/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden w-[600px]">
            <div className="flex flex-col items-center p-8">
              <Lottie
                animationData={rippleAnimation}
                style={{ width: 400, height: 400 }}
                loop={true}
              />
              <div className="relative h-8 flex items-center justify-center">
                <p
                  className={`text-white text-lg transition-all duration-600 ease-out whitespace-nowrap ${
                    isTextTransitioning
                      ? "opacity-0 transform -translate-y-2"
                      : "opacity-100 transform translate-y-0"
                  }`}
                >
                  {loadingMessages[currentLoadingTextIndex]}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-4xl w-full text-center">
        {/* Main Heading */}
        <h2 className="text-4xl font-medium text-white mb-12 leading-tight">
          What business challenge can I help
          <br />
          you optimize?
        </h2>

        {/* Filters */}
        <div className="flex items-center justify-center gap-10 mb-12">
          {/* Region Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setRegionOpen(!regionOpen);
                setFunctionOpen(false);
                setPeriodOpen(false);
              }}
              className="flex items-center gap-1 cursor-pointer"
            >
              <span className="text-gray-400 font-medium">Region:</span>
              <span className="text-white font-semibold">{selectedRegion}</span>
              {/* <span className="text-gray-400 text-sm">▼</span> */}
              <img src="/icons/arrow_up.svg" alt="" />
            </button>
            {regionOpen && (
              <div className="absolute top-full bg-black border border-black rounded-sm shadow-lg z-20 min-w-[200px]">
                {regions.map((region) => (
                  <button
                    key={region}
                    onClick={() => {
                      setSelectedRegion(region);
                      setRegionOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {region}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Function Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setFunctionOpen(!functionOpen);
                setRegionOpen(false);
                setPeriodOpen(false);
              }}
              className="flex items-center gap-1 cursor-pointer"
            >
              <span className="text-gray-400 font-medium">Function:</span>
              <span className="text-white font-semibold">
                {selectedFunction}
              </span>
              <img src="/icons/arrow_up.svg" alt="" />
            </button>
            {functionOpen && (
              <div className="absolute top-full mt-2 bg-black border border-black rounded-sm shadow-lg z-20 min-w-[200px]">
                {functions.map((func) => (
                  <button
                    key={func}
                    onClick={() => {
                      setSelectedFunction(func);
                      setFunctionOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {func}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Period Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setPeriodOpen(!periodOpen);
                setRegionOpen(false);
                setFunctionOpen(false);
              }}
              className="flex items-center gap-1 cursor-pointer"
            >
              <span className="text-gray-400 font-medium">Period:</span>
              <span className="text-white font-semibold">{selectedPeriod}</span>
              <img src="/icons/arrow_up.svg" alt="" />
            </button>
            {periodOpen && (
              <div className="absolute top-full mt-2 bg-black border border-black rounded-sm shadow-lg z-20 min-w-[200px]">
                {periods.map((period) => (
                  <button
                    key={period}
                    onClick={() => {
                      setSelectedPeriod(period);
                      setPeriodOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {period}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Input Form */}
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Text Area */}
          <div className="relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message ..."
              className="w-full h-32 border rounded-2xl px-6 py-5 text-white placeholder-gray-400 resize-none focus:outline-none"
              style={{
                backgroundColor: "rgba(36, 38, 40, 1)",
                borderColor: "#515151",
              }}
              disabled={loading}
            />
          </div>

          <button
            onClick={handleSubmit}
            type="submit"
            className="flex flex-col relative min-h-14 w-full items-center gap-2.5 cursor-pointer text-xl text-white font-bold justify-center mt-[30px] px-10 py-[13px] rounded-[60px] max-md:max-w-full max-md:px-5 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          >
            <img
              src="https://api.builder.io/api/v1/image/assets/433102d2ca2a4e4793d38efcc106433f/a9f182a9723e0b30560f0d1fcc6edfcd62e18b3e?placeholderIfAbsent=true"
              alt=""
              className="absolute h-full w-full object-cover inset-0 rounded-[60px]"
            />
          </button>
        </div>

        {/* Recommendation Cards */}
        <RecommendationCards
          showRecommendations={showRecommendations}
          recommendations={recommendations}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default MainContent;
