<template>
  <div class="navigation shadow-3 q-mt-lg">
    <ul>
      <li
        v-for="({ icon, text, name }, i) in menu"
        :key="i"
        :class="{ active: activeIndex === i }"
        @click="() => (activeIndex = i)"
      >
        <a @click.prevent="handleTabs(name)">
          <span class="icon"
            ><q-icon class="cursor-pointer" :name="icon" size="md"
          /></span>
          <span class="text">{{ text }}</span>
        </a>
      </li>
      <div class="indicator glossy"></div>
    </ul>
  </div>
</template>

<script setup>
const activeIndex = ref(0);
const menu = ref([
  { icon: "group", text: "Grupos", name: "squads" },
  { icon: "account_box", text: "Jugadores", name: "players" },
]);

const emits = defineEmits(["handle-panels"]);
const handleTabs = (name) => emits("handle-panels", name);
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Slackey&display=swap");

$clr: #fff;

.navigation {
  width: 400px;
  height: 70px;
  background: $clr;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;

  background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZhzPCfkhA9QJ-fUqq1NWuO1znid9FIuHSSVEN4z55QQ7B8aglVD2NT5UPehRVkp1WQA&usqp=CAU");

  background-position: 50% 0%;
  background-repeat: no-repeat;

  ul {
    display: flex;

    li {
      position: relative;
      list-style: none;
      width: 70px;
      height: 70px;
      z-index: 1;

      .icon {
        position: relative;
        display: block;
        line-height: 75px;
        font-size: 1.7em;
        transition: 0.5s;
        color: $clr;
        text-align: center;
      }

      &.active {
        .icon {
          transform: translateY(-35px);
        }

        .text {
          opacity: 1;
          transform: translateY(10px);
        }
      }

      .text {
        position: absolute;
        top: 50%;
        left: 28%;
        color: $clr;
        font-weight: bold;
        font-size: 0.75em;
        letter-spacing: 0.05em;
        cursor: default;
        transition: 0.5s;
        opacity: 0;
      }
    }
  }

  .indicator {
    position: absolute;
    top: -46%;
    width: 70px;
    height: 70px;
    background-color: #3f50b4;
    border-radius: 50px;
    border: 6px solid $clr;
    transition: 0.5s;
    &::before {
      content: "";
      position: absolute;
      top: 45%;
      left: -24.5px;
      width: 21px;
      height: 23px;
      background-color: transparent;
      border-top-right-radius: 20px;
      box-shadow: 0px -10px 0 0 $clr;
    }

    &::after {
      content: "";
      position: absolute;
      top: 45%;
      right: -24px;
      width: 21px;
      height: 23px;
      background-color: transparent;
      border-top-left-radius: 20px;
      box-shadow: 0px -10px 0 0 $clr;
    }
  }

  ul li:nth-child(1).active ~ .indicator {
    transform: translateX(calc(70px * 0));
  }

  ul li:nth-child(2).active ~ .indicator {
    transform: translateX(calc(70px * 1));
  }

  ul li:nth-child(3).active ~ .indicator {
    transform: translateX(calc(70px * 2));
  }

  ul li:nth-child(4).active ~ .indicator {
    transform: translateX(calc(70px * 3));
  }

  ul li:nth-child(5).active ~ .indicator {
    transform: translateX(calc(70px * 4));
  }
}
</style>
