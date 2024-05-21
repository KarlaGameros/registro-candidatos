<template>
  <q-card>
    <q-card-section class="row">
      <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
        <q-file
          lazy-rules
          :rules="[(val) => !!val || 'El escrito es obligatorio']"
          bottom-slots
          v-model="candidatoBase.escrito_Url"
          label="Subir escrito"
        >
          <template v-slot:prepend>
            <q-icon name="cloud_upload" @click.stop.prevent />
          </template>
          <template v-slot:append>
            <q-icon
              name="close"
              @click.stop.prevent="candidatoBase.escrito_Url = null"
              class="cursor-pointer"
            />
          </template>

          <template v-slot:hint> Subir escrito </template>
        </q-file>
      </div>
      <div class="text-red text-bold q-pt-lg">
        Documento de la candidatura que renuncia.
      </div>
      <div
        v-if="candidato2.postulacion != 'Partido político'"
        class="col-lg-3 col-md-3 col-sm-3 col-xs-12 q-pl-xs"
      >
        <q-select
          v-model="candidatoBase.Partido_Id_Nuevo"
          :options="list_Partidos_Politicos"
          label="Partido postulante"
          hint="Seleccione el partido postulante"
          lazy-rules
          :rules="[(val) => !!val || 'El partiddo postulante es requerido']"
        >
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section avatar v-if="scope.opt.logo_URL != null">
                <q-img :src="scope.opt.logo_URL" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ scope.opt.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
    </q-card-section>
    <q-banner
      inline-actions
      class="text-justify bg-grey-2 q-ma-md text-red"
      style="border-radius: 20px"
    >
      <template v-slot:avatar>
        <q-icon name="info" color="grey" />
      </template>
      <b>
        En este apartado se deberá registrar la información de la nueva
        candidatura.</b
      >
    </q-banner>
    <q-card-section class="row">
      <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 q-pr-xs">
        <q-file
          accept=".jpg, image/*"
          max-file-size="10485760"
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
      <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pr-xs">
        <q-input
          class="text-uppercase"
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
          class="text-uppercase"
          v-model="candidatoBase.Apellido_Paterno_Nuevo"
          label="Apellido paterno"
          hint="Ingrese su apellido paterno"
          autogrow
        >
        </q-input>
      </div>
      <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pr-xs">
        <q-input
          class="text-uppercase"
          v-model="candidatoBase.Apellido_Materno_Nuevo"
          label="Apellido Materno"
          hint="Ingrese su apellido materno"
          autogrow
        >
        </q-input>
      </div>
      <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pr-xs">
        <q-input
          class="text-uppercase"
          v-model="candidatoBase.Mote_Nuevo"
          label="Mote"
          hint="Ingrese su sobrenombre"
          autogrow
        >
        </q-input>
      </div>
      <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 q-pr-xs">
        <q-input
          class="text-uppercase"
          v-model.trim="candidatoBase.Clave_Elector_Nuevo"
          label="Clave de elector"
          hint="Ingrese su clave de elector"
          counter
          maxlength="18"
          mask="AAAAAA########A###"
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
      <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 q-pr-xs">
        <q-input
          class="text-uppercase"
          v-model.trim="candidatoBase.CURP_Nuevo"
          label="CURP"
          hint="Ingrese su CURP"
          autogrow
          lazy-rules
          counter
          maxlength="18"
          mask="AAAA######AAAAAAN#"
          :rules="[
            (val) => !!val || 'La CURP es requerida',
            (val) => val.length >= 18 || 'Ingrese los 18 caracteres de la CURP',
          ]"
        >
        </q-input>
      </div>
      <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 q-pr-xs">
        <q-input
          class="text-uppercase"
          v-model.trim="candidatoBase.RFC_Nuevo"
          label="RFC"
          hint="Ingrese su RFC"
          counter
          maxlength="13"
          mask="AAAA######NNN"
          autogrow
          lazy-rules
          :rules="[
            (val) => !!val || 'El RFC es requerido',
            (val) =>
              val.length >= 10 || 'Ingrese de 10 a 13 caracteres deL RFC',
          ]"
        >
        </q-input>
      </div>
      <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pr-md">
        <q-input
          mask="####/##/##"
          fill-mask
          :rules="['date']"
          v-model="candidatoBase.Fecha_Nacimiento_Nuevo"
          label="FECHA DE NACIMIENTO"
          hint="AAAA/MM/DD"
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
                  lazy-rules
                  :rules="[(val) => !!val || 'La fecha es requerida']"
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
          class="text-uppercase"
          readonly
          v-model.number="candidatoBase.Edad_Nuevo"
          type="number"
          label="Edad"
          hint="Ingrese su edad"
        >
        </q-input>
      </div>
      <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pr-xs">
        <q-select
          hint="SELECCIONE SU GÉNERO"
          v-model="candidatoBase.Sexo_Nuevo"
          :options="optionsGenero"
          label="GÉNERO"
          lazy-rules
          :rules="[(val) => !!val || 'EL GÉNERO ES REQUERIDO']"
        />
      </div>
      <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
        <q-input
          class="text-uppercase"
          v-model="candidatoBase.Ocupacion_Nuevo"
          label="Ocupación"
          hint="Ingrese su ocupación"
        >
        </q-input>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 q-pr-xs">
        <q-input
          class="text-lowercase"
          v-model.trim="candidatoBase.Correo_Nuevo"
          type="email"
          label="Correo electrónico"
          hint="Correo electrónico para recibir avisos y comunicados"
          lazy-rules
          :rules="[(val) => !!val || 'El correo electrónico es requerido']"
        >
          <template v-slot:prepend>
            <q-icon name="email" color="pink" />
          </template>
        </q-input>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
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
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-black">
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
        class="col-lg-12 col-md-12 col-sm-12 col-xs-12"
      >
        <q-checkbox
          left-label
          color="pink"
          v-model="candidatoBase.grupo_Vulnerable_1"
          label="Pueblos originarios"
          checked-icon="task_alt"
          unchecked-icon="highlight_off"
        />
        <q-input
          v-if="candidatoBase.grupo_Vulnerable_1 == true"
          v-model="candidatoBase.describir_Pueblos"
          label="Describir"
        />
        <q-checkbox
          left-label
          color="pink"
          v-model="candidatoBase.grupo_Vulnerable_2"
          label="Diversidad sexual"
          checked-icon="task_alt"
          unchecked-icon="highlight_off"
        />
        <q-input
          v-if="candidatoBase.grupo_Vulnerable_2 == true"
          v-model="candidatoBase.describir_Diversidad"
          label="Describir"
        />
        <q-checkbox
          v-if="props.tipo_Eleccion == 'DIP'"
          left-label
          color="pink"
          v-model="candidatoBase.grupo_Vulnerable_3"
          label="Con discapacidad"
          checked-icon="task_alt"
          unchecked-icon="highlight_off"
        />
        <q-input
          v-if="candidatoBase.grupo_Vulnerable_3 == true"
          v-model="candidatoBase.describir_Discapacidad"
          label="Describir"
        />
        <q-checkbox
          v-if="props.rp == true && props.tipo_Eleccion == 'DIP'"
          left-label
          color="pink"
          v-model="candidatoBase.grupo_Vulnerable_4"
          label="Migrante"
          checked-icon="task_alt"
          unchecked-icon="highlight_off"
        />
      </div>
      <div class="col-12">
        <br />
        <q-separator color="pink" />
      </div>
      <div
        v-if="
          props.tabTipo == 'Propietario' ||
          props.tabTipo == 'Propietario sindico'
        "
        class="col-12"
      >
        <br />
        <q-checkbox
          left-label
          color="pink"
          size="lg"
          v-model="candidatoBase.consecutivo"
          label="Postulación bajo la figura de elección consecutiva"
          checked-icon="task_alt"
          unchecked-icon="highlight_off"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { useQuasar } from "quasar";
