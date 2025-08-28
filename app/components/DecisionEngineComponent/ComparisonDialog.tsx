"use client";
import { useState } from "react";

interface Recommendation {
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

  const generateROIData = (index: number) => {
    const baseValues = [
      { month: "Q1", value: 65 + index * 5 },
      { month: "Q2", value: 78 + index * 3 },
      { month: "Q3", value: 85 + index * 4 },
      { month: "Q4", value: 92 + index * 2 },
    ];
    return baseValues;
  };

  const getRiskItems = (risk: string) => {
    const riskProfiles = {
      "LOW RISK": [
        {
          label: "System Integration Complexity",
          level: "LOW",
          color: "bg-green-500",
        },
        {
          label: "Change Mgmt Required",
          level: "MEDIUM",
          color: "bg-yellow-500",
        },
        { label: "Department Alignment", level: "LOW", color: "bg-green-500" },
      ],
      "MEDIUM RISK": [
        {
          label: "System Integration Complexity",
          level: "MEDIUM",
          color: "bg-yellow-500",
        },
        {
          label: "Change Mgmt Required",
          level: "MEDIUM",
          color: "bg-yellow-500",
        },
        { label: "Department Alignment", level: "HIGH", color: "bg-red-500" },
      ],
      "HIGH RISK": [
        {
          label: "System Integration Complexity",
          level: "HIGH",
          color: "bg-red-500",
        },
        { label: "Change Mgmt Required", level: "HIGH", color: "bg-red-500" },
        { label: "Department Alignment", level: "HIGH", color: "bg-red-500" },
      ],
    };
    return riskProfiles[risk as keyof typeof riskProfiles] || [];
  };

