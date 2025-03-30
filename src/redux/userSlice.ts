import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  phoneNumber: string;
  name: string;
  age: number;
  gender: string;
  interests: string[];
  location: string;
  password: string;
  onboardingCompleted: boolean;
}

const initialState: UserState = {
  phoneNumber: '',
  name: '',
  age: 0,
  gender: '',
  interests: [],
  location: '',
  password: '',
  onboardingCompleted: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPhoneNumber(state, action: PayloadAction<string>) {
      state.phoneNumber = action.payload;
    },
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setAge(state, action: PayloadAction<number>) {
      state.age = action.payload;
    },
    setGender(state, action: PayloadAction<string>) {
      state.gender = action.payload;
    },
    setInterests(state, action: PayloadAction<string[]>) {
      state.interests = action.payload;
    },
    setLocation(state, action: PayloadAction<string>) {
      state.location = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    completeOnboarding(state) {
      state.onboardingCompleted = true;
    },
    resetOnboarding(state){
      state.onboardingCompleted = false;
    }
  },
});

export const {
  setPhoneNumber,
  setName,
  setAge,
  setGender,
  setInterests,
  setLocation,
  setPassword,
  completeOnboarding,
  resetOnboarding
} = userSlice.actions;

export default userSlice.reducer;