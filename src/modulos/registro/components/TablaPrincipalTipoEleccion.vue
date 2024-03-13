<template>
  <template v-if="list_Candidatos.length == 0">
    <div class="absolute-center">
      <q-spinner-cube color="pink" size="5.5em" />
      <div>Cargando...</div>
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
            v-for="tipo in tipo_Elecciones"
            :key="tipo"
            :name="tipo.siglas"
            :label="tipo.nombre"
          />
        </q-tabs>
        <q-tab-panels v-model="tab" animated class="text-white">
          <q-tab-panel
            v-for="tipo in tipo_Elecciones"
            :key="tipo"
            :name="tipo.siglas"
          >
            <q-table
              :grid="$q.screen.xs"
              flat
              bordered
              :rows="list_Candidatos_Filtrados"
              :columns="columns"
              :visible-columns="visisble_columns"
              row-key="name"
              :filter="filter"
              class="my-sticky-last-column-table"
              v-model:pagination="pagination"
              color="green"
            >
              <template v-slot:top-left>
                <div class="text-center">
                  <q-checkbox color="green" v-model="selected" />
                </div>
                <q-btn
                  v-if="list_Candidatos_Filtrados.length > 0"
                  type="button"
                  color="pink-1"
                  icon-right="gavel"
                  label="Aprobar"
                  @click="aprobar"
                />
                <q-select
                  v-if="tab != 'PYS' && list_Candidatos_Filtrados.length > 0"
                  filled
                  color="pink"
                  class="q-pl-md"
                  v-model="cargo_Id"
                  :options="list_Cargo"
                  label="Selecciona cargo"
                  hint="Filtrar por cargo"
                  style="width: 260px"
                />
                <q-select
                  v-if="
                    cargo_Id != 'RP' && list_Candidatos_Filtrados.length > 0
                  "
                  filled
                  color="pink"
                  class="q-pl-md"
                  v-model="coalicion_Id"
                  :options="list_Coaliciones_Filtro"
                  label="Selecciona coalición"
                  hint="Filtrar por coalición"
                  style="width: 260px"
                >
                </q-select>
                <q-select
                  v-if="list_Candidatos_Filtrados.length > 0"
                  filled
                  color="pink"
                  class="q-pl-md"
                  v-model="partido_Id"
                  :options="list_Filtro_Partidos"
                  label="Selecciona partido"
                  hint="Filtrar por partidos"
                  style="width: 260px"
                >
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
              <!--TEMPLATE SCREEN XS-->
              <template v-if="$q.screen.xs" v-slot:item="props">
                <div
                  class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
                >
                  <q-card bordered class="no-shadow">
                    <div class="q-pa-sm">
                      <q-checkbox
                        v-if="props.row.estatus == null"
                        color="green"
                        v-model="props.row.aprobar"
                        @click="updateSelection(props.row)"
                      />
                      <q-btn
                        size="sm"
                        color="pink-8"
                        round
                        dense
                        @click="toggleRowExpand(props.row)"
                        :icon="isRowExpanded(props.row) ? 'remove' : 'add'"
                      />
                    </div>
                    <q-item>
                      <q-item-section avatar>
                        <q-avatar
                          size="50px"
                          v-if="props.row.url_Foto_Propietario != null"
                        >
                          <img :src="props.row.url_Foto_Propietario" />
                        </q-avatar>
                        <q-avatar size="50px" v-else>
                          <q-img
                            v-if="props.row.genero_Propietario == 'Mujer'"
                            src="../../../assets/avatarmujer.jpg"
                          />
                          <q-img
                            v-if="props.row.genero_Propietario == 'Hombre'"
                            src="../../../assets/avatarHombre.jpg"
                          />
                          <q-img
                            v-if="props.row.genero_Propietario == 'No binario'"
                            src="../../../assets/noBinario.png"
                          />
                        </q-avatar>
                      </q-item-section>

                      <q-item-section>
                        <q-item-label class="text-grey-8 text-weight-bold">
                          {{ props.row.nombre_Completo_Propietario }}
                        </q-item-label>
                        <q-item-label caption>
                          Fecha de registro: {{ props.row.fecha_registro }}
                        </q-item-label>
                        <q-item-label class="text-center">
                          <q-avatar style="width: auto; height: 28px" square>
                            <img
                              :src="
                                props.row.is_Coalicion == true
                                  ? props.row.logo_Coalicion
                                  : props.row.url_Logo_Partido_Propietario
                              "
                              alt=""
                            />
                            <q-tooltip>{{ props.row.coalicion }}</q-tooltip>
                          </q-avatar>
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-separator></q-separator>
                    <q-item>
                      <q-item-section>
                        <q-item-label class="text-grey-8 text-weight-bold"
                          >Candidatura:
                          {{ props.row.tipo_Candidato }}</q-item-label
                        >
                        <q-item-label
                          class="text-caption text-weight-bold text-grey-8"
                          >Correo:
                          {{ props.row.correo_Propietario }}</q-item-label
                        >
                        <q-item-label
                          class="text-caption text-weight-bold text-grey-8"
                        >
                          Género: {{ props.row.genero_Propietario }}
                        </q-item-label>
                        <q-item-label
                          class="text-caption text-weight-bold text-grey-8"
                          v-if="props.row.distrito != null"
                        >
                          Distrito: {{ props.row.no_Distrito }}
                        </q-item-label>
                        <q-item-label
                          class="text-caption text-weight-bold text-grey-8"
                          v-if="props.row.municipio != null"
                        >
                          Municipio: {{ props.row.municipio }}
                        </q-item-label>
                        <q-item-label
                          class="text-caption text-weight-bold text-grey-8"
                          v-if="props.row.demarcacion != null"
                        >
                          Demarcación: {{ props.row.demarcacion }}
                        </q-item-label>
                        <q-item-label
                          class="text-grey-8"
                          v-if="props.row.nombre_Coalicion != null"
                        >
                          Nombre coalición: {{ props.row.nombre_Coalicion }}
                        </q-item-label>
                      </q-item-section>

                      <q-item-section side>
                        <q-item-label>
                          <q-btn
                            v-if="props.row.estatus == null"
                            flat
                            round
                            color="pink-5"
                            icon="edit_square"
                            @click="editar(props.row.id)"
                          >
                            <q-tooltip>Editar información </q-tooltip>
                          </q-btn>
                          <q-btn
                            v-if="props.row.estatus != null"
                            flat
                            round
                            color="pink-5"
                            icon="sync_alt"
                            @click="modalSustituir(props.row.id)"
                          >
                            <q-tooltip>Sustituir</q-tooltip>
                          </q-btn>
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-tr v-show="isRowExpanded(props.row)" :props="props">
                      <q-td>
                        <TablaSuplentesComp />
                      </q-td>
                    </q-tr>
                  </q-card>
                </div>
              </template>
              <!--TEMPLATE SCREEN DESKTOP-->
              <template v-else v-slot:body="props">
                <q-tr :props="props">
                  <q-td
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                  >
                    <div v-if="col.name === 'id_Expand'">
                      <q-checkbox
                        v-if="props.row.estatus == null"
                        color="green"
                        v-model="props.row.aprobar"
                        @click="updateSelection(props.row)"
                      />
                      <q-btn
                        size="sm"
                        color="pink-8"
                        round
                        dense
                        @click="toggleRowExpand(props.row)"
                        :icon="isRowExpanded(props.row) ? 'remove' : 'add'"
                      />
                    </div>
                    <div v-else-if="col.name === 'nombre_Completo_Propietario'">
                      <q-item>
                        <q-item-section avatar>
                          <q-avatar
                            v-if="props.row.url_Foto_Propietario != null"
                          >
                            <img :src="props.row.url_Foto_Propietario" />
                          </q-avatar>
                          <q-avatar v-else>
                            <q-img
                              v-if="props.row.genero_Propietario == 'Mujer'"
                              src="../../../assets/avatarmujer.jpg"
                            />
                            <q-img
                              v-if="props.row.genero_Propietario == 'Hombre'"
                              src="../../../assets/avatarHombre.jpg"
                            />
                            <q-img
                              v-if="
                                props.row.genero_Propietario == 'No binario'
                              "
                              src="../../../assets/noBinario.png"
                            />
                          </q-avatar>
                        </q-item-section>

                        <q-item-section class="text-left">
                          <q-item-label>{{
                            props.row.nombre_Completo_Propietario
                          }}</q-item-label>
                          <q-item-label caption class="">{{
                            props.row.correo_Propietario
                          }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </div>
                    <div v-else-if="col.name === 'estatus'">
                      <q-icon
                        size="sm"
                        flat
                        round
                        :color="
                          props.row.estatus != 'Registro Aprobado'
                            ? 'red'
                            : 'green'
                        "
                        :name="
                          props.row.estatus != 'Registro Aprobado'
                            ? 'close'
                            : 'done'
                        "
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
                    <div v-else-if="col.name === 'partido'">
                      <q-avatar square>
                        <img
                          :src="props.row.url_Logo_Partido_Propietario"
                          alt=""
                        />
                        <q-tooltip>{{ props.row.partido }}</q-tooltip>
                      </q-avatar>
                    </div>
                    <div v-else-if="col.name === 'fecha_registro'">
                      <label>{{ props.row.fecha_registro }}</label>
                    </div>
                    <div v-else-if="col.name === 'id'">
                      <q-btn
                        v-if="props.row.estatus == null"
                        flat
                        round
                        color="pink-5"
                        icon="edit_square"
                        @click="editar(col.value)"
                      >
                        <q-tooltip>Editar información</q-tooltip>
                      </q-btn>
                      <q-btn
                        v-if="props.row.estatus != null"
                        flat
                        round
                        color="pink-5"
                        icon="sync_alt"
                        @click="modalSustituir(col.value)"
                      >
                        <q-tooltip>Sustituir</q-tooltip>
                      </q-btn>
                    </div>
                    <label v-else>{{ col.value }}</label>
                  </q-td>
                </q-tr>
                <q-tr v-show="isRowExpanded(props.row)" :props="props">
                  <q-td colspan="15%">
                    <TablaSuplentesComp />
                  </q-td>
                </q-tr>
              </template>
            </q-table>
            <ModalRegistro :tab="tab" :tipo_Id="tipo.id" />
            <ModalSustituir :tab="tab" />
            <ModalAprobar :tipo_Id="tipo.id" />
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </template>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useQuasar, QSpinnerCube } from "quasar";
import { useCandidatosStore } from "src/stores/candidatos-store";
import { useAprobarStore } from "src/stores/aprobar-store";
import { ref, onBeforeMount, watch, watchEffect } from "vue";
import { useConfiguracionStore } from "src/stores/configuracion-store";
import ModalRegistro from "../components/ModalRegistro.vue";
import ModalSustituir from "../components/ModalSustituir.vue";
import ModalAprobar from "../../aprobar/components/ModalComp.vue";
import TablaSuplentesComp from "../components/TablaSuplentesComp.vue";

