<template>
  <q-dialog v-model="persistent" ref="dialogRef" persistent>
    <q-card class="signUp-card no-scroll">
      <v-layout>
        <v-app-bar
          color="teal-darken-4"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZhzPCfkhA9QJ-fUqq1NWuO1znid9FIuHSSVEN4z55QQ7B8aglVD2NT5UPehRVkp1WQA&usqp=CAU "
          style="position: absolute"
          rounded
          class="elevation-8"
        >
          <v-spacer></v-spacer>
          <q-btn
            @click="onDialogCancel"
            push
            color="red-12"
            icon="close"
            class="q-mx-sm q-px-sm"
          />
          <template #image>
            <v-img
              gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
            ></v-img>
          </template>
        </v-app-bar>

        <v-main>
          <q-card-section class="column flex-center q-pb-none">
            <div class="signUp-card__title no-pointer-events q-mt-md">
              Sign up
            </div>
            <q-space />
          </q-card-section>
          <q-form
            @submit="
              signUp(
                user.email,
                user.password,
                user.confirmPassword,
                user.userRole
              )
            "
            class="q-gutter-lg q-px-lg"
          >
            <q-input
              v-model="user.email"
              label="E-mail"
              borderless
              dense
              no-error-icon
              style="border-radius: 15px"
              class="q-mt-lg forms-card__input"
              :rules="[
                $rules.required('E-mail requerido'),
                $rules.email('E-mail inválido'),
              ]"
            >
              <template v-slot:prepend>
                <q-btn
                  class="q-mx-xs q-mb-xs shadow-4 input-icon"
                  glossy
                  round
                  :ripple="false"
                  color="indigo-9"
                  size="12px"
                  icon="contact_mail"
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
              counter
              :hint="`Seguridad: ${passwordSecurity}`"
              maxlength="12"
              style="border-radius: 15px"
              class="hint-right forms-card__input"
              :rules="[
                $rules.required('Contraseña requerida'),
                () =>
                  ['risky', 'guessable', 'weak', 'safe'].includes(strength)
                    ? `Seguridad: ${passwordSecurity}`
                    : null,
              ]"
            >
              <template v-slot:prepend>
                <q-btn
                  class="q-mb-xs q-mx-xs shadow-4 input-icon"
                  glossy
                  :ripple="false"
                  round
                  color="indigo-9"
                  size="12px"
                  icon="key"
                />
              </template>
              <template v-slot:append>
                <q-btn
                  dense
                  glossy
                  color="info"
                  size="11px"
                  round
                  icon="info"
                  class="q-mr-sm shadow-2"
                >
                  <q-tooltip class="bg-gray"
                    ><div style="text-align: left; width: 120px">
                      <b
                        >El mínimo de mayúsculas, minúsculas, especiales,
                        números:</b
                      >
                      <u> 1</u> <b>y caracteres:</b> <u>9</u>
                    </div></q-tooltip
                  >
                </q-btn>
              </template>
            </q-input>

            <transition name="bounce">
              <div class="row q-px-lg" v-if="user.password?.length">
                <password-meter @score="onScore" :password="user.password" />
              </div>
            </transition>
            <q-input
              v-model="user.confirmPassword"
              :type="isPwd ? 'password' : 'text'"
              label="Cofirmar contraseña"
              borderless
              dense
              no-error-icon
              maxlength="12"
              style="border-radius: 15px"
              class="forms-card__input"
              :rules="[
                $rules.required('Confirmación requerida'),
                $rules.sameAs(user.password, 'Contraseñas no coinciden'),
              ]"
            >
              <template v-slot:prepend>
                <q-btn
                  class="q-mb-xs q-mx-xs shadow-4 input-icon"
                  glossy
                  :ripple="false"
                  round
                  color="indigo-9"
                  size="12px"
                  icon="password"
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
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label :ripple="false">
                    <q-chip color="transparent" :ripple="false">
                      <q-avatar
                        class="shadow-4"
                        icon="add_moderator"
                        color="indigo-9"
                        text-color="white"
                      />
                      <q-btn-toggle
                        v-model="user.userRole"
                        push
                        glossy
                        rounded
                        toggle-color="indigo-6"
                        :options="templateToggle"
                      >
                        <template
                          v-for="({ value, slot }, i) in templateToggle"
                          :key="i"
                          v-slot:[slot]
                        >
                          <q-tooltip>{{ slot }}</q-tooltip>
                          <div class="row items-center no-wrap">
                            <div class="text-center">
                              {{ value.substring(0, 3) }}
                            </div>
                          </div>
                        </template>
                      </q-btn-toggle>
                    </q-chip>
                  </q-item-label>
                  <q-item-label caption>Rol por defecto: usuario</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>

            <q-card-actions class="row justify-center">
              <q-btn
                type="submit"
                label="REGISTRAR"
                :loading="submitting"
                class="signUp-card__btn shadow-7"
              >
                <template v-slot:loading>
                  <q-spinner-facebook />
                </template>
              </q-btn>
            </q-card-actions>
          </q-form>
          <q-separator />
          <q-card-actions class="row justify-center"> <br /> </q-card-actions>
        </v-main>
      </v-layout>
    </q-card>
  </q-dialog>
</template>

<script setup>
import PasswordMeter from "vue-simple-password-meter";

const store = useAuth();
const { submitting } = storeToRefs(store);
const { signUp } = store;

const { dialogRef, onDialogCancel } = useDialogPluginComponent();

const templateToggle = [
  { value: "ADMINISTRADOR", slot: "ADMINISTRADOR" },
  { value: "MODERADOR", slot: "MODERADOR" },
  { value: "USUARIO", slot: "USUARIO" },
];

const persistent = ref(false);
const strength = ref(null);
const isPwd = ref(true);
const user = reactive({
  email: "daniel@gmail.com",
  password: "D@ni3lortiz",
  confirmPassword: "D@ni3lortiz",
  userRole: "USUARIO",
});

const passwordSecurity = computed(() => {
  const { [strength.value]: status } = {
    risky: "Arriesgada",
    guessable: "Adivinable",
    weak: "Débil",
    safe: "Satisfactoria",
    secure: "Segura",
  };
  return status;
});

const onScore = (payload) => (strength.value = payload.strength);
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Slackey&display=swap");
.signUp-card {
  @include authCard-style;
  .signUp-card__title {
    @include titleAuthSignUp-style;
    margin-top: -20px;
  }
  .signUp-card__btn {
    @include btnAuth-style;
  }
}
.bounce-enter-active {
  animation: bounce-in 0.6s;
}
.bounce-leave-active {
  animation: bounce-in 0.6s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
