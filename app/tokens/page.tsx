"use client";
import React from "react";
import useSupportedChain from "../hooks/useSupportedChain";
import TokenCard from "../components/cards/TokenCard";

const Token = () => {
  useSupportedChain();

  return (
    <div className="flex items-center justify-center  ">
      <TokenCard />
    </div>
  );
};

export default Token;
