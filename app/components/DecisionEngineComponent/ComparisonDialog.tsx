"use client";
import { useState } from "react";

interface Recommendation {
  risk: string;
  riskColor: string;
  cardBg: string;
  amount: string;
  period: string;
  title: string;
  confidence: string;
  description: string;
  confidenceColor: string;
  sources: string;
}

interface ComparisonDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRecommendations: Recommendation[];
}

const ComparisonDialog = ({
  isOpen,
  onClose,
  selectedRecommendations,
}: ComparisonDialogProps) => {
  if (!isOpen) return null;

  const generateROIData = (index: number) => {
    const baseValues = [
      { month: "Q1", value: 65 + index * 5 },
      { month: "Q2", value: 78 + index * 3 },
      { month: "Q3", value: 85 + index * 4 },
      { month: "Q4", value: 92 + index * 2 },
    ];
    return baseValues;
  };

  const getRiskItems = (risk: string) => {
    const riskProfiles = {
      "LOW RISK": [
        {
          label: "System Integration Complexity",
          level: "LOW",
          color: "bg-green-500",
        },
        {
          label: "Change Mgmt Required",
          level: "MEDIUM",
          color: "bg-yellow-500",
        },
        { label: "Department Alignment", level: "LOW", color: "bg-green-500" },
      ],
      "MEDIUM RISK": [
        {
          label: "System Integration Complexity",
          level: "MEDIUM",
          color: "bg-yellow-500",
        },
        {
          label: "Change Mgmt Required",
          level: "MEDIUM",
          color: "bg-yellow-500",
        },
        { label: "Department Alignment", level: "HIGH", color: "bg-red-500" },
      ],
      "HIGH RISK": [
        {
          label: "System Integration Complexity",
          level: "HIGH",
          color: "bg-red-500",
        },
        { label: "Change Mgmt Required", level: "HIGH", color: "bg-red-500" },
        { label: "Department Alignment", level: "HIGH", color: "bg-red-500" },
      ],
    };
    return riskProfiles[risk as keyof typeof riskProfiles] || [];
  };

  const getSystemsInvolved = (sources: string) => {
    const systemMap: { [key: string]: string } = {
      ERP: "ERP",
      HRIS: "HRIS",
      CRM: "CRM",
      WMS: "WMS",
      IoT: "IoT",
    };

    return sources
      .split(",")
      .map((s) => s.trim())
      .map((source) => systemMap[source] || source);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-white text-xl font-bold uppercase tracking-wider">
            COMPARE
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-2 gap-6">
            {selectedRecommendations.map((rec, index) => (
              <div key={index} className="space-y-6">
                {/* Header Card */}
                <div className={`${rec.cardBg} p-4 rounded-lg`}>
                  <div
                    className={`inline-block px-3 py-1 ${rec.riskColor} rounded-full mb-3`}
                  >
                    <span className="text-white text-xs font-bold uppercase">
                      {rec.risk}
                    </span>
                  </div>
                  <div className="text-white">
                    <div className="text-2xl font-medium">
                      {rec.amount}
                      <span className="text-base font-normal">
                        {rec.period}
                      </span>
                    </div>
                    <div className="text-sm mt-1">{rec.title}</div>
                    <div className="text-xs text-gray-300 mt-2">
                      {rec.description}
                    </div>
                    <div className="text-xs mt-2">
                      <span className="text-gray-400">Confidence: </span>
                      <span className={rec.confidenceColor}>
                        {rec.confidence}
                      </span>
                      <span className="text-gray-400"> | Sources: </span>
                      <span className="text-white">{rec.sources}</span>
                    </div>
                  </div>
                </div>

                {/* ROI Forecast */}
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-gray-400 text-xs font-bold uppercase mb-4">
                    ROI FORECAST
                  </h3>
                  <div className="space-y-2">
                    {generateROIData(index).map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between"
                      >
                        <span className="text-gray-400 text-xs">
                          {item.month}
                        </span>
                        <div className="flex-1 mx-3">
                          <div className="bg-gray-700 h-2 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${
                                index === 0 ? "bg-green-500" : "bg-red-500"
                              }`}
                              style={{ width: `${item.value}%` }}
                            ></div>
                          </div>
                        </div>
                        <span className="text-white text-xs">
                          {item.value}%
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-gray-700 p-3 rounded-lg text-center">
                      <div className="text-yellow-500 mb-1">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="mx-auto"
                        >
                          <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
                        </svg>
                      </div>
                      <div className="text-gray-400 text-xs">
                        PAYBACK PERIOD
                      </div>
                      <div className="text-white text-sm font-bold">
                        3.2 months
                      </div>
                    </div>
                    <div className="bg-gray-700 p-3 rounded-lg text-center">
                      <div className="text-blue-500 mb-1">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="mx-auto"
                        >
                          <path d="M7 4V2C7 1.45 7.45 1 8 1S9 1.55 9 2V4H15V2C15 1.45 15.45 1 16 1S17 1.55 17 2V4H19C20.1 4 21 4.9 21 6V20C21 21.1 20.1 22 19 22H5C3.9 22 3 21.1 3 20V6C3 4.9 3.9 4 5 4H7Z" />
                        </svg>
                      </div>
                      <div className="text-gray-400 text-xs">NPV (3 YEARS)</div>
                      <div className="text-white text-sm font-bold">
                        +$80k/quarter
                      </div>
                    </div>
                  </div>
                </div>

                {/* Risk Profile */}
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-gray-400 text-xs font-bold uppercase mb-4">
                    RISK PROFILE
                  </h3>
                  <div className="text-white text-sm mb-3">{rec.risk}</div>
                  <div className="text-gray-400 text-xs mb-4">
                    Based on Risk Assessment
                  </div>
                  <div className="space-y-2">
                    {getRiskItems(rec.risk).map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-2 bg-gray-700 rounded"
                      >
                        <span className="text-white text-xs">{item.label}</span>
                        <span
                          className={`px-2 py-1 rounded text-xs font-bold ${item.color} text-white`}
                        >
                          {item.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dependencies Snapshot */}
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-gray-400 text-xs font-bold uppercase mb-4">
                    DEPENDENCIES SNAPSHOT
                  </h3>
                  <div className="text-gray-400 text-xs mb-3">
                    Why this recommendation?
                  </div>
                  <div className="bg-gray-900 p-3 rounded relative h-24 overflow-hidden">
                    {/* Simulated dependency network */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="grid grid-cols-6 gap-1">
                        {Array.from({ length: 24 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-sm ${
                              Math.random() > 0.7
                                ? index === 0
                                  ? "bg-green-400"
                                  : "bg-red-400"
                                : "bg-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Systems Involved */}
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-gray-400 text-xs font-bold uppercase mb-4">
                    SYSTEMS INVOLVED
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {getSystemsInvolved(rec.sources).map((system, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-700 text-white text-xs rounded-full"
                      >
                        {system}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button className="w-full py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">
                    Drill deeper into this recommendation
                  </button>
                  <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Select for Action Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonDialog;
