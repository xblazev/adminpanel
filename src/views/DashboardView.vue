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

const revenueTrend = [24, 78, 34, 96, 42, 88, 28, 102, 54, 84, 38, 110]
const revenuePoints = revenueTrend
  .map((value, index) => `${index * 55},${220 - value * 1.45}`)
  .join(' ')
const revenueArea = `0,220 ${revenuePoints} 605,220`
const trafficSources = [
  { label: 'Organic', value: 46, color: 'primary' },
  { label: 'Referral', value: 28, color: 'success' },
  { label: 'Ads', value: 18, color: 'warning' },
  { label: 'Direct', value: 8, color: 'info' },
]
const weeklyActivity = [58, 72, 64, 80, 74, 92, 86]
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
          <v-card rounded="xl" elevation="0" class="pa-5 h-100">
            <div class="d-flex justify-space-between align-center mb-5">
              <div>
                <div class="text-h6 font-weight-bold">Revenue Trend</div>
                <div class="text-soft text-body-2">7 hari terakhir</div>
              </div>
              <v-chip color="success" variant="tonal">+18.4%</v-chip>
            </div>

            <div class="line-chart">
              <div class="chart-grid"></div>
              <svg viewBox="0 0 600 220" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="revenueGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stop-color="rgb(var(--v-theme-primary))" stop-opacity="0.42" />
                    <stop offset="100%" stop-color="rgb(var(--v-theme-primary))" stop-opacity="0" />
                  </linearGradient>
                </defs>
                <polygon :points="revenueArea" fill="url(#revenueGradient)" />
                <polyline
                  fill="none"
                  stroke="rgb(var(--v-theme-primary))"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  :points="revenuePoints"
                />
                <circle cx="605" cy="60.5" r="6" fill="rgb(var(--v-theme-primary))" />
                <circle cx="605" cy="60.5" r="12" class="pulse-ring" />
              </svg>
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" lg="4">
          <v-card rounded="xl" elevation="0" class="pa-5 h-100">
            <div class="text-h6 font-weight-bold mb-5">Traffic Sources</div>
            <div v-for="source in trafficSources" :key="source.label" class="mb-4">
              <div class="d-flex justify-space-between text-body-2 mb-2">
                <span>{{ source.label }}</span>
                <span class="font-weight-bold">{{ source.value }}%</span>
              </div>
              <v-progress-linear
                :model-value="source.value"
                :color="source.color"
                height="10"
                rounded
              />
            </div>
          </v-card>
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

      <v-row class="mt-2">
        <v-col cols="12">
          <v-card rounded="xl" elevation="0" class="pa-5">
            <div class="d-flex justify-space-between align-center mb-5">
              <div>
                <div class="text-h6 font-weight-bold">Weekly Activity</div>
                <div class="text-soft text-body-2">Volume interaksi tim</div>
              </div>
              <div class="text-soft text-body-2">Peak: 92</div>
            </div>

            <div class="bar-chart">
              <div
                v-for="(value, index) in weeklyActivity"
                :key="index"
                class="bar"
                :style="{ height: `${value}%` }"
              >
                <span>{{ ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'][index] }}</span>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </AdminShell>
</template>

<style scoped>
.line-chart {
  position: relative;
  height: 220px;
}

.line-chart svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.pulse-ring {
  fill: rgba(49, 87, 245, 0.18);
}

.chart-grid {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(to bottom, rgba(148, 163, 184, 0.18) 1px, transparent 1px);
  background-size: 100% 25%;
}

.bar-chart {
  display: flex;
  align-items: end;
  gap: 16px;
  height: 248px;
  padding-bottom: 28px;
  box-sizing: border-box;
  overflow: visible;
}

.bar {
  position: relative;
  flex: 1;
  min-height: 28px;
  border-radius: 18px 18px 8px 8px;
  background: linear-gradient(180deg, rgb(var(--v-theme-primary)), rgba(141, 162, 255, 0.35));
}

.bar span {
  position: absolute;
  bottom: -28px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.75rem;
  color: #64748b;
}
</style>
