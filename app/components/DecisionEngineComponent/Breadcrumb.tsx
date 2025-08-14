import Image from "next/image";

const Breadcrumb = () => {
  return (
    <div className="relative z-10 bg-black/20 backdrop-blur-custom border-b border-gray-700">
      <div className="flex items-center px-24 py-4">
        <div className="flex items-center gap-3 text-sm">
          <Image
            src="/icons/home.svg"
            alt="Home"
            width={16}
            height={16}
            className="text-gray-400"
          />
          <span className="text-gray-400 font-medium">Analytics</span>
          <span className="text-gray-400">›</span>
          <span className="text-white font-semibold">Decision Engine</span>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
