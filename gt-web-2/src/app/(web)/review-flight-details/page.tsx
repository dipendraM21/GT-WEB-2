'use client'
import FlightBookingUI from "@/components/pages/flight-review/Detailscrad"
import FareSummaryUI from "@/components/pages/flight-review/FareSummary"
import { Box, Text } from "theme-ui"

function ReviewFlightDetails() {
    return (
        <>
            <Box as="div" className="container mx-auto flex flex-col lg:flex-row items-start gap-4 lg:gap-6 px-4 py-[12px]">
                <FareSummaryUI />
                <Box className="w-full  ">
                    <FlightBookingUI showWarning={true} />
                    <FlightBookingUI />
                </Box>
            </Box>
        </>
    )
}

export default ReviewFlightDetails