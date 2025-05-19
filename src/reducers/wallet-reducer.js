import { createSlice } from "@reduxjs/toolkit"
import value from '../mock/mockData.json';


const initialState = {
    value,
    theme: 'dark',
    searchWalletAddress:'3Bn9uxMTY9HpTLaCo9YNBTq96QNhSYRxJk'
}


const walletDetails = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
      update_wallet: (state,action) => {
          state.value = action.payload;
        },
      set_theme: (state, action) => {
        state.theme = action.payload;
      },
      setSeachedWalletAddress: (state, action) => {
        state.searchWalletAddress = action.payload;
      }
    }
  })
  
  export default walletDetails.reducer
  export const { update_wallet, set_theme, setSeachedWalletAddress } = walletDetails.actions