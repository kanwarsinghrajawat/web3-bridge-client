"use client";
import React from "react";
import ChainCard from "../components/cards/ChainCard";
import useSupportedChain from "../hooks/useSupportedChain";

const Pool = () => {
  useSupportedChain();

  return (
    <div className=" ">
      <ChainCard />
    </div>
  );
};

export default Pool;
