<template>
  <q-card>
    <q-card-section class="row">
      <div
        v-if="!visualizar"
        class="col-lg-3 col-md-3 col-sm-3 col-xs-12 q-pr-md"
      >
        <q-file
          class="text-uppercase"
          bottom-slots
          v-model="fotoBase.url_Foto"
          label="Fotografía"
          counter
          accept=".jpg, image/*"
          max-file-size="10485760"
          lazy-rules
          @rejected="onRejected"
        >
          <template v-slot:prepend>
            <q-btn
              @click="verFoto()"
              round
              flat
              dense
              color="pink"
              icon="image_search"
            >
              <q-tooltip>Ver foto</q-tooltip>
            </q-btn>
          </template>
          <template v-slot:append>
            <q-btn
              icon="help"
              flat
              round
              color="orange"
              @click="especificacionesFoto"
            />
            <q-icon
              name="close"
              @click.stop.prevent="fotoBase.url_Foto = null"
              class="cursor-pointer"
            />
          </template>
          <template v-slot:hint> Agregar fotografía </template>
        </q-file>
      </div>
      <div
        v-else
        class="col-lg-3 col-md-3 col-sm-3 col-xs-12 q-pr-md text-center"
      >
        <q-btn
          size="lg"
          @click="verFoto()"
          round
          flat
          dense
          color="pink"
          icon="image_search"
        >
        </q-btn>
        <div class="text-bold">Ver fotografía</div>
      </div>
      <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pr-md">
        <q-input
          class="text-uppercase"
          :disable="visualizar"
          v-model.trim="candidatoBase.nombres"
          label="Nombre(s)"
          hint="Ingrese su nombre"
          autogrow
          lazy-rules
          :rules="[(val) => !!val || 'El nombre es requerido']"
        >
        </q-input>
      </div>
      <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pr-md">
        <q-input
          class="text-uppercase"
          :disable="visualizar"
          v-model.trim="candidatoBase.apellido_Paterno"
          label="Apellido paterno"
          hint="Ingrese su apellido paterno"
          autogrow
          lazy-rules
          :rules="[(val) => !!val || 'El apellido paterno es requerido']"
        >
        </q-input>
      </div>
      <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
        <q-input
          class="text-uppercase"
          :disable="visualizar"
          v-model.trim="candidatoBase.apellido_Materno"
          label="Apellido Materno"
          hint="Ingrese su apellido materno"
          autogrow
        >
        </q-input>
      </div>
      <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pr-md">
        <q-input
          class="text-uppercase"
          :disable="visualizar"
          v-model.trim="candidatoBase.mote"
          label="Mote"
          hint="Ingrese su sobrenombre"
          autogrow
        >
        </q-input>
      </div>
      <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pr-md">
        <q-input
          :disable="visualizar"
          class="text-uppercase"
          v-model.trim="candidatoBase.clave_Elector"
          label="Clave de elector"
          hint="Ingrese su clave de elector"
          counter
          maxlength="18"
          autogrow
          mask="AAAAAA########A###"
          lazy-rules
          :rules="[
            (val) => !!val || 'La clave de elector es requerida',
            (val) =>
              val.length >= 18 || 'Ingrese los 18 caracteres de la clave',
          ]"
        >
        </q-input>
      </div>
      <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pr-md">
        <q-input
          :disable="visualizar"
          class="text-uppercase"
          v-model.trim="candidatoBase.curp"
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
      <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
        <q-input
          @focus="obtenerRfc"
          :disable="visualizar"
          class="text-uppercase"
          v-model.trim="candidatoBase.rfc"
          label="RFC"
          hint="Ingrese su RFC"
          counter
          maxlength="13"
          autogrow
          mask="AAAA######NNN"
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
          :disable="visualizar"
          v-model="candidatoBase.fecha_Nacimiento"
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
                  v-model="candidatoBase.fecha_Nacimiento"
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
      <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pr-md">
        <q-input
          class="text-uppercase"
          :disable="visualizar"
          readonly
          v-model.number="candidatoBase.edad"
          type="number"
          label="Edad"
          hint="Ingrese su edad"
          lazy-rules
          :rules="[(val) => !!val || 'Ingrese fecha de nacimiento']"
        >
          <template v-slot:append>
            <q-icon
              flat
              round
              color="orange"
              name="help"
              @click.stop.prevent="fotoBase.url_Foto = null"
              class="cursor-pointer"
            >
              <q-tooltip>Edad calculada al 2 de junio del 2024</q-tooltip>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pr-md">
        <q-select
          hint="SELECCIONE SU GÉNERO"
          :disable="visualizar"
          v-model="candidatoBase.sexo"
          :options="optionsGenero"
          label="GÉNERO"
          lazy-rules
          :rules="[(val) => !!val || 'EL GÉNERO ES REQUERIDO']"
        />
      </div>
      <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
        <q-input
          class="text-uppercase"
          :disable="visualizar"
          v-model.trim="candidatoBase.ocupacion"
          label="Ocupación"
          hint="Ingrese su ocupación"
        >
        </q-input>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 q-pr-md">
        <q-input
          class="text-lowercase"
          :disable="visualizar"
          v-model.trim="candidatoBase.correo"
          type="email"
          label="CORREO ELECTRÓNICO"
          hint="CORREO ELECTRÓNICO PARA RECIBIR AVISOS Y COMUNICADOS"
          lazy-rules
          :rules="[(val) => !!val || 'EL CORREO ELECTRÓNICO ES REQUERIDO']"
        >
          <template v-slot:prepend>
            <q-icon name="email" color="pink" />
          </template>
        </q-input>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
        <q-input
          :disable="visualizar"
          class="text-uppercase"
          mask="##########"
          v-model="candidatoBase.telefono"
          label="Teléfono"
          hint="Da enter para agregar hasta 3 teléfonos"
          @keydown.enter.prevent="addTelefonos"
          max-values="3"
        >
          <template v-slot:prepend>
            <q-icon name="phone" color="pink" />
          </template>
          <q-chip
            class="q-mt-md"
            v-for="tel in candidatoBase.telefonos"
            :key="tel"
            removable
            @remove="removeTelefono(tel)"
            v-model="candidatoBase.telefono"
            color="grey"
            text-color="white"
            :label="tel"
            :title="tel"
          />
        </q-input>
      </div>
      <div class="col-12">
        <br />
        <q-checkbox
          class="text-uppercase"
          :disable="visualizar"
          left-label
          label="¿Pertenece a un grupo en situación de vulnerabilidad?"
          checked-icon="task_alt"
          unchecked-icon="highlight_off"
          size="lg"
          v-model="candidatoBase.pertenece_Grupo_Vulnerable"
          color="pink"
        />
      </div>
      <div v-if="candidatoBase.pertenece_Grupo_Vulnerable == true" class="row">
        <q-checkbox
          :disable="visualizar"
          class="text-uppercase"
          left-label
          color="pink"
          v-model="candidatoBase.grupo_Vulnerable_1"
          label="Pueblos originarios"
          checked-icon="task_alt"
          unchecked-icon="highlight_off"
        />
        <q-input
          :disable="visualizar"
          v-if="candidatoBase.grupo_Vulnerable_1 == true"
          v-model="candidatoBase.describir_Pueblos"
          label="Describir"
        />
        <q-checkbox
          :disable="visualizar"
          class="text-uppercase"
          left-label
          color="pink"
          v-model="candidatoBase.grupo_Vulnerable_2"
          label="Diversidad sexual"
          checked-icon="task_alt"
          unchecked-icon="highlight_off"
        />
        <q-input
          :disable="visualizar"
          v-if="candidatoBase.grupo_Vulnerable_2 == true"
          v-model="candidatoBase.describir_Diversidad"
          label="Describir"
        />
        <q-checkbox
          class="text-uppercase"
          v-if="props.tipo_Eleccion == 'DIP'"
          left-label
          color="pink"
          :disable="visualizar"
          v-model="candidatoBase.grupo_Vulnerable_3"
          label="Con discapacidad"
          checked-icon="task_alt"
          unchecked-icon="highlight_off"
        />
        <q-input
          :disable="visualizar"
          v-if="candidatoBase.grupo_Vulnerable_3 == true"
          v-model="candidatoBase.describir_Discapacidad"
          label="Describir"
        />
        <q-checkbox
          class="text-uppercase"
          v-if="props.rp == true && props.tipo_Eleccion == 'DIP'"
          left-label
          :disable="visualizar"
          color="pink"
          v-model="candidatoBase.grupo_Vulnerable_4"
          label="Migrante"
          checked-icon="task_alt"
          unchecked-icon="highlight_off"
        />
        <q-input
          :disable="visualizar"
          v-if="candidatoBase.grupo_Vulnerable_4 == true"
          v-model="candidatoBase.describir_Migrante"
          label="Describir"
        />
      </div>
      <div class="col-12">
        <br />
        <q-separator color="pink" />
      </div>
      <div
        v-if="
          props.tabTipo == 'propietario' ||
          props.tabTipo == 'sindico_propietario'
        "
        class="col-12"
      >
        <br />
        <q-checkbox
          :disable="visualizar"
          class="text-uppercase"
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
  <ModalFotografia
    :id="candidato.id"
    :puesto="
      props.tabTipo == 'propietario'
        ? 0
        : props.tabTipo == 'suplente'
        ? 1
        : props.tabTipo == 'sindico_propietario'
        ? 2
        : 3
    "
    :foto="candidatoBase.url_Foto == null ? '' : candidatoBase.url_Foto"
  />
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";
import { useCandidatosStore } from "src/stores/candidatos-store";
import { ref, defineProps, watch, watchEffect } from "vue";
import { useAuthStore } from "src/stores/auth-store";
import ModalFotografia from "../components/ModalFotografia.vue";

