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

    //----------------------------------------------------------------------
    //SUBIR ACUSES
    async subirAcuses(id, acuse) {
      try {
        const resp = await api.post(`/Candidatos/Acuses/${id}`, acuse, {
          headers: {
            "Conten-Type": "multipart/form-data",
          },
        });
        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success === true) {
            return { success, data };
          } else {
            return { success, data };
          }
        } else {
          return {
            success: false,
            data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
          };
        }
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },
  },
});
