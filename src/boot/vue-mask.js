import VueTheMask from "vue-the-mask";
import { boot } from "quasar/wrappers";

export default boot(({ app }) => {
  app.use(VueTheMask);
});
