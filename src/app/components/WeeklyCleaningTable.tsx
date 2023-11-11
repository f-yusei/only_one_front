import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Input,
  Box,
  PinInput,
  PinInputField,
  Button,
  VStack,
  HStack,
} from '@chakra-ui/react';
import {
  ColumnDef,
  RowData,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ActionMeta, MultiValue, Select, GroupBase, OptionBase } from 'chakra-react-select';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

declare module '@tanstack/table-core' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

type WeeklyCleaningTableData = {
  week: string;
  date: string;
  F1studentNames: StudentName[];
  F2studentNames: StudentName[];
  F3studentNames: StudentName[];
};

const weeklyCleaningTable: WeeklyCleaningTableData[] = [
  {
    week: '',
    date: '',
    F1studentNames: [],
    F2studentNames: [],
    F3studentNames: [],
  },
];

type WeeklyCleaningTableProps = {
  isEditMode: boolean;
};

const WeeklyCleaningTable = ({ isEditMode }: WeeklyCleaningTableProps) => {
  const [tableData, setTableData] = useState<WeeklyCleaningTableData[]>(weeklyCleaningTable);

  const columns = [
    {
      header: '第何回',
      accessorKey: 'week',
    },
    {
      header: '実施日',
      accessorKey: 'date',
    },
    {
      header: '1階',
      accessorKey: '1f',
    },
    {
      header: '2階',
      accessorKey: '2f',
    },
    {
      header: '3階',
      accessorKey: '3f',
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

      if (id === 'week') {
        return (
          <PinInput defaultValue={(index + 1).toString()}>
            <PinInputField readOnly />
          </PinInput>
        );
      }

      if (id === '1f') {
        return (
          <MultiSelectNames
            onBlur={onBlur}
            rowIndex={index}
            floor="F1studentNames"
            tableData={tableData}
            setTableData={setTableData}
            isEditMode={isEditMode}
          />
        );
      }

      if (id === '2f') {
        return (
          <MultiSelectNames
            onBlur={onBlur}
            rowIndex={index}
            floor="F2studentNames"
            tableData={tableData}
            setTableData={setTableData}
            isEditMode={isEditMode}
          />
        );
      }

      if (id === '3f') {
        return (
          <MultiSelectNames
            onBlur={onBlur}
            rowIndex={index}
            floor="F3studentNames"
            tableData={tableData}
            setTableData={setTableData}
            isEditMode={isEditMode}
          />
        );
      }

      return (
        <Input
          value={value as string}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
          placeholder="例: 23"
          isReadOnly={!isEditMode}
        />
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
          <HStack align="right">
            <Button onClick={() => setTableData([...tableData, ...weeklyCleaningTable])}>
              行を追加
            </Button>
            <Button
              onClick={() => setTableData([...weeklyCleaningTable])}
              bgColor="red.400"
              color="white"
            >
              表をクリア
            </Button>
          </HStack>
        )}
      </VStack>
    </Box>
  );
};

class StudentName implements OptionBase {
  constructor(
    public value: string,
    public label: string,
    public colorScheme: string
  ) {}
}

type Props = {
  onBlur: () => void;
  tableData: WeeklyCleaningTableData[];
  setTableData: Dispatch<SetStateAction<WeeklyCleaningTableData[]>>;
  rowIndex: number;
  floor: 'F1studentNames' | 'F2studentNames' | 'F3studentNames';
  isEditMode: boolean;
};

const MultiSelectNames = ({
  onBlur,
  tableData,
  setTableData,
  rowIndex,
  floor,
  isEditMode,
}: Props) => {
  //TODO: DBからフェッチしたデータを使用するようにする
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

  const floorStudentNames = floor;

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
              [floorStudentNames]: [...newData[rowIndex][floorStudentNames], StudentName],
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
              [floorStudentNames]: newData[rowIndex][floorStudentNames].filter(
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
            [floorStudentNames]: [],
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
      value={tableData[rowIndex][floorStudentNames]}
      onBlur={onBlur}
      onChange={handleOnChangeSelectedNames}
      isReadOnly={!isEditMode}
    />
  );
};

export default WeeklyCleaningTable;
