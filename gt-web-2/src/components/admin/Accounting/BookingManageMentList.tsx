"use client";
import { ThemeButton } from "@/components/core/Button/Button";
import { SelectInputField } from "@/components/core/SelectInputField/SelectInputField";
import DateInputField from "@/components/core/TextInputField/DateInputField";
import { TextInputField } from "@/components/core/TextInputField/TextInputField";
import { getMyBookingDetailsData } from "@/store/actions/accounting.action";
import { RootState } from "@/store/store";
import { BookingDetailsDataProps } from "@/types/module/admin/bookingDetailsModule";
import { TableColumns } from "@/types/module/admin/tableModule";
import { BookingTypeOptions, ITEMS_PER_PAGE } from "@/utils/constant";
import { formatDate } from "@/utils/functions";
import { translation } from "@/utils/translation";
import { Menu } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "theme-ui";
import { TablePageComponent } from "../../core/Table/TablePageComponent";

const statusColors: Record<string, string> = {
  confirmed: "green",
  pending: "gold",
  cancelled: "red",
};

const actionMenu = (record: BookingDetailsDataProps) => (
  <Menu>
    <Menu.Item key="details">Details</Menu.Item>
    <Menu.Item key="showTicket">Show Ticket</Menu.Item>
    <Menu.Item key="cancel">Cancel</Menu.Item>
    <Menu.Item key="reschedule">Reschedule</Menu.Item>
  </Menu>
);
const BookingManageMentList = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filterValues, setFilterValues] = useState({
    transactionId: "",
    sector: "",
    bookingDate: "",
    passengerName: "",
    gdsPnr: "",
    airlinePnr: "",
    bookingStatus: "",
    paxInfo: "",
    journeyDate: "",
    ticketNumbers: "",
  });

  const { myBookingDetailsData, loading } = useSelector(
    (state: RootState) => state.accountingData
  );
  const myBookingDetailsDataArray = myBookingDetailsData
    ? [myBookingDetailsData]
    : [];

  const columns: TableColumns<BookingDetailsDataProps> = [
    {
      title: "Sr",
      dataIndex: "sr",
      key: "sr",
      render: (_: string, __: BookingDetailsDataProps, index: number) =>
        (currentPage - 1) * ITEMS_PER_PAGE + index + 1,
    },
    { title: "Tx.ID", dataIndex: "txId", key: "txId" },
    {
      title: "Sector",
      dataIndex: "sector",
      key: "sector",
      render: (value, record, index) => {
        return (
          <div>
            {record?.itemInfos?.AIR?.tripInfos[0]?.sI[0]?.da?.code} -{" "}
            {record?.itemInfos?.AIR?.tripInfos[0]?.sI[0]?.aa?.code}
          </div>
        );
      },
    },
    {
      title: "Booking Date",
      dataIndex: "order",
      key: "order",
      render: (value, record, index) => {
        return <div>{formatDate(record?.order?.createdOn)}</div>;
      },
    },
    {
      title: "Passenger Name",
      dataIndex: "leadPaxName",
      key: "leadPaxName",
      render: (value, record, index) => {
        const traveller = record?.itemInfos?.AIR?.travellerInfos[0];
        const passengerName = `${traveller?.ti} ${traveller?.fN} ${traveller?.lN}`;
        return <div>{passengerName}</div>;
      },
    },
    { title: "GDSPNR", dataIndex: "gdsPnr", key: "gdsPnr" },
    { title: "AirlinePnr", dataIndex: "aPnr", key: "aPnr" },
    {
      title: "BookingStatus",
      dataIndex: "order",
      key: "order",
      render: (value, record, index) => {
        return <div>{record?.order?.status}</div>;
      },
    },

    {
      title: "Actions",
      key: "actions",
      // render: (_: any, record: BookingDetailsData) => (
      //   <Dropdown menu={{ items: actionMenu(record) }} trigger={['click']}>
      //     <Button shape="default" icon={<MoreOutlined />} />
      //   </Dropdown>
      // ),
    },
  ];

  const handleInputChange = (name: string, value: string) => {
    setFilterValues({ ...filterValues, [name]: value });
  };

  const handleSearch = () => {
    dispatch(
      getMyBookingDetailsData({
        bookingId: filterValues?.transactionId,
      })
    );
  };

  const handleReset = () => {
    setFilterValues({
      transactionId: "",
      sector: "",
      bookingDate: "",
      passengerName: "",
      gdsPnr: "",
      airlinePnr: "",
      bookingStatus: "",
      paxInfo: "",
      journeyDate: "",
      ticketNumbers: "",
    });
  };

  return (
    <div>
      <TablePageComponent
        heading={translation.BOOKING_MANAGEMENT}
        columns={columns}
        dataSource={[
          {
            order: {
              bookingId: "TJS100201539186",
              amount: 5764,
              markup: 0,
              deliveryInfo: {
                emails: ["heelpatel216@gmail.com"],
                contacts: ["9714411841"],
              },
              status: "PENDING",
              createdOn: "2025-07-18T17:13:28.744",
              isPassportConsentTaken: false,
            },
            itemInfos: {
              AIR: {
                tripInfos: [
                  {
                    sI: [
                      {
                        id: "292954",
                        fD: {
                          aI: {
                            code: "6E",
                            name: "IndiGo",
                            isLcc: true,
                          },
                          fN: "6814",
                          eT: "321",
                        },
                        stops: 0,
                        duration: 135,
                        da: {
                          code: "DEL",
                          name: "Delhi Indira Gandhi Intl",
                          cityCode: "DEL",
                          city: "Delhi",
                          country: "India",
                          countryCode: "IN",
                          terminal: "Terminal 1",
                        },
                        aa: {
                          code: "BOM",
                          name: "Chhatrapati Shivaji",
                          cityCode: "BOM",
                          city: "Mumbai",
                          country: "India",
                          countryCode: "IN",
                          terminal: "Terminal 2",
                        },
                        dt: "2025-07-21T07:00",
                        at: "2025-07-21T09:15",
                        iand: false,
                        isRs: false,
                        sN: 0,
                        ifo: false,
                        isbpo: false,
                        israa: true,
                        sid: 5,
                      },
                    ],
                  },
                ],
                travellerInfos: [
                  {
                    checkinStatusMap: {
                      "DEL-BOM": false,
                    },
                    fd: {
                      fC: {
                        AT: 336,
                        BF: 4768,
                        OC: 167,
                        TF: 5764,
                        YQ: 0,
                        UDF: 241,
                        AGST: 252,
                      },
                      sfc: {
                        BF: 4768,
                        UDF: 241,
                        AGST: 252,
                        YQ: 0,
                        AT: 336,
                        OC: 167,
                      },
                      bI: {
                        iB: "15 Kg (01 Piece only)",
                        cB: "7 Kg",
                      },
                      rT: 1,
                      cc: "ECONOMY",
                      cB: "M",
                      fB: "RMIP",
                      mI: false,
                    },
                    ti: "Mr",
                    pt: "ADULT",
                    fN: "Teser",
                    lN: "AdultA",
                    ipct: false,
                  },
                ],
                totalPriceInfo: {
                  totalFareDetail: {
                    fC: {
                      BF: 4768,
                      TAF: 996,
                      TF: 5764,
                      NF: 5764,
                    },
                    afC: {
                      TAF: {
                        AGST: 252,
                        OT: 744,
                        YQ: 0,
                      },
                    },
                  },
                },
              },
            },
            gstInfo: {
              gstNumber: "07AAGCT7826A1ZF",
              email: "prabhu@technogramsolutions.com",
              mobile: "9538500324",
              address: "gurugram",
              registeredName: "TGS Pvt Ltd",
              bookingId: "TJS100201539186",
              bookingUserId: "212649",
              id: 29233,
              info: {},
            },
            isSotoBooking: false,
            status: {
              success: true,
              httpStatus: 200,
            },
          },
        ]}
        totalPage={myBookingDetailsDataArray?.length}
        pageSize={10}
        hasPagination={true}
        loading={loading}
        onChange={(page) => {
          setCurrentPage(page);
        }}
        footerContent={
          <>
            <Box
              className="grid gap-4 pb-4"
              sx={{
                gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
                display: "grid",
              }}
            >
              <TextInputField
                placeholder="Enter Txid"
                firstInputBox
                name="transactionId"
                value={filterValues?.transactionId}
                onChange={(value) => handleInputChange("transactionId", value)}
                label="Transaction ID"
              />

              <SelectInputField
                placeholder="Booking Type"
                firstInputBox
                label="Booking Type"
                value={filterValues?.bookingStatus}
                classNames={{
                  container: () => "w-full",
                  control: () => "w-full",
                }}
                onChange={(value) =>
                  handleInputChange("bookingStatus", value?.value as string)
                }
                options={BookingTypeOptions}
                labelSx={{ display: "block", textAlign: "start" }}
              />

              <DateInputField
                placeholder="Booking Date"
                value={filterValues?.bookingDate}
                onChange={(value) => handleInputChange("bookingDate", value)}
                label="Booking Date"
              />

              <DateInputField
                placeholder="Journey Date"
                value={filterValues?.journeyDate}
                onChange={(value) => handleInputChange("journeyDate", value)}
                label="Journey Date"
              />

              <TextInputField
                firstInputBox
                placeholder="Ticket Numbers"
                name="ticketNumbers"
                value={filterValues?.ticketNumbers}
                onChange={(value) => handleInputChange("ticketNumbers", value)}
                label="Ticket Numbers"
              />

              <TextInputField
                placeholder="GdsPnr"
                firstInputBox
                name="gdsPnr"
                value={filterValues?.gdsPnr}
                onChange={(value) => handleInputChange("gdsPnr", value)}
                label="GdsPnr"
              />

              <TextInputField
                placeholder="Airline Pnr"
                name="airlinePnr"
                firstInputBox
                value={filterValues?.airlinePnr}
                onChange={(value) => handleInputChange("airlinePnr", value)}
                label="Airline Pnr"
              />

              <TextInputField
                placeholder="Pax Info"
                name="paxInfo"
                firstInputBox
                value={filterValues?.paxInfo}
                onChange={(value) => handleInputChange("paxInfo", value)}
                label="Pax Info"
              />

              <TextInputField
                placeholder="Passenger Name"
                name="passengerName"
                firstInputBox
                value={filterValues?.passengerName}
                onChange={(value) => handleInputChange("passengerName", value)}
                label="Passenger Name"
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  // justifyContent: 'flex-end',
                  height: "100%",
                  gridColumn: "auto",
                }}
              >
                <ThemeButton onClick={handleSearch} text="Search" />
              </Box>
            </Box>
          </>
        }
      />
    </div>
  );
};

export default BookingManageMentList;
