import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useSustituirStore = defineStore("useSustituirStore", {
  state: () => ({
    modal: false,
    modalOficio: false,
    list_Sustituciones: [],
    sustitucion: {
      id: null,
      Fecha_Sustitucion: null,
      Fecha_Registro: null,
      Empleado_Id: null,
      Tipo_Sustitucion: null,
      No_Acuerdo: null,
    },
    sust_propietario_1: {
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
      Partido_Id_Nuevo: null,
      Foto_Nuevo: null,
      grupo_Vulnerable_1: null,
      grupo_Vulnerable_2: null,
      grupo_Vulnerable_3: null,
      grupo_Vulnerable_4: null,
    },
    sust_propietario_2: {
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
      Partido_Id_Nuevo: null,
      Foto_Nuevo: null,
      grupo_Vulnerable_1: null,
      grupo_Vulnerable_2: null,
      grupo_Vulnerable_3: null,
      grupo_Vulnerable_4: null,
    },
    sust_suplente_1: {
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
      Partido_Id_Nuevo: null,
      Foto_Nuevo: null,
      grupo_Vulnerable_1: null,
      grupo_Vulnerable_2: null,
      grupo_Vulnerable_3: null,
      grupo_Vulnerable_4: null,
    },
    sust_suplente_2: {
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
      Partido_Id_Nuevo: null,
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
            no_Acuerdo: sustitucion.no_Acuerdo,
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
          };
        });
        this.list_Sustituciones = listSustitucion;
      } catch (error) {}
    },
  },
});
