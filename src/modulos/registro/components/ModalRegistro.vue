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
              v-if="cargo_Id == 'MR' && props.tab == 'DIP'"
              class="col-lg-3 col-md-3 col-sm-3 col-xs-12"
            >
              <q-select
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
                props.tab == 'PYS' || (props.tab == 'REG' && cargo_Id != null)
              "
              :class="
                props.tab == 'PYS'
                  ? 'col-lg-5 col-md-5 col-sm-5 col-xs-12 q-pr-xs'
                  : 'col-lg-3 col-md-3 col-sm-3 col-xs-12 q-pr-xs'
              "
            >
              <q-select
                v-model="municipio_Id"
                :options="list_Municipios"
                label="Municipio"
                hint="Seleccione un municipio"
                lazy-rules
                :rules="[(val) => !!val || 'El municipio es requerido']"
              />
            </div>
            <div
              div
              v-if="cargo_Id == 'MR' && props.tab == 'REG'"
              class="col-lg-3 col-md-3 col-sm-3 col-xs-12"
            >
              <q-select
                v-model="demarcacion_Id"
                :options="list_Demarcaciones"
                label="Demarcación"
                hint="Seleccione una demarcación"
                lazy-rules
                :rules="[(val) => !!val || 'La demarcación es requerida']"
              />
            </div>
            <div
              v-if="cargo_Id != 'RP'"
              :class="
                props.tab == 'PYS'
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
                props.tab == 'PYS'
                  ? 'col-lg-5 col-md-5 col-sm-5 col-xs-12 q-pr-xs'
                  : 'col-lg-3 col-md-3 col-sm-3 col-xs-12 q-pr-xs'
              "
            >
              <q-select
                v-model="coalicion_Id"
                :options="list_Coaliciones"
                label="Coalición"
                hint="Seleccione una coalición"
                lazy-rules
                :rules="[(val) => !!val || 'La coalición es requerida']"
              />
            </div>
            <div
              v-else
              :class="
                props.tab == 'PYS'
                  ? 'col-lg-5 col-md-5 col-sm-5 col-xs-12 q-pr-xs'
                  : 'col-lg-3 col-md-3 col-sm-3 col-xs-12 q-pr-xs'
              "
            >
              <q-select
                v-model="partido_Id"
                :options="list_Partidos_Politicos"
                label="Partido postulante"
                hint="Seleccione el partido postulante"
                lazy-rules
                :rules="[
                  (val) => !!val || 'El partiddo postulante es requerido',
                ]"
              />
            </div>
            <div
              v-if="cargo_Id == 'RP'"
              class="col-lg-2 col-md-2 col-sm-2 col-xs-2"
            >
              <q-input
                disable
                v-model.number="orden"
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
                          :options="list_Filtro_Partidos"
                          label="Partido postulante"
                          hint="Seleccione el partido postulante"
                        />
                      </div>
                    </div>
                    <FormularioDatosGenerales :tabTipo="tabTab" />
                  </q-expansion-item>
                  <q-expansion-item
                    v-model="expansion2"
                    @show="expansion = false"
                    @hide="expansion = true"
                    expand-separator
                    icon="folder_open"
                    label="Documentación Requerida"
                  >
                    <FormularioDocumentacion :tipo_Id="tipo_Id" />
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
                          :options="list_Filtro_Partidos"
                          label="Partido postulante"
                          hint="Seleccione el partido postulante"
                        />
                      </div>
                    </div>
                    <FormularioDatosGenerales :tabTipo="tabTab" />
                  </q-expansion-item>
                  <q-expansion-item
                    v-model="expansion2"
                    @show="expansion = false"
                    @hide="expansion = true"
                    expand-separator
                    icon="folder_open"
                    label="Documentación Requerida"
                  >
                    <FormularioDocumentacion :tipo_Id="tipo_Id" />
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
                          :options="list_Filtro_Partidos"
                          label="Partido postulante"
                          hint="Seleccione el partido postulante"
                        />
                      </div>
                    </div>
                    <FormularioDatosGenerales :tabTipo="tabTab" />
                  </q-expansion-item>
                  <q-expansion-item
                    v-model="expansion2"
                    @show="expansion = false"
                    @hide="expansion = true"
                    expand-separator
                    icon="folder_open"
                    label="Documentación Requerida"
                  >
                    <FormularioDocumentacion :tipo_Id="tipo_Id" />
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
                          :options="list_Filtro_Partidos"
                          label="Partido postulante"
                          hint="Seleccione el partido postulante"
                        />
                      </div>
                    </div>
                    <FormularioDatosGenerales :tabTipo="tabTab" />
                  </q-expansion-item>
                  <q-expansion-item
                    v-model="expansion2"
                    @show="expansion = false"
                    @hide="expansion = true"
                    expand-separator
                    icon="folder_open"
                    label="Documentación Requerida"
                  >
                    <FormularioDocumentacion :tipo_Id="tipo_Id" />
                  </q-expansion-item>
                </q-list>
              </q-tab-panel>
            </q-tab-panels>
            <div class="q-pt-md" v-if="cargo_Id == 'RP' && partido_Id != null">
              <TablaRP
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
import { ref, defineProps, watch } from "vue";
import FormularioDatosGenerales from "./FormularioDatosGenerales.vue";
import FormularioDocumentacion from "./FormularioDocumentacion.vue";
import TablaRP from "./TablaRP.vue";

