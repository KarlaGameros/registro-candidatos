<template>
  <div class="q-pa-md">
    <div class="bg-blue-grey-4" style="border-radius: 3px">
      <div class="text-h6 text-center text-white">
        Historial de sustituciones
      </div>
    </div>
    <q-table
      :rows="list_Candidatos"
      :columns="columns"
      :filter="filter"
      row-key="name"
      :loading="loading"
      color="pink"
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
            <div v-else-if="col.name === 'activo'">
              <q-btn
                flat
                round
                :color="props.row.activo == true ? 'green' : 'red'"
                :icon="props.row.activo == true ? 'done' : 'close'"
              >
              </q-btn>
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
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";
import { useCandidatosStore } from "src/stores/candidatos-store";
import { useSustituirStore } from "src/stores/sustituir-store";
import { onBeforeMount, ref } from "vue";

//--------------------------------------------------------------------

const $q = useQuasar();
const sustituirStore = useSustituirStore();
const candidatosStore = useCandidatosStore();
const { list_Candidatos, loading } = storeToRefs(candidatosStore);
const { list_Sustituciones } = storeToRefs(sustituirStore);
const expandedRow = ref(null);

//--------------------------------------------------------------------

onBeforeMount(() => {
  cargarData();
});

//--------------------------------------------------------------------

const cargarData = async () => {
  $q.loading.show();
  await candidatosStore.loadCandidatos();
  $q.loading.hide();
};

const columns = [
  {
    name: "id_Expand",
    align: "center",
    label: "Ver mas",
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
    name: "activo",
    align: "center",
    label: "Activo",
    field: "activo",
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
    name: "tipo_Eleccion",
    align: "center",
    label: "Elección",
    field: "tipo_Eleccion",
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
