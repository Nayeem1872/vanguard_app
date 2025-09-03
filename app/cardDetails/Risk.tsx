import React from "react";

const RiskAnalysis = () => {
  return (
    <div className="p-8 flex flex-col items-center justify-center">
      {/* Top Section: Risk Level & Contributors */}
      <div className="inline-flex justify-start items-center gap-5">
        <div className=" inline-flex flex-col justify-start items-start gap-5 overflow-hidden">
          <div className="self-stretch justify-start text-gray-400 text-base font-bold  uppercase leading-normal tracking-widest">
            Execution Risk Level
          </div>
          <div className="self-stretch flex-1 px-5 py-10 bg-zinc-950 rounded-[20px] border-gray-200 flex flex-col justify-center items-start gap-2.5">
            <div className="inline-flex justify-start items-center gap-12">
              <div className="w-36 h-36 relative">
                <img src="/icons/4 Doughnut.png" />
              </div>
              <div className="w-56 inline-flex flex-col justify-start items-start gap-2">
                <div className="self-stretch inline-flex justify-start items-start gap-10 flex-wrap content-start">
                  <div className="flex justify-start items-center gap-2.5">
                    <div className="w-[3px] self-stretch relative bg-green-400 rounded-sm" />
                    <div className="self-stretch inline-flex flex-col justify-center items-start">
                      <div className="justify-start text-Color-neutral-09/90 text-sm font-normal ">
                        Low
                      </div>
                      <div className="inline-flex justify-start items-center gap-0.5">
                        <div className="justify-start text-green-400 text-2xl font-normal ">
                          25
                        </div>
                        <div className="w-2.5 h-2.5 opacity-50 justify-start text-Color-neutral-09/90 text-xs font-normal  leading-3">
                          %
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-start items-center gap-2.5">
                    <div className="w-[3px] self-stretch relative bg-amber-400 rounded-sm" />
                    <div className="self-stretch inline-flex flex-col justify-center items-start">
                      <div className="justify-start text-Color-neutral-09/90 text-sm font-normal ">
                        Medium
                      </div>
                      <div className="inline-flex justify-start items-center gap-0.5">
                        <div className="justify-start text-amber-400/90 text-2xl font-normal ">
                          57.78%
                        </div>
                        <div className="w-2.5 h-2.5 opacity-50 justify-start text-Color-neutral-09/90 text-xs font-normal  leading-3">
                          %
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-start items-center gap-2.5">
                    <div className="w-[3px] self-stretch relative bg-red-500 rounded-sm" />
                    <div className="self-stretch inline-flex flex-col justify-center items-start">
                      <div className="justify-start text-Color-neutral-09/90 text-sm font-normal ">
                        High
                      </div>
                      <div className="inline-flex justify-start items-center gap-0.5">
                        <div className="justify-start text-red-500/90 text-2xl font-normal ">
                          100%
                        </div>
                        <div className="w-2.5 h-2.5 opacity-50 justify-start text-Color-neutral-09/90 text-xs font-normal  leading-3">
                          %
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch justify-start text-gray-400 text-sm font-normal ">
                  Based on 7 operational factors
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[592px] inline-flex flex-col justify-start items-start gap-5">
          <div className="self-stretch h-6 justify-start text-gray-400 text-base font-bold  uppercase leading-normal tracking-widest">
            Risk Contributors
          </div>
          <div className="self-stretch inline-flex justify-start items-start gap-5">
            <div className="flex-1 self-stretch p-5 bg-stone-900 rounded-2xl outline outline-[0.50px] outline-offset-[-0.50px] outline-neutral-600 inline-flex flex-col justify-start items-start gap-3">
              <div className="self-stretch flex flex-col justify-start items-start gap-3">
                <img src="/icons/swap_driving_apps_wheel.svg" />
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch justify-start text-white text-base font-bold  leading-tight">
                    Moderate change management required
                  </div>
                  <div className="self-stretch justify-start text-gray-400 text-sm font-medium  leading-none">
                    Warehouse staff will need training on new system
                  </div>
                </div>
              </div>
              <div className="h-7 px-5 py-2.5 bg-yellow-900 rounded-[60px] inline-flex justify-center items-center gap-2.5">
                <div className="justify-start text-white text-xs font-bold  uppercase leading-none">
                  Medium
                </div>
              </div>
            </div>
            <div className="flex-1 self-stretch p-5 bg-zinc-900 rounded-2xl outline outline-[0.50px] outline-offset-[-0.50px] outline-neutral-600 inline-flex flex-col justify-between items-start">
              <div className="self-stretch flex flex-col justify-start items-start gap-3">
                <img src="/icons/linked_services.svg" />
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch justify-start text-white text-base font-bold  leading-tight">
                    System integration complexity
                  </div>
                  <div className="self-stretch justify-start text-gray-400 text-sm font-medium  leading-none">
                    Compatible with existing ERP infrastructure
                  </div>
                </div>
              </div>
              <div className="h-7 px-5 py-2.5 bg-teal-800 rounded-[60px] inline-flex justify-center items-center gap-2.5">
                <div className="justify-start text-white text-xs font-bold  uppercase leading-none">
                  Low
                </div>
              </div>
            </div>
            <div className="flex-1 self-stretch p-5 bg-stone-900 rounded-2xl outline outline-[0.50px] outline-offset-[-0.50px] outline-neutral-600 inline-flex flex-col justify-between items-start">
              <div className="self-stretch flex flex-col justify-start items-start gap-3">
                <img src="/icons/thumbs_up_double.svg" />
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch justify-start text-white text-base font-bold  leading-tight">
                    Departmental alignment
                  </div>
                  <div className="self-stretch justify-start text-gray-400 text-sm font-medium  leading-none">
                    Requires coordination between Operations and IT
                  </div>
                </div>
              </div>
              <div className="h-7 px-5 py-2.5 bg-red-900 rounded-[60px] inline-flex justify-center items-center gap-2.5">
                <div className="justify-start text-white text-xs font-bold  uppercase leading-none">
                  High Risk
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-5 overflow-hidden mt-10 w-full max-w-6xl">
        <div className="flex justify-center items-center gap-3 w-full">
          <div className="text-gray-400 text-base font-bold uppercase leading-normal tracking-widest">
            Mitigation Plan Identified
          </div>
          <div className="h-6 px-5 py-2.5 bg-blue-900 rounded-[60px] flex justify-center items-center gap-2.5">
            <div className="text-indigo-200 text-[10px] font-bold uppercase leading-3">
              Mitigation Active
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-5 w-full">
          <div className="w-full flex justify-center items-start gap-5 flex-wrap">
            <div className="w-[520px] p-5 bg-neutral-800 rounded-2xl flex justify-start items-center gap-3">
              <div className="w-12 h-12 relative bg-zinc-700 rounded-[60px] overflow-hidden">
                <div className="w-7 h-7 left-[11px] top-[11px] absolute">
                  <img src="/icons/clock.svg" />
                </div>
              </div>
              <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
                <div className="self-stretch justify-start text-white text-base font-bold  leading-tight">
                  Phased rollout schedule
                </div>
                <div className="self-stretch justify-start text-gray-400 text-sm font-normal ">
                  Implementation divided into 3 phases over 12 weeks to minimize
                  operational disruption
                </div>
              </div>
            </div>
            <div className="w-[520px] p-5 bg-neutral-800 rounded-2xl flex justify-start items-center gap-3">
              <div className="w-12 h-12 relative bg-zinc-700 rounded-[60px] overflow-hidden">
                <div className="w-7 h-7 left-[11px] top-[11px] absolute">
                  <img src="/icons/profile-tick.svg" />
                </div>
              </div>
              <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
                <div className="self-stretch justify-start text-white text-base font-bold  leading-tight">
                  Department-level change ownership
                </div>
                <div className="self-stretch justify-start text-gray-400 text-sm font-normal ">
                  Designated champions in each department to facilitate adoption
                  and feedback
                </div>
              </div>
            </div>
            <div className="w-[520px] p-5 bg-neutral-800 rounded-2xl flex justify-start items-center gap-3">
              <div className="w-12 h-12 relative bg-zinc-700 rounded-[60px] overflow-hidden">
                <div className="w-7 h-7 left-[11px] top-[11px] absolute">
                  <img src="/icons/status-up.svg" />
                </div>
              </div>
              <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
                <div className="self-stretch justify-start text-white text-base font-bold  leading-tight">
                  Monitoring dashboards enabled
                </div>
                <div className="self-stretch justify-start text-gray-400 text-sm font-normal ">
                  Real-time KPI tracking to identify and address performance
                  issues early
                </div>
              </div>
            </div>
            <div className="w-[520px] p-5 bg-neutral-800 rounded-2xl flex justify-start items-center gap-3">
              <div className="w-12 h-12 relative bg-zinc-700 rounded-[60px] overflow-hidden">
                <div className="w-7 h-7 left-[11px] top-[11px] absolute">
                  <img src="/icons/refresh-left-square.svg" />
                </div>
              </div>
              <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
                <div className="self-stretch justify-start text-white text-base font-bold  leading-tight">
                  Rollback mechanism available
                </div>
                <div className="self-stretch justify-start text-gray-400 text-sm font-normal ">
                  Parallel systems maintained for first 30 days to enable quick
                  reversion if needed
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center w-full">
            <div className="w-80 h-12 px-10 py-5 rounded-[60px] shadow-[0px_40px_120px_0px_rgba(1,68,199,0.30)] border border-gray-600 flex justify-center items-center gap-2">
              <div className="text-white text-base font-bold leading-normal">
                Compare with past performance
              </div>
              <div className="w-6 h-6 relative">
                <div className="w-1.5 h-3 left-[14.43px] top-[5.93px] absolute border border-white" />
                <div className="w-4 h-0 left-[3.50px] top-[12px] absolute border-t border-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskAnalysis;
