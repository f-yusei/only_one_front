import { Table, Thead, Tr, Th, Tbody, Td, Input, Box } from '@chakra-ui/react';
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  RowData,
} from '@tanstack/react-table';
import { useState, useEffect } from 'react';

type MonthlyCleaningTableData = {
  date: string;
  name: string;
  place: string;
};

const monthlyCleaningTable: MonthlyCleaningTableData[] = [
  {
    date: '2021/10/01',
    name: '山田',
    place: '落ち葉',
  },
  {
    date: '2021/10/01',
    name: '太郎',
    place: '管理棟',
  },
  {
    date: '2021/10/01',
    name: '山太郎',
    place: '2F',
  },
  {
    date: '2021/10/01',
    name: '山田太',
    place: '1F',
  },
  {
    date: '2021/10/01',
    name: '山郎',
    place: '1F',
  },
];

declare module '@tanstack/table-core' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

const MonthlyCleaningTable = () => {
  const columns = [
    {
      header: '実施日',
      accessorKey: 'date',
    },
    {
      header: '名前',
      accessorKey: 'name',
    },
    {
      header: '清掃場所',
      accessorKey: 'place',
    },
  ];
  const defaultColumn: Partial<ColumnDef<MonthlyCleaningTableData>> = {
    cell: ({ getValue, row: { index }, column: { id }, table }) => {
      const initialValue = getValue();
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [value, setValue] = useState(initialValue);

      const onBlur = () => {
        table.options.meta?.updateData(index, id, value);
      };

      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        setValue(initialValue);
      }, [initialValue]);

      return (
        <Input value={value as string} onChange={(e) => setValue(e.target.value)} onBlur={onBlur} />
      );
    },
  };

  const table = useReactTable<MonthlyCleaningTableData>({
    data: monthlyCleaningTable,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (index: number, columnId: string, value: unknown) => {
        console.log(`updateData: index=${index}, columnId=${columnId}, value=${value}`);
      },
    },
  });
  return (
    <Box>
      <Table>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default MonthlyCleaningTable;
