<template>
  <div class="q-pa-md">
    <q-table
      :grid="$q.screen.xs"
      flat
      bordered
      :rows="listFiltrado"
      :columns="columns"
      :visible-columns="visisble_columns"
      row-key="name"
      :filter="filter"
      class="my-sticky-last-column-table"
      v-model:pagination="pagination"
    >
      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-if="$q.screen.xs" v-slot:item="props">
        <div
          class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
        >
          <q-card bordered class="no-shadow">
            <q-item>
              <q-item-section avatar>
                <q-avatar size="60px" class="shadow-10">
                  <img :src="props.row.fotografia" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-grey-8 text-weight-bold">
                  {{ props.row.nombre }}
                </q-item-label>
                <q-item-label caption>
                  Fecha de registro: {{ props.row.fecha_Registro }}
                </q-item-label>
                <q-item-label class="text-grey-8">
                  correo@example.com
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-item-label>
                  <q-avatar size="30px" class="shadow-10">
                    <img :src="props.row.imgPartido" />
                  </q-avatar>
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-separator></q-separator>
            <q-item>
              <q-item-section>
                <q-item-label class="text-grey-8 text-weight-bold">
                  Género: {{ props.row.genero }}
                </q-item-label>
                <q-item-label caption v-if="props.row.tipo_Eleccion != null">
                  Tipo de elección: {{ props.row.tipo_Eleccion }}
                </q-item-label>
                <q-item-label caption v-if="props.row.distrito != null">
                  Distrito: {{ props.row.distrito }}
                </q-item-label>
                <q-item-label caption v-if="props.row.municipio != null">
                  Municipio: {{ props.row.municipio }}
                </q-item-label>
                <q-item-label caption v-if="props.row.demarcacion != null">
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
                    flat
                    round
                    color="pink-5"
                    icon="edit_square"
                    @click="actualizarModal(true)"
                  >
                    <q-tooltip>Editar información</q-tooltip>
                  </q-btn>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-card>
        </div>
      </template>
      <template v-else v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            <div v-if="col.name === 'id_grupo'">
              <q-btn
                size="sm"
                color="pink-8"
                round
                dense
                @click="toggleRowExpand(props.row)"
                :icon="isRowExpanded(props.row) ? 'remove' : 'add'"
              />
            </div>
            <div v-else-if="col.name === 'nombre'">
              <div class="user__info">
                <q-avatar>
                  <img :src="props.row.fotografia" alt="" />
                </q-avatar>
                <div>
                  <div class="user__name">{{ props.row.nombre }}</div>
                  <div class="user__email">correo@example.com</div>
                </div>
              </div>
            </div>
            <div v-else-if="col.name === 'coalicion'">
              <q-avatar size="md">
                <img
                  v-if="props.row.imgPartido2"
                  :src="props.row.imgPartido2"
                  alt=""
                />
              </q-avatar>
              <q-avatar size="md">
                <img
                  v-if="props.row.imgPartido3"
                  :src="props.row.imgPartido3"
                  alt=""
                />
              </q-avatar>
            </div>
            <div v-else-if="col.name === 'partido'">
              <q-avatar>
                <img :src="props.row.imgPartido" alt="" />
              </q-avatar>
            </div>
            <div v-else-if="col.name === 'fecha_registro'">
              <label>{{ props.row.fecha_Registro }}</label>
            </div>
            <div v-else-if="col.name === 'id'">
              <q-btn
                flat
                round
                color="pink-5"
                icon="edit_square"
                @click="actualizarModal(true)"
              >
                <q-tooltip>Editar información</q-tooltip>
              </q-btn>
              <q-btn
                flat
                round
                color="pink-5"
                icon="sync_alt"
                @click="modalSustituir(true)"
              >
                <q-tooltip>Sustituir </q-tooltip>
              </q-btn>
            </div>
            <label v-else>{{ col.value }}</label>
          </q-td>
        </q-tr>
        <q-tr v-show="isRowExpanded(props.row)" :props="props">
          <q-td colspan="100%">
            <div class="row">
              <div class="col-1 text-caption text-bold"></div>
              <div class="col-2 text-caption text-bold">Nombre</div>
              <div class="col-1 text-caption text-bold">Estatus</div>
              <div class="col-1 text-caption text-bold">Género</div>
              <div class="col-1 text-caption text-bold">Nombre coalición</div>
              <div class="col-1 text-caption text-bold">Coalición</div>
              <div class="col-1 text-caption text-bold">Partido</div>
              <div class="col-1 text-caption text-bold">Fecha de registro</div>
            </div>
            <div
              class="row q-pb-xs"
              v-for="candidato in listGrupo"
              :key="candidato.id"
            >
              <div class="col-1"></div>
              <div class="user__info col-2">
                <q-avatar>
                  <img :src="candidato.fotografia" alt="" />
                </q-avatar>
                <div>
                  <div class="user__name">{{ candidato.nombre }}</div>
                  <div class="user__email">correo@example.com</div>
                </div>
              </div>
              <div class="col-1">
                {{ candidato.estatus }}
              </div>
              <div class="col-1">
                {{ candidato.genero }}
              </div>
              <div class="col-1">
                {{ candidato.nombre_Coalicion }}
              </div>
              <div class="col-1">
                <q-avatar size="md">
                  <img
                    v-if="candidato.imgPartido2"
                    :src="candidato.imgPartido2"
                    alt=""
                  />
                </q-avatar>
                <q-avatar size="md">
                  <img
                    v-if="candidato.imgPartido3"
                    :src="candidato.imgPartido3"
                    alt=""
                  />
                </q-avatar>
              </div>
              <div class="col-1">
                {{ candidato.partido }}
              </div>
              <div class="col-1">
                {{ candidato.fecha_Registro }}
              </div>
            </div>
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
  </div>
  <ModalSustituir />
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";
import { useExampleStore } from "src/stores/example-store";
import { computed, ref, defineProps, onBeforeMount } from "vue";
import { useSustituirStore } from "src/stores/sustituir-store";
import ModalSustituir from "../../sustituciones/components/ModalSustituir.vue";

