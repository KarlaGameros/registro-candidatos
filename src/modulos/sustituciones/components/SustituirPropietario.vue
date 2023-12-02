<template>
  <q-card>
    <q-card-section class="row">
      <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 q-pr-xs">
        <q-file
          bottom-slots
          v-model="candidatoSustituir.url_Foto_Propietario"
          label="Fotografía"
          counter
        >
          <template v-slot:prepend>
            <q-avatar v-if="isEditar">
              <img :src="candidatoSustituir.url_Foto_Propietario" />
            </q-avatar>
            <q-icon v-else name="cloud_upload" @click.stop.prevent />
          </template>
          <template v-slot:append>
            <q-icon
              name="close"
              @click.stop.prevent="
                candidatoSustituir.url_Foto_Propietario = null
              "
              class="cursor-pointer"
            />
          </template>

          <!-- <template v-slot:hint> Field hint </template> -->
        </q-file>
      </div>
      <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pr-xs">
        <q-input
          v-model="candidatoSustituir.nombres_Propietario"
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
          v-model="candidatoSustituir.apellido_Paterno_Propietario"
          label="Apellido paterno"
          hint="Ingrese su apellido paterno"
          autogrow
        >
        </q-input>
      </div>
      <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pr-xs">
        <q-input
          v-model="candidatoSustituir.apellido_Materno_Propietario"
          label="Apellido Materno"
          hint="Ingrese su apellido materno"
          autogrow
        >
        </q-input>
      </div>
      <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pr-xs">
        <q-input
          v-model="candidatoSustituir.mote_Propietario"
          label="Mote"
          hint="Ingrese su sobrenombre"
          autogrow
        >
        </q-input>
      </div>
      <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pr-xs">
        <q-input
          v-model.trim="candidatoSustituir.clave_Elector_Propietario"
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
      <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pr-xs">
        <q-input
          v-model.trim="candidatoSustituir.curp_Propietario"
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
      <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pr-xs">
        <q-input
          v-model.trim="candidatoSustituir.rfc_Propietario"
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
          v-model="candidatoSustituir.fecha_Nacimiento_Propietario"
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
                  v-model="candidatoSustituir.fecha_Nacimiento_Propietario"
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
          v-model="candidatoSustituir.sexo_Propietario"
          :options="optionsGenero"
          label="Género"
          lazy-rules
          :rules="[(val) => !!val || 'El género es requerido']"
        />
      </div>
      <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
        <q-input
          v-model="candidatoSustituir.ocupacion_Propietario"
          label="Ocupación"
          hint="Ingrese su ocupación"
        >
        </q-input>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 q-pr-xs">
        <q-input
          v-model.trim="candidatoSustituir.correo_Propietario"
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
      <div v-if="isExtension" class="col-lg-1 col-md-1 col-sm-1 col-xs-12">
        <q-input
          v-model.number="candidatoSustituir.extension_Prop"
          type="number"
          label="Extensión"
          hint="Extensión"
          autogrow
        >
        </q-input>
      </div>

      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <br />
        <q-checkbox
          left-label
          label="¿Pertenece a un grupo en situación de vulnerabilidad?"
          checked-icon="task_alt"
          unchecked-icon="highlight_off"
          size="lg"
          v-model="candidatoSustituir.pertenece_Grupo_Vulnerable_Propietario"
          color="pink"
        />
      </div>
      <div
        v-if="candidatoSustituir.pertenece_Grupo_Vulnerable_Propietario == true"
        class="col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pr-xs"
      >
        <q-input
          v-model="candidatoSustituir.grupoProp_1"
          label="Personas de pueblos y comunidades indígenas"
        >
        </q-input>
        <q-input
          v-model="candidatoSustituir.grupoProp_2"
          label="Diversidad sexual"
        >
        </q-input>
      </div>
      <div
        v-if="candidatoSustituir.pertenece_Grupo_Vulnerable_Propietario == true"
        class="col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pr-xs"
      >
        <q-input
          v-model="candidatoSustituir.grupoProp_3"
          label="Personas con discapacidad"
        >
        </q-input>
        <q-input v-model="candidatoSustituir.grupoProp_4" label="Otro">
        </q-input>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { useQuasar } from "quasar";
import { storeToRefs } from "pinia";
import { useCandidatosStore } from "src/stores/candidatos-store";
import { ref, defineProps, watch } from "vue";
import { useSustituirStore } from "src/stores/sustituir-store";

//--------------------------------------------------------------------

const $q = useQuasar();
const candidatoStore = useCandidatosStore();
const sustituirStore = useSustituirStore();
const { candidato } = storeToRefs(candidatoStore);
const { candidatoSustituir } = storeToRefs(sustituirStore);
const optionsGenero = ref(["Hombre", "Mujer", "No binario"]);
const telefonos = ref([]);
const props = defineProps({
  coalicion: { type: Boolean, required: true },
});
const edad = ref("");
const isExtension = ref(false);
const extension = ref("");

//--------------------------------------------------------------------

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
    candidato.value.telefono_Propietario = `${val[0]},${val[1]},${val[2]}`;
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

const notify = (mesage) => {
  $q.notify({
    type: "warning",
    message: mesage,
    position: "center",
    actions: [{ label: "Ok", color: "black" }],
  });
};

//VALIDACIONES
const validarEmail = async (valor) => {
  const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  const resultado = validEmail.test(valor);
  if (resultado == false) {
    notify("El correo electronico no tiene el formato correcto");
  }
};
</script>

<style scope></style>
