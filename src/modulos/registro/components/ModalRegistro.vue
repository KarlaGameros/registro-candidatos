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
              tab == "GUB"
                ? "Registro de candidatos a Gubernatura"
                : tab == "DIP"
                ? "Registro de candidatos a Diputaciones"
                : tab == "PYS"
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
              v-if="tab != 'PYS'"
              class="col-lg-2 col-md-2 col-sm-2 col-xs-12 q-pr-xs"
            >
              <q-select
                v-model="cargo_Id"
                :options="tipos_Cargos"
                label="Tipo"
                hint="Seleccione un tipo"
              />
            </div>
            <div
              v-if="cargo_Id == 'MR' && tab == 'DIP'"
              class="col-lg-3 col-md-3 col-sm-3 col-xs-12"
            >
              <q-select
                v-model="distrito_Id"
                :options="list_Distritos"
                label="Distrito"
                hint="Seleccione un distrito"
              />
            </div>
            <div
              v-if="tab == 'PYS' || (tab == 'REG' && cargo_Id != null)"
              :class="
                tab == 'PYS'
                  ? 'col-lg-5 col-md-5 col-sm-5 col-xs-12 q-pr-xs'
                  : 'col-lg-3 col-md-3 col-sm-3 col-xs-12 q-pr-xs'
              "
            >
              <q-select
                v-model="municipio_Id"
                :options="list_Municipios"
                label="Municipio"
                hint="Seleccione un municipio"
              />
            </div>
            <div
              div
              v-if="cargo_Id == 'MR' && tab == 'REG'"
              class="col-lg-3 col-md-3 col-sm-3 col-xs-12"
            >
              <q-select
                v-model="demarcacion_Id"
                :options="list_Demarcaciones"
                label="Demarcación"
                hint="Seleccione una demarcación"
              />
            </div>
            <div
              :class="
                tab == 'PYS'
                  ? 'col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center'
                  : 'col-lg-1 col-md-1 col-sm-1 col-xs-1 q-pr-xs text-center'
              "
            >
              <div class="text-subtitle2 text-grey-8">¿Coalición?</div>
              <q-checkbox
                checked-icon="task_alt"
                unchecked-icon="highlight_off"
                size="lg"
                v-model="candidato.is_Coalicion"
                color="pink"
              />
            </div>
            <div
              v-if="candidato.is_Coalicion"
              :class="
                tab == 'PYS'
                  ? 'col-lg-5 col-md-5 col-sm-5 col-xs-12 q-pr-xs'
                  : 'col-lg-3 col-md-3 col-sm-3 col-xs-12 q-pr-xs'
              "
            >
              <q-select
                v-model="coalicion_Id"
                :options="list_Coaliciones"
                label="Coalición"
                hint="Seleccione una coalición"
              />
            </div>
            <div
              v-else
              :class="
                tab == 'PYS'
                  ? 'col-lg-5 col-md-5 col-sm-5 col-xs-12 q-pr-xs'
                  : 'col-lg-3 col-md-3 col-sm-3 col-xs-12 q-pr-xs'
              "
            >
              <q-select
                v-model="partido_Id"
                :options="list_Partidos_Politicos"
                label="Partido postulante"
                hint="Seleccione el partido postulante"
              />
            </div>
            <div
              v-if="cargo_Id == 'RP'"
              class="col-lg-2 col-md-2 col-sm-2 col-xs-2"
            >
              <q-input
                v-model.number="candidato.value.orden"
                type="number"
                label="Orden de prelación"
                hint="Orden de prelación"
              >
              </q-input>
            </div>
          </div>
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pa-xs">
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
                    <div
                      v-if="candidato.is_Coalicion == true"
                      class="row q-pl-md"
                    >
                      <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                        <q-select
                          v-model="partido_Id_prop"
                          :options="list_Partidos_Politicos"
                          label="Partido postulante"
                          hint="Seleccione el partido postulante"
                        />
                      </div>
                    </div>
                    <PropietarioDatosGenerales :coalicion="is_Coalicion" />
                    <TablaRP v-if="cargo_Id == 'RP'" />
                  </q-expansion-item>
                  <q-expansion-item
                    v-model="expansion2"
                    @show="expansion = false"
                    @hide="expansion = true"
                    expand-separator
                    icon="folder_open"
                    label="Documentación Requerida"
                  >
                    <PropietarioDocumentacion />
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
                    <div
                      v-if="candidato.is_Coalicion == true"
                      class="row q-pl-md"
                    >
                      <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                        <q-select
                          v-model="partido_Id_sup"
                          :options="list_Partidos_Politicos"
                          label="Partido postulante"
                          hint="Seleccione el partido postulante"
                        />
                      </div>
                    </div>
                    <SuplenteDatosGenerales :coalicion="is_Coalicion" />
                  </q-expansion-item>

                  <q-expansion-item
                    v-model="expansion2"
                    @show="expansion = false"
                    @hide="expansion = true"
                    expand-separator
                    icon="folder_open"
                    label="Documentación Requerida"
                  >
                    <SuplenteDocumentacion />
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
                    <div
                      v-if="candidato.is_Coalicion == true"
                      class="row q-pl-md"
                    >
                      <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                        <q-select
                          v-model="partido_Id_prop2"
                          :options="list_Partidos_Politicos"
                          label="Partido postulante"
                          hint="Seleccione el partido postulante"
                        />
                      </div>
                    </div>
                    <SindicoPropDatosGenerales :coalicion="is_Coalicion" />
                  </q-expansion-item>

                  <q-expansion-item
                    v-model="expansion2"
                    @show="expansion = false"
                    @hide="expansion = true"
                    expand-separator
                    icon="folder_open"
                    label="Documentación Requerida"
                  >
                    <SindicoPropDocumentacion />
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
                    <div
                      v-if="candidato.is_Coalicion == true"
                      class="row q-pl-md"
                    >
                      <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                        <q-select
                          v-model="partido_Id_sup2"
                          :options="list_Partidos_Politicos"
                          label="Partido postulante"
                          hint="Seleccione el partido postulante"
                        />
                      </div>
                    </div>
                    <SindicoSupDatosGenerales :coalicion="is_Coalicion" />
                  </q-expansion-item>

                  <q-expansion-item
                    v-model="expansion2"
                    @show="expansion = false"
                    @hide="expansion = true"
                    expand-separator
                    icon="folder_open"
                    label="Documentación Requerida"
                  >
                    <SindicoSupDocumentacion />
                  </q-expansion-item>
                </q-list>
              </q-tab-panel>
            </q-tab-panels>
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
import { useQuasar } from "quasar";
import { storeToRefs } from "pinia";
import { useCandidatosStore } from "src/stores/candidatos-store";
import { useConfiguracionStore } from "src/stores/configuracion-store";
import { ref, defineProps, onBeforeMount, watch } from "vue";
import PropietarioDatosGenerales from "./PropietarioDatosGenerales.vue";
import PropietarioDocumentacion from "./PropietarioDocumentacion.vue";
import SuplenteDatosGenerales from "./SuplenteDatosGenerales.vue";
import SuplenteDocumentacion from "./SuplenteDocumentacion.vue";
import SindicoPropDatosGenerales from "./SindicoPropDatosGenerales.vue";
import SindicoSupDatosGenerales from "./SindicoSupDatosGenerales.vue";
import SindicoPropDocumentacion from "./SindicoPropDocumentacion.vue";
import SindicoSupDocumentacion from "./SindicoSupDocumentacion.vue";
import TablaRP from "./TablaRP.vue";