import { storeToRefs } from "pinia";
import { useCandidatosStore } from "src/stores/candidatos-store";
import { ref, defineProps, watch, watchEffect, onMounted } from "vue";
import { useSustituirStore } from "src/stores/sustituir-store";
import { useConfiguracionStore } from "src/stores/configuracion-store";

//--------------------------------------------------------------------

const $q = useQuasar();
const candidatoStore = useCandidatosStore();
const sustituirStore = useSustituirStore();
const configuracionStore = useConfiguracionStore();
const { candidato, candidato2, list_Suplentes } = storeToRefs(candidatoStore);
const {
  sustitucion,
  sust_propietario_1,
  sust_propietario_2,
  sust_suplente_1,
  sust_suplente_2,
} = storeToRefs(sustituirStore);
const { list_Partidos_Politicos, list_Partidos_Politicos_Coalcion } =
  storeToRefs(configuracionStore);
const optionsGenero = ref(["Hombre", "Mujer", "No binario"]);
const telefonos = ref([]);
const props = defineProps({
  tabTipo: { type: String, required: true },
  tipo_Eleccion: { type: String, required: true },
  rp: { type: Boolean, required: true },
});
const edad = ref("");
const isExtension = ref(false);
const num_Extension = ref(null);
const candidatoBase = ref(null);
const list_Filtro_Partidos = ref([]);

//--------------------------------------------------------------------

onMounted(async () => {
  if (list_Suplentes.value.length > 0) {
    if (list_Suplentes.value[0].postulacion == "Candidatura común") {
      await configuracionStore.loadPartidosPoliticosCoalicionComun(
        list_Suplentes.value[0].comun_Id
      );
    } else if (list_Suplentes.value[0].postulacion == "Partido político") {
      await configuracionStore.loadPartidosPoliticos(
        false,
        false,
        false,
        false,
        true
      );
    } else if (list_Suplentes.value[0].postulacion == "Coalición") {
      await configuracionStore.loadPartidosPoliticosCoalicionComun(
        list_Suplentes.value[0].coalicion_Id,
        true
      );
    }
  }
});

watch(list_Suplentes, async (val) => {
  if (val.length > 0) {
    if (val[0].postulacion == "Candidatura común") {
      await configuracionStore.loadPartidosPoliticosCoalicionComun(
        val[0].comun_Id,
        false
      );
    } else if (val[0].postulacion == "Partido político") {
      await configuracionStore.loadPartidosPoliticos(
        false,
        false,
        false,
        false,
        true
      );
    } else if (val[0].postulacion == "Coalición") {
      await configuracionStore.loadPartidosPoliticosCoalicionComun(
        val[0].coalicion_Id,
        true
      );
    }
  }
});

watch(candidato2.value, async (val) => {
  if (val.id != null) {
    if (val.postulacion == "Candidatura común") {
      await configuracionStore.loadPartidosPoliticosCoalicionComun(
        val.comun_Id,
        false
      );
      cargarPartido(val);
    } else if (val.postulacion == "Partido político") {
      await configuracionStore.loadPartidosPoliticos(
        false,
        false,
        false,
        false,
        true
      );
    } else if (val.postulacion == "Coalición") {
      await configuracionStore.loadPartidosPoliticosCoalicionComun(
        val.coalicion_Id,
        true
      );
      cargarPartido(val);
    }
  }
});

switch (props.tabTipo) {
  case "Propietario":
    candidatoBase.value = sust_propietario_1.value;
    break;
  case "Suplente":
    candidatoBase.value = sust_suplente_1.value;
    break;
  case "Propietario sindico":
    candidatoBase.value = sust_propietario_2.value;
    break;
  case "Suplente sindico":
    candidatoBase.value = sust_suplente_2.value;
    break;
}

//--------------------------------------------------------------------

const cargarPartido = async (val) => {
  if (val.partido_Id != null) {
    if (candidatoBase.value.Partido_Id_Nuevo == null) {
      let partidoFiltrado = list_Partidos_Politicos.value.find(
        (x) => x.value == `${val.partido_Id}`
      );
      candidatoBase.value.Partido_Id_Nuevo = partidoFiltrado;
    }
  }
  if (val.partido_Suplente_Id != null) {
    if (candidatoBase.value.Partido_Id_Nuevo == null) {
      let partidoFiltrado = list_Partidos_Politicos.value.find(
        (x) => x.value == `${val.partido_Suplente_Id}`
      );
      candidatoBase.value.Partido_Id_Nuevo = partidoFiltrado;
    }
  }
};

watchEffect(() => {
  switch (props.tabTipo) {
    case "Propietario":
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
      sust_propietario_1.value.grupo_Vulnerable_1 =
        candidatoBase.value.grupo_Vulnerable_1;
      sust_propietario_1.value.grupo_Vulnerable_2 =
        candidatoBase.value.grupo_Vulnerable_2;
      sust_propietario_1.value.grupo_Vulnerable_3 =
        candidatoBase.value.grupo_Vulnerable_3;
      sust_propietario_1.value.grupo_Vulnerable_4 =
        candidatoBase.value.grupo_Vulnerable_4;
      sust_propietario_1.value.Partido_Id_Nuevo =
        candidatoBase.value.Partido_Id_Nuevo;
      sust_propietario_1.value.Foto_Nuevo = candidatoBase.value.Foto_Nuevo;
      sust_propietario_1.value.Edad_Nuevo = candidatoBase.value.Edad_Nuevo;
      sust_propietario_1.value.consecutivo = candidatoBase.value.consecutivo;
      sust_propietario_1.value.describir_Pueblos =
        candidatoBase.value.describir_Pueblos;
      sust_propietario_1.value.describir_Diversidad =
        candidatoBase.value.describir_Diversidad;
      sust_propietario_1.value.describir_Discapacidad =
        candidatoBase.value.describir_Discapacidad;
      sust_propietario_1.value.escrito_Url = candidatoBase.value.escrito_Url;
      break;
    case "Suplente":
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
      sust_suplente_1.value.grupo_Vulnerable_1 =
        candidatoBase.value.grupo_Vulnerable_1;
      sust_suplente_1.value.grupo_Vulnerable_2 =
        candidatoBase.value.grupo_Vulnerable_2;
      sust_suplente_1.value.grupo_Vulnerable_3 =
        candidatoBase.value.grupo_Vulnerable_3;
      sust_suplente_1.value.grupo_Vulnerable_4 =
        candidatoBase.value.grupo_Vulnerable_4;
      sust_suplente_1.value.Partido_Id_Nuevo =
        candidatoBase.value.Partido_Id_Nuevo;
      sust_suplente_1.value.Foto_Nuevo = candidatoBase.value.Foto_Nuevo;
      sust_suplente_1.value.Edad_Nuevo = candidatoBase.value.Edad_Nuevo;
      sust_suplente_1.value.describir_Pueblos =
        candidatoBase.value.describir_Pueblos;
      sust_suplente_1.value.describir_Diversidad =
        candidatoBase.value.describir_Diversidad;
      sust_suplente_1.value.describir_Discapacidad =
        candidatoBase.value.describir_Discapacidad;
      sust_suplente_1.value.escrito_Url = candidatoBase.value.escrito_Url;
      break;
    case "Propietario sindico":
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
      sust_propietario_2.value.grupo_Vulnerable_1 =
        candidatoBase.value.grupo_Vulnerable_1;
      sust_propietario_2.value.grupo_Vulnerable_2 =
        candidatoBase.value.grupo_Vulnerable_2;
      sust_propietario_2.value.grupo_Vulnerable_3 =
        candidatoBase.value.grupo_Vulnerable_3;
      sust_propietario_2.value.grupo_Vulnerable_4 =
        candidatoBase.value.grupo_Vulnerable_4;
      sust_propietario_2.value.Partido_Id_Nuevo =
        candidatoBase.value.Partido_Id_Nuevo;
      sust_propietario_2.value.Foto_Nuevo = candidatoBase.value.Foto_Nuevo;
      sust_propietario_2.value.Edad_Nuevo = candidatoBase.value.Edad_Nuevo;
      sust_propietario_2.value.consecutivo = candidatoBase.value.consecutivo;
      sust_propietario_2.value.describir_Pueblos =
        candidatoBase.value.describir_Pueblos;
      sust_propietario_2.value.describir_Diversidad =
        candidatoBase.value.describir_Diversidad;
      sust_propietario_2.value.describir_Discapacidad =
        candidatoBase.value.describir_Discapacidad;
      sust_propietario_2.value.escrito_Url = candidatoBase.value.escrito_Url;
      break;
    case "Suplente sindico":
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
      sust_suplente_2.value.grupo_Vulnerable_1 =
        candidatoBase.value.grupo_Vulnerable_1;
      sust_suplente_2.value.grupo_Vulnerable_2 =
        candidatoBase.value.grupo_Vulnerable_2;
      sust_suplente_2.value.grupo_Vulnerable_3 =
        candidatoBase.value.grupo_Vulnerable_3;
      sust_suplente_2.value.grupo_Vulnerable_4 =
        candidatoBase.value.grupo_Vulnerable_4;
      sust_suplente_2.value.Partido_Id_Nuevo =
        candidatoBase.value.Partido_Id_Nuevo;
      sust_suplente_2.value.Foto_Nuevo = candidatoBase.value.Foto_Nuevo;
      sust_suplente_2.value.Edad_Nuevo = candidatoBase.value.Edad_Nuevo;
      sust_suplente_2.value.describir_Pueblos =
        candidatoBase.value.describir_Pueblos;
      sust_suplente_2.value.describir_Diversidad =
        candidatoBase.value.describir_Diversidad;
      sust_suplente_2.value.describir_Discapacidad =
        candidatoBase.value.describir_Discapacidad;
      sust_suplente_2.value.escrito_Url = candidatoBase.value.escrito_Url;
      break;
  }
});

