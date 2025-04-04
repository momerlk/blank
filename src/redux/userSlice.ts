import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LocationObject } from 'expo-location';

interface UserState {
  phoneNumber: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  location: LocationObject | null;
  interests: string[];
  onboardingCompleted: boolean;
  profilePicture: string | null;
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
  profilePicture: null,
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
    setLocation: (state, action: PayloadAction<LocationObject>) => {
      state.location = action.payload;
    },
    setInterests: (state, action: PayloadAction<string[]>) => {
      state.interests = action.payload;
    },
    setProfilePicture: (state, action: PayloadAction<string>) => {
      state.profilePicture = action.payload;
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
  setProfilePicture,
  completeOnboarding,
} = userSlice.actions;

export default userSlice.reducer;