import React, { useState, useEffect, useCallback } from 'react';
import config from '../constants';
import { ShoppingCartIcon, ArrowLeftIcon, BuildingStorefrontIcon } from '@heroicons/react/24/solid';

const DashboardPage = ({ user, onLogout, manifest }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRestaurants = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await manifest.from('Restaurant').find({ include: ['owner'] });
      setRestaurants(response.data);
    } catch (error) {
      console.error('Failed to fetch restaurants:', error);
    } finally {
      setIsLoading(false);
    }
  }, [manifest]);

  const fetchMyOrders = useCallback(async () => {
    try {
      const response = await manifest.from('Order').find({
        filter: { customer: user.id },
        include: ['items'],
        sort: { createdAt: 'desc' },
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  }, [manifest, user.id]);

  useEffect(() => {
    fetchRestaurants();
    fetchMyOrders();
  }, [fetchRestaurants, fetchMyOrders]);

  const handleSelectRestaurant = async (restaurant) => {
    setSelectedRestaurant(restaurant);
    setIsLoading(true);
    try {
      const response = await manifest.from('MenuItem').find({ filter: { restaurant: restaurant.id } });
      setMenuItems(response.data);
    } catch (error) {
      console.error('Failed to fetch menu items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return;
    const totalPrice = cart.reduce((sum, item) => sum + parseFloat(item.price.replace('$', '')), 0);
    const itemIds = cart.map(item => item.id);

    try {
      await manifest.from('Order').create({
        totalPrice: totalPrice.toFixed(2),
        items: itemIds,
      });
      setCart([]);
      alert('Order placed successfully!');
      fetchMyOrders(); // Refresh orders list
    } catch (error) {
      console.error('Failed to place order:', error);
      alert('There was an error placing your order.');
    }
  };

  const renderRestaurantList = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Restaurants</h2>
      {isLoading ? <p>Loading...</p> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map(restaurant => (
            <div key={restaurant.id} className="bg-white rounded-lg shadow overflow-hidden cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleSelectRestaurant(restaurant)}>
              <img className="h-48 w-full object-cover" src={restaurant.photo || 'https://placehold.co/400x250'} alt={restaurant.name} />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{restaurant.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{restaurant.cuisine}</p>
                <p className="text-xs text-gray-500 mt-2">{restaurant.address}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderRestaurantMenu = () => (
    <div>
      <button onClick={() => setSelectedRestaurant(null)} className="flex items-center text-indigo-600 hover:text-indigo-800 mb-4">
        <ArrowLeftIcon className="h-5 w-5 mr-2" /> Back to Restaurants
      </button>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedRestaurant.name} Menu</h2>
      {isLoading ? <p>Loading menu...</p> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow p-4 flex flex-col">
              <img className="h-32 w-32 object-cover rounded-md self-center mb-4" src={item.photo || 'https://placehold.co/150x150'} alt={item.name} />
              <div className="flex-grow">
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{item.description}</p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <p className="font-bold text-indigo-600">{item.price}</p>
                <button onClick={() => addToCart(item)} className="bg-indigo-500 text-white px-3 py-1 text-sm rounded-md hover:bg-indigo-600">Add</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BuildingStorefrontIcon className="h-8 w-8 text-indigo-600"/>
            <h1 className="text-2xl font-bold text-gray-900">FoodApp</h1>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-sm text-gray-600 hidden sm:block">Welcome, <span className="font-medium">{user.name}</span></p>
            <a href={`${config.BACKEND_URL}/admin`} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-600 hover:text-indigo-600">Admin</a>
            <button onClick={onLogout} className="text-sm font-medium text-gray-600 hover:text-indigo-600">Logout</button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-8">
            {selectedRestaurant ? renderRestaurantMenu() : renderRestaurantList()}
          </div>
          <div className="space-y-8">
              {/* Cart Section */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold flex items-center mb-4"><ShoppingCartIcon className="h-6 w-6 mr-2"/> Your Cart</h3>
                {cart.length === 0 ? (
                  <p className="text-gray-500">Your cart is empty.</p>
                ) : (
                  <div className="space-y-3">
                    {cart.map((item, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span>{item.name}</span>
                        <span className="font-semibold">{item.price}</span>
                      </div>
                    ))}
                    <div className="border-t pt-3 mt-3 flex justify-between items-center font-bold">
                      <span>Total</span>
                      <span>${cart.reduce((sum, item) => sum + parseFloat(item.price.replace('$', '')), 0).toFixed(2)}</span>
                    </div>
                  </div>
                )}
                <button onClick={handlePlaceOrder} disabled={cart.length === 0} className="w-full mt-6 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed">Place Order</button>
              </div>
              {/* My Orders Section */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold mb-4">My Orders</h3>
                 {orders.length === 0 ? (
                  <p className="text-gray-500">You have no past orders.</p>
                ) : (
                  <div className="space-y-4">
                    {orders.map(order => (
                      <div key={order.id} className="border-b pb-2">
                        <p className="font-semibold">Order #{order.id.slice(0, 8)}...</p>
                        <p className="text-sm text-gray-600">Status: <span className={`font-medium px-2 py-0.5 rounded-full text-xs ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{order.status}</span></p>
                        <p className="text-sm text-gray-600">Total: <span className="font-bold">{order.totalPrice}</span></p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
