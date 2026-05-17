<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTheme } from 'vuetify'

const drawer = ref(true)
const router = useRouter()
const route = useRoute()
const currentTitle = computed(() => (route.name === 'equipment' ? 'Equipment' : 'Dashboard'))
const theme = useTheme()
const isDark = computed(() => theme.global.current.value.dark)
const username = computed(() => localStorage.getItem('admin-username') || 'xblazev')

const menuItems = [
  { title: 'Dashboard', icon: 'mdi-view-dashboard-outline', to: '/dashboard' },
  { title: 'Equipment', icon: 'mdi-sword-cross', to: '/equipment' },
  { title: 'Users', icon: 'mdi-account-group-outline' },
  { title: 'Orders', icon: 'mdi-cart-outline' },
  { title: 'Reports', icon: 'mdi-chart-box-outline' },
]

const logout = () => {
  localStorage.removeItem('admin-auth')
  router.push('/login')
}

const toggleTheme = () => {
  const nextTheme = isDark.value ? 'adminTheme' : 'adminDarkTheme'
  theme.global.name.value = nextTheme
  localStorage.setItem('admin-theme', nextTheme)
}
</script>

<template>
  <v-layout>
    <v-navigation-drawer v-model="drawer" theme="dark" class="admin-drawer">
      <div class="drawer-brand pa-6">
        <div class="d-flex align-center">
          <v-avatar color="primary" size="42" class="mr-3">
            <v-icon>mdi-shield-crown-outline</v-icon>
          </v-avatar>
          <div>
            <div class="text-h6 font-weight-bold">AdminPanel</div>
            <div class="text-caption opacity-70">Control Center</div>
          </div>
        </div>
      </div>

      <div class="px-4 pb-2 text-caption drawer-label">MAIN MENU</div>

      <v-list nav class="px-3">
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :prepend-icon="item.icon"
          :title="item.title"
          :to="item.to"
          :active="item.to ? route.path === item.to : false"
          rounded="lg"
          class="drawer-item mb-1"
        />
      </v-list>

      <template #append>
        <div class="pa-4">
          <v-card class="drawer-promo pa-4" rounded="xl" elevation="0">
            <div class="text-caption opacity-70 mb-1">System Status</div>
            <div class="d-flex align-center">
              <v-icon color="success" size="18" class="mr-2">mdi-circle</v-icon>
              <span class="text-body-2 font-weight-medium">All systems normal</span>
            </div>
          </v-card>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar flat color="background">
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title class="font-weight-bold">{{ currentTitle }}</v-toolbar-title>
      <v-spacer />
      <v-btn
        class="mr-2"
        variant="text"
        :icon="isDark ? 'mdi-weather-sunny' : 'mdi-weather-night'"
        @click="toggleTheme"
      />
      <div class="d-flex align-center mr-3">
        <v-avatar size="38" class="mr-3">
          <v-img src="https://i.pravatar.cc/80?img=12" alt="Profile picture" />
        </v-avatar>
        <div class="d-none d-sm-block">
          <div class="text-body-2 font-weight-bold">{{ username }}</div>
          <div class="text-caption text-soft">Administrator</div>
        </div>
      </div>
      <v-btn variant="text" prepend-icon="mdi-logout" @click="logout">Logout</v-btn>
    </v-app-bar>

    <v-main>
      <slot />
    </v-main>
  </v-layout>
</template>

<style scoped>
.admin-drawer {
  background:
    radial-gradient(circle at top left, rgba(141, 162, 255, 0.18), transparent 32%),
    linear-gradient(180deg, #0f172a 0%, #111827 100%);
}

.drawer-brand {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.drawer-label {
  letter-spacing: 0.14em;
  opacity: 0.5;
}

.drawer-item {
  transition:
    transform 0.18s ease,
    background-color 0.18s ease;
}

.drawer-item:hover {
  transform: translateX(4px);
}

.drawer-item.v-list-item--active {
  background: linear-gradient(90deg, rgba(141, 162, 255, 0.24), rgba(141, 162, 255, 0.08));
  border: 1px solid rgba(141, 162, 255, 0.18);
}

.drawer-promo {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
</style>
