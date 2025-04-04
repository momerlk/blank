export interface LocationData {
    latitude: number;
    longitude: number;
}

export interface LocationState {
    location: LocationData | null;
    error: string | null;
    isLoading: boolean;
}
