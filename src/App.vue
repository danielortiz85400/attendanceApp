<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade" mode="out-in">
      <component :is="Component" :key="route.path" />
    </transition>
  </router-view>
</template>

<script setup>
const store = useAuth();
const router = useRouter();
const { jwtRefresh } = store;
const { authUser } = storeToRefs(store);

onMounted(async () => {
  await jwtRefresh();
});

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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
