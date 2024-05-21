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
          v-for="tipo in filtradoElecciones"
          :key="tipo"
          :name="tipo.siglas"
          :label="tipo.nombre"
          @click="tipo_Eleccion_Id = tipo.id"
        />
      </q-tabs>
      <q-tab-panels v-model="tab_Eleccion" animated class="text-white">
        <q-tab-panel
          v-for="tipo in filtradoElecciones"
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
                v-if="tab_Eleccion != 'PYS'"
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
                v-if="tab_Eleccion == 'DIP' && cargo_Id != 'RP'"
                filled
                color="pink"
                class="q-pr-md"
                v-model="distrito_Id"
                :options="list_Distritos_Todos"
                label="Selecciona distrito"
                hint="Filtrar por distrito"
                style="width: 260px"
              />
              <q-select
                v-if="tab_Eleccion != 'DIP'"
                filled
                color="pink"
                class="q-pr-md"
                v-model="municipio_Id"
                :options="list_Municipios_Filtro"
                label="Selecciona municipio"
                hint="Filtrar por municipio"
                style="width: 260px"
              />
              <q-select
                v-if="tab_Eleccion == 'REG' && cargo_Id == 'MR'"
                filled
                color="pink"
                class="q-pr-md"
                v-model="demarcacion_Id"
                :options="list_Demarcaciones_Todos"
                label="Selecciona demarcación"
                hint="Filtrar por demarcación"
                style="width: 260px"
              />
              <q-select
                v-if="cargo_Id != 'RP'"
                filled
                color="pink"
                class="q-pr-md"
                v-model="coalicion_Id"
                :options="list_Coaliciones_Filtro"
                label="Selecciona coalición"
                hint="Filtrar por coalición"
                style="width: 260px"
              />
              <q-select
                filled
                color="pink"
                class="q-pr-md"
                v-model="partido_Id"
                :options="list_Filtro_Partidos"
                label="Selecciona partido o candidatura común"
                hint="Filtrar por partidos o candidatura común"
                style="width: 260px"
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
              <q-tr :props="props" :class="props.row.color ? '' : 'bg-grey-3'">
                <q-td v-for="col in props.cols" :key="col.name" :props="props">
                  <div v-if="col.name === 'id'">
                    <q-btn
                      v-if="modulo == null ? false : modulo.leer"
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
                  <div v-else-if="col.name === 'nombre_Completo'">
                    <q-item-label
                      class="text-left"
                      v-if="props.row.nombres != 'Pendiente de Registrar'"
                      >{{ col.value }}</q-item-label
                    >
                    <q-badge color="red" v-else>{{ col.value }}</q-badge>
                    <q-item-label caption class="">{{
                      props.row.correo
                    }}</q-item-label>
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
import { useAuthStore } from "src/stores/auth-store";
import { useGeneroStore } from "src/stores/genero-store";
import { useQuasar, QSpinnerCube } from "quasar";
import { useConfiguracionStore } from "src/stores/configuracion-store";
import { useCandidatosStore } from "src/stores/candidatos-store";

//-----------------------------------------------------------

const $q = useQuasar();
const authStore = useAuthStore();
const generoStore = useGeneroStore();
const configuracionStore = useConfiguracionStore();
const candidatosStore = useCandidatosStore();
const { modulo } = storeToRefs(authStore);
const {
  tipo_Elecciones,
  list_Partidos_Politicos_Todos,
  list_Coaliciones_Filtro,
  list_Distritos_Todos,
  list_Municipios_Filtro,
  list_Demarcaciones_Todos,
} = storeToRefs(configuracionStore);
const { list_Candidatos_Genero, loadTabla } = storeToRefs(generoStore);
const tab_Eleccion = ref(null);
const tipo_Eleccion_Id = ref(null);
const visisble_columns = ref([]);
const list_Candidatos_Filtro = ref([]);
const municipio_Id = ref(null);
const demarcacion_Id = ref(null);
const distrito_Id = ref(null);
const coalicion_Id = ref(null);
const partido_Id = ref(null);
const list_Filtro_Partidos = ref([]);
const list_Cargo = ref(["Todos", "MR", "RP"]);
const cargo_Id = ref(null);
const siglas = "SRC-DOC-GEN";
const filtradoElecciones = ref([]);

//-----------------------------------------------------------

onBeforeMount(async () => {
  await configuracionStore.loadTipoElecciones();
  leerPermisos();
  cargarData();
});

//-----------------------------------------------------------

watch(loadTabla, (val) => {
  if (val == true) {
    cargarData();
    generoStore.actualizarTabla(false);
  }
});

watch(tab_Eleccion, (val) => {
  if (val != null) {
    filter.value = "";
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
    if (localStorage.getItem("perfil_Letra") == "Capturista DIP") {
      filtradoElecciones.value = val.filter((x) => x.siglas == "DIP");
    } else {
      filtradoElecciones.value = val;
    }
  }
});

watch(municipio_Id, (val) => {
  if (val != null && tab_Eleccion.value == "REG") {
    configuracionStore.loadDemarcaciones(val.value, true);
  }
});

