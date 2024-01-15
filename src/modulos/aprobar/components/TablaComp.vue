<template>
  <div class="q-pa-md">
    <div class="bg-blue-grey-4" style="border-radius: 3px">
      <div class="text-h6 text-center text-white">Candidaturas aprobadas</div>
    </div>
    <q-table
      :rows="list_Aprobacion_Candidaturas"
      :columns="columns"
      :filter="filter"
      row-key="name"
      v-model:pagination="pagination"
      color="pink"
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
            <div v-if="col.name === 'id'">
              <q-btn
                flat
                round
                color="pink"
                icon="search"
                @click="ver(col.value)"
              >
                <q-tooltip>Editar coalición</q-tooltip>
              </q-btn>
            </div>

            <label v-else>{{ col.value }}</label>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { storeToRefs } from "pinia";
import { useAprobarStore } from "src/stores/aprobar-store";
import { useQuasar } from "quasar";
import {
  getCurrentLocation,
  getDataDevice,
} from "../../../helpers/currentLocation";

//-----------------------------------------------------------

const $q = useQuasar();
const aprobarStore = useAprobarStore();
const { list_Aprobacion_Candidaturas } = storeToRefs(aprobarStore);

//-----------------------------------------------------------

onBeforeMount(() => {
  cargarData();
});

//-----------------------------------------------------------

const cargarData = async () => {
  await aprobarStore.loadAprobacionCandidaturas();
};

const ver = async (id) => {
  // let { latitude, longitude } = await getCurrentLocation();
  // let deviceInfo = getDataDevice();
  $q.loading.show();
  aprobarStore.actualizarModal(true);
  aprobarStore.updateEditar(true);
  await aprobarStore.loadAprobacionCandidaturaById(id);
  await aprobarStore.loadDetalle(id);
  $q.loading.hide();
};

//-----------------------------------------------------------

const columns = [
  {
    name: "usuario",
    align: "center",
    label: "Usuario",
    field: "usuario",
    sortable: true,
  },
  {
    name: "acuerdo",
    align: "center",
    label: "Acuerdo",
    field: "acuerdo",
    sortable: true,
  },
  {
    name: "fecha_Aprobacion",
    align: "center",
    label: "Fecha aprobación",
    field: "fecha_Aprobacion",
    sortable: true,
  },
  {
    name: "fecha_Registro",
    align: "center",
    label: "Fecha registro",
    field: "fecha_Registro",
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

<style></style>
