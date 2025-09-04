"use client";
import { useState } from "react";
import Header from "./DecisionEngineComponent/Header";
import Breadcrumb from "./DecisionEngineComponent/Breadcrumb";
import Tabs from "./DecisionEngineComponent/Tabs";
import MainContent from "./DecisionEngineComponent/MainContent";
import KipImpactView from "../kip/KipImpactView";

const DecisionEngine = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [message, setMessage] = useState("");
  const [regionOpen, setRegionOpen] = useState(false);
  const [functionOpen, setFunctionOpen] = useState(false);
  const [periodOpen, setPeriodOpen] = useState(false);
  const [videoStatus, setVideoStatus] = useState("loading");

  const [selectedRegion, setSelectedRegion] = useState("North America");
  const [selectedFunction, setSelectedFunction] = useState("Operations");
  const [selectedPeriod, setSelectedPeriod] = useState("Last 6 months");
  const [showRecommendations, setShowRecommendations] = useState(false);

  const handleGenerateRecommendations = () => {
    if (message.trim()) {
      setShowRecommendations(true);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Video */}
      {/* Background Video */}
      <video
        className="fixed inset-0 w-full h-full object-cover"
        style={{ zIndex: -1 }}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onError={(e) => {
          console.error("DecisionEngine video failed to load:", e);
          setVideoStatus("error");
        }}
        onLoadStart={() => {
          console.log("DecisionEngine video started loading");
          setVideoStatus("loading");
        }}
        onCanPlay={() => {
          console.log("DecisionEngine video can play");
          setVideoStatus("ready");
        }}
        onLoadedData={() => {
          console.log("DecisionEngine video data loaded");
          setVideoStatus("loaded");
        }}
        onPlay={() => {
          console.log("DecisionEngine video is playing");
          setVideoStatus("playing");
        }}
        onEnded={() => {
          console.log("DecisionEngine video ended, restarting...");
          const video = document.querySelector("video");
          if (video) video.play();
        }}
      >
        <source src="/video/bg.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* Fallback background */}
      <div
        className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"
        style={{ zIndex: -20 }}
      ></div>

      {/* Dark overlay for better text readability */}
      <div
        className="absolute inset-0 bg-black/90"
        style={{ zIndex: -5 }}
      ></div>

      {/* Content */}
      <div className="relative" style={{ zIndex: 10 }}>
        <Header />
        <Breadcrumb />
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === "dashboard" ? (
          <MainContent
            message={message}
            setMessage={setMessage}
            regionOpen={regionOpen}
            setRegionOpen={setRegionOpen}
            functionOpen={functionOpen}
            setFunctionOpen={setFunctionOpen}
            periodOpen={periodOpen}
            setPeriodOpen={setPeriodOpen}
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
            selectedFunction={selectedFunction}
            setSelectedFunction={setSelectedFunction}
            selectedPeriod={selectedPeriod}
            setSelectedPeriod={setSelectedPeriod}
            showRecommendations={showRecommendations}
            handleGenerateRecommendations={handleGenerateRecommendations}
          />
        ) : (
          <KipImpactView />
        )}
      </div>
    </div>
  );
};

export default DecisionEngine;
