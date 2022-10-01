import React from "react";
import { Image } from "react-bootstrap";
import sitelogo from "../assets/images/site-logo.png";
import { ConnectButton } from '@rainbow-me/rainbowkit';
const Header = () => {
  return (
    <header className="header">
      <div className="container-fluid">
        <div className="header-content d-flex align-items-center justify-content-between">
            <ConnectButton showBalance={false} />
          <div className="logo-content d-flex align-items-center">
            <div className="logo-content-img me-2">
              <Image src={sitelogo} fluid />
            </div>
            <p className="mb-0">Trustchain</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
