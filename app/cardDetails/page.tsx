"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/DecisionEngineComponent/Header";

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
      <div className="flex justify-between bg-zinc-900 max-w-[1440px] py-4 mx-auto items-center ">
        <div className="flex items-center space-x-2 ">
          <div className="flex cursor-pointer ">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
            >
              <path
                d="M15 19L8 12L15 5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Return to Results</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center cursor-pointer ">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
            >
              <path
                d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>About this page</span>
          </div>
        </div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
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
        {activeTab === "Overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Executive Summary */}
            <div className="bg-[#1E1E1E] rounded-xl p-6 col-span-3">
              <h2 className="text-[#A3A3A3] text-lg font-medium mb-4">
                Executive Summary:
              </h2>
              <p className="text-white">
                Analysis of material flow patterns at Site B reveals a 27%
                inefficiency in the current routing configuration. Reconfiguring
                the material routing pathways can reduce transit time by 32% and
                increase throughput capacity by 18%, directly addressing the
                bottlenecks identified in the receiving and processing areas.
              </p>
            </div>

            {/* Key Drivers */}
            <div className="bg-[#1E1E1E] rounded-xl p-6 col-span-3">
              <h2 className="text-[#A3A3A3] text-lg font-medium mb-4">
                Key Drivers
              </h2>

              <div className="bg-[#262626] rounded-xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Driver 1 */}
                  <div className="border border-gray-700 rounded-lg p-4">
                    <div className="flex items-start mb-4">
                      <div className="bg-[#1A4E33] p-2 rounded-full mr-3">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                            stroke="#4ADE80"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white font-medium">
                          Receiving Delay
                        </h3>
                        <p className="text-gray-400 text-sm mt-1">
                          Current receiving process creates a 4.2hr average
                          delay between dock and storage
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Driver 2 */}
                  <div className="border border-gray-700 rounded-lg p-4">
                    <div className="flex items-start mb-4">
                      <div className="bg-[#4F2A1D] p-2 rounded-full mr-3">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 22V12H15V22M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                            stroke="#FB923C"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white font-medium">
                          Low Throughput
                        </h3>
                        <p className="text-gray-400 text-sm mt-1">
                          Current configuration operates at 68% of designed
                          capacity due to routing inefficiencies
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Driver 3 */}
                  <div className="border border-gray-700 rounded-lg p-4">
                    <div className="flex items-start mb-4">
                      <div className="bg-[#312E81] p-2 rounded-full mr-3">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 20L3 17V4L9 7M9 20L15 17M9 20V7M15 17L21 20V7L15 4M15 17V4M9 7L15 4"
                            stroke="#818CF8"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white font-medium">
                          Excessive Transit Distance
                        </h3>
                        <p className="text-gray-400 text-sm mt-1">
                          Materials travel 42% further than optimal path between
                          processing stations
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Proposed Solution */}
            <div className="bg-[#1E1E1E] rounded-xl p-6 col-span-3 lg:col-span-2">
              <h2 className="text-[#A3A3A3] text-lg font-medium mb-4">
                Proposed Solution
              </h2>
              <div className="space-y-4">
                <div className="bg-[#262626] rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">
                    Redesigned Material Flow
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Implement a redesigned material flow pattern that reduces
                    transit distance by 42% and eliminates cross-traffic in
                    high-congestion areas. The new configuration creates
                    dedicated lanes for inbound and outbound materials, reducing
                    wait times at intersections by 78%.
                  </p>
                </div>

                <div className="bg-[#262626] rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">
                    Receiving Process Optimization
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Reconfigure the receiving area to enable direct putaway to
                    primary storage locations, bypassing the current staging
                    area that creates a 4.2hr delay. This change reduces
                    handling by 50% and improves inventory accuracy by 12%.
                  </p>
                </div>

                <div className="bg-[#262626] rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">
                    Workstation Relocation
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Relocate 3 key workstations to optimize the process flow and
                    reduce travel distance. This change eliminates 68% of the
                    current backtracking in the material flow and creates a more
                    linear process.
                  </p>
                </div>
              </div>
            </div>

            {/* Implementation Timeline */}
            <div className="bg-[#1E1E1E] rounded-xl p-6 col-span-3 lg:col-span-1">
              <h2 className="text-[#A3A3A3] text-lg font-medium mb-4">
                Implementation Timeline
              </h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[#1A4EFF] flex items-center justify-center mr-3">
                    <span className="text-white font-medium">1</span>
                  </div>
                  <div>
                    <h3 className="text-white text-sm font-medium">
                      Planning & Design
                    </h3>
                    <p className="text-gray-400 text-xs">2 weeks</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[#1A4EFF] flex items-center justify-center mr-3">
                    <span className="text-white font-medium">2</span>
                  </div>
                  <div>
                    <h3 className="text-white text-sm font-medium">
                      Pilot Implementation
                    </h3>
                    <p className="text-gray-400 text-xs">3 weeks</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[#1A4EFF] flex items-center justify-center mr-3">
                    <span className="text-white font-medium">3</span>
                  </div>
                  <div>
                    <h3 className="text-white text-sm font-medium">
                      Full Deployment
                    </h3>
                    <p className="text-gray-400 text-xs">4 weeks</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[#1A4EFF] flex items-center justify-center mr-3">
                    <span className="text-white font-medium">4</span>
                  </div>
                  <div>
                    <h3 className="text-white text-sm font-medium">
                      Optimization & Training
                    </h3>
                    <p className="text-gray-400 text-xs">3 weeks</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">
                      Total Duration:
                    </span>
                    <span className="text-white font-medium">12 weeks</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Expected Benefits */}
            <div className="bg-[#1E1E1E] rounded-xl p-6 col-span-3">
              <h2 className="text-[#A3A3A3] text-lg font-medium mb-4">
                Expected Benefits
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#262626] rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-[#1A4E33] flex items-center justify-center mr-3">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 8V16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                          stroke="#4ADE80"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h3 className="text-white font-medium">Productivity</h3>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <svg
                        className="w-4 h-4 text-green-500 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="text-gray-300">
                        32% reduction in transit time
                      </span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-4 h-4 text-green-500 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="text-gray-300">
                        18% increase in throughput
                      </span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-4 h-4 text-green-500 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="text-gray-300">
                        50% reduction in handling
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-[#262626] rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-[#1E3A8A] flex items-center justify-center mr-3">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 8C10.8954 8 10 7.10457 10 6C10 4.89543 10.8954 4 12 4C13.1046 4 14 4.89543 14 6C14 7.10457 13.1046 8 12 8Z"
                          stroke="#93C5FD"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 20C10.8954 20 10 19.1046 10 18C10 16.8954 10.8954 16 12 16C13.1046 16 14 16.8954 14 18C14 19.1046 13.1046 20 12 20Z"
                          stroke="#93C5FD"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14Z"
                          stroke="#93C5FD"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M18 14C16.8954 14 16 13.1046 16 12C16 10.8954 16.8954 10 18 10C19.1046 10 20 10.8954 20 12C20 13.1046 19.1046 14 18 14Z"
                          stroke="#93C5FD"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6 14C4.89543 14 4 13.1046 4 12C4 10.8954 4.89543 10 6 10C7.10457 10 8 10.8954 8 12C8 13.1046 7.10457 14 6 14Z"
                          stroke="#93C5FD"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h3 className="text-white font-medium">
                      Quality & Accuracy
                    </h3>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <svg
                        className="w-4 h-4 text-blue-500 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="text-gray-300">
                        12% improvement in inventory accuracy
                      </span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-4 h-4 text-blue-500 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="text-gray-300">
                        8% reduction in damage rates
                      </span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-4 h-4 text-blue-500 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="text-gray-300">
                        15% fewer processing errors
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-[#262626] rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-[#4F2A1D] flex items-center justify-center mr-3">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 2V6M12 18V22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93"
                          stroke="#FB923C"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h3 className="text-white font-medium">Financial Impact</h3>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <svg
                        className="w-4 h-4 text-orange-500 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="text-gray-300">
                        $127,450 quarterly savings
                      </span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-4 h-4 text-orange-500 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="text-gray-300">
                        3.2 month payback period
                      </span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-4 h-4 text-orange-500 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="text-gray-300">
                        22% ROI in first year
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Plan Tab Content */}
        {activeTab === "Action Plan" && (
          <div className="space-y-6">
            {/* 5 Whys Root Cause Analysis */}
            <div className="bg-[#1E1E1E] rounded-xl p-6">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => togglePhase("rootCause")}
              >
                <h2 className="text-white text-lg font-medium">
                  5 Whys Root Cause Analysis
                </h2>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transform transition-transform ${
                    expandedPhases.rootCause ? "rotate-180" : ""
                  }`}
                >
                  <path
                    d="M7 10L12 15L17 10"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {expandedPhases.rootCause && (
                <div className="mt-4 space-y-4">
                  <div className="bg-[#262626] rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-[#1A4EFF] flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-white font-medium">1</span>
                      </div>
                      <div>
                        <h3 className="text-white font-medium">
                          Why is material flow inefficient?
                        </h3>
                        <p className="text-gray-400 mt-2">
                          Because the current routing configuration creates
                          excessive travel distances and cross-traffic.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#262626] rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-[#1A4EFF] flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-white font-medium">2</span>
                      </div>
                      <div>
                        <h3 className="text-white font-medium">
                          Why does the routing create excessive travel?
                        </h3>
                        <p className="text-gray-400 mt-2">
                          Because workstations were positioned based on
                          department grouping rather than process flow.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#262626] rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-[#1A4EFF] flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-white font-medium">3</span>
                      </div>
                      <div>
                        <h3 className="text-white font-medium">
                          Why were workstations positioned by department?
                        </h3>
                        <p className="text-gray-400 mt-2">
                          Because the facility layout was designed before the
                          current product mix was introduced.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#262626] rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-[#1A4EFF] flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-white font-medium">4</span>
                      </div>
                      <div>
                        <h3 className="text-white font-medium">
                          Why wasn't the layout updated for the new product mix?
                        </h3>
                        <p className="text-gray-400 mt-2">
                          Because there was no systematic process for evaluating
                          material flow efficiency after product changes.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#262626] rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-[#1A4EFF] flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-white font-medium">5</span>
                      </div>
                      <div>
                        <h3 className="text-white font-medium">
                          Why was there no process for evaluating flow
                          efficiency?
                        </h3>
                        <p className="text-gray-400 mt-2">
                          Because material flow optimization was not identified
                          as a key performance indicator in operational reviews.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#312E81] rounded-lg p-4 mt-6">
                    <h3 className="text-white font-medium mb-2">Root Cause:</h3>
                    <p className="text-gray-200">
                      The root cause of inefficient material flow is the absence
                      of material flow metrics in operational KPIs, resulting in
                      layout decisions that prioritized departmental grouping
                      over process efficiency.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Phased Implementation Timeline */}
            <div>
              <h2 className="text-[#A3A3A3] text-lg font-medium mb-4">
                Phased Implementation Timeline
              </h2>

              {/* Phase 1 */}
              <div className="bg-[#1E1E1E] rounded-xl mb-4">
                <div className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-white font-medium">
                        Phase 1: Assessment & Baseline
                      </h3>
                      <p className="text-[#A3A3A3] text-sm mt-1">0-30 days</p>
                    </div>
                    <div className="flex items-center">
                      <span className="bg-[#1A4E33] text-white text-xs px-3 py-1 rounded-full">
                        Ready
                      </span>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`ml-4 transform transition-transform cursor-pointer ${
                          expandedPhases.phase1 ? "rotate-180" : ""
                        }`}
                        onClick={() => togglePhase("phase1")}
                      >
                        <path
                          d="M7 10L12 15L17 10"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {expandedPhases.phase1 && (
                  <div className="px-6 pb-6 border-t border-gray-700 pt-4">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-[#1E1E1E] border border-gray-700 flex items-center justify-center mr-4 flex-shrink-0">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9 12H15M12 9V15M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-white">
                            Document current material flow patterns and measure
                            baseline metrics
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-[#1E1E1E] border border-gray-700 flex items-center justify-center mr-4 flex-shrink-0">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9 12H15M12 9V15M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-white">
                            Conduct time-motion studies at key process
                            intersections
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-[#1E1E1E] border border-gray-700 flex items-center justify-center mr-4 flex-shrink-0">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9 12H15M12 9V15M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-white">
                            Create detailed process maps for all material
                            handling operations
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-[#1E1E1E] border border-gray-700 flex items-center justify-center mr-4 flex-shrink-0">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9 12H15M12 9V15M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-white">
                            Identify bottlenecks and high-congestion areas
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Phase 2 */}
              <div className="bg-[#1E1E1E] rounded-xl mb-4">
                <div className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-white font-medium">
                        Phase 2: Training & Quick Wins
                      </h3>
                      <p className="text-[#A3A3A3] text-sm mt-1">30-90 days</p>
                    </div>
                    <div className="flex items-center">
                      <span className="bg-[#312E81] text-white text-xs px-3 py-1 rounded-full">
                        Planned
                      </span>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`ml-4 transform transition-transform cursor-pointer ${
                          expandedPhases.phase2 ? "rotate-180" : ""
                        }`}
                        onClick={() => togglePhase("phase2")}
                      >
                        <path
                          d="M7 10L12 15L17 10"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {expandedPhases.phase2 && (
                  <div className="px-6 pb-6 border-t border-gray-700 pt-4">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-[#1E1E1E] border border-gray-700 flex items-center justify-center mr-4 flex-shrink-0">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 4V14M12 14L16 10M12 14L8 10M20 16V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V16"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-white">
                            Implement targeted training programs based on
                            individual needs
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-[#1E1E1E] border border-gray-700 flex items-center justify-center mr-4 flex-shrink-0">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9 12.75L11.25 15L15 9.75M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-white">
                            Deploy peer mentoring system with high-performing
                            employees
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-[#1E1E1E] border border-gray-700 flex items-center justify-center mr-4 flex-shrink-0">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15.5 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V8.5M15.5 3L21 8.5M15.5 3V8.5H21M12 12H12.01M12 16H12.01M8 12H8.01M8 16H8.01M8 8H8.01"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-white">
                            Implement quick-win layout changes in receiving area
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-[#1E1E1E] border border-gray-700 flex items-center justify-center mr-4 flex-shrink-0">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-white">
                            Establish new material flow KPIs and monitoring
                            system
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Phase 3 */}
              <div className="bg-[#1E1E1E] rounded-xl mb-4">
                <div className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-white font-medium">
                        Phase 3: Major Reconfiguration
                      </h3>
                      <p className="text-[#A3A3A3] text-sm mt-1">90-150 days</p>
                    </div>
                    <div className="flex items-center">
                      <span className="bg-[#312E81] text-white text-xs px-3 py-1 rounded-full">
                        Planned
                      </span>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`ml-4 transform transition-transform cursor-pointer ${
                          expandedPhases.phase3 ? "rotate-180" : ""
                        }`}
                        onClick={() => togglePhase("phase3")}
                      >
                        <path
                          d="M7 10L12 15L17 10"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {expandedPhases.phase3 && (
                  <div className="px-6 pb-6 border-t border-gray-700 pt-4">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-[#1E1E1E] border border-gray-700 flex items-center justify-center mr-4 flex-shrink-0">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9 20L3 17V4L9 7M9 20L15 17M9 20V7M15 17L21 20V7L15 4M15 17V4M9 7L15 4"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-white">
                            Relocate 3 key workstations to optimize process flow
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-[#1E1E1E] border border-gray-700 flex items-center justify-center mr-4 flex-shrink-0">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9 6H20M9 12H20M9 18H20M5 6V6.01M5 12V12.01M5 18V18.01"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-white">
                            Implement dedicated lanes for inbound and outbound
                            materials
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-[#1E1E1E] border border-gray-700 flex items-center justify-center mr-4 flex-shrink-0">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M14.7519 11.1679L11.5547 9.03647M11.5547 9.03647L12.6953 5.50679M11.5547 9.03647L9.46963 14.0001M15.7519 4.00012L14.2519 8.50012L17.7519 11.0001L13.2519 12.5001L11.7519 17.0001L9.25195 13.5001L4.75195 12.0001L8.25195 9.50012L6.75195 5.00012L11.2519 6.50012L15.7519 4.00012Z"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-white">
                            Reconfigure receiving area for direct putaway to
                            primary storage
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-[#1E1E1E] border border-gray-700 flex items-center justify-center mr-4 flex-shrink-0">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9 17V15M12 17V13M15 17V11M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-white">
                            Update inventory management system to support new
                            flow patterns
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Phase 4 */}
              <div className="bg-[#1E1E1E] rounded-xl">
                <div className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-white font-medium">
                        Phase 4: Optimization & Continuous Improvement
                      </h3>
                      <p className="text-[#A3A3A3] text-sm mt-1">
                        150-180 days
                      </p>
                    </div>
                    <div className="flex items-center">
                      <span className="bg-[#312E81] text-white text-xs px-3 py-1 rounded-full">
                        Planned
                      </span>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`ml-4 transform transition-transform cursor-pointer ${
                          expandedPhases.phase4 ? "rotate-180" : ""
                        }`}
                        onClick={() => togglePhase("phase4")}
                      >
                        <path
                          d="M7 10L12 15L17 10"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {expandedPhases.phase4 && (
                  <div className="px-6 pb-6 border-t border-gray-700 pt-4">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-[#1E1E1E] border border-gray-700 flex items-center justify-center mr-4 flex-shrink-0">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-white">
                            Conduct post-implementation assessment and
                            fine-tuning
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-[#1E1E1E] border border-gray-700 flex items-center justify-center mr-4 flex-shrink-0">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12.9 3H11.1C10.6 3 10.1 3.2 9.8 3.6L9.1 4.8C8.8 5.2 8.3 5.4 7.8 5.4C7.3 5.3 6.8 5.1 6.4 4.7L5.3 3.6C4.9 3.2 4.5 3 4 3C3.5 3 3.1 3.2 2.7 3.6L2.6 3.7C2.2 4.1 2 4.5 2 5C2 5.5 2.2 5.9 2.6 6.3L3.7 7.4C4.1 7.8 4.3 8.3 4.3 8.8C4.3 9.3 4.1 9.8 3.7 10.2C3.3 10.5 3.1 11 3.1 11.5V12.9C3.1 13.4 3.3 13.9 3.7 14.2C4.1 14.6 4.3 15.1 4.3 15.6C4.3 16.1 4.1 16.6 3.7 17L2.6 18.1C2.2 18.5 2 18.9 2 19.4C2 19.9 2.2 20.3 2.6 20.7L2.7 20.8C3.1 21.2 3.5 21.4 4 21.4C4.5 21.4 4.9 21.2 5.3 20.8L6.4 19.7C6.8 19.3 7.3 19.1 7.8 19.1C8.3 19.1 8.8 19.3 9.1 19.7C9.5 20.1 10 20.3 10.5 20.3H12.9C13.4 20.3 13.9 20.1 14.2 19.7C14.6 19.3 15.1 19.1 15.6 19.1C16.1 19.1 16.6 19.3 17 19.7L18.1 20.8C18.5 21.2 18.9 21.4 19.4 21.4C19.9 21.4 20.3 21.2 20.7 20.8L20.8 20.7C21.2 20.3 21.4 19.9 21.4 19.4C21.4 18.9 21.2 18.5 20.8 18.1L19.7 17C19.3 16.6 19.1 16.1 19.1 15.6C19.1 15.1 19.3 14.6 19.7 14.2C20.1 13.8 20.3 13.3 20.3 12.8V11.4C20.3 10.9 20.1 10.4 19.7 10C19.3 9.6 19.1 9.1 19.1 8.6C19.1 8.1 19.3 7.6 19.7 7.2L20.8 6.1C21.2 5.7 21.4 5.3 21.4 4.8C21.4 4.3 21.2 3.9 20.8 3.5L20.7 3.4C20.3 3 19.9 2.8 19.4 2.8C18.9 2.8 18.5 3 18.1 3.4L17 4.5C16.6 4.9 16.1 5.1 15.6 5.1C15.1 5.1 14.6 4.9 14.2 4.5C13.9 4.2 13.4 4 12.9 4"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-white">
                            Establish continuous improvement process for
                            material flow
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-[#1E1E1E] border border-gray-700 flex items-center justify-center mr-4 flex-shrink-0">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16 8V16M12 11V16M8 14V16M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-white">
                            Implement advanced analytics for predictive flow
                            optimization
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-[#1E1E1E] border border-gray-700 flex items-center justify-center mr-4 flex-shrink-0">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 14L12 4M12 14L9 11M12 14L15 11M12 20H21M3 20H8"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-white">
                            Document standard operating procedures for new
                            material flow
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

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
