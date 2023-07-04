<template>
  <q-dialog ref="dialogRef" persistent>
    <q-card
      class="q-dialog-plugin no-scroll card-content"
      style="width: 330px; border-radius: 12px"
    >
      <AppBar :onDialogCancel="onDialogCancel">
        <template #mainContent>
          <div class="card-content__title">sign up</div>
          <q-stepper
            v-model="step"
            ref="stepper"
            active-color="indigo-5"
            animated
            flat
            done-color="light-green-13"
          >
            <!-- DATOS -->
            <q-step
              :name="1"
              title="Personaje"
              icon="description"
              :done="step > 1"
              class="q-px-md"
            >
              <q-form @submit.prevent="signupPlayers" ref="forms" id="form1">
                <q-input
                  v-model="player.email"
                  label="Email de pj"
                  borderless
                  dense
                  no-error-icon
                  style="border-radius: 15px"
                  class="forms-card__input"
                  :rules="[
                    $rules.required('E-mail de pj requerido'),
                    $rules.email('E-mail de pj inválido'),
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
                  v-model="player.nick"
                  label="nick"
                  borderless
                  counter
                  dense
                  no-error-icon
                  maxlength="10"
                  style="border-radius: 15px"
                  class="q-mt-lg forms-card__input"
                  :rules="[$rules.required('Nick requerido')]"
                >
                  <template v-slot:prepend>
                    <q-btn
                      class="q-mx-xs q-mb-xs shadow-4 input-icon"
                      glossy
                      round
                      :ripple="false"
                      color="indigo-9"
                      size="12px"
                      icon="person_pin"
                    />
                  </template>
                </q-input>

                <q-select
                  class="q-mt-lg forms-card__input"
                  transition-show="jump-up"
                  transition-hide="jump-up"
                  v-model="player.ctr"
                  :options="optionsCtr"
                  label="Clase"
                  dense
                  no-error-icon
                  borderless
                  style="border-radius: 15px"
                  :rules="[$rules.required('Clase requerida')]"
                >
                  <template v-slot:prepend>
                    <q-btn
                      class="q-mx-xs q-mb-xs shadow-4 input-icon"
                      glossy
                      round
                      :ripple="false"
                      color="indigo-9"
                      size="12px"
                      icon="recent_actors"
                    />
                  </template>
                </q-select>
                <q-select
                  class="q-mt-lg forms-card__input"
                  transition-show="jump-up"
                  transition-hide="jump-up"
                  v-model="player.nameServer"
                  :options="optionsSvr"
                  label="Servidor"
                  dense
                  no-error-icon
                  borderless
                  style="border-radius: 15px"
                  :rules="[$rules.required('Servidor requerido')]"
                >
                  <template v-slot:prepend>
                    <q-btn
                      class="q-mx-xs q-mb-xs shadow-4 input-icon"
                      glossy
                      round
                      :ripple="false"
                      color="indigo-9"
                      size="12px"
                      icon="dns"
                    />
                  </template>
                </q-select>
              </q-form>
            </q-step>

            <!-- CUENTA -->
            <q-step
              :name="2"
              title="Cuenta"
              icon="account_box"
              :done="step > 2"
              class="q-px-md no-scroll"
              id="form-target"
            >
              <q-form
                @submit.prevent="signupPlayers(player)"
                ref="forms"
                id="form2"
              >
                <q-input
                  v-model="player.name"
                  label="Nombre(1)"
                  borderless
                  dense
                  no-error-icon
                  maxlength="10"
                  style="border-radius: 15px"
                  class="forms-card__input"
                  :rules="[$rules.required('Nombre requerido')]"
                >
                  <template v-slot:prepend>
                    <q-btn
                      class="q-mx-xs q-mb-xs shadow-4 input-icon"
                      glossy
                      round
                      :ripple="false"
                      color="indigo-9"
                      size="12px"
                      icon="assignment_ind"
                    />
                  </template>
                </q-input>
                <q-input
                  v-model="player.phone"
                  borderless
                  dense
                  no-error-icon
                  label="Télefono"
                  mask="(+##) ### - ### - ####"
                  fill-mask
                  class="q-mt-lg forms-card__input"
                  style="border-radius: 15px"
                  :rules="[
                    (val) => !!val || 'El número de teléfono es requerido',
                    (val) =>
                      /^[\d-+() ]+$/.test(val) ||
                      'Ingrese un número de teléfono válido',
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
                      icon="phone_iphone"
                    />
                  </template>
                </q-input>

                <q-input
                  v-model="player.password"
                  :type="isPwd ? 'password' : 'text'"
                  label="Contraseña"
                  borderless
                  dense
                  no-error-icon
                  counter
                  :hint="`Seguridad: ${passwordSecurity}`"
                  maxlength="12"
                  style="border-radius: 15px"
                  class="hint-right q-mt-lg forms-card__input"
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
                  <div
                    class="row q-px-lg q-mt-md"
                    v-if="player.password?.length"
                  >
                    <password-meter
                      @score="onScore"
                      :password="player.password"
                    />
                  </div>
                </transition>
                <q-input
                  v-model="player.confirmPassword"
                  :type="isPwd ? 'password' : 'text'"
                  label="Cofirmar contraseña"
                  borderless
                  dense
                  no-error-icon
                  maxlength="12"
                  style="border-radius: 15px"
                  class="q-mt-lg forms-card__input"
                  :rules="[
                    $rules.required('Confirmación requerida'),
                    $rules.sameAs(player.password, 'Contraseñas no coinciden'),
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
              </q-form>
            </q-step>

            <template v-slot:navigation>
              <q-separator />
              <q-stepper-navigation class="q-mt-md flex flex-center">
                <q-btn
                  color="primary"
                  :label="step === 2 ? 'Crear' : 'Continuar'"
                  push
                  type="submit"
                  :form="step === 1 ? 'form1' : 'form2'"
                  :loading="submitting"
                />
                <q-btn
                  v-if="step > 1"
                  push
                  color="primary"
                  @click="$refs.stepper.previous()"
                  label="Volver"
                  class="q-ml-sm"
                />
              </q-stepper-navigation>
            </template>
          </q-stepper>
        </template>
      </AppBar>
    </q-card>
  </q-dialog>
