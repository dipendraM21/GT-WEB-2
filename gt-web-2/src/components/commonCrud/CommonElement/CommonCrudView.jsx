import { getSearchParams, setSearchPrams } from '@commonHelper/SearchParams'
import { useModuleApi } from '@providers/ModuleProvider'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import React, { useEffect } from 'react'
import { CommonCrudTable, CommonCrudTablePagination } from '@commonCrud/CommonElement/CommonCrudTable'
import { DeleteRecordModal } from './CommonFormElement'

export const CommonCrudView = ({ columns }) => {
    const API = useModuleApi()
    const { crudHandler: { useDataHandler } } = API.crudApi;
    const { data } = useDataHandler()
    const moduleData = (data && data.data) ?? {}

    const { page = 1, limit = 10 } = getSearchParams()

    // tanstack table 
    API.moduleRef.tableRef = useReactTable({
        data: (moduleData && moduleData.result) ?? [],
        pageCount: Math.ceil((moduleData.totalRecords || 0) / limit),
        columns,
        state: {
            pagination: {
                pageIndex: Number(page) - 1,
                pageSize: limit,
            },
        },
        manualPagination: true,
        getCoreRowModel: getCoreRowModel(),
        onPaginationChange: (updater) => {
            const { pageIndex, pageSize } = typeof updater === 'function' ? updater({ pageIndex: Number(page) - 1, pageSize: limit }) : updater
            setSearchPrams({ page: Number(pageIndex) + 1, limit: pageSize })
        }
    });

    // add for nested component help
    API.moduleRef.tableRef && (API.moduleRef.tableRef['commonCrudState'] = {
        data: moduleData,
    })

    useEffect(() => {
        return () => {
            // API.moduleRef.tableRef = undefined
        }
    }, [])

    return (
        <>
            <div className="border rounded-md">
                <div className="table-wrapper border-0">
                    <CommonCrudTable />
                </div>
                <CommonCrudTablePagination />
            </div>
            <DeleteRecordModal />
        </>
    )
}
