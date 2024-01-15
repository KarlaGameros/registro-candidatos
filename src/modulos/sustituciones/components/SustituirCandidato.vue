<template>
  <q-card>
    <q-card-section class="row">
      <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 q-pr-xs">
        <q-select
          v-model="candidatoBase.Partido_Id_Nuevo"
          :options="list_Partidos_Politicos"
          label="Partido postulante"
          hint="Seleccione el partido postulante"
        />
      </div>
      <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
        <q-file
          accept=".jpg, image/*"
          bottom-slots
          v-model="candidatoBase.Foto_Nuevo"
          label="Fotografía"
          counter
        >
          <template v-slot:prepend>
            <q-icon name="cloud_upload" @click.stop.prevent />
          </template>
          <template v-slot:append>
            <q-icon
              name="close"
              @click.stop.prevent="candidatoBase.Foto_Nuevo = null"
              class="cursor-pointer"
            />
          </template>

          <template v-slot:hint> Agregar fotografía </template>
        </q-file>
      </div>
      <div class="col-6"></div>
      <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pr-xs">
        <q-input
          v-model="candidatoBase.Nombres_Nuevo"
          label="Nombre(s)"
          hint="Ingrese su nombre"
          autogrow
          lazy-rules
          :rules="[(val) => !!val || 'El nombre es requerido']"
        >
        </q-input>
      </div>
      <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pr-xs">
        <q-input
          v-model="candidatoBase.Apellido_Paterno_Nuevo"
          label="Apellido paterno"
          hint="Ingrese su apellido paterno"
          autogrow
        >
        </q-input>
      </div>
      <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pr-xs">
        <q-input
          v-model="candidatoBase.Apellido_Materno_Nuevo"
          label="Apellido Materno"
          hint="Ingrese su apellido materno"
          autogrow
        >
        </q-input>
      </div>
      <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pr-xs">
        <q-input
          v-model="candidatoBase.Mote_Nuevo"
          label="Mote"
          hint="Ingrese su sobrenombre"
          autogrow
        >
        </q-input>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 q-pr-xs">
        <q-input
          v-model.trim="candidatoBase.Clave_Elector_Nuevo"
          label="Clave de elector"
          hint="Ingrese su clave de elector"
          counter
          maxlength="18"
          autogrow
          lazy-rules
          :rules="[
            (val) => !!val || 'La clave de elector es requerida',
            (val) =>
              val.length >= 18 || 'Ingrese los 18 caracteres de la clave',
          ]"
        >
        </q-input>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 q-pr-xs">
        <q-input
          v-model.trim="candidatoBase.CURP_Nuevo"
          label="CURP"
          hint="Ingrese su CURP"
          autogrow
          lazy-rules
          counter
          maxlength="18"
          :rules="[
            (val) => !!val || 'La CURP es requerida',
            (val) => val.length >= 18 || 'Ingrese los 18 caracteres de la CURP',
          ]"
        >
        </q-input>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 q-pr-xs">
        <q-input
          v-model.trim="candidatoBase.RFC_Nuevo"
          label="RFC"
          hint="Ingrese su RFC"
          counter
          maxlength="13"
          autogrow
          lazy-rules
          :rules="[
            (val) => !!val || 'El RFC es requerido',
            (val) => val.length >= 13 || 'Ingrese los 13 caracteres deL RFC',
          ]"
        >
        </q-input>
      </div>
      <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pr-xs">
        <q-input
          v-model="candidatoBase.Fecha_Nacimiento_Nuevo"
          label="Fecha de nacimiento"
        >
          <template v-slot:append>
            <q-icon name="event" color="pink" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="candidatoBase.Fecha_Nacimiento_Nuevo"
                  color="pink-4"
                  :options="optionsDate"
                  mask="DD-MM-YYYY"
                >
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="pink" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pr-xs">
        <q-input
          readonly
          v-model.number="edad"
          type="number"
          label="Edad"
          hint="Ingrese su edad"
        >
        </q-input>
      </div>
      <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pr-xs">
        <q-select
          v-model="candidatoBase.Sexo_Nuevo"
          :options="optionsGenero"
          label="Género"
          lazy-rules
          :rules="[(val) => !!val || 'El género es requerido']"
        />
      </div>
      <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
        <q-input
          v-model="candidatoBase.Ocupacion_Nuevo"
          label="Ocupación"
          hint="Ingrese su ocupación"
        >
        </q-input>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 q-pr-xs">
        <q-input
          v-model.trim="candidatoBase.Correo_Nuevo"
          type="email"
          label="Correo electrónico"
          hint="Correo electrónico para recibir avisos y comuniados "
          autogrow
          lazy-rules
          :rules="[(val) => !!val || 'El correo electronico es requerida']"
        >
          <template v-slot:prepend>
            <q-icon name="email" color="pink" />
          </template>
        </q-input>
      </div>
      <div
        :class="
          isExtension
            ? 'col-lg-5 col-md-5 col-sm-5 col-xs-12'
            : 'col-lg-6 col-md-6 col-sm-6 col-xs-12'
        "
      >
        <q-select
          label="Teléfono"
          hint="Da enter para agregar teléfono"
          v-model="telefonos"
          use-input
          use-chips
          hide-dropdown-icon
          multiple
          input-debounce="0"
          max-values="3"
          new-value-mode="add"
        >
          <template v-slot:prepend>
            <q-icon name="phone" color="pink" />
          </template>
        </q-select>
      </div>
      <!-- <div v-if="isExtension" class="col-lg-1 col-md-1 col-sm-1 col-xs-12">
        <q-input
          v-model.number="candidatoSustituir.extension_Prop"
          type="number"
          label="Extensión"
          hint="Extensión"
          autogrow
        >
        </q-input>
      </div> -->

      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <br />
        <q-checkbox
          left-label
          label="¿Pertenece a un grupo en situación de vulnerabilidad?"
          checked-icon="task_alt"
          unchecked-icon="highlight_off"
          size="lg"
          v-model="candidatoBase.Pertenece_Grupo_Vulnerable_Nuevo"
          color="pink"
        />
      </div>
      <div
        v-if="candidatoBase.Pertenece_Grupo_Vulnerable_Nuevo == true"
        class="col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pr-xs"
      >
        <q-input
          v-model="candidatoBase.grupo_Vulnerable_1"
          label="Personas de pueblos y comunidades indígenas"
        >
        </q-input>
        <q-input
          v-model="candidatoBase.grupo_Vulnerable_2"
          label="Diversidad sexual"
        >
        </q-input>
      </div>
      <div
        v-if="candidatoBase.Pertenece_Grupo_Vulnerable_Nuevo == true"
        class="col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pr-xs"
      >
        <q-input
          v-model="candidatoBase.grupo_Vulnerable_3"
          label="Personas con discapacidad"
        >
        </q-input>
        <q-input v-model="candidatoBase.grupo_Vulnerable_4" label="Otro">
        </q-input>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { useQuasar } from "quasar";
