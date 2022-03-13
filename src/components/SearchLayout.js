import React, { useState, useEffect } from 'react';
import './SearchLayout.css';

const SearchLayout = () =>
{
    const [inputValue,setInputValue] = useState("");
    const [loading,setLoading] = useState(true);
    const [tPrice,setTPrice] = useState([]);
    const [oneMonthPrice,setOneMonthPrice] = useState([]);
    const [threeMonthPrice,setThreeMonthPrice] = useState([]);
    const [sixMonthPrice,setSixMonthPrice] = useState([]);
    const [oneYearPrice,setOneYearPrice] = useState([]);
    
    const today = new Date(2022,2,12);

    const diffOneMonth = new Date(today);
    const diffThreeMonth = new Date(today);
    const diffSixMonth = new Date(today);
    const diffOneYear = new Date(today);
 
    diffOneMonth.setMonth(today.getMonth() - 1);
    diffThreeMonth.setMonth(today.getMonth() - 3);
    diffSixMonth.setMonth(today.getMonth() - 6);
    diffOneYear.setFullYear(today.getFullYear() - 1);

    const onChange = (e) =>
    {
        setInputValue(e.target.value);
        
    }

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
            await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${inputValue}&outputsize=full&apikey=H65SRD1M6KH9R56U`)
        ).json();
        
        //setTPrice(json["Time Series (Daily)"][today.toISOString().split('T')[0]])
        setTPrice(calcJsonValue(json["Time Series (Daily)"],today));

        //setOneMonthPrice(json["Time Series (Daily)"][diffOneMonth.toISOString().split('T')[0]])
        setOneMonthPrice(calcJsonValue(json["Time Series (Daily)"],diffOneMonth));
        
        
        //setThreeMonthPrice(json["Time Series (Daily)"][diffThreeMonth.toISOString().split('T')[0]])
        setThreeMonthPrice(calcJsonValue(json["Time Series (Daily)"],diffThreeMonth));
        
        
        //setSixMonthPrice(json["Time Series (Daily)"][diffSixMonth.toISOString().split('T')[0]])
        setSixMonthPrice(calcJsonValue(json["Time Series (Daily)"],diffSixMonth));
        
        
        //setOneYearPrice(json["Time Series (Daily)"][diffOneYear.toISOString().split('T')[0]])
        setOneYearPrice(calcJsonValue(json["Time Series (Daily)"],diffOneYear));
        console.log(tPrice);
        console.log(oneMonthPrice);
        console.log(threeMonthPrice);
        console.log(sixMonthPrice);
        console.log(oneYearPrice);
    }
  
    const onSubmit = (e) =>
    {
        e.preventDefault();
        if(inputValue === "")
        {
            return;
        }
        getTickerValue();
        setLoading(false);
        
    }

    return(
        <form onSubmit={onSubmit}>
            <div className = 'SearchInput'>
                <input value = {inputValue} onChange={onChange}/>
                <div/>
                <button>
                    Search
                </button>
            </div>

            <div>
                {loading?"":
                <div>
                    <h1>{inputValue}</h1>
                    <h3>{today.toISOString().split('T')[0]}</h3>
                    <ul>
                        {Object.keys(tPrice).map(g=><li key={g}>{g} : {tPrice[g]}</li>)}
                    </ul>

                    <h3>{diffOneMonth.toISOString().split('T')[0]}</h3>
                    <ul>
                        {Object.keys(oneMonthPrice).map(g=><li key={g}>{g} : {oneMonthPrice[g]}</li>)}
                    </ul>

                    <h3>{diffThreeMonth.toISOString().split('T')[0]}</h3>
                    <ul>
                        {Object.keys(threeMonthPrice).map(g=><li key={g}>{g} : {threeMonthPrice[g]}</li>)}
                    </ul>

                    <h3>{diffSixMonth.toISOString().split('T')[0]}</h3>
                    <ul>
                        {Object.keys(sixMonthPrice).map(g=><li key={g}>{g} : {sixMonthPrice[g]}</li>)}
                    </ul>

                    <h3>{diffOneYear.toISOString().split('T')[0]}</h3>
                    <ul>
                        {Object.keys(oneYearPrice).map(g=><li key={g}>{g} : {oneYearPrice[g]}</li>)}
                    </ul>
                </div>
                }
            </div>
        </form>
    );
}
//https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=H65SRD1M6KH9R56U
export default SearchLayout;
