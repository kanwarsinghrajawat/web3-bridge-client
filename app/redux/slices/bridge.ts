import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BridgeState {
  chains: any[];
  fromToken: any[];
  toToken: any[];
  tokenType: string;
  tokens: any[];
  toChain: any;
  fromChain: any;
  bridgeQuote: any[];
  modalOpen: boolean;
  isLoadingQuote: boolean;
  currentRoute: string;
  searchString: string;
}

const initialState: BridgeState = {
  chains: [],
  fromToken: [],
  toToken: [],
  tokenType: "",
  tokens: [],
  toChain: [],
  fromChain: [],
  bridgeQuote: [],
  modalOpen: false,
  isLoadingQuote: false,
  currentRoute: "/",
  searchString: "",
};

const bridgeSlice = createSlice({
  name: "bridge",
  initialState,
  reducers: {
    setChains(state, action: PayloadAction<any[]>) {
      state.chains = action.payload;
    },
    setFromChain(state, action: PayloadAction<any>) {
      state.fromChain = action.payload;
    },
    setFromToken(state, action: PayloadAction<any>) {
      state.fromToken = action.payload;
    },
    setToChain(state, action: PayloadAction<any>) {
      state.toChain = action.payload;
    },
    setToToken(state, action: PayloadAction<any>) {
      state.toToken = action.payload;
    },
    setTokenType(state, action: PayloadAction<string>) {
      state.tokenType = action.payload;
    },

    setTokens(state, action: PayloadAction<any[]>) {
      state.tokens = action.payload;
    },
    setBridgeQuote(state, action: PayloadAction<any[]>) {
      state.bridgeQuote = action.payload;
    },
    setModalHandler(state, action: PayloadAction<any>) {
      state.modalOpen = action.payload;
    },
    setIsLoadingQuote(state, action: PayloadAction<any>) {
      state.isLoadingQuote = action.payload;
    },
    setCurrentRoute(state, action: PayloadAction<string>) {
      state.currentRoute = action.payload;
    },
    setSearchString(state, action: PayloadAction<string>) {
      state.searchString = action.payload;
    },
  },
});

export const {
  setChains,
  setFromChain,
  setFromToken,
  setToChain,
  setToToken,
  setTokens,
  setTokenType,
  setBridgeQuote,
  setModalHandler,
  setIsLoadingQuote,
  setCurrentRoute,
  setSearchString,
} = bridgeSlice.actions;
export default bridgeSlice.reducer;
