<template>
  <div class="q-pa-md">
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
          v-for="tipo in filtradoElecciones"
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
            :rows="list_Sustituciones_Filtro"
            :columns="columns"
            :filter="filter"
            row-key="name"
            color="pink"
            v-model:pagination="pagination"
            :visible-columns="visible_columns"
          >
            <template v-slot:top-left>
              <q-select
                v-if="oficinaLetra == 'Oficina Central IEEN'"
                filled
                color="pink"
                class="q-pr-md"
                v-model="oficina_Id"
                :options="list_Oficinas"
                label="Selecciona oficina"
                hint="Filtrar por oficina"
                style="width: 260px"
              />
              <q-select
                v-if="tab_Eleccion != 'PYS'"
                filled
                color="pink"
                class="q-pr-md"
                v-model="cargo_Id"
                :options="list_Cargo"
                label="Selecciona cargo"
                hint="Filtrar por cargo"
                style="width: 260px"
              />
              <q-select
                v-if="tab_Eleccion == 'DIP' && cargo_Id != 'RP'"
                filled
                color="pink"
                class="q-pr-md"
                v-model="distrito_Id"
                :options="list_Distritos_Todos"
                label="Selecciona distrito"
                hint="Filtrar por distrito"
                style="width: 260px"
              />
              <q-select
                v-if="tab_Eleccion != 'DIP'"
                filled
                color="pink"
                class="q-pr-md"
                v-model="municipio_Id"
                :options="list_Municipios_Filtro"
                label="Selecciona municipio"
                hint="Filtrar por municipio"
                style="width: 260px"
              />
              <q-select
                v-if="tab_Eleccion == 'REG' && cargo_Id == 'MR'"
                filled
                color="pink"
                class="q-pr-md"
                v-model="demarcacion_Id"
                :options="list_Demarcaciones_Todos"
                label="Selecciona demarcación"
                hint="Filtrar por demarcación"
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
                  <div v-if="col.name === 'logo_Coalicion_Url'">
                    <q-avatar
                      style="width: auto; height: 35px"
                      square
                      v-if="
                        props.row.is_Coalicion == true ||
                        props.row.is_Comun == true
                      "
                    >
                      <img
                        :src="
                          props.row.is_Coalicion == true
                            ? col.value
                            : props.row.logo_Comun_Url
                        "
                        alt=""
                      />
                    </q-avatar>
                  </div>
                  <div v-else-if="col.name === 'id'">
                    <q-btn
                      v-if="props.row.escrito_Sustitucion_Url != null"
                      flat
                      round
                      color="pink-5"
                      icon="visibility"
                      @click="verAcuerdo(props.row)"
                    >
                      <q-tooltip>Ver acuerdo de sustitución</q-tooltip>
                    </q-btn>
                  </div>
                  <div v-else-if="col.name === 'logo_Partido_Anterior_Url'">
                    <q-avatar square>
                      <img :src="col.value" alt="" />
                    </q-avatar>
                  </div>
                  <div v-else-if="col.name === 'logo_Partido_Nuevo_Url'">
                    <q-avatar square>
                      <img :src="col.value" alt="" />
                    </q-avatar>
                  </div>
                  <label v-else>{{ col.value }}</label>
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
import { useConfiguracionStore } from "src/stores/configuracion-store";
import { useSustituirStore } from "src/stores/sustituir-store";
import { onBeforeMount, ref, watch, watchEffect } from "vue";

//--------------------------------------------------------------------

const $q = useQuasar();
const sustituirStore = useSustituirStore();
const configuracionStore = useConfiguracionStore();
const {
  tipo_Elecciones,
  list_Distritos_Todos,
  list_Municipios_Filtro,
  list_Demarcaciones_Todos,
  list_Oficinas,
} = storeToRefs(configuracionStore);
const { list_Sustituciones_General } = storeToRefs(sustituirStore);
const tab_Eleccion = ref(null);
const tipo_Eleccion_Id = ref(null);
const list_Candidatos_Filtro = ref([]);
const filtradoElecciones = ref([]);
const visible_columns = ref([]);
const cargo_Id = ref(null);
const distrito_Id = ref(null);
const municipio_Id = ref(null);
const demarcacion_Id = ref(null);
const oficina_Id = ref(null);
const list_Cargo = ref(["Todos", "MR", "RP"]);
const list_Sustituciones_Filtro = ref([]);
const oficinaLetra = localStorage.getItem("municipio_letra");

