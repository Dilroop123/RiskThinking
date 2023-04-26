"use client";
import React, { useState, useEffect, useMemo } from 'react'
import { useLoadScript, GoogleMap, MarkerF, Marker, InfoWindowF } from '@react-google-maps/api';
import * as Papa from 'papaparse';
import { markerColor, riskYears } from './constants/constants';
import RiskMap from './components/RiskMap';
import DataTable from './components/DataTable';
import RiskHighChart from './components/RiskHighChart';
import SelectBox from './components/SelectBox';

let buisnessOptionValues: any = [];
let assetOptionValues: any = [];
let latOptionsValues: any = [];
let lngOptionsValues: any = [];
export default function Home() {
  const [climateData, setClimateData]: any = useState([]);
  const [selectedRiskYear, setSelectedRiskYear]: any = useState();



  useEffect(() => {
    fetch('../../../climate_data.csv')
      .then(response => response.text())
      .then(responseText => {
        // -- parse csv
        Papa.parse(
          responseText,
          {

            header: true,
            complete: (result) => {
              var data: any[] = result.data;
              setClimateData(data);
              console.log(data[0]);
              setSelectedRiskYear(riskYears[0].key);
              data.map((riskData: any, index: any) => {
                buisnessOptionValues.push(riskData.BusinessCategory);
                assetOptionValues.push(riskData.AssetName);
                latOptionsValues.push(Number(riskData.Lat));
                lngOptionsValues.push(Number(riskData.Long));
              });
            }
          });
      });
  }, []);






  return (
    <div>

      <div style={{ display: 'flex', alignItems: 'center', flex: 1, paddingLeft: '10px' }}>
        <h2 style={{ color: '#0bc9de' }}> RiskThinking UI/UX Developers</h2>
        <div style={{ marginLeft: '60px', display: 'flex', alignItems: 'center' }}>
          <SelectBox
            items={riskYears}
            setSelectedValue={setSelectedRiskYear}
            selectedValue={selectedRiskYear} />
          <h3 style={{ marginLeft: '5px' }}>Year</h3>
        </div>

      </div>




      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <RiskMap
            climateData={climateData}
            selectedRiskYear={selectedRiskYear} />
        </div>

        <DataTable
          climateData={climateData}
          selectedRiskYear={selectedRiskYear} />
      </div>
      <RiskHighChart
        climateData={climateData}
        buisnessOptionValues={buisnessOptionValues}
        assetOptionValues={assetOptionValues}
        latOptionsValues={latOptionsValues}
        lngOptionsValues={lngOptionsValues}

      />
    </div>
  )
}
