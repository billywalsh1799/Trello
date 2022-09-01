import React from 'react'
import './NewCardsContainer.css'

import {v4 } from 'uuid';

import { Droppable} from 'react-beautiful-dnd';
import AddList from "../AddList/AddList";
import Header from '../Header/Header';
import CardTitle from '../CardTitle/CardTitle';
import NewCard from '../Card/NewCard';



const NewCardsContainer = ({cardscontainer_props}) => {
    let {columnId,column,title_clicked,add_card_clicked,card_clicked,hovering,dots_icon_clicked,
        reset_handler,modal,modal_handler,add_card,edit_title,
        change_card_value,delete_card,menu_switch
    }=cardscontainer_props



const header_props=()=>{
    let o={title_clicked:title_clicked!==columnId,iconclicked:dots_icon_clicked===columnId,
         reset_handler:(x)=>reset_handler(x,columnId),
        column_title:column.title ,edit_title:(x)=>edit_title(x,columnId), 
        menu_switch:(x)=>menu_switch(x,columnId)
    }

    return o
}
    

const card_props=(item,index)=>{
    let o={columnId:columnId,index:index,card:item,card_clicked:card_clicked,reset_handler:reset_handler,
        change_card_value:change_card_value,delete_card:delete_card,hovering:hovering,
        modal_handler:modal_handler,modal:modal
    }
    return o
}



    return (
        <Droppable droppableId={columnId}>
            {(provided)=>(
                <ul className="cards-container" {...provided.droppableProps} ref={provided.innerRef} >
                    <li className='row' key={v4()}>
                        <Header header_props={header_props()}/>
                    </li>
                    {column.title && column.items.map((item, index) => {
                            return (
                                <li className="row" key ={item.id}>
                                    <NewCard card_props={card_props(item,index)}/>
                                </li>
                            )
                            })}
                    {provided.placeholder}
                    
                    {add_card_clicked===columnId ? (
                        
                        <CardTitle name="Add card" enter={(x)=>add_card(x,columnId)} cancel={()=>reset_handler("ac",null)} />
                    ) : (<li className='row' key={v4()}>
                        
                        <AddList name="Add a card" type="add-a-card" click={()=>reset_handler("ac",columnId)} columnId={columnId}/>
                    </li>   )}
                    
                </ul>
            )}

        </Droppable>

       
    )
}

export default NewCardsContainer
