<template>
  <div class="q-pa-md">
    <q-table :rows="rows" :columns="columns" row-key="name">
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
    </q-table>
  </div>
</template>

<script setup></script>

<style></style>