//--------------------------------------------------------------------

const $q = useQuasar();
const candidatoStore = useCandidatosStore();
const {
  propietario_1,
  propietario_2,
  suplente_1,
  suplente_2,
  foto_1,
  foto_2,
  foto_3,
  foto_4,
  visualizar,
  candidato,
} = storeToRefs(candidatoStore);
const optionsGenero = ref(["Hombre", "Mujer", "No binario"]);
const telefonos = ref();
const props = defineProps({
  tabTipo: { type: String, required: true },
  tipo_Eleccion: { type: String, required: true },
  rp: { type: Boolean, required: true },
});
const candidatoBase = ref(null);
const fotoBase = ref(null);
const pueblo_Originario = ref(false);
const diversidad_Sexual = ref(false);
const con_Discapacidad = ref(false);
const migrante = ref(false);
const authStore = useAuthStore();
const { modulo } = storeToRefs(authStore);
const siglas = "SRC-REG-CL";

//--------------------------------------------------------------------

switch (props.tabTipo) {
  case "propietario":
    candidatoBase.value = propietario_1.value;
    fotoBase.value = foto_1.value;
    break;
  case "suplente":
    candidatoBase.value = suplente_1.value;
    fotoBase.value = foto_2.value;
    break;
  case "sindico_propietario":
    candidatoBase.value = propietario_2.value;
    fotoBase.value = foto_3.value;
    break;
  case "sindico_suplente":
    candidatoBase.value = suplente_2.value;
    fotoBase.value = foto_4.value;
    break;
}

