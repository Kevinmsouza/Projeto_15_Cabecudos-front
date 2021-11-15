import "./assets/reset.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import SignUp from "./components/pages/SignUp";
import SignIn from "./components/pages/SignIn";
import Cart from "./components/pages/Cart";
import UserContext from "./contexts/UserContext";
import CartContext from "./contexts/CartContext";
import Home from "./components/pages/Home";
import Menu from "./components/Menu";
import { getCart, postCart } from "./services/Cabecudos";

export default function App() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {});
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart"))||[]);
    
    useEffect(() => {
        decideCart(user.token)
    }, [])

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
        if (user.token) postCart(user.token, cart)
    }, [cart])

    function decideCart (loginToken) {
        const localCart = JSON.parse(localStorage.getItem("cart"))||[];
        if (localCart.length) return localCart
        if (loginToken) {
            getCart(loginToken)
                .then(res => {
                    setCart(JSON.parse(res.data[0].cart_text))
                })
        } else{
            return localCart
        }
        
    }

    return (
        <UserContext.Provider value={{user, setUser}}>
            <CartContext.Provider value={{cart, setCart}}>
                <BrowserRouter>
                    <Switch>
                        <Route path="/sign-up" exact component={SignUp}/>
                        <Route path="/sign-in" exact>
                            <SignIn decideCart={decideCart} />
                        </Route>
                        <>
                            <Menu />
                            <Route path="/" exact>
                                <Home />
                            </Route>
                            <Route path="/cart" exact >
                                <Cart />
                            </Route>
                        </>
                        <Route path="*">
                            <Redirect to="/" />
                        </Route>
                    </Switch>
                </BrowserRouter>
            </CartContext.Provider>
        </UserContext.Provider>
    );
}
