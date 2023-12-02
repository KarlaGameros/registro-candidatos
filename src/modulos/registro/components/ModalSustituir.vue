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
          v-model="sustituirPor"
          val="formula"
          label="Formula"
          color="teal"
        />
        <q-radio
          v-if="tab != 'PYS'"
          v-model="sustituirPor"
          val="propietario"
          label="Propietario"
          color="teal"
        />
        <q-radio
          v-if="tab != 'PYS'"
          v-model="sustituirPor"
          val="suplente"
          label="Suplente"
          color="teal"
        />
        <q-radio
          v-if="tab == 'PYS'"
          v-model="sustituirPor"
          val="presidencias"
          label="Presicencia "
          color="teal"
        />
        <q-radio
          v-if="tab == 'PYS'"
          v-model="sustituirPor"
          val="sindicaturas"
          label="Sindicaturas "
          color="teal"
        />
      </q-card-section>
      <q-card-section
        v-if="sustituirPor == 'presidencias' || sustituirPor == 'sindicaturas'"
      >
        <q-radio
          v-model="sustituirPor"
          val="formula"
          label="Propietario"
          color="teal"
        />
        <q-radio
          v-model="sustituirPor"
          val="individual"
          label="Suplente"
          color="teal"
        />
      </q-card-section>
      <q-card-section v-if="sustituirPor == 'formula' && !is_Candidato">
        <div class="row">
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 q-pa-xs">
            <q-card>
              <q-card-section horizontal>
                <q-img class="col-3" :src="candidato.url_Foto_Propietario" />
                <q-separator vertical />

                <q-card-section>
                  <div class="text-h6">
                    {{ candidato.nombre_Completo_Propietario }}
                  </div>

                  <q-btn
                    @click="is_Candidato = !is_Candidato"
                    outline
                    style="color: goldenrod"
                    label="Sustituir"
                  />
                </q-card-section>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 q-pa-xs">
            <q-card>
              <q-card-section horizontal>
                <q-img class="col-3" :src="candidato.url_Foto_Suplente" />
                <q-separator vertical />

                <q-card-section>
                  <div class="text-h6">
                    {{ candidato.nombre_Completo_Suplente }}
                  </div>

                  <q-btn outline style="color: goldenrod" label="Sustituir" />
                </q-card-section>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-card-section>
      <q-card-section v-if="sustituirPor == 'propietario'">
        <SustituirPropietario />
      </q-card-section>
      <q-card-section v-if="sustituirPor == 'suplente'"> </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, defineProps } from "vue";
import { storeToRefs } from "pinia";
import { useCandidatosStore } from "src/stores/candidatos-store";
import { useQuasar } from "quasar";
import SustituirPropietario from "../../sustituciones/components/SustituirPropietario.vue";

const $q = useQuasar();
const candidatoStore = useCandidatosStore();
const { modalSustituir, candidato } = storeToRefs(candidatoStore);
const is_Candidato = ref(false);
const sustituirPor = ref(null);

const props = defineProps({
  tab: { type: String, required: true },
});

const actualizarModal = (valor) => {
  $q.loading.show();
  candidatoStore.actualizarModalSustituir(valor);
  $q.loading.hide();
};

const onSubmit = async () => {
  let sustituirFormData = new FormData();
  if (tab == "DIP") {
    if (sustituirPor.value == "propietario") {
      sustituirFormData.append(
        "Nombres_Anterior",
        candidato.nombres_Propietario
      );
      sustituirFormData.append(
        "Apellido_Paterno_Anterior",
        candidato.apellido_Paterno_Propietario
      );
      sustituirFormData.append(
        "Apellido_Materno_Anterior",
        candidato.apellido_Materno_Propietario
      );
      sustituirFormData.append(
        "Mote_Anterior",
        candidato.apellido_Materno_Propietario
      );
    } else if (sustituirFormData.value == "suplente") {
    }
  }
  sustituirFormData.append("Tipo_Sustitucion", "Diputacion 1");

  sustituirFormData.append("Fecha_Sustitucion", "2023-12-01");
  sustituirFormData.append("Fecha_Sustitucion", "2023-12-01");
  sustituirFormData.append("Fecha_Sustitucion", "2023-12-01");
  sustituirFormData.append("Fecha_Sustitucion", "2023-12-01");
};
</script>

<style></style>
