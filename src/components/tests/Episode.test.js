import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Episode from './../Episode';

let data
beforeEach(() => {
    data = { 
        id: 1, 
        image: 'imgurl', 
        name: 'test_name', 
        season: 2, 
        number: 25, 
        summary: 'test_summary', 
        runtime: '102_minutes' 
    }
})

test("renders without error", () => { 
    render(<Episode episode={data} />)
});

test("renders the summary test passed as prop", () => { 
    render(<Episode episode={data}/>)
    screen.getByText('test_summary')

});

test("renders default image when image is not defined", () => { 
    const { rerender } = render(<Episode episode={data} />)
    rerender(<Episode episode={
        { 
            id: 1, 
            image: null, 
            name: 'test_name', 
            season: 2, 
            number: 25, 
            summary: 'test_summary', 
            runtime: '102_minutes' 
        }
    } />)
    expect(screen.findByAltText('https://i.ibb.co/2FsfXqM/stranger-things.png'))
});