//--------------------------------------------------------------------

onBeforeMount(() => {
  cargarData();
});

//--------------------------------------------------------------------

watch(tab_Eleccion, (val) => {
  if (val != null) {
    list_Sustituciones_Filtro.value = list_Sustituciones_General.value.filter(
      (x) => x.tipo_Eleccion == tipo_Eleccion_Id.value
    );
    cargarColumnas();
    oficina_Id.value = { value: 0, label: "Todos" };
    distrito_Id.value = { value: 0, label: "Todos" };
    municipio_Id.value = { value: 0, label: "Todos" };
    demarcacion_Id.value = { value: 0, label: "Todos" };
    cargo_Id.value = "Todos";
  }
});

watch(municipio_Id, (val) => {
  if (val != null) {
    configuracionStore.loadDemarcaciones(val.value, true);
  }
});

watch(tipo_Elecciones, (val) => {
  if (val.length > 0) {
    tab_Eleccion.value = val[0].siglas;
    tipo_Eleccion_Id.value = val[0].id;
    if (localStorage.getItem("perfil_Letra") == "Capturista DIP") {
      filtradoElecciones.value = val.filter((x) => x.siglas == "DIP");
    } else {
      filtradoElecciones.value = val;
    }
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
  await configuracionStore.loadOficinas();
  await configuracionStore.loadTipoElecciones();
  await configuracionStore.loadDistritos(true);
  await configuracionStore.loadMunicipiosFiltro();
  await sustituirStore.loadSustituciones();
  list_Sustituciones_Filtro.value = list_Sustituciones_General.value.filter(
    (x) => x.tipo_Eleccion == tipo_Eleccion_Id.value
  );
  cargarColumnas();
  $q.loading.hide();
};

const cargarColumnas = () => {
  switch (tab_Eleccion.value) {
    case "GUB":
      visible_columns.value = [
        "id",
        "oficina",
        "tipo_Candidato",
        "logo_Coalicion_Url",
        "tipo_Sustitucion",
        "nombres_Anterior",
        "apellido_Paterno_Anterior",
        "apellido_Materno_Anterior",
        "logo_Partido_Anterior_Url",
        "nombres_Nuevo",
        "apellido_Paterno_Nuevo",
        "apellido_Materno_Nuevo",
        "logo_Partido_Nuevo_Url",
        "empleado",
        "fecha_Sustitucion",
      ];
      break;
    case "DIP":
      visible_columns.value = [
        "id",
        "oficina",
        "tipo_Candidato",
        "no_Distrito",
        "logo_Coalicion_Url",
        "tipo_Sustitucion",
        "nombres_Anterior",
        "apellido_Paterno_Anterior",
        "apellido_Materno_Anterior",
        "logo_Partido_Anterior_Url",
        "nombres_Nuevo",
        "apellido_Paterno_Nuevo",
        "apellido_Materno_Nuevo",
        "logo_Partido_Nuevo_Url",
        "empleado",
        "fecha_Sustitucion",
      ];
      break;
    case "PYS":
      visible_columns.value = [
        "id",
        "oficina",
        "tipo_Candidato",
        "municipio",
        "logo_Coalicion_Url",
        "tipo_Sustitucion",
        "nombres_Anterior",
        "apellido_Paterno_Anterior",
        "apellido_Materno_Anterior",
        "logo_Partido_Anterior_Url",
        "nombres_Nuevo",
        "apellido_Paterno_Nuevo",
        "apellido_Materno_Nuevo",
        "logo_Partido_Nuevo_Url",
        "empleado",
        "fecha_Sustitucion",
      ];
      break;
    case "REG":
      visible_columns.value = [
        "id",
        "oficina",
        "tipo_Candidato",
        "municipio",
        "demarcacion",
        "logo_Coalicion_Url",
        "tipo_Sustitucion",
        "nombres_Anterior",
        "apellido_Paterno_Anterior",
        "apellido_Materno_Anterior",
        "logo_Partido_Anterior_Url",
        "nombres_Nuevo",
        "apellido_Paterno_Nuevo",
        "apellido_Materno_Nuevo",
        "logo_Partido_Nuevo_Url",
        "empleado",
        "fecha_Sustitucion",
      ];
      break;
    default:
      break;
  }
  pagination.value = {
    sortBy: "desc",
    descending: false,
    page: 1,
    rowsPerPage: 8,
  };
};

const columns = [
  {
    name: "id",
    align: "center",
    label: "Acciones",
    field: "id",
    sortable: true,
  },
  {
    name: "oficina",
    align: "center",
    label: "Oficina",
    field: "oficina",
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
    name: "no_Distrito",
    align: "center",
    label: "Distrito",
    field: "no_Distrito",
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
    name: "logo_Coalicion_Url",
    align: "center",
    label: "Coalición/Común",
    field: "logo_Coalicion_Url",
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
    name: "logo_Partido_Anterior_Url",
    align: "center",
    label: "Partido anterior",
    field: "logo_Partido_Anterior_Url",
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
    name: "logo_Partido_Nuevo_Url",
    align: "center",
    label: "Partido nuevo",
    field: "logo_Partido_Nuevo_Url",
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

const verAcuerdo = async (row) => {
  row.escrito_Sustitucion_Url.spl;
  $q.dialog({
    title: "Escrito",
    style: "width: 800px; max-width: 80vw",
    message: `<iframe
            src="${row.escrito_Sustitucion_Url}"
            width="100%"
            height="650"
          ></iframe>`,
    html: true,
    ok: "Cerrar",
  });
};

const filtrar = (list_Sustituciones, filtro) => {
  let list = list_Sustituciones.filter(
    (x) => x.tipo_Eleccion == tipo_Eleccion_Id.value
  );
  list_Sustituciones_Filtro.value = list.filter((item) => {
    let cumple = true;
    if (filtro.distrito !== undefined) {
      if (filtro.distrito == 0) {
        cumple = cumple && item.distrito_Id === item.distrito_Id;
      } else {
        cumple = cumple && item.distrito_Id === filtro.distrito;
      }
    }
    if (filtro.municipio !== undefined) {
      if (filtro.municipio == 0) {
        cumple = cumple && item.municipio_Id === item.municipio_Id;
      } else {
        cumple = cumple && item.municipio_Id === filtro.municipio;
      }
    }
    if (filtro.demarcacion !== undefined) {
      if (filtro.demarcacion == 0) {
        cumple = cumple && item.demarcacion_Id === item.demarcacion_Id;
      } else {
        cumple = cumple && item.demarcacion_Id === filtro.demarcacion;
      }
    }
    if (filtro.cargo !== undefined) {
      if (filtro.cargo == "Todos") {
        cumple = cumple && item.tipo_Candidato === item.tipo_Candidato;
      } else {
        cumple = cumple && item.tipo_Candidato === filtro.cargo;
      }
    }

    if (filtro.oficina !== undefined) {
      if (filtro.oficina == "Todos") {
        cumple = cumple && item.oficina_Id === item.oficina_Id;
      } else {
        cumple = cumple && item.oficina_Id === filtro.oficina;
      }
    }
    return cumple;
  });
};

watchEffect(() => {
  const filtro = {};
  if (distrito_Id.value != null) filtro.distrito = distrito_Id.value.value;
  if (municipio_Id.value != null) filtro.municipio = municipio_Id.value.value;
  if (demarcacion_Id.value != null)
    filtro.demarcacion = demarcacion_Id.value.value;
  if (cargo_Id.value != null) filtro.cargo = cargo_Id.value;
  if (oficina_Id.value != null) filtro.oficina = oficina_Id.value.label;

  filtrar(list_Sustituciones_General.value, filtro);
});
</script>
