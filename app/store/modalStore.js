const { create } = require("zustand");

export const useModalStore = create((set, get) => ({
    isModalOpen: false,
    setIsModalOpen: (action) => set({ isModalOpen: action })
}))