'use client';

import { Tbody,Th,Box,Textarea,Table, Td, Tr, Thead, Button } from "@chakra-ui/react";



const state = {
    studentData: [
       {number:"1",name:"村上",attendcheck:"出席"},
       {number:"2",name:"村上にごう",attendcheck:"出席"},
       {number:"3",name:"村上さんごう",attendcheck:"未確認"},
       {number:"4",name:"村上よんごう",attendcheck:"出席"},
       {number:"5",name:"村上ごごう",attendcheck:"代理"},
   ],
   }




export default function MonthlyCleanReport()  {
   
    return(
        <>
          <Box>
        <Table>
          <Thead>
            <Tr>
              <Th>名前</Th>
              <Th>状態</Th>
            </Tr>
          </Thead>
          <Tbody>
            {state.studentData.map((array) =>
                    <Tr key={array.number}>
                        <Td>{array.name}</Td>
                        <Td>{array.attendcheck}</Td>
                    </Tr>
                    )}
                    </Tbody>
            </Table>
            </Box>
            <MonthlyCleanComment />
            <Button>送信</Button>
            </>
    );
}

const MonthlyCleanComment = () => {
    return (
      <Box>
        <Box>なんかあったら書いてもらう</Box>
        <Textarea />
      </Box>
    );
  };

  






