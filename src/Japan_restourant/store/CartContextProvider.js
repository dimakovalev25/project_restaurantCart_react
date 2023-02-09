import CartContext from './cart-context'
import {useReducer} from "react";
// import React from "react";


const defaultCartState = {
    items: [],
    totalAmount: 0,
}
const cartReducer = (state, action) => {
    if (action.type === 'ADD_ITEM') {
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        const existingCartItemIndex = state.items.findIndex((item) => {
            return item.id === action.item.id
        });

        const existingCartItem = state.items[existingCartItemIndex]

        let updatedItem;
        let updatedItems;

        if (existingCartItem) {
            updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount,
            }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItem = {
                ...action.item
            }
            updatedItems = state.items.concat(updatedItem)
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        }
    }


    if (action.type === 'REMOVE_ITEM') {


        const existingCartItemIndex = state.items.findIndex((item) => {
            return item.id === action.id
        });

        const existingCartItem = state.items[existingCartItemIndex];

        const updatedTotalAmount = state.totalAmount - existingCartItem.price;

        let updatedItems;
        if (existingCartItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id != action.id);

        } else {
            const updatedItem = {...existingCartItem, amount: existingCartItem.amount - 1}
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    return defaultCartState;
}

const CartContextProvider = function (props) {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);
    // console.log(cartState)

    const addItemHandler = item => {
        dispatchCartAction({
            type: 'ADD_ITEM',
            item: item
        });
    }
    const removeItemHandler = id => {
        dispatchCartAction({
            type: 'REMOVE_ITEM',
            id: id
        });
    }

    const cartContext = {
        name: 'Japanesse sushi さかな',
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler
    }
    console.log(cartContext)

    return (
        <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>

    )

}
export default CartContextProvider;
