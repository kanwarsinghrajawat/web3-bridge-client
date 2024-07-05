"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setChains, setFromChain, setToChain } from "../redux/slices/bridge";

const useSupportedChain = () => {
  const dispatch = useDispatch();
  const { chains, fromChain, toChain } = useSelector(
    (state: any) => state.bridge
  );

  useEffect(() => {
    const fetchChains = async () => {
      try {
        const response = await axios.get(
          "https://aggregator-api.xy.finance/v1/supportedChains"
        );

        dispatch(setChains(response.data));

        if (fromChain === undefined || fromChain.length <= 0) {
          console.log(fromChain, "fromchain");
          dispatch(setFromChain(response?.data?.supportedChains?.[0]));
        }
        if (toChain === undefined || toChain.length <= 0) {
          dispatch(setToChain(response?.data?.supportedChains?.[1]));
        }
      } catch (error) {
      } finally {
      }
    };

    fetchChains();
  }, [dispatch]);

  return { chains };
};

export default useSupportedChain;
