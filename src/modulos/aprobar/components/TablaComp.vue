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
        Módulo que muestra las aprobaciones realizadas, la opción de subir el
        acuerdo correspondiente
        <q-icon name="upload_file" color="pink" size="sm" /> y la opción de
        visualizarlo después de subirlo<q-icon
          name="visibility"
          color="pink"
          size="sm"
        />.
      </q-banner>
    </div>
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
                color="pink"
                icon="upload_file"
                @click="subirAcuerdo(col.value)"
              >
                <q-tooltip>Subir acuerdo</q-tooltip>
              </q-btn>
              <q-btn
                v-if="props.row.acuerdo_Url != null"
                flat
                round
                color="pink"
                icon="visibility"
                @click="verDocumento(props.row)"
              >
                <q-tooltip>Ver acuerdo</q-tooltip>
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
import { useQuasar, QSpinnerCube } from "quasar";

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
  $q.loading.show({
    spinner: QSpinnerCube,
    spinnerColor: "pink",
    spinnerSize: 140,
    backgroundColor: "purple-2",
    message: "Espere un momento porfavor...",
    messageColor: "black",
  });
  await aprobarStore.loadAprobacionCandidaturas();
  $q.loading.hide();
};

const subirAcuerdo = async (id) => {
  $q.loading.show();
  aprobarStore.actualizarModal(true);
  aprobarStore.updateEditar(true);
  await aprobarStore.loadAprobacionCandidaturaById(id);
  await aprobarStore.loadDetalle(id);
  $q.loading.hide();
};

const verDocumento = async (row) => {
  $q.dialog({
    title: `Acuerdo ${row.acuerdo}`,
    style: "width: 800px; max-width: 80vw",
    message:
      row.acuerdo_Url != null
        ? `<iframe
            src="${row.acuerdo_Url}"
            width="100%"
            height="650"
          ></iframe>`
        : '<div class="text-subtitle2">Favor de subir el acuerdo correspondiente a la aprobación</div>',
    html: true,
    ok: "Cerrar",
  });
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
