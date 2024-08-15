'use client';
import { Box } from '@chakra-ui/react';
import { DisplayPublicBath, DisplayWasher, DisplayDryer, DisplayShower } from '../components/Dashboard';
import { Flex } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

function extractDR(data: { [key: string]: { [key: string]: { [key: string]: boolean[] } | boolean[] } }, char: string) {
  const drData: { [key: string]: { [key: string]: boolean[] } } = {};

  Object.keys(data).forEach((dormitory: string) => {
    drData[dormitory] = {};

    Object.keys(data[dormitory]).forEach((floor: string) => {
      const floorData = data[dormitory][floor];
      if (floor !== "SW" && typeof floorData === 'object' && !Array.isArray(floorData)) {
        drData[dormitory][floor] = floorData[char];
      }
    });
  });


  const threeArray: boolean[][][] = Object.keys(drData).map(dormitory => {
    return Object.keys(drData[dormitory]).map(floor => {
      return drData[dormitory][floor];
    });
  });

  return threeArray;
}

function extractSW(data: { [key: string]: { [key: string]: { [key: string]: boolean[] } | boolean[] } }) {
  const swData: boolean[][] = [];

  Object.keys(data).forEach((dormitory: string) => {
    if (data[dormitory]["SW"]) {
      swData.push(data[dormitory]["SW"] as boolean[]);
    }
  });

  return swData;
}

const DesctopComponent = () => {
  const [dryArray, setDryArray] = useState<boolean[][][] | null>(null);
  const [washArray, setWashArray] = useState<boolean[][][] | null>(null);
  const [showerArray, setShowerArray] = useState<boolean[][] | null>(null);
  const [bathArray, setBathArray] = useState<boolean[] | null>(null);
  const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function fetchDormitoryData() {
      const dormitories = ['MOU', 'SEA'];
      const results: { [key: string]: { [key: string]: { [key: string]: boolean[] } | boolean[] } } = {};

      for (const dormitory of dormitories) {
        try {
          const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/dashboard?dormitory=${encodeURIComponent(dormitory)}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          results[dormitory] = data[dormitory]; // 階層を一つ下げて格納
        } catch (error) {
          console.error(`Error fetching data for ${dormitory}:`, error);
        }
      }

      return results;
    }
    // 使用例
    fetchDormitoryData().then(results => {
      console.log(results);
      let extractedData = extractDR(results, "DR");
      setDryArray(extractedData);
      extractedData = extractDR(results, "WA");
      setWashArray(extractedData);
      const shower_Data = extractSW(results);
      setShowerArray(shower_Data);
    }).catch(error => {
      console.error('Error:', error);
    });


    fetch(`${NEXT_PUBLIC_API_URL}/api/dashboard?type=PB`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data && Array.isArray(data.PB)) {
          console.log(data);
          const boolArray = data.PB.map((value: number) => Boolean(value));
          setBathArray(boolArray);

        } else {
          console.error('Data is not in the expected format:', data);
        }
      })
      .catch(error => {
        alert(error.message); // エラーメッセージを表示
      });


  }, [NEXT_PUBLIC_API_URL]);




  const gridContainerStyle = {
    marginTop: '20px',
    height: '85vh',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateRows: 'repeat(2, 1fr)',
    gap: '20px',
    flex: 1,
    marginLeft: '20px',
    marginRight: '20px'
  };

  const gridItemStyle = {
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
  };



  return (
    <Flex height="90vh" width={"100%"}>

      <Box style={gridContainerStyle}> {/* グリッドコンテナのクラスを追加 */}
        <div style={gridItemStyle}>{bathArray ? (
          <DisplayPublicBath numberOfUsingBathData={bathArray} />
        ) : (
          <p>Loading...</p>
        )}
        </div>
        <div style={gridItemStyle}>{showerArray ? (
          <DisplayShower showerData={showerArray} />
        ) : (
          <p>Loading...</p>
        )}
        </div>
        <div style={gridItemStyle}>{washArray ? (
          <DisplayWasher washerData={washArray} />
        ) : (
          <p>Loading...</p>
        )}
        </div>
        <div style={gridItemStyle}>
          {dryArray ? (
            <DisplayDryer dryerData={dryArray} />
          ) : (
            <p>Loading...</p>
          )}

        </div>
      </Box>
    </Flex>
  );
}

export default DesctopComponent;
