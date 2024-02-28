<template>
  <div class="q-pa-md">
    <div class="q-pb-md">
      <q-banner
        inline-actions
        class="text-justify bg-grey-2"
        style="border-radius: 20px"
      >
        <template v-slot:avatar>
          <q-icon name="info" color="grey" />
        </template>
        Módulo que muestra el historial de sustituciones de candidaturas por
        fórmula despues de ser aprobadas. En el icono
        <q-icon name="add_circle" color="pink" size="xs" /> podrá ver si algún
        cargo de la fórmula tuvo una sustitución
      </q-banner>
    </div>
    <div class="bg-blue-grey-4" style="border-radius: 2px">
      <div class="text-h6 text-center text-white">
        Historial de sustituciones
      </div>
    </div>
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
            :visible-columns="visisble_columns"
            :rows="list_Candidatos_Filtro"
            :columns="columns"
            :filter="filter"
            row-key="name"
            color="pink"
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
                  <div v-if="col.name === 'id_Expand'">
                    <q-btn
                      size="sm"
                      color="pink-8"
                      round
                      dense
                      @click="toggleRowExpand(props.row)"
                      :icon="isRowExpanded(props.row) ? 'remove' : 'add'"
                    />
                  </div>
                  <div v-else-if="col.name === 'estatus'">
                    <q-btn
                      flat
                      round
                      :color="
                        props.row.estatus == 'Registro Aprobado'
                          ? 'green'
                          : 'red'
                      "
                      :icon="
                        props.row.estatus == 'Registro Aprobado'
                          ? 'done'
                          : 'close'
                      "
                    >
                    </q-btn>
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
                      <img
                        :src="props.row.url_Logo_Partido_Propietario"
                        alt=""
                      />
                      <q-tooltip>{{ props.row.partido }}</q-tooltip>
                    </q-avatar>
                  </div>
                  <label v-else>{{ col.value }}</label>
                </q-td>
              </q-tr>
              <q-tr v-show="isRowExpanded(props.row)" :props="props">
                <q-td colspan="100%">
                  <q-table
                    :rows="list_Sustituciones"
                    :columns="columns_2"
                    row-key="name"
                  >
                    <template v-slot:body="props">
                      <q-tr :props="props">
                        <q-td
                          v-for="col in props.cols"
                          :key="col.name"
                          :props="props"
                        >
                          <label>{{ col.value }}</label>
                        </q-td>
                      </q-tr>
                    </template>
                  </q-table>
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
import { storeToRefs } from "pinia";
import { useQuasar, QSpinnerCube } from "quasar";
import { useCandidatosStore } from "src/stores/candidatos-store";
import { useConfiguracionStore } from "src/stores/configuracion-store";
import { useSustituirStore } from "src/stores/sustituir-store";
import { onMounted, ref, watch } from "vue";

//--------------------------------------------------------------------

const $q = useQuasar();
const sustituirStore = useSustituirStore();
const candidatosStore = useCandidatosStore();
const configuracionStore = useConfiguracionStore();
const { tipo_Elecciones } = storeToRefs(configuracionStore);
const { list_Candidatos } = storeToRefs(candidatosStore);
const { list_Sustituciones } = storeToRefs(sustituirStore);
const expandedRow = ref(null);
const tab_Eleccion = ref("DIP");
const tipo_Eleccion_Id = ref(2);
const visisble_columns = ref([]);
const list_Candidatos_Filtro = ref([]);

//--------------------------------------------------------------------

onMounted(() => {
  cargarData();
});

//--------------------------------------------------------------------

