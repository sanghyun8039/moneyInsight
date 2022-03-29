import React, { useState,useEffect } from 'react';
import Table from './Table.js';


const MainLayout = ({ticker}) =>
{
  const [tickerValue,setTickerValue]= useState([]);
  const [tanValue,setTANValue] = useState([]);
  const [tClosePrice,setTClosePrice] = useState([]);
  const [loading,setLoading] = useState(false);
  const tickerArray = ['SPY','XLE'];



  const today = new Date();
  today.setDate(today.getDate()-1);
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

  const setTableRow = (tickerValue,todayPriceValue,oneYearValue,oneYearMomentomValue,sixMonthValue,sixMonthMomentomValue
    ,threeMonthValue,threeMonthMomentomValue,oneMonthValue,oneMonthMomentomValue,momentomScoreValue) =>
  {
    const setRow = 
    {
      ticker:tickerValue,
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
          
          const tanPrice = await (
            await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=XLE&outputsize=full&apikey=H65SRD1M6KH9R56U`)
          ).json();

          setTANValue(tanPrice["Time Series (Daily)"]);
          
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
        return setTableRow(ticker,todayPrice,diffOneYearPrice,oneYearMomentom.toFixed(2),diffSixMonthPrice,sixMonthMomentom.toFixed(2),diffThreeMonthPrice,threeMonthMomentom.toFixed(2),diffOneMonthPrice,oneMonthMomentom.toFixed(2),momentomScore.toFixed(2));
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