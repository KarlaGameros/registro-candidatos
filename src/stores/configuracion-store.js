import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useConfiguracionStore = defineStore("useConfiguracionStore", {
  state: () => ({
    tipo_Elecciones: [],
    eleccion: {
      id: null,
      nombre: null,
      siglas: null,
      activo: null,
      propietario_1: null,
      propietario_2: null,
      suplente_1: null,
      suplente_2: null,
      fecha_Registro: null,
    },
    list_Municipios: [],
    list_Distritos: [],
    list_Demarcaciones: [],
    list_Partidos_Politicos: [],
    list_Partidos_Politicos_Todos: [],
    list_Partidos_Politicos_Coalcion: [],
    list_Coaliciones: [],
    list_Coaliciones_Filtro: [],
    list_Requisitos: [],
    list_Integracion: [],
  }),
  actions: {
    //----------------------------------------------------------------------
    //TIPO DE ELECCIONES
    async loadTipoElecciones() {
      try {
        let resp = await api.get("/Tipos_Elecciones");
        let { data } = resp.data;

        let listActivo = [];
        listActivo = data.filter((x) => x.activo == true);
        let listTipoElecciones = listActivo.map((tipo) => {
          return {
            id: tipo.id,
            nombre: tipo.nombre,
            siglas: tipo.siglas,
            activo: tipo.activo,
            propietario_1: tipo.propietario_1,
            propietario_2: tipo.propietario_2,
            suplente_1: tipo.suplente_1,
            suplente_2: tipo.suplente_2,
            fecha_Registro: tipo.fecha_Registro,
            value: tipo.id,
            label: tipo.nombre,
          };
        });

        this.tipo_Elecciones = listTipoElecciones;
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    async loadEleccionId(id) {
      try {
        let resp = await api.get(`/Tipos_Elecciones/${id}`);
        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success == true) {
            this.eleccion.id = data.id;
            this.eleccion.nombre = data.nombre;
            this.eleccion.siglas = data.siglas;
            this.eleccion.activo = data.activo;
            this.eleccion.propietario_1 = data.propietario_1;
            this.eleccion.propietario_2 = data.propietario_2;
            this.eleccion.suplente_1 = data.suplente_1;
            this.eleccion.suplente_2 = data.suplente_2;
            this.eleccion.fecha_Registro = data.fecha_Registro;
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
    //DEMARCACIONES
    async loadDemarcaciones(id) {
      try {
        let resp = await api.get("/Demarcaciones");
        let { data } = resp.data;

        let listByMunicicipio = [];
        listByMunicicipio = data.filter((x) => x.municipio_Id == id);
        let listDemarcaciones = listByMunicicipio.map((demarcacion) => {
          return {
            value: demarcacion.id,
            label: demarcacion.nombre,
          };
        });
        this.list_Demarcaciones = listDemarcaciones;
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    //----------------------------------------------------------------------
    //DISTRITOS
    async loadDistritos() {
      try {
        let resp = await api.get("/Distritos");
        let { data } = resp.data;
        let listDistritos = data.map((distrito) => {
          return {
            id: distrito.id,
            no_Distrito: distrito.no_Distrito,
            nombre: distrito.nombre,
            integracion: distrito.integracion,
            label: `${distrito.no_Distrito} - ${distrito.nombre}`,
          };
        });
        this.list_Distritos = listDistritos;
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    //----------------------------------------------------------------------
    //PARTIDOS POLITICOS
    async loadPartidosPoliticosTodos() {
      try {
        let resp = await api.get("/Partidos_Politicos");
        let { data } = resp.data;
        let listPartidos = data.map((partido) => {
          return {
            value: partido.id,
            label: partido.siglas,
            nombre: partido.nombre,
            siglas: partido.siglas,
            logo_URL: partido.logo_URL,
            independiente: partido.independiente,
            prioridad: partido.prioridad,
            pantone_Fondo: partido.pantone_Fondo,
            pantone_Letra: partido.pantone_Letra,
            coalicion_Id: partido.coalicion_Id,
            coalicion: partido.coalicion,
            is_Coalicion: partido.is_Coalicion,
          };
        });
        listPartidos.splice(0, 0, {
          value: 0,
          label: "Todos",
        });
        this.list_Partidos_Politicos_Todos = listPartidos;
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    async loadPartidosPoliticos() {
      try {
        let resp = await api.get("/Partidos_Politicos");
        let { data } = resp.data;
        let listPartidosFiltro = [];
        listPartidosFiltro = data.filter((x) => x.is_Coalicion == false);
        let listPartidos = listPartidosFiltro.map((partido) => {
          return {
            value: partido.id,
            label: partido.siglas,
            nombre: partido.nombre,
            siglas: partido.siglas,
            logo_URL: partido.logo_URL,
            independiente: partido.independiente,
            prioridad: partido.prioridad,
            pantone_Fondo: partido.pantone_Fondo,
            pantone_Letra: partido.pantone_Letra,
            coalicion_Id: partido.coalicion_Id,
            coalicion: partido.coalicion,
            is_Coalicion: partido.is_Coalicion,
          };
        });
        this.list_Partidos_Politicos = listPartidos;
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    async loadPartidosPoliticosRP() {
      try {
        let resp = await api.get("/Partidos_Politicos");
        let { data } = resp.data;
        let listPartidos = data.map((partido) => {
          return {
            value: partido.id,
            label: partido.siglas,
            nombre: partido.nombre,
            siglas: partido.siglas,
            logo_URL: partido.logo_URL,
            independiente: partido.independiente,
            prioridad: partido.prioridad,
            pantone_Fondo: partido.pantone_Fondo,
            pantone_Letra: partido.pantone_Letra,
            coalicion_Id: partido.coalicion_Id,
            coalicion: partido.coalicion,
            is_Coalicion: partido.is_Coalicion,
          };
        });
        this.list_Partidos_Politicos = listPartidos;
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    async loadPartidosPoliticosCoalicion() {
      try {
        let resp = await api.get("/Partidos_Politicos");
        let { data } = resp.data;
        let listPartidosFiltro = [];
        listPartidosFiltro = data.filter(
          (x) => x.is_Coalicion == true || x.isComun == true
        );
        let listPartidos = listPartidosFiltro.map((partido) => {
          return {
            value: partido.id,
            label: partido.siglas,
            nombre: partido.nombre,
            siglas: partido.siglas,
            logo_URL: partido.logo_URL,
            independiente: partido.independiente,
            prioridad: partido.prioridad,
            pantone_Fondo: partido.pantone_Fondo,
            pantone_Letra: partido.pantone_Letra,
            coalicion_Id: partido.coalicion_Id,
            coalicion: partido.coalicion,
            is_Coalicion: partido.is_Coalicion,
          };
        });
        this.list_Partidos_Politicos_Coalcion = listPartidos;
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    //----------------------------------------------------------------------
    //MUNICIPIOS
    async loadMunicipios() {
      try {
        let resp = await api.get("/Municipios");
        let { data } = resp.data;
        let listNayarit = [];
        listNayarit = data.filter((x) => x.estado_Id == 18);
        let listMunicipios = listNayarit.map((municipio) => {
          return {
            value: municipio.id,
            label: municipio.nombre,
          };
        });
        this.list_Municipios = listMunicipios;
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    //----------------------------------------------------------------------
    //COALICIONES
    async loadCoaliciones(tipo) {
      try {
        let resp = await api.get("/Coaliciones");
        let { data } = resp.data;
        let filtrarCoaliciones = [];
        if (tipo == "Coalición") {
          filtrarCoaliciones = data.filter((x) => x.comun == false);
        } else {
          filtrarCoaliciones = data.filter((x) => x.comun == true);
        }
        let listCoaliciones = filtrarCoaliciones.map((coalicion) => {
          return {
            value: coalicion.id,
            label: coalicion.nombre,
          };
        });

        this.list_Coaliciones = listCoaliciones;
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    //----------------------------------------------------------------------
    //COALICIONES
    async loadCoalicionesFiltro() {
      try {
        let resp = await api.get("/Coaliciones");
        let { data } = resp.data;
        let listCoaliciones = data.map((coalicion) => {
          return {
            value: coalicion.id,
            label: coalicion.nombre,
          };
        });
        listCoaliciones.splice(0, 0, {
          value: 0,
          label: "Todos",
        });
        this.list_Coaliciones_Filtro = listCoaliciones;
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    //----------------------------------------------------------------------
    //GET REQUISITOS BY ELECCION
    async loadRequisitos(id) {
      try {
        let resp = await api.get(
          `/Tipos_Eleccion_Requerimientos/ByTipoEleccion/${id}`
        );
        let { data } = resp.data;
        let listRequisitos = data.map((requisito) => {
          return {
            id: requisito.id,
            nombre: requisito.nombre,
            genero: requisito.genero,
            activo: requisito.activo,
            archivo: requisito.archivo,
            url: null,
          };
        });
        this.list_Requisitos = listRequisitos;
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    //----------------------------------------------------------------------
    //GET INTEGRACIONES BY CALICION
    async loadIntegracionesByCoalicion(id) {
      try {
        let resp = await api.get(`/Integracion_Coaliciones/ByCoalicion/${id}`);
        let { data } = resp.data;
        let listIntegracion = data.map((partido) => {
          return {
            id: partido.id,
            coalicion_Id: partido.coalicion_Id,
            coalicion: partido.coalicion,
            partido: partido.partido,
            partido_Id: partido.partido_Id,
            porcentaje: partido.porcentaje,
            value: partido.partido_Id,
            label: partido.partido,
          };
        });
        this.list_Integracion = listIntegracion;
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },
  },
});
