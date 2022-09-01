import React,{useRef} from 'react'


import {BiDotsHorizontalRounded} from "react-icons/bi";
import MenuBox from '../MenuBox/MenuBox';
import "./Header.css"






const Header = ({header_props}) => {

    let {title_clicked,reset_handler,column_title,edit_title,iconclicked,menu_switch}=header_props

    const title_input=useRef()
    const enter_list_title=(e)=>{
        if (e.key === 'Enter'){
            edit_title(title_input.current.value)
            title_input.current.value=""

        }

    }



    return (
        <div className='header-flex'>
            {title_clicked ? (<header className='header-title' onClick={()=>reset_handler("th")}>{column_title}</header>)
             :(<input className="edit-list-title " defaultValue={column_title} ref={title_input} onKeyDown={enter_list_title}  autoFocus />)}
            <BiDotsHorizontalRounded className='dots-icon' size="22px" onClick={()=>reset_handler("di")}/>
            {iconclicked && <MenuBox bigX={reset_handler} menu_switch={menu_switch} />}
        </div>
    )
}

export default Header