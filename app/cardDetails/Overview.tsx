"use client";
import React from "react";

const Overview = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Executive Summary */}
      <div className="  col-span-3">
        <h2 className="text-[#A3A3A3] text-lg font-medium mb-4">
          Executive Summary:
        </h2>
        <div className="self-stretch justify-start text-white text-base font-normal  leading-normal">
          Analysis of material flow patterns at Site B reveals a 27%
          inefficiency in the current routing configuration. Reconfiguring
          the material routing pathways can reduce transit time by 32% and
          increase throughput capacity by 18%, directly addressing the
          bottlenecks identified in the receiving and processing areas.
        </div>
      </div>

      {/* Key Drivers */}
      <div className="col-span-3">
        <h2 className="text-[#A3A3A3] text-lg font-medium mb-4">
          Key Drivers
        </h2>

        <div className="w-full p-7 bg-zinc-950 rounded-[20px] ">
          <div className="self-stretch inline-flex justify-start items-start gap-5 flex-wrap content-start">
            {/* Driver 1 */}
            <div className="flex-1 pr-5 border-r-[0.50px] border-neutral-600 inline-flex flex-col justify-center items-start gap-4">
              <div className="w-12 h-12 relative bg-red-900 rounded-[60px] overflow-hidden">
                <img src="/icons/f3.svg" />
              </div>
              <div className="self-stretch flex flex-col justify-start items-start gap-1">
                <div className="self-stretch justify-start text-white text-base font-bold font-helvetica-now leading-tight">
                  Receiving Delay
                </div>
                <div className="self-stretch justify-start text-neutral-400 text-sm font-medium font-helvetica-now leading-none">
                  Current receiving process creates a 4.2hr average delay
                  between dock and storage
                </div>
              </div>
            </div>

            {/* Driver 2 */}
            <div className="flex-1 pr-5 border-r-[0.50px] border-neutral-600 inline-flex flex-col justify-center items-start gap-4">
              <div className="w-12 h-12 relative bg-slate-700 rounded-[60px] overflow-hidden">
                <img src="/icons/f1.svg" />
              </div>
              <div className="self-stretch flex flex-col justify-start items-start gap-1">
                <div className="self-stretch justify-start text-white text-base font-bold font-helvetica-now leading-tight">
                  Low Throughput
                </div>
                <div className="self-stretch justify-start text-neutral-400 text-sm font-medium font-helvetica-now leading-none">
                  Current configuration operates at 68% of designed
                  capacity due to routing inefficiencies
                </div>
              </div>
            </div>

            {/* Driver 3 */}
            <div className="flex-1  inline-flex flex-col justify-center items-start gap-4">
              <div className="w-12 h-12 relative bg-lime-900 rounded-[60px] overflow-hidden">
                <img src="/icons/f2.svg" />
              </div>
              <div className="self-stretch flex flex-col justify-start items-start gap-1">
                <div className="self-stretch justify-start text-white text-base font-bold font-helvetica-now leading-tight">
                  Excessive Transit Distance
                </div>
                <div className="self-stretch justify-start text-neutral-400 text-sm font-medium font-helvetica-now leading-none">
                  Materials travel 42% further than optimal path between
                  processing stations
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Systems Involved */}
      <div className="col-span-3">
        <h2 className="text-[#A3A3A3] text-lg font-medium mb-4">
          Systems Involved:
        </h2>
        <div className="col-span-full p-5 relative bg-neutral-800 rounded-[60px] outline outline-[0.50px] outline-offset-[-0.50px] outline-neutral-600 flex flex-col justify-start items-start gap-5 overflow-hidden">
          <div className="w-20 h-16 left-[1040px] top-[68px] absolute origin-top-left rotate-180  blur-xl" />

          <div className="flex justify-start items-start gap-4 w-full">
            <div className="h-7 px-3 py-2.5 bg-yellow-950 rounded-[60px] flex justify-center items-center gap-1.5">
              <img src="/icons/home_storage.svg" />
              <div className="text-white text-xs font-bold font-helvetica-now uppercase leading-none">
                WMS
              </div>
            </div>
            <div className="h-7 px-3 py-2.5 bg-emerald-900 rounded-[60px] flex justify-center items-center gap-1.5">
              <img src="/icons/add_chart.svg" />
              <div className="text-white text-xs font-bold font-helvetica-now uppercase leading-none">
                ERP
              </div>
            </div>
            <div className="h-7 px-3 py-2.5 bg-blue-950 rounded-[60px] flex justify-center items-center gap-1.5">
              <img src="/icons/airport_shuttle.svg" />
              <div className="text-white text-xs font-bold font-helvetica-now uppercase leading-none">
                TMS
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;