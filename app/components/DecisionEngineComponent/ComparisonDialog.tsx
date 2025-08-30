"use client";

interface RiskFactor {
  label: string;
  level: string;
  color: string;
}

interface Recommendation {
  id?: string;
  _id?: string;
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
  paybackPeriod?: string;
  riskAdjustedROI?: string;
  riskProfileDescription?: string;
  riskFactors?: RiskFactor[];
  dependenciesSnapshotImage?: string;
  systemsInvolved?: string[];
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

  const getSystemsInvolved = (rec: Recommendation) => {
    if (rec.systemsInvolved && rec.systemsInvolved.length > 0) {
      return rec.systemsInvolved;
    }
    // Fallback to parsing sources if systemsInvolved is not available
    const systemMap: { [key: string]: string } = {
      ERP: "ERP",
      HRIS: "HRIS",
      CRM: "CRM",
      WMS: "WMS",
      IoT: "IoT",
      vanguard: "VAN",
    };

    return rec.sources
      .split(",")
      .map((s) => s.trim())
      .map((source) => systemMap[source] || source);
  };

  const getBgColorClass = (rec: Recommendation) => {
    if (rec.cardBg && rec.cardBg.startsWith("bg-")) {
      return rec.cardBg;
    }
    // Fallback based on risk color
    if (rec.riskColor === "bg-red-900") return "bg-[#261718]";
    if (rec.riskColor === "bg-yellow-900") return "bg-[#19120A]";
    return "bg-[#0A1918]";
  };

