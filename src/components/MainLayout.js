import React, { useState,useEffect } from 'react';
import './MainLayout.css';
import Table from './Table.js';


const MainLayout = ({ticker}) =>
{
  const [tickerValue,setTickerValue]= useState([]);
  const [xleValue,setXLEValue] = useState([]);
  const [soxxValue,setSOXXValue] = useState([]);
  const [dbcValue,setDBCValue] = useState([]);
  const [litValue,setLITValue] = useState([]);
  const [skyyValue,setSKYYValue] = useState([]);
  const [iclnValue,setICLNValue] = useState([]);
  const [tClosePrice,setTClosePrice] = useState([]);
  const [loading,setLoading] = useState(false);
  const tickerArray = ['SPY','XLE','SOXX','DBC','SKYY','ICLN'];



  const today = new Date();
  today.setDate(today.getDate()- 1);
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

  const setTableRow = (tickerValue,sectorValue,todayPriceValue,oneYearValue,oneYearMomentomValue,sixMonthValue,sixMonthMomentomValue
    ,threeMonthValue,threeMonthMomentomValue,oneMonthValue,oneMonthMomentomValue,momentomScoreValue) =>
  {
    const setRow = 
    {
      ticker:tickerValue,
      sector:sectorValue,
      todayPrice:todayPriceValue,
      oneYear:oneYearValue,
      oneYearMomentom:oneYearMomentomValue,
      sixMonth:sixMonthValue,
      sixMonthMomentom:sixMonthMomentomValue,
      threeMonth:threeMonthValue,
      threeMonthMomentom:threeMonthMomentomValue,
      oneMonth:oneMonthValue,
      oneMonthMomentom:oneMonthMomentomValue,
      momentomScore:momentomScoreValue,
    }

    return setRow;
  }

      const headerCol = React.useMemo(
      () => [
        {
          Header: "Sector",
          accessor: (d) => d["sector"]
        },
        {
          Header: "Ticker",
          accessor: (d) => d["ticker"]
        },
        {
          Header: "Today",
          accessor: (d) => d["todayPrice"],
        },
        {
          Header: "1Y",
          accessor: (d) => d["oneYear"]
        },
        {
          Header: "1Y M",
          accessor: (d) => d["oneYearMomentom"],
        },
        {
          Header: "6M",
          accessor: (d) => d["sixMonth"],
        },
        {
          Header: "6M M",
          accessor: (d) => d["sixMonthMomentom"],
        },
        {
          Header: "3M",
          accessor: (d) => d["threeMonth"],
        },
        {
          Header: "3M M",
          accessor: (d) => d["threeMonthMomentom"],
        },
        {
          Header: "1M",
          accessor: (d) => d["oneMonth"],
        },
        {
          Header: "1M M",
          accessor: (d) => d["oneMonthMomentom"],
        },
        {
          Header: "M Score",
          accessor: (d) => d["momentomScore"],
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
          
          const xlePrice = await (
            await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=XLE&outputsize=full&apikey=H65SRD1M6KH9R56U`)
          ).json();

          setXLEValue(xlePrice["Time Series (Daily)"]);

          const soxxPrice = await (
            await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=SOXX&outputsize=full&apikey=H65SRD1M6KH9R56U`)
          ).json();

          setSOXXValue(soxxPrice["Time Series (Daily)"]);
          

          const dbcPrice = await (
            await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=DBC&outputsize=full&apikey=H65SRD1M6KH9R56U`)
          ).json();

          setDBCValue(dbcPrice["Time Series (Daily)"]);

          // const litPrice = await (
          //   await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=LIT&outputsize=full&apikey=H65SRD1M6KH9R56U`)
          // ).json();

          // setLITValue(litPrice["Time Series (Daily)"]);

          const skyyPrice = await (
            await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=SKYY&outputsize=full&apikey=H65SRD1M6KH9R56U`)
          ).json();

          setSKYYValue(skyyPrice["Time Series (Daily)"]);

          const iclnPrice = await (
            await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=ICLN&outputsize=full&apikey=H65SRD1M6KH9R56U`)
          ).json();

          setICLNValue(iclnPrice["Time Series (Daily)"]);

          //setTPrice(prevState => ({ ...prevState, '6. date': today.toISOString().split('T')[0]}));


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
        let sector = getSectorTicker(ticker);
        let todayPrice = parseFloat(calcJsonValue(dailyPrice,today)['4. close']);
        let diffOneYearPrice = parseFloat(calcJsonValue(dailyPrice,diffOneYear)['4. close']);
        let diffSixMonthPrice = parseFloat(calcJsonValue(dailyPrice,diffSixMonth)['4. close']);
        let diffThreeMonthPrice = parseFloat(calcJsonValue(dailyPrice,diffThreeMonth)['4. close']);
        let diffOneMonthPrice = parseFloat(calcJsonValue(dailyPrice,diffOneMonth)['4. close']);

        let oneYearMomentom = (((todayPrice - diffOneYearPrice)/diffOneYearPrice) * 1);
        let sixMonthMomentom = (((todayPrice - diffSixMonthPrice)/diffSixMonthPrice) * 2);
        let threeMonthMomentom = (((todayPrice - diffThreeMonthPrice)/diffThreeMonthPrice) * 4);
        let oneMonthMomentom = (((todayPrice - diffOneMonthPrice)/diffOneMonthPrice) * 12);

        let momentomScore = (oneMonthMomentom + sixMonthMomentom + threeMonthMomentom + oneMonthMomentom)/4

        return setTableRow(ticker,sector,todayPrice,diffOneYearPrice,oneYearMomentom.toFixed(2),diffSixMonthPrice,sixMonthMomentom.toFixed(2),diffThreeMonthPrice,threeMonthMomentom.toFixed(2),diffOneMonthPrice,oneMonthMomentom.toFixed(2),momentomScore.toFixed(2));
    }

    const getSectorTicker = (ticker) =>
    {
      switch(ticker)
      {
        case ('SPY'):
          {
            return 'S&P500';
          }
          case ('XLE'):
          {
            return '석유';
          }
          case ('SOXX'):
          {
            return '반도체';
          }
          case ('DBC'):
          {
            return '원자재';
          }
          // case ('LIT'):
          // {
          //   return '2차전지';
          // }
          case ('SKYY'):
          {
            return '클라우드';
          }
          case ('ICLN'):
          {
            return '그린 에너지';
          }
          default :
          {
            return null;
          }
      }
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
            return xleValue;
          }
          case ('SOXX'):
          {
            return soxxValue;
          }
          case ('DBC'):
          {
            return dbcValue;
          }
          // case ('LIT'):
          // {
          //   return litValue;
          // }
          case ('SKYY'):
          {
            return skyyValue;
          }
          case ('ICLN'):
          {
            return iclnValue;
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
        <h2 className='date'>today : {today.toISOString().split('T')[0]}</h2>
        <Table columns={headerCol} data={tClosePrice} />
      </div>
    </>
  );
}

export default MainLayout;