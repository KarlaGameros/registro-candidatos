<template>
  <template v-if="loading">
    <div class="q-pa-md">
      <div class="absolute-center">
        <q-spinner-cube color="pink" size="10.5em" />
      </div>
    </div>
  </template>
  <template v-else>
    <div class="q-pa-sm">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="bg-grey-2 text-grey-7"
          active-color="blue-grey-4"
          indicator-color="blue-grey-4"
          align="justify"
        >
          <q-tab
            v-for="tipo in list_Tabs"
            :key="tipo"
            :name="tipo"
            :label="tipo"
          ></q-tab>
        </q-tabs>
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel v-for="tipo in list_Tabs" :key="tipo" :name="tipo">
            <q-table
              flat
              bordered
              :rows="list_Filtrado"
              :columns="columns"
              row-key="name"
              :filter="filter"
              v-model:pagination="pagination"
            >
              <template v-slot:top-left>
                <q-select
                  filled
                  color="pink"
                  class="q-pl-md"
                  v-model="tipo_Eleccion_Id"
                  :options="tipo_Elecciones"
                  label="Selecciona tipo de elección"
                  hint="Filtrar por tipo de elección"
                  style="width: 230px"
                />
                <q-select
                  filled
                  color="pink"
                  class="q-pl-md"
                  v-model="cargo_Id"
                  :options="list_Cargo"
                  label="Selecciona tipo de cargo"
                  hint="Filtrar por tipo de cargo"
                  style="width: 230px"
                />
                <q-select
                  v-if="
                    tipo_Eleccion_Id != null &&
                    tipo_Eleccion_Id.siglas == 'DIP' &&
                    cargo_Id != 'RP'
                  "
                  filled
                  color="pink"
                  class="q-pl-md"
                  v-model="distrito_Id"
                  :options="list_Distritos_Todos"
                  label="Selecciona  distrito"
                  hint="Filtrar por distrito"
                  style="width: 230px"
                />
                <q-select
                  v-if="
                    tipo_Eleccion_Id != null && tipo_Eleccion_Id.siglas != 'DIP'
                  "
                  filled
                  color="pink"
                  class="q-pl-md"
                  v-model="municipio_Id"
                  :options="list_Municipios_Filtro"
                  label="Selecciona municipio"
                  hint="Filtrar por municipio"
                  style="width: 230px"
                />
                <q-select
                  v-if="
                    tipo_Eleccion_Id != null &&
                    tipo_Eleccion_Id.siglas == 'REG' &&
                    cargo_Id != 'RP'
                  "
                  filled
                  color="pink"
                  class="q-pl-md"
                  v-model="demarcacion_Id"
                  :options="list_Demarcaciones_Todos"
                  label="Selecciona demarcación"
                  hint="Filtrar por demarcación"
                  style="width: 230px"
                />
              </template>
              <template v-slot:top-right>
                <q-input
                  borderless
                  dense
                  debounce="300"
                  v-model="filter"
                  placeholder="Buscar"
                >
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </template>
              <template v-slot:body="props">
                <q-tr
                  :props="props"
                  :class="props.row.color ? '' : 'bg-grey-3'"
                >
                  <q-td
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                  >
                    <div v-if="col.name === 'logo_Coalicion'">
                      <q-avatar
                        style="width: auto; height: 35px"
                        square
                        v-if="
                          props.row.is_Coalicion == true ||
                          props.row.is_Comun == true
                        "
                      >
                        <img
                          :src="
                            props.row.is_Coalicion == true
                              ? col.value
                              : props.row.logo_Comun
                          "
                          alt=""
                        />
                        <q-tooltip>{{ props.row.coalicion }}</q-tooltip>
                      </q-avatar>
                    </div>
                    <div v-else-if="col.name === 'logo_Partido'">
                      <q-avatar square>
                        <img
                          v-if="props.row.partido_Id != null"
                          :src="col.value"
                          alt=""
                        />
                      </q-avatar>
                    </div>
                    <div v-else-if="col.name === 'aprobado'">
                      <q-icon
                        size="sm"
                        flat
                        round
                        :color="col.value == false ? 'red' : 'green'"
                        :name="col.value == false ? 'close' : 'done'"
                      />
                    </div>
                    <div v-else-if="col.name === 'id'">
                      <q-btn
                        v-if="modulo == null ? false : modulo.leer"
                        flat
                        round
                        color="pink-4"
                        icon="folder"
                        @click="verDocumentos(props.row)"
                      >
                        <q-tooltip>Ver documentos</q-tooltip>
                      </q-btn>
                    </div>
                    <label v-else>{{ col.value }}</label>
                  </q-td>
                </q-tr>
              </template>
            </q-table>
            <div class="row justify-center q-mt-md">
              <q-pagination
                v-model="pagination.page"
                color="grey-8"
                :max="pagesNumber"
                size="sm"
              />
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
    <ModalRegistro
      :tipo_Id="
        candidato.tipo_Eleccion_Id == null ? 0 : candidato.tipo_Eleccion_Id
      "
      :tab="candidato.siglas == null ? '0' : candidato.siglas"
    />
  </template>
