<template>
  <q-dialog ref="dialogRef" persistent>
    <q-card
      class="q-dialog-plugin shadow-1"
      style="width: 350px; border-radius: 12px"
    >
      <v-layout>
        <!-- https://uploadcdn.webzen.com/Files/Clara/WebzenGP/webmanager/SVR002/172update230221sub.jpg -->
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
          <q-card-section class="overflow-hidden">
            <div class="card-appBar__title">Opciones</div>
            <!-- src/assets/stepper_image_2.png -->
            <!-- style="
                position: absolute;
                top: 110px;
                left: 180px;
                opacity: 0.9;
                transform: scaleX(-1);
              " -->
            <img
              src="src/assets/backConfirmed.png "
              style="position: absolute; top: 110px; left: 20px; opacity: 0.2"
            />
            <q-stepper
              v-model="step"
              vertical
              animated
              ref="stepper"
              done-color="light-green-13"
              active-color="indigo-4"
              style="border-radius: 12px"
            >
              <q-step
                v-for="(el, i) in Object.entries(options)"
                :key="i"
                :name="i + 1"
                :title="el[0]"
                :done="step > 1"
                icon="workspace_premium"
                caption="de grupo"
              >
                <q-option-group
                  v-model="vml_optGroup"
                  :options="el[1]"
                  color="indigo-6"
                />
                <template #label="opt">
                  <div class="row items-center">
                    <span class="text-teal">{{ opt }}</span>
                  </div>
                </template>
              </q-step>

              <template #navigation>
                <q-stepper-navigation>
                  <q-btn
                    v-if="step < 2"
                    @click="
                      {
                        $refs.stepper.next(), (vml_optGroup = leaderStep);
                      }
                    "
                    push
                    label="CONTINUAR"
                    :disable="vml_optGroup === ''"
                  />
                  <q-btn
                    v-else
                    @click="onOKClick"
                    push
                    label="TERMINAR"
                    :disable="vml_optGroup === ''"
                  />
                  <q-btn
                    v-if="step > 1"
                    push
                    @click="
                      {
                        $refs.stepper.previous(), (vml_optGroup = tacticalStep);
                      }
                    "
                    label="ATRÁS"
                    class="q-ml-sm"
                  />
                </q-stepper-navigation>
              </template>
            </q-stepper>
          </q-card-section>
        </v-main>
      </v-layout>
    </q-card>
  </q-dialog>
</template>

<script setup>
const props = defineProps(["ctrToBeLeaders", "squadOptions"]);

const step = ref(1);
const tacticalStep = ref("");
const leaderStep = ref("");
const vml_optGroup = ref("");
const options = reactive({
  Táctica: [
    {
      label: "Ataque",
      value: "Ataque",
    },
    {
      label: "Defensa",
      value: "Defensa",
    },
    {
      label: "Auras",
      value: "Auras",
    },
    {
      label: "Sello",
      value: "Sello",
    },
  ],

  Líder: [...props.ctrToBeLeaders],
});

watch(
  () => vml_optGroup.value,
  (val) => {
    if (step.value === 1) {
      return (tacticalStep.value = val);
    }
    leaderStep.value = val;
  }
);

const { dialogRef, onDialogOK, onDialogCancel } = useDialogPluginComponent();

const squadOptionsReactive = ref(props.squadOptions);
const onOKClick = () => {
  squadOptionsReactive.value = {
    tactic: tacticalStep.value,
    leader: leaderStep.value,
    server: "MASTER",
  };
  onDialogOK();
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Slackey&display=swap");

.card-appBar__title {
  @include titleAuth-style;
  font-size: 2.5em;
  font-family: "Slackey";
}
</style>
