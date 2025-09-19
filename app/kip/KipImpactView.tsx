"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const KipImpactView = () => {
  // State for API data
  const [kpiData, setKpiData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for event log
  const [eventLog, setEventLog] = useState<any[]>([]);
  const [selectedEventIndex, setSelectedEventIndex] = useState<number | null>(
    null
  );

  // State for slider values - will be updated from API
  const [laborEfficiency, setLaborEfficiency] = useState(12); // 12%
  const [materialCosts, setMaterialCosts] = useState(8.5); // 8.5K
  const [vendorCount, setVendorCount] = useState(3); // 3 vendors
  const [overtimeHours, setOvertimeHours] = useState(48); // 48%

  // Calculate dynamic chart data based on slider values
  const calculateChartData = () => {
    const baseValues = {
      forecast: [140, 250, 75, 200, 140],
      actual: [90, 170, 50, 130, 65],
    };

    // Calculate impact factors from sliders
    const efficiencyImpact =
      (laborEfficiency / (kpiData?.sliders?.[0]?.max || 250)) * 0.3; // 30% weight
    const costImpact =
      (materialCosts / (kpiData?.sliders?.[1]?.max || 300)) * 0.25; // 25% weight
    const confidenceImpact =
      (vendorCount / (kpiData?.sliders?.[2]?.max || 100)) * 0.2; // 20% weight
    const riskImpact =
      (overtimeHours / (kpiData?.sliders?.[3]?.max || 100)) * 0.25; // 25% weight

    const totalImpact =
      1 + efficiencyImpact + costImpact - confidenceImpact - riskImpact;

    return {
      forecast: baseValues.forecast.map((val) =>
        Math.max(10, Math.round(val * totalImpact))
      ),
      actual: baseValues.actual.map((val) =>
        Math.max(5, Math.round(val * totalImpact * 0.85))
      ),
    };
  };

  const chartData = calculateChartData();

  // Calculate dynamic KPI Impact Matrix data based on slider values
  const calculateKPIMatrix = () => {
    // Base impact percentages
    const baseImpacts = {
      operatingCosts: { manufacturing: -8.2, logistics: -5.1, operations: 2.3 },
      efficiencyRate: { manufacturing: 2.3, logistics: -8.2, operations: -5.1 },
      serviceLevelCosts: {
        manufacturing: -5.1,
        logistics: -5.1,
        operations: 2.3,
      },
      serviceLevel: { manufacturing: 0.5, logistics: -8.2, operations: -5.1 },
      resourceUtilization: {
        manufacturing: -5.1,
        logistics: -5.1,
        operations: 2.3,
      },
    };

    // Calculate impact factors from sliders (normalized to 0-1 range)
    const efficiencyFactor =
      laborEfficiency / (kpiData?.sliders?.[0]?.max || 25);
    const costFactor = materialCosts / (kpiData?.sliders?.[1]?.max || 20);
    const vendorFactor = vendorCount / (kpiData?.sliders?.[2]?.max || 10);
    const overtimeFactor = overtimeHours / (kpiData?.sliders?.[3]?.max || 100);

    // Apply weighted adjustments to base impacts
    const adjustmentMultiplier =
      1 +
      efficiencyFactor * 0.3 +
      costFactor * 0.25 -
      vendorFactor * 0.2 -
      overtimeFactor * 0.25;

    // Calculate adjusted KPI values
    const adjustedKPIs = {
      operatingCosts: {
        manufacturing:
          Math.round(
            baseImpacts.operatingCosts.manufacturing * adjustmentMultiplier * 10
          ) / 10,
        logistics:
          Math.round(
            baseImpacts.operatingCosts.logistics * adjustmentMultiplier * 10
          ) / 10,
        operations:
          Math.round(
            baseImpacts.operatingCosts.operations * adjustmentMultiplier * 10
          ) / 10,
      },
      efficiencyRate: {
        manufacturing:
          Math.round(
            baseImpacts.efficiencyRate.manufacturing * adjustmentMultiplier * 10
          ) / 10,
        logistics:
          Math.round(
            baseImpacts.efficiencyRate.logistics * adjustmentMultiplier * 10
          ) / 10,
        operations:
          Math.round(
            baseImpacts.efficiencyRate.operations * adjustmentMultiplier * 10
          ) / 10,
      },
      serviceLevelCosts: {
        manufacturing:
          Math.round(
            baseImpacts.serviceLevelCosts.manufacturing *
              adjustmentMultiplier *
              10
          ) / 10,
        logistics:
          Math.round(
            baseImpacts.serviceLevelCosts.logistics * adjustmentMultiplier * 10
          ) / 10,
        operations:
          Math.round(
            baseImpacts.serviceLevelCosts.operations * adjustmentMultiplier * 10
          ) / 10,
      },
      serviceLevel: {
        manufacturing:
          Math.round(
            baseImpacts.serviceLevel.manufacturing * adjustmentMultiplier * 10
          ) / 10,
        logistics:
          Math.round(
            baseImpacts.serviceLevel.logistics * adjustmentMultiplier * 10
          ) / 10,
        operations:
          Math.round(
            baseImpacts.serviceLevel.operations * adjustmentMultiplier * 10
          ) / 10,
      },
      resourceUtilization: {
        manufacturing:
          Math.round(
            baseImpacts.resourceUtilization.manufacturing *
              adjustmentMultiplier *
              10
          ) / 10,
        logistics:
          Math.round(
            baseImpacts.resourceUtilization.logistics *
              adjustmentMultiplier *
              10
          ) / 10,
        operations:
          Math.round(
            baseImpacts.resourceUtilization.operations *
              adjustmentMultiplier *
              10
          ) / 10,
      },
    };

    return adjustedKPIs;
  };

  const kpiMatrix = calculateKPIMatrix();

  // Helper function to get background color based on impact value
  const getImpactColor = (value: number) => {
    if (value > 1) return "bg-emerald-900"; // Strong positive
    if (value > 0) return "bg-neutral-600"; // Weak positive
    if (value > -3) return "bg-red-900"; // Weak negative
    return "bg-red-900"; // Strong negative
  };

  // Helper function to format impact value
  const formatImpactValue = (value: number) => {
    const sign = value >= 0 ? "+" : "";
    return `${sign}${value}%`;
  };

  // Get ID from localStorage and fetch KPI data
  // useEffect(() => {
  //   const storedId = localStorage.getItem("currentRecommendationId");
  //   console.log("Retrieved ID from localStorage:", storedId);

  //   if (storedId) {
  //     const fetchKPIData = async () => {
  //       try {
  //         setLoading(true);
  //         setError(null);
  //         console.log(`Fetching KPI data for ID: ${storedId}`);
  //         const response = await axios.get(
  //           `/api/ai/recommendations/kpi?recId=${storedId}`
  //         );
  //         console.log("KPI API Response:", response.data);

  //         if (response.data.success && response.data.data.kpi) {
  //           setKpiData(response.data.data.kpi);

  //           // Update slider values from API data if available
  //           const sliders = response.data.data.kpi.sliders;
  //           if (sliders && sliders.length >= 4) {
  //             // Map API sliders to component state based on labels
  //             sliders.forEach((slider: any) => {
  //               switch (slider.label) {
  //                 case "Potential Savings":
  //                   setLaborEfficiency(slider.value);
  //                   break;
  //                 case "Risk-Adjusted ROI":
  //                   setMaterialCosts(slider.value);
  //                   break;
  //                 case "Implementation Confidence":
  //                   setVendorCount(slider.value);
  //                   break;
  //                 case "Change Management Risk":
  //                   setOvertimeHours(slider.value);
  //                   break;
  //               }
  //             });
  //           }

  //           // Initialize event log from API or use default
  //           if (response.data.data.kpi.eventLog) {
  //             setEventLog(response.data.data.kpi.eventLog);
  //           } else {
  //             // Set default event log
  //             setEventLog([
  //               {
  //                 time: "14:32:18",
  //                 message: "Switched to KIP Impact View",
  //                 user: "system",
  //               },
  //               {
  //                 time: "14:31:45",
  //                 message: "Scenario Initialized: Base Case",
  //                 user: "user",
  //               },
  //               {
  //                 time: "14:31:22",
  //                 message: "Labor Efficiency adjusted to 12%",
  //                 user: "system",
  //               },
  //               {
  //                 time: "14:30:58",
  //                 message: "Material Costs reduced by $8.5K",
  //                 user: "user",
  //               },
  //               {
  //                 time: "14:29:47",
  //                 message: "Vendor consolidation: -3 vendors",
  //                 user: "user",
  //               },
  //             ]);
  //           }
  //         }
  //       } catch (error) {
  //         console.error("Error fetching KPI data:", error);
  //         setError("Failed to fetch KPI data");
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchKPIData();
  //   } else {
  //     console.log("No recommendation ID found in localStorage");
  //     setLoading(false);
  //   }
  // }, []);

  // Generate current timestamp
  const getCurrentTimestamp = () => {
    const now = new Date();
    return now.toTimeString().slice(0, 8);
  };

  // Save scenario function
  const saveScenario = () => {
    const timestamp = getCurrentTimestamp();
    const scenarioData = {
      laborEfficiency,
      materialCosts,
      vendorCount,
      overtimeHours,
      roiForecast: chartData.forecast,
      timestamp,
    };

    const newEventLogEntry = {
      time: timestamp,
      message: `Scenario saved - Labor: +${laborEfficiency}%, Materials: $${materialCosts}K, Vendors: ${vendorCount}, Overtime: ${overtimeHours}%`,
      user: "user",
      scenarioData, // Store the scenario data for loading later
    };

    // Add to event log
    setEventLog((prev) => [newEventLogEntry, ...prev]);

    console.log("Scenario saved:", scenarioData);
  };

  // Load scenario function
  const loadScenario = () => {
    if (
      selectedEventIndex !== null &&
      eventLog[selectedEventIndex]?.scenarioData
    ) {
      const scenario = eventLog[selectedEventIndex].scenarioData;

      // Load slider values
      setLaborEfficiency(scenario.laborEfficiency);
      setMaterialCosts(scenario.materialCosts);
      setVendorCount(scenario.vendorCount);
      setOvertimeHours(scenario.overtimeHours);

      // Clear selection
      setSelectedEventIndex(null);

      console.log("Scenario loaded:", scenario);
    } else {
      console.log("No valid scenario selected to load");
    }
  };

  // Handle event log item selection
  const handleEventSelection = (index: number) => {
    // Only allow selection of events that have scenario data
    if (eventLog[index]?.scenarioData) {
      setSelectedEventIndex(selectedEventIndex === index ? null : index);
    }
  };

  // Calculate position for slider handles (percentage of track width)
  const getSliderPosition = (
    value: number,
    max: number,
    trackWidth: number
  ) => {
    return (value / max) * trackWidth;
  };

  // Handle slider drag functionality with improved error handling
  const handleSliderDrag = (
    e: React.MouseEvent,
    setValue: (value: number) => void,
    max: number,
    trackWidth: number
  ) => {
    const target = e.currentTarget as HTMLElement;
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / trackWidth));
    const newValue = Math.round(percentage * max * 10) / 10;
    setValue(newValue);
  };

  // Improved mouse down handler with better error handling
  const handleMouseDown = (
    e: React.MouseEvent,
    setValue: (value: number) => void,
    max: number,
    trackWidth: number
  ) => {
    e.preventDefault();
    const track = e.currentTarget.parentElement?.parentElement as HTMLElement;
    if (!track) return;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const rect = track.getBoundingClientRect();
      const x = moveEvent.clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, x / trackWidth));
      const newValue = Math.round(percentage * max * 10) / 10;
      setValue(newValue);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  return (
    <div className="relative z-10 flex flex-col items-center justify-center px-8 mt-16">
      <div className="max-w-7xl w-full">
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-3">
            <div className="w-full h-[783px] relative bg-zinc-950 rounded-tl-[20px] rounded-tr-[20px] overflow-hidden">
              <div className="left-[20px] top-[20px] absolute justify-start text-gray-400 text-base font-bold  uppercase leading-normal tracking-widest">
                scenario ASSUMPTIONS
              </div>
              <div className="w-64 left-[20px] top-[64px] absolute inline-flex flex-col justify-start items-start gap-5">
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch h-5 inline-flex justify-between items-center">
                    <div className="justify-start text-white text-sm font-normal ">
                      {kpiData?.sliders?.[0]?.label || "Labor Efficiency"}
                    </div>
                    <div
                      className={`text-right justify-start text-sm font-medium ${
                        kpiData?.sliders?.[0]?.textClass || "text-green-500"
                      }`}
                    >
                      +{laborEfficiency}
                      {kpiData?.sliders?.[0]?.unit || "%"}
                    </div>
                  </div>
                  <div
                    className="self-stretch h-2 relative bg-white/10 rounded-[40px] cursor-pointer transition-all duration-150 ease-out"
                    onClick={(e) =>
                      handleSliderDrag(
                        e,
                        setLaborEfficiency,
                        kpiData?.sliders?.[0]?.max || 25,
                        256
                      )
                    }
                  >
                    <div
                      className="h-2 absolute left-0 top-0 bg-blue-500 rounded-[60px] shadow-[0px_40px_120px_0px_rgba(1,68,199,0.30)] transition-all duration-150 ease-out"
                      style={{
                        width: `${getSliderPosition(
                          laborEfficiency,
                          kpiData?.sliders?.[0]?.max || 25,
                          256
                        )}px`,
                      }}
                    >
                      <div
                        className="w-6 h-6 absolute bg-white rounded-[60px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.10)] border-8 border-blue-700 cursor-grab active:cursor-grabbing transition-all duration-150 ease-out hover:scale-110"
                        style={{
                          left: `${
                            getSliderPosition(
                              laborEfficiency,
                              kpiData?.sliders?.[0]?.max || 25,
                              256
                            ) - 12
                          }px`,
                          top: "-9px",
                        }}
                        onMouseDown={(e) =>
                          handleMouseDown(
                            e,
                            setLaborEfficiency,
                            kpiData?.sliders?.[0]?.max || 25,
                            256
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="self-stretch h-5 inline-flex justify-between items-center">
                    <div className="justify-start text-gray-400 text-xs font-medium ">
                      0{kpiData?.sliders?.[0]?.unit || "%"}
                    </div>
                    <div className="text-right justify-start text-gray-400 text-xs font-medium ">
                      {kpiData?.sliders?.[0]?.max || 25}
                      {kpiData?.sliders?.[0]?.unit || "%"}
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch h-5 inline-flex justify-between items-center">
                    <div className="justify-start text-white text-sm font-normal ">
                      {kpiData?.sliders?.[1]?.label || "Material Costs"}
                    </div>
                    <div
                      className={`text-right justify-start text-sm font-medium ${
                        kpiData?.sliders?.[1]?.textClass || "text-red-500"
                      }`}
                    >
                      ${materialCosts}
                      {kpiData?.sliders?.[1]?.unit || "K"}
                    </div>
                  </div>
                  <div
                    className="self-stretch h-2 relative bg-white/10 rounded-[40px] cursor-pointer transition-all duration-150 ease-out"
                    onClick={(e) =>
                      handleSliderDrag(
                        e,
                        setMaterialCosts,
                        kpiData?.sliders?.[1]?.max || 20,
                        256
                      )
                    }
                  >
                    <div
                      className="h-2 absolute left-0 top-0 bg-blue-500 rounded-[60px] shadow-[0px_40px_120px_0px_rgba(1,68,199,0.30)] transition-all duration-150 ease-out"
                      style={{
                        width: `${getSliderPosition(
                          materialCosts,
                          kpiData?.sliders?.[1]?.max || 20,
                          256
                        )}px`,
                      }}
                    >
                      <div
                        className="w-6 h-6 absolute bg-white rounded-[60px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.10)] border-8 border-blue-700 cursor-grab active:cursor-grabbing transition-all duration-150 ease-out hover:scale-110"
                        style={{
                          left: `${
                            getSliderPosition(
                              materialCosts,
                              kpiData?.sliders?.[1]?.max || 20,
                              256
                            ) - 12
                          }px`,
                          top: "-9px",
                        }}
                        onMouseDown={(e) =>
                          handleMouseDown(
                            e,
                            setMaterialCosts,
                            kpiData?.sliders?.[1]?.max || 20,
                            256
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="self-stretch h-5 inline-flex justify-between items-center">
                    <div className="justify-start text-gray-400 text-xs font-medium ">
                      0{kpiData?.sliders?.[1]?.unit || "%"}
                    </div>
                    <div className="text-right justify-start text-gray-400 text-xs font-medium ">
                      {kpiData?.sliders?.[1]?.max || 20}
                      {kpiData?.sliders?.[1]?.unit || "K"}
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch h-5 inline-flex justify-between items-center">
                    <div className="justify-start text-white text-sm font-normal ">
                      {kpiData?.sliders?.[2]?.label || "Vendor Count"}
                    </div>
                    <div
                      className={`text-right justify-start text-sm font-medium ${
                        kpiData?.sliders?.[2]?.textClass || "text-red-500"
                      }`}
                    >
                      {vendorCount}
                      {kpiData?.sliders?.[2]?.unit || ""}
                    </div>
                  </div>
                  <div
                    className="self-stretch h-2 relative bg-white/10 rounded-[40px] cursor-pointer transition-all duration-150 ease-out"
                    onClick={(e) =>
                      handleSliderDrag(
                        e,
                        setVendorCount,
                        kpiData?.sliders?.[2]?.max || 10,
                        256
                      )
                    }
                  >
                    <div
                      className="h-2 absolute left-0 top-0 bg-blue-500 rounded-[60px] shadow-[0px_40px_120px_0px_rgba(1,68,199,0.30)] transition-all duration-150 ease-out"
                      style={{
                        width: `${getSliderPosition(
                          vendorCount,
                          kpiData?.sliders?.[2]?.max || 10,
                          256
                        )}px`,
                      }}
                    >
                      <div
                        className="w-6 h-6 absolute bg-white rounded-[60px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.10)] border-8 border-blue-700 cursor-grab active:cursor-grabbing transition-all duration-150 ease-out hover:scale-110"
                        style={{
                          left: `${
                            getSliderPosition(
                              vendorCount,
                              kpiData?.sliders?.[2]?.max || 10,
                              256
                            ) - 12
                          }px`,
                          top: "-9px",
                        }}
                        onMouseDown={(e) =>
                          handleMouseDown(
                            e,
                            setVendorCount,
                            kpiData?.sliders?.[2]?.max || 10,
                            256
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="self-stretch h-5 inline-flex justify-between items-center">
                    <div className="justify-start text-gray-400 text-xs font-medium ">
                      0{kpiData?.sliders?.[2]?.unit || "%"}
                    </div>
                    <div className="text-right justify-start text-gray-400 text-xs font-medium ">
                      {kpiData?.sliders?.[2]?.max || 10}
                      {kpiData?.sliders?.[2]?.unit || ""}
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch h-5 inline-flex justify-between items-center">
                    <div className="justify-start text-white text-sm font-normal ">
                      {kpiData?.sliders?.[3]?.label || "Overtime Hours"}
                    </div>
                    <div
                      className={`text-right justify-start text-sm font-medium ${
                        kpiData?.sliders?.[3]?.textClass || "text-green-500"
                      }`}
                    >
                      {overtimeHours}
                      {kpiData?.sliders?.[3]?.unit || "%"}
                    </div>
                  </div>
                  <div
                    className="self-stretch h-2 relative bg-white/10 rounded-[40px] cursor-pointer transition-all duration-150 ease-out"
                    onClick={(e) =>
                      handleSliderDrag(
                        e,
                        setOvertimeHours,
                        kpiData?.sliders?.[3]?.max || 100,
                        256
                      )
                    }
                  >
                    <div
                      className="h-2 absolute left-0 top-0 bg-blue-500 rounded-[60px] shadow-[0px_40px_120px_0px_rgba(1,68,199,0.30)] transition-all duration-150 ease-out"
                      style={{
                        width: `${getSliderPosition(
                          overtimeHours,
                          kpiData?.sliders?.[3]?.max || 100,
                          256
                        )}px`,
                      }}
                    >
                      <div
                        className="w-6 h-6 absolute bg-white rounded-[60px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.10)] border-8 border-blue-700 cursor-grab active:cursor-grabbing transition-all duration-150 ease-out hover:scale-110"
                        style={{
                          left: `${
                            getSliderPosition(
                              overtimeHours,
                              kpiData?.sliders?.[3]?.max || 100,
                              256
                            ) - 12
                          }px`,
                          top: "-9px",
                        }}
                        onMouseDown={(e) =>
                          handleMouseDown(
                            e,
                            setOvertimeHours,
                            kpiData?.sliders?.[3]?.max || 100,
                            256
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="self-stretch h-5 inline-flex justify-between items-center">
                    <div className="justify-start text-gray-400 text-xs font-medium ">
                      0{kpiData?.sliders?.[3]?.unit || "%"}
                    </div>
                    <div className="text-right justify-start text-gray-400 text-xs font-medium ">
                      {kpiData?.sliders?.[3]?.max || 100}
                      {kpiData?.sliders?.[3]?.unit || "%"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-64 left-[20px] top-[400px] absolute inline-flex flex-col justify-start items-start gap-4">
                <div
                  className="self-stretch h-12 py-5 rounded-[60px] cursor-pointer shadow-[0px_40px_120px_0px_rgba(1,68,199,0.30)] outline outline-2 outline-white/0 inline-flex justify-center items-center gap-2 transition-all duration-150 ease-out hover:scale-105 hover:shadow-[0px_40px_120px_0px_rgba(1,68,199,0.50)]"
                  onClick={saveScenario}
                >
                  <img src="/images/save.png" alt="Save" />
                </div>
                <div
                  className="self-stretch h-12 px-10 py-5 bg-zinc-950 rounded-[60px] shadow-[0px_40px_120px_0px_rgba(1,68,199,0.30)] outline outline-1 outline-white inline-flex justify-center items-center gap-2 cursor-pointer transition-all duration-150 ease-out hover:scale-105 hover:shadow-[0px_40px_120px_0px_rgba(1,68,199,0.50)]"
                  onClick={loadScenario}
                >
                  <div className="justify-start text-white text-base font-bold leading-normal">
                    Load Scenario
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-6">
            <div className="w-full h-96 relative bg-zinc-950 rounded-[30px]">
              <div className="w-[619px] h-80 left-[11px] top-[10px] absolute opacity-0 bg-zinc-300" />
              <div className="w-[585.89px] h-64 left-[15.95px] top-[57px] absolute">
                <div className="w-[598px] h-64 left-[0.05px] top-[0.29px] absolute">
                  <div className="w-[582px] h-64 left-0 top-[0.43px] absolute inline-flex flex-col justify-end items-start gap-0.5">
                    <div className="h-5 inline-flex justify-start items-start">
                      <div className="w-5 h-3.5 opacity-0 bg-zinc-300" />
                      <div className="w-9 h-5 relative">
                        <div className="left-[11px] top-0 absolute text-right justify-start text-gray-400 text-xs font-normal ">
                          Units
                        </div>
                      </div>
                    </div>
                    <div className="self-stretch flex-1 flex flex-col justify-end items-start gap-5">
                      <div className="self-stretch flex-1 inline-flex justify-start items-center gap-2.5">
                        <div className="w-14 h-5 text-right justify-start text-gray-400 text-xs font-normal ">
                          300
                        </div>
                        <div className="flex-1 self-stretch opacity-10 outline outline-1 outline-offset-[-0.50px] outline-white"></div>
                      </div>
                      <div className="self-stretch flex-1 inline-flex justify-start items-center gap-2.5">
                        <div className="w-14 h-5 text-right justify-start text-gray-400 text-xs font-normal ">
                          200
                        </div>
                        <div className="flex-1 self-stretch opacity-10 outline outline-1 outline-offset-[-0.50px] outline-white"></div>
                      </div>
                      <div className="self-stretch flex-1 inline-flex justify-start items-center gap-2.5">
                        <div className="w-14 h-5 text-right justify-start text-gray-400 text-xs font-normal ">
                          100
                        </div>
                        <div className="flex-1 self-stretch opacity-10 outline outline-1 outline-offset-[-0.50px] outline-white"></div>
                      </div>
                      <div className="self-stretch flex-1 inline-flex justify-start items-center gap-2.5">
                        <div className="w-14 h-5 text-right justify-start text-gray-400 text-xs font-normal ">
                          0
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[539px] h-72 left-[72px] top-[51px] absolute">
                <div className="w-[537px] h-44 left-[4px] top-[112px] absolute inline-flex justify-start items-start">
                  <div
                    data-align="Vertical"
                    className="flex-1 self-stretch relative"
                  >
                    <div className="w-14 h-5 left-[3.86px] top-[160px] absolute text-center justify-start text-Color-neutral-09/90 text-xs font-normal ">
                      Jan
                    </div>
                  </div>
                  <div
                    data-align="Vertical"
                    className="flex-1 self-stretch relative"
                  >
                    <div className="w-14 h-5 left-[3.86px] top-[160px] absolute text-center justify-start text-Color-neutral-09/90 text-xs font-normal ">
                      Feb
                    </div>
                  </div>
                  <div
                    data-align="Vertical"
                    className="flex-1 self-stretch relative"
                  >
                    <div className="w-14 h-5 left-[3.86px] top-[160px] absolute text-center justify-start text-Color-neutral-09/90 text-xs font-normal ">
                      Mar
                    </div>
                  </div>
                  <div
                    data-align="Vertical"
                    className="flex-1 self-stretch relative"
                  >
                    <div className="w-14 h-5 left-[3.86px] top-[160px] absolute text-center justify-start text-Color-neutral-09/90 text-xs font-normal ">
                      Apr
                    </div>
                  </div>
                  <div
                    data-align="Vertical"
                    className="flex-1 self-stretch relative"
                  >
                    <div className="w-14 h-5 left-[3.86px] top-[160px] absolute text-center justify-start text-Color-neutral-09/90 text-xs font-normal ">
                      May
                    </div>
                  </div>
                </div>
                <div className="w-[538px] h-0 left-[4px] top-[267px] absolute opacity-20 outline outline-1 outline-offset-[-0.50px] outline-Color-neutral-06/60"></div>
              </div>
              <div className="w-[503px] h-56 left-[93px] top-[89px] absolute inline-flex justify-center items-end gap-9">
                {/* January */}
                <div className="flex-1 self-stretch relative">
                  <div
                    className="w-7 absolute left-[6.73px] inline-flex justify-center items-end"
                    style={{
                      height: `${Math.min(chartData.forecast[0] * 0.8, 224)}px`,
                      top: `${
                        224 - Math.min(chartData.forecast[0] * 0.8, 224)
                      }px`,
                    }}
                  >
                    <div className="flex-1 self-stretch bg-gradient-to-b from-blue-500 to-blue-500/0" />
                  </div>
                  <div
                    className="w-7 absolute left-[38.14px] inline-flex justify-center items-end"
                    style={{
                      height: `${Math.min(chartData.actual[0] * 0.8, 224)}px`,
                      top: `${
                        224 - Math.min(chartData.actual[0] * 0.8, 224)
                      }px`,
                    }}
                  >
                    <div className="flex-1 self-stretch bg-gradient-to-b from-yellow-100 to-yellow-100/0" />
                  </div>
                </div>
                {/* February */}
                <div className="flex-1 self-stretch relative">
                  <div
                    className="w-7 absolute left-[6.73px] inline-flex justify-center items-end"
                    style={{
                      height: `${Math.min(
                        224,
                        (chartData.forecast[1] / 300) * 224
                      )}px`,
                      top: `${
                        224 - Math.min(224, (chartData.forecast[1] / 300) * 224)
                      }px`,
                    }}
                  >
                    <div className="flex-1 self-stretch bg-gradient-to-b from-blue-500 to-blue-500/0" />
                  </div>
                  <div
                    className="w-7 absolute left-[38.14px] inline-flex justify-center items-end"
                    style={{
                      height: `${Math.min(
                        224,
                        (chartData.actual[1] / 300) * 224
                      )}px`,
                      top: `${
                        224 - Math.min(224, (chartData.actual[1] / 300) * 224)
                      }px`,
                    }}
                  >
                    <div className="flex-1 self-stretch bg-gradient-to-b from-yellow-100 to-yellow-100/0" />
                  </div>
                </div>
                {/* March */}
                <div className="flex-1 self-stretch relative">
                  <div
                    className="w-7 absolute left-[6.73px] inline-flex justify-center items-end"
                    style={{
                      height: `${Math.min(
                        224,
                        (chartData.forecast[2] / 300) * 224
                      )}px`,
                      top: `${
                        224 - Math.min(224, (chartData.forecast[2] / 300) * 224)
                      }px`,
                    }}
                  >
                    <div className="flex-1 self-stretch bg-gradient-to-b from-blue-500 to-blue-500/0" />
                  </div>
                  <div
                    className="w-7 absolute left-[38.14px] inline-flex justify-center items-end"
                    style={{
                      height: `${Math.min(
                        224,
                        (chartData.actual[2] / 300) * 224
                      )}px`,
                      top: `${
                        224 - Math.min(224, (chartData.actual[2] / 300) * 224)
                      }px`,
                    }}
                  >
                    <div className="flex-1 self-stretch bg-gradient-to-b from-yellow-100 to-yellow-100/0" />
                  </div>
                </div>
                {/* April */}
                <div className="flex-1 self-stretch relative">
                  <div
                    className="w-7 absolute left-[6.73px] inline-flex justify-center items-end"
                    style={{
                      height: `${Math.min(
                        224,
                        (chartData.forecast[3] / 300) * 224
                      )}px`,
                      top: `${
                        224 - Math.min(224, (chartData.forecast[3] / 300) * 224)
                      }px`,
                    }}
                  >
                    <div className="flex-1 self-stretch bg-gradient-to-b from-blue-500 to-blue-500/0" />
                  </div>
                  <div
                    className="w-7 absolute left-[38.14px] inline-flex justify-center items-end"
                    style={{
                      height: `${Math.min(
                        224,
                        (chartData.actual[3] / 300) * 224
                      )}px`,
                      top: `${
                        224 - Math.min(224, (chartData.actual[3] / 300) * 224)
                      }px`,
                    }}
                  >
                    <div className="flex-1 self-stretch bg-gradient-to-b from-yellow-100 to-yellow-100/0" />
                  </div>
                </div>
                {/* May */}
                <div className="flex-1 self-stretch relative">
                  <div
                    className="w-7 absolute left-[6.73px] inline-flex justify-center items-end"
                    style={{
                      height: `${Math.min(
                        224,
                        (chartData.forecast[4] / 300) * 224
                      )}px`,
                      top: `${
                        224 - Math.min(224, (chartData.forecast[4] / 300) * 224)
                      }px`,
                    }}
                  >
                    <div className="flex-1 self-stretch bg-gradient-to-b from-blue-500 to-blue-500/0" />
                  </div>
                  <div
                    className="w-7 absolute left-[38.14px] inline-flex justify-center items-end"
                    style={{
                      height: `${Math.min(
                        224,
                        (chartData.actual[4] / 300) * 224
                      )}px`,
                      top: `${
                        224 - Math.min(224, (chartData.actual[4] / 300) * 224)
                      }px`,
                    }}
                  >
                    <div className="flex-1 self-stretch bg-gradient-to-b from-yellow-100 to-yellow-100/0" />
                  </div>
                </div>
              </div>
              <div className="left-[21px] top-[30px] absolute inline-flex flex-col justify-start items-start">
                <div className="self-stretch justify-start text-white text-base font-bold ">
                  ROI Forcast
                </div>
              </div>
              <div className="left-[426px] top-[30px] absolute inline-flex justify-start items-center gap-4">
                <div className="h-6 flex justify-start items-center gap-2">
                  <div className="w-2 h-2 relative bg-blue-500" />
                  <div className="justify-start text-gray-400 text-xs font-normal ">
                    Forecast ROI
                  </div>
                </div>
                <div className="h-6 flex justify-start items-center gap-2">
                  <div className="w-2 h-2 relative bg-yellow-100" />
                  <div className="justify-start text-gray-400 text-xs font-normal ">
                    Actual ROI
                  </div>
                </div>
              </div>
            </div>

            {/* 2nd part */}
            <div className="w-full mt-4 inline-flex flex-col justify-start items-start gap-5">
              <div className="self-stretch justify-start text-gray-400 text-base font-bold  uppercase leading-normal tracking-widest">
                KPI Impact Matrix
              </div>
              <div className="self-stretch rounded-[20px] inline-flex justify-start items-center overflow-hidden">
                <div className="w-44 inline-flex flex-col justify-start items-start">
                  <div className="self-stretch h-12 px-5 py-2 bg-neutral-800 border-b-[0.50px] border-neutral-600 inline-flex justify-start items-center gap-80">
                    <div className="justify-start text-gray-400 text-base font-normal ">
                      KPI
                    </div>
                  </div>
                  <div className="self-stretch h-14 px-5 py-2 bg-neutral-800 border-b-[0.50px] border-neutral-600 inline-flex justify-start items-center gap-80">
                    <div className="justify-start text-white text-base font-medium ">
                      Operating Costs
                    </div>
                  </div>
                  <div className="self-stretch h-14 px-5 py-2 bg-neutral-800 border-b-[0.50px] border-neutral-600 inline-flex justify-start items-center gap-80">
                    <div className="justify-start text-white text-base font-medium ">
                      Efficiency Rate
                    </div>
                  </div>
                  <div className="self-stretch h-14 px-5 py-2 bg-neutral-800 border-b-[0.50px] border-neutral-600 inline-flex justify-start items-center gap-80">
                    <div className="justify-start text-white text-base font-medium ">
                      Operating Costs
                    </div>
                  </div>
                  <div className="self-stretch h-14 px-5 py-2 bg-neutral-800 border-b-[0.50px] border-neutral-600 inline-flex justify-start items-center gap-80">
                    <div className="justify-start text-white text-base font-medium ">
                      Service Level
                    </div>
                  </div>
                  <div className="self-stretch h-14 px-5 py-2 bg-neutral-800 border-b-[0.50px] border-neutral-600 inline-flex justify-start items-center gap-80">
                    <div className="justify-start text-white text-base font-medium ">
                      Resource Utilization
                    </div>
                  </div>
                </div>
                <div className="w-36 inline-flex flex-col justify-start items-start">
                  <div className="self-stretch h-12 px-5 py-2 bg-neutral-800 border-b-[0.50px] border-neutral-600 inline-flex justify-start items-center gap-80">
                    <div className="justify-start text-gray-400 text-base font-normal ">
                      Manufacturing
                    </div>
                  </div>
                  <div className="self-stretch h-14 px-5 py-2 bg-neutral-800 border-l-[0.50px] border-b-[0.50px] border-neutral-600 inline-flex justify-start items-center gap-80">
                    <div
                      className={`w-14 h-7 ${getImpactColor(
                        kpiMatrix.operatingCosts.manufacturing
                      )} rounded-[60px] flex justify-center items-center gap-2.5`}
                    >
                      <div className="justify-start text-white text-sm font-bold uppercase">
                        {formatImpactValue(
                          kpiMatrix.operatingCosts.manufacturing
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch h-14 px-5 py-2 bg-neutral-800 border-l-[0.50px] border-b-[0.50px] border-neutral-600 inline-flex justify-start items-center gap-80">
                    <div
                      className={`w-14 h-7 ${getImpactColor(
                        kpiMatrix.efficiencyRate.manufacturing
                      )} rounded-[60px] flex justify-center items-center gap-2.5`}
                    >
                      <div className="justify-start text-white text-sm font-bold uppercase">
                        {formatImpactValue(
                          kpiMatrix.efficiencyRate.manufacturing
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch h-14 px-5 py-2 bg-neutral-800 border-l-[0.50px] border-b-[0.50px] border-neutral-600 inline-flex justify-start items-center gap-80">
                    <div
                      className={`w-14 h-7 ${getImpactColor(
                        kpiMatrix.serviceLevelCosts.manufacturing
                      )} rounded-[60px] flex justify-center items-center gap-2.5`}
                    >
                      <div className="justify-start text-white text-sm font-bold uppercase">
                        {formatImpactValue(
                          kpiMatrix.serviceLevelCosts.manufacturing
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch h-14 px-5 py-2 bg-neutral-800 border-l-[0.50px] border-b-[0.50px] border-neutral-600 inline-flex justify-start items-center gap-80">
                    <div
                      className={`w-14 h-7 ${getImpactColor(
                        kpiMatrix.serviceLevel.manufacturing
                      )} rounded-[60px] flex justify-center items-center gap-2.5`}
                    >
                      <div className="justify-start text-white text-sm font-bold uppercase">
                        {formatImpactValue(
                          kpiMatrix.serviceLevel.manufacturing
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch h-14 px-5 py-2 bg-neutral-800 border-l-[0.50px] border-b-[0.50px] border-neutral-600 inline-flex justify-start items-center gap-80">
                    <div
                      className={`w-14 h-7 ${getImpactColor(
                        kpiMatrix.resourceUtilization.manufacturing
                      )} rounded-[60px] flex justify-center items-center gap-2.5`}
                    >
                      <div className="justify-start text-white text-sm font-bold uppercase">
                        {formatImpactValue(
                          kpiMatrix.resourceUtilization.manufacturing
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-40 inline-flex flex-col justify-start items-start">
                  <div className="self-stretch h-12 px-5 py-2 bg-neutral-800 border-b-[0.50px] border-neutral-600 inline-flex justify-start items-center gap-80">
                    <div className="justify-start text-gray-400 text-base font-normal ">
                      Logistics
                    </div>
                  </div>
                  <div className="self-stretch h-14 px-5 py-2 bg-neutral-800 border-l-[0.50px] border-b-[0.50px] border-neutral-600 inline-flex justify-start items-center gap-80">
                    <div
                      className={`w-14 h-7 ${getImpactColor(
                        kpiMatrix.operatingCosts.logistics
                      )} rounded-[60px] flex justify-center items-center gap-2.5`}
                    >
                      <div className="justify-start text-white text-sm font-bold uppercase">
                        {formatImpactValue(kpiMatrix.operatingCosts.logistics)}
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch h-14 px-5 py-2 bg-neutral-800 border-l-[0.50px] border-b-[0.50px] border-neutral-600 inline-flex justify-start items-center gap-80">
                    <div
                      className={`w-14 h-7 ${getImpactColor(
                        kpiMatrix.efficiencyRate.logistics
                      )} rounded-[60px] flex justify-center items-center gap-2.5`}
                    >
                      <div className="justify-start text-white text-sm font-bold uppercase">
                        {formatImpactValue(kpiMatrix.efficiencyRate.logistics)}
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch h-14 px-5 py-2 bg-neutral-800 border-l-[0.50px] border-b-[0.50px] border-neutral-600 inline-flex justify-start items-center gap-80">
                    <div
                      className={`w-14 h-7 ${getImpactColor(
                        kpiMatrix.serviceLevelCosts.logistics
                      )} rounded-[60px] flex justify-center items-center gap-2.5`}
                    >
                      <div className="justify-start text-white text-sm font-bold uppercase">
                        {formatImpactValue(
                          kpiMatrix.serviceLevelCosts.logistics
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch h-14 px-5 py-2 bg-neutral-800 border-l-[0.50px] border-b-[0.50px] border-neutral-600 inline-flex justify-start items-center gap-80">
                    <div
                      className={`w-14 h-7 ${getImpactColor(
                        kpiMatrix.serviceLevel.logistics
                      )} rounded-[60px] flex justify-center items-center gap-2.5`}
                    >
                      <div className="justify-start text-white text-sm font-bold uppercase">
                        {formatImpactValue(kpiMatrix.serviceLevel.logistics)}
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch h-14 px-5 py-2 bg-neutral-800 border-l-[0.50px] border-b-[0.50px] border-neutral-600 inline-flex justify-start items-center gap-80">
                    <div
                      className={`w-14 h-7 ${getImpactColor(
                        kpiMatrix.resourceUtilization.logistics
                      )} rounded-[60px] flex justify-center items-center gap-2.5`}
                    >
                      <div className="justify-start text-white text-sm font-bold uppercase">
                        {formatImpactValue(
                          kpiMatrix.resourceUtilization.logistics
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-40 inline-flex flex-col justify-start items-start">
                  <div className="self-stretch h-12 px-5 py-2 bg-neutral-800 border-b-[0.50px] border-neutral-600 inline-flex justify-start items-center gap-80">
                    <div className="justify-start text-gray-400 text-base font-normal ">
                      Operations
                    </div>
                  </div>
                  <div className="self-stretch h-14 px-5 py-2 bg-neutral-800 border-l-[0.50px] border-b-[0.50px] border-neutral-600 inline-flex justify-start items-center gap-80">
                    <div
                      className={`w-14 h-7 ${getImpactColor(
                        kpiMatrix.operatingCosts.operations
                      )} rounded-[60px] flex justify-center items-center gap-2.5`}
                    >
                      <div className="justify-start text-white text-sm font-bold uppercase">
                        {formatImpactValue(kpiMatrix.operatingCosts.operations)}
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch h-14 px-5 py-2 bg-neutral-800 border-l-[0.50px] border-b-[0.50px] border-neutral-600 inline-flex justify-start items-center gap-80">
                    <div
                      className={`w-14 h-7 ${getImpactColor(
                        kpiMatrix.efficiencyRate.operations
                      )} rounded-[60px] flex justify-center items-center gap-2.5`}
                    >
                      <div className="justify-start text-white text-sm font-bold uppercase">
                        {formatImpactValue(kpiMatrix.efficiencyRate.operations)}
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch h-14 px-5 py-2 bg-neutral-800 border-l-[0.50px] border-b-[0.50px] border-neutral-600 inline-flex justify-start items-center gap-80">
                    <div
                      className={`w-14 h-7 ${getImpactColor(
                        kpiMatrix.serviceLevelCosts.operations
                      )} rounded-[60px] flex justify-center items-center gap-2.5`}
                    >
                      <div className="justify-start text-white text-sm font-bold uppercase">
                        {formatImpactValue(
                          kpiMatrix.serviceLevelCosts.operations
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch h-14 px-5 py-2 bg-neutral-800 border-l-[0.50px] border-b-[0.50px] border-neutral-600 inline-flex justify-start items-center gap-80">
                    <div
                      className={`w-14 h-7 ${getImpactColor(
                        kpiMatrix.serviceLevel.operations
                      )} rounded-[60px] flex justify-center items-center gap-2.5`}
                    >
                      <div className="justify-start text-white text-sm font-bold uppercase">
                        {formatImpactValue(kpiMatrix.serviceLevel.operations)}
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch h-14 px-5 py-2 bg-neutral-800 border-l-[0.50px] border-b-[0.50px] border-neutral-600 inline-flex justify-start items-center gap-80">
                    <div
                      className={`w-14 h-7 ${getImpactColor(
                        kpiMatrix.resourceUtilization.operations
                      )} rounded-[60px] flex justify-center items-center gap-2.5`}
                    >
                      <div className="justify-start text-white text-sm font-bold uppercase">
                        {formatImpactValue(
                          kpiMatrix.resourceUtilization.operations
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-3">
            <div className="w-full h-[783px] relative bg-zinc-950 rounded-tl-[20px] rounded-tr-[20px] overflow-hidden">
              <div className="left-[20px] top-[20px] absolute justify-start text-gray-400 text-base font-bold  uppercase leading-normal tracking-widest">
                Event Log
              </div>
              <div className="w-56 left-[20px] top-[84px] absolute inline-flex flex-col justify-start items-start gap-4">
                {eventLog && eventLog.length > 0 ? (
                  eventLog.map((event: any, index: number) => (
                    <div
                      key={index}
                      className={`self-stretch pb-4 border-b-[0.50px] border-neutral-500 flex flex-col justify-start items-start gap-2 cursor-pointer transition-all duration-150 ease-out hover:bg-neutral-800/50 rounded-lg p-2 ${
                        selectedEventIndex === index
                          ? "bg-blue-900/30 ring-2 ring-blue-500"
                          : ""
                      } ${
                        event.scenarioData
                          ? "hover:ring-1 hover:ring-blue-400"
                          : "opacity-75"
                      }`}
                      onClick={() => handleEventSelection(index)}
                      title={
                        event.scenarioData
                          ? "Click to select this scenario for loading"
                          : "This event cannot be loaded"
                      }
                    >
                      <div className="self-stretch justify-start text-gray-400 text-sm font-normal leading-tight">
                        {event.time}
                      </div>
                      <div className="self-stretch justify-start text-gray-400 text-sm font-bold">
                        {event.message}
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-14 h-5 ${
                            event.user === "system"
                              ? "bg-blue-900"
                              : "bg-zinc-900"
                          } rounded-[60px] inline-flex justify-center items-center gap-2.5`}
                        >
                          <div className="justify-start text-white text-[10px] font-normal uppercase">
                            {event.user}
                          </div>
                        </div>
                        {/* {event.scenarioData && (
                          <div className="text-xs text-blue-400 font-medium">
                            📊 Loadable
                          </div>
                        )}
                        {selectedEventIndex === index && (
                          <div className="text-xs text-blue-300 font-medium">
                            ✓ Selected
                          </div>
                        )} */}
                      </div>
                    </div>
                  ))
                ) : (
                  // Fallback if no event log data
                  <div className="self-stretch pb-4 border-b-[0.50px] border-neutral-500 flex flex-col justify-start items-start gap-2">
                    <div className="self-stretch justify-start text-gray-400 text-sm font-normal leading-tight">
                      No events logged
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KipImpactView;
