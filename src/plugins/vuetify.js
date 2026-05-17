import { createVuetify } from 'vuetify'

export const vuetify = createVuetify({
  theme: {
    defaultTheme: 'adminTheme',
    themes: {
      adminTheme: {
        dark: false,
        colors: {
          primary: '#3157f5',
          secondary: '#0f172a',
          surface: '#ffffff',
          background: '#f5f7fb',
          success: '#16a34a',
        },
      },
    },
  },
})
