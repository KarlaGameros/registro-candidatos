import { defineStore } from "pinia";

export const useSustituirStore = defineStore("useSustituirStore", {
  state: () => ({
    modal: false,
    modalOficio: false,
  }),
  actions: {
    actualizarModal(valor) {
      this.modal = valor;
    },
    actualizarModalOficio(valor) {
      this.modalOficio = valor;
    },
  },
});
