import { IoMdMenu } from "react-icons/io";
import { GrAppsRounded } from "react-icons/gr";
import { useEffect } from "react";
import { useRef, useState } from "react";
import Card from "../components/Card";
import { useLocation, useNavigate } from "react-router-dom";

function Products() {
  const [data, setData] = useState([]);
  const searchRef = useRef(null);
  const categoryRef = useRef(null);
  const companyRef = useRef(null);
  const sortRef = useRef(null);
  const [price, setPrice] = useState(10000);
  const [isGrid, setGrid] = useState(true);
  const [shipping, setShipping] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  async function getData(
    url = `https://strapi-store-server.onrender.com/api/products?page=${currentPage}`
  ) {
    try {
      const res = await fetch(url);
      const responseData = await res.json();
      setData(responseData.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();

    if (location.search) {
      setCurrentPage(location.search.substring(6));
    }
  }, [currentPage]);

  function handleFilter() {
    let resultFilter = "";
    if (searchRef.current.value) {
      resultFilter += `search=${searchRef.current.value}&`;
    }

    if (categoryRef.current.value) {
      resultFilter += `category=${categoryRef.current.value}&`;
    }

    if (companyRef.current.value) {
      resultFilter += `company=${companyRef.current.value}&`;
    }

    if (sortRef.current.value) {
      resultFilter += `order=${sortRef.current.value}&`;
    }

    if (price) {
      resultFilter += `price=${price}&`;
    }

    if (shipping) {
      resultFilter += `shipping=on`;
    }

    getData(
      `https://strapi-store-server.onrender.com/api/products?${resultFilter}`
    );
  }

  function handleReset() {
    searchRef.current.value = null;
    categoryRef.current.value = "all";
    companyRef.current.value = "all";
    sortRef.current.value = "a-z";
    setPrice(10000);
    setShipping(false);
  }

  function handlePagination(num) {
    navigate(`/products?page=${num}`);
    setCurrentPage(num);
  }

  function handlePrev() {
    if (currentPage > 1) {
      setCurrentPage((currentPage) => currentPage - 1);
    }
  }

  function handleNext() {
    if (currentPage < 1) {
      setCurrentPage((currentPage) => currentPage + 1);
    }
  }

  return (
    <>
      <div className="container w-3/4 mx-auto mt-14">
        <div className="filter p-5 bg-primary-content rounded-md">
          <div className="filter-top flex gap-5">
            <div className="field flex flex-col gap-2 w-96">
              <label htmlFor="search" className="opacity-75">
                Search Product
              </label>
              <input
                ref={searchRef}
                type="search"
                placeholder="Type here"
                className="input input-bordered input-sm py-4 w-full max-w-xs"
                id="search"
              />
            </div>

            <div className="flex flex-col gap-2 w-96">
              <span className="opacity-75 ">Select Category</span>
              <select
                ref={categoryRef}
                className="select select-bordered select-sm w-full max-w-xs"
              >
                <option value="all" selected>
                  all
                </option>
                <option value="Tables">Tables</option>
                <option value="Chairs">Chairs</option>
                <option value="Kids">Kids</option>
                <option value="Sofas">Sofas</option>
                <option value="Beds">Beds</option>
              </select>
            </div>

            <div className="flex flex-col gap-2 w-96">
              <span className="opacity-75 ">Select Company</span>
              <select
                ref={companyRef}
                className="select select-bordered select-sm w-full max-w-xs"
              >
                <option value="all" selected>
                  all
                </option>
                <option value="Modenza">Modenza</option>
                <option value="Luxora">Luxora</option>
                <option value="Artifex">Artifex</option>
                <option value="Comfora">Comfora</option>
                <option value="Homestead">Homestead</option>
              </select>
            </div>

            <div className="flex flex-col gap-2 w-96">
              <span className="opacity-75 ">Sort By</span>
              <select
                ref={sortRef}
                className="select select-bordered select-sm w-full max-w-xs"
              >
                <option value="a-z" selected>
                  a-z
                </option>
                <option value="z-a">z-a</option>
                <option value="high">high</option>
                <option value="low">low</option>
              </select>
            </div>
          </div>

          <div className="filter-bottom flex justify-between gap-5 items-center mt-8">
            <div className="range-block">
              <div className="range-input w-56">
                <div className="range-title flex justify-between mb-2">
                  <p>Select Price</p>
                  <p>${price}</p>
                </div>
                <div className="range-field">
                  <input
                    type="range"
                    min={0}
                    max="1000"
                    className="range range-primary"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                </div>
                <div className="range-max-min flex justify-between mt-1">
                  <span>0</span>
                  <span>Max : $1,000.00</span>
                </div>
              </div>
            </div>

            <div className="shipping w-56">
              <div className="form-control">
                <label className="label cursor-pointer flex flex-col gap-3">
                  <span className="label-text">Free Shipping</span>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={shipping}
                    onChange={(e) => {
                      setShipping(e.target.value);
                    }}
                  />
                </label>
              </div>
            </div>

            <div className="search-input">
              <button onClick={handleFilter} className="btn btn-primary w-56">
                SEARCH
              </button>
            </div>

            <div className="reset-input">
              <button onClick={handleReset} className="btn btn-secondary  w-56">
                RESET
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-b-2 pb-6 mt-14">
          <p>22 products</p>
          <div className="flex text-2xl gap-2">
            <span
              onClick={() => {
                setGrid(true);
              }}
              className="cursor-pointer flex justify-center items-center"
              style={
                isGrid
                  ? {
                      width: "40px",
                      height: "40px",
                      backgroundColor: "blue",
                      color: "white",
                      borderRadius: "50%",
                    }
                  : {}
              }
            >
              <GrAppsRounded />
            </span>
            <span
              onClick={() => {
                setGrid(false);
              }}
              className="cursor-pointer flex justify-center items-center"
              style={
                !isGrid
                  ? {
                      width: "40px",
                      height: "40px",
                      backgroundColor: "blue",
                      color: "white",
                      borderRadius: "50%",
                    }
                  : {}
              }
            >
              <IoMdMenu />
            </span>
          </div>
        </div>

        <div
          className={`products flex justify-between flex-wrap gap-3 mb-20 ${isGrid ? "flex" : "flex-col"}`}
        >{data.length && data.map((el, index) => {
              return <Card isGrid={isGrid} key={index} data={el}></Card>;
            })}
        </div>

        <div className="pagination mb-20 flex justify-end">
          <div className="join">
            <button className="join-item btn" onClick={handlePrev}>PREV</button>
            <button className={`join-item btn ${currentPage == 1 ? "btn-active" : ""} `} onClick={() => {handlePagination(1)}}>1</button>
            <button className={`join-item btn ${currentPage == 2 ? "btn-active" : ""} `} onClick={() => {handlePagination(2)}}>2</button>
            <button className={`join-item btn ${currentPage == 3 ? "btn-active" : ""} `} onClick={() => {handlePagination(3)}}>3</button>
            <button className={`join-item btn`} onClick={handleNext}>NEXT</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
