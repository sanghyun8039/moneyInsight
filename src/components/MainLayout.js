import React, { useState,useEffect } from 'react';
import Table from './Table.js';
import { useTable } from 'react-table';


const MainLayout = ({ticker}) =>
{
  const [tickerValue,setTickerValue]= useState([]);
  const [tPrice,setTPrice] = useState([]);
  const [oneMonthPrice,setOneMonthPrice] = useState([]);
  const [data, setPrices] = useState([]);
  const today = new Date();
  today.setDate(today.getDate() -1);
  const diffOneMonth = new Date(today);




  diffOneMonth.setMonth(today.getMonth() - 1);
  const calcJsonValue = (json,date) =>
  {
      const value = json;
      while(!value[date.toISOString().split('T')[0]])
      {
          date.setDate(date.getDate() - 1);
      }

      return value[date.toISOString().split('T')[0]];
  }

  const getTickerValue = async() => 
    {
        const json = await(
            await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=SPY&outputsize=full&apikey=H65SRD1M6KH9R56U`)
        ).json();

        return json["Time Series (Daily)"];
        // const tPriceValue = calcJsonValue(json["Time Series (Daily)"],today);
        // setTPrice(tPriceValue);
        // setOneMonthPrice(calcJsonValue(json["Time Series (Daily)"],diffOneMonth));
    }


    useEffect(()=> 
    {
      setTickerValue(getTickerValue().then((value) => console.log(value)));
    },[]);

  //   useEffect(()=> {
  //     setPrices((currentValue) => [tPrice,...currentValue]);
  //     setPrices((currentValue) => [oneMonthPrice,...currentValue]);
  // },[oneMonthPrice]);
    useEffect(()=>
    {
      console.log("Text");
    },[tickerValue]);


  // useEffect(()=>
  // {
  //   console.log(data);
  // },[data]);


  // useEffect(()=>
  // {
  //   console.log(tickerValue.then);
  // },[tickerValue]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Open",
        accessor: (d) => d["1. open"],
      },
      {
        Header: "High",
        accessor: (d) => d["2. high"]
      },
      {
        Header: "Low",
        accessor: (d) => d["3. low"],
      },
      {
        Header: "Close",
        accessor: (d) => d["4. close"]
      },
      {
        Header: "Volume",
        accessor: (d) => d["5. volume"]
      },
    ],[]);  
  return (
    <>
      <div>
        <Table columns={columns} data={data} />
      </div>
    </>
  );
}

export default MainLayout;