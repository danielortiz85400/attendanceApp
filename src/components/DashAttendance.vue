<template>
  <!--ATTENDENCE-->
  <v-card width="300" height="90vh" class="ma-2" style="border-radius: 12px">
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <!-- V-IF: Carga de componente --created-- -->
      <v-layout v-if="characters?.length">
        <v-app-bar
          color="teal-darken-4"
          image="./src/assets/backConfirmed.png"
          density="prominent"
          style="position: absolute"
          rounded
          class="elevation-8"
        >
          <template v-slot:image>
            <v-img
              gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
            ></v-img>
          </template>

          <v-app-bar-title>
            <div class="d-flex justify-center">
              <q-chip
                outline
                color="teal-4"
                class="glossy shadow-4 no-pointer-events q-pa-md text-white card_chip-text"
              >
                Lobby
              </q-chip>
            </div></v-app-bar-title
          >
        </v-app-bar>

        <v-main>
          <div class="d-flex justify-center q-mt-sm">
            <div class="container-search">
              <div class="search">
                <input
                  type="text"
                  @blur="ctrTypeFilter = ''"
                  placeholder="Buscar"
                  v-model="ctrTypeFilter"
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
            <symbol
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 35 35"
              id="cloud"
            >
              <path
                d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z"
              />
            </symbol>
            <symbol
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              id="lens"
            >
              <path
                d="M15.656,13.692l-3.257-3.229c2.087-3.079,1.261-7.252-1.845-9.321c-3.106-2.068-7.315-1.25-9.402,1.83
	s-1.261,7.252,1.845,9.32c1.123,0.748,2.446,1.146,3.799,1.142c1.273-0.016,2.515-0.39,3.583-1.076l3.257,3.229
	c0.531,0.541,1.404,0.553,1.95,0.025c0.009-0.008,0.018-0.017,0.026-0.025C16.112,15.059,16.131,14.242,15.656,13.692z M2.845,6.631
	c0.023-2.188,1.832-3.942,4.039-3.918c2.206,0.024,3.976,1.816,3.951,4.004c-0.023,2.171-1.805,3.918-3.995,3.918
	C4.622,10.623,2.833,8.831,2.845,6.631L2.845,6.631z"
              />
            </symbol>
          </svg>

          <v-item-group v-model="ctrChoise" multiple>
            <!-- V-IF: Caso de filtrar u no encontrar jugador -->
            <q-layout
              container
              class="bg-grey-ligthen-1 card-group__shadow q-ml-md"
              style="height: 60vh; border-radius: 12px"
              v-if="ctrFilter?.length"
            >
              <div
                v-for="(ctr, i) in ctrFilter"
                :key="i"
                style="height: 110px"
                class="q-pl-md"
              >
                <v-fade-transition>
                  <v-timeline
                    align-top
                    density="compact"
                    line-color="rgba(224,224,224,1)"
                  >
                    <v-timeline-item
                      fill-dot
                      dot-color="white"
                      density="compact"
                      size="small"
                    >
                      <template #icon>
                        <q-chip
                          :label="i + 1"
                          class="glossy shadow-2 no-pointer-events"
                          color="indigo-5"
                          text-color="white"
                          size="sm"
                        >
                        </q-chip>
                      </template>
                      <v-item v-slot="{ isSelected }" :value="ctr">
                        <q-intersection transition="scale" style="height: 65px">
                          <q-btn
                            push
                            padding="2px"
                            :disabled="ctrChoise.length === 5"
                          >
                            <v-card
                              class="text-grey-8 no-box-shadow"
                              :title="ctr.nick"
                              :subtitle="ctr.ctr"
                              :color="isSelected ? 'indigo-1' : ''"
                              width="11em"
                              height="5em"
                              @click="ctrSelect(ctr)"
                            ></v-card>
                            <q-badge color="transparent" transparent floating>
                              <q-btn
                                round
                                glossy
                                size="xs"
                                :icon="
                                  isSelected
                                    ? 'check_circle'
                                    : 'update_disabled'
                                "
                                :color="isSelected ? 'teal-3' : 'grey'"
                              >
                                <q-tooltip class="bg-grey-6" :offset="[10, 10]">
                                  {{ isSelected ? "En lista" : "En espera" }}
                                </q-tooltip></q-btn
                              ></q-badge
                            >
                          </q-btn>
                        </q-intersection>
                      </v-item>
                    </v-timeline-item>
                  </v-timeline>
                </v-fade-transition>
              </div>

              <q-page-scroller
                position="bottom-right"
                :scroll-offset="150"
                :offset="[18, 18]"
              >
                <q-btn fab icon="keyboard_arrow_up" glossy color="indigo-6" />
              </q-page-scroller>
            </q-layout>
            <div v-else class="flex flex-center" style="height: 60vh">
              <transition
                appear
                enter-active-class="animated fadeIn"
                leave-active-class="animated fadeOut"
              >
                <div class="flex flex-center">
                  <div>
                    <q-btn
                      :ripple="false"
                      push
                      color="light-blue-4"
                      icon="data_info_alert"
                      >Sin resultados</q-btn
                    >
                  </div>
                  <q-item v-for="i in 4" :key="i">
                    <q-item-section avatar>
                      <q-skeleton type="QAvatar" width="30px" height="30px" />
                    </q-item-section>

                    <q-item-section>
                      <q-skeleton width="10em" height="80px" />
                    </q-item-section>
                  </q-item>
                </div>
              </transition>
            </div>
          </v-item-group>
        </v-main>
      </v-layout>
      <AttendenceSkeleton v-else />
    </transition>
    <q-card-actions align="center">
      <q-btn :ripple="false" size="sm" push color="indigo-7" icon="group_add"
        ><q-badge
          :color="ctrChoise.length === 5 ? 'red-5' : 'teal-3'"
          rounded
          transparent
          floating
          class="glossy text-bold"
        >
          {{ ctrChoise.length }} </q-badge
        ><q-tooltip class="bg-grey-6" :offset="[10, 10]">
          Contador de lista
        </q-tooltip></q-btn
      >
      <q-btn
        size="sm"
        push
        color="indigo-7"
        icon="clear_all"
        @click="ctrChoise = []"
        ><q-tooltip class="bg-grey-6" :offset="[10, 10]">
          Limpiar lista
        </q-tooltip></q-btn
      >
    </q-card-actions>
  </v-card>
