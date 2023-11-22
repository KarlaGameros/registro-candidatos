<template>
  <q-dialog
    v-model="modal"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card style="width: 1100px; max-width: 110vw">
      <q-card-section class="row">
        <q-space />
        <q-btn
          icon="close"
          @click="actualizarModal(false)"
          flat
          round
          dense
          v-close-popup
        />
        <div class="bg-blue-grey-4" style="border-radius: 5px; width: 1100px">
          <div class="text-h6 text-center text-white">
            {{
              tab == "diputaciones"
                ? "Registro de candidatos a Diputaciones"
                : tab == "presidenciaSindicatura"
                ? "Registro de candidatos a Presidencia y Sindicaturas"
                : "Registro de candidatos a Regidurias"
            }}
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-form class="q-col-gutter-xs" @submit="onSubmit">
          <div class="row">
            <div
              v-if="tab != 'presidenciaSindicatura'"
              class="col-lg-2 col-md-2 col-sm-2 col-xs-12 q-pr-xs"
            >
              <q-select
                v-model="tipo_Eleccion"
                :options="tipos_Elecciones"
                label="Tipo"
                hint="Seleccione un tipo"
              />
            </div>
            <div
              v-if="tipo_Eleccion == 'MR' && tab == 'diputaciones'"
              class="col-lg-3 col-md-3 col-sm-3 col-xs-12"
            >
              <q-select
                v-model="tipo_Eleccion"
                :options="elecciones"
                label="Distrito"
                hint="Seleccione un distrito"
              />
            </div>
            <div
              v-if="
                tab == 'presidenciaSindicatura' ||
                (tab == 'regidurias' && tipo_Eleccion != null)
              "
              class="col-lg-3 col-md-3 col-sm-3 col-xs-12 q-pr-xs"
            >
              <q-select
                v-model="tipo_Eleccion"
                :options="elecciones"
                label="Municipio"
                hint="Seleccione un municipio"
              />
            </div>
            <div
              div
              v-if="tipo_Eleccion == 'MR' && tab == 'regidurias'"
              class="col-lg-3 col-md-3 col-sm-3 col-xs-12"
            >
              <q-select
                v-model="tipo_Eleccion"
                :options="elecciones"
                label="Demarcación"
                hint="Seleccione una demarcación"
              />
            </div>
            <div class="col-lg-1 col-md-1 col-sm-3 col-xs-12">
              <div class="text-subtitle2 text-grey-8">¿Coalición?</div>
              <q-checkbox
                checked-icon="task_alt"
                unchecked-icon="highlight_off"
                size="lg"
                v-model="isCoalicion"
                color="pink"
              />
            </div>
            <div
              v-if="isCoalicion"
              class="col-lg-3 col-md-3 col-sm-3 col-xs-12"
            >
              <q-select
                v-model="tipo_Eleccion"
                :options="elecciones"
                label="Coalición"
                hint="Seleccione una coalición"
              />
            </div>
            <div v-else class="col-lg-3 col-md-3 col-sm-4 col-xs-12 q-pr-xs">
              <q-select
                v-model="partido_Id"
                :options="partidos"
                label="Partido postulante"
                hint="Seleccione el partido postulante"
              />
            </div>
            <div
              v-if="tipo_Eleccion == 'RP'"
              class="col-lg-2 col-md-2 col-sm-2 col-xs-2"
            >
              <q-input
                v-model.number="orden_Prelacion"
                type="number"
                label="Orden de prelación"
                hint="Orden de prelación"
              >
              </q-input>
            </div>
          </div>
          <div class="row"></div>

          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pa-xs">
            <TabPropSup
              :tipo="tipo_Eleccion"
              :coalicion="isCoalicion"
              :tab="tab"
            />
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
                v-if="tipo_Eleccion != null"
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
import { storeToRefs } from "pinia";
import { useExampleStore } from "src/stores/example-store";
import { ref, defineProps } from "vue";
import TabPropSup from "./TabPropSup.vue";

//--------------------------------------------------------------------

const exampleStore = useExampleStore();
const { modal } = storeToRefs(exampleStore);
const tabPropSup = ref("propietario");
const isCoalicion = ref(false);
const tipo_Eleccion = ref(null);
const tipos_Elecciones = ref(["MR", "RP"]);
const orden_Prelacion = ref("");
const partido_Id = ref(null);
const partidos = ref(["PAN", "PRI", "PRD", "Morena"]);
const props = defineProps({
  tab: { type: String, required: true },
});
//--------------------------------------------------------------------

const actualizarModal = (valor) => {
  limpiar();
  exampleStore.actualizarModal(valor);
};

const limpiar = () => {
  isCoalicion.value = false;
  tipo_Eleccion.value = null;
  tabPropSup.value = "propietario";
};

const onSubmit = () => {};

//--------------------------------------------------------------------
</script>

<style></style>
