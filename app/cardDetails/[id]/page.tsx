"use client";
"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Header from "../../components/DecisionEngineComponent/Header";
import Overview from "../Overview";
import ActionPlan from "../../components/DecisionEngineComponent/ActionPlan";
import Image from "next/image";
import ROI from "../ROI";
import RiskAnalysis from "../Risk";
import DependencyImpact from "../Dependency";
import Timeline from "../Trace";

const CardDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [activeTab, setActiveTab] = useState("Overview");
  const [recommendationData, setRecommendationData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [videoStatus, setVideoStatus] = useState("loading");
  const [showAboutDialog, setShowAboutDialog] = useState(false);

  const [expandedPhases, setExpandedPhases] = useState<{
    [key: string]: boolean;
  }>({
    phase1: true,
    phase2: true,
    phase3: false,
    phase4: false,
    rootCause: false,
  });

  const handleReturnToResults = () => {
    router.push("/");
  };

  const togglePhase = (phase: string) => {
    setExpandedPhases((prev) => ({
      ...prev,
      [phase]: !prev[phase],
    }));
  };

  // Fetch recommendation data based on ID
  useEffect(() => {
    if (id) {
      console.log("Recommendation ID:", id);

      // Store ID in localStorage
      localStorage.setItem("currentRecommendationId", id);

      const fetchRecommendationData = async () => {
        try {
          setLoading(true);

          // Get auth token from localStorage
          const authToken =
            typeof window !== "undefined"
              ? localStorage.getItem("authToken")
              : null;
          console.log("Auth token retrieved:", authToken);

          // Create headers object with authorization
          const headers: any = {};
          if (authToken) {
            headers.Authorization = `Bearer ${authToken}`;
          }

          const response = await axios.get(
            `/api/ai/recommendations/overview?recId=${id}`,
            { headers }
          );
          console.log("Recommendation data:", response.data);
          setRecommendationData(response.data);
        } catch (error) {
          console.error("Error fetching recommendation:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchRecommendationData();
    }
  }, [id]);

  const tabs = [
    { name: "Overview" },
    { name: "Action Plan" },
    { name: "ROI" },
    { name: "Risk" },
    { name: "Dependencies" },
    { name: "Trace" },
  ];

  // Tab information for the about dialog
  const tabInfo = {
    Overview: {
      title: "Overview",
      description:
        "Comprehensive summary of the recommendation including key metrics, confidence levels, and implementation overview.",
      features: [
        "Executive summary",
        "Key performance indicators",
        "Implementation timeline",
        "Resource requirements",
      ],
    },
    "Action Plan": {
      title: "Action Plan",
      description:
        "Detailed implementation roadmap with phased approach, milestones, and specific action items.",
      features: [
        "Phase-by-phase breakdown",
        "Timeline and milestones",
        "Resource allocation",
        "Success criteria",
      ],
    },
    ROI: {
      title: "Return on Investment",
      description:
        "Financial analysis including cost-benefit analysis, ROI calculations, and payback period projections.",
      features: [
        "Financial projections",
        "Cost breakdown",
        "Revenue impact",
        "Payback analysis",
      ],
    },
    Risk: {
      title: "Risk Analysis",
      description:
        "Comprehensive risk assessment including potential challenges, mitigation strategies, and risk factors.",
      features: [
        "Risk identification",
        "Impact assessment",
        "Mitigation strategies",
        "Contingency planning",
      ],
    },
    Dependencies: {
      title: "Dependencies",
      description:
        "System and process dependencies analysis showing interconnections and potential impact areas.",
      features: [
        "System dependencies",
        "Process flows",
        "Impact analysis",
        "Integration points",
      ],
    },
    Trace: {
      title: "Trace Timeline",
      description:
        "Historical trace and timeline showing the decision-making process and key events leading to this recommendation.",
      features: [
        "Decision timeline",
        "Key events",
        "Process trace",
        "Audit trail",
      ],
    },
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Background Video */}
      <video
        ref={(video) => {}}
        className="fixed inset-0 w-full h-full object-cover"
        style={{ zIndex: -1, filter: "brightness(0.3) contrast(1.2)" }}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onError={(e) => {
          const video = e.target as HTMLVideoElement;

          setVideoStatus(
            "error - " + (video.error?.message || "Unknown error")
          );
        }}
        onLoadStart={() => {
          console.log("Video started loading");
          setVideoStatus("loading");
        }}
        onCanPlay={() => {
          console.log("Video can play");
          setVideoStatus("ready");
        }}
        onLoadedData={() => {
          console.log("Video data loaded");
          setVideoStatus("loaded");
        }}
        onPlay={() => {
          console.log("Video is playing");
          setVideoStatus("playing");
        }}
        onLoadedMetadata={() => {
          console.log("Video metadata loaded");
        }}
        onStalled={() => {
          console.log("Video stalled");
          setVideoStatus("stalled");
        }}
        onSuspend={() => {
          console.log("Video suspended");
          setVideoStatus("suspended");
        }}
      >
        <source src="/video/bg.mp4" type="video/mp4" />
        <source src="/video/bg.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* Fallback background */}

      <div className="relative" style={{ zIndex: 10 }}>
        <Header />
      </div>

      <div
        className="relative bg-black/20 backdrop-blur-sm"
        style={{ zIndex: 10 }}
      >
        <div className="flex justify-between px-24 py-4">
          <div
            className="flex items-center gap-3 text-sm cursor-pointer"
            onClick={handleReturnToResults}
          >
            <img src="/icons/arrow-right.svg" />
            <span>Return to Results</span>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="/icons/info.svg"
              alt="Help"
              width={16}
              height={16}
              className="ml-auto text-gray-400"
            />
            <span
              className="text-gray-rgba(255, 255, 255, 1) text-sm cursor-pointer hover:text-white transition-all duration-150 ease-out"
              onClick={() => setShowAboutDialog(true)}
            >
              About this page
            </span>
          </div>
        </div>
      </div>
      <div
        className="relative max-w-7xl mx-auto px-4 py-4"
        style={{ zIndex: 10 }}
      >
        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex justify-start items-center">
            {tabs.map((tab, index) => (
              <div
                key={index}
                onClick={() => setActiveTab(tab.name)}
                className={`px-10 py-5 cursor-pointer flex justify-center items-center gap-2.5 ${
                  activeTab === tab.name
                    ? "border-b-2 border-blue-700"
                    : "border-b border-gray-400"
                }`}
              >
                <div
                  className={`justify-center text-base font-bold font-helvetica-now leading-normal ${
                    activeTab === tab.name
                      ? "text-white uppercase"
                      : "text-gray-400"
                  }`}
                >
                  {tab.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main content */}
        {loading ? (
          <div className="bg-[#1E1E1E] rounded-xl p-6 text-center">
            <p className="text-gray-400">Loading recommendation data...</p>
          </div>
        ) : (
          <>
            {activeTab === "Overview" && (
              <Overview recommendationData={recommendationData} />
            )}

            {/* Action Plan Tab Content */}
            {activeTab === "Action Plan" && (
              <ActionPlan recommendationData={recommendationData} />
            )}

            {/* ROI Tab Content */}
            {activeTab === "ROI" && (
              <ROI recommendationData={recommendationData} />
            )}

            {activeTab === "Risk" && (
              <RiskAnalysis recommendationData={recommendationData} />
            )}

            {activeTab === "Dependencies" && <DependencyImpact id={id} />}

            {activeTab === "Trace" && <Timeline id={id} />}
          </>
        )}
      </div>

      {/* About Dialog */}
      {showAboutDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-neutral-800 rounded-2xl border border-neutral-600 shadow-2xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            {/* Dialog Header */}
            <div className="flex justify-between items-center p-6 border-b border-neutral-600">
              <h2 className="text-xl font-bold text-white">About This Page</h2>
              <button
                onClick={() => setShowAboutDialog(false)}
                className="text-gray-400 hover:text-white transition-all duration-150 ease-out hover:scale-110"
              >
                <svg
                  className="w-6 h-6"
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

            {/* Dialog Content */}
            <div className="p-6">
              <p className="text-gray-300 mb-6 text-lg">
                Learn more about the current tab and what information it
                provides.
              </p>

              {/* Current Tab Information */}
              <div className="bg-neutral-700 rounded-xl p-6 border-2 border-blue-500 bg-blue-900/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <h3 className="font-bold text-xl text-blue-300">
                    {tabInfo[activeTab as keyof typeof tabInfo].title}
                  </h3>
                  <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                    Current Tab
                  </span>
                </div>

                <p className="text-gray-300 mb-4 leading-relaxed text-lg">
                  {tabInfo[activeTab as keyof typeof tabInfo].description}
                </p>

                <div className="mb-4">
                  <h4 className="text-white font-semibold mb-3 text-lg">
                    Key Features:
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {tabInfo[activeTab as keyof typeof tabInfo].features.map(
                      (feature, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 text-gray-300"
                        >
                          <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></div>
                          <span className="text-base">{feature}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-500/30">
                  <p className="text-blue-200 text-sm">
                    <strong>💡 Tip:</strong> Use the tabs above to navigate
                    between different aspects of this recommendation. Each tab
                    provides specialized insights to help with your
                    decision-making process.
                  </p>
                </div>
              </div>

              {/* Dialog Footer */}
              <div className="mt-6 pt-4 border-t border-neutral-600 flex justify-end">
                <button
                  onClick={() => setShowAboutDialog(false)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-150 ease-out hover:scale-105"
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardDetailsPage;
