<template>
  <q-card>
    <q-card-section class="row">
      <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 q-pr-md">
        <q-file
          bottom-slots
          v-model="fotoBase.url_Foto"
          label="Fotografía"
          counter
          accept=".jpg, image/*"
          max-file-size="716800"
          @rejected="onRejected"
        >
          <template v-slot:prepend>
            <q-avatar v-if="isEditar">
              <img :src="candidatoBase.url_Foto" />
            </q-avatar>
            <q-icon v-else name="cloud_upload" @click.stop.prevent />
          </template>
          <template v-slot:append>
            <q-icon
              name="close"
              @click.stop.prevent="fotoBase.url_Foto = null"
              class="cursor-pointer"
            />
          </template>
          <q-tooltip
            >La fotografía no deberá tener una antigüedad mayor a 3
            meses</q-tooltip
          >
          <template v-slot:hint> Agregar fotografía </template>
        </q-file>
      </div>
      <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pr-md">
        <q-input
          v-model="candidatoBase.nombres"
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
          v-model="candidatoBase.apellido_Paterno"
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
          v-model="candidatoBase.apellido_Materno"
          label="Apellido Materno"
          hint="Ingrese su apellido materno"
          autogrow
        >
        </q-input>
      </div>
      <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pr-md">
        <q-input
          v-model="candidatoBase.mote"
          label="Mote"
          hint="Ingrese su sobrenombre"
          autogrow
        >
        </q-input>
      </div>
      <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pr-md">
        <q-input
          class="text-uppercase"
          v-model.trim="candidatoBase.clave_Elector"
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
      <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pr-md">
        <q-input
          class="text-uppercase"
          v-model.trim="candidatoBase.curp"
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
      <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
        <q-input
          class="text-uppercase"
          v-model.trim="candidatoBase.rfc"
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
      <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pr-md">
        <q-input
          v-model="candidatoBase.fecha_Nacimiento"
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
                  v-model="candidatoBase.fecha_Nacimiento"
                  color="pink-4"
                  :options="optionsDate"
                  lazy-rules
                  mask="YYYY/MM/DD"
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
          readonly
          v-model.number="candidatoBase.edad"
          type="number"
          label="Edad"
          hint="Ingrese su edad"
          lazy-rules
          :rules="[(val) => !!val || 'Ingrese fecha de nacimiento']"
        >
        </q-input>
      </div>
      <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pr-md">
        <q-select
          v-model="candidatoBase.sexo"
          :options="optionsGenero"
          label="Género"
          lazy-rules
          :rules="[(val) => !!val || 'El género es requerido']"
        />
      </div>
      <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
        <q-input
          v-model="candidatoBase.ocupacion"
          label="Ocupación"
          hint="Ingrese su ocupación"
        >
        </q-input>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 q-pr-md">
        <q-input
          v-model.trim="candidatoBase.correo"
          type="email"
          label="Correo electrónico"
          hint="Correo electrónico para recibir avisos y comuniados "
          autogrow
          lazy-rules
          :rules="[
            (val) => !!val || 'El correo electrónico es requerido',
            (val) =>
              /\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(val) ||
              'Formato de correo electrónico no válido',
          ]"
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
        <!-- <q-select
          label="Teléfono"
          hint="Da enter para agregar teléfono"
          v-model="candidatoBase.telefono"
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
        </q-select> -->
        <q-input
          v-model="candidatoBase.telefono"
          label="Phone"
          mask="### - ### - ####"
          hint="Número telefonico"
        >
          <template v-slot:prepend>
            <q-icon name="phone" color="pink" />
          </template>
        </q-input>
      </div>
      <div v-if="isExtension" class="col-lg-1 col-md-1 col-sm-1 col-xs-12">
        <q-input
          v-model.number="num_Extension"
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
          v-model="candidatoBase.pertenece_Grupo_Vulnerable"
          color="pink"
        />
      </div>
      <div
        v-if="candidatoBase.pertenece_Grupo_Vulnerable == true"
        class="col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pr-md"
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
        v-if="candidatoBase.pertenece_Grupo_Vulnerable == true"
        class="col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pr-md"
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
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";
import { useCandidatosStore } from "src/stores/candidatos-store";
import { ref, defineProps, watch, watchEffect } from "vue";

