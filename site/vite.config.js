import { resolve } from 'path'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue(), VitePWA({})],
    resolve: { alias: { '@': resolve(__dirname, 'src') } },
    server: { open: true },
})
