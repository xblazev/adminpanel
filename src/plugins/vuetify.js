import { createVuetify } from 'vuetify'

export const vuetify = createVuetify({
  theme: {
    defaultTheme: localStorage.getItem('admin-theme') || 'adminTheme',
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
      adminDarkTheme: {
        dark: true,
        colors: {
          primary: '#8da2ff',
          secondary: '#0f172a',
          surface: '#111827',
          background: '#020617',
          success: '#22c55e',
        },
      },
    },
  },
})
