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
    <div className="min-h-screen bg-dashboard relative overflow-hidden">
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
  );
};

export default DecisionEngine;
