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
      <q-card-section v-if="sustituirPor == null">
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
          <div
            :class="$q.screen.xs ? '' : 'row'"
            v-if="sustituirPor == 'Fórmula'"
          >
            <q-card
              v-for="candidato in list_Suplentes"
              :key="candidato"
              class="col-3 no-shadow"
              bordered
            >
              <q-item>
                <q-item-section avatar>
                  <q-avatar size="70px" v-if="candidato.url_Foto != null">
                    <img :src="candidato.url_Foto" />
                  </q-avatar>
                  <q-avatar size="70px" v-else>
                    <q-img
                      v-if="candidato.sexo == 'Mujer'"
                      src="../../../assets/avatarmujer.jpg"
                    />
                    <q-img
                      v-if="candidato.sexo == 'Hombre'"
                      src="../../../assets/avatarHombre.jpg"
                    />
                    <q-img
                      v-if="candidato.sexo == 'No binario'"
                      src="../../../assets/noBinario.png"
                    />
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
                  <q-avatar size="70px" v-if="candidato2.url_Foto != null">
                    <img :src="candidato2.url_Foto" />
                  </q-avatar>
                  <q-avatar size="70px" v-else>
                    <q-img
                      v-if="candidato2.sexo == 'Mujer'"
                      src="../../../assets/avatarmujer.jpg"
                    />
                    <q-img
                      v-if="candidato2.sexo == 'Hombre'"
                      src="../../../assets/avatarHombre.jpg"
                    />
                    <q-img
                      v-if="candidato2.sexo == 'No binario'"
                      src="../../../assets/noBinario.png"
                    />
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
                name="Propietario"
                label="Propietario"
              />
              <q-tab
                v-if="props.tab != 'GUB'"
                class="text-blue-grey"
                name="Suplente"
                label="Suplente"
              />
              <q-tab
                v-if="props.tab == 'PYS'"
                class="text-blue-grey"
                name="Propietario sindico"
                label="Sindico propietario"
              />
              <q-tab
                v-if="props.tab == 'PYS'"
                class="text-blue-grey"
                name="Suplente sindico"
                label="Sindico suplente"
              />
            </q-tabs>
            <q-tab-panels
              v-model="tabTab"
              animated
              class="shadow-2 rounded-borders"
            >
              <!--PROPIETARIO-->
              <q-tab-panel name="Propietario">
                <q-list bordered class="rounded-borders col-12">
                  <q-expansion-item
                    expand-icon-class="text-white"
                    header-class="bg-blue-grey-4 text-white text-subtitle1 text-bold"
                    v-model="expansion"
                    @show="expansion2 = false"
                    @hide="expansion2 = true"
                    expand-separator
                    icon="person"
                    label="Datos generales"
                  >
                    <SustituirCandidato
                      :tipo_Eleccion="props.tab"
                      :rp="candidato.tipo_Candidato == 'RP' ? true : false"
                      :tabTipo="tabTab"
                    />
                  </q-expansion-item>
                </q-list>
              </q-tab-panel>
              <!--SUPLENTE-->
              <q-tab-panel name="Suplente" class="row">
                <q-list bordered class="rounded-borders col-12">
                  <q-expansion-item
                    expand-icon-class="text-white"
                    header-class="bg-blue-grey-4 text-white text-subtitle1 text-bold"
                    v-model="expansion"
                    @show="expansion2 = false"
                    @hide="expansion2 = true"
                    expand-separator
                    icon="person"
                    label="Datos generales"
                  >
                    <SustituirCandidato
                      :tipo_Eleccion="props.tab"
                      :rp="candidato.tipo_Candidato == 'RP' ? true : false"
                      :tabTipo="tabTab"
                    />
                  </q-expansion-item>
                </q-list>
              </q-tab-panel>
              <!--SINDICO PROPIETARIO-->
              <q-tab-panel name="Propietario sindico" class="row">
                <q-list bordered class="rounded-borders col-12">
                  <q-expansion-item
                    expand-icon-class="text-white"
                    header-class="bg-blue-grey-4 text-white text-subtitle1 text-bold"
                    v-model="expansion"
                    @show="expansion2 = false"
                    @hide="expansion2 = true"
                    expand-separator
                    icon="person"
                    label="Datos generales"
                  >
                    <SustituirCandidato
                      :tipo_Eleccion="props.tab"
                      :rp="candidato.tipo_Candidato == 'RP' ? true : false"
                      :tabTipo="tabTab"
                    />
                  </q-expansion-item>
                </q-list>
              </q-tab-panel>
              <!--SINDICO SUPLENTE-->
              <q-tab-panel name="Suplente sindico" class="row">
                <q-list bordered class="rounded-borders col-12">
                  <q-expansion-item
                    expand-icon-class="text-white"
                    header-class="bg-blue-grey-4 text-white text-subtitle1 text-bold"
                    v-model="expansion"
                    @show="expansion2 = false"
                    @hide="expansion2 = true"
                    expand-separator
                    icon="person"
                    label="Datos generales"
                  >
                    <SustituirCandidato
                      :tipo_Eleccion="props.tab"
                      :rp="candidato.tipo_Candidato == 'RP' ? true : false"
                      :tabTipo="tabTab"
                    />
                  </q-expansion-item>
                </q-list>
              </q-tab-panel>
            </q-tab-panels>
          </div>
          <q-card
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
            <q-expansion-item
              expand-icon-class="text-white"
              header-class="bg-blue-grey-4 text-white text-subtitle1 text-bold"
              v-model="expansion"
              @show="expansion2 = false"
              @hide="expansion2 = true"
              expand-separator
              icon="person"
              label="Datos generales"
            >
              <SustituirCandidato
                :tipo_Eleccion="props.tab"
                :rp="candidato.tipo_Candidato == 'RP' ? true : false"
                :tabTipo="sustituirPor"
              />
            </q-expansion-item>
          </q-card>
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
import { useQuasar, date } from "quasar";
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
const tabTab = ref("Propietario");
const options = ref(["Fórmula", "Propietario", "Suplente"]);
const expansion = ref(true);
const expansion2 = ref(false);
const timeStamp = Date.now();
const dateActual = ref(date.formatDate(timeStamp, "YYYY-MM-DD HH:mm"));
const props = defineProps({
  tab: { type: String, required: true },
  tipo_Id: { type: Number, required: true },
});

//--------------------------------------------------------------------

watch(sustituirPor, (val) => {
  if (val != null) {
    if (val == "Fórmula") {
      candidatoStore.loadCandidatoToArray(props.tab, candidato.value.id);
      candidatoStore.loadCandidatoByCargo("Propietario", candidato.value.id);
    } else {
      candidatoStore.loadCandidatoByCargo(val, candidato.value.id);
    }
  }
});

//--------------------------------------------------------------------

const actualizarModal = (valor) => {
  $q.loading.show();
  sustituirPor.value = null;
  candidatoStore.actualizarModalSustituir(valor);
  sustituirStore.initSustituir();
  candidatoStore.initCandidato();
  candidatoStore.initCandidato2();
  $q.loading.hide();
};

