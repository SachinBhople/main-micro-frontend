import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGetcartProductQuery } from 'order/cartApi'
import { useLogoutUserMutation } from 'auth/authApi'
// import { LOAD_CART_API, LOAD_ORDER_API } from '../redux/store';
// 
const Navbar = () => {
    const { data } = useGetcartProductQuery()
    const [logout, { isSuccess }] = useLogoutUserMutation()
    const navigate = useNavigate()
    useEffect(() => {
        if (isSuccess) {
            navigate("/auth")
        }
    }, [isSuccess])
    return (
        <nav className="bg-blue-600 p-4 shadow-lg">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="text-white text-sxl font-semibold">
                    <div className="space-x-6">
                        {/* <a href="/product">HOST</a>
                        <a href="/product">Product</a>
                        <a href="/order/cart">Cart</a>
                        <a href="/order/order">Order</a>
                        <a href="/auth">Auth</a> */}
                        <Link to="/">HOST</Link>
                        <Link to="/product" className="text-white hover:text-gray-300">Product</Link>
                        <Link to="/order/cart" className="text-white hover:text-gray-300">Cart {data && data.result.length}</Link>
                        <Link to="/order/order" className="text-white hover:text-gray-300">Order</Link>
                        <Link to="/auth" className="text-white hover:text-gray-300">Auth</Link>
                        {/* <Link to="/product" className="text-white hover:text-gray-300">Products</Link>
                        {/* <Link to="/product/product-details" className="text-white hover:text-gray-300">Order</Link> */}
                        <button onClick={logout} > Logout</button>
                    </div>

                </div>

            </div>
        </nav >
    );
};

export default Navbar;
