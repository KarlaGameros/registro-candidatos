<template>
  <q-dialog
    v-model="modal"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <template
      v-if="
        perfil == 'Captura Prerrogativas' &&
        (props.tab == 'PYS' || props.tab == 'REG') &&
        visualizar == false &&
        isEditar == false
      "
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
        </q-card-section>
        <q-card-section>
          <div class="text-h6 text-center">
            No tiene permisos para registrar en esta elección.
          </div>
        </q-card-section>
      </q-card>
    </template>
    <template v-else>
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
              {{ isEditar == true ? "Actualizar " : "Registro de "
              }}{{ getTitle() }}
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <q-form class="q-col-gutter-xs" @submit="onSubmit">
            <div class="row">
              <div
                v-if="props.tab != 'PYS' && props.tab != 'GUB'"
                :class="
                  props.tab == 'DIP'
                    ? 'col-lg-3 col-md-3 col-sm-3 col-xs-12 q-pr-xs'
                    : 'col-lg-2 col-md-2 col-sm-2 col-xs-12 q-pr-xs'
                "
              >
                <q-select
                  class="text-uppercase"
                  :disable="visualizar || isEditar"
                  v-model="cargo_Id"
                  :options="tipos_Cargos"
                  label="Tipo"
                  hint="Seleccione un tipo"
                />
              </div>
              <div
                v-if="cargo_Id != 'RP' && cargo_Id != null"
                :class="
                  props.tab == 'PYS'
                    ? 'col-lg-2 col-md-2 col-sm-2 col-xs-2 q-pr-xs text-center'
                    : 'col-lg-3 col-md-3 col-sm-3 col-xs-12 q-pr-xs text-center'
                "
              >
                <q-select
                  :disable="visualizar || isEditar"
                  v-model="postulado_Por"
                  :options="list_Postulacion"
                  label="POSTULACIÓN POR"
                  hint="SELECCIONE POSTULACIÓN"
                  lazy-rules
                  :rules="[(val) => !!val || 'LA POSTULACIÓN ES REQUERIDA']"
                />
              </div>
              <div
                v-if="
                  postulado_Por != 'Partido político' && postulado_Por != null
                "
                class="col-lg-3 col-md-3 col-sm-3 col-xs-12 q-pr-xs"
              >
                <q-select
                  class="text-uppercase"
                  :disable="visualizar || isEditar"
                  v-model="coalicion_Id"
                  :options="
                    postulado_Por == 'Coalición'
                      ? list_Coaliciones
                      : list_Comunes
                  "
                  :label="postulado_Por"
                  :hint="
                    postulado_Por == 'Coalición'
                      ? 'Seleccione una coalición'
                      : 'Seleccione candidatura común'
                  "
                  lazy-rules
                  :rules="[(val) => !!val || 'La coalición es requerida']"
                />
              </div>
              <div
                v-else-if="
                  postulado_Por == 'Partido político' || cargo_Id == 'RP'
                "
                class="col-lg-3 col-md-3 col-sm-3 col-xs-12 q-pr-xs"
              >
                <q-select
                  class="text-uppercase"
                  :disable="visualizar || isEditar"
                  v-model="partido_Id"
                  :options="list_Partidos_Politicos"
                  label="Partido postulante"
                  hint="Seleccione el partido postulante"
                  lazy-rules
                  :rules="[
                    (val) => !!val || 'El partiddo postulante es requerido',
                  ]"
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
              <div
                v-if="
                  cargo_Id == 'MR' &&
                  props.tab == 'DIP' &&
                  postulado_Por != null &&
                  (postulado_Por == 'Partido político'
                    ? partido_Id != null
                    : coalicion_Id != null)
                "
                class="col-lg-3 col-md-3 col-sm-3 col-xs-12 q-pr-xs"
              >
                <q-select
                  class="text-uppercase"
                  :disable="visualizar || isEditar"
                  v-model="distrito_Id"
                  :options="list_Distritos"
                  label="Distrito"
                  hint="Seleccione un distrito"
                  lazy-rules
                  :rules="[(val) => !!val || 'El distrito es requerido']"
                />
              </div>
              <div
                v-if="
                  props.tab != 'DIP' ||
                  (candidaturaRegistrada == true &&
                    (isEditar == true || visualizar == true))
                "
                :class="
                  props.tab == 'PYS'
                    ? 'col-lg-3 col-md-3 col-sm-3 col-xs-12 q-pr-xs'
                    : 'col-lg-2 col-md-2 col-sm-2 col-xs-12 q-pr-xs'
                "
              >
                <q-select
                  class="text-uppercase"
                  v-if="
                    (props.tab == 'PYS' &&
                      (postulado_Por == 'Partido político'
                        ? partido_Id != null
                        : postulado_Por == 'Coalición' ||
                          postulado_Por == 'Candidatura común'
                        ? coalicion_Id != null
                        : postulado_Por != null)) ||
                    (props.tab == 'REG' &&
                      (postulado_Por == 'Partido político'
                        ? partido_Id != null
                        : postulado_Por == 'Coalición' ||
                          postulado_Por == 'Candidatura común'
                        ? coalicion_Id != null
                        : cargo_Id == 'RP'))
                  "
                  :disable="visualizar || isEditar"
                  v-model="municipio_Id"
                  :options="
                    props.tab == 'PYS' ? list_Municipios : list_Municipios_Todos
                  "
                  label="Municipio"
                  hint="Seleccione un municipio"
                  lazy-rules
                  :rules="[(val) => !!val || 'El municipio es requerido']"
                />
              </div>
              <div
                v-if="
                  cargo_Id == 'RP' &&
                  (props.tab == 'DIP'
                    ? partido_Id != null
                    : municipio_Id != null)
                "
                class="col-lg-2 col-md-2 col-sm-2 col-xs-2"
              >
                <q-input
                  :disable="visualizar"
                  class="text-uppercase"
                  v-model.number="orden"
                  type="number"
                  label="Orden de prelación"
                  hint="Orden de prelación"
                >
                </q-input>
              </div>

              <div
                v-if="
                  cargo_Id == 'MR' &&
                  props.tab == 'REG' &&
                  municipio_Id != null &&
                  (partido_Id != null || coalicion_Id != null)
                "
                class="col-lg-2 col-md-2 col-sm-2 col-xs-12 q-pr-sm"
              >
                <q-select
                  class="text-uppercase"
                  :disable="visualizar || isEditar"
                  v-model="demarcacion_Id"
                  :options="list_Demarcaciones"
                  label="Demarcación"
                  hint="Seleccione una demarcación"
                  lazy-rules
                  :rules="[(val) => !!val || 'La demarcación es requerida']"
                />
              </div>
              <div
                class="col-lg-2 col-md-2 col-sm-2 col-xs-2 q-pt-md text-bold text-red"
                v-if="
                  candidaturaRegistrada == true &&
                  visualizar == false &&
                  isEditar == false
                "
              >
                <div class="text-uppercase">Candidatura registrada</div>
              </div>
            </div>
            <div
              v-if="
                candidaturaRegistrada == true &&
                isEditar == false &&
                visualizar == false
              "
            ></div>
            <div v-else class="col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pa-xs">
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
                  :label="
                    props.tab == 'PYS'
                      ? 'Presidencia propietaria'
                      : 'Candidatura propietaria'
                  "
                />
                <q-tab
                  v-if="props.tab != 'GUB'"
                  class="text-blue-grey"
                  name="suplente"
                  :label="
                    props.tab == 'PYS'
                      ? 'Presidencia suplente'
                      : 'Candidatura suplente'
                  "
                />
                <q-tab
                  v-if="props.tab == 'PYS'"
                  class="text-blue-grey"
                  name="sindico_propietario"
                  label="Sindicatura propietaria"
                />
                <q-tab
                  v-if="props.tab == 'PYS'"
                  class="text-blue-grey"
                  name="sindico_suplente"
                  label="Sindicatura suplente"
                />
              </q-tabs>
              <q-tab-panels
                v-model="tabTab"
                animated
                class="shadow-2 rounded-borders"
              >
                <!--PROPIETARIO-->
                <q-tab-panel name="propietario">
                  <q-list bordered class="col-12">
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
                      <div
                        v-if="
                          (postulado_Por == 'Candidatura común' ||
                            postulado_Por == 'Coalición') &&
                          cargo_Id != 'RP'
                        "
                        class="row q-pl-md"
                      >
                        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                          <q-select
                            :disable="visualizar"
                            v-model="partido_Id_prop"
                            :options="list_Partidos_Politicos_Coalcion"
                            label="Partido postulante"
                            hint="Seleccione el partido postulante"
                            lazy-rules
                            :rules="[
                              (val) =>
                                !!val || 'El partiddo postulante es requerido',
                            ]"
                          >
                            <template v-slot:option="scope">
                              <q-item v-bind="scope.itemProps">
                                <q-item-section
                                  avatar
                                  v-if="scope.opt.logo_URL != null"
                                >
                                  <q-img :src="scope.opt.logo_URL" />
                                </q-item-section>
                                <q-item-section>
                                  <q-item-label>{{
                                    scope.opt.label
                                  }}</q-item-label>
                                </q-item-section>
                              </q-item>
                            </template>
                          </q-select>
                        </div>
                      </div>
                      <FormularioDatosGenerales
                        :tipo_Eleccion="props.tab"
                        :rp="cargo_Id == 'RP' ? true : false"
                        :tabTipo="tabTab"
                      />
                    </q-expansion-item>
                    <q-expansion-item
                      v-if="candidato.id != null"
                      v-model="expansion2"
                      @show="expansion = false"
                      @hide="expansion = true"
                      expand-separator
                      icon="folder_open"
                      label="Documentación Requerida"
                      expand-icon-class="text-white"
                      header-class="bg-blue-grey-4 text-white text-subtitle1 text-bold"
                    >
                      <FormularioDocumentacion
                        :tipo_Eleccion="props.tab"
                        :puesto="0"
                        :tipo_Id="tipo_Id"
                      />
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
                      expand-icon-class="text-white"
                      header-class="bg-blue-grey-4 text-white text-subtitle1 text-bold"
                    >
                      <div
                        v-if="
                          (postulado_Por == 'Candidatura común' ||
                            postulado_Por == 'Coalición') &&
                          cargo_Id != 'RP'
                        "
                        class="row q-pl-md"
                      >
                        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                          <q-select
                            :disable="visualizar"
                            v-model="partido_Id_sup"
                            :options="list_Partidos_Politicos_Coalcion"
                            label="Partido postulante"
                            hint="Seleccione el partido postulante"
                            lazy-rules
                            :rules="[
                              (val) =>
                                !!val || 'El partiddo postulante es requerido',
                            ]"
                          >
                            <template v-slot:option="scope">
                              <q-item v-bind="scope.itemProps">
                                <q-item-section
                                  avatar
                                  v-if="scope.opt.logo_URL != null"
                                >
                                  <q-img :src="scope.opt.logo_URL" />
                                </q-item-section>
                                <q-item-section>
                                  <q-item-label>{{
                                    scope.opt.label
                                  }}</q-item-label>
                                </q-item-section>
                              </q-item>
                            </template>
                          </q-select>
                        </div>
                      </div>
                      <FormularioDatosGenerales
                        :tipo_Eleccion="props.tab"
                        :rp="cargo_Id == 'RP' ? true : false"
                        :tabTipo="tabTab"
                      />
                    </q-expansion-item>
                    <q-expansion-item
                      expand-icon-class="text-white"
                      header-class="bg-blue-grey-4 text-white text-subtitle1 text-bold"
                      v-if="candidato.id != null"
                      v-model="expansion2"
                      @show="expansion = false"
                      @hide="expansion = true"
                      expand-separator
                      icon="folder_open"
                      label="Documentación Requerida"
                    >
                      <FormularioDocumentacion
                        :tipo_Eleccion="props.tab"
                        :puesto="1"
                        :tipo_Id="tipo_Id"
                        :tabTipo="tabTab"
                      />
                    </q-expansion-item>
                  </q-list>
                </q-tab-panel>
                <!--SINDICO PROPIETARIO-->
                <q-tab-panel name="sindico_propietario" class="row">
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
                      <div
                        v-if="
                          (postulado_Por == 'Candidatura común' ||
                            postulado_Por == 'Coalición') &&
                          cargo_Id != 'RP'
                        "
                        class="row q-pl-md"
                      >
                        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                          <q-select
                            :disable="visualizar"
                            v-model="partido_Id_prop2"
                            :options="list_Partidos_Politicos_Coalcion"
                            label="Partido postulante"
                            hint="Seleccione el partido postulante"
                            lazy-rules
                            :rules="[
                              (val) =>
                                !!val || 'El partiddo postulante es requerido',
                            ]"
                          >
                            <template v-slot:option="scope">
                              <q-item v-bind="scope.itemProps">
                                <q-item-section
                                  avatar
                                  v-if="scope.opt.logo_URL != null"
                                >
                                  <q-img :src="scope.opt.logo_URL" />
                                </q-item-section>
                                <q-item-section>
                                  <q-item-label>{{
                                    scope.opt.label
                                  }}</q-item-label>
                                </q-item-section>
                              </q-item>
                            </template>
                          </q-select>
                        </div>
                      </div>
                      <FormularioDatosGenerales
                        :tipo_Eleccion="props.tab"
                        :rp="cargo_Id == 'RP' ? true : false"
                        :tabTipo="tabTab"
                      />
                    </q-expansion-item>
                    <q-expansion-item
                      expand-icon-class="text-white"
                      header-class="bg-blue-grey-4 text-white text-subtitle1 text-bold"
                      v-if="candidato.id != null"
                      v-model="expansion2"
                      @show="expansion = false"
                      @hide="expansion = true"
                      expand-separator
                      icon="folder_open"
                      label="Documentación Requerida"
                    >
                      <FormularioDocumentacion
                        :tipo_Eleccion="props.tab"
                        :puesto="2"
                        :tipo_Id="tipo_Id"
                      />
                    </q-expansion-item>
                  </q-list>
                </q-tab-panel>
                <!--SINDICO SUPLENTE-->
                <q-tab-panel name="sindico_suplente" class="row">
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
                      <div
                        v-if="
                          (postulado_Por == 'Candidatura común' ||
                            postulado_Por == 'Coalición') &&
                          cargo_Id != 'RP'
                        "
                        class="row q-pl-md"
                      >
                        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                          <q-select
                            :disable="visualizar"
                            v-model="partido_Id_sup2"
                            :options="list_Partidos_Politicos_Coalcion"
                            label="Partido postulante"
                            hint="Seleccione el partido postulante"
                            lazy-rules
                            :rules="[
                              (val) =>
                                !!val || 'El partiddo postulante es requerido',
                            ]"
                          >
                            <template v-slot:option="scope">
                              <q-item v-bind="scope.itemProps">
                                <q-item-section
                                  avatar
                                  v-if="scope.opt.logo_URL != null"
                                >
                                  <q-img :src="scope.opt.logo_URL" />
                                </q-item-section>
                                <q-item-section>
                                  <q-item-label>{{
                                    scope.opt.label
                                  }}</q-item-label>
                                </q-item-section>
                              </q-item>
                            </template>
                          </q-select>
                        </div>
                      </div>
                      <FormularioDatosGenerales
                        :tipo_Eleccion="props.tab"
                        :rp="cargo_Id == 'RP' ? true : false"
                        :tabTipo="tabTab"
                      />
                    </q-expansion-item>
                    <q-expansion-item
                      expand-icon-class="text-white"
                      header-class="bg-blue-grey-4 text-white text-subtitle1 text-bold"
                      v-if="candidato.id != null"
                      v-model="expansion2"
                      @show="expansion = false"
                      @hide="expansion = true"
                      expand-separator
                      icon="folder_open"
                      label="Documentación Requerida"
                    >
                      <FormularioDocumentacion
                        :tipo_Eleccion="props.tab"
                        :puesto="3"
                        :tipo_Id="tipo_Id"
                      />
                    </q-expansion-item>
                  </q-list>
                </q-tab-panel>
              </q-tab-panels>
              <div
                class="q-pt-md"
                v-if="
                  isDocumentacion == false &&
                  cargo_Id == 'RP' &&
                  partido_Id != null
                "
              >
                <TablaRP
                  :tipo_Id="props.tipo_Id"
                  :partido_Id="partido_Id.value"
                  :tab="props.tab"
                  :municipio_Id="municipio_Id != null ? municipio_Id.value : 0"
                />
              </div>
            </div>
            <q-space />
            <div class="col-12 justify-end">
              <div class="text-right q-gutter-xs">
                <q-btn
                  label="Cerrar"
                  type="reset"
                  color="red"
                  @click="actualizarModal(false)"
                />
                <q-btn
                  v-if="
                    modulo == null
                      ? false
                      : modulo.registrar &&
                        (perfil == 'Captura Prerrogativas'
                          ? props.tab == 'DIP'
                          : props.tab != 'GUB') &&
                        visualizar == false
                  "
                  label="Guardar"
                  type="submit"
                  color="secondary"
                  class="q-ml-sm"
                />
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </template>
  </q-dialog>
