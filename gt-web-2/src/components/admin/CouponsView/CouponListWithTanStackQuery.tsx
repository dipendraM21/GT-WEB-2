"use client";
import { useSidebar } from "@/components/ui/sidebar";
import { FetchCouponDataProps } from "@/types/module/admin/couponModule";
import { formatValue } from "@/utils/functions";
import { translation } from "@/utils/translation";
import { useQuery } from "@tanstack/react-query";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { AdminCard } from "../../core/Card/AdminCard";
import { ActionDropdown, ActionItem } from "../../core/Table/ActionDropdown";
import { CommonTable } from "../../core/Table/CommonTable";

// Extend the coupon data type to include an id for the table
interface CouponDataWithId extends FetchCouponDataProps {
  id: string;
}

// Dummy data for demonstration
const dummyCoupons: FetchCouponDataProps[] = [
  {
    _id: "CPN001",
    seriesName: "SUMMER2024",
    origin: "DEL",
    destination: "BOM",
    journeyType: "Domestic",
    carrier: "Air India",
    flightNumber: "AI101",
    classType: "Economy",
    depTime: "06:00",
    arrTime: "08:30",
    totalDuration: "2h 30m",
    availableSeats: 45,
    startJourneyDate: "2024-06-15",
    endJourneyDate: "2024-08-31",
    adultTax: 2500,
    childTax: 1800,
    infantTax: 500,
    totalAmount: 4800,
    couponSectors: [],
    createdAt: "2024-01-15T10:30:00Z",
    __v: 0,
  },
  {
    _id: "CPN002",
    seriesName: "WINTER2024",
    origin: "BOM",
    destination: "BLR",
    journeyType: "Domestic",
    carrier: "IndiGo",
    flightNumber: "6E202",
    classType: "Premium Economy",
    depTime: "14:15",
    arrTime: "16:00",
    totalDuration: "1h 45m",
    availableSeats: 32,
    startJourneyDate: "2024-12-01",
    endJourneyDate: "2025-02-28",
    adultTax: 3200,
    childTax: 2400,
    infantTax: 800,
    totalAmount: 6400,
    couponSectors: [],
    createdAt: "2024-01-20T14:45:00Z",
    __v: 0,
  },
  {
    _id: "CPN003",
    seriesName: "INTERNATIONAL2024",
    origin: "DEL",
    destination: "LHR",
    journeyType: "International",
    carrier: "British Airways",
    flightNumber: "BA123",
    classType: "Business",
    depTime: "22:30",
    arrTime: "05:45",
    totalDuration: "8h 15m",
    availableSeats: 18,
    startJourneyDate: "2024-07-01",
    endJourneyDate: "2024-09-30",
    adultTax: 45000,
    childTax: 35000,
    infantTax: 5000,
    totalAmount: 85000,
    couponSectors: [],
    createdAt: "2024-01-25T09:15:00Z",
    __v: 0,
  },
  {
    _id: "CPN004",
    seriesName: "SPRING2024",
    origin: "BLR",
    destination: "HYD",
    journeyType: "Domestic",
    carrier: "Vistara",
    flightNumber: "UK803",
    classType: "Economy",
    depTime: "09:45",
    arrTime: "11:15",
    totalDuration: "1h 30m",
    availableSeats: 56,
    startJourneyDate: "2024-03-01",
    endJourneyDate: "2024-05-31",
    adultTax: 1800,
    childTax: 1200,
    infantTax: 400,
    totalAmount: 3400,
    couponSectors: [],
    createdAt: "2024-01-30T16:20:00Z",
    __v: 0,
  },
  {
    _id: "CPN005",
    seriesName: "MONSOON2024",
    origin: "CCU",
    destination: "DEL",
    journeyType: "Domestic",
    carrier: "SpiceJet",
    flightNumber: "SG456",
    classType: "Economy",
    depTime: "12:30",
    arrTime: "15:45",
    totalDuration: "3h 15m",
    availableSeats: 28,
    startJourneyDate: "2024-06-01",
    endJourneyDate: "2024-08-31",
    adultTax: 2200,
    childTax: 1600,
    infantTax: 600,
    totalAmount: 4400,
    couponSectors: [],
    createdAt: "2024-02-05T11:10:00Z",
    __v: 0,
  },
  {
    _id: "CPN006",
    seriesName: "AUTUMN2024",
    origin: "MAA",
    destination: "DEL",
    journeyType: "Domestic",
    carrier: "Air India",
    flightNumber: "AI789",
    classType: "Premium Economy",
    depTime: "07:00",
    arrTime: "09:30",
    totalDuration: "2h 30m",
    availableSeats: 38,
    startJourneyDate: "2024-09-01",
    endJourneyDate: "2024-11-30",
    adultTax: 2800,
    childTax: 2000,
    infantTax: 700,
    totalAmount: 5500,
    couponSectors: [],
    createdAt: "2024-02-10T13:25:00Z",
    __v: 0,
  },
  {
    _id: "CPN007",
    seriesName: "FESTIVAL2024",
    origin: "DEL",
    destination: "GOA",
    journeyType: "Domestic",
    carrier: "IndiGo",
    flightNumber: "6E345",
    classType: "Economy",
    depTime: "16:45",
    arrTime: "19:15",
    totalDuration: "2h 30m",
    availableSeats: 42,
    startJourneyDate: "2024-10-01",
    endJourneyDate: "2024-12-31",
    adultTax: 3500,
    childTax: 2500,
    infantTax: 900,
    totalAmount: 6900,
    couponSectors: [],
    createdAt: "2024-02-15T15:40:00Z",
    __v: 0,
  },
  {
    _id: "CPN008",
    seriesName: "YEAREND2024",
    origin: "BOM",
    destination: "DEL",
    journeyType: "Domestic",
    carrier: "Vistara",
    flightNumber: "UK567",
    classType: "Business",
    depTime: "20:30",
    arrTime: "22:45",
    totalDuration: "2h 15m",
    availableSeats: 24,
    startJourneyDate: "2024-12-01",
    endJourneyDate: "2025-01-31",
    adultTax: 5500,
    childTax: 4000,
    infantTax: 1200,
    totalAmount: 10700,
    couponSectors: [],
    createdAt: "2024-02-20T10:55:00Z",
    __v: 0,
  },
];

