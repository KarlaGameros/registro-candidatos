<template>
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

<script setup>
import { computed, onBeforeMount, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useQuasar, QSpinnerCube } from "quasar";
import { useConfiguracionStore } from "src/stores/configuracion-store";
import { useCandidatosStore } from "src/stores/candidatos-store";
import ModalRegistro from "src/modulos/registro/components/ModalRegistro.vue";

//-----------------------------------------------------------

const $q = useQuasar();
const configuracionStore = useConfiguracionStore();
const candidatosStore = useCandidatosStore();
const { list_Documentacion_Completa, candidato } = storeToRefs(candidatosStore);
const list_Filtrado = ref([]);
const tab = ref("Completos");
const listFiltrado = ref("");
const visisble_columns = ref([]);
const list_Tabs = ref(["Completos", "Incompletos"]);

//-----------------------------------------------------------

onBeforeMount(async () => {
  await configuracionStore.loadTipoElecciones();
  cargarData();
});

//-----------------------------------------------------------

watch(tab, (val) => {
  if (val != null) {
    cargarData();
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
  await candidatosStore.loadDocumentacionCompleta();
  cargarColumnas(tab.value);
  $q.loading.hide();
};

const verDocumentos = async (row) => {
  await candidatosStore.loadCandidato(row.candidato_Id);
  candidatosStore.actualizarModal(true);
  candidatosStore.actualizarVisualizar(true);
  candidatosStore.actualizarIsDocumentacion(true);
};

const cargarColumnas = (tab) => {
  switch (tab) {
    case "Completos":
      visisble_columns.value = [
        "id",
        "nombre_Completo",
        "documentos",
        "tipo_Candidato",
        "tipo_Eleccion",
        "aprobado",
        "logo_Coalicion",
        "logo_Partido",
      ];
      list_Filtrado.value = list_Documentacion_Completa.value.filter(
        (x) => x.completo == true
      );
      break;
    case "Incompletos":
      visisble_columns.value = [
        "id",
        "nombre_Completo",
        "documentos",
        "tipo_Candidato",
        "tipo_Eleccion",
        "aprobado",
        "logo_Coalicion",
        "logo_Partido",
      ];
      list_Filtrado.value = list_Documentacion_Completa.value.filter(
        (x) => x.completo == false
      );
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
