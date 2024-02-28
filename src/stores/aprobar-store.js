import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useAprobarStore = defineStore("useAprobarStore", {
  state: () => ({
    modal: false,
    modalAcuerdo: false,
    isEditar: false,
    loading: false,
    list_Aprobacion_Candidaturas: [],
    list_Detalle: [],
    aprobacion: {
      acuerdo: null,
      fecha_Aprobacion: null,
      archivo_Acuerdo: null,
      detalle: [],
    },
  }),
  actions: {
    //----------------------------------------------------------------------
    actualizarModal(valor) {
      this.modal = valor;
    },

    actualizarModalAcuerdo(valor) {
      this.modalAcuerdo = valor;
    },

    updateEditar(valor) {
      this.isEditar = valor;
    },

    initAprobacion() {
      this.aprobacion.acuerdo = null;
      this.aprobacion.fecha_Aprobacion = null;
      this.list_Detalle = [];
      this.aprobacion.detalle = [];
    },

    //----------------------------------------------------------------------
    //GET ALL APROBAR CANDIDATO
    async loadAprobacionCandidaturas() {
      try {
        this.loading = true;
        let resp = await api.get("/AprobacionCandidaturas");
        let { data } = resp.data;
        let listAprobados = data.map((aprobacion) => {
          return {
            id: aprobacion.id,
            usuario_Id: aprobacion.usuario_Id,
            usuario: aprobacion.usuario,
            acuerdo: aprobacion.acuerdo,
            fecha_Aprobacion: aprobacion.fecha_Aprobacion,
            fecha_Registro: aprobacion.fecha_Registro,
            fecha_Aprobacion_Tabla: aprobacion.fecha_Aprobacion_Tabla,
            acuerdo_Url: aprobacion.acuerdo_Url,
          };
        });
        this.list_Aprobacion_Candidaturas = listAprobados;
        this.loading = false;
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    //----------------------------------------------------------------------
    //GET DETALLE APROBAR CANDIDATO
    async loadDetalle(id) {
      try {
        let resp = await api.get(`/AprobacionCandidaturas/GetDetalle/${id}`);
        let { data } = resp.data;
        let listDetalle = data.map((detalle) => {
          return {
            id: detalle.id,
            candidato_Id: detalle.candidato_Id,
            candidato: detalle.candidato,
            partido_Siglas: detalle.partido_Siglas,
            partido_Logo: detalle.partido_Logo,
            coalicion_Siglas: detalle.coalicion_Siglas,
            coalicion_Logo: detalle.coalicion_Logo,
          };
        });
        this.list_Detalle = listDetalle;
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    //----------------------------------------------------------------------
    //UPDATE APROBACION
    async updateAprobacion(aprobacion) {
      try {
        const resp = await api.put(
          `/AprobacionCandidaturas/${aprobacion.id}`,
          aprobacion
        );
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

    //----------------------------------------------------------------------
    //GET APROBAR CANDIDATO BY ID
    async loadAprobacionCandidaturaById(id) {
      try {
        let resp = await api.get(`/AprobacionCandidaturas/${id}`);
        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success == true) {
            this.aprobacion.id = data.id;
            this.aprobacion.acuerdo = data.acuerdo;
            this.aprobacion.fecha_Aprobacion = data.fecha_Aprobacion;
          }
        }
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    //----------------------------------------------------------------------
    //APROBAR CANDIDATO
    async aprobarCandidatos(candidatos, tipo_Eleccion_Id) {
      try {
        const resp = await api.post(
          `/AprobacionCandidaturas/${tipo_Eleccion_Id}`,
          candidatos,
          {
            headers: {
              "Conten-Type": "multipart/form-data",
            },
          }
        );
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

    //----------------------------------------------------------------------
    //SUBIR ACUERDO
    async subirAcuerdo(aprobacion_Id, acuerdo) {
      try {
        const resp = await api.post(
          `/AprobacionCandidaturas/SetAcuerdo/${aprobacion_Id}`,
          acuerdo,
          {
            headers: {
              "Conten-Type": "multipart/form-data",
            },
          }
        );
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
