import React from 'react'
import ExpandInfoBox from "../expandinfobox_brown"
import {render, screen} from '@testing-library/react'

test('pressing the expand button expands the text', () => {
    render(<ExpandInfoBox text={'text here'}/>)
    
})