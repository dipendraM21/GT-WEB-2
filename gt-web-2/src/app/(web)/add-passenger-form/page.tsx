"use client"
import CenterWrapper from "@/components/layouts/CenterWrapper";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Box, Text } from "theme-ui";


export default function AddPassangerForm() {
    return (
        <CenterWrapper className="px-4 py-8">
            <div className=" mx-auto">
                <Accordion
                    type="single"
                    collapsible
                    className="w-full "
                    defaultValue="item-1"
                >
                    <AccordionItem
                        value="item-1"
                        className="border border-gray-200 rounded-lg shadow-sm bg-white overflow-hidden"
                    >
                        <AccordionTrigger className="px-6 py-2 transition-colors duration-200 font-semibold text-white bg-[#ff7b00] [&>svg]:text-white hover:no-underline">
                            <Box as="div" className="flex items-center gap-3">
                                <Text
                                    variant="Primary16Medium125"
                                    color="white"
                                    as="span"
                                >
                                    Passenger Information
                                </Text>
                            </Box>
                        </AccordionTrigger>
                        <AccordionContent className="px-6  bg-gray-50">
                            <Box as="div" className="space-y-6">
                                {/* Passenger Details Section */}
                                <Box as="div" className="space-y-4">
                                    <Text variant="Primary18Medium125" className="font-semibold text-gray-800">
                                        Passenger Details
                                    </Text>

                                    <Box as="div" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {/* Title Dropdown */}
                                        <Box as="div" className="space-y-2">
                                            <Text as="label" className="text-sm font-medium text-gray-700">
                                                Adult(1)*
                                            </Text>
                                            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                                                <option value="Mr">Mr</option>
                                                <option value="Mrs">Mrs</option>
                                                <option value="Ms">Ms</option>
                                                <option value="Dr">Dr</option>
                                            </select>
                                        </Box>

                                        {/* First Name */}
                                        <Box as="div" className="space-y-2">
                                            <Text as="label" className="text-sm font-medium text-gray-700">
                                                First Name*
                                            </Text>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                placeholder="Enter first name"
                                            />
                                        </Box>

                                        {/* Last Name */}
                                        <Box as="div" className="space-y-2">
                                            <Text as="label" className="text-sm font-medium text-gray-700">
                                                Last Name*
                                            </Text>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                placeholder="Enter last name"
                                            />
                                        </Box>

                                        {/* Frequent Flier Number */}
                                        <Box as="div" className="space-y-2">
                                            <Text as="label" className="text-sm font-medium text-gray-700">
                                                Freq. Flier Number
                                            </Text>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                placeholder="Enter frequent flier number"
                                            />
                                        </Box>

                                        {/* Email */}
                                        <Box as="div" className="space-y-2">
                                            <Text as="label" className="text-sm font-medium text-gray-700">
                                                Email
                                            </Text>
                                            <input
                                                type="email"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                placeholder="Enter email address"
                                            />
                                        </Box>

                                        {/* Mobile */}
                                        <Box as="div" className="space-y-2">
                                            <Text as="label" className="text-sm font-medium text-gray-700">
                                                Mobile
                                            </Text>
                                            <input
                                                type="tel"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                placeholder="Enter mobile number"
                                            />
                                        </Box>

                                        {/* Date of Birth */}
                                        <Box as="div" className="space-y-2">
                                            <Text as="label" className="text-sm font-medium text-gray-700">
                                                Date of Birth
                                            </Text>
                                            <input
                                                type="date"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            />
                                        </Box>
                                    </Box>
                                </Box>

                                {/* Customer Options Section */}
                                <Box as="div" className="space-y-4 pt-4 border-t border-gray-200">
                                    <Text variant="Primary18Medium125" className="font-semibold text-gray-800">
                                        Customer Options
                                    </Text>

                                    <Box as="div" className="flex flex-wrap gap-4">
                                        <button className="px-4 py-2 text-orange-600 border border-orange-600 rounded-md hover:bg-orange-50 transition-colors duration-200">
                                            Choose Customer
                                        </button>
                                        <button className="px-4 py-2 text-orange-600 border border-orange-600 rounded-md hover:bg-orange-50 transition-colors duration-200">
                                            Save/Update Customer in "My Customer" List
                                        </button>
                                    </Box>
                                </Box>

                                {/* Flight Preferences Table */}
                                <Box as="div" className="space-y-4 pt-4 border-t border-gray-200">
                                    <Text variant="Primary18Medium125" className="font-semibold text-gray-800">
                                        Flight Preferences
                                    </Text>

                                    <Box as="div" className="overflow-x-auto">
                                        <table className="w-full border-collapse border border-gray-300 bg-white rounded-lg overflow-hidden shadow-sm">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-700">
                                                        Sector
                                                    </th>
                                                    <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-700">
                                                        Meal Pref
                                                    </th>
                                                    <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-700">
                                                        Seat Map
                                                    </th>
                                                    <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-700">
                                                        Baggage Pref
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="hover:bg-gray-50">
                                                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                                                        DEL - BBI (IX)
                                                    </td>
                                                    <td className="border border-gray-300 px-4 py-3">
                                                        <select className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-500">
                                                            <option value="">---Select---</option>
                                                            <option value="veg">Vegetarian</option>
                                                            <option value="non-veg">Non-Vegetarian</option>
                                                            <option value="special">Special Meal</option>
                                                        </select>
                                                    </td>
                                                    <td className="border border-gray-300 px-4 py-3">
                                                        <button className="px-3 py-1 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors duration-200 text-sm">
                                                            Select Seat
                                                        </button>
                                                    </td>
                                                    <td className="border border-gray-300 px-4 py-3">
                                                        <select className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-500">
                                                            <option value="">---Select---</option>
                                                            <option value="light">Light</option>
                                                            <option value="medium">Medium</option>
                                                            <option value="heavy">Heavy</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr className="hover:bg-gray-50">
                                                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                                                        BBI - BOM (IX)
                                                    </td>
                                                    <td className="border border-gray-300 px-4 py-3">
                                                        <select className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-500">
                                                            <option value="">---Select---</option>
                                                            <option value="veg">Vegetarian</option>
                                                            <option value="non-veg">Non-Vegetarian</option>
                                                            <option value="special">Special Meal</option>
                                                        </select>
                                                    </td>
                                                    <td className="border border-gray-300 px-4 py-3">
                                                        <button className="px-3 py-1 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors duration-200 text-sm">
                                                            Select Seat
                                                        </button>
                                                    </td>
                                                    <td className="border border-gray-300 px-4 py-3">
                                                        <select className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-500">
                                                            <option value="">---Select---</option>
                                                            <option value="light">Light</option>
                                                            <option value="medium">Medium</option>
                                                            <option value="heavy">Heavy</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Box>
                                </Box>
                            </Box>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                        value="item-2"
                        className="border border-gray-200 rounded-lg shadow-sm bg-white overflow-hidden"
                    >
                        <AccordionTrigger className="px-6 py-2 transition-colors duration-200 font-semibold text-white bg-[#ff7b00] [&>svg]:text-white hover:no-underline">
                            <Box as="div" className="flex items-center gap-3">
                                <Text
                                    variant="Primary16Medium125"
                                    color="white"
                                    as="span"
                                >
                                    Contact and Payment Details
                                </Text>
                            </Box>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 bg-gray-50">
                            <Box as="div" className="space-y-6">
                                {/* Contact Details Section */}
                                <Box as="div" className="space-y-4">
                                    <Text variant="Primary18Medium125" className="font-semibold text-gray-800">
                                        Contact Details
                                    </Text>

                                    <Box as="div" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Email */}
                                        <Box as="div" className="space-y-2">
                                            <Text as="label" className="text-sm font-medium text-gray-700">
                                                Email Id*
                                            </Text>
                                            <input
                                                type="email"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                placeholder="Enter email address"
                                                defaultValue="dipendrasinhm@gmail.com"
                                            />
                                        </Box>

                                        {/* Mobile Number */}
                                        <Box as="div" className="space-y-2">
                                            <Text as="label" className="text-sm font-medium text-gray-700">
                                                Mobile No*
                                            </Text>
                                            <input
                                                type="tel"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                placeholder="Enter mobile number"
                                                defaultValue="9016486171"
                                            />
                                        </Box>
                                    </Box>
                                </Box>

                                {/* Payment Methods Section */}
                                <Box as="div" className="space-y-4">
                                    <Text variant="Primary18Medium125" className="font-semibold text-gray-800">
                                        Payment Methods
                                    </Text>

                                    <Box as="div" className="space-y-3">
                                        <Box as="div" className="flex items-center">
                                            <input
                                                type="radio"
                                                id="deposit"
                                                name="payment"
                                                value="deposit"
                                                defaultChecked
                                                className="w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                                            />
                                            <Text as="label" htmlFor="deposit" className="ml-2 text-sm font-medium text-gray-700">
                                                Deposit
                                            </Text>
                                        </Box>

                                        <Box as="div" className="flex items-center">
                                            <input
                                                type="radio"
                                                id="debit"
                                                name="payment"
                                                value="debit"
                                                className="w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                                            />
                                            <Text as="label" htmlFor="debit" className="ml-2 text-sm font-medium text-gray-700">
                                                Debit Card
                                            </Text>
                                        </Box>

                                        <Box as="div" className="flex items-center">
                                            <input
                                                type="radio"
                                                id="credit"
                                                name="payment"
                                                value="credit"
                                                className="w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                                            />
                                            <Text as="label" htmlFor="credit" className="ml-2 text-sm font-medium text-gray-700">
                                                Credit Card
                                            </Text>
                                        </Box>

                                        <Box as="div" className="flex items-center">
                                            <input
                                                type="radio"
                                                id="netbanking"
                                                name="payment"
                                                value="netbanking"
                                                className="w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                                            />
                                            <Text as="label" htmlFor="netbanking" className="ml-2 text-sm font-medium text-gray-700">
                                                Net Banking
                                            </Text>
                                        </Box>

                                        <Box as="div" className="flex items-center">
                                            <input
                                                type="radio"
                                                id="upi"
                                                name="payment"
                                                value="upi"
                                                className="w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                                            />
                                            <Text as="label" htmlFor="upi" className="ml-2 text-sm font-medium text-gray-700">
                                                UPI
                                            </Text>
                                        </Box>
                                    </Box>
                                </Box>

                                {/* Agreement Section */}
                                <Box as="div" className="space-y-4">
                                    <Box as="div" className="flex items-start">
                                        <input
                                            type="checkbox"
                                            id="terms"
                                            className="w-4 h-4 mt-1 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                                        />
                                        <Text as="label" htmlFor="terms" className="ml-2 text-sm text-gray-700">
                                            I have read and accepted the Terms and Conditions
                                        </Text>
                                    </Box>
                                </Box>
                            </Box>
                        </AccordionContent>
                    </AccordionItem>

                </Accordion>
            </div>
        </CenterWrapper>
    )
}