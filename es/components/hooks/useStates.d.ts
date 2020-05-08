import { Dispatch } from 'react';
export default function useStates<T>(initialValue: T): [T, Dispatch<Partial<T>>];
