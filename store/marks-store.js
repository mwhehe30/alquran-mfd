import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useMarksStore = create(
  persist(
    (set) => ({
      marks: [],
      addMark: (surahNomor, ayatNomor, ayatText, namaSurah) =>
        set((state) => {
          const exists = state.marks.some(
            (m) => m.surahNomor === surahNomor && m.ayatNomor === ayatNomor
          );
          if (exists) return state;
          return {
            marks: [
              ...state.marks,
              { surahNomor, ayatNomor, ayatText, namaSurah },
            ],
          };
        }),
      removeMark: (surahNomor, ayatNomor) =>
        set((state) => ({
          marks: state.marks.filter(
            (m) => m.surahNomor !== surahNomor || m.ayatNomor !== ayatNomor
          ),
        })),
    }),
    {
      name: "marks-storage",
    }
  )
);
