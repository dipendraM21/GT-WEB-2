'use client'
import { ThemeButton } from '@/components/core/Button/Button'
import { SelectInputField } from '@/components/core/SelectInputField/SelectInputField'
import { TableColumns } from '@/types/module/admin/tableModule'
import { queueStatusOptions } from '@/utils/constant'
import { formatDate, formatValue } from '@/utils/functions'
import { translation } from '@/utils/translation'
import { useRouter } from 'next/navigation'
import { Box } from 'theme-ui'
import { TablePageComponent } from '../../core/Table/TablePageComponent'

export default function HoldQueuesList() {
  const router = useRouter()
  const couponColumns: TableColumns<BookingDetailsData> = [
    { title: 'Request Date', dataIndex: 'requestDate', key: 'requestDate' },
    { title: 'Tx.ID', dataIndex: 'txId', key: 'txId' },
    { title: 'Reference Id', dataIndex: 'referenceId', key: 'referenceId' },
    {
      title: 'Inv Amount',
      dataIndex: 'invAmount',
      key: 'invAmount',
      render: (value, record, index) => {
        return <div>{formatValue(record?.amount)}</div>
      },
    },
    { title: 'Sector', dataIndex: 'sector', key: 'sector' },
    {
      title: 'Onward JDate',
      dataIndex: 'dept',
      key: 'dept',
      render: (value, record, index) => {
        return (
          <div>{record?.jDate !== null ? formatDate(record?.jDate) : '-'}</div>
        )
      },
    },
    {
      title: 'Return JDate',
      dataIndex: 'jDate',
      key: 'jDate',
      render: (value, record, index) => {
        return (
          <div>{record?.jDate !== null ? formatDate(record?.jDate) : '-'}</div>
        )
      },
    },
    { title: 'Pax Names', dataIndex: 'paxNames', key: 'paxNames' },
    { title: 'Airline pnr', dataIndex: 'airlinePnr', key: 'airlinePnr' },
    { title: 'Gds pnr', dataIndex: 'gdsPnr', key: 'gdsPnr' },
    { title: 'Ticket Number', dataIndex: 'ticketNumber', key: 'ticketNumber' },
    { title: 'Status', dataIndex: 'bookStatus', key: 'bookStatus' },
    { title: 'Is Void', dataIndex: 'isVoid', key: 'isVoid' },
    { title: 'Supplier Name', dataIndex: 'supplier', key: 'supplier' },
    { title: 'Raised By', dataIndex: 'raisedBy', key: 'raisedBy' },
    { title: 'Is Recall', dataIndex: 'isRecall', key: 'isRecall' },
    { title: 'Customer', dataIndex: 'customer', key: 'customer' },
    { title: 'Blocked By', dataIndex: 'bookedById', key: 'bookedById' },
    { title: 'Branch Name', dataIndex: 'branchName', key: 'branchName' },
  ]
  return (
    <div>
      <TablePageComponent
        heading={translation?.HOLD_QUEUES}
        dataSource={[
          {
            _id: '687ac5293e4927e2097e5cfd',
            txId: 'TX-b90c5fc6b229d387',
            sector: 'DEL-BOM',
            jType: 'one-way',
            paxNames: ['Mr Sudhir Jain'],
            numberOfPax: 1,
            amount: 7355.5,
            ssrAmount: null,
            insuranceAmount: null,
            pgCharges: null,
            carrier: 'SG',
            company: 'TGS Pvt Ltd',
            department: null,
            gdsPnr: 'JDRVQN',
            aPnr: 'JDRVQN',
            jDate: '2025-07-18T22:05:29.504Z',
            bookStatus: 'SUCCESS',
            erpReference: null,
            bookedById: 'GT000001',
            bookingType: null,
            supplier: 'Tripjack',
            supplierName: 'Tripjack',
            bookingChannel: null,
            domint: null,
            isPassThrough: false,
            originalRequest: {
              bookingId: 'TJS109501539774',
              paymentInfos: [
                {
                  amount: 7355.5,
                },
              ],
              travellerInfo: [
                {
                  ti: 'Mr',
                  fN: 'Sudhir',
                  lN: 'Jain',
                  pt: 'ADULT',
                },
              ],
              gstInfo: {
                gstNumber: '07AAGCT7826A1ZF',
                email: 'prabhu@technogramsolutions.com',
                registeredName: 'TGS Pvt Ltd',
                mobile: '9538500324',
                address: 'gurugram',
              },
              deliveryInfo: {
                emails: ['heelpatel216@gmail.com'],
                contacts: ['9714411831'],
              },
            },
            response: {
              bookingId: 'TJS109501539774',
              status: {
                success: true,
                httpStatus: 200,
              },
            },
            txDateTime: '2025-07-18T22:05:29.504Z',
            createdAt: '2025-07-18T22:05:29.708Z',
            updatedAt: '2025-07-18T22:05:33.485Z',
            __v: 0,
            bookingDetails: {
              order: {
                bookingId: 'TJS109501539774',
                amount: 7355.5,
                markup: 0,
                deliveryInfo: {
                  emails: ['heelpatel216@gmail.com'],
                  contacts: ['9714411831'],
                },
                status: 'SUCCESS',
                createdOn: '2025-07-19T03:35:29.504',
                isPassportConsentTaken: false,
              },
              itemInfos: {
                AIR: {
                  tripInfos: [
                    {
                      sI: [
                        {
                          id: '293026',
                          fD: {
                            aI: {
                              code: 'SG',
                              name: 'SpiceJet',
                              isLcc: true,
                            },
                            fN: '135',
                            eT: '7M8',
                          },
                          stops: 0,
                          duration: 120,
                          da: {
                            code: 'DEL',
                            name: 'Delhi Indira Gandhi Intl',
                            cityCode: 'DEL',
                            city: 'Delhi',
                            country: 'India',
                            countryCode: 'IN',
                            terminal: 'Terminal 1D',
                          },
                          aa: {
                            code: 'BOM',
                            name: 'Chhatrapati Shivaji',
                            cityCode: 'BOM',
                            city: 'Mumbai',
                            country: 'India',
                            countryCode: 'IN',
                            terminal: 'Terminal 1',
                          },
                          dt: '2025-07-21T03:00',
                          at: '2025-07-21T05:00',
                          iand: false,
                          isRs: false,
                          sN: 0,
                          ifo: false,
                          isbpo: false,
                          israa: true,
                          sid: 4,
                        },
                      ],
                    },
                  ],
                  travellerInfos: [
                    {
                      pnrDetails: {
                        'DEL-BOM': 'JDRVQN',
                      },
                      checkinStatusMap: {
                        'DEL-BOM': false,
                      },
                      fd: {
                        fC: {
                          AT: 65,
                          BF: 5809,
                          MF: 75,
                          TF: 7355.5,
                          YQ: 900,
                          MFT: 13.5,
                          PSF: 91,
                          RCF: 50,
                          UDF: 12,
                          AGST: 340,
                          IGST: 13.5,
                        },
                        sfc: {
                          BF: 5809,
                          UDF: 12,
                          AGST: 340,
                          RCF: 50,
                          PSF: 91,
                          YQ: 900,
                          AT: 65,
                        },
                        bI: {
                          iB: '15 Kg',
                          cB: '7 Kg',
                        },
                        rT: 2,
                        cc: 'ECONOMY',
                        cB: 'RS',
                        fB: 'LSAV',
                        mI: false,
                      },
                      ti: 'Mr',
                      pt: 'ADULT',
                      fN: 'Sudhir',
                      lN: 'Jain',
                      ipct: false,
                    },
                  ],
                  totalPriceInfo: {
                    totalFareDetail: {
                      fC: {
                        BF: 5809,
                        IGST: 13.5,
                        TAF: 1546.5,
                        TF: 7355.5,
                        NF: 7355.5,
                      },
                      afC: {
                        TAF: {
                          MFT: 13.5,
                          AGST: 340,
                          MF: 75,
                          OT: 218,
                          YQ: 900,
                        },
                      },
                    },
                  },
                },
              },
              gstInfo: {
                gstNumber: '07AAGCT7826A1ZF',
                email: 'prabhu@technogramsolutions.com',
                mobile: '9538500324',
                address: 'gurugram',
                registeredName: 'TGS Pvt Ltd',
                bookingId: 'TJS109501539774',
                bookingUserId: '212649',
                id: 29241,
              },
              isSotoBooking: false,
              status: {
                success: true,
                httpStatus: 200,
              },
            },
          },
        ]}
        columns={couponColumns}
        hasPagination
        footerContent={
          <>
            <Box className="flex justify-content-between items-center mb-3">
              <Box className="flex items-center gap-2 m-0">
                <ThemeButton
                  variant="primaryBlue"
                  wrapperClassName="flex item-center"
                  btnColor="blue_primary_button"
                  text="PDF"
                />
                <ThemeButton
                  variant="primaryBlue"
                  wrapperClassName="flex item-center"
                  btnColor="blue_primary_button"
                  text="Excel"
                />
                <ThemeButton
                  variant="primaryBlue"
                  wrapperClassName="flex item-center"
                  btnColor="blue_primary_button"
                  text="Copy"
                />
                <ThemeButton
                  variant="primaryBlue"
                  wrapperClassName="flex item-center"
                  btnColor="blue_primary_button !important"
                  text="Print"
                />
              </Box>
              <SelectInputField
                placeholder="Select Queue"
                label="Select Queue Status"
                wrapperClass="w-80"
                value={''}
                firstInputBox
                options={queueStatusOptions}
                onChange={function (e: {
                  value?: string | boolean
                  label?: string
                }): void {
                  throw new Error('Function not implemented.')
                }}
              />
            </Box>
            {/* <Box className="flex justify-content-between">
              <Box className="flex items-center flex-wrap gap-2">
                <ThemeButton
                  className="cta-button tertiary-button-focused justify-end"
                  text="PDF"
                  key={`table-fillter`}
                  variant="secondary"
                />
              </Box>

              <div className="gp-8 table-fillter-container flex items-center">
                <ThemeButton
                  variant="primary"
                  className="cta-button"
                  text={translation?.SEARCH}
                />
                <SelectInputField
                  placeholder="Select Queue"
                  label="Select Queue Status"
                  value={''}
                  options={queueStatusOptions}
                  onChange={function (e: {
                    value?: string | boolean
                    label?: string
                  }): void {
                    throw new Error('Function not implemented.')
                  }}
                />
              </div>
            </Box> */}
          </>
        }
      />
    </div>
  )
}
