import { Loader } from '@components/loader'
import { useModuleApi } from '@providers/ModuleProvider'
import { useIsFetching } from '@tanstack/react-query'
import { flexRender } from '@tanstack/react-table'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'

export const CommonCrudTable = () => {
    const API = useModuleApi()
    const isFetching = useIsFetching({ mutationKey: API.crudApi.queryKeys.dataHandlerKey })

    const table = API.moduleRef.tableRef
    if (!table) return null

    return (
        <table className='table'>
            <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id} colSpan={header.colSpan} style={{ width: `${header.getSize()}px` }}>
                                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>

            <tbody style={{ opacity: isFetching ? '0.5' : '1' }}>
                {table.getRowModel().rows.length > 0 ? table.getRowModel().rows.map(row => (
                    <tr data-row-index={row.index} key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                )) : <tr>
                    <td colSpan={table.getAllColumns().length}>
                        {!isFetching && <div className="text-center">No data available !</div>}
                        {(Boolean(isFetching)) && <div className="relative min-h-10">
                            <Loader />
                        </div>
                        }
                    </td>
                </tr>}
            </tbody>
        </table>
    )
}

export const CommonCrudTablePagination = () => {
    const API = useModuleApi()
    const isFetching = useIsFetching({ mutationKey: API.crudApi.queryKeys.dataHandlerKey })

    const table = API.moduleRef.tableRef
    if (!table) return null

    const pageIndex = table.getState().pagination.pageIndex
    const pageSize = Number(table.getState().pagination.pageSize)
    const pageCount = table.getPageCount()

    const totalRows = table.getFilteredRowModel().rows.length
    const startRecord = totalRows === 0 ? 0 : (pageIndex * pageSize) + 1
    const endRecord = startRecord && totalRows ? startRecord + totalRows - 1 : 0

    const paginationItems = getPaginationItems(pageIndex + 1, pageCount);

    return (
        <div className="px-3 py-2 border-t pagination">
            <div className="pagination-show-record-counter">
                <span className='text-nowrap'>Rows per page</span>
                <select disabled={isFetching} value={pageSize} onChange={e => table.setPageSize(Number(e.target.value))} className="form-control max-w-[70px] select-sm">
                    {[5, 10, 20, 30, 50, 100].map(size => (<option key={size} value={size}> {size}  </option>))}
                </select>
            </div>

            <div className="pagination-items">
                <span className="pagination-record-counter">
                    {startRecord}-{endRecord} of {(table.commonCrudState.data.totalRecords) ?? 0}
                </span>

                <div className="pagination-pages">
                    <button onClick={() => table.previousPage()} className="page-btn" disabled={(pageIndex === 0) || isFetching}>
                        <ChevronLeft className="w-4 h-4" />
                    </button>

                    {paginationItems.map((item, i) => (
                        <button
                            disabled={item == '…' || isFetching} key={i + 1} className={`page-btn ${item === pageIndex + 1 ? 'active' : ''}`}
                            onClick={() => item !== "…" && table.setPageIndex(Number(item) - 1)}
                        >
                            {item}
                        </button>
                    ))}

                    <button onClick={() => table.nextPage()} className="page-btn" disabled={pageIndex + 1 === pageCount || pageCount === 0 || isFetching}>
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}

/**
 * Returns an array for rendering pagination buttons: [1, '…', 4, 5, 6, '…', 10]
 * @param {number} current - The current page (1-based)
 * @param {number} total - Total number of pages (1-based)
 * @param {number} [radius=2] - How many pages before/after to show
 */
// eslint-disable-next-line react-refresh/only-export-components
export function getPaginationItems(current, total, radius = 2) {
    if (!current || !total) return [];

    let items = [1];

    if (current === 1 && total === 1) return items;

    if (current > 4) items.push('…');

    let r1 = current - radius;
    let r2 = current + radius;

    for (let i = Math.max(2, r1); i <= Math.min(total, r2); i++) {
        items.push(i);
    }

    if (r2 + 1 < total) items.push('…');
    if (r2 < total) items.push(total);

    return items;
}
