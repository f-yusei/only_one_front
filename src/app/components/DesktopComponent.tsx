'use client';
import { Box } from '@chakra-ui/react';
import { DisplayPublicBath, DisplayWasher, DisplayDryer, DisplayShower } from '../components/Dashboard';
import { Flex, Text } from '@chakra-ui/react';
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

  console.log(drData);

  const threeArray: boolean[][][] = Object.keys(drData).map(dormitory => {
    return Object.keys(drData[dormitory]).map(floor => {
      return drData[dormitory][floor];
    });
  });

  console.log(threeArray);
  return threeArray;
}

function extractSW(data: { [key: string]: { [key: string]: { [key: string]: boolean[] } | boolean[] } }) {
  const swData: boolean[][] = [];

  Object.keys(data).forEach((dormitory: string) => {
    if (data[dormitory]["SW"]) {
      swData.push(data[dormitory]["SW"] as boolean[]);
    }
  });

  console.log(swData);
  return swData;
}

const DesctopComponent = () => {
  const [dryArray, setDryArray] = useState<boolean[][][] | null>(null);
  const [washArray, setWashArray] = useState<boolean[][][] | null>(null);
  const [showerArray, setShowerArray] = useState<boolean[][] | null>(null);
  const [bathArray, setBathArray] = useState<boolean[] | null>(null);
  const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetch(`${NEXT_PUBLIC_API_URL}/api/dashboard`)
      .then(response => {
        if (!response.ok) {
          console.log("net work");
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data); // ここでデータをコンソールに表示
        let extractedData = extractDR(data, "DR");
        setDryArray(extractedData);
        extractedData = extractDR(data, "WA");
        setWashArray(extractedData);
        let shower_Data = extractSW(data);
        setShowerArray(shower_Data);


      })
      .catch(error => {
        console.log(error); // ここでエラーをコンソールに表示
      });

    fetch(`${NEXT_PUBLIC_API_URL}/api/dashboard?dor=PB`)
      .then(response => {
        if (!response.ok) {
          console.log("net work");
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data); // ここでデータをコンソールに表示
        setBathArray(data);


      })
      .catch(error => {
        console.log(error); // ここでエラーをコンソールに表示
      });


  }, []);




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