import { storeToRefs } from "pinia";
import { useCandidatosStore } from "src/stores/candidatos-store";
import { ref, defineProps, watch, watchEffect } from "vue";
import { useSustituirStore } from "src/stores/sustituir-store";
import { useConfiguracionStore } from "src/stores/configuracion-store";

//--------------------------------------------------------------------

const $q = useQuasar();
const candidatoStore = useCandidatosStore();
const sustituirStore = useSustituirStore();
const configuracionStore = useConfiguracionStore();
const { candidato } = storeToRefs(candidatoStore);
const {
  sustitucion,
  sust_propietario_1,
  sust_propietario_2,
  sust_suplente_1,
  sust_suplente_2,
} = storeToRefs(sustituirStore);
const { list_Partidos_Politicos } = storeToRefs(configuracionStore);
const optionsGenero = ref(["Hombre", "Mujer", "No binario"]);
const telefonos = ref([]);
const props = defineProps({
  tabTipo: { type: String, required: true },
});
const edad = ref("");
const isExtension = ref(false);
const num_Extension = ref(null);
const candidatoBase = ref(null);

//--------------------------------------------------------------------

switch (props.tabTipo) {
  case "propietario":
    candidatoBase.value = sust_propietario_1.value;
    break;
  case "suplente":
    candidatoBase.value = sust_suplente_1.value;
    break;
  case "sindico_propietario":
    candidatoBase.value = sust_propietario_2.value;
    break;
  case "sindico_suplente":
    candidatoBase.value = sust_suplente_2.value;
    break;
}

//--------------------------------------------------------------------