//-----------------------------------------------------------

const leerPermisos = async () => {
  $q.loading.show();
  await authStore.loadModulo(siglas);
  $q.loading.hide();
};

const cargarData = async () => {
  $q.loading.show({
    spinner: QSpinnerCube,
    spinnerColor: "pink",
    spinnerSize: 140,
    backgroundColor: "purple-2",
    message: "Espere un momento porfavor...",
    messageColor: "black",
  });
  await configuracionStore.loadDistritos(true);
  await configuracionStore.loadMunicipiosFiltro();
  await generoStore.loadCandidatosGenero(tipo_Eleccion_Id.value);
  await configuracionStore.loadCoalicionesFiltro();
  await configuracionStore.loadPartidosPoliticosTodos();
  cargarColumnas(tab_Eleccion.value);
  limpiarFiltros();
  $q.loading.hide();
};

const verDocumentos = async (row) => {
  $q.loading.show();
  await generoStore.getDocumentos(row.id, row.puesto, null, true);
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
    rowsPerPage: 8,
  };
};

const columns = [
  {
    name: "nombre_Completo",
    align: "center",
    label: "Nombre",
    field: "nombre_Completo",
    sortable: false,
  },
  {
    name: "candidatura",
    align: "center",
    label: "Candidatura",
    field: "candidatura",
    sortable: false,
  },
  {
    name: "estatus_Aprobado",
    align: "center",
    label: "Aprobado",
    field: "estatus_Aprobado",
    sortable: false,
  },
  {
    name: "sexo",
    align: "center",
    label: "Género",
    field: "sexo",
    sortable: false,
  },
  {
    name: "edad",
    align: "center",
    label: "Edad",
    field: "edad",
    sortable: false,
  },
  {
    name: "tipo_Candidato",
    align: "center",
    label: "Cargo",
    field: "tipo_Candidato",
    sortable: false,
  },
  {
    name: "municipio",
    align: "center",
    label: "Municipio",
    field: "municipio",
    sortable: false,
  },
  {
    name: "demarcacion",
    align: "center",
    label: "Demarcación",
    field: "demarcacion",
    sortable: false,
  },
  {
    name: "no_Distrito",
    align: "center",
    label: "Distrito",
    field: "no_Distrito",
    sortable: false,
  },
  {
    name: "orden",
    align: "center",
    label: "Orden de prelación",
    field: "orden",
    sortable: false,
  },
  {
    name: "logo_Coalicion",
    align: "center",
    label: "Coalición/Común",
    field: "logo_Coalicion",
    sortable: false,
  },
  {
    name: "logo_Partido",
    align: "center",
    label: "Partido",
    field: "logo_Partido",
    sortable: false,
  },
  {
    name: "id",
    align: "center",
    label: "Acciones",
    field: "id",
    sortable: false,
  },
];

const filter = ref("");
const pagination = ref({
  sortBy: "desc",
  descending: false,
  page: 1,
  rowsPerPage: 8,
});

//-----------------------------------------------------------

const limpiarFiltros = () => {
  distrito_Id.value = { value: 0, label: "Todos" };
  municipio_Id.value = { value: 0, label: "Todos" };
  demarcacion_Id.value = { value: 0, label: "Todos" };
  coalicion_Id.value = { value: 0, label: "Todos" };
  partido_Id.value = { value: 0, label: "Todos" };
  cargo_Id.value = "Todos";
};

const filtrar = (list_Candidatos, filtro) => {
  list_Candidatos_Filtro.value = list_Candidatos.filter((item) => {
    let cumple = true;
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
    if (filtro.cargo !== undefined) {
      if (filtro.cargo == "Todos") {
        cumple = cumple && item.tipo_Candidato === item.tipo_Candidato;
      } else {
        cumple = cumple && item.tipo_Candidato === filtro.cargo;
      }
    }
    if (filtro.partido !== undefined) {
      if (filtro.partido.value == 0) {
        cumple = cumple && item.partido_Id === item.partido_Id;
      } else {
        if (filtro.partido.is_Comun == true) {
          cumple = cumple && item.comun_Id === filtro.partido.value;
        } else {
          cumple = cumple && item.partido_Id === filtro.partido.value;
        }
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
  if (distrito_Id.value != null) filtro.distrito = distrito_Id.value.value;
  if (municipio_Id.value != null) filtro.municipio = municipio_Id.value.value;
  if (demarcacion_Id.value != null)
    filtro.demarcacion = demarcacion_Id.value.value;
  if (cargo_Id.value != null) filtro.cargo = cargo_Id.value;
  if (partido_Id.value != null) filtro.partido = partido_Id.value;
  if (coalicion_Id.value != null) {
    filtro.coalicion = coalicion_Id.value.value;
    if (coalicion_Id.value.value != 0) {
      list_Filtro_Partidos.value = list_Partidos_Politicos_Todos.value.filter(
        (x) => x.coalicion_Id == coalicion_Id.value.value
      );
      list_Filtro_Partidos.value.splice(0, 0, {
        value: 0,
        label: "Todos",
      });
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
