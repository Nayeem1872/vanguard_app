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

      const fetchRecommendationData = async () => {
        try {
          setLoading(true);
          const response = await axios.get(
            `/api/ai/recommendations/overview?recId=${id}`
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

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: "url('/images/BG.jpg')" }}
    >
      {/* Background image with overlay */}
      <Header />

      <div className="relative z-10 bg-black/20 backdrop-blur-custom ">
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
            <span className="text-gray-rgba(255, 255, 255, 1) text-sm cursor-pointer">
              About this page (ID: {id})
            </span>
          </div>
        </div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-4">
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

            {activeTab === "Risk" && <RiskAnalysis />}

            {activeTab === "Dependencies" && <DependencyImpact />}

            {activeTab === "Trace" && <Timeline />}
          </>
        )}
      </div>
    </div>
  );
};

export default CardDetailsPage;
