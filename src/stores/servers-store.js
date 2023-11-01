import { toast } from "@/utils/useToast";
import { useFetch } from "@/composables/UseFetch";
import { url } from "@/helpers/EndPoints";
import { promiseSwal } from "@/utils/UsePromiseToast";

export const useServers = defineStore("servers", {
  state: () => ({
    servers: [],
  }),
});
