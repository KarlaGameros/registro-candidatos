<template>
  <div class="q-pa-sm">
    <q-card>
      <q-tabs
        v-model="tab_Eleccion"
        dense
        class="bg-grey-2 text-grey-7"
        active-color="blue-grey-4"
        indicator-color="blue-grey-4"
        align="justify"
      >
        <q-tab
          v-for="tipo in tipo_Elecciones"
          :key="tipo"
          :name="tipo.siglas"
          :label="tipo.nombre"
          @click="tipo_Eleccion_Id = tipo.id"
        />
      </q-tabs>
      <q-tab-panels v-model="tab_Eleccion" animated class="text-white">
        <q-tab-panel
          v-for="tipo in tipo_Elecciones"
          :key="tipo"
          :name="tipo.siglas"
        >
          <q-table
            flat
            bordered
            :rows="list_Candidatos_Filtro"
            :columns="columns"
            :visible-columns="visisble_columns"
            row-key="name"
            :filter="filter"
            class="my-sticky-last-column-table"
            v-model:pagination="pagination"
            color="pink"
          >
            <template v-slot:top-left>
              <q-select
                v-if="
                  tab_Eleccion != 'PYS' && list_Candidatos_Filtro.length > 0
                "
                filled
                color="pink"
                class="q-pr-md"
                v-model="cargo_Id"
                :options="list_Cargo"
                label="Selecciona cargo"
                hint="Filtrar por cargo"
                style="width: 260px"
              />
              <q-select
                v-if="cargo_Id != 'RP' && list_Candidatos_Filtro.length > 0"
                filled
                color="pink"
                class="q-pr-md"
                v-model="coalicion_Id"
                :options="list_Coaliciones"
                label="Selecciona coalición"
                hint="Filtrar por coalición"
                style="width: 260px"
              />
              <q-select
                v-if="list_Candidatos_Filtro.length > 0"
                filled
                color="pink"
                class="q-pr-md"
                v-model="partido_Id"
                :options="list_Filtro_Partidos"
                label="Selecciona partido"
                hint="Filtrar por partidos"
                style="width: 260px"
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
              <q-tr :props="props">
                <q-td v-for="col in props.cols" :key="col.name" :props="props">
                  <div v-if="col.name === 'id'">
                    <q-btn
                      flat
                      round
                      color="pink-5"
                      icon="folder"
                      @click="verDocumentos(props.row)"
                    >
                      <q-tooltip>Ver documentación</q-tooltip>
                    </q-btn>
                    <!-- <q-btn
                      flat
                      round
                      color="pink-5"
                      icon="search"
                      @click="verDetalle(props.row)"
                    >
                      <q-tooltip>Ver más</q-tooltip>
                    </q-btn> -->
                  </div>
                  <div v-else-if="col.name === 'estatus_Aprobado'">
                    <q-icon
                      size="sm"
                      flat
                      round
                      :color="col.value != true ? 'red' : 'green'"
                      :name="col.value != true ? 'close' : 'done'"
                    />
                  </div>
                  <div v-else-if="col.name === 'logo_Coalicion'">
                    <q-avatar
                      style="width: auto; height: 35px"
                      square
                      v-if="props.row.is_Coalicion == true"
                    >
                      <img :src="props.row.logo_Coalicion" alt="" />
                      <q-tooltip>{{ props.row.coalicion }}</q-tooltip>
                    </q-avatar>
                  </div>
                  <div v-else-if="col.name === 'logo_Partido'">
                    <q-avatar square>
                      <img :src="props.row.logo_Partido" alt="" />
                      <q-tooltip>{{ props.row.partido }}</q-tooltip>
                    </q-avatar>
                  </div>
                  <label v-else>{{ col.value }}</label>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script setup>
