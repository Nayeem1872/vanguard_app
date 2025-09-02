"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Header from "../../components/DecisionEngineComponent/Header";
import Overview from "../Overview";
import ActionPlan from "../../components/DecisionEngineComponent/ActionPlan";
import Image from "next/image";
import ROI from "../ROI";

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

            {activeTab === "Risk" && (
              <div className="bg-[#1E1E1E] rounded-xl p-6">
                <h2 className="text-white text-lg font-medium mb-4">
                  Risk Assessment -{" "}
                  {recommendationData?.data?.recommendation?.title ||
                    `Recommendation ${id}`}
                </h2>

                {recommendationData?.data?.recommendation && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span
                        className={`px-3 py-1 rounded text-sm font-medium ${recommendationData.data.recommendation.riskColor}`}
                      >
                        {recommendationData.data.recommendation.risk}
                      </span>
                      <span className="text-gray-300">
                        {
                          recommendationData.data.recommendation
                            .riskProfileDescription
                        }
                      </span>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-white font-medium">Risk Factors:</h3>
                      {recommendationData.data.recommendation.riskFactors?.map(
                        (factor: any, index: number) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-800 rounded"
                          >
                            <span className="text-gray-300">
                              {factor.label}
                            </span>
                            <span
                              className={`px-2 py-1 rounded text-xs ${factor.color}`}
                            >
                              {factor.level}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "Dependencies" && (
              <div className="bg-[#1E1E1E] rounded-xl p-6">
                <h2 className="text-white text-lg font-medium mb-4">
                  Dependencies -{" "}
                  {recommendationData?.data?.recommendation?.title ||
                    `Recommendation ${id}`}
                </h2>

                {recommendationData?.data?.recommendation && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-white font-medium mb-3">
                        Systems Involved:
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {recommendationData.data.recommendation.systemsInvolved?.map(
                          (system: string, index: number) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-900 text-blue-200 rounded text-sm"
                            >
                              {system}
                            </span>
                          )
                        )}
                      </div>
                    </div>

                    {recommendationData.data.recommendation
                      .dependenciesSnapshotImage && (
                      <div>
                        <h3 className="text-white font-medium mb-3">
                          Dependencies Snapshot:
                        </h3>
                        <Image
                          src={
                            recommendationData.data.recommendation
                              .dependenciesSnapshotImage
                          }
                          alt="Dependencies Snapshot"
                          width={600}
                          height={400}
                          className="rounded"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === "Trace" && (
              <div className="bg-[#1E1E1E] rounded-xl p-6">
                <h2 className="text-white text-lg font-medium mb-4">
                  Trace Analysis -{" "}
                  {recommendationData?.data?.recommendation?.title ||
                    `Recommendation ${id}`}
                </h2>

                {recommendationData?.data?.recommendation && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-800 rounded">
                        <h3 className="text-white font-medium mb-2">
                          Data Sources
                        </h3>
                        <p className="text-gray-300">
                          {recommendationData.data.recommendation.sources}
                        </p>
                      </div>
                      <div className="p-4 bg-gray-800 rounded">
                        <h3 className="text-white font-medium mb-2">
                          Confidence Level
                        </h3>
                        <p
                          className={`font-medium ${recommendationData.data.recommendation.confidenceColor}`}
                        >
                          {recommendationData.data.recommendation.confidence}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-800 rounded">
                      <h3 className="text-white font-medium mb-2">
                        AI Response ID
                      </h3>
                      <p className="text-gray-300 font-mono text-sm">
                        {recommendationData.data.recommendation.ai_response_id}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CardDetailsPage;
