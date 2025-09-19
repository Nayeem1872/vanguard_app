/** @jsxImportSource react */
import React, { useState, useEffect } from "react";
import axios from "axios";

interface DependencyImpactProps {
  id?: string;
}

interface SystemDependency {
  name: string;
  description: string;
  systems: string[];
}

interface SystemReliance {
  system: string;
  nodes: string;
}

interface CriticalPath {
  from: string;
  to: string;
  impact: string;
}

interface Filter {
  name: string;
  selected: boolean;
}

interface DependenciesData {
  systemDependencies: SystemDependency[];
  simulationDisruption: string[];
  systemReliance: SystemReliance[];
  criticalPath: CriticalPath;
  recommendationFocus: string;
  filters: Filter[];
  lastUpdated: string;
}

const DependencyImpact: React.FC<DependencyImpactProps> = ({ id }) => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dependenciesData, setDependenciesData] =
    useState<DependenciesData | null>(null);

  const handleCardClick = (cardName: string) => {
    setSelectedCard(cardName === selectedCard ? null : cardName);
  };

  const fetchDependencies = async () => {
    if (!id) {
      console.log("No ID provided for dependencies API call");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      console.log(`Fetching dependencies for ID: ${id}`);
      // Get auth token from localStorage
      const authToken =
        typeof window !== "undefined"
          ? localStorage.getItem("authToken")
          : null;
      console.log("DependencyImpact: Auth token retrieved:", authToken);

      // Create headers object with authorization
      const headers: any = {};
      if (authToken) {
        headers.Authorization = `Bearer ${authToken}`;
      }

      const response = await axios.get(
        `/api/ai/recommendations/dependencies?recId=${id}`,
        { headers }
      );

      console.log("Dependencies API Response:", response.data);

      if (response.data.success && response.data.data.dependencies) {
        setDependenciesData(response.data.data.dependencies);
      }
    } catch (err: any) {
      console.error("Error fetching dependencies:", err);
      setError(err.message || "Failed to fetch dependencies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDependencies();
  }, [id]);
  return (
    <>
      <div className=" flex flex-col items-center justify-center">
        {loading && (
          <div className="w-full max-w-6xl mb-4 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
            <div className="text-blue-400 text-sm">
              Loading dependencies data...
            </div>
          </div>
        )}

        {error && (
          <div className="w-full max-w-6xl mb-4 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
            <div className="text-red-400 text-sm">Error: {error}</div>
          </div>
        )}
        <div className="w-full max-w-6xl flex flex-col justify-start items-start gap-2 overflow-hidden">
          <div className="self-stretch justify-start text-gray-400 text-base font-bold  uppercase leading-normal tracking-widest">
            System Dependencies
          </div>
          <div className="self-stretch justify-start text-white text-base font-normal  leading-normal">
            This visualization shows how the recommendation relies on
            interconnected parts of your enterprise systems.
          </div>
        </div>

        <div className="w-full max-w-6xl mt-6 p-7 bg-zinc-950 rounded-[20px] flex flex-col justify-start items-start gap-5 overflow-hidden">
          <div className="w-full flex justify-between items-center">
            <div className="flex justify-start items-center gap-4">
              <div className="justify-start text-gray-400 text-sm font-bold  leading-tight">
                Filter by:
              </div>
              <div className="flex justify-start items-start gap-2">
                {dependenciesData?.filters?.map((filter, index) => (
                  <div
                    key={index}
                    className={`h-7 px-5 py-2.5 rounded-[60px] flex justify-center items-center gap-1.5 ${
                      filter.selected
                        ? "bg-white"
                        : "outline outline-1 outline-offset-[-1px] outline-gray-400"
                    }`}
                  >
                    <div
                      className={`justify-start text-xs font-bold uppercase leading-none ${
                        filter.selected ? "text-neutral-900" : "text-gray-400"
                      }`}
                    >
                      {filter.name}
                    </div>
                  </div>
                )) || (
                  // Fallback to static filters
                  <>
                    <div className="h-7 px-5 py-2.5 bg-white rounded-[60px] flex justify-center items-center gap-1.5">
                      <div className="justify-start text-neutral-900 text-xs font-bold  uppercase leading-none">
                        ERP
                      </div>
                    </div>
                    <div className="h-7 px-5 py-2.5 rounded-[60px] outline outline-1 outline-offset-[-1px] outline-gray-400 flex justify-center items-center gap-1.5">
                      <div className="justify-start text-gray-400 text-xs font-bold  uppercase leading-none">
                        HRIS
                      </div>
                    </div>
                    <div className="h-7 px-5 py-2.5 rounded-[60px] outline outline-1 outline-offset-[-1px] outline-gray-400 flex justify-center items-center gap-1.5">
                      <div className="justify-start text-gray-400 text-xs font-bold  uppercase leading-none">
                        WMS
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="flex justify-start items-center gap-4">
              <div className="flex justify-start items-center gap-4">
                <div className="text-gray-400 text-sm font-bold leading-tight">
                  Simulate Disruption:
                </div>

                <div className="flex-1 relative">
                  <select className="w-full h-9 pl-5 pr-10 rounded-[60px] outline outline-1 outline-offset-[-1px] outline-gray-400 text-white text-xs font-bold leading-none appearance-none bg-black">
                    <option className="bg-black text-white">None</option>
                    {dependenciesData?.simulationDisruption?.map(
                      (disruption, index) => (
                        <option key={index} className="bg-black text-white">
                          {disruption}
                        </option>
                      )
                    ) || (
                      <>
                        <option className="bg-black text-white">
                          Low Impact
                        </option>
                        <option className="bg-black text-white">
                          High Impact
                        </option>
                      </>
                    )}
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="h-9 py-5  flex justify-center items-center gap-2">
                <img src="/images/Frame 2147224348.png" />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto relative w-[1200px]">
            <div className="inline-flex justify-start items-center gap-5 min-w-max pb-4">
              {dependenciesData?.systemDependencies?.map(
                (dependency, index) => (
                  <>
                    <div
                      key={dependency.name}
                      className={`w-[400px] h-36 p-5 rounded-2xl inline-flex flex-col justify-center items-start gap-3 cursor-pointer transition-all duration-200 flex-shrink-0 ${
                        selectedCard === dependency.name
                          ? "bg-[#271819] border-2 border-red-500"
                          : "bg-neutral-800 border-2 border-transparent"
                      }`}
                      onClick={() => handleCardClick(dependency.name)}
                    >
                      <div className="self-stretch flex flex-col justify-start items-start gap-2">
                        <div className="self-stretch flex items-center gap-2">
                          {selectedCard === dependency.name && (
                            <svg
                              className="w-5 h-5 text-red-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                          <div className="justify-start text-white text-base font-bold leading-tight">
                            {dependency.name}
                          </div>
                        </div>
                        <div className="self-stretch justify-start text-gray-400 text-sm font-normal">
                          {dependency.description}
                        </div>
                      </div>
                      <div className="inline-flex justify-start items-center gap-2">
                        {dependency.systems.map((system, sysIndex) => {
                          const getSystemColor = (sys: string) => {
                            switch (sys.toLowerCase()) {
                              case "erp":
                                return "bg-blue-900 text-indigo-200";
                              case "crm":
                                return "bg-green-900 text-green-200";
                              case "wms":
                                return "bg-purple-900 text-fuchsia-300";
                              case "hris":
                                return "bg-teal-800 text-white";
                              default:
                                return "bg-gray-900 text-gray-200";
                            }
                          };

                          return (
                            <div
                              key={sysIndex}
                              className={`h-7 px-5 py-2.5 rounded-[60px] flex justify-center items-center gap-1.5 ${getSystemColor(
                                system
                              )}`}
                            >
                              <div className="justify-start text-[10px] font-bold uppercase leading-3">
                                {system}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    {index <
                      (dependenciesData?.systemDependencies?.length || 0) -
                        1 && <img src="/icons/arrowright.svg" alt="arrow" />}
                  </>
                )
              ) || (
                // Fallback message when no data available
                <div className="w-[400px] h-36 p-5 rounded-2xl bg-neutral-800 border-2 border-transparent flex items-center justify-center">
                  <div className="text-gray-400 text-sm">
                    No dependency data available
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dependency Impact Analysis */}
        <div className="w-full max-w-6xl mt-6 flex flex-col justify-start items-start gap-5 overflow-hidden">
          <div className="self-stretch justify-start text-gray-400 text-base font-bold  uppercase leading-normal tracking-widest">
            Dependency Impact Analysis
          </div>
          <div className="self-stretch inline-flex justify-start items-start gap-5">
            <div className="flex-1 self-stretch p-5 bg-[#071865] rounded-2xl  inline-flex flex-col justify-start items-start gap-3">
              <div className="self-stretch flex flex-col justify-start items-start gap-3">
                <img src="/icons/graph_1.svg" />
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch justify-start text-white text-base font-bold  leading-tight">
                    Critical Path
                  </div>
                  <div className="inline-flex justify-start items-center gap-2">
                    <div className="w-2 h-2 relative bg-blue-500 rounded-full border-gray-200" />
                    <div className="w-44 h-5 justify-start text-gray-400 text-sm font-normal font-['Inter'] leading-tight">
                      {dependenciesData?.criticalPath
                        ? `${dependenciesData.criticalPath.from} → ${dependenciesData.criticalPath.to}`
                        : "Receiving Dock → Zone 3"}
                    </div>
                  </div>
                  <div className="self-stretch justify-start text-gray-400 text-[10px] font-medium leading-none">
                    {dependenciesData?.criticalPath?.impact ||
                      "Highest impact on throughput (37% bottleneck)"}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 p-5 bg-[#142320] rounded-2xl inline-flex flex-col justify-start items-start gap-3">
              <div className="self-stretch flex flex-col justify-start items-start gap-3">
                <img src="/icons/featured_play_list.svg" />
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch justify-start text-white text-base font-bold  leading-tight">
                    System Reliance
                  </div>
                  <div className="w-72 inline-flex justify-start items-start gap-2 flex-wrap content-start">
                    {dependenciesData?.systemReliance?.map(
                      (reliance, index) => {
                        const getSystemColor = (sys: string) => {
                          switch (sys.toLowerCase()) {
                            case "erp":
                              return "bg-blue-500";
                            case "crm":
                              return "bg-green-500";
                            case "wms":
                              return "bg-violet-500";
                            case "hris":
                              return "bg-teal-800";
                            default:
                              return "bg-gray-500";
                          }
                        };

                        return (
                          <div
                            key={index}
                            className="flex justify-start items-center gap-2"
                          >
                            <div
                              className={`w-2 h-2 relative rounded-full border-gray-200 ${getSystemColor(
                                reliance.system
                              )}`}
                            />
                            <div className="justify-start text-gray-400 text-sm font-normal font-['Inter'] leading-tight">
                              {reliance.system}: {reliance.nodes}
                            </div>
                          </div>
                        );
                      }
                    ) || (
                      // Fallback to static content
                      <>
                        <div className="flex justify-start items-center gap-2">
                          <div className="w-2 h-2 relative bg-blue-500 rounded-full border-gray-200" />
                          <div className="justify-start text-gray-400 text-sm font-normal font-['Inter'] leading-tight">
                            WMS: 5/5 nodes
                          </div>
                        </div>
                        <div className="flex justify-start items-center gap-2">
                          <div className="w-2 h-2 relative bg-violet-500 rounded-full border-gray-200" />
                          <div className="justify-start text-gray-400 text-sm font-normal font-['Inter'] leading-tight">
                            ERP: 3/5 nodes
                          </div>
                        </div>
                        <div className="flex justify-start items-center gap-2">
                          <div className="w-2 h-2 relative bg-teal-800 rounded-full border-gray-200" />
                          <div className="justify-start text-gray-400 text-sm font-normal font-['Inter'] leading-tight">
                            HRIS: 2/5 nodes
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 self-stretch p-5 bg-[#2E083A] rounded-2xl  inline-flex flex-col justify-start items-start gap-3">
              <div className="self-stretch flex flex-col justify-start items-start gap-3">
                <img src="/icons/featured_play_list.svg" />
                <div className="self-stretch h-12 flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch justify-start text-white text-base font-bold leading-tight">
                    Recommendation Focus
                  </div>
                  <div className="self-stretch inline-flex justify-start items-start gap-2">
                    <div className="w-4 h-4 flex justify-center items-center overflow-hidden">
                      <div className="w-4 h-4 relative bg-black/0 border-gray-200 overflow-hidden">
                        <img src="/icons/Frame.svg" />
                      </div>
                    </div>
                    <div className="flex-1 justify-start text-gray-400 text-sm font-normal font-['Inter'] leading-tight">
                      {dependenciesData?.recommendationFocus ||
                        "Optimize dock scheduling and handler allocation"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full width footer - breaks out of parent constraints */}
      <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mt-20 px-6 py-3 bg-zinc-900 flex justify-between items-center">
        <div className="flex justify-start items-center gap-2">
          <div className="justify-start text-gray-400 text-xs font-medium  leading-none">
            Systems:
          </div>
          <div className="flex justify-start items-start gap-2">
            {dependenciesData?.filters?.map((filter, index) => {
              const getSystemColor = (sys: string) => {
                switch (sys.toLowerCase()) {
                  case "erp":
                    return "bg-blue-500";
                  case "crm":
                    return "bg-green-500";
                  case "wms":
                    return "bg-violet-500";
                  case "hris":
                    return "bg-teal-800";
                  default:
                    return "bg-gray-500";
                }
              };

              return (
                <div
                  key={index}
                  className="flex justify-start items-center gap-2"
                >
                  <div
                    className={`w-2 h-2 relative rounded-full border-gray-200 ${getSystemColor(
                      filter.name
                    )}`}
                  />
                  <div className="justify-start text-gray-400 text-sm font-normal font-['Inter'] leading-tight">
                    {filter.name}
                  </div>
                </div>
              );
            }) || (
              // Fallback to static systems
              <>
                <div className="flex justify-start items-center gap-2">
                  <div className="w-2 h-2 relative bg-blue-500 rounded-full border-gray-200" />
                  <div className="justify-start text-gray-400 text-sm font-normal font-['Inter'] leading-tight">
                    ERP
                  </div>
                </div>
                <div className="flex justify-start items-center gap-2">
                  <div className="w-2 h-2 relative bg-teal-800 rounded-full border-gray-200" />
                  <div className="justify-start text-gray-400 text-sm font-normal font-['Inter'] leading-tight">
                    HRIS
                  </div>
                </div>
                <div className="flex justify-start items-center gap-2">
                  <div className="w-2 h-2 relative bg-violet-500 rounded-full border-gray-200" />
                  <div className="justify-start text-gray-400 text-sm font-normal font-['Inter'] leading-tight">
                    WMS
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="flex justify-start items-center gap-4">
          <div className="flex justify-start items-center gap-1">
            <div className="w-8 h-2 relative bg-zinc-700 border-gray-200" />
            <div className="w-16 h-4 justify-start text-gray-400 text-xs font-normal font-['Inter'] leading-none">
              Direct flow
            </div>
          </div>
          <div className="bg-black/0 border-gray-200 flex justify-start items-center gap-1">
            <div className="w-8 h-px relative bg-black/0 border-t border-gray-500" />
            <div className="w-24 h-4 justify-start text-gray-500 text-xs font-normal font-['Inter'] leading-none">
              Conditional flow
            </div>
          </div>
        </div>
        <div className="w-48 h-4 justify-start text-gray-500 text-xs font-normal font-['Inter'] leading-none">
          {dependenciesData?.lastUpdated || "Last updated: Today at 10:45 AM"}
        </div>
      </div>
    </>
  );
};

export default DependencyImpact;
