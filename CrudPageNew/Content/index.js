import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { trimEnd } from "lodash";

const Content = (props) => {
  const { children, displayName, breadcrumbs, portal } = props;
  return (
    <div className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <div className="page-header">
              {portal ? (
                ""
              ) : (
                <>
                  <h4 className="page-title">{displayName}</h4>
                  <ul className="breadcrumbs">
                    <li className="nav-home">
                      <Link to="/">
                        <i className="flaticon-home" />
                      </Link>
                    </li>
                    {breadcrumbs &&
                      breadcrumbs.map((item) => {
                        return (
                          <React.Fragment key={item.displayName}>
                            <li
                              className="separator"
                              key={`${item.displayName}>`}
                            >
                              <i className="flaticon-right-arrow" />
                            </li>
                            <li className="nav-item" key={item.displayName}>
                              {item.icon && <i className={item.icon} />}
                              {item.displayName}
                            </li>
                          </React.Fragment>
                        );
                      })}
                  </ul>
                </>
              )}
            </div>
          </div>
            <div className="col-md-2">
              {props.view === "list" && props.enableBtnNew && props.btnNew && (
                <props.btnNew handleNew={props.onBtnNovoClick} />
              )}
              {props.view !== "list" && props.onBtnSearchClick && (
                <props.btnSearch handleSearch={props.onBtnSearchClick} />
              )}
            </div>
        </div>
        {portal ? "" : <hr />}
        {children}
      </div>
    </div>
  );
};

Content.defaultProps = {
  breadcrumbs: null,
  children: null,
  btnNew: null,
  enableBtnNew: true,
};

Content.propTypes = {
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      displayName: PropTypes.string.isRequired,
      icon: PropTypes.string,
    })
  ),
  displayName: PropTypes.string.isRequired,
  children: PropTypes.element,
};

export default Content;
