"use client";
import { ThemeButton } from "@/components/core/Button/Button";
import { AdminCard } from "@/components/core/Card/AdminCard";
import {
  ActionDropdown,
  ActionItem,
} from "@/components/core/Table/ActionDropdown";
import { CommonTable } from "@/components/core/Table/CommonTable";
import { CustomText } from "@/components/core/Text";
import { getUsersData, manageUserAccess } from "@/store/actions/user.action";
import {
  ApprovalStatus,
  UserData,
  UserPermissionsActions,
} from "@/types/module/admin/userModule";
import { MainStoreType } from "@/types/store/reducers/main.reducers";
import { appRoutes } from "@/utils/routes";
import { ColumnDef } from "@tanstack/react-table";
import { Calendar, Eye, FileText, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function UserListing() {
  const dispatch = useDispatch();
  const itemsPerPage = 10;
  const getUserData = useSelector((state: MainStoreType) => state.userData);
  const currentUserStatus = useSelector(
    (state: MainStoreType) => state.userData?.currentUserStatus
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [queryValue, setQueryValue] = useState<string>("");
  const router = useRouter();

  const handleClick = (type: UserPermissionsActions, email: string) => {
    dispatch(
      manageUserAccess(
        {
          userEmailId: email,
          approvedByAdmin: type === UserPermissionsActions.ALLOW ? true : false,
        },
        () => {}
      )
    );
  };

  useEffect(() => {
    if (currentPage) {
      router.push(
        `?currentpage=${currentPage}?userstatus=${currentUserStatus}`
      );
    }
  }, [router, currentPage, currentUserStatus]);

  useEffect(() => {
    return () => {
      dispatch(getUsersData());
    };
  }, [dispatch]);

  useEffect(() => {
    if (currentPage || currentUserStatus) {
      dispatch(
        getUsersData({
          pageNo: currentPage,
          userStatus: currentUserStatus as string,
        })
      );
    }
  }, [dispatch, currentPage, currentUserStatus]);

  const userListColumns: ColumnDef<UserDataWithId>[] = [
    {
      accessorFn: (_, index) => (currentPage - 1) * itemsPerPage + index + 1,
      header: "Sr",
      cell: ({ getValue }) => getValue(),
    },
    {
      accessorKey: "firstName",
      header: "Name",
      cell: ({ row }) => (
        <Link
          className="text-decoration-unset user-link-primary"
          href={`${appRoutes?.userRequests}/${row.original._id}`}
        >
          <CustomText
            variant="font-16-medium-20"
            color="primary-blue-700"
            className="text-decoration-unset user-link-primary"
          >
            {`${row.original.firstName} ${row.original.lastName}`}
          </CustomText>
        </Link>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "mobileNumber",
      header: "Phone Number",
    },
    {
      accessorKey: "address.city",
      header: "City",
      cell: ({ row }) => row.original.address.city,
    },
    {
      accessorKey: "registerAs",
      header: "Register As",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <ActionDropdown<UserData>
          actions={getTableActions(row.original)}
          record={row.original}
        />
      ),
    },
  ];

  const handleFilterChange = (value: string) => {
    setQueryValue(value);
  };

  const handleClickSubmit = useCallback(() => {
    dispatch(
      getUsersData({
        pageNo: currentPage,
        userStatus: currentUserStatus as string,
        queryParameter: queryValue,
      })
    );
  }, [dispatch, currentPage, currentUserStatus, queryValue]);

  const handleClickCancel = () => {
    setQueryValue("");
    dispatch(
      getUsersData({
        pageNo: currentPage,
        userStatus: currentUserStatus as string,
        queryParameter: "",
      })
    );
  };

  const handleDetails = (record: UserData) => {
    // Implement navigation or modal for details
  };

  const handleShowTicket = (record: UserData) => {
    // Implement navigation or modal for ticket
  };

  const handleCancel = (record: UserData) => {
    // Implement cancel logic
  };

  const handleReschedule = (record: UserData) => {
    // Implement reschedule logic
  };

  // Define actions for the dropdown
  const getTableActions = (record: UserData): ActionItem<UserData>[] => [
    {
      key: "details",
      label: "Details",
      icon: Eye,
      onClick: handleDetails,
    },
    {
      key: "showTicket",
      label: "Show Ticket",
      icon: FileText,
      onClick: handleShowTicket,
    },
    {
      key: "cancel",
      label: "Cancel",
      icon: X,
      onClick: handleCancel,
      isDestructive: true,
    },
    {
      key: "reschedule",
      label: "Reschedule",
      icon: Calendar,
      onClick: handleReschedule,
    },
  ];

  // Create a type that extends UserData with id
  type UserDataWithId = UserData & { id: string };

  // Dummy data for testing
  const dummyUserData: UserDataWithId[] = [
    {
      _id: "1",
      id: "1",
      title: "Mr",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      mobileNumber: "+91 9876543210",
      userName: "johndoe",
      companyName: "Tech Solutions Inc",
      registerAs: "Individual",
      isAdmin: false,
      panNumber: "ABCDE1234F",
      nameOnPan: "John Doe",
      landline: "022-12345678",
      faxNo: "022-12345679",
      userTNC: true,
      approvalStatus: "approved" as ApprovalStatus,
      password: "hashedpassword",
      __v: 0,
      gstNumber: "22AAAAA0000A1Z5",
      address: {
        addressLine1: "123 Main Street",
        addressLine2: "Apartment 4B",
        city: "Mumbai",
        state: "Maharashtra",
        pinCode: "400001",
        country: "India",
      },
    },
    {
      _id: "2",
      id: "2",
      title: "Ms",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      mobileNumber: "+91 9876543211",
      userName: "janesmith",
      companyName: "Digital Marketing Pro",
      registerAs: "Business",
      isAdmin: false,
      panNumber: "FGHIJ5678K",
      nameOnPan: "Jane Smith",
      landline: "022-12345680",
      faxNo: "022-12345681",
      userTNC: true,
      approvalStatus: "pending" as ApprovalStatus,
      password: "hashedpassword",
      __v: 0,
      gstNumber: "27BBBBB0000B2Z6",
      address: {
        addressLine1: "456 Business Park",
        addressLine2: "Floor 3",
        city: "Delhi",
        state: "Delhi",
        pinCode: "110001",
        country: "India",
      },
    },
    {
      _id: "3",
      id: "3",
      title: "Dr",
      firstName: "Robert",
      lastName: "Johnson",
      email: "robert.johnson@example.com",
      mobileNumber: "+91 9876543212",
      userName: "robertjohnson",
      companyName: "Healthcare Solutions",
      registerAs: "Individual",
      isAdmin: false,
      panNumber: "KLMNO9012P",
      nameOnPan: "Robert Johnson",
      landline: "022-12345682",
      faxNo: "022-12345683",
      userTNC: true,
      approvalStatus: "approved" as ApprovalStatus,
      password: "hashedpassword",
      __v: 0,
      gstNumber: "33CCCCC0000C3Z7",
      address: {
        addressLine1: "789 Medical Center",
        addressLine2: "Suite 101",
        city: "Bangalore",
        state: "Karnataka",
        pinCode: "560001",
        country: "India",
      },
    },
    {
      _id: "4",
      id: "4",
      title: "Mrs",
      firstName: "Sarah",
      lastName: "Williams",
      email: "sarah.williams@example.com",
      mobileNumber: "+91 9876543213",
      userName: "sarahwilliams",
      companyName: "Creative Design Studio",
      registerAs: "Business",
      isAdmin: false,
      panNumber: "PQRST3456U",
      nameOnPan: "Sarah Williams",
      landline: "022-12345684",
      faxNo: "022-12345685",
      userTNC: true,
      approvalStatus: "rejected" as ApprovalStatus,
      password: "hashedpassword",
      __v: 0,
      gstNumber: "44DDDDD0000D4Z8",
      address: {
        addressLine1: "321 Creative Lane",
        addressLine2: "Studio 5",
        city: "Chennai",
        state: "Tamil Nadu",
        pinCode: "600001",
        country: "India",
      },
    },
    {
      _id: "5",
      id: "5",
      title: "Mr",
      firstName: "Michael",
      lastName: "Brown",
      email: "michael.brown@example.com",
      mobileNumber: "+91 9876543214",
      userName: "michaelbrown",
      companyName: "Financial Services Ltd",
      registerAs: "Individual",
      isAdmin: false,
      panNumber: "UVWXY6789Z",
      nameOnPan: "Michael Brown",
      landline: "022-12345686",
      faxNo: "022-12345687",
      userTNC: true,
      approvalStatus: "pending" as ApprovalStatus,
      password: "hashedpassword",
      __v: 0,
      gstNumber: "55EEEEE0000E5Z9",
      address: {
        addressLine1: "654 Finance Street",
        addressLine2: "Tower 2",
        city: "Hyderabad",
        state: "Telangana",
        pinCode: "500001",
        country: "India",
      },
    },
  ];

  // Add unique id to each user data for the table
  const tableData =
    ((getUserData?.data?.users as UserData[])?.map((user, index) => ({
      ...user,
      id: user._id || `user-${index}`,
    })) as UserDataWithId[]) || dummyUserData;

  return (
    <AdminCard
      heading="User List"
      subtitle="Manage and view all registered users"
    >
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          {/* <div className="flex items-center flex-wrap gap-2">
            {UserListFillterData?.map((itm, idx) => (
              <ThemeButton
                className="cta-button tertiary-button-focused justify-end"
                text={itm?.label}
                sx={{
                  backgroundColor:
                    currentUserStatus === itm?.key
                      ? "disableDarkBlue"
                      : "yellow_status_bg",
                }}
                textSx={{
                  color:
                    currentUserStatus === itm?.key
                      ? "white"
                      : "primary_text_dark",
                }}
                key={`table-fillter-${idx}`}
                onClick={() => {
                  setCurrentPage(1);
                  dispatch(setCurrentUserStatus(itm?.key));
                }}
                variant="secondary"
              />
            ))}
          </div> */}

          {/* <div className="flex items-center gap-2">
            <ThemeButton
              variant="primary"
              className="cta-button"
              onClick={handleClickSubmit}
              text={translation?.SEARCH}
            />
            <TextInputField
              firstInputBox
              value={queryValue}
              onChange={handleFilterChange}
              Inputsx={{ borderRadius: "6px" }}
              inputWidth="table-fillter-input"
              placeholder="Search users..."
            />
          </div> */}
        </div>
      </div>

      <CommonTable<UserDataWithId>
        columns={userListColumns}
        data={tableData}
        isLoading={getUserData.loading}
        dataLength={tableData.length}
        className="user-listing-table"
      />

      {getUserData?.data?.totalUsers > itemsPerPage && (
        <div className="flex justify-center mt-6">
          <div className="flex items-center gap-2">
            <ThemeButton
              variant="secondary"
              text="Previous"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            />
            <span className="px-4 py-2 text-gray-700">
              Page {currentPage} of{" "}
              {Math.ceil((getUserData?.data?.totalUsers || 0) / itemsPerPage)}
            </span>
            <ThemeButton
              variant="secondary"
              text="Next"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={
                currentPage >=
                Math.ceil((getUserData?.data?.totalUsers || 0) / itemsPerPage)
              }
            />
          </div>
        </div>
      )}
    </AdminCard>
  );
}
