/** @jsxImportSource react */
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

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

const getStatus = (status: string) => {
  switch (status?.toLowerCase()) {
    case "ready":
      return { text: "Ready", bg: "bg-teal-800", textColor: "text-white" };
    case "planned":
      return { text: "Planned", bg: "bg-yellow-900", textColor: "text-white" };
    case "future":
      return {
        text: "Future",
        bg: "bg-blue-900",
        textColor: "text-indigo-200",
      };
    default:
      return {
        text: "Future",
        bg: "bg-blue-900",
        textColor: "text-indigo-200",
      };
  }
};

const PhaseContent = ({ phase }: { phase: any }) => {
  const hasContent = phase.content && phase.content.length > 0;

  console.log("phase", phase);

  const availableIcons = [
    "/icons/p3.svg",
    "/icons/p4.svg",
    "/icons/p5.svg",
    "/icons/p6.svg",
  ];

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
      {phase.content.map((section: any, sectionIndex: number) => {
        if (
          section.section_title === "Tasks" &&
          section.items &&
          section.items.length > 0
        ) {
          return (
            <div
              key={sectionIndex}
              className="self-stretch pb-5 border-b-[0.50px] border-neutral-600"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {section.items.map((task: any, taskIndex: number) => {
                  // Cycle through available icons based on task index
                  const iconIndex = taskIndex % availableIcons.length;
                  const iconPath = availableIcons[iconIndex];

                  return (
                    <div
                      key={taskIndex}
                      className="inline-flex flex-col justify-start items-start gap-4"
                    >
                      <div className="w-10 h-10 relative bg-neutral-800 rounded-full flex items-center justify-center">
                        <img src={iconPath} alt="" className="w-10 h-10" />
                      </div>
                      <div className="self-stretch text-white text-sm font-normal font-helvetica-now">
                        {task.description ||
                          task.content ||
                          task.title ||
                          "Task description"}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }

        if (section.section_title === "Owner" && section.description) {
          return (
            <div
              key={sectionIndex}
              className="self-stretch pb-5 border-b-[0.50px] border-neutral-600 inline-flex justify-center items-center gap-2.5"
            >
              <div className="flex-1 justify-start">
                <span className="text-gray-400 text-sm font-normal font-helvetica-now">
                  Owner:{" "}
                </span>
                <span className="text-white text-sm font-medium font-helvetica-now">
                  {section.description}
                </span>
              </div>
            </div>
          );
        }

        if (
          section.section_title === "Assigned Employees" &&
          section.employees &&
          section.employees.length > 0
        ) {
          return (
            <div
              key={sectionIndex}
              className="self-stretch pb-5 border-b-[0.50px] border-neutral-600 flex flex-col justify-center items-start gap-2"
            >
              <div className="justify-start text-gray-400 text-sm font-bold font-helvetica-now leading-tight">
                Assigned Employees:
              </div>
              <div className="inline-flex flex-wrap justify-start items-start gap-2">
                {section.employees.map((employee: any, i: number) => (
                  <div
                    key={i}
                    className="h-7 px-5 py-2.5 bg-neutral-800 rounded-[60px] flex justify-center items-center"
                  >
                    <div className="text-white text-xs font-bold font-helvetica-now uppercase leading-none">
                      {typeof employee === "string"
                        ? employee
                        : employee.name ||
                          employee.title ||
                          `Employee ${i + 1}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        }

        if (
          section.section_title === "Resources" &&
          section.items &&
          section.items.length > 0
        ) {
          return (
            <div
              key={sectionIndex}
              className="self-stretch flex flex-col justify-center items-start gap-2"
            >
              <div className="justify-start text-gray-400 text-sm font-bold font-helvetica-now leading-tight">
                Resources:
              </div>
              <div className="inline-flex flex-wrap justify-start items-start gap-2">
                {section.items.map((resource: any, i: number) => (
                  <div
                    key={i}
                    className="h-7 px-5 py-2.5 bg-neutral-800 rounded-[60px] flex justify-center items-center"
                  >
                    <div className="text-white text-xs font-bold font-helvetica-now leading-none">
                      {typeof resource === "string"
                        ? resource
                        : resource.name ||
                          resource.title ||
                          `Resource ${i + 1}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        }

        return null;
      })}
    </>
  );
};

interface ActionPlanProps {
  recommendationData?: any;
}

const ActionPlan = ({ recommendationData }: ActionPlanProps) => {
  const [actionPlanData, setActionPlanData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Get the recommendation ID from the current recommendationData
  const recommendationId =
    recommendationData?.data?.recommendation?._id ||
    recommendationData?.data?.recommendation?.id;

  useEffect(() => {
    const fetchActionPlanData = async () => {
      if (!recommendationId) {
        console.log("ActionPlan: No recommendation ID available");
        return;
      }

      setLoading(true);
      try {
        const apiUrl = `/api/ai/recommendations/action-plans?recommendationId=${recommendationId}&org_id=default-org`;
        console.log("ActionPlan: Making GET request to:", apiUrl);

        // Get auth token from localStorage
        const authToken =
          typeof window !== "undefined"
            ? localStorage.getItem("authToken")
            : null;
        console.log("ActionPlan: Auth token retrieved:", authToken);

        // Create headers object with authorization
        const headers: any = {};
        if (authToken) {
          headers.Authorization = `Bearer ${authToken}`;
        }

        const response = await axios.get(apiUrl, { headers });
        console.log("ActionPlan: API Response:", response.data);

        setActionPlanData(response.data);
      } catch (error) {
        console.error("ActionPlan: Error fetching action plan data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActionPlanData();
  }, [recommendationId]);

  // Use API data if available, otherwise fall back to recommendationData or static data
  const timeline =
    actionPlanData?.data?.timeline ||
    recommendationData?.data?.ai_overview?.overview?.timeline ||
    FALLBACK_TIMELINE_DATA;
  const rootCauseAnalysis =
    actionPlanData?.data?.root_cause_analysis ||
    recommendationData?.data?.ai_overview?.root_cause_analysis;

  // Ensure timeline has phases array
  const timelinePhases = timeline?.phases || [];

  // Handle root cause analysis - check if it's an object or string
  const rootCauseContent =
    typeof rootCauseAnalysis === "string"
      ? [rootCauseAnalysis]
      : rootCauseAnalysis?.content
      ? Array.isArray(rootCauseAnalysis.content)
        ? rootCauseAnalysis.content
        : [rootCauseAnalysis.content]
      : rootCauseAnalysis?.text
      ? [rootCauseAnalysis.text]
      : [
          "Details from the 5 Whys analysis will be displayed here to provide context on the identified root cause of the issue.",
        ];

  const [expandedItems, setExpandedItems] = useState<{
    [key: string]: boolean;
  }>(() => {
    const initialState: { [key: string]: boolean } = {
      rootCause:
        rootCauseAnalysis?.is_expanded !== undefined
          ? rootCauseAnalysis.is_expanded
          : true,
    };
    timelinePhases.forEach((phase: any, index: number) => {
      initialState[`phase-${index}`] =
        phase.is_expanded !== undefined ? phase.is_expanded : index < 2;
    });
    return initialState;
  });

  const toggleItem = (itemKey: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemKey]: !prev[itemKey],
    }));
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[1240px] flex flex-col justify-start items-start gap-5">
          <div className="w-full p-5 bg-zinc-950 rounded-2xl flex justify-center items-center">
            <div className="text-white text-lg">
              Loading action plan data...
            </div>
          </div>
        </div>
      </div>
    );
  }

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
              <div className="self-stretch flex flex-col gap-4">
                {rootCauseContent.map((item: string, index: number) => (
                  <div
                    key={index}
                    className="p-4 bg-neutral-800 rounded-lg border border-neutral-700"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">
                          {index + 1}
                        </span>
                      </div>
                      <div className="flex-1 text-gray-300 text-sm font-normal font-helvetica-now leading-relaxed">
                        {item}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="self-stretch flex flex-col justify-start items-start">
          <div className="self-stretch justify-start text-gray-400 text-base font-bold font-helvetica-now uppercase leading-normal tracking-widest">
            Phased Implementation Timeline
          </div>
        </div>

        {timelinePhases.map((phase: any, index: number) => {
          const itemKey = `phase-${index}`;
          const isExpanded = expandedItems[itemKey];
          const status = getStatus(phase.status);

          return (
            <div
              key={phase.id || index}
              className="w-full p-5 bg-zinc-950 rounded-2xl flex flex-col justify-center items-start gap-5"
            >
              <div
                className="self-stretch flex justify-between items-center cursor-pointer"
                onClick={() => toggleItem(itemKey)}
              >
                <div className="flex-1 flex flex-col justify-start items-start gap-3">
                  <div className="self-stretch flex flex-col justify-start items-start gap-2">
                    <div className="self-stretch justify-start text-white text-base font-bold font-helvetica-now leading-tight">
                      {phase.title || phase.name}
                    </div>
                    <div className="self-stretch justify-start text-gray-400 text-sm font-normal font-helvetica-now">
                      {phase.duration}
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
