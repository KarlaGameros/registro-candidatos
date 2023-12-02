import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useCandidatosStore = defineStore("useCandidatosStore", {
  state: () => ({
    modal: false,
    isEditar: false,

    modalSustituir: false,
    list_Candidatos: [],
    candidato: {
      id: null,
      tipo_Eleccion_Id: null,
      municipio_Id: null,
      distrito_Id: null,
      demarcacion_Id: null,
      coalicion_Id: null,
      is_Coalicion: false,
      tipo_Candidato: null,
      orden: null,
      activo: null,
      fecha_Registro: null,
      //---------------------------------
      nombre_Completo_Propietario: null,
      nombres_Propietario: null,
      apellido_Paterno_Propietario: null,
      apellido_Materno_Propietario: null,
      mote_Propietario: null,
      sexo_Propietario: null,
      url_Foto_Propietario: null,
      clave_Elector_Propietario: null,
      rfc_Propietario: null,
      curp_Propietario: null,
      fecha_Nacimiento_Propietario: null,
      ocupacion_Propietario: null,
      telefono_Propietario: null,
      correo_Propietario: null,
      pertenece_Grupo_Vulnerable_Propietario: false,
      grupo_Vulnerable_Propietario: null,
      partido_Id: null,
      grupoProp_1: null,
      grupoProp_2: null,
      grupoProp_3: null,
      grupoProp_4: null,
      extension_Prop: null,
      //---------------------------------
      nombre_Completo_Propietario_2: null,
      nombres_Propietario_2: null,
      apellido_Paterno_Propietario_2: null,
      apellido_Materno_Propietario_2: null,
      mote_Propietario_2: null,
      sexo_Propietario_2: null,
      url_Foto_Propietario_2: null,
      clave_Elector_Propietario_2: null,
      rfc_Propietario_2: null,
      curp_Propietario_2: null,
      fecha_Nacimiento_Propietario_2: null,
      ocupacion_Propietario_2: null,
      telefono_Propietario_2: null,
      correo_Propietario_2: null,
      pertenece_Grupo_Vulnerable_Propietario_2: false,
      grupo_Vulnerable_Propietario_2: null,
      partido_Propietario_2_Id: null,
      //---------------------------------
      nombre_Completo_Suplente: null,
      nombres_Suplente: null,
      apellido_Paterno_Suplente: null,
      apellido_Materno_Suplente: null,
      mote_Suplente: null,
      sexo_Suplente: null,
      url_Foto_Suplente: null,
      clave_Elector_Suplente: null,
      rfc_Suplente: null,
      curp_Suplente: null,
      fecha_Nacimiento_Suplente: null,
      ocupacion_Suplente: null,
      telefono_Suplente: null,
      correo_Suplente: null,
      pertenece_Grupo_Vulnerable_Suplente: false,
      grupo_Vulnerable_Suplente: null,
      partido_Suplente_Id: null,
      //---------------------------------
      nombre_Completo_Suplente_2: null,
      nombres_Suplente_2: null,
      apellido_Paterno_Suplente_2: null,
      apellido_Materno_Suplente_2: null,
      mote_Suplente_2: null,
      sexo_Suplente_2: null,
      url_Foto_Suplente_2: null,
      clave_Elector_Suplente_2: null,
      rfc_Suplente_2: null,
      curp_Suplente_2: null,
      fecha_Nacimiento_Suplente_2: null,
      ocupacion_Suplente_2: null,
      telefono_Suplente_2: null,
      correo_Suplente_2: null,
      pertenece_Grupo_Vulnerable_Suplente_2: false,
      grupo_Vulnerable_Suplente_2: null,
      partido_Suplente_2_Id: null,
    },
  }),
  actions: {
    actualizarModal(valor) {
      this.modal = valor;
    },
    updateEditar(valor) {
      this.isEditar = valor;
    },
    actualizarModalSustituir(valor) {
      this.modalSustituir = valor;
    },
    //----------------------------------------------------------------------
    //INTI CANDIDATO
    initiCandidato() {
      this.candidato.id = null;
      this.candidato.tipo_Eleccion_Id = null;
      this.candidato.municipio_Id = null;
      this.candidato.distrito_Id = null;
      this.candidato.demarcacion_Id = null;
      this.candidato.coalicion_Id = null;
      this.candidato.is_Coalicion = false;
      this.candidato.tipo_Candidato = null;
      this.candidato.orden = null;
      this.candidato.activo = null;
      //---------------------------------
      this.candidato.nombre_Completo_Propietario = null;
      this.candidato.nombres_Propietario = null;
      this.candidato.apellido_Paterno_Propietario = null;
      this.candidato.apellido_Materno_Propietario = null;
      this.candidato.mote_Propietario = null;
      this.candidato.sexo_Propietario = null;
      this.candidato.url_Foto_Propietario = null;
      this.candidato.clave_Elector_Propietario = null;
      this.candidato.rfc_Propietario = null;
      this.candidato.curp_Propietario = null;
      this.candidato.fecha_Nacimiento_Propietario = null;
      this.candidato.ocupacion_Propietario = null;
      this.candidato.telefono_Propietario = null;
      this.candidato.correo_Propietario = null;
      this.candidato.pertenece_Grupo_Vulnerable_Propietario = null;
      this.candidato.grupo_Vulnerable_Propietario = null;
      this.candidato.partido_Id = null;
      //---------------------------------
      this.candidato.nombre_Completo_Propietario_2 = null;
      this.candidato.nombres_Propietario_2 = null;
      this.candidato.apellido_Paterno_Propietario_2 = null;
      this.candidato.apellido_Materno_Propietario_2 = null;
      this.candidato.mote_Propietario_2 = null;
      this.candidato.sexo_Propietario_2 = null;
      this.candidato.url_Foto_Propietario_2 = null;
      this.candidato.clave_Elector_Propietario_2 = null;
      this.candidato.rfc_Propietario_2 = null;
      this.candidato.curp_Propietario_2 = null;
      this.candidato.fecha_Nacimiento_Propietario_2 = null;
      this.candidato.ocupacion_Propietario_2 = null;
      this.candidato.telefono_Propietario_2 = null;
      this.candidato.correo_Propietario_2 = null;
      this.candidato.pertenece_Grupo_Vulnerable_Propietario_2 = null;
      this.candidato.grupo_Vulnerable_Propietario_2 = null;
      this.candidato.partido_Propietario_2_Id = null;
      //---------------------------------
      this.candidato.nombre_Completo_Suplente = null;
      this.candidato.nombres_Suplente = null;
      this.candidato.apellido_Paterno_Suplente = null;
      this.candidato.apellido_Materno_Suplente = null;
      this.candidato.mote_Suplente = null;
      this.candidato.sexo_Suplente = null;
      this.candidato.url_Foto_Suplente = null;
      this.candidato.clave_Elector_Suplente = null;
      this.candidato.rfc_Suplente = null;
      this.candidato.curp_Suplente = null;
      this.candidato.fecha_Nacimiento_Suplente = null;
      this.candidato.ocupacion_Suplente = null;
      this.candidato.telefono_Suplente = null;
      this.candidato.correo_Suplente = null;
      this.candidato.pertenece_Grupo_Vulnerable_Suplente = null;
      this.candidato.grupo_Vulnerable_Suplente = null;
      this.candidato.partido_Suplente_Id = null;
      //---------------------------------
      this.candidato.nombre_Completo_Suplente_2 = null;
      this.candidato.nombres_Suplente_2 = null;
      this.candidato.apellido_Paterno_Suplente_2 = null;
      this.candidato.apellido_Materno_Suplente_2 = null;
      this.candidato.mote_Suplente_2 = null;
      this.candidato.sexo_Suplente_2 = null;
      this.candidato.url_Foto_Suplente_2 = null;
      this.candidato.clave_Elector_Suplente_2 = null;
      this.candidato.rfc_Suplente_2 = null;
      this.candidato.curp_Suplente_2 = null;
      this.candidato.fecha_Nacimiento_Suplente_2 = null;
      this.candidato.ocupacion_Suplente_2 = null;
      this.candidato.telefono_Suplente_2 = null;
      this.candidato.correo_Suplente_2 = null;
      this.candidato.pertenece_Grupo_Vulnerable_Suplente_2 = null;
      this.candidato.grupo_Vulnerable_Suplente_2 = null;
      this.candidato.partido_Suplente_2_Id = null;
    },
    //----------------------------------------------------------------------
    //CANDIDATO
    async createCandidato(candidato) {
      try {
        const resp = await api.post("/Candidatos", candidato, {
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

    //-----------------------------------------------------------

    async updateCandidato(id, candidato) {
      try {
        const resp = await api.put(`/Candidatos/${id}`, candidato, {
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

    //-----------------------------------------------------------

    async loadCandidatos() {
      try {
        let resp = await api.get("/Candidatos");
        let { data } = resp.data;
        let listCandidatos = data.map((candidato) => {
          return {
            id: candidato.id,
            id_Expand: candidato.id,
            tipo_Eleccion_Id: candidato.tipo_Eleccion_Id,
            tipo_Eleccion: candidato.tipo_Eleccion,
            municipio_Id: candidato.municipio_Id,
            municipio: candidato.municipio,
            distrito_Id: candidato.distrito_Id,
            distrito: candidato.distrito,
            demarcacion_Id: candidato.demarcacion_Id,
            demarcacion: candidato.demarcacion,
            coalicion_Id: candidato.coalicion_Id,
            is_Coalicion: candidato.is_Coalicion,
            coalicion: candidato.coalicion,
            tipo_Candidato: candidato.tipo_Candidato,
            orden: candidato.orden,
            activo: candidato.activo,
            fecha_registro: candidato.fecha_Registro,
            //---------------------------------
            nombre_Completo_Propietario: `${candidato.nombres_Propietario} ${candidato.apellido_Paterno_Propietario} ${candidato.apellido_Materno_Propietario}`,
            nombres_Propietario: candidato.nombres_Propietario,
            apellido_Paterno_Propietario:
              candidato.apellido_Paterno_Propietario,
            apellido_Materno_Propietario:
              candidato.apellido_Materno_Propietario,
            mote_Propietario: candidato.mote_Propietario,
            genero_Propietario: candidato.sexo_Propietario,
            url_Foto_Propietario: candidato.url_Foto_Propietario,
            clave_Elector_Propietario: candidato.clave_Elector_Propietario,
            rfc_Propietario: candidato.rfc_Propietario,
            curp_Propietario: candidato.curp_Propietario,
            fecha_Nacimiento_Propietario:
              candidato.fecha_Nacimiento_Propietario,
            ocupacion_Propietario: candidato.ocupacion_Propietario,
            telefono_Propietario: candidato.telefono_Propietario,
            correo_Propietario: candidato.correo_Propietario,
            pertenece_Grupo_Vulerable_Propietario:
              candidato.pertenece_Grupo_Vulerable_Propietario,
            grupo_Vulnerable_Propietario:
              candidato.grupo_Vulnerable_Propietario,
            partido_Id: candidato.partido_Id,
            partido: candidato.partido,
            //---------------------------------
            nombre_Completo_Propietario_2: `${candidato.nombres_Propietario_2} ${candidato.apellido_Paterno_Propietario_2} ${candidato.apellido_Materno_Propietario_2}`,
            nombres_Propietario_2: candidato.nombres_Propietario_2,
            apellido_Paterno_Propietario_2:
              candidato.apellido_Materno_Propietario_2,
            apellido_Materno_Propietario_2:
              candidato.apellido_Materno_Propietario_2,
            mote_Propietario_2: candidato.mote_Propietario_2,
            sexo_Propietario_2: candidato.sexo_Propietario_2,
            foto_Propietario_2: candidato.foto_Propietario_2,
            clave_Elector_Propietario_2: candidato.clave_Elector_Propietario_2,
            rfc_Propietario_2: candidato.rfc_Propietario_2,
            curp_Propietario_2: candidato.curp_Propietario_2,
            fecha_Nacimiento_Propietario_2:
              candidato.fecha_Nacimiento_Propietario_2,
            ocupacion_Propietario_2: candidato.ocupacion_Propietario_2,
            telefono_Propietario_2: candidato.telefono_Propietario_2,
            correo_Propietario_2: candidato.correo_Propietario_2,
            pertenece_Grupo_Vulerable_Propietario_2:
              candidato.pertenece_Grupo_Vulerable_Propietario_2,
            grupo_Vulnerable_Propietario_2:
              candidato.grupo_Vulnerable_Propietario_2,
            partido_Propietario_2_Id: candidato.partido_Propietario_2_Id,
            //---------------------------------
            nombre_Completo_Suplente: `${candidato.nombres_Suplente} ${candidato.apellido_Paterno_Suplente} ${candidato.apellido_Materno_Suplente}`,
            nombres_Suplente: candidato.nombres_Suplente,
            apellido_Paterno_Suplente: candidato.apellido_Paterno_Suplente,
            apellido_Materno_Suplente: candidato.apellido_Materno_Suplente,
            mote_Suplente: candidato.mote_Suplente,
            sexo_Suplente: candidato.sexo_Suplente,
            url_Foto_Suplente: candidato.url_Foto_Suplente,
            clave_Elector_Suplente: candidato.clave_Elector_Suplente,
            rfc_Suplente: candidato.rfc_Suplente,
            curp_Suplente: candidato.curp_Suplente,
            fecha_Nacimiento_Suplente: candidato.fecha_Nacimiento_Suplente,
            ocupacion_Suplente: candidato.ocupacion_Suplente,
            telefono_Suplente: candidato.telefono_Suplente,
            correo_Suplente: candidato.correo_Suplente,
            pertenece_Grupo_Vulerable_Suplente:
              candidato.pertenece_Grupo_Vulerable_Suplente,
            grupo_Vulnerable_Suplente: candidato.grupo_Vulnerable_Suplente,
            partido_Suplente_Id: candidato.partido_Suplente_Id,
            //---------------------------------
            nombre_Completo_Suplente_2: `${candidato.nombres_Suplente_2} ${candidato.apellido_Paterno_Suplente_2} ${candidato.apellido_Materno_Suplente_2}`,
            nombres_Suplente_2: candidato.nombres_Suplente_2,
            apellido_Paterno_Suplente_2: candidato.apellido_Paterno_Suplente_2,
            apellido_Materno_Suplente_2: candidato.apellido_Materno_Suplente_2,
            mote_Suplente_2: candidato.mote_Suplente_2,
            sexo_Suplente_2: candidato.sexo_Suplente_2,
            foto_Suplente_2: candidato.foto_Suplente_2,
            clave_Elector_Suplente_2: candidato.clave_Elector_Suplente_2,
            rfc_Suplente_2: candidato.rfc_Suplente_2,
            curp_Suplente_2: candidato.curp_Suplente_2,
            fecha_Nacimiento_Suplente_2: candidato.fecha_Nacimiento_Suplente_2,
            ocupacion_Suplente_2: candidato.ocupacion_Suplente_2,
            telefono_Suplente_2: candidato.telefono_Suplente_2,
            correo_Suplente_2: candidato.correo_Suplente_2,
            pertenece_Grupo_Vulerable_Suplente_2:
              candidato.pertenece_Grupo_Vulerable_Suplente_2,
            grupo_Vulnerable_Suplente_2: candidato.grupo_Vulnerable_Suplente_2,
            partido_Suplente_Id_2: candidato.partido_Suplente_Id_2,
          };
        });

        this.list_Candidatos = listCandidatos;
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, intentelo de nuevo. Si el error perisiste, contacte a soporte",
        };
      }
    },

    //-----------------------------------------------------------
    async loadCandidato(id) {
      try {
        let resp = null;
        resp = await api.get(`/Candidatos/${id}`);
        if (resp.status == 200) {
          const { success, data } = resp.data;
          console.log("data", data);
          if (success == true) {
            this.candidato.activo = data.activo;
            this.candidato.id = data.id;
            this.candidato.tipo_Eleccion_Id = data.tipo_Eleccion_Id;
            this.candidato.municipio_Id = data.municipio_Id;
            this.candidato.distrito_Id = data.distrito_Id;
            this.candidato.distrito = data.distrito;
            this.candidato.demarcacion_Id = data.demarcacion_Id;
            this.candidato.coalicion_Id = data.coalicion_Id;
            this.candidato.is_Coalicion = data.is_Coalicion;
            this.candidato.tipo_Candidato = data.tipo_Candidato;
            this.candidato.orden = data.orden;
            this.candidato.nombre_Completo_Propietario = `${data.nombres_Propietario} ${data.apellido_Paterno_Propietario} ${data.apellido_Materno_Propietario}`;
            this.candidato.nombres_Propietario = data.nombres_Propietario;
            this.candidato.apellido_Paterno_Propietario =
              data.apellido_Paterno_Propietario;
            this.candidato.apellido_Materno_Propietario =
              data.apellido_Materno_Propietario;
            this.candidato.mote_Propietario = data.mote_Propietario;
            this.candidato.sexo_Propietario = data.sexo_Propietario;
            this.candidato.url_Foto_Propietario = data.url_Foto_Propietario;
            this.candidato.clave_Elector_Propietario =
              data.clave_Elector_Propietario;
            this.candidato.rfc_Propietario = data.rfC_Propietario;
            this.candidato.curp_Propietario = data.curP_Propietario;
            this.candidato.fecha_Nacimiento_Propietario =
              data.fecha_Nacimiento_Propietario;
            this.candidato.ocupacion_Propietario = data.ocupacion_Propietario;
            this.candidato.correo_Propietario = data.correo_Propietario;
            this.candidato.pertenece_Grupo_Vulnerable_Propietario =
              data.pertenece_Grupo_Vulnerable_Propietario;
            this.candidato.grupo_Vulnerable_Propietario =
              data.grupo_Vulnerable_Propietario;
            this.candidato.partido_Id = data.partido_Id;
            this.candidato.partido = data.partido;
            this.candidato.nombre_Completo_Propietario_2 = `${data.nombres_Propietario_2} ${data.apellido_Paterno_Propietario_2} ${data.apellido_Materno_Propietario_2}`;
            this.candidato.nombres_Propietario_2 = data.nombres_Propietario_2;
            this.candidato.apellido_Paterno_Propietario_2 =
              data.apellido_Paterno_Propietario_2;
            this.candidato.apellido_Materno_Propietario_2 =
              data.apellido_Materno_Propietario_2;
            this.candidato.mote_Propietario_2 = data.mote_Propietario_2;
            this.candidato.sexo_Propietario_2 = data.sexo_Propietario_2;
            this.candidato.clave_Elector_Propietario_2 =
              data.clave_Elector_Propietario_2;
            this.candidato.url_Foto_Propietario_2 = data.url_Foto_Propietario_2;
            this.candidato.rfc_Propietario_2 = data.rfc_Propietario_2;
            this.candidato.curp_Propietario_2 = data.curp_Propietario_2;
            this.candidato.fecha_Nacimiento_Propietario_2 =
              data.fecha_Nacimiento_Propietario_2;
            this.candidato.ocupacion_Propietario_2 =
              data.ocupacion_Propietario_2;
            this.candidato.telefono_Propietario_2 = data.telefono_Propietario_2;
            this.candidato.correo_Propietario_2 = data.correo_Propietario_2;
            this.candidato.pertenece_Grupo_Vulnerable_Propietario_2 =
              data.pertenece_Grupo_Vulerable_Propietario_2;
            this.candidato.grupo_Vulnerable_Propietario_2 =
              data.grupo_Vulnerable_Propietario_2;
            this.candidato.partido_Propietario_2_Id =
              data.partido_Propietario_2_Id;
            this.candidato.nombre_Completo_Suplente = `${data.nombres_Suplente} ${data.apellido_Paterno_Suplente} ${data.apellido_Materno_Suplente}`;
            this.candidato.nombres_Suplente = data.nombres_Suplente;
            this.candidato.apellido_Paterno_Suplente =
              data.apellido_Paterno_Suplente;
            this.candidato.apellido_Materno_Suplente =
              data.apellido_Materno_Suplente;
            this.candidato.mote_Suplente = data.mote_Suplente;
            this.candidato.sexo_Suplente = data.sexo_Suplente;
            this.candidato.clave_Elector_Suplente = data.clave_Elector_Suplente;
            this.candidato.url_Foto_Suplente = data.url_Foto_Suplente;
            this.candidato.rfc_Suplente = data.rfC_Suplente;
            this.candidato.curp_Suplente = data.curP_Suplente;
            this.candidato.fecha_Nacimiento_Suplente =
              data.fecha_Nacimiento_Suplente;
            this.candidato.ocupacion_Suplente = data.ocupacion_Suplente;
            this.candidato.telefono_Suplente = data.telefono_Suplente;
            this.candidato.correo_Suplente = data.correo_Suplente;
            this.candidato.pertenece_Grupo_Vulnerable_Suplente =
              data.pertenece_Grupo_Vulnerable_Suplente;
            this.candidato.grupo_Vulnerable_Suplente =
              data.grupo_Vulnerable_Suplente;
            this.candidato.partido_Suplente_Id = data.partido_Suplente_Id;
            this.candidato.nombre_Completo_Suplente_2 = `${data.nombres_Suplente_2} ${data.apellido_Paterno_Suplente_2} ${data.apellido_Materno_Suplente_2}`;
            this.candidato.nombres_Suplente_2 = data.nombres_Suplente_2;
            this.candidato.apellido_Paterno_Suplente_2 =
              data.apellido_Paterno_Suplente_2;
            this.candidato.apellido_Materno_Suplente_2 =
              data.apellido_Materno_Suplente_2;
            this.candidato.mote_Suplente_2 = data.mote_Suplente_2;
            this.candidato.sexo_Suplente_2 = data.sexo_Suplente_2;
            this.candidato.foto_Suplente_2 = data.foto_Suplente_2;
            this.candidato.clave_Elector_Suplente_2 =
              data.clave_Elector_Suplente_2;
            this.candidato.rfc_Suplente_2 = data.rfc_Suplente_2;
            this.candidato.curp_Suplente_2 = data.curp_Suplente_2;
            this.candidato.fecha_Nacimiento_Suplente_2 =
              data.fecha_Nacimiento_Suplente_2;
            this.candidato.ocupacion_Suplente_2 = data.ocupacion_Suplente_2;
            this.candidato.telefono_Suplente_2 = data.telefono_Suplente_2;
            this.candidato.correo_Suplente_2 = data.correo_Suplente_2;
            this.candidato.pertenece_Grupo_Vulnerable_Suplente_2 =
              data.pertenece_Grupo_Vulnerable_Suplente_2;
            this.candidato.grupo_Vulnerable_Suplente_2 =
              data.grupo_Vulnerable_Suplente_2;
            this.candidato.partido_Suplente_2_Id = data.partido_Suplente_2_Id;
            this.candidato.correo_Suplente_2 = data.correo_Suplente_2;

            if (data.pertenece_Grupo_Vulnerable_Propietario == true) {
              let elementos = data.grupo_Vulnerable_Propietario.split("|");
              if (elementos[0] != undefined)
                this.candidato.grupoProp_1 = elementos[0];
              if (elementos[1] != undefined)
                this.candidato.grupoProp_2 = elementos[1];
              if (elementos[2] != undefined)
                this.candidato.grupoProp_3 = elementos[2];
              if (elementos[3] != undefined)
                this.candidato.grupoProp_4 = elementos[3];
            }
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