</template>

<script setup>
import { useQuasar } from "quasar";
import { storeToRefs } from "pinia";
import { useCandidatosStore } from "src/stores/candidatos-store";
import { useConfiguracionStore } from "src/stores/configuracion-store";
import { ref, defineProps, watch, onBeforeMount } from "vue";
import { useGeneroStore } from "src/stores/genero-store";
import { useAuthStore } from "src/stores/auth-store";
import FormularioDatosGenerales from "./FormularioDatosGenerales.vue";
import FormularioDocumentacion from "./FormularioDocumentacion.vue";
import TablaRP from "./TablaRP.vue";
import ModalSustituir from "./ModalSustituir.vue";

//--------------------------------------------------------------------

const $q = useQuasar();
const configuracionStore = useConfiguracionStore();
const candidatoStore = useCandidatosStore();
const generoStore = useGeneroStore();
const {
  modal,
  candidato,
  isEditar,
  propietario_1,
  propietario_2,
  suplente_1,
  suplente_2,
  foto_1,
  foto_2,
  foto_3,
  foto_4,
  list_RP,
  visualizar,
  isDocumentacion,
  puesto,
} = storeToRefs(candidatoStore);
const {
  list_Municipios,
  list_Distritos,
  list_Demarcaciones,
  list_Partidos_Politicos,
  list_Partidos_Politicos_Coalcion,
  list_Coaliciones,
  list_Distritos_Todos,
  list_Municipios_Todos,
  list_Demarcaciones_Todos,
  candidaturaRegistrada,
  list_Comunes,
} = storeToRefs(configuracionStore);
const coalicion_Id = ref(null);
const cargo_Id = ref(null);
const tipos_Cargos = ref(["MR", "RP"]);
const partido_Id = ref(null);
const partido_Id_prop = ref(null);
const partido_Id_sup = ref(null);
const partido_Id_prop2 = ref(null);
const partido_Id_sup2 = ref(null);
const municipio_Id = ref(null);
const distrito_Id = ref(null);
const demarcacion_Id = ref(null);
const tabTab = ref("propietario");
const expansion = ref(true);
const expansion2 = ref(false);
const orden = ref(null);
const postulado_Por = ref(null);
const list_Filtro_Partidos = ref(null);
const props = defineProps({
  tab: { type: String, required: true },
  tipo_Id: { type: Number, required: true },
});
const list_Postulacion = ref([]);
const perfil = localStorage.getItem("perfil_Letra");
const municipio_CME = localStorage.getItem("municipio_Id");
const authStore = useAuthStore();
const { modulo } = storeToRefs(authStore);
const siglas = "SRC-REG-CL";

