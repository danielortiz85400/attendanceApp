<template>
  <div class="d-flex justify-center q-mt-sm">
    <div class="container-search">
      <div class="search">
        <input
          type="text"
          @blur="ctrTypeFilter = ''"
          placeholder="Buscar"
          v-model.trim="ctrTypeFilter"
        />
        <div class="symbol">
          <svg class="cloud">
            <use xlink:href="#cloud" />
          </svg>
          <svg class="lens">
            <use xlink:href="#lens" />
          </svg>
        </div>
        <q-tooltip>Filtro (nick o clase) </q-tooltip>
      </div>
    </div>
  </div>

  <svg xmlns="http://www.w3.org/2000/svg" style="display: none">
    <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" id="cloud">
      <path
        d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z"
      />
    </symbol>
    <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="lens">
      <path
        d="M15.656,13.692l-3.257-3.229c2.087-3.079,1.261-7.252-1.845-9.321c-3.106-2.068-7.315-1.25-9.402,1.83
	s-1.261,7.252,1.845,9.32c1.123,0.748,2.446,1.146,3.799,1.142c1.273-0.016,2.515-0.39,3.583-1.076l3.257,3.229
	c0.531,0.541,1.404,0.553,1.95,0.025c0.009-0.008,0.018-0.017,0.026-0.025C16.112,15.059,16.131,14.242,15.656,13.692z M2.845,6.631
	c0.023-2.188,1.832-3.942,4.039-3.918c2.206,0.024,3.976,1.816,3.951,4.004c-0.023,2.171-1.805,3.918-3.995,3.918
	C4.622,10.623,2.833,8.831,2.845,6.631L2.845,6.631z"
      />
    </symbol>
  </svg>

  <div>
    <slot name="layout" :ctrFilter="ctrFilter"></slot>
  </div>
</template>

<script setup>
const squadStore = useSquadStore();
const { characters } = storeToRefs(squadStore);

const ctrTypeFilter = ref("");

const ctrFilter = computed(() => {
  const filterValue = ctrTypeFilter.value.toLowerCase();
  return filterValue
    ? characters.value.filter(({ ctr, nick }) =>
        [ctr, nick].some((prop) =>
          prop.toString().toLowerCase().includes(filterValue)
        )
      )
    : characters.value;
});
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Slackey&display=swap");

.container-search {
  width: 50%;
  background: transparent;
  font: 400 16px "Varela Round", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.search {
  --background: #ffffff;
  --text-color: #414856;
  --primary-color: rgb(63, 80, 180);
  --border-radius: 12px;
  --width: 130px; //193
  --height: 50px;
  background: var(--background);
  width: auto; //40
  height: var(--height);
  position: relative;
  overflow: hidden;
  border: 2px solid #fff;
  padding: 1px;
  border-radius: var(--border-radius);
  box-shadow: $shadowInputs;
  display: flex;
  justify-content: center;
  align-items: center;

  input[type="text"] {
    position: relative;
    width: var(--height);
    height: var(--height);
    font: 400 16px "Varela Round", sans-serif;
    color: var(--text-color);
    border: 0;
    box-sizing: border-box;
    outline: none;
    padding: 0 0 0 40px;
    transition: width 0.6s ease;
    z-index: 10;
    opacity: 0;
    cursor: pointer;

    &:focus {
      z-index: 0;
      opacity: 1;
      width: var(--width);
      ~ .symbol {
        &::before {
          width: 0%;
        }
        &:after {
          clip-path: inset(0% 0% 0% 100%);
          transition: clip-path 0.04s linear 0.105s;
        }

        .cloud {
          top: -30px;
          left: -30px;
          transform: translate(0, 0);
          transition: all 0.6s ease;
        }
        .lens {
          top: 20px;
          left: 15px;
          transform: translate(0, 0);
          fill: var(--primary-color);
          transition: top 0.5s ease 0.1s, left 0.5s ease 0.1s, fill 0.3s ease;
        }
      }
    }
  }
  .symbol {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    &:before {
      content: "";
      position: absolute;
      right: 0;
      width: 100%;
      height: 100%;
      background: var(--primary-color);
      z-index: -1;
      transition: width 0.6s ease;
    }
    &:after {
      content: "";
      position: absolute;
      top: 21px;
      left: 21px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: var(--primary-color);
      z-index: 1;
      clip-path: inset(0% 0% 0% 0%);
      transition: clip-path 0.04s linear 0.225s;
    }
    .cloud,
    .lens {
      position: absolute;
      fill: #fff;
      stroke: none;
      top: 50%;
      left: 50%;
    }
    .cloud {
      top: 40px; //add
      width: 40px; //35
      height: 52px; //32
      transform: translate(-50%, -60%);
      transition: all 0.6s ease;
    }
    .lens {
      fill: #fff;
      width: 16px;
      height: 16px;
      z-index: 2;
      top: 24px;
      left: 24px;
      transition: top 0.3s ease, left 0.3s ease, fill 0.2s ease 0.2s;
    }
  }
}
</style>