</template>

<script setup>
import groupsConfig from "@/components/DashSquads.config.vue";
import AttendenceSkeleton from "@/components/sekeltons/DashAttendence.skeleton.vue";
const squadStore = useSquadStore();
const { characters } = storeToRefs(squadStore);
const { createSquad } = squadStore;

const $q = useQuasar();

const ctrChoise = ref([]);
let squadOptions = ref({});
const ctrTypeFilter = ref("");

watch(
  () => ctrChoise.value.length,
  (length) => {
    if (length > 5) {
      ctrChoise.value.pop();
      $q.notify({
        progress: true,
        message: "Máximo: 5 personajes",
        icon: "notification_important",
      });
    } else if (length === 5) {
      //NAMES CHARACTERS
      const ctrToBeLeaders = ctrChoise.value.map(({ nick }) => ({
        label: nick,
        value: nick,
      }));
      $q.dialog({
        component: groupsConfig,
        componentProps: {
          ctrToBeLeaders,
          squadOptions,
        },
      })
        .onOk(() => {
          const players = [...ctrChoise.value, squadOptions.value]
            .filter((x) => x.id !== undefined)
            .map(({ id_signup_player, nick }) => ({
              id_signup_player,
              nick,
            }));
          createSquad({ players, ...squadOptions.value });

          ctrChoise.value = [];
        })
        .onCancel(() => (ctrChoise.value = []));
    }
  }
);

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

const ctrSelect = (ctr) => {
  ctrChoise.value = ctrChoise.value.includes(ctr)
    ? ctrChoise.value.filter((x) => x !== ctr)
    : [...ctrChoise.value, ctr];
};
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

.card_chip-text {
  @include titleAuth-style;
  font-size: 1em;
  text-transform: capitalize;
  font-family: "Slackey", cursive;
}
.card-group__shadow {
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072);
}
</style>
