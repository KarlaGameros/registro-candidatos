import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useSustituirStore = defineStore("useSustituirStore", {
  state: () => ({
    modal: false,
    modalOficio: false,
    sustitucion: {
      id: null,
      Fecha_Sustitucion: null,
      Fecha_Registro: null,
      Empleado_Id: null,
      Tipo_Sustitucion: null,
      Nombres_Nuevo: null,
      Apellido_Paterno_Nuevo: null,
      Apellido_Materno_Nuevo: null,
      Mote_Nuevo: null,
      Sexo_Nuevo: null,
      Clave_Elector_Nuevo: null,
      RFC_Nuevo: null,
      CURP_Nuevo: null,
      Fecha_Nacimiento_Nuevo: null,
      Ocupacion_Nuevo: null,
      Telefono_Nuevo: null,
      Correo_Nuevo: null,
      Pertenece_Grupo_Vulnerable_Nuevo: false,
      Grupo_Vulnerable_Nuevo: null,
      Partido_Id_Nuevo: false,
      Foto_Nuevo: null,
      grupo_Vulnerable_1: null,
      grupo_Vulnerable_2: null,
      grupo_Vulnerable_3: null,
      grupo_Vulnerable_4: null,
    },
  }),
  actions: {
    actualizarModal(valor) {
      this.modal = valor;
    },
    actualizarModalOficio(valor) {
      this.modalOficio = valor;
    },
    //----------------------------------------------------------------------
    //CANDIDATO
    async sustituirCandidato(CandidatoId, candidatoFormData) {
      try {
        const resp = await api.post(
          `/Sustituciones/${CandidatoId}`,
          candidatoFormData,
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