//--------------------------------------------------------------------

const $q = useQuasar();
const candidatoStore = useCandidatosStore();
const configuracionStore = useConfiguracionStore();
const aprobarStore = useAprobarStore();
const {
  tipo_Elecciones,
  list_Partidos_Politicos_Todos,
  list_Coaliciones_Filtro,
} = storeToRefs(configuracionStore);
const { list_Candidatos } = storeToRefs(candidatoStore);
const { list_Detalle } = storeToRefs(aprobarStore);
const visisble_columns = ref([]);
const expandedRow = ref(null);
const tab = ref(null);
const list_Candidatos_Filtro = ref([]);
const list_Candidatos_Filtrados = ref([]);
const listCandidatos = ref([]);
const partido_Id = ref(null);
const coalicion_Id = ref(null);
const list_Filtro_Partidos = ref([]);
const list_Cargo = ref(["Todos", "MR", "RP"]);
const cargo_Id = ref(null);
const selected = ref(false);

//--------------------------------------------------------------------

onBeforeMount(() => {
  cargarData();
});

//--------------------------------------------------------------------

watch(coalicion_Id, (val) => {
  if (val != null) {
    partido_Id.value = { value: 0, label: "Todos" };
  }
});

watch(tab, (val) => {
  if (val != null) {
    limpiarFiltros();
    cargarColumnas(val);
    candidatoStore.initCandidato();
    expandedRow.value = null;
    selected.value = false;
  }
});