</template>

<script setup>
import { computed, onBeforeMount, ref, watch, watchEffect } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "src/stores/auth-store";
import { useQuasar, QSpinnerCube } from "quasar";
import { useConfiguracionStore } from "src/stores/configuracion-store";
import { useCandidatosStore } from "src/stores/candidatos-store";
import ModalRegistro from "src/modulos/registro/components/ModalRegistro.vue";

//-----------------------------------------------------------

const $q = useQuasar();
const configuracionStore = useConfiguracionStore();
const candidatosStore = useCandidatosStore();
const authStore = useAuthStore();
const { modulo } = storeToRefs(authStore);
const { list_Documentacion_Completa, candidato, puesto } =
  storeToRefs(candidatosStore);
const {
  tipo_Elecciones,
  list_Distritos_Todos,
  list_Municipios_Filtro,
  list_Demarcaciones_Todos,
} = storeToRefs(configuracionStore);
const list_Filtrado = ref([]);
const tab = ref("Incompletos");
const listFiltrado = ref("");
const list_Tabs = ref(["Incompletos", "Completos"]);
const tipo_Eleccion_Id = ref(null);
const list_Cargo = ref(["Todos", "MR", "RP"]);
const cargo_Id = ref(null);
const distrito_Id = ref(null);
const municipio_Id = ref(null);
const demarcacion_Id = ref(null);
const siglas = "SRC-CON-DOC";
const loading = ref(false);

//-----------------------------------------------------------

onBeforeMount(() => {
  leerPermisos();
  cargarData();
});

//-----------------------------------------------------------

watch(municipio_Id, async (val) => {
  if (val != null) {
    await configuracionStore.loadDemarcaciones(val.value, true);
  }
});

const leerPermisos = async () => {
  $q.loading.show();
  await authStore.loadModulo(siglas);
  $q.loading.hide();
};

const cargarData = async () => {
  // list_Documentacion_Completa.value = [];
  // list_Filtrado.value = [];

  loading.value = true;
  await configuracionStore.loadTipoElecciones();
  tipo_Elecciones.value.splice(0, 0, {
    value: 0,
    label: "Todos",
  });
  await configuracionStore.loadDistritos(true);
  await configuracionStore.loadMunicipiosFiltro();
  await candidatosStore.loadDocumentacionCompleta();
  cargarColumnas(tab.value);
  limpiarFiltros();
  loading.value = false;
};

const verDocumentos = async (row) => {
  puesto.value =
    row.puesto == 0
      ? "propietario"
      : row.puesto == 1
      ? "suplente"
      : row.puesto == 2
      ? "sindico_propietario"
      : "sindico_suplente";
  candidatosStore.actualizarModal(true);
  await candidatosStore.loadCandidato(row.candidato_Id);
  candidatosStore.actualizarVisualizar(true);
  candidatosStore.actualizarIsDocumentacion(true);
};

const cargarColumnas = (tab) => {
  switch (tab) {
    case "Completos":
      list_Filtrado.value = list_Documentacion_Completa.value.filter(
        (x) => x.completo == true
      );
      break;
    case "Incompletos":
      list_Filtrado.value = list_Documentacion_Completa.value.filter(
        (x) => x.completo == false
      );
      break;
    default:
      break;
  }
};

const limpiarFiltros = () => {
  tipo_Eleccion_Id.value = { value: 0, label: "Todos" };
  distrito_Id.value = { value: 0, label: "Todos" };
  municipio_Id.value = { value: 0, label: "Todos" };
  demarcacion_Id.value = { value: 0, label: "Todos" };
  cargo_Id.value = "Todos";
};

