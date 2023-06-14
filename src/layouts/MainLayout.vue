<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title></q-toolbar-title>
        <q-btn-dropdown
          v-if="showBtnDash"
          color="gray-2"
          dropdown-icon="none"
          size="xs"
          persistent
        >
          <template #label>
            <q-btn
              dense
              color="indigo-2"
              round
              icon="notifications_active"
              class="q-ml-md"
            >
              <q-badge color="green-13" floating>{{
                attNotify.length
              }}</q-badge>
            </q-btn></template
          >

          <q-list separator style="height: 400px; overflow: hidden">
            <div class="dropdown-title q-pa-lg">Notify</div>
            <q-separator spaced />
            <q-scroll-area style="height: 250px; width: 300px">
              <q-item
                v-for="ctr in attNotify"
                :key="ctr.id"
                tag="label"
                v-ripple
              >
                <q-item-section class="q-ma-sm">
                  <q-item-label class="text-weight-medium"
                    ><q-chip
                      outline
                      class="shadow-1 bg-grey-2"
                      color="green-13"
                      >{{ ctr.nick }}</q-chip
                    ></q-item-label
                  >
                  <q-item-label caption>Clase: {{ ctr.ctr }}</q-item-label>
                  <q-item-label caption
                    >Confirmación de asistencia</q-item-label
                  >
                </q-item-section>
                <q-item-section side top>
                  <q-item-label caption>5 min ago</q-item-label>
                  <q-checkbox v-model="removeNotification" :val="ctr" />
                </q-item-section>
              </q-item>
            </q-scroll-area>
            <q-separator spaced />
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
      <transition name="fade" mode="out-in">
        <q-footer v-if="showFooter" bordered class="bg-white text-primary">
          <q-toolbar>
            <q-page-sticky position="bottom" :offset="[0, -28]">
              <q-fab
                glossy
                icon="admin_panel_settings"
                direction="up"
                color="indigo-9"
                class="shadow-6"
              >
                <q-fab-action
                  v-if="changeOfRoutes"
                  glossy
                  color="indigo-6"
                  icon="home"
                  label="Home"
                  external-label
                  label-class="bg-grey-3 text-grey-8"
                  label-position="right"
                  :to="{ path: '/user' }"
                />
                <q-fab-action
                  glossy
                  v-else
                  v-show="showBtnDash"
                  color="indigo-6"
                  icon="admin_panel_settings"
                  label="Dash"
                  external-label
                  label-class="bg-grey-3 text-grey-8"
                  label-position="right"
                  :to="{ path: '/dash' }"
                />
                <q-fab-action
                  color="indigo-6"
                  glossy
                  icon="exit_to_app"
                  label="Salir"
                  external-label
                  label-class="bg-grey-3 text-grey-8"
                  label-position="right"
                  @click="logOut"
                />
              </q-fab>
            </q-page-sticky>
          </q-toolbar>
        </q-footer>
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script setup>
const store = useAuth();
const playerStore = usePlayers();
const router = useRoute();

const { authUser } = storeToRefs(store);
const { attNotify } = storeToRefs(playerStore);

const { logOut } = store;

const removeNotification = ref([]);

const showFooter = computed(() => Object.keys(authUser.value)?.length);
const changeOfRoutes = computed(() => router.path === "/dash");
const showBtnDash = computed(() =>
  ["ADMINISTRADOR", "MODERADOR"].includes(authUser.value?.user?.user_role)
);
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Slackey&display=swap");

.dropdown-title {
  @include titleAuth-style;
  font-size: 27px;
  text-transform: capitalize;
  font-family: "Slackey", cursive;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
