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
    candidaturaRegistrada: false,
    list_Municipios_Filtro: [],
    list_Municipios: [],
    list_Distritos: [],
    list_Distritos_Todos: [],
    list_Distrito_Municipio_Demarcacion: [],
    list_Municipios_Todos: [],
    list_Demarcaciones: [],
    list_Demarcaciones_Todos: [],
    list_Partidos_Politicos: [],
    list_Partidos_Politicos_Todos: [],
    list_Partidos_Politicos_Coalcion: [],
    list_Coaliciones: [],
    list_Coaliciones_Filtro: [],
    list_Requisitos: [],
    list_Integracion: [],
    list_Comunes: [],
    list_Partidos_Politicos_rp: [],
    list_Oficinas: [],
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
        this.tipo_Elecciones = listActivo.map((tipo) => {
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
    async loadDemarcaciones(id, filtro) {
      try {
        let resp = await api.get(`/Demarcaciones/ByMunicipio/${id}`);
        let { data } = resp.data;
        let list_Demarcaciones = data.map((demarcacion) => {
          return {
            value: demarcacion.id,
            label: demarcacion.nombre,
          };
        });
        if (filtro == true) {
          list_Demarcaciones.splice(0, 0, {
            value: 0,
            label: "Todos",
          });
        }
        this.list_Demarcaciones_Todos = list_Demarcaciones;
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    //----------------------------------------------------------------------
    //DISTRITOS
    async loadDistritos(filtro) {
      try {
        let resp = await api.get("/Distritos");
        let { data } = resp.data;
        let list_Distritos = data.map((distrito) => {
          return {
            id: distrito.id,
            no_Distrito: distrito.no_Distrito,
            nombre: distrito.nombre,
            integracion: distrito.integracion,
            value: distrito.id,
            label: `${distrito.no_Distrito} - ${distrito.nombre}`,
          };
        });
        if (filtro == true) {
          list_Distritos.splice(0, 0, {
            value: 0,
            label: "Todos",
          });
        }
        this.list_Distritos_Todos = list_Distritos;
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    //----------------------------------------------------------------------
    //OFICINAS
    async loadOficinas() {
      try {
        let resp = await api.get("/Oficinas/GetLista");
        let { data } = resp.data;
        let listOficinas = data.map((oficina) => {
          return {
            value: oficina.value,
            label: oficina.label,
          };
        });
        listOficinas.splice(0, 0, {
          value: 0,
          label: "Todos",
        });
        this.list_Oficinas = listOficinas;
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    //----------------------------------------------------------------------
    //DISTRITOS DISPONIBLES
    async loadDisponibles(
      partido_Id,
      coalicion_Id,
      eleccion_Id,
      eleccion,
      municipio_Id,
      is_Comun
    ) {
      try {
        let municipioCME = localStorage.getItem("municipio_Id");
        let resp = null;
        if ((partido_Id == "" || partido_Id == null) && is_Comun == false) {
          resp = await api.get(
            `/Distritos/Distritos_Municipios_Demarcaciones_Disponibles?CoalicionId=${coalicion_Id}&TipoEleccionId=${eleccion_Id}`
          );
        } else if (is_Comun == true) {
          resp = await api.get(
            `/Distritos/Distritos_Municipios_Demarcaciones_Disponibles?ComunId=${coalicion_Id}&TipoEleccionId=${eleccion_Id}`
          );
        } else if (partido_Id != "" || partido_Id != null) {
          resp = await api.get(
            `/Distritos/Distritos_Municipios_Demarcaciones_Disponibles?PartidoId=${partido_Id}&TipoEleccionId=${eleccion_Id}`
          );
        }
        let { data } = resp.data;
        if (eleccion == "DIP") {
          this.list_Distritos = data.map((distrito) => {
            return {
              id: distrito.id,
              no_Distrito: distrito.no_Distrito,
              nombre: distrito.nombre,
              integracion: distrito.integracion,
              indigena: distrito.indigena,
              eliminado: distrito.eliminado,
              value: distrito.id,
              label: `${distrito.no_Distrito} - ${distrito.nombre}`,
            };
          });
          if (this.list_Distritos.length == 0) {
            this.candidaturaRegistrada = true;
          } else {
            this.candidaturaRegistrada = false;
          }
        } else if (eleccion == "PYS") {
          let list_Municipios = data.map((municipio) => {
            return {
              id: municipio.id,
              estado_Id: municipio.estado_Id,
              clave: municipio.clave,
              nombre: municipio.nombre,
              fecha_Registro: municipio.fecha_Registro,
              eliminado: municipio.eliminado,
              value: municipio.id,
              label: municipio.nombre,
            };
          });
          if (municipioCME == "null") {
            this.list_Municipios = list_Municipios;
          } else {
            this.list_Municipios = list_Municipios.filter(
              (x) => x.id == municipioCME
            );
          }
          if (this.list_Municipios.length == 0) {
            this.candidaturaRegistrada = true;
          } else {
            this.candidaturaRegistrada = false;
          }
        } else if (eleccion == "REG") {
          let list_Municipio = data.filter(
            (x) => x.municipio_Id == municipio_Id
          );
          this.list_Demarcaciones = list_Municipio.map((demarcacion) => {
            return {
              id: demarcacion.id,
              nombre: demarcacion.nombre,
              no_Demarcacion: demarcacion.no_Demarcacion,
              indigena: demarcacion.indigena,
              eliminado: demarcacion.eliminado,
              value: demarcacion.id,
              label: demarcacion.nombre,
            };
          });
          if (this.list_Demarcaciones.length == 0) {
            this.candidaturaRegistrada = true;
          } else {
            this.candidaturaRegistrada = false;
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
    //PARTIDOS POLITICOS
    async loadPartidosPoliticos(rp, comun, coalicion, todos, partido) {
      try {
        let resp = await api.get("/Partidos_Politicos");
        let { data } = resp.data;
        let listPartidosFiltro = [];
        if (comun == true) {
          listPartidosFiltro = data.filter(
            (x) => x.is_Comun == true && x.siglas != "NAN" && x.siglas != "MLN"
          );
        } else if (todos == true || rp == true) {
          listPartidosFiltro = data;
        } else if (coalicion == true) {
          listPartidosFiltro = data.filter((x) => x.is_Coalicion == true);
        } else if (partido == true) {
          listPartidosFiltro = data.filter((x) => x.is_Comun == false);
        }

        let list_Partidos = listPartidosFiltro.map((partido) => {
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
            is_Comun: partido.is_Comun,
            orden_Publicacion: partido.orden_Publicacion,
          };
        });
        this.list_Partidos_Politicos = list_Partidos.sort(
          (a, b) => a.orden_Publicacion - b.orden_Publicacion
        );
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    async loadPartidosPoliticosRP() {
      try {
        let resp = await api.get("/Partidos_Politicos/PartidosRP");
        let { data } = resp.data;
        let listFiltrado = [];
        listFiltrado = data.filter((x) => x.comun_Padre == false);
        this.list_Partidos_Politicos = listFiltrado.map((partido) => {
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
        this.list_Partidos_Politicos_rp = this.list_Partidos_Politicos;
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    async loadPartidosPoliticosGenero() {
      try {
        let resp = await api.get("/Partidos_Politicos/PartidosRP");
        let { data } = resp.data;
        let listFiltrado = [];
        listFiltrado = data.filter(
          (x) => x.is_Coalicion == false && x.is_Comun == false
        );
        this.list_Partidos_Politicos = listFiltrado.map((partido) => {
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
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    async loadPartidosPoliticosTodos() {
      try {
        let resp = await api.get("/Partidos_Politicos/PartidosRP");
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
            is_Comun: partido.is_Comun,
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

    async loadPartidosPoliticosCoalicionComun(coalicion_Id, coalicion) {
      try {
        let resp = null;
        let listPartidos = [];
        if (coalicion == true) {
          resp = await api.get(
            `/Integracion_Coaliciones/ByCoalicion/${coalicion_Id}`
          );
          let { data } = resp.data;

          listPartidos = data.map((partido) => {
            return {
              value: partido.partido_Id,
              label: partido.siglas,
              id: partido.id,
              logo_URL: partido.logo_URL,
              coalicion_Id: partido.coalicion_Id,
              coalicion: partido.coalicion,
              partido_Id: partido.partido_Id,
              partido: partido.partido,
              activo: partido.activo,
              porcentaje: partido.porcentaje,
            };
          });
        } else {
          resp = await api.get(
            `/Partidos_Politicos/IsComunIntegracion/${coalicion_Id}`
          );
          let { data } = resp.data;
          listPartidos = data.map((partido) => {
            return {
              value: partido.partido_Id,
              label: partido.siglas,
              id: partido.id,
              partido_Padre_Id: partido.partido_Padre_Id,
              partido_Id: partido.partido_Id,
              partido: partido.partido,
              porcentaje: partido.porcentaje,
              activo: partido.activo,
              logo_URL: partido.logo_URL,
            };
          });
        }

        this.list_Partidos_Politicos_Coalcion = listPartidos;
        this.list_Partidos_Politicos = listPartidos;
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    //----------------------------------------------------------------------
    //MUNICIPIOS
    async loadMunicipios(coalicion, siglas) {
      try {
        let municipioCME = localStorage.getItem("municipio_Id");
        let municipioLetra = localStorage.getItem("municipio_letra");
        let resp = await api.get("/Municipios/MunicipiosNayarit");
        let { data } = resp.data;
        let filtroMunicilios = [];
        if (coalicion == true && siglas == "SHHN") {
          filtroMunicilios = data.filter((x) => x.nombre != "Del Nayar");
        } else if (coalicion == true && siglas == "NAN-MLN") {
          filtroMunicilios = data.filter((x) => x.nombre != "San Blas");
        } else if (
          coalicion == false &&
          (siglas == "PVEM" ||
            siglas == "PT" ||
            siglas == "MORENA" ||
            siglas == "FXMN")
        ) {
          filtroMunicilios = data.filter((x) => x.nombre == "Del Nayar");
        } else if (coalicion == false) {
          filtroMunicilios = data;
        } else {
          filtroMunicilios = data;
        }
        let list_Municipios = filtroMunicilios.map((municipio) => {
          return {
            value: municipio.id,
            label: municipio.nombre,
          };
        });
        if (
          municipioCME == "null" ||
          municipioCME == null ||
          municipioLetra == "Oficina Central IEEN"
        ) {
          this.list_Municipios_Todos = list_Municipios;
        } else {
          this.list_Municipios_Todos = list_Municipios.filter(
            (x) => x.value == municipioCME
          );
        }
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    //----------------------------------------------------------------------
    //MUNICIPIOS
    async loadMunicipiosFiltro() {
      try {
        let municipioLetra = localStorage.getItem("municipio_letra");
        let municipioCME = localStorage.getItem("municipio_Id");
        let resp = await api.get("/Municipios/MunicipiosNayarit");
        let { data } = resp.data;
        let list_Municipios = data.map((municipio) => {
          return {
            value: municipio.id,
            label: municipio.nombre,
          };
        });
        if (
          municipioCME == "null" ||
          municipioCME == null ||
          municipioLetra == "Oficina Central IEEN"
        ) {
          this.list_Municipios_Filtro = list_Municipios;
        } else {
          this.list_Municipios_Filtro = list_Municipios.filter(
            (x) => x.value == municipioCME
          );
        }
        this.list_Municipios_Filtro.splice(0, 0, {
          value: 0,
          label: "Todos",
        });
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    //----------------------------------------------------------------------
    //COMUNES
    async loadComunes() {
      try {
        let resp = await api.get("/Partidos_Politicos/IsComun");
        let { data } = resp.data;
        this.list_Comunes = data.map((comun) => {
          return {
            value: comun.id,
            label: comun.siglas,
            id: comun.id,
            nombre: comun.nombre,
            siglas: comun.siglas,
            logo_URL: comun.logo_URL,
            independiente: comun.independiente,
            prioridad: comun.prioridad,
            pantone_Fondo: comun.pantone_Fondo,
            pantona_Letra: comun.pantona_Letra,
            orden_Publicacion: comun.orden_Publicacion,
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
    //COALICIONES
    async loadCoaliciones() {
      try {
        let resp = await api.get("/Coaliciones");
        let { data } = resp.data;
        let listCoaliciones = data.map((coalicion) => {
          return {
            value: coalicion.id,
            label: coalicion.nombre,
            is_Comun: coalicion.comun,
            logo_URL: coalicion.logo_URL,
            siglas: coalicion.siglas,
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
  },
});
