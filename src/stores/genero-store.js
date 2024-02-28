import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useGeneroStore = defineStore("useGeneroStore", {
  state: () => ({
    list_Documentacion_Genero: [],
    list_Requisitos: [],
    modal: false,
    modalDetalle: false,
    documentoExcel: null,
    list_Candidatos_Genero: [],
    list_Documentos_Genero: [],
    documento: {
      url: null,
    },
    requisito: {
      id: null,
      tipo_Eleccion_Id: null,
      tipo_Eleccion: null,
      nombre: null,
    },
  }),
  actions: {
    actualizarModal(valor) {
      this.modal = valor;
    },

    actualizarModalDetalle(valor) {
      this.modalDetalle = valor;
    },

    intiDocumento() {
      this.documento.url = null;
    },

    //-----------------------------------------------------------
    async loadCandidatosGenero(eleccion) {
      try {
        let resp = await api.get(`/Candidatos/Candidatos_Genero/${eleccion}`);
        let { data } = resp.data;
        this.list_Candidatos_Genero = data.map((candidato) => {
          return {
            id: candidato.id,
            puesto: candidato.puesto,
            candidatura:
              candidato.puesto == 0
                ? "Propietario"
                : candidato.puesto == 1
                ? "Suplente"
                : candidato.puesto == 2
                ? "Propietario sindico"
                : "Suplente sindico",
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
            nombre_Completo: `${candidato.nombres} ${candidato.apellido_Paterno} ${candidato.apellido_Materno}`,
            sexo: candidato.sexo,
            fecha_Nacimiento: candidato.fecha_Nacimiento,
            edad: candidato.edad,
            is_Coalicion: candidato.is_Coalicion,
            coalicion_Id: candidato.coalicion_Id,
            coalicion: candidato.coalicion,
            logo_Coalicion: candidato.logo_Coalicion,
            partido_Id: candidato.partido_Id,
            partido: candidato.partido,
            logo_Partido: candidato.logo_Partido,
            pertenece_Grupo_Vulnerable: candidato.pertenece_Grupo_Vulerable,
            grupo_Vulnerable: candidato.grupo_Vulnerable,
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
    async getDocumentos(candidato_Id, puesto, requisito_Id) {
      try {
        let resp = await api.get(
          `/Tipos_Eleccion_Cumplimiento/GetDocumentos/${candidato_Id}/${puesto}`
        );
        let { data } = resp.data;
        this.list_Documentacion_Genero = data.map((requisito) => {
          return {
            id: requisito.id,
            requisito_Id: requisito.requisito_Id,
            requisito: requisito.requisito,
            registrado: requisito.registrado,
            estatus: requisito.estatus,
            ruta: requisito.ruta,
          };
        });
        if (requisito_Id != null) {
          let requisito = this.list_Documentacion_Genero.find(
            (x) => x.requisito_Id == requisito_Id
          );
          this.documento.url = requisito.ruta;
        }
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    //-----------------------------------------------------------
    async loadRequerimientos(id) {
      try {
        let resp = await api.get(
          `/Tipos_Eleccion_Requerimientos/ByTipoEleccion/${id}`
        );
        let { data } = resp.data;
        let requisitos_Genero = [];
        requisitos_Genero = data.filter(
          (x) => x.genero == true && x.activo == true
        );
        this.list_Requisitos = requisitos_Genero.map((requisito) => {
          return {
            id: requisito.id,
            tipo_Eleccion_Id: requisito.tipo_Eleccion_Id,
            tipo_Eleccion: requisito.tipo_Eleccion,
            nombre: requisito.nombre,
            archivo: requisito.archivo,
            genero: requisito.genero,
            activo: requisito.activo,
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
    async loadRequerimientoId(id) {
      try {
        let resp = null;
        resp = await api.get(`/Tipos_Eleccion_Requerimientos/${id}`);
        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success == true) {
            this.requisito.id = data.id;
            this.requisito.tipo_Eleccion_Id = data.tipo_Eleccion_Id;
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
    async downloadExcel() {
      try {
        this.documentoExcel = "";
        const resp = await api.get("/Candidatos/Excel_Genero", {
          responseType: "blob",
        });
        if (resp.status == 200) {
          let blob = new window.Blob([resp.data], {
            type: "application/zip",
          });
          this.documentoExcel = window.URL.createObjectURL(blob);
          return { success: true };
        } else {
          return {
            success: false,
            data: "Error al descargar archivo, intentelo de nuevo",
          };
        }
      } catch (error) {
        return {
          success: false,
          data: "Ocurrio un error, intentelo de nuevo. Si el error persiste contacte a soporte",
        };
      }
    },
  },
});
