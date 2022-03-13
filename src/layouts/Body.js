
import MainLayout from "../components/MainLayout";
import SearchLayout from "../components/SearchLayout";
import './Body.css';

const Body = ({clickValue}) =>
{
    return (
        <body className='Body'>
            {clickValue?<MainLayout />:<SearchLayout/>}
        </body>
    )
}

export default Body;