import React from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/DecisionEngineComponent/Header";

const CardDetailsPage = () => {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Background image with overlay */}
      {/* <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image 
            src="/images/BG.jpg" 
            alt="Background" 
            fill 
            className="object-cover opacity-15"
          />
        </div>
      </div> */}
      <Header />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header with logo */}
        <div className="flex justify-between items-center mb-8">
          <div className="h-10 w-40 relative">
            <Image
              src="/next.svg"
              alt="Vanguard Logo"
              width={160}
              height={40}
              className="object-contain"
            />
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-[#1E1E1E] rounded-lg px-4 py-2 cursor-pointer hover:bg-[#2C2C2C] transition-colors">
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
            <div className="flex items-center bg-[#1E1E1E] rounded-lg px-4 py-2 cursor-pointer hover:bg-[#2C2C2C] transition-colors">
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

        {/* Tabs */}
        <div className="flex mb-8 overflow-x-auto">
          {[
            { name: "Overview", active: true },
            { name: "Action Plan", active: false },
            { name: "ROI", active: false },
            { name: "Risk", active: false },
            { name: "Dependencies", active: false },
            { name: "Trace", active: false },
          ].map((tab, index) => (
            <div
              key={index}
              className={`px-6 py-3 border-b-2 cursor-pointer whitespace-nowrap ${
                tab.active
                  ? "border-white text-white font-medium"
                  : "border-gray-600 text-gray-400 hover:text-gray-300 hover:border-gray-500"
              }`}
            >
              {tab.name}
            </div>
          ))}
        </div>

        {/* Main content */}
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
                        Current receiving process creates a 4.2hr average delay
                        between dock and storage
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
                      <h3 className="text-white font-medium">Low Throughput</h3>
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
                  high-congestion areas. The new configuration creates dedicated
                  lanes for inbound and outbound materials, reducing wait times
                  at intersections by 78%.
                </p>
              </div>

              <div className="bg-[#262626] rounded-lg p-4">
                <h3 className="text-white font-medium mb-2">
                  Receiving Process Optimization
                </h3>
                <p className="text-gray-400 text-sm">
                  Reconfigure the receiving area to enable direct putaway to
                  primary storage locations, bypassing the current staging area
                  that creates a 4.2hr delay. This change reduces handling by
                  50% and improves inventory accuracy by 12%.
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
                  <span className="text-gray-400 text-sm">Total Duration:</span>
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
                  <h3 className="text-white font-medium">Quality & Accuracy</h3>
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
                    <span className="text-gray-300">22% ROI in first year</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetailsPage;
