import React from 'react'
import { NativeSelect } from '@mui/material'
import OutlinedInput from '@mui/material/OutlinedInput'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

import getSymbolFromCurrency from 'currency-symbol-map'

export default function CurrencyRow(props) {
  const {
    currencyOptions,
    selectedCurrency,
    convertionCurrency,
    onChangeCurrency,
    onChangeAmount,
    amount,
    fromAmount,
    toAmount,
    optionName
  } = props
  var i = -1

  return(
    <div >
      <NativeSelect className='dropdown' value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyOptions.map(option => (
          <option key={option} value={option}>{option} {optionName[i = i+1]}</option>
          
        ))}
      </NativeSelect>
      <OutlinedInput  type="number" className="input" value={amount} onChange={onChangeAmount} />
      
      <p>{fromAmount} {getSymbolFromCurrency(selectedCurrency)} <ArrowRightAltIcon sx={{ fontSize: 15}}/> {toAmount} {getSymbolFromCurrency(convertionCurrency)}</p>
    </div >
  )
}