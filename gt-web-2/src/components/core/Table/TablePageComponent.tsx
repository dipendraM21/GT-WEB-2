import { TableColumnsType } from 'antd'
import { CommonTable } from './Table'
import { AdminCard, AdminCardProps } from '../Card/AdminCard'
import { CommonTableProps } from '@/types/module/admin/tableModule'

interface TablePageComponentProps<T>
  extends AdminCardProps,
    CommonTableProps<T> {
  dataSource: T[]
  columns: TableColumnsType<T>
}

export const TablePageComponent = <T extends { _id?: string }>({
  dataSource,
  columns,
  ...props
}: TablePageComponentProps<T>) => {
  return (
    <AdminCard {...props}>
      <CommonTable
        {...props}
        columns={columns as TableColumnsType}
        dataSource={dataSource?.map((item) => ({
          ...item,
          key: item._id || Math.random().toString(),
        }))}
      />
    </AdminCard>
  )
}
