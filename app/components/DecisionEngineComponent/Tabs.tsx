interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Tabs = ({ activeTab, setActiveTab }: TabsProps) => {
  return (
    <div className="relative z-10 flex justify-center">
      <div className="flex">
        <div
          className={`px-10 py-5 cursor-pointer ${
            activeTab === "dashboard"
              ? "border-b-2 border-blue-600"
              : "border-b border-gray-600"
          }`}
          onClick={() => setActiveTab("dashboard")}
        >
          <span
            className={`font-semibold uppercase text-sm tracking-wide ${
              activeTab === "dashboard" ? "text-white" : "text-gray-400"
            }`}
          >
            PROMPT DASHBOARD
          </span>
        </div>
        <div
          className={`px-10 py-5 cursor-pointer ${
            activeTab === "kip"
              ? "border-b-2 border-blue-600"
              : "border-b border-gray-600"
          }`}
          onClick={() => setActiveTab("kip")}
        >
          <span
            className={`font-semibold text-sm ${
              activeTab === "kip" ? "text-white" : "text-gray-400"
            }`}
          >
            KIP Impact View
          </span>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