//--------------------------------------------------------------------

const $q = useQuasar();
const configuracionStore = useConfiguracionStore();
const candidatoStore = useCandidatosStore();
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
} = storeToRefs(candidatoStore);
const {
  list_Municipios,
  list_Distritos,
  list_Demarcaciones,
  list_Partidos_Politicos,
  list_Partidos_Politicos_Coalcion,
  list_Coaliciones,
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
const list_Filtro_Partidos = ref(null);

//--------------------------------------------------------------------

const props = defineProps({
  tab: { type: String, required: true },
  tipo_Id: { type: Number, required: true },
});

//--------------------------------------------------------------------

watch(coalicion_Id, async (val) => {
  if (val != null) {
    partido_Id_prop.value = null;
    partido_Id_prop2.value = null;
    partido_Id_sup.value = null;
    partido_Id_sup2.value = null;
    await configuracionStore.loadPartidosPoliticosCoalicion();
    list_Filtro_Partidos.value = list_Partidos_Politicos_Coalcion.value.filter(
      (x) => x.coalicion_Id == val.value
    );
  }
});

watch(candidato.value, (val) => {
  if (val != null) {
    cargarDistrito(val);
    cargarTipoCandidato(val);
    cargarPartidoPolitico(val);
    cargarCoalicion(val);
    cargarMunicipio(val);
    orden.value = val.orden;
    if (val.is_Coalicion == false) {
      partido_Id_prop.value = null;
      partido_Id_prop2.value = null;
      partido_Id_sup.value = null;
      partido_Id_sup2.value = null;
      coalicion_Id.value = null;
    }
  }
});

watch(municipio_Id, (val) => {
  if (val != null) {
    configuracionStore.loadDemarcaciones(val.value);
  }
});

watch(list_RP, (val) => {
  if (val != null && isEditar.value == false) {
    let last = val[val.length - 1];
    let next = null;
    if (last != undefined) {
      if (last.orden == 12) {
        $q.dialog({
          title: "Ya existen 12 candidatos registrados en el partido",
          message: "Deberá editar si necesita",
          icon: "Warning",
          persistent: true,
          transitionShow: "scale",
          transitionHide: "scale",

          cancel: {
            color: "negative",
            label: "Cerrar",
          },
        });
      } else {
        next = last.orden + 1;
      }
    } else {
      next = 1;
    }
    orden.value = next;
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

const cargarPartidoPolitico = async (val) => {
  if (val.is_Coalicion == true) {
    await configuracionStore.loadPartidosPoliticosCoalicion();
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

const cargarMunicipio = async (val) => {
  await configuracionStore.loadDemarcaciones(val.municipio_Id);
  if (municipio_Id.value == null) {
    let municipioFiltrado = list_Municipios.value.find(
      (x) => x.value == `${val.municipio_Id}`
    );
    municipio_Id.value = municipioFiltrado;
  }
  cargarDemarcacion(val);
};

const cargarDemarcacion = (val) => {
  if (demarcacion_Id.value == null) {
    let demarcacionFiltrado = list_Demarcaciones.value.find(
      (x) => x.value == `${val.demarcacion_Id}`
    );
    demarcacion_Id.value = demarcacionFiltrado;
  }
};

const getTitle = () => {
  if (props.tab == "GUB") {
    return "candidatos a Gubernatura";
  } else if (props.tab == "DIP") {
    return "candidatos a Diputaciones";
  } else if (props.tab == "PYS") {
    return "candidatos a Presidencia y Sindicaturas";
  } else {
    return "candidatos a Regidurias";
  }
};

const actualizarModal = (valor) => {
  $q.loading.show();
  limpiar();
  candidatoStore.actualizarModal(valor);
  $q.loading.hide();
};

const limpiar = () => {
  candidatoStore.initCandidato();
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
};

const onSubmit = async () => {
  let candidatoFormData = new FormData();
  candidatoFormData.append("Is_Coalicion", candidato.value.is_Coalicion);
  candidatoFormData.append("Tipo_Eleccion_Id", props.tipo_Id);

  if (props.tab == "PYS" || props.tab == "GUB") {
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

  if (orden.value != null) candidatoFormData.append("Orden", orden.value);
  //------------PROPIETARIO------------
  if (propietario_1.value.nombres != null)
    candidatoFormData.append(
      "Nombres_Propietario",
      propietario_1.value.nombres
    );
  if (propietario_1.value.apellido_Paterno != null)
    candidatoFormData.append(
      "Apellido_Paterno_Propietario",
      propietario_1.value.apellido_Paterno
    );
  if (propietario_1.value.apellido_Materno != null)
    candidatoFormData.append(
      "Apellido_Materno_Propietario",
      propietario_1.value.apellido_Materno
    );
  if (propietario_1.value.mote != null)
    candidatoFormData.append("Mote_Propietario", propietario_1.value.mote);
  if (propietario_1.value.sexo != null)
    candidatoFormData.append("Sexo_Propietario", propietario_1.value.sexo);
  if (foto_1.value.url_Foto != null)
    candidatoFormData.append("Foto_Propietario", foto_1.value.url_Foto);
  if (propietario_1.value.clave_Elector != null)
    candidatoFormData.append(
      "Clave_Elector_Propietario",
      propietario_1.value.clave_Elector
    );
  if (propietario_1.value.rfc != null)
    candidatoFormData.append("RFC_Propietario", propietario_1.value.rfc);
  if (propietario_1.value.curp != null)
    candidatoFormData.append("CURP_Propietario", propietario_1.value.curp);
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
  if (propietario_1.value.telefono != null) {
    let newTelefono = propietario_1.value.telefono.toString(", ");
    candidatoFormData.append("Telefono_Propietario", newTelefono);
  }
  if (propietario_1.value.correo != null)
    candidatoFormData.append("Correo_Propietario", propietario_1.value.correo);
  if (propietario_1.value.pertenece_Grupo_Vulnerable == true) {
    candidatoFormData.append(
      "Pertenece_Grupo_Vulnerable_Propietario",
      propietario_1.value.pertenece_Grupo_Vulnerable
    );
    const grupos = `${
      propietario_1.value.grupo_Vulnerable_1 != null
        ? propietario_1.value.grupo_Vulnerable_1
        : ""
    }`.concat(
      `|${
        propietario_1.value.grupo_Vulnerable_2 != null
          ? propietario_1.value.grupo_Vulnerable_2
          : ""
      }|${
        propietario_1.value.grupo_Vulnerable_3 != null
          ? propietario_1.value.grupo_Vulnerable_3
          : ""
      }|${
        propietario_1.value.grupo_Vulnerable_4 != null
          ? propietario_1.value.grupo_Vulnerable_4
          : ""
      }`
    );
    candidatoFormData.append("Grupo_Vulnerable_Propietario", grupos);
  } else {
    candidatoFormData.append("Pertenece_Grupo_Vulnerable_Propietario", false);
    candidatoFormData.append("Grupo_Vulnerable_Propietario", "");
  }
  if (propietario_1.value.edad != null)
    candidatoFormData.append("Edad_Propietario", propietario_1.value.edad);

  //------------PROPIETARIO 2------------
  if (propietario_2.value.nombres != null)
    candidatoFormData.append(
      "Nombres_Propietario_2",
      propietario_2.value.nombres
    );
  if (propietario_2.value.apellido_Paterno != null)
    candidatoFormData.append(
      "Apellido_Paterno_Propietario_2",
      propietario_2.value.apellido_Paterno
    );
  if (propietario_2.value.apellido_Materno != null)
    candidatoFormData.append(
      "Apellido_Materno_Propietario_2",
      propietario_2.value.apellido_Materno
    );
  if (propietario_2.value.mote != null)
    candidatoFormData.append("Mote_Propietario_2", propietario_2.value.mote);
  if (propietario_2.value.sexo != null)
    candidatoFormData.append("Sexo_Propietario_2", propietario_2.value.sexo);
  if (foto_3.value.url_Foto != null)
    candidatoFormData.append("Foto_Propietario_2", foto_3.value.url_Foto);
  if (propietario_2.value.clave_Elector != null)
    candidatoFormData.append(
      "Clave_Elector_Propietario_2",
      propietario_2.value.clave_Elector
    );
  if (propietario_2.value.rfc != null)
    candidatoFormData.append("RFC_Propietario_2", propietario_2.value.rfc);
  if (propietario_2.value.curp != null)
    candidatoFormData.append("CURP_Propietario_2", propietario_2.value.curp);
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
  if (propietario_2.value.telefono != null) {
    let newTelefono = propietario_2.value.telefono.toString(", ");
    candidatoFormData.append("Telefono_Propietario_2", newTelefono);
  }
  if (propietario_2.value.correo != null)
    candidatoFormData.append(
      "Correo_Propietario_2",
      propietario_2.value.correo
    );
  if (propietario_2.value.pertenece_Grupo_Vulnerable == true) {
    candidatoFormData.append(
      "Pertenece_Grupo_Vulnerable_Propietario_2",
      propietario_2.value.pertenece_Grupo_Vulnerable
    );
    const grupos = `${
      propietario_2.value.grupo_Vulnerable_1 != null
        ? propietario_2.value.grupo_Vulnerable_1
        : propietario_2.value.grupo_Vulnerable_1
    }`.concat(
      `|${
        propietario_2.value.grupo_Vulnerable_2 != null
          ? propietario_2.value.grupo_Vulnerable_2
          : ""
      }|${
        propietario_2.value.grupo_Vulnerable_3 != null
          ? propietario_2.value.grupo_Vulnerable_3
          : ""
      }|${
        propietario_2.value.grupo_Vulnerable_4 != null
          ? propietario_2.value.grupo_Vulnerable_4
          : ""
      }`
    );
    candidatoFormData.append("Grupo_Vulnerable_Propietario_2", grupos);
  } else {
    candidatoFormData.append("Pertenece_Grupo_Vulnerable_Propietario_2", false);
    candidatoFormData.append("Grupo_Vulnerable_Propietario_2", "");
  }
  if (propietario_2.value.edad != null)
    candidatoFormData.append("Edad_Propietario_2", propietario_2.value.edad);

  //------------SUPLENTE------------
  if (suplente_1.value.nombres != null)
    candidatoFormData.append("Nombres_Suplente", suplente_1.value.nombres);
  if (suplente_1.value.apellido_Paterno != null)
    candidatoFormData.append(
      "Apellido_Paterno_Suplente",
      suplente_1.value.apellido_Paterno
    );
  if (suplente_1.value.apellido_Materno != null)
    candidatoFormData.append(
      "Apellido_Materno_Suplente",
      suplente_1.value.apellido_Materno
    );
  if (suplente_1.value.mote != null)
    candidatoFormData.append("Mote_Suplente", suplente_1.value.mote);
  if (suplente_1.value.sexo != null)
    candidatoFormData.append("Sexo_Suplente", suplente_1.value.sexo);
  if (foto_2.value.url_Foto != null)
    candidatoFormData.append("Foto_Suplente", foto_2.value.url_Foto);
  if (suplente_1.value.clave_Elector != null)
    candidatoFormData.append(
      "Clave_Elector_Suplente",
      suplente_1.value.clave_Elector
    );
  if (suplente_1.value.rfc != null)
    candidatoFormData.append("RFC_Suplente", suplente_1.value.rfc);
  if (suplente_1.value.curp != null)
    candidatoFormData.append("CURP_Suplente", suplente_1.value.curp);
  if (suplente_1.value.fecha_Nacimiento != null)
    candidatoFormData.append(
      "Fecha_Nacimiento_Suplente",
      suplente_1.value.fecha_Nacimiento
    );
  if (suplente_1.value.ocupacion != null)
    candidatoFormData.append("Ocupacion_Suplente", suplente_1.value.ocupacion);
  if (suplente_1.value.telefono != null) {
    let newTelefono = suplente_1.value.telefono.toString(", ");
    candidatoFormData.append("Telefono_Suplente", newTelefono);
  }
  if (suplente_1.value.correo != null)
    candidatoFormData.append("Correo_Suplente", suplente_1.value.correo);
  if (suplente_1.value.pertenece_Grupo_Vulnerable == true) {
    candidatoFormData.append(
      "Pertenece_Grupo_Vulnerable_Suplente",
      suplente_1.value.pertenece_Grupo_Vulnerable
    );
    const grupos = `${
      suplente_1.value.grupo_Vulnerable_1 != null
        ? suplente_1.value.grupo_Vulnerable_1
        : ""
    }`.concat(
      `|${
        suplente_1.value.grupo_Vulnerable_2 != null
          ? suplente_1.value.grupo_Vulnerable_2
          : ""
      }|${
        suplente_1.value.grupo_Vulnerable_3 != null
          ? suplente_1.value.grupo_Vulnerable_3
          : ""
      }|${
        suplente_1.value.grupo_Vulnerable_4 != null
          ? suplente_1.value.grupo_Vulnerable_4
          : ""
      }`
    );
    candidatoFormData.append("Grupo_Vulnerable_Suplente", grupos);
  } else {
    candidatoFormData.append("Pertenece_Grupo_Vulnerable_Suplente", false);
    candidatoFormData.append("Grupo_Vulnerable_Suplente", "");
  }
  if (suplente_1.value.edad != null)
    candidatoFormData.append("Edad_Suplente", suplente_1.value.edad);
  //------------SUPLENTE 2------------
  if (suplente_2.value.nombres != null)
    candidatoFormData.append("Nombres_Suplente_2", suplente_2.value.nombres);
  if (suplente_2.value.apellido_Paterno != null)
    candidatoFormData.append(
      "Apellido_Paterno_Suplente_2",
      suplente_2.value.apellido_Paterno
    );
  if (suplente_2.value.apellido_Materno != null)
    candidatoFormData.append(
      "Apellido_Materno_Suplente_2",
      suplente_2.value.apellido_Materno
    );
  if (suplente_2.value.mote != null)
    candidatoFormData.append("Mote_Suplente_2", suplente_2.value.mote);
  if (suplente_2.value.sexo != null)
    candidatoFormData.append("Sexo_Suplente_2", suplente_2.value.sexo);
  if (foto_4.value.url_Foto != null)
    candidatoFormData.append("Foto_Suplente_2", foto_4.value.url_Foto);
  if (suplente_2.value.clave_Elector != null)
    candidatoFormData.append(
      "Clave_Elector_Suplente_2",
      suplente_2.value.clave_Elector
    );
  if (suplente_2.value.rfc != null)
    candidatoFormData.append("RFC_Suplente_2", suplente_2.value.rfc);
  if (suplente_2.value.curp != null)
    candidatoFormData.append("CURP_Suplente_2", suplente_2.value.curp);
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
  if (suplente_2.value.telefono != null) {
    let newTelefono = suplente_2.value.telefono.toString(", ");
    candidatoFormData.append("Telefono_Suplente_2", newTelefono);
  }
  if (suplente_2.value.correo != null)
    candidatoFormData.append("Correo_Suplente_2", suplente_2.value.correo);
  if (suplente_2.value.pertenece_Grupo_Vulnerable == true) {
    candidatoFormData.append(
      "Pertenece_Grupo_Vulnerable_Suplente",
      suplente_2.value.pertenece_Grupo_Vulnerable
    );
    const grupos = `${
      suplente_2.value.grupo_Vulnerable_1 != null
        ? suplente_2.value.grupo_Vulnerable_1
        : suplente_2.value.grupo_Vulnerable_1
    }`.concat(
      `|${
        suplente_2.value.grupo_Vulnerable_2 != null
          ? suplente_2.value.grupo_Vulnerable_2
          : ""
      }|${
        suplente_2.value.grupo_Vulnerable_3 != null
          ? suplente_2.value.grupo_Vulnerable_3
          : ""
      }|${
        suplente_2.value.grupo_Vulnerable_4 != null
          ? suplente_2.value.grupo_Vulnerable_4
          : ""
      }`
    );
    candidatoFormData.append("Grupo_Vulnerable_Suplente_2", grupos);
  } else {
    candidatoFormData.append("Pertenece_Grupo_Vulnerable_Suplente_2", false);
    candidatoFormData.append("Grupo_Vulnerable_Suplente_2", "");
  }
  if (suplente_2.value.edad != null) {
    candidatoFormData.append("Edad_Suplente_2", suplente_2.value.edad);
  }

  if (candidato.value.is_Coalicion == true) {
    if (partido_Id_prop.value != null)
      candidatoFormData.append("Partido_Id", partido_Id_prop.value.value);
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
    limpiar();
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