import { onBeforeMount, ref, watch, watchEffect } from "vue";
import { storeToRefs } from "pinia";
import { useGeneroStore } from "src/stores/genero-store";
import { useQuasar, QSpinnerCube } from "quasar";
import { useConfiguracionStore } from "src/stores/configuracion-store";
import { useCandidatosStore } from "src/stores/candidatos-store";

//-----------------------------------------------------------

const $q = useQuasar();
const generoStore = useGeneroStore();
const configuracionStore = useConfiguracionStore();
const candidatosStore = useCandidatosStore();
const { tipo_Elecciones, list_Partidos_Politicos_Todos, list_Coaliciones } =
  storeToRefs(configuracionStore);
const { list_Candidatos_Genero } = storeToRefs(generoStore);
const tab_Eleccion = ref(null);
const tipo_Eleccion_Id = ref(null);
const visisble_columns = ref([]);
const list_Candidatos_Filtro = ref([]);
const coalicion_Id = ref(null);
const partido_Id = ref(null);
const list_Filtro_Partidos = ref([]);
const list_Cargo = ref(["Todos", "MR", "RP"]);
const cargo_Id = ref(null);

//-----------------------------------------------------------

onBeforeMount(async () => {
  await configuracionStore.loadTipoElecciones();
  cargarData();
});

//-----------------------------------------------------------

watch(tab_Eleccion, (val) => {
  if (val != null) {
    cargarData();
  }
});

watch(coalicion_Id, (val) => {
  if (val != null) {
    partido_Id.value = { value: 0, label: "Todos" };
  }
});

watch(tipo_Elecciones, (val) => {
  if (val.length > 0) {
    tab_Eleccion.value = val[0].siglas;
    tipo_Eleccion_Id.value = val[0].id;
  }
});

//-----------------------------------------------------------

const cargarData = async () => {
  $q.loading.show({
    spinner: QSpinnerCube,
    spinnerColor: "pink",
    spinnerSize: 140,
    backgroundColor: "purple-2",
    message: "Espere un momento porfavor...",
    messageColor: "black",
  });
  await generoStore.loadCandidatosGenero(tipo_Eleccion_Id.value);
  await configuracionStore.loadCoaliciones();
  await configuracionStore.loadPartidosPoliticosTodos();
  cargarColumnas(tab_Eleccion.value);
  limpiarFiltros();
  $q.loading.hide();
};

const verDocumentos = async (row) => {
  $q.loading.show();
  await generoStore.getDocumentos(row.id, row.puesto);
  generoStore.actualizarModal(true);
  $q.loading.hide();
};

const verDetalle = async (row) => {
  $q.loading.show();
  await candidatosStore.loadCandidato_Id_Puesto(row.id, row.puesto);
  generoStore.actualizarModalDetalle(true);
  $q.loading.hide();
};

//-----------------------------------------------------------

const cargarColumnas = (tab_Eleccion) => {
  switch (tab_Eleccion) {
    case "GUB":
      visisble_columns.value = [
        "nombre_Completo",
        "candidatura",
        "estatus_Aprobado",
        "tipo_Candidato",
        "sexo",
        "edad",
        "logo_Coalicion",
        "logo_Partido",
        "id",
      ];
      break;
    case "DIP":
      visisble_columns.value = [
        "nombre_Completo",
        "candidatura",
        "estatus_Aprobado",
        "tipo_Candidato",
        "sexo",
        "edad",
        "logo_Coalicion",
        "logo_Partido",
        "no_Distrito",
        "orden",
        "id",
      ];
      break;
    case "PYS":
      visisble_columns.value = [
        "nombre_Completo",
        "candidatura",
        "estatus_Aprobado",
        "tipo_Candidato",
        "sexo",
        "edad",
        "logo_Coalicion",
        "logo_Partido",
        "municipio",
        "id",
      ];
      break;
    case "REG":
      visisble_columns.value = [
        "nombre_Completo",
        "candidatura",
        "estatus_Aprobado",
        "tipo_Candidato",
        "sexo",
        "edad",
        "logo_Coalicion",
        "logo_Partido",
        "municipio",
        "demarcacion",
        "orden",
        "id",
      ];
      break;
    default:
      break;
  }
  pagination.value = {
    sortBy: "desc",
    descending: false,
    page: 1,
    rowsPerPage: 5,
  };
};