//--------------------------------------------------------------------

const $q = useQuasar();
const configuracionStore = useConfiguracionStore();
const candidatoStore = useCandidatosStore();

const { modal, candidato, isEditar } = storeToRefs(candidatoStore);
const {
  list_Municipios,
  list_Distritos,
  list_Demarcaciones,
  list_Partidos_Politicos,
  list_Coaliciones,
} = storeToRefs(configuracionStore);
const is_Coalicion = ref(false);
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

//--------------------------------------------------------------------

const props = defineProps({
  tab: { type: String, required: true },
  tipo_Id: { type: Number, required: true },
});

//--------------------------------------------------------------------

onBeforeMount(() => {
  configuracionStore.loadMunicipios();
  configuracionStore.loadDistritos();
  configuracionStore.loadPartidosPoliticos();
  configuracionStore.loadCoaliciones();
});

//--------------------------------------------------------------------

watch(candidato.value, (val) => {
  if (val != null) {
    cargarDistrito(val);
    cargarTipoCandidato(val);
    cargarPartidoPolitico(val);
    cargarCoalicion(val);
    cargarMunicipio(val);
    cargarDemarcacion(val);
  }
});

watch(municipio_Id, (val) => {
  if (val != null) {
    configuracionStore.loadDemarcaciones(val.value);
  }
});

