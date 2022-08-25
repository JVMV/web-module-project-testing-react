import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Display from './../Display';
import mockFetchShow from '../../api/fetchShow'
jest.mock('../../api/fetchShow')

let data
beforeEach(() => {
    data = {
        seasons: 
            [{ 
                id: 1, 
                image: 'imgurl', 
                name: 'test_name', 
                season: 2, 
                number: 25, 
                summary: 'test_summary', 
                runtime: '102_minutes',
                episodes: [] 
            },
            { 
                id: 2, 
                image: 'imgurl', 
                name: 'test_name', 
                season: 4, 
                number: 23, 
                summary: 'test_summary', 
                runtime: '102_minutes',
                episodes: [] 
            }]
    }
})

test('renders without errors with no props', async () => { 
    render(<Display />)
});

test('renders Show component when the button is clicked ', () => {
    mockFetchShow.mockResolvedValueOnce(data)
    render(<Display />)
    const button = screen.getByText('Press to Get Show Data')
    fireEvent.click(button)
});

test('renders show season options matching your data when the button is clicked', async () => { 
    mockFetchShow.mockResolvedValueOnce(data)
    render(<Display />)
    const button = screen.getByText('Press to Get Show Data')
    fireEvent.click(button)
    expect(await screen.findAllByTestId('season-option')).toHaveLength(2)
});
