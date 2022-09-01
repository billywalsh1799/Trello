import React,{useRef} from 'react'

import Controllers from '../Controllers/Controllers'
import './CardTitle.css'


const CardTitle = ({enter,defval,name,cancel,delete_card}) => {

    

    const card_title=useRef()

    const entered=(e)=>{
        if(e.keyCode===13){
            enter(card_title.current.value)
            e.preventDefault();
            card_title.current.value=""   
        }
    }

    const focus=(e)=>{
        let val = e.target.value
        e.target.value = ''
        e.target.value = val

    }

    const add=()=>{
        return(
            <div className='row'>
                <textarea className="user-story" placeholder="Enter a title for this card..." ref={card_title} onKeyDown={entered}  autoFocus/>
                <Controllers name={name} click={()=>{enter(card_title.current.value);card_title.current.value=""}}  cancel={cancel} />
                
            </div>
        )
    }
    
    const edit=()=>{
        return(
            <div className='row'>
                <textarea className="user-story"  ref={card_title} onKeyDown={entered}  defaultValue={defval}  autoFocus onFocus={focus} />
                <Controllers name={name}  click={()=>enter(card_title.current.value)} cancel={cancel} delete_card={delete_card}/>
            </div>
        )
    }


    return (
        <>
            {name==="Save" ? edit() :add()}
        </>
    )
}

export default CardTitle