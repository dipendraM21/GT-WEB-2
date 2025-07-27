'use client'
import { CommonTableProps } from '@/types/module/admin/tableModule'
import { Table } from 'antd'

export const CommonTable = <T extends object>({
  loading,
  bordered = false,
  hasPagination,
  className,
  currentPage,
  totalPage,
  showQuickJumper = true,
  responsive = true,
  defaultPageSize,
  onChange,
  columns,
  dataSource,
  pageSize,
}: CommonTableProps<T>) => {
  return (
    <div className="table-responsive">
      <Table<T>
        scroll={{ x: 'max-content' }}
        loading={loading}
        bordered={bordered}
        className={className}
        style={{ width: '100%' }}
        pagination={
          hasPagination
            ? {
                defaultCurrent: currentPage,
                onChange: onChange,
                total: totalPage,
                defaultPageSize: defaultPageSize,
                responsive: responsive,
                showQuickJumper: showQuickJumper,
                showSizeChanger: false,
                pageSize: pageSize,
              }
            : false
        }
        columns={columns}
        dataSource={dataSource}
      />
    </div>
  )
}
