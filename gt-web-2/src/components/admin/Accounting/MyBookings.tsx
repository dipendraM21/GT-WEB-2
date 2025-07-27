'use client'
import DateInputField from '@/components/core/TextInputField/DateInputField'
import { ThemeButton } from '@/components/core/Button/Button'
import { SelectInputField } from '@/components/core/SelectInputField/SelectInputField'
import { getBookingDetailsData } from '@/store/actions/accounting.action'
import { RootState } from '@/store/store'
import { TableColumns } from '@/types/module/admin/tableModule'
import { ITEMS_PER_PAGE, myBookingTypeOptions } from '@/utils/constant'
import { formatDate, formatValue } from '@/utils/functions'
import { translation } from '@/utils/translation'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from 'theme-ui'
import { TablePageComponent } from '../../core/Table/TablePageComponent'

const MyBookings = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const { bookingDetailsData, loading } = useSelector(
    (state: RootState) => state.accountingData
  )
  const ledgerColumns: TableColumns<BookingDetailsData> = [
    {
      title: 'Sr',
      dataIndex: 'sr',
      key: 'sr',
      render: (_: string, __: BookingDetailsData, index: number) =>
        (currentPage - 1) * ITEMS_PER_PAGE + index + 1,
    },
    { title: 'TxID', dataIndex: 'txId', key: 'txId' },
    // { title: 'Select', dataIndex: 'select', key: 'select' }, // ADD To LAST
    {
      title: 'Booking Date',
      dataIndex: 'jDate',
      key: 'jDate',
      render: (value, record, index) => {
        return <div>{formatDate(record?.txDateTime)}</div>
      },
    },
    {
      title: 'Dept',
      dataIndex: 'dept',
      key: 'dept',
      render: (value, record, index) => {
        return (
          <div>{record?.jDate !== null ? formatDate(record?.jDate) : '-'}</div>
        )
      },
    },

    {
      title: 'JDate',
      dataIndex: 'jDate',
      key: 'jDate',
      render: (value, record, index) => {
        return (
          <div>{record?.jDate !== null ? formatDate(record?.jDate) : '-'}</div>
        )
      },
    },
    {
      title: 'InvAmt',
      dataIndex: 'amount',
      key: 'amount',
      render: (value, record, index) => {
        return <div>{formatValue(record?.amount)}</div>
      },
    },
    {
      title: 'FQ',
      dataIndex: 'fq',
      key: 'fq',
      render: (value, record, index) => {
        return <div>{formatValue(record?.amount)}</div>
      },
    },
    {
      title: 'Comm',
      dataIndex: 'comm',
      key: 'comm',
      render: (value, record, index) => {
        return <div>0</div>
      },
    },
    { title: 'Booked By Id', dataIndex: 'bookedById', key: 'bookedById' },
    // { title: 'Booked By Name', dataIndex: 'bookedByName', key: 'bookedByName' },
    {
      title: 'Lead Pax Name',
      dataIndex: 'leadPaxName',
      key: 'leadPaxName',
      render: (value, record, index) => {
        return <div>{record?.paxNames[0]}</div>
      },
    },
    {
      title: 'Carrier',
      dataIndex: 'carrier',
      key: 'carrier',
    },
    {
      title: 'Origin - Dstn',
      dataIndex: 'bookingDetails',
      key: 'bookingDetails',
      render: (value, record, index) => {
        return (
          <div>
            {
              record?.bookingDetails?.itemInfos?.AIR?.tripInfos[0]?.sI[0]?.da
                ?.code
            }
            -
            {
              record?.bookingDetails?.itemInfos?.AIR?.tripInfos[0]?.sI[0]?.aa
                ?.code
            }
          </div>
        )
      },
    },
    { title: 'PNR', dataIndex: 'gdsPnr', key: 'gdsPnr' },
    { title: 'Status', dataIndex: 'bookStatus', key: 'bookStatus' },
    { title: 'Agent', dataIndex: 'company', key: 'company' },
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
        heading={translation.MY_BOOKINGS}
        loading={loading}
        columns={ledgerColumns}
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
                  text="Get Report"
                />
              </Box>
            </Box>
          </>
        }
      />
    </>
  )
}

export default MyBookings
