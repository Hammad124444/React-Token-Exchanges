import {
  faArrowDown,
  faArrowsLeftRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Dropdown, Image, Form, Button } from "react-bootstrap";
import binanceimg from "../assets/images/binance.png";
import sitelogo from "../assets/images/site-logo.png";
import ethimg from "../assets/images/eth.png";
import { toast } from "react-toastify";
import { useAccount, useNetwork } from "wagmi";
import {
  contractInstance,
  ContractWithPrivateKey,
  walletBalance,
} from "../utils/contractFunction/ether";
const Bridge = () => {
  const { chain } = useNetwork();
  const { address } = useAccount();

  const [amount, setAmount] = useState(0);
  const [selectedOption, setSelectedOption] = useState("Binance");
  const [targetOption, setTargetOption] = useState("TrustChain");

  const SwapOptions = () => {
    const source = targetOption;
    const target = selectedOption;
    setSelectedOption(source);
    setTargetOption(target);
  };

  const handleChange = async (value) => {
    setSelectedOption(value);
  };

  const handleDestinationChange = async (value) => {
    setTargetOption(value);
  };

  const ropstenCall = async () => {
    if (amount <= 0) {
      toast.error("Please Enter the correct amount");
      return;
    }
    let balance = await walletBalance(address, selectedOption);

    if (amount <= balance) {
      let transferToken = await contractInstance(selectedOption, amount);
      if (transferToken.hash) {
        toast.success("Token recived successfully");
        await ContractWithPrivateKey(targetOption, amount, address);
        toast.success("Token transfer successfully");
      } else {
        toast.error("something went wrong");
      }
    } else {
      toast.error("You have insufficient fund");
    }
  };

  const binanceCall = async () => {
    if (amount <= 0) {
      toast.error("Please Enter the correct amount");
      return;
    }
    let balance = await walletBalance(address, selectedOption);
    if (amount <= balance) {
      let transferToken = await contractInstance(selectedOption, amount);
      if (transferToken.hash) {
        toast.success("Token recived successfully");

        await ContractWithPrivateKey(targetOption, amount, address);
        toast.success("Token transfer successfully");
      } else {
        toast.error("something went wrong");
      }
    } else {
      toast.error("You have insufficient fund");
    }
  };
  const trustCall = async () => {
    if (amount <= 0) {
      toast.error("Please Enter the correct amount");
      return;
    }
    let balance = await walletBalance(address, selectedOption);
    if (amount <= balance) {
      let transferToken = await contractInstance(selectedOption, amount);
      if (transferToken.hash) {
        toast.success("Token recived successfully");

        await ContractWithPrivateKey(targetOption, amount, address);
        toast.success("Token transfer successfully");
      } else {
        toast.error("something went wrong");
      }
    } else {
      toast.error("You have insufficient fund");
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (address) {
      if (selectedOption !== targetOption) {
        console.log(chain.name);
        if (chain.name === selectedOption) {
          if (chain.id === 3) {
            ropstenCall();
          } else if (chain.id === 97) {
            binanceCall();
          } else {
            trustCall();
          }
        } else {
          toast.error("Change the network accordingly to selected option");
        }
      } else {
        toast.error("Both options cannot be same");
      }
    } else {
      toast.error("Connect your wallet");
    }
  };

  return (
    <div className="bridge">
      <div className="container-fluid">
        <div className="bridge-box">
          <div className="bridge-box-info mb-lg-5 mb-md-5 mb-4 d-flex align-items-center justify-content-center">
            <p className="mb-0">Binance Smart Chain</p>
            <FontAwesomeIcon
              icon={faArrowsLeftRight}
              className="lr-arrow mx-2"
            />
            <p className="mb-0">TrustChain</p>
          </div>
          <div className="dropdown-area mb-lg-5 mb-3 d-flex align-items-center justify-content-between">
            <Dropdown className="currency-dropdown">
              <Dropdown.Toggle
                className="d-flex align-items-center"
                id="dropdown-basic"
              >
                <div className="currency-img me-1">
                  <Image
                    src={
                      selectedOption === "Binance"
                        ? binanceimg
                        : selectedOption === "TrustChain"
                        ? sitelogo
                        : ethimg
                    }
                    fluid
                  />
                </div>
                <h6 className="mb-0">{selectedOption}</h6>
                <FontAwesomeIcon icon={faArrowDown} className="arrowdown" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item className="d-flex align-items-center">
                  <div className="currency-img me-1">
                    <Image src={sitelogo} fluid />
                  </div>
                  <p
                    className="mb-0"
                    onClick={() => handleChange("TrustChain")}
                  >
                    TrustChain
                  </p>
                </Dropdown.Item>
                <Dropdown.Item className="d-flex align-items-center">
                  <div className="currency-img me-1">
                    <Image src={binanceimg} fluid />
                  </div>
                  <p className="mb-0" onClick={() => handleChange("Binance")}>
                    Binance
                  </p>
                </Dropdown.Item>
                <Dropdown.Item className="d-flex align-items-center">
                  <div className="currency-img me-1">
                    <Image src={ethimg} fluid />
                  </div>
                  <p className="mb-0" onClick={() => handleChange("Ropsten")}>
                  Ropsten
                  </p>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <div className="left-right-arrow">
              <FontAwesomeIcon
                style={{ cursor: "pointer" }}
                icon={faArrowsLeftRight}
                className="lr-arrow mx-2"
                onClick={SwapOptions}
              />
            </div>

            <Dropdown className="currency-dropdown">
              <Dropdown.Toggle
                className="d-flex align-items-center"
                id="dropdown-basic"
              >
                <div className="currency-img me-1">
                  <Image
                    src={
                      targetOption === "TrustChain"
                        ? sitelogo
                        : targetOption === "Binance"
                        ? binanceimg
                        : ethimg
                    }
                    fluid
                  />
                </div>
                <h6 className="mb-0">{targetOption}</h6>
                <FontAwesomeIcon icon={faArrowDown} className="arrowdown" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item className="d-flex align-items-center">
                  <div className="currency-img me-1">
                    <Image src={binanceimg} fluid />
                  </div>
                  <p
                    className="mb-0"
                    onClick={() => handleDestinationChange("Binance")}
                  >
                    Binance
                  </p>
                </Dropdown.Item>
                <Dropdown.Item className="d-flex align-items-center">
                  <div className="currency-img me-1">
                    <Image src={sitelogo} fluid />
                  </div>
                  <p
                    className="mb-0"
                    onClick={() => handleDestinationChange("TrustChain")}
                  >
                    TrustChain
                  </p>
                </Dropdown.Item>
                <Dropdown.Item className="d-flex align-items-center">
                  <div className="currency-img me-1">
                    <Image src={ethimg} fluid />
                  </div>
                  <p
                    className="mb-0"
                    onClick={() => handleDestinationChange("Ropsten")}
                  >
                    Ropsten
                  </p>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="bridge-box-info">
            <p>Amount to swap</p>
            <Form>
              <Form.Group
                className="input-wrapper mb-4"
                controlId="formBasictext"
              >
                <Form.Control
                  type="text"
                  placeholder="0"
                  value={amount}
                  onChange={(e) => {
                    if (e.target.value > 0) {
                      setAmount(e.target.value);
                    } else {
                      setAmount(0);
                    }
                  }}
                />
              </Form.Group>
            </Form>
          </div>
          <div className="swap-btn text-center mb-3">
            <Button onClick={submit}>SWAP</Button>
          </div>
          {/* <div className='reff-link text-center'>
                    <a href="https://dex.trustcoin.om/#/" className='site-link'>Please use the DEX wrap your tokens</a>
                </div> */}
        </div>
      </div>
    </div>
  );
};

export default Bridge;
