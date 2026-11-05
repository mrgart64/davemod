import { create } from "zustand";

interface IModalStore {
	/** Status apakah modal donasi sedang terbuka atau tidak */
	isOpen: boolean;

	/** Fungsi untuk membuka modal donasi */
	onOpen: () => void;

	/** Fungsi untuk menutup modal donasi */
	onClose: () => void;

	/** Fungsi toggle untuk mengubah status modal (buka/tutup) */
	onToggle: () => void;
}

const useModal = create<IModalStore>((set) => ({
	// Nilai inisialisasi
	isOpen: false,

	// Implementasi setter & aksi
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
	onToggle: () => set((state) => ({ isOpen: !state.isOpen }))
}));

export default useModal;
