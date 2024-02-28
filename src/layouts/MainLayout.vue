<template>
  <q-layout view="lHh LpR lff">
    <q-header elevated class="bg-pink-1">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Registro de candidaturas locales </q-toolbar-title>
        <q-btn flat round dense icon="apps" @click="show" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item
          clickable
          v-ripple
          class="text-grey-8"
          :to="{ name: 'inicio' }"
          active-class="text-pink-ieen-1"
        >
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>

          <q-item-section> Inicio </q-item-section>
        </q-item>
        <q-item
          v-if="CatalogosConList.some((element) => element == 'SRC-REG-CL')"
          clickable
          v-ripple
          class="text-grey-8"
          :to="{ name: 'registro' }"
          active-class="text-pink-ieen-1"
        >
          <q-item-section avatar>
            <q-icon name="groups" />
          </q-item-section>

          <q-item-section> Registro de candidaturas </q-item-section>
        </q-item>
        <q-item
          v-if="CatalogosConList.some((element) => element == 'SRC-HIS-SU')"
          clickable
          v-ripple
          class="text-grey-8"
          :to="{ name: 'historial_sustituciones' }"
          active-class="text-pink-ieen-1"
        >
          <q-item-section avatar>
            <q-icon name="sync_alt" />
          </q-item-section>

          <q-item-section> Historial de sustituciones </q-item-section>
        </q-item>
        <q-item
          v-if="CatalogosConList.some((element) => element == 'SRC-HIS-AP')"
          clickable
          v-ripple
          class="text-grey-8"
          :to="{ name: 'aprobacion_candidaturas' }"
          active-class="text-pink-ieen-1"
        >
          <q-item-section avatar>
            <q-icon name="gavel" />
          </q-item-section>

          <q-item-section> Historial de aprobaciones </q-item-section>
        </q-item>
        <q-item
          v-if="CatalogosConList.some((element) => element == 'SRC-DOC-GEN')"
          clickable
          v-ripple
          class="text-grey-8"
          :to="{ name: 'genero' }"
          active-class="text-pink-ieen-1"
        >
          <q-item-section avatar>
            <q-icon name="wc" />
          </q-item-section>

          <q-item-section> Género </q-item-section>
        </q-item>
        <q-item
          v-if="CatalogosConList.some((element) => element == 'SRC-ACU-CU')"
          clickable
          v-ripple
          class="text-grey-8"
          :to="{ name: 'acuses' }"
          active-class="text-pink-ieen-1"
        >
          <q-item-section avatar>
            <q-icon name="upload_file" />
          </q-item-section>

          <q-item-section> Acuses </q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          class="text-grey-8"
          :to="{ name: 'observaciones' }"
          active-class="text-pink-ieen-1"
        >
          <q-item-section avatar>
            <q-icon name="pending_actions" />
          </q-item-section>

          <q-item-section> Observaciones </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-pink-1 text-white">
      <q-card class="no-shadow bg-pink-1 text-white" bordered>
        <q-card-section class="row">
          <span class="text-body1 text-weight-bold">
            © Unidad Técnica de Informática y Estadística
          </span>
        </q-card-section>
      </q-card>
    </q-footer>
  </q-layout>
</template>

<script>
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";
import { useAuthStore } from "src/stores/auth-store";
import { defineComponent, onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "MainLayout",
  storage: Storage | undefined,
  components: {},

  setup() {
    const leftDrawerOpen = ref(false);
    const $q = useQuasar();
    const route = useRoute();
    const authStore = useAuthStore();
    const usuario = ref("");
    const { modulos, sistemas, apps } = storeToRefs(authStore);
    const CatalogosConList = ref([]);
    const ConsumiblesList = ref([]);
    const SolicitudesList = ref([]);

    onBeforeMount(async () => {
      if (route.query.key) {
        localStorage.setItem("key", route.query.key);
      }

      if (route.query.sistema) {
        localStorage.setItem("sistema", route.query.sistema);
      }

      if (route.query.usr) {
        localStorage.setItem("usuario", route.query.usr);
        usuario.value = localStorage.getItem("usuario");
      } else {
        if (localStorage.getItem("usuario") != null) {
          usuario.value = localStorage.getItem("usuario");
        }
      }
      await loadMenu();
    });

    const show = () => {
      $q.bottomSheet({
        message: "Aplicaciones",
        grid: true,
        actions: apps.value,
      }).onOk((action) => {
        if (action.label == "Cerrar sesión") {
          localStorage.clear();
          window.location = "http://sistema.ieenayarit.org:9371?return=false";
        } else if (action.label == "Ir a universo") {
          window.location = "http://sistema.ieenayarit.org:9370?return=true";
        } else {
          window.location =
            action.url +
            `/#/?key=${localStorage.getItem("key")}&sistema=${
              action.id
            }&usr=${localStorage.getItem("usuario")}`;
        }
      });
    };

    const loadMenu = async () => {
      $q.loading.show();
      await authStore.loadSistemas();
      await authStore.loadModulos();
      await authStore.loadPerfil();
      modulos.value.forEach((element) => {
        switch (element.siglas_Modulo) {
          case "SRC-REG-CL":
            CatalogosConList.value.push("SRC-REG-CL");
            break;
          case "SRC-HIS-SU":
            CatalogosConList.value.push("SRC-HIS-SU");
            break;
          case "SRC-HIS-AP":
            CatalogosConList.value.push("SRC-HIS-AP");
            break;
          case "SRC-DOC-GEN":
            CatalogosConList.value.push("SRC-DOC-GEN");
            break;
          case "SRC-ACU-CU":
            CatalogosConList.value.push("SRC-ACU-CU");
            break;
        }
      });
      $q.loading.hide();
    };

    return {
      leftDrawerOpen,
      CatalogosConList,
      ConsumiblesList,
      SolicitudesList,
      usuario,
      show,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>

<style scope>
.bg-pink-1 {
  background: #d1308a !important;
}
.text-pink-ieen-1 {
  color: #d1308a !important;
}
</style>
