<template>
  <q-card>
    <q-card-section>
      <div class="row">
        <div
          v-if="coalicion"
          class="col-lg-4 col-md-4 col-sm-4 col-xs-12 q-pr-xs"
        >
          <q-select
            v-model="tipo_Eleccion"
            :options="elecciones"
            label="Partido postulante"
          />
        </div>
        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 q-pr-xs">
          <q-file
            accept=".jpg, .jpeg, .png"
            max-file-size="700"
            bottom-slots
            v-model="model"
            label="Fotografía"
            counter
          >
            <template v-slot:prepend>
              <q-icon name="cloud_upload" @click.stop.prevent />
            </template>
            <template v-slot:append>
              <q-icon
                name="close"
                @click.stop.prevent="model = null"
                class="cursor-pointer"
              />
            </template>

            <template v-slot:hint> Field hint </template>
          </q-file>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pr-xs">
          <q-input
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
            label="Apellido paterno"
            hint="Ingrese su apellido paterno"
            autogrow
          >
          </q-input>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pr-xs">
          <q-input
            label="Apellido Materno"
            hint="Ingrese su apellido materno"
            autogrow
          >
          </q-input>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
          <q-input label="Mote" hint="Ingrese su sobrenombre" autogrow>
          </q-input>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12 q-pr-xs">
          <q-input
            v-model.trim="claveElector"
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
        <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12 q-pr-xs">
          <q-input
            v-model.trim="curp"
            label="CURP"
            hint="Ingrese su CURP"
            autogrow
            lazy-rules
            counter
            maxlength="18"
            :rules="[
              (val) => !!val || 'La CURP es requerida',
              (val) =>
                val.length >= 18 || 'Ingrese los 18 caracteres de la CURP',
            ]"
          >
          </q-input>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12 q-pr-xs">
          <q-input
            v-model.trim="rfc"
            label="RFC"
            hint="Ingrese su RFC"
            counter
            maxlength="13"
            autogrow
            lazy-rules
            :rules="[
              (val) => !!val || 'El RFC es requerido',
              (val) => val.length >= 18 || 'Ingrese los 13 caracteres deL RFC',
            ]"
          >
          </q-input>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pr-xs">
          <q-input
            v-model="date"
            mask="date"
            :rules="['date']"
            label="Fecha de nacimiento"
          >
            <template v-slot:append>
              <q-icon name="event" color="pink" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="date" color="pink-4" :options="optionsDate">
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
            v-model="genero"
            :options="optionsGenero"
            label="Género"
            lazy-rules
            :rules="[(val) => !!val || 'El género es requerido']"
          />
        </div>

        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
          <q-input label="Ocupación" hint="Ingrese su ocupación"> </q-input>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 q-pr-xs">
          <q-input
            v-model.trim="correo"
            type="email"
            label="Correo electrónico"
            hint="Correo electrónico para recibir avisos y comuniados "
            autogrow
            lazy-rules
            :rules="[(val) => !!val || 'El correo electronico es requerido']"
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
          <!-- <q-input
            v-model.number="telefono"
            mask="(###) ### - ####"
            hint="Da enter para agregar teléfono"
            @keydown.enter.prevent="getPhone(telefono)"
          >
            <template v-slot:prepend>
              <q-icon name="phone" color="pink" />
            </template>
            <q-chip
              dense
              v-for="(item, index) in arrayPhone"
              :key="index"
              removable
              v-model="arrayPhone[index]"
              color="pink-4"
              text-color="white"
              :icon="
                index == 0 ? 'home' : index == 1 ? 'smartphone' : 'apartment'
              "
            >
              {{ item }}
            </q-chip>
            <q-tooltip
              >El primer número es particular, el segundo es de celular y el
              tercero de oficina</q-tooltip
            >
          </q-input> -->
          <q-select
            label="Teléfono"
            hint="Da enter para agregar teléfono"
            v-model="telefono"
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
            v-model.trim="correo"
            type="email"
            label="Extensión"
            hint="Extensión"
            autogrow
          >
          </q-input>
        </div>
      </div>

      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <br />
        <q-checkbox
          left-label
          label="¿Pertenece a un grupo en situación de vulnerabilidad?"
          checked-icon="task_alt"
          unchecked-icon="highlight_off"
          size="lg"
          v-model="situacion"
          color="pink"
        />
      </div>
      <div class="row" v-if="situacion">
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pr-xs">
          <q-input label="Personas de pueblos y comunidades indígenas">
          </q-input>
          <q-input label="Diversidad sexual"> </q-input>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pr-xs">
          <q-input label="Personas con discapacidad"> </q-input>
          <q-input label="Otro"> </q-input>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, defineProps, watch } from "vue";

//--------------------------------------------------------------------

const genero = ref(null);
const optionsGenero = ref(["Hombre", "Mujer", "No binario"]);
const situacion = ref(false);
const telefono = ref([]);
const telefonos = [];
const correo = ref(null);
const props = defineProps({
  coalicion: { type: Boolean, required: true },
  tab: { type: String, required: true },
});
const claveElector = ref(null);
const curp = ref(null);
const rfc = ref(null);
const date = ref(null);
const filtroDate = ref("");
const edad = ref("");
const isExtension = ref(false);
//--------------------------------------------------------------------

watch(date, (val) => {
  var fechaNace = new Date(val);
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
});

watch(telefono, (val) => {
  console.log(val);
  if (val[2] != null) {
    isExtension.value = true;
  } else {
    isExtension.value = false;
  }
});
//--------------------------------------------------------------------

const getPhone = (phone) => {
  console.log(phone);
  // if (arrayPhone.value.length > 3) {
  // } else if (arrayPhone.value.length < 3) {
  //   arrayPhone.value.push(phone.toString());
  //   telefono.value = null;
  //   if (arrayPhone.value[2] != null) {
  //     isExtension.value = true;
  //   }
  // }
};

const optionsDate = (fecha) => {
  const dateActual = new Date();
  const year = dateActual.getFullYear();
  const month = String(dateActual.getMonth() + 1).padStart(2, "0");
  const day = String(dateActual.getDate()).padStart(2, "0");
  return fecha <= `${year}/${month}/${day}`;
};

const dialogo = (title, mesage) => {
  $q.dialog({
    title: title,
    message: mesage,
  })
    .onOk(() => {
      // console.log('OK')
    })
    .onCancel(() => {
      // console.log('Cancel')
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    });
};

//VALIDACIONES
const validarEmail = async (valor) => {
  const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  const resultado = regex.test(valor);
  return resultado;
};
</script>

<style scope>
.mi-estilo-de-q-select .q-chip__content q-icon {
  margin-right: 5px; /* Ajusta el espaciado entre el ícono y el texto del chip */
}
</style>
