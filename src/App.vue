<template>
  <div v-if="loaded">
    <router-view v-slot="{ Component, route }">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </div>
  <loader-app v-else />
</template>

<script setup>
import { Loading } from "quasar";

const store = useAuth();
const router = useRouter();
const { jwtRefresh } = store;
const { authUser } = storeToRefs(store);

let loaded = ref(false);

jwtRefresh();

(async () => {
  await new Promise((r) => setTimeout(r, 1000));
  loaded.value = true;
  Loading.hide();
})();

//Cierre de sesión luego de 12 horas.
watchEffect(() => {
  if (Object.keys(authUser.value)?.length) {
    setTimeout(() => {
      router.push({ path: "/" });
    }, authUser.value?.jwt?.expiresIn - 37000);
  }
});
</script>
<style lang="scss">
.q-dialog__backdrop {
  background: #fff;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
//Estilos globales
.login-card {
  @include authCard-style;
  position: relative;
  z-index: 1;
}
.login-card__title {
  @include titleAuth-style;
  left: 0;
  right: 0;
  margin: auto;
  margin-top: -80px;
  font-size: 5em;
  z-index: -1;
}

.forms-card__input {
  box-shadow: $shadowInputs;
}

.login-card__btn {
  @include btnAuth-style;
}
.input-icon {
  border: 4px solid rgba(245, 240, 240, 0.973);
}

/**Corrige pading en q-stepper: <componentes:> (PlayerSignup) */
.q-stepper--horizontal .q-stepper__step-inner {
  padding: 0px 20px 20px 20px !important;
}
/**Corrige el padding al existor error en los inputs */
.q-field--with-bottom {
  padding-bottom: 0px;
}
/** Corrige sweet alert en diálogos */
.swal2-container {
  z-index: 60000 !important;
}
</style>
