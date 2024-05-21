<template>
  <div class="q-pa-md">
    <div class="bg-blue-grey-4" style="border-radius: 3px">
      <div class="text-h6 text-center text-white">Candidaturas aprobadas</div>
    </div>
    <q-table
      :rows="list_Filtrado"
      :columns="columns"
      :filter="filter"
      row-key="name"
      v-model:pagination="pagination"
      color="pink"
    >
      <template v-slot:top-left>
        <q-select
          v-if="oficinaCentral == 'CME central IEEN'"
          filled
          color="pink"
          class="q-pl-md"
          v-model="oficina_Id"
          :options="list_Oficinas"
          label="Selecciona oficina"
          hint="Filtrar por oficina"
          style="width: 260px"
        />
        <q-select
          filled
          color="pink"
          class="q-pl-md"
          v-model="eleccion_Id"
          :options="tipo_Elecciones"
          label="Selecciona tipo de elección"
          hint="Filtrar por tipo de elección"
          style="width: 260px"
        />
        <q-select
          filled
          color="pink"
          class="q-pl-md"
          v-model="estatus_Id"
          :options="list_Estatus"
          label="Selecciona estatus"
          hint="Filtrar por estatus"
          style="width: 260px"
        />
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
        <q-tr :props="props">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            <div v-if="col.name === 'id'">
              <q-btn
                v-if="modulo == null ? false : modulo.registrar"
                flat
                round
                color="pink"
                icon="edit_square"
                @click="subirAcuerdo(col.value)"
              >
                <q-tooltip>Editar</q-tooltip>
              </q-btn>
              <q-btn
                v-if="
                  modulo == null
                    ? false
                    : modulo.leer && props.row.acuerdo_Url != null
                "
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
import { onBeforeMount, ref, watchEffect } from "vue";
import { storeToRefs } from "pinia";
import { useAprobarStore } from "src/stores/aprobar-store";
import { useQuasar, QSpinnerCube } from "quasar";
import { useAuthStore } from "src/stores/auth-store";
import { useConfiguracionStore } from "src/stores/configuracion-store";

//-----------------------------------------------------------

const $q = useQuasar();
const aprobarStore = useAprobarStore();
const authStore = useAuthStore();
const configuracionStore = useConfiguracionStore();
const { list_Oficinas, tipo_Elecciones } = storeToRefs(configuracionStore);
const { list_Aprobacion_Candidaturas } = storeToRefs(aprobarStore);
const { modulo } = storeToRefs(authStore);
const siglas = "SRC-HIS-AP";
const oficina_Id = ref(null);
const list_Filtrado = ref([]);
const oficinaCentral = localStorage.getItem("municipio_letra");
const estatus_Id = ref({ value: 0, label: "Todos" });
const eleccion_Id = ref({ value: 0, label: "Todos" });
const list_Estatus = ref([
  { value: 1, label: "Todos" },
  { value: 2, label: "Pendiente de acuerdo" },
  { value: 3, label: "Completo" },
]);

//-----------------------------------------------------------

onBeforeMount(() => {
  leerPermisos();
  cargarData();
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
  await configuracionStore.loadTipoElecciones();
  await aprobarStore.loadAprobacionCandidaturas();
  await configuracionStore.loadOficinas();
  oficina_Id.value = { value: 0, label: "Todos" };
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
  let url = row.acuerdo_Url;
  if (row.acuerdo_Url.startsWith("http")) {
    url = url.replace("http", "https");
  }
  $q.dialog({
    title: `Acuerdo ${row.acuerdo}`,
    style: "width: 800px; max-width: 80vw",
    message:
      row.acuerdo_Url != null
        ? `<iframe
            src="${url}"
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
    name: "tipo_Eleccion",
    align: "center",
    label: "Elección",
    field: "tipo_Eleccion",
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

//-----------------------------------------------------------
const filtrar = (list, filtro) => {
  list_Filtrado.value = list.filter((item) => {
    let cumple = true;
    if (filtro.estatus !== undefined) {
      if (filtro.estatus == "Todos") {
        cumple = true;
      } else {
        if (filtro.estatus == "Pendiente de acuerdo") {
          cumple = cumple && item.acuerdo_Url == null;
        } else {
          cumple = cumple && item.acuerdo_Url != null;
        }
      }
    }
    if (filtro.oficina !== undefined) {
      if (filtro.oficina == 0) {
        cumple = cumple && item.oficina_Id === item.oficina_Id;
      } else {
        cumple = cumple && item.oficina_Id === parseInt(filtro.oficina);
      }
    }
    if (filtro.eleccion !== undefined) {
      if (filtro.eleccion == 0) {
        cumple = cumple && item.tipo_Eleccion_Id === item.tipo_Eleccion_Id;
      } else {
        cumple = cumple && item.tipo_Eleccion_Id === parseInt(filtro.eleccion);
      }
    }

    return cumple;
  });
};

watchEffect(() => {
  const filtro = {};
  if (oficina_Id.value != null) filtro.oficina = oficina_Id.value.value;
  if (estatus_Id.value != null) filtro.estatus = estatus_Id.value.label;
  if (eleccion_Id.value != null) filtro.eleccion = eleccion_Id.value.value;

  filtrar(list_Aprobacion_Candidaturas.value, filtro);
});
</script>

<style></style>
