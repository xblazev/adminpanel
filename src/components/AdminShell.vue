<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const drawer = ref(true)
const router = useRouter()

const menuItems = [
  { title: 'Dashboard', icon: 'mdi-view-dashboard-outline' },
  { title: 'Users', icon: 'mdi-account-group-outline' },
  { title: 'Orders', icon: 'mdi-cart-outline' },
  { title: 'Reports', icon: 'mdi-chart-box-outline' },
]

const logout = () => {
  localStorage.removeItem('admin-auth')
  router.push('/login')
}
</script>

<template>
  <v-layout>
    <v-navigation-drawer v-model="drawer" color="secondary" theme="dark">
      <div class="pa-6">
        <div class="text-h6 font-weight-bold">AdminPanel</div>
        <div class="text-caption mt-1 opacity-70">Workspace</div>
      </div>

      <v-list nav class="px-3">
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :prepend-icon="item.icon"
          :title="item.title"
          rounded="lg"
        />
      </v-list>
    </v-navigation-drawer>

    <v-app-bar flat color="background">
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title class="font-weight-bold">Dashboard</v-toolbar-title>
      <v-spacer />
      <v-btn variant="text" prepend-icon="mdi-logout" @click="logout">Logout</v-btn>
    </v-app-bar>

    <v-main>
      <slot />
    </v-main>
  </v-layout>
</template>
