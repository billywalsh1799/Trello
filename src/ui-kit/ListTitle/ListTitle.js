import React,{useRef} from 'react'
import Controllers from '../Controllers/Controllers'
import './ListTitle.css'

const ListTitle = ({cancel,add_list}) => {

  const title_input=useRef()

  const enter_list_title=(e)=>{
    if (e.key === 'Enter'){
      add_list(title_input.current.value)
      title_input.current.value=""
    }
  }


  return (
    <div className='box-container'>
        <input className="list-title " placeholder="Enter list title..." ref={title_input} onKeyDown={enter_list_title} autoFocus />
        <Controllers name="Add list" cancel={cancel} click={()=>{add_list(title_input.current.value);title_input.current.value=""}} />
    </div>
  )
}

export default ListTitle