import { defineStore } from "pinia";

export const useExampleStore = defineStore("useExampleStore", {
  state: () => ({
    modal: false,
  }),
  actions: {
    actualizarModal(valor) {
      this.modal = valor;
    },
  },
});