//--------------------------------------------------------------------

const $q = useQuasar();
const exampleStore = useExampleStore();
const sustituirStore = useSustituirStore();
const { listCandidatos } = storeToRefs(exampleStore);
const visisble_columns = ref("");
const listFiltrado = ref("");
const props = defineProps({
  tab: { type: String, required: true },
});
const expandedRow = ref(null);
const listGrupo = ref([]);
//--------------------------------------------------------------------

onBeforeMount(() => {
  exampleStore.loadCandidatos();
  cargarColumnas(props.tab);
});

//--------------------------------------------------------------------

const cargarColumnas = (tab) => {
  if (tab == "diputaciones") {
    visisble_columns.value = [
      "id_grupo",
      "nombre",
      "estatus",
      "genero",
      "tipo_Eleccion",
      "nombre_Coalicion",
      "coalicion",
      "partido",
      "distrito",
      "fecha_registro",
      "orden_Prelacion",
      "id",
    ];
    listFiltrado.value = listCandidatos.value.filter(
      (x) => x.tipo == "Diputación" && x.cargo == "Propietario"
    );
  } else if (tab == "presidenciaSindicatura") {
    visisble_columns.value = [
      "id_grupo",
      "nombre",
      "estatus",
      "genero",
      "nombre_Coalicion",
      "coalicion",
      "partido",
      "municipio",
      "fecha_registro",
      "id",
    ];
    listFiltrado.value = listCandidatos.value.filter(
      (x) => x.tipo == "Presidencia y Sindicaturas" && x.cargo == "Propietario"
    );
  } else if (tab == "regidurias") {
    visisble_columns.value = [
      "id_grupo",
      "nombre",
      "estatus",
      "genero",
      "tipo_Eleccion",
      "nombre_Coalicion",
      "coalicion",
      "partido",
      "municipio",
      "demarcacion",
      "fecha_registro",
      "orden_Prelacion",
      "id",
    ];
    listFiltrado.value = listCandidatos.value.filter(
      (x) => x.tipo == "Regidurias" && x.cargo == "Propietario"
    );
  }
};

const pagesNumber = computed(() =>
  Math.ceil(listFiltrado.value.length / pagination.value.rowsPerPage)
);

const actualizarModal = (valor) => {
  exampleStore.actualizarModal(valor);
};

const modalSustituir = (valor) => {
  sustituirStore.actualizarModal(valor);
};

const toggleRowExpand = (row) => {
  if (expandedRow.value === row) {
    expandedRow.value = null;
  } else {
    expandedRow.value = row;
    listGrupo.value = listCandidatos.value.filter(
      (x) => x.id_grupo == row.id_grupo && x.cargo != "Propietario"
    );
  }
};
const isRowExpanded = (row) => {
  return expandedRow.value === row;
};
//--------------------------------------------------------------------

const columns = [
  {
    name: "id_grupo",
    align: "center",
    label: "Ver mas",
    field: "id_prupo",
    sortable: true,
  },
  {
    name: "nombre",
    align: "center",
    label: "Nombre",
    field: "nombre",
    sortable: true,
  },
  {
    name: "estatus",
    align: "center",
    label: "Estatus",
    field: "estatus",
    sortable: true,
  },
  {
    name: "genero",
    align: "center",
    label: "Género",
    field: "genero",
    sortable: true,
  },
  {
    name: "tipo_Eleccion",
    align: "center",
    label: "Tipo",
    field: "tipo_Eleccion",
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
    name: "distrito",
    align: "center",
    label: "Distrito",
    field: "distrito",
    sortable: true,
  },
  {
    name: "orden_Prelacion",
    align: "center",
    label: "Orden de prelación",
    field: "orden_Prelacion",
    sortable: true,
  },
  {
    name: "nombre_Coalicion",
    align: "center",
    label: "Nombre coalición",
    field: "nombre_Coalicion",
    sortable: true,
  },
  {
    name: "coalicion",
    align: "center",
    label: "Coalicion",
    field: "coalicion",
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
