
import React, { createContext, useEffect } from "react"
import { useState } from "react";

export const ShopContext = createContext(null)
const getDefaultCart = () =>{
    let cart = {};
    for (let index =0; index <300+1;index++){
        cart[index]=0;
    }
    return cart;

}
const ShopContextProvider = (props)=>{
    const[all_product,setAll_Product]= useState([])
    const [cartItem,setCartItem]= useState(getDefaultCart());
    useEffect(()=>{
        fetch('http://localhost:4000/allproducts')
        .then((Response)=>Response.json())
        .then((data)=>{
            console.log(data);
            setAll_Product(data)
        })

        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/getcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:"",

            })
            .then((response)=>response.json())
            .then((data)=>setCartItem(data))
        }
    },[])
    const addToCart = (itemId) =>{
        setCartItem((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/addtocart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId})
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }
    }

    const removeFromCart = (itemId) =>{
        setCartItem((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/removefromcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId})
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }
    }
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItem){
            if(cartItem[item]>0){
                let itemInfor = all_product.find((product)=>product.id===Number(item));
                totalAmount += itemInfor.new_price * cartItem[item];
            }
        
        }
        return totalAmount;
    }
    const getTotalCartItems = () => {
        let TotalItem = 0;
        for(const item in cartItem){
            if(cartItem[item]>0){
                TotalItem +=cartItem[item];
            }
        }
        return TotalItem;
    }

    const contextValue = {getTotalCartAmount,all_product,cartItem,addToCart,removeFromCart,getTotalCartItems};
    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider