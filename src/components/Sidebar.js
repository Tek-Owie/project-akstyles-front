import React, { useState, Fragment } from "react";
import SimpleBar from 'simplebar-react';
import {signout, isAuthenticated} from "../auth";
import { useLocation, useHistory } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { faUserCircle, faMoneyBill, faReceipt, faFileAlt, faWallet, faSignOutAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Nav, Badge, Image, Button, Accordion, Navbar } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from "../routes";
import ReactHero from "../assets/img/technologies/react-hero-logo.svg";
import ProfilePicture from "../assets/img/team/profile-picture-3.jpg";

export const SideBar = (props = {}) => {
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;
  const [show, setShow] = useState(false);
  const showClass = show ? "show" : "";

  const logout = () => {
    signout(()=>{
      history.push("/");
    })
  };

  const onCollapse = () => setShow(!show);

  const CollapsableNavItem = (props) => {
    const { eventKey, title, icon, children = null } = props;
    const defaultKey = pathname.indexOf(eventKey) !== -1 ? eventKey : "";

    return (
      <Accordion as={Nav.Item} defaultActiveKey={defaultKey}>
        <Accordion.Item eventKey={eventKey}>
          <Accordion.Button as={Nav.Link} className="d-flex justify-content-between align-items-center">
            <span>
              <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /> </span>
              <span className="sidebar-text">{title}</span>
            </span>
          </Accordion.Button>
          <Accordion.Body className="multi-level">
            <Nav className="flex-column">
              {children}
            </Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  };

  const NavItem = (props) => {
    const { title, link, external, target, icon, image, badgeText, badgeBg = "secondary", badgeColor = "primary" } = props;
    const classNames = badgeText ? "d-flex justify-content-start align-items-center justify-content-between" : "";
    const navItemClassName = link === pathname ? "active" : "";
    const linkProps = external ? { href: link } : { as: Link, to: link };

    return (
      <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
        <Nav.Link {...linkProps} target={target} className={classNames}>
          <span>
            {icon ? <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /> </span> : null}
            {image ? <Image src={image} width={20} height={20} className="sidebar-icon svg-icon" /> : null}

            <span className="sidebar-text">{title}</span>
          </span>
          {badgeText ? (
            <Badge pill bg={badgeBg} text={badgeColor} className="badge-md notification-count ms-2">{badgeText}</Badge>
          ) : null}
        </Nav.Link>
      </Nav.Item>
    );
  };

  return (
    <>
      <Navbar expand={false} collapseOnSelect variant="dark" className="navbar-theme-primary px-4 d-md-none">
        <Navbar.Brand className="me-lg-5" as={Link} to={Routes.Index.path}>
          <Image src={ReactHero} className="navbar-brand-light" />
        </Navbar.Brand>
        <Navbar.Toggle as={Button} aria-controls="main-navbar" onClick={onCollapse}>
          <span className="navbar-toggler-icon" />
        </Navbar.Toggle>
      </Navbar>
      <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
        <SimpleBar className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}>
          <div className="sidebar-inner px-4 pt-3">
            <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
              <div className="d-flex align-items-center">
                <div className="user-avatar lg-avatar me-4">
                  <Image src={ProfilePicture} className="card-img-top rounded-circle border-white" />
                </div>
                <div className="d-block">
                  <h6>Hi, Bonnie</h6>
                  <span style={{cursor: "pointer"}} onClick={logout}>
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" /> Sign Out</span>
                </div>
              </div>
              <Nav.Link className="collapse-close d-md-none" onClick={onCollapse}>
                <FontAwesomeIcon icon={faTimes} />
              </Nav.Link>
            </div>
            <Nav className="flex-column pt-3 pt-md-0">
              <NavItem title="Dashboard" link={Routes.Index.path} image={ReactHero} />
              <NavItem title="Profile" link={Routes.Profile.path} icon={faUserCircle} />
              <NavItem title="Wallet" icon={faWallet} link={Routes.Wallet.path} />
              <NavItem title="Transactions" icon={faReceipt} link={Routes.Transactions.path} />
              <NavItem title="Services" icon={faReceipt} link={Routes.Product.path} />
              
              <CollapsableNavItem eventKey="tables/" title="Order" icon={faMoneyBill}>
                <NavItem title="Create" link={Routes.CreateOrder.path} />
                <NavItem title="Orders" link={Routes.Orders.path} />
              </CollapsableNavItem>

              <CollapsableNavItem eventKey="examples/" title="FrontEnd" icon={faFileAlt}>
                {!isAuthenticated() && (
                  <Fragment>
                    <NavItem title="Sign In" link={Routes.Signin.path} />
                    <NavItem title="Sign Up" link={Routes.Signup.path} />
                  </Fragment>
                )}
                {isAuthenticated() && (
                  <Fragment>
                    <span className="sidebar-text" style={{cursor: "pointer", paddingLeft: "45px"}} onClick={logout} >Sign Out</span>
                  </Fragment>
                )}
                <NavItem title="Forgot password" link={Routes.ForgotPassword.path} />
                <NavItem title="Reset password" link={Routes.ResetPassword.path} />
                <NavItem title="404 Not Found" link={Routes.NotFound.path} />
                <NavItem title="500 Server Error" link={Routes.ServerError.path} />
              </CollapsableNavItem>
            </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
};

export default SideBar;