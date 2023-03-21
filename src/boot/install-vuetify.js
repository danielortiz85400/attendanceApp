import { boot } from "quasar/wrappers";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});

export default boot(({ app }) => {
  app.use(vuetify);
});
