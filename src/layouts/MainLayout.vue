<template>
  <q-layout view="lHh Lpr lFf">
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
import DashMenu from "../components/DashMenu.vue";

const store = useAuth();
const router = useRoute();

const { authUser } = storeToRefs(store);
const { logOut } = store;

const showFooter = computed(() => Object.keys(authUser.value)?.length);
const changeOfRoutes = computed(() => router.path === "/dash");
const showBtnDash = computed(() =>
  ["ADMINISTRADOR", "MODERADOR"].includes(authUser.value?.user?.user_role)
);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
