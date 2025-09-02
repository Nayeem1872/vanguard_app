"use client";
import React, { useState } from "react";

const FALLBACK_TIMELINE_DATA = {
  phases: [
    {
      name: "Phase 1: Assessment & Baseline",
      duration_months: 1,
      duration_text: "0-30 days",
      tasks: [],
      owner: "",
      assigned_employees: [],
      resources: [],
    },
    {
      name: "Phase 2: Training & Quick Wins",
      duration_months: 2,
      duration_text: "30-90 days",
      tasks: [
        {
          icon: "/icons/p3.svg",
          description:
            "Implement targeted training programs based on individual needs",
        },
        {
          icon: "/icons/p6.svg",
          description:
            "Deploy peer mentoring system with high-performing employees",
        },
        {
          icon: "/icons/p5.svg",
          description: "Establish daily performance feedback loops",
        },
        {
          icon: "/icons/p4.svg",
          description: "Create recognition and incentive programs",
        },
      ],
      owner: "Training Coordinator & Shift Managers",
      assigned_employees: ["John", "Akbar", "Lindsey", "Max"],
      resources: [
        "Training Materials",
        "Mentoring Program",
        "Performance Dashboards",
        "Incentive System",
      ],
    },
    {
      name: "Phase 3: Optimization & Sustainment",
      duration_months: 3,
      duration_text: "90-180 days",
      tasks: [],
      owner: "",
      assigned_employees: [],
      resources: [],
    },
  ],
};

const getStatus = (index: number) => {
  if (index === 0)
    return { text: "Ready", bg: "bg-teal-800", textColor: "text-white" };
  if (index === 1)
    return { text: "Planned", bg: "bg-yellow-900", textColor: "text-white" };
  return {
    text: "Future",
    bg: "bg-blue-900",
    textColor: "text-indigo-200",
  };
};

