"use client";
import React, { useState } from "react";

import Header from "../components/DecisionEngineComponent/Header";
import Overview from "./Overview";
import ActionPlan from "../components/DecisionEngineComponent/ActionPlan";
import Image from "next/image";

const CardDetailsPage = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [expandedPhases, setExpandedPhases] = useState<{
    [key: string]: boolean;
  }>({
    phase1: true,
    phase2: true,
    phase3: false,
    phase4: false,
    rootCause: false,
  });

  const togglePhase = (phase: string) => {
    setExpandedPhases((prev) => ({
      ...prev,
      [phase]: !prev[phase],
    }));
  };

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
          <div className="flex items-center gap-3 text-sm">
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
              About this page
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
        {activeTab === "Overview" && <Overview />}

        {/* Action Plan Tab Content */}
        {activeTab === "Action Plan" && <ActionPlan />}

        {/* Placeholder content for other tabs */}
        {activeTab === "ROI" && (
          <div className="bg-[#1E1E1E] rounded-xl p-6">
            <h2 className="text-white text-lg font-medium mb-4">
              ROI Analysis
            </h2>
            <p className="text-gray-400">ROI content will be displayed here.</p>
          </div>
        )}

        {activeTab === "Risk" && (
          <div className="bg-[#1E1E1E] rounded-xl p-6">
            <h2 className="text-white text-lg font-medium mb-4">
              Risk Assessment
            </h2>
            <p className="text-gray-400">
              Risk assessment content will be displayed here.
            </p>
          </div>
        )}

        {activeTab === "Dependencies" && (
          <div className="bg-[#1E1E1E] rounded-xl p-6">
            <h2 className="text-white text-lg font-medium mb-4">
              Dependencies
            </h2>
            <p className="text-gray-400">
              Dependencies content will be displayed here.
            </p>
          </div>
        )}

        {activeTab === "Trace" && (
          <div className="bg-[#1E1E1E] rounded-xl p-6">
            <h2 className="text-white text-lg font-medium mb-4">
              Trace Analysis
            </h2>
            <p className="text-gray-400">
              Trace analysis content will be displayed here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardDetailsPage;
