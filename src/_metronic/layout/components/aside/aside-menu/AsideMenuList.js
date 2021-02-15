/* eslint-disable no-restricted-imports */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
//import { useSelector } from "react-redux";
import Hoc from "../../../../../app/modules/Common/components/Hoc";
import AppsIcon from "@material-ui/icons/Apps";
import FastfoodOutlinedIcon from "@material-ui/icons/FastfoodOutlined";
import FreeBreakfastOutlinedIcon from "@material-ui/icons/FreeBreakfastOutlined";
import RedeemIcon from "@material-ui/icons/Redeem";
import { green, red, blue } from "@material-ui/core/colors";

import { checkIsActive } from "../../../../_helpers";

//import SVG from "react-inlinesvg";
//import DvrIcon from "@material-ui/icons/Dvr";
//import { ROLES } from "../../../../../Constants";

export function AsideMenuList({ layoutProps }) {
  const location = useLocation();
  //const authReducer = useSelector(({ auth }) => auth);

  // const isShowMenu = (roles) => {
  //   roles = roles === undefined ? [] : roles;
  //   if (roles.length > 0) {
  //     // check if route is restricted by role
  //     let intersection = roles.filter((x) => authReducer.roles.includes(x));
  //     return intersection.length > 0;
  //   } else {
  //     return true;
  //   }
  // };

  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu && "menu-item-active"} menu-item-open `
      : "";
  };

  return (
    <Hoc>
      {/* begin::Menu Nav */}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {/* begin:section:Order */}
        <li className="menu-section ">
          <h4 className="menu-text">Order Shop[</h4>
          <i className="menu-icon flaticon-more-v2"></i>
        </li>
        {/* End:section:Manage Shop */}

        {/*begin:New Order*/}
        <li
          className={`menu-item ${getMenuItemActive("/dashboard", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/dashboard">
            <span className="svg-icon menu-icon">
              <AppsIcon></AppsIcon>
            </span>
            <span className="menu-text">New Order</span>
          </NavLink>
        </li>
        {/*End:New Order*/}

        {/*begin:Order*/}
        <li
          className={`menu-item ${getMenuItemActive("/dashboard", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/dashboard">
            <span className="svg-icon menu-icon">
              <AppsIcon></AppsIcon>
            </span>
            <span className="menu-text">Order</span>
          </NavLink>
        </li>
        {/*End:Order*/}

        {/* begin:section:Manage Shop */}
        <li className="menu-section ">
          <h4 className="menu-text">Manage Shop</h4>
          <i className="menu-icon flaticon-more-v2"></i>
        </li>
        {/* End:section:Manage Shop */}

        {/*begin:Products Audit*/}
        <li
          className={`menu-item ${getMenuItemActive("/productaudit", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/productaudit">
            <span className="svg-icon menu-icon">
              <RedeemIcon style={{ color: blue[500] }}></RedeemIcon>
            </span>
            <span className="menu-text">Products Audit</span>
          </NavLink>
        </li>
        {/*End:Products Audit*/}

        {/*begin:Product Group*/}
        <li
          className={`menu-item ${getMenuItemActive("/productgroup", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/productgroup">
            <span className="svg-icon menu-icon">
              <FastfoodOutlinedIcon
                style={{ color: green[500] }}
              ></FastfoodOutlinedIcon>
            </span>
            <span className="menu-text">Product Group</span>
          </NavLink>
        </li>
        {/*End:Product Group*/}

        {/*begin:Products*/}
        <li
          className={`menu-item ${getMenuItemActive("/product", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/product">
            <span className="svg-icon menu-icon">
              <FreeBreakfastOutlinedIcon
                style={{ color: red[500] }}
              ></FreeBreakfastOutlinedIcon>
            </span>
            <span className="menu-text">Products</span>
          </NavLink>
        </li>
        {/*End:Products*/}

        {/* begin:section:Administrator */}
        <li className="menu-section ">
          <h4 className="menu-text">Administrator</h4>
          <i className="menu-icon flaticon-more-v2"></i>
        </li>
        {/* End:section:Administrator */}

        {/*begin:Products*/}
        <li
          className={`menu-item ${getMenuItemActive("/dashboard", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/dashboard">
            <span className="svg-icon menu-icon">
              <AppsIcon></AppsIcon>
            </span>
            <span className="menu-text">Users</span>
          </NavLink>
        </li>
        {/*End:Products*/}
      </ul>
      {/* end::Menu Nav */}
    </Hoc>
  );
}
