const Tabs = () => {
  return (
    <div className="relative z-10 flex justify-center">
      <div className="flex">
        <div className="px-10 py-5 border-b-2 border-blue-600">
          <span className="text-white font-semibold uppercase text-sm tracking-wide">
            PROMPT DASHBOARD
          </span>
        </div>
        <div className="px-10 py-5 border-b border-gray-600">
          <span className="text-gray-400 font-semibold text-sm">
            KIP Impact View
          </span>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
