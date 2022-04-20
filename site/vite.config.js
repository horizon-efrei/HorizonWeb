import { resolve } from 'path'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    plugins: [VitePWA({})],
    resolve: { alias: { '@': resolve(__dirname, 'src') } },
    server: { open: true },
})
