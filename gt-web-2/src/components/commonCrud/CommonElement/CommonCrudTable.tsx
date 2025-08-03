import { useIsFetching } from "@tanstack/react-query";
import { flexRender } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { getCommonCrudApiSafe } from "../commonCrudStore";

interface CommonCrudTableProps {
  apiName: string;
}

export const CommonCrudTable: React.FC<CommonCrudTableProps> = ({
  apiName,
}) => {
  const API = getCommonCrudApiSafe(apiName);
  const isFetching = useIsFetching({
    mutationKey: API.crudApi.queryKeys.dataHandlerKey,
  });

  const table = API.moduleRef.tableRef;
  if (!table) return null;

  return (
    <table className="table w-full">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                colSpan={header.colSpan}
                style={{ width: `${header.getSize()}px` }}
                className="px-4 py-2 text-left font-medium text-gray-700 bg-gray-50"
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody style={{ opacity: isFetching ? "0.5" : "1" }}>
        {table.getRowModel().rows.length > 0 ? (
          table.getRowModel().rows.map((row) => (
            <tr
              data-row-index={row.index}
              key={row.id}
              className="hover:bg-gray-50"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2 border-t">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={table.getAllColumns().length}
              className="px-4 py-8 text-center"
            >
              {!isFetching && (
                <div className="text-gray-500">No data available!</div>
              )}
              {Boolean(isFetching) && (
                <div className="relative min-h-10">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                </div>
              )}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export const CommonCrudTablePagination: React.FC<{ apiName: string }> = ({
  apiName,
}) => {
  const API = getCommonCrudApiSafe(apiName);
  const isFetching = useIsFetching({
    mutationKey: API.crudApi.queryKeys.dataHandlerKey,
  });

  const table = API.moduleRef.tableRef;
  if (!table) return null;

  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = Number(table.getState().pagination.pageSize);
  const pageCount = table.getPageCount();

  const totalRows = table.getFilteredRowModel().rows.length;
  const startRecord = totalRows === 0 ? 0 : pageIndex * pageSize + 1;
  const endRecord = startRecord && totalRows ? startRecord + totalRows - 1 : 0;

  const paginationItems = getPaginationItems(pageIndex + 1, pageCount);

  return (
    <div className="px-3 py-2 border-t pagination flex items-center justify-between">
      <div className="pagination-show-record-counter flex items-center gap-2">
        <span className="text-nowrap text-sm text-gray-600">Rows per page</span>
        <select
          disabled={isFetching}
          value={pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
          className="form-control max-w-[70px] select-sm border border-gray-300 rounded px-2 py-1"
        >
          {[5, 10, 20, 30, 50, 100].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div className="pagination-items flex items-center gap-4">
        <span className="pagination-record-counter text-sm text-gray-600">
          {startRecord}-{endRecord} of{" "}
          {(table.getState() as any).data?.totalRecords ?? 0}
        </span>

        <div className="pagination-pages flex items-center gap-1">
          <button
            onClick={() => table.previousPage()}
            className="page-btn p-2 rounded hover:bg-gray-100 disabled:opacity-50"
            disabled={pageIndex === 0 || isFetching}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {paginationItems.map((item, i) => (
            <button
              disabled={item === "…" || isFetching}
              key={i + 1}
              className={`page-btn px-3 py-2 rounded hover:bg-gray-100 disabled:opacity-50 ${
                item === pageIndex + 1 ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() =>
                item !== "…" && table.setPageIndex(Number(item) - 1)
              }
            >
              {item}
            </button>
          ))}

          <button
            onClick={() => table.nextPage()}
            className="page-btn p-2 rounded hover:bg-gray-100 disabled:opacity-50"
            disabled={
              pageIndex + 1 === pageCount || pageCount === 0 || isFetching
            }
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Returns an array for rendering pagination buttons: [1, '…', 4, 5, 6, '…', 10]
 * @param current - The current page (1-based)
 * @param total - Total number of pages (1-based)
 * @param radius - How many pages before/after to show
 */
export function getPaginationItems(
  current: number,
  total: number,
  radius = 2
): (number | string)[] {
  if (!current || !total) return [];

  let items: (number | string)[] = [1];

  if (current === 1 && total === 1) return items;

  if (current > 4) items.push("…");

  let r1 = current - radius;
  let r2 = current + radius;

  for (let i = Math.max(2, r1); i <= Math.min(total, r2); i++) {
    items.push(i);
  }

  if (r2 + 1 < total) items.push("…");
  if (r2 < total) items.push(total);

  return items;
}
