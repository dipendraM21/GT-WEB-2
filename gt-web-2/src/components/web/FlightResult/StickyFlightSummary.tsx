"use client";
import { CustomText } from "@/components/core/Text";
import { Box, Button } from "theme-ui";

const StickyFlightSummary = ({
  price = "₹7,823",
  onClickBook,
}: {
  price?: string;
  onClickBook: () => void;
}) => {
  return (
    <Box
      className="container"
      sx={{
        position: "fixed",
        bottom: 0,
        backgroundColor: "white",
        borderTop: "1px solid #ddd",
        zIndex: 50,
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 -2px 8px rgba(0,0,0,0.05)",
        width: "100%",
      }}
    >
      <Box>
        <CustomText variant="font-16-medium-20" color="primary-grey-900">
          IndiGo • 06:00 → 08:10
        </CustomText>
        <CustomText variant="font-14-medium-20" color="primary-grey-300">
          Return: 23:45 → 02:00 +1
        </CustomText>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <CustomText variant="font-18-demi-20" color="primary-grey-900">
          {price}
        </CustomText>
        <Button onClick={onClickBook} sx={{ bg: "primary" }}>
          Book
        </Button>
      </Box>
    </Box>
  );
};

export default StickyFlightSummary;