const PhaseContent = ({ phase }: { phase: any }) => {
  const hasContent =
    phase.tasks?.length ||
    phase.owner ||
    phase.assigned_employees?.length ||
    phase.resources?.length;

  if (!hasContent) {
    return (
      <>
        <div className="self-stretch h-px bg-neutral-600" />
        <div className="self-stretch text-gray-400">
          Details for this phase will appear here.
        </div>
      </>
    );
  }

  return (
    <>
      <div className="self-stretch h-px bg-neutral-600" />
      {phase.tasks && phase.tasks.length > 0 && (
        <div className="self-stretch pb-5 border-b-[0.50px] border-neutral-600">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {phase.tasks.map((task: any, taskIndex: number) => (
              <div
                key={taskIndex}
                className="inline-flex flex-col justify-start items-start gap-4"
              >
                <div className="w-10 h-10 relative bg-neutral-800 rounded-full flex items-center justify-center">
                  <img src={task.icon} alt="" className="w-6 h-6" />
                </div>
                <div className="self-stretch text-white text-sm font-normal font-helvetica-now">
                  {task.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {phase.owner && (
        <div className="self-stretch pb-5 border-b-[0.50px] border-neutral-600 inline-flex justify-center items-center gap-2.5">
          <div className="flex-1 justify-start">
            <span className="text-gray-400 text-sm font-normal font-helvetica-now">
              Owner:{" "}
            </span>
            <span className="text-white text-sm font-medium font-helvetica-now">
              {phase.owner}
            </span>
          </div>
        </div>
      )}

      {phase.assigned_employees && phase.assigned_employees.length > 0 && (
        <div className="self-stretch pb-5 border-b-[0.50px] border-neutral-600 flex flex-col justify-center items-start gap-2">
          <div className="justify-start text-gray-400 text-sm font-bold font-helvetica-now leading-tight">
            Assigned Employees:
          </div>
          <div className="inline-flex flex-wrap justify-start items-start gap-2">
            {phase.assigned_employees.map((employee: string, i: number) => (
              <div
                key={i}
                className="h-7 px-5 py-2.5 bg-neutral-800 rounded-[60px] flex justify-center items-center"
              >
                <div className="text-white text-xs font-bold font-helvetica-now uppercase leading-none">
                  {employee}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {phase.resources && phase.resources.length > 0 && (
        <div className="self-stretch flex flex-col justify-center items-start gap-2">
          <div className="justify-start text-gray-400 text-sm font-bold font-helvetica-now leading-tight">
            Resources:
          </div>
          <div className="inline-flex flex-wrap justify-start items-start gap-2">
            {phase.resources.map((resource: string, i: number) => (
              <div
                key={i}
                className="h-7 px-5 py-2.5 bg-neutral-800 rounded-[60px] flex justify-center items-center"
              >
                <div className="text-white text-xs font-bold font-helvetica-now leading-none">
                  {resource}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

interface ActionPlanProps {
  recommendationData?: any;
}

const ActionPlan = ({ recommendationData }: ActionPlanProps) => {
  const timeline =
    recommendationData?.data?.ai_overview?.overview?.timeline ||
    FALLBACK_TIMELINE_DATA;
  const rootCauseAnalysis =
    recommendationData?.data?.ai_overview?.root_cause_analysis;

  const [expandedItems, setExpandedItems] = useState<{
    [key: string]: boolean;
  }>(() => {
    const initialState: { [key: string]: boolean } = { rootCause: true };
    timeline.phases.forEach((_: any, index: number) => {
      initialState[`phase-${index}`] = index < 2;
    });
    return initialState;
  });

  const toggleItem = (itemKey: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemKey]: !prev[itemKey],
    }));
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1240px] flex flex-col justify-start items-start gap-5">
        <div className="w-full p-5 bg-zinc-950 rounded-2xl flex flex-col justify-center items-start gap-5">
          <div
            className="self-stretch flex justify-between items-center cursor-pointer"
            onClick={() => toggleItem("rootCause")}
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
                expandedItems.rootCause ? "rotate-180" : ""
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
          {expandedItems.rootCause && (
            <>
              <div className="self-stretch h-px bg-neutral-600" />
              <div className="self-stretch text-gray-400">
                {rootCauseAnalysis ||
                  "Details from the 5 Whys analysis will be displayed here to provide context on the identified root cause of the issue."}
              </div>
            </>
          )}
        </div>

        <div className="self-stretch flex flex-col justify-start items-start">
          <div className="self-stretch justify-start text-gray-400 text-base font-bold font-helvetica-now uppercase leading-normal tracking-widest">
            Phased Implementation Timeline
          </div>
        </div>

        {timeline?.phases?.map((phase: any, index: number) => {
          const itemKey = `phase-${index}`;
          const isExpanded = expandedItems[itemKey];
          const status = getStatus(index);
          const duration = `${phase.duration_months} month${
            phase.duration_months !== 1 ? "s" : ""
          }`;

          return (
            <div
              key={index}
              className="w-full p-5 bg-zinc-950 rounded-2xl flex flex-col justify-center items-start gap-5"
            >
              <div
                className="self-stretch flex justify-between items-center cursor-pointer"
                onClick={() => toggleItem(itemKey)}
              >
                <div className="flex-1 flex flex-col justify-start items-start gap-3">
                  <div className="self-stretch flex flex-col justify-start items-start gap-2">
                    <div className="self-stretch justify-start text-white text-base font-bold font-helvetica-now leading-tight">
                      {phase.name}
                    </div>
                    <div className="self-stretch justify-start text-gray-400 text-sm font-normal font-helvetica-now">
                      {phase.duration_text || duration}
                    </div>
                  </div>
                  <div
                    className={`h-7 px-5 py-2.5 ${status.bg} rounded-[60px] flex justify-center items-center`}
                  >
                    <div
                      className={`text-[10px] font-bold font-helvetica-now uppercase leading-3 ${status.textColor}`}
                    >
                      {status.text}
                    </div>
                  </div>
                </div>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transform transition-transform ${
                    isExpanded ? "rotate-180" : ""
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
              {isExpanded && <PhaseContent phase={phase} />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActionPlan;
