"use client";
import { useSidebar } from "@/components/ui/sidebar";
import { FetchCouponDataProps } from "@/types/module/admin/couponModule";
import { formatValue } from "@/utils/functions";
import { translation } from "@/utils/translation";
import { useQuery } from "@tanstack/react-query";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { commonAjax } from "../../commonCrud/commonAjax";
import { AdminCard } from "../../core/Card/AdminCard";
import { ActionDropdown, ActionItem } from "../../core/Table/ActionDropdown";
import { CommonTable } from "../../core/Table/CommonTable";

// Extend the coupon data type to include an id for the table
interface CouponDataWithId extends FetchCouponDataProps {
  id: string;
}

// API function to fetch coupons
const fetchCoupons = async (params: {
  page: number;
  limit: number;
  search?: string;
  sort?: string;
}) => {
  const queryParameters = {
    page: params.page.toString(),
    limit: params.limit.toString(),
    ...(params.search && { search: params.search }),
    ...(params.sort && { sort: params.sort }),
  };

  const response = await commonAjax({
    url: `${process.env.NEXT_PUBLIC_CORE_API_URL}coupons/get-coupons`,
    method: "GET",
    params: queryParameters,
  });

  return response;
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
      cell: ({ row }: { row: any }) => (
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
      cell: ({ row }: { row: any }) => formatValue(row.original.adultTax),
    },
    {
      accessorKey: "childTax",
      header: "Child Tax",
      cell: ({ row }: { row: any }) => formatValue(row.original.childTax),
    },
    {
      accessorKey: "infantTax",
      header: "Infant Tax",
      cell: ({ row }: { row: any }) => formatValue(row.original.infantTax),
    },
    {
      accessorKey: "totalAmount",
      header: "Total Amount",
      cell: ({ row }: { row: any }) => formatValue(row.original.totalAmount),
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }: { row: any }) => (
        <ActionDropdown items={getCouponActions()} record={row.original} />
      ),
    },
  ];

  // Calculate pagination data
  const totalItems = couponResponse?.total || tableData.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const getMaxWidth = () => {
    return sidebarState.isOpen ? "calc(100vw - 280px)" : "calc(100vw - 80px)";
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
