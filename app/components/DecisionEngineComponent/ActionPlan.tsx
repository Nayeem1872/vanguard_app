"use client";
import React, { useState } from "react";

const ActionPlan = () => {
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

  return (
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
            {/* Root cause analysis content - keeping it condensed */}
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="bg-[#262626] rounded-lg p-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-[#1A4EFF] flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-white font-medium">{num}</span>
                  </div>
                  <div>
                    <h3 className="text-white font-medium">
                      Why Question {num}
                    </h3>
                    <p className="text-gray-400 mt-2">
                      Analysis content for question {num}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-[#312E81] rounded-lg p-4 mt-6">
              <h3 className="text-white font-medium mb-2">Root Cause:</h3>
              <p className="text-gray-200">
                The root cause of inefficient material flow is the absence of
                material flow metrics in operational KPIs.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Implementation Timeline */}
      <div>
        <h2 className="text-[#A3A3A3] text-lg font-medium mb-4">
          Phased Implementation Timeline
        </h2>

        {/* Phases 1-4 - condensed version */}
        {[
          {
            phase: "phase1",
            title: "Phase 1: Assessment & Baseline",
            days: "0-30 days",
            status: "Ready",
            color: "bg-[#1A4E33]",
          },
          {
            phase: "phase2",
            title: "Phase 2: Training & Quick Wins",
            days: "30-90 days",
            status: "Planned",
            color: "bg-[#312E81]",
          },
          {
            phase: "phase3",
            title: "Phase 3: Major Reconfiguration",
            days: "90-150 days",
            status: "Planned",
            color: "bg-[#312E81]",
          },
          {
            phase: "phase4",
            title: "Phase 4: Optimization & Continuous Improvement",
            days: "150-180 days",
            status: "Planned",
            color: "bg-[#312E81]",
          },
        ].map((item, index) => (
          <div
            key={item.phase}
            className={`bg-[#1E1E1E] rounded-xl ${index < 3 ? "mb-4" : ""}`}
          >
            <div className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-white font-medium">{item.title}</h3>
                  <p className="text-[#A3A3A3] text-sm mt-1">{item.days}</p>
                </div>
                <div className="flex items-center">
                  <span
                    className={`${item.color} text-white text-xs px-3 py-1 rounded-full`}
                  >
                    {item.status}
                  </span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`ml-4 transform transition-transform cursor-pointer ${
                      expandedPhases[item.phase] ? "rotate-180" : ""
                    }`}
                    onClick={() => togglePhase(item.phase)}
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

            {expandedPhases[item.phase] && (
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
                        {item.title} implementation details and tasks
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActionPlan;
