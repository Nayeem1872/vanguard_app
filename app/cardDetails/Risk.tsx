import React from "react";

const riskData = {
  executionRiskLevel: {
    title: "EXECUTION RISK LEVEL",
    subtitle: "Based on 7 operational factors",
    levels: [
      {
        name: "Low",
        value: "25%",
        colorClass: "text-green-400",
        borderColorClass: "border-green-400",
      },
      {
        name: "Medium",
        value: "57.78%",
        colorClass: "text-yellow-400",
        borderColorClass: "border-yellow-400",
      },
      {
        name: "High",
        value: "100%",
        colorClass: "text-red-500",
        borderColorClass: "border-red-500",
      },
    ],
  },
  riskContributors: {
    title: "RISK CONTRIBUTORS",
    contributors: [
      {
        id: 1,
        title: "Moderate change management required",
        description: "Warehouse staff will need training on new system",
        icon: "/icons/risk-contributor-1.svg",
        tag: {
          text: "MEDIUM",
          bgClass: "bg-yellow-800",
          textClass: "text-yellow-200",
        },
        cardBgClass: "bg-yellow-900/40",
      },
      {
        id: 2,
        title: "System integration complexity",
        description: "Compatible with existing ERP infrastructure",
        icon: "/icons/risk-contributor-2.svg",
        tag: {
          text: "LOW",
          bgClass: "bg-green-800",
          textClass: "text-green-200",
        },
        cardBgClass: "bg-teal-900/40",
      },
      {
        id: 3,
        title: "Departmental alignment",
        description: "Requires coordination between Operations and IT",
        icon: "/icons/risk-contributor-3.svg",
        tag: {
          text: "HIGH RISK",
          bgClass: "bg-red-800",
          textClass: "text-red-200",
        },
        cardBgClass: "bg-red-900/40",
      },
    ],
  },
  mitigationPlan: {
    title: "MITIGATION PLAN IDENTIFIED",
    status: {
      text: "MITIGATION ACTIVE",
      bgClass: "bg-blue-600",
      textClass: "text-white",
    },
    items: [
      {
        id: 1,
        title: "Phased rollout schedule",
        description:
          "Implementation divided into 3 phases over 12 weeks to minimize operational disruption",
        icon: "/icons/mitigation-plan-1.svg",
      },
      {
        id: 2,
        title: "Department-level change ownership",
        description:
          "Designated champions in each department to facilitate adoption and feedback",
        icon: "/icons/mitigation-plan-2.svg",
      },
      {
        id: 3,
        title: "Monitoring dashboards enabled",
        description:
          "Real-time KPI tracking to identify and address performance issues early",
        icon: "/icons/mitigation-plan-3.svg",
      },
      {
        id: 4,
        title: "Rollback mechanism available",
        description:
          "Parallel systems maintained for first 30 days to enable quick reversion if needed",
        icon: "/icons/mitigation-plan-4.svg",
      },
    ],
  },
};

const RiskAnalysis = () => {
  const { executionRiskLevel, riskContributors, mitigationPlan } = riskData;

  return (
    <div className="p-8 bg-black text-white font-sans flex flex-col gap-12">
      {/* Top Section: Risk Level & Contributors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Execution Risk Level */}
        <div>
          <h2 className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-4">
            {executionRiskLevel.title}
          </h2>
          <div className="bg-neutral-900 p-6 rounded-2xl flex items-center gap-8">
            {/* Chart Placeholder */}
            <div className="w-48 h-48 relative">
              {/* This is a placeholder for the radial chart.
                  You would typically use an SVG or a charting library here. */}
              <img
                src="/images/radial-chart-placeholder.svg"
                alt="Execution Risk Chart"
              />
            </div>
            <div className="flex flex-col gap-4">
              {executionRiskLevel.levels.map((level) => (
                <div key={level.name} className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-16 text-gray-300">
                    {level.name}
                  </div>
                  <div
                    className={`border-l-2 ${level.borderColorClass} h-6`}
                  ></div>
                  <div className={`font-bold text-2xl ${level.colorClass}`}>
                    {level.value}
                  </div>
                </div>
              ))}
              <p className="text-gray-500 text-sm mt-2">
                {executionRiskLevel.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Risk Contributors */}
        <div>
          <h2 className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-4">
            {riskContributors.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {riskContributors.contributors.map((contributor) => (
              <div
                key={contributor.id}
                className={`p-5 rounded-2xl flex flex-col justify-between ${contributor.cardBgClass}`}
              >
                <div>
                  <img
                    src={contributor.icon}
                    alt=""
                    className="w-8 h-8 mb-4 opacity-70"
                  />
                  <h3 className="font-bold text-white mb-2">
                    {contributor.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4">
                    {contributor.description}
                  </p>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-bold self-start ${contributor.tag.bgClass} ${contributor.tag.textClass}`}
                >
                  {contributor.tag.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mitigation Plan Section */}
      <div>
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-gray-400 text-sm font-bold uppercase tracking-widest">
            {mitigationPlan.title}
          </h2>
          <div
            className={`px-3 py-1 rounded-md text-xs font-bold ${mitigationPlan.status.bgClass} ${mitigationPlan.status.textClass}`}
          >
            {mitigationPlan.status.text}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {mitigationPlan.items.map((item) => (
            <div
              key={item.id}
              className="bg-neutral-800/80 p-5 rounded-2xl flex items-center gap-5"
            >
              <div className="bg-neutral-700 w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center">
                <img src={item.icon} alt="" className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RiskAnalysis;
