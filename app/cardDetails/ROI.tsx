import React from "react";

const ROI = () => {
  return (
    <div className="w-[1040px] h-96 relative bg-zinc-950 rounded-[30px]  overflow-hidden mx-auto">
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
          <div className="self-stretch text-right justify-start text-white text-2xl font-bold font-helvetica-now">
            87%
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
          <div className="w-7 h-7 relative">
            <div className="w-5 h-5 left-[4.06px] top-[5.63px] absolute outline outline-2 outline-offset-[-1px] outline-yellow-100" />
            <div className="w-0 h-1.5 left-[15px] top-[10px] absolute outline outline-2 outline-offset-[-1px] outline-yellow-100" />
            <div className="w-2 h-0 left-[11.25px] top-[2.50px] absolute outline outline-2 outline-offset-[-1px] outline-yellow-100" />
            <div className="w-7 h-7 left-0 top-0 absolute opacity-0" />
          </div>
          <div className="self-stretch flex flex-col justify-start items-start gap-3">
            <div className="self-stretch justify-start text-gray-400 text-xs font-bold font-helvetica-now uppercase leading-none tracking-wider">
              Payback Period
            </div>
            <div className="self-stretch flex flex-col justify-start items-start gap-2">
              <div className="self-stretch justify-start text-yellow-100 text-2xl font-bold font-helvetica-now leading-7">
                3.2 months
              </div>
              <div className="self-stretch justify-start text-neutral-100 text-sm font-normal font-helvetica-now leading-none">
                Time until cost of implementation is recovered
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch flex-1 p-5 bg-indigo-300/10 rounded-[20px] flex flex-col justify-center items-start gap-5">
          <div className="w-7 h-7 relative">
            <div className="w-6 h-5 left-[3.74px] top-[2.50px] absolute outline outline-2 outline-offset-[-1px] outline-indigo-300" />
            <div className="w-6 h-0 left-[2.50px] top-[2.50px] absolute outline outline-2 outline-offset-[-1px] outline-indigo-300" />
            <div className="w-[5px] h-1.5 left-[10px] top-[21.25px] absolute outline outline-2 outline-offset-[-1px] outline-indigo-300" />
            <div className="w-[5px] h-[2.50px] left-[15px] top-[25px] absolute outline outline-2 outline-offset-[-1px] outline-indigo-300" />
            <div className="w-3 h-1 left-[9.38px] top-[10px] absolute outline outline-2 outline-offset-[-1px] outline-indigo-300" />
            <div className="w-7 h-7 left-0 top-0 absolute opacity-0" />
          </div>
          <div className="self-stretch flex flex-col justify-start items-start gap-3">
            <div className="self-stretch justify-start text-gray-400 text-xs font-bold font-helvetica-now uppercase leading-none tracking-wider">
              Risk-Adjusted ROI
            </div>
            <div className="self-stretch flex flex-col justify-start items-start gap-2">
              <div className="self-stretch justify-start text-indigo-300 text-2xl font-bold font-helvetica-now leading-7">
                +$89k/quarter
              </div>
              <div className="self-stretch justify-start text-neutral-100 text-sm font-normal font-helvetica-now leading-none">
                Includes mitigation costs and uncertainty buffer
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROI;
