<template>
  <div class="d-flex flex-center wrap q-mt-sm wrapper-gauges">
    <q-btn
      push
      v-for="({ title, counter, icon }, i) in gauges"
      :key="i"
      class="no-pointer-events gauges-btn"
    >
      <div class="row text-center gaugesBox">
        <div class="col-6 self-center gauge-counter">
          {{ counter }}
        </div>
        <div class="col-6">
          <q-icon :name="icon" size="md" />
        </div>
        <div
          class="col-12 text-subtitle1 text-left q-pl-sm q-pt-sm gauges-title"
        >
          {{ title }}
        </div>
      </div>
    </q-btn>
  </div>
</template>

<script setup>
const squadStore = useSquadStore();
const { characters, squad } = storeToRefs(squadStore);

const gauges = ref([]);

watchEffect(() => {
  gauges.value = [
    {
      title: "Players",
      counter: Object.keys(characters.value).length,
      icon: "assistant",
    },
    {
      title: "Grupos",
      counter: Object.keys(squad.value).length,
      icon: "groups_3",
    },
  ];
});
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Slackey&display=swap");

.wrapper-gauges {
  width: 450px;
  gap: 10px;
  font-family: "Slackey", cursive;
  -webkit-text-stroke: 0.4px rgba(36, 48, 132, 0.4);
  color: #fff;

  .gauges-btn {
    text-shadow: $shadowText;
    width: 143px;
    padding: 11px 40px;
  }
  .gauge-counter {
    font-size: 38px;
  }
  .gauges-title {
    text-shadow: none;
    color: rgba(0, 0, 0, 0.5);
    font-weight: bolder;
  }
}
</style>