const onSubmit = async () => {
  let validarPropietario = false;
  if (sustituirPor.value == "Fórmula") {
    if (
      sust_propietario_1.value.Nombres_Nuevo != null &&
      (sust_propietario_1.value.Apellido_Paterno_Nuevo == null ||
        sust_propietario_1.value.Sexo_Nuevo == null ||
        sust_propietario_1.value.Edad_Nuevo == null ||
        sust_propietario_1.value.Clave_Elector_Nuevo == null ||
        sust_propietario_1.value.RFC_Nuevo == null ||
        sust_propietario_1.value.CURP_Nuevo == null ||
        sust_propietario_1.value.Fecha_Nacimiento_Nuevo == null ||
        sust_propietario_1.value.Correo_Nuevo == null ||
        sust_propietario_1.value.escrito_Url == null)
    ) {
      $q.notify({
        position: "center",
        type: "negative",
        message:
          "Es obligatorio registrar la información completa de la candidatura propietaria",
      });
      validarPropietario = false;
    } else if (
      sust_propietario_2.value.Nombres_Nuevo != null &&
      (sust_propietario_2.value.Apellido_Paterno_Nuevo == null ||
        sust_propietario_2.value.Sexo_Nuevo == null ||
        sust_propietario_2.value.Edad_Nuevo == null ||
        sust_propietario_2.value.Clave_Elector_Nuevo == null ||
        sust_propietario_2.value.RFC_Nuevo == null ||
        sust_propietario_2.value.CURP_Nuevo == null ||
        sust_propietario_2.value.Fecha_Nacimiento_Nuevo == null ||
        sust_propietario_2.value.Correo_Nuevo == null ||
        sust_propietario_2.value.escrito_Url == null)
    ) {
      $q.notify({
        position: "center",
        type: "negative",
        message:
          "Es obligatorio registrar la información completa de la candidatura sindica propietaria",
      });
      validarPropietario = false;
    } else if (
      sust_suplente_1.value.Nombres_Nuevo != null &&
      (sust_suplente_1.value.Apellido_Paterno_Nuevo == null ||
        sust_suplente_1.value.Sexo_Nuevo == null ||
        sust_suplente_1.value.Edad_Nuevo == null ||
        sust_suplente_1.value.Clave_Elector_Nuevo == null ||
        sust_suplente_1.value.RFC_Nuevo == null ||
        sust_suplente_1.value.CURP_Nuevo == null ||
        sust_suplente_1.value.Fecha_Nacimiento_Nuevo == null ||
        sust_suplente_1.value.Correo_Nuevo == null ||
        sust_suplente_1.value.escrito_Url == null)
    ) {
      $q.notify({
        position: "center",
        type: "negative",
        message:
          "Es obligatorio registrar la información completa de la candidatura suplente",
      });
      validarPropietario = false;
    } else if (
      sust_suplente_2.value.Nombres_Nuevo != null &&
      (sust_suplente_2.value.Apellido_Paterno_Nuevo == null ||
        sust_suplente_2.value.Sexo_Nuevo == null ||
        sust_suplente_2.value.Edad_Nuevo == null ||
        sust_suplente_2.value.Clave_Elector_Nuevo == null ||
        sust_suplente_2.value.RFC_Nuevo == null ||
        sust_suplente_2.value.CURP_Nuevo == null ||
        sust_suplente_2.value.Fecha_Nacimiento_Nuevo == null ||
        sust_suplente_2.value.Correo_Nuevo == null ||
        sust_suplente_2.value.escrito_Url == null)
    ) {
      $q.notify({
        position: "center",
        type: "negative",
        message:
          "Es obligatorio registrar la información completa de la candidatura sindica suplente",
      });
      validarPropietario = false;
    } else {
      validarPropietario = true;
    }
  } else {
    validarPropietario = true;
  }
  if (validarPropietario == true) {
    let claveCurp = await validarClaveCurp();
    if (claveCurp == false) {
      $q.dialog({
        title: "Atención",
        message: "¿Está seguro de realizar la sustitución?",
        icon: "Warning",
        persistent: true,
        transitionShow: "scale",
        transitionHide: "scale",
        ok: {
          color: "positive",
          label: "¡Sí!, guardar",
        },
        cancel: {
          color: "negative",
          label: " No, cerrar",
        },
      })
        .onOk(async () => {
          let faltante = false;
          let sustituirFormData = new FormData();
          let sustituirPropietario1 = new FormData();
          let sustituirSuplente1 = new FormData();
          let sustituirPropietario2 = new FormData();
          let sustituirSuplente2 = new FormData();
          if (sustituirPor.value == "Propietario") {
            sustituirFormData.append("Tipo_Cargo", 0);
            sustituirFormData.append("Tipo_Sustitucion", "Propietario 1");
            sustituirFormData.append(
              "Tipo_Candidato",
              candidato.value.tipo_Candidato
            );
            if (propietario_1.value.edad != null)
              sustituirFormData.append(
                "Edad_Anterior",
                propietario_1.value.edad
              );
            if (propietario_1.value.acuse_URL != null)
              sustituirFormData.append(
                "Acuse_Candidato_URL_Anterior",
                propietario_1.value.acuse_URL
              );
            if (propietario_1.value.consentimiento_URL != null)
              sustituirFormData.append(
                "Consentimiento_Candidato_URL_Anterior",
                propietario_1.value.consentimiento_URL
              );
            if (propietario_1.value.url_Foto != null)
              sustituirFormData.append(
                "Foto_Anterior",
                propietario_1.value.url_Foto
              );
            if (propietario_1.value.nombres != null)
              sustituirFormData.append(
                "Nombres_Anterior",
                propietario_1.value.nombres.toUpperCase()
              );
            if (propietario_1.value.apellido_Paterno != null)
              sustituirFormData.append(
                "Apellido_Paterno_Anterior",
                propietario_1.value.apellido_Paterno
              );
            if (propietario_1.value.apellido_Materno != null)
              sustituirFormData.append(
                "Apellido_Materno_Anterior",
                propietario_1.value.apellido_Materno.toUpperCase()
              );
            if (propietario_1.value.mote != null)
              sustituirFormData.append(
                "Mote_Anterior",
                propietario_1.value.mote
              );
            if (propietario_1.value.sexo != null)
              sustituirFormData.append(
                "Sexo_Anterior",
                propietario_1.value.sexo
              );
            if (propietario_1.value.clave_Elector != null)
              sustituirFormData.append(
                "Clave_Elector_Anterior",
                propietario_1.value.clave_Elector.toUpperCase()
              );
            if (propietario_1.value.rfc != null)
              sustituirFormData.append(
                "RFC_Anterior",
                propietario_1.value.rfc.toUpperCase()
              );
            if (propietario_1.value.curp != null)
              sustituirFormData.append(
                "CURP_Anterior",
                propietario_1.value.curp.toUpperCase()
              );
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
              sustituirFormData.append(
                "Correo_Anterior",
                propietario_1.value.correo.toLowerCase()
              );
            if (propietario_1.value.pertenece_Grupo_Vulnerable != null)
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
                sust_propietario_1.value.Nombres_Nuevo.toUpperCase()
              );
            if (sust_propietario_1.value.Apellido_Paterno_Nuevo != null)
              sustituirFormData.append(
                "Apellido_Paterno_Nuevo",
                sust_propietario_1.value.Apellido_Paterno_Nuevo.toUpperCase()
              );
            if (sust_propietario_1.value.Apellido_Materno_Nuevo != null)
              sustituirFormData.append(
                "Apellido_Materno_Nuevo",
                sust_propietario_1.value.Apellido_Materno_Nuevo.toUpperCase()
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
                sust_propietario_1.value.Clave_Elector_Nuevo.toUpperCase()
              );
            if (sust_propietario_1.value.RFC_Nuevo != null)
              sustituirFormData.append(
                "RFC_Nuevo",
                sust_propietario_1.value.RFC_Nuevo.toUpperCase()
              );
            if (sust_propietario_1.value.CURP_Nuevo != null)
              sustituirFormData.append(
                "CURP_Nuevo",
                sust_propietario_1.value.CURP_Nuevo.toUpperCase()
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
                sust_propietario_1.value.Correo_Nuevo.toLowerCase()
              );

            if (
              sust_propietario_1.value.Pertenece_Grupo_Vulnerable_Nuevo == true
            ) {
              sustituirFormData.append(
                "Pertenece_Grupo_Vulnerable_Nuevo",
                sust_propietario_1.value.Pertenece_Grupo_Vulnerable_Nuevo
              );
              const grupos = `${sust_propietario_1.value.grupo_Vulnerable_1}|${
                sust_propietario_1.value.grupo_Vulnerable_1 == true
                  ? sust_propietario_1.value.describir_Pueblos
                  : "-"
              }`.concat(
                `||${sust_propietario_1.value.grupo_Vulnerable_2}|${
                  sust_propietario_1.value.grupo_Vulnerable_2 == true
                    ? sust_propietario_1.value.describir_Diversidad
                    : "-"
                }||${sust_propietario_1.value.grupo_Vulnerable_3}|${
                  sust_propietario_1.value.grupo_Vulnerable_3 == true
                    ? sust_propietario_1.value.describir_Discapacidad
                    : "-"
                }||${sust_propietario_1.value.grupo_Vulnerable_4}|${
                  sust_propietario_1.value.grupo_Vulnerable_4 == true
                    ? sust_propietario_1.value.describir_Migrante
                    : "-"
                }`
              );
              sustituirFormData.append("Grupo_Vulnerable_Nuevo", grupos);
            } else {
              sustituirFormData.append(
                "Pertenece_Grupo_Vulnerable_Nuevo",
                false
              );
              sustituirFormData.append("Grupo_Vulnerable_Nuevo", "");
            }

            if (candidato.value.postulacion == "Partido político") {
              sustituirFormData.append(
                "Partido_Id_Nuevo",
                propietario_1.value.partido_Id
              );
            } else {
              if (sust_propietario_1.value.Partido_Id_Nuevo != null)
                sustituirFormData.append(
                  "Partido_Id_Nuevo",
                  sust_propietario_1.value.Partido_Id_Nuevo.value
                );
            }

            if (sust_propietario_1.value.Foto_Nuevo != null)
              sustituirFormData.append(
                "Foto_Nuevo",
                sust_propietario_1.value.Foto_Nuevo
              );

            if (sust_propietario_1.value.Edad_Nuevo != null)
              sustituirFormData.append(
                "Edad",
                sust_propietario_1.value.Edad_Nuevo
              );
            if (sust_propietario_1.value.escrito_Url != null)
              sustituirFormData.append(
                "Escrito_Sustitucion",
                sust_propietario_1.value.escrito_Url
              );
          } else if (sustituirPor.value == "Suplente") {
            sustituirFormData.append("Tipo_Cargo", 1);
            sustituirFormData.append(
              "Tipo_Candidato",
              candidato.value.tipo_Candidato
            );
            sustituirFormData.append("Tipo_Sustitucion", "Suplente 1");
            if (suplente_1.value.edad != null)
              sustituirFormData.append("Edad_Anterior", suplente_1.value.edad);
            if (suplente_1.value.acuse_URL != null)
              sustituirFormData.append(
                "Acuse_Candidato_URL_Anterior",
                suplente_1.value.acuse_URL
              );
            if (suplente_1.value.acuse_URL != null)
              sustituirFormData.append(
                "Consentimiento_Candidato_URL_Anterior",
                suplente_1.value.consentimiento_URL
              );
            if (suplente_1.value.url_Foto != null)
              sustituirFormData.append(
                "Foto_Anterior",
                suplente_1.value.url_Foto
              );
            if (suplente_1.value.nombres != null)
              sustituirFormData.append(
                "Nombres_Anterior",
                suplente_1.value.nombres.toUpperCase()
              );
            if (suplente_1.value.apellido_Paterno != null)
              sustituirFormData.append(
                "Apellido_Paterno_Anterior",
                suplente_1.value.apellido_Paterno.toUpperCase()
              );
            if (suplente_1.value.apellido_Materno != null)
              sustituirFormData.append(
                "Apellido_Materno_Anterior",
                suplente_1.value.apellido_Materno.toUpperCase()
              );
            if (suplente_1.value.mote != null)
              sustituirFormData.append("Mote_Anterior", suplente_1.value.mote);
            if (suplente_1.value.sexo != null)
              sustituirFormData.append("Sexo_Anterior", suplente_1.value.sexo);
            if (suplente_1.value.clave_Elector != null)
              sustituirFormData.append(
                "Clave_Elector_Anterior",
                suplente_1.value.clave_Elector.toUpperCase()
              );
            if (suplente_1.value.rfc != null)
              sustituirFormData.append(
                "RFC_Anterior",
                suplente_1.value.rfc.toUpperCase()
              );
            if (suplente_1.value.curp != null)
              sustituirFormData.append(
                "CURP_Anterior",
                suplente_1.value.curp.toUpperCase()
              );
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
              sustituirFormData.append(
                "Telefono_Anterior",
                suplente_1.value.telefono
              );
            if (suplente_1.value.correo != null)
              sustituirFormData.append(
                "Correo_Anterior",
                suplente_1.value.correo.toLowerCase()
              );
            if (suplente_1.value.pertenece_Grupo_Vulnerable != null)
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
                sust_suplente_1.value.Nombres_Nuevo.toUpperCase()
              );
            if (sust_suplente_1.value.Apellido_Paterno_Nuevo != null)
              sustituirFormData.append(
                "Apellido_Paterno_Nuevo",
                sust_suplente_1.value.Apellido_Paterno_Nuevo.toUpperCase()
              );
            if (sust_suplente_1.value.Apellido_Materno_Nuevo != null)
              sustituirFormData.append(
                "Apellido_Materno_Nuevo",
                sust_suplente_1.value.Apellido_Materno_Nuevo.toUpperCase()
              );
            if (sust_suplente_1.value.Mote_Nuevo != null)
              sustituirFormData.append(
                "Mote_Nuevo",
                sust_suplente_1.value.Mote_Nuevo
              );
            if (sust_suplente_1.value.Sexo_Nuevo != null)
              sustituirFormData.append(
                "Sexo_Nuevo",
                sust_suplente_1.value.Sexo_Nuevo
              );
            if (sust_suplente_1.value.Clave_Elector_Nuevo != null)
              sustituirFormData.append(
                "Clave_Elector_Nuevo",
                sust_suplente_1.value.Clave_Elector_Nuevo.toUpperCase()
              );
            if (sust_suplente_1.value.RFC_Nuevo != null)
              sustituirFormData.append(
                "RFC_Nuevo",
                sust_suplente_1.value.RFC_Nuevo.toUpperCase()
              );
            if (sust_suplente_1.value.CURP_Nuevo != null)
              sustituirFormData.append(
                "CURP_Nuevo",
                sust_suplente_1.value.CURP_Nuevo.toUpperCase()
              );
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
                sust_suplente_1.value.Correo_Nuevo.toLowerCase()
              );
            if (
              sust_suplente_1.value.Pertenece_Grupo_Vulnerable_Nuevo == true
            ) {
              sustituirFormData.append(
                "Pertenece_Grupo_Vulnerable_Nuevo",
                sust_suplente_1.value.Pertenece_Grupo_Vulnerable_Nuevo
              );
              const grupos = `${sust_suplente_1.value.grupo_Vulnerable_1}|${
                sust_suplente_1.value.grupo_Vulnerable_1 == true
                  ? sust_suplente_1.value.describir_Pueblos
                  : "-"
              }`.concat(
                `||${sust_suplente_1.value.grupo_Vulnerable_2}|${
                  sust_suplente_1.value.grupo_Vulnerable_2 == true
                    ? sust_suplente_1.value.describir_Diversidad
                    : "-"
                }||${sust_suplente_1.value.grupo_Vulnerable_3}|${
                  sust_suplente_1.value.grupo_Vulnerable_3 == true
                    ? sust_suplente_1.value.describir_Discapacidad
                    : "-"
                }||${sust_suplente_1.value.grupo_Vulnerable_4}|${
                  sust_suplente_1.value.grupo_Vulnerable_4 == true
                    ? sust_suplente_1.value.describir_Migrante
                    : "-"
                }`
              );
              sustituirFormData.append("Grupo_Vulnerable_Nuevo", grupos);
            } else {
              sustituirFormData.append(
                "Pertenece_Grupo_Vulnerable_Nuevo",
                false
              );
              sustituirFormData.append("Grupo_Vulnerable_Nuevo", "");
            }

            if (candidato.value.postulacion == "Partido político") {
              sustituirFormData.append(
                "Partido_Id_Nuevo",
                suplente_1.value.partido_Id
              );
            } else {
              if (sust_suplente_1.value.Partido_Id_Nuevo != null)
                sustituirFormData.append(
                  "Partido_Id_Nuevo",
                  sust_suplente_1.value.Partido_Id_Nuevo.value
                );
            }
            if (sust_suplente_1.value.Foto_Nuevo != null)
              sustituirFormData.append(
                "Foto_Nuevo",
                sust_suplente_1.value.Foto_Nuevo
              );
            if (sust_suplente_1.value.Edad_Nuevo != null)
              sustituirFormData.append(
                "Edad",
                sust_suplente_1.value.Edad_Nuevo
              );
            if (sust_suplente_1.value.escrito_Url != null)
              sustituirFormData.append(
                "Escrito_Sustitucion",
                sust_suplente_1.value.escrito_Url
              );
          } else if (sustituirPor.value == "Propietario sindico") {
            sustituirFormData.append("Tipo_Cargo", 2);
            sustituirFormData.append(
              "Tipo_Candidato",
              candidato.value.tipo_Candidato
            );
            sustituirFormData.append("Tipo_Sustitucion", "Propietario 2");
            if (propietario_2.value.edad != null)
              sustituirFormData.append(
                "Edad_Anterior",
                propietario_2.value.edad
              );
            if (propietario_2.value.acuse_URL != null)
              sustituirFormData.append(
                "Acuse_Candidato_URL_Anterior",
                propietario_2.value.acuse_URL
              );
            if (propietario_2.value.acuse_URL != null)
              sustituirFormData.append(
                "Consentimiento_Candidato_URL_Anterior",
                propietario_2.value.consentimiento_URL
              );
            if (propietario_2.value.url_Foto != null)
              sustituirFormData.append(
                "Foto_Anterior",
                propietario_2.value.url_Foto
              );
            if (propietario_2.value.nombres != null)
              sustituirFormData.append(
                "Nombres_Anterior",
                propietario_2.value.nombres.toUpperCase()
              );
            if (propietario_2.value.apellido_Paterno != null)
              sustituirFormData.append(
                "Apellido_Paterno_Anterior",
                propietario_2.value.apellido_Paterno.toUpperCase()
              );
            if (propietario_2.value.apellido_Materno != null)
              sustituirFormData.append(
                "Apellido_Materno_Anterior",
                propietario_2.value.apellido_Materno.toUpperCase()
              );
            if (propietario_2.value.mote != null)
              sustituirFormData.append(
                "Mote_Anterior",
                propietario_2.value.mote
              );
            if (propietario_2.value.sexo != null)
              sustituirFormData.append(
                "Sexo_Anterior",
                propietario_2.value.sexo
              );
            if (propietario_2.value.clave_Elector != null)
              sustituirFormData.append(
                "Clave_Elector_Anterior",
                propietario_2.value.clave_Elector.toUpperCase()
              );
            if (propietario_2.value.rfc != null)
              sustituirFormData.append(
                "RFC_Anterior",
                propietario_2.value.rfc.toUpperCase()
              );
            if (propietario_2.value.curp != null)
              sustituirFormData.append(
                "CURP_Anterior",
                propietario_2.value.curp.toUpperCase()
              );
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
              sustituirFormData.append(
                "Correo_Anterior",
                propietario_2.value.correo.toLowerCase()
              );
            if (propietario_2.value.pertenece_Grupo_Vulnerable != null)
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
                sust_propietario_2.value.Nombres_Nuevo.toUpperCase()
              );
            if (sust_propietario_2.value.Apellido_Paterno_Nuevo != null)
              sustituirFormData.append(
                "Apellido_Paterno_Nuevo",
                sust_propietario_2.value.Apellido_Paterno_Nuevo.toUpperCase()
              );
            if (sust_propietario_2.value.Apellido_Materno_Nuevo != null)
              sustituirFormData.append(
                "Apellido_Materno_Nuevo",
                sust_propietario_2.value.Apellido_Materno_Nuevo.toUpperCase()
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
                sust_propietario_2.value.Clave_Elector_Nuevo.toUpperCase()
              );
            if (sust_propietario_2.value.RFC_Nuevo != null)
              sustituirFormData.append(
                "RFC_Nuevo",
                sust_propietario_2.value.RFC_Nuevo.toUpperCase()
              );
            if (sust_propietario_2.value.CURP_Nuevo != null)
              sustituirFormData.append(
                "CURP_Nuevo",
                sust_propietario_2.value.CURP_Nuevo.toUpperCase()
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
                sust_propietario_2.value.Correo_Nuevo.toLowerCase()
              );
            if (
              sust_propietario_2.value.Pertenece_Grupo_Vulnerable_Nuevo == true
            ) {
              sustituirFormData.append(
                "Pertenece_Grupo_Vulnerable_Nuevo",
                sust_propietario_2.value.Pertenece_Grupo_Vulnerable_Nuevo
              );
              const grupos = `${sust_propietario_2.value.grupo_Vulnerable_1}|${
                sust_propietario_2.value.grupo_Vulnerable_1 == true
                  ? sust_propietario_2.value.describir_Pueblos
                  : "-"
              }`.concat(
                `||${sust_propietario_2.value.grupo_Vulnerable_2}|${
                  sust_propietario_2.value.grupo_Vulnerable_2 == true
                    ? sust_propietario_2.value.describir_Diversidad
                    : "-"
                }||${sust_propietario_2.value.grupo_Vulnerable_3}|${
                  sust_propietario_2.value.grupo_Vulnerable_3 == true
                    ? sust_propietario_2.value.describir_Discapacidad
                    : "-"
                }||${sust_propietario_2.value.grupo_Vulnerable_4}|${
                  sust_propietario_2.value.grupo_Vulnerable_4 == true
                    ? sust_propietario_2.value.describir_Migrante
                    : "-"
                }`
              );
              sustituirFormData.append("Grupo_Vulnerable_Nuevo", grupos);
            } else {
              sustituirFormData.append(
                "Pertenece_Grupo_Vulnerable_Nuevo",
                false
              );
              sustituirFormData.append("Grupo_Vulnerable_Nuevo", "");
            }

            if (candidato.value.postulacion == "Partido político") {
              sustituirFormData.append(
                "Partido_Id_Nuevo",
                propietario_2.value.partido_Id
              );
            } else {
              if (sust_propietario_2.value.Partido_Id_Nuevo != null)
                sustituirFormData.append(
                  "Partido_Id_Nuevo",
                  sust_propietario_2.value.Partido_Id_Nuevo.value
                );
            }
            if (sust_propietario_2.value.Foto_Nuevo != null)
              sustituirFormData.append(
                "Foto_Nuevo",
                sust_propietario_2.value.Foto_Nuevo
              );
            if (sust_propietario_2.value.Edad_Nuevo != null)
              sustituirFormData.append(
                "Edad",
                sust_propietario_2.value.Edad_Nuevo
              );
            if (sust_propietario_2.value.escrito_Url != null)
              sustituirFormData.append(
                "Escrito_Sustitucion",
                sust_propietario_2.value.escrito_Url
              );
          } else if (sustituirPor.value == "Suplente sindico") {
            sustituirFormData.append("Tipo_Cargo", 3);
            sustituirFormData.append(
              "Tipo_Candidato",
              candidato.value.tipo_Candidato
            );
            sustituirFormData.append("Tipo_Sustitucion", "Suplente 2");
            if (suplente_2.value.acuse_URL != null)
              sustituirFormData.append(
                "Acuse_Candidato_URL_Anterior",
                suplente_2.value.acuse_URL
              );
            if (suplente_2.value.acuse_URL != null)
              sustituirFormData.append(
                "Consentimiento_Candidato_URL_Anterior",
                suplente_2.value.consentimiento_URL
              );
            if (suplente_2.value.edad != null)
              sustituirFormData.append("Edad_Anterior", suplente_2.value.edad);
            if (suplente_2.value.url_Foto != null)
              sustituirFormData.append(
                "Foto_Anterior",
                suplente_2.value.url_Foto
              );
            if (suplente_2.value.nombres != null)
              sustituirFormData.append(
                "Nombres_Anterior",
                suplente_2.value.nombres.toUpperCase()
              );
            if (suplente_2.value.apellido_Paterno != null)
              sustituirFormData.append(
                "Apellido_Paterno_Anterior",
                suplente_2.value.apellido_Paterno.toUpperCase()
              );
            if (suplente_2.value.apellido_Materno != null)
              sustituirFormData.append(
                "Apellido_Materno_Anterior",
                suplente_2.value.apellido_Materno.toUpperCase()
              );
            if (suplente_2.value.mote != null)
              sustituirFormData.append("Mote_Anterior", suplente_2.value.mote);
            if (suplente_2.value.sexo != null)
              sustituirFormData.append("Sexo_Anterior", suplente_2.value.sexo);
            if (suplente_2.value.clave_Elector != null)
              sustituirFormData.append(
                "Clave_Elector_Anterior",
                suplente_2.value.clave_Elector.toUpperCase()
              );
            if (suplente_2.value.rfc != null)
              sustituirFormData.append(
                "RFC_Anterior",
                suplente_2.value.rfc.toUpperCase()
              );
            if (suplente_2.value.curp != null)
              sustituirFormData.append(
                "CURP_Anterior",
                suplente_2.value.curp.toUpperCase()
              );
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
              sustituirFormData.append(
                "Telefono_Anterior",
                suplente_2.value.telefono
              );
            if (suplente_2.value.correo != null)
              sustituirFormData.append(
                "Correo_Anterior",
                suplente_2.value.correo.toLowerCase()
              );
            if (suplente_2.value.pertenece_Grupo_Vulnerable != null)
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
                sust_suplente_2.value.Nombres_Nuevo.toUpperCase()
              );
            if (sust_suplente_2.value.Apellido_Paterno_Nuevo != null)
              sustituirFormData.append(
                "Apellido_Paterno_Nuevo",
                sust_suplente_2.value.Apellido_Paterno_Nuevo.toUpperCase()
              );
            if (sust_suplente_2.value.Apellido_Materno_Nuevo != null)
              sustituirFormData.append(
                "Apellido_Materno_Nuevo",
                sust_suplente_2.value.Apellido_Materno_Nuevo.toUpperCase()
              );
            if (sust_suplente_2.value.Mote_Nuevo != null)
              sustituirFormData.append(
                "Mote_Nuevo",
                sust_suplente_2.value.Mote_Nuevo
              );
            if (sust_suplente_2.value.Sexo_Nuevo != null)
              sustituirFormData.append(
                "Sexo_Nuevo",
                sust_suplente_2.value.Sexo_Nuevo
              );
            if (sust_suplente_2.value.Clave_Elector_Nuevo != null)
              sustituirFormData.append(
                "Clave_Elector_Nuevo",
                sust_suplente_2.value.Clave_Elector_Nuevo.toUpperCase()
              );
            if (sust_suplente_2.value.RFC_Nuevo != null)
              sustituirFormData.append(
                "RFC_Nuevo",
                sust_suplente_2.value.RFC_Nuevo.toUpperCase()
              );
            if (sust_suplente_2.value.CURP_Nuevo != null)
              sustituirFormData.append(
                "CURP_Nuevo",
                sust_suplente_2.value.CURP_Nuevo.toUpperCase()
              );
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
                sust_suplente_2.value.Correo_Nuevo.toLowerCase()
              );
            if (
              sust_suplente_2.value.Pertenece_Grupo_Vulnerable_Nuevo == true
            ) {
              sustituirFormData.append(
                "Pertenece_Grupo_Vulnerable_Nuevo",
                sust_suplente_2.value.Pertenece_Grupo_Vulnerable_Nuevo
              );
              const grupos = `${sust_suplente_2.value.grupo_Vulnerable_1}|${
                sust_suplente_2.value.grupo_Vulnerable_1 == true
                  ? sust_suplente_2.value.describir_Pueblos
                  : "-"
              }`.concat(
                `||${sust_suplente_2.value.grupo_Vulnerable_2}|${
                  sust_suplente_2.value.grupo_Vulnerable_2 == true
                    ? sust_suplente_2.value.describir_Diversidad
                    : "-"
                }||${sust_suplente_2.value.grupo_Vulnerable_3}|${
                  sust_suplente_2.value.grupo_Vulnerable_3 == true
                    ? sust_suplente_2.value.describir_Discapacidad
                    : "-"
                }||${sust_suplente_2.value.grupo_Vulnerable_4}|${
                  sust_suplente_2.value.grupo_Vulnerable_4 == true
                    ? sust_suplente_2.value.describir_Migrante
                    : "-"
                }`
              );
              sustituirFormData.append("Grupo_Vulnerable_Nuevo", grupos);
            } else {
              sustituirFormData.append(
                "Pertenece_Grupo_Vulnerable_Nuevo",
                false
              );
              sustituirFormData.append("Grupo_Vulnerable_Nuevo", "");
            }

            if (candidato.value.postulacion == "Partido político") {
              sustituirFormData.append(
                "Partido_Id_Nuevo",
                suplente_2.value.partido_Id
              );
            } else {
              if (sust_suplente_2.value.Partido_Id_Nuevo != null)
                sustituirFormData.append(
                  "Partido_Id_Nuevo",
                  sust_suplente_2.value.Partido_Id_Nuevo.value
                );
            }
            if (sust_suplente_2.value.Foto_Nuevo != null)
              sustituirFormData.append(
                "Foto_Nuevo",
                sust_suplente_2.value.Foto_Nuevo
              );
            if (sust_suplente_2.value.Edad_Nuevo != null)
              sustituirFormData.append(
                "Edad",
                sust_suplente_2.value.Edad_Nuevo
              );
            if (sust_suplente_2.value.escrito_Url != null)
              sustituirFormData.append(
                "Escrito_Sustitucion",
                sust_suplente_2.value.escrito_Url
              );
          } else if (sustituirPor.value == "Fórmula") {
            faltante = await validarFormula();
            if (faltante == false) {
              sustituirPropietario1.append(
                "Tipo_Candidato",
                candidato.value.tipo_Candidato
              );
              sustituirPropietario1.append(
                "Tipo_Eleccion",
                candidato.value.tipo_Eleccion_Id
              );
              sustituirPropietario1.append(
                "Fecha_Sustitucion",
                dateActual.value
              );
              sustituirPropietario1.append("Fecha_Registro", dateActual.value);
              sustituirPropietario1.append("Tipo_Sustitucion", "Propietario 1");
              sustituirPropietario1.append("Tipo_Cargo", 0);
              if (propietario_1.value.acuse_URL != null)
                sustituirPropietario1.append(
                  "Acuse_Candidato_URL_Anterior",
                  propietario_1.value.acuse_URL
                );
              if (propietario_1.value.acuse_URL != null)
                sustituirPropietario1.append(
                  "Consentimiento_Candidato_URL_Anterior",
                  propietario_1.value.consentimiento_URL
                );
              if (propietario_1.value.url_Foto != null)
                sustituirPropietario1.append(
                  "Foto_Anterior",
                  propietario_1.value.url_Foto
                );
              if (propietario_1.value.edad != null)
                sustituirPropietario1.append(
                  "Edad_Anterior",
                  propietario_1.value.edad
                );
              if (propietario_1.value.nombres != null)
                sustituirPropietario1.append(
                  "Nombres_Anterior",
                  propietario_1.value.nombres.toUpperCase()
                );
              if (propietario_1.value.apellido_Paterno != null)
                sustituirPropietario1.append(
                  "Apellido_Paterno_Anterior",
                  propietario_1.value.apellido_Paterno.toUpperCase()
                );
              if (propietario_1.value.apellido_Materno != null)
                sustituirPropietario1.append(
                  "Apellido_Materno_Anterior",
                  propietario_1.value.apellido_Materno.toUpperCase()
                );
              if (propietario_1.value.mote != null)
                sustituirPropietario1.append(
                  "Mote_Anterior",
                  propietario_1.value.mote
                );
              if (propietario_1.value.sexo != null)
                sustituirPropietario1.append(
                  "Sexo_Anterior",
                  propietario_1.value.sexo
                );
              if (propietario_1.value.clave_Elector != null)
                sustituirPropietario1.append(
                  "Clave_Elector_Anterior",
                  propietario_1.value.clave_Elector.toUpperCase()
                );
              if (propietario_1.value.rfc != null)
                sustituirPropietario1.append(
                  "RFC_Anterior",
                  propietario_1.value.rfc.toUpperCase()
                );
              if (propietario_1.value.curp != null)
                sustituirPropietario1.append(
                  "CURP_Anterior",
                  propietario_1.value.curp.toUpperCase()
                );
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
                  propietario_1.value.correo.toLowerCase()
                );
              if (propietario_1.value.pertenece_Grupo_Vulnerable != null)
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
                  sust_propietario_1.value.Nombres_Nuevo.toUpperCase()
                );
              if (sust_propietario_1.value.Apellido_Paterno_Nuevo != null)
                sustituirPropietario1.append(
                  "Apellido_Paterno_Nuevo",
                  sust_propietario_1.value.Apellido_Paterno_Nuevo.toUpperCase()
                );
              if (sust_propietario_1.value.Apellido_Materno_Nuevo != null)
                sustituirPropietario1.append(
                  "Apellido_Materno_Nuevo",
                  sust_propietario_1.value.Apellido_Materno_Nuevo.toUpperCase()
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
                  sust_propietario_1.value.Clave_Elector_Nuevo.toUpperCase()
                );
              if (sust_propietario_1.value.RFC_Nuevo != null)
                sustituirPropietario1.append(
                  "RFC_Nuevo",
                  sust_propietario_1.value.RFC_Nuevo.toUpperCase()
                );
              if (sust_propietario_1.value.CURP_Nuevo != null)
                sustituirPropietario1.append(
                  "CURP_Nuevo",
                  sust_propietario_1.value.CURP_Nuevo.toUpperCase()
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
                  sust_propietario_1.value.Correo_Nuevo.toLowerCase()
                );
              if (
                sust_propietario_1.value.Pertenece_Grupo_Vulnerable_Nuevo ==
                true
              ) {
                sustituirPropietario1.append(
                  "Pertenece_Grupo_Vulnerable_Nuevo",
                  sust_propietario_1.value.Pertenece_Grupo_Vulnerable_Nuevo
                );
                const grupos = `${
                  sust_propietario_1.value.grupo_Vulnerable_1
                }|${
                  sust_propietario_1.value.grupo_Vulnerable_1 == true
                    ? sust_propietario_1.value.describir_Pueblos
                    : "-"
                }`.concat(
                  `||${sust_propietario_1.value.grupo_Vulnerable_2}|${
                    sust_propietario_1.value.grupo_Vulnerable_2 == true
                      ? sust_propietario_1.value.describir_Diversidad
                      : "-"
                  }||${sust_propietario_1.value.grupo_Vulnerable_3}|${
                    sust_propietario_1.value.grupo_Vulnerable_3 == true
                      ? sust_propietario_1.value.describir_Discapacidad
                      : "-"
                  }||${sust_propietario_1.value.grupo_Vulnerable_4}|${
                    sust_propietario_1.value.grupo_Vulnerable_4 == true
                      ? sust_propietario_1.value.describir_Migrante
                      : "-"
                  }`
                );
                sustituirPropietario1.append("Grupo_Vulnerable_Nuevo", grupos);
              } else {
                sustituirPropietario1.append(
                  "Pertenece_Grupo_Vulnerable_Nuevo",
                  false
                );
                sustituirPropietario1.append("Grupo_Vulnerable_Nuevo", "");
              }
              if (sust_propietario_1.value.Partido_Id_Nuevo != null)
                sustituirPropietario1.append(
                  "Partido_Id_Nuevo",
                  sust_propietario_1.value.Partido_Id_Nuevo.value
                );
              if (candidato.value.postulacion == "Partido político") {
                sustituirPropietario1.append(
                  "Partido_Id_Nuevo",
                  propietario_1.value.partido_Id
                );
              } else {
                if (sust_propietario_1.value.Partido_Id_Nuevo != null)
                  sustituirPropietario1.append(
                    "Partido_Id_Nuevo",
                    sust_propietario_1.value.Partido_Id_Nuevo.value
                  );
              }
              if (sust_propietario_1.value.Foto_Nuevo != null)
                sustituirPropietario1.append(
                  "Foto_Nuevo",
                  sust_propietario_1.value.Foto_Nuevo
                );
              if (sust_propietario_1.value.Edad_Nuevo != null)
                sustituirPropietario1.append(
                  "Edad",
                  sust_propietario_1.value.Edad_Nuevo
                );
              if (sust_propietario_1.value.escrito_Url != null)
                sustituirPropietario1.append(
                  "Escrito_Sustitucion",
                  sust_propietario_1.value.escrito_Url
                );

              //-----------------------------------------------------------------

              sustituirSuplente1.append(
                "Tipo_Eleccion",
                candidato.value.tipo_Eleccion_Id
              );
              sustituirSuplente1.append(
                "Tipo_Candidato",
                candidato.value.tipo_Candidato
              );
              sustituirSuplente1.append("Fecha_Sustitucion", dateActual.value);
              sustituirSuplente1.append("Fecha_Registro", dateActual.value);
              sustituirSuplente1.append("Tipo_Cargo", 1);
              sustituirSuplente1.append("Tipo_Sustitucion", "Suplente 1");
              if (suplente_1.value.acuse_URL != null)
                sustituirSuplente1.append(
                  "Acuse_Candidato_URL_Anterior",
                  suplente_1.value.acuse_URL
                );
              if (suplente_1.value.acuse_URL != null)
                sustituirSuplente1.append(
                  "Consentimiento_Candidato_URL_Anterior",
                  suplente_1.value.consentimiento_URL
                );
              if (suplente_1.value.edad != null)
                sustituirSuplente1.append(
                  "Edad_Anterior",
                  suplente_1.value.edad
                );
              if (suplente_1.value.url_Foto != null)
                sustituirSuplente1.append(
                  "Foto_Anterior",
                  suplente_1.value.url_Foto
                );
              if (suplente_1.value.nombres != null)
                sustituirSuplente1.append(
                  "Nombres_Anterior",
                  suplente_1.value.nombres.toUpperCase()
                );
              if (suplente_1.value.apellido_Paterno != null)
                sustituirSuplente1.append(
                  "Apellido_Paterno_Anterior",
                  suplente_1.value.apellido_Paterno.toUpperCase()
                );
              if (suplente_1.value.apellido_Materno != null)
                sustituirSuplente1.append(
                  "Apellido_Materno_Anterior",
                  suplente_1.value.apellido_Materno.toUpperCase()
                );
              if (suplente_1.value.mote != null)
                sustituirSuplente1.append(
                  "Mote_Anterior",
                  suplente_1.value.mote
                );
              if (suplente_1.value.sexo != null)
                sustituirSuplente1.append(
                  "Sexo_Anterior",
                  suplente_1.value.sexo
                );
              if (suplente_1.value.clave_Elector != null)
                sustituirSuplente1.append(
                  "Clave_Elector_Anterior",
                  suplente_1.value.clave_Elector.toUpperCase()
                );
              if (suplente_1.value.rfc != null)
                sustituirSuplente1.append(
                  "RFC_Anterior",
                  suplente_1.value.rfc.toUpperCase()
                );
              if (suplente_1.value.curp != null)
                sustituirSuplente1.append(
                  "CURP_Anterior",
                  suplente_1.value.curp.toUpperCase()
                );
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
                sustituirSuplente1.append(
                  "Telefono_Anterior",
                  suplente_1.value.telefono
                );
              if (suplente_1.value.correo != null)
                sustituirSuplente1.append(
                  "Correo_Anterior",
                  suplente_1.value.correo.toLowerCase()
                );
              if (suplente_1.value.pertenece_Grupo_Vulnerable != null)
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
                  sust_suplente_1.value.Nombres_Nuevo.toUpperCase()
                );
              if (sust_suplente_1.value.Apellido_Paterno_Nuevo != null)
                sustituirSuplente1.append(
                  "Apellido_Paterno_Nuevo",
                  sust_suplente_1.value.Apellido_Paterno_Nuevo.toUpperCase()
                );
              if (sust_suplente_1.value.Apellido_Materno_Nuevo != null)
                sustituirSuplente1.append(
                  "Apellido_Materno_Nuevo",
                  sust_suplente_1.value.Apellido_Materno_Nuevo.toUpperCase()
                );
              if (sust_suplente_1.value.Mote_Nuevo != null)
                sustituirSuplente1.append(
                  "Mote_Nuevo",
                  sust_suplente_1.value.Mote_Nuevo
                );
              if (sust_suplente_1.value.Sexo_Nuevo != null)
                sustituirSuplente1.append(
                  "Sexo_Nuevo",
                  sust_suplente_1.value.Sexo_Nuevo
                );
              if (sust_suplente_1.value.Clave_Elector_Nuevo != null)
                sustituirSuplente1.append(
                  "Clave_Elector_Nuevo",
                  sust_suplente_1.value.Clave_Elector_Nuevo.toUpperCase()
                );
              if (sust_suplente_1.value.RFC_Nuevo != null)
                sustituirSuplente1.append(
                  "RFC_Nuevo",
                  sust_suplente_1.value.RFC_Nuevo.toUpperCase()
                );
              if (sust_suplente_1.value.CURP_Nuevo != null)
                sustituirSuplente1.append(
                  "CURP_Nuevo",
                  sust_suplente_1.value.CURP_Nuevo.toUpperCase()
                );
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
                  sust_suplente_1.value.Correo_Nuevo.toLowerCase()
                );
              if (
                sust_suplente_1.value.Pertenece_Grupo_Vulnerable_Nuevo == true
              ) {
                sustituirSuplente1.append(
                  "Pertenece_Grupo_Vulnerable_Nuevo",
                  sust_suplente_1.value.Pertenece_Grupo_Vulnerable_Nuevo
                );
                const grupos = `${sust_suplente_1.value.grupo_Vulnerable_1}|${
                  sust_suplente_1.value.grupo_Vulnerable_1 == true
                    ? sust_suplente_1.value.describir_Pueblos
                    : "-"
                }`.concat(
                  `||${sust_suplente_1.value.grupo_Vulnerable_2}|${
                    sust_suplente_1.value.grupo_Vulnerable_2 == true
                      ? sust_suplente_1.value.describir_Diversidad
                      : "-"
                  }||${sust_suplente_1.value.grupo_Vulnerable_3}|${
                    sust_suplente_1.value.grupo_Vulnerable_3 == true
                      ? sust_suplente_1.value.describir_Discapacidad
                      : "-"
                  }||${sust_suplente_1.value.grupo_Vulnerable_4}|${
                    sust_suplente_1.value.grupo_Vulnerable_4 == true
                      ? sust_suplente_1.value.describir_Migrante
                      : "-"
                  }`
                );
                sustituirSuplente1.append("Grupo_Vulnerable_Nuevo", grupos);
              } else {
                sustituirSuplente1.append(
                  "Pertenece_Grupo_Vulnerable_Nuevo",
                  false
                );
                sustituirSuplente1.append("Grupo_Vulnerable_Nuevo", "");
              }

              if (candidato.value.postulacion == "Partido político") {
                sustituirSuplente1.append(
                  "Partido_Id_Nuevo",
                  suplente_1.value.partido_Id
                );
              } else {
                if (sust_suplente_1.value.Partido_Id_Nuevo != null)
                  sustituirSuplente1.append(
                    "Partido_Id_Nuevo",
                    sust_suplente_1.value.Partido_Id_Nuevo.value
                  );
              }
              if (sust_suplente_1.value.Foto_Nuevo != null)
                sustituirSuplente1.append(
                  "Foto_Nuevo",
                  sust_suplente_1.value.Foto_Nuevo
                );
              if (sust_suplente_1.value.Edad_Nuevo != null)
                sustituirSuplente1.append(
                  "Edad",
                  sust_suplente_1.value.Edad_Nuevo
                );
              if (sust_suplente_1.value.escrito_Url != null)
                sustituirSuplente1.append(
                  "Escrito_Sustitucion",
                  sust_suplente_1.value.escrito_Url
                );

              //-----------------------------------------------------------------

              sustituirPropietario2.append(
                "Tipo_Eleccion",
                candidato.value.tipo_Eleccion_Id
              );
              sustituirPropietario2.append(
                "Tipo_Candidato",
                candidato.value.tipo_Candidato
              );
              sustituirPropietario2.append(
                "Fecha_Sustitucion",
                dateActual.value
              );
              sustituirPropietario2.append("Fecha_Registro", dateActual.value);
              sustituirPropietario2.append("Tipo_Cargo", 2);
              sustituirPropietario2.append("Tipo_Sustitucion", "Propietario 2");
              if (propietario_2.value.acuse_URL != null)
                sustituirPropietario2.append(
                  "Acuse_Candidato_URL_Anterior",
                  propietario_2.value.acuse_URL
                );
              if (propietario_2.value.acuse_URL != null)
                sustituirPropietario2.append(
                  "Consentimiento_Candidato_URL_Anterior",
                  propietario_2.value.consentimiento_URL
                );
              if (propietario_2.value.edad != null)
                sustituirPropietario2.append(
                  "Edad_Anterior",
                  propietario_2.value.edad
                );
              if (propietario_2.value.url_Foto != null)
                sustituirPropietario2.append(
                  "Foto_Anterior",
                  propietario_2.value.url_Foto
                );
              if (propietario_2.value.nombres != null)
                sustituirPropietario2.append(
                  "Nombres_Anterior",
                  propietario_2.value.nombres.toUpperCase()
                );
              if (propietario_2.value.apellido_Paterno != null)
                sustituirPropietario2.append(
                  "Apellido_Paterno_Anterior",
                  propietario_2.value.apellido_Paterno.toUpperCase()
                );
              if (propietario_2.value.apellido_Materno != null)
                sustituirPropietario2.append(
                  "Apellido_Materno_Anterior",
                  propietario_2.value.apellido_Materno.toUpperCase()
                );
              if (propietario_2.value.mote != null)
                sustituirPropietario2.append(
                  "Mote_Anterior",
                  propietario_2.value.mote
                );
              if (propietario_2.value.sexo != null)
                sustituirPropietario2.append(
                  "Sexo_Anterior",
                  propietario_2.value.sexo
                );
              if (propietario_2.value.clave_Elector != null)
                sustituirPropietario2.append(
                  "Clave_Elector_Anterior",
                  propietario_2.value.clave_Elector.toUpperCase()
                );
              if (propietario_2.value.rfc != null)
                sustituirPropietario2.append(
                  "RFC_Anterior",
                  propietario_2.value.rfc.toUpperCase()
                );
              if (propietario_2.value.curp != null)
                sustituirPropietario2.append(
                  "CURP_Anterior",
                  propietario_2.value.curp.toUpperCase()
                );
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
                  propietario_2.value.correo.toLowerCase()
                );
              if (propietario_2.value.pertenece_Grupo_Vulnerable != null)
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
                  sust_propietario_2.value.Nombres_Nuevo.toUpperCase()
                );
              if (sust_propietario_2.value.Apellido_Paterno_Nuevo != null)
                sustituirPropietario2.append(
                  "Apellido_Paterno_Nuevo",
                  sust_propietario_2.value.Apellido_Paterno_Nuevo.toUpperCase()
                );
              if (sust_propietario_2.value.Apellido_Materno_Nuevo != null)
                sustituirPropietario2.append(
                  "Apellido_Materno_Nuevo",
                  sust_propietario_2.value.Apellido_Materno_Nuevo.toUpperCase()
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
                  sust_propietario_2.value.Clave_Elector_Nuevo.toUpperCase()
                );
              if (sust_propietario_2.value.RFC_Nuevo != null)
                sustituirPropietario2.append(
                  "RFC_Nuevo",
                  sust_propietario_2.value.RFC_Nuevo.toUpperCase()
                );
              if (sust_propietario_2.value.CURP_Nuevo != null)
                sustituirPropietario2.append(
                  "CURP_Nuevo",
                  sust_propietario_2.value.CURP_Nuevo.toUpperCase()
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
                  sust_propietario_2.value.Correo_Nuevo.toLowerCase()
                );
              if (
                sust_propietario_2.value.Pertenece_Grupo_Vulnerable_Nuevo ==
                true
              ) {
                sustituirPropietario2.append(
                  "Pertenece_Grupo_Vulnerable_Nuevo",
                  sust_propietario_2.value.Pertenece_Grupo_Vulnerable_Nuevo
                );
                const grupos = `${
                  sust_propietario_2.value.grupo_Vulnerable_1
                }|${
                  sust_propietario_2.value.grupo_Vulnerable_1 == true
                    ? sust_propietario_2.value.describir_Pueblos
                    : "-"
                }`.concat(
                  `||${sust_propietario_2.value.grupo_Vulnerable_2}|${
                    sust_propietario_2.value.grupo_Vulnerable_2 == true
                      ? sust_propietario_2.value.describir_Diversidad
                      : "-"
                  }||${sust_propietario_2.value.grupo_Vulnerable_3}|${
                    sust_propietario_2.value.grupo_Vulnerable_3 == true
                      ? sust_propietario_2.value.describir_Discapacidad
                      : "-"
                  }||${sust_propietario_2.value.grupo_Vulnerable_4}|${
                    sust_propietario_2.value.grupo_Vulnerable_4 == true
                      ? sust_propietario_2.value.describir_Migrante
                      : "-"
                  }`
                );
                sustituirPropietario2.append("Grupo_Vulnerable_Nuevo", grupos);
              } else {
                sustituirPropietario2.append(
                  "Pertenece_Grupo_Vulnerable_Nuevo",
                  false
                );
                sustituirPropietario2.append("Grupo_Vulnerable_Nuevo", "");
              }

              if (candidato.value.postulacion == "Partido político") {
                sustituirPropietario2.append(
                  "Partido_Id_Nuevo",
                  propietario_2.value.partido_Id
                );
              } else {
                if (sust_propietario_2.value.Partido_Id_Nuevo != null)
                  sustituirPropietario2.append(
                    "Partido_Id_Nuevo",
                    sust_propietario_2.value.Partido_Id_Nuevo.value
                  );
              }
              if (sust_propietario_2.value.Foto_Nuevo != null)
                sustituirPropietario2.append(
                  "Foto_Nuevo",
                  sust_propietario_2.value.Foto_Nuevo
                );
              if (sust_propietario_2.value.Edad_Nuevo != null)
                sustituirPropietario2.append(
                  "Edad",
                  sust_propietario_2.value.Edad_Nuevo
                );
              if (sust_propietario_2.value.escrito_Url != null)
                sustituirPropietario2.append(
                  "Escrito_Sustitucion",
                  sust_propietario_2.value.escrito_Url
                );

              //-----------------------------------------------------------------

              sustituirSuplente2.append(
                "Tipo_Eleccion",
                candidato.value.tipo_Eleccion_Id
              );
              sustituirSuplente2.append(
                "Tipo_Candidato",
                candidato.value.tipo_Candidato
              );
              sustituirSuplente2.append("Fecha_Sustitucion", dateActual.value);
              sustituirSuplente2.append("Fecha_Registro", dateActual.value);
              sustituirSuplente2.append("Tipo_Sustitucion", "Suplente 2");
              sustituirSuplente2.append("Tipo_Cargo", 3);
              if (suplente_2.value.acuse_URL != null)
                sustituirSuplente2.append(
                  "Acuse_Candidato_URL_Anterior",
                  suplente_2.value.acuse_URL
                );
              if (suplente_2.value.acuse_URL != null)
                sustituirSuplente2.append(
                  "Consentimiento_Candidato_URL_Anterior",
                  suplente_2.value.consentimiento_URL
                );
              if (suplente_2.value.url_Foto != null)
                sustituirSuplente2.append(
                  "Foto_Anterior",
                  suplente_2.value.url_Foto
                );
              if (suplente_2.value.edad != null)
                sustituirSuplente2.append(
                  "Edad_Anterior",
                  suplente_2.value.edad
                );
              if (suplente_2.value.nombres != null)
                sustituirSuplente2.append(
                  "Nombres_Anterior",
                  suplente_2.value.nombres.toUpperCase()
                );
              if (suplente_2.value.apellido_Paterno != null)
                sustituirSuplente2.append(
                  "Apellido_Paterno_Anterior",
                  suplente_2.value.apellido_Paterno.toUpperCase()
                );
              if (suplente_2.value.apellido_Materno != null)
                sustituirSuplente2.append(
                  "Apellido_Materno_Anterior",
                  suplente_2.value.apellido_Materno.toUpperCase()
                );
              if (suplente_2.value.mote != null)
                sustituirSuplente2.append(
                  "Mote_Anterior",
                  suplente_2.value.mote
                );
              if (suplente_2.value.sexo != null)
                sustituirSuplente2.append(
                  "Sexo_Anterior",
                  suplente_2.value.sexo
                );
              if (suplente_2.value.clave_Elector != null)
                sustituirSuplente2.append(
                  "Clave_Elector_Anterior",
                  suplente_2.value.clave_Elector.toUpperCase()
                );
              if (suplente_2.value.rfc != null)
                sustituirSuplente2.append(
                  "RFC_Anterior",
                  suplente_2.value.rfc.toUpperCase()
                );
              if (suplente_2.value.curp != null)
                sustituirSuplente2.append(
                  "CURP_Anterior",
                  suplente_2.value.curp.toUpperCase()
                );
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
                sustituirSuplente2.append(
                  "Telefono_Anterior",
                  suplente_2.value.telefono
                );
              if (suplente_2.value.correo != null)
                sustituirSuplente2.append(
                  "Correo_Anterior",
                  suplente_2.value.correo.toLowerCase()
                );
              if (suplente_2.value.pertenece_Grupo_Vulnerable != null)
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
                  sust_suplente_2.value.Nombres_Nuevo.toUpperCase()
                );
              if (sust_suplente_2.value.Apellido_Paterno_Nuevo != null)
                sustituirSuplente2.append(
                  "Apellido_Paterno_Nuevo",
                  sust_suplente_2.value.Apellido_Paterno_Nuevo.toUpperCase()
                );
              if (sust_suplente_2.value.Apellido_Materno_Nuevo != null)
                sustituirSuplente2.append(
                  "Apellido_Materno_Nuevo",
                  sust_suplente_2.value.Apellido_Materno_Nuevo.toUpperCase()
                );
              if (sust_suplente_2.value.Mote_Nuevo != null)
                sustituirSuplente2.append(
                  "Mote_Nuevo",
                  sust_suplente_2.value.Mote_Nuevo
                );
              if (sust_suplente_2.value.Sexo_Nuevo != null)
                sustituirSuplente2.append(
                  "Sexo_Nuevo",
                  sust_suplente_2.value.Sexo_Nuevo
                );
              if (sust_suplente_2.value.Clave_Elector_Nuevo != null)
                sustituirSuplente2.append(
                  "Clave_Elector_Nuevo",
                  sust_suplente_2.value.Clave_Elector_Nuevo.toUpperCase()
                );
              if (sust_suplente_2.value.RFC_Nuevo != null)
                sustituirSuplente2.append(
                  "RFC_Nuevo",
                  sust_suplente_2.value.RFC_Nuevo.toUpperCase()
                );
              if (sust_suplente_2.value.CURP_Nuevo != null)
                sustituirSuplente2.append(
                  "CURP_Nuevo",
                  sust_suplente_2.value.CURP_Nuevo.toUpperCase()
                );
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
                  sust_suplente_2.value.Correo_Nuevo.toLowerCase()
                );
              if (
                sust_suplente_2.value.Pertenece_Grupo_Vulnerable_Nuevo == true
              ) {
                sustituirSuplente2.append(
                  "Pertenece_Grupo_Vulnerable_Nuevo",
                  sust_suplente_2.value.Pertenece_Grupo_Vulnerable_Nuevo
                );
                const grupos = `${sust_suplente_2.value.grupo_Vulnerable_1}|${
                  sust_suplente_2.value.grupo_Vulnerable_1 == true
                    ? sust_suplente_2.value.describir_Pueblos
                    : "-"
                }`.concat(
                  `||${sust_suplente_2.value.grupo_Vulnerable_2}|${
                    sust_suplente_2.value.grupo_Vulnerable_2 == true
                      ? sust_suplente_2.value.describir_Diversidad
                      : "-"
                  }||${sust_suplente_2.value.grupo_Vulnerable_3}|${
                    sust_suplente_2.value.grupo_Vulnerable_3 == true
                      ? sust_suplente_2.value.describir_Discapacidad
                      : "-"
                  }||${sust_suplente_2.value.grupo_Vulnerable_4}|${
                    sust_suplente_2.value.grupo_Vulnerable_4 == true
                      ? sust_suplente_2.value.describir_Migrante
                      : "-"
                  }`
                );
                sustituirSuplente2.append("Grupo_Vulnerable_Nuevo", grupos);
              } else {
                sustituirSuplente2.append(
                  "Pertenece_Grupo_Vulnerable_Nuevo",
                  false
                );
                sustituirSuplente2.append("Grupo_Vulnerable_Nuevo", "");
              }
              if (candidato.value.postulacion == "Partido político") {
                sustituirSuplente2.append(
                  "Partido_Id_Nuevo",
                  suplente_2.value.partido_Id
                );
              } else {
                if (sust_suplente_2.value.Partido_Id_Nuevo != null)
                  sustituirSuplente2.append(
                    "Partido_Id_Nuevo",
                    sust_suplente_2.value.Partido_Id_Nuevo.value
                  );
              }
              if (sust_suplente_2.value.Foto_Nuevo != null)
                sustituirSuplente2.append(
                  "Foto_Nuevo",
                  sust_suplente_2.value.Foto_Nuevo
                );
              if (sust_suplente_2.value.Edad_Nuevo != null)
                sustituirSuplente2.append(
                  "Edad",
                  sust_suplente_2.value.Edad_Nuevo
                );
              if (sust_suplente_2.value.escrito_Url != null)
                sustituirSuplente2.append(
                  "Escrito_Sustitucion",
                  sust_suplente_2.value.escrito_Url
                );
            }
          }

          sustituirFormData.append(
            "Tipo_Eleccion",
            candidato.value.tipo_Eleccion_Id
          );
          sustituirFormData.append("Fecha_Sustitucion", dateActual.value);
          sustituirFormData.append("Fecha_Registro", dateActual.value);

          let resp = null;
          let resp1 = null;
          let resp2 = null;
          let resp3 = null;
          $q.loading.show();

          if (sustituirPor.value != "Fórmula") {
            resp = await sustituirStore.sustituirCandidato(
              candidato.value.id,
              sustituirFormData
            );
            if (resp.success == true && faltante == false) {
              $q.notify({
                position: "top-right",
                type: "positive",
                message: resp.data,
              });
              await candidatoStore.loadCandidatosIndividual(props.tipo_Id);
              actualizarModal(false);
            } else {
              $q.notify({
                position: "top-right",
                type: "negative",
                message: resp.data,
              });
            }
          } else if (sustituirPor.value == "Fórmula" && faltante == false) {
            if (props.tab == "DIP") {
              let resp1 = await sustituirStore.sustituirCandidato(
                candidato.value.id,
                sustituirPropietario1
              );
              if (resp1.success == true) {
                resp = await sustituirStore.sustituirCandidato(
                  candidato.value.id,
                  sustituirSuplente1
                );
              }
            } else if (props.tab == "PYS") {
              resp1 = await sustituirStore.sustituirCandidato(
                candidato.value.id,
                sustituirPropietario1
              );
              if (resp1.success == true) {
                resp2 = await sustituirStore.sustituirCandidato(
                  candidato.value.id,
                  sustituirSuplente1
                );
                if (resp2.success == true) {
                  resp3 = await sustituirStore.sustituirCandidato(
                    candidato.value.id,
                    sustituirPropietario2
                  );
                  if (resp3.success == true) {
                    resp = await sustituirStore.sustituirCandidato(
                      candidato.value.id,
                      sustituirSuplente2
                    );
                  }
                }
              }
            } else if (props.tab == "REG") {
              let resp1 = await sustituirStore.sustituirCandidato(
                candidato.value.id,
                sustituirPropietario1
              );
              if (resp1.success == true) {
                resp = await sustituirStore.sustituirCandidato(
                  candidato.value.id,
                  sustituirSuplente1
                );
              }
            } else if (props.tab == "GUB") {
              resp = await sustituirStore.sustituirCandidato(
                candidato.value.id,
                sustituirPropietario1
              );
            }

            if (resp.success == true && faltante == false) {
              $q.notify({
                position: "top-right",
                type: "positive",
                message: resp.data,
              });
              await candidatoStore.loadCandidatosIndividual(props.tipo_Id);
              actualizarModal(false);
            } else {
              $q.notify({
                position: "top-right",
                type: "negative",
                message: resp.data,
              });
            }
          }

          $q.loading.hide();
        })
        .onCancel(() => {});
    }
  }
};