watch(tab_Eleccion, (val) => {
  if (val != null) {
    cargarColumnas(val);
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
  await configuracionStore.loadTipoElecciones();
  await candidatosStore.loadCandidatos();
  await cargarColumnas(tab_Eleccion.value);
  $q.loading.hide();
};

const cargarColumnas = async (tab_Eleccion) => {
  switch (tab_Eleccion) {
    case "GUB":
      visisble_columns.value = [
        "id_Expand",
        "nombre_Completo_Propietario",
        "edad_Propietario",
        "estatus",
        "genero_Propietario",
        "tipo_Candidato",
        "logo_Coalicion",
        "logo_Partido",
        "orden",
      ];
      list_Candidatos_Filtro.value = list_Candidatos.value.filter(
        (x) =>
          x.tipo_Eleccion == "Gubernatura" && x.estatus == "Registro Aprobado"
      );
      break;
    case "DIP":
      visisble_columns.value = [
        "id_Expand",
        "nombre_Completo_Propietario",
        "edad_Propietario",
        "estatus",
        "genero_Propietario",
        "tipo_Candidato",
        "logo_Coalicion",
        "logo_Partido",
        "no_Distrito",
        "orden",
      ];
      list_Candidatos_Filtro.value = list_Candidatos.value.filter(
        (x) =>
          x.tipo_Eleccion == "Diputaciones" && x.estatus == "Registro Aprobado"
      );
      break;
    case "PYS":
      visisble_columns.value = [
        "id_Expand",
        "nombre_Completo_Propietario",
        "edad_Propietario",
        "estatus",
        "genero_Propietario",
        "logo_Coalicion",
        "logo_Partido",
        "municipio",
      ];
      list_Candidatos_Filtro.value = list_Candidatos.value.filter(
        (x) =>
          x.tipo_Eleccion == "Presidencias y Sindicaturas" &&
          x.estatus == "Registro Aprobado"
      );
      break;
    case "REG":
      visisble_columns.value = [
        "id_Expand",
        "nombre_Completo_Propietario",
        "edad_Propietario",
        "estatus",
        "genero_Propietario",
        "tipo_Candidato",
        "logo_Coalicion",
        "logo_Partido",
        "municipio",
        "demarcacion",
        "orden",
      ];
      list_Candidatos_Filtro.value = list_Candidatos.value.filter(
        (x) =>
          x.tipo_Eleccion == "Regidurías" && x.estatus == "Registro Aprobado"
      );
      break;
    default:
      break;
  }
};

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
    name: "logo_Partido",
    align: "center",
    label: "Partido",
    field: "logo_Partido",
    sortable: true,
  },
  {
    name: "fecha_registro",
    align: "center",
    label: "Fecha de registro",
    field: "fecha_registro",
    sortable: true,
  },
];

const columns_2 = [
  {
    name: "no_Acuerdo",
    align: "center",
    label: "Acuerdo",
    field: "no_Acuerdo",
    sortable: true,
  },
  {
    name: "tipo_Sustitucion",
    align: "center",
    label: "Tipo de sustitución",
    field: "tipo_Sustitucion",
    sortable: true,
  },
  {
    name: "nombres_Anterior",
    align: "center",
    label: "Nombres anterior",
    field: "nombres_Anterior",
    sortable: true,
  },
  {
    name: "apellido_Paterno_Anterior",
    align: "center",
    label: "Apellido paterno anterior",
    field: "apellido_Paterno_Anterior",
    sortable: true,
  },
  {
    name: "apellido_Materno_Anterior",
    align: "center",
    label: "Apellido materno anterior",
    field: "apellido_Materno_Anterior",
    sortable: true,
  },
  {
    name: "nombres_Nuevo",
    align: "center",
    label: "Nombres nuevo",
    field: "nombres_Nuevo",
    sortable: true,
  },
  {
    name: "apellido_Paterno_Nuevo",
    align: "center",
    label: "Apellido paterno nuevo",
    field: "apellido_Paterno_Nuevo",
    sortable: true,
  },
  {
    name: "apellido_Materno_Nuevo",
    align: "center",
    label: "Apellido materno nuevo",
    field: "apellido_Materno_Nuevo",
    sortable: true,
  },
  {
    name: "empleado",
    align: "center",
    label: "Personal responsable",
    field: "empleado",
    sortable: true,
  },
  {
    name: "fecha_Sustitucion",
    align: "center",
    label: "Fecha sustitución",
    field: "fecha_Sustitucion",
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

const toggleRowExpand = (row) => {
  if (expandedRow.value === row) {
    expandedRow.value = null;
  } else {
    expandedRow.value = row;
    sustituirStore.loadSustitucionByCandidato(row.id);
  }
};

const isRowExpanded = (row) => {
  return expandedRow.value === row;
};
</script>

<style></style>
