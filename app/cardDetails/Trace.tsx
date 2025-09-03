import React from "react";

interface TimelineStep {
  id: number;
  title: string;
  description: string;
  tags?: { text: string; bgClass: string; textClass: string }[];
  details?: { label: string; value: string }[];
  confidence?: string;
  status?: {
    text: string;
    icon?: string;
    bgClass?: string;
    textClass?: string;
    approved?: boolean;
  }[];
  icon: string;
  iconBg: string;
  marginTop?: string;
}

const Timeline = () => {
  const timelineSteps: TimelineStep[] = [
    {
      id: 1,
      title: "Analyzed ERP and HRIS Data (12 months)",
      description:
        "Pulled cost and throughput data across Site B, Receiving, and Zone 3.",
      tags: [
        { text: "ERP", bgClass: "bg-blue-900", textClass: "text-indigo-200" },
        {
          text: "WMS",
          bgClass: "bg-purple-900",
          textClass: "text-fuchsia-300",
        },
      ],
      icon: "/images/a5.svg",
      iconBg: "bg-blue-900",
      marginTop: "9px",
    },
    {
      id: 2,
      title: "Identified Process Bottlenecks",
      description:
        "Detected 23% inefficiency in Zone 3 due to inconsistent receiving dock availability.",
      details: [{ label: "Performance Anomaly", value: "23% Inefficiency" }],
      icon: "/images/a6.svg",
      iconBg: "bg-yellow-900",
      marginTop: "2px",
    },
    {
      id: 3,
      title: "Simulated Material Routing Optimizations",
      description:
        "Ran 1000+ Monte Carlo simulations to test various reconfigurations.",
      status: [
        { text: "Monte Carlo Analysis", icon: "/images/finance_mode.svg" },
        {
          text: "Implementation Approved",
          bgClass: "bg-zinc-900",
          textClass: "text-emerald-300",
          approved: true,
        },
      ],
      confidence: "87%",
      icon: "/images/a7.svg",
      iconBg: "bg-purple-900",
      marginTop: "-12px",
    },
    {
      id: 4,
      title: "Calculated Financial and Operational Impact",
      description:
        "Projected ROI of $127k/qtr with low execution risk using mitigation plan.",
      tags: [
        { text: "ROI", bgClass: "bg-blue-900", textClass: "text-indigo-200" },
        {
          text: "RISK",
          bgClass: "bg-purple-900",
          textClass: "text-fuchsia-300",
        },
      ],
      marginTop: "-18px",
      icon: "/images/a8.svg",
      iconBg: "bg-stone-600",
    },
    {
      id: 5,
      title: "Reconfigure Material Routing at Site B",
      description:
        "Final decision issued based on performance gain vs. execution complexity.",
      status: [
        { text: "Recommendation Ready", icon: "/images/a2.svg" },
        {
          text: "Implementation Approved",
          bgClass: "bg-zinc-900",
          textClass: "text-emerald-300",
          approved: true,
        },
      ],
      marginTop: "-15px",
      icon: "/images/a4.svg",
      iconBg: "bg-teal-800",
    },
  ];

  return (
    <div className="p-8 flex flex-col items-center justify-center ">
      {/* Header */}
      <div className="w-full max-w-6xl mb-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-gray-400 text-base font-bold uppercase leading-normal tracking-widest">
            AI Reasoning Timeline
          </h1>
          <p className="text-white text-base font-normal leading-normal">
            Step-by-step breakdown of how the AI arrived at this recommendation
          </p>
        </div>
      </div>

      {/* Timeline Layout */}
      <div className="w-full max-w-6xl flex gap-8">
        {/* Timeline Line - Left Side */}
        <div className="relative flex flex-col items-center">
          {/* Timeline Icons */}
          <div className="flex flex-col relative z-10">
            {timelineSteps.map((step, stepIndex) => (
              <div
                key={step.id}
                className="relative flex mt-12 items-start justify-center"
                style={{
                  height: stepIndex === 0 ? "auto" : "auto",
                  marginBottom:
                    stepIndex < timelineSteps.length - 1 ? "6rem" : "0",
                }}
              >
                {/* Vertical Line Segment */}
                {stepIndex < timelineSteps.length - 1 && (
                  <div
                    className="absolute left-1/2 transform -translate-x-1/2 border-l border-dashed border-gray-600 z-0"
                    // Replaced width and background with border utilities
                    style={{
                      top: "3rem",
                      height: "9rem",
                    }}
                  ></div>
                )}

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center relative z-10"
                  style={{ marginTop: step.marginTop }}
                >
                  <img src={step.icon} alt="" className="w-12 h-12" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Cards - Right Side */}
        <div className="flex-1 flex flex-col gap-6">
          {timelineSteps.map((step) => (
            <div key={step.id} className="relative">
              {/* Card */}
              <div className="bg-zinc-950 rounded-2xl p-6 flex flex-col gap-4">
                {/* Header with step number and info icon */}
                <div className="flex items-center justify-between">
                  <h3 className="text-white text-base font-bold leading-tight">
                    {step.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center">
                      <img src="/images/a3.svg" />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm font-normal leading-relaxed">
                  {step.description}
                </p>

                {/* Tags */}
                {step.tags && (
                  <div className="flex gap-2">
                    {step.tags.map((tag, tagIndex) => (
                      <div
                        key={tagIndex}
                        className={`h-7 px-4 py-2 ${tag.bgClass} rounded-full flex items-center`}
                      >
                        <span
                          className={`text-[10px] font-bold uppercase ${tag.textClass}`}
                        >
                          {tag.text}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Details */}
                {step.details && (
                  <div className="flex gap-4">
                    {step.details.map((detail, detailIndex) => (
                      <div
                        key={detailIndex}
                        className="flex items-center gap-2"
                      >
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-400 text-sm">
                          {detail.label}
                        </span>
                        <span className="text-gray-400 text-sm">
                          {detail.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Confidence */}

                {/* Status */}
                {step.status && (
                  <div className="flex items-center gap-3">
                    {step.status.map((status, statusIndex) => (
                      <div
                        key={statusIndex}
                        className="flex items-center gap-2"
                      >
                        {status.approved ? (
                          <div
                            className={`${status.bgClass} rounded-full px-4 py-1 flex items-center gap-2`}
                          >
                            <span className="text-emerald-300 text-xs">✓</span>
                            <span
                              className={`text-xs font-bold ${status.textClass}`}
                            >
                              {status.text}
                            </span>
                          </div>
                        ) : (
                          <>
                            {status.icon ? (
                              <img
                                src={status.icon}
                                alt=""
                                className="w-4 h-4"
                              />
                            ) : (
                              <span className="text-lg">👍</span>
                            )}
                            <span className="text-gray-400 text-sm">
                              {status.text}
                            </span>
                          </>
                        )}
                      </div>
                    ))}
                    {step.confidence && (
                      <div className="bg-blue-900 rounded-full px-4 py-1">
                        <span className="text-indigo-200 text-[10px] font-normal uppercase">
                          Confidence:{" "}
                        </span>
                        <span className="text-indigo-200 text-xs font-bold uppercase">
                          {step.confidence}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Action Buttons */}
      <div className="w-full max-w-6xl flex justify-end items-center gap-5 mt-8">
        <div className="w-56 h-12 px-10 py-5 rounded-[60px] shadow-[0px_40px_120px_0px_rgba(1,68,199,0.30)] outline-1 outline-white flex justify-center items-center gap-2">
          <div className="text-white text-base font-bold leading-normal">
            Download Trace
          </div>
        </div>
        <div className="w-72 h-12 py-5 flex justify-center items-center gap-2">
          <img src="/images/a1.png" />
        </div>
      </div>
    </div>
  );
};

export default Timeline;
