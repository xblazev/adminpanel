<script setup>
import { computed, ref } from "vue";
import AdminShell from "../components/AdminShell.vue";
import { equipments as seedEquipments } from "../data/equipments";

const rows = ref(seedEquipments.map((item) => ({ ...item })));
const search = ref("");
const editDialog = ref(false);
const deleteDialog = ref(false);
const snackbar = ref(false);
const snackbarMessage = ref("");
const editingId = ref(null);
const deletingRow = ref(null);
const saving = ref(false);
const deleting = ref(false);
const refreshing = ref(false);

const fields = [
  "equipment_id",
  "created",
  "mst_equipment_id",
  "favorite",
  "elv",
  "slv",
  "potential",
  "is_complete_auto_potential_composite",
  "auto_potential_composite",
  "awaked",
  "is_awake",
  "endAwakeCount",
  "endAwakeRemain",
  "end_remain",
  "start_remain",
  "evolve_start_time",
  "_id",
];

const summaryFields = [
  "equipment_id",
  "mst_equipment_id",
  "favorite",
  "elv",
  "slv",
  "potential",
  "awaked",
  "is_awake",
];

const detailFields = fields.filter((field) => !summaryFields.includes(field));
const odHiddenFields = [
  "elv",
  "slv",
  "potential",
  "is_complete_auto_potential_composite",
  "auto_potential_composite",
];

const nonOdHiddenFields = [
  "awaked",
  "is_awake",
  "endAwakeCount",
  "endAwakeRemain",
  "end_remain",
  "start_remain",
  "evolve_start_time",
];

const editableFields = computed(() => {
  const isOdEquipment = form.value.equipment_id?.startsWith("OD_");
  const hiddenFields = isOdEquipment ? odHiddenFields : nonOdHiddenFields;
  const createOnlyHiddenFields = editingId.value
    ? []
    : ["favorite", "is_complete_auto_potential_composite", "auto_potential_composite"];

  return fields.filter(
    (field) =>
      !["created", "_id", ...hiddenFields, ...createOnlyHiddenFields].includes(field),
  );
});

const headers = [
  {
    title: "",
    key: "data-table-expand",
  },
  ...summaryFields.map((field) => ({
    title: field,
    key: field,
  })),
  {
    title: "Aksi",
    key: "actions",
    sortable: false,
  },
];

const form = ref({});
const dialogTitle = computed(() =>
  editingId.value ? "Edit Equipment" : "Tambah Equipment",
);

const openCreate = () => {
  editingId.value = null;
  form.value = {
    equipment_id: "",
    created: 0,
    mst_equipment_id: "",
    favorite: 0,
    elv: 0,
    slv: 0,
    potential: 0,
    is_complete_auto_potential_composite: 0,
    auto_potential_composite: 0,
    awaked: 0,
    is_awake: 0,
    endAwakeCount: 0,
    endAwakeRemain: 0,
    end_remain: 0,
    start_remain: 0,
    evolve_start_time: 0,
    _id: `local-${Date.now()}`,
  };
  editDialog.value = true;
};

const openEdit = (row) => {
  editingId.value = row._id;
  form.value = { ...row };
  editDialog.value = true;
};

const saveEquipment = () => {
  saving.value = true;

  window.setTimeout(() => {
    if (editingId.value) {
      rows.value = rows.value.map((row) =>
        row._id === editingId.value ? { ...form.value } : row,
      );
      snackbarMessage.value = "Equipment berhasil diperbarui";
    } else {
      rows.value.unshift({ ...form.value });
      snackbarMessage.value = "Equipment berhasil ditambahkan";
    }

    saving.value = false;
    editDialog.value = false;
    snackbar.value = true;
  }, 500);
};

const askDelete = (row) => {
  deletingRow.value = row;
  deleteDialog.value = true;
};

const removeEquipment = () => {
  deleting.value = true;

  window.setTimeout(() => {
    rows.value = rows.value.filter((row) => row._id !== deletingRow.value._id);
    deleting.value = false;
    deleteDialog.value = false;
    snackbarMessage.value = "Equipment berhasil dihapus";
    snackbar.value = true;
  }, 500);
};

const refreshEquipments = () => {
  refreshing.value = true;

  window.setTimeout(() => {
    rows.value = seedEquipments.map((item, index) => ({
      ...item,
      elv: (item.elv + index + 1) % 12,
      slv: (item.slv + index + 2) % 8,
      potential: (item.potential + index + 1) % 5,
    }));
    refreshing.value = false;
    snackbarMessage.value = "Data equipment berhasil diperbarui";
    snackbar.value = true;
  }, 600);
};
</script>