//--------------------------------------------------------------------

watch(modal, (val) => {
  if (val == true && props.tab == "PYS") {
    cargo_Id.value = "MR";
  }
});

watch(puesto, (val) => {
  if (val != null) {
    tabTab.value = val;
  }
});

watch(isDocumentacion, (val) => {
  if (val == true) {
    expansion2.value = true;
    expansion.value = false;
  }
});

watch(candidato.value, async (val) => {
  if (val.id != null && modal.value == true) {
    if (val.tipo_Candidato == "MR") {
      postulado_Por.value = val.postulacion;
    }
    orden.value = val.orden;
    cargarTipoCandidato(val);
    cargarCoalicion(val);
    cargarPartidoPolitico(val);

    if (val.siglas != "DIP") {
      cargarMunicipio(val);
    } else if (val.siglas == "DIP") {
      cargarDistrito(val);
    }
  }
});

watch(municipio_Id, (val) => {
  if (val != null && cargo_Id.value != "RP") {
    if (visualizar.value == false) {
      cargarDistritoMunicipioDemarcacion(val.value);
      // demarcacion_Id.value = null;
    }
  }
});

watch(list_RP, (val) => {
  if (val.length > 0 && isEditar.value == false && visualizar.value == false) {
    if (val.length == 24) {
      $q.dialog({
        title:
          "Ya existen 12 candidatos RP registrados en el partido registrado",
        message: "Deberá editar si es necesario",
        icon: "Warning",
        persistent: true,
        transitionShow: "scale",
        transitionHide: "scale",
      }).onOk(async () => {
        limpiar();
        candidatoStore.actualizarModal(false);
      });
    } else {
      orden.value = val.length / 2 + 1;
    }
  } else if (val.length == 0 && isEditar.value == false) {
    orden.value = 1;
  }
});

watch(cargo_Id, async (val) => {
  if (val == "RP") {
    postulado_Por.value = null;
    candidatoStore.initIsCoalicion();
    await configuracionStore.loadPartidosPoliticosRP();
    if (perfil == "Capturista CME") {
      precargarMunicipio(municipio_CME);
    }
  } else {
    if (localStorage.getItem("municipio_letra") == "CME San Blas") {
      list_Postulacion.value = ["Partido político", "Coalición"];
    } else {
      list_Postulacion.value = [
        "Partido político",
        "Coalición",
        "Candidatura común",
      ];
    }
    orden.value = null;
  }
});

watch(postulado_Por, async (val) => {
  if (val != null) {
    partido_Id_prop.value = null;
    partido_Id_sup.value = null;
    partido_Id_prop2.value = null;
    partido_Id_sup2.value = null;

    if (isEditar.value == false) {
      candidaturaRegistrada.value = false;
      coalicion_Id.value = null;
      partido_Id.value = null;
      //distrito_Id.value = null;
      municipio_Id.value = null;
      demarcacion_Id.value = null;
      orden.value = null;
      list_Partidos_Politicos.value = [];
      list_Partidos_Politicos_Coalcion.value = [];
    }

    if (val == "Candidatura común") {
      await configuracionStore.loadComunes();
    } else if (val == "Partido político") {
      await configuracionStore.loadPartidosPoliticos(
        false,
        false,
        false,
        false,
        true
      );
    } else if (val == "Coalición") {
      await configuracionStore.loadPartidosPoliticos(
        false,
        false,
        true,
        false,
        false
      );
    }
  }
});

watch(partido_Id, async (val) => {
  if (val != null) {
    if (cargo_Id.value == "MR") {
      cargarDistritoMunicipioDemarcacion(val.value);
      await configuracionStore.loadMunicipios(false, val.siglas);
    } else {
      await configuracionStore.loadPartidosPoliticosRP();
      await configuracionStore.loadMunicipios(null, "");
    }
  }
  if (perfil == "Capturista CME") {
    precargarMunicipio(municipio_CME);
  }
});

watch(coalicion_Id, async (val) => {
  if (val != null) {
    // partido_Id_prop.value = null;
    // partido_Id_prop2.value = null;
    // partido_Id_sup.value = null;
    // partido_Id_sup2.value = null;
    cargarDistritoMunicipioDemarcacion(val.value);
    await configuracionStore.loadMunicipios(true, val.siglas);
    cargarPartidos(
      val.value,
      postulado_Por.value == "Coalición" ? true : false
    );
    if (perfil == "Capturista CME") {
      precargarMunicipio(municipio_CME);
    }
  }
});

//--------------------------------------------------------------------

const cargarPartidos = async (coalicion_Id, is_Comun) => {
  await configuracionStore.loadPartidosPoliticosCoalicionComun(
    coalicion_Id,
    is_Comun
  );
};

const cargarDistritoMunicipioDemarcacion = async (val) => {
  $q.loading.show();
  if (
    props.tab != "REG" &&
    (partido_Id.value != null || coalicion_Id.value != null) &&
    cargo_Id.value != "RP" &&
    visualizar.value == false
  ) {
    await configuracionStore.loadDisponibles(
      postulado_Por.value == "Partido político" ? partido_Id.value.value : "",
      postulado_Por.value == "Coalición" ||
        postulado_Por.value == "Candidatura común"
        ? coalicion_Id.value.value
        : "",
      props.tipo_Id,
      props.tab,
      props.tab == "REG" ? municipio_Id.value : "",
      postulado_Por.value == "Candidatura común" ? true : false
    );
  } else if (
    props.tab == "REG" &&
    municipio_Id.value != null &&
    (partido_Id.value != null || coalicion_Id.value != null) &&
    cargo_Id.value == "MR"
  ) {
    await configuracionStore.loadDisponibles(
      postulado_Por.value == "Partido político" && partido_Id.value != null
        ? partido_Id.value.value
        : candidato.value.partido_Id,
      postulado_Por.value == "Coalición" ||
        postulado_Por.value == "Candidatura común"
        ? coalicion_Id.value.value
        : "",
      props.tipo_Id,
      props.tab,
      municipio_Id.value.value,
      postulado_Por.value == "Candidatura común" ? true : false
    );
  }
  $q.loading.hide();
};

