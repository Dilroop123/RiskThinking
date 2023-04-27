import React, { useState, useEffect } from 'react'
import Home from '../src/app/page'
import { render, screen } from '@testing-library/react'
import SelectBox from '../src/app/components/SelectBox';
import { riskYears } from '../src/app/constants/constants';


const myMock = jest.fn().mockReturnValue('2050');

describe('SelectBox Component', () => {

    it('Component is rendered', () => {
        const { container } = render(<SelectBox
            items={riskYears}
            setSelectedValue={myMock}
            selectedValue={riskYears[0].key} />)

        expect(screen.getByText("2030")).toBeInTheDocument();

    })
})