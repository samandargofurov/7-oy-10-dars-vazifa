import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  function handleLogin() {
    navigate('/login');
  }

  function handleRemove(index) {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
    localStorage.setItem('cart', JSON.stringify(newCartItems));
  }

  return (
    <>
      <div className="container w-3/4 mx-auto">
        <div className="flex flex-col gap-5 ">
          <h1 className="text-netural opacity-80 mt-[55px] text-3xl">
            Shopping Cart
          </h1>
          <hr />
        </div>

        <div className="flex gap-6">
        <div>
          {cartItems.map((item, index) => (
            <div key={index} className="my-3 w-[660px]">
              <div className="flex justify-between border-b-2 py-6 ">
                <div className="flex gap-10">
                  <div className="image">
                    <img
                      className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover"
                      src={item.image}
                      alt=""
                    />
                  </div>
                  <div className="title">
                    <h2 className="capitalize font-medium text-md">{item.title}</h2>
                    <p className="mt-2 capitalize text-sm text-neutral-content">{item.company}</p>
                    <p className="mt-4 text-sm capitalize flex items-center gap-x-2">
                      Color:
                      <span
                        style={{ backgroundColor: item.color }}
                        className="bg-black w-4 h-4 rounded-full"
                      ></span>
                    </p>
                  </div>
                </div>

                <div className="form flex flex-col gap-2">
                  <label htmlFor="select text-sm">Amount</label>
                  <select className="select select-bordered select-sm w-14 max-w-xs">
                    {[...Array(6).keys()].map((amount) => (
                      <option key={amount} value={amount + 1} selected={amount + 1 === item.amount}>
                        {amount + 1}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleRemove(index)}
                    className="mt-2 link link-primary link-hover text-sm btn-error"
                  >
                    Remove
                  </button>
                </div>

                <h3>${(item.price * item.amount) / 100}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between">
            <div className="flex flex-col gap-7">
              <div className="card bg-[#F0F6FF] px-7 py-7 mt-7 w-[330px]">
                <div className="flex flex-col gap-3">
                  <p className="flex justify-between text-xs border-b-2 pb-2">Subtotal<span className="price">$12.12</span></p>
                  <p className="flex justify-between text-xs border-b-2 pb-2">Shipping<span className="price">$33.12</span></p>
                  <p className="flex justify-between text-xs border-b-2 pb-2">Tax<span className="price">$12</span></p>
                  <p className="flex justify-between text-sm pb-3 pt-5">Order Total<span className="price">$123.42</span></p>
                </div>
              </div>
              <button onClick={handleLogin} className="btn btn-info text-white">Please Login</button>
            </div>
        </div>
        </div>

      </div>
    </>
  );
}

export default Cart;