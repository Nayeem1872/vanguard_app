/** @jsxImportSource react */
"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

// Define interfaces for type safety
interface RiskLevel {
  name: string;
  value: string;
  colorClass: string;
  borderColorClass: string;
}

interface RiskContributor {
  label: string;
  level: string;
  color: string;
  description?: string;
  icon?: string;
}

interface MitigationItem {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface RiskData {
  executionRiskLevel: {
    title: string;
    subtitle: string;
    levels: RiskLevel[];
  };
  riskContributors: {
    title: string;
    contributors: RiskContributor[];
  };
  mitigationPlan: {
    title: string;
    status: {
      text: string;
      bgClass: string;
      textClass: string;
    };
    items: MitigationItem[];
  };
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    stored_risk: {
      risk: RiskData;
    };
  };
}

interface RiskAnalysisProps {
  recommendationData?: any;
}

const RiskAnalysis = ({ recommendationData }: RiskAnalysisProps) => {
  const [riskData, setRiskData] = useState<RiskData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Define static icons for risk contributors
  const RISK_CONTRIBUTOR_ICONS = [
    "/icons/profile-tick.svg",
    "/icons/status-up.svg",
    "/icons/refresh-left-square.svg",
    "/icons/arrowright.svg",
  ];

  // Get the recommendation ID from the current recommendationData
  const recommendationId =
    recommendationData?.data?.recommendation?._id ||
    recommendationData?.data?.recommendation?.id;

  useEffect(() => {
    const fetchRiskData = async () => {
      if (!recommendationId) {
        console.log("RiskAnalysis: No recommendation ID available");
        setLoading(false);
        setError("No recommendation ID provided");
        return;
      }

      try {
        setLoading(true);
        setError(null); // Clear any previous errors
        const apiUrl = `/api/ai/recommendations/risk?recId=${recommendationId}`;
        console.log("RiskAnalysis: Making GET request to:", apiUrl);

        // Get auth token from localStorage
        const authToken =
          typeof window !== "undefined"
            ? localStorage.getItem("authToken")
            : null;
        console.log("RiskAnalysis: Auth token retrieved:", authToken);

        // Create headers object with authorization
        const headers: any = {};
        if (authToken) {
          headers.Authorization = `Bearer ${authToken}`;
        }

        const response = await axios.get<ApiResponse>(apiUrl, { headers });
        console.log("RiskAnalysis: API Response:", response.data);

        if (response.data.success && response.data.data.stored_risk) {
          setRiskData(response.data.data.stored_risk.risk);
        } else {
          setError("Failed to fetch risk data");
        }
      } catch (err) {
        console.error("RiskAnalysis: Error fetching risk data:", err);
        setError("Failed to load risk analysis data");
      } finally {
        setLoading(false);
      }
    };

    fetchRiskData();
  }, [recommendationId]);

  if (loading) {
    return (
      <div className="p-8 flex flex-col items-center justify-center">
        <div className="text-white text-lg">Loading risk analysis...</div>
      </div>
    );
  }

  if (error || !riskData) {
    return (
      <div className="p-8 flex flex-col items-center justify-center">
        <div className="text-red-500 text-lg">
          {error || "No risk data available"}
        </div>
      </div>
    );
  }

  console.log("riskData", riskData);

  return (
    <div className="p-8 flex flex-col items-center justify-center">
      {/* Top Section: Risk Level & Contributors */}
      <div className="inline-flex justify-start items-center gap-5">
        <div className=" inline-flex flex-col justify-start items-start gap-5 overflow-hidden">
          <div className="self-stretch justify-start text-gray-400 text-base font-bold  uppercase leading-normal tracking-widest">
            {riskData.executionRiskLevel.title}
          </div>
          <div className="self-stretch flex-1 px-5 py-10 bg-zinc-950 rounded-[20px] border-gray-200 flex flex-col justify-center items-start gap-2.5">
            <div className="inline-flex justify-start items-center gap-12">
              <div className="w-36 h-36 relative">
                <img src="/icons/4 Doughnut.png" />
              </div>
              <div className="w-56 inline-flex flex-col justify-start items-start gap-2">
                <div className="self-stretch inline-flex justify-start items-start gap-10 flex-wrap content-start">
                  {riskData.executionRiskLevel.levels.map((level, index) => (
                    <div
                      key={index}
                      className="flex justify-start items-center gap-2.5"
                    >
                      <div
                        className={`w-[3px] self-stretch relative ${level.borderColorClass.replace(
                          "border-",
                          "bg-"
                        )} rounded-sm`}
                      />
                      <div className="self-stretch inline-flex flex-col justify-center items-start">
                        <div className="justify-start text-Color-neutral-09/90 text-sm font-normal ">
                          {level.name}
                        </div>
                        <div className="inline-flex justify-start items-center gap-0.5">
                          <div
                            className={`justify-start ${level.colorClass} text-2xl font-normal`}
                          >
                            {level.value}
                          </div>
                          <div className="w-2.5 h-2.5 opacity-50 justify-start text-Color-neutral-09/90 text-xs font-normal  leading-3">
                            %
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="self-stretch justify-start text-gray-400 text-sm font-normal ">
                  {riskData.executionRiskLevel.subtitle}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[592px] inline-flex flex-col justify-start items-start gap-5">
          <div className="self-stretch h-6 justify-start text-gray-400 text-base font-bold  uppercase leading-normal tracking-widest">
            {riskData.riskContributors.title}
          </div>
          <div className="self-stretch inline-flex justify-start items-start gap-5">
            {riskData.riskContributors.contributors.length > 0 ? (
              riskData.riskContributors.contributors.map(
                (contributor, index) => {
                  const iconPath =
                    RISK_CONTRIBUTOR_ICONS[
                      index % RISK_CONTRIBUTOR_ICONS.length
                    ];
                  console.log(
                    `Rendering contributor ${index}: ${contributor.label} with icon: ${iconPath}`
                  );
                  return (
                    <div
                      key={index}
                      className="flex-1 self-stretch p-5 bg-stone-900 rounded-2xl outline outline-[0.50px] outline-offset-[-0.50px] outline-neutral-600 inline-flex flex-col justify-start items-start gap-3"
                    >
                      <div className="self-stretch flex flex-col justify-start items-start gap-3">
                        <div className="w-8 h-8 flex items-center justify-center">
                          <img
                            src={iconPath}
                            alt={contributor.label}
                            className="w-full h-full"
                            onError={(e) => {
                              console.error(`Failed to load icon: ${iconPath}`);
                              // Fallback to a simple colored div if icon fails to load
                              e.currentTarget.style.display = "none";
                              const fallback = document.createElement("div");
                              fallback.className =
                                "w-6 h-6 bg-blue-500 rounded";
                              e.currentTarget.parentNode?.appendChild(fallback);
                            }}
                          />
                        </div>
                        <div className="self-stretch flex flex-col justify-start items-start gap-2">
                          <div className="self-stretch justify-start text-white text-base font-bold  leading-tight">
                            {contributor.label}
                          </div>
                          {contributor.description && (
                            <div className="self-stretch justify-start text-gray-400 text-sm font-medium  leading-none">
                              {contributor.description}
                            </div>
                          )}
                        </div>
                      </div>
                      <div
                        className={`h-7 px-5 py-2.5 ${contributor.color} rounded-[60px] inline-flex justify-center items-center gap-2.5`}
                      >
                        <div className="justify-start text-white text-xs font-bold  uppercase leading-none">
                          {contributor.level}
                        </div>
                      </div>
                    </div>
                  );
                }
              )
            ) : (
              <div className="flex-1 self-stretch p-5 bg-stone-900 rounded-2xl outline outline-[0.50px] outline-offset-[-0.50px] outline-neutral-600 inline-flex flex-col justify-center items-center gap-3">
                <div className="text-gray-400 text-center">
                  No risk contributors identified
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-5 overflow-hidden mt-10 w-full max-w-6xl">
        <div className="flex ml-24 gap-3 w-full">
          <div className="text-gray-400 text-left text-base font-bold uppercase leading-normal tracking-widest">
            {riskData.mitigationPlan.title}
          </div>
          <div
            className={`h-6 px-5 py-2.5 ${riskData.mitigationPlan.status.bgClass} rounded-[60px] flex justify-center items-center gap-2.5`}
          >
            <div
              className={`${riskData.mitigationPlan.status.textClass} text-[10px] font-bold uppercase leading-3`}
            >
              {riskData.mitigationPlan.status.text}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-5 w-full">
          <div className="w-full flex justify-center items-start gap-5 flex-wrap">
            {riskData.mitigationPlan.items.map((item, index) => {
              const iconPath =
                RISK_CONTRIBUTOR_ICONS[index % RISK_CONTRIBUTOR_ICONS.length];
              console.log(
                `Rendering mitigation item ${index}: ${item.title} with icon: ${iconPath}`
              );
              return (
                <div
                  key={item.id}
                  className="w-[520px] p-5 bg-neutral-800 rounded-2xl flex justify-start items-center gap-3"
                >
                  <div className="w-12 h-12 relative bg-zinc-700 rounded-[60px] overflow-hidden">
                    <div className="w-7 h-7 left-[11px] top-[11px] absolute">
                      <img
                        src={iconPath}
                        alt={item.title}
                        onError={(e) => {
                          console.error(
                            `Failed to load mitigation icon: ${iconPath}`
                          );
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
                    <div className="self-stretch justify-start text-white text-base font-bold  leading-tight">
                      {item.title}
                    </div>
                    <div className="self-stretch justify-start text-gray-400 text-sm font-normal ">
                      {item.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-end w-full cursor-pointer">
            <div className="w-96 h-12 px-10 py-5 rounded-[60px] flex justify-center items-center gap-2">
              <div className="text-white text-base text-right font-bold leading-normal">
                Compare with past performance
              </div>
              <div className="w-6 h-6 relative">
                <img src="/icons/arrowright.svg" />
              </div>
            </div>
          </div>

          <div className="flex w-full justify-end mt-10 mr-20">
            <div className="flex items-center gap-5">
              <div className="h-12 px-10 py-5 rounded-[60px] shadow-[0px_40px_120px_0px_rgba(1,68,199,0.30)] border border-white flex justify-center items-center gap-2">
                <div className="text-white text-base font-bold leading-normal">
                  Save for later
                </div>
              </div>
              <img src="/icons/Frame 2147224348.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskAnalysis;
