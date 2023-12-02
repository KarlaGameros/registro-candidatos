<template>
  <q-card>
    <q-card-section>
      <div class="text-subtitle2">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere,
        perspiciatis aspernatur eum temporibus quo perferendis corporis illum
        facilis. Quibusdam sint unde eum aliquid soluta non earum voluptatem
        dolor provident quidem!
      </div>
      <br />
      <div class="row">
        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pr-xs">
          <q-file
            color="pink"
            outlined
            label-color="grey"
            v-model="actaNacimiento"
            label="Acta de nacimiento"
          >
            <template v-slot:append>
              <q-icon name="attachment" color="pink" />
            </template>
          </q-file>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pr-xs">
          <q-file
            color="pink"
            outlined
            label-color="grey"
            v-model="actaNacimiento"
            label="CURP"
          >
            <template v-slot:append>
              <q-icon name="attachment" color="pink" />
            </template>
          </q-file>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pr-xs">
          <q-file
            color="pink"
            outlined
            label-color="grey"
            v-model="actaNacimiento"
            label="Clave de elector"
          >
            <template v-slot:append>
              <q-icon name="attachment" color="pink" />
            </template>
          </q-file>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pr-xs">
          <q-file
            color="pink"
            outlined
            label-color="grey"
            v-model="actaNacimiento"
            label="RFC"
          >
            <template v-slot:append>
              <q-icon name="attachment" color="pink" />
            </template>
          </q-file>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from "vue";

const actaNacimiento = ref(null);
</script>

<style></style>
