import { useEffect, useState } from "react";
import { addToCartLocalStorage } from "./localStorage";
import PropTypes from 'prop-types';

const Bottles = () => {

    const [bottles, setBottles] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('../../../../public/bottle.json')
            .then(res => res.json())
            .then(data => setBottles(data))
            .catch(err => console.log(err))
    }, [])


    const addToCart = (id) => {

        const bottle = bottles.find(bottle => bottle.id === id);
        const existingBottle = cart.find(bottle => bottle.id === id);

        if (existingBottle) {
            setCart(cart.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
            addToCartLocalStorage(id);
        } else {
            setCart([...cart, { ...bottle, quantity: 1 }])
            addToCartLocalStorage(id);
        }
    }

    const increaseQuantity = (id) => {
        setCart(cart.map((item) => {
            if (item.id === id) {
                if (item.quantity < 5) {
                    return { ...item, quantity: item.quantity + 1 };
                } else {
                    alert('You cannot buy more than 5 bottles');
                }
            }
            return item;
        }));
    };

    const handleRemove = (id) => {
        setCart(cart.filter((item) => item.id !== id));
    }

    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0)

    const decreaseQuantity = (id) => {
        setCart(cart.map((item) => item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item))
    }

    return (
        <div>
            <div className='text-center text-4xl font-bold mt-5 mb-2'><h1>All Bottles</h1></div>

            <div className='flex justify-between items-start'>

                <div className='w-[80%] grid grid-cols-3 gap-y-10 gap-x-2'>
                    {
                        bottles.map((bottle) => {
                            return (
                                <div key={bottle.id}>
                                    <div>
                                        <img className='w-[150px] h-[150px]' src={bottle.imageUrl} alt="" />
                                    </div>
                                    <h1 className='font-bold px-2'>{bottle.name}</h1>
                                    <p>{bottle.price} $</p>

                                    <button onClick={() => { addToCart(bottle.id) }} className={`btn btn-sm  ${bottle.available ? "btn-primary" : "btn-disabled text-red-500"}`}>{bottle.available ? 'Add to Cart' : 'Sold Out'}</button>

                                </div>
                            )
                        })
                    }
                </div>

                <div className='w-[40%] bg-gray-300 p-2'>
                    <div>
                        <h2 className='text-2xl font-bold'>Cart</h2>
                    </div>
                    <h2>Total : {totalPrice.toFixed(2)} $</h2>

                    <div>
                        {
                            cart.map((item) => {
                                return (
                                    <div key={item.id} className="flex justify-between items-start m-2">
                                        <h2 className="font-bold capitalize text-pink-600 w-[150px]">{item.name}</h2>

                                        <div className="flex justify-between items-center">
                                            <button onClick={() => increaseQuantity(item.id)} className="btn btn-xs btn-success">+</button>
                                            <h5 className="text-center text-orange-500 m-1">{item.quantity}</h5>
                                            <button onClick={() => decreaseQuantity(item.id)} className="btn btn-xs btn-error">-</button>
                                        </div>

                                        <h2 className="font-semibold text-orange-600">{(item.price * item.quantity).toFixed(2)}$</h2>

                                        <button onClick={() => handleRemove(item.id)} className="btn btn-xs mx-3 btn-info text-white">X</button>

                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

            </div>
        </div>
    );
}

Bottles.prototype = {
    bottles: PropTypes.array,
    cart: PropTypes.array,
    addToCart: PropTypes.func,
    increaseQuantity: PropTypes.func,
    decreaseQuantity: PropTypes.func,
    handleRemove: PropTypes.func,
    totalPrice: PropTypes.number,
}

export default Bottles;
