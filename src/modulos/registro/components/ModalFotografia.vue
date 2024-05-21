<template>
  <q-dialog
    v-model="modalFotografia"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card style="width: 700px; max-width: auto">
      <q-card-section class="row">
        <div class="text-h6">Fotografía</div>
        <q-space />
        <q-btn
          icon="close"
          @click="actualizarModal(false)"
          flat
          round
          dense
          v-close-popup
        />
        <div class="text-red text-subtitle2">
          En este apartado podrá actualizar la fotografía de la candidatura
          seleccionada.
        </div>
      </q-card-section>
      <q-card-section class="row">
        <div class="col-10">
          <q-file
            filled
            bottom-slots
            v-model="fotografia"
            label="Actualizar fotografía"
            accept=".jpg, image/*"
            max-file-size="10485760"
            @rejected="onRejected"
          >
            <template v-slot:prepend>
              <q-icon name="cloud_upload" @click.stop.prevent />
            </template>
            <template v-slot:append>
              <q-icon
                name="close"
                @click.stop.prevent="fotografia = null"
                class="cursor-pointer"
              />
            </template>

            <template v-slot:hint>Subir fotografía</template>
          </q-file>
        </div>
        <div class="col-2">
          <q-btn
            @click="actualizarFoto"
            color="secondary"
            icon="save"
            label="Guardar"
          />
        </div>
        <br />
        <div v-if="props.foto != ''" class="col-12 justify-end">
          <q-img :src="props.foto"> </q-img>
        </div>
        <div class="text-red text-center text-bold" v-else>
          No ha subido su fotografía.
        </div>
        <div
          class="text-center q-pa-md"
          v-if="perfil == 'Super Administrador' && props.foto != ''"
        >
          <q-btn
            @click="eliminarFotografia()"
            label="Eliminar fotografía"
            color="red"
            icon="delete"
          ></q-btn>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useQuasar, QSpinnerCube } from "quasar";
import { useCandidatosStore } from "src/stores/candidatos-store";
import { defineProps, ref } from "vue";

//-----------------------------------------------------------------

const $q = useQuasar();
const candidatosStore = useCandidatosStore();
const { modalFotografia } = storeToRefs(candidatosStore);
const props = defineProps({
  foto: { type: String, required: true },
  id: { type: String, required: true },
  puesto: { type: Number, required: true },
});
const perfil = localStorage.getItem("perfil_Letra");
const fotografia = ref(null);

//-----------------------------------------------------------------
const onRejected = () => {
  $q.notify({
    type: "negative",
    message: "El tamaño de la imagen excede el limite",
  });
};

const actualizarFoto = async () => {
  let fotoFormData = new FormData();
  fotoFormData.append("Foto", fotografia.value);
  $q.dialog({
    title: "Actualizar fotografía",
    message: "¿Está seguro de actualizar la fotografía?",
    icon: "Warning",
    persistent: true,
    transitionShow: "scale",
    transitionHide: "scale",
    ok: {
      color: "positive",
      label: "¡Sí!, actualizar",
    },
    cancel: {
      color: "negative",
      label: " No, Cancelar",
    },
  }).onOk(async () => {
    $q.loading.show();
    let resp = await candidatosStore.actualizarFotografia(
      fotoFormData,
      props.id,
      props.puesto
    );
    if (resp.success) {
      $q.notify({
        position: "top-right",
        type: "positive",
        message: resp.data,
      });
      actualizarModal(false);
      candidatosStore.actualizarTabla(true);
      await candidatosStore.loadCandidato(props.id);
      $q.loading.hide();
    } else {
      $q.notify({
        position: "top-right",
        type: "negative",
        message: resp.data,
      });
      $q.loading.hide();
    }
  });
};

const actualizarModal = (valor) => {
  fotografia.value = null;
  candidatosStore.actualizarModalFoto(valor);
};

const eliminarFotografia = async () => {
  $q.dialog({
    title: "Eliminar fotografía",
    message: "¿Está seguro de eliminar fotografía?",
    icon: "Warning",
    persistent: true,
    transitionShow: "scale",
    transitionHide: "scale",
    ok: {
      color: "positive",
      label: "¡Sí!, eliminar",
    },
    cancel: {
      color: "negative",
      label: " No, Cancelar",
    },
  }).onOk(async () => {
    $q.loading.show();
    let resp = await candidatosStore.deleteFoto(props.id, props.puesto);
    if (resp.success) {
      $q.notify({
        position: "top-right",
        type: "positive",
        message: resp.data,
      });
      candidatosStore.actualizarTabla(true);
      await candidatosStore.loadCandidato(props.id);
      actualizarModal(false);
      $q.loading.hide();
    } else {
      $q.notify({
        position: "top-right",
        type: "negative",
        message: resp.data,
      });
      $q.loading.hide();
    }
  });

  $q.loading.hide();
};

//-----------------------------------------------------------------
</script>
