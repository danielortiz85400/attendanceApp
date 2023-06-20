<template>
  <q-card
    v-for="(
      { nick, name, ctr, phone, name_server, attendance }, i
    ) in allPlayers"
    :key="i"
    class="text-left q-ma-xs"
    style="max-width: 350px"
  >
    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label class="text-weight-bold"
            ><q-chip square outline class="bg-indigo-5 text-white glossy"
              >{{ nick }}
            </q-chip>
          </q-item-label>
          <q-item-label caption class="text-capitalize"
            >Nombre: {{ name }}</q-item-label
          >
          <q-item-label caption>Clase: {{ ctr }}</q-item-label>
          <q-item-label caption>Cel: {{ phone }}</q-item-label>
          <q-item-label caption>Server: {{ name_server }}</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label class="card-list__number">{{ i + 1 }}</q-item-label>

          <q-icon
            name="assistant"
            :color="attendance === 1 ? 'light-green-13' : 'red'"
            class="q-mt-sm"
          >
            <q-tooltip anchor="bottom middle" self="top middle">
              {{ attendance === 1 ? "Confirmado" : "Sin confirmar" }}
            </q-tooltip></q-icon
          >
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script setup>
const players = usePlayers();
const { allPlayers } = storeToRefs(players);
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Slackey&display=swap");

.card-list__number {
  @include titleAuth-style;
  font-size: 2.2em;
  font-family: "Slackey";
}
</style>
