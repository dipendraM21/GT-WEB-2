"use client";
import { createCommonCrud } from "@/components/commonCrud/createCommonCrud";
import { AdminCard } from "@/components/core/Card/AdminCard";
import {
  ActionDropdown,
  ActionItem,
} from "@/components/core/Table/ActionDropdown";
import { CommonTable } from "@/components/core/Table/CommonTable";
import { useSidebar } from "@/components/ui/sidebar";
import { FetchCouponDataProps } from "@/types/module/admin/couponModule";
import { formatValue } from "@/utils/functions";
import { appRoutes } from "@/utils/routes";
import { translation } from "@/utils/translation";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { IoMdAdd } from "react-icons/io";

// Extend the coupon data type to include an id for the table
interface CouponDataWithId extends FetchCouponDataProps {
  id: string;
}

// Create the CRUD API for coupons
const couponCrudApi = createCommonCrud({
  apiName: "coupons",
  apiUrl: "/api/coupons",
  pageTitle: "Coupon Management",
  initialState: {
    // Add any additional state here
  },
  reducers: {
    // Add custom reducers here
  },
  crudApi: {
    formCrud: {
      action_alias: "coupon",
    },
    tableCrud: {
      action_alias: "coupons",
    },
  },
});

export default function CouponListWithCommonCrud() {
  const { state: sidebarState } = useSidebar();
  const API = getCommonCrudApiSafe("coupons");
  const {
    useDataHandler,
    addRecordHandler,
    editRecordHandler,
    deleteRecordHandler,
  } = API.crudApi.crudHandler;

  // Get coupon data using commonCrud
  const { data: couponData, isLoading } = useDataHandler({
    queryKey: ["coupons-list"],
    data: {
      page: 1,
      limit: 10,
      search: "",
      sort: "",
    },
  });

  // Convert data to include id for the table
  const tableData: CouponDataWithId[] = (couponData?.data || []).map(
    (item: FetchCouponDataProps) => ({
      ...item,
      id: item._id,
    })
  );

  // Define actions for the dropdown
  const getCouponActions = (): ActionItem<CouponDataWithId>[] => [
    {
      key: "edit",
      label: "Edit",
      icon: Edit,
      onClick: (coupon) => {
        console.log("Edit coupon:", coupon);
        editRecordHandler({ data: coupon });
      },
    },
    {
      key: "delete",
      label: "Delete",
      icon: Trash2,
      onClick: (coupon) => {
        console.log("Delete coupon:", coupon);
        deleteRecordHandler({ data: coupon });
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
      cell: ({ row }: { row: any }) =>
        `${row.original.origin} - ${row.original.destination}`,
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
      cell: ({ row }: { row: any }) => (
        <div>{formatValue(row.original.totalAmount)}</div>
      ),
    },
    {
      accessorKey: "classType",
      header: "Type",
    },
    {
      id: "endDate",
      header: "EndDate",
      cell: ({ row }: { row: any }) => (
        <div>{row.original.couponSectors?.[0]?.arrTime || "-"}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: { row: any }) => (
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
      cell: ({ row }: { row: any }) => (
        <ActionDropdown<CouponDataWithId>
          actions={getCouponActions()}
          record={row.original}
        />
      ),
    },
  ];

  // Handle page change
  const handlePageChange = (page: number, size: number) => {
    // Update the query with new pagination parameters
    // This would typically trigger a new API call
    console.log("Page changed:", page, size);
  };

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
        onClick: () => addRecordHandler(), // Use commonCrud add handler
      }}
    >
      <div style={{ maxWidth: getMaxWidth(), width: "100%" }}>
        <CommonTable<CouponDataWithId>
          columns={couponColumns}
          data={tableData}
          isLoading={isLoading}
          dataLength={couponData?.totalRecords || 0}
          className="coupon-list-table"
          sortable={false}
          // Pagination props
          hasPagination={true}
          currentPage={couponData?.currentPage || 1}
          totalPage={couponData?.totalPages || 0}
          pageSize={couponData?.limit || 10}
          defaultPageSize={10}
          showQuickJumper={true}
          onPageChange={handlePageChange}
        />
      </div>
    </AdminCard>
  );
}