</template>

<script setup>
import PasswordMeter from "vue-simple-password-meter";
import { promiseSwal } from "@/utils/UsePromiseToast";
import AppBar from "@/slotComponents/AppBar.vue";
import { url } from "@/helpers/EndPoints";
import { useFetch } from "@/composables/UseFetch";

const { dialogRef, onDialogCancel } = useDialogPluginComponent();

// STEPPER AND FORMS
const forms = ref(null);
const submitting = ref(false);
const step = ref(1);
const stepper = ref(null);
const player = reactive({
  email: "",
  nick: "",
  ctr: "",
  nameServer: "",
  name: "",
  phone: "",
  password: "",
  confirmPassword: "",
});

// <<selects>>
const optionsCtr = ref(["BM", "GM", "DM", "LE", "FM", "ELF", "SUMM"]);
const optionsSvr = ref(["MASTER", "HEROES"]); //!! debe ser dinamico (del svr)
const signupPlayers = (player) => {
  forms.value.validate().then(async (success) => {
    if (success && step.value === 2) {
      submitting.value = true;
      const result = await promiseSwal(
        "crear?",
        "#form-target",
        useFetch.bind(null, url.player.create, "POST", { ...player })
      );
      submitting.value = false;
      if (result?.status === 200) {
        setTimeout(() => {
          Object.keys(player).forEach(
            (key) => (player[key] = player[key] ? "" : player[key])
          );
          forms.value.reset();
          step.value = 1;
        }, 3000);
      }
    }
    stepper.value.next();
  });
};

//PASSWORDMETER
const strength = ref(null);
const isPwd = ref(true);
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

/* Toast */
#custom-target {
  height: auto;
  width: auto;
  position: relative;
}
.position-absolute {
  position: absolute !important;
  bottom: 0 !important;
  right: 0 !important;
}
/********** */
.card-content {
  @include authCard-style;
}
.card-content__title {
  @include titleAuth-style;
  font-size: 4.3em;
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
