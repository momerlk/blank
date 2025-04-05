import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  phoneNumber: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  location: { lat: number; lng: number } | null;
  interests: string[];
  onboardingCompleted: boolean;
  profilePicture: string | null;
  email: string | null;
  isAuthenticated: boolean;
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
  email: null,
  isAuthenticated: false,
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
    setLocation: (state, action: PayloadAction<{ lat: number; lng: number } | null>) => {
      state.location = action.payload;
    },
    setInterests: (state, action: PayloadAction<string[]>) => {
      state.interests = action.payload;
    },
    setOnboardingCompleted: (state, action: PayloadAction<boolean>) => {
      state.onboardingCompleted = action.payload;
    },
    setProfilePicture: (state, action: PayloadAction<string | null>) => {
      state.profilePicture = action.payload;
    },
    setEmail: (state, action: PayloadAction<string | null>) => {
      state.email = action.payload;
    },
    updateProfile: (state, action: PayloadAction<Partial<UserState>>) => {
      Object.assign(state, action.payload);
    },
    resetUser: (state) => {
      Object.assign(state, initialState);
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
  setOnboardingCompleted,
  setProfilePicture,
  setEmail,
  updateProfile,
  resetUser,
} = userSlice.actions;

export default userSlice.reducer;