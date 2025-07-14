import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import NoData from '../component/admin/NoData'

const DisplayTable = ({ data, columns }) => {
  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (!data || data.length === 0) {
    return <div>
        <NoData />
    </div>;
  }

  return (
    <div className="p-2 ">
      <table className="w-full border-collapse capitalize text-center">
        <thead  >
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className="bg-gray-500 text-white  ">
              {headerGroup.headers.map(header => (
                <th 
                  key={header.id} 
                  className="p-3 "
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map(cell => (
                <td 
                  key={cell.id} 
                  className="p-3 border  border-gray-400"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayTable;