watch(selected, (val) => {
  if (val == true) {
    list_Candidatos_Filtrados.value.forEach((element) => {
      if (element.estatus != "Registro Aprobado") {
        element.aprobar = true;
        list_Detalle.value.push({
          candidato_Id: element.id,
          candidato: element.nombre_Completo_Propietario,
          partido_Logo: element.url_Logo_Partido_Propietario,
          coalicion_Logo: element.url_Logo_Coalicion,
        });
      }
    });
  } else {
    list_Candidatos_Filtrados.value.forEach((element) => {
      if (element.estatus != "Registro Aprobado") {
        element.aprobar = false;
      }
    });
    list_Detalle.value = [];
  }
});

watch(tipo_Elecciones, (val) => {
  if (val.length > 0) {
    tab.value = val[0].siglas;
  }
});

const filtrar = (list_Candidatos, filtro) => {
  list_Candidatos_Filtro.value = list_Candidatos.filter(
    (x) => x.tipo_Eleccion == filtro.eleccion
  );
  list_Candidatos_Filtrados.value = list_Candidatos_Filtro.value.filter(
    (item) => {
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
    }
  );
};

watchEffect(() => {
  const filtro = {};
  if (tab.value != null)
    filtro.eleccion =
      tab.value == "PYS"
        ? "Presidencias y Sindicaturas"
        : tab.value == "REG"
        ? "Regidurías"
        : "Diputaciones";
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

  filtrar(list_Candidatos.value, filtro);
});
//--------------------------------------------------------------------

