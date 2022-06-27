import React from 'react'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import getSymbolFromCurrency from 'currency-symbol-map'

export default function RequesrHistory(props) {
    const {
        historyList
    } = props

  const getHistoruContent = historyList => {
    let content = [];
    for (let i = 0; i < historyList.length; i++) {
      const item = historyList[i];
      content.push(<p className='items'>из {item.fromCurrency} в {item.toCurrency} Результаты: {item.fromAmount}{getSymbolFromCurrency(item.fromCurrency)} <ArrowRightAltIcon sx={{ fontSize: 15}}/> {item.toAmount}{getSymbolFromCurrency(item.toCurrency)} </p>);
    }
    return content;
  };
 
  return getHistoruContent(historyList);
}