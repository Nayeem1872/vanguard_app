"use client";
import { useState } from "react";
import RecommendationCards from "./RecommendationCards";

interface MainContentProps {
  message: string;
  setMessage: (message: string) => void;
  regionOpen: boolean;
  setRegionOpen: (open: boolean) => void;
  functionOpen: boolean;
  setFunctionOpen: (open: boolean) => void;
  periodOpen: boolean;
  setPeriodOpen: (open: boolean) => void;
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
  selectedFunction: string;
  setSelectedFunction: (func: string) => void;
  selectedPeriod: string;
  setSelectedPeriod: (period: string) => void;
  showRecommendations: boolean;
  handleGenerateRecommendations: () => void;
}

const MainContent = ({
  message,
  setMessage,
  regionOpen,
  setRegionOpen,
  functionOpen,
  setFunctionOpen,
  periodOpen,
  setPeriodOpen,
  selectedRegion,
  setSelectedRegion,
  selectedFunction,
  setSelectedFunction,
  selectedPeriod,
  setSelectedPeriod,
  showRecommendations,
  handleGenerateRecommendations,
}: MainContentProps) => {
  const regions = ["North America", "Europe", "Asia Pacific", "Latin America"];
  const functions = ["Operations", "Marketing", "Finance", "HR", "IT"];
  const periods = [
    "Last 3 months",
    "Last 6 months",
    "Last 12 months",
    "Last 24 months",
  ];

  return (
    <div className="relative z-10 flex flex-col items-center justify-center px-8 mt-16">
      <div className="max-w-4xl w-full text-center">
        {/* Main Heading */}
        <h2 className="text-4xl font-medium text-white mb-12 leading-tight">
          What business challenge can I help
          <br />
          you optimize?
        </h2>

        {/* Filters */}
        <div className="flex items-center justify-center gap-10 mb-12">
          {/* Region Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setRegionOpen(!regionOpen);
                setFunctionOpen(false);
                setPeriodOpen(false);
              }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <span className="text-gray-400 font-medium">Region:</span>
              <span className="text-white font-semibold">{selectedRegion}</span>
              <span className="text-gray-400 text-sm">▼</span>
            </button>
            {regionOpen && (
              <div className="absolute top-full mt-2 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-20 min-w-[150px]">
                {regions.map((region) => (
                  <button
                    key={region}
                    onClick={() => {
                      setSelectedRegion(region);
                      setRegionOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {region}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Function Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setFunctionOpen(!functionOpen);
                setRegionOpen(false);
                setPeriodOpen(false);
              }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <span className="text-gray-400 font-medium">Function:</span>
              <span className="text-white font-semibold">
                {selectedFunction}
              </span>
              <span className="text-gray-400 text-sm">▼</span>
            </button>
            {functionOpen && (
              <div className="absolute top-full mt-2 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-20 min-w-[120px]">
                {functions.map((func) => (
                  <button
                    key={func}
                    onClick={() => {
                      setSelectedFunction(func);
                      setFunctionOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {func}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Period Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setPeriodOpen(!periodOpen);
                setRegionOpen(false);
                setFunctionOpen(false);
              }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <span className="text-gray-400 font-medium">Period:</span>
              <span className="text-white font-semibold">{selectedPeriod}</span>
              <span className="text-gray-400 text-sm">▼</span>
            </button>
            {periodOpen && (
              <div className="absolute top-full mt-2 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-20 min-w-[150px]">
                {periods.map((period) => (
                  <button
                    key={period}
                    onClick={() => {
                      setSelectedPeriod(period);
                      setPeriodOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {period}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Input Form */}
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Text Area */}
          <div className="relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message ..."
              className="w-full h-32 border rounded-2xl px-6 py-5 text-white placeholder-gray-400 resize-none focus:outline-none"
              style={{
                backgroundColor: "rgba(36, 38, 40, 1)",
                borderColor: "#515151",
              }}
            />
          </div>

          <button
            onClick={handleGenerateRecommendations}
            type="submit"
            className="flex flex-col relative min-h-14 w-full items-center gap-2.5 cursor-pointer text-xl text-white font-bold justify-center mt-[30px] px-10 py-[13px] rounded-[60px] max-md:max-w-full max-md:px-5 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          >
            <img
              src="https://api.builder.io/api/v1/image/assets/433102d2ca2a4e4793d38efcc106433f/a9f182a9723e0b30560f0d1fcc6edfcd62e18b3e?placeholderIfAbsent=true"
              alt=""
              className="absolute h-full w-full object-cover inset-0 rounded-[60px]"
            />
          </button>
        </div>

        {/* Recommendation Cards */}
        <RecommendationCards showRecommendations={showRecommendations} />
      </div>
    </div>
  );
};

export default MainContent;
