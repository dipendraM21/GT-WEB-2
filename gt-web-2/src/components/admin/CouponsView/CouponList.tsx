"use client";
import { useSidebar } from "@/components/ui/sidebar";
import { getCouponDetails } from "@/store/actions/coupon.action";
import { RootState } from "@/store/store";
import { FetchCouponDataProps } from "@/types/module/admin/couponModule";
import { formatValue } from "@/utils/functions";
import { appRoutes } from "@/utils/routes";
import { translation } from "@/utils/translation";
import { ColumnDef, SortingState } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { AdminCard } from "../../core/Card/AdminCard";
import { ActionDropdown, ActionItem } from "../../core/Table/ActionDropdown";
import { CommonTable } from "../../core/Table/CommonTable";

// Extend the coupon data type to include an id for the table
interface CouponDataWithId extends FetchCouponDataProps {
  id: string;
}

export default function CouponList() {
  const dispatch = useDispatch();
  const { getCouponDetailsData, loading } = useSelector(
    (state: RootState) => state.couponData
  );
  const [sorting, setSorting] = useState<SortingState>([]);
  const { state: sidebarState } = useSidebar();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Convert data to include id for the table
  const tableData: CouponDataWithId[] = (getCouponDetailsData || []).map(
    (item) => ({
      ...item,
      id: item._id,
    })
  );

  // Calculate pagination data
  const totalItems = tableData.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = tableData.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
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
  const couponColumns: ColumnDef<CouponDataWithId>[] = [
    {
      accessorKey: "_id",
      header: "CouponId",
      cell: ({ row }) => (
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
      header: "FlightNo",
    },
    {
      accessorKey: "depTime",
      header: "Deptime",
    },
    {
      accessorKey: "arrTime",
      header: "Arrtime",
    },
    {
      id: "route",
      header: "From - To",
      cell: ({ row }) => `${row.original.origin} - ${row.original.destination}`,
    },
    {
      accessorKey: "availableSeats",
      header: "TotalSeats",
    },
    {
      accessorKey: "availableSeats",
      header: "AvailSeats",
    },
    {
      accessorKey: "adultTax",
      header: "A Tax",
    },
    {
      accessorKey: "childTax",
      header: "C Tax",
    },
    {
      accessorKey: "infantTax",
      header: "I Tax",
    },
    {
      accessorKey: "totalAmount",
      header: "Total Amount",
      cell: ({ row }) => <div>{formatValue(row.original.totalAmount)}</div>,
    },
    {
      accessorKey: "classType",
      header: "Type",
    },
    {
      id: "endDate",
      header: "EndDate",
      cell: ({ row }) => (
        <div>{row.original.couponSectors?.[0]?.arrTime || "-"}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
          Active
        </span>
      ),
    },
    {
      id: "dayWiseAvailability",
      header: "DayWise Avail",
      cell: () => <span>-</span>,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <ActionDropdown<CouponDataWithId>
          actions={getCouponActions()}
          record={row.original}
        />
      ),
    },
  ];

  useEffect(() => {
    dispatch(getCouponDetails());
  }, [dispatch]);

  // Calculate max width based on sidebar state
  const getMaxWidth = () => {
    return sidebarState === "collapsed" ? "100%" : "1545px";
  };

  return (
    <AdminCard
      heading={translation?.COUPON_LIST}
      subtitle="Manage and view all available coupons"
      actionButtonConfig={{
        text: "Add coupon",
        sx: { background: "#0047AB" },
        icon: <IoMdAdd color="white" size={24} />,
        href: appRoutes?.addCoupon,
      }}
    >
      <div style={{ maxWidth: getMaxWidth(), width: "100%" }}>
        <CommonTable<CouponDataWithId>
          columns={couponColumns}
          data={paginatedData}
          isLoading={loading}
          dataLength={totalItems}
          className="coupon-list-table"
          sortable={false}
          // Pagination props
          hasPagination={true}
          currentPage={currentPage}
          totalPage={totalItems}
          pageSize={pageSize}
          defaultPageSize={10}
          showQuickJumper={true}
          onPageChange={handlePageChange}
        />
      </div>
    </AdminCard>
  );
}
