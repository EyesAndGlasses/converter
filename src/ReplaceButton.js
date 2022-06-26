import React from 'react'
import IconButton from '@mui/material/Button';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

export default function ReplaceButton(props) {
    const {
        fromCurrency,
        toCurrency,
        setFromCurrency,
        setToCurrency
    } = props
    function press() {
        setFromCurrency(toCurrency)
        setToCurrency(fromCurrency)
    }
    return (
        <div className='myButton'>
            <IconButton className='myButton' color="primary" aria-label="upload picture" component="span" onClick={press}>
                <SwapHorizIcon />
            </IconButton>
        </div>
    );
}