const removeTelefono = (tel) => {
  const index = candidatoBase.value.telefonos.indexOf(tel);
  if (index !== -1) {
    candidatoBase.value.telefonos.splice(index, 1);
  }
};
const addTelefonos = (e) => {
  if (candidatoBase.value.telefonos.length < 3) {
    candidatoBase.value.telefonos.push(e.target.value);
  }
  candidatoBase.value.telefono = null;
};

const obtenerRfc = (e) => {
  if (candidatoBase.value.curp == null) {
    candidatoBase.value.rfc = `${candidatoBase.value.curp.slice(0, 10)}`;
  }
};

const verFoto = () => {
  candidatoStore.actualizarModalFoto(true);
};

//--------------------------------------------------------------------

watchEffect(() => {
  switch (props.tabTipo) {
    case "propietario":
      propietario_1.value.nombres = candidatoBase.value.nombres;
      propietario_1.value.apellido_Paterno =
        candidatoBase.value.apellido_Paterno;
      propietario_1.value.apellido_Materno =
        candidatoBase.value.apellido_Materno;
      propietario_1.value.mote = candidatoBase.value.mote;
      propietario_1.value.sexo = candidatoBase.value.sexo;
      propietario_1.value.url_Foto = candidatoBase.value.url_Foto;
      propietario_1.value.clave_Elector = candidatoBase.value.clave_Elector;
      propietario_1.value.rfc = candidatoBase.value.rfc;
      propietario_1.value.curp = candidatoBase.value.curp;
      propietario_1.value.fecha_Nacimiento =
        candidatoBase.value.fecha_Nacimiento;
      propietario_1.value.ocupacion = candidatoBase.value.ocupacion;
      propietario_1.value.telefono = candidatoBase.value.telefono;
      propietario_1.value.correo = candidatoBase.value.correo;
      propietario_1.value.pertenece_Grupo_Vulnerable =
        candidatoBase.value.pertenece_Grupo_Vulnerable;
      propietario_1.value.grupo_Vulnerable =
        candidatoBase.value.grupo_Vulnerable;
      propietario_1.value.partido_Id = candidatoBase.value.partido_Id;
      propietario_1.value.grupo_Vulnerable_1 =
        candidatoBase.value.grupo_Vulnerable_1;
      propietario_1.value.grupo_Vulnerable_2 =
        candidatoBase.value.grupo_Vulnerable_2;
      propietario_1.value.grupo_Vulnerable_3 =
        candidatoBase.value.grupo_Vulnerable_3;
      propietario_1.value.grupo_Vulnerable_4 =
        candidatoBase.value.grupo_Vulnerable_4;
      propietario_1.value.url_Foto = candidatoBase.value.url_Foto;
      propietario_1.value.edad = candidatoBase.value.edad;
      propietario_1.value.consecutivo = candidatoBase.value.consecutivo;
      propietario_1.value.describir_Pueblos =
        candidatoBase.value.describir_Pueblos;
      propietario_1.value.describir_Diversidad =
        candidatoBase.value.describir_Diversidad;
      propietario_1.value.describir_Discapacidad =
        candidatoBase.value.describir_Discapacidad;
      propietario_1.value.describir_Migrante =
        candidatoBase.value.describir_Migrante;
      propietario_1.value.telefonos = candidatoBase.value.telefonos;
      break;
    case "suplente":
      suplente_1.value.nombres = candidatoBase.value.nombres;
      suplente_1.value.apellido_Paterno = candidatoBase.value.apellido_Paterno;
      suplente_1.value.apellido_Materno = candidatoBase.value.apellido_Materno;
      suplente_1.value.mote = candidatoBase.value.mote;
      suplente_1.value.sexo = candidatoBase.value.sexo;
      suplente_1.value.url_Foto = candidatoBase.value.url_Foto;
      suplente_1.value.clave_Elector = candidatoBase.value.clave_Elector;
      suplente_1.value.rfc = candidatoBase.value.rfc;
      suplente_1.value.curp = candidatoBase.value.curp;
      suplente_1.value.fecha_Nacimiento = candidatoBase.value.fecha_Nacimiento;
      suplente_1.value.ocupacion = candidatoBase.value.ocupacion;
      suplente_1.value.telefono = candidatoBase.value.telefono;
      suplente_1.value.correo = candidatoBase.value.correo;
      suplente_1.value.pertenece_Grupo_Vulnerable =
        candidatoBase.value.pertenece_Grupo_Vulnerable;
      suplente_1.value.grupo_Vulnerable = candidatoBase.value.grupo_Vulnerable;
      suplente_1.value.partido_Id = candidatoBase.value.partido_Id;
      suplente_1.value.grupo_Vulnerable_1 =
        candidatoBase.value.grupo_Vulnerable_1;
      suplente_1.value.grupo_Vulnerable_2 =
        candidatoBase.value.grupo_Vulnerable_2;
      suplente_1.value.grupo_Vulnerable_3 =
        candidatoBase.value.grupo_Vulnerable_3;
      suplente_1.value.grupo_Vulnerable_4 =
        candidatoBase.value.grupo_Vulnerable_4;
      suplente_1.value.url_Foto = candidatoBase.value.url_Foto;
      suplente_1.value.edad = candidatoBase.value.edad;
      suplente_1.value.describir_Pueblos =
        candidatoBase.value.describir_Pueblos;
      suplente_1.value.describir_Diversidad =
        candidatoBase.value.describir_Diversidad;
      suplente_1.value.describir_Discapacidad =
        candidatoBase.value.describir_Discapacidad;
      suplente_1.value.describir_Migrante =
        candidatoBase.value.describir_Migrante;
      suplente_1.value.telefonos = candidatoBase.value.telefonos;
      break;
    case "sindico_propietario":
      propietario_2.value.nombres = candidatoBase.value.nombres;
      propietario_2.value.apellido_Paterno =
        candidatoBase.value.apellido_Paterno;
      propietario_2.value.apellido_Materno =
        candidatoBase.value.apellido_Materno;
      propietario_2.value.mote = candidatoBase.value.mote;
      propietario_2.value.sexo = candidatoBase.value.sexo;
      propietario_2.value.url_Foto = candidatoBase.value.url_Foto;
      propietario_2.value.clave_Elector = candidatoBase.value.clave_Elector;
      propietario_2.value.rfc = candidatoBase.value.rfc;
      propietario_2.value.curp = candidatoBase.value.curp;
      propietario_2.value.fecha_Nacimiento =
        candidatoBase.value.fecha_Nacimiento;
      propietario_2.value.ocupacion = candidatoBase.value.ocupacion;
      propietario_2.value.telefono = candidatoBase.value.telefono;
      propietario_2.value.correo = candidatoBase.value.correo;
      propietario_2.value.pertenece_Grupo_Vulnerable =
        candidatoBase.value.pertenece_Grupo_Vulnerable;
      propietario_2.value.grupo_Vulnerable =
        candidatoBase.value.grupo_Vulnerable;
      propietario_2.value.partido_Id = candidatoBase.value.partido_Id;
      propietario_2.value.grupo_Vulnerable_1 =
        candidatoBase.value.grupo_Vulnerable_1;
      propietario_2.value.grupo_Vulnerable_2 =
        candidatoBase.value.grupo_Vulnerable_2;
      propietario_2.value.grupo_Vulnerable_3 =
        candidatoBase.value.grupo_Vulnerable_3;
      propietario_2.value.grupo_Vulnerable_4 =
        candidatoBase.value.grupo_Vulnerable_4;
      propietario_2.value.url_Foto = candidatoBase.value.url_Foto;
      propietario_2.value.edad = candidatoBase.value.edad;
      propietario_2.value.consecutivo = candidatoBase.value.consecutivo;
      propietario_2.value.describir_Pueblos =
        candidatoBase.value.describir_Pueblos;
      propietario_2.value.describir_Diversidad =
        candidatoBase.value.describir_Diversidad;
      propietario_2.value.describir_Discapacidad =
        candidatoBase.value.describir_Discapacidad;
      propietario_2.value.describir_Migrante =
        candidatoBase.value.describir_Migrante;
      propietario_2.value.telefonos = candidatoBase.value.telefonos;
      break;
    case "sindico_suplente":
      suplente_2.value.nombres = candidatoBase.value.nombres;
      suplente_2.value.apellido_Paterno = candidatoBase.value.apellido_Paterno;
      suplente_2.value.apellido_Materno = candidatoBase.value.apellido_Materno;
      suplente_2.value.mote = candidatoBase.value.mote;
      suplente_2.value.sexo = candidatoBase.value.sexo;
      suplente_2.value.url_Foto = candidatoBase.value.url_Foto;
      suplente_2.value.clave_Elector = candidatoBase.value.clave_Elector;
      suplente_2.value.rfc = candidatoBase.value.rfc;
      suplente_2.value.curp = candidatoBase.value.curp;
      suplente_2.value.fecha_Nacimiento = candidatoBase.value.fecha_Nacimiento;
      suplente_2.value.ocupacion = candidatoBase.value.ocupacion;
      suplente_2.value.telefono = candidatoBase.value.telefono;
      suplente_2.value.correo = candidatoBase.value.correo;
      suplente_2.value.pertenece_Grupo_Vulnerable =
        candidatoBase.value.pertenece_Grupo_Vulnerable;
      suplente_2.value.grupo_Vulnerable = candidatoBase.value.grupo_Vulnerable;
      suplente_2.value.partido_Id = candidatoBase.value.partido_Id;
      suplente_2.value.grupo_Vulnerable_1 =
        candidatoBase.value.grupo_Vulnerable_1;
      suplente_2.value.grupo_Vulnerable_2 =
        candidatoBase.value.grupo_Vulnerable_2;
      suplente_2.value.grupo_Vulnerable_3 =
        candidatoBase.value.grupo_Vulnerable_3;
      suplente_2.value.grupo_Vulnerable_4 =
        candidatoBase.value.grupo_Vulnerable_4;
      suplente_2.value.url_Foto = candidatoBase.value.url_Foto;
      suplente_2.value.edad = candidatoBase.value.edad;
      suplente_2.value.describir_Pueblos =
        candidatoBase.value.describir_Pueblos;
      suplente_2.value.describir_Diversidad =
        candidatoBase.value.describir_Diversidad;
      suplente_2.value.describir_Discapacidad =
        candidatoBase.value.describir_Discapacidad;
      suplente_2.value.describir_Migrante =
        candidatoBase.value.describir_Migrante;
      suplente_2.value.telefonos = candidatoBase.value.telefonos;
      break;
    default:
      break;
  }
});

