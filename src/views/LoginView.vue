<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from 'vuetify'

const router = useRouter()
const theme = useTheme()
const form = ref(null)
const email = ref(localStorage.getItem('admin-username') || '')
const password = ref(localStorage.getItem('admin-password') || '')
const loading = ref(false)

const required = (value) => !!value || 'Field ini wajib diisi'

onMounted(() => {
  theme.global.name.value = 'adminTheme'
})

const login = async () => {
  const { valid } = await form.value.validate()
  if (!valid) return

  loading.value = true
  window.setTimeout(() => {
    localStorage.setItem('admin-auth', 'true')
    localStorage.setItem('admin-username', email.value)
    localStorage.setItem('admin-password', password.value)
    theme.global.name.value = localStorage.getItem('admin-theme') || 'adminTheme'
    router.push('/dashboard')
  }, 450)
}
</script>

<template>
  <v-main class="login-page">
    <v-container class="fill-height">
      <v-row justify="center" align="center">
        <v-col cols="12" sm="9" md="5" lg="4">
          <v-card rounded="xl" elevation="8" class="pa-7">
            <div class="mb-6">
              <div class="text-h4 font-weight-bold mb-2">Selamat datang</div>
              <div class="text-soft">Masuk untuk membuka admin dashboard.</div>
            </div>

            <v-form ref="form" @submit.prevent="login">
              <v-text-field
                v-model="email"
                label="Email atau username"
                prepend-inner-icon="mdi-account-outline"
                :rules="[required]"
              />
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                prepend-inner-icon="mdi-lock-outline"
                :rules="[required]"
              />
              <v-btn
                block
                size="large"
                color="primary"
                class="mt-2"
                type="submit"
                :loading="loading"
              >
                Masuk
              </v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(49, 87, 245, 0.16), transparent 30%),
    linear-gradient(180deg, #f8faff 0%, #eef3fb 100%);
}
</style>
