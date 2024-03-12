<template>
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
      ></q-tab>
    </q-tabs>
    <q-tab-panels v-model="tab_Eleccion" animated>
      <q-tab-panel
        v-for="tipo in tipo_Elecciones"
        :key="tipo"
        :name="tipo.siglas"
      >
        <q-table
          flat
          bordered
          :rows="list_Candidatos_By_Eleccion"
          :columns="columns"
          :visible-columns="visisble_columns"
          row-key="name"
          :filter="filter"
          v-model:pagination="pagination"
        >
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
                <div v-if="col.name === 'logo_Coalicion'">
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
                    <img :src="col.value" alt="" />
                  </q-avatar>
                </div>
                <div v-else-if="col.name === 'validado_IEEN'">
                  <q-badge :color="props.row.validado_IEEN ? 'green' : 'red'"
                    ><q-icon
                      :name="props.row.validado_IEEN ? 'done' : 'close'"
                      color="white"
                    />
                    {{ props.row.validado_IEEN ? "Validado" : "Pendiente" }}
                  </q-badge>
                </div>
                <div v-else-if="col.name === 'progreso'">
                  <progress
                    :value="props.row.validado_IEEN ? 100 : 50"
                    max="100"
                  ></progress>
                </div>
                <div v-else-if="col.name === 'acuse_URL'">
                  <q-icon
                    size="sm"
                    flat
                    round
                    :color="col.value == null ? 'red' : 'green'"
                    :name="col.value == null ? 'close' : 'done'"
                  />
                </div>
                <div v-else-if="col.name === 'id'">
                  <q-btn
                    v-if="props.row.acuse_URL != null"
                    flat
                    round
                    color="pink-4"
                    icon="visibility"
                    @click="verAcuse(props.row)"
                  >
                    <q-tooltip>Ver acuse</q-tooltip>
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
</template>

<script setup>
import { computed, onBeforeMount, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useQuasar, QSpinnerCube } from "quasar";
import { useConfiguracionStore } from "src/stores/configuracion-store";
import { useCandidatosStore } from "src/stores/candidatos-store";

//-----------------------------------------------------------

const $q = useQuasar();
const configuracionStore = useConfiguracionStore();
const candidatosStore = useCandidatosStore();
const { tipo_Elecciones } = storeToRefs(configuracionStore);
const { list_Candidatos_By_Eleccion } = storeToRefs(candidatosStore);
const tipo_Eleccion_Id = ref(null);
const tab_Eleccion = ref(null);
const listFiltrado = ref("");
const visisble_columns = ref([]);

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

watch(tipo_Elecciones, (val) => {
  if (val.length > 0) {
    tab_Eleccion.value = val[0].siglas;
    tipo_Eleccion_Id.value = val[0].id;
  }
});

const cargarData = async () => {
  $q.loading.show({
    spinner: QSpinnerCube,
    spinnerColor: "pink",
    spinnerSize: 140,
    backgroundColor: "purple-2",
    message: "Espere un momento porfavor...",
    messageColor: "black",
  });
  await candidatosStore.loadCandidatosByEleccion(tipo_Eleccion_Id.value);
  cargarColumnas(tab_Eleccion.value);
  $q.loading.hide();
};

const verAcuse = async (row) => {
  $q.dialog({
    title: "Acuse",
    style: "width: 800px; max-width: 80vw",
    message: `<iframe
            src="${row.acuse_URL}"
            width="100%"
            height="650"
          ></iframe>`,
    html: true,
    ok: "Cerrar",
  });
};

const cargarColumnas = (tab_Eleccion) => {
  switch (tab_Eleccion) {
    case "GUB":
      visisble_columns.value = [
        "id",
        "acuse_URL",
        "nombre_Completo",
        "candidatura",
        "tipo_Candidato",
        "genero",
        "no_Distrito",
        "orden",
        "logo_Coalicion",
        "logo_Partido",
      ];
      break;
    case "DIP":
      visisble_columns.value = [
        "id",
        "acuse_URL",
        "nombre_Completo",
        "candidatura",
        "tipo_Candidato",
        "genero",
        "no_Distrito",
        "orden",
        "logo_Coalicion",
        "logo_Partido",
      ];
      break;
    case "PYS":
      visisble_columns.value = [
        "id",
        "acuse_URL",
        "nombre_Completo",
        "candidatura",
        "tipo_Candidato",
        "genero",
        "municipio",
        "orden",
        "logo_Coalicion",
        "logo_Partido",
      ];
      break;
    case "REG":
      visisble_columns.value = [
        "id",
        "acuse_URL",
        "nombre_Completo",
        "candidatura",
        "tipo_Candidato",
        "genero",
        "municipio",
        "demarcacion",
        "orden",
        "logo_Coalicion",
        "logo_Partido",
      ];
      break;
    default:
      break;
  }
};

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
    name: "acuse_URL",
    align: "center",
    label: "Acuse",
    field: "acuse_URL",
    sortable: true,
  },
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
    name: "tipo_Candidato",
    align: "center",
    label: "Tipo",
    field: "tipo_Candidato",
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
    name: "logo_Partido",
    align: "center",
    label: "Partido",
    field: "logo_Partido",
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
  rowsPerPage: 5,
});
</script>
