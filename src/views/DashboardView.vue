<script setup>
import AdminShell from '../components/AdminShell.vue'
import StatCard from '../components/StatCard.vue'

const stats = [
  { title: 'Total Users', value: '1,284', icon: 'mdi-account-group-outline', tone: 'primary' },
  { title: 'Orders Today', value: '86', icon: 'mdi-cart-outline', tone: 'success' },
  { title: 'Revenue', value: 'Rp 18,4 jt', icon: 'mdi-cash-multiple', tone: 'warning' },
  { title: 'Open Tickets', value: '12', icon: 'mdi-lifebuoy', tone: 'info' },
]

const recentOrders = [
  { customer: 'Alya Putri', item: 'Premium Plan', status: 'Paid', amount: 'Rp 499.000' },
  { customer: 'Rafi Akbar', item: 'Starter Plan', status: 'Pending', amount: 'Rp 149.000' },
  { customer: 'Nadia Sari', item: 'Enterprise', status: 'Paid', amount: 'Rp 1.299.000' },
  { customer: 'Bima Fajar', item: 'Premium Plan', status: 'Review', amount: 'Rp 499.000' },
]

const statusColor = {
  Paid: 'success',
  Pending: 'warning',
  Review: 'info',
}
</script>

<template>
  <AdminShell>
    <v-container fluid class="pa-6">
      <div class="mb-6">
        <div class="text-h4 font-weight-bold">Ringkasan</div>
        <div class="text-soft mt-1">Snapshot operasional hari ini.</div>
      </div>

      <v-row>
        <v-col v-for="stat in stats" :key="stat.title" cols="12" sm="6" lg="3">
          <StatCard v-bind="stat" />
        </v-col>
      </v-row>

      <v-row class="mt-2">
        <v-col cols="12" lg="8">
          <v-card rounded="xl" elevation="0" class="pa-5">
            <div class="d-flex justify-space-between align-center mb-4">
              <div>
                <div class="text-h6 font-weight-bold">Pesanan Terbaru</div>
                <div class="text-soft text-body-2">Contoh daftar data admin</div>
              </div>
              <v-btn variant="tonal" color="primary">Lihat semua</v-btn>
            </div>

            <v-table>
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Produk</th>
                  <th>Status</th>
                  <th class="text-right">Nominal</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="order in recentOrders" :key="order.customer">
                  <td>{{ order.customer }}</td>
                  <td>{{ order.item }}</td>
                  <td>
                    <v-chip :color="statusColor[order.status]" size="small" variant="tonal">
                      {{ order.status }}
                    </v-chip>
                  </td>
                  <td class="text-right">{{ order.amount }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-card>
        </v-col>

        <v-col cols="12" lg="4">
          <v-card rounded="xl" elevation="0" class="pa-5 h-100">
            <div class="text-h6 font-weight-bold mb-4">Aktivitas</div>
            <v-timeline density="compact" side="end">
              <v-timeline-item dot-color="primary" size="small">
                3 user baru mendaftar
              </v-timeline-item>
              <v-timeline-item dot-color="success" size="small">
                Laporan bulanan selesai
              </v-timeline-item>
              <v-timeline-item dot-color="warning" size="small">
                2 pembayaran menunggu verifikasi
              </v-timeline-item>
            </v-timeline>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </AdminShell>
</template>