const cargarDistrito = (val) => {
  if (distrito_Id.value == null && candidaturaRegistrada.value == false) {
    let distritoFiltrado = list_Distritos_Todos.value.find(
      (x) => x.id == `${val.distrito_Id}`
    );
    distrito_Id.value = distritoFiltrado;
  }
};

const cargarTipoCandidato = (val) => {
  if (cargo_Id.value == null) {
    let tipoCandidatoFiltrado = tipos_Cargos.value.find(
      (x) => x == `${val.tipo_Candidato}`
    );
    cargo_Id.value = tipoCandidatoFiltrado;
  }
};

const cargarPartidoPolitico = async (val) => {
  if (val.tipo_Candidato == "RP") {
    await configuracionStore.loadPartidosPoliticosRP();
    if (partido_Id.value == null) {
      let partidoFiltrado = list_Partidos_Politicos.value.find(
        (x) => x.value == `${val.partido_Id}`
      );
      partido_Id.value = partidoFiltrado;
    }
  } else if (val.postulacion == "Candidatura común") {
    await configuracionStore.loadPartidosPoliticos(
      false,
      true,
      false,
      false,
      false
    );
    await configuracionStore.loadPartidosPoliticosCoalicionComun(
      coalicion_Id.value.value,
      false
    );
    list_Partidos_Politicos_Coalcion.value.filter(
      (x) => x.coalicion_Id == val.value
    );

    if (partido_Id_prop.value == null) {
      let partidoFiltrado = list_Partidos_Politicos_Coalcion.value.find(
        (x) => x.value == `${propietario_1.value.partido_Id}`
      );
      partido_Id_prop.value = partidoFiltrado;
    }
    if (partido_Id_sup.value == null) {
      let partidoFiltrado = list_Partidos_Politicos_Coalcion.value.find(
        (x) => x.value == `${suplente_1.value.partido_Id}`
      );
      partido_Id_sup.value = partidoFiltrado;
    }
    if (partido_Id_prop2.value == null) {
      let partidoFiltrado = list_Partidos_Politicos_Coalcion.value.find(
        (x) => x.value == `${propietario_2.value.partido_Id}`
      );
      partido_Id_prop2.value = partidoFiltrado;
    }
    if (partido_Id_sup2.value == null) {
      let partidoFiltrado = list_Partidos_Politicos_Coalcion.value.find(
        (x) => x.value == `${suplente_2.value.partido_Id}`
      );
      partido_Id_sup2.value = partidoFiltrado;
    }
  } else if (val.postulacion == "Coalición") {
    await configuracionStore.loadPartidosPoliticosCoalicionComun(
      val.coalicion_Id,
      true
    );
    list_Partidos_Politicos_Coalcion.value.filter(
      (x) => x.coalicion_Id == val.value
    );

    if (partido_Id_prop.value == null) {
      let partidoFiltrado = list_Partidos_Politicos_Coalcion.value.find(
        (x) => x.value == `${propietario_1.value.partido_Id}`
      );
      partido_Id_prop.value = partidoFiltrado;
    }
    if (partido_Id_sup.value == null) {
      let partidoFiltrado = list_Partidos_Politicos_Coalcion.value.find(
        (x) => x.value == `${suplente_1.value.partido_Id}`
      );
      partido_Id_sup.value = partidoFiltrado;
    }
    if (partido_Id_prop2.value == null) {
      let partidoFiltrado = list_Partidos_Politicos_Coalcion.value.find(
        (x) => x.value == `${propietario_2.value.partido_Id}`
      );
      partido_Id_prop2.value = partidoFiltrado;
    }
    if (partido_Id_sup2.value == null) {
      let partidoFiltrado = list_Partidos_Politicos_Coalcion.value.find(
        (x) => x.value == `${suplente_2.value.partido_Id}`
      );
      partido_Id_sup2.value = partidoFiltrado;
    }
  } else {
    await configuracionStore.loadPartidosPoliticos(
      false,
      false,
      false,
      false,
      true
    );
    if (partido_Id.value == null) {
      let partidoFiltrado = list_Partidos_Politicos.value.find(
        (x) => x.value == `${val.partido_Id}`
      );
      partido_Id.value = partidoFiltrado;
    }
  }
};

const cargarCoalicion = async (val) => {
  if (val.postulacion == "Coalición") {
    await configuracionStore.loadCoaliciones();
    if (coalicion_Id.value == null) {
      let coalicionFiltrado = list_Coaliciones.value.find(
        (x) => x.value == `${val.coalicion_Id}`
      );
      coalicion_Id.value = coalicionFiltrado;
    }
  } else if (val.postulacion == "Candidatura común") {
    await configuracionStore.loadComunes();
    if (coalicion_Id.value == null) {
      let coalicionFiltrado = list_Comunes.value.find(
        (x) => x.value == `${val.comun_Id}`
      );
      coalicion_Id.value = coalicionFiltrado;
    }
  }
};

const cargarMunicipio = async (val) => {
  await configuracionStore.loadDemarcaciones(val.municipio_Id, false);
  if (municipio_Id.value == null && candidaturaRegistrada.value == false) {
    let municipioFiltrado = list_Municipios_Todos.value.find(
      (x) => x.value == `${val.municipio_Id}`
    );
    municipio_Id.value = municipioFiltrado;
  }
  cargarDemarcacion(val);
};

const precargarMunicipio = async (val) => {
  await configuracionStore.loadDemarcaciones(val, false);
  if (municipio_Id.value == null && candidaturaRegistrada.value == false) {
    let municipioFiltrado = list_Municipios_Todos.value.find(
      (x) => x.value == `${val}`
    );
    municipio_Id.value = municipioFiltrado;
  }
  cargarDemarcacion(val);
};

const cargarDemarcacion = (val) => {
  if (demarcacion_Id.value == null) {
    let demarcacionFiltrado = list_Demarcaciones_Todos.value.find(
      (x) => x.value == `${val.demarcacion_Id}`
    );
    demarcacion_Id.value = demarcacionFiltrado;
  }
};

const getTitle = () => {
  if (props.tab == "GUB") {
    return "candidaturas a Gubernatura";
  } else if (props.tab == "DIP") {
    return "candidaturas a Diputaciones";
  } else if (props.tab == "PYS") {
    return "candidaturas a Presidencias y Sindicaturas";
  } else {
    return "candidaturas a Regidurías";
  }
};

const actualizarModal = (valor) => {
  $q.loading.show();
  limpiar();
  candidatoStore.initCandidato();
  candidatoStore.actualizarVisualizar(false);
  candidatoStore.actualizarModal(valor);
  candidatoStore.actualizarIsDocumentacion(false);
  puesto.value = null;
  candidaturaRegistrada.value = false;
  $q.loading.hide();
};

const limpiar = () => {
  tabTab.value = "propietario";
  cargo_Id.value = null;
  distrito_Id.value = null;
  municipio_Id.value = null;
  demarcacion_Id.value = null;
  partido_Id.value = null;
  partido_Id_prop.value = null;
  partido_Id_prop2.value = null;
  partido_Id_sup.value = null;
  partido_Id_sup2.value = null;
  coalicion_Id.value = null;
  orden.value = null;
  postulado_Por.value = null;
  list_Filtro_Partidos.value = [];
};

