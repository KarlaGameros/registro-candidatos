<template>
  <q-dialog
    v-model="modalHerramienta"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card style="width: 850px; max-width: 80vw">
      <q-card-section class="row">
        <div class="text-h6">
          Seleccione partido político, coalición o candidatura común
        </div>
        <q-space />
        <q-btn
          icon="close"
          @click="actualizarModal(false)"
          flat
          round
          dense
          v-close-popup
        />
      </q-card-section>
      <div class="q-gutter-y-md q-pa-md">
        <q-card>
          <q-tabs
            v-model="tab"
            dense
            class="bg-grey-4"
            active-color="pink"
            indicator-color="pink"
            align="justify"
          >
            <q-tab name="mr" label="Mayoría relativa" />
            <q-tab name="rp" label="Representación proporcional" />
          </q-tabs>
          <q-separator />
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="mr">
              <q-card-section>
                <div class="text-center text-h6 text-bold q-pa-md">
                  PARTIDOS POLÍTICOS
                </div>
                <div class="row items-start q-gutter-md flex-center">
                  <q-btn
                    v-for="partido in list_Partidos_Politicos"
                    :key="partido"
                    style="border-radius: 8px"
                    class="my-card text-center card_box"
                    @click="descargar(partido, 'partido')"
                  >
                    <q-card-section>
                      <q-avatar size="70px" square>
                        <img :src="partido.logo_URL" />
                      </q-avatar>
                      <div class="text-grey-8 text-bold q-ma-sm">
                        {{ partido.label }}
                      </div>
                    </q-card-section>
                  </q-btn>
                </div>

                <div class="text-center text-h6 text-bold q-pa-md">
                  CANDIDATURA COMÚN
                </div>
                <div class="row items-start q-gutter-md flex-center">
                  <q-btn
                    v-for="comun in list_Comunes"
                    :key="comun"
                    style="border-radius: 8px"
                    class="my-card text-center card_box"
                    @click="descargar(comun, 'comun')"
                  >
                    <q-card-section>
                      <q-avatar style="width: auto" square>
                        <img :src="comun.logo_URL" />
                      </q-avatar>
                      <div class="text-grey-8 text-bold q-ma-sm">
                        {{ comun.label }}
                      </div>
                    </q-card-section>
                  </q-btn>
                </div>
                <div class="text-center text-h6 text-bold q-pa-md">
                  COALICIONES
                </div>
                <div class="row items-start q-gutter-md flex-center">
                  <q-btn
                    v-for="coalicion in list_Coaliciones"
                    :key="coalicion"
                    style="border-radius: 8px"
                    class="my-card text-center card_box"
                    @click="descargar(coalicion, 'coalicion')"
                  >
                    <q-card-section>
                      <q-avatar style="width: auto" square>
                        <img :src="coalicion.logo_URL" />
                      </q-avatar>
                      <div class="text-grey-8 text-bold q-ma-sm">
                        {{ coalicion.label }}
                      </div>
                    </q-card-section>
                  </q-btn>
                </div>
              </q-card-section>
            </q-tab-panel>
            <q-tab-panel name="rp">
              <q-card-section>
                <div class="text-center text-h6 text-bold q-pa-md">
                  PARTIDOS POLÍTICOS
                </div>
                <div class="row items-start q-gutter-md flex-center">
                  <q-btn
                    v-for="partido in list_Partidos_Politicos_rp"
                    :key="partido"
                    style="border-radius: 8px"
                    class="my-card text-center card_box"
                    @click="descargar(partido, 'RP')"
                  >
                    <q-card-section>
                      <q-avatar size="70px" square>
                        <img :src="partido.logo_URL" />
                      </q-avatar>
                      <div class="text-grey-8 text-bold q-ma-sm">
                        {{ partido.label }}
                      </div>
                    </q-card-section>
                  </q-btn>
                </div>
              </q-card-section>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useQuasar, QSpinnerCube } from "quasar";
import { useConfiguracionStore } from "src/stores/configuracion-store";
import { useGeneroStore } from "src/stores/genero-store";
import { onBeforeMount, ref, watch } from "vue";

//-----------------------------------------------------------------

const $q = useQuasar();
const generoStore = useGeneroStore();
const configuracionStore = useConfiguracionStore();
const { modalHerramienta } = storeToRefs(generoStore);
const {
  list_Partidos_Politicos,
  list_Coaliciones,
  list_Comunes,
  list_Partidos_Politicos_rp,
} = storeToRefs(configuracionStore);
const tab = ref("mr");

//-----------------------------------------------------------------

onBeforeMount(() => {
  cargarData();
});

//-----------------------------------------------------------------

watch(tab, async (val) => {
  if (val == "rp") {
    await configuracionStore.loadPartidosPoliticosRP();
  } else {
    await configuracionStore.loadPartidosPoliticosGenero();
  }
});

//-----------------------------------------------------------------

const cargarData = async () => {
  await configuracionStore.loadCoaliciones();
  await configuracionStore.loadComunes();
  await configuracionStore.loadPartidosPoliticosGenero();
};

const actualizarModal = (valor) => {
  generoStore.actualizarModal(valor);
  generoStore.intiDocumento();
};

const descargar = async (id, tipo) => {
  $q.loading.show({
    spinner: QSpinnerCube,
    spinnerColor: "pink",
    spinnerSize: 140,
    backgroundColor: "purple-2",
    message: "Generando herramienta...",
    messageColor: "black",
  });
  let resp = null;
  if (tipo == "RP") {
    resp = await generoStore.downloadHerramientaRP(id.value);
  } else {
    resp = await generoStore.downloadHerramienta(id.value, tipo);
  }

  if (resp.success == true) {
    const link = document.createElement("a");
    link.href = generoStore.documentoHerramienta;
    if (tipo == "partido") {
      link.setAttribute("download", `HERRAMIENTA_${id.siglas}.xlsx`);
    } else if (tipo == "RP") {
      link.setAttribute("download", `HERRAMIENTA_RP_${id.siglas}.xlsx`);
    } else {
      link.setAttribute("download", `HERRAMIENTA_${id.siglas}.zip`);
    }
    document.body.appendChild(link);
    link.click();
  }

  $q.loading.hide();
};

//-----------------------------------------------------------------
</script>

<style scoped>
.card_box:hover {
  transform: scale(0.9);
  box-shadow: 0px 0px 20px 1px #dd75c73f;
  border: 1px solid rgba(232, 213, 233, 0.454);
}
</style>
