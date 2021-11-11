import { useContext, useEffect, useState } from "react";
import styled from "styled-components"
import CardCounter from "./CardCounter";
import CartContext from "../../contexts/CartContext"
import { getProductById } from "../../services/Cabecudos";


export default function CartItem ({id, qtd, index}) {
    const [data, setData] = useState([{name: null}])
    const {name, price, stock, images} = data[0];
    const {cart, setCart} = useContext(CartContext)
    const [counterValue, setCounterValue] = useState(qtd)

    useEffect(() => {
        getItemData()
    }, [])

    function getItemData () {
        getProductById(id)
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }

    if (!name) return 'Loading...'

    return(
        <CartItemSC>
            <CartItemImg src={images[0]} />
            <CartItemInfoBox>
                <CartItemName>{name}</CartItemName>
                <CartItemPrice>R${(price*counterValue/100).toFixed(2)}</CartItemPrice>
            </CartItemInfoBox>
            <CardCounter 
                value={counterValue} 
                setValue={setCounterValue} 
                isDisabled={stock <= 0} 
                stock={stock}
                vertical
            />
        </CartItemSC>
    )
}

const CartItemSC = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px;
    background-color: #ffffff;
    border-bottom: 1px solid lightgray;

`;

const CartItemImg = styled.img`
    width: 100px;
    height: 80px;
    border-radius: 10px;
    object-fit: cover;
    border: 1px solid #3EA4C4;
`;

const CartItemInfoBox = styled.div`
    max-width: calc(100% - 136px);
`;

const CartItemName = styled.p`
    max-height: 48px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: bold;
    font-size: 16px;
    letter-spacing: 0.01em;
    color: #333333;
`;

const CartItemPrice = styled.div`
    width: 100%;
    font-weight: 600;
    font-size: 15px;
    line-height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 0.01em;
    color: #333333;
`;
