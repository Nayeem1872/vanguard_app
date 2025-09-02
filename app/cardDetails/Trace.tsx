import React from "react";
const timelineData = {
  timelineTitle: "AI Recommendation Genesis",
  steps: [
    {
      id: 1,
      icon: "/icons/timeline-data.svg",
      iconBgColor: "bg-blue-600",
      title: "Analyzed ERP and HRIS Data (12 months)",
      description:
        "Pulled cost and throughput data across Site B, Receiving, and Zone 3.",
      details: {
        type: "tags",
        items: [
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
    },
    {
      id: 2,
      icon: "/icons/timeline-target.svg",
      iconBgColor: "bg-yellow-600",
      title: "Identified Process Bottlenecks",
      description:
        "Detected 23% inefficiency in Zone 3 due to inconsistent receiving dock availability.",
      details: {
        type: "bulletPoint",
        item: {
          label: "Performance Anomaly",
          value: "23% Inefficiency",
          bulletColor: "bg-blue-400",
        },
      },
    },
    {
      id: 3,
      icon: "/icons/timeline-simulation.svg",
      iconBgColor: "bg-purple-600",
      title: "Simulated Material Routing Optimizations",
      description:
        "Ran 1000+ Monte Carlo simulations to test various reconfigurations.",
      details: {
        type: "iconTextWithTag",
        item: {
          icon: "/icons/analysis.svg",
          label: "Monte Carlo Analysis",
          value: "23% Inefficiency",
          tag: {
            label: "CONFIDENCE 87%",
            bgColor: "bg-blue-700",
            textColor: "text-white",
          },
        },
      },
    },
    {
      id: 4,
      icon: "/icons/timeline-impact.svg",
      iconBgColor: "bg-gray-500",
      title: "Calculated Financial and Operational Impact",
      description:
        "Projected ROI of $127k/qtr with low execution risk using mitigation plan.",
      details: {
        type: "tags",
        items: [
          {
            label: "ROI",
            bgColor: "bg-blue-600",
            textColor: "text-white",
          },
          {
            label: "RISK",
            bgColor: "bg-purple-600",
            textColor: "text-white",
          },
        ],
      },
    },
    {
      id: 5,
      icon: "/icons/timeline-approval.svg",
      iconBgColor: "bg-green-600",
      title: "Reconfigure Material Routing at Site B",
      description:
        "Final decision issued based on performance gain vs. execution complexity.",
      details: {
        type: "status",
        items: [
          {
            label: "Recommendation Ready",
            icon: "/icons/box-check.svg",
            textColor: "text-gray-300",
          },
          {
            label: "Implementation Approved",
            icon: "/icons/check.svg",
            textColor: "text-green-300",
            bgColor: "bg-green-800/50",
          },
        ],
      },
    },
  ],
};

const Timeline = ({ timelineData }: any) => {
  const renderDetails = (details: any) => {
    if (!details) return null;

    switch (details.type) {
      case "tags":
        return (
          <div className="flex items-center gap-2">
            {details.items.map((tag: any) => (
              <span
                key={tag.label}
                className={`px-3 py-1 text-xs font-semibold rounded-full ${tag.bgColor} ${tag.textColor}`}
              >
                {tag.label}
              </span>
            ))}
          </div>
        );
      case "bulletPoint":
        return (
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <div
              className={`w-2 h-2 rounded-full ${details.item.bulletColor}`}
            ></div>
            <span>{details.item.label}</span>
            <span className="text-gray-400">{details.item.value}</span>
          </div>
        );
      case "iconTextWithTag":
        return (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <img
                src={details.item.icon}
                alt=""
                className="w-4 h-4 opacity-70"
              />
              <span>{details.item.label}</span>
              <span className="text-gray-400">{details.item.value}</span>
            </div>
            <span
              className={`px-3 py-1 text-xs font-bold rounded-md ${details.item.tag.bgColor} ${details.item.tag.textColor}`}
            >
              {details.item.tag.label}
            </span>
          </div>
        );
      case "status":
        return (
          <div className="flex items-center gap-4">
            {details.items.map((status: any) => (
              <div
                key={status.label}
                className={`flex items-center gap-2 text-sm font-medium p-1 rounded ${
                  status.bgColor || ""
                }`}
              >
                <img src={status.icon} alt="" className="w-4 h-4" />
                <span className={status.textColor}>{status.label}</span>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-8 bg-black">
      <div className="relative flex flex-col items-start pl-16">
        {/* The vertical dotted line */}
        <div className="absolute left-6 top-6 bottom-6 w-0.5 border-l-2 border-dashed border-neutral-700"></div>

        {timelineData.steps.map((step: any) => (
          <div key={step.id} className="relative w-full mb-8">
            {/* Icon on the timeline */}
            <div
              className={`absolute -left-16 top-1 w-12 h-12 rounded-full flex items-center justify-center ${step.iconBgColor}`}
            >
              <img src={step.icon} alt="" className="w-6 h-6" />
            </div>

            {/* Content Card */}
            <div className="bg-neutral-900 p-5 rounded-xl flex flex-col gap-3 ml-4 relative">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-white text-lg">{step.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    {step.description}
                  </p>
                </div>
                <div className="w-5 h-5 bg-neutral-700 rounded-full flex items-center justify-center text-gray-400 text-xs font-serif cursor-pointer">
                  i
                </div>
              </div>
              <div className="mt-2">{renderDetails(step.details)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
