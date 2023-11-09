import { Table, Thead, Tr, Th, Tbody, Td, Input, Box } from '@chakra-ui/react';
import {
  ColumnDef,
  RowData,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';

declare module '@tanstack/table-core' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

type WeeklyCleaningTableData = {
  date: string;
  name: string;
  floor: string;
};

const weeklyCleaningTable: WeeklyCleaningTableData[] = [
  {
    date: '2021/10/01',
    name: '山田',
    floor: '3F',
  },
  {
    date: '2021/10/01',
    name: '太郎',
    floor: '1F',
  },
  {
    date: '2021/10/01',
    name: '山太郎',
    floor: '2F',
  },
  {
    date: '2021/10/01',
    name: '山田太',
    floor: '1F',
  },
  {
    date: '2021/10/01',
    name: '山郎',
    floor: '1F',
  },
];

const WeeklyCleaningTable = () => {
  const [tableData, setTableData] = useState<WeeklyCleaningTableData[]>(weeklyCleaningTable);

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
      accessorKey: 'floor',
    },
  ];

  const defaultColumn: Partial<ColumnDef<WeeklyCleaningTableData>> = {
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

  const table = useReactTable<WeeklyCleaningTableData>({
    data: tableData,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (index: number, columnId: string, value: unknown) => {
        setTableData((prevTableData) => {
          const newData = [...prevTableData];
          newData[index] = {
            ...newData[index],
            [columnId]: value,
          };
          return newData;
        });
      },
    },
  });

  useEffect(() => {
    // バックエンドにデータを送信する処理
    console.log('Sending data to backend:', tableData);
  }, [tableData]);

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

export default WeeklyCleaningTable;
