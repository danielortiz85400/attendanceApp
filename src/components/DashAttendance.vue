<template>
  <!--ATTENDENCE-->
  <v-card width="300" height="87vh" class="ma-2" style="border-radius: 12px">
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <!-- V-IF y ELSE: Carga de componente --created-- -->
      <AppBar
        v-if="characters?.length"
        :image="'./src/assets/backConfirmed.png'"
        :density="'prominent'"
        :showCancelBttn="false"
      >
        <template #title
          ><div class="column items-center">
            <q-chip
              outline
              color="teal-4"
              class="glossy shadow-4 no-pointer-events q-pa-md text-white card-chip__text"
            >
              Lobby
            </q-chip>
            <div class="flex q-mt-sm">
              <q-btn
                :ripple="false"
                size="sm"
                icon="group_add"
                outline
                color="indigo-1"
                round
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
                class="q-ml-md q-px-sm"
                size="sm"
                icon="delete_sweep"
                outline
                color="indigo-1"
                round
                @click="ctrChoise = []"
                ><q-tooltip class="bg-grey-6" :offset="[10, 10]">
                  Limpiar lista
                </q-tooltip></q-btn
              >
            </div>
          </div></template
        >
        <template #mainContent>
          <SearchEngine>
            <template #layout="{ ctrFilter }">
              <v-item-group v-model="ctrChoise" multiple>
                <!-- V-IF Y ELSE: En Caso de filtrar y no encontrar un jugador -->
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
                            <q-intersection
                              transition="scale"
                              style="height: 65px"
                            >
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
                                <q-badge
                                  color="transparent"
                                  transparent
                                  floating
                                >
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
                                    <q-tooltip
                                      class="bg-grey-6"
                                      :offset="[10, 10]"
                                    >
                                      {{
                                        isSelected ? "En lista" : "En espera"
                                      }}
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
                    <q-btn
                      fab
                      icon="keyboard_arrow_up"
                      glossy
                      color="indigo-6"
                    />
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
                          <q-skeleton
                            type="QAvatar"
                            width="30px"
                            height="30px"
                          />
                        </q-item-section>

                        <q-item-section>
                          <q-skeleton width="10em" height="80px" />
                        </q-item-section>
                      </q-item>
                    </div>
                  </transition>
                </div>
              </v-item-group>
            </template>
          </SearchEngine>
        </template>
      </AppBar>
      <AttendenceSkeleton v-else />
    </transition>
  </v-card>
</template>

<script setup>
import AttendenceSkeleton from "@/components/sekeltons/DashAttendence.skeleton.vue";
import GroupsConfig from "@/components/DashSquads.config.vue";
import SearchEngine from "@/components/SearchEngine.vue";
import AppBar from "@/slotComponents/AppBar.vue";

const squadStore = useSquadStore();
const { characters } = storeToRefs(squadStore);
const { createSquad } = squadStore;

const $q = useQuasar();

const ctrChoise = ref([]);
let squadOptions = ref({});

watch(
  () => ctrChoise.value.length,
  (length) => {
    if (length > 5) {
      //Validación
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
        component: GroupsConfig,
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

const ctrSelect = (ctr) => {
  ctrChoise.value = ctrChoise.value.includes(ctr)
    ? ctrChoise.value.filter((x) => x !== ctr)
    : [...ctrChoise.value, ctr];
};
</script>

<style scoped lang="scss">
.card-chip__text {
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
