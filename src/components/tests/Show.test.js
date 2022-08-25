import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';

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

test('renders without errors', () => { 
    render(<Show />)
});

test('renders Loading component when prop show is null', () => { 
    render(<Show />)
    expect(screen.queryByText('Fetching data...')).toBeInTheDocument()
});

test('renders same number of options seasons are passed in', () => { 
    render(<Show show={data} selectedSeason='none' />)
    const list = screen.queryAllByTestId('season-option')
    expect(list).toHaveLength(2)
});

test('handleSelect is called when an season is selected', () => { 
    const handleSelect = jest.fn()
    render(<Show  show={data} selectedSeason='none'  handleSelect={handleSelect} />)
    const options = screen.getByTestId('selector')
    fireEvent.change(options, { target: { value: 1 } })
    expect(handleSelect).toBeCalled()
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => { 
    const { rerender } = render(<Show />)

    expect(screen.queryByTestId('episodes-container')).not.toBeInTheDocument()
    rerender(<Show  show={data} selectedSeason={0} handleSelect={jest.fn()} />)
    expect(screen.queryByTestId('episodes-container')).toBeInTheDocument()
});
