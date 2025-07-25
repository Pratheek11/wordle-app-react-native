import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Gender = "Male" | "Female" | "Other";

export interface UserState {
  name: string;
  username: string;
  age: number;
  gender: Gender;
}

const initialState: UserState = {
  name: "",
  username: "",
  age: 0,
  gender: "Other"
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.age = action.payload.age;
      state.gender = action.payload.gender;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
