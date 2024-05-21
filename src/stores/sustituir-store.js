import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useSustituirStore = defineStore("useSustituirStore", {
  state: () => ({
    modal: false,
    modalEscrito: false,
    modalSubirAcuerdo: false,
    list_Sustituciones: [],
    list_Sustituciones_General: [],
    sustitucion: {
      id: null,
      Fecha_Sustitucion: null,
      Fecha_Registro: null,
      Empleado_Id: null,
      Tipo_Sustitucion: null,
      Escrito_Sustitucion: null,
      Tipo_Eleccion: null,
    },
    sust_propietario_1: {
      Nombres_Nuevo: null,
      Apellido_Paterno_Nuevo: null,
      Apellido_Materno_Nuevo: null,
      Mote_Nuevo: null,
      Sexo_Nuevo: null,
      Edad_Nuevo: null,
      Clave_Elector_Nuevo: null,
      RFC_Nuevo: null,
      CURP_Nuevo: null,
      Fecha_Nacimiento_Nuevo: null,
      Ocupacion_Nuevo: null,
      Telefono_Nuevo: null,
      Correo_Nuevo: null,
      Pertenece_Grupo_Vulnerable_Nuevo: false,
      Grupo_Vulnerable_Nuevo: null,
      Partido_Id_Nuevo: null,
      Foto_Nuevo: null,
      grupo_Vulnerable_1: false,
      grupo_Vulnerable_2: false,
      grupo_Vulnerable_3: false,
      grupo_Vulnerable_4: false,
      describir_Pueblos: null,
      describir_Diversidad: null,
      describir_Discapacidad: null,
      describir_Migrante: null,
      consecutivo: false,
      escrito_Url: null,
    },
    sust_propietario_2: {
      Nombres_Nuevo: null,
      Apellido_Paterno_Nuevo: null,
      Apellido_Materno_Nuevo: null,
      Mote_Nuevo: null,
      Sexo_Nuevo: null,
      Edad_Nuevo: null,
      Clave_Elector_Nuevo: null,
      RFC_Nuevo: null,
      CURP_Nuevo: null,
      Fecha_Nacimiento_Nuevo: null,
      Ocupacion_Nuevo: null,
      Telefono_Nuevo: null,
      Correo_Nuevo: null,
      Pertenece_Grupo_Vulnerable_Nuevo: false,
      Grupo_Vulnerable_Nuevo: null,
      Partido_Id_Nuevo: null,
      Foto_Nuevo: null,
      grupo_Vulnerable_1: false,
      grupo_Vulnerable_2: false,
      grupo_Vulnerable_3: false,
      grupo_Vulnerable_4: false,
      describir_Pueblos: null,
      describir_Diversidad: null,
      describir_Discapacidad: null,
      describir_Migrante: null,
      consecutivo: false,
      escrito_Url: null,
    },
    sust_suplente_1: {
      Nombres_Nuevo: null,
      Apellido_Paterno_Nuevo: null,
      Apellido_Materno_Nuevo: null,
      Mote_Nuevo: null,
      Sexo_Nuevo: null,
      Edad_Nuevo: null,
      Clave_Elector_Nuevo: null,
      RFC_Nuevo: null,
      CURP_Nuevo: null,
      Fecha_Nacimiento_Nuevo: null,
      Ocupacion_Nuevo: null,
      Telefono_Nuevo: null,
      Correo_Nuevo: null,
      Pertenece_Grupo_Vulnerable_Nuevo: false,
      Grupo_Vulnerable_Nuevo: null,
      Partido_Id_Nuevo: null,
      Foto_Nuevo: null,
      grupo_Vulnerable_1: false,
      grupo_Vulnerable_2: false,
      grupo_Vulnerable_3: false,
      grupo_Vulnerable_4: false,
      describir_Pueblos: null,
      describir_Diversidad: null,
      describir_Discapacidad: null,
      describir_Migrante: null,
      consecutivo: false,
      escrito_Url: null,
    },
    sust_suplente_2: {
      Nombres_Nuevo: null,
      Apellido_Paterno_Nuevo: null,
      Apellido_Materno_Nuevo: null,
      Mote_Nuevo: null,
      Sexo_Nuevo: null,
      Edad_Nuevo: null,
      Clave_Elector_Nuevo: null,
      RFC_Nuevo: null,
      CURP_Nuevo: null,
      Fecha_Nacimiento_Nuevo: null,
      Ocupacion_Nuevo: null,
      Telefono_Nuevo: null,
      Correo_Nuevo: null,
      Pertenece_Grupo_Vulnerable_Nuevo: false,
      Grupo_Vulnerable_Nuevo: null,
      Partido_Id_Nuevo: null,
      Foto_Nuevo: null,
      grupo_Vulnerable_1: false,
      grupo_Vulnerable_2: false,
      grupo_Vulnerable_3: false,
      grupo_Vulnerable_4: false,
      describir_Pueblos: null,
      describir_Diversidad: null,
      describir_Discapacidad: null,
      describir_Migrante: null,
      consecutivo: false,
      escrito_Url: null,
    },
  }),
  actions: {
    actualizarModal(valor) {
      this.modal = valor;
    },

    actualizarModalEscrito(valor) {
      this.modalEscrito = valor;
    },

    actualizarSubirAcuerdo(valor) {
      this.modalSubirAcuerdo = valor;
    },

    initSustituir() {
      this.sustitucion.id = null;
      this.sustitucion.Fecha_Sustitucion = null;
      this.sustitucion.Fecha_Registro = null;
      this.sustitucion.Empleado_Id = null;
      this.sustitucion.Tipo_Sustitucion = null;
      this.sustitucion.No_Acuerdo = null;

      this.sust_propietario_1.Nombres_Nuevo = null;
      this.sust_propietario_1.Apellido_Paterno_Nuevo = null;
      this.sust_propietario_1.Apellido_Materno_Nuevo = null;
      this.sust_propietario_1.Mote_Nuevo = null;
      this.sust_propietario_1.Sexo_Nuevo = null;
      this.sust_propietario_1.Clave_Elector_Nuevo = null;
      this.sust_propietario_1.RFC_Nuevo = null;
      this.sust_propietario_1.CURP_Nuevo = null;
      this.sust_propietario_1.Fecha_Nacimiento_Nuevo = null;
      this.sust_propietario_1.Ocupacion_Nuevo = null;
      this.sust_propietario_1.Telefono_Nuevo = null;
      this.sust_propietario_1.Correo_Nuevo = null;
      this.sust_propietario_1.Pertenece_Grupo_Vulnerable_Nuevo = false;
      this.sust_propietario_1.Grupo_Vulnerable_Nuevo = null;
      this.sust_propietario_1.Partido_Id_Nuevo = null;
      this.sust_propietario_1.Foto_Nuevo = null;
      this.sust_propietario_1.grupo_Vulnerable_1 = null;
      this.sust_propietario_1.grupo_Vulnerable_2 = null;
      this.sust_propietario_1.grupo_Vulnerable_3 = null;
      this.sust_propietario_1.grupo_Vulnerable_4 = null;
      this.sust_propietario_1.Edad_Nuevo = null;
      this.sust_propietario_1.escrito_Url = null;

      this.sust_propietario_2.Nombres_Nuevo = null;
      this.sust_propietario_2.Apellido_Paterno_Nuevo = null;
      this.sust_propietario_2.Apellido_Materno_Nuevo = null;
      this.sust_propietario_2.Mote_Nuevo = null;
      this.sust_propietario_2.Sexo_Nuevo = null;
      this.sust_propietario_2.Clave_Elector_Nuevo = null;
      this.sust_propietario_2.RFC_Nuevo = null;
      this.sust_propietario_2.CURP_Nuevo = null;
      this.sust_propietario_2.Fecha_Nacimiento_Nuevo = null;
      this.sust_propietario_2.Ocupacion_Nuevo = null;
      this.sust_propietario_2.Telefono_Nuevo = null;
      this.sust_propietario_2.Correo_Nuevo = null;
      this.sust_propietario_2.Pertenece_Grupo_Vulnerable_Nuevo = false;
      this.sust_propietario_2.Grupo_Vulnerable_Nuevo = null;
      this.sust_propietario_2.Partido_Id_Nuevo = null;
      this.sust_propietario_2.Foto_Nuevo = null;
      this.sust_propietario_2.grupo_Vulnerable_1 = null;
      this.sust_propietario_2.grupo_Vulnerable_2 = null;
      this.sust_propietario_2.grupo_Vulnerable_3 = null;
      this.sust_propietario_2.grupo_Vulnerable_4 = null;
      this.sust_propietario_2.Edad_Nuevo = null;
      this.sust_propietario_2.escrito_Url = null;

      this.sust_suplente_1.Nombres_Nuevo = null;
      this.sust_suplente_1.Apellido_Paterno_Nuevo = null;
      this.sust_suplente_1.Apellido_Materno_Nuevo = null;
      this.sust_suplente_1.Mote_Nuevo = null;
      this.sust_suplente_1.Sexo_Nuevo = null;
      this.sust_suplente_1.Clave_Elector_Nuevo = null;
      this.sust_suplente_1.RFC_Nuevo = null;
      this.sust_suplente_1.CURP_Nuevo = null;
      this.sust_suplente_1.Fecha_Nacimiento_Nuevo = null;
      this.sust_suplente_1.Ocupacion_Nuevo = null;
      this.sust_suplente_1.Telefono_Nuevo = null;
      this.sust_suplente_1.Correo_Nuevo = null;
      this.sust_suplente_1.Pertenece_Grupo_Vulnerable_Nuevo = false;
      this.sust_suplente_1.Grupo_Vulnerable_Nuevo = null;
      this.sust_suplente_1.Partido_Id_Nuevo = null;
      this.sust_suplente_1.Foto_Nuevo = null;
      this.sust_suplente_1.grupo_Vulnerable_1 = null;
      this.sust_suplente_1.grupo_Vulnerable_2 = null;
      this.sust_suplente_1.grupo_Vulnerable_3 = null;
      this.sust_suplente_1.grupo_Vulnerable_4 = null;
      this.sust_suplente_1.Edad_Nuevo = null;
      this.sust_suplente_1.escrito_Url = null;

      this.sust_suplente_2.Nombres_Nuevo = null;
      this.sust_suplente_2.Apellido_Paterno_Nuevo = null;
      this.sust_suplente_2.Apellido_Materno_Nuevo = null;
      this.sust_suplente_2.Mote_Nuevo = null;
      this.sust_suplente_2.Sexo_Nuevo = null;
      this.sust_suplente_2.Clave_Elector_Nuevo = null;
      this.sust_suplente_2.RFC_Nuevo = null;
      this.sust_suplente_2.CURP_Nuevo = null;
      this.sust_suplente_2.Fecha_Nacimiento_Nuevo = null;
      this.sust_suplente_2.Ocupacion_Nuevo = null;
      this.sust_suplente_2.Telefono_Nuevo = null;
      this.sust_suplente_2.Correo_Nuevo = null;
      this.sust_suplente_2.Pertenece_Grupo_Vulnerable_Nuevo = false;
      this.sust_suplente_2.Grupo_Vulnerable_Nuevo = null;
      this.sust_suplente_2.Partido_Id_Nuevo = null;
      this.sust_suplente_2.Foto_Nuevo = null;
      this.sust_suplente_2.grupo_Vulnerable_1 = null;
      this.sust_suplente_2.grupo_Vulnerable_2 = null;
      this.sust_suplente_2.grupo_Vulnerable_3 = null;
      this.sust_suplente_2.grupo_Vulnerable_4 = null;
      this.sust_suplente_2.Edad_Nuevo = null;
      this.sust_suplente_2.escrito_Url = null;
    },

    //----------------------------------------------------------------------
    //SUSTITUIR CANDIDATO
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

    //----------------------------------------------------------------------
    //LOAD SUSTITUCION BY CANDIDATO
    async loadSustituciones() {
      try {
        this.list_Sustituciones_General = [];
        let resp = await api.get("/Sustituciones");
        let { data } = resp.data;
        this.list_Sustituciones_General = data.map((sustitucion) => {
          return {
            oficina: sustitucion.oficina,
            oficina_Id: sustitucion.oficina_Id,
            id: sustitucion.id,
            candidato_Id: sustitucion.candidato_Id,
            fecha_Sustitucion: sustitucion.fecha_Sustitucion,
            fecha_Registro: sustitucion.fecha_Registro,
            empleado: sustitucion.empleado,
            tipo_Sustitucion: sustitucion.tipo_Sustitucion,
            no_Acuerdo: sustitucion.no_Acuerdo,
            nombres_Anterior: sustitucion.nombres_Anterior,
            apellido_Paterno_Anterior: sustitucion.apellido_Paterno_Anterior,
            apellido_Materno_Anterior: sustitucion.apellido_Materno_Anterior,
            mote_Anterior: sustitucion.mote_Anterior,
            sexo_Anterior: sustitucion.sexo_Anterior,
            clave_Elector_Anterior: sustitucion.clave_Elector_Anterior,
            rfC_Anterior: sustitucion.rfC_Anterior,
            curP_Anterior: sustitucion.curP_Anterior,
            fecha_Nacimiento_Anterior: sustitucion.fecha_Nacimiento_Anterior,
            ocupacion_Anterior: sustitucion.ocupacion_Anterior,
            telefono_Anterior: sustitucion.telefono_Anterior,
            correo_Anterior: sustitucion.correo_Anterior,
            pertenece_Grupo_Vulnerable_Anterior:
              sustitucion.pertenece_Grupo_Vulnerable_Anterior,
            grupo_Vulnerable_Anterior: sustitucion.grupo_Vulnerable_Anterior,
            partido_Id_Anterior: sustitucion.partido_Id_Anterior,
            partido_Anterior: sustitucion.partido_Anterior,
            nombres_Nuevo: sustitucion.nombres_Nuevo,
            apellido_Paterno_Nuevo: sustitucion.apellido_Paterno_Nuevo,
            apellido_Materno_Nuevo: sustitucion.apellido_Materno_Nuevo,
            mote_Nuevo: sustitucion.mote_Nuevo,
            sexo_Nuevo: sustitucion.sexo_Nuevo,
            clave_Elector_Nuevo: sustitucion.clave_Elector_Nuevo,
            rfC_Nuevo: sustitucion.rfC_Nuevo,
            curP_Nuevo: sustitucion.curP_Nuevo,
            fecha_Nacimiento_Nuevo: sustitucion.fecha_Nacimiento_Nuevo,
            ocupacion_Nuevo: sustitucion.ocupacion_Nuevo,
            telefono_Nuevo: sustitucion.telefono_Nuevo,
            correo_Nuevo: sustitucion.correo_Nuevo,
            pertenece_Grupo_Vulnerable_Nuevo:
              sustitucion.pertenece_Grupo_Vulnerable_Nuevo,
            grupo_Vulnerable_Nuevo: sustitucion.grupo_Vulnerable_Nuevo,
            partido_Id_Nuevo: sustitucion.partido_Id_Nuevo,
            partido_Nuevo: sustitucion.partido_Nuevo,
            escrito_Sustitucion_Url: sustitucion.escrito_Sustitucion_Url,
            tipo_Eleccion: sustitucion.tipo_Eleccion,
            is_Coalicion: sustitucion.is_Coalicion,
            coalicion_Id: sustitucion.coalicion_Id,
            logo_Coalicion_Url: sustitucion.logo_Coalicion_Url,
            is_Comun: sustitucion.is_Comun,
            comun_Id: sustitucion.comun_Id,
            logo_Comun_Url: sustitucion.logo_Comun_Url,
            logo_Partido_Anterior_Url: sustitucion.logo_Partido_Anterior_Url,
            logo_Partido_Nuevo_Url: sustitucion.logo_Partido_Nuevo_Url,
            distrito: sustitucion.distrito,
            distrito_Id: sustitucion.distritoId,
            no_Distrito: sustitucion.no_Distrito,
            municipio: sustitucion.municipio,
            municipio_Id: sustitucion.municipioId,
            demarcacion_Id: sustitucion.demarcacionId,
            demarcacion: sustitucion.demarcacion,
            tipo_Candidato: sustitucion.tipo_Candidato,
          };
        });
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    //----------------------------------------------------------------------
    //LOAD SUSTITUCION BY CANDIDATO
    async loadSustitucionByCandidato(id) {
      try {
        let resp = await api.get(`/Sustituciones/ByCandidato/${id}`);
        let { data } = resp.data;
        let listSustitucion = data.map((sustitucion) => {
          return {
            id: sustitucion.id,
            candidato_Id: sustitucion.candidato_Id,
            tipo_Sustitucion: sustitucion.tipo_Sustitucion,
            fecha_Sustitucion: sustitucion.fecha_Sustitucion,
            fecha_Registro: sustitucion.fecha_Registro,
            empleado_Id: sustitucion.empleado_Id,
            empleado: sustitucion.empleado,
            nombres_Anterior: sustitucion.nombres_Anterior,
            apellido_Paterno_Anterior: sustitucion.apellido_Paterno_Anterior,
            apellido_Materno_Anterior: sustitucion.apellido_Materno_Anterior,
            sexo_Anterior: sustitucion.sexo_Anterior,
            clave_Elector_Anterior: sustitucion.clave_Elector_Anterior,
            rfC_Anterior: sustitucion.rfC_Anterior,
            curP_Anterior: sustitucion.curP_Anterior,
            partido_Id_Anterior: sustitucion.partido_Id_Anterior,
            partido_Anterior: sustitucion.partido_Anterior,
            nombres_Nuevo: sustitucion.nombres_Nuevo,
            apellido_Paterno_Nuevo: sustitucion.apellido_Paterno_Nuevo,
            apellido_Materno_Nuevo: sustitucion.apellido_Materno_Nuevo,
            sexo_Nuevo: sustitucion.sexo_Nuevo,
            clave_Elector_Nuevo: sustitucion.clave_Elector_Nuevo,
            rfC_Nuevo: sustitucion.rfC_Nuevo,
            curP_Nuevo: sustitucion.curP_Nuevo,
            fecha_Nacimiento_Nuevo: sustitucion.fecha_Nacimiento_Nuevo,
            partido_Id_Nuevo: sustitucion.partido_Id_Nuevo,
            partido_Nuevo: sustitucion.partido_Nuevo,
            escrito_Sustitucion_Url: sustitucion.escrito_Sustitucion_Url,
          };
        });
        this.list_Sustituciones = listSustitucion;
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    //----------------------------------------------------------------------
    //SUBIR ACUERDO
    async subirAcuerdo(acuerdoFormData) {
      try {
        const resp = await api.post(
          "/Sustituciones/SubirAcuerdo",
          acuerdoFormData,
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
    //LOAD SUSTITUCION ID
    async loadSustitucionId(id) {
      try {
        let resp = await api.get(`/Sustituciones/${id}`);
        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success == true) {
            this.sustitucion.id = data.id;
            this.sustitucion.Escrito_Sustitucion = data.escrito_Sustitucion_Url;
          }
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
