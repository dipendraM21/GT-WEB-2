import { TableColumnType } from 'antd'
import { ThemeUIStyleObject } from 'theme-ui'
import { CommonFillterData } from '../core/commonModule'
import { AdminCardProps } from '@/components/core/Card/AdminCard'

export type TableColumns<T> = TableColumnType<T>[]

export interface CommonTableProps<T> {
  loading?: boolean
  bordered?: boolean
  showPagination?: boolean
  showQuickJumper?: boolean
  responsive?: boolean
  hasPagination?: boolean
  className?: string
  pageTitleVariant?: string
  currentPage?: number
  totalPage?: number
  pageSize?: number
  defaultPageSize?: number
  onChange?: (page: number, pageSize: number) => void
  columns: TableColumns<T>
  dataSource: T[]
}

export interface TablePageComponentProps<T> extends CommonTableProps<T> {
  pageTitle?: string
  description?: string
  btnTitle?: string
  isShowButton?: boolean
  filltering?: CommonFillterData[]
  activeTab?: string
  submitBtnTitle?: string
  cancelBtnTitle?: string
  onClickfilltering?: (value: CommonFillterData) => void
  cancelBtnClick?: () => void
  submitBtnClick?: () => void
  cancelBtnSx?: ThemeUIStyleObject
  wrapperSx?: ThemeUIStyleObject
  submitBtnSx?: ThemeUIStyleObject
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
  Inputsx?: ThemeUIStyleObject
  placeholder?: string
  variant?: string
  customClassName?: string
  wrapperClass?: string
  name?: string
  value?: string
  onInputChange?: (e: string) => void
  onFocus?: React.FocusEventHandler<HTMLInputElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement>
  adminCardProps?: Partial<AdminCardProps>
}
