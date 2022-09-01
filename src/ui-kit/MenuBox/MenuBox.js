import React from 'react'
import './MenuBox.css'
import { BiX} from "react-icons/bi";

const MenuBox = ({bigX,menu_switch}) => {
  return (
    <div className='menu-box'>
        <header className='menu-header'>List actions</header>
        <BiX className='cancel-menu' size="20px" onClick={bigX}/>
        <hr/>
        <div className='menu-item' onClick={()=>menu_switch(1)}>Add card</div>
        <div className='menu-item' onClick={()=>menu_switch(2)}>Edit title</div>
        <div className='menu-item' onClick={()=>menu_switch(3)}>Delete list</div>
        
    </div>
  )
}

export default MenuBox