//--------------------------------------------------------------------

const $q = useQuasar();
const candidatoStore = useCandidatosStore();
const {
  propietario_1,
  propietario_2,
  suplente_1,
  suplente_2,
  isEditar,
  foto_1,
  foto_2,
  foto_3,
  foto_4,
} = storeToRefs(candidatoStore);
const optionsGenero = ref(["Hombre", "Mujer", "No binario"]);
const telefonos = ref();
const props = defineProps({
  tabTipo: { type: String, required: true },
});
const isExtension = ref(false);
const num_Extension = ref(null);
const candidatoBase = ref(null);
const fotoBase = ref(null);

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

watch(telefonos, (val) => {
  // if (val != null) {
  //   if (val[2] != null) {
  //     isExtension.value = true;
  //   } else {
  //     isExtension.value = false;
  //   }
  //   switch (props.tabTipo) {
  //     case "propietario":
  //       propietario_1.value.telefono = `${val[0] != undefined ? val[0] : ""},${
  //         val[1] != undefined ? val[1] : ""
  //       },${val[2] != undefined ? val[2] : ""}, ${
  //         num_Extension.value != null ? num_Extension.value : ""
  //       }`;
  //       break;
  //     case "suplente":
  //       suplente_1.value.telefono = `${val[0] != undefined ? val[0] : ""},${
  //         val[1] != undefined ? val[1] : ""
  //       },${val[2] != undefined ? val[2] : ""}, ${
  //         num_Extension.value != null ? num_Extension.value : ""
  //       }`;
  //       break;
  //     case "sindico_propietario":
  //       propietario_2.value.telefono = `${val[0] != undefined ? val[0] : ""},${
  //         val[1] != undefined ? val[1] : ""
  //       },${val[2] != undefined ? val[2] : ""}, ${
  //         num_Extension.value != null ? num_Extension.value : ""
  //       }`;
  //       break;
  //     case "sindico_suplente":
  //       suplente_2.value.telefono = `${val[0] != undefined ? val[0] : ""},${
  //         val[1] != undefined ? val[1] : ""
  //       },${val[2] != undefined ? val[2] : ""}, ${
  //         num_Extension.value != null ? num_Extension.value : ""
  //       }`;
  //       break;
  //     default:
  //       break;
  //   }
  // }
});

//--------------------------------------------------------------------

const onRejected = () => {
  $q.notify({
    type: "negative",
    message: "El tamaño de la imagen excede el limite",
  });
};

const calcularEdad = (fecha_Nacimiento, tipo) => {
  if (fecha_Nacimiento != null) {
    var fechaNace = new Date(fecha_Nacimiento);
    var fechaActual = new Date();

    var mes = fechaActual.getMonth();
    var dia = fechaActual.getDate();
    var año = fechaActual.getFullYear();

    fechaActual.setDate(dia);
    fechaActual.setMonth(mes);
    fechaActual.setFullYear(año);

    if (tipo == "propietario_1") {
      propietario_1.value.edad = Math.floor(
        (fechaActual - fechaNace) / (1000 * 60 * 60 * 24) / 365
      );
    } else if (tipo == "propietario_2") {
      propietario_2.value.edad = Math.floor(
        (fechaActual - fechaNace) / (1000 * 60 * 60 * 24) / 365
      );
    } else if (tipo == "suplente_1") {
      suplente_1.value.edad = Math.floor(
        (fechaActual - fechaNace) / (1000 * 60 * 60 * 24) / 365
      );
    } else if (tipo == "suplente_2") {
      suplente_2.value.edad = Math.floor(
        (fechaActual - fechaNace) / (1000 * 60 * 60 * 24) / 365
      );
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
