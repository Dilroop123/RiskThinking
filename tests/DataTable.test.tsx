import React, { useState, useEffect } from 'react'
import { render, screen } from '@testing-library/react'
import { riskYears } from '../src/app/constants/constants';
import DataTable from '../src/app/components/DataTable';

const dummyRiskData = [
    {
        AssetName: 'Ware PLC',
        Lat: '46.1351',
        Long: '-60.1831',
        BusinessCategory: 'Energy',
        RiskRating: '0.17',
        RiskFactors: '{"Volcano": 0.0, "Hurricane": 0.0, "Drought": 0.0, "Tornado": 0.01, "Extreme heat": 0.01}',
        Year: '2050'
    },
    {
        AssetName: 'Johnson and Sons',
        Lat: '50.26729',
        Long: '-73.75335',
        BusinessCategory: 'Finance',
        RiskRating: '0.02',
        RiskFactors: '{"Volcano": 0.0, "Hurricane": 0.0, "Drought": 0.0, "Tornado": 0.01, "Extreme heat": 0.01}',
        Year: '2030'
    },
    {
        AssetName: 'Thomas-Chavez',
        Lat: '45.44868',
        Long: '-79.2663',
        BusinessCategory: 'Technology',
        RiskRating: '0.45',
        RiskFactors: '{"Volcano": 0.0, "Hurricane": 0.0, "Drought": 0.0, "Tornado": 0.01, "Extreme heat": 0.01}',
        Year: '2060'
    },

];


describe('DataTable Component', () => {

    it('Table is rendered', () => {
        const { container } = render(<DataTable
            climateData={dummyRiskData} selectedRiskYear={riskYears[0].key} />)

        expect(screen.getByText("Asset Name")).toBeInTheDocument();
    });
})