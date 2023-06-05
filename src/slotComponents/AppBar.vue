<template>
  <v-layout>
    <v-app-bar
      color="#454F82"
      :image="props.image"
      :density="props.density"
      absolute
      rounded
      class="elevation-8"
      :style="props.style"
    >
      <template #image>
        <v-img
          :lazy-src="props.image"
          aspect-ratio="1"
          gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey-lighten-5"
              ></v-progress-circular>
            </v-row> </template
        ></v-img>
      </template>
      <v-app-bar-title><slot name="title"></slot> </v-app-bar-title>

      <template #append v-if="showCancelBttn">
        <q-btn
          v-if="showCancelBttn"
          @click="props.onDialogCancel"
          push
          color="red-12"
          icon="close"
          class="q-mx-sm q-px-sm"
        />
      </template>
    </v-app-bar>

    <v-main><slot name="mainContent"></slot> </v-main
  ></v-layout>
</template>

<script setup>
const props = defineProps({
  onDialogCancel: {
    type: Function,
    default: () => {},
  },
  density: {
    default: "default",
  },
  image: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZhzPCfkhA9QJ-fUqq1NWuO1znid9FIuHSSVEN4z55QQ7B8aglVD2NT5UPehRVkp1WQA&usqp=CAU",
  },
  showCancelBttn: {
    type: Boolean,
    default: true,
  },

  style: {
    type: Object,
    default: () => {},
  },
});
</script>
