'use client'
import { getCouponDetails } from '@/store/actions/coupon.action'
import { RootState } from '@/store/store'
import { FetchCouponDataProps } from '@/types/module/admin/couponModule'
import { TableColumns } from '@/types/module/admin/tableModule'
import { formatValue } from '@/utils/functions'
import { appRoutes } from '@/utils/routes'
import { translation } from '@/utils/translation'
import { MoreOutlined } from '@ant-design/icons'
import { Button, Dropdown } from 'antd'
import Link from 'next/link'
import { useEffect } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { TablePageComponent } from '../../core/Table/TablePageComponent'

export default function CouponList() {
  const dispatch = useDispatch()
  const { getCouponDetailsData, loading } = useSelector(
    (state: RootState) => state.couponData
  )

  const couponColumns: TableColumns<FetchCouponDataProps> = [
    {
      title: 'CouponId',
      dataIndex: '_id',
      key: '_id',
      render: (value, record, index) => {
        return (
          <Link className="text-decoration-unset user-link-primary" href={'#'}>
            {record._id}
          </Link>
        )
      },
    },
    { title: 'JDate', dataIndex: 'startJourneyDate', key: 'startJourneyDate' },
    { title: 'Carrier', dataIndex: 'carrier', key: 'carrier' },
    { title: 'FlightNo', dataIndex: 'flightNumber', key: 'flightNumber' },
    { title: 'Deptime', dataIndex: 'depTime', key: 'depTime' },
    { title: 'Arrtime', dataIndex: 'arrTime', key: 'arrTime' },
    {
      title: 'From - To',
      key: 'route',
      render: (_, record) => `${record?.origin} - ${record?.destination}`,
    },
    { title: 'TotalSeats', dataIndex: 'availableSeats', key: 'availableSeats' },
    { title: 'AvailSeats', dataIndex: 'availableSeats', key: 'availableSeats' },
    { title: 'A Tax', dataIndex: 'adultTax', key: 'adultTax' },
    { title: 'C Tax', dataIndex: 'childTax', key: 'childTax' },
    { title: 'I Tax', dataIndex: 'infantTax', key: 'infantTax' },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (value, record, index) => {
        return <div>{formatValue(record?.totalAmount as number)},</div>
      },
    },
    { title: 'Type', dataIndex: 'classType', key: 'classType' },
    {
      title: 'EndDate',
      dataIndex: 'couponSectors',
      key: 'couponSectors',
      render: (value, record, index) => {
        return <div>{record?.couponSectors?.[0]?.arrTime},</div>
      },
    },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    {
      title: 'DayWise Avail',
      key: 'dayWiseAvailability',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record: FetchCouponDataProps) => (
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
  useEffect(() => {
    dispatch(getCouponDetails())
  }, [])

  return (
    <div>
      <TablePageComponent
        heading={translation?.COUPON_LIST}
        dataSource={getCouponDetailsData || []}
        columns={couponColumns}
        loading={loading}
        hasPagination
        actionButtonConfig={{
          text: 'Add coupon',
          sx: { background: '#0047AB' },
          icon: <IoMdAdd color="white" size={24} />,
          href: appRoutes?.addCoupon,
        }}
      />
    </div>
  )
}
