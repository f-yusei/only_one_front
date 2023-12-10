import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Input,
  Box,
  Button,
  HStack,
  VStack,
} from '@chakra-ui/react';
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  RowData,
} from '@tanstack/react-table';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { ActionMeta, MultiValue, Select, GroupBase } from 'chakra-react-select';
import StudentName, { MonthlyCleaningTableData } from '../types';

declare module '@tanstack/table-core' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

type MonthlyCleaningTableProps = {
  tableData: MonthlyCleaningTableData[];
  setTableData: Dispatch<SetStateAction<MonthlyCleaningTableData[]>>;
  isEditMode: boolean;
};

const MonthlyCleaningTable = ({
  isEditMode,
  tableData,
  setTableData,
}: MonthlyCleaningTableProps) => {
  const columns = [
    {
      header: '実施日',
      accessorKey: 'date',
    },
    {
      header: '名前',
      accessorKey: 'names',
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

      //TODO: 変更が反映されない
      if (id === 'names') {
        return (
          <MultiSelectNames
            isEditMode={isEditMode}
            onBlur={onBlur}
            rowIndex={index}
            tableData={tableData}
            setTableData={setTableData}
          />
        );
      }

      return (
        <Input
          value={value as string}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
          placeholder="例: 28"
          isReadOnly={!isEditMode}
        />
      );
    },
  };

  const table = useReactTable<MonthlyCleaningTableData>({
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
                setTableData((prevTableData) => [...prevTableData, { date: '', names: [] }])
              }
            >
              行を追加
            </Button>
            <Button
              bgColor="red.400"
              color="white"
              onClick={() => setTableData([{ date: '', names: [] }])}
            >
              表をクリア
            </Button>
          </HStack>
        )}
      </VStack>
    </Box>
  );
};

export default MonthlyCleaningTable;

type Props = {
  onBlur: () => void;
  tableData: MonthlyCleaningTableData[];
  setTableData: Dispatch<SetStateAction<MonthlyCleaningTableData[]>>;
  rowIndex: number;
  isEditMode: boolean;
};

const MultiSelectNames = ({ onBlur, tableData, setTableData, rowIndex, isEditMode }: Props) => {
  const studentNames: StudentName[] = [
    new StudentName('3I 毛利k', '3I 毛利k', 'gray'),
    new StudentName('3I 村上', '3I 村上', 'blue'),
    new StudentName('2I 蔵田', '2I 蔵田', 'yellow'),
    new StudentName('3I 置田', '3I 置田', 'pink'),
    new StudentName('3C 宮川', '3C 宮川', 'green'),
    new StudentName('3M 中村', '3M 中村', 'red'),
    new StudentName('3E 嵐', '3E 嵐', 'purple'),
    new StudentName('3A 早瀬', '3A 早瀬', 'teal'),
    new StudentName('3M 田中', '3M 田中', 'orange'),
  ];

  const handleOnChangeSelectedNames = (
    _newValue: MultiValue<StudentName>,
    actionMeta: ActionMeta<StudentName>
  ) => {
    switch (actionMeta.action) {
      case 'select-option':
        if (actionMeta.option) {
          const StudentName = actionMeta.option;
          setTableData((prevTableData) => {
            //tableの名前を変更する処理
            const newData = [...prevTableData];
            newData[rowIndex] = {
              ...newData[rowIndex],
              names: [...newData[rowIndex].names, StudentName],
            };
            return newData;
          });
          break;
        }
        break;
      case 'remove-value':
      case 'pop-value':
        if (actionMeta.removedValue) {
          const toDeleteStudentName = actionMeta.removedValue;
          setTableData((prevTableData) => {
            //tableの名前の削除処理
            const newData = [...prevTableData];
            newData[rowIndex] = {
              ...newData[rowIndex],
              names: newData[rowIndex].names.filter(
                (StudentName) => StudentName.value != toDeleteStudentName.value
              ),
            };
            return newData;
          });
          break;
        }
        break;

      case 'clear':
        setTableData((prevTableData) => {
          //tableの名前の全削除処理
          const newData = [...prevTableData];
          newData[rowIndex] = {
            ...newData[rowIndex],
            names: [],
          };
          return newData;
        });
        break;
      default:
        break;
    }
  };
  return (
    <Select<StudentName, true, GroupBase<StudentName>>
      isMulti
      name="studentName"
      options={studentNames}
      placeholder="当番を選択"
      closeMenuOnSelect={false}
      value={tableData[rowIndex].names}
      onChange={handleOnChangeSelectedNames}
      onBlur={onBlur}
      isReadOnly={!isEditMode}
    />
  );
};
