import React, { useState,useEffect } from 'react';
import Table from './Table.js';
import { useTable } from 'react-table';


const MainLayout = ({ticker}) =>
{
  const [tickerValue,setTickerValue]= useState([]);
  const [tClosePrice,setTClosePrice] = useState([]);
  const [tPrice,setTPrice] = useState([]);
  const [loading,setLoading] = useState(false);
  const [oneMonthPrice,setOneMonthPrice] = useState([]);
  const [threeMonthPrice,setThreeMonthPrice] = useState([]);
  const [sixMonthPrice,setSixMonthPrice] = useState([]);
  const [oneYearPrice,setOneYearPrice] = useState([]);
  const [data, setPrices] = useState([]);
  
  const today = new Date();
  today.setDate(today.getDate() -2);
  const diffOneMonth = new Date(today);
  diffOneMonth.setMonth(today.getMonth() - 1);
  const diffThreeMonth = new Date(today);
  diffThreeMonth.setMonth(today.getMonth() - 3);
  const diffSixMonth = new Date(today);
  diffSixMonth.setMonth(today.getMonth() - 6);
  const diffOneYear = new Date(today);
  diffOneYear.setFullYear(today.getFullYear() - 1);
  
  const calcJsonValue = (json,date) =>
  {
      const value = json;
      while(!value[date.toISOString().split('T')[0]])
      {
          date.setDate(date.getDate() - 1);
      }

      return value[date.toISOString().split('T')[0]];
  }

  const setTableRow = (tickerValue,todayPriceValue,oneYearValue,oneYearMomentomValue) =>
  {
    const setRow = 
    {
      ticker:tickerValue,
      todayPrice:todayPriceValue,
      oneYear:oneYearValue,
      oneYearMomentom:oneYearMomentomValue
    }

    return setRow;
  }

  const columns = React.useMemo(
    () => [
      {
        Header: "Date",
        accessor: (d) => d["6. date"]
      },
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

    const headerCol = React.useMemo(
      () => [
        {
          Header: "Ticker",
          accessor: (d) => d["ticker"]
        },
        {
          Header: "Today Price",
          accessor: (d) => d["todayPrice"],
        },
        {
          Header: "One Year",
          accessor: (d) => d["oneYear"]
        },
        {
          Header: "One Year Momentom",
          accessor: (d) => d["oneYearMomentom"],
        },
      ],[]);

  // const getTickerValue = async() => 
  //   {
        
  //       // const tPriceValue = calcJsonValue(json["Time Series (Daily)"],today);
  //       // setTPrice(tPriceValue);
  //       // setOneMonthPrice(calcJsonValue(json["Time Series (Daily)"],diffOneMonth));
  //   }
  useEffect(()=> 
    {
        const fetchData = async() => 
        {
          try{
          const json = await(
            await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=SPY&outputsize=full&apikey=H65SRD1M6KH9R56U`)
              ).json();
          setTickerValue(json["Time Series (Daily)"]); 
          
          
          
          setTPrice(calcJsonValue(json["Time Series (Daily)"],today));
          setTPrice(prevState => ({ ...prevState, '6. date': today.toISOString().split('T')[0]}));
          setOneMonthPrice(calcJsonValue(json["Time Series (Daily)"],diffOneMonth));
          setOneMonthPrice(prevState => ({ ...prevState, '6. date' : diffOneMonth.toISOString().split('T')[0]}));
          setThreeMonthPrice(calcJsonValue(json["Time Series (Daily)"],diffThreeMonth));
          setThreeMonthPrice(prevState => ({ ...prevState, '6. date': diffThreeMonth.toISOString().split('T')[0]}));
          setSixMonthPrice(calcJsonValue(json["Time Series (Daily)"],diffSixMonth));
          setSixMonthPrice(prevState => ({ ...prevState, '6. date': diffSixMonth.toISOString().split('T')[0]}));
          setOneYearPrice(calcJsonValue(json["Time Series (Daily)"],diffOneYear));
          setOneYearPrice(prevState => ({ ...prevState, '6. date': diffOneYear.toISOString().split('T')[0]}));
          
          
          
          
          
          
          setLoading(true);
          
          }
          catch(error)
          {
            console.log(error);
          }  
           
        }
        fetchData();   
        
    },[]);

    const setDataPrice = (tPrice,oneMonthPrice,threeMonthPrice,sixMonthPrice,oneYearPrice) =>
    {
      setPrices((currentValue) => [tPrice,...currentValue]);
      setPrices((currentValue) => [oneMonthPrice,...currentValue]);
      setPrices((currentValue) => [threeMonthPrice,...currentValue]);
      setPrices((currentValue) => [sixMonthPrice,...currentValue]);
      setPrices((currentValue) => [oneYearPrice,...currentValue]);
    }

    
    const setPrice = (today,diffOneYear) =>
    {
      let todayPrice = parseFloat(tickerValue[today.toISOString().split('T')[0]]['4. close']); 
      let diffOneYearPrice = parseFloat(tickerValue[diffOneYear.toISOString().split('T')[0]]['4. close']); 
      let oneYearMomentom = (diffOneYearPrice - todayPrice)/todayPrice * 1;
      let spyValue = setTableRow('SPY',todayPrice,diffOneYearPrice,oneYearMomentom);
      let xleValue = setTableRow('XLE',todayPrice,diffOneYearPrice,oneYearMomentom)
      setTClosePrice((currentValue) =>[spyValue,...currentValue]);
      setTClosePrice((currentValue) =>[xleValue,...currentValue]);
      
      //setTClosePrice((currentValue) => currentValue = todayPrice);
    }

    useEffect(()=>
    {
      if(loading)
      {      
        setPrice(today,diffOneYear); 
        //console.log(tClosePrice);
        console.log(tickerValue);
        setDataPrice(tPrice,oneMonthPrice,threeMonthPrice,sixMonthPrice,oneYearPrice);
      }
      
    },[loading]);

  // useEffect(()=>
  // {
  //   console.log(data);
  // },[data]);


  useEffect(()=>
  {
    console.log(tClosePrice);
  },[tClosePrice]);

  return (
    <>
      <div>
        {/* <Table columns={columns} data={data} /> */}
        <Table columns={headerCol} data={tClosePrice} />
      </div>
    </>
  );
}

export default MainLayout;