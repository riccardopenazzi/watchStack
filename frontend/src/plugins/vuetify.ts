import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const watchStackTheme = {
  dark: true,
  colors: {
    background: '#0d0d0d',    
    surface: '#1a1a1a',       
    primary: '#7c83fd',       
    secondary: '#424242',     
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
    'on-surface': '#FFFFFF',  
    'on-primary': '#FFFFFF',  
  },
}

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'watchStackTheme',
    themes: {
      watchStackTheme,
    },
  },
  defaults: {
    global: {
      style: 'font-family: "Plus Jakarta Sans", sans-serif',
    },
    VCard: {
      rounded: 'xl',          
      elevation: 0,           
      color: 'surface',
    },
    VBtn: {
      rounded: 'pill',        
      fontWeight: 'bold',
      letterSpacing: '0.5px',
    },
    VTextField: {
      variant: 'filled',      
      rounded: 'lg',
      density: 'comfortable',
      color: 'primary',
    },
    VBottomNavigation: {
      backgroundColor: '#0d0d0d',
      color: 'primary',
      height: 80,             
    }
  },
})
