import React,{useState,useEffect,useRef} from 'react'
import { BiSearch } from "react-icons/bi";
import './SearchBar.css'
import {v4 } from 'uuid';

const SearchBar = ({data,setmodal}) => {

    const [searchresult, set_searchresult] = useState([]);
    const [input,setinput]=useState("")
    const input_ref=useRef()

    const handleclick=(e)=>{
        let x=e.target.className
        let classes=["search__input","search__button",'search___reseult','result-item','not-found']
        if(typeof x===typeof {} && x.baseVal!=="search-icon" ){
            set_searchresult([])
            setinput("")
            input_ref.current.value=""
        }
            
        else if( typeof x===typeof ""  &&  !classes.includes(x)){
            set_searchresult([])
            setinput("")
            input_ref.current.value=""
        }

        //add if u click on search box to input all other functionalities deactivates
            
    }

    useEffect(()=>{
        document.addEventListener("click",handleclick)
        return ()=>{document.removeEventListener("click",handleclick)}
    },[])

    const handleSubmit = (e) => e.preventDefault()

    

    const handleSearchChange = (e) => {
        let res=e.target.value
        setinput(res)
        const result=[]
        for (let key in data)
            for(let x of data[key].items)
                if (x.content.toUpperCase().includes(res.toUpperCase()))
                        result.push({id:x.id,content:x.content})
        set_searchresult(result)
    }

    return (
        <header className='search-box'>
            <h1 className='search-header'>Mini-trello</h1>
            <form className="search" onSubmit={handleSubmit}>
                <input
                    className="search__input"
                    type="text"
                    onChange={handleSearchChange}
                    placeholder="Search for a card"
                    ref={input_ref}
                    
                />
                <button className="search__button">
                    <BiSearch className='search-icon'/>
                </button>
            </form>
            { input &&
            <div className='search___reseult'>
                {!searchresult.length && <h2 className='not-found'>Data not found</h2>}
                {searchresult.map(({id,content})=>(
                    <div className='result-item' key={v4()} onClick={()=>setmodal(id)}>
                        {/* <MdOutlineCreditCard className='result-card-icon'/> */}
                        {content}
                    </div>
                ))}
               
            </div>}
        </header>
    
  )
}

export default SearchBar