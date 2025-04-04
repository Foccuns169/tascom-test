// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify(
  {
    theme: {
      defaultTheme: 'customTheme',
      themes: {
        customTheme: {
          dark: true,
          colors: {
            background: '#333333',
          },
        },
      },
    },
  }
)
