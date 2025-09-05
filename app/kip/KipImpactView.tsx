"use client";
import React, { useState } from "react";

const KipImpactView = () => {
  // State for slider values
  const [laborEfficiency, setLaborEfficiency] = useState(12); // 12%
  const [materialCosts, setMaterialCosts] = useState(8.5); // 8.5K
  const [vendorCount, setVendorCount] = useState(3); // 3 vendors
  const [overtimeHours, setOvertimeHours] = useState(48); // 48%

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
                      Labor Efficiency
                    </div>
                    <div className="text-right justify-start text-green-500 text-sm font-medium ">
                      +{laborEfficiency}%
                    </div>
                  </div>
                  <div
                    className="self-stretch h-2 relative bg-white/10 rounded-[40px] cursor-pointer transition-all duration-150 ease-out"
                    onClick={(e) =>
                      handleSliderDrag(e, setLaborEfficiency, 25, 256)
                    }
                  >
                    <div
                      className="h-2 absolute left-0 top-0 bg-blue-500 rounded-[60px] shadow-[0px_40px_120px_0px_rgba(1,68,199,0.30)] transition-all duration-150 ease-out"
                      style={{
                        width: `${getSliderPosition(
                          laborEfficiency,
                          25,
                          256
                        )}px`,
                      }}
                    >
                      <div
                        className="w-6 h-6 absolute bg-white rounded-[60px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.10)] border-8 border-blue-700 cursor-grab active:cursor-grabbing transition-all duration-150 ease-out hover:scale-110"
                        style={{
                          left: `${
                            getSliderPosition(laborEfficiency, 25, 256) - 12
                          }px`,
                          top: "-9px",
                        }}
                        onMouseDown={(e) =>
                          handleMouseDown(e, setLaborEfficiency, 25, 256)
                        }
                      />
                    </div>
                  </div>
                  <div className="self-stretch h-5 inline-flex justify-between items-center">
                    <div className="justify-start text-gray-400 text-xs font-medium ">
                      0%
                    </div>
                    <div className="text-right justify-start text-gray-400 text-xs font-medium ">
                      25%
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch h-5 inline-flex justify-between items-center">
                    <div className="justify-start text-white text-sm font-normal ">
                      Material Costs
                    </div>
                    <div className="text-right justify-start text-red-500 text-sm font-medium ">
                      -${materialCosts}K
                    </div>
                  </div>
                  <div
                    className="self-stretch h-2 relative bg-white/10 rounded-[40px] cursor-pointer transition-all duration-150 ease-out"
                    onClick={(e) =>
                      handleSliderDrag(e, setMaterialCosts, 20, 256)
                    }
                  >
                    <div
                      className="h-2 absolute left-0 top-0 bg-blue-500 rounded-[60px] shadow-[0px_40px_120px_0px_rgba(1,68,199,0.30)] transition-all duration-150 ease-out"
                      style={{
                        width: `${getSliderPosition(materialCosts, 20, 256)}px`,
                      }}
                    >
                      <div
                        className="w-6 h-6 absolute bg-white rounded-[60px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.10)] border-8 border-blue-700 cursor-grab active:cursor-grabbing transition-all duration-150 ease-out hover:scale-110"
                        style={{
                          left: `${
                            getSliderPosition(materialCosts, 20, 256) - 12
                          }px`,
                          top: "-9px",
                        }}
                        onMouseDown={(e) =>
                          handleMouseDown(e, setMaterialCosts, 20, 256)
                        }
                      />
                    </div>
                  </div>
                  <div className="self-stretch h-5 inline-flex justify-between items-center">
                    <div className="justify-start text-gray-400 text-xs font-medium ">
                      0%
                    </div>
                    <div className="text-right justify-start text-gray-400 text-xs font-medium ">
                      $20K
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch h-5 inline-flex justify-between items-center">
                    <div className="justify-start text-white text-sm font-normal ">
                      Vendor Count
                    </div>
                    <div className="text-right justify-start text-red-500 text-sm font-medium ">
                      -{vendorCount}
                    </div>
                  </div>
                  <div
                    className="self-stretch h-2 relative bg-white/10 rounded-[40px] cursor-pointer transition-all duration-150 ease-out"
                    onClick={(e) =>
                      handleSliderDrag(e, setVendorCount, 10, 256)
                    }
                  >
                    <div
                      className="h-2 absolute left-0 top-0 bg-blue-500 rounded-[60px] shadow-[0px_40px_120px_0px_rgba(1,68,199,0.30)] transition-all duration-150 ease-out"
                      style={{
                        width: `${getSliderPosition(vendorCount, 10, 256)}px`,
                      }}
                    >
                      <div
                        className="w-6 h-6 absolute bg-white rounded-[60px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.10)] border-8 border-blue-700 cursor-grab active:cursor-grabbing transition-all duration-150 ease-out hover:scale-110"
                        style={{
                          left: `${
                            getSliderPosition(vendorCount, 10, 256) - 12
                          }px`,
                          top: "-9px",
                        }}
                        onMouseDown={(e) =>
                          handleMouseDown(e, setVendorCount, 10, 256)
                        }
                      />
                    </div>
                  </div>
                  <div className="self-stretch h-5 inline-flex justify-between items-center">
                    <div className="justify-start text-gray-400 text-xs font-medium ">
                      0%
                    </div>
                    <div className="text-right justify-start text-gray-400 text-xs font-medium ">
                      10
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch h-5 inline-flex justify-between items-center">
                    <div className="justify-start text-white text-sm font-normal ">
                      Overtime Hours
                    </div>
                    <div className="text-right justify-start text-green-500 text-sm font-medium ">
                      {overtimeHours}%
                    </div>
                  </div>
                  <div
                    className="self-stretch h-2 relative bg-white/10 rounded-[40px] cursor-pointer transition-all duration-150 ease-out"
                    onClick={(e) =>
                      handleSliderDrag(e, setOvertimeHours, 100, 256)
                    }
                  >
                    <div
                      className="h-2 absolute left-0 top-0 bg-blue-500 rounded-[60px] shadow-[0px_40px_120px_0px_rgba(1,68,199,0.30)] transition-all duration-150 ease-out"
                      style={{
                        width: `${getSliderPosition(
                          overtimeHours,
                          100,
                          256
                        )}px`,
                      }}
                    >
                      <div
                        className="w-6 h-6 absolute bg-white rounded-[60px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.10)] border-8 border-blue-700 cursor-grab active:cursor-grabbing transition-all duration-150 ease-out hover:scale-110"
                        style={{
                          left: `${
                            getSliderPosition(overtimeHours, 100, 256) - 12
                          }px`,
                          top: "-9px",
                        }}
                        onMouseDown={(e) =>
                          handleMouseDown(e, setOvertimeHours, 100, 256)
                        }
                      />
                    </div>
                  </div>
                  <div className="self-stretch h-5 inline-flex justify-between items-center">
                    <div className="justify-start text-gray-400 text-xs font-medium ">
                      0%
                    </div>
                    <div className="text-right justify-start text-gray-400 text-xs font-medium ">
                      100%
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-64 left-[20px] top-[400px] absolute inline-flex flex-col justify-start items-start gap-4">
                <div className="self-stretch h-12 py-5 rounded-[60px] cursor-pointer shadow-[0px_40px_120px_0px_rgba(1,68,199,0.30)] outline outline-2 outline-white/0 inline-flex justify-center items-center gap-2">
                  <img src="/images/save.png" />
                </div>
                <div className="self-stretch h-12 px-10 py-5 bg-zinc-950 rounded-[60px] shadow-[0px_40px_120px_0px_rgba(1,68,199,0.30)] outline outline-1 outline-white inline-flex justify-center items-center gap-2">
                  <div className="justify-start text-white cursor-pointer text-base font-bold  leading-normal">
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
                <div className="flex-1 self-stretch relative">
                  <div className="w-7 h-28 left-[6.73px] top-[110.07px] absolute inline-flex justify-center items-end">
                    <div className="flex-1 self-stretch bg-gradient-to-b from-blue-500 to-blue-500/0" />
                  </div>
                  <div className="w-7 h-20 left-[38.14px] top-[147.41px] absolute inline-flex justify-center items-end">
                    <div className="flex-1 self-stretch bg-gradient-to-b from-yellow-100 to-yellow-100/0" />
                  </div>
                </div>
                <div className="flex-1 self-stretch relative">
                  <div className="w-7 h-48 left-[6.73px] top-[39.31px] absolute inline-flex justify-center items-end">
                    <div className="flex-1 self-stretch bg-gradient-to-b from-blue-500 to-blue-500/0" />
                  </div>
                  <div className="w-7 h-32 left-[38.14px] top-[98.28px] absolute inline-flex justify-center items-end">
                    <div className="flex-1 self-stretch bg-gradient-to-b from-yellow-100 to-yellow-100/0" />
                  </div>
                </div>
                <div className="flex-1 self-stretch relative">
                  <div className="w-7 h-20 left-[6.73px] top-[155.28px] absolute inline-flex justify-center items-end">
                    <div className="flex-1 self-stretch bg-gradient-to-b from-blue-500 to-blue-500/0" />
                  </div>
                  <div className="w-7 h-14 left-[38.14px] top-[172.97px] absolute inline-flex justify-center items-end">
                    <div className="flex-1 self-stretch bg-gradient-to-b from-yellow-100 to-yellow-100/0" />
                  </div>
                </div>
                <div className="flex-1 self-stretch relative">
                  <div className="w-7 h-40 left-[6.73px] top-[70.76px] absolute inline-flex justify-center items-end">
                    <div className="flex-1 self-stretch bg-gradient-to-b from-blue-500 to-blue-500/0" />
                  </div>
                  <div className="w-7 h-28 left-[38.14px] top-[114px] absolute inline-flex justify-center items-end">
                    <div className="flex-1 self-stretch bg-gradient-to-b from-yellow-100 to-yellow-100/0" />
                  </div>
                </div>
                <div className="flex-1 self-stretch relative">
                  <div className="w-7 h-28 left-[6.73px] top-[108.10px] absolute inline-flex justify-center items-end">
                    <div className="flex-1 self-stretch bg-gradient-to-b from-blue-500 to-blue-500/0" />
                  </div>
                  <div
                    data-cleavage="False"
                    data-orientation="Vertical"
                    className="w-7 h-16 left-[38.14px] top-[165.10px] absolute inline-flex justify-center items-end"
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
                    <div className="w-14 h-7 bg-emerald-900 rounded-[60px] flex justify-center items-center gap-2.5">
                      <div className="justify-start text-white text-sm font-bold  uppercase">
                        -8.2%
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch h-14 px-5 py-2 bg-neutral-800 border-l-[0.50px] border-b-[0.50px] border-neutral-600 inline-flex justify-start items-center gap-80">
                    <div className="w-14 h-7 bg-emerald-900 rounded-[60px] flex justify-center items-center gap-2.5">
                      <div className="justify-start text-white text-sm font-bold  uppercase">
                        +2.3%
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch h-14 px-5 py-2 bg-neutral-800 border-l-[0.50px] border-b-[0.50px] border-neutral-600 inline-flex justify-start items-center gap-80">
                    <div className="w-14 h-7 bg-red-900 rounded-[60px] flex justify-center items-center gap-2.5">
                      <div className="justify-start text-white text-sm font-bold  uppercase">
                        -5.1%
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch h-14 px-5 py-2 bg-neutral-800 border-l-[0.50px] border-b-[0.50px] border-neutral-600 inline-flex justify-start items-center gap-80">
                    <div className="w-14 h-7 bg-neutral-600 rounded-[60px] flex justify-center items-center gap-2.5">
                      <div className="justify-start text-white text-sm font-bold  uppercase">
                        +0.5%
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch h-14 px-5 py-2 bg-neutral-800 border-l-[0.50px] border-b-[0.50px] border-neutral-600 inline-flex justify-start items-center gap-80">
                    <div className="w-14 h-7 bg-red-900 rounded-[60px] flex justify-center items-center gap-2.5">
                      <div className="justify-start text-white text-sm font-bold  uppercase">
                        -5.1%
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
                    <div className="w-14 h-7 bg-red-900 rounded-[60px] flex justify-center items-center gap-2.5">
                      <div className="justify-start text-white text-sm font-bold  uppercase">
                        -5.1%
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch h-14 px-5 py-2 bg-neutral-800 border-l-[0.50px] border-b-[0.50px] border-neutral-600 inline-flex justify-start items-center gap-80">
                    <div className="w-14 h-7 bg-emerald-900 rounded-[60px] flex justify-center items-center gap-2.5">
                      <div className="justify-start text-white text-sm font-bold  uppercase">
                        -8.2%
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch h-14 px-5 py-2 bg-neutral-800 border-l-[0.50px] border-b-[0.50px] border-neutral-600 inline-flex justify-start items-center gap-80">
                    <div className="w-14 h-7 bg-red-900 rounded-[60px] flex justify-center items-center gap-2.5">
                      <div className="justify-start text-white text-sm font-bold  uppercase">
                        -5.1%
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch h-14 px-5 py-2 bg-neutral-800 border-l-[0.50px] border-b-[0.50px] border-neutral-600 inline-flex justify-start items-center gap-80">
                    <div className="w-14 h-7 bg-emerald-900 rounded-[60px] flex justify-center items-center gap-2.5">
                      <div className="justify-start text-white text-sm font-bold  uppercase">
                        -8.2%
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch h-14 px-5 py-2 bg-neutral-800 border-l-[0.50px] border-b-[0.50px] border-neutral-600 inline-flex justify-start items-center gap-80">
                    <div className="w-14 h-7 bg-red-900 rounded-[60px] flex justify-center items-center gap-2.5">
                      <div className="justify-start text-white text-sm font-bold  uppercase">
                        -5.1%
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
                    <div className="w-14 h-7 bg-emerald-900 rounded-[60px] flex justify-center items-center gap-2.5">
                      <div className="justify-start text-white text-sm font-bold  uppercase">
                        +2.3%
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch h-14 px-5 py-2 bg-neutral-800 border-l-[0.50px] border-b-[0.50px] border-neutral-600 inline-flex justify-start items-center gap-80">
                    <div className="w-14 h-7 bg-red-900 rounded-[60px] flex justify-center items-center gap-2.5">
                      <div className="justify-start text-white text-sm font-bold  uppercase">
                        -5.1%
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch h-14 px-5 py-2 bg-neutral-800 border-l-[0.50px] border-b-[0.50px] border-neutral-600 inline-flex justify-start items-center gap-80">
                    <div className="w-14 h-7 bg-emerald-900 rounded-[60px] flex justify-center items-center gap-2.5">
                      <div className="justify-start text-white text-sm font-bold  uppercase">
                        +2.3%
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch h-14 px-5 py-2 bg-neutral-800 border-l-[0.50px] border-b-[0.50px] border-neutral-600 inline-flex justify-start items-center gap-80">
                    <div className="w-14 h-7 bg-red-900 rounded-[60px] flex justify-center items-center gap-2.5">
                      <div className="justify-start text-white text-sm font-bold  uppercase">
                        -5.1%
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch h-14 px-5 py-2 bg-neutral-800 border-l-[0.50px] border-b-[0.50px] border-neutral-600 inline-flex justify-start items-center gap-80">
                    <div className="w-14 h-7 bg-emerald-900 rounded-[60px] flex justify-center items-center gap-2.5">
                      <div className="justify-start text-white text-sm font-bold  uppercase">
                        +2.3%
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
                <div className="self-stretch pb-4 border-b-[0.50px] border-neutral-500 flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch justify-start text-gray-400 text-sm font-normal  leading-tight">
                    14:32:18
                  </div>
                  <div className="self-stretch justify-start text-gray-400 text-sm font-bold ">
                    Switched to KPI Impact View
                  </div>
                  <div className="w-14 h-5 bg-blue-900 rounded-[60px] inline-flex justify-center items-center gap-2.5">
                    <div className="justify-start text-white text-[10px] font-normal  uppercase">
                      System
                    </div>
                  </div>
                </div>
                <div className="self-stretch pb-4 border-b-[0.50px] border-neutral-500 flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch justify-start text-neutral-500 text-sm font-normal  leading-tight">
                    14:31:45
                  </div>
                  <div className="self-stretch justify-start text-neutral-500 text-sm font-bold ">
                    Scenario Initialized: Base Case
                  </div>
                  <div className="w-14 h-5 bg-zinc-900 rounded-[60px] inline-flex justify-center items-center gap-2.5">
                    <div className="justify-start text-white text-[10px] font-normal  uppercase">
                      User
                    </div>
                  </div>
                </div>
                <div className="self-stretch pb-4 border-b-[0.50px] border-neutral-500 flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch justify-start text-neutral-500 text-sm font-normal  leading-tight">
                    14:31:22
                  </div>
                  <div className="self-stretch justify-start text-neutral-500 text-sm font-bold ">
                    Labor Efficiency adjusted to 12%
                  </div>
                  <div className="w-14 h-5 bg-blue-900 rounded-[60px] inline-flex justify-center items-center gap-2.5">
                    <div className="justify-start text-white text-[10px] font-normal  uppercase">
                      System
                    </div>
                  </div>
                </div>
                <div className="self-stretch pb-4 border-b-[0.50px] border-neutral-500 flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch justify-start text-neutral-500 text-sm font-normal  leading-tight">
                    14:30:58
                  </div>
                  <div className="self-stretch justify-start text-neutral-500 text-sm font-bold ">
                    Material Costs reduced by $8.5K
                  </div>
                  <div className="w-14 h-5 bg-zinc-900 rounded-[60px] inline-flex justify-center items-center gap-2.5">
                    <div className="justify-start text-white text-[10px] font-normal  uppercase">
                      User
                    </div>
                  </div>
                </div>
                <div className="self-stretch pb-4 border-b-[0.50px] border-neutral-500 flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch justify-start text-neutral-500 text-sm font-normal  leading-tight">
                    14:29:47
                  </div>
                  <div className="self-stretch justify-start text-neutral-500 text-sm font-bold ">
                    Vendor consolidation: -3 vendors
                  </div>
                  <div className="w-14 h-5 bg-zinc-900 rounded-[60px] inline-flex justify-center items-center gap-2.5">
                    <div className="justify-start text-white text-[10px] font-normal  uppercase">
                      User
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KipImpactView;