<template>
  <AdminShell>
    <v-container fluid class="pa-6">
      <div
        class="d-flex flex-wrap justify-space-between align-center ga-4 mb-6"
      >
        <div>
          <div class="text-h4 font-weight-bold">Equipment</div>
          <div class="text-soft mt-1">
            Kelola equipment dummy berdasarkan struktur response.
          </div>
        </div>
        <div class="d-flex ga-3">
          <v-btn
            variant="tonal"
            prepend-icon="mdi-refresh"
            :loading="refreshing"
            @click="refreshEquipments"
          >
            Update Tabel
          </v-btn>
          <v-btn color="primary" prepend-icon="mdi-plus" @click="openCreate"
            >Tambah</v-btn
          >
        </div>
      </div>

      <v-card rounded="xl" elevation="0" class="pa-4">
        <div class="equipment-table">
          <v-data-table
            :headers="headers"
            :items="rows"
            :search="search"
            item-value="_id"
            density="compact"
            items-per-page="25"
            show-expand
            class="rounded-xl"
          >
            <template #top>
              <div class="d-flex justify-end pa-4 pb-2">
                <v-text-field
                  v-model="search"
                  label="Cari equipment"
                  prepend-inner-icon="mdi-magnify"
                  hide-details
                  density="compact"
                  max-width="320"
                />
              </div>
            </template>

            <template #item.actions="{ item }">
              <div class="text-no-wrap">
                <v-btn
                  icon="mdi-pencil-outline"
                  variant="text"
                  color="primary"
                  @click="openEdit(item)"
                />
                <v-btn
                  icon="mdi-delete-outline"
                  variant="text"
                  color="error"
                  @click="askDelete(item)"
                />
              </div>
            </template>

            <template #expanded-row="{ columns, item }">
              <tr>
                <td :colspan="columns.length" class="pa-0">
                  <div class="details-grid pa-4">
                    <div
                      v-for="field in detailFields"
                      :key="field"
                      class="detail-item"
                    >
                      <div class="text-caption text-soft">{{ field }}</div>
                      <div class="font-weight-medium">{{ item[field] }}</div>
                    </div>
                  </div>
                </td>
              </tr>
            </template>
          </v-data-table>
        </div>
      </v-card>
    </v-container>

      <v-dialog
        v-model="editDialog"
        max-width="500"
        transition="slide-y-transition"
      >
      <v-card rounded="xl">
        <v-card-title class="pt-6 px-6">{{ dialogTitle }}</v-card-title>
        <v-card-text class="px-6 edit-form-body">
          <v-row dense :class="{ 'create-form-row': !editingId }">
            <v-col v-for="field in editableFields" :key="field" cols="12">
              <v-text-field
                v-model="form[field]"
                :label="field"
                density="compact"
                hide-details
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="px-6 pb-6">
          <v-spacer />
          <v-btn variant="text" @click="editDialog = false">Batal</v-btn>
          <v-btn color="primary" :loading="saving" @click="saveEquipment"
            >Simpan</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialog" max-width="420">
      <v-card rounded="xl">
        <v-card-title class="pt-6 px-6">Hapus equipment?</v-card-title>
        <v-card-text class="px-6">
          Data <strong>{{ deletingRow?.equipment_id }}</strong> akan dihapus
          dari tabel.
        </v-card-text>
        <v-card-actions class="px-6 pb-6">
          <v-spacer />
          <v-btn variant="text" @click="deleteDialog = false">Batal</v-btn>
          <v-btn color="error" :loading="deleting" @click="removeEquipment"
            >Hapus</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="snackbar"
      color="secondary"
      timeout="2200"
      location="top"
    >
      {{ snackbarMessage }}
    </v-snackbar>
  </AdminShell>
</template>

<style scoped>
.equipment-table {
  overflow-x: auto;
}

.equipment-table :deep(table) {
  font-size: 0.78rem;
}

.equipment-table :deep(th),
.equipment-table :deep(td) {
  padding-inline: 10px !important;
  white-space: nowrap;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: 12px 18px;
  background: rgb(var(--v-theme-surface));
  color: rgb(var(--v-theme-on-surface));
  border-top: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.detail-item {
  min-width: 0;
  font-size: 0.78rem;
  word-break: break-word;
}

.detail-item .text-caption {
  font-size: 0.68rem !important;
  opacity: 0.72;
}

.edit-form-body {
  max-height: 70vh;
  overflow-y: auto;
}

.create-form-row {
  max-width: 420px;
  margin-inline: auto;
}
</style>
