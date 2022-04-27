// This is the common layout of different pages used in order to make the code DRY

import React, { useEffect, useState } from "react";

// redux
import { useSelector, useDispatch } from "react-redux";
import { searchProducts, toggleBagView } from "../../redux/Products";

import BagView from "./BagView";

// importing assets
import Logo from "../../assets/images/logo.jpg";
// import SearchIcon from "../../assets/images/search-icon.svg";  // ! search icon not woring
import ProfileIcon from "../../assets/images/profile-icon.svg";
import HeartIcon from "../../assets/images/heart-icon.svg";
import BagIcon from "../../assets/images/bag-icon.svg";
import "./Layout.css";



const Layout = ({ children, horizontalPadding }) => {
  const [searchValue, setSearchValue] = useState("")
  const dispatch = useDispatch()
  const listOfTabs = ["Men", "Women", "Kids", "Home N' Living", "Beauty"]

  // performing search action everytime the searchValue parameter is changed by the user
  useEffect(() => {
    dispatch(searchProducts(searchValue))
  }, [searchValue])

  const showBag = useSelector((state) => state.product.current.showBagView)
  return (
    <div
      style={{ padding: `0 ${horizontalPadding ? "1.75rem" : 0}` }}
      id="layout"
    >
      <nav id="navbar">
        <div id="logo">
          <img width="53px" src={Logo} alt="myntra logo" />
        </div>
        <div className="tabs">
          {
            listOfTabs.map(tab => (
              <div>
                <a className="tab" href="/">
                  {tab}
                </a>
              </div>
            )
            )
          }
        </div>
        <div id="search-bar">
          {/* <div>
            <img width="15" src={SearchIcon} alt="search" />
          </div> */}

          {/* Search bar in order to search required shirts */}
          <input
            type="text"
            placeholder="Search for products, brands and more"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="tabs">
          <div className="tab-btn">
            <img width="20" src={ProfileIcon} alt="profile" />
            <p>Profile</p>
          </div>
          <div className="tab-btn">
            <img width="20" src={HeartIcon} alt="profile" />
            <p>Wishlist</p>
          </div>
          <div onClick={() => dispatch(toggleBagView(true))} className="tab-btn">
            <img width="20" src={BagIcon} alt="profile" />
            <p>Bag</p>
          </div>
        </div>
      </nav>
      {showBag && <BagView />}
      <section className="main">
        {children}
      </section>
    </div>
  );
};

export default Layout;
