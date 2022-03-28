import React, { useState,useEffect } from 'react';
import Table from './Table.js';


const MainLayout = ({ticker}) =>
{
  const [tickerValue,setTickerValue]= useState([]);
  const [tanValue,setTANValue] = useState([]);
  const [tClosePrice,setTClosePrice] = useState([]);
  const [tPrice,setTPrice] = useState([]);
  const [loading,setLoading] = useState(false);
  const [oneMonthPrice,setOneMonthPrice] = useState([]);
  const [threeMonthPrice,setThreeMonthPrice] = useState([]);
  const [sixMonthPrice,setSixMonthPrice] = useState([]);
  const [oneYearPrice,setOneYearPrice] = useState([]);
  const tickerArray = ['SPY','XLE'];



  const today = new Date();
  today.setDate(today.getDate() -3);
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
          
          const tanPrice = await (
            await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=XLE&outputsize=full&apikey=H65SRD1M6KH9R56U`)
          ).json();

          setTANValue(tanPrice["Time Series (Daily)"]);
          
          
          setTPrice(calcJsonValue(json["Time Series (Daily)"],today));
          //setTPrice(prevState => ({ ...prevState, '6. date': today.toISOString().split('T')[0]}));
          setOneMonthPrice(calcJsonValue(json["Time Series (Daily)"],diffOneMonth));
          setThreeMonthPrice(calcJsonValue(json["Time Series (Daily)"],diffThreeMonth));
          setSixMonthPrice(calcJsonValue(json["Time Series (Daily)"],diffSixMonth));
          setOneYearPrice(calcJsonValue(json["Time Series (Daily)"],diffOneYear));

          setTPrice(calcJsonValue(tanPrice["Time Series (Daily)"],today));
          //setTPrice(prevState => ({ ...prevState, '6. date': today.toISOString().split('T')[0]}));
          setOneMonthPrice(calcJsonValue(tanPrice["Time Series (Daily)"],diffOneMonth));
          setThreeMonthPrice(calcJsonValue(tanPrice["Time Series (Daily)"],diffThreeMonth));
          setSixMonthPrice(calcJsonValue(tanPrice["Time Series (Daily)"],diffSixMonth));
          setOneYearPrice(calcJsonValue(tanPrice["Time Series (Daily)"],diffOneYear));

          setLoading(true);
          
          }
          catch(error)
          {
            console.log(error);
          }  
           
        }
        fetchData();   
        
    },[]);

    // const setDataPrice = (tPrice,oneMonthPrice,threeMonthPrice,sixMonthPrice,oneYearPrice) =>
    // {
    //   setPrices((currentValue) => [tPrice,...currentValue]);
    //   setPrices((currentValue) => [oneMonthPrice,...currentValue]);
    //   setPrices((currentValue) => [threeMonthPrice,...currentValue]);
    //   setPrices((currentValue) => [sixMonthPrice,...currentValue]);
    //   setPrices((currentValue) => [oneYearPrice,...currentValue]);
    // }

    
    // const setPrice = (today,diffOneYear) =>
    // {
    //   let todaySPYPrice = parseFloat(tickerValue[today.toISOString().split('T')[0]]['4. close']); 
    //   let diffSPYOneYearPrice = parseFloat(tickerValue[diffOneYear.toISOString().split('T')[0]]['4. close']); 

    //   let todayTANPrice = parseFloat(tanValue[today.toISOString().split('T')[0]]['4. close']); 
    //   let diffTANOneYearPrice = parseFloat(tanValue[diffOneYear.toISOString().split('T')[0]]['4. close']); 


    //   let SPYoneYearMomentom = (diffSPYOneYearPrice - todaySPYPrice)/todaySPYPrice * 1;
    //   let TANoneYearMomentom = (diffTANOneYearPrice - todayTANPrice)/todayTANPrice * 1;
      
    //   let spyValue = setTableRow('SPY',todaySPYPrice,diffSPYOneYearPrice,SPYoneYearMomentom);
    //   let tanRowValue = setTableRow('TAN',todayTANPrice,diffTANOneYearPrice,TANoneYearMomentom)
    //   setTClosePrice((currentValue) =>[spyValue,...currentValue]);
    //   setTClosePrice((currentValue) =>[tanRowValue,...currentValue]);
      
    //   //setTClosePrice((currentValue) => currentValue = todayPrice);
    // }

    const setPrice = (tickerArray)=>
    {
      tickerArray.forEach((element) => {
          setTClosePrice((currentValue) => [getTickerPriceValue(element),...currentValue]);       
        });
    }

    const getTickerPriceValue = (ticker) =>
    {
        let dailyPrice = getDailyPrice(ticker);
        let todayPrice = parseFloat(dailyPrice[today.toISOString().split('T')[0]]['4. close']);
        let diffOneYearPrice = parseFloat(dailyPrice[diffOneYear.toISOString().split('T')[0]]['4. close']);
        let oneYearMomentom = ((todayPrice - diffOneYearPrice)/diffOneYearPrice * 1).toFixed(2);

        return setTableRow(ticker,todayPrice,diffOneYearPrice,oneYearMomentom);
    }

    const getDailyPrice = (ticker) =>
    {
      switch(ticker)
      {
        case ('SPY'):
          {
            return tickerValue;
          }
          case ('XLE'):
          {
            return tanValue;
          }
          default :
          {
            return null;
          }
      }
    }
    useEffect(()=>
    {
      if(loading)
      {      
        setPrice(tickerArray); 
        //console.log(tClosePrice);
        console.log(tickerValue);
        //setDataPrice(tPrice,oneMonthPrice,threeMonthPrice,sixMonthPrice,oneYearPrice);
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