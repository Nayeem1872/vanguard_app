"use client";
import React, { useState } from "react";

interface ActionPlanProps {
  recommendationData?: any;
}

const ActionPlan = ({ recommendationData }: ActionPlanProps) => {
  const timeline = recommendationData?.data?.ai_overview?.overview?.timeline;
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
    <div className="w-full flex justify-center">
      <div className="max-w-[1240px] inline-flex flex-col justify-start items-start gap-5">
        {/* Timeline Header */}

        <div className="w-full flex justify-between items-center rounded-xl p-6">
          <h2 className="text-white text-lg font-medium">
            5 Whys Root Cause Analysis
          </h2>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`transform transition-transform cursor-pointer ${
              expandedPhases.rootCause ? "rotate-180" : ""
            }`}
            onClick={() => togglePhase("rootCause")}
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

        <div className="self-stretch  flex flex-col justify-start items-start">
          <div className="self-stretch justify-start text-gray-400 text-base font-bold font-helvetica-now uppercase leading-normal tracking-widest">
            Phased Implementation Timeline
          </div>
        </div>

        {/* Dynamic Phases from API */}
        {timeline?.phases?.map((phase: any, index: number) => (
          <div
            key={index}
            className="self-stretch p-5 bg-zinc-950 rounded-2xl inline-flex justify-start items-center gap-3"
          >
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-3">
              <div className="self-stretch flex flex-col justify-start items-start gap-2">
                <div className="self-stretch justify-start text-white text-base font-bold font-helvetica-now leading-tight">
                  {phase.name}
                </div>
                <div className="self-stretch justify-start text-gray-400 text-sm font-normal font-helvetica-now">
                  {phase.duration_months} month
                  {phase.duration_months !== 1 ? "s" : ""}
                </div>
              </div>
              <div className="inline-flex justify-start items-center gap-2">
                <div
                  className={`h-7 px-5 py-2.5 ${
                    index === 0
                      ? "bg-teal-800"
                      : index === 1
                      ? "bg-yellow-900"
                      : "bg-blue-900"
                  } rounded-[60px] flex justify-center items-center gap-1.5`}
                >
                  <div
                    className={`justify-start text-[10px] font-bold font-helvetica-now uppercase leading-3 ${
                      index === 0
                        ? "text-white"
                        : index === 1
                        ? "text-white"
                        : "text-indigo-200"
                    }`}
                  >
                    {index === 0 ? "Ready" : index === 1 ? "Planned" : "Future"}
                  </div>
                </div>
              </div>
            </div>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transform transition-transform cursor-pointer"
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
        )) || (
          // Fallback to static phases if no API data
          <>
            <div className="self-stretch p-5 bg-zinc-950 rounded-2xl inline-flex justify-start items-center gap-3">
              <div className="flex-1 inline-flex flex-col justify-start items-start gap-3">
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch justify-start text-white text-base font-bold font-helvetica-now leading-tight">
                    Phase 1: Assessment & Baseline
                  </div>
                  <div className="self-stretch justify-start text-gray-400 text-sm font-normal font-helvetica-now">
                    0-30 days
                  </div>
                </div>
                <div className="inline-flex justify-start items-center gap-2">
                  <div className="h-7 px-5 py-2.5 bg-teal-800 rounded-[60px] flex justify-center items-center gap-1.5">
                    <div className="justify-start text-white text-[10px] font-bold font-helvetica-now uppercase leading-3">
                      Ready
                    </div>
                  </div>
                </div>
              </div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transform transition-transform cursor-pointer"
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
          </>
        )}

        {/* Phase 2 - Collapsible */}
        <div className="self-stretch p-5 bg-zinc-950 rounded-2xl flex flex-col justify-center items-start gap-5">
          {/* Phase 2 Header */}
          <div className="self-stretch inline-flex justify-between items-center">
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-3">
              <div className="self-stretch flex flex-col justify-start items-start gap-2">
                <div className="self-stretch justify-start text-white text-base font-bold font-helvetica-now leading-tight">
                  Phase 2: Training & Quick Wins
                </div>
                <div className="self-stretch justify-start text-gray-400 text-sm font-normal font-helvetica-now">
                  30-90 days
                </div>
              </div>
              <div className="inline-flex justify-start items-center gap-2">
                <div className="h-7 px-5 py-2.5 bg-yellow-900 rounded-[60px] flex justify-center items-center gap-2.5">
                  <div className="justify-start text-white text-xs font-bold font-helvetica-now uppercase leading-none">
                    Planned
                  </div>
                </div>
              </div>
            </div>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`transform transition-transform cursor-pointer ${
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

          {/* Phase 2 Expanded Content */}
          {expandedPhases.phase2 && (
            <>
              <div className="self-stretch h-px bg-neutral-600" />

              {/* Phase 2 Tasks */}
              <div className="self-stretch pb-5 border-b-[0.50px] border-neutral-600 flex flex-col justify-start items-start gap-1">
                <div className="inline-flex justify-start items-start gap-5">
                  <div className="w-60 inline-flex flex-col justify-center items-start gap-4">
                    <div className="w-10 h-10 relative bg-neutral-800 rounded-[60px] overflow-hidden">
                      <img src="/icons/p3.svg" />
                    </div>
                    <div className="self-stretch justify-start text-white text-sm font-normal font-helvetica-now">
                      Implement targeted training programs based on individual
                      needs
                    </div>
                  </div>
                  <div className="w-60 inline-flex flex-col justify-center items-start gap-4">
                    <div className="w-10 h-10 relative bg-neutral-800 rounded-[60px] overflow-hidden">
                      <img src="/icons/p6.svg" />
                    </div>
                    <div className="self-stretch justify-start text-white text-sm font-normal font-helvetica-now">
                      Deploy peer mentoring system with high-performing
                      employees
                    </div>
                  </div>
                  <div className="w-60 inline-flex flex-col justify-center items-start gap-4">
                    <div className="w-10 h-10 relative bg-neutral-800 rounded-[60px] overflow-hidden">
                      <img src="/icons/p5.svg" />
                    </div>
                    <div className="self-stretch justify-start text-white text-sm font-normal font-helvetica-now">
                      Establish daily performance feedback loops
                    </div>
                  </div>
                  <div className="w-60 inline-flex flex-col justify-center items-start gap-4">
                    <div className="w-10 h-10 relative bg-neutral-800 rounded-[60px] overflow-hidden">
                      <img src="/icons/p4.svg" />
                    </div>
                    <div className="self-stretch justify-start text-white text-sm font-normal font-helvetica-now">
                      Create recognition and incentive programs
                    </div>
                  </div>
                </div>
              </div>

              {/* Owner */}
              <div className="self-stretch pb-5 border-b-[0.50px] border-neutral-600 inline-flex justify-center items-center gap-2.5">
                <div className="flex-1 justify-start">
                  <span className="text-gray-400 text-sm font-normal font-helvetica-now">
                    Owner:{" "}
                  </span>
                  <span className="text-white text-sm font-medium font-helvetica-now">
                    Training Coordinator & Shift Managers
                  </span>
                </div>
              </div>

              {/* Assigned Employees */}
              <div className="self-stretch pb-5 border-b-[0.50px] border-neutral-600 flex flex-col justify-center items-start gap-2">
                <div className="justify-start text-gray-400 text-sm font-bold font-helvetica-now leading-tight">
                  Assigned Employees:
                </div>
                <div className="inline-flex justify-start items-start gap-2">
                  <div className="h-7 px-5 py-2.5 bg-neutral-800 rounded-[60px] flex justify-center items-center gap-1.5">
                    <div className="justify-start text-white text-xs font-bold font-helvetica-now uppercase leading-none">
                      John
                    </div>
                  </div>
                  <div className="h-7 px-5 py-2.5 bg-neutral-800 rounded-[60px] flex justify-center items-center gap-1.5">
                    <div className="justify-start text-white text-xs font-bold font-helvetica-now uppercase leading-none">
                      Akbar
                    </div>
                  </div>
                  <div className="h-7 px-5 py-2.5 bg-neutral-800 rounded-[60px] flex justify-center items-center gap-1.5">
                    <div className="justify-start text-white text-xs font-bold font-helvetica-now uppercase leading-none">
                      Lindsey
                    </div>
                  </div>
                  <div className="h-7 px-5 py-2.5 bg-neutral-800 rounded-[60px] flex justify-center items-center gap-1.5">
                    <div className="justify-start text-white text-xs font-bold font-helvetica-now uppercase leading-none">
                      Max
                    </div>
                  </div>
                </div>
              </div>

              {/* Resources */}
              <div className="self-stretch flex flex-col justify-center items-start gap-2">
                <div className="justify-start text-gray-400 text-sm font-bold font-helvetica-now leading-tight">
                  Resources:
                </div>
                <div className="w-[669px] inline-flex justify-start items-start gap-2">
                  <div className="h-7 px-5 py-2.5 bg-neutral-800 rounded-[60px] flex justify-center items-center gap-1.5">
                    <div className="justify-start text-white text-xs font-bold font-helvetica-now leading-none">
                      Training Materials
                    </div>
                  </div>
                  <div className="h-7 px-5 py-2.5 bg-neutral-800 rounded-[60px] flex justify-center items-center gap-1.5">
                    <div className="justify-start text-white text-xs font-bold font-helvetica-now leading-none">
                      Mentoring Program
                    </div>
                  </div>
                  <div className="h-7 px-5 py-2.5 bg-neutral-800 rounded-[60px] flex justify-center items-center gap-1.5">
                    <div className="justify-start text-white text-xs font-bold font-helvetica-now leading-none">
                      Performance Dashboards
                    </div>
                  </div>
                  <div className="h-7 px-5 py-2.5 bg-neutral-800 rounded-[60px] flex justify-center items-center gap-1.5">
                    <div className="justify-start text-white text-xs font-bold font-helvetica-now leading-none">
                      Incentive System
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Phase 3 */}
        <div className="self-stretch p-5 bg-zinc-950 rounded-2xl inline-flex justify-start items-center gap-3">
          <div className="flex-1 inline-flex flex-col justify-start items-start gap-3">
            <div className="self-stretch flex flex-col justify-start items-start gap-2">
              <div className="self-stretch justify-start text-white text-base font-bold font-helvetica-now leading-tight">
                Phase 3: Optimization & Sustainment
              </div>
              <div className="self-stretch justify-start text-gray-400 text-sm font-normal font-helvetica-now">
                90-180 days
              </div>
            </div>
            <div className="inline-flex justify-start items-center gap-2">
              <div className="flex justify-start items-center gap-2">
                <div className="h-7 px-5 py-2.5 bg-blue-900 rounded-[60px] flex justify-center items-center gap-1.5">
                  <div className="justify-start text-indigo-200 text-[10px] font-bold font-helvetica-now uppercase leading-3">
                    Future
                  </div>
                </div>
              </div>
            </div>
          </div>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transform transition-transform cursor-pointer"
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
  );
};

export default ActionPlan;
