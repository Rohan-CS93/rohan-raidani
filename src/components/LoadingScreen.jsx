import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";
import { FaLaptopCode, FaAppStore, FaLock } from "react-icons/fa";

export const LoadingScreen = (props) => {
  const { started, setStarted, onDomainSelect } = props;
  const [selectedDomain, setSelectedDomain] = useState("");
  const { progress, total, loaded, item } = useProgress();
  const [isSelectionMade, setIsSelectionMade] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const domains = [
    {
      value: "web",
      icon: FaLaptopCode,
      bgColor: "bg-blue-100",
      bgColorExpand: "bg-blue-200",
      ringColor: "ring-blue-400",
    },
    {
      value: "app",
      icon: FaAppStore,
      bgColor: "bg-pink-100",
      bgColorExpand: "bg-pink-200",
      ringColor: "ring-pink-400",
    },
    {
      value: "cyber",
      icon: FaLock,
      bgColor: "bg-purple-100",
      bgColorExpand: "bg-purple-200",
      ringColor: "ring-purple-400",
    },
  ];

  useEffect(() => {
    if (loaded === total && isSelectionMade) {
      setTimeout(() => {
        setStarted(true);
      }, 500);
    }
  }, [loaded, total, isSelectionMade, setStarted]);

  const handleDomainSelect = (value) => {
    if (!isLocked) {
      setSelectedDomain(value);
      setIsSelectionMade(true);
      setIsLocked(true);
      onDomainSelect(value); // Pass the selected domain to parent
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full z-50 transition-opacity duration-1000 flex flex-col items-center justify-around bg-indigo-50 
      ${started ? "opacity-0 pointer-events-none" : "opacity-100"}`}
    >
      <div className="">
        <div className="flex flex-col items-center gap-4 overflow-hidden rounded-md p-6 shadow-sm shadow-[#00000050]">
          <span className="text-center font-mono text-base font-black uppercase text-neutral-600">
            Please select Domain
            {isLocked && (
              <span className="ml-2 text-green-600">(Selection Locked)</span>
            )}
          </span>
          <div className="flex items-center justify-around w-full gap-28">
            {domains.map((domain) => (
              <div
                key={domain.value}
                className={`relative flex h-[50px] w-[50px] items-center justify-center ${
                  isLocked && selectedDomain !== domain.value
                    ? "opacity-50"
                    : ""
                }`}
              >
                <input
                  type="radio"
                  id={domain.value}
                  name="domain"
                  value={domain.value}
                  className="peer z-10 h-full w-full cursor-pointer opacity-0"
                  onChange={() => handleDomainSelect(domain.value)}
                  checked={selectedDomain === domain.value}
                  disabled={isLocked && selectedDomain !== domain.value}
                />
                <div
                  className={`absolute h-full w-full rounded-full ${domain.bgColor} p-4 shadow-sm shadow-[#00000050] ${domain.ringColor} duration-300 peer-checked:scale-110 peer-checked:ring-2 pointer-events-none flex items-center justify-center`}
                >
                  <domain.icon
                    className="w-6 h-6 text-neutral-600"
                    strokeWidth={1.5}
                  />
                </div>
                <div
                  className={`absolute -z-10 h-full w-full scale-0 rounded-full ${domain.bgColorExpand} duration-500 peer-checked:scale-[500%]`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-4xl md:text-9xl font-bold text-indigo-900 relative">
        <div
          className="absolute left-0 top-0 overflow-hidden truncate text-clip transition-all duration-500"
          style={{
            width: `${isSelectionMade ? progress : 0}%`,
          }}
        >
          Let's Rock
        </div>
        <div className="opacity-40">Let's Rock</div>
      </div>
    </div>
  );
};
