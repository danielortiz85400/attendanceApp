<template>
  <q-dialog ref="dialogRef" persistent>
    <q-card
      class="q-dialog-plugin no-scroll card-content q-pa-md"
      style="width: 330px; height: 450px; border-radius: 12px"
    >
      <AppBar :onDialogCancel="onDialogCancel" id="target-toast">
        <template #mainContent>
          <q-card-section class="card-content__title">Server</q-card-section>
          <q-card style="border-radius: 12px">
            <q-tabs
              v-model="tab"
              dense
              class="bg-grey-2 text-grey-7"
              active-color="indigo"
              indicator-color="indigo"
              align="justify"
            >
              <q-tab name="add" icon="add_circle"
                ><q-chip
                  class="glossy shadow-2 no-pointer-events font-days"
                  color="indigo"
                  text-color="white"
                  label="Crear"
                  size="md"
                >
                </q-chip
              ></q-tab>
              <q-tab name="delete" icon="delete_forever">
                <q-chip
                  class="glossy shadow-2 no-pointer-events font-days"
                  color="indigo"
                  text-color="white"
                  label="Remover"
                  size="md"
                >
                </q-chip>
              </q-tab>
            </q-tabs>
            <q-tab-panels
              v-model="tab"
              animated
              transition-prev="scale"
              transition-next="scale"
              class="bg-primary text-white"
            >
              <q-tab-panel name="add">
                <q-form
                  @submit.prevent="createServer(server)"
                  class="q-py-md q-gutter-lg"
                  ref="createForm"
                >
                  <q-input
                    v-model.trim="server.name"
                    label="Nombre de servidor"
                    borderless
                    dense
                    no-error-icon
                    style="border-radius: 15px"
                    class="forms-card__input"
                    :rules="[
                      $rules.required('Nombre requerido'),
                      $rules.maxLength(10, '10 Carácteres máximo'),
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
                        icon="dns"
                      />
                    </template>
                  </q-input>

                  <div class="flex justify-end">
                    <q-btn
                      class="font-days text-grey-7"
                      label="Crear"
                      push
                      type="submit"
                      :loading="submitting"
                    />
                  </div>
                </q-form>
              </q-tab-panel>

              <q-tab-panel name="delete">
                <q-form
                  @submit.prevent="deleteSquad(currentServers)"
                  class="q-py-md q-gutter-lg"
                  ref="removeForm"
                >
                  <q-select
                    class="q-mt-lg forms-card__input"
                    transition-show="jump-up"
                    transition-hide="jump-up"
                    v-model="currentServers.name"
                    :options="optionsSvr"
                    label="Servidores actuales"
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

                  <div class="flex justify-end">
                    <q-btn
                      class="font-days text-grey-7"
                      label="Remover"
                      push
                      type="submit"
                      :loading="submitting"
                    />
                  </div>
                </q-form>
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </template>
      </AppBar>
    </q-card>
  </q-dialog>
</template>

<script setup>
import AppBar from "@/slotComponents/AppBar.vue";
import { useFetch } from "@/composables/UseFetch";
import { toast } from "@/utils/useToast";
import { url } from "@/helpers/EndPoints";

const { dialogRef, onDialogCancel } = useDialogPluginComponent();
const serverStore = useServers();
const { servers } = storeToRefs(serverStore);

const tab = ref("add");
const removeForm = ref(null);
const createForm = ref(null);
const submitting = ref(false);

const optionsSvr = computed(() => servers.value.map(({ name }) => name));
const server = ref({ name: "" });
const currentServers = reactive({ name: "" });

const deleteSquad = (currentServers) => {
  submitting.value = true;

  removeForm.value.validate().then(async (success) => {
    if (success) {
      const { result } = await useFetch(url.server.delete, "DELETE", {
        ...currentServers,
      });
      submitting.value = false;
      Object.keys(currentServers).forEach(
        (key) =>
          (currentServers[key] = currentServers[key] ? "" : currentServers[key])
      );
      removeForm.value.reset();
      toast(result);
    }
  });
};

const createServer = async (server) => {
  submitting.value = true;
  createForm.value.validate().then(async (success) => {
    if (success) {
      const { result } = await useFetch(url.server.create, "POST", {
        ...server,
      });
      submitting.value = false;
      Object.keys(server).forEach(
        (key) => (server[key] = server[key] ? "" : server[key])
      );
      createForm.value.reset();
      toast(result);
    }
  });
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Days+One&family=Gochi+Hand&display=swap");

#custom-target {
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
  font-size: 4em;
}
.font-days {
  font-family: "Days One", sans-serif;
}
</style>
