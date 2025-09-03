import React from "react";

const DependencyImpact = () => {
  return (
    <div className="p-8 ">
      <div className="self-stretch  inline-flex flex-col justify-start items-start gap-2 overflow-hidden">
        <div className="self-stretch justify-start text-gray-400 text-base font-bold  uppercase leading-normal tracking-widest">
          System Dependencies
        </div>
        <div className="self-stretch justify-start text-white text-base font-normal  leading-normal">
          This visualization shows how the recommendation relies on
          interconnected parts of your enterprise systems.
        </div>
      </div>

      <div className="w-[1040px] mt-6 p-7 bg-zinc-950 rounded-[20px]  inline-flex flex-col justify-start items-start gap-5 overflow-hidden">
        <div className="w-[980px] inline-flex justify-between items-center">
          <div className="flex justify-start items-center gap-4">
            <div className="justify-start text-gray-400 text-sm font-bold  leading-tight">
              Filter by:
            </div>
            <div className="flex justify-start items-start gap-2">
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
            </div>
          </div>
          <div className="flex justify-start items-center gap-4">
            <div className="flex justify-start items-center gap-4">
              <div className="text-gray-400 text-sm font-bold leading-tight">
                Simulate Disruption:
              </div>

              <div className="flex-1 relative">
                <select className="w-full h-9 pl-5 pr-10 rounded-[60px] outline outline-1 outline-offset-[-1px] outline-gray-400 text-gray-400 text-xs font-bold leading-none appearance-none bg-transparent">
                  <option>None</option>
                  <option>Low Impact</option>
                  <option>High Impact</option>
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
        <div className="self-stretch inline-flex justify-start items-center gap-5 flex-wrap content-center">
          <div className="w-80 h-36 p-5 bg-neutral-800 rounded-2xl inline-flex flex-col justify-center items-start gap-3">
            <div className="self-stretch flex flex-col justify-start items-start gap-2">
              <div className="self-stretch justify-start text-white text-base font-bold  leading-tight">
                Site B
              </div>
              <div className="self-stretch justify-start text-gray-400 text-sm font-normal ">
                Regional distribution center with 14% excess capacity
              </div>
            </div>
            <div className="inline-flex justify-start items-center gap-2">
              <div className="h-7 px-5 py-2.5 bg-blue-900 rounded-[60px] flex justify-center items-center gap-1.5">
                <div className="justify-start text-indigo-200 text-[10px] font-bold  uppercase leading-3">
                  ERP
                </div>
              </div>
              <div className="h-7 px-5 py-2.5 bg-purple-900 rounded-[60px] flex justify-center items-center gap-1.5">
                <div className="justify-start text-fuchsia-300 text-[10px] font-bold  uppercase leading-3">
                  WMS
                </div>
              </div>
            </div>
          </div>
          <img src="/icons/arrowright.svg" />
          <div className="w-80 h-36 p-5 bg-neutral-800 rounded-2xl inline-flex flex-col justify-center items-start gap-3">
            <div className="self-stretch flex flex-col justify-start items-start gap-2">
              <div className="self-stretch justify-start text-white text-base font-bold  leading-tight">
                Receiving Dock
              </div>
              <div className="self-stretch justify-start text-gray-400 text-sm font-normal ">
                8 bays with 37% bottleneck
                <br />
                occurrence
              </div>
            </div>
            <div className="inline-flex justify-start items-center gap-2">
              <div className="h-7 px-5 py-2.5 bg-blue-900 rounded-[60px] flex justify-center items-center gap-1.5">
                <div className="justify-start text-indigo-200 text-[10px] font-bold  uppercase leading-3">
                  ERP
                </div>
              </div>
            </div>
          </div>
          <img src="/icons/arrowright.svg" />
          <div className="w-52 h-36 p-5 bg-neutral-800 rounded-tl-2xl rounded-bl-2xl inline-flex flex-col justify-center items-start gap-3">
            <div className="self-stretch flex flex-col justify-start items-start gap-2">
              <div className="self-stretch justify-start text-white text-base font-bold  leading-tight">
                Zone 3
              </div>
              <div className="self-stretch justify-start text-gray-400 text-sm font-normal ">
                23% inefficiency due with excess capacity
              </div>
            </div>
            <div className="inline-flex justify-start items-center gap-2">
              <div className="h-7 px-5 py-2.5 bg-teal-800 rounded-[60px] flex justify-center items-center gap-1.5">
                <div className="justify-start text-white text-[10px] font-bold  uppercase leading-3">
                  HRIS
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dependency Impact Analysis */}
      <div className="w-[1040px] mt-6 inline-flex flex-col justify-start items-start gap-5 overflow-hidden">
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
                    Receiving Dock → Zone 3
                  </div>
                </div>
                <div className="self-stretch justify-start text-gray-400 text-[10px] font-medium  leading-none">
                  Highest impact on throughput (37% bottleneck)
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
                    Optimize dock scheduling and handler allocation
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

export default DependencyImpact;
