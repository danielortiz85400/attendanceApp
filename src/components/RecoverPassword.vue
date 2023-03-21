<template>
  <q-dialog ref="dialogRef" persistent class="no-scroll relative-position">
    <q-card class="q-dialog-plugin recovery-card bg-grey-1">
      <q-card-section class="row items-center q-pb-xs">
        <div></div>
        <q-space />
        <q-btn
          @click="onDialogCancel"
          push
          class="q-ml-sm bg-red-5"
          icon="close"
          color="red-5"
        />
      </q-card-section>
      <q-toolbar>
        <div class="no-box-shadow recovery-card__title no-pointer-events">
          Retrieve
        </div>
      </q-toolbar>

      <q-card-section class="q-pa-none">
        <q-form @submit="recoverPassword(email)">
          <q-input
            v-model="email"
            label="E-mail"
            borderless
            dense
            no-error-icon
            clearable
            hint="Enter your email to recover password"
            style="border-radius: 15px"
            class="q-ma-md q-mb-lg recovery-card__input"
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
                icon="lock_reset"
              />
            </template>
          </q-input>
          <q-separator class="q-mt-md" />
          <div class="row justify-center q-my-md">
            <q-btn
              label="Recover password"
              type="submit"
              color="primary"
              glossy
              push
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
const { dialogRef, onDialogOK, onDialogCancel } = useDialogPluginComponent();

const email = ref("");

const recoverPassword = (email) => {
  onDialogOK();
  console.log(email);
};
</script>

<style scoped lang="scss">
.recovery-card {
  border-radius: 12px;
  box-shadow: $shadowInputs;
}
.recovery-card__input {
  margin-top: -20px;
  box-shadow: $shadowInputs;
}
.recovery-card__title {
  font-family: $authBtnFont;
  margin: auto;
  font-size: 6em;
  letter-spacing: 1px;
  text-overflow: ellipsis;
  text-align: center;
  cursor: pointer;
  color: #fff;
  -webkit-text-stroke: 0.4px rgba(36, 48, 132, 0.4);
  text-shadow: $shadowText;
}
</style>
