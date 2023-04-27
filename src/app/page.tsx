"use client";
import React, { useState, useEffect } from 'react'
import * as Papa from 'papaparse';
import { riskYears } from './constants/constants';
import DataTable from './components/DataTable';
import ClimateRiskHighChart from './components/ClimateRiskHighChart';
import ClimateRiskMap from './components/ClimateRiskMap';
import Header from './components/Header';

import './../../src/app/globals.css'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';


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
    <div className='container'>
      <Header
        items={riskYears}
        setSelectedValue={setSelectedRiskYear}
        selectedValue={selectedRiskYear} />

      <div style={{ display: 'flex' }}>
        <div className='card'>
          <ClimateRiskMap
            climateData={climateData}
            selectedRiskYear={selectedRiskYear} />
        </div>
        <div className="ag-theme-alpine card">
          <DataTable
            climateData={climateData}
            selectedRiskYear={selectedRiskYear} />
        </div>
      </div>

      <ClimateRiskHighChart
        climateData={climateData}
        buisnessOptionValues={buisnessOptionValues}
        assetOptionValues={assetOptionValues}
        latOptionsValues={latOptionsValues}
        lngOptionsValues={lngOptionsValues}
      />
    </div>
  )
};