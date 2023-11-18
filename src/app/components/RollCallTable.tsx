'use client';
import {
  Box,
  Button,
  HStack,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  RowData,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { RollCallTableData } from '../types';

declare module '@tanstack/table-core' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

type RollCallTableProps = {
  isEditMode: boolean;
  date: string;
  tableData: RollCallTableData[];
  setTableData: React.Dispatch<React.SetStateAction<RollCallTableData[]>>;
};

const RollCallTable = ({ isEditMode, date, tableData, setTableData }: RollCallTableProps) => {
  const columns = [
    {
      header: '担当日',
      accessorKey: 'date',
    },
    {
      header: '名前',
      accessorKey: 'name',
    },
  ];

  const defaultColumn: Partial<ColumnDef<RollCallTableData>> = {
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

      if (id === 'date') {
        return <Input isReadOnly defaultValue={date + (index + 1).toString() + '日'} />;
      }

      return (
        <Input
          value={value as string}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
          placeholder="例: 3M佐藤太郎"
          isReadOnly={!isEditMode}
        />
      );
    },
  };

  const table = useReactTable<RollCallTableData>({
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
      <VStack>
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
        {isEditMode && (
          <HStack>
            <Button
              onClick={() =>
                setTableData((prevTableData) => [...prevTableData, { day: '', name: '' }])
              }
            >
              行を追加
            </Button>
            <Button
              onClick={() =>
                setTableData((prevTableData) => prevTableData.slice(0, prevTableData.length - 1))
              }
            >
              下から1行を削除
            </Button>
            <Button
              bgColor="red.400"
              color="white"
              onClick={() => setTableData([{ day: '', name: '' }])}
            >
              表をクリア
            </Button>
          </HStack>
        )}
      </VStack>
    </Box>
  );
};

export default RollCallTable;
