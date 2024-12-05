"use client";
import React from "react";
import { GameAPIResponse } from "@/utils/helpers/types";

export default function ProductRequirements({
  product,
}: {
  product: GameAPIResponse;
}) {
  const [activeTab, setActiveTab] = React.useState<string>("PC");

  const handleTabChange = (platform: string) => {
    setActiveTab(platform);
  };

  const getPlatformRequirements = (platformName: string) => {
    const platform = product.platforms.find(
      (p) => p.platform.name.toLowerCase() === platformName.toLowerCase()
    );
    return platform ? platform.requirements : {};
  };

  const renderRequirements = (platformName: string) => {
    const requirements = getPlatformRequirements(platformName);

    if (!requirements) {
      return (
        <li className="text-[15px] text-[#DCD8E6]">
          No system requirements available for {platformName}.
        </li>
      );
    }

    return (
      <>
        {requirements.minimum ? (
          <>
            <h3 className="mb-[10px] text-[17px] text-[#FFFFFF] font-[700]">
              Minimum System Requirements
            </h3>
            <p className="text-[15px] text-[#DCD8E6]">{requirements.minimum}</p>
            <br />
          </>
        ) : (
          <li className="text-[15px] text-[#DCD8E6]">
            No minimum system requirements for {platformName}.
          </li>
        )}
        {requirements.recommended ? (
          <>
            <h3 className="mb-[10px] text-[17px] text-[#FFFFFF] font-[700]">
              Recommended System Requirements
            </h3>
            <p className="text-[15px] text-[#DCD8E6]">
              {requirements.recommended}
            </p>
          </>
        ) : (
          <li className="text-[15px] text-[#DCD8E6]">
            No recommended system requirements for {platformName}.
          </li>
        )}
      </>
    );
  };

  return (
    <>
      <div className="flex items-center z max-w-[1240px] mx-[-20px] md:mx-auto bg-tertiaryColor">
        {["PC", "macOS", "Linux"].map((platform) => (
          <div
            key={platform}
            className={`flex items-center min-h-[50px] ${
              activeTab === platform ? "bg-secondaryColor" : "bg-tertiaryColor"
            }`}
          >
            {getPlatformRequirements(platform) && (
              <button
                className="px-[20px] font-[700] text-[#FFFFFF]"
                onClick={() => handleTabChange(platform)}
              >
                {platform}
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col z max-w-[1240px] mx-[-20px] md:mx-auto pb-[15px] px-[20px] pt-4 bg-secondaryColor">
        {["PC", "macOS", "Linux"].includes(activeTab) ? (
          renderRequirements(activeTab)
        ) : (
          <div className="text-[15px] text-[#DCD8E6]">
            System requirements are not applicable for the selected platform.
          </div>
        )}
      </div>
    </>
  );
}
