import { defineStore } from "pinia";

export const useSustituirStore = defineStore("useSustituirStore", {
  state: () => ({
    modal: false,
    modalOficio: false,
    candidatoSustituir: {
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
    actualizarModalOficio(valor) {
      this.modalOficio = valor;
    },
  },
});
