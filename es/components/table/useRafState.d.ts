import { SetStateAction, Dispatch } from 'react';
export default function useRafState<T>(initialState: T | (() => T)): [T, Dispatch<SetStateAction<T>>];
