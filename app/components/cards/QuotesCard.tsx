"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import supportedChain from "../../hooks/useSupportedChain";
import axios from "axios";
import { RiSettings2Line } from "react-icons/ri";
import { IoShareSocialOutline } from "react-icons/io5";
import { BiRefresh } from "react-icons/bi";
import bridge, {
  setBridgeQuote,
  setFromToken,
  setIsLoadingQuote,
  setModalHandler,
  setToToken,
  setTokenType,
} from "@/app/redux/slices/bridge";
import { PayloadAction } from "@reduxjs/toolkit";
import QuotesSkeletol from "../Skeletols/QuotesSkeletol";
import { SupportedChain, Token } from "@/app/types";

const QuotesCard = () => {
  const dispatch = useDispatch();
  const { chains, fromToken, toToken, fromChain, toChain } = useSelector(
    (state: any) => state.bridge
  );
  const supportedChains: SupportedChain[] = chains?.supportedChains || [];
  const [loading, setLoading] = useState(true);

  supportedChain();

  const fetchQuotes = async () => {
    const queryParams = {
      srcQuoteTokenAmount: "1000000000000000000",
      slippage: "1",
      srcChainId: fromToken.chainId,
      srcQuoteTokenAddress: fromToken.address,
      dstChainId: toToken.chainId,
      dstQuoteTokenAddress: toToken.address,
    };
    const apiUrl = process.env.API_URL;

    const url = `https://web3-bridge-server-j67lcj031-kanwar-singhs-projects.vercel.app/api/quotes?${new URLSearchParams(
      queryParams
    ).toString()}`;

    try {
      dispatch(setModalHandler(true));
      dispatch(setIsLoadingQuote(true));

      const response = await axios.post(url);
      dispatch(setBridgeQuote(response.data));
    } catch (error) {
      console.error("Error fetching quotes", error);
    } finally {
      dispatch(setIsLoadingQuote(false));
    }
  };
  useEffect(() => {
    const fetchTokens = async (
      chainId: number,
      setTokenAction: (tokens: Token[]) => PayloadAction<Token[]>,
      setLoading: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
      try {
        const response = await axios.get(
          `http://localhost:9999/api/token?chainId=${chainId}`
        );
        dispatch(setTokenAction(response.data[0]));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tokens:", error);
      } finally {
        setLoading(false);
      }
    };

    if (supportedChains.length > 0) {
      if (fromToken === undefined || fromToken.length <= 0) {
        fetchTokens(supportedChains[0].chainId, setFromToken, setLoading);
      }
      if (toToken === undefined || toToken.length <= 0) {
        fetchTokens(supportedChains[1].chainId, setToToken, setLoading);
      }
    }
    setLoading(false);
  }, [supportedChains]);

  return (
    <div className="p-6 bg-[#14171A] rounded-2xl shadow w-full md:w-2/4 lg:w-1/3 xl:w-1/4 mx-6">
      <div className="flex items-center justify-between">
        <h5 className="text-xl md:text-2xl font-semibold dark:text-white text-center">
          Transfer
        </h5>
        <div className="flex gap-4">
          <div className="bg-[#1F2428]  rounded-md p-1">
            <RiSettings2Line color="white" size={20} />
          </div>

          <div className="bg-[#1F2428]  rounded-md p-1">
            <IoShareSocialOutline
              color="white"
              size={20}
              className="bg-[#1F2428]  rounded-sm"
            />
          </div>
          <div className="bg-[#1F2428]  rounded-md p-1">
            <BiRefresh
              color="white"
              size={20}
              className="bg-[#1F2428]  rounded-sm"
            />
          </div>
        </div>
      </div>

      <h6 className="flex justify-end text-white items-center mb-4">
        Balance : 0 <span className="text-blue-600 px-1">Max</span>
      </h6>
      <div className="flex flex-col gap-4">
        {loading ? (
          <>
            <QuotesSkeletol />
            <QuotesSkeletol />
          </>
        ) : (
          <>
            <div className="p-6 bg-[#1B1F22] rounded-xl shadow flex justify-between items-center">
              <div>
                <p className="text-xs text-white">From</p>
                <input
                  type="number"
                  placeholder="0.0"
                  className="border-none outline-none bg-transparent text-white text-md appearance-none custom-input w-16"
                />
                <p className="text-xs text-white">$ 0</p>
              </div>
              <Link
                href="/tokens"
                className="bg-[#1F2428] py-4 px-2 md:p-3 flex items-center justify-evenly rounded-xl font-medium text-white hover:bg-[#3a3c3d] w-40"
                onClick={() => dispatch(setTokenType("from"))}
              >
                {fromToken?.logoURI && (
                  <img
                    src={fromToken.logoURI}
                    alt="logo"
                    width={30}
                    height={25}
                  />
                )}
                <div className="mr-2">
                  <p>{fromToken?.name}</p>
                  <p className="text-xs">{fromChain?.name}</p>
                </div>
                <IoIosArrowDown />
              </Link>
            </div>

            <div className="p-6 bg-[#1B1F22] rounded-xl shadow flex justify-between items-center">
              <div>
                {" "}
                <p className="text-xs text-white">To (Quote)</p>
                <p className="text-md text-white">0</p>
                <p className="text-xs text-white">$ 0</p>
              </div>

              <Link
                href="/tokens"
                className="bg-[#1F2428] py-4 px-2 md:p-4 flex items-center justify-between rounded-xl font-medium text-white hover:bg-[#3a3c3d] w-40"
                onClick={() => dispatch(setTokenType("to"))}
              >
                {toToken?.logoURI && (
                  <img
                    src={toToken?.logoURI}
                    alt="logo"
                    width={30}
                    height={25}
                  />
                )}
                <div className="mr-2">
                  <p>{toToken?.name}</p>
                  <p className="text-xs">{toChain?.name}</p>
                </div>
                <IoIosArrowDown />
              </Link>
            </div>
          </>
        )}
      </div>
      <p className="text-white mt-2 text-xs">Exchange Rate</p>
      <p className="text-white mt-2 text-xs">Bridge Fees</p>

      <button
        onClick={() => {
          fetchQuotes();
        }}
        className="mt-4 w-full inline-flex font-medium items-center hover:underline mx-auto bg-gradient-to-r from-blue-900 to-blue-400 hover:from-blue-400 hover:to-blue-900 px-6 py-4 text-center text-lg text-white rounded-xl justify-center"
      >
        Get Quotes
      </button>
    </div>
  );
};

export default QuotesCard;
