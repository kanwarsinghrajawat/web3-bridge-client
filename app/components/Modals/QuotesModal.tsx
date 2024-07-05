"use client";
import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { setModalHandler } from "../../redux/slices/bridge";
import axios from "axios";
import SuccessToast from "./SuccessToast";
import ModalSkeletol from "../Skeletols/ModalSkeletol";

const QuotesModal = () => {
  const dispatch = useDispatch();
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [data, setData] = useState<any>([]);
  const { modalOpen, bridgeQuote, isLoadingQuote } = useSelector(
    (state: any) => state.bridge
  );
  const quoteDetail = bridgeQuote.routes?.[0];

  const fetchQuotes = async () => {
    const query = {
      spender: quoteDetail?.contractAddress,
      tokenAddress: quoteDetail?.srcQuoteTokenAddress,
      amount: "1000000000000000000",
    };

    const url = `http://localhost:9999/api/params?${new URLSearchParams(
      query
    ).toString()}`;

    try {
      const response = await axios.post(url);
      setShowSuccessToast(true);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching quotes", error);
    }
  };

  return (
    <>
      <Dialog
        open={modalOpen}
        onClose={() => dispatch(setModalHandler(false))}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
      >
        <div
          className="fixed inset-0 bg-gray-800 opacity-75"
          onClick={() => dispatch(setModalHandler(false))}
        ></div>

        <div className="relative bg-white rounded-lg max-w-screen-sm w-full sm:w-3/4 md:w-1/2 text-left p-6">
          {isLoadingQuote ? (
            <ModalSkeletol />
          ) : (
            <>
              {quoteDetail && (
                <>
                  <p className="text-lg font-bold mb-2">
                    Slippage: {quoteDetail.slippage}
                  </p>
                  <p className="text-lg mb-2">
                    Quote Amount: {quoteDetail.srcQuoteTokenAmount}
                  </p>
                  <p className="text-lg mb-4">
                    Estimated Time: {quoteDetail.estimatedTransferTime}
                  </p>
                </>
              )}

              <div className="flex justify-end">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mr-2 rounded-md"
                  onClick={() => {
                    fetchQuotes();
                  }}
                >
                  Proceed
                </button>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
                  onClick={() => dispatch(setModalHandler(false))}
                >
                  Close
                </button>
              </div>
            </>
          )}
        </div>
      </Dialog>
      <SuccessToast
        isOpen={showSuccessToast}
        onClose={() => setShowSuccessToast(false)}
        data={data}
      />
    </>
  );
};

export default QuotesModal;
