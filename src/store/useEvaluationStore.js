// src/store/useEvaluationStore.js
import { create } from "zustand";

const useEvaluationStore = create((set) => ({
  evaluations: {},

  addEvaluation: (propertyId, note) =>
    set((state) => {
      const prev = state.evaluations[propertyId] || [];
      const updated = [...prev, note];
      const average =
        updated.reduce((a, b) => a + b, 0) / updated.length;

      console.log(`Évaluations pour ${propertyId}:`, updated);
      console.log(`Moyenne:`, average);

      if (average > 4.5) {
        alert("Propriété excellente !");
      }

      return {
        evaluations: {
          ...state.evaluations,
          [propertyId]: updated,
        },
      };
    }),
}));

export default useEvaluationStore;
