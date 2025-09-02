import React from "react";

const impactData = {
  header: {
    filters: [
      {
        id: "erp",
        label: "ERP",
        isActive: true,
      },
      {
        id: "hris",
        label: "HRIS",
        isActive: false,
      },
      {
        id: "wms",
        label: "WMS",
        isActive: false,
      },
    ],
    simulation: {
      label: "Simulate Disruption:",
      options: ["None", "Site B Failure", "Dock Bottleneck"],
      defaultValue: "None",
    },
    exportButton: {
      label: "Export",
      icon: "/icons/download.svg",
    },
  },
  processFlow: [
    {
      id: 1,
      title: "Site B",
      description: "Regional distribution center with 14% excess capacity",
      tags: [
        {
          label: "ERP",
          bgColor: "bg-blue-600",
          textColor: "text-white",
        },
        {
          label: "WMS",
          bgColor: "bg-purple-600",
          textColor: "text-white",
        },
      ],
    },
    {
      id: 2,
      title: "Receiving Dock",
      description: "8 bays with 37% bottleneck occurrence",
      tags: [
        {
          label: "ERP",
          bgColor: "bg-blue-600",
          textColor: "text-white",
        },
      ],
    },
    {
      id: 3,
      title: "Zone 3",
      description:
        "23% inefficiency due to dock delays distribution center with excess capacity",
      tags: [
        {
          label: "HRIS",
          bgColor: "bg-teal-600",
          textColor: "text-white",
        },
      ],
    },
  ],
  dependencyImpactAnalysis: {
    title: "DEPENDENCY IMPACT ANALYSIS",
    cards: [
      {
        id: "critical-path",
        icon: "/icons/critical-path.svg",
        title: "Critical Path",
        bgColor: "bg-blue-800",
        content: {
          path: "Receiving Dock → Zone 3",
          details: "Highest impact on throughput (37% bottleneck)",
          bulletColor: "bg-blue-400",
        },
      },
      {
        id: "system-reliance",
        icon: "/icons/system-reliance.svg",
        title: "System Reliance",
        bgColor: "bg-teal-900",
        content: {
          items: [
            {
              text: "WMS: 5/5 nodes",
              bulletColor: "bg-blue-400",
            },
            {
              text: "ERP: 3/5 nodes",
              bulletColor: "bg-purple-400",
            },
            {
              text: "HRIS: 2/5 nodes",
              bulletColor: "bg-green-400",
            },
          ],
        },
      },
      {
        id: "recommendation-focus",
        icon: "/icons/recommendation-focus.svg",
        title: "Recommendation Focus",
        bgColor: "bg-purple-900",
        content: {
          items: ["Optimize dock scheduling and handler allocation"],
        },
      },
    ],
  },
};

const DependencyImpact = () => {
  const { header, processFlow, dependencyImpactAnalysis } = impactData;

  return (
    <div className="bg-black p-8 text-white font-sans">
      {/* Header Controls */}
      <div className="flex justify-between items-center mb-8 p-4 bg-neutral-900/50 rounded-xl">
        <div className="flex items-center gap-4">
          <span>Filter by:</span>
          {header.filters.map((filter) => (
            <button
              key={filter.id}
              className={`px-4 py-1 rounded-full text-sm ${
                filter.isActive
                  ? "bg-white text-black"
                  : "bg-neutral-700 text-gray-300"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <label htmlFor="disruption-select">{header.simulation.label}</label>
          <select
            id="disruption-select"
            className="bg-neutral-800 border border-neutral-600 rounded-md px-3 py-1.5"
          >
            {header.simulation.options.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
          <button className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-lg">
            <img
              src={header.exportButton.icon}
              alt="Export"
              className="w-4 h-4"
            />
            {header.exportButton.label}
          </button>
        </div>
      </div>

      {/* Process Flow */}
      <div className="flex justify-center items-start gap-4 mb-12">
        {processFlow.map((node, index) => (
          <React.Fragment key={node.id}>
            <div className="bg-neutral-800 p-5 rounded-xl w-64 flex flex-col gap-3">
              <h3 className="font-bold text-lg">{node.title}</h3>
              <p className="text-gray-400 text-sm">{node.description}</p>
              <div className="flex items-center gap-2 mt-2">
                {node.tags.map((tag) => (
                  <span
                    key={tag.label}
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${tag.bgColor} ${tag.textColor}`}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
            {index < processFlow.length - 1 && (
              <div className="text-2xl mt-12">→</div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Dependency Impact Analysis */}
      <div>
        <h2 className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-4">
          {dependencyImpactAnalysis.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {dependencyImpactAnalysis.cards.map((card) => (
            <div key={card.id} className={`p-6 rounded-2xl ${card.bgColor}`}>
              <img src={card.icon} alt="" className="w-6 h-6 mb-4 opacity-80" />
              <h3 className="font-bold text-lg mb-3">{card.title}</h3>
              {/* Render content based on card id or structure */}
              {card.id === "critical-path" && (
                <div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${card.content.bulletColor}`}
                    ></div>
                    <p>{card.content.path}</p>
                  </div>
                  <p className="text-gray-300 text-sm mt-1 ml-4">
                    {card.content.details}
                  </p>
                </div>
              )}
              {/* {card.id === 'system-reliance' && (
                <ul className="space-y-1">
                  {card.content.items.map(item => (
                     <li key={item.text} className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${item.bulletColor}`}></div>
                        <span>{item.text}</span>
                     </li>
                  ))}
                </ul>
              )}
               {card.id === 'recommendation-focus' && (
                  <p className="text-gray-200">{card.content.items[0]}</p>
              )} */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DependencyImpact;
