import { defineRule } from 'vee-validate'
// eslint-disable-next-line camelcase
import { required, min, max, min_value, max_value } from '@vee-validate/rules'

defineRule('postType', (value) => {
  if (!required(value)) {
    return 'Le type du Post doit être sélectionné'
  }

  if (required(value) && min_value(value, 1) && max_value(value, 5)) {
    return true
  }

  return 'Le type du Post doit être 1 (Question), 2 (Suggestion), 3 (Problème), 4 (Opinion) ou 5 (Discussion)'
})

defineRule('postTitle', (value) => {
  if (required(value) && min(value, { length: 20 }) && max(value, { length: 250 })) {
    return true
  }
})
