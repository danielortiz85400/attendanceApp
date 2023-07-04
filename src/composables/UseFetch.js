import { useAuth } from "@/stores/auth-store";

export const useFetch = async (url, method = "", data, onSuccess) => {
  try {
    let requestInit = {
      method,
      credentials: "include",
      ...(["POST", "DELETE"].includes(method) && {
        body: JSON.stringify({ ...data }),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${useAuth().$state.authUser?.jwt?.token}`,
        },
      }),
    };

    const response = await fetch(url, { ...requestInit });

    const result = await response.json();
    onSuccess ? onSuccess(result) : false;

    return { result };
  } catch (error) {
    console.log(error);
  }
};
