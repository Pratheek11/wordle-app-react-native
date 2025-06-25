import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CoinsState {
  total: number;
}

const initialState: CoinsState = {
  total: 0,
};

export const coinsSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {
    setCoins: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
    addCoins: (state, action: PayloadAction<number>) => {
      state.total += action.payload;
    },
    resetCoins: (state) => {
      state.total = 0;
    }
  },
});

export const { setCoins, addCoins, resetCoins } = coinsSlice.actions;
export default coinsSlice.reducer;
