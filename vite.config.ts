// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import * as path from 'path';

// function lido(pkg: string) {
//   return path.resolve(
//     __dirname,
//     `node_modules/@lidojs/${pkg}/dist`
//   );
// }

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       '@lidojs/design-editor': lido('design-editor'),
//       '@lidojs/design-core': lido('design-core'),
//       '@lidojs/design-layers': lido('design-layers'),
//       '@lidojs/design-utils': lido('design-utils'),
//       '@lidojs/design-screen': lido('design-screen'),
//       '@lidojs/draw': lido('draw'),
//       '@lidojs/text-editor': lido('text-editor'),
//       '@lidojs/color-picker': lido('color-picker'),
//     },
//   },
//   server: {
//     port: 4200,
//   },
// });

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import * as path from "path";

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//   "@lidojs/design-editor": path.resolve(
//     __dirname,
//     "local-lido/design-editor"
//   ),
// },
//   },
//   server: {
//     port: 4200,
//   },
// });


// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import path from "path";

// export default defineConfig({
//   plugins: [
//     react(), // ✅ keep default plugin
//   ],
//   resolve: {
//     alias: {
//       "@lidojs/design-editor": path.resolve(
//         __dirname,
//         "src/local-lido/design-editor"
//       ),
//     },
//   },
//   optimizeDeps: {
//     exclude: ["@lidojs/design-editor"],
//   },
//   server: {
//     port: 4200,
//     hmr: false, // ✅ THIS disables Fast Refresh safely
//   },
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // ✅ allow "src/..." absolute imports
      src: path.resolve(__dirname, "src"),

      // ✅ map lido editor to local shim
      "@lidojs/design-editor": path.resolve(
        __dirname,
        "src/local-lido/design-editor"
      ),
    },
  },
  optimizeDeps: {
    exclude: ["@lidojs/design-editor"],
  },
  server: {
    port: 4200,
    hmr: false,
  },
});
