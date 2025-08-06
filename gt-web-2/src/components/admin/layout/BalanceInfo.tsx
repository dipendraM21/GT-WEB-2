import { CustomText } from "@/components/core/Text";
import React from "react";

interface BalanceInfoProps {
  availableBalance: number;
  creditLimit: number;
  due: number;
}

const BalanceInfo: React.FC<BalanceInfoProps> = ({
  availableBalance,
  creditLimit,
  due,
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 8,
    }}
  >
    <CustomText variant="font-18-medium-125" color="primary-grey-800">
      Available Balance : {availableBalance.toFixed(2)}
    </CustomText>
    <CustomText variant="font-18-medium-125" color="primary-grey-800">
      |
    </CustomText>
    <CustomText variant="font-18-medium-125" color="primary-grey-800">
      Credit Limit : {creditLimit.toFixed(2)}
    </CustomText>
    <CustomText variant="font-18-medium-125" color="primary-grey-800">
      |
    </CustomText>
    <CustomText variant="font-18-medium-125" color="primary-grey-800">
      Due : {due.toFixed(2)}
    </CustomText>
  </div>
);

export default BalanceInfo;