watchEffect(() => {
  switch (props.tabTipo) {
    case "propietario":
      sust_propietario_1.value.Nombres_Nuevo =
        candidatoBase.value.Nombres_Nuevo;
      sust_propietario_1.value.Apellido_Paterno_Nuevo =
        candidatoBase.value.Apellido_Paterno_Nuevo;
      sust_propietario_1.value.Apellido_Materno_Nuevo =
        candidatoBase.value.Apellido_Materno_Nuevo;
      sust_propietario_1.value.Mote_Nuevo = candidatoBase.value.Mote_Nuevo;
      sust_propietario_1.value.Sexo_Nuevo = candidatoBase.value.Sexo_Nuevo;
      sust_propietario_1.value.Clave_Elector_Nuevo =
        candidatoBase.value.Clave_Elector_Nuevo;
      sust_propietario_1.value.RFC_Nuevo = candidatoBase.value.RFC_Nuevo;
      sust_propietario_1.value.CURP_Nuevo = candidatoBase.value.CURP_Nuevo;
      sust_propietario_1.value.Fecha_Nacimiento_Nuevo =
        candidatoBase.value.Fecha_Nacimiento_Nuevo;
      sust_propietario_1.value.Ocupacion_Nuevo =
        candidatoBase.value.Ocupacion_Nuevo;
      sust_propietario_1.value.Telefono_Nuevo =
        candidatoBase.value.Telefono_Nuevo;
      sust_propietario_1.value.Correo_Nuevo = candidatoBase.value.Correo_Nuevo;
      sust_propietario_1.value.Pertenece_Grupo_Vulnerable_Nuevo =
        candidatoBase.value.Pertenece_Grupo_Vulnerable_Nuevo;
      sust_propietario_1.value.Grupo_Vulnerable_Nuevo =
        candidatoBase.value.Grupo_Vulnerable_Nuevo;
      sust_propietario_1.value.Partido_Id_Nuevo =
        candidatoBase.value.Partido_Id_Nuevo;
      sust_propietario_1.value.Foto_Nuevo = candidatoBase.value.Foto_Nuevo;
      break;
    case "suplente":
      sust_suplente_1.value.Nombres_Nuevo = candidatoBase.value.Nombres_Nuevo;
      sust_suplente_1.value.Apellido_Paterno_Nuevo =
        sust_suplente_1.value.Apellido_Paterno_Nuevo;
      sust_suplente_1.value.Apellido_Materno_Nuevo =
        candidatoBase.value.Apellido_Materno_Nuevo;
      sust_suplente_1.value.Mote_Nuevo = candidatoBase.value.Mote_Nuevo;
      sust_suplente_1.value.Sexo_Nuevo = candidatoBase.value.Sexo_Nuevo;
      sust_suplente_1.value.Clave_Elector_Nuevo =
        candidatoBase.value.Clave_Elector_Nuevo;
      sust_suplente_1.value.RFC_Nuevo = candidatoBase.value.RFC_Nuevo;
      sust_suplente_1.value.CURP_Nuevo = candidatoBase.value.CURP_Nuevo;
      sust_suplente_1.value.Fecha_Nacimiento_Nuevo =
        candidatoBase.value.Fecha_Nacimiento_Nuevo;
      sust_suplente_1.value.Ocupacion_Nuevo =
        candidatoBase.value.Ocupacion_Nuevo;
      sust_suplente_1.value.Telefono_Nuevo = candidatoBase.value.Telefono_Nuevo;
      sust_suplente_1.value.Correo_Nuevo = candidatoBase.value.Correo_Nuevo;
      sust_suplente_1.value.Pertenece_Grupo_Vulnerable_Nuevo =
        candidatoBase.value.Pertenece_Grupo_Vulnerable_Nuevo;
      sust_suplente_1.value.Grupo_Vulnerable_Nuevo =
        candidatoBase.value.Grupo_Vulnerable_Nuevo;
      sust_suplente_1.value.Partido_Id_Nuevo =
        candidatoBase.value.Partido_Id_Nuevo;
      sust_suplente_1.value.Foto_Nuevo = candidatoBase.value.Foto_Nuevo;
      break;
    case "sindico_propietario":
      sust_propietario_2.value.Nombres_Nuevo =
        candidatoBase.value.Nombres_Nuevo;
      sust_propietario_2.value.Apellido_Paterno_Nuevo =
        sust_propietario_2.value.Apellido_Paterno_Nuevo;
      sust_propietario_2.value.Apellido_Materno_Nuevo =
        candidatoBase.value.Apellido_Materno_Nuevo;
      sust_propietario_2.value.Mote_Nuevo = candidatoBase.value.Mote_Nuevo;
      sust_propietario_2.value.Sexo_Nuevo = candidatoBase.value.Sexo_Nuevo;
      sust_propietario_2.value.Clave_Elector_Nuevo =
        candidatoBase.value.Clave_Elector_Nuevo;
      sust_propietario_2.value.RFC_Nuevo = candidatoBase.value.RFC_Nuevo;
      sust_propietario_2.value.CURP_Nuevo = candidatoBase.value.CURP_Nuevo;
      sust_propietario_2.value.Fecha_Nacimiento_Nuevo =
        candidatoBase.value.Fecha_Nacimiento_Nuevo;
      sust_propietario_2.value.Ocupacion_Nuevo =
        candidatoBase.value.Ocupacion_Nuevo;
      sust_propietario_2.value.Telefono_Nuevo =
        candidatoBase.value.Telefono_Nuevo;
      sust_propietario_2.value.Correo_Nuevo = candidatoBase.value.Correo_Nuevo;
      sust_propietario_2.value.Pertenece_Grupo_Vulnerable_Nuevo =
        candidatoBase.value.Pertenece_Grupo_Vulnerable_Nuevo;
      sust_propietario_2.value.Grupo_Vulnerable_Nuevo =
        candidatoBase.value.Grupo_Vulnerable_Nuevo;
      sust_propietario_2.value.Partido_Id_Nuevo =
        candidatoBase.value.Partido_Id_Nuevo;
      sust_propietario_2.value.Foto_Nuevo = candidatoBase.value.Foto_Nuevo;
      break;
    case "sindico_suplente":
      sust_suplente_2.value.Nombres_Nuevo = candidatoBase.value.Nombres_Nuevo;
      sust_suplente_2.value.Apellido_Paterno_Nuevo =
        sust_suplente_2.value.Apellido_Paterno_Nuevo;
      sust_suplente_2.value.Apellido_Materno_Nuevo =
        candidatoBase.value.Apellido_Materno_Nuevo;
      sust_suplente_2.value.Mote_Nuevo = candidatoBase.value.Mote_Nuevo;
      sust_suplente_2.value.Sexo_Nuevo = candidatoBase.value.Sexo_Nuevo;
      sust_suplente_2.value.Clave_Elector_Nuevo =
        candidatoBase.value.Clave_Elector_Nuevo;
      sust_suplente_2.value.RFC_Nuevo = candidatoBase.value.RFC_Nuevo;
      sust_suplente_2.value.CURP_Nuevo = candidatoBase.value.CURP_Nuevo;
      sust_suplente_2.value.Fecha_Nacimiento_Nuevo =
        candidatoBase.value.Fecha_Nacimiento_Nuevo;
      sust_suplente_2.value.Ocupacion_Nuevo =
        candidatoBase.value.Ocupacion_Nuevo;
      sust_suplente_2.value.Telefono_Nuevo = candidatoBase.value.Telefono_Nuevo;
      sust_suplente_2.value.Correo_Nuevo = candidatoBase.value.Correo_Nuevo;
      sust_suplente_2.value.Pertenece_Grupo_Vulnerable_Nuevo =
        candidatoBase.value.Pertenece_Grupo_Vulnerable_Nuevo;
      sust_suplente_2.value.Grupo_Vulnerable_Nuevo =
        candidatoBase.value.Grupo_Vulnerable_Nuevo;
      sust_suplente_2.value.Partido_Id_Nuevo =
        candidatoBase.value.Partido_Id_Nuevo;
      sust_suplente_2.value.Foto_Nuevo = candidatoBase.value.Foto_Nuevo;
      break;
  }
});

