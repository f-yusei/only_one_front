'use client';

import { Box, Button, HStack, Select, useDisclosure } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const cleanplacedata = [
  { place: '山寮一階シンク' },
  { place: '落ち葉拾い' },
  { place: 'どて' },
  { place: 'ムキムキぷっちょまん' },
];

export default function CreanReportChoice() {
  const now = new Date();
  const lastmonth = now.getMonth();
  const thismonth = now.getMonth() + 1;
  const nextmonth = now.getMonth() + 2;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cleantype, setCleanType] = useState('');
  const [dormname, setDormname] = useState('');
  const [floor, setFloor] = useState('');
  const [cleanmonth, setCleanMonth] = useState('');
  const [cleantimes, setCleanTimes] = useState('');
  const [cleanplace, setCleanPlace] = useState('');
  const router = useRouter();

  const Submit = async () => {
    router.push(`/manage/cleanreport/${cleantype}`);
  };

  const PlaceSelect = () => {
    // ここで情報を取得する処理

    return (
      <Select
        onChange={(e) => {
          setCleanPlace(e.target.value);
        }}
        placeholder="清掃場所を選択"
      >
        {cleanplacedata.map((array) => (
          <option key={array.place} value={array.place}>
            {array.place}
          </option>
        ))}
      </Select>
    );
  };

  return (
    <>
      <Box m={2}>
        <Box m={1}>
          <Box>週例清掃報告</Box>
          <Box>清掃内容を選択してください</Box>
          <Select
            onChange={(e) => {
              setCleanType(e.target.value);
            }}
            placeholder="清掃内容を選択"
          >
            <option value="weekly">週例清掃</option>
            <option value="monthly">月例清掃</option>
            <option value="special">特別清掃</option>
          </Select>
        </Box>

        <Box m={1}>
          <Box>清掃予定日の月を選択してください</Box>
          <Select
            onChange={(e) => {
              setCleanMonth(e.target.value);
            }}
            placeholder="清掃予定月"
          >
            <option value={lastmonth}>{lastmonth + '月'} </option>
            <option value={thismonth}>{thismonth + '月'}</option>
            <option value={nextmonth}>{nextmonth + '月'}</option>
          </Select>
        </Box>
        <Box m={1}>
          <Box>第何階目の清掃か選択してください</Box>
          <Select
            onChange={(e) => {
              setCleanTimes(e.target.value);
            }}
            placeholder="第何回"
          >
            <option value="1">第1回</option>
            <option value="2">第2回</option>
            <option value="3">第3回</option>
            <option value="4">第4回</option>
            <option value="5">第5回</option>
          </Select>
        </Box>
        {cleantype === 'weekly' ? (
          <Box m={1}>
            <Box>寮棟とフロアを選択してください</Box>

            <HStack>
              <Select
                onChange={(e) => {
                  setDormname(e.target.value);
                }}
                placeholder="寮棟を選択"
              >
                <option value="CEN">中寮</option>
                <option value="MOU">山寮</option>
                <option value="SEA">海寮</option>
                <option value="SPA">宙寮</option>
              </Select>

              <Select
                onChange={(e) => {
                  setFloor(e.target.value);
                }}
                //TODO 海寮の時に留学生、宙寮の時だけ5回まで
                placeholder="フロアを選択"
              >
                {dormname === 'CEN' || dormname === 'MOU' ? (
                  <>
                    <option value="1">1階</option>
                    <option value="2">2階</option>
                    <option value="3">3階</option>
                  </>
                ) : dormname === 'SEA' ? (
                  <>
                    <option value="1">1階</option>
                    <option value="2">2階</option>
                    <option value="3">3階</option>
                    <option value="international">留学生</option>
                  </>
                ) : dormname === 'SPA' ? (
                  <>
                    <option value="1">1階</option>
                    <option value="2">2階</option>
                    <option value="3">3階</option>
                    <option value="4">4階</option>
                    <option value="5">5階</option>
                  </>
                ) : (
                  ''
                )}
              </Select>
            </HStack>
          </Box>
        ) : cleantype === 'special' ? (
          <PlaceSelect />
        ) : (
          ''
        )}
      </Box>

      <Button onClick={onOpen}>決定</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>週例清掃報告</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {cleantype === 'weekly' &&
            cleanmonth != '' &&
            cleantimes != '' &&
            dormname != '' &&
            floor != '' ? (
              <>
                <Box>週例清掃</Box>
                <Box>{cleanmonth + '月'}</Box>
                <Box>{'第' + cleantimes + '回'}</Box>
                {cleantype === 'weekly' ? (
                  <Box>
                    場所:
                    {dormname === 'CEN'
                      ? '中寮'
                      : dormname === 'MOU'
                      ? '山寮'
                      : dormname === 'SEA'
                      ? '海寮'
                      : dormname === 'SPA'
                      ? '宙寮'
                      : ''}
                  </Box>
                ) : (
                  ''
                )}
                {floor + '階'}
              </>
            ) : cleantype === 'monthly' && cleanmonth != null && cleantimes != null ? (
              <>
                <Box>週例清掃</Box>
                <Box>{cleanmonth + '月'}</Box>
                <Box>{'第' + cleantimes + '回'}</Box>
              </>
            ) : cleantype === 'special' &&
              cleanmonth != null &&
              cleantimes != null &&
              cleanplace != null ? (
              <>
                <Box>週例清掃</Box>
                <Box>{cleanmonth + '月'}</Box>
                <Box>{'第' + cleantimes + '回'}</Box>
                <Box>場所:{cleanplace}</Box>
              </>
            ) : (
              'すべての要素を入力してください'
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              戻る
            </Button>
            {(cleantype === 'weekly' &&
              cleanmonth != '' &&
              cleantimes != '' &&
              dormname != '' &&
              floor != '') ||
            (cleantype === 'monthly' && cleanmonth != '' && cleantimes != '') ||
            (cleantype === 'special' &&
              cleanmonth != '' &&
              cleantimes != '' &&
              cleanplace != '') ? (
              <Button variant="ghost" onClick={() => Submit()}>
                清掃報告を開始する
              </Button>
            ) : (
              ''
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

