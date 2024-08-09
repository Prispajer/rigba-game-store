"use client";
import React from "react";
import { GameAPIResponse } from "@/utils/helpers/types";

export default function ProductRequirements({
  product,
}: {
  product: GameAPIResponse;
}) {
  const [activeTab, setActiveTab] = React.useState<string>("PC");
  console.log(product);

  const handleTabChange = (platform: string) => {
    setActiveTab(platform);
  };

  const getPlatformRequirements = (platformName: string) => {
    const platform = product.platforms?.find(
      (p) => p.platform.name.toLowerCase() === platformName.toLowerCase()
    );
    console.log(platform);
    return platform;
  };

  return (
    <>
      <div className="flex items-center z max-w-[1240px] mx-[-20px] md:mx-auto bg-tertiaryColor">
        <div
          className={`flex items-center min-h-[50px] bg-secondaryColor  ${
            activeTab === "PC" ? "bg-secondaryColor" : "bg-tertiaryColor"
          }`}
        >
          {getPlatformRequirements("PC") && (
            <button
              className="px-[20px] font-[700] text-[#FFFFFF]"
              onClick={() => handleTabChange("PC")}
            >
              PC
            </button>
          )}
        </div>
        <div
          className={`flex items-center min-h-[50px] bg-secondaryColor  ${
            activeTab === "macOS" ? "bg-secondaryColor" : "bg-tertiaryColor"
          }`}
        >
          {getPlatformRequirements("macOS") && (
            <button
              className="px-[20px] font-[700] text-[#FFFFFF]"
              onClick={() => handleTabChange("macOS")}
            >
              macOS
            </button>
          )}
        </div>
        <div
          className={`flex items-center min-h-[50px] bg-secondaryColor  ${
            activeTab === "Linux" ? "bg-secondaryColor" : "bg-tertiaryColor"
          }`}
        >
          {getPlatformRequirements("Linux") && (
            <button
              className="px-[20px] font-[700] text-[#FFFFFF]"
              onClick={() => handleTabChange("Linux")}
            >
              Linux
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col z max-w-[1240px] mx-[-20px] md:mx-auto pb-[15px] px-[20px] pt-4 bg-secondaryColor">
        {activeTab === "PC" && (
          <>
            <h3 className="mb-[10px] text-[17px] text-[#FFFFFF] font-[700]">
              Minimum system requirements
            </h3>
            <ul className="mb-[25px]">
              {getPlatformRequirements("PC") ? (
                <li className="text-justify">
                  <div className="text-[15px] text-[#DCD8E6]">
                    <p>{getPlatformRequirements("PC").requirements.minimum}</p>
                    <br />
                    <h3 className="mb-[10px] text-[17px] text-[#FFFFFF] font-[700]">
                      Recommended system requirements
                    </h3>
                    {getPlatformRequirements("PC").requirements.recommended && (
                      <p>
                        {getPlatformRequirements("PC").requirements.recommended}
                      </p>
                    )}
                  </div>
                </li>
              ) : (
                <li className="text-[15px] text-[#DCD8E6]">
                  Brak danych o wymaganiach systemowych dla PC.
                </li>
              )}
            </ul>
          </>
        )}
        {activeTab === "macOS" && (
          <>
            <h3 className="mb-[10px] text-[17px] text-[#FFFFFF] font-[700]">
              Minimum system requirements
            </h3>
            <ul className="mb-[25px]">
              {getPlatformRequirements("macOS") ? (
                <li className="text-justify">
                  <div className="text-[15px] text-[#DCD8E6]">
                    <p>
                      {getPlatformRequirements("macOS").requirements.minimum}
                    </p>
                    <br />
                    <h3 className="mb-[10px] text-[17px] text-[#FFFFFF] font-[700]">
                      Recommended system requirements
                    </h3>
                    {getPlatformRequirements("macOS").requirements
                      .recommended && (
                      <p>
                        {
                          getPlatformRequirements("macOS").requirements
                            .recommended
                        }
                      </p>
                    )}
                  </div>
                </li>
              ) : (
                <li className="text-[15px] text-[#DCD8E6]">
                  Brak danych o wymaganiach systemowych dla PC.
                </li>
              )}
            </ul>
          </>
        )}
        {activeTab === "Linux" && (
          <>
            <h3 className="mb-[10px] text-[17px] text-[#FFFFFF] font-[700]">
              Minimum system requirements
            </h3>
            <ul className="mb-[25px]">
              {getPlatformRequirements("Linux") ? (
                <li className="text-justify">
                  <div className="text-[15px] text-[#DCD8E6]">
                    <p>
                      {getPlatformRequirements("Linux").requirements.minimum}
                    </p>
                    <br />
                    <h3 className="mb-[10px] text-[17px] text-[#FFFFFF] font-[700]">
                      Recommended system requirements
                    </h3>
                    {getPlatformRequirements("Linux").requirements
                      .recommended && (
                      <p>
                        {
                          getPlatformRequirements("Linux").requirements
                            .recommended
                        }
                      </p>
                    )}
                  </div>
                </li>
              ) : (
                <li className="text-[15px] text-[#DCD8E6]">
                  Brak danych o wymaganiach systemowych dla PC.
                </li>
              )}
            </ul>
          </>
        )}

        {["PC", "macOS", "Linux"].indexOf(activeTab) === -1 && (
          <div className="text-[15px] text-[#DCD8E6]">
            Dla wybranej platformy wymagania systemowe nie są stosowane.
          </div>
        )}
      </div>
    </>
  );
}
