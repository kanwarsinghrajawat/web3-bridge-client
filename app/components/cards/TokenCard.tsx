import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import SearchField from "../SearchField";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import axios from "axios";
import {
  setFromChain,
  setFromToken,
  setToChain,
  setToToken,
  setTokens,
} from "@/app/redux/slices/bridge";
import { SupportedChain } from "@/app/types";
import TokenModal from "../Modals/TokenModal";

const TokenCard = () => {
  const {
    chains,
    tokens,
    fromToken,
    tokenType,
    fromChain,
    toChain,
    searchString,
  } = useSelector((state: any) => state.bridge);
  const dispatch = useDispatch();
  const supportedChains: SupportedChain[] = chains?.supportedChains || [];
  const [showAllChains, setShowAllChains] = useState(false);
  const [expandedChainId, setExpandedChainId] = useState<number | null>(null);
  const [chainName, setChainName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [chain, setChain] = useState({});

  const filteredTokens = tokens.filter((token: any) =>
    token.name.toLowerCase().includes(searchString.toLowerCase())
  );

  const apiUrl = process.env.API_URL;

  const fetchToken = async (id: number) => {
    setLoading(true);
    try {
      const response = await axios.get(`h${apiUrl}/api/token?chainId=${id}`);
      dispatch(setTokens(response.data));
    } catch (error) {
      console.error("Error fetching tokens:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (supportedChains.length > 0 && expandedChainId === null) {
      let chainData = supportedChains[0];
      if (tokenType === "from") {
        chainData = fromChain;
      } else if (tokenType === "to") {
        chainData = toChain;
      }
      setExpandedChainId(chainData.chainId);
      setChainName(chainData.name);
      fetchToken(chainData.chainId);
      setChain(chainData);
    }
  }, [supportedChains, expandedChainId]);

  const handleChainClick = (chain: SupportedChain) => {
    setExpandedChainId(chain.chainId);
    setChainName(chain.name);
    fetchToken(chain.chainId);
    setChain(chain);
  };

  const visibleChains = showAllChains
    ? supportedChains
    : supportedChains.slice(0, 3);

  const handleShowMore = () => {
    setShowAllChains(true);
  };

  const handleShowLess = () => {
    setShowAllChains(false);
  };

  const handleToken = (token: any) => {
    if (tokenType === "from") {
      dispatch(setFromToken(token));
      dispatch(setFromChain(chain));
    } else if (tokenType === "to") {
      dispatch(setToToken(token));
      dispatch(setToChain(chain));
    }
  };

  return (
    <div className="p-6 bg-[#14171A] rounded-2xl shadow w-full md:w-2/4 lg:w-1/3 xl:w-1/4 mx-6 flex flex-col gap-4">
      <div className="flex items-center justify-start gap-6">
        <Link href="/" className="text-white text-2xl font-bold">
          <FaArrowLeft />
        </Link>
        <p className="text-white text-2xl font-semibold">Select A Token</p>
      </div>
      <SearchField />
      <div className="flex items-center gap-2 flex-wrap justify-start">
        {visibleChains.map((item: SupportedChain, index: number) => (
          <button
            key={index}
            className="bg-[#1F2428] py-2 px-1 md:p-3 flex items-center justify-evenly rounded-xl font-medium text-white hover:bg-[#3a3c3d] w-32"
            onClick={() => handleChainClick(item)}
          >
            <div className="mr-2">
              <p className="text-xs text-white font-normal">{item.name}</p>
            </div>
          </button>
        ))}
      </div>
      {!showAllChains ? (
        <button
          onClick={handleShowMore}
          className="mt-2 w-full text-center bg-[#1F2428] py-2 px-1 md:p-3 flex items-center justify-center gap-4 rounded-xl font-medium text-white hover:bg-[#3a3c3d]"
        >
          More
          <IoIosArrowDown />
        </button>
      ) : (
        <button
          onClick={handleShowLess}
          className="mt-2 w-full text-center bg-[#1F2428] py-2 px-1 md:p-3 flex items-center justify-center gap-4 rounded-xl font-medium text-white hover:bg-[#3a3c3d]"
        >
          Less
          <IoIosArrowUp />
        </button>
      )}
      <p className="text-white text-xs">{`on ${chainName}`}</p>

      <div className="bg-[#14171A] flex flex-wrap gap-3 h-auto max-h-[20rem] min-h-[auto] overflow-y-scroll items-center justify-center">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <TokenModal key={index} />
            ))
          : filteredTokens.map((token: any, index: number) => (
              <div
                key={index}
                className="flex items-center gap-2 cursor-pointer px-4 py-2 justify-between bg-[#1F2428] md:p-4 rounded-xl font-medium text-white hover:bg-[#3a3c3d] w-full"
              >
                <Link
                  href="/"
                  className="flex items-center justify-center gap-2"
                  onClick={() => handleToken(token)}
                >
                  <img
                    src={token.logoURI}
                    alt={token.name}
                    className="w-10 h-10"
                  />
                  <div className="flex flex-col gap-1">
                    <p>{token.name}</p>
                    <p className="text-xs">{chainName}</p>
                  </div>
                </Link>
                <p>0</p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default TokenCard;
