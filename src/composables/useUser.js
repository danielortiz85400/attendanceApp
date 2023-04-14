import { url } from "../helpers/EndPoints";

export const useUser = (id) => {
  const user = ref(null);

  try {
    watchEffect(async () => {
      const resp = await fetch(url.player.aPlayer, {
        method: "POST",
        body: JSON.stringify({ id }),
        headers: {
          "Content-type": "application/json",
        },
      });
      const result = await resp.json();
      user.value = result.resp.body;
    });

    return { user };
  } catch (error) {
    console.log(error);
  }
};