//--------------------------------------------------------------------

const cargarDistrito = (val) => {
  if (distrito_Id.value == null) {
    let distritoFiltrado = list_Distritos.value.find(
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

const cargarPartidoPolitico = (val) => {
  if (val.is_Coalicion == true) {
    if (partido_Id_prop.value == null) {
      let partidoFiltrado = list_Partidos_Politicos.value.find(
        (x) => x.value == `${val.partido_Id}`
      );
      partido_Id_prop.value = partidoFiltrado;
    }
    if (partido_Id_sup.value == null) {
      let partidoFiltrado = list_Partidos_Politicos.value.find(
        (x) => x.value == `${val.partido_Suplente_Id}`
      );
      partido_Id_sup.value = partidoFiltrado;
    }
    if (partido_Id_prop2.value == null) {
      let partidoFiltrado = list_Partidos_Politicos.value.find(
        (x) => x.value == `${val.partido_Propietario_2_Id}`
      );
      partido_Id_prop2.value = partidoFiltrado;
    }
    if (partido_Id_sup2.value == null) {
      let partidoFiltrado = list_Partidos_Politicos.value.find(
        (x) => x.value == `${val.partido_Suplente_2_Id}`
      );
      partido_Id_sup2.value = partidoFiltrado;
    }
  } else {
    if (partido_Id.value == null) {
      let partidoFiltrado = list_Partidos_Politicos.value.find(
        (x) => x.value == `${val.partido_Id}`
      );
      partido_Id.value = partidoFiltrado;
    }
  }
};

const cargarCoalicion = (val) => {
  if (coalicion_Id.value == null) {
    let coalicionFiltrado = list_Coaliciones.value.find(
      (x) => x.value == `${val.coalicion_Id}`
    );
    coalicion_Id.value = coalicionFiltrado;
  }
};

const cargarMunicipio = (val) => {
  if (municipio_Id.value == null) {
    let municipioFiltrado = list_Municipios.value.find(
      (x) => x.value == `${val.municipio_Id}`
    );
    municipio_Id.value = municipioFiltrado;
  }
};

const cargarDemarcacion = (val) => {
  if (demarcacion_Id.value == null) {
    let demarcacionFiltrado = list_Demarcaciones.value.find(
      (x) => x.value == `${val.demarcacion_Id}`
    );
    demarcacion_Id.value = demarcacionFiltrado;
  }
};

const actualizarModal = (valor) => {
  $q.loading.show();
  candidatoStore.actualizarModal(valor);
  limpiar();
  $q.loading.hide();
};

const limpiar = () => {
  is_Coalicion.value = false;
  cargo_Id.value = null;
  distrito_Id.value = null;
  municipio_Id.value = null;
  demarcacion_Id.value = null;
  candidatoStore.initiCandidato();
};

const onSubmit = async () => {
  let candidatoFormData = new FormData();
  candidatoFormData.append("Is_Coalicion", candidato.value.is_Coalicion);
  candidatoFormData.append("Tipo_Eleccion_Id", props.tipo_Id);

  if (props.tab == "PYS") {
    candidatoFormData.append("Tipo_Candidato", "MR");
  } else {
    candidatoFormData.append("Tipo_Candidato", cargo_Id.value);
  }
  if (distrito_Id.value != null)
    candidatoFormData.append("Distrito_Id", distrito_Id.value.id);
  if (municipio_Id.value != null)
    candidatoFormData.append("Municipio_Id", municipio_Id.value.value);
  if (demarcacion_Id.value != null)
    candidatoFormData.append("Demarcacion_Id", demarcacion_Id.value.value);
  if (coalicion_Id.value != null)
    candidatoFormData.append("Coalicion_Id", coalicion_Id.value.value);

  if (candidato.value.orden != null)
    candidatoFormData.append("Orden", candidato.value.orden);
  //------------PROPIETARIO------------
  if (candidato.value.nombres_Propietario != null)
    candidatoFormData.append(
      "Nombres_Propietario",
      candidato.value.nombres_Propietario
    );
  if (candidato.value.apellido_Paterno_Propietario != null)
    candidatoFormData.append(
      "Apellido_Paterno_Propietario",
      candidato.value.apellido_Paterno_Propietario
    );
  if (candidato.value.apellido_Materno_Propietario != null)
    candidatoFormData.append(
      "Apellido_Materno_Propietario",
      candidato.value.apellido_Materno_Propietario
    );
  if (candidato.value.mote_Propietario != null)
    candidatoFormData.append(
      "Mote_Propietario",
      candidato.value.mote_Propietario
    );
  if (candidato.value.sexo_Propietario != null)
    candidatoFormData.append(
      "Sexo_Propietario",
      candidato.value.sexo_Propietario
    );
  if (candidato.value.url_Foto_Propietario != null)
    candidatoFormData.append(
      "Foto_Propietario",
      candidato.value.url_Foto_Propietario
    );
  if (candidato.value.clave_Elector_Propietario != null)
    candidatoFormData.append(
      "Clave_Elector_Propietario",
      candidato.value.clave_Elector_Propietario
    );
  if (candidato.value.rfc_Propietario != null)
    candidatoFormData.append(
      "RFC_Propietario",
      candidato.value.rfc_Propietario
    );
  if (candidato.value.curp_Propietario != null)
    candidatoFormData.append(
      "CURP_Propietario",
      candidato.value.curp_Propietario
    );
  if (candidato.value.fecha_Nacimiento_Propietario != null)
    candidatoFormData.append(
      "Fecha_Nacimiento_Propietario",
      candidato.value.fecha_Nacimiento_Propietario
    );
  if (candidato.value.ocupacion_Propietario != null)
    candidatoFormData.append(
      "Ocupacion_Propietario",
      candidato.value.ocupacion_Propietario
    );
  if (candidato.value.telefono_Propietario != null) {
    console.log("entrooo");
    if (candidato.value.extension_Prop != null) {
      candidatoFormData.append(
        "Telefono_Propietario",
        `${candidato.value.telefono_Propietario}, ${candidato.value.extension_Prop}`
      );
    } else {
      candidatoFormData.append(
        "Telefono_Propietario",
        candidato.value.telefono_Propietario
      );
    }
  }
  if (candidato.value.correo_Propietario != null)
    candidatoFormData.append(
      "Correo_Propietario",
      candidato.value.correo_Propietario
    );
  if (candidato.value.pertenece_Grupo_Vulnerable_Propietario == true) {
    candidatoFormData.append(
      "Pertenece_Grupo_Vulnerable_Propietario",
      candidato.value.pertenece_Grupo_Vulnerable_Propietario
    );
    const grupos = candidato.value.grupoProp_1.concat(
      `${candidato.value.grupoProp_1}|${candidato.value.grupoProp_2}|${candidato.value.grupoProp_3}|${candidato.value.grupoProp_4}`
    );
    candidatoFormData.append("Grupo_Vulnerable_Propietario", grupos);
  } else {
    candidatoFormData.append("Pertenece_Grupo_Vulnerable_Propietario", false);
    candidatoFormData.append("Grupo_Vulnerable_Propietario", "");
  }

  //------------PROPIETARIO 2------------
  if (candidato.value.nombres_Propietario_2 != null)
    candidatoFormData.append(
      "Nombres_Propietario_2",
      candidato.value.nombres_Propietario_2
    );
  if (candidato.value.apellido_Paterno_Propietario_2 != null)
    candidatoFormData.append(
      "Apellido_Paterno_Propietario_2",
      candidato.value.apellido_Paterno_Propietario_2
    );
  if (candidato.value.apellido_Materno_Propietario_2 != null)
    candidatoFormData.append(
      "Apellido_Materno_Propietario_2",
      candidato.value.apellido_Materno_Propietario_2
    );
  if (candidato.value.mote_Propietario_2 != null)
    candidatoFormData.append(
      "Mote_Propietario_2",
      candidato.value.mote_Propietario_2
    );
  if (candidato.value.sexo_Propietario_2 != null)
    candidatoFormData.append(
      "Sexo_Propietario_2",
      candidato.value.sexo_Propietario_2
    );
  if (candidato.value.url_Foto_Propietario_2 != null)
    candidatoFormData.append(
      "Foto_Propietario_2",
      candidato.value.url_Foto_Propietario_2
    );
  if (candidato.value.clave_Elector_Propietario_2 != null)
    candidatoFormData.append(
      "Clave_Elector_Propietario_2",
      candidato.value.clave_Elector_Propietario_2
    );
  if (candidato.value.rfc_Propietario_2 != null)
    candidatoFormData.append(
      "RFC_Propietario_2",
      candidato.value.rfc_Propietario_2
    );
  if (candidato.value.curp_Propietario_2 != null)
    candidatoFormData.append(
      "CURP_Propietario_2",
      candidato.value.curp_Propietario_2
    );
  if (candidato.value.fecha_Nacimiento_Propietario_2 != null)
    candidatoFormData.append(
      "Fecha_Nacimiento_Propietario_2",
      candidato.value.fecha_Nacimiento_Propietario_2
    );
  if (candidato.value.ocupacion_Propietario_2 != null)
    candidatoFormData.append(
      "Ocupacion_Propietario_2",
      candidato.value.ocupacion_Propietario_2
    );
  if (candidato.value.telefono_Propietario_2 != null)
    candidatoFormData.append(
      "Telefono_Propietario_2",
      candidato.value.telefono_Propietario_2
    );
  if (candidato.value.correo_Propietario_2 != null)
    candidatoFormData.append(
      "Correo_Propietario_2",
      candidato.value.correo_Propietario_2
    );
  if (candidato.value.pertenece_Grupo_Vulnerable_Propietario_2 != null)
    candidatoFormData.append(
      "Pertenece_Grupo_Vulnerable_Propietario_2",
      candidato.value.pertenece_Grupo_Vulnerable_Propietario_2
    );
  if (candidato.value.grupo_Vulnerable_Propietario_2 != null)
    candidatoFormData.append(
      "Grupo_Vulnerable_Propietario_2",
      candidato.value.grupo_Vulnerable_Propietario_2
    );

  //------------SUPLENTE------------
  if (candidato.value.nombres_Suplente != null)
    candidatoFormData.append(
      "Nombres_Suplente",
      candidato.value.nombres_Suplente
    );
  if (candidato.value.apellido_Paterno_Suplente != null)
    candidatoFormData.append(
      "Apellido_Paterno_Suplente",
      candidato.value.apellido_Paterno_Suplente
    );
  if (candidato.value.apellido_Materno_Suplente != null)
    candidatoFormData.append(
      "Apellido_Materno_Suplente",
      candidato.value.apellido_Materno_Suplente
    );
  if (candidato.value.mote_Suplente != null)
    candidatoFormData.append("Mote_Suplente", candidato.value.mote_Suplente);
  if (candidato.value.sexo_Suplente != null)
    candidatoFormData.append("Sexo_Suplente", candidato.value.sexo_Suplente);
  if (candidato.value.url_Foto_Suplente != null)
    candidatoFormData.append(
      "Foto_Suplente",
      candidato.value.url_Foto_Suplente
    );
  if (candidato.value.clave_Elector_Suplente != null)
    candidatoFormData.append(
      "Clave_Elector_Suplente",
      candidato.value.clave_Elector_Suplente
    );
  if (candidato.value.rfc_Suplente != null)
    candidatoFormData.append("RFC_Suplente", candidato.value.rfc_Suplente);
  if (candidato.value.curp_Suplente != null)
    candidatoFormData.append("CURP_Suplente", candidato.value.curp_Suplente);
  if (candidato.value.fecha_Nacimiento_Suplente != null)
    candidatoFormData.append(
      "Fecha_Nacimiento_Suplente",
      candidato.value.fecha_Nacimiento_Suplente
    );
  if (candidato.value.ocupacion_Suplente != null)
    candidatoFormData.append(
      "Ocupacion_Suplente",
      candidato.value.ocupacion_Suplente
    );
  if (candidato.value.telefono_Suplente != null)
    candidatoFormData.append(
      "Telefono_Suplente",
      candidato.value.telefono_Suplente
    );
  if (candidato.value.correo_Suplente != null)
    candidatoFormData.append(
      "Correo_Suplente",
      candidato.value.correo_Suplente
    );
  if (candidato.value.pertenece_Grupo_Vulnerable_Suplente != null)
    candidatoFormData.append(
      "Pertenece_Grupo_Vulnerable_Suplente",
      candidato.value.pertenece_Grupo_Vulnerable_Suplente
    );
  if (candidato.value.grupo_Vulnerable_Suplente != null)
    candidatoFormData.append(
      "Grupo_Vulnerable_Suplente",
      candidato.value.grupo_Vulnerable_Suplente
    );

  //------------SUPLENTE 2------------
  if (candidato.value.nombres_Suplente_2 != null)
    candidatoFormData.append(
      "Nombres_Suplente_2",
      candidato.value.nombres_Suplente_2
    );
  if (candidato.value.apellido_Paterno_Suplente_2 != null)
    candidatoFormData.append(
      "Apellido_Paterno_Suplente_2",
      candidato.value.apellido_Paterno_Suplente_2
    );
  if (candidato.value.apellido_Materno_Suplente_2 != null)
    candidatoFormData.append(
      "Apellido_Materno_Suplente_2",
      candidato.value.apellido_Materno_Suplente_2
    );
  if (candidato.value.mote_Suplente_2 != null)
    candidatoFormData.append(
      "Mote_Suplente_2",
      candidato.value.mote_Suplente_2
    );
  if (candidato.value.sexo_Suplente_2 != null)
    candidatoFormData.append(
      "Sexo_Suplente_2",
      candidato.value.sexo_Suplente_2
    );
  if (candidato.value.url_Foto_Suplente_2 != null)
    candidatoFormData.append(
      "Foto_Suplente_2",
      candidato.value.url_Foto_Suplente_2
    );
  if (candidato.value.clave_Elector_Suplente_2 != null)
    candidatoFormData.append(
      "Clave_Elector_Suplente_2",
      candidato.value.clave_Elector_Suplente_2
    );
  if (candidato.value.rfc_Suplente_2 != null)
    candidatoFormData.append("RFC_Suplente_2", candidato.value.rfc_Suplente_2);
  if (candidato.value.curp_Suplente_2 != null)
    candidatoFormData.append(
      "CURP_Suplente_2",
      candidato.value.curp_Suplente_2
    );
  if (candidato.value.fecha_Nacimiento_Suplente_2 != null)
    candidatoFormData.append(
      "Fecha_Nacimiento_Suplente_2",
      candidato.value.fecha_Nacimiento_Suplente_2
    );
  if (candidato.value.ocupacion_Suplente_2 != null)
    candidatoFormData.append(
      "Ocupacion_Suplente_2",
      candidato.value.ocupacion_Suplente_2
    );
  if (candidato.value.telefono_Suplente_2 != null)
    candidatoFormData.append(
      "Telefono_Suplente_2",
      candidato.value.telefono_Suplente_2
    );
  if (candidato.value.correo_Suplente_2 != null)
    candidatoFormData.append(
      "Correo_Suplente_2",
      candidato.value.correo_Suplente_2
    );
  if (candidato.value.pertenece_Grupo_Vulnerable_Suplente_2 != null)
    candidatoFormData.append(
      "Pertenece_Grupo_Vulnerable_Suplente_2",
      candidato.value.pertenece_Grupo_Vulnerable_Suplente_2
    );
  if (candidato.value.grupo_Vulnerable_Suplente_2 != null)
    candidatoFormData.append(
      "Grupo_Vulnerable_Suplente_2",
      candidato.value.grupo_Vulnerable_Suplente_2
    );
  if (candidato.value.is_Coalicion == true) {
    if (partido_Id_prop.value != null)
      candidatoFormData.append("Partido_Id", partido_Id_prop.value);
    if (partido_Id_sup.value != null)
      candidatoFormData.append("Partido_Suplente_Id", partido_Id_sup.value);
    if (partido_Id_prop2.value != null)
      candidatoFormData.append(
        "Partido_Propietario_2_Id",
        partido_Id_prop2.value
      );
    if (partido_Id_sup2.value != null)
      candidatoFormData.append("Partido_Suplente_2_Id", partido_Id_sup2.value);
  } else {
    if (partido_Id.value != null) {
      candidatoFormData.append("Partido_Id", partido_Id.value.value);
      candidatoFormData.append("Partido_Suplente_Id", partido_Id.value.value);
      candidatoFormData.append(
        "Partido_Propietario_2_Id",
        partido_Id.value.value
      );
      candidatoFormData.append("Partido_Suplente_2_Id", partido_Id.value.value);
    }
  }

  let resp = null;
  $q.loading.show();
  if (isEditar.value == true) {
    resp = await candidatoStore.updateCandidato(
      candidato.value.id,
      candidatoFormData
    );
  } else {
    resp = await candidatoStore.createCandidato(candidatoFormData);
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
//--------------------------------------------------------------------
</script>

<style></style>
