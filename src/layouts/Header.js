import { useState } from 'react';
import './Header.css';



const Header = ({ getClickValue}) =>
{
    const [layoutState,setLayoutState] = useState(false);
    const onClick = (e) =>
    {
        console.log(layoutState);
        getClickValue(layoutState);
        
        setLayoutState((current) => !current);
    }

    return(
        <div className ='Head'>
            <button>navIcon</button>
            <h1>This is   23</h1>
            <button onClick={onClick}>Click</button>
        </div>    
    )
}

export default Header;