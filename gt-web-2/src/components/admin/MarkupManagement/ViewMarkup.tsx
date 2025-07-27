'use client'
import { getMarkupDetails } from '@/store/actions/coupon.action'
import { RootState } from '@/store/store'
import { Markup } from '@/types/module/admin/markupModule'
import { TableColumns } from '@/types/module/admin/tableModule'
import { ITEMS_PER_PAGE } from '@/utils/constant'
import { appRoutes } from '@/utils/routes'
import { translation } from '@/utils/translation'
import { MoreOutlined } from '@ant-design/icons'
import { Button, Dropdown } from 'antd'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { TablePageComponent } from '../../core/Table/TablePageComponent'

const ViewMarkup = () => {
  const dispatch = useDispatch()
  const { getMarkupDetailsData, loading } = useSelector(
    (state: RootState) => state.couponData
  )
  const [currentPage, setCurrentPage] = useState<number>(1)

  const columns: TableColumns<Markup> = [
    {
      title: 'Sr',
      dataIndex: 'sr',
      key: 'sr',
      render: (_: string, __: Markup, index: number) =>
        (currentPage - 1) * ITEMS_PER_PAGE + index + 1,
    },
    { title: 'Markup ID', dataIndex: 'markupId', key: 'markupId' },
    { title: 'Added By', dataIndex: 'createdBy', key: 'createdBy' },
    {
      title: 'Carrier',
      dataIndex: 'carrier',
      key: 'carrier',
    },
    {
      title: 'Service Type',
      dataIndex: 'category',
      key: 'category',
    },
    { title: 'Flat', dataIndex: 'flat', key: 'flat' },
    {
      title: 'Markup',
      dataIndex: 'markup',
      key: 'markup',
    },
    {
      title: 'YQ',
      dataIndex: 'bookStatus',
      key: 'bookStatus',
      render: (value, record, index) => {
        return (
          <div>
            {record?.airlineType === 'Percentage'
              ? `${record?.markup}%`
              : `${record?.flat}`}
          </div>
        )
      },
    },
    {
      title: 'Tax',
      dataIndex: 'bookStatus',
      key: 'bookStatus',
      render: (value, record, index) => {
        return (
          <div>
            {record?.airlineType === 'Percentage'
              ? `${record?.markup}%`
              : `${record?.flat}`}
          </div>
        )
      },
    },

    {
      title: 'Actions',
      key: 'actions',
      render: (_, record: Markup) => (
        <Dropdown
          menu={{
            items: [
              {
                key: 'details',
                label: <span>Edit</span>,
              },
              {
                key: 'showTicket',
                label: <span>Delete</span>,
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
  const InitialValues = {
    transactionId: '',
    sector: '',
    bookingDate: '',
    passengerName: '',
    gdsPnr: '',
    airlinePnr: '',
    bookingStatus: '',
    paxInfo: '',
    journeyDate: '',
    ticketNumbers: '',
  }
  const formik = useFormik({
    initialValues: InitialValues,
    enableReinitialize: true,
    validateOnMount: true,
    // validationSchema: signupValidationSchema,
    onSubmit: () => {},
  })

  const { setFieldValue, values } = formik

  const handleInputChange = (name: string, value: string) => {
    setFieldValue(name, value)
  }
  useEffect(() => {
    dispatch(getMarkupDetails())
  }, [])

  const handleReset = () => {}

  const handleSearch = () => {}

  return (
    <>
      <TablePageComponent
        heading={translation?.MARKUP_LIST}
        columns={columns}
        dataSource={getMarkupDetailsData || []}
        actionButtonConfig={{
          text: translation?.ADD_MARKUP,
          sx: { background: '#0047AB' },
          icon: <IoMdAdd color="white" size={24} />,
          href: appRoutes?.addMarkup,
        }}
        loading={loading}
        pageSize={10}
        hasPagination={true}
        onChange={(page) => {
          setCurrentPage(page)
        }}
      />
    </>
  )
}

export default ViewMarkup
