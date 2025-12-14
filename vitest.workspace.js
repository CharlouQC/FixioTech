import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  // Backend - tests d'intégration avec Node
  './backend/vitest.config.js',
  
  // Frontend - tests unitaires avec jsdom
  './vitest.config.js'
])
