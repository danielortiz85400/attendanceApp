<template>
  <div class="q-pa-md">
    <span
      ><q-btn push :ripple="false" class="shadow-3 text-indigo-5">
        <q-icon left size="2em" name="info" />
        <div>Sin grupos</div>
      </q-btn></span
    >
    <div class="text-caption">
      <q-skeleton type="QChip" animation="none" />
    </div>
    <q-markup-table class="q-ma-sm">
      <thead>
        <tr>
          <th class="text-left" style="width: 150px">
            <q-skeleton animation="none" type="text" />
          </th>
          <th class="text-right">
            <q-skeleton animation="none" type="text" />
          </th>
          <th class="text-right">
            <q-skeleton animation="none" type="text" />
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="n in 5" :key="n">
          <td class="text-left">
            <q-skeleton animation="none" type="text" width="85px" />
          </td>
          <td class="text-right">
            <q-skeleton animation="none" type="text" width="50px" />
          </td>
          <td class="text-right">
            <q-skeleton animation="none" type="text" width="35px" />
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>
