import React, { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow'
import ReplaceButton from './ReplaceButton';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const BASE_URL = 'https://www.cbr-xml-daily.ru/latest.js'
const NAMES_URL = 'https://www.cbr-xml-daily.ru/daily_json.js'
const STATISTICS = 'popularConversion.json'

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [nameCurrencyOptions, setNameCurrencyOptions] = useState([], [])
  const [date, setDate] = useState()
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)
  var littleFromAmount = 0
  var littleToAmount = 0




  let toAmount, fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
    littleFromAmount = exchangeRate
    littleToAmount = 1 / exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
    littleToAmount = 1 / exchangeRate
    littleFromAmount = exchangeRate
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        const firstCurrency = Object.keys(data.rates)[0]
        setCurrencyOptions([data.base, ...Object.keys(data.rates)])
        setFromCurrency(data.base)
        setToCurrency(firstCurrency)
        setExchangeRate(data.rates[firstCurrency])
        setDate(data.date)
      })
  }, [])
  useEffect(() => {
    if (nameCurrencyOptions.length === 0) {
      fetch(NAMES_URL)
        .then((res) => res.json())
        .then((data) => {
          currencyOptions.forEach(function (entry) {
            if (entry === 'RUB') {
              nameCurrencyOptions.push('Российский рубль')
            } else {
              nameCurrencyOptions.push(data.Valute[entry].Name)
            }
          });
        });
    }
  }, [])

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(BASE_URL)
        .then(res => res.json())
        .then(data => {
          if (fromCurrency !== data.base && toCurrency !== data.base) {
            setExchangeRate(data.rates[toCurrency] / data.rates[fromCurrency])
          } else {
            if (toCurrency !== data.base && fromCurrency === data.base) {
              setExchangeRate(data.rates[toCurrency] / 1)
            } else {
              if (fromCurrency !== data.base && toCurrency === data.base) {
                setExchangeRate(1 / data.rates[fromCurrency])
              } else {
                setExchangeRate(1)
              }
            }
          }
        })
    }
  }, [fromCurrency, toCurrency])

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(STATISTICS)
        .then(response => response.json())
        .then(data => {
          var buf = 1
          if (data[fromCurrency] != null) {
            if (data[fromCurrency][toCurrency] != null) {
              buf = buf + data[fromCurrency][toCurrency]
              data[fromCurrency][toCurrency] = buf
            }
          }
          console.log(data)
        });
    }
  }, [fromCurrency, toCurrency])




  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }
  useEffect(() => {
    if (fromCurrency != null && toCurrency != null && toAmount  != null && fromAmount!= null){
      var date = new Date()
      let cell = {
        fromCurrency: fromCurrency,
        toCurrency: toCurrency,
        toAmount: toAmount,
        fromAmount: fromAmount,
        date: date.getTime()
      };
      console.log(cell)

    }
  }, [fromCurrency, toCurrency, toAmount, fromAmount])
  return (
    <div>
      <h1>Конвертер</h1>
      <h5>По курсу Центрального банка РФ на {date}</h5>
      <Card sx={{ minWidth: 275 }} className='myBlock' >
        <CardContent>
          <Grid container spacing={1} columns={12}>
            <Grid container item xs={5}>
              <p>У меня есть</p>
              <CurrencyRow
                currencyOptions={currencyOptions}
                selectedCurrency={fromCurrency}
                convertionCurrency={toCurrency}

                onChangeCurrency={e => setFromCurrency(e.target.value)}
                onChangeAmount={handleFromAmountChange}
                amount={fromAmount}
                optionName={nameCurrencyOptions}
                fromAmount={1}
                toAmount={littleFromAmount}
              />
            </Grid>
            <Grid container item xs={2}>
              <ReplaceButton
                fromCurrency={fromCurrency}
                toCurrency={toCurrency}
                setFromCurrency={setFromCurrency}
                setToCurrency={setToCurrency}
              />
            </Grid>
            <Grid container item xs={5}>
              <p>Я получу</p>
              <CurrencyRow
                currencyOptions={currencyOptions}
                selectedCurrency={toCurrency}
                convertionCurrency={fromCurrency}
                onChangeCurrency={e => setToCurrency(e.target.value)}
                onChangeAmount={handleToAmountChange}
                amount={toAmount}
                optionName={nameCurrencyOptions}
                fromAmount={1}
                toAmount={littleToAmount}
              />
            </Grid>
          </Grid>

        </CardContent>

      </Card>

      <Card sx={{ minWidth: 275 }} className='myBlock' >
        <CardContent>
          <p>Вы искали</p>

        </CardContent>

      </Card>
    </div>
  );
}

export default App;