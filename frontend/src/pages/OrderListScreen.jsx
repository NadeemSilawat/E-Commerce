import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';

const OrderListScreen = () => {
    // Placeholder for Order List
    // Ideally fetch orders from API
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Orders</h1>
            <p>Order management will be implemented here.</p>
        </div>
    );
};

export default OrderListScreen;
