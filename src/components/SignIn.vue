<template>
  <q-page class="flex flex-center">
    <q-card class="login-card">
      <div class="login-card__title absolute-top no-pointer-events">
        Sign in
      </div>
      <q-form @submit="login(user)" class="q-gutter-lg q-pa-lg q-pt-xl">
        <q-input
          v-model="user.email"
          label="E-mail"
          borderless
          dense
          no-error-icon
          style="border-radius: 15px"
          class="q-mt-lg shadow-3 forms-card__input"
          :rules="[
            $rules.required('E-mail requerido'),
            $rules.email('E-mail inválido'),
          ]"
        >
          <template v-slot:prepend>
            <q-btn
              class="q-mb-xs q-mx-xs shadow-4 input-icon"
              glossy
              round
              color="indigo-9"
              size="12px"
              icon="email"
            />
          </template>
        </q-input>

        <q-input
          v-model="user.password"
          :type="isPwd ? 'password' : 'text'"
          label="Contraseña"
          borderless
          dense
          no-error-icon
          style="border-radius: 15px"
          class="shadow-3 forms-card__input"
          :rules="[$rules.required('Contraseña requerida')]"
        >
          <template v-slot:prepend>
            <q-btn
              class="q-mb-xs q-mx-xs shadow-4 input-icon"
              glossy
              round
              color="indigo-9"
              size="12px"
              icon="key"
            />
          </template>
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer q-pr-sm"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <q-card-actions class="row justify-center">
          <q-btn type="submit" class="login-card__btn shadow-7">LOGIN</q-btn>
        </q-card-actions>
      </q-form>
      <q-separator />
      <q-card-actions class="row justify-center">
        <q-btn
          @click="showDialog"
          flat
          class="text-capitalize"
          color="primary"
          label="Forgot your password?" />
        <br /><br
      /></q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import RecoverPassword from "@/components/RecoverPassword.vue";
import { url } from "../helpers/EndPoints";

const { dialog } = useQuasar();
const { login } = useAuth();

const showDialog = () => {
  dialog({
    component: RecoverPassword,
  });
};

const isPwd = ref(true);
const user = reactive({
  email: "daniel@gmail.com",
  password: "D@ni3lortiz",
});

(async () => {
  useAuth().$reset();
  await useFetch(url.logout, "GET");
})();
</script>

<style lang="scss">
.login-card__btn {
  @include btnAuth-style;
}
</style>