watch(candidato.value, (val) => {
  if (val != null) {
    var fechaNace = new Date(val.fecha_Nacimiento_Propietario);
    var fechaActual = new Date();
    var mes = fechaActual.getMonth();
    var dia = fechaActual.getDate();
    var año = fechaActual.getFullYear();
    fechaActual.setDate(dia);
    fechaActual.setMonth(mes);
    fechaActual.setFullYear(año);
    edad.value = Math.floor(
      (fechaActual - fechaNace) / (1000 * 60 * 60 * 24) / 365
    );
    return edad;
  }
});

watch(telefonos, (val) => {
  if (val[2] != null) {
    isExtension.value = true;
  } else {
    isExtension.value = false;
  }
  if (val != null) {
    sustitucion.value.Telefono_Nuevo = `${val[0] != undefined ? val[0] : ""},${
      val[1] != undefined ? val[1] : ""
    },${val[2] != undefined ? val[2] : ""}, ${
      num_Extension.value != null ? num_Extension.value : ""
    }`;
  }
});

//--------------------------------------------------------------------

const optionsDate = (fecha) => {
  const dateActual = new Date();
  const year = dateActual.getFullYear();
  const month = String(dateActual.getMonth() + 1).padStart(2, "0");
  const day = String(dateActual.getDate()).padStart(2, "0");
  return fecha <= `${year}/${month}/${day}`;
};
</script>

<style scope></style>
