import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useCandidatosStore = defineStore("useCandidatosStore", {
  state: () => ({
    modal: false,
    modalDocumento: false,
    isEditar: false,
    modalSustituir: false,
    loading: false,
    list_Candidatos: [],
    list_Candidatos_By_Eleccion: [],
    list_RP: [],
    list_Suplentes: [],
    candidato: {
      id: null,
      tipo_Eleccion_Id: null,
      tipo_Eleccion: null,
      municipio_Id: null,
      distrito_Id: null,
      demarcacion_Id: null,
      coalicion_Id: null,
      is_Coalicion: false,
      tipo_Candidato: null,
      orden: null,
      activo: null,
      fecha_Registro: null,
      pertenece_Grupo_Vulnerable_Propietario: null,
      grupo_Vulnerable_Propietario: null,
      grupo_Vulnerable_1: null,
      grupo_Vulnerable_2: null,
      grupo_Vulnerable_3: null,
      grupo_Vulnerable_4: null,
    },
    candidato2: {
      tipo: null,
      nombre_Completo: null,
      partido: null,
    },
    foto_1: {
      url_Foto: null,
    },
    foto_2: {
      url_Foto: null,
    },
    foto_3: {
      url_Foto: null,
    },
    foto_4: {
      url_Foto: null,
    },
    propietario_1: {
      id: null,
      tipo: null,
      distrito: null,
      nombre_Completo: null,
      estatus: null,
      nombres: null,
      apellido_Paterno: null,
      apellido_Materno: null,
      mote: null,
      sexo: null,
      url_Foto: null,
      clave_Elector: null,
      rfc: null,
      curp: null,
      fecha_Nacimiento: null,
      ocupacion: null,
      telefono: null,
      correo: null,
      pertenece_Grupo_Vulnerable: false,
      grupo_Vulnerable: null,
      partido_Id: null,
      partido_Propietario: null,
      url_Logo_Partido: null,
      grupo_Vulnerable_1: null,
      grupo_Vulnerable_2: null,
      grupo_Vulnerable_3: null,
      grupo_Vulnerable_4: null,
      edad: 0,
    },
    propietario_2: {
      id: null,
      tipo: null,
      distrito: null,
      nombre_Completo: null,
      nombres: null,
      apellido_Paterno: null,
      apellido_Materno: null,
      mote: null,
      estatus: null,
      sexo: null,
      url_Foto: null,
      clave_Elector: null,
      rfc: null,
      curp: null,
      fecha_Nacimiento: null,
      ocupacion: null,
      telefono: [],
      correo: null,
      pertenece_Grupo_Vulnerable: false,
      grupo_Vulnerable: null,
      partido_Id: null,
      partido_Propietario_2: null,
      url_Logo_Partido: null,
      grupo_Vulnerable_1: null,
      grupo_Vulnerable_2: null,
      grupo_Vulnerable_3: null,
      grupo_Vulnerable_4: null,
      edad: 0,
    },
    suplente_1: {
      id: null,
      tipo: null,
      distrito: null,
      nombre_Completo: null,
      nombres: null,
      apellido_Paterno: null,
      apellido_Materno: null,
      estatus: null,
      mote: null,
      sexo: null,
      url_Foto: null,
      clave_Elector: null,
      rfc: null,
      curp: null,
      fecha_Nacimiento: null,
      ocupacion: null,
      telefono: [],
      correo: null,
      pertenece_Grupo_Vulnerable: false,
      grupo_Vulnerable: null,
      partido_Id: null,
      partido_Suplente: null,
      url_Logo_Partido: null,
      grupo_Vulnerable_1: null,
      grupo_Vulnerable_2: null,
      grupo_Vulnerable_3: null,
      grupo_Vulnerable_4: null,
      edad: 0,
    },
    suplente_2: {
      id: null,
      tipo: null,
      distrito: null,
      nombre_Completo: null,
      nombres: null,
      apellido_Paterno: null,
      apellido_Materno: null,
      mote: null,
      estatus: null,
      sexo: null,
      url_Foto: null,
      clave_Elector: null,
      rfc: null,
      curp: null,
      fecha_Nacimiento: null,
      ocupacion: null,
      telefono: null,
      correo: null,
      pertenece_Grupo_Vulnerable: false,
      grupo_Vulnerable: null,
      partido_Id: null,
      partido_Suplente_2: null,
      url_Logo_Partido: null,
      grupo_Vulnerable_1: null,
      grupo_Vulnerable_2: null,
      grupo_Vulnerable_3: null,
      grupo_Vulnerable_4: null,
      edad: 0,
    },
    documentoRequisito: {
      url: null,
    },
  }),
  actions: {
    actualizarModal(valor) {
      this.modal = valor;
    },
    actualizarModalDocumento(valor) {
      this.modalDocumento = valor;
    },
    updateEditar(valor) {
      this.isEditar = valor;
    },
    actualizarModalSustituir(valor) {
      this.modalSustituir = valor;
    },
    //-----------------------------------------------------------
    initIsCoalicion() {
      this.candidato.is_Coalicion = false;
      this.candidato.coalicion_Id = null;
    },

    initCandidato() {
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
      this.candidato.partido_Id = null;
      this.candidato.pertenece_Grupo_Vulnerable_Propietario = null;
      this.candidato.grupo_Vulnerable_Propietario = null;
      this.candidato.grupo_Vulnerable_1 = null;
      this.candidato.grupo_Vulnerable_2 = null;
      this.candidato.grupo_Vulnerable_3 = null;
      this.candidato.grupo_Vulnerable_4 = null;
      this.foto_1.url_Foto = null;
      this.foto_2.url_Foto = null;
      this.foto_3.url_Foto = null;
      this.foto_4.url_Foto = null;
      //---------------------------------
      //PROPIETARIO 1
      this.propietario_1.nombre_Completo = null;
      this.propietario_1.nombres = null;
      this.propietario_1.apellido_Paterno = null;
      this.propietario_1.apellido_Materno = null;
      this.propietario_1.mote = null;
      this.propietario_1.sexo = null;
      this.propietario_1.url_Foto = null;
      this.propietario_1.clave_Elector = null;
      this.propietario_1.rfc = null;
      this.propietario_1.curp = null;
      this.propietario_1.fecha_Nacimiento = null;
      this.propietario_1.ocupacion = null;
      this.propietario_1.telefono = null;
      this.propietario_1.correo = null;
      this.propietario_1.pertenece_Grupo_Vulnerable = false;
      this.propietario_1.grupo_Vulnerable = null;
      this.propietario_1.partido_Id = null;
      this.propietario_1.url_Logo_Partido = null;
      this.propietario_1.grupo_Vulnerable_1 = null;
      this.propietario_1.grupo_Vulnerable_2 = null;
      this.propietario_1.grupo_Vulnerable_3 = null;
      this.propietario_1.grupo_Vulnerable_4 = null;
      this.propietario_1.edad = null;
      //---------------------------------
      //PROPIETARIO 2
      this.propietario_2.nombre_Completo = null;
      this.propietario_2.nombres = null;
      this.propietario_2.apellido_Paterno = null;
      this.propietario_2.apellido_Materno = null;
      this.propietario_2.mote = null;
      this.propietario_2.sexo = null;
      this.propietario_2.url_Foto = null;
      this.propietario_2.clave_Elector = null;
      this.propietario_2.rfc = null;
      this.propietario_2.curp = null;
      this.propietario_2.fecha_Nacimiento = null;
      this.propietario_2.ocupacion = null;
      this.propietario_2.telefono = null;
      this.propietario_2.correo = null;
      this.propietario_2.pertenece_Grupo_Vulnerable = false;
      this.propietario_2.grupo_Vulnerable = null;
      this.propietario_2.partido_Id = null;
      this.propietario_2.url_Logo_Partido = null;
      this.propietario_2.grupo_Vulnerable_1 = null;
      this.propietario_2.grupo_Vulnerable_2 = null;
      this.propietario_2.grupo_Vulnerable_3 = null;
      this.propietario_2.grupo_Vulnerable_4 = null;
      this.propietario_2.edad = null;
      //---------------------------------
      //SUPLENTE 1
      this.suplente_1.nombre_Completo = null;
      this.suplente_1.nombres = null;
      this.suplente_1.apellido_Paterno = null;
      this.suplente_1.apellido_Materno = null;
      this.suplente_1.mote = null;
      this.suplente_1.sexo = null;
      this.suplente_1.url_Foto = null;
      this.suplente_1.clave_Elector = null;
      this.suplente_1.rfc = null;
      this.suplente_1.curp = null;
      this.suplente_1.fecha_Nacimiento = null;
      this.suplente_1.ocupacion = null;
      this.suplente_1.telefono = null;
      this.suplente_1.correo = null;
      this.suplente_1.pertenece_Grupo_Vulnerable = false;
      this.suplente_1.grupo_Vulnerable = null;
      this.suplente_1.partido_Id = null;
      this.suplente_1.url_Logo_Partido = null;
      this.suplente_1.grupo_Vulnerable_1 = null;
      this.suplente_1.grupo_Vulnerable_2 = null;
      this.suplente_1.grupo_Vulnerable_3 = null;
      this.suplente_1.grupo_Vulnerable_4 = null;
      this.suplente_1.edad = null;
      //---------------------------------
      //SUPLENTE 2
      this.suplente_2.nombre_Completo = null;
      this.suplente_2.nombres = null;
      this.suplente_2.apellido_Paterno = null;
      this.suplente_2.apellido_Materno = null;
      this.suplente_2.mote = null;
      this.suplente_2.sexo = null;
      this.suplente_2.url_Foto = null;
      this.suplente_2.clave_Elector = null;
      this.suplente_2.rfc = null;
      this.suplente_2.curp = null;
      this.suplente_2.fecha_Nacimiento = null;
      this.suplente_2.ocupacion = null;
      this.suplente_2.telefono = null;
      this.suplente_2.correo = null;
      this.suplente_2.pertenece_Grupo_Vulnerable = false;
      this.suplente_2.grupo_Vulnerable = null;
      this.suplente_2.partido_Id = null;
      this.suplente_2.url_Logo_Partido = null;
      this.suplente_2.grupo_Vulnerable_1 = null;
      this.suplente_2.grupo_Vulnerable_2 = null;
      this.suplente_2.grupo_Vulnerable_3 = null;
      this.suplente_2.grupo_Vulnerable_4 = null;
      this.suplente_2.edad = null;
    },

    //-----------------------------------------------------------
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
        this.loading = true;
        let resp = await api.get("/Candidatos");
        let { data } = resp.data;
        let listCandidatos = data.map((candidato) => {
          return {
            aprobar: false,
            id: candidato.id,
            id_Expand: candidato.id,
            tipo_Eleccion_Id: candidato.tipo_Eleccion_Id,
            tipo_Eleccion: candidato.tipo_Eleccion,
            municipio_Id: candidato.municipio_Id,
            municipio: candidato.municipio,
            distrito_Id: candidato.distrito_Id,
            distrito: candidato.distrito,
            no_Distrito: candidato.no_Distrito,
            demarcacion_Id: candidato.demarcacion_Id,
            demarcacion: candidato.demarcacion,
            coalicion_Id: candidato.coalicion_Id,
            is_Coalicion: candidato.is_Coalicion,
            coalicion: candidato.coalicion,
            tipo_Candidato: candidato.tipo_Candidato,
            orden: candidato.orden,
            activo: candidato.activo,
            validado: candidato.validado,
            estatus: candidato.estatus,
            fecha_registro: candidato.fecha_Registro,
            logo_Coalicion: candidato.url_Logo_Coalicion,
            //----------------------------------------------------
            //PROPIETARIO 1
            nombre_Completo_Propietario: `${candidato.nombres_Propietario} ${
              candidato.apellido_Paterno_Propietario
            } ${
              candidato.apellido_Materno_Propietario != null
                ? candidato.apellido_Materno_Propietario
                : ""
            }`,
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
            url_Logo_Partido_Propietario:
              candidato.url_Logo_Partido_Propietario,
            edad_Propietario: candidato.edad_Propietario,

            //----------------------------------------------------
            //PROPIETARIO 2
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
            url_Logo_Partido_Propietario_2:
              candidato.url_Logo_Partido_Propietario_2,
            edad_Propietario_2: candidato.edad_Propietario_2,
            //----------------------------------------------------
            //SUPLENTE 1
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
            url_Logo_Partido_Partido_Suplente:
              candidato.url_Logo_Partido_Partido_Suplente,
            edad_Suplente: candidato.edad_Suplente,
            //----------------------------------------------------
            //SUPLENTE 2
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
            url_Logo_Partido_Partido_Suplente_2:
              candidato.url_Logo_Partido_Partido_Suplente_2,
            edad_Suplente_2: candidato.edad_Suplente_2,
          };
        });
        this.loading = false;
        this.list_Candidatos = listCandidatos;
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, intentelo de nuevo. Si el error perisiste, contacte a soporte",
        };
      }
    },

    //-----------------------------------------------------------
    async loadCandidatosByEleccion(eleccion) {
      try {
        this.loading = true;
        let resp = await api.get(`/Candidatos/ByTipoEleccion/${eleccion}`);
        let { data } = resp.data;
        this.list_Candidatos_By_Eleccion = data.map((candidato) => {
          return {
            id: candidato.id,
            puesto: candidato.puesto,
            candidatura:
              candidato.puesto == 0
                ? "Propietaria"
                : candidato.puesto == 1
                ? "Suplente"
                : candidato.puesto == 2
                ? "Propietaria sindico"
                : "Suplenete sindico",
            estatus: candidato.estatus,
            municipio: candidato.municipio,
            distrito: candidato.distrito,
            no_Distrito: candidato.no_Distrito,
            demarcacion: candidato.demarcacion,
            tipo_Candidato: candidato.tipo_Candidato,
            is_Coalicion: candidato.is_Coalicion,
            coalicion: candidato.coalicion,
            logo_Coalicion: candidato.logo_Coalicion,
            orden: candidato.orden,
            validado: candidato.validado,
            validado_IEEN: candidato.validado_IEEN,
            aprobado: candidato.aprobado,
            nombre_Completo: `${candidato.nombres} ${
              candidato.apellido_Paterno
            } ${
              candidato.apellido_Materno != null
                ? candidato.apellido_Materno
                : ""
            }`,
            nombres: candidato.nombres,
            apellido_Paterno: candidato.apellido_Paterno,
            apellido_Materno: candidato.apellido_Materno,
            mote: candidato.mote,
            sexo: candidato.sexo,
            url_Foto: candidato.url_Foto,
            clave_Elector: candidato.clave_Elector,
            rfc: candidato.rfc,
            curp: candidato.curp,
            fecha_Nacimiento: candidato.fecha_Nacimiento,
            ocupacion: candidato.ocupacion,
            telefono: candidato.telefono,
            correo: candidato.correo,
            pertenece_Grupo_Vulerable: candidato.pertenece_Grupo_Vulerable,
            grupo_Vulnerable: candidato.grupo_Vulnerable,
            consentimiento_URL: candidato.consentimiento_URL,
            avance_Curricular: candidato.avance_Curricular,
            faltante_Curricular: candidato.faltante_Curricular,
            logo_Partido: candidato.logo_Partido,
            partido_Id: candidato.partido_Id,
            partido: candidato.partido,
            edad: candidato.edad,
            tipo_Eleccion_Id: candidato.tipo_Eleccion_Id,
            tipo_Eleccion: candidato.tipo_Eleccion,
          };
        });
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
          if (success == true) {
            this.candidato.activo = data.activo;
            this.candidato.id = data.id;
            this.candidato.tipo_Eleccion_Id = data.tipo_Eleccion_Id;
            this.candidato.tipo_Eleccion = data.tipo_Eleccion;
            this.candidato.municipio_Id = data.municipio_Id;
            this.candidato.distrito_Id = data.distrito_Id;
            this.candidato.distrito = data.distrito;
            this.candidato.demarcacion_Id = data.demarcacion_Id;
            this.candidato.coalicion_Id = data.coalicion_Id;
            this.candidato.is_Coalicion = data.is_Coalicion;
            this.candidato.tipo_Candidato = data.tipo_Candidato;
            this.candidato.orden = data.orden;
            this.candidato.partido_Id = data.partido_Id;
            this.candidato.fecha_Registro = data.fecha_Registro;
            //-----------------------------------------------------
            //PROPIETARIO 1
            this.propietario_1.nombre_Completo = `${data.nombres_Propietario} ${data.apellido_Paterno_Propietario} ${data.apellido_Materno_Propietario}`;
            this.propietario_1.nombres = data.nombres_Propietario;
            this.propietario_1.apellido_Paterno =
              data.apellido_Paterno_Propietario;
            this.propietario_1.apellido_Materno =
              data.apellido_Materno_Propietario;
            this.propietario_1.mote = data.mote_Propietario;
            this.propietario_1.sexo = data.sexo_Propietario;
            this.propietario_1.url_Foto = data.url_Foto_Propietario;
            this.propietario_1.clave_Elector = data.clave_Elector_Propietario;
            this.propietario_1.rfc = data.rfC_Propietario;
            this.propietario_1.curp = data.curP_Propietario;
            this.propietario_1.fecha_Nacimiento =
              data.fecha_Nacimiento_Propietario;
            this.propietario_1.ocupacion = data.ocupacion_Propietario;
            this.propietario_1.correo = data.correo_Propietario;
            this.propietario_1.pertenece_Grupo_Vulnerable =
              data.pertenece_Grupo_Vulnerable_Propietario;
            this.propietario_1.grupo_Vulnerable =
              data.grupo_Vulnerable_Propietario;
            this.propietario_1.partido_Id = data.partido_Id;
            this.propietario_1.partido_Propietario = data.partido_Propietario;
            if (data.telefono_Propietario != null) {
              this.propietario_1.telefono =
                data.telefono_Propietario.split(",");
            }
            this.propietario_1.distrito = data.distrito;
            //-----------------------------------------------------
            //PROPIETARIO 2
            this.propietario_2.nombre_Completo = `${data.nombres_Propietario_2} ${data.apellido_Paterno_Propietario_2} ${data.apellido_Materno_Propietario_2}`;
            this.propietario_2.nombres = data.nombres_Propietario_2;
            this.propietario_2.apellido_Paterno =
              data.apellido_Paterno_Propietario_2;
            this.propietario_2.apellido_Materno =
              data.apellido_Materno_Propietario_2;
            this.propietario_2.mote = data.mote_Propietario_2;
            this.propietario_2.sexo = data.sexo_Propietario_2;
            this.propietario_2.clave_Elector = data.clave_Elector_Propietario_2;
            this.propietario_2.url_Foto = data.url_Foto_Propietario_2;
            this.propietario_2.rfc = data.rfC_Propietario_2;
            this.propietario_2.curp = data.curP_Propietario_2;
            this.propietario_2.fecha_Nacimiento =
              data.fecha_Nacimiento_Propietario_2;
            this.propietario_2.ocupacion = data.ocupacion_Propietario_2;
            if (data.telefono_Propietario_2 != null) {
              this.propietario_2.telefono =
                data.telefono_Propietario_2.split(",");
            }
            this.propietario_2.correo = data.correo_Propietario_2;
            this.propietario_2.pertenece_Grupo_Vulnerable =
              data.pertenece_Grupo_Vulnerable_Propietario_2;
            this.propietario_2.grupo_Vulnerable =
              data.grupo_Vulnerable_Propietario_2;
            this.propietario_2.partido_Id = data.partido_Propietario_2_Id;
            this.propietario_2.partido_Propietario_2 =
              data.partido_Propietario_2;
            this.propietario_2.url_Logo_Partido =
              data.url_Logo_Partido_Propietario_2;
            this.propietario_2.distrito = data.distrito;
            //-----------------------------------------------------
            //SUPLENTE 1
            this.suplente_1.nombre_Completo = `${data.nombres_Suplente} ${data.apellido_Paterno_Suplente} ${data.apellido_Materno_Suplente}`;
            this.suplente_1.nombres = data.nombres_Suplente;
            this.suplente_1.apellido_Paterno = data.apellido_Paterno_Suplente;
            this.suplente_1.apellido_Materno = data.apellido_Materno_Suplente;
            this.suplente_1.mote = data.mote_Suplente;
            this.suplente_1.sexo = data.sexo_Suplente;
            this.suplente_1.clave_Elector = data.clave_Elector_Suplente;
            this.suplente_1.url_Foto = data.url_Foto_Suplente;
            this.suplente_1.rfc = data.rfC_Suplente;
            this.suplente_1.curp = data.curP_Suplente;
            this.suplente_1.fecha_Nacimiento = data.fecha_Nacimiento_Suplente;
            this.suplente_1.ocupacion = data.ocupacion_Suplente;
            if (data.telefono_Suplente != null) {
              this.suplente_1.telefono = data.telefono_Suplente.split(",");
            }
            this.suplente_1.correo = data.correo_Suplente;
            this.suplente_1.pertenece_Grupo_Vulnerable =
              data.pertenece_Grupo_Vulnerable_Suplente;
            this.suplente_1.grupo_Vulnerable = data.grupo_Vulnerable_Suplente;
            this.suplente_1.partido_Id = data.partido_Suplente_Id;
            this.suplente_1.url_Logo_Partido =
              data.url_Logo_Partido_Partido_Suplente;
            this.suplente_1.partido_Suplente = data.partido_Suplente;
            this.suplente_1.distrito = data.distrito;
            //-----------------------------------------------------
            //SUPLENTE 2
            this.suplente_2.nombre_Completo = `${data.nombres_Suplente_2} ${data.apellido_Paterno_Suplente_2} ${data.apellido_Materno_Suplente_2}`;
            this.suplente_2.nombres = data.nombres_Suplente_2;
            this.suplente_2.apellido_Paterno = data.apellido_Paterno_Suplente_2;
            this.suplente_2.apellido_Materno = data.apellido_Materno_Suplente_2;
            this.suplente_2.mote = data.mote_Suplente_2;
            this.suplente_2.sexo = data.sexo_Suplente_2;
            this.suplente_2.url_Foto = data.url_Foto_Suplente_2;
            this.suplente_2.clave_Elector = data.clave_Elector_Suplente_2;
            this.suplente_2.rfc = data.rfC_Suplente_2;
            this.suplente_2.curp = data.curP_Suplente_2;
            this.suplente_2.fecha_Nacimiento = data.fecha_Nacimiento_Suplente_2;
            this.suplente_2.ocupacion = data.ocupacion_Suplente_2;
            if (data.telefono_Suplente_2 != null) {
              this.suplente_2.telefono = data.telefono_Suplente_2.split(",");
            }
            this.suplente_2.correo = data.correo_Suplente_2;
            this.suplente_2.pertenece_Grupo_Vulnerable =
              data.pertenece_Grupo_Vulnerable_Suplente_2;
            this.suplente_2.grupo_Vulnerable = data.grupo_Vulnerable;
            this.suplente_2.partido_Id = data.partido_Suplente_2_Id;
            this.suplente_2.partido_Suplente_2 = data.partido_Suplente_2;
            this.suplente_2.url_Logo_Partido =
              data.url_Logo_Partido_Partido_Suplente_2;
            this.suplente_2.correo = data.correo_Suplente_2;
            this.suplente_2.distrito = data.distrito;

            if (data.pertenece_Grupo_Vulnerable_Propietario == true) {
              let elementos = data.grupo_Vulnerable_Propietario.split("|");

              if (elementos[0] != undefined) {
                this.propietario_1.grupo_Vulnerable_1 = elementos[0];
              }
              if (elementos[1] != undefined) {
                this.propietario_1.grupo_Vulnerable_2 = elementos[1];
              }
              if (elementos[2] != undefined) {
                this.propietario_1.grupo_Vulnerable_3 = elementos[2];
              }
              if (elementos[3] != undefined) {
                this.propietario_1.grupo_Vulnerable_4 = elementos[3];
              }
            }
            if (data.pertenece_Grupo_Vulnerable_Suplente == true) {
              let elementos = data.grupo_Vulnerable_Suplente.split("|");
              if (elementos[0] != undefined) {
                this.suplente_1.grupo_Vulnerable_1 = elementos[0];
              }
              if (elementos[1] != undefined) {
                this.suplente_1.grupo_Vulnerable_2 = elementos[1];
              }
              if (elementos[2] != undefined) {
                this.suplente_1.grupo_Vulnerable_3 = elementos[2];
              }
              if (elementos[3] != undefined) {
                this.suplente_1.grupo_Vulnerable_4 = elementos[3];
              }
            }
            if (data.pertenece_Grupo_Vulnerable_Propietario_2 == true) {
              let elementos = data.grupo_Vulnerable_Propietario_2.split("|");
              if (elementos[0] != undefined) {
                this.propietario_2.grupo_Vulnerable_1 = elementos[0];
              }
              if (elementos[1] != undefined) {
                this.propietario_2.grupo_Vulnerable_2 = elementos[1];
              }
              if (elementos[2] != undefined) {
                this.propietario_2.grupo_Vulnerable_3 = elementos[2];
              }
              if (elementos[3] != undefined) {
                this.propietario_2.grupo_Vulnerable_4 = elementos[3];
              }
            }
            if (data.pertenece_Grupo_Vulnerable_Suplente_2 == true) {
              let elementos = data.grupo_Vulnerable_Suplente_2.split("|");
              if (elementos[0] != undefined) {
                this.suplente_2.grupo_Vulnerable_1 = elementos[0];
              }
              if (elementos[1] != undefined) {
                this.suplente_2.grupo_Vulnerable_2 = elementos[1];
              }
              if (elementos[2] != undefined) {
                this.suplente_2.grupo_Vulnerable_3 = elementos[2];
              }
              if (elementos[3] != undefined) {
                this.suplente_2.grupo_Vulnerable_4 = elementos[3];
              }
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

    //-----------------------------------------------------------
    async loadCandidatoToArray(tipo, id) {
      try {
        let resp = null;
        resp = await api.get(`/Candidatos/${id}`);
        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success == true) {
            this.propietario_2.tipo_Eleccion = data.tipo_Eleccion;
            this.suplente_1.tipo_Eleccion = data.tipo_Eleccion;
            this.suplente_2.tipo_Eleccion = data.tipo_Eleccion;
            this.suplente_1.tipo_Candidato = data.tipo_Candidato;
            this.propietario_2.tipo_Candidato = data.tipo_Candidato;
            this.suplente_2.tipo_Candidato = data.tipo_Candidato;
            //-----------------------------------------------------
            //PROPIETARIO 1
            this.propietario_1.validado = data.validado;
            this.propietario_1.tipo_Eleccion = data.tipo_Eleccion;
            this.propietario_1.tipo_Candidato = data.tipo_Candidato;
            this.propietario_1.id = data.id;
            this.propietario_1.tipo = "Propietario";
            this.propietario_1.nombre_Completo = `${data.nombres_Propietario} ${data.apellido_Paterno_Propietario} ${data.apellido_Materno_Propietario}`;
            this.propietario_1.nombres = data.nombres_Propietario;
            this.propietario_1.apellido_Paterno =
              data.apellido_Paterno_Propietario;
            this.propietario_1.apellido_Materno =
              data.apellido_Materno_Propietario;
            this.propietario_1.estatus = data.estatus;
            this.propietario_1.mote = data.mote_Propietario;
            this.propietario_1.sexo = data.sexo_Propietario;
            this.propietario_1.url_Foto = data.url_Foto_Propietario;
            this.propietario_1.clave_Elector = data.clave_Elector_Propietario;
            this.propietario_1.rfc = data.rfC_Propietario;
            this.propietario_1.curp = data.curP_Propietario;
            this.propietario_1.fecha_Nacimiento =
              data.fecha_Nacimiento_Propietario;
            this.propietario_1.ocupacion = data.ocupacion_Propietario;
            this.propietario_1.correo = data.correo_Propietario;
            this.propietario_1.pertenece_Grupo_Vulnerable =
              data.pertenece_Grupo_Vulnerable_Propietario;
            this.propietario_1.grupo_Vulnerable =
              data.grupo_Vulnerable_Propietario;
            this.propietario_1.partido_Id = data.partido_Id;
            this.propietario_1.url_Logo_Partido =
              data.url_Logo_Partido_Propietario;
            this.propietario_1.is_Coalicion = data.is_Coalicion;
            this.propietario_1.coalicion_Id = data.coalicion_Id;
            this.propietario_1.partido = data.partido;
            this.propietario_1.edad = data.edad_Propietario;

            if (data.telefono_Propietario != null) {
              this.propietario_1.telefono =
                data.telefono_Propietario.split(",");
            }
            //-----------------------------------------------------
            //PROPIETARIO 2
            this.propietario_2.validado = data.validado;
            this.propietario_2.id = data.id;
            this.propietario_2.tipo = "Propietario sindico";
            this.propietario_2.nombre_Completo = `${data.nombres_Propietario_2} ${data.apellido_Paterno_Propietario_2} ${data.apellido_Materno_Propietario_2}`;
            this.propietario_2.nombres = data.nombres_Propietario_2;
            this.propietario_2.apellido_Paterno =
              data.apellido_Paterno_Propietario_2;
            this.propietario_2.apellido_Materno =
              data.apellido_Materno_Propietario_2;
            this.propietario_2.mote = data.mote_Propietario_2;
            this.propietario_2.estatus = data.estatus;
            this.propietario_2.sexo = data.sexo_Propietario_2;
            this.propietario_2.clave_Elector = data.clave_Elector_Propietario_2;
            this.propietario_2.url_Foto = data.url_Foto_Propietario_2;
            this.propietario_2.rfc = data.rfC_Propietario_2;
            this.propietario_2.curp = data.curP_Propietario_2;
            this.propietario_2.fecha_Nacimiento =
              data.fecha_Nacimiento_Propietario_2;
            this.propietario_2.ocupacion = data.ocupacion_Propietario_2;
            if (data.telefono_Propietario_2 != null) {
              this.propietario_2.telefono =
                data.telefono_Propietario_2.split(",");
            }
            this.propietario_2.correo = data.correo_Propietario_2;
            this.propietario_2.pertenece_Grupo_Vulnerable =
              data.pertenece_Grupo_Vulerable_Propietario_2;
            this.propietario_2.grupo_Vulnerable =
              data.grupo_Vulnerable_Propietario_2;
            this.propietario_2.partido_Id = data.partido_Propietario_2_Id;
            this.propietario_2.partido = data.partido_Propietario_2;
            this.propietario_2.url_Logo_Partido =
              data.url_Logo_Partido_Propietario_2;
            this.propietario_2.is_Coalicion = data.is_Coalicion;
            this.propietario_2.coalicion_Id = data.coalicion_Id;
            this.propietario_2.edad = data.edad_Propietario_2;
            //-----------------------------------------------------
            //SUPLENTE 1
            this.suplente_1.validado = data.validado;
            this.suplente_1.id = data.id;
            this.suplente_1.tipo = "Suplente";
            this.suplente_1.nombre_Completo = `${data.nombres_Suplente} ${data.apellido_Paterno_Suplente} ${data.apellido_Materno_Suplente}`;
            this.suplente_1.nombres = data.nombres_Suplente;
            this.suplente_1.apellido_Paterno = data.apellido_Paterno_Suplente;
            this.suplente_1.apellido_Materno = data.apellido_Materno_Suplente;
            this.suplente_1.mote = data.mote_Suplente;
            this.suplente_1.sexo = data.sexo_Suplente;
            this.suplente_1.clave_Elector = data.clave_Elector_Suplente;
            this.suplente_1.url_Foto = data.url_Foto_Suplente;
            this.suplente_1.rfc = data.rfC_Suplente;
            this.suplente_1.estatus = data.estatus;
            this.suplente_1.curp = data.curP_Suplente;
            this.suplente_1.fecha_Nacimiento = data.fecha_Nacimiento_Suplente;
            this.suplente_1.ocupacion = data.ocupacion_Suplente;
            if (data.telefono_Suplente != null) {
              this.suplente_1.telefono = data.telefono_Suplente.split(",");
            }
            this.suplente_1.correo = data.correo_Suplente;
            this.suplente_1.pertenece_Grupo_Vulnerable =
              data.pertenece_Grupo_Vulnerable_Suplente;
            this.suplente_1.grupo_Vulnerable = data.grupo_Vulnerable_Suplente;
            this.suplente_1.partido_Id = data.partido_Suplente_Id;
            this.suplente_1.url_Logo_Partido = data.url_Logo_Partido_Suplente;
            this.suplente_1.partido = data.partido_Suplente;
            this.suplente_1.is_Coalicion = data.is_Coalicion;
            this.suplente_1.coalicion_Id = data.coalicion_Id;
            this.suplente_1.edad = data.edad_Suplente;
            //-----------------------------------------------------
            //SUPLENTE 2
            this.suplente_2.validado = data.validado;
            this.suplente_2.id = data.id;
            this.suplente_2.tipo = "Suplente sindico";
            this.suplente_2.estatus = data.estatus;
            this.suplente_2.nombre_Completo = `${data.nombres_Suplente_2} ${data.apellido_Paterno_Suplente_2} ${data.apellido_Materno_Suplente_2}`;
            this.suplente_2.nombres = data.nombres_Suplente_2;
            this.suplente_2.apellido_Paterno = data.apellido_Paterno_Suplente_2;
            this.suplente_2.apellido_Materno = data.apellido_Materno_Suplente_2;
            this.suplente_2.mote = data.mote_Suplente_2;
            this.suplente_2.sexo = data.sexo_Suplente_2;
            this.suplente_2.url_Foto = data.url_Foto_Suplente_2;
            this.suplente_2.clave_Elector = data.clave_Elector_Suplente_2;
            this.suplente_2.rfc = data.rfC_Suplente_2;
            this.suplente_2.curp = data.curP_Suplente_2;
            this.suplente_2.fecha_Nacimiento = data.fecha_Nacimiento_Suplente_2;
            this.suplente_2.ocupacion = data.ocupacion_Suplente_2;
            this.suplente_2.edad = data.edad_Suplente_2;
            if (data.telefono_Suplente_2 != null) {
              this.suplente_2.telefono = data.telefono_Suplente_2.split(",");
            }
            this.suplente_2.correo = data.correo_Suplente_2;
            this.suplente_2.pertenece_Grupo_Vulnerable =
              data.pertenece_Grupo_Vulnerable_Suplente_2;
            this.suplente_2.grupo_Vulnerable = data.grupo_Vulnerable;
            this.suplente_2.partido_Id = data.partido_Suplente_2_Id;
            this.suplente_2.partido = data.partido_Suplente_2;
            this.suplente_2.is_Coalicion = data.is_Coalicion;
            this.suplente_2.coalicion_Id = data.coalicion_Id;
            this.suplente_2.url_Logo_Partido = data.url_Logo_Partido_Suplente_2;

            this.list_Suplentes = [];
            if (tipo == "DIP" || tipo == "REG") {
              if (this.propietario_1.nombres != null) {
                this.list_Suplentes.push(this.propietario_1);
              }
              if (this.suplente_1.nombres != null) {
                this.list_Suplentes.push(this.suplente_1);
              }
            } else if (tipo == "PYS") {
              if (this.propietario_1.nombres != null) {
                this.list_Suplentes.push(this.propietario_1);
              }
              if (this.suplente_1.nombres != null) {
                this.list_Suplentes.push(this.suplente_1);
              }
              if (this.propietario_2.nombres != null) {
                this.list_Suplentes.push(this.propietario_2);
              }
              if (this.suplente_2.nombres != null) {
                this.list_Suplentes.push(this.suplente_2);
              }
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

    //-----------------------------------------------------------
    async loadCandidatoByCargo(cargo, id) {
      try {
        let resp = null;
        resp = await api.get(`/Candidatos/${id}`);
        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success == true) {
            this.candidato2.tipo = cargo;
            this.candidato2.is_Coalicion = data.is_Coalicion;
            this.candidato2.coalicion_Id = data.coalicion_Id;
            if (cargo == "Propietario") {
              this.candidato2.nombre_Completo = `${data.nombres_Propietario} ${data.apellido_Paterno_Propietario} ${data.apellido_Materno_Propietario}`;
              this.candidato2.partido = data.partido;
              this.candidato2.url_Foto = data.url_Foto_Propietario;
            } else if (cargo == "Suplente") {
              this.candidato2.nombre_Completo = `${data.nombres_Suplente} ${data.apellido_Paterno_Suplente} ${data.apellido_Materno_Suplente}`;
              this.candidato2.partido = data.partido_Suplente;
              this.candidato2.url_Foto = data.url_Foto_Suplente;
            } else if (cargo == "Propietario sindico") {
              this.candidato2.nombre_Completo = `${data.nombres_Propietario_2} ${data.apellido_Paterno_Propietario_2} ${data.apellido_Materno_Propietario_2}`;
              this.candidato2.partido = data.partido_Propietario_2;
              this.candidato2.url_Foto = data.url_Foto_Propietario_2;
            } else if (cargo == "Suplente sindico") {
              this.candidato2.nombre_Completo = `${data.nombres_Suplente_2} ${data.apellido_Paterno_Suplente_2} ${data.apellido_Materno_Suplente_2}`;
              this.candidato2.partido = data.partido_Suplente_2;
              this.candidato2.url_Foto_Suplente_2 = data.url_Foto_Suplente_2;
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

    //-----------------------------------------------------------
    async loadCandidato_Id_Puesto(id, puesto) {
      try {
        let resp = null;
        resp = await api.get(`/Candidatos/${id}/${puesto}`);
        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success == true) {
            this.candidato.id = data.id;
            this.candidato.puesto = data.puesto;
            this.candidato.pertenece_Grupo_Vulnerable_Propietario =
              data.pertenece_Grupo_Vulnerable_Propietario;
            this.candidato.grupo_Vulnerable_Propietario =
              data.grupo_Vulnerable_Propietario;
            if (data.pertenece_Grupo_Vulnerable_Propietario == true) {
              let elementos = data.grupo_Vulnerable_Propietario.split("|");
              if (elementos[0] != undefined && elementos[0] != "") {
                this.candidato.grupo_Vulnerable_1 = elementos[0];
              }
              if (elementos[1] != undefined && elementos[1] != "") {
                this.candidato.grupo_Vulnerable_2 = elementos[1];
              }
              if (elementos[2] != undefined && elementos[2] != "") {
                this.candidato.grupo_Vulnerable_3 = elementos[2];
              }
              if (elementos[3] != undefined && elementos[3] != "") {
                this.candidato.grupo_Vulnerable_4 = elementos[3];
              }
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

    //-----------------------------------------------------------
    async getDocumentoRequsito(id) {
      try {
        let resp = null;
        resp = await api.get(`/Tipos_Eleccion_Cumplimiento/GetDocumento/${id}`);
        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success == true) {
            this.documentoRequisito.url = data;
          }
        }
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, intentelo de nuevo. Si el error perisiste, contacte a soporte",
        };
      }
    },
    //-----------------------------------------------------------
    async subirRequisito(requisito) {
      try {
        const resp = await api.post("/Tipos_Eleccion_Cumplimiento", requisito, {
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
    async updateRequisito(requisito) {
      try {
        const resp = await api.put("/Tipos_Eleccion_Cumplimiento", requisito, {
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
