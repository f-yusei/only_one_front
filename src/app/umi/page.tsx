'use client';
import bathIcon from '../../../public/images/bathicon.png';
import { BuildingPage } from '../components/Dashboard';
import { WashAndDryProps, ShawerProps } from '../types';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const initialTrueCounts = {
  "F1_DR": 0,
  "F1_WA": 0,
  "F2_DR": 0,
  "F2_WA": 0,
  "F3_DR": 0,
  "F3_WA": 0,
  "SW": 0
};

function countTrues(arr: boolean[]): number {
  return arr.reduce((count, value) => count + (value === true ? 1 : 0), 0);
}

export default function Home() {
  const [trueCounts, setTrueCounts] = useState(initialTrueCounts);
  const [loading, setLoading] = useState(true);
  const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: NEXT_PUBLIC_API_URL,
      headers: {}
    };

    axios.request(config)
      .then((response: any) => {
        const data = response.data.SEA;

        if (data) {
          const SEA = {
            "F1": {
              "DR": data.F1.DR,
              "WA": data.F1.WA
            },
            "F2": {
              "DR": data.F2.DR,
              "WA": data.F2.WA
            },
            "F3": {
              "DR": data.F3.DR,
              "WA": data.F3.WA
            },
            "SW": data.SW
          };

          const newTrueCounts = {
            "F1_DR": countTrues(SEA.F1.DR),
            "F1_WA": countTrues(SEA.F1.WA),
            "F2_DR": countTrues(SEA.F2.DR),
            "F2_WA": countTrues(SEA.F2.WA),
            "F3_DR": countTrues(SEA.F3.DR),
            "F3_WA": countTrues(SEA.F3.WA),
            "SW": countTrues(SEA.SW)
          };

          setTrueCounts(newTrueCounts);
        }

        setLoading(false);
      })
      .catch((error: any) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const washingMachineAvailability = [trueCounts.F3_WA, trueCounts.F2_WA, trueCounts.F1_WA];
  const dryerAvailability = [trueCounts.F3_DR, trueCounts.F2_DR, trueCounts.F1_DR];

  const _Wash: WashAndDryProps = {
    data: washingMachineAvailability,
    image: bathIcon,
    name: "洗濯機利用可能台数"
  };
  const _Dry: WashAndDryProps = {
    data: dryerAvailability,
    image: bathIcon,
    name: "乾燥機利用可能台数"
  };
  const _Shawer: ShawerProps = {
    data: trueCounts.SW,
    image: bathIcon,
    name: "シャワー室空室数"
  };

  return (
    <BuildingPage Wash={_Wash} Dry={_Dry} Shawer={_Shawer} />
  );
}