const columns = [
  {
    name: "nombre_Completo",
    align: "center",
    label: "Nombre",
    field: "nombre_Completo",
    sortable: true,
  },
  {
    name: "candidatura",
    align: "center",
    label: "Candidatura",
    field: "candidatura",
    sortable: true,
  },
  {
    name: "estatus_Aprobado",
    align: "center",
    label: "Aprobado",
    field: "estatus_Aprobado",
    sortable: true,
  },
  {
    name: "sexo",
    align: "center",
    label: "Género",
    field: "sexo",
    sortable: true,
  },
  {
    name: "edad",
    align: "center",
    label: "Edad",
    field: "edad",
    sortable: true,
  },
  {
    name: "tipo_Candidato",
    align: "center",
    label: "Cargo",
    field: "tipo_Candidato",
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
    name: "no_Distrito",
    align: "center",
    label: "Distrito",
    field: "no_Distrito",
    sortable: true,
  },
  {
    name: "orden",
    align: "center",
    label: "Orden de prelación",
    field: "orden",
    sortable: true,
  },
  {
    name: "logo_Coalicion",
    align: "center",
    label: "Coalición",
    field: "logo_Coalicion",
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
    name: "id",
    align: "center",
    label: "Acciones",
    field: "id",
    sortable: true,
  },
];

const filter = ref("");
const pagination = ref({
  sortBy: "desc",
  descending: false,
  page: 1,
  rowsPerPage: 5,
});

//-----------------------------------------------------------

const limpiarFiltros = () => {
  coalicion_Id.value = { value: 0, label: "Todos" };
  partido_Id.value = { value: 0, label: "Todos" };
  cargo_Id.value = "Todos";
};

const filtrar = (list_Candidatos, filtro) => {
  list_Candidatos_Filtro.value = list_Candidatos.filter((item) => {
    let cumple = true;
    if (filtro.cargo !== undefined) {
      if (filtro.cargo == "Todos") {
        cumple = cumple && item.tipo_Candidato === item.tipo_Candidato;
      } else {
        cumple = cumple && item.tipo_Candidato === filtro.cargo;
      }
    }
    if (filtro.partido !== undefined) {
      if (filtro.partido == 0) {
        cumple = cumple && item.partido_Id === item.partido_Id;
      } else {
        cumple = cumple && item.partido_Id === filtro.partido;
      }
    }
    if (filtro.coalicion !== undefined) {
      if (filtro.coalicion == 0) {
        cumple = cumple && item.coalicion_Id === item.coalicion_Id;
      } else {
        cumple = cumple && item.coalicion_Id === filtro.coalicion;
      }
    }

    return cumple;
  });
};

watchEffect(() => {
  const filtro = {};
  if (cargo_Id.value != null) filtro.cargo = cargo_Id.value;
  if (partido_Id.value != null) filtro.partido = partido_Id.value.value;
  if (coalicion_Id.value != null) {
    filtro.coalicion = coalicion_Id.value.value;
    if (coalicion_Id.value.value != 0) {
      list_Filtro_Partidos.value = list_Partidos_Politicos_Todos.value.filter(
        (x) => x.coalicion_Id == coalicion_Id.value.value
      );
    } else {
      list_Filtro_Partidos.value = list_Partidos_Politicos_Todos.value;
    }
  }
  filtrar(list_Candidatos_Genero.value, filtro);
});
</script>
<style lang="sass">
.my-sticky-last-column-table
  thead tr:last-child th:last-child
    /* bg color is important for th; just specify one */
    background-color: white

  td:last-child
    background-color: white

  th:last-child,
  td:last-child
    position: sticky
    right: 0
    z-index: 1
</style>
