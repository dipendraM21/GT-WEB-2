import { CustomText } from "@/components/core/Text";
import React from "react";
import { FaPlane } from "react-icons/fa";

interface FeatureItem {
  icon: React.ReactNode;
  label?: string;
  muted?: boolean;
}

interface FlightFeaturesInfoProps {
  aircraftModel: string;
  features: FeatureItem[];
}

const FlightFeaturesInfo: React.FC<FlightFeaturesInfoProps> = ({
  aircraftModel,
  features,
}) => {
  return (
    <div className="flex items-center gap-4 flex-wrap text-sm text-gray-800 mr-t-20">
      <div className="flex items-center gap-1">
        <FaPlane className="text-lg" />
        <span>{aircraftModel}</span>
      </div>

      {features.map((feat, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <span
            className={`${
              feat.muted ? "text-gray-400" : "text-black"
            } text-base`}
          >
            {feat.icon}
          </span>
          {feat.label && (
            <CustomText variant="font-14-medium-20" color="primary-grey-300">
              {feat.label}
            </CustomText>
          )}
        </div>
      ))}
    </div>
  );
};

export default FlightFeaturesInfo;