const limpiarFiltros = () => {
  coalicion_Id.value = { value: 0, label: "Todos" };
  partido_Id.value = { value: 0, label: "Todos" };
  cargo_Id.value = "Todos";
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
  await candidatoStore.loadCandidatos();
  await configuracionStore.loadPartidosPoliticosTodos();
  await configuracionStore.loadTipoElecciones();
  await configuracionStore.loadDistritos();
  await configuracionStore.loadPartidosPoliticos();
  await configuracionStore.loadCoaliciones();
  await configuracionStore.loadCoalicionesFiltro();
  await configuracionStore.loadMunicipios();
  cargarColumnas(tab.value);
  limpiarFiltros();
  $q.loading.hide();
};

const updateSelection = (row) => {
  const isSelected = list_Detalle.value.find((x) => x.candidato_Id == row.id);
  if (isSelected == undefined) {
    list_Detalle.value.push({
      candidato_Id: row.id,
      candidato: row.nombre_Completo_Propietario,
      partido_Logo: row.url_Logo_Partido_Propietario,
      coalicion_Logo: row.url_Logo_Coalicion,
    });
  } else {
    var index = list_Detalle.value
      .map((producto) => producto.candidato_Id)
      .indexOf(row.id);
    list_Detalle.value.splice(index, 1);
  }
};

const cargarColumnas = (tab) => {
  switch (tab) {
    case "GUB": {
      visisble_columns.value = [
        "id_Expand",
        "nombre_Completo_Propietario",
        "edad_Propietario",
        "estatus",
        "genero_Propietario",
        "tipo_Candidato",
        "logo_Coalicion",
        "partido",
        "fecha_registro",
        "orden",
        "id",
      ];
      break;
    }
    case "DIP": {
      visisble_columns.value = [
        "id_Expand",
        "nombre_Completo_Propietario",
        "edad_Propietario",
        "estatus",
        "genero_Propietario",
        "tipo_Candidato",
        "logo_Coalicion",
        "partido",
        "no_Distrito",
        "fecha_registro",
        "orden",
        "id",
      ];
      break;
    }
    case "PYS": {
      visisble_columns.value = [
        "id_Expand",
        "nombre_Completo_Propietario",
        "edad_Propietario",
        "estatus",
        "genero_Propietario",
        "logo_Coalicion",
        "partido",
        "municipio",
        "fecha_registro",
        "id",
      ];
      break;
    }
    case "REG": {
      visisble_columns.value = [
        "id_Expand",
        "nombre_Completo_Propietario",
        "edad_Propietario",
        "estatus",
        "genero_Propietario",
        "tipo_Candidato",
        "logo_Coalicion",
        "partido",
        "municipio",
        "demarcacion",
        "fecha_registro",
        "orden",
        "id",
      ];
      break;
    }
  }
  pagination.value = {
    sortBy: "desc",
    descending: false,
    page: 1,
    rowsPerPage: 5,
  };
};

const editar = async (id) => {
  $q.loading.show();
  candidatoStore.actualizarModal(true);
  candidatoStore.updateEditar(true);
  await candidatoStore.loadCandidato(id);
  $q.loading.hide();
};

const aprobar = async () => {
  $q.loading.show();
  aprobarStore.actualizarModal(true);
  if (listCandidatos.value.length != 0) {
    listCandidatos.value.forEach((element) => {
      list_Detalle.value.push({
        candidato_Id: element.id,
        candidato: element.nombre_Completo_Propietario,
        partido_Logo: element.url_Logo_Partido_Propietario,
        coalicion_Logo: element.url_Logo_Coalicion,
      });
    });
  }
  $q.loading.hide();
};

const modalSustituir = async (id) => {
  candidatoStore.actualizarModalSustituir(true);
  await candidatoStore.loadCandidato(id);
};

const toggleRowExpand = (row) => {
  if (expandedRow.value === row) {
    expandedRow.value = null;
  } else {
    expandedRow.value = row;
    candidatoStore.loadCandidatoToArray(tab.value, row.id);
  }
};

const isRowExpanded = (row) => {
  candidatoStore.initCandidato();
  return expandedRow.value === row;
};

//--------------------------------------------------------------------

const columns = [
  {
    name: "id_Expand",
    align: "center",
    label: "Ver más",
    field: "id_Expand",
    sortable: true,
  },
  {
    name: "nombre_Completo_Propietario",
    align: "center",
    label: "Nombre",
    field: "nombre_Completo_Propietario",
    sortable: true,
  },
  {
    name: "edad_Propietario",
    align: "center",
    label: "Edad",
    field: "edad_Propietario",
    sortable: true,
  },
  {
    name: "estatus",
    align: "center",
    label: "Aprobado",
    field: "estatus",
    sortable: true,
  },
  {
    name: "genero_Propietario",
    align: "center",
    label: "Género",
    field: "genero_Propietario",
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
    name: "partido",
    align: "center",
    label: "Partido",
    field: "partido",
    sortable: true,
  },
  {
    name: "fecha_registro",
    align: "center",
    label: "Fecha de registro",
    field: "fecha_registro",
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