  const getSystemsInvolved = (sources: string) => {
    const systemMap: { [key: string]: string } = {
      ERP: "ERP",
      HRIS: "HRIS",
      CRM: "CRM",
      WMS: "WMS",
      IoT: "IoT",
    };

    return sources
      .split(",")
      .map((s) => s.trim())
      .map((source) => systemMap[source] || source);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[1174px] h-[1810px] relative bg-zinc-950 rounded-[20px] overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="w-[1232px] py-5 left-[21px] top-0 absolute border-b-[0.50px] border-neutral-600 inline-flex justify-center items-center gap-2.5">
          <div className="text-center justify-start text-gray-400 text-xl font-bold font-helvetica-now uppercase leading-loose tracking-widest">
            Compare
          </div>
        </div>
        <div className="w-[405px] h-[1590px] left-[597px] top-[110px] absolute bg-stone-900 rounded-[20px] overflow-hidden">
          <div className="w-96 h-24 pb-4 left-[20px] top-[30px] absolute border-b border-neutral-600 inline-flex flex-col justify-start items-start gap-2.5">
            <div className="self-stretch inline-flex justify-between items-center">
              <div className="justify-start">
                <span className="text-white text-4xl font-medium font-helvetica-now leading-10">
                  +$156,780
                </span>
                <span className="text-white text-xl font-normal font-helvetica-now leading-normal">
                  /qtr
                </span>
              </div>
              <div className="h-7 px-5 py-2.5 bg-red-900 rounded-[60px] flex justify-center items-center gap-2.5">
                <div className="justify-start text-white text-xs font-bold font-helvetica-now uppercase leading-none">
                  High Risk
                </div>
              </div>
            </div>
            <div className="self-stretch justify-start text-white text-xl font-normal font-helvetica-now leading-normal">
              Consolidate vendor contracts
            </div>
          </div>
          <div className="w-96 pb-5 left-[20px] top-[148px] absolute border-b border-neutral-600 inline-flex flex-col justify-start items-start gap-4">
            <div className="self-stretch justify-start text-white text-base font-normal font-helvetica-now leading-tight">
              Smart energy management can reduce utility costs at Sites A and C.
            </div>
            <div className="self-stretch justify-start">
              <span className="text-gray-400 text-sm font-normal font-helvetica-now leading-none">
                Confidence:
              </span>
              <span className="text-white text-sm font-normal font-helvetica-now leading-none">
                 
              </span>
              <span className="text-rose-500 text-sm font-bold font-helvetica-now leading-none">
                55%
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
                HRIS,CRM
              </span>
            </div>
          </div>
          <div className="w-96 pb-5 left-[20px] top-[259px] absolute border-b-[0.50px] border-neutral-600 inline-flex flex-col justify-start items-start gap-5">
            <div className="self-stretch flex flex-col justify-start items-start gap-3">
              <div className="self-stretch text-left justify-start text-gray-400 text-base font-bold font-helvetica-now uppercase leading-normal tracking-widest">
                ROI FORECAST
              </div>
              <div className="self-stretch h-56 relative bg-zinc-950 rounded-[10px]">
                <div className="w-96 h-52 left-[9.63px] top-[8.76px] absolute opacity-0 bg-zinc-300" />
                <div className="left-[9.63px] top-[8.76px] absolute justify-start text-Color-neutral-09/90 text-xs font-normal font-helvetica-now">
                  Basic Bar X
                </div>
                <div className="w-80 h-36 left-[9.63px] top-[49.03px] absolute">
                  <div className="w-80 h-36 left-[3.50px] top-0 absolute inline-flex flex-col justify-center items-start gap-px">
                    <div className="self-stretch flex-1 relative">
                      <div className="w-16 h-5 left-[-9.13px] top-[10.27px] absolute text-right justify-start text-Color-neutral-09/90 text-xs font-normal font-helvetica-now">
                        Jan
                      </div>
                    </div>
                    <div className="self-stretch flex-1 relative">
                      <div className="w-16 h-5 left-[-9.13px] top-[10.27px] absolute text-right justify-start text-Color-neutral-09/90 text-xs font-normal font-helvetica-now">
                        Feb
                      </div>
                    </div>
                    <div className="self-stretch flex-1 relative">
                      <div className="w-16 h-5 left-[-9.13px] top-[10.27px] absolute text-right justify-start text-Color-neutral-09/90 text-xs font-normal font-helvetica-now">
                        Mar
                      </div>
                    </div>
                    <div className="self-stretch flex-1 relative">
                      <div className="w-16 h-5 left-[-9.13px] top-[10.27px] absolute text-right justify-start text-Color-neutral-09/90 text-xs font-normal font-helvetica-now">
                        Apr
                      </div>
                    </div>
                  </div>
                  <div className="w-32 h-0 left-[64.79px] top-[137.62px] absolute origin-top-left -rotate-90 opacity-20 outline outline-1 outline-offset-[-0.44px] outline-Color-neutral-06/60"></div>
                </div>
                <div className="w-80 h-40 left-[59.54px] top-[49.03px] absolute">
                  <div className="w-72 h-40 left-[0.88px] top-[0.88px] absolute inline-flex justify-center items-end gap-4">
                    <div className="flex-1 self-stretch inline-flex flex-col justify-end items-center gap-1.5">
                      <div className="w-9 h-3.5 text-center justify-start text-Color-neutral-09/90 text-xs font-normal font-sans">
                        0
                      </div>
                    </div>
                    <div className="flex-1 self-stretch inline-flex flex-col justify-end items-center gap-1.5">
                      <div className="self-stretch flex-1 origin-top-left -rotate-90 opacity-20 outline outline-1 outline-offset-[-0.44px] outline-Color-neutral-06/60"></div>
                      <div className="w-9 h-3.5 text-center justify-start text-Color-neutral-09/90 text-xs font-normal font-helvetica-now">
                        100
                      </div>
                    </div>
                    <div className="flex-1 self-stretch inline-flex flex-col justify-end items-center gap-1.5">
                      <div className="self-stretch flex-1 origin-top-left -rotate-90 opacity-20 outline outline-1 outline-offset-[-0.44px] outline-Color-neutral-06/60"></div>
                      <div className="w-9 h-3.5 text-center justify-start text-Color-neutral-09/90 text-xs font-normal font-helvetica-now">
                        200
                      </div>
                    </div>
                    <div className="flex-1 self-stretch inline-flex flex-col justify-end items-center gap-1.5">
                      <div className="self-stretch flex-1 origin-top-left -rotate-90 opacity-20 outline outline-1 outline-offset-[-0.44px] outline-Color-neutral-06/60"></div>
                      <div className="w-9 h-3.5 text-center justify-start text-Color-neutral-09/90 text-xs font-normal font-helvetica-now">
                        300
                      </div>
                    </div>
                    <div className="flex-1 self-stretch inline-flex flex-col justify-end items-center gap-1.5">
                      <div className="self-stretch flex-1 origin-top-left -rotate-90 opacity-20 outline outline-1 outline-offset-[-0.44px] outline-Color-neutral-06/60"></div>
                      <div className="w-9 h-3.5 text-center justify-start text-Color-neutral-09/90 text-xs font-normal font-helvetica-now">
                        400
                      </div>
                    </div>
                    <div className="flex-1 self-stretch inline-flex flex-col justify-end items-center gap-1.5">
                      <div className="self-stretch flex-1 origin-top-left -rotate-90 opacity-20 outline outline-1 outline-offset-[-0.44px] outline-Color-neutral-06/60"></div>
                      <div className="w-9 h-3.5 text-center justify-start text-Color-neutral-09/90 text-xs font-normal font-helvetica-now">
                        500
                      </div>
                    </div>
                    <div className="flex-1 self-stretch inline-flex flex-col justify-end items-center gap-1.5">
                      <div className="self-stretch flex-1 origin-top-left -rotate-90 opacity-20 outline outline-1 outline-offset-[-0.44px] outline-Color-neutral-06/60"></div>
                      <div className="w-9 h-3.5 text-center justify-start text-Color-neutral-09/90 text-xs font-normal font-helvetica-now">
                        600
                      </div>
                    </div>
                    <div className="flex-1 self-stretch inline-flex flex-col justify-end items-center gap-1.5">
                      <div className="self-stretch flex-1 origin-top-left -rotate-90 opacity-20 outline outline-1 outline-offset-[-0.44px] outline-Color-neutral-06/60"></div>
                      <div className="w-9 h-3.5 text-center justify-start text-Color-neutral-09/90 text-xs font-normal font-helvetica-now">
                        700
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-64 h-36 left-[74.42px] top-[49.91px] absolute inline-flex flex-col justify-center items-start">
                  <div className="self-stretch flex-1 relative">
                    <div
                      data-cleavage="False"
                      data-orientation="Vertical"
                      className="w-52 h-2.5 left-0 top-[13.40px] absolute inline-flex justify-center items-end"
                    >
                      <div className="flex-1 self-stretch bg-gradient-to-l from-red-900 to-red-900/0" />
                    </div>
                  </div>
                  <div className="self-stretch flex-1 relative">
                    <div
                      data-cleavage="False"
                      data-orientation="Vertical"
                      className="w-44 h-2.5 left-0 top-[13.40px] absolute inline-flex justify-center items-end"
                    >
                      <div className="flex-1 self-stretch bg-gradient-to-l from-red-900 to-red-900/0" />
                    </div>
                  </div>
                  <div className="self-stretch flex-1 relative">
                    <div
                      data-cleavage="False"
                      data-orientation="Vertical"
                      className="w-40 h-2.5 left-0 top-[13.40px] absolute inline-flex justify-center items-end"
                    >
                      <div className="flex-1 self-stretch bg-gradient-to-l from-red-900 to-red-900/0" />
                    </div>
                  </div>
                  <div className="self-stretch flex-1 relative">
                    <div
                      data-cleavage="False"
                      data-orientation="Vertical"
                      className="w-28 h-2.5 left-0 top-[13.40px] absolute inline-flex justify-center items-end"
                    >
                      <div className="flex-1 self-stretch bg-gradient-to-l from-red-900 to-red-900/0" />
                    </div>
                  </div>
                </div>
                <div
                  data-series="not"
                  data-shape="Square"
                  data-方向="水平"
                  className="w-96 h-5 left-[8.76px] top-[26.27px] absolute"
                >
                  <div className="w-96 px-5 left-0 top-0 absolute inline-flex justify-end items-center gap-3.5" />
                </div>
              </div>
            </div>
            <div className="self-stretch inline-flex justify-start items-start gap-5">
              <div className="flex-1 p-5 bg-yellow-100/10 rounded-[10px] inline-flex flex-col justify-center items-start gap-2">
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <img src="/icons/timer.svg" />
                  <div className="self-stretch text-left text-gray-400 text-[10px] font-bold font-helvetica-now uppercase leading-none tracking-wide">
                    Payback Period
                  </div>
                  <div className="self-stretch text-left text-yellow-100 text-xl font-bold font-helvetica-now leading-normal">
                    3.2 months
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
                    +$89k/quarter
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-96 pb-5 left-[20px] top-[693px] absolute border-b-[0.50px] border-neutral-600 inline-flex flex-col justify-start items-start gap-5">
            <div className="self-stretch flex flex-col justify-start items-start gap-3">
              <div className="self-stretch text-left justify-start text-gray-400 text-base font-bold font-helvetica-now uppercase leading-normal tracking-widest">
                RISK PROFILE
              </div>
            </div>
            <div className="self-stretch flex flex-col justify-start items-start gap-3">
              <div className="w-96 flex flex-col justify-start items-start gap-2">
                <div className="self-stretch text-left justify-start text-white text-base font-medium font-helvetica-now leading-tight">
                  Medium Risk
                </div>
                <div className="self-stretch text-left justify-start text-gray-400 text-sm font-normal font-helvetica-now leading-none">
                  Based on 3 risk factors
                </div>
              </div>
              <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
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
              </div>
            </div>
          </div>
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
                className="self-stretch h-56 w-96 relative border-gray-200"
                src="/images/p1.png"
              />
            </div>
          </div>
          <div className="w-96 pb-5 left-[20px] top-[1354px] absolute border-b-[0.50px] border-neutral-600 inline-flex flex-col justify-start items-start gap-3">
            <div className="self-stretch flex flex-col justify-start items-start gap-3">
              <div className="self-stretch text-left justify-start text-gray-400 text-base font-bold font-helvetica-now uppercase leading-normal tracking-widest">
                SYSTEMS INVOLVED
              </div>
            </div>
            <div className="inline-flex justify-start items-start gap-2">
              <div className="h-7 px-5 py-2.5 bg-neutral-800 rounded-[60px] flex justify-center items-center gap-1.5">
                <div className="justify-start text-white text-xs font-bold font-helvetica-now uppercase leading-none">
                  WMS
                </div>
              </div>
              <div className="h-7 px-5 py-2.5 bg-neutral-800 rounded-[60px] flex justify-center items-center gap-1.5">
                <div className="justify-start text-white text-xs font-bold font-helvetica-now uppercase leading-none">
                  IOT
                </div>
              </div>
            </div>
          </div>
          <div className="w-96 left-[20px] top-[1458px] absolute inline-flex flex-col justify-start items-start gap-4">
            <div className="self-stretch h-12 px-10 py-5 bg-neutral-900 rounded-[60px] shadow-[0px_40px_120px_0px_rgba(1,68,199,0.30)] outline outline-1 outline-white inline-flex justify-center items-center gap-2">
              <div className="justify-start text-white text-base font-bold font-helvetica-now leading-normal">
                Drill deeper into this recommendation
              </div>
            </div>
            <img src="/images/selectButton.png" />
          </div>
        </div>
        <div className="w-[405px] h-[1590px] left-[150px] top-[110px] absolute bg-neutral-900 rounded-[20px] overflow-hidden">
          <div className="w-96 h-24 pb-4 left-[20px] top-[30px] absolute border-b border-neutral-600 inline-flex flex-col justify-start items-start gap-2.5">
            <div className="self-stretch inline-flex justify-between items-center">
              <div className="justify-start">
                <span className="text-white text-4xl font-medium font-helvetica-now leading-10">
                  +$89,230
                </span>
                <span className="text-white text-xl font-normal font-helvetica-now leading-normal">
                  /qtr
                </span>
              </div>
              <div className="h-7 px-5 py-2.5 bg-yellow-900 rounded-[60px] flex justify-center items-center gap-2.5">
                <div className="justify-start text-white text-xs font-bold font-helvetica-now uppercase leading-none">
                  Medium Risk
                </div>
              </div>
            </div>
            <div className="self-stretch justify-start text-white text-xl font-normal font-helvetica-now leading-normal">
              Optimize shift scheduling patterns
            </div>
          </div>
          <div className="w-96 pb-5 left-[20px] top-[148px] absolute border-b border-neutral-600 inline-flex flex-col justify-start items-start gap-4">
            <div className="self-stretch justify-start text-white text-base font-normal font-helvetica-now leading-tight">
              Smart energy management can reduce utility costs at Sites A and C.
            </div>
            <div className="self-stretch justify-start">
              <span className="text-gray-400 text-sm font-normal font-helvetica-now leading-none">
                Confidence:
              </span>
              <span className="text-white text-sm font-normal font-helvetica-now leading-none">
                 
              </span>
              <span className="text-rose-500 text-sm font-bold font-helvetica-now leading-none">
                55%
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
                HRIS,CRM
              </span>
            </div>
          </div>
          <div className="w-96 pb-5 left-[20px] top-[259px] absolute border-b-[0.50px] border-neutral-600 inline-flex flex-col justify-start items-start gap-5">
            <div className="self-stretch flex flex-col justify-start items-start gap-3">
              <div className="self-stretch justify-start text-left text-gray-400 text-base font-bold font-helvetica-now uppercase leading-normal tracking-widest">
                ROI FORECAST
              </div>
              <div className="self-stretch h-56 relative bg-zinc-950 rounded-[10px]">
                <div className="w-96 h-52 left-[9.63px] top-[8.76px] absolute opacity-0 bg-zinc-300" />
                <div className="left-[9.63px] top-[8.76px] absolute justify-start text-Color-neutral-09/90 text-xs font-normal font-helvetica-now">
                  Basic Bar X
                </div>
                <div className="w-80 h-36 left-[9.63px] top-[49.03px] absolute">
                  <div className="w-80 h-36 left-[3.50px] top-0 absolute inline-flex flex-col justify-center items-start gap-px">
                    <div className="self-stretch flex-1 relative">
                      <div className="w-16 h-5 left-[-9.13px] top-[10.27px] absolute text-right justify-start text-Color-neutral-09/90 text-xs font-normal font-helvetica-now">
                        Jan
                      </div>
                    </div>
                    <div className="self-stretch flex-1 relative">
                      <div className="w-16 h-5 left-[-9.13px] top-[10.27px] absolute text-right justify-start text-Color-neutral-09/90 text-xs font-normal font-helvetica-now">
                        Feb
                      </div>
                    </div>
                    <div className="self-stretch flex-1 relative">
                      <div className="w-16 h-5 left-[-9.13px] top-[10.27px] absolute text-right justify-start text-Color-neutral-09/90 text-xs font-normal font-helvetica-now">
                        Mar
                      </div>
                    </div>
                    <div className="self-stretch flex-1 relative">
                      <div className="w-16 h-5 left-[-9.13px] top-[10.27px] absolute text-right justify-start text-Color-neutral-09/90 text-xs font-normal font-helvetica-now">
                        Apr
                      </div>
                    </div>
                  </div>
                  <div className="w-32 h-0 left-[64.79px] top-[137.62px] absolute origin-top-left -rotate-90 opacity-20 outline outline-1 outline-offset-[-0.44px] outline-Color-neutral-06/60"></div>
                </div>
                <div className="w-80 h-40 left-[59.54px] top-[49.03px] absolute">
                  <div className="w-72 h-40 left-[0.88px] top-[0.88px] absolute inline-flex justify-center items-end gap-4">
                    <div className="flex-1 self-stretch inline-flex flex-col justify-end items-center gap-1.5">
                      <div className="w-9 h-3.5 text-center justify-start text-Color-neutral-09/90 text-xs font-normal font-sans">
                        0
                      </div>
                    </div>
                    <div className="flex-1 self-stretch inline-flex flex-col justify-end items-center gap-1.5">
                      <div className="self-stretch flex-1 origin-top-left -rotate-90 opacity-20 outline outline-1 outline-offset-[-0.44px] outline-Color-neutral-06/60"></div>
                      <div className="w-9 h-3.5 text-center justify-start text-Color-neutral-09/90 text-xs font-normal font-helvetica-now">
                        100
                      </div>
                    </div>
                    <div className="flex-1 self-stretch inline-flex flex-col justify-end items-center gap-1.5">
                      <div className="self-stretch flex-1 origin-top-left -rotate-90 opacity-20 outline outline-1 outline-offset-[-0.44px] outline-Color-neutral-06/60"></div>
                      <div className="w-9 h-3.5 text-center justify-start text-Color-neutral-09/90 text-xs font-normal font-helvetica-now">
                        200
                      </div>
                    </div>
                    <div className="flex-1 self-stretch inline-flex flex-col justify-end items-center gap-1.5">
                      <div className="self-stretch flex-1 origin-top-left -rotate-90 opacity-20 outline outline-1 outline-offset-[-0.44px] outline-Color-neutral-06/60"></div>
                      <div className="w-9 h-3.5 text-center justify-start text-Color-neutral-09/90 text-xs font-normal font-helvetica-now">
                        300
                      </div>
                    </div>
                    <div className="flex-1 self-stretch inline-flex flex-col justify-end items-center gap-1.5">
                      <div className="self-stretch flex-1 origin-top-left -rotate-90 opacity-20 outline outline-1 outline-offset-[-0.44px] outline-Color-neutral-06/60"></div>
                      <div className="w-9 h-3.5 text-center justify-start text-Color-neutral-09/90 text-xs font-normal font-helvetica-now">
                        400
                      </div>
                    </div>
                    <div className="flex-1 self-stretch inline-flex flex-col justify-end items-center gap-1.5">
                      <div className="self-stretch flex-1 origin-top-left -rotate-90 opacity-20 outline outline-1 outline-offset-[-0.44px] outline-Color-neutral-06/60"></div>
                      <div className="w-9 h-3.5 text-center justify-start text-Color-neutral-09/90 text-xs font-normal font-helvetica-now">
                        500
                      </div>
                    </div>
                    <div className="flex-1 self-stretch inline-flex flex-col justify-end items-center gap-1.5">
                      <div className="self-stretch flex-1 origin-top-left -rotate-90 opacity-20 outline outline-1 outline-offset-[-0.44px] outline-Color-neutral-06/60"></div>
                      <div className="w-9 h-3.5 text-center justify-start text-Color-neutral-09/90 text-xs font-normal font-helvetica-now">
                        600
                      </div>
                    </div>
                    <div className="flex-1 self-stretch inline-flex flex-col justify-end items-center gap-1.5">
                      <div className="self-stretch flex-1 origin-top-left -rotate-90 opacity-20 outline outline-1 outline-offset-[-0.44px] outline-Color-neutral-06/60"></div>
                      <div className="w-9 h-3.5 text-center justify-start text-Color-neutral-09/90 text-xs font-normal font-helvetica-now">
                        700
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-64 h-36 left-[74.42px] top-[49.91px] absolute inline-flex flex-col justify-center items-start">
                  <div className="self-stretch flex-1 relative">
                    <div
                      data-cleavage="False"
                      data-orientation="Vertical"
                      className="w-52 h-2.5 left-0 top-[13.40px] absolute inline-flex justify-center items-end"
                    >
                      <div className="flex-1 self-stretch bg-gradient-to-l from-teal-800 to-teal-800/0" />
                    </div>
                  </div>
                  <div className="self-stretch flex-1 relative">
                    <div
                      data-cleavage="False"
                      data-orientation="Vertical"
                      className="w-44 h-2.5 left-0 top-[13.40px] absolute inline-flex justify-center items-end"
                    >
                      <div className="flex-1 self-stretch bg-gradient-to-l from-teal-800 to-teal-800/0" />
                    </div>
                  </div>
                  <div className="self-stretch flex-1 relative">
                    <div
                      data-cleavage="False"
                      data-orientation="Vertical"
                      className="w-40 h-2.5 left-0 top-[13.40px] absolute inline-flex justify-center items-end"
                    >
                      <div className="flex-1 self-stretch bg-gradient-to-l from-teal-800 to-teal-800/0" />
                    </div>
                  </div>
                  <div className="self-stretch flex-1 relative">
                    <div
                      data-cleavage="False"
                      data-orientation="Vertical"
                      className="w-28 h-2.5 left-0 top-[13.40px] absolute inline-flex justify-center items-end"
                    >
                      <div className="flex-1 self-stretch bg-gradient-to-l from-teal-800 to-teal-800/0" />
                    </div>
                  </div>
                </div>
                <div
                  data-series="not"
                  data-shape="Square"
                  data-方向="水平"
                  className="w-96 h-5 left-[8.76px] top-[26.27px] absolute"
                >
                  <div className="w-96 px-5 left-0 top-0 absolute inline-flex justify-end items-center gap-3.5" />
                </div>
              </div>
            </div>
            <div className="self-stretch inline-flex justify-start items-start gap-5">
              <div className="flex-1 p-5 bg-yellow-100/10 rounded-[10px] inline-flex flex-col justify-center items-start gap-2">
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <img src="/icons/timer.svg" />
                  <div className="self-stretch text-left justify-start text-gray-400 text-[10px] font-bold font-helvetica-now uppercase leading-none tracking-wide">
                    Payback Period
                  </div>
                  <div className="self-stretch text-left justify-start text-yellow-100 text-xl font-bold font-helvetica-now leading-normal">
                    3.2 months
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
                    +$89k/quarter
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-96 pb-5 left-[20px] top-[693px] absolute border-b-[0.50px] border-neutral-600 inline-flex flex-col justify-start items-start gap-5">
            <div className="self-stretch flex flex-col justify-start items-start gap-3">
              <div className="self-stretch text-left justify-start text-gray-400 text-base font-bold font-helvetica-now uppercase leading-normal tracking-widest">
                RISK PROFILE
              </div>
            </div>
            <div className="self-stretch flex flex-col justify-start items-start gap-3">
              <div className="w-96 flex flex-col justify-start items-start gap-2">
                <div className="self-stretch text-left justify-start text-white text-base font-medium font-helvetica-now leading-tight">
                  Medium Risk
                </div>
                <div className="self-stretch text-left justify-start text-gray-400 text-sm font-normal font-helvetica-now leading-none">
                  Based on 3 risk factors
                </div>
              </div>
              <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
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
              </div>
            </div>
          </div>
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
                className="self-stretch h-[250px] w-[380px] relative rounded-[10px] border-gray-200"
                src="/images/p2.png"
              />
            </div>
          </div>
          <div className="w-96 pb-5 left-[20px] top-[1354px] absolute border-b-[0.50px] border-neutral-600 inline-flex flex-col justify-start items-start gap-3">
            <div className="self-stretch flex flex-col justify-start items-start gap-3">
              <div className="self-stretch text-left justify-start text-gray-400 text-base font-bold font-helvetica-now uppercase leading-normal tracking-widest">
                SYSTEMS INVOLVED
              </div>
            </div>
            <div className="inline-flex justify-start items-start gap-2">
              <div className="h-7 px-5 py-2.5 bg-neutral-800 rounded-[60px] flex justify-center items-center gap-1.5">
                <div className="w-8 h-5 justify-start text-gray-50 text-sm font-normal font-inter">
                  ERP
                </div>
              </div>
              <div className="h-7 px-5 py-2.5 bg-neutral-800 rounded-[60px] flex justify-center items-center gap-1.5">
                <div className="justify-start text-white text-xs font-bold font-helvetica-now uppercase leading-none">
                  HRIS
                </div>
              </div>
              <div className="h-7 px-5 py-2.5 bg-neutral-800 rounded-[60px] flex justify-center items-center gap-1.5">
                <div className="justify-start text-white text-xs font-bold font-helvetica-now uppercase leading-none">
                  CRM
                </div>
              </div>
              <div className="h-7 px-5 py-2.5 bg-neutral-800 rounded-[60px] flex justify-center items-center gap-1.5">
                <div className="justify-start text-white text-xs font-bold font-helvetica-now uppercase leading-none">
                  WMS
                </div>
              </div>
            </div>
          </div>
          <div className="w-96 left-[20px] top-[1458px] absolute inline-flex flex-col justify-start items-start gap-4">
            <div className="self-stretch h-12 px-10 py-5 bg-neutral-900 rounded-[60px] shadow-[0px_40px_120px_0px_rgba(1,68,199,0.30)] outline outline-1 outline-white inline-flex justify-center items-center gap-2">
              <div className="justify-start text-white text-base font-bold font-helvetica-now leading-normal">
                Drill deeper into this recommendation
              </div>
            </div>
            <img src="/images/selectButton.png" />
          </div>
        </div>
        <img
          className="w-6 h-6 left-[1131.13px] top-[2.13px] absolute cursor-pointer"
          src="/icons/cancel.svg"
          onClick={onClose}
          alt="Close"
        />
      </div>
    </div>
  );
};

export default ComparisonDialog;
