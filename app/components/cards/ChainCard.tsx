"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { setTokens } from "../../redux/slices/bridge";
import Loader from "../Skeletols/Loader";

const ChainCard = () => {
  const dispatch = useDispatch();
  const { chains, tokens } = useSelector((state: any) => state.bridge);
  const supportedChains = chains?.supportedChains;
  const [expandedChainId, setExpandedChainId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const apiUrl = "https://web3-bridge-server.vercel.app";

  useEffect(() => {
    const fetchToken = async (id: number) => {
      try {
        setLoading(true);
        const response = await axios.get(`${apiUrl}/api/token?chainId=${id}`);
        dispatch(setTokens(response.data));
        setExpandedChainId(id);
      } catch (error) {
        console.error("Error fetching tokens:", error);
      } finally {
        setLoading(false);
      }
    };

    if (expandedChainId !== null) {
      fetchToken(expandedChainId);
    }
  }, [expandedChainId, dispatch]);

  const toggleAccordion = (chainId: number) => {
    if (expandedChainId === chainId) {
      setExpandedChainId(null);
    } else {
      setExpandedChainId(chainId);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 pt-10">
      {supportedChains?.map((item: any, index: number) => (
        <div
          key={index}
          className=" w-3/4 md:w-1/3 lg:w-1/5 text-white flex flex-col items-center "
        >
          <div className="flex items-center justify-between w-full bg-[#14171A] px-4 py-6 hover:bg-[#3a3c3d]">
            <p className="text-white">{item.name}</p>
            <button onClick={() => toggleAccordion(item.chainId)}>
              {expandedChainId === item.chainId ? (
                <IoIosArrowUp />
              ) : (
                <IoIosArrowDown />
              )}
            </button>
          </div>
          {expandedChainId === item.chainId && (
            <div className="w-full mt-4">
              {loading ? (
                <Loader />
              ) : (
                <div className="py-6 px-4 bg-[#14171A] flex flex-col gap-3 h-[30rem] overflow-y-scroll w-full">
                  {tokens.map((token: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center gap-2  cursor-pointer px-4 py-2 justify-around  bg-[#1F2428]  md:p-4  rounded-xl font-medium text-white hover:bg-[#3a3c3d] "
                    >
                      <img
                        src={token.logoURI}
                        alt={token.name}
                        className="w-6 h-6"
                      />
                      <p>{token.name}</p>
                      <p>{token.decimals}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChainCard;
