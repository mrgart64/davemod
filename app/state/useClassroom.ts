// useName.ts (Modifikasi)

import { create } from "zustand";

interface IClassroomStore {
	/** Nama pengguna (yang diinput oleh user) */
	classroom: string; // 💡 GANTI: name -> userName

	/** Fungsi untuk mengatur nama pengguna */
	setClassroom: (classroom: string) => void; // 💡 GANTI: setName -> setUserName
}

const useClassroom = create<IClassroomStore>((set) => ({
	// Nilai inisialisasi
	classroom: "", // 💡 GANTI

	// Implementasi setter
	setClassroom: (classroom: string) => set({ classroom }) // 💡 GANTI
}));

export default useClassroom;