const validarClaveCurp = async () => {
  let resp1 = null;
  let resp2 = null;
  let resp3 = null;
  let resp4 = null;
  if (props.tab != "PYS" && candidato.value.tipo_Candidato != "RP") {
    if (
      sust_propietario_1.value.Clave_Elector_Nuevo != null &&
      sust_propietario_1.value.CURP_Nuevo != null
    ) {
      resp1 = await candidatoStore.coindidenciasClaveCurp(
        sust_propietario_1.value.Clave_Elector_Nuevo,
        sust_propietario_1.value.CURP_Nuevo
      );
      if (resp1.data == "Se encontraron coincidencias") {
        $q.notify({
          position: "center",
          type: "negative",
          message: `${resp1.data} en la Clave de elector o en la CURP del propietario, no podrá registrar la candidatura`,
        });
      }
    }
    if (
      sust_suplente_1.value.Clave_Elector_Nuevo != null &&
      sust_suplente_1.value.CURP_Nuevo != null
    ) {
      resp2 = await candidatoStore.coindidenciasClaveCurp(
        sust_suplente_1.value.Clave_Elector_Nuevo,
        sust_suplente_1.value.CURP_Nuevo
      );
      if (resp2.data == "Se encontraron coincidencias") {
        $q.notify({
          position: "center",
          type: "negative",
          message: `${resp2.data} en la Clave de elector o en la CURP del suplente, no podrá registrar la candidatura`,
        });
      }
    }
  } else if (props.tab == "PYS") {
    if (
      sust_propietario_2.value.Clave_Elector_Nuevo != null &&
      sust_propietario_2.value.CURP_Nuevo != null
    ) {
      resp1 = await candidatoStore.coindidenciasClaveCurp(
        sust_propietario_2.value.Clave_Elector_Nuevo,
        sust_propietario_2.value.CURP_Nuevo
      );

      if (resp1.data == "Se encontraron coincidencias") {
        $q.notify({
          position: "center",
          type: "negative",
          message: `${resp1.data} en la Clave de elector o en la CURP del propietario, no podrá registrar la candidatura`,
        });
      }
    }
    if (
      sust_suplente_1.value.Clave_Elector_Nuevo != null &&
      sust_suplente_1.value.CURP_Nuevo != null
    ) {
      resp2 = await candidatoStore.coindidenciasClaveCurp(
        sust_suplente_1.value.Clave_Elector_Nuevo,
        sust_suplente_1.value.CURP_Nuevo
      );
      if (resp2.data == "Se encontraron coincidencias") {
        $q.notify({
          position: "center",
          type: "negative",
          message: `${resp2.data} en la Clave de elector o en la CURP del suplente, no podrá registrar la candidatura`,
        });
      }
    }
    if (
      sust_propietario_2.value.Clave_Elector_Nuevo != null &&
      sust_propietario_2.value.CURP_Nuevo != null
    ) {
      resp3 = await candidatoStore.coindidenciasClaveCurp(
        sust_propietario_2.value.Clave_Elector_Nuevo,
        sust_propietario_2.value.CURP_Nuevo
      );

      if (resp3.data == "Se encontraron coincidencias") {
        $q.notify({
          position: "center",
          type: "negative",
          message: `${resp3.data} en la Clave de elector o en la CURP del suplente, no podrá registrar la candidatura`,
        });
      }
    }
    if (
      sust_suplente_2.value.Clave_Elector_Nuevo != null &&
      sust_suplente_2.value.CURP_Nuevo != null
    ) {
      resp4 = await candidatoStore.coindidenciasClaveCurp(
        sust_suplente_2.value.Clave_Elector_Nuevo,
        sust_suplente_2.value.CURP_Nuevo
      );
      if (resp4.success && resp4.data == "Se encontraron coincidencias") {
        $q.notify({
          position: "center",
          type: "negative",
          message: `${resp4.data} en la Clave de elector o en la CURP del suplente, no podrá registrar la candidatura`,
        });
      }
    }
  }
  if (
    (resp1 != null && resp1.data == "Se encontraron coincidencias") ||
    (resp2 != null && resp2.data == "Se encontraron coincidencias") ||
    (resp3 != null && resp3.data == "Se encontraron coincidencias") ||
    (resp4 != null && resp4.data == "Se encontraron coincidencias")
  ) {
    return true;
  } else {
    return false;
  }
};