// API function to fetch coupons (commented out for dummy data)
// const fetchCoupons = async (params: {
//   page: number;
//   limit: number;
//   search?: string;
//   sort?: string;
// }) => {
//   const queryParameters = {
//     page: params.page.toString(),
//     limit: params.limit.toString(),
//     ...(params.search && { search: params.search }),
//     ...(params.sort && { sort: params.sort }),
//   };

//   const response = await commonAjax({
//     url: `${process.env.NEXT_PUBLIC_CORE_API_URL}coupons/get-coupons`,
//     method: "GET",
//     params: queryParameters,
//   });

//   return response;
// };

// Mock function to simulate API call with dummy data
const fetchCoupons = async (params: {
  page: number;
  limit: number;
  search?: string;
  sort?: string;
}) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filteredData = [...dummyCoupons];

  // Apply search filter
  if (params.search) {
    const searchTerm = params.search.toLowerCase();
    filteredData = filteredData.filter(
      (coupon) =>
        coupon.seriesName.toLowerCase().includes(searchTerm) ||
        coupon.carrier.toLowerCase().includes(searchTerm) ||
        coupon.flightNumber.toLowerCase().includes(searchTerm) ||
        coupon.origin.toLowerCase().includes(searchTerm) ||
        coupon.destination.toLowerCase().includes(searchTerm)
    );
  }

  // Apply sorting
  if (params.sort) {
    const [field, order] = params.sort.split(":");
    filteredData.sort((a, b) => {
      const aValue = (a as any)[field];
      const bValue = (b as any)[field];

      if (order === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }

  // Apply pagination
  const startIndex = (params.page - 1) * params.limit;
  const endIndex = startIndex + params.limit;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    total: filteredData.length,
    page: params.page,
    limit: params.limit,
  };
};

export default function CouponListWithTanStackQuery() {
  const { state: sidebarState } = useSidebar();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  // Use TanStack Query to fetch data
  const {
    data: couponResponse,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["coupons", currentPage, pageSize, search, sort],
    queryFn: () =>
      fetchCoupons({
        page: currentPage,
        limit: pageSize,
        search,
        sort,
      }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  // Convert data to include id for the table
  const tableData: CouponDataWithId[] = (couponResponse?.data || []).map(
    (item: FetchCouponDataProps) => ({
      ...item,
      id: item._id,
    })
  );

  // Handle page change
  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  // Handle search
  const handleSearch = (searchTerm: string) => {
    setSearch(searchTerm);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle sort
  const handleSort = (sortTerm: string) => {
    setSort(sortTerm);
    setCurrentPage(1); // Reset to first page when sorting
  };

  // Define actions for the dropdown
  const getCouponActions = (): ActionItem<CouponDataWithId>[] => [
    {
      key: "edit",
      label: "Edit",
      icon: Edit,
      onClick: (coupon) => {
        console.log("Edit coupon:", coupon);
        // Add navigation logic here
      },
    },
    {
      key: "delete",
      label: "Delete",
      icon: Trash2,
      onClick: (coupon) => {
        console.log("Delete coupon:", coupon);
        // Add delete logic here
      },
      isDestructive: true,
    },
  ];

  // Define columns for TanStack Table
  const couponColumns = [
    {
      accessorKey: "_id",
      header: "CouponId",
      cell: ({ row }: { row: { original: CouponDataWithId } }) => (
        <Link
          className="text-blue-600 hover:text-blue-800 underline"
          href={"#"}
        >
          {row.original._id}
        </Link>
      ),
    },
    {
      accessorKey: "startJourneyDate",
      header: "JDate",
    },
    {
      accessorKey: "carrier",
      header: "Carrier",
    },
    {
      accessorKey: "flightNumber",
      header: "Flight No",
    },
    {
      accessorKey: "classType",
      header: "Class",
    },
    {
      accessorKey: "depTime",
      header: "Dep Time",
    },
    {
      accessorKey: "arrTime",
      header: "Arr Time",
    },
    {
      accessorKey: "totalDuration",
      header: "Duration",
    },
    {
      accessorKey: "availableSeats",
      header: "Seats",
    },
    {
      accessorKey: "adultTax",
      header: "Adult Tax",
      cell: ({ row }: { row: { original: CouponDataWithId } }) =>
        formatValue(row.original.adultTax),
    },
    {
      accessorKey: "childTax",
      header: "Child Tax",
      cell: ({ row }: { row: { original: CouponDataWithId } }) =>
        formatValue(row.original.childTax),
    },
    {
      accessorKey: "infantTax",
      header: "Infant Tax",
      cell: ({ row }: { row: { original: CouponDataWithId } }) =>
        formatValue(row.original.infantTax),
    },
    {
      accessorKey: "totalAmount",
      header: "Total Amount",
      cell: ({ row }: { row: { original: CouponDataWithId } }) =>
        formatValue(row.original.totalAmount),
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }: { row: { original: CouponDataWithId } }) => (
        <ActionDropdown items={getCouponActions()} record={row.original} />
      ),
    },
  ];

  // Calculate pagination data
  const totalItems = couponResponse?.total || tableData.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const getMaxWidth = () => {
    return sidebarState === "expanded"
      ? "calc(100vw - 280px)"
      : "calc(100vw - 80px)";
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Error loading coupons
          </h3>
          <p className="text-gray-600 mb-4">
            {error instanceof Error ? error.message : "An error occurred"}
          </p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col gap-4 p-4 transition-all duration-300"
      style={{ maxWidth: getMaxWidth() }}
    >
      <AdminCard>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {translation.couponManagement}
          </h1>
        </div>

        <CommonTable
          data={tableData}
          columns={couponColumns}
          isLoading={isLoading}
          hasPagination={true}
          pagination={{
            currentPage,
            pageSize,
            totalItems,
            totalPages,
            onPageChange: handlePageChange,
          }}
          search={{
            value: search,
            onSearch: handleSearch,
            placeholder: "Search coupons...",
          }}
          sort={{
            value: sort,
            onSort: handleSort,
            options: [
              { value: "createdAt:desc", label: "Newest First" },
              { value: "createdAt:asc", label: "Oldest First" },
              { value: "seriesName:asc", label: "Series Name A-Z" },
              { value: "seriesName:desc", label: "Series Name Z-A" },
            ],
          }}
        />
      </AdminCard>
    </div>
  );
}