  const getBarGradientColor = (rec: Recommendation) => {
    if (rec.riskColor === "bg-red-900") return "from-red-900 to-red-900/0";
    if (rec.riskColor === "bg-yellow-900")
      return "from-yellow-600 to-yellow-600/0";
    return "from-teal-800 to-teal-800/0";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[1174px] h-[1810px] relative bg-zinc-950 rounded-[20px] overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="w-[1232px] py-5 left-[21px] top-0 absolute border-b-[0.50px] border-neutral-600 inline-flex justify-center items-center gap-2.5">
          <div className="text-center justify-center text-gray-400 text-xl font-bold font-helvetica-now uppercase leading-loose tracking-widest">
            Compare
          </div>
        </div>

        {selectedRecommendations.map((rec, index) => {
          const leftPosition = 150 + index * 447; // Position cards side by side
          const bgColorClass = getBgColorClass(rec);
          const barGradient = getBarGradientColor(rec);
          const systems = getSystemsInvolved(rec);

          return (
            <div
              key={index}
              className={`w-[409px] h-[1590px] absolute ${bgColorClass} rounded-[20px] overflow-hidden`}
              style={{ left: `${leftPosition}px`, top: "110px" }}
            >
              {/* Header Section */}
              <div className="w-96 h-24 pb-4 left-[20px] top-[30px] absolute border-b border-neutral-600 inline-flex flex-col justify-start items-start gap-2.5">
                <div className="self-stretch inline-flex justify-between items-center">
                  <div className="justify-start">
                    <span className="text-white text-4xl font-medium font-helvetica-now leading-10">
                      {rec.amount}
                    </span>
                    <span className="text-white text-xl font-normal font-helvetica-now leading-normal">
                      {rec.period}
                    </span>
                  </div>
                  <div
                    className={`h-7 px-5 py-2.5 ${rec.riskColor} rounded-[60px] flex justify-center items-center gap-2.5`}
                  >
                    <div className="justify-start text-white text-xs font-bold font-helvetica-now uppercase leading-none">
                      {rec.risk}
                    </div>
                  </div>
                </div>
                <div className="self-stretch text-left justify-start text-white text-xl font-normal font-helvetica-now leading-normal">
                  {rec.title}
                </div>
              </div>

              {/* Description Section */}
              <div className="w-96 pb-5 left-[20px] top-[148px] absolute border-b border-neutral-600 inline-flex flex-col justify-start items-start gap-4">
                <div className="self-stretch text-left justify-start text-white text-base font-normal font-helvetica-now leading-tight">
                  {rec.description}
                </div>
                <div className="self-stretch text-left justify-start">
                  <span className="text-gray-400 text-sm font-normal font-helvetica-now leading-none">
                    Confidence:
                  </span>
                  <span className="text-white text-sm font-normal font-helvetica-now leading-none">
                    {" "}
                  </span>
                  <span
                    className={`text-sm font-bold font-helvetica-now leading-none ${rec.confidenceColor}`}
                  >
                    {rec.confidence}
                  </span>
                  <span className="text-white text-sm font-bold font-helvetica-now leading-none">
                    {" "}
                  </span>
                  <span className="text-gray-400 text-sm font-normal font-helvetica-now leading-none">
                    |
                  </span>
                  <span className="text-white text-sm font-normal font-helvetica-now leading-none">
                    {" "}
                  </span>
                  <span className="text-gray-400 text-sm font-normal font-helvetica-now leading-none">
                    Sources:
                  </span>
                  <span className="text-white text-sm font-bold font-helvetica-now leading-none">
                    {" "}
                    {rec.sources}
                  </span>
                </div>
              </div>

              {/* ROI Forecast Section */}
              <div className="w-96 pb-5 left-[20px] top-[259px] absolute border-b-[0.50px] border-neutral-600 inline-flex flex-col justify-start items-start gap-5">
                <div className="self-stretch flex flex-col justify-start items-start gap-3">
                  <div className="self-stretch text-left justify-start text-gray-400 text-base font-bold font-helvetica-now uppercase leading-normal tracking-widest">
                    ROI FORECAST
                  </div>
                  <div className="self-stretch h-56 relative bg-zinc-950 rounded-[10px]">
                    {/* Chart Area */}
                    <div className="w-64 h-36 left-[74px] top-[50px] absolute inline-flex flex-col justify-center items-start">
                      <div className="self-stretch flex-1 relative">
                        <div className="w-52 h-2.5 left-0 top-[13px] absolute inline-flex justify-center items-end">
                          <div
                            className={`flex-1 self-stretch bg-gradient-to-l ${barGradient}`}
                          />
                        </div>
                      </div>
                      <div className="self-stretch flex-1 relative">
                        <div className="w-44 h-2.5 left-0 top-[13px] absolute inline-flex justify-center items-end">
                          <div
                            className={`flex-1 self-stretch bg-gradient-to-l ${barGradient}`}
                          />
                        </div>
                      </div>
                      <div className="self-stretch flex-1 relative">
                        <div className="w-40 h-2.5 left-0 top-[13px] absolute inline-flex justify-center items-end">
                          <div
                            className={`flex-1 self-stretch bg-gradient-to-l ${barGradient}`}
                          />
                        </div>
                      </div>
                      <div className="self-stretch flex-1 relative">
                        <div className="w-28 h-2.5 left-0 top-[13px] absolute inline-flex justify-center items-end">
                          <div
                            className={`flex-1 self-stretch bg-gradient-to-l ${barGradient}`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Chart Labels */}
                    <div className="w-80 h-36 left-[10px] top-[50px] absolute">
                      <div className="w-80 h-36 left-[4px] top-0 absolute inline-flex flex-col justify-center items-start gap-px">
                        {["Jan", "Feb", "Mar", "Apr"].map((month, idx) => (
                          <div
                            key={month}
                            className="self-stretch flex-1 relative"
                          >
                            <div className="w-16 h-5 left-[-9px] top-[10px] absolute text-right justify-start text-gray-400 text-xs font-normal font-helvetica-now">
                              {month}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payback Period and ROI Cards */}
                <div className="self-stretch inline-flex justify-start items-start gap-5">
                  <div className="flex-1 p-5 bg-yellow-100/10 rounded-[10px] inline-flex flex-col justify-center items-start gap-2">
                    <div className="self-stretch flex flex-col justify-start items-start gap-2">
                      <img src="/icons/timer.svg" />
                      <div className="self-stretch text-left text-gray-400 text-[10px] font-bold font-helvetica-now uppercase leading-none tracking-wide">
                        Payback Period
                      </div>
                      <div className="self-stretch text-left text-yellow-100 text-xl font-bold font-helvetica-now leading-normal">
                        {rec.paybackPeriod || "3.2 months"}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 p-5 bg-stone-800 rounded-[10px] inline-flex flex-col justify-center items-start gap-2">
                    <div className="self-stretch flex flex-col justify-start items-start gap-2">
                      <img src="/icons/presentation.svg" />
                      <div className="self-stretch text-left justify-start text-gray-400 text-[10px] font-bold font-helvetica-now uppercase leading-none tracking-wide">
                        Risk-Adjusted ROI
                      </div>
                      <div className="self-stretch text-left justify-start text-indigo-300 text-lg font-bold font-helvetica-now leading-normal">
                        {rec.riskAdjustedROI || "+$89k/quarter"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Risk Profile Section */}
              <div className="w-96 pb-5 left-[20px] top-[693px] absolute border-b-[0.50px] border-neutral-600 inline-flex flex-col justify-start items-start gap-5">
                <div className="self-stretch flex flex-col justify-start items-start gap-3">
                  <div className="self-stretch text-left justify-start text-gray-400 text-base font-bold font-helvetica-now uppercase leading-normal tracking-widest">
                    RISK PROFILE
                  </div>
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-3">
                  <div className="w-96 flex flex-col justify-start items-start gap-2">
                    <div className="self-stretch text-left justify-start text-white text-base font-medium font-helvetica-now leading-tight">
                      {rec.risk}
                    </div>
                    <div className="self-stretch text-left justify-start text-gray-400 text-sm font-normal font-helvetica-now leading-none">
                      {rec.riskProfileDescription || "Based on 3 risk factors"}
                    </div>
                  </div>
                  <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
                    {rec.riskFactors ? (
                      rec.riskFactors.map((factor, idx) => (
                        <div
                          key={idx}
                          className="self-stretch p-5 bg-neutral-800 rounded-[10px] inline-flex justify-between items-center"
                        >
                          <div className="justify-start text-gray-400 text-sm font-bold font-helvetica-now">
                            {factor.label}
                          </div>
                          <div
                            className={`w-14 h-5 ${factor.color} rounded-[60px] flex justify-center items-center gap-2.5`}
                          >
                            <div className="justify-start text-white text-[10px] font-normal font-helvetica-now uppercase">
                              {factor.level}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      // Fallback static risk factors
                      <>
                        <div className="self-stretch p-5 bg-neutral-800 rounded-[10px] inline-flex justify-between items-center">
                          <div className="justify-start text-gray-400 text-sm font-bold font-helvetica-now">
                            System Integration Complexity
                          </div>
                          <div className="w-14 h-5 bg-teal-800 rounded-[60px] flex justify-center items-center gap-2.5">
                            <div className="justify-start text-white text-[10px] font-normal font-helvetica-now uppercase">
                              Low
                            </div>
                          </div>
                        </div>
                        <div className="self-stretch p-5 bg-neutral-800 rounded-[10px] inline-flex justify-between items-center">
                          <div className="justify-start text-gray-400 text-sm font-bold font-helvetica-now">
                            Change Mgmt Required
                          </div>
                          <div className="w-14 h-5 bg-yellow-900 rounded-[60px] flex justify-center items-center gap-2.5">
                            <div className="justify-start text-white text-[10px] font-normal font-helvetica-now uppercase">
                              Medium
                            </div>
                          </div>
                        </div>
                        <div className="self-stretch p-5 bg-neutral-800 rounded-[10px] inline-flex justify-between items-center">
                          <div className="justify-start text-gray-400 text-sm font-bold font-helvetica-now">
                            Department Alignment
                          </div>
                          <div className="w-14 h-5 bg-red-900 rounded-[60px] flex justify-center items-center gap-2.5">
                            <div className="justify-start text-white text-[10px] font-normal font-helvetica-now uppercase">
                              High
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Dependencies Snapshot Section */}
              <div className="w-96 pb-5 left-[20px] top-[1036px] absolute border-b-[0.50px] border-neutral-600 inline-flex flex-col justify-start items-start gap-5">
                <div className="self-stretch flex flex-col justify-start items-start gap-3">
                  <div className="self-stretch text-left justify-start text-gray-400 text-base font-bold font-helvetica-now uppercase leading-normal tracking-widest">
                    DEPENDENCIES SNAPSHOT
                  </div>
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-3">
                  <div className="self-stretch text-left justify-start text-blue-300 text-sm font-bold font-helvetica-now leading-none">
                    Why this recommendation?
                  </div>
                  <img
                    className="self-stretch h-56 w-96 relative border-gray-200 rounded-[10px]"
                    src={
                      rec.dependenciesSnapshotImage ||
                      `/images/p${index + 1}.png`
                    }
                    alt="Dependencies snapshot"
                  />
                </div>
              </div>

              {/* Systems Involved Section */}
              <div className="w-96 pb-5 left-[20px] top-[1354px] absolute border-b-[0.50px] border-neutral-600 inline-flex flex-col justify-start items-start gap-3">
                <div className="self-stretch flex flex-col justify-start items-start gap-3">
                  <div className="self-stretch text-left justify-start text-gray-400 text-base font-bold font-helvetica-now uppercase leading-normal tracking-widest">
                    SYSTEMS INVOLVED
                  </div>
                </div>
                <div className="inline-flex justify-start items-start gap-2 flex-wrap">
                  {systems.map((system, idx) => (
                    <div
                      key={idx}
                      className="h-7 px-5 py-2.5 bg-neutral-800 rounded-[60px] flex justify-center items-center gap-1.5"
                    >
                      <div className="justify-start text-white text-xs font-bold font-helvetica-now uppercase leading-none">
                        {system}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="w-96 left-[20px] top-[1458px] absolute inline-flex flex-col justify-start items-start gap-4">
                <div className="self-stretch h-12 px-10 py-5 bg-neutral-900 rounded-[60px] shadow-[0px_40px_120px_0px_rgba(1,68,199,0.30)] outline outline-1 outline-white inline-flex justify-center items-center gap-2 cursor-pointer">
                  <div className="justify-start text-white text-base font-bold font-helvetica-now leading-normal">
                    Drill deeper into this recommendation
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Close Button */}
        <img
          className="w-6 h-6 left-[1131px] top-[2px] absolute cursor-pointer"
          src="/icons/cancel.svg"
          onClick={onClose}
          alt="Close"
        />
      </div>
    </div>
  );
};

export default ComparisonDialog;