const onSubmit = async () => {
  let validarPropietario = false;
  if (cargo_Id.value == "MR" || cargo_Id.value == null) {
    if (postulado_Por.value != "Partido político") {
      if (
        partido_Id_prop.value == null ||
        propietario_1.value.nombres == null ||
        propietario_1.value.nombres == "" ||
        propietario_1.value.apellido_Paterno == null ||
        propietario_1.value.apellido_Paterno == "" ||
        propietario_1.value.curp == null ||
        propietario_1.value.curp == "" ||
        propietario_1.value.clave_Elector == null ||
        propietario_1.value.clave_Elector == "" ||
        propietario_1.value.rfc == null ||
        propietario_1.value.rfc == "" ||
        propietario_1.value.fecha_Nacimiento == null ||
        propietario_1.value.sexo == null ||
        propietario_1.value.correo == null ||
        propietario_1.value.fecha_Nacimiento == ""
      ) {
        $q.notify({
          position: "center",
          type: "negative",
          message:
            "Es obligatorio registrar la información completa del propietario",
        });
        validarPropietario = false;
      } else if (
        partido_Id_sup.value == null &&
        (suplente_1.value.nombres != null ||
          suplente_1.value.apellido_Paterno != null ||
          suplente_1.value.curp != null ||
          suplente_1.value.clave_Elector != null ||
          suplente_1.value.rfc != null ||
          suplente_1.value.fecha_Nacimiento != null ||
          suplente_1.value.sexo != null ||
          suplente_1.value.correo != null)
      ) {
        $q.notify({
          position: "center",
          type: "negative",
          message: "Completar el registro de la candidatura suplente",
        });
        validarPropietario = false;
      } else if (
        partido_Id_sup.value != null &&
        (suplente_1.value.nombres == null ||
          suplente_1.value.apellido_Paterno == null ||
          suplente_1.value.curp == null ||
          suplente_1.value.clave_Elector == null ||
          suplente_1.value.rfc == null ||
          suplente_1.value.fecha_Nacimiento == null ||
          suplente_1.value.sexo == null ||
          suplente_1.value.correo == null)
      ) {
        $q.notify({
          position: "center",
          type: "negative",
          message: "Completar el registro de la candidatura suplente",
        });
        validarPropietario = false;
      } else if (
        partido_Id_prop2.value == null &&
        props.tab == "PYS" &&
        (propietario_2.value.nombres != null ||
          propietario_2.value.apellido_Paterno != null ||
          propietario_2.value.curp != null ||
          propietario_2.value.clave_Elector != null ||
          propietario_2.value.rfc != null ||
          propietario_2.value.fecha_Nacimiento != null ||
          propietario_2.value.sexo != null ||
          propietario_2.value.correo != null)
      ) {
        $q.notify({
          position: "center",
          type: "negative",
          message:
            "Completar el registro de la candidatura propietaria sindica",
        });
        validarPropietario = false;
      } else if (
        partido_Id_prop2.value != null &&
        props.tab == "PYS" &&
        (propietario_2.value.nombres == null ||
          propietario_2.value.apellido_Paterno == null ||
          propietario_2.value.curp == null ||
          propietario_2.value.clave_Elector == null ||
          propietario_2.value.rfc == null ||
          propietario_2.value.fecha_Nacimiento == null ||
          propietario_2.value.sexo == null ||
          propietario_2.value.correo == null)
      ) {
        $q.notify({
          position: "center",
          type: "negative",
          message:
            "Completar el registro de la candidatura propietaria sindica",
        });
        validarPropietario = false;
      } else if (
        partido_Id_sup2.value == null &&
        props.tab == "PYS" &&
        (suplente_2.value.nombres != null ||
          suplente_2.value.apellido_Paterno != null ||
          suplente_2.value.curp != null ||
          suplente_2.value.clave_Elector != null ||
          suplente_2.value.rfc != null ||
          suplente_2.value.fecha_Nacimiento != null ||
          suplente_2.value.sexo != null ||
          suplente_2.value.correo != null)
      ) {
        $q.notify({
          position: "center",
          type: "negative",
          message: "Completar el registro de la candidatura suplente sindica",
        });
        validarPropietario = false;
      } else if (
        partido_Id_sup2.value != null &&
        props.tab == "PYS" &&
        (suplente_2.value.nombres == null ||
          suplente_2.value.apellido_Paterno == null ||
          suplente_2.value.curp == null ||
          suplente_2.value.clave_Elector == null ||
          suplente_2.value.rfc == null ||
          suplente_2.value.fecha_Nacimiento == null ||
          suplente_2.value.sexo == null ||
          suplente_2.value.correo == null)
      ) {
        $q.notify({
          position: "center",
          type: "negative",
          message: "Completar el registro de la candidatura suplente",
        });
        validarPropietario = false;
      } else {
        validarPropietario = true;
      }
    } else {
      if (
        propietario_1.value.nombres == null ||
        propietario_1.value.curp == null ||
        propietario_1.value.clave_Elector == null ||
        propietario_1.value.rfc == null ||
        propietario_1.value.fecha_Nacimiento == null ||
        propietario_1.value.sexo == null ||
        propietario_1.value.correo == null
      ) {
        $q.notify({
          position: "center",
          type: "negative",
          message:
            "Es obligatorio registrar la información completa del propietario",
        });
        validarPropietario = false;
      } else {
        validarPropietario = true;
      }
    }
  } else {
    if (
      propietario_1.value.nombres == null ||
      propietario_1.value.curp == null ||
      propietario_1.value.clave_Elector == null ||
      propietario_1.value.rfc == null ||
      propietario_1.value.fecha_Nacimiento == null ||
      propietario_1.value.sexo == null ||
      propietario_1.value.correo == null
    ) {
      $q.notify({
        position: "center",
        type: "negative",
        message:
          "Es obligatorio registrar la información completa del propietario",
      });
      validarPropietario = false;
    } else {
      validarPropietario = true;
    }
  }
  if (validarPropietario == true) {
    $q.dialog({
      title: "Atención",
      message: `¿Está seguro de guardar en ${
        props.tab == "DIP"
          ? `Diputaciones`
          : props.tab == "PYS"
          ? `Presidencias y Sindicaturas`
          : props.tab == "REG" && cargo_Id.value == "MR"
          ? `Regidurías`
          : props.tab == "REG" && cargo_Id.value == "RP"
          ? "Regidurías RP"
          : ""
      }?
      <b>${
        props.tab == "DIP" && cargo_Id.value == "MR"
          ? `Distrito: ${distrito_Id.value.label}`
          : props.tab == "PYS"
          ? `Municipio: ${municipio_Id.value.label}`
          : props.tab == "REG" && cargo_Id.value == "MR"
          ? `Municipio: ${municipio_Id.value.label}-${demarcacion_Id.value.label}`
          : props.tab == "REG" && cargo_Id.value == "RP"
          ? `Municipio: ${municipio_Id.value.label} con orden de prelación ${orden.value} del partido ${partido_Id.value.label}`
          : ""
      }</b>
      `,
      html: true,
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
        let claveCurp = await validarClaveCurp();
        if (claveCurp == false) {
          if (
            props.tab == "DIP" &&
            ((cargo_Id.value == "MR" &&
              propietario_1.value.pertenece_Grupo_Vulnerable == true &&
              propietario_1.value.grupo_Vulnerable_1 == false &&
              propietario_1.value.grupo_Vulnerable_2 == false &&
              propietario_1.value.grupo_Vulnerable_3 == false) ||
              (cargo_Id.value == "RP" &&
                propietario_1.value.pertenece_Grupo_Vulnerable == true &&
                propietario_1.value.grupo_Vulnerable_1 == false &&
                propietario_1.value.grupo_Vulnerable_2 == false &&
                propietario_1.value.grupo_Vulnerable_3 == false &&
                propietario_1.value.grupo_Vulnerable_4 == false))
          ) {
            $q.loading.hide();
            $q.dialog({
              title: "Atención",
              message:
                "Debe de indicar a que grupo pertenece la candidatura propietaria",
              icon: "Warning",
              persistent: true,
              transitionShow: "scale",
              transitionHide: "scale",
            });
          } else if (
            props.tab == "DIP" &&
            ((cargo_Id.value == "MR" &&
              suplente_1.value.pertenece_Grupo_Vulnerable == true &&
              suplente_1.value.grupo_Vulnerable_1 == false &&
              suplente_1.value.grupo_Vulnerable_2 == false &&
              suplente_1.value.grupo_Vulnerable_3 == false) ||
              (cargo_Id.value == "RP" &&
                suplente_1.value.pertenece_Grupo_Vulnerable == true &&
                suplente_1.value.grupo_Vulnerable_1 == false &&
                suplente_1.value.grupo_Vulnerable_2 == false &&
                suplente_1.value.grupo_Vulnerable_3 == false &&
                suplente_1.value.grupo_Vulnerable_4 == false))
          ) {
            $q.loading.hide();
            $q.dialog({
              title: "Atención",
              message:
                "Debe de indicar a que grupo pertenece la candidatura suplente",
              icon: "Warning",
              persistent: true,
              transitionShow: "scale",
              transitionHide: "scale",
            });
          } else if (
            props.tab == "PYS" &&
            propietario_1.value.pertenece_Grupo_Vulnerable == true &&
            propietario_1.value.grupo_Vulnerable_1 == false &&
            propietario_1.value.grupo_Vulnerable_2 == false
          ) {
            $q.loading.hide();
            $q.dialog({
              title: "Atención",
              message:
                "Debe de indicar a que grupo pertenece la candidatura propietaria",
              icon: "Warning",
              persistent: true,
              transitionShow: "scale",
              transitionHide: "scale",
            });
          } else if (
            props.tab == "PYS" &&
            suplente_1.value.pertenece_Grupo_Vulnerable == true &&
            suplente_1.value.grupo_Vulnerable_1 == false &&
            suplente_1.value.grupo_Vulnerable_2 == false
          ) {
            $q.loading.hide();
            $q.dialog({
              title: "Atención",
              message:
                "Debe de indicar a que grupo pertenece la candidatura suplente",
              icon: "Warning",
              persistent: true,
              transitionShow: "scale",
              transitionHide: "scale",
            });
          } else if (
            props.tab == "PYS" &&
            propietario_2.value.pertenece_Grupo_Vulnerable == true &&
            propietario_2.value.grupo_Vulnerable_1 == false &&
            propietario_2.value.grupo_Vulnerable_2 == false
          ) {
            $q.loading.hide();
            $q.dialog({
              title: "Atención",
              message:
                "Debe de indicar a que grupo pertenece la candidatura propietaria sindica",
              icon: "Warning",
              persistent: true,
              transitionShow: "scale",
              transitionHide: "scale",
            });
          } else if (
            props.tab == "PYS" &&
            suplente_2.value.pertenece_Grupo_Vulnerable == true &&
            suplente_2.value.grupo_Vulnerable_1 == false &&
            suplente_2.value.grupo_Vulnerable_2 == false
          ) {
            $q.loading.hide();
            $q.dialog({
              title: "Atención",
              message:
                "Debe de indicar a que grupo pertenece la candidatura suplente sindico",
              icon: "Warning",
              persistent: true,
              transitionShow: "scale",
              transitionHide: "scale",
            });
          } else if (
            props.tab == "REG" &&
            ((cargo_Id.value == "MR" &&
              propietario_1.value.pertenece_Grupo_Vulnerable == true &&
              propietario_1.value.grupo_Vulnerable_1 == false &&
              propietario_1.value.grupo_Vulnerable_2 == false) ||
              (cargo_Id.value == "RP" &&
                propietario_1.value.pertenece_Grupo_Vulnerable == true &&
                propietario_1.value.grupo_Vulnerable_1 == false &&
                propietario_1.value.grupo_Vulnerable_2 == false))
          ) {
            $q.loading.hide();
            $q.dialog({
              title: "Atención",
              message:
                "Debe de indicar a que grupo pertenece en la candidatura propietaria",
              icon: "Warning",
              persistent: true,
              transitionShow: "scale",
              transitionHide: "scale",
            });
          } else if (
            props.tab == "REG" &&
            ((cargo_Id.value == "MR" &&
              suplente_1.value.pertenece_Grupo_Vulnerable == true &&
              suplente_1.value.grupo_Vulnerable_1 == false &&
              suplente_1.value.grupo_Vulnerable_2 == false) ||
              (cargo_Id.value == "RP" &&
                suplente_1.value.pertenece_Grupo_Vulnerable == true &&
                suplente_1.value.grupo_Vulnerable_1 == false &&
                suplente_1.value.grupo_Vulnerable_2 == false))
          ) {
            $q.loading.hide();
            $q.dialog({
              title: "Atención",
              message:
                "Debe de indicar a que grupo pertenece en la candidatura suplente",
              icon: "Warning",
              persistent: true,
              transitionShow: "scale",
              transitionHide: "scale",
            });
          } else {
            $q.loading.show();
            let candidatoFormData = new FormData();
            candidatoFormData.append(
              "Is_Coalicion",
              postulado_Por.value == "Coalición" ? true : false
            );
            candidatoFormData.append(
              "Is_Comun",
              postulado_Por.value == "Candidatura común" ? true : false
            );
            candidatoFormData.append("Estatus", candidato.value.estatus);
            candidatoFormData.append("Tipo_Eleccion_Id", props.tipo_Id);

            if (props.tab == "PYS" || props.tab == "GUB") {
              candidatoFormData.append("Tipo_Candidato", "MR");
            } else {
              candidatoFormData.append("Tipo_Candidato", cargo_Id.value);
            }
            if (distrito_Id.value != null)
              candidatoFormData.append("Distrito_Id", distrito_Id.value.id);
            if (municipio_Id.value != null)
              candidatoFormData.append(
                "Municipio_Id",
                municipio_Id.value.value
              );
            if (demarcacion_Id.value != null)
              candidatoFormData.append(
                "Demarcacion_Id",
                demarcacion_Id.value.value
              );
            if (
              coalicion_Id.value != null &&
              postulado_Por.value == "Coalición"
            )
              candidatoFormData.append(
                "Coalicion_Id",
                coalicion_Id.value.value
              );
            if (
              coalicion_Id.value != null &&
              postulado_Por.value == "Candidatura común"
            )
              candidatoFormData.append("Comun_Id", coalicion_Id.value.value);
            if (orden.value != null)
              candidatoFormData.append("Orden", orden.value);
            //------------PROPIETARIO------------
            if (propietario_1.value.nombres != null)
              candidatoFormData.append(
                "Nombres_Propietario",
                propietario_1.value.nombres.toUpperCase()
              );
            if (propietario_1.value.apellido_Paterno != null)
              candidatoFormData.append(
                "Apellido_Paterno_Propietario",
                propietario_1.value.apellido_Paterno.toUpperCase()
              );
            if (propietario_1.value.apellido_Materno != null)
              candidatoFormData.append(
                "Apellido_Materno_Propietario",
                propietario_1.value.apellido_Materno.toUpperCase()
              );
            if (propietario_1.value.mote != null)
              candidatoFormData.append(
                "Mote_Propietario",
                propietario_1.value.mote.toUpperCase()
              );
            if (propietario_1.value.sexo != null)
              candidatoFormData.append(
                "Sexo_Propietario",
                propietario_1.value.sexo
              );
            if (foto_1.value.url_Foto != null)
              candidatoFormData.append(
                "Foto_Propietario",
                foto_1.value.url_Foto
              );
            if (propietario_1.value.clave_Elector != null)
              candidatoFormData.append(
                "Clave_Elector_Propietario",
                propietario_1.value.clave_Elector.toUpperCase()
              );
            if (propietario_1.value.rfc != null)
              candidatoFormData.append(
                "RFC_Propietario",
                propietario_1.value.rfc.toUpperCase()
              );
            if (propietario_1.value.curp != null)
              candidatoFormData.append(
                "CURP_Propietario",
                propietario_1.value.curp.toUpperCase()
              );
            if (propietario_1.value.fecha_Nacimiento != null)
              candidatoFormData.append(
                "Fecha_Nacimiento_Propietario",
                propietario_1.value.fecha_Nacimiento
              );
            if (propietario_1.value.ocupacion != null)
              candidatoFormData.append(
                "Ocupacion_Propietario",
                propietario_1.value.ocupacion
              );
            if (propietario_1.value.telefonos != null) {
              let newTelefono = propietario_1.value.telefonos.toString(", ");
              //let newTelefono = `${propietario_1.value.tel1},${propietario_1.value.tel2},${propietario_1.value.tel3}`;
              candidatoFormData.append("Telefono_Propietario", newTelefono);
            }
            if (propietario_1.value.correo != null)
              candidatoFormData.append(
                "Correo_Propietario",
                propietario_1.value.correo.toLowerCase()
              );
            if (propietario_1.value.pertenece_Grupo_Vulnerable == true) {
              candidatoFormData.append(
                "Pertenece_Grupo_Vulnerable_Propietario",
                propietario_1.value.pertenece_Grupo_Vulnerable
              );
              const grupos = `${propietario_1.value.grupo_Vulnerable_1}|${
                propietario_1.value.grupo_Vulnerable_1 == true
                  ? propietario_1.value.describir_Pueblos
                  : "-"
              }`.concat(
                `||${propietario_1.value.grupo_Vulnerable_2}|${
                  propietario_1.value.grupo_Vulnerable_2 == true
                    ? propietario_1.value.describir_Diversidad
                    : "-"
                }||${propietario_1.value.grupo_Vulnerable_3}|${
                  propietario_1.value.grupo_Vulnerable_3 == true
                    ? propietario_1.value.describir_Discapacidad
                    : "-"
                }||${propietario_1.value.grupo_Vulnerable_4}|${
                  propietario_1.value.grupo_Vulnerable_4 == true
                    ? propietario_1.value.describir_Migrante
                    : "-"
                }`
              );
              candidatoFormData.append("Grupo_Vulnerable_Propietario", grupos);
            } else {
              candidatoFormData.append(
                "Pertenece_Grupo_Vulnerable_Propietario",
                false
              );
              candidatoFormData.append("Grupo_Vulnerable_Propietario", "");
            }
            if (propietario_1.value.consecutivo != null) {
              candidatoFormData.append(
                "Consecutivo_Propietario",
                propietario_1.value.consecutivo
              );
            }
            if (propietario_1.value.edad != null)
              candidatoFormData.append(
                "Edad_Propietario",
                propietario_1.value.edad
              );

            //------------PROPIETARIO 2------------
            if (propietario_2.value.nombres != null)
              candidatoFormData.append(
                "Nombres_Propietario_2",
                propietario_2.value.nombres.toUpperCase()
              );
            if (propietario_2.value.apellido_Paterno != null)
              candidatoFormData.append(
                "Apellido_Paterno_Propietario_2",
                propietario_2.value.apellido_Paterno.toUpperCase()
              );
            if (propietario_2.value.apellido_Materno != null)
              candidatoFormData.append(
                "Apellido_Materno_Propietario_2",
                propietario_2.value.apellido_Materno.toUpperCase()
              );
            if (propietario_2.value.mote != null)
              candidatoFormData.append(
                "Mote_Propietario_2",
                propietario_2.value.mote.toUpperCase()
              );
            if (propietario_2.value.sexo != null)
              candidatoFormData.append(
                "Sexo_Propietario_2",
                propietario_2.value.sexo
              );
            if (foto_3.value.url_Foto != null)
              candidatoFormData.append(
                "Foto_Propietario_2",
                foto_3.value.url_Foto
              );
            if (propietario_2.value.clave_Elector != null)
              candidatoFormData.append(
                "Clave_Elector_Propietario_2",
                propietario_2.value.clave_Elector.toUpperCase()
              );
            if (propietario_2.value.rfc != null)
              candidatoFormData.append(
                "RFC_Propietario_2",
                propietario_2.value.rfc.toUpperCase()
              );
            if (propietario_2.value.curp != null)
              candidatoFormData.append(
                "CURP_Propietario_2",
                propietario_2.value.curp.toUpperCase()
              );
            if (propietario_2.value.fecha_Nacimiento != null)
              candidatoFormData.append(
                "Fecha_Nacimiento_Propietario_2",
                propietario_2.value.fecha_Nacimiento
              );
            if (propietario_2.value.ocupacion != null)
              candidatoFormData.append(
                "Ocupacion_Propietario_2",
                propietario_2.value.ocupacion
              );
            if (propietario_2.value.telefonos != null) {
              let newTelefono = propietario_2.value.telefonos.toString(", ");
              candidatoFormData.append("Telefono_Propietario_2", newTelefono);
            }
            if (propietario_2.value.correo != null)
              candidatoFormData.append(
                "Correo_Propietario_2",
                propietario_2.value.correo.toLowerCase()
              );

            if (propietario_2.value.pertenece_Grupo_Vulnerable == true) {
              candidatoFormData.append(
                "Pertenece_Grupo_Vulnerable_Propietario_2",
                propietario_2.value.pertenece_Grupo_Vulnerable
              );
              const grupos = `${propietario_2.value.grupo_Vulnerable_1}|${
                propietario_2.value.grupo_Vulnerable_1 == true
                  ? propietario_2.value.describir_Pueblos
                  : "-"
              }`.concat(
                `||${propietario_2.value.grupo_Vulnerable_2}|${
                  propietario_2.value.grupo_Vulnerable_2 == true
                    ? propietario_2.value.describir_Diversidad
                    : "-"
                }||${propietario_2.value.grupo_Vulnerable_3}|${
                  propietario_2.value.grupo_Vulnerable_3 == true
                    ? propietario_2.value.describir_Diversidad
                    : "-"
                }||${propietario_2.value.grupo_Vulnerable_4}|${
                  propietario_2.value.grupo_Vulnerable_4 == true
                    ? propietario_2.value.describir_Migrante
                    : "-"
                }`
              );
              candidatoFormData.append(
                "Grupo_Vulnerable_Propietario_2",
                grupos
              );
            } else {
              candidatoFormData.append(
                "Pertenece_Grupo_Vulnerable_Propietario_2",
                false
              );
              candidatoFormData.append("Grupo_Vulnerable_Propietario_2", "");
            }
            if (propietario_2.value.consecutivo != null) {
              candidatoFormData.append(
                "Consecutivo_Propietario_2",
                propietario_2.value.consecutivo
              );
            }
            if (propietario_2.value.edad != null)
              candidatoFormData.append(
                "Edad_Propietario_2",
                propietario_2.value.edad
              );

            //------------SUPLENTE------------
            if (suplente_1.value.nombres != null)
              candidatoFormData.append(
                "Nombres_Suplente",
                suplente_1.value.nombres.toUpperCase()
              );
            if (suplente_1.value.apellido_Paterno != null)
              candidatoFormData.append(
                "Apellido_Paterno_Suplente",
                suplente_1.value.apellido_Paterno.toUpperCase()
              );
            if (suplente_1.value.apellido_Materno != null)
              candidatoFormData.append(
                "Apellido_Materno_Suplente",
                suplente_1.value.apellido_Materno.toUpperCase()
              );
            if (suplente_1.value.mote != null)
              candidatoFormData.append(
                "Mote_Suplente",
                suplente_1.value.mote.toUpperCase()
              );
            if (suplente_1.value.sexo != null)
              candidatoFormData.append("Sexo_Suplente", suplente_1.value.sexo);
            if (foto_2.value.url_Foto != null)
              candidatoFormData.append("Foto_Suplente", foto_2.value.url_Foto);
            if (suplente_1.value.clave_Elector != null)
              candidatoFormData.append(
                "Clave_Elector_Suplente",
                suplente_1.value.clave_Elector.toUpperCase()
              );
            if (suplente_1.value.rfc != null)
              candidatoFormData.append(
                "RFC_Suplente",
                suplente_1.value.rfc.toUpperCase()
              );
            if (suplente_1.value.curp != null)
              candidatoFormData.append(
                "CURP_Suplente",
                suplente_1.value.curp.toUpperCase()
              );
            if (suplente_1.value.fecha_Nacimiento != null)
              candidatoFormData.append(
                "Fecha_Nacimiento_Suplente",
                suplente_1.value.fecha_Nacimiento
              );
            if (suplente_1.value.ocupacion != null)
              candidatoFormData.append(
                "Ocupacion_Suplente",
                suplente_1.value.ocupacion
              );
            if (suplente_1.value.telefonos != null) {
              let newTelefono = suplente_1.value.telefonos.toString(", ");
              candidatoFormData.append("Telefono_Suplente", newTelefono);
            }
            if (suplente_1.value.correo != null)
              candidatoFormData.append(
                "Correo_Suplente",
                suplente_1.value.correo.toLowerCase()
              );
            if (suplente_1.value.pertenece_Grupo_Vulnerable == true) {
              candidatoFormData.append(
                "Pertenece_Grupo_Vulnerable_Suplente",
                suplente_1.value.pertenece_Grupo_Vulnerable
              );
              const grupos = `${suplente_1.value.grupo_Vulnerable_1}|${
                suplente_1.value.grupo_Vulnerable_1 == true
                  ? suplente_1.value.describir_Pueblos
                  : "-"
              }`.concat(
                `||${suplente_1.value.grupo_Vulnerable_2}|${
                  suplente_1.value.grupo_Vulnerable_2 == true
                    ? suplente_1.value.describir_Diversidad
                    : "-"
                }||${suplente_1.value.grupo_Vulnerable_3}|${
                  suplente_1.value.grupo_Vulnerable_3 == true
                    ? suplente_1.value.describir_Discapacidad
                    : "-"
                }||${suplente_1.value.grupo_Vulnerable_4}|${
                  suplente_1.value.grupo_Vulnerable_4 == true
                    ? suplente_1.value.describir_Migrante
                    : "-"
                }`
              );
              candidatoFormData.append("Grupo_Vulnerable_Suplente", grupos);
            } else {
              candidatoFormData.append(
                "Pertenece_Grupo_Vulnerable_Suplente",
                false
              );
              candidatoFormData.append("Grupo_Vulnerable_Suplente", "");
            }
            if (suplente_1.value.edad != null)
              candidatoFormData.append("Edad_Suplente", suplente_1.value.edad);
            //------------SUPLENTE 2------------
            if (suplente_2.value.nombres != null)
              candidatoFormData.append(
                "Nombres_Suplente_2",
                suplente_2.value.nombres.toUpperCase()
              );
            if (suplente_2.value.apellido_Paterno != null)
              candidatoFormData.append(
                "Apellido_Paterno_Suplente_2",
                suplente_2.value.apellido_Paterno.toUpperCase()
              );
            if (suplente_2.value.apellido_Materno != null)
              candidatoFormData.append(
                "Apellido_Materno_Suplente_2",
                suplente_2.value.apellido_Materno.toUpperCase()
              );
            if (suplente_2.value.mote != null)
              candidatoFormData.append(
                "Mote_Suplente_2",
                suplente_2.value.mote.toUpperCase()
              );
            if (suplente_2.value.sexo != null)
              candidatoFormData.append(
                "Sexo_Suplente_2",
                suplente_2.value.sexo
              );
            if (foto_4.value.url_Foto != null)
              candidatoFormData.append(
                "Foto_Suplente_2",
                foto_4.value.url_Foto
              );
            if (suplente_2.value.clave_Elector != null)
              candidatoFormData.append(
                "Clave_Elector_Suplente_2",
                suplente_2.value.clave_Elector.toUpperCase()
              );
            if (suplente_2.value.rfc != null)
              candidatoFormData.append(
                "RFC_Suplente_2",
                suplente_2.value.rfc.toUpperCase()
              );
            if (suplente_2.value.curp != null)
              candidatoFormData.append(
                "CURP_Suplente_2",
                suplente_2.value.curp.toUpperCase()
              );
            if (suplente_2.value.fecha_Nacimiento != null)
              candidatoFormData.append(
                "Fecha_Nacimiento_Suplente_2",
                suplente_2.value.fecha_Nacimiento
              );
            if (suplente_2.value.ocupacion != null)
              candidatoFormData.append(
                "Ocupacion_Suplente_2",
                suplente_2.value.ocupacion
              );
            if (suplente_2.value.telefonos != null) {
              let newTelefono = suplente_2.value.telefonos.toString(", ");
              candidatoFormData.append("Telefono_Suplente_2", newTelefono);
            }
            if (suplente_2.value.correo != null)
              candidatoFormData.append(
                "Correo_Suplente_2",
                suplente_2.value.correo.toLowerCase()
              );
            if (suplente_2.value.pertenece_Grupo_Vulnerable == true) {
              candidatoFormData.append(
                "Pertenece_Grupo_Vulnerable_Suplente_2",
                suplente_2.value.pertenece_Grupo_Vulnerable
              );
              const grupos = `${suplente_2.value.grupo_Vulnerable_1}|${
                suplente_2.value.grupo_Vulnerable_1 == true
                  ? suplente_2.value.describir_Pueblos
                  : "-"
              }`.concat(
                `||${suplente_2.value.grupo_Vulnerable_2}|${
                  suplente_2.value.grupo_Vulnerable_2 == true
                    ? suplente_2.value.describir_Diversidad
                    : "-"
                }||${suplente_2.value.grupo_Vulnerable_3}|${
                  suplente_2.value.grupo_Vulnerable_3 == true
                    ? suplente_2.value.describir_Discapacidad
                    : "-"
                }||${suplente_2.value.grupo_Vulnerable_4}|${
                  suplente_2.value.grupo_Vulnerable_4 == true
                    ? suplente_2.value.describir_Migrante
                    : "-"
                }`
              );
              candidatoFormData.append("Grupo_Vulnerable_Suplente_2", grupos);
            } else {
              candidatoFormData.append(
                "Pertenece_Grupo_Vulnerable_Suplente_2",
                false
              );
              candidatoFormData.append("Grupo_Vulnerable_Suplente_2", "");
            }
            if (suplente_2.value.edad != null) {
              candidatoFormData.append(
                "Edad_Suplente_2",
                suplente_2.value.edad
              );
            }
            if (cargo_Id.value == "MR" || cargo_Id.value == null) {
              if (postulado_Por.value != "Partido político") {
                if (partido_Id_prop.value != null)
                  candidatoFormData.append(
                    "Partido_Id",
                    partido_Id_prop.value.value
                  );
                if (partido_Id_sup.value != null)
                  candidatoFormData.append(
                    "Partido_Suplente_Id",
                    partido_Id_sup.value.value
                  );
                if (partido_Id_prop2.value != null)
                  candidatoFormData.append(
                    "Partido_Propietario_2_Id",
                    partido_Id_prop2.value.value
                  );
                if (partido_Id_sup2.value != null)
                  candidatoFormData.append(
                    "Partido_Suplente_2_Id",
                    partido_Id_sup2.value.value
                  );
              } else {
                if (partido_Id.value != null) {
                  candidatoFormData.append(
                    "Partido_Id",
                    partido_Id.value.value
                  );
                  candidatoFormData.append(
                    "Partido_Suplente_Id",
                    partido_Id.value.value
                  );
                  candidatoFormData.append(
                    "Partido_Propietario_2_Id",
                    partido_Id.value.value
                  );
                  candidatoFormData.append(
                    "Partido_Suplente_2_Id",
                    partido_Id.value.value
                  );
                }
              }
            } else if (cargo_Id.value == "RP") {
              candidatoFormData.append("Partido_Id", partido_Id.value.value);
              candidatoFormData.append(
                "Partido_Suplente_Id",
                partido_Id.value.value
              );
              candidatoFormData.append(
                "Partido_Propietario_2_Id",
                partido_Id.value.value
              );
              candidatoFormData.append(
                "Partido_Suplente_2_Id",
                partido_Id.value.value
              );
            }

            $q.loading.show();
            let resp = null;
            if (isEditar.value == true) {
              resp = await candidatoStore.updateCandidato(
                candidato.value.id,
                candidatoFormData
              );
            } else {
              resp = await candidatoStore.createCandidato(candidatoFormData);
            }
            if (resp != null && resp.success == true) {
              $q.notify({
                position: "top-right",
                type: "positive",
                message: resp.data,
              });
              if (isEditar.value == false) {
                $q.dialog({
                  title: "Atención",
                  message: "¿Desea agregar la documentación en este momento?",
                  icon: "Warning",
                  persistent: true,
                  transitionShow: "scale",
                  transitionHide: "scale",
                  ok: {
                    color: "positive",
                    label: "¡Sí!, agregar",
                  },
                  cancel: {
                    color: "negative",
                    label: " No, cerrar",
                  },
                })
                  .onOk(async () => {
                    $q.loading.show();
                    candidatoStore.actualizarIsDocumentacion(true);
                    candidatoStore.updateEditar(true);
                    await candidatoStore.loadCandidato(resp.id);
                    $q.loading.hide();
                  })
                  .onCancel(() => {
                    candidatoStore.actualizarTabla(true);
                    limpiar();
                    actualizarModal(false);
                    $q.loading.hide();
                  });
              } else {
                candidatoStore.actualizarTabla(true);
                limpiar();
                actualizarModal(false);
              }
            } else {
              $q.notify({
                position: "top-right",
                type: "negative",
                message: resp.data,
              });
              $q.loading.hide();
            }
            $q.loading.hide();
          }
        } else {
          $q.loading.hide();
        }
      })
      .onCancel(() => {});
  }
};