const filtrar = (list_Documentos, filtro) => {
  list_Filtrado.value = list_Documentos.filter((item) => {
    let cumple = true;

    if (tab.value == "Completos") {
      cumple = cumple && item.completo == true;
    } else {
      cumple = cumple && item.completo == false;
    }
    if (filtro.eleccion !== undefined) {
      if (filtro.eleccion == 0) {
        cumple = cumple && item.tipo_Eleccion_Id === item.tipo_Eleccion_Id;
      } else {
        cumple = cumple && item.tipo_Eleccion_Id === filtro.eleccion;
      }
    }
    if (filtro.cargo !== undefined) {
      if (filtro.cargo == "Todos") {
        cumple = cumple && item.tipo_Candidato === item.tipo_Candidato;
      } else {
        cumple = cumple && item.tipo_Candidato === filtro.cargo;
      }
    }
    if (filtro.distrito !== undefined) {
      if (filtro.distrito == 0) {
        cumple = cumple && item.distrito_Id === item.distrito_Id;
      } else {
        cumple = cumple && item.distrito_Id === filtro.distrito;
      }
    }
    if (filtro.municipio !== undefined) {
      if (filtro.municipio == 0) {
        cumple = cumple && item.municipio_Id === item.municipio_Id;
      } else {
        cumple = cumple && item.municipio_Id === filtro.municipio;
      }
    }
    if (filtro.demarcacion !== undefined) {
      if (filtro.demarcacion == 0) {
        cumple = cumple && item.demarcacion_Id === item.demarcacion_Id;
      } else {
        cumple = cumple && item.demarcacion_Id === filtro.demarcacion;
      }
    }

    return cumple;
  });
};

watchEffect(() => {
  const filtro = {};
  if (tipo_Eleccion_Id.value != null)
    filtro.eleccion = tipo_Eleccion_Id.value.value;
  if (cargo_Id.value != null) filtro.cargo = cargo_Id.value;
  if (distrito_Id.value != null) filtro.distrito = distrito_Id.value.value;
  if (municipio_Id.value != null) filtro.municipio = municipio_Id.value.value;
  if (demarcacion_Id.value != null)
    filtro.demarcacion = demarcacion_Id.value.value;

  filtrar(list_Documentacion_Completa.value, filtro);
});

const pagesNumber = computed(() =>
  Math.ceil(listFiltrado.value.length / pagination.value.rowsPerPage)
);

const columns = [
  {
    name: "id",
    align: "center",
    label: "Acciones",
    field: "id",
    sortable: true,
  },
  {
    name: "nombre_Completo",
    align: "center",
    label: "Candidatura",
    field: "nombre_Completo",
    sortable: true,
  },
  {
    name: "documentos",
    align: "center",
    label: "Documentos",
    field: "documentos",
    sortable: true,
  },
  {
    name: "complementarios",
    align: "center",
    label: "Complementarios",
    field: "complementarios",
    sortable: true,
  },
  {
    name: "tipo_Candidato",
    align: "center",
    label: "Tipo",
    field: "tipo_Candidato",
    sortable: true,
  },
  {
    name: "tipo_Eleccion",
    align: "center",
    label: "Tipo de elección",
    field: "tipo_Eleccion",
    sortable: true,
  },
  {
    name: "aprobado",
    align: "center",
    label: "Aprobado",
    field: "aprobado",
    sortable: true,
  },
  {
    name: "no_Distrito",
    align: "center",
    label: "No. Distrito",
    field: "no_Distrito",
    sortable: true,
  },
  {
    name: "municipio",
    align: "center",
    label: "Municipio",
    field: "municipio",
    sortable: true,
  },
  {
    name: "demarcacion",
    align: "center",
    label: "Demarcación",
    field: "demarcacion",
    sortable: true,
  },
  {
    name: "logo_Partido",
    align: "center",
    label: "Partido",
    field: "logo_Partido",
    sortable: true,
  },
  {
    name: "logo_Coalicion",
    align: "center",
    label: "Coalición/Común",
    field: "logo_Coalicion",
    sortable: true,
  },
  {
    name: "validado_IEEN",
    align: "center",
    label: "Validado",
    field: "validado_IEEN",
    sortable: true,
  },
  {
    name: "progreso",
    align: "center",
    label: "Progeso",
    field: "progreso",
    sortable: true,
  },
  {
    name: "puntuacion",
    align: "center",
    label: "Puntuación",
    field: "puntuacion",
    sortable: true,
  },
];

const filter = ref("");
const pagination = ref({
  sortBy: "desc",
  descending: false,
  page: 1,
  rowsPerPage: 8,
});
</script>
