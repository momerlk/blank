export interface Interest {
    id: string;
    label: string;
    value: string;
    icon?: string;
}

export interface InterestState {
    selectedInterests: string[];
    error: string | null;
}
