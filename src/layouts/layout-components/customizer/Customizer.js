import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  setNavbarBg,
  setSidebarBg,
  setTheme,
  setSidebarPos,
  setHeaderPos,
  setLayout,
} from "../../../redux/settings/Action";

export default () => {
  const settings = useSelector((state) => state.settings);

  const dispatch = useDispatch();

  const toggle = () => {
    document
      .getElementById("customizer")
      .classList.toggle("show-service-panel");
  };

  return (
    <aside className="customizer" id="customizer">
      {/*--------------------------------------------------------------------------------*/}
      {/* Toggle Customizer From Here                                                    */}
      {/*--------------------------------------------------------------------------------*/}
      <span
        className="service-panel-toggle text-white"
        onClick={toggle.bind(null)}
      >
        <i className="fa fa-spin fa-cog"></i>
      </span>
      <PerfectScrollbar>
        <div className="customizer-body">
          <div className="mt-3 border-bottom px-3">
            <h5 className="font-medium m-0">Theme Color</h5>
            <div
              className="btn-group btn-group-toggle mt-2 mb-3"
              data-toggle="buttons"
            >
              <label
                className={
                  "btn btn-outline-secondary " +
                  (settings.activeTheme === "light" ? "active" : "")
                }
              >
                <input
                  type="radio"
                  name="theme-color"
                  id="theme-light"
                  onClick={() => dispatch(setTheme("light"))}
                />{" "}
                Light
              </label>
              <label
                className={
                  "btn btn-outline-secondary " +
                  (settings.activeTheme === "dark" ? "active" : "")
                }
              >
                <input
                  type="radio"
                  name="theme-color"
                  id="theme-dark"
                  onClick={() => dispatch(setTheme("dark"))}
                />{" "}
                Dark
              </label>
            </div>
          </div>
          
          <div className="mt-3 border-bottom px-3">
            <h5 className="font-medium m-0">Header Position</h5>
            <div
              className="btn-group btn-group-toggle mt-2 mb-3"
              data-toggle="buttons"
            >
              <label
                className={
                  "btn btn-outline-secondary " +
                  (settings.activeHeaderPos === "fixed" ? "active" : "")
                }
              >
                <input
                  type="radio"
                  name="header-position"
                  id="header-fixed"
                  onClick={() => dispatch(setHeaderPos("fixed"))}
                />{" "}
                Fixed
              </label>
              <label
                className={
                  "btn btn-outline-secondary " +
                  (settings.activeHeaderPos === "absolute" ? "active" : "")
                }
              >
                <input
                  type="radio"
                  name="header-position"
                  id="header-absolute"
                  onClick={() => dispatch(setHeaderPos("absolute"))}
                />{" "}
                Not Fixed
              </label>
            </div>
          </div>
          

          <div className="mt-3 border-bottom px-3">
            {/*--------------------------------------------------------------------------------*/}
            {/* Change NAVBAR Background                                                       */}
            {/*--------------------------------------------------------------------------------*/}
            <h5 className="font-medium m-0">Navbar Backgrounds</h5>
            <ul className="theme-color mt-2 mb-3">
              <li className="theme-item">
                <span
                  className="theme-link"
                  data-navbarbg="skin1"
                  onClick={() => dispatch(setNavbarBg("skin1"))}
                >
                  &nbsp;&nbsp;
                </span>
              </li>
              <li className="theme-item">
                <span
                  className="theme-link"
                  data-navbarbg="skin2"
                  onClick={() => dispatch(setNavbarBg("skin2"))}
                >
                  &nbsp;
                </span>
              </li>
              <li className="theme-item">
                <span
                  className="theme-link"
                  data-navbarbg="skin3"
                  onClick={() => dispatch(setNavbarBg("skin3"))}
                >
                  &nbsp;
                </span>
              </li>
              <li className="theme-item">
                <span
                  className="theme-link"
                  data-navbarbg="skin4"
                  onClick={() => dispatch(setNavbarBg("skin4"))}
                >
                  &nbsp;
                </span>
              </li>
              <li className="theme-item">
                <span
                  className="theme-link"
                  data-navbarbg="skin5"
                  onClick={() => dispatch(setNavbarBg("skin5"))}
                >
                  &nbsp;
                </span>
              </li>
              <li className="theme-item">
                <span
                  className="theme-link"
                  data-navbarbg="skin6"
                  onClick={() => dispatch(setNavbarBg("skin6"))}
                >
                  &nbsp;
                </span>
              </li>
            </ul>
          </div>
          <div className="mt-3 border-bottom px-3">
            {/*--------------------------------------------------------------------------------*/}
            {/* Change SIDEBAR Background                                                      */}
            {/*--------------------------------------------------------------------------------*/}
            <h5 className="font-medium m-0">Sidebar Backgrounds</h5>
            <ul className="theme-color mt-2 mb-3">
              <li className="theme-item">
                <span
                  className="theme-link"
                  data-sidebarbg="skin1"
                  onClick={() => dispatch(setSidebarBg("skin1"))}
                >
                  &nbsp;
                </span>
              </li>
              <li className="theme-item">
                <span
                  className="theme-link"
                  data-sidebarbg="skin2"
                  onClick={() => dispatch(setSidebarBg("skin2"))}
                >
                  &nbsp;
                </span>
              </li>
              <li className="theme-item">
                <span
                  className="theme-link"
                  data-sidebarbg="skin3"
                  onClick={() => dispatch(setSidebarBg("skin3"))}
                >
                  &nbsp;
                </span>
              </li>
              <li className="theme-item">
                <span
                  className="theme-link"
                  data-sidebarbg="skin4"
                  onClick={() => dispatch(setSidebarBg("skin4"))}
                >
                  &nbsp;
                </span>
              </li>
              <li className="theme-item">
                <span
                  className="theme-link"
                  data-sidebarbg="skin5"
                  onClick={() => dispatch(setSidebarBg("skin5"))}
                >
                  &nbsp;
                </span>
              </li>
              <li className="theme-item">
                <span
                  className="theme-link"
                  data-sidebarbg="skin6"
                  onClick={() => dispatch(setSidebarBg("skin6"))}
                >
                  &nbsp;
                </span>
              </li>
            </ul>
          </div>
        </div>
      </PerfectScrollbar>
    </aside>
  );
};