const validarFormula = async () => {
  let falta1 = false;
  let falta2 = false;
  let falta3 = false;
  let falta4 = false;
  switch (sustituirPor.value == "Fórmula") {
    case props.tab == "DIP":
    case props.tab == "REG":
      if (
        sust_propietario_1.value.escrito_Url == null ||
        sust_propietario_1.value.Nombres_Nuevo == null ||
        sust_propietario_1.value.Apellido_Paterno_Nuevo == null ||
        sust_propietario_1.value.Sexo_Nuevo == null ||
        sust_propietario_1.value.Clave_Elector_Nuevo == null ||
        sust_propietario_1.value.RFC_Nuevo == null ||
        sust_propietario_1.value.CURP_Nuevo == null ||
        sust_propietario_1.value.Fecha_Nacimiento_Nuevo == null ||
        sust_propietario_1.value.Correo_Nuevo == null ||
        sust_propietario_1.value.Pertenece_Grupo_Vulnerable_Nuevo == null
      ) {
        $q.notify({
          position: "center",
          type: "negative",
          message:
            "Campos vacios en la información de la candidatura propietaria",
        });
        falta1 = true;
      } else if (
        sust_suplente_1.value.escrito_Url == null ||
        sust_suplente_1.value.Nombres_Nuevo == null ||
        sust_suplente_1.value.Apellido_Paterno_Nuevo == null ||
        sust_suplente_1.value.Sexo_Nuevo == null ||
        sust_suplente_1.value.Clave_Elector_Nuevo == null ||
        sust_suplente_1.value.RFC_Nuevo == null ||
        sust_suplente_1.value.CURP_Nuevo == null ||
        sust_suplente_1.value.Fecha_Nacimiento_Nuevo == null ||
        sust_suplente_1.value.Correo_Nuevo == null ||
        sust_suplente_1.value.Pertenece_Grupo_Vulnerable_Nuevo == null
      ) {
        $q.notify({
          position: "center",
          type: "negative",
          message: "Campos vacios en la información de la candidatura suplente",
        });
        falta2 = true;
      } else {
        falta1 = false;
        falta2 = false;
      }
      break;
    case props.tab == "PYS":
      if (
        sust_propietario_1.value.escrito_Url == null ||
        sust_propietario_1.value.Nombres_Nuevo == null ||
        sust_propietario_1.value.Apellido_Paterno_Nuevo == null ||
        sust_propietario_1.value.Sexo_Nuevo == null ||
        sust_propietario_1.value.Clave_Elector_Nuevo == null ||
        sust_propietario_1.value.RFC_Nuevo == null ||
        sust_propietario_1.value.CURP_Nuevo == null ||
        sust_propietario_1.value.Fecha_Nacimiento_Nuevo == null ||
        sust_propietario_1.value.Correo_Nuevo == null ||
        sust_propietario_1.value.Pertenece_Grupo_Vulnerable_Nuevo == null
      ) {
        $q.notify({
          position: "center",
          type: "negative",
          message:
            "Campos vacios en la información de la candidatura propietaria",
        });
        falta1 = true;
      } else if (
        sust_suplente_1.value.escrito_Url == null ||
        sust_suplente_1.value.Nombres_Nuevo == null ||
        sust_suplente_1.value.Apellido_Paterno_Nuevo == null ||
        sust_suplente_1.value.Sexo_Nuevo == null ||
        sust_suplente_1.value.Clave_Elector_Nuevo == null ||
        sust_suplente_1.value.RFC_Nuevo == null ||
        sust_suplente_1.value.CURP_Nuevo == null ||
        sust_suplente_1.value.Fecha_Nacimiento_Nuevo == null ||
        sust_suplente_1.value.Correo_Nuevo == null ||
        sust_suplente_1.value.Pertenece_Grupo_Vulnerable_Nuevo == null
      ) {
        $q.notify({
          position: "center",
          type: "negative",
          message: "Campos vacios en la información de la candidatura suplente",
        });
        falta2 = true;
      }
      if (
        sust_propietario_2.value.escrito_Url == null ||
        sust_propietario_2.value.Nombres_Nuevo == null ||
        sust_propietario_2.value.Apellido_Paterno_Nuevo == null ||
        sust_propietario_2.value.Sexo_Nuevo == null ||
        sust_propietario_2.value.Clave_Elector_Nuevo == null ||
        sust_propietario_2.value.RFC_Nuevo == null ||
        sust_propietario_2.value.CURP_Nuevo == null ||
        sust_propietario_2.value.Fecha_Nacimiento_Nuevo == null ||
        sust_propietario_2.value.Correo_Nuevo == null ||
        sust_propietario_2.value.Pertenece_Grupo_Vulnerable_Nuevo == null
      ) {
        $q.notify({
          position: "center",
          type: "negative",
          message:
            "Campos vacios en la información de la candidatura propietaria sindica",
        });
        falta3 = true;
      }
      if (
        sust_suplente_2.value.escrito_Url == null ||
        sust_suplente_2.value.Nombres_Nuevo == null ||
        sust_suplente_2.value.Apellido_Paterno_Nuevo == null ||
        sust_suplente_2.value.Sexo_Nuevo == null ||
        sust_suplente_2.value.Clave_Elector_Nuevo == null ||
        sust_suplente_2.value.RFC_Nuevo == null ||
        sust_suplente_2.value.CURP_Nuevo == null ||
        sust_suplente_2.value.Fecha_Nacimiento_Nuevo == null ||
        sust_suplente_2.value.Correo_Nuevo == null ||
        sust_suplente_2.value.Pertenece_Grupo_Vulnerable_Nuevo == null
      ) {
        $q.notify({
          position: "center",
          type: "negative",
          message:
            "Campos vacios en la información de la candidatura suplente sindico",
        });
        falta4 = true;
      }
      break;
  }
  if (sustituirPor.value == "Fórmula") {
    if (props.tab != "PYS") {
      if (falta1 == true || falta2 == true) {
        return true;
      } else {
        return false;
      }
    } else if (props.tab == "PYS") {
      if (
        falta1 == true ||
        falta2 == true ||
        falta3 == true ||
        falta4 == true
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
