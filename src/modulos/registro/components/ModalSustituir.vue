<template>
  <q-dialog
    v-model="modalSustituir"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card style="width: 1100px; max-width: 110vw">
      <q-card-section class="row">
        <div class="text-h6">Sustituir</div>
        <q-space />
        <q-btn
          icon="close"
          @click="actualizarModal(false)"
          flat
          round
          dense
          v-close-popup
        />
      </q-card-section>
      <q-card-section>
        <q-radio
          v-for="option in options"
          :key="option"
          v-model="sustituirPor"
          :val="option"
          :label="option"
          color="teal"
        />
        <q-radio
          v-if="props.tab == 'PYS'"
          v-model="sustituirPor"
          val="Propietario sindico"
          label="Propietario sindico"
          color="teal"
        />
        <q-radio
          v-if="props.tab == 'PYS'"
          v-model="sustituirPor"
          val="Suplente sindico"
          label="Suplente sindico"
          color="teal"
        />
      </q-card-section>
      <q-card-section>
        <q-form class="q-col-gutter-xs" @submit="onSubmit">
          <div class="row" v-if="sustituirPor == 'Fórmula'">
            <q-card
              v-for="candidato in list_Suplentes"
              :key="candidato"
              class="col-3 no-shadow"
              bordered
            >
              <q-item>
                <q-item-section avatar>
                  <q-avatar size="70px">
                    <img :src="candidato.url_Foto" />
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label class="text-weight-bold">{{
                    candidato.tipo
                  }}</q-item-label>
                  <q-item-label>{{ candidato.nombre_Completo }}</q-item-label>
                  <q-item-label caption>
                    {{ candidato.partido }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-card>
          </div>

          <div class="row" v-if="sustituirPor != null">
            <q-card
              v-if="sustituirPor != 'Fórmula'"
              class="col-lg-3 col-md-3 col-sm-3 col-xs-12 no-shadow"
              bordered
            >
              <q-item>
                <q-item-section avatar>
                  <q-avatar size="70px">
                    <img :src="candidato2.url_Foto" />
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label class="text-weight-bold">{{
                    candidato2.tipo
                  }}</q-item-label>
                  <q-item-label>{{ candidato2.nombre_Completo }}</q-item-label>
                  <q-item-label caption>
                    {{ candidato2.partido }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-card>
            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 q-pl-md">
              <q-input
                v-model="sustitucion.No_Acuerdo"
                label="Número de acuerdo"
                hint="Ingrese número de acuerdo"
                autogrow
                lazy-rules
                :rules="[(val) => !!val || 'El número de acuerdo es requerido']"
              >
              </q-input>
            </div>
          </div>
          <div
            v-if="sustituirPor == 'Fórmula'"
            class="col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pa-xs"
          >
            <q-tabs
              v-model="tabTab"
              class="bg-grey-4"
              style="border-radius: 5px"
              dense
              align="justify"
            >
              <q-tab
                class="text-blue-grey"
                name="propietario"
                label="Propietario"
              />
              <q-tab
                v-if="props.tab != 'GUB'"
                class="text-blue-grey"
                name="suplente"
                label="Suplente"
              />
              <q-tab
                v-if="props.tab == 'PYS'"
                class="text-blue-grey"
                name="sindico_propietario"
                label="Sindico propietario"
              />
              <q-tab
                v-if="props.tab == 'PYS'"
                class="text-blue-grey"
                name="sindico_suplente"
                label="Sindico suplenete"
              />
            </q-tabs>
            <q-tab-panels
              v-model="tabTab"
              animated
              class="shadow-2 rounded-borders"
            >
              <!--PROPIETARIO-->
              <q-tab-panel name="propietario">
                <q-list bordered class="rounded-borders col-12">
                  <q-expansion-item
                    v-model="expansion"
                    @show="expansion2 = false"
                    @hide="expansion2 = true"
                    expand-separator
                    icon="person"
                    label="Datos generales"
                  >
                    <SustituirCandidato :tabTipo="tabTab" />
                  </q-expansion-item>
                </q-list>
              </q-tab-panel>
              <!--SUPLENTE-->
              <q-tab-panel name="suplente" class="row">
                <q-list bordered class="rounded-borders col-12">
                  <q-expansion-item
                    v-model="expansion"
                    @show="expansion2 = false"
                    @hide="expansion2 = true"
                    expand-separator
                    icon="person"
                    label="Datos generales"
                  >
                    <SustituirCandidato :tabTipo="tabTab" />
                  </q-expansion-item>
                </q-list>
              </q-tab-panel>
              <!--SINDICO PROPIETARIO-->
              <q-tab-panel name="sindico_propietario" class="row">
                <q-list bordered class="rounded-borders col-12">
                  <q-expansion-item
                    v-model="expansion"
                    @show="expansion2 = false"
                    @hide="expansion2 = true"
                    expand-separator
                    icon="person"
                    label="Datos generales"
                  >
                    <SustituirCandidato :tabTipo="tabTab" />
                  </q-expansion-item>
                </q-list>
              </q-tab-panel>
              <!--SINDICO SUPLENTE-->
              <q-tab-panel name="sindico_suplente" class="row">
                <q-list bordered class="rounded-borders col-12">
                  <q-expansion-item
                    v-model="expansion"
                    @show="expansion2 = false"
                    @hide="expansion2 = true"
                    expand-separator
                    icon="person"
                    label="Datos generales"
                  >
                    <SustituirCandidato :tabTipo="tabTab" />
                  </q-expansion-item>
                </q-list>
              </q-tab-panel>
            </q-tab-panels>
          </div>
          <div
            v-if="
              sustituirPor == 'Propietario' ||
              sustituirPor == 'Suplente' ||
              sustituirPor == 'Suplente sindico' ||
              sustituirPor == 'Propietario sindico'
            "
            class="col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pa-xs"
          >
            <q-tabs
              v-model="tabTab"
              class="bg-grey-4"
              style="border-radius: 5px"
              dense
              align="justify"
            >
              <q-tab
                class="text-blue-grey"
                :name="sustituirPor"
                :label="sustituirPor"
              />
            </q-tabs>
            <SustituirCandidato :tabTipo="tabTab" />
          </div>
          <q-space />
          <div class="col-12 justify-end">
            <div class="text-right q-gutter-xs">
              <q-btn
                label="Cancelar"
                type="reset"
                outline
                color="pink"
                @click="actualizarModal(false)"
              />
              <q-btn
                v-show="sustituirPor != null"
                label="Guardar"
                type="submit"
                color="pink"
                class="q-ml-sm"
              />
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, defineProps, watch } from "vue";
import { storeToRefs } from "pinia";
import { useCandidatosStore } from "src/stores/candidatos-store";
import { useQuasar } from "quasar";
import { useSustituirStore } from "src/stores/sustituir-store";
import SustituirCandidato from "../../sustituciones/components/SustituirCandidato.vue";

//--------------------------------------------------------------------

const $q = useQuasar();
const candidatoStore = useCandidatosStore();
const sustituirStore = useSustituirStore();
const {
  modalSustituir,
  candidato,
  candidato2,
  propietario_1,
  suplente_1,
  propietario_2,
  suplente_2,
  list_Suplentes,
} = storeToRefs(candidatoStore);
const {
  sustitucion,
  sust_propietario_1,
  sust_propietario_2,
  sust_suplente_1,
  sust_suplente_2,
} = storeToRefs(sustituirStore);
const sustituirPor = ref(null);
const tabTab = ref("propietario");
const options = ref(["Fórmula", "Propietario", "Suplente"]);
const expansion = ref(true);
const expansion2 = ref(false);
//Get fecha actual
const dateActual = new Date();
const year = dateActual.getFullYear();
const month = String(dateActual.getMonth() + 1).padStart(2, "0");
const day = String(dateActual.getDate()).padStart(2, "0");
const hours = String(dateActual.getHours());
const minutes = String(dateActual.getMinutes());
const seconds = String(dateActual.getSeconds());
const date = ref(`${year}/${month}/${day} ${hours}:${minutes}:${seconds}`);
const props = defineProps({
  tab: { type: String, required: true },
});

//--------------------------------------------------------------------

watch(sustituirPor, (val) => {
  if (val != null) {
    if (val == "Fórmula") {
      candidatoStore.loadCandidatoToArray(props.tab, candidato.value.id);
    } else {
      candidatoStore.loadCandidatoByCargo(val, candidato.value.id);
    }
  }
});

//--------------------------------------------------------------------

const actualizarModal = (valor) => {
  $q.loading.show();
  candidatoStore.actualizarModalSustituir(valor);
  sustituirStore.initSustituir();
  $q.loading.hide();
};

const onSubmit = async () => {
  let sustituirFormData = new FormData();
  let sustituirPropietario1 = new FormData();
  let sustituirSuplente1 = new FormData();
  let sustituirPropietario2 = new FormData();
  let sustituirSuplente2 = new FormData();
  if (sustituirPor.value == "Propietario") {
    sustituirFormData.append("Tipo_Sustitucion", "Propietario 1");
    if (propietario_1.value.nombres != null)
      sustituirFormData.append("Nombres_Anterior", propietario_1.value.nombres);
    if (propietario_1.value.apellido_Paterno != null)
      sustituirFormData.append(
        "Apellido_Paterno_Anterior",
        propietario_1.value.apellido_Paterno
      );
    if (propietario_1.value.apellido_Materno != null)
      sustituirFormData.append(
        "Apellido_Materno_Anterior",
        propietario_1.value.apellido_Materno
      );
    if (propietario_1.value.mote != null)
      sustituirFormData.append("Mote_Anterior", propietario_1.value.mote);
    if (propietario_1.value.sexo != null)
      sustituirFormData.append("Sexo_Anterior", propietario_1.value.sexo);
    if (propietario_1.value.clave_Elector != null)
      sustituirFormData.append(
        "Clave_Elector_Anterior",
        propietario_1.value.clave_Elector
      );
    if (propietario_1.value.rfc != null)
      sustituirFormData.append("RFC_Anterior", propietario_1.value.rfc);
    if (propietario_1.value.curp != null)
      sustituirFormData.append("CURP_Anterior", propietario_1.value.curp);
    if (propietario_1.value.fecha_Nacimiento != null)
      sustituirFormData.append(
        "Fecha_Nacimiento_Anterior",
        propietario_1.value.fecha_Nacimiento
      );
    if (propietario_1.value.ocupacion != null)
      sustituirFormData.append(
        "Ocupacion_Anterior",
        propietario_1.value.ocupacion
      );
    if (propietario_1.value.telefono != null)
      sustituirFormData.append(
        "Telefono_Anterior",
        propietario_1.value.telefono
      );
    if (propietario_1.value.correo != null)
      sustituirFormData.append("Correo_Anterior", propietario_1.value.correo);
    sustituirFormData.append(
      "Pertenece_Grupo_Vulnerable_Anterior",
      propietario_1.value.pertenece_Grupo_Vulnerable
    );
    if (propietario_1.value.grupo_Vulnerable != null)
      sustituirFormData.append(
        "Grupo_Vulnerable_Anterior",
        propietario_1.value.grupo_Vulnerable
      );
    if (propietario_1.value.partido_Id != null)
      sustituirFormData.append(
        "Partido_Id_Anterior",
        propietario_1.value.partido_Id
      );
    if (sust_propietario_1.value.Nombres_Nuevo != null)
      sustituirFormData.append(
        "Nombres_Nuevo",
        sust_propietario_1.value.Nombres_Nuevo
      );
    if (sust_propietario_1.value.Apellido_Paterno_Nuevo != null)
      sustituirFormData.append(
        "Apellido_Paterno_Nuevo",
        sust_propietario_1.value.Apellido_Paterno_Nuevo
      );
    if (sust_propietario_1.value.Apellido_Materno_Nuevo != null)
      sustituirFormData.append(
        "Apellido_Materno_Nuevo",
        sust_propietario_1.value.Apellido_Materno_Nuevo
      );
    if (sust_propietario_1.value.Mote_Nuevo != null)
      sustituirFormData.append(
        "Mote_Nuevo",
        sust_propietario_1.value.Mote_Nuevo
      );
    if (sust_propietario_1.value.Sexo_Nuevo != null)
      sustituirFormData.append(
        "Sexo_Nuevo",
        sust_propietario_1.value.Sexo_Nuevo
      );
    if (sust_propietario_1.value.Clave_Elector_Nuevo != null)
      sustituirFormData.append(
        "Clave_Elector_Nuevo",
        sust_propietario_1.value.Clave_Elector_Nuevo
      );
    if (sust_propietario_1.value.RFC_Nuevo != null)
      sustituirFormData.append("RFC_Nuevo", sust_propietario_1.value.RFC_Nuevo);
    if (sust_propietario_1.value.CURP_Nuevo != null)
      sustituirFormData.append(
        "CURP_Nuevo",
        sust_propietario_1.value.CURP_Nuevo
      );
    if (sust_propietario_1.value.Fecha_Nacimiento_Nuevo != null)
      sustituirFormData.append(
        "Fecha_Nacimiento_Nuevo",
        sust_propietario_1.value.Fecha_Nacimiento_Nuevo
      );
    if (sust_propietario_1.value.Ocupacion_Nuevo != null)
      sustituirFormData.append(
        "Ocupacion_Nuevo",
        sust_propietario_1.value.Ocupacion_Nuevo
      );
    if (sust_propietario_1.value.Telefono_Nuevo != null)
      sustituirFormData.append(
        "Telefono_Nuevo",
        sust_propietario_1.value.Telefono_Nuevo
      );
    if (sust_propietario_1.value.Correo_Nuevo != null)
      sustituirFormData.append(
        "Correo_Nuevo",
        sust_propietario_1.value.Correo_Nuevo
      );
    sustituirFormData.append(
      "Pertenece_Grupo_Vulnerable_Nuevo",
      sust_propietario_1.value.Pertenece_Grupo_Vulnerable_Nuevo
    );
    if (sust_propietario_1.value.Grupo_Vulnerable_Nuevo != null)
      sustituirFormData.append(
        "Grupo_Vulnerable_Nuevo",
        sust_propietario_1.value.Grupo_Vulnerable_Nuevo
      );
    if (sust_propietario_1.value.Partido_Id_Nuevo.value != null)
      sustituirFormData.append(
        "Partido_Id_Nuevo",
        sust_propietario_1.value.Partido_Id_Nuevo.value
      );
    if (sust_propietario_1.value.Foto_Nuevo != null)
      sustituirFormData.append(
        "Foto_Nuevo",
        sust_propietario_1.value.Foto_Nuevo
      );
  } else if (sustituirPor.value == "Suplente") {
    sustituirFormData.append("Tipo_Sustitucion", "Suplente 1");
    if (suplente_1.value.nombres != null)
      sustituirFormData.append("Nombres_Anterior", suplente_1.value.nombres);
    if (suplente_1.value.apellido_Paterno != null)
      sustituirFormData.append(
        "Apellido_Paterno_Anterior",
        suplente_1.value.apellido_Paterno
      );
    if (suplente_1.value.apellido_Materno != null)
      sustituirFormData.append(
        "Apellido_Materno_Anterior",
        suplente_1.value.apellido_Materno
      );
    if (suplente_1.value.mote != null)
      sustituirFormData.append("Mote_Anterior", suplente_1.value.mote);
    if (suplente_1.value.sexo != null)
      sustituirFormData.append("Sexo_Anterior", suplente_1.value.sexo);
    if (suplente_1.value.clave_Elector != null)
      sustituirFormData.append(
        "Clave_Elector_Anterior",
        suplente_1.value.clave_Elector
      );
    if (suplente_1.value.rfc != null)
      sustituirFormData.append("RFC_Anterior", suplente_1.value.rfc);
    if (suplente_1.value.curp != null)
      sustituirFormData.append("CURP_Anterior", suplente_1.value.curp);
    if (suplente_1.value.fecha_Nacimiento != null)
      sustituirFormData.append(
        "Fecha_Nacimiento_Anterior",
        suplente_1.value.fecha_Nacimiento
      );
    if (suplente_1.value.ocupacion != null)
      sustituirFormData.append(
        "Ocupacion_Anterior",
        suplente_1.value.ocupacion
      );
    if (suplente_1.value.telefono != null)
      sustituirFormData.append("Telefono_Anterior", suplente_1.value.telefono);
    if (suplente_1.value.correo != null)
      sustituirFormData.append("Correo_Anterior", suplente_1.value.correo);
    sustituirFormData.append(
      "Pertenece_Grupo_Vulnerable_Anterior",
      suplente_1.value.pertenece_Grupo_Vulnerable
    );
    if (suplente_1.value.grupo_Vulnerable != null)
      sustituirFormData.append(
        "Grupo_Vulnerable_Anterior",
        suplente_1.value.grupo_Vulnerable
      );
    if (suplente_1.value.partido_Id != null)
      sustituirFormData.append(
        "Partido_Id_Anterior",
        suplente_1.value.partido_Id
      );
    if (sust_suplente_1.value.Nombres_Nuevo != null)
      sustituirFormData.append(
        "Nombres_Nuevo",
        sust_suplente_1.value.Nombres_Nuevo
      );
    if (sust_suplente_1.value.Apellido_Paterno_Nuevo != null)
      sustituirFormData.append(
        "Apellido_Paterno_Nuevo",
        sust_suplente_1.value.Apellido_Paterno_Nuevo
      );
    if (sust_suplente_1.value.Apellido_Materno_Nuevo != null)
      sustituirFormData.append(
        "Apellido_Materno_Nuevo",
        sust_suplente_1.value.Apellido_Materno_Nuevo
      );
    if (sust_suplente_1.value.Mote_Nuevo != null)
      sustituirFormData.append("Mote_Nuevo", sust_suplente_1.value.Mote_Nuevo);
    if (sust_suplente_1.value.Sexo_Nuevo != null)
      sustituirFormData.append("Sexo_Nuevo", sust_suplente_1.value.Sexo_Nuevo);
    if (sust_suplente_1.value.Clave_Elector_Nuevo != null)
      sustituirFormData.append(
        "Clave_Elector_Nuevo",
        sust_suplente_1.value.Clave_Elector_Nuevo
      );
    if (sust_suplente_1.value.RFC_Nuevo != null)
      sustituirFormData.append("RFC_Nuevo", sust_suplente_1.value.RFC_Nuevo);
    if (sust_suplente_1.value.CURP_Nuevo != null)
      sustituirFormData.append("CURP_Nuevo", sust_suplente_1.value.CURP_Nuevo);
    if (sust_suplente_1.value.Fecha_Nacimiento_Nuevo != null)
      sustituirFormData.append(
        "Fecha_Nacimiento_Nuevo",
        sust_suplente_1.value.Fecha_Nacimiento_Nuevo
      );
    if (sust_suplente_1.value.Ocupacion_Nuevo != null)
      sustituirFormData.append(
        "Ocupacion_Nuevo",
        sust_suplente_1.value.Ocupacion_Nuevo
      );
    if (sust_suplente_1.value.Telefono_Nuevo != null)
      sustituirFormData.append(
        "Telefono_Nuevo",
        sust_suplente_1.value.Telefono_Nuevo
      );
    if (sust_suplente_1.value.Correo_Nuevo != null)
      sustituirFormData.append(
        "Correo_Nuevo",
        sust_suplente_1.value.Correo_Nuevo
      );
    sustituirFormData.append(
      "Pertenece_Grupo_Vulnerable_Nuevo",
      sust_suplente_1.value.Pertenece_Grupo_Vulnerable_Nuevo
    );
    if (sust_suplente_1.value.Grupo_Vulnerable_Nuevo != null)
      sustituirFormData.append(
        "Grupo_Vulnerable_Nuevo",
        sust_suplente_1.value.Grupo_Vulnerable_Nuevo
      );
    if (sust_suplente_1.value.Partido_Id_Nuevo.value != null)
      sustituirFormData.append(
        "Partido_Id_Nuevo",
        sust_suplente_1.value.Partido_Id_Nuevo.value
      );
    if (sust_suplente_1.value.Foto_Nuevo != null)
      sustituirFormData.append("Foto_Nuevo", sust_suplente_1.value.Foto_Nuevo);
  } else if (sustituirPor.value == "Propietario sindico") {
    sustituirFormData.append("Tipo_Sustitucion", "Propietario 2");
    if (propietario_2.value.nombres != null)
      sustituirFormData.append("Nombres_Anterior", propietario_2.value.nombres);
    if (propietario_2.value.apellido_Paterno != null)
      sustituirFormData.append(
        "Apellido_Paterno_Anterior",
        propietario_2.value.apellido_Paterno
      );
    if (propietario_2.value.apellido_Materno != null)
      sustituirFormData.append(
        "Apellido_Materno_Anterior",
        propietario_2.value.apellido_Materno
      );
    if (propietario_2.value.mote != null)
      sustituirFormData.append("Mote_Anterior", propietario_2.value.mote);
    if (propietario_2.value.sexo != null)
      sustituirFormData.append("Sexo_Anterior", propietario_2.value.sexo);
    if (propietario_2.value.clave_Elector != null)
      sustituirFormData.append(
        "Clave_Elector_Anterior",
        propietario_2.value.clave_Elector
      );
    if (propietario_2.value.rfc != null)
      sustituirFormData.append("RFC_Anterior", propietario_2.value.rfc);
    if (propietario_2.value.curp != null)
      sustituirFormData.append("CURP_Anterior", propietario_2.value.curp);
    if (propietario_2.value.fecha_Nacimiento != null)
      sustituirFormData.append(
        "Fecha_Nacimiento_Anterior",
        propietario_2.value.fecha_Nacimiento
      );
    if (propietario_2.value.ocupacion != null)
      sustituirFormData.append(
        "Ocupacion_Anterior",
        propietario_2.value.ocupacion
      );
    if (propietario_2.value.telefono != null)
      sustituirFormData.append(
        "Telefono_Anterior",
        propietario_2.value.telefono
      );
    if (propietario_2.value.correo != null)
      sustituirFormData.append("Correo_Anterior", propietario_2.value.correo);
    sustituirFormData.append(
      "Pertenece_Grupo_Vulnerable_Anterior",
      propietario_2.value.pertenece_Grupo_Vulnerable
    );
    if (propietario_2.value.grupo_Vulnerable != null)
      sustituirFormData.append(
        "Grupo_Vulnerable_Anterior",
        propietario_2.value.grupo_Vulnerable
      );
    if (propietario_2.value.partido_Id != null)
      sustituirFormData.append(
        "Partido_Id_Anterior",
        propietario_2.value.partido_Id
      );
    if (sust_propietario_2.value.Nombres_Nuevo != null)
      sustituirFormData.append(
        "Nombres_Nuevo",
        sust_propietario_2.value.Nombres_Nuevo
      );
    if (sust_propietario_2.value.Apellido_Paterno_Nuevo != null)
      sustituirFormData.append(
        "Apellido_Paterno_Nuevo",
        sust_propietario_2.value.Apellido_Paterno_Nuevo
      );
    if (sust_propietario_2.value.Apellido_Materno_Nuevo != null)
      sustituirFormData.append(
        "Apellido_Materno_Nuevo",
        sust_propietario_2.value.Apellido_Materno_Nuevo
      );
    if (sust_propietario_2.value.Mote_Nuevo != null)
      sustituirFormData.append(
        "Mote_Nuevo",
        sust_propietario_2.value.Mote_Nuevo
      );
    if (sust_propietario_2.value.Sexo_Nuevo != null)
      sustituirFormData.append(
        "Sexo_Nuevo",
        sust_propietario_2.value.Sexo_Nuevo
      );
    if (sust_propietario_2.value.Clave_Elector_Nuevo != null)
      sustituirFormData.append(
        "Clave_Elector_Nuevo",
        sust_propietario_2.value.Clave_Elector_Nuevo
      );
    if (sust_propietario_2.value.RFC_Nuevo != null)
      sustituirFormData.append("RFC_Nuevo", sust_propietario_2.value.RFC_Nuevo);
    if (sust_propietario_2.value.CURP_Nuevo != null)
      sustituirFormData.append(
        "CURP_Nuevo",
        sust_propietario_2.value.CURP_Nuevo
      );
    if (sust_propietario_2.value.Fecha_Nacimiento_Nuevo != null)
      sustituirFormData.append(
        "Fecha_Nacimiento_Nuevo",
        sust_propietario_2.value.Fecha_Nacimiento_Nuevo
      );
    if (sust_propietario_2.value.Ocupacion_Nuevo != null)
      sustituirFormData.append(
        "Ocupacion_Nuevo",
        sust_propietario_2.value.Ocupacion_Nuevo
      );
    if (sust_propietario_2.value.Telefono_Nuevo != null)
      sustituirFormData.append(
        "Telefono_Nuevo",
        sust_propietario_2.value.Telefono_Nuevo
      );
    if (sust_propietario_2.value.Correo_Nuevo != null)
      sustituirFormData.append(
        "Correo_Nuevo",
        sust_propietario_2.value.Correo_Nuevo
      );
    sustituirFormData.append(
      "Pertenece_Grupo_Vulnerable_Nuevo",
      sust_propietario_2.value.Pertenece_Grupo_Vulnerable_Nuevo
    );
    if (sust_propietario_2.value.Grupo_Vulnerable_Nuevo != null)
      sustituirFormData.append(
        "Grupo_Vulnerable_Nuevo",
        sust_propietario_2.value.Grupo_Vulnerable_Nuevo
      );
    if (sust_propietario_2.value.Partido_Id_Nuevo.value != null)
      sustituirFormData.append(
        "Partido_Id_Nuevo",
        sust_propietario_2.value.Partido_Id_Nuevo.value
      );
    if (sust_propietario_2.value.Foto_Nuevo != null)
      sustituirFormData.append(
        "Foto_Nuevo",
        sust_propietario_2.value.Foto_Nuevo
      );
  } else if (sustituirPor.value == "Suplente sindico") {
    sustituirFormData.append("Tipo_Sustitucion", "Suplente 2");
    if (suplente_2.value.nombres != null)
      sustituirFormData.append("Nombres_Anterior", suplente_2.value.nombres);
    if (suplente_2.value.apellido_Paterno != null)
      sustituirFormData.append(
        "Apellido_Paterno_Anterior",
        suplente_2.value.apellido_Paterno
      );
    if (suplente_2.value.apellido_Materno != null)
      sustituirFormData.append(
        "Apellido_Materno_Anterior",
        suplente_2.value.apellido_Materno
      );
    if (suplente_2.value.mote != null)
      sustituirFormData.append("Mote_Anterior", suplente_2.value.mote);
    if (suplente_2.value.sexo != null)
      sustituirFormData.append("Sexo_Anterior", suplente_2.value.sexo);
    if (suplente_2.value.clave_Elector != null)
      sustituirFormData.append(
        "Clave_Elector_Anterior",
        suplente_2.value.clave_Elector
      );
    if (suplente_2.value.rfc != null)
      sustituirFormData.append("RFC_Anterior", suplente_2.value.rfc);
    if (suplente_2.value.curp != null)
      sustituirFormData.append("CURP_Anterior", suplente_2.value.curp);
    if (suplente_2.value.fecha_Nacimiento != null)
      sustituirFormData.append(
        "Fecha_Nacimiento_Anterior",
        suplente_2.value.fecha_Nacimiento
      );
    if (suplente_2.value.ocupacion != null)
      sustituirFormData.append(
        "Ocupacion_Anterior",
        suplente_2.value.ocupacion
      );
    if (suplente_2.value.telefono != null)
      sustituirFormData.append("Telefono_Anterior", suplente_2.value.telefono);
    if (suplente_2.value.correo != null)
      sustituirFormData.append("Correo_Anterior", suplente_2.value.correo);
    sustituirFormData.append(
      "Pertenece_Grupo_Vulnerable_Anterior",
      suplente_2.value.pertenece_Grupo_Vulnerable
    );
    if (suplente_2.value.grupo_Vulnerable != null)
      sustituirFormData.append(
        "Grupo_Vulnerable_Anterior",
        suplente_2.value.grupo_Vulnerable
      );
    if (suplente_2.value.partido_Id != null)
      sustituirFormData.append(
        "Partido_Id_Anterior",
        suplente_2.value.partido_Id
      );
    if (sust_suplente_2.value.Nombres_Nuevo != null)
      sustituirFormData.append(
        "Nombres_Nuevo",
        sust_suplente_2.value.Nombres_Nuevo
      );
    if (sust_suplente_2.value.Apellido_Paterno_Nuevo != null)
      sustituirFormData.append(
        "Apellido_Paterno_Nuevo",
        sust_suplente_2.value.Apellido_Paterno_Nuevo
      );
    if (sust_suplente_2.value.Apellido_Materno_Nuevo != null)
      sustituirFormData.append(
        "Apellido_Materno_Nuevo",
        sust_suplente_2.value.Apellido_Materno_Nuevo
      );
    if (sust_suplente_2.value.Mote_Nuevo != null)
      sustituirFormData.append("Mote_Nuevo", sust_suplente_2.value.Mote_Nuevo);
    if (sust_suplente_2.value.Sexo_Nuevo != null)
      sustituirFormData.append("Sexo_Nuevo", sust_suplente_2.value.Sexo_Nuevo);
    if (sust_suplente_2.value.Clave_Elector_Nuevo != null)
      sustituirFormData.append(
        "Clave_Elector_Nuevo",
        sust_suplente_2.value.Clave_Elector_Nuevo
      );
    if (sust_suplente_2.value.RFC_Nuevo != null)
      sustituirFormData.append("RFC_Nuevo", sust_suplente_2.value.RFC_Nuevo);
    if (sust_suplente_2.value.CURP_Nuevo != null)
      sustituirFormData.append("CURP_Nuevo", sust_suplente_2.value.CURP_Nuevo);
    if (sust_suplente_2.value.Fecha_Nacimiento_Nuevo != null)
      sustituirFormData.append(
        "Fecha_Nacimiento_Nuevo",
        sust_suplente_2.value.Fecha_Nacimiento_Nuevo
      );
    if (sust_suplente_2.value.Ocupacion_Nuevo != null)
      sustituirFormData.append(
        "Ocupacion_Nuevo",
        sust_suplente_2.value.Ocupacion_Nuevo
      );
    if (sust_suplente_2.value.Telefono_Nuevo != null)
      sustituirFormData.append(
        "Telefono_Nuevo",
        sust_suplente_2.value.Telefono_Nuevo
      );
    if (sust_suplente_2.value.Correo_Nuevo != null)
      sustituirFormData.append(
        "Correo_Nuevo",
        sust_suplente_2.value.Correo_Nuevo
      );
    sustituirFormData.append(
      "Pertenece_Grupo_Vulnerable_Nuevo",
      sust_suplente_2.value.Pertenece_Grupo_Vulnerable_Nuevo
    );
    if (sust_suplente_2.value.Grupo_Vulnerable_Nuevo != null)
      sustituirFormData.append(
        "Grupo_Vulnerable_Nuevo",
        sust_suplente_2.value.Grupo_Vulnerable_Nuevo
      );
    if (sust_suplente_2.value.Partido_Id_Nuevo.value != null)
      sustituirFormData.append(
        "Partido_Id_Nuevo",
        sust_suplente_2.value.Partido_Id_Nuevo.value
      );
    if (sust_suplente_2.value.Foto_Nuevo != null)
      sustituirFormData.append("Foto_Nuevo", sust_suplente_2.value.Foto_Nuevo);
  } else if (sustituirPor.value == "Fórmula") {
    sustituirPropietario1.append("Fecha_Sustitucion", date.value);
    sustituirPropietario1.append("Fecha_Registro", date.value);
    sustituirPropietario1.append("Tipo_Sustitucion", "Propietario 1");
    if (propietario_1.value.nombres != null)
      sustituirPropietario1.append(
        "Nombres_Anterior",
        propietario_1.value.nombres
      );
    if (propietario_1.value.apellido_Paterno != null)
      sustituirPropietario1.append(
        "Apellido_Paterno_Anterior",
        propietario_1.value.apellido_Paterno
      );
    if (propietario_1.value.apellido_Materno != null)
      sustituirPropietario1.append(
        "Apellido_Materno_Anterior",
        propietario_1.value.apellido_Materno
      );
    if (propietario_1.value.mote != null)
      sustituirPropietario1.append("Mote_Anterior", propietario_1.value.mote);
    if (propietario_1.value.sexo != null)
      sustituirPropietario1.append("Sexo_Anterior", propietario_1.value.sexo);
    if (propietario_1.value.clave_Elector != null)
      sustituirPropietario1.append(
        "Clave_Elector_Anterior",
        propietario_1.value.clave_Elector
      );
    if (propietario_1.value.rfc != null)
      sustituirPropietario1.append("RFC_Anterior", propietario_1.value.rfc);
    if (propietario_1.value.curp != null)
      sustituirPropietario1.append("CURP_Anterior", propietario_1.value.curp);
    if (propietario_1.value.fecha_Nacimiento != null)
      sustituirPropietario1.append(
        "Fecha_Nacimiento_Anterior",
        propietario_1.value.fecha_Nacimiento
      );
    if (propietario_1.value.ocupacion != null)
      sustituirPropietario1.append(
        "Ocupacion_Anterior",
        propietario_1.value.ocupacion
      );
    if (propietario_1.value.telefono != null)
      sustituirPropietario1.append(
        "Telefono_Anterior",
        propietario_1.value.telefono
      );
    if (propietario_1.value.correo != null)
      sustituirPropietario1.append(
        "Correo_Anterior",
        propietario_1.value.correo
      );
    sustituirPropietario1.append(
      "Pertenece_Grupo_Vulnerable_Anterior",
      propietario_1.value.pertenece_Grupo_Vulnerable
    );
    if (propietario_1.value.grupo_Vulnerable != null)
      sustituirPropietario1.append(
        "Grupo_Vulnerable_Anterior",
        propietario_1.value.grupo_Vulnerable
      );
    if (propietario_1.value.partido_Id != null)
      sustituirPropietario1.append(
        "Partido_Id_Anterior",
        propietario_1.value.partido_Id
      );
    if (sust_propietario_1.value.Nombres_Nuevo != null)
      sustituirPropietario1.append(
        "Nombres_Nuevo",
        sust_propietario_1.value.Nombres_Nuevo
      );
    if (sust_propietario_1.value.Apellido_Paterno_Nuevo != null)
      sustituirPropietario1.append(
        "Apellido_Paterno_Nuevo",
        sust_propietario_1.value.Apellido_Paterno_Nuevo
      );
    if (sust_propietario_1.value.Apellido_Materno_Nuevo != null)
      sustituirPropietario1.append(
        "Apellido_Materno_Nuevo",
        sust_propietario_1.value.Apellido_Materno_Nuevo
      );
    if (sust_propietario_1.value.Mote_Nuevo != null)
      sustituirPropietario1.append(
        "Mote_Nuevo",
        sust_propietario_1.value.Mote_Nuevo
      );
    if (sust_propietario_1.value.Sexo_Nuevo != null)
      sustituirPropietario1.append(
        "Sexo_Nuevo",
        sust_propietario_1.value.Sexo_Nuevo
      );
    if (sust_propietario_1.value.Clave_Elector_Nuevo != null)
      sustituirPropietario1.append(
        "Clave_Elector_Nuevo",
        sust_propietario_1.value.Clave_Elector_Nuevo
      );
    if (sust_propietario_1.value.RFC_Nuevo != null)
      sustituirPropietario1.append(
        "RFC_Nuevo",
        sust_propietario_1.value.RFC_Nuevo
      );
    if (sust_propietario_1.value.CURP_Nuevo != null)
      sustituirPropietario1.append(
        "CURP_Nuevo",
        sust_propietario_1.value.CURP_Nuevo
      );
    if (sust_propietario_1.value.Fecha_Nacimiento_Nuevo != null)
      sustituirPropietario1.append(
        "Fecha_Nacimiento_Nuevo",
        sust_propietario_1.value.Fecha_Nacimiento_Nuevo
      );
    if (sust_propietario_1.value.Ocupacion_Nuevo != null)
      sustituirPropietario1.append(
        "Ocupacion_Nuevo",
        sust_propietario_1.value.Ocupacion_Nuevo
      );
    if (sust_propietario_1.value.Telefono_Nuevo != null)
      sustituirPropietario1.append(
        "Telefono_Nuevo",
        sust_propietario_1.value.Telefono_Nuevo
      );
    if (sust_propietario_1.value.Correo_Nuevo != null)
      sustituirPropietario1.append(
        "Correo_Nuevo",
        sust_propietario_1.value.Correo_Nuevo
      );
    sustituirPropietario1.append(
      "Pertenece_Grupo_Vulnerable_Nuevo",
      sust_propietario_1.value.Pertenece_Grupo_Vulnerable_Nuevo
    );
    if (sust_propietario_1.value.Grupo_Vulnerable_Nuevo != null)
      sustituirPropietario1.append(
        "Grupo_Vulnerable_Nuevo",
        sust_propietario_1.value.Grupo_Vulnerable_Nuevo
      );
    if (sust_propietario_1.value.Partido_Id_Nuevo != null)
      sustituirPropietario1.append(
        "Partido_Id_Nuevo",
        sust_propietario_1.value.Partido_Id_Nuevo.value
      );
    if (sust_propietario_1.value.Foto_Nuevo != null)
      sustituirPropietario1.append(
        "Foto_Nuevo",
        sust_propietario_1.value.Foto_Nuevo
      );
    //-----------------------------------------------------------------
    sustituirSuplente1.append("Fecha_Sustitucion", date.value);
    sustituirSuplente1.append("Fecha_Registro", date.value);
    sustituirSuplente1.append("Tipo_Sustitucion", "Suplente 1");
    if (suplente_1.value.nombres != null)
      sustituirSuplente1.append("Nombres_Anterior", suplente_1.value.nombres);
    if (suplente_1.value.apellido_Paterno != null)
      sustituirSuplente1.append(
        "Apellido_Paterno_Anterior",
        suplente_1.value.apellido_Paterno
      );
    if (suplente_1.value.apellido_Materno != null)
      sustituirSuplente1.append(
        "Apellido_Materno_Anterior",
        suplente_1.value.apellido_Materno
      );
    if (suplente_1.value.mote != null)
      sustituirSuplente1.append("Mote_Anterior", suplente_1.value.mote);
    if (suplente_1.value.sexo != null)
      sustituirSuplente1.append("Sexo_Anterior", suplente_1.value.sexo);
    if (suplente_1.value.clave_Elector != null)
      sustituirSuplente1.append(
        "Clave_Elector_Anterior",
        suplente_1.value.clave_Elector
      );
    if (suplente_1.value.rfc != null)
      sustituirSuplente1.append("RFC_Anterior", suplente_1.value.rfc);
    if (suplente_1.value.curp != null)
      sustituirSuplente1.append("CURP_Anterior", suplente_1.value.curp);
    if (suplente_1.value.fecha_Nacimiento != null)
      sustituirSuplente1.append(
        "Fecha_Nacimiento_Anterior",
        suplente_1.value.fecha_Nacimiento
      );
    if (suplente_1.value.ocupacion != null)
      sustituirSuplente1.append(
        "Ocupacion_Anterior",
        suplente_1.value.ocupacion
      );
    if (suplente_1.value.telefono != null)
      sustituirSuplente1.append("Telefono_Anterior", suplente_1.value.telefono);
    if (suplente_1.value.correo != null)
      sustituirSuplente1.append("Correo_Anterior", suplente_1.value.correo);
    sustituirSuplente1.append(
      "Pertenece_Grupo_Vulnerable_Anterior",
      suplente_1.value.pertenece_Grupo_Vulnerable
    );
    if (suplente_1.value.grupo_Vulnerable != null)
      sustituirSuplente1.append(
        "Grupo_Vulnerable_Anterior",
        suplente_1.value.grupo_Vulnerable
      );
    if (suplente_1.value.partido_Id != null)
      sustituirSuplente1.append(
        "Partido_Id_Anterior",
        suplente_1.value.partido_Id
      );
    if (sust_suplente_1.value.Nombres_Nuevo != null)
      sustituirSuplente1.append(
        "Nombres_Nuevo",
        sust_suplente_1.value.Nombres_Nuevo
      );
    if (sust_suplente_1.value.Apellido_Paterno_Nuevo != null)
      sustituirSuplente1.append(
        "Apellido_Paterno_Nuevo",
        sust_suplente_1.value.Apellido_Paterno_Nuevo
      );
    if (sust_suplente_1.value.Apellido_Materno_Nuevo != null)
      sustituirSuplente1.append(
        "Apellido_Materno_Nuevo",
        sust_suplente_1.value.Apellido_Materno_Nuevo
      );
    if (sust_suplente_1.value.Mote_Nuevo != null)
      sustituirSuplente1.append("Mote_Nuevo", sust_suplente_1.value.Mote_Nuevo);
    if (sust_suplente_1.value.Sexo_Nuevo != null)
      sustituirSuplente1.append("Sexo_Nuevo", sust_suplente_1.value.Sexo_Nuevo);
    if (sust_suplente_1.value.Clave_Elector_Nuevo != null)
      sustituirSuplente1.append(
        "Clave_Elector_Nuevo",
        sust_suplente_1.value.Clave_Elector_Nuevo
      );
    if (sust_suplente_1.value.RFC_Nuevo != null)
      sustituirSuplente1.append("RFC_Nuevo", sust_suplente_1.value.RFC_Nuevo);
    if (sust_suplente_1.value.CURP_Nuevo != null)
      sustituirSuplente1.append("CURP_Nuevo", sust_suplente_1.value.CURP_Nuevo);
    if (sust_suplente_1.value.Fecha_Nacimiento_Nuevo != null)
      sustituirSuplente1.append(
        "Fecha_Nacimiento_Nuevo",
        sust_suplente_1.value.Fecha_Nacimiento_Nuevo
      );
    if (sust_suplente_1.value.Ocupacion_Nuevo != null)
      sustituirSuplente1.append(
        "Ocupacion_Nuevo",
        sust_suplente_1.value.Ocupacion_Nuevo
      );
    if (sust_suplente_1.value.Telefono_Nuevo != null)
      sustituirSuplente1.append(
        "Telefono_Nuevo",
        sust_suplente_1.value.Telefono_Nuevo
      );
    if (sust_suplente_1.value.Correo_Nuevo != null)
      sustituirSuplente1.append(
        "Correo_Nuevo",
        sust_suplente_1.value.Correo_Nuevo
      );
    sustituirSuplente1.append(
      "Pertenece_Grupo_Vulnerable_Nuevo",
      sust_suplente_1.value.Pertenece_Grupo_Vulnerable_Nuevo
    );
    if (sust_suplente_1.value.Grupo_Vulnerable_Nuevo != null)
      sustituirSuplente1.append(
        "Grupo_Vulnerable_Nuevo",
        sust_suplente_1.value.Grupo_Vulnerable_Nuevo
      );

    if (sust_suplente_1.value.Partido_Id_Nuevo != null)
      sustituirSuplente1.append(
        "Partido_Id_Nuevo",
        sust_suplente_1.value.Partido_Id_Nuevo.value
      );

    if (sust_suplente_1.value.Foto_Nuevo != null)
      sustituirSuplente1.append("Foto_Nuevo", sust_suplente_1.value.Foto_Nuevo);
    //-----------------------------------------------------------------
    sustituirPropietario2.append("Fecha_Sustitucion", date.value);
    sustituirPropietario2.append("Fecha_Registro", date.value);
    sustituirPropietario2.append("Tipo_Sustitucion", "Propietario 2");
    if (propietario_2.value.nombres != null)
      sustituirPropietario2.append(
        "Nombres_Anterior",
        propietario_2.value.nombres
      );
    if (propietario_2.value.apellido_Paterno != null)
      sustituirPropietario2.append(
        "Apellido_Paterno_Anterior",
        propietario_2.value.apellido_Paterno
      );
    if (propietario_2.value.apellido_Materno != null)
      sustituirPropietario2.append(
        "Apellido_Materno_Anterior",
        propietario_2.value.apellido_Materno
      );
    if (propietario_2.value.mote != null)
      sustituirPropietario2.append("Mote_Anterior", propietario_2.value.mote);
    if (propietario_2.value.sexo != null)
      sustituirPropietario2.append("Sexo_Anterior", propietario_2.value.sexo);
    if (propietario_2.value.clave_Elector != null)
      sustituirPropietario2.append(
        "Clave_Elector_Anterior",
        propietario_2.value.clave_Elector
      );
    if (propietario_2.value.rfc != null)
      sustituirPropietario2.append("RFC_Anterior", propietario_2.value.rfc);
    if (propietario_2.value.curp != null)
      sustituirPropietario2.append("CURP_Anterior", propietario_2.value.curp);
    if (propietario_2.value.fecha_Nacimiento != null)
      sustituirPropietario2.append(
        "Fecha_Nacimiento_Anterior",
        propietario_2.value.fecha_Nacimiento
      );
    if (propietario_2.value.ocupacion != null)
      sustituirPropietario2.append(
        "Ocupacion_Anterior",
        propietario_2.value.ocupacion
      );
    if (propietario_2.value.telefono != null)
      sustituirPropietario2.append(
        "Telefono_Anterior",
        propietario_2.value.telefono
      );
    if (propietario_2.value.correo != null)
      sustituirPropietario2.append(
        "Correo_Anterior",
        propietario_2.value.correo
      );
    sustituirPropietario2.append(
      "Pertenece_Grupo_Vulnerable_Anterior",
      propietario_2.value.pertenece_Grupo_Vulnerable
    );
    if (propietario_2.value.grupo_Vulnerable != null)
      sustituirPropietario2.append(
        "Grupo_Vulnerable_Anterior",
        propietario_2.value.grupo_Vulnerable
      );
    if (propietario_2.value.partido_Id != null)
      sustituirPropietario2.append(
        "Partido_Id_Anterior",
        propietario_2.value.partido_Id
      );
    if (sust_propietario_2.value.Nombres_Nuevo != null)
      sustituirPropietario2.append(
        "Nombres_Nuevo",
        sust_propietario_2.value.Nombres_Nuevo
      );
    if (sust_propietario_2.value.Apellido_Paterno_Nuevo != null)
      sustituirPropietario2.append(
        "Apellido_Paterno_Nuevo",
        sust_propietario_2.value.Apellido_Paterno_Nuevo
      );
    if (sust_propietario_2.value.Apellido_Materno_Nuevo != null)
      sustituirPropietario2.append(
        "Apellido_Materno_Nuevo",
        sust_propietario_2.value.Apellido_Materno_Nuevo
      );
    if (sust_propietario_2.value.Mote_Nuevo != null)
      sustituirPropietario2.append(
        "Mote_Nuevo",
        sust_propietario_2.value.Mote_Nuevo
      );
    if (sust_propietario_2.value.Sexo_Nuevo != null)
      sustituirPropietario2.append(
        "Sexo_Nuevo",
        sust_propietario_2.value.Sexo_Nuevo
      );
    if (sust_propietario_2.value.Clave_Elector_Nuevo != null)
      sustituirPropietario2.append(
        "Clave_Elector_Nuevo",
        sust_propietario_2.value.Clave_Elector_Nuevo
      );
    if (sust_propietario_2.value.RFC_Nuevo != null)
      sustituirPropietario2.append(
        "RFC_Nuevo",
        sust_propietario_2.value.RFC_Nuevo
      );
    if (sust_propietario_2.value.CURP_Nuevo != null)
      sustituirPropietario2.append(
        "CURP_Nuevo",
        sust_propietario_2.value.CURP_Nuevo
      );
    if (sust_propietario_2.value.Fecha_Nacimiento_Nuevo != null)
      sustituirPropietario2.append(
        "Fecha_Nacimiento_Nuevo",
        sust_propietario_2.value.Fecha_Nacimiento_Nuevo
      );
    if (sust_propietario_2.value.Ocupacion_Nuevo != null)
      sustituirPropietario2.append(
        "Ocupacion_Nuevo",
        sust_propietario_2.value.Ocupacion_Nuevo
      );
    if (sust_propietario_2.value.Telefono_Nuevo != null)
      sustituirPropietario2.append(
        "Telefono_Nuevo",
        sust_propietario_2.value.Telefono_Nuevo
      );
    if (sust_propietario_2.value.Correo_Nuevo != null)
      sustituirPropietario2.append(
        "Correo_Nuevo",
        sust_propietario_2.value.Correo_Nuevo
      );
    sustituirPropietario2.append(
      "Pertenece_Grupo_Vulnerable_Nuevo",
      sust_propietario_2.value.Pertenece_Grupo_Vulnerable_Nuevo
    );
    if (sust_propietario_2.value.Grupo_Vulnerable_Nuevo != null)
      sustituirPropietario2.append(
        "Grupo_Vulnerable_Nuevo",
        sust_propietario_2.value.Grupo_Vulnerable_Nuevo
      );
    if (sust_propietario_2.value.Partido_Id_Nuevo != null)
      sustituirPropietario2.append(
        "Partido_Id_Nuevo",
        sust_propietario_2.value.Partido_Id_Nuevo.value
      );
    if (sust_propietario_2.value.Foto_Nuevo != null)
      sustituirPropietario2.append(
        "Foto_Nuevo",
        sust_propietario_2.value.Foto_Nuevo
      );
    //-----------------------------------------------------------------
    sustituirSuplente2.append("Fecha_Sustitucion", date.value);
    sustituirSuplente2.append("Fecha_Registro", date.value);
    sustituirSuplente2.append("Tipo_Sustitucion", "Suplente 2");
    if (suplente_2.value.nombres != null)
      sustituirSuplente2.append("Nombres_Anterior", suplente_2.value.nombres);
    if (suplente_2.value.apellido_Paterno != null)
      sustituirSuplente2.append(
        "Apellido_Paterno_Anterior",
        suplente_2.value.apellido_Paterno
      );
    if (suplente_2.value.apellido_Materno != null)
      sustituirSuplente2.append(
        "Apellido_Materno_Anterior",
        suplente_2.value.apellido_Materno
      );
    if (suplente_2.value.mote != null)
      sustituirSuplente2.append("Mote_Anterior", suplente_2.value.mote);
    if (suplente_2.value.sexo != null)
      sustituirSuplente2.append("Sexo_Anterior", suplente_2.value.sexo);
    if (suplente_2.value.clave_Elector != null)
      sustituirSuplente2.append(
        "Clave_Elector_Anterior",
        suplente_2.value.clave_Elector
      );
    if (suplente_2.value.rfc != null)
      sustituirSuplente2.append("RFC_Anterior", suplente_2.value.rfc);
    if (suplente_2.value.curp != null)
      sustituirSuplente2.append("CURP_Anterior", suplente_2.value.curp);
    if (suplente_2.value.fecha_Nacimiento != null)
      sustituirSuplente2.append(
        "Fecha_Nacimiento_Anterior",
        suplente_2.value.fecha_Nacimiento
      );
    if (suplente_2.value.ocupacion != null)
      sustituirSuplente2.append(
        "Ocupacion_Anterior",
        suplente_2.value.ocupacion
      );
    if (suplente_2.value.telefono != null)
      sustituirSuplente2.append("Telefono_Anterior", suplente_2.value.telefono);
    if (suplente_2.value.correo != null)
      sustituirSuplente2.append("Correo_Anterior", suplente_2.value.correo);
    sustituirSuplente2.append(
      "Pertenece_Grupo_Vulnerable_Anterior",
      suplente_2.value.pertenece_Grupo_Vulnerable
    );
    if (suplente_2.value.grupo_Vulnerable != null)
      sustituirSuplente2.append(
        "Grupo_Vulnerable_Anterior",
        suplente_2.value.grupo_Vulnerable
      );
    if (suplente_2.value.partido_Id != null)
      sustituirSuplente2.append(
        "Partido_Id_Anterior",
        suplente_2.value.partido_Id
      );
    if (sust_suplente_2.value.Nombres_Nuevo != null)
      sustituirSuplente2.append(
        "Nombres_Nuevo",
        sust_suplente_2.value.Nombres_Nuevo
      );
    if (sust_suplente_2.value.Apellido_Paterno_Nuevo != null)
      sustituirSuplente2.append(
        "Apellido_Paterno_Nuevo",
        sust_suplente_2.value.Apellido_Paterno_Nuevo
      );
    if (sust_suplente_2.value.Apellido_Materno_Nuevo != null)
      sustituirSuplente2.append(
        "Apellido_Materno_Nuevo",
        sust_suplente_2.value.Apellido_Materno_Nuevo
      );
    if (sust_suplente_2.value.Mote_Nuevo != null)
      sustituirSuplente2.append("Mote_Nuevo", sust_suplente_2.value.Mote_Nuevo);
    if (sust_suplente_2.value.Sexo_Nuevo != null)
      sustituirSuplente2.append("Sexo_Nuevo", sust_suplente_2.value.Sexo_Nuevo);
    if (sust_suplente_2.value.Clave_Elector_Nuevo != null)
      sustituirSuplente2.append(
        "Clave_Elector_Nuevo",
        sust_suplente_2.value.Clave_Elector_Nuevo
      );
    if (sust_suplente_2.value.RFC_Nuevo != null)
      sustituirSuplente2.append("RFC_Nuevo", sust_suplente_2.value.RFC_Nuevo);
    if (sust_suplente_2.value.CURP_Nuevo != null)
      sustituirSuplente2.append("CURP_Nuevo", sust_suplente_2.value.CURP_Nuevo);
    if (sust_suplente_2.value.Fecha_Nacimiento_Nuevo != null)
      sustituirSuplente2.append(
        "Fecha_Nacimiento_Nuevo",
        sust_suplente_2.value.Fecha_Nacimiento_Nuevo
      );
    if (sust_suplente_2.value.Ocupacion_Nuevo != null)
      sustituirSuplente2.append(
        "Ocupacion_Nuevo",
        sust_suplente_2.value.Ocupacion_Nuevo
      );
    if (sust_suplente_2.value.Telefono_Nuevo != null)
      sustituirSuplente2.append(
        "Telefono_Nuevo",
        sust_suplente_2.value.Telefono_Nuevo
      );
    if (sust_suplente_2.value.Correo_Nuevo != null)
      sustituirSuplente2.append(
        "Correo_Nuevo",
        sust_suplente_2.value.Correo_Nuevo
      );
    sustituirSuplente2.append(
      "Pertenece_Grupo_Vulnerable_Nuevo",
      sust_suplente_2.value.Pertenece_Grupo_Vulnerable_Nuevo
    );
    if (sust_suplente_2.value.Grupo_Vulnerable_Nuevo != null)
      sustituirSuplente2.append(
        "Grupo_Vulnerable_Nuevo",
        sust_suplente_2.value.Grupo_Vulnerable_Nuevo
      );
    if (sust_suplente_2.value.Partido_Id_Nuevo != null)
      sustituirSuplente2.append(
        "Partido_Id_Nuevo",
        sust_suplente_2.value.Partido_Id_Nuevo.value
      );
    if (sust_suplente_2.value.Foto_Nuevo != null)
      sustituirSuplente2.append("Foto_Nuevo", sust_suplente_2.value.Foto_Nuevo);
  }
  if (sustitucion.value.No_Acuerdo != null)
    sustituirFormData.append("No_Acuerdo", sustitucion.value.No_Acuerdo);
  sustituirFormData.append("Fecha_Sustitucion", date.value);
  sustituirFormData.append("Fecha_Registro", date.value);

  let resp = null;
  $q.loading.show();

  if (sustituirPor.value != "Fórmula") {
    resp = await sustituirStore.sustituirCandidato(
      candidato.value.id,
      sustituirFormData
    );
  } else {
    if (props.tab == "DIP") {
      resp = await sustituirStore.sustituirCandidato(
        candidato.value.id,
        sustituirPropietario1
      );
      resp = await sustituirStore.sustituirCandidato(
        candidato.value.id,
        sustituirSuplente1
      );
    } else if (props.tab == "PYS") {
      resp = await sustituirStore.sustituirCandidato(
        candidato.value.id,
        sustituirPropietario1
      );
      resp = await sustituirStore.sustituirCandidato(
        candidato.value.id,
        sustituirSuplente1
      );
      resp = await sustituirStore.sustituirCandidato(
        candidato.value.id,
        sustituirPropietario2
      );
      resp = await sustituirStore.sustituirCandidato(
        candidato.value.id,
        sustituirSuplente2
      );
    } else if (props.tab == "REG") {
      resp = await sustituirStore.sustituirCandidato(
        candidato.value.id,
        sustituirPropietario1
      );
      resp = await sustituirStore.sustituirCandidato(
        candidato.value.id,
        sustituirSuplente1
      );
    } else if (props.tab == "GUB") {
      resp = await sustituirStore.sustituirCandidato(
        candidato.value.id,
        sustituirPropietario1
      );
    }
  }
  if (resp.success) {
    $q.notify({
      position: "top-right",
      type: "positive",
      message: resp.data,
    });
    candidatoStore.loadCandidatos();
    actualizarModal(false);
  } else {
    $q.notify({
      position: "top-right",
      type: "negative",
      message: resp.data,
    });
  }
  $q.loading.hide();
};

const validarFormula = async () => {
  if (
    sust_propietario_1.value.Nombres_Nuevo == null ||
    sust_propietario_1.value.Apellido_Materno_Nuevo == null ||
    sust_propietario_1.value.Apellido_Paterno_Nuevo == null ||
    sust_propietario_1.value.Sexo_Nuevo == null ||
    sust_propietario_1.value.Clave_Elector_Nuevo == null ||
    sust_propietario_1.value.RFC_Nuevo == null ||
    sust_propietario_1.value.CURP_Nuevo == null ||
    sust_propietario_1.value.Fecha_Nacimiento_Nuevo == null ||
    sust_propietario_1.value.Telefono_Nuevo == null ||
    sust_propietario_1.value.Correo_Nuevo == null ||
    sust_propietario_1.value.Partido_Id_Nuevo == null
  ) {
    $q.dialog({
      title: "Campos vacios",
      message: "Se borrarán las anteriores",
      icon: "Warning",
      persistent: true,
      transitionShow: "scale",
      transitionHide: "scale",
      ok: {
        color: "positive",
        label: "¡Sí!, generar",
      },
      cancel: {
        color: "negative",
        label: " No Cancelar",
      },
    });
  }
};
</script>

<style></style>
