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
      acuerdo_Url: null,
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
      this.aprobacion.acuerdo_Url = null;
      this.aprobacion.archivo_Acuerdo = null;
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
            oficina_Id: aprobacion.oficina_Id,
            tipo_Eleccion: aprobacion.tipo_Eleccion,
            tipo_Eleccion_Id: aprobacion.tipo_Eleccion_Id,
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
            tipo_Candidato: detalle.tipo_Candidato,
            id: detalle.id,
            candidato_Id: detalle.candidato_Id,
            candidato: detalle.candidato,
            partido_Siglas: detalle.partido_Siglas,
            logo_Partido: detalle.partido_Logo,
            coalicion_Siglas: detalle.coalicion_Siglas,
            logo_Coalicion: detalle.coalicion_Logo,
            distrito_Id: detalle.distrito_Id,
            municipio_Id: detalle.municipio_Id,
            demarcacion_Id: detalle.demarcacion_Id,
            distrito: detalle.distrito,
            municipio: detalle.municipio,
            demarcacion: detalle.demarcacion,
            puesto_Letra:
              detalle.puesto == 0
                ? "Propietario"
                : detalle.puesto == 1
                ? "Suplente"
                : detalle.puesto == 2
                ? "Propietario sindico"
                : "Suplente sindico",
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
            this.aprobacion.acuerdo_Url = data.acuerdo_Url;
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
