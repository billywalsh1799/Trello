import React from 'react'
import {Draggable} from 'react-beautiful-dnd';


import Box from '../Box/Box'

import './NewCard.css'

import {BiPencil} from "react-icons/bi";
import MyModal from '../Modal/MyModal';
import CardTitle from '../CardTitle/CardTitle';


const NewCard = ({card_props}) => {

    let {columnId,index,card,card_clicked,reset_handler,change_card_value,delete_card,hovering,
        modal,modal_handler

    }=card_props

    const modal_props=()=>{
        let o={bigX:()=>reset_handler("modal",null),data:card,card_index:index,columnId:columnId,setter:modal_handler}
        return o
    }

    


    return (
        <Draggable key={card.id} draggableId={card.id} index={index} isDragDisabled={card_clicked===card.id}>
            {(provided) => (
                <div className='box-flex'  onMouseOver={()=>reset_handler("hovering",card.id)} onMouseOut={()=>reset_handler("hovering",null)} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    {card_clicked===card.id ? <CardTitle enter={(x)=>change_card_value(x,columnId,index)} defval={card.content} name="Save" cancel={()=>reset_handler("ec",null)}  delete_card={()=>delete_card(columnId,index)} /> : <Box title={card.content} click={()=>reset_handler("modal",card.id)}/>}
                    {hovering===card.id && card_clicked!==card.id  &&  <BiPencil onClick={()=>reset_handler("ec",card.id)} size="15px" className='icon-test' />  }
                    {modal===card.id && <MyModal modal_props={modal_props()}/>}
                </div>
            )}
        </Draggable>

    
  )
}

export default NewCard