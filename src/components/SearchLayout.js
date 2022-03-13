import React, { useState, useEffect } from 'react';
import './SearchLayout.css';

const SearchLayout = () =>
{
    const [inputValue,setInputValue] = useState("");
    const [loading,setLoading] = useState(true);
    const [price,setPrice] = useState([]);
    const onChange = (e) =>
    {
        setInputValue(e.target.value);
        
    }
    const getTickerValue = async() => 
    {
        const json = await(
            await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${inputValue}&apikey=H65SRD1M6KH9R56U`)
        ).json();
        const date = new Date(2022,2,8);
        setPrice(json["Time Series (Daily)"][date.toISOString().split('T')[0]])
        console.log(price);
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
                <ul>
                    {Object.keys(price).map(g=><li key={g}>{g} : {price[g]}</li>)}
                </ul>
                </div>
                }
            </div>
        </form>
    );
}
//https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=H65SRD1M6KH9R56U
export default SearchLayout;
