'use client'
import { getBookingDetailsData } from '@/store/actions/accounting.action'
import { RootState } from '@/store/store'
import { TableColumns } from '@/types/module/adminModules/tableModule'
import { formatDate } from '@/utils/functions'
import { translation } from '@/utils/translation'
import { MoreOutlined } from '@ant-design/icons'
import { Button, Dropdown } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TablePageComponent } from '../../core/Table/TablePageComponent'

export default function RescheduleQueuesList() {
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const { bookingDetailsData, loading } = useSelector(
    (state: RootState) => state.accountingData
  )
  useEffect(() => {
    dispatch(getBookingDetailsData())
  }, [])

  const couponColumns: TableColumns<BookingDetailsData> = [
    { title: 'Txid', dataIndex: 'txId', key: 'txId' },
    {
      title: 'TxDate',
      dataIndex: 'txDateTime',
      key: 'txDateTime',
      render: (value: string) => new Date(value).toLocaleString(),
    },
    {
      title: 'Resc OW Date',
      dataIndex: 'txDateTime',
      key: 'txDateTime',
      render: (value: string) => <div>{formatDate(value)}</div>,
    },
    {
      title: 'Resc RT Date',
      dataIndex: 'rescRtDate',
      key: 'rescRtDate',
      render: () => '-',
    },
    { title: 'Agentid', dataIndex: 'bookedById', key: 'bookedById' },
    {
      title: 'Referencetxid',
      dataIndex: 'referenceTxId',
      key: 'referenceTxId',
      render: () => '-',
    },
    {
      title: 'Ticket No.',
      dataIndex: 'ticketNumber',
      key: 'ticketNumber',
      render: () => '-',
    },
    {
      title: 'Pax Name',
      dataIndex: 'paxNames',
      key: 'paxNames',
      render: (names: string[]) => names.join(', '),
    },
    { title: 'PNR', dataIndex: 'gdsPnr', key: 'gdsPnr' },
    {
      title: 'Onward Date',
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
      title: 'Return Date',
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
    {
      title: 'Remarks',
      dataIndex: 'remarks',
      key: 'remarks',
      render: () => '-',
    },
    {
      title: 'Contact Name',
      dataIndex: 'paxNames',
      key: 'paxNames',
      render: (names: string[]) => names.join(', '),
    },
    {
      title: 'Contact Number',
      key: 'contactNumber',
      render: (_, record) =>
        record?.bookingDetails?.order?.deliveryInfo?.contacts?.[0] ?? '-',
    },
    { title: 'Status', dataIndex: 'bookStatus', key: 'bookStatus' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: BookingDetailsData) => (
        <Dropdown
          menu={{
            items: [
              {
                key: 'reject',
                label: <span>Reject</span>,
              },
              {
                key: 'reschedule_queue',
                label: <span>Reschedule</span>,
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
  return (
    <div>
      <TablePageComponent
        heading={translation?.RESCHEDULE_QUEUES}
        dataSource={bookingDetailsData ?? []}
        columns={couponColumns}
        loading={loading}
        hasPagination
        totalPage={bookingDetailsData?.length}
        pageSize={10}
        onChange={(page) => {
          setCurrentPage(page)
        }}
      />
    </div>
  )
}
