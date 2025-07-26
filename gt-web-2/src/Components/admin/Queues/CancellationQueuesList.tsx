'use client'
import { ThemeButton } from '@/components/web/core/Button/Button'
import { SelectInputField } from '@/components/web/core/SelectInputField/SelectInputField'
import { getBookingDetailsData } from '@/store/actions/accounting.action'
import { RootState } from '@/store/store'
import { TableColumns } from '@/types/module/adminModules/tableModule'
import { queueStatusOptions } from '@/utils/constant'
import { formatDate, formatValue } from '@/utils/functions'
import { translation } from '@/utils/translation'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from 'theme-ui'
import { TablePageComponent } from '../../core/Table/TablePageComponent'

export default function CancellationQueuesList() {
  const dispatch = useDispatch()
  const { bookingDetailsData, loading } = useSelector(
    (state: RootState) => state.accountingData
  )
  const couponColumns: TableColumns<BookingDetailsData> = [
    {
      title: 'Request Date',
      dataIndex: 'bookingDetails',
      key: 'bookingDetails',
      render: (value, record, index) => {
        return <div>{formatDate(record?.bookingDetails?.order?.createdOn)}</div>
      },
    },
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
      key: 'onwardDate',
      render: (_, record) => {
        return (
          <div>
            {formatDate(
              record?.bookingDetails?.itemInfos?.AIR?.tripInfos[0]?.sI[0]?.dt
            )}
          </div>
        )
      },
    },
    {
      title: 'Return JDate',
      key: 'returnDate',
      render: (_, record) => {
        return (
          <div>
            {formatDate(
              record?.bookingDetails?.itemInfos?.AIR?.tripInfos[0]?.sI[0]?.at
            )}
          </div>
        )
      },
    },
    { title: 'Pax Names', dataIndex: 'paxNames', key: 'paxNames' },
    {
      title: 'Airline pnr',
      dataIndex: 'airlinePnr',
      key: 'airlinePnr',
      render: (_, record) => {
        return (
          <div>
            {
              record?.bookingDetails?.itemInfos?.AIR?.travellerInfos?.[0]
                ?.pnrDetails?.[record?.sector]
            }
          </div>
        )
      },
    },
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
  useEffect(() => {
    dispatch(getBookingDetailsData())
  }, [])

  return (
    <TablePageComponent
      heading={translation?.CANCELLATION_QUEUES}
      dataSource={bookingDetailsData ?? []}
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
  )
}
