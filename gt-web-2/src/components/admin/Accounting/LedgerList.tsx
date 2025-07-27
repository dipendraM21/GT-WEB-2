'use client'
import DateInputField from '@/components/core/TextInputField/DateInputField'
import { ThemeButton } from '@/components/core/Button/Button'
import { TableColumns } from '@/types/module/admin/tableModule'
import { translation } from '@/utils/translation'
import { useFormik } from 'formik'
import { LuDownload } from 'react-icons/lu'
import { Box } from 'theme-ui'
import { TablePageComponent } from '../../core/Table/TablePageComponent'

interface LedgerData {
  _id?: string
  date: string
  type: string
  txReference: string
  debit: number
  credit: number
  balance: number
  paxName: string
  invoiceNumber: string
  referenceNumber: string
}

const ledgerMockData: LedgerData[] = [
  {
    _id: '1',
    date: '01 Sep 2021',
    type: 'OPENING BALANCE',
    txReference: 'OPENING BALANCE',
    debit: 0,
    credit: 0,
    balance: -4091,
    paxName: '',
    invoiceNumber: '',
    referenceNumber: '',
  },
  {
    _id: '2',
    date: '10 Jul 2025',
    type: 'CLOSING BALANCE',
    txReference: 'CLOSING BALANCE',
    debit: 0,
    credit: 0,
    balance: -4091,
    paxName: '',
    invoiceNumber: '',
    referenceNumber: '',
  },
]

const ledgerColumns: TableColumns<LedgerData> = [
  { title: 'Date', dataIndex: 'date', key: 'date' },
  { title: 'Type', dataIndex: 'type', key: 'type' },
  { title: 'TxReference', dataIndex: 'txReference', key: 'txReference' },
  { title: 'Debit', dataIndex: 'debit', key: 'debit' },
  { title: 'Credit', dataIndex: 'credit', key: 'credit' },
  {
    title: 'Balance',
    dataIndex: 'balance',
    key: 'balance',
    render: (value: number) => value.toLocaleString(),
  },
  { title: 'PaxName', dataIndex: 'paxName', key: 'paxName' },
  { title: 'Invoice Number', dataIndex: 'invoiceNumber', key: 'invoiceNumber' },
  {
    title: 'Reference Number',
    dataIndex: 'referenceNumber',
    key: 'referenceNumber',
  },
]

const LedgerList = () => {
  const InitialValues = {
    fromDate: '',
    toDate: '',
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

  const handleSearch = () => {}

  return (
    <>
      <TablePageComponent
        heading={translation.LEDGER_MANAGEMENT}
        columns={ledgerColumns}
        dataSource={ledgerMockData}
        hasPagination={false}
        footerContent={
          <>
            <Box
              className="grid gap-4 pb-4"
              sx={{
                gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
                display: 'grid',
              }}
            >
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
                <ThemeButton onClick={handleSearch} text="Search" />
                <ThemeButton
                  wrapperClassName="flex item-center"
                  sx={{ background: '#0047AB' }}
                  onClick={handleSearch}
                  text="Export to CSV"
                  icon={<LuDownload size={20} color="white" />}
                />
              </Box>
            </Box>
          </>
        }
      />
    </>
  )
}

export default LedgerList
