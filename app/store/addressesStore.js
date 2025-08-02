import { create } from 'zustand'

export const useAddresseStore = create((set) => ({
    address: null,
    setAddress: (newAddress) => set({ address: newAddress }),
}))
