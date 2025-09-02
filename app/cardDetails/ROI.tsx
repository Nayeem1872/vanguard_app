import React from "react";

interface ROIProps {
  recommendationData?: any;
}

const ROI = ({ recommendationData }: ROIProps) => {
  const recommendation = recommendationData?.data?.recommendation;
  return (
    <div className="w-full flex flex-col gap-8">
      {/* Main Chart Container */}
      <div className="w-[1040px] h-96 relative bg-zinc-950 rounded-[30px] overflow-hidden mx-auto">
        <div className="w-[601px] left-[21px] top-[20px] absolute inline-flex justify-between items-center">
          <div className="flex-1 inline-flex flex-col justify-start items-start">
            <div className="self-stretch justify-start text-white text-base font-bold font-helvetica-now">
              Forecasted ROI over 6 months
            </div>
            <div className="justify-start text-gray-400 text-sm font-normal font-helvetica-now">
              Expected financial impact from implementation
            </div>
          </div>
          <div className="w-60 inline-flex flex-col justify-start items-start">
            <div
              className={`self-stretch text-right justify-start text-2xl font-bold font-helvetica-now ${
                recommendation?.confidenceColor || "text-white"
              }`}
            >
              {recommendation?.confidence || "87%"}
            </div>
            <div className="self-stretch text-right justify-start text-gray-400 text-sm font-normal font-helvetica-now">
              AI Confidence
            </div>
          </div>
        </div>
        <div className="w-[598px] h-64 left-[15px] top-[96px] absolute">
          <div className="w-[582px] h-64 left-0 top-[0.43px] absolute inline-flex flex-col justify-end items-start gap-0.5">
            <div className="h-5 inline-flex justify-start items-start">
              <div className="w-5 h-3.5 opacity-0 bg-zinc-300" />
              <div className="w-9 h-5 relative">
                <div className="left-[11px] top-0 absolute text-right justify-start text-gray-400 text-xs font-normal font-helvetica-now">
                  Units
                </div>
              </div>
            </div>
            <div className="self-stretch flex-1 flex flex-col justify-end items-start gap-5">
              <div className="self-stretch flex-1 inline-flex justify-start items-center gap-2.5">
                <div className="w-14 h-5 text-right justify-start text-gray-400 text-xs font-normal font-helvetica-now">
                  300
                </div>
                <div className="flex-1 self-stretch opacity-10 outline outline-1 outline-offset-[-0.50px] outline-white"></div>
              </div>
              <div className="self-stretch flex-1 inline-flex justify-start items-center gap-2.5">
                <div className="w-14 h-5 text-right justify-start text-gray-400 text-xs font-normal font-helvetica-now">
                  200
                </div>
                <div className="flex-1 self-stretch opacity-10 outline outline-1 outline-offset-[-0.50px] outline-white"></div>
              </div>
              <div className="self-stretch flex-1 inline-flex justify-start items-center gap-2.5">
                <div className="w-14 h-5 text-right justify-start text-gray-400 text-xs font-normal font-helvetica-now">
                  100
                </div>
                <div className="flex-1 self-stretch opacity-10 outline outline-1 outline-offset-[-0.50px] outline-white"></div>
              </div>
              <div className="self-stretch flex-1 inline-flex justify-start items-center gap-2.5">
                <div className="w-14 h-5 text-right justify-start text-gray-400 text-xs font-normal font-helvetica-now">
                  0
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[537.82px] h-72 left-[71.42px] top-[87.25px] absolute">
          <div className="w-[536.27px] h-44 left-[4.16px] top-[111px] absolute inline-flex justify-start items-start">
            <div className="flex-1 self-stretch relative">
              <div className="w-14 h-5 left-[4.10px] top-[160.07px] absolute text-center justify-start text-gray-400 text-xs font-normal font-helvetica-now">
                Jan
              </div>
            </div>
            <div className="flex-1 self-stretch relative">
              <div className="w-14 h-5 left-[4.10px] top-[160.07px] absolute text-center justify-start text-gray-400 text-xs font-normal font-helvetica-now">
                Feb
              </div>
            </div>
            <div className="flex-1 self-stretch relative">
              <div className="w-14 h-5 left-[4.10px] top-[160.07px] absolute text-center justify-start text-gray-400 text-xs font-normal font-helvetica-now">
                Mar
              </div>
            </div>
            <div className="flex-1 self-stretch relative">
              <div className="w-14 h-5 left-[4.10px] top-[160.07px] absolute text-center justify-start text-gray-400 text-xs font-normal font-helvetica-now">
                Apr
              </div>
            </div>
            <div className="flex-1 self-stretch relative">
              <div className="w-14 h-5 left-[4.10px] top-[160.07px] absolute text-center justify-start text-gray-400 text-xs font-normal font-helvetica-now">
                May
              </div>
            </div>
          </div>
          <div className="w-[513px] h-0 left-[12.58px] top-[266.37px] absolute opacity-20 outline outline-1 outline-offset-[-0.50px] outline-Color-neutral-06/60"></div>
        </div>
        <div className="w-[477.80px] h-60 left-[109.28px] top-[114.92px] absolute">
          <img src="/images/graph.png" />
        </div>

        <div className="w-[608.14px] h-9 left-[14px] top-[79px] absolute inline-flex justify-end items-center gap-4">
          <div className="w-96 h-6 relative">
            <div className="w-96 left-0 top-0 absolute inline-flex justify-end items-center gap-4">
              <div className="h-6 flex justify-start items-center gap-2">
                <div className="w-2 h-2 relative bg-blue-500" />
                <div className="justify-start text-gray-400 text-xs font-normal font-helvetica-now">
                  Legend 1
                </div>
              </div>
              <div className="h-6 flex justify-start items-center gap-2">
                <div className="w-2 h-2 relative bg-yellow-100" />
                <div className="justify-start text-gray-400 text-xs font-normal font-helvetica-now">
                  Legend 2
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-80 h-96 left-[671px] top-[20px] absolute inline-flex flex-col justify-start items-start gap-5">
          <div className="self-stretch flex-1 p-5 bg-yellow-100/10 rounded-[20px] flex flex-col justify-center items-start gap-5">
            <div className="w-8 h-7 relative">
              <img src="/icons/timer.svg" className="w-8 h-7 object-cover" />
            </div>
            <div className="self-stretch flex flex-col justify-start items-start gap-3">
              <div className="self-stretch justify-start text-gray-400 text-xs font-bold font-helvetica-now uppercase leading-none tracking-wider">
                Payback Period
              </div>
              <div className="self-stretch flex flex-col justify-start items-start gap-2">
                <div className="self-stretch justify-start text-yellow-100 text-2xl font-bold font-helvetica-now leading-7">
                  {recommendation?.paybackPeriod || "3.2 months"}
                </div>
                <div className="self-stretch justify-start text-neutral-100 text-sm font-normal font-helvetica-now leading-none">
                  Time until cost of implementation is recovered
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex-1 p-5 bg-indigo-300/10 rounded-[20px] flex flex-col justify-center items-start gap-5">
            <div className="w-8 h-7 relative">
              <img
                src="/icons/presentation.svg"
                className="w-8 h-7 object-cover"
              />
            </div>
            <div className="self-stretch flex flex-col justify-start items-start gap-3">
              <div className="self-stretch justify-start text-gray-400 text-xs font-bold font-helvetica-now uppercase leading-none tracking-wider">
                Risk-Adjusted ROI
              </div>
              <div className="self-stretch flex flex-col justify-start items-start gap-2">
                <div className="self-stretch justify-start text-indigo-300 text-2xl font-bold font-helvetica-now leading-7">
                  {recommendation?.riskAdjustedROI || "+$89k/quarter"}
                </div>
                <div className="self-stretch justify-start text-neutral-100 text-sm font-normal font-helvetica-now leading-none">
                  Includes mitigation costs and uncertainty buffer
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ROI Breakdown Section */}
      <div className="w-[1040px]  flex flex-col justify-start items-start gap-5 overflow-hidden mx-auto">
        <div className="self-stretch justify-start text-gray-400 text-base font-bold font-helvetica-now uppercase leading-normal tracking-widest">
          ROI Breakdown
        </div>
        <div className="self-stretch inline-flex justify-start items-start gap-5">
          <div className="flex-1 p-4 bg-yellow-900/40 rounded-[20px] flex justify-start items-center gap-4 overflow-hidden">
            <div className="w-12 h-12 relative bg-yellow-900 rounded-[60px] overflow-hidden">
              <img src="/icons/r1.svg" />
            </div>
            <div className="flex-1  inline-flex flex-col justify-start items-start gap-2.5">
              <div className="self-stretch justify-start text-white text-3xl font-medium font-helvetica-now leading-loose">
                {recommendation?.amount
                  ? `${recommendation.amount}${recommendation.period}`
                  : "$162,000"}
              </div>
              <div className="self-stretch justify-start text-white text-base font-normal font-helvetica-now leading-tight">
                Gross Projected ROI
              </div>
            </div>
          </div>
          <div className="flex-1 p-4 bg-red-900/20 rounded-[20px] flex justify-start items-center gap-4 overflow-hidden">
            <div className="w-12 h-12 relative bg-red-900 rounded-[60px] overflow-hidden">
              <img src="/icons/r2.svg" />
            </div>
            <div className="flex-1  inline-flex flex-col justify-start items-start gap-2.5">
              <div className="self-stretch justify-start text-white text-3xl font-medium font-helvetica-now leading-loose">
                −$21,000
              </div>
              <div className="self-stretch justify-start text-white text-base font-normal font-helvetica-now leading-tight">
                Adjustment for Risk
              </div>
            </div>
          </div>
          <div className="flex-1 p-4 bg-teal-950/20 rounded-[20px] flex justify-start items-center gap-4 overflow-hidden">
            <div className="w-12 h-12 relative bg-teal-800 rounded-[60px] overflow-hidden">
              <img src="/icons/r3.svg" />
            </div>
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-2.5">
              <div className="self-stretch justify-start text-white text-3xl font-medium font-helvetica-now leading-loose">
                $141,000
              </div>
              <div className="self-stretch justify-start text-white text-base font-normal font-helvetica-now leading-tight">
                Net ROI
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ROI Components Section */}
      <div className="w-[1040px]   flex flex-col justify-start items-start gap-5 overflow-hidden mx-auto">
        <div className="self-stretch justify-start text-gray-400 text-base font-bold font-helvetica-now uppercase leading-normal tracking-widest">
          ROI Components
        </div>
        <div className="self-stretch rounded-[20px] bg-neutral-800  flex flex-col justify-start items-start overflow-hidden">
          <div className="self-stretch px-5 bg-neutral-800 inline-flex justify-between items-center">
            <div className="w-[1000px] py-5 border-b-[0.50px] border-neutral-600 flex justify-between items-center">
              <div className="w-[555px] flex justify-start items-center gap-4">
                <div className="w-12 h-12 relative bg-emerald-900 rounded-[60px] overflow-hidden">
                  <img src="/icons/e1 (4).svg" />
                </div>
                <div className="justify-start text-white text-xl font-normal font-helvetica-now">
                  Logistics Optimization
                </div>
              </div>
              <div className="text-right justify-start text-teal-300 text-2xl font-normal font-helvetica-now">
                +$68,000
              </div>
            </div>
          </div>
          <div className="self-stretch px-5 bg-neutral-800 inline-flex justify-between items-center">
            <div className="w-[1000px] py-5 border-b-[0.50px] border-neutral-600 flex justify-between items-center">
              <div className="w-[555px] flex justify-start items-center gap-4">
                <div className="w-12 h-12 relative bg-emerald-900 rounded-[60px] overflow-hidden">
                  <img src="/icons/e1 (3).svg" />
                </div>
                <div className="justify-start text-white text-xl font-normal font-helvetica-now">
                  Inventory Management
                </div>
              </div>
              <div className="text-right justify-start text-teal-300 text-2xl font-normal font-helvetica-now">
                +$53,000
              </div>
            </div>
          </div>
          <div className="self-stretch px-5 bg-neutral-800 inline-flex justify-between items-center">
            <div className="w-[1000px] py-5 border-b-[0.50px] border-neutral-600 flex justify-between items-center">
              <div className="w-[555px] flex justify-start items-center gap-4">
                <div className="w-12 h-12 relative bg-emerald-900 rounded-[60px] overflow-hidden">
                  <img src="/icons/e1 (2).svg" />
                </div>
                <div className="justify-start text-white text-xl font-normal font-helvetica-now">
                  Vendor Negotiation
                </div>
              </div>
              <div className="text-right justify-start text-teal-300 text-2xl font-normal font-helvetica-now">
                +$41,000
              </div>
            </div>
          </div>
          <div className="self-stretch px-5 bg-neutral-800 inline-flex justify-between items-center">
            <div className="w-[1000px] py-5 flex justify-between items-center">
              <div className="w-[555px] flex justify-start items-center gap-4">
                <div className="w-12 h-12 relative bg-red-900 rounded-[60px] overflow-hidden">
                  <img src="/icons/e1 (1).svg" />
                </div>
                <div className="justify-start text-white text-xl font-normal font-helvetica-now">
                  Implementation Costs
                </div>
              </div>
              <div className="text-right justify-start text-red-400 text-2xl font-normal font-helvetica-now">
                -$21,000
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROI;
