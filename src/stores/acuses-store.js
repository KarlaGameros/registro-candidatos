import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useAcusesStore = defineStore("useAcusesStore", {
  state: () => ({
    modal: false,
    modalVerAcuse: false,
  }),
  actions: {
    actualizarModal(valor) {
      this.modal = valor;
    },
    actualizarModalVerAcuse(valor) {
      this.modalVerAcuse = valor;
    },
  },
});
