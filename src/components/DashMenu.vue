<template>
  <div class="navigation shadow-3" style="margin-top: 25px">
    <ul>
      <li
        v-for="({ icon, text, name }, i) in menu"
        :key="i"
        :class="{ active: activeIndex === i }"
      >
        <a>
          <span class="icon"
            ><q-icon
              class="cursor-pointer"
              :name="icon"
              size="md"
              style="text-shadow: 1px 2px 3px rgba(0, 0, 0, 0.3)"
              @click="
                () => {
                  (activeIndex = i), handleTabs(name);
                }
              "
              :class="{ active: activeIndex === i }"
            ></q-icon
          ></span>
          <span
            class="text"
            @click="
              () => {
                (activeIndex = i), handleTabs(name);
              }
            "
            >{{ text }}<q-tooltip> {{ text }}</q-tooltip></span
          >
        </a>
      </li>
      <div class="indicator glossy"></div>
    </ul>
  </div>
</template>

<script setup>
const activeIndex = ref(0);
const menu = ref([
  { icon: "groups_3", text: "Groups", name: "squads" },
  { icon: "recent_actors", text: "Players", name: "players" },
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
  background-image: url("https://wallpaperaccess.com/full/2651829.jpg");
  background-position: 10% 51%; //60% 72%
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
        transition: 0.4s;
        color: $clr;
        text-align: center;
        cursor: default;
      }

      &.active {
        .icon {
          transform: translateY(-35px);
        }

        .text {
          opacity: 1;
          transform: translateY(10px);
          cursor: default;
        }
      }

      .text {
        position: absolute;
        top: 50%;
        left: 28%;
        color: $clr;
        font-weight: bold;
        font-size: 0.9em;
        letter-spacing: 0.05em;
        cursor: pointer;
        transition: 0.4s;
        opacity: 0;
      }
    }
  }

  .indicator {
    position: absolute;
    top: -45%;
    width: 67px;
    height: 67px;
    background-color: #3f50b4;
    border-radius: 50px;
    border: 6px solid $clr;
    transition: 0.3s;
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
