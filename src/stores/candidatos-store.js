import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useCandidatosStore = defineStore("useCandidatosStore", {
  state: () => ({
    foto: null,
    isDocumentacion: false,
    puesto: null,
    modal: false,
    modalFotografia: false,
    modalDocumento: false,
    visualizar: false,
    actualizar: false,
    loadDocs: false,
    isEditarRequisito: false,
    isEditar: false,
    modalSustituir: false,
    loading: false,
    list_Candidatos: [],
    list_Candidatos_By_Eleccion: [],
    list_RP: [],
    list_Suplentes: [],
    list_Documentacion_Completa: [],
    candidato: {
      id: null,
      tipo_Eleccion_Id: null,
      tipo_Eleccion: null,
      siglas: null,
      municipio_Id: null,
      distrito_Id: null,
      demarcacion_Id: null,
      coalicion_Id: null,
      is_Coalicion: null,
      tipo_Candidato: null,
      orden: null,
      activo: null,
      fecha_Registro: null,
      pertenece_Grupo_Vulnerable_Propietario: false,
      grupo_Vulnerable_Propietario: null,
      grupo_Vulnerable_1: false,
      grupo_Vulnerable_2: false,
      grupo_Vulnerable_3: false,
      grupo_Vulnerable_4: false,
      acuse_URL: null,
      postulacion: null,
      comun_Id: null,
    },
    candidato2: {
      tipo: null,
      nombre_Completo: null,
      partido: null,
      tipo_Candidato: null,
      postulacion: null,
      is_Comun: null,
      comun_Id: null,
      coalicion_Id: null,
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
      telefono: [],
      telefonos: [],
      correo: null,
      pertenece_Grupo_Vulnerable: false,
      grupo_Vulnerable: null,
      partido_Id: null,
      partido_Propietario: null,
      url_Logo_Partido: null,
      grupo_Vulnerable_1: false,
      grupo_Vulnerable_2: false,
      grupo_Vulnerable_3: false,
      grupo_Vulnerable_4: false,
      describir_Pueblos: null,
      describir_Diversidad: null,
      describir_Discapacidad: null,
      describir_Migrante: null,
      consecutivo: false,
      edad: null,
      consentimiento_URL: null,
      acuse_URL: null,
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
      telefonos: [],
      correo: null,
      pertenece_Grupo_Vulnerable: false,
      grupo_Vulnerable: null,
      partido_Id: null,
      partido_Propietario_2: null,
      url_Logo_Partido: null,
      grupo_Vulnerable_1: false,
      grupo_Vulnerable_2: false,
      grupo_Vulnerable_3: false,
      grupo_Vulnerable_4: false,
      describir_Pueblos: null,
      describir_Diversidad: null,
      describir_Discapacidad: null,
      describir_Migrante: null,
      edad: null,
      consecutivo: false,
      consentimiento_URL: null,
      acuse_URL: null,
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
      telefonos: [],
      correo: null,
      pertenece_Grupo_Vulnerable: false,
      grupo_Vulnerable: null,
      partido_Id: null,
      partido_Suplente: null,
      url_Logo_Partido: null,
      grupo_Vulnerable_1: false,
      grupo_Vulnerable_2: false,
      grupo_Vulnerable_3: false,
      grupo_Vulnerable_4: false,
      describir_Pueblos: null,
      describir_Diversidad: null,
      describir_Discapacidad: null,
      describir_Migrante: null,
      edad: null,
      consentimiento_URL: null,
      acuse_URL: null,
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
      telefono: [],
      telefonos: [],
      tel1: null,
      tel2: null,
      tel3: null,
      correo: null,
      pertenece_Grupo_Vulnerable: false,
      grupo_Vulnerable: null,
      partido_Id: null,
      partido_Suplente_2: null,
      url_Logo_Partido: null,
      grupo_Vulnerable_1: false,
      grupo_Vulnerable_2: false,
      grupo_Vulnerable_3: false,
      grupo_Vulnerable_4: false,
      describir_Pueblos: null,
      describir_Diversidad: null,
      describir_Discapacidad: null,
      describir_Migrante: null,
      edad: null,
      consentimiento_URL: null,
      acuse_URL: null,
    },
    documentoRequisito: {
      url: null,
    },
  }),
  actions: {
    actualizarIsDocumentacion(valor) {
      this.isDocumentacion = valor;
    },
    actualizarTabla(valor) {
      this.actualizar = valor;
    },
    actualizarDocs(valor) {
      this.loadDocs = valor;
    },
    actualizarVisualizar(valor) {
      this.visualizar = valor;
    },
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
    updateRequisitoDoc(valor) {
      this.isEditarRequisito = valor;
    },
    actualizarModalFoto(valor) {
      this.modalFotografia = valor;
    },

    //-----------------------------------------------------------
    initIsCoalicion() {
      this.candidato.is_Coalicion = null;
      this.candidato.coalicion_Id = null;
    },

    initCandidato() {
      this.candidato.id = null;
      this.candidato.tipo_Eleccion_Id = null;
      this.candidato.municipio_Id = null;
      this.candidato.distrito_Id = null;
      this.candidato.demarcacion_Id = null;
      this.candidato.coalicion_Id = null;
      this.candidato.is_Coalicion = null;
      this.candidato.tipo_Candidato = null;
      this.candidato.orden = null;
      this.candidato.activo = null;
      this.candidato.partido_Id = null;
      this.candidato.pertenece_Grupo_Vulnerable_Propietario = false;
      this.candidato.grupo_Vulnerable_Propietario = null;
      this.candidato.grupo_Vulnerable_1 = false;
      this.candidato.grupo_Vulnerable_2 = false;
      this.candidato.grupo_Vulnerable_3 = false;
      this.candidato.grupo_Vulnerable_4 = false;
      this.foto_1.url_Foto = null;
      this.foto_2.url_Foto = null;
      this.foto_3.url_Foto = null;
      this.foto_4.url_Foto = null;
      this.candidato.postulacion = null;
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
      this.propietario_1.telefonos = [];
      this.propietario_1.correo = null;
      this.propietario_1.pertenece_Grupo_Vulnerable = false;
      this.propietario_1.grupo_Vulnerable = null;
      this.propietario_1.partido_Id = null;
      this.propietario_1.url_Logo_Partido = null;
      this.propietario_1.grupo_Vulnerable_1 = false;
      this.propietario_1.grupo_Vulnerable_2 = false;
      this.propietario_1.grupo_Vulnerable_3 = false;
      this.propietario_1.grupo_Vulnerable_4 = false;
      this.propietario_1.describir_Diversidad = null;
      this.propietario_1.describir_Pueblos = null;
      this.propietario_1.consecutivo = false;
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
      this.propietario_2.telefonos = [];
      this.propietario_2.correo = null;
      this.propietario_2.pertenece_Grupo_Vulnerable = false;
      this.propietario_2.grupo_Vulnerable = null;
      this.propietario_2.partido_Id = null;
      this.propietario_2.url_Logo_Partido = null;
      this.propietario_2.grupo_Vulnerable_1 = false;
      this.propietario_2.grupo_Vulnerable_2 = false;
      this.propietario_2.grupo_Vulnerable_3 = false;
      this.propietario_2.grupo_Vulnerable_4 = false;
      this.propietario_2.edad = null;
      this.propietario_2.describir_Diversidad = null;
      this.propietario_2.describir_Pueblos = null;
      this.propietario_2.consecutivo = false;
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
      this.suplente_1.telefonos = [];
      this.suplente_1.correo = null;
      this.suplente_1.pertenece_Grupo_Vulnerable = false;
      this.suplente_1.grupo_Vulnerable = null;
      this.suplente_1.partido_Id = null;
      this.suplente_1.url_Logo_Partido = null;
      this.suplente_1.grupo_Vulnerable_1 = false;
      this.suplente_1.grupo_Vulnerable_2 = false;
      this.suplente_1.grupo_Vulnerable_3 = false;
      this.suplente_1.grupo_Vulnerable_4 = false;
      this.suplente_1.edad = null;
      this.suplente_1.describir_Diversidad = null;
      this.suplente_1.describir_Pueblos = null;
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
      this.suplente_2.telefonos = [];
      this.suplente_2.correo = null;
      this.suplente_2.pertenece_Grupo_Vulnerable = false;
      this.suplente_2.grupo_Vulnerable = null;
      this.suplente_2.partido_Id = null;
      this.suplente_2.url_Logo_Partido = null;
      this.suplente_2.grupo_Vulnerable_1 = false;
      this.suplente_2.grupo_Vulnerable_2 = false;
      this.suplente_2.grupo_Vulnerable_3 = false;
      this.suplente_2.grupo_Vulnerable_4 = false;
      this.suplente_2.edad = null;
      this.suplente_2.describir_Diversidad = null;
      this.suplente_2.describir_Pueblos = null;
    },

    initCandidato2() {
      this.candidato2.id = null;
      this.candidato2.tipo = null;
      this.candidato2.nombre_Completo = null;
      this.candidato2.partido = null;
      this.candidato2.tipo_Candidato = null;
      this.candidato2.postulacion = null;
      this.candidato2.is_Comun = null;
      this.candidato2.comun_Id = null;
      this.candidato2.coalicion_Id = null;
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
          const { success, data, id } = resp.data;
          if (success === true) {
            return { success, data, id };
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
            url_Logo_Comun: candidato.url_Logo_Comun,
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
            is_Comun: candidato.is_Comun,
            coalicion: candidato.coalicion,
            tipo_Candidato: candidato.tipo_Candidato,
            orden: candidato.orden,
            activo: candidato.activo,
            validado: candidato.validado,
            estatus: candidato.estatus,
            fecha_registro: candidato.fecha_Registro,
            logo_Coalicion: candidato.url_Logo_Coalicion,
            postulacion:
              candidato.is_Comun == true
                ? "Candidatura común"
                : candidato.is_Coalicion == true
                ? "Coalición"
                : "Partido político",
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
    async loadCandidatosIndividual(eleccion) {
      try {
        let ultimo_Id = 0;
        let color = true;
        let resp = await api.get(`/Candidatos/Candidatos_Genero/${eleccion}`);
        let { data } = resp.data;
        this.list_Candidatos = data.map((candidato) => {
          if (candidato.id != ultimo_Id) {
            ultimo_Id = candidato.id;
            color = !color;
          }
          return {
            logo_Comun: candidato.logo_Comun,
            comun_Id: candidato.comun_Id,
            aprobar: false,
            color: color,
            id: candidato.id,
            puesto: candidato.puesto,
            candidatura:
              candidato.puesto == 0
                ? "Propietaria"
                : candidato.puesto == 1
                ? "Suplente"
                : candidato.puesto == 2
                ? "Propietaria síndico"
                : "Suplente síndico",
            url_Foto: candidato.foto_Url,
            estatus_Aprobado: candidato.estatus_Aprobado,
            municipio_Id: candidato.municipio_Id,
            municipio: candidato.municipio,
            distrito_Id: candidato.distrito_Id,
            no_Distrito: candidato.no_Distrito,
            distrito: candidato.distrito,
            demarcacion_Id: candidato.demarcacion_Id,
            demarcacion: candidato.demarcacion,
            tipo_Candidato: candidato.tipo_Candidato,
            orden: candidato.orden,
            nombres: candidato.nombres,
            apellido_Paterno: candidato.apellido_Paterno,
            apellido_Materno: candidato.apellido_Materno,
            nombre_Completo: `${
              candidato.nombres == null ? "" : candidato.nombres
            } ${
              candidato.apellido_Paterno == null
                ? ""
                : candidato.apellido_Paterno
            } ${
              candidato.apellido_Materno == null
                ? ""
                : candidato.apellido_Materno
            }`,
            genero: candidato.sexo,
            fecha_Nacimiento: candidato.fecha_Nacimiento,
            edad: candidato.edad,
            is_Coalicion: candidato.is_Coalicion,
            is_Comun: candidato.is_Comun,
            coalicion_Id: candidato.coalicion_Id,
            coalicion: candidato.coalicion,
            logo_Coalicion: candidato.logo_Coalicion,
            partido_Id: candidato.partido_Id,
            partido: candidato.partido,
            logo_Partido: candidato.logo_Partido,
            pertenece_Grupo_Vulnerable: candidato.pertenece_Grupo_Vulerable,
            grupo_Vulnerable: candidato.grupo_Vulnerable,
            postulacion:
              candidato.is_Comun == true
                ? "Candidatura común"
                : candidato.is_Coalicion == true
                ? "Coalición"
                : "Partido político",
            fecha_Registro: candidato.fecha_Registro,
            correo: candidato.correo,
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
    async loadCandidatosByEleccion(eleccion) {
      try {
        this.loading = true;
        let ultimo_Id = 0;
        let color = true;
        let resp = await api.get(`/Candidatos/ByTipoEleccion/${eleccion}`);
        let { data } = resp.data;
        this.list_Candidatos_By_Eleccion = data.map((candidato) => {
          if (candidato.id != ultimo_Id) {
            ultimo_Id = candidato.id;
            color = !color;
          }
          return {
            logo_Comun: candidato.comun_Id,
            is_Comun: candidato.is_Comun,
            id: candidato.id,
            color: color,
            puesto: candidato.puesto,
            candidatura:
              candidato.puesto == 0
                ? "Propietaria"
                : candidato.puesto == 1
                ? "Suplente"
                : candidato.puesto == 2
                ? "Propietaria sindico"
                : "Suplente sindico",
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
            nombre_Completo: `${
              candidato.nombres == null
                ? "Pendiente de Registrar"
                : candidato.nombres
            } ${
              candidato.apellido_Paterno == null
                ? ""
                : candidato.apellido_Paterno
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
            acuse_URL: candidato.acuse_URL,
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
            this.candidato.siglas =
              data.tipo_Eleccion == "Diputaciones"
                ? "DIP"
                : data.tipo_Eleccion == "Presidencias y Sindicaturas"
                ? "PYS"
                : "REG";
            this.candidato.municipio_Id = data.municipio_Id;
            this.candidato.distrito_Id = data.distrito_Id;
            this.candidato.distrito = data.distrito;
            this.candidato.demarcacion_Id = data.demarcacion_Id;
            this.candidato.coalicion_Id = data.coalicion_Id;
            this.candidato.postulacion =
              data.is_Comun == true
                ? "Candidatura común"
                : data.is_Coalicion == true
                ? "Coalición"
                : "Partido político";
            this.candidato.tipo_Candidato = data.tipo_Candidato;
            this.candidato.orden = data.orden;
            this.candidato.partido_Id = data.partido_Id;
            this.candidato.fecha_Registro = data.fecha_Registro;
            this.candidato.estatus = data.estatus;
            this.candidato.comun_Id = data.comun_Id;
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
              data.telefono_Propietario.split(",").forEach((element) => {
                this.propietario_1.telefonos.push(element);
              });
            }
            this.propietario_1.distrito = data.distrito;
            this.propietario_1.edad = data.edad_Propietario;
            this.propietario_1.consentimiento_URL =
              data.consentimiento_Candidato_Propietario_URL;
            this.propietario_1.acuse_URL = data.acuse_Candidato_Propietario_URL;
            this.propietario_1.consecutivo = data.consecutivo_Propietario;
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
              data.telefono_Propietario_2.split(",").forEach((element) => {
                this.propietario_2.telefonos.push(element);
              });
            }
            this.propietario_2.correo = data.correo_Propietario_2;
            this.propietario_2.pertenece_Grupo_Vulnerable =
              data.pertenece_Grupo_Vulnerable_Propietario_2 == null
                ? false
                : data.pertenece_Grupo_Vulnerable_Propietario_2;
            this.propietario_2.grupo_Vulnerable =
              data.grupo_Vulnerable_Propietario_2;
            this.propietario_2.partido_Id = data.partido_Propietario_2_Id;
            this.propietario_2.partido_Propietario_2 =
              data.partido_Propietario_2;
            this.propietario_2.url_Logo_Partido =
              data.url_Logo_Partido_Propietario_2;
            this.propietario_2.distrito = data.distrito;
            this.propietario_2.edad = data.edad_Propietario_2;
            this.propietario_2.consentimiento_URL =
              data.consentimiento_Candidato_Propietario_2_URL;
            this.propietario_2.acuse_URL =
              data.consentimiento_Candidato_Propietario_2_URL;
            this.propietario_2.consecutivo = data.consecutivo_Propietario_2;
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
              data.telefono_Suplente.split(",").forEach((element) => {
                this.suplente_1.telefonos.push(element);
              });
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
            this.suplente_1.edad = data.edad_Suplente;
            this.suplente_1.consentimiento_URL =
              data.consentimiento_Candidato_Suplente_URL;
            this.suplente_1.acuse_URL = data.acuse_Candidato_Suplente_URL;
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
              data.telefono_Suplente_2.split(",").forEach((element) => {
                this.suplente_2.telefonos.push(element);
              });
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
            this.suplente_2.edad = data.edad_Suplente_2;
            this.suplente_2.consentimiento_URL =
              data.consentimiento_Candidato_Suplente_2_URL;
            this.suplente_2.acuse_URL = data.acuse_Candidato_Suplente_2_URL;

            if (data.pertenece_Grupo_Vulnerable_Propietario == true) {
              let elementosGrupos =
                data.grupo_Vulnerable_Propietario.split("||");
              if (elementosGrupos[0].split("|") != undefined) {
                this.propietario_1.grupo_Vulnerable_1 =
                  elementosGrupos[0].split("|")[0] == "true" ? true : false;
                this.propietario_1.describir_Pueblos =
                  elementosGrupos[0].split("|")[1];
              }
              if (elementosGrupos[1].split("|") != undefined) {
                this.propietario_1.grupo_Vulnerable_2 =
                  elementosGrupos[1].split("|")[0] == "true" ? true : false;
                this.propietario_1.describir_Diversidad =
                  elementosGrupos[1].split("|")[1];
              }
              if (elementosGrupos[2].split("|") != undefined) {
                this.propietario_1.grupo_Vulnerable_3 =
                  elementosGrupos[2].split("|")[0] == "true" ? true : false;
                this.propietario_1.describir_Discapacidad =
                  elementosGrupos[2].split("|")[1];
              }
              if (elementosGrupos[3].split("|") != undefined) {
                this.propietario_1.grupo_Vulnerable_4 =
                  elementosGrupos[3].split("|")[0] == "true" ? true : false;
                this.propietario_1.describir_Migrante =
                  elementosGrupos[3].split("|")[1];
              }
            }
            if (data.pertenece_Grupo_Vulnerable_Suplente == true) {
              let elementosGrupos = data.grupo_Vulnerable_Suplente.split("||");
              if (elementosGrupos[0].split("|") != undefined) {
                this.suplente_1.grupo_Vulnerable_1 =
                  elementosGrupos[0].split("|")[0] == "true" ? true : false;
                this.suplente_1.describir_Pueblos =
                  elementosGrupos[0].split("|")[1];
              }
              if (elementosGrupos[1].split("|") != undefined) {
                this.suplente_1.grupo_Vulnerable_2 =
                  elementosGrupos[1].split("|")[0] == "true" ? true : false;
                this.suplente_1.describir_Diversidad =
                  elementosGrupos[1].split("|")[1];
              }
              if (elementosGrupos[2].split("|") != undefined) {
                this.suplente_1.grupo_Vulnerable_3 =
                  elementosGrupos[2].split("|")[0] == "true" ? true : false;
                this.suplente_1.describir_Discapacidad =
                  elementosGrupos[2].split("|")[1];
              }
              if (elementosGrupos[3].split("|") != undefined) {
                this.suplente_1.grupo_Vulnerable_4 =
                  elementosGrupos[3].split("|")[0] == "true" ? true : false;
                this.suplente_1.describir_Migrante =
                  elementosGrupos[3].split("|")[1];
              }
            }
            if (data.pertenece_Grupo_Vulnerable_Propietario_2 == true) {
              let elementosGrupos =
                data.grupo_Vulnerable_Propietario_2.split("||");
              if (elementosGrupos[0].split("|") != undefined) {
                this.propietario_2.grupo_Vulnerable_1 =
                  elementosGrupos[0].split("|")[0] == "true" ? true : false;
                this.propietario_2.describir_Pueblos =
                  elementosGrupos[0].split("|")[1];
              }
              if (elementosGrupos[1].split("|") != undefined) {
                this.propietario_2.grupo_Vulnerable_2 =
                  elementosGrupos[1].split("|")[0] == "true" ? true : false;
                this.propietario_2.describir_Diversidad =
                  elementosGrupos[1].split("|")[1];
              }
              if (elementosGrupos[2].split("|") != undefined) {
                this.propietario_2.grupo_Vulnerable_3 =
                  elementosGrupos[2].split("|")[0] == "true" ? true : false;
                this.propietario_2.describir_Discapacidad =
                  elementosGrupos[2].split("|")[1];
              }
              if (elementosGrupos[3].split("|") != undefined) {
                this.propietario_2.grupo_Vulnerable_4 =
                  elementosGrupos[3].split("|")[0] == "true" ? true : false;
                this.propietario_2.describir_Migrante =
                  elementosGrupos[3].split("|")[1];
              }
            }
            if (data.pertenece_Grupo_Vulnerable_Suplente_2 == true) {
              let elementosGrupos =
                data.grupo_Vulnerable_Suplente_2.split("||");
              if (elementosGrupos[0].split("|") != undefined) {
                this.suplente_2.grupo_Vulnerable_1 =
                  elementosGrupos[0].split("|")[0] == "true" ? true : false;
                this.suplente_2.describir_Pueblos =
                  elementosGrupos[0].split("|")[1];
              }
              if (elementosGrupos[1].split("|") != undefined) {
                this.suplente_2.grupo_Vulnerable_2 =
                  elementosGrupos[1].split("|")[0] == "true" ? true : false;
                this.suplente_2.describir_Diversidad =
                  elementosGrupos[1].split("|")[1];
              }
              if (elementosGrupos[2].split("|") != undefined) {
                this.suplente_2.grupo_Vulnerable_3 =
                  elementosGrupos[2].split("|")[0] == "true" ? true : false;
                this.suplente_2.describir_Discapacidad =
                  elementosGrupos[2].split("|")[1];
              }
              if (elementosGrupos[3].split("|") != undefined) {
                this.suplente_2.grupo_Vulnerable_4 =
                  elementosGrupos[3].split("|")[0] == "true" ? true : false;
                this.suplente_2.describir_Migrante =
                  elementosGrupos[3].split("|")[1];
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
            this.propietario_2.tipo_Candidato = data.tipo_Candidato;
            this.propietario_2.tipo_Eleccion = data.tipo_Eleccion;
            this.propietario_2.tipo_Eleccion_Id = data.tipo_Eleccion_Id;
            this.suplente_1.tipo_Eleccion = data.tipo_Eleccion;
            this.suplente_1.tipo_Eleccion_Id = data.tipo_Eleccion_Id;
            this.suplente_1.tipo_Candidato = data.tipo_Candidato;
            this.suplente_2.tipo_Candidato = data.tipo_Candidato;
            this.suplente_2.tipo_Eleccion_Id = data.tipo_Eleccion_Id;
            this.suplente_2.tipo_Eleccion = data.tipo_Eleccion;
            this.propietario_1.comun_Id = data.comun_Id;
            this.propietario_2.comun_Id = data.comun_Id;
            this.suplente_1.comun_Id = data.comun_Id;
            this.suplente_2.comun_Id = data.comun_Id;
            //-----------------------------------------------------
            //PROPIETARIO 1
            this.propietario_1.postulacion =
              data.is_Coalicion == true
                ? "Coalición"
                : data.is_Comun == true
                ? "Candidatura común"
                : "Partido político";
            this.propietario_1.validado = data.validado;
            this.propietario_1.tipo_Eleccion = data.tipo_Eleccion;
            this.propietario_1.tipo_Eleccion_Id = data.tipo_Eleccion_Id;
            this.propietario_1.municipio_Id = data.municipio_Id;
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
            this.propietario_1.consentimiento_URL =
              data.consentimiento_Candidato_Propietario_URL;
            this.propietario_1.acuse_URL = data.acuse_Candidato_Propietario_URL;
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
            this.propietario_2.municipio_Id = data.municipio_Id;
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
              data.pertenece_Grupo_Vulnerable_Propietario_2;
            this.propietario_2.grupo_Vulnerable =
              data.grupo_Vulnerable_Propietario_2;
            this.propietario_2.partido_Id = data.partido_Propietario_2_Id;
            this.propietario_2.partido = data.partido_Propietario_2;
            this.propietario_2.url_Logo_Partido =
              data.url_Logo_Partido_Propietario_2;
            this.propietario_2.is_Coalicion = data.is_Coalicion;
            this.propietario_2.coalicion_Id = data.coalicion_Id;
            this.propietario_2.edad = data.edad_Propietario_2;
            this.propietario_2.consentimiento_URL =
              data.consentimiento_Candidato_Propietario_2_URL;
            this.propietario_2.acuse_URL =
              data.consentimiento_Candidato_Propietario_2_URL;
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
            this.suplente_1.municipio_Id = data.municipio_Id;
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
            this.suplente_1.consentimiento_URL =
              data.consentimiento_Candidato_Suplente_URL;
            this.suplente_1.acuse_URL = data.acuse_Candidato_Suplente_URL;
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
            this.suplente_2.municipio_Id = data.municipio_Id;
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
            this.suplente_2.consentimiento_URL =
              data.consentimiento_Candidato_Suplente_2_URL;
            this.suplente_2.acuse_URL = data.acuse_Candidato_Suplente_2_URL;

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
            this.candidato2.id = data.id;
            this.candidato2.comun_Id = data.comun_Id;
            this.candidato2.is_Comun = data.is_Comun;
            this.candidato2.postulacion =
              data.is_Comun == true
                ? "Candidatura común"
                : data.is_Coalicion == true
                ? "Coalición"
                : "Partido político";
            this.candidato2.tipo = cargo;
            this.candidato2.is_Coalicion = data.is_Coalicion;
            this.candidato2.coalicion_Id = data.coalicion_Id;
            this.candidato2.tipo_Candidato = data.tipo_Candidato;
            this.candidato2.partido_Id = data.partido_Id;
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
            this.candidato.acuse_URL = data.acuse_URL;
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
    async actualizarFotografia(foto, id, puesto) {
      try {
        const resp = await api.post(
          `/Candidatos/ActualizarFoto/${id}/${puesto}`,
          foto,
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

    //----------------------------------------------------------------------
    async loadDocumentacionCompleta() {
      try {
        let ultimo_Id = 0;
        let color = true;
        let resp = await api.get(
          "/Tipos_Eleccion_Cumplimiento/Progreso_Documentos"
        );
        let { data } = resp.data;
        this.list_Documentacion_Completa = data.map((item) => {
          if (item.candidato_Id != ultimo_Id) {
            ultimo_Id = item.candidato_Id;
            color = !color;
          }
          return {
            color: color,
            candidato_Id: item.candidato_Id,
            no_Formula: item.no_Formula,
            puesto: item.puesto,
            completo: item.completo,
            documentos: item.documentos,
            complementarios: item.complementarios,
            tipo_Candidato: item.tipo_Candidato,
            tipo_Eleccion_Id: item.tipo_Eleccion_Id,
            tipo_Eleccion: item.tipo_Eleccion,
            aprobado: item.aprobado,
            nombre_Completo: `${
              item.nombres == null ? "Pendiente de Registrar" : item.nombres
            } ${item.apellido_Paterno == null ? "" : item.apellido_Paterno} ${
              item.apellido_Materno == null ? "" : item.apellido_Materno
            }`,
            nombres: item.nombres,
            apellido_Paterno: item.apellido_Paterno,
            apellido_Materno: item.apellido_Materno,
            partido_Id: item.partido_Id,
            partido: item.partido,
            logo_Partido: item.logo_Partido,
            is_Coalicion: item.is_Coalicion,
            coalicion_Id: item.coalicion_Id,
            coalicion: item.coalicion,
            logo_Coalicion: item.logo_Coalicion,
            disrito_Id: item.disrito_Id,
            distrito: item.distrito,
            no_Distrito: item.no_Distrito,
            municipio_Id: item.municipio_Id,
            municipio: item.municipio,
            demarcacion_Id: item.demarcacion_Id,
            demarcacion: item.demarcacion,
            is_Comun: item.is_Comun,
            logo_Comun: item.logo_Comun,
            comun_Id: item.comun_Id,
          };
        });
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    //-----------------------------------------------------------
    async coindidenciasClaveCurp(clave, curp) {
      try {
        let resp = null;
        if (this.candidato.id == null) {
          resp = await api.get(
            `/Candidatos/Validar_Existencia_Candidatos?CURP=${curp}&CLAVE=${clave}`
          );
        } else {
          resp = await api.get(
            `/Candidatos/Validar_Existencia_Candidatos?CandidatoId=${this.candidato.id}&CURP=${curp}&CLAVE=${clave}`
          );
        }

        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success == true) {
            return { success: success, data: data };
          }
        }
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, intentelo de nuevo. Si el error perisiste, contacte a soporte",
        };
      }
    },

    //----------------------------------------------------------------------
    //DELETE DOCUMENTO
    async deleteFoto(candidato_Id, puesto) {
      try {
        const resp = await api.delete(
          `/Candidatos/EliminarFoto/${candidato_Id}/${puesto}`
        );
        if (resp.status == 200) {
          let { success, data } = resp.data;
          if (success === true) {
            return { success, data };
          } else {
            return { success, data };
          }
        } else {
          return {
            success: false,
            data: "Ocurrio un error, intentelo de nuevo",
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
