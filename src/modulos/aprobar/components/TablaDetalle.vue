<template>
  <q-table
    :rows="list_Detalle"
    :columns="columns"
    :filter="filter"
    row-key="name"
    :pagination="pagination"
    :visible-columns="visisble_columns"
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
          <div v-if="col.name === 'logo_Partido'">
            <q-avatar square>
              <img :src="props.row.logo_Partido" alt="" />
            </q-avatar>
          </div>
          <div v-else-if="col.name === 'logo_Coalicion'">
            <q-avatar square style="width: auto" v-if="col.value != null">
              <img :src="col.value" alt="" />
            </q-avatar>
          </div>
          <label v-else>{{ col.value }}</label>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useAprobarStore } from "src/stores/aprobar-store";

//-----------------------------------------------------------

const aprobarStore = useAprobarStore();
const { list_Detalle } = storeToRefs(aprobarStore);
const visisble_columns = ref([]);

//-----------------------------------------------------------

onMounted(() => {
  if (list_Detalle.value.length > 0) {
    cargarColumnas();
  }
});

watch(list_Detalle, (val) => {
  if (val.length > 0) {
    cargarColumnas();
  }
});

const cargarColumnas = () => {
  let tipo =
    list_Detalle.value[0].distrito_Id != null
      ? "DIP"
      : list_Detalle.value[0].municipio_Id != null &&
        list_Detalle.value[0].demarcacion_Id == null
      ? "PYS"
      : "REG";
  switch (tipo) {
    case "GUB":
      visisble_columns.value = [
        "candidato",
        "tipo_Candidato",
        "puesto_Letra",
        "logo_Partido",
        "logo_Coalicion",
      ];
      break;
    case "DIP":
      visisble_columns.value = [
        "candidato",
        "tipo_Candidato",
        "distrito",
        "puesto_Letra",
        "logo_Partido",
        "logo_Coalicion",
      ];
      break;
    case "PYS":
      visisble_columns.value = [
        "candidato",
        "tipo_Candidato",
        "municipio",
        "puesto_Letra",
        "logo_Partido",
        "logo_Coalicion",
      ];
      break;
    case "REG":
      visisble_columns.value = [
        "candidato",
        "tipo_Candidato",
        "municipio",
        "demarcacion",
        "puesto_Letra",
        "logo_Partido",
        "logo_Coalicion",
      ];
      break;
    default:
      break;
  }
};

const columns = [
  {
    name: "candidato",
    align: "center",
    label: "Candidatura",
    field: "candidato",
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
    name: "distrito",
    align: "center",
    label: "Distrito",
    field: "distrito",
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
    name: "puesto_Letra",
    align: "center",
    label: "Puesto",
    field: "puesto_Letra",
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