const validarClaveCurp = async () => {
  $q.loading.show();
  let resp1 = null;
  let resp2 = null;
  let resp3 = null;
  let resp4 = null;

  if (props.tab != "PYS" && cargo_Id.value != "RP") {
    if (
      propietario_1.value.clave_Elector != null &&
      propietario_1.value.curp != null
    ) {
      resp1 = await candidatoStore.coindidenciasClaveCurp(
        propietario_1.value.clave_Elector,
        propietario_1.value.curp
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
      suplente_1.value.clave_Elector != null &&
      suplente_1.value.curp != null
    ) {
      resp2 = await candidatoStore.coindidenciasClaveCurp(
        suplente_1.value.clave_Elector,
        suplente_1.value.curp
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
      propietario_1.value.clave_Elector != null &&
      propietario_1.value.curp != null
    ) {
      resp1 = await candidatoStore.coindidenciasClaveCurp(
        propietario_1.value.clave_Elector,
        propietario_1.value.curp
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
      suplente_1.value.clave_Elector != null &&
      suplente_1.value.curp != null
    ) {
      resp2 = await candidatoStore.coindidenciasClaveCurp(
        suplente_1.value.clave_Elector,
        suplente_1.value.curp
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
      propietario_2.value.clave_Elector != null &&
      propietario_2.value.curp != null
    ) {
      resp3 = await candidatoStore.coindidenciasClaveCurp(
        propietario_2.value.clave_Elector,
        propietario_2.value.curp
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
      suplente_2.value.clave_Elector != null &&
      suplente_2.value.curp != null
    ) {
      resp4 = await candidatoStore.coindidenciasClaveCurp(
        suplente_2.value.clave_Elector,
        suplente_2.value.curp
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

//--------------------------------------------------------------------
</script>
