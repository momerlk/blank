import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LocationData } from '../screens/onboarding/LocationRequest/types';

interface UserState {
  phoneNumber: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  location: LocationData | null;
  interests: string[];
  onboardingCompleted: boolean;
}

const initialState: UserState = {
  phoneNumber: '',
  firstName: '',
  lastName: '',
  age: 0,
  gender: '',
  location: null,
  interests: [],
  onboardingCompleted: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
    },
    setFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload;
    },
    setAge: (state, action: PayloadAction<number>) => {
      state.age = action.payload;
    },
    setGender: (state, action: PayloadAction<string>) => {
      state.gender = action.payload;
    },
    setLocation: (state, action: PayloadAction<LocationData>) => {
      state.location = action.payload;
    },
    setInterests: (state, action: PayloadAction<string[]>) => {
      state.interests = action.payload;
    },
    completeOnboarding: (state) => {
      state.onboardingCompleted = true;
    },
  },
});

export const {
  setPhoneNumber,
  setFirstName,
  setLastName,
  setAge,
  setGender,
  setLocation,
  setInterests,
  completeOnboarding,
} = userSlice.actions;

export default userSlice.reducer;