watch(sust_propietario_1.value, (val) => {
  if (val != null) {
    calcularEdad(val.Fecha_Nacimiento_Nuevo, "propietario_1");
    cargarPartido(val);
  }
});

watch(sust_propietario_2.value, (val) => {
  if (val != null) {
    calcularEdad(val.Fecha_Nacimiento_Nuevo, "propietario_2");
    cargarPartido(val);
  }
});

watch(sust_suplente_1.value, (val) => {
  if (val != null) {
    calcularEdad(val.Fecha_Nacimiento_Nuevo, "suplente_1");
  }
});

watch(sust_suplente_2.value, (val) => {
  if (val != null) {
    calcularEdad(val.Fecha_Nacimiento_Nuevo, "suplente_2");
  }
});

watch(candidato2.value, async (val) => {
  if (val.postulacion == "Candidatura común") {
    await configuracionStore.loadComunes();
    list_Filtro_Partidos.value = list_Partidos_Politicos.value;
  } else if (val.postulacion == "Partido político") {
    await configuracionStore.loadPartidosPoliticos(
      false,
      false,
      false,
      false,
      true
    );
    list_Filtro_Partidos.value = list_Partidos_Politicos.value;
  } else if (val.postulacion == "Coalición") {
    await configuracionStore.loadPartidosPoliticosCoalicionComun(
      val.coalicion_Id,
      true
    );
    list_Filtro_Partidos.value = list_Partidos_Politicos_Coalcion.value;
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

const calcularEdad = (fecha_Nacimiento, tipo) => {
  if (fecha_Nacimiento != null) {
    let hoy = new Date("2024/06/02");
    let fechaNacimiento = new Date(fecha_Nacimiento);
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth();
    if (tipo == "propietario_1") {
      if (
        diferenciaMeses < 0 ||
        (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
      ) {
        edad--;
      }
      sust_propietario_1.value.Edad_Nuevo = edad;
    } else if (tipo == "propietario_2") {
      if (
        diferenciaMeses < 0 ||
        (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
      ) {
        edad--;
      }
      sust_propietario_2.value.Edad_Nuevo = edad;
    } else if (tipo == "suplente_1") {
      if (
        diferenciaMeses < 0 ||
        (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
      ) {
        edad--;
      }
      sust_suplente_1.value.Edad_Nuevo = edad;
    } else if (tipo == "suplente_2") {
      if (
        diferenciaMeses < 0 ||
        (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
      ) {
        edad--;
      }
      sust_suplente_2.value.Edad_Nuevo = edad;
    }
  }
};

const optionsDate = (fecha) => {
  const dateActual = new Date();
  const year = dateActual.getFullYear();
  const month = String(dateActual.getMonth() + 1).padStart(2, "0");
  const day = String(dateActual.getDate()).padStart(2, "0");
  return fecha <= `${year}/${month}/${day}`;
};
</script>
