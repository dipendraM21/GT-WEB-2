'use client'
import DateInputField from '@/components/shared/TextInputField/DateInputField'
import { ThemeButton } from '@/components/web/core/Button/Button'
import { SelectInputField } from '@/components/web/core/SelectInputField/SelectInputField'
import { getBookingDetailsData } from '@/store/actions/accounting.action'
import { RootState } from '@/store/store'
import { TableColumns } from '@/types/module/adminModules/tableModule'
import { myBookingTypeOptions } from '@/utils/constant'
import { formatDate, formatValue, renderWithFallback } from '@/utils/functions'
import { translation } from '@/utils/translation'
import { MoreOutlined } from '@ant-design/icons'
import { Button, Dropdown } from 'antd'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from 'theme-ui'
import { TablePageComponent } from '../../core/Table/TablePageComponent'

const TransactionList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const { bookingDetailsData, loading } = useSelector(
    (state: RootState) => state.accountingData
  )
  const columns: TableColumns<BookingDetailsData> = [
    { title: 'TxDate', dataIndex: 'txDateTime', key: 'txDateTime' },
    { title: 'Txid', dataIndex: 'txId', key: 'txId' },
    {
      title: 'Sector',
      dataIndex: 'sector',
      key: 'sector',
      render: (value, record, index) => {
        return <div>{renderWithFallback(record?.sector, 'string')}</div>
      },
    },
    {
      title: 'JType',
      dataIndex: 'jType',
      key: 'jType',
      render: (value, record, index) => {
        return <div>{renderWithFallback(record?.jType, 'string')}</div>
      },
    },
    {
      title: 'PaxName',
      dataIndex: 'paxNames',
      key: 'paxNames',
      render: (value, record, index) => {
        return <div>{renderWithFallback(record?.paxNames, 'string')}</div>
      },
    },
    {
      title: 'No. Pax',
      dataIndex: 'numberOfPax',
      key: 'numberOfPax',
      render: (value, record, index) => {
        return <div>{renderWithFallback(record?.numberOfPax, 'number')}</div>
      },
    },
    {
      title: 'SSR Amount',
      dataIndex: 'ssrAmount',
      key: 'ssrAmount',
      render: (value, record, index) => {
        return (
          <div>
            {renderWithFallback(
              formatValue(record?.ssrAmount as number),
              'number'
            )}
          </div>
        )
      },
    },
    {
      title: 'Insurance Amount',
      dataIndex: 'insuranceAmount',
      key: 'insuranceAmount',
      render: (value, record, index) => {
        return (
          <div>
            {renderWithFallback(
              formatValue(record?.insuranceAmount as number),
              'number'
            )}
          </div>
        )
      },
    },
    {
      title: 'Pg Charges',
      dataIndex: 'pgCharges',
      key: 'pgCharges',
      render: (value, record, index) => {
        return (
          <div>
            {renderWithFallback(
              formatValue(record?.pgCharges as number),
              'number'
            )}
          </div>
        )
      },
    },
    {
      title: 'Carrier',
      dataIndex: 'carrier',
      key: 'carrier',
      render: (value, record, index) => {
        return <div>{renderWithFallback(record?.carrier, 'string')}</div>
      },
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
      render: (value, record, index) => {
        return <div>{renderWithFallback(record?.company, 'string')}</div>
      },
    },
    {
      title: 'GdsPnr',
      dataIndex: 'gdsPnr',
      key: 'gdsPnr',
      render: (value, record, index) => {
        return (
          <div>
            {renderWithFallback(
              record?.bookingDetails?.itemInfos?.AIR?.travellerInfos[0]
                ?.pnrDetails?.[record?.sector],
              'string'
            )}
          </div>
        )
      },
    },
    {
      title: 'APnr',
      dataIndex: 'aPnr',
      key: 'aPnr',
      render: (value, record, index) => {
        return (
          <div>
            {renderWithFallback(
              record?.bookingDetails?.itemInfos?.AIR?.travellerInfos[0]
                ?.pnrDetails?.[record?.sector],
              'string'
            )}
          </div>
        )
      },
    },
    {
      title: 'BookedById',
      dataIndex: 'bookedById',
      key: 'bookedById',
      render: (value, record, index) => {
        return <div>{renderWithFallback(record?.bookedById, 'string')}</div>
      },
    },
    {
      title: 'JDate',
      dataIndex: 'jDate',
      key: 'jDate',
      render: (value, record, index) => {
        return <div>{formatDate(record?.jDate)}</div>
      },
    },
    {
      title: 'Book.Status',
      dataIndex: 'bookStatus',
      key: 'bookStatus',
      render: (value, record, index) => {
        return <div>{renderWithFallback(record?.bookStatus, 'string')}</div>
      },
    },
    {
      title: 'Erp.Ref',
      dataIndex: 'erpReference',
      key: 'erpReference',
      render: (value, record, index) => {
        return <div>{renderWithFallback(record?.erpReference, 'string')}</div>
      },
    },
    { title: 'Supplier', dataIndex: 'supplier', key: 'supplier' },
    { title: 'Supplier Name', dataIndex: 'supplierName', key: 'supplierName' },
    {
      title: 'Booking Channel',
      dataIndex: 'bookingChannel',
      key: 'bookingChannel',
      render: (value, record, index) => {
        return <div>{renderWithFallback(record?.bookingChannel, 'string')}</div>
      },
    },
    {
      title: 'Domint',
      dataIndex: 'domint',
      key: 'domint',
      render: (value, record, index) => {
        return (
          <div>
            {record?.bookingDetails?.itemInfos?.AIR?.tripInfos[0]?.sI[0]?.da
              ?.countryCode === 'IN' &&
            record?.bookingDetails?.itemInfos?.AIR?.tripInfos[0]?.sI[0]?.aa
              ?.countryCode === 'IN'
              ? 'Domestic'
              : 'International'}
          </div>
        )
      },
    },
    {
      title: 'IsPassthrough',
      dataIndex: 'isPassthrough',
      key: 'isPassthrough',
      render: (value, record, index) => {
        return <div>{record?.isPassThrough ? 'Yes' : 'No'}</div>
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: BookingDetailsData) => (
        <Dropdown
          menu={{
            items: [
              {
                key: 'ticket',
                label: <span>Ticket</span>,
              },
              {
                key: 'orderDetails',
                label: <span>Order Details</span>,
              },
              {
                key: 'invoice',
                label: <span>Invoice</span>,
              },
              {
                key: 'getIndent',
                label: <span>Get Indent</span>,
              },
              {
                key: 'cancel',
                label: <span>Cancel</span>,
              },
              {
                key: 'update',
                label: <span>Update</span>,
              },
              {
                key: 'log',
                label: <span>Log</span>,
              },
              {
                key: 'updatePurchase',
                label: <span>Update Purchase</span>,
              },
              {
                key: 'reschedule',
                label: <span>Reschedule</span>,
              },
              {
                key: 'supplierPaymentStatus',
                label: <span>Supplier Payment Status</span>,
              },
              {
                key: 'uploadDocs',
                label: <span>Upload Docs</span>,
              },
              {
                key: 'updateErpRef',
                label: <span>Update Erp.Ref</span>,
              },
              {
                key: 'updateMiscDetails',
                label: <span>Update Misc Details</span>,
              },
              {
                key: 'billingModule',
                label: <span>Billing Module</span>,
              },
              {
                key: 'pushToAccountingSystem',
                label: <span>Push to Accounting System</span>,
              },
            ],
          }}
          trigger={['click']}
        >
          <Button shape="default" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ]
  const dispatch = useDispatch()
  const InitialValues = {
    fromDate: '',
    toDate: '',
  }

  const formik = useFormik({
    initialValues: InitialValues,
    enableReinitialize: true,
    validateOnMount: true,

    onSubmit: () => {},
  })

  const { setFieldValue, values } = formik

  const handleInputChange = (name: string, value: string) => {
    setFieldValue(name, value)
  }

  const handleSearch = () => {}
  useEffect(() => {
    dispatch(getBookingDetailsData())
  }, [values])
  return (
    <>
      <TablePageComponent
        heading={translation.TRANSACTION_LIST}
        loading={loading}
        columns={columns}
        dataSource={bookingDetailsData || []}
        totalPage={bookingDetailsData?.length}
        pageSize={10}
        hasPagination={true}
        onChange={(page) => {
          setCurrentPage(page)
        }}
        footerContent={
          <>
            <Box
              className="grid gap-4 pb-4"
              sx={{
                gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
                display: 'grid',
              }}
            >
              <SelectInputField
                placeholder="Select Type"
                value={''}
                onChange={() => {}}
                label="Select Type"
                firstInputBox
                options={myBookingTypeOptions}
              />

              <DateInputField
                placeholder="From Date"
                value={values.fromDate}
                onChange={(value) => handleInputChange('fromDate', value)}
                label="From Date"
              />

              <DateInputField
                placeholder="To Date"
                value={values.toDate}
                onChange={(value) => handleInputChange('toDate', value)}
                label="To Date"
              />

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  height: '100%',
                  gridColumn: 'auto',
                  gap: '20px',
                }}
              >
                <ThemeButton
                  wrapperClassName="flex item-center"
                  variant="primaryBlue"
                  onClick={handleSearch}
                  text="Fetch Transactions"
                />
              </Box>
            </Box>
          </>
        }
      />
    </>
  )
}

export default TransactionList