watch(propietario_1.value, (val) => {
  if (val != null) {
    calcularEdad(val.fecha_Nacimiento, "propietario_1");
  }
});

watch(propietario_2.value, (val) => {
  if (val != null) {
    calcularEdad(val.fecha_Nacimiento, "propietario_2");
  }
});

watch(suplente_1.value, (val) => {
  if (val != null) {
    calcularEdad(val.fecha_Nacimiento, "suplente_1");
  }
});

watch(suplente_2.value, (val) => {
  if (val != null) {
    calcularEdad(val.fecha_Nacimiento, "suplente_2");
  }
});

//--------------------------------------------------------------------

const especificacionesFoto = () => {
  $q.dialog({
    title: `Especificaciones para la fotografía`,
    style: "width: 800px; max-width: 80vw",
    message: `
    <div class="text-bold text-grey-8">La fotografía que sea divulgada en el Sistema no deberá tener una antiguedad mayor a 3 meses previos a su publicación.</div>

    <ol>
      <div class="text-bold text-pink-7">Sólo se podrá publicar la imagen de la candidatura que cumpla con las especificaciones técnicas siguientes.</div>
      <li>El formato de la imagen debe ser .jpg, .jpeg, o .png.</li>
      <li>El tamaño de la imagen debe ser menor a 700Kb.</li>
    </ol>
    <ol>
      <div class="text-bold text-pink-7">No se podrá publicar lo siguiente:</div>
      <li>Imágenes de los logotipos de los partidos políticos, coaliciones o candidatura común.</li>
      <li>Imágenes provenientes de documentos oficiales y/o académicos.</li>
      <li>Imágenes con lemas de campaña.</li>
      <li>Imágenes de otras candidaturas o personajes políticos.</li>
      <li>Imágenes religiosas o alguna otra que se encuentre restringida por la normativa electoral.</li>
      <li>Imágenes que integren expresiones de denostación o de discriminación de cualquier índole.</li>
      <li>Imágenes que contengan lenguaje sexista, ofensivo o discriminatorio.</li>
    </ol>`,
    html: true,
    ok: "Cerrar",
  });
};

const onRejected = () => {
  $q.notify({
    type: "negative",
    message: "El tamaño de la imagen excede el limite",
  });
};

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
      propietario_1.value.edad = edad;
    } else if (tipo == "propietario_2") {
      if (
        diferenciaMeses < 0 ||
        (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
      ) {
        edad--;
      }
      propietario_2.value.edad = edad;
    } else if (tipo == "suplente_1") {
      if (
        diferenciaMeses < 0 ||
        (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
      ) {
        edad--;
      }
      suplente_1.value.edad = edad;
    } else if (tipo == "suplente_2") {
      if (
        diferenciaMeses < 0 ||
        (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
      ) {
        edad--;
      }
      suplente_2.value.edad = edad;
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
