<script setup>
import Dropdown from "@/components/Dropdown.vue";
import {computed, ref} from "vue";
import PreloadButton from "@/components/PreloadButton.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import {useEntityStore} from "@/stores/useEntityStore.js";
import {useAuthStore} from "@/stores/useAuthStore.js";


const selectedItem = ref({ key: 'none', value: 'Не выбрано' });
const isLoading = ref(false)
const store = useEntityStore()
const onItemSelected = (item) => {
  selectedItem.value = item;
};

const isPreloadDisabled = computed(() => selectedItem.value.value === "Не выбрано");
const addEntity = async () => {
  if (!selectedItem.value || selectedItem.value.value === "Не выбрано") return;
  isLoading.value = true;
  const authStore = useAuthStore();
  await authStore.authenticate();

  try {
    const createResponse = await fetch(`${import.meta.env.VITE_API_URL}/createentity`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        baseDomain: authStore.baseDomain,
        accessToken: authStore.accessToken,
        entityType: selectedItem.value.key,
        leadData: {}
      })
    });

    const createData = await createResponse.json();

    store.addEntity(createData['_embedded'][selectedItem.value.key][0].id, selectedItem.value.value);
  } catch (error) {
    console.error("Ошибка при создании сущности:", error);
  } finally {
    isLoading.value = false;
  }
};


</script>

<template>
  <header>
    <div class="wrapper">
      <Dropdown @update:selectedItem="onItemSelected" class="Dropdown"/>
      <PreloadButton :is-disabled="isPreloadDisabled" @click.stop="addEntity" :is-loading="isLoading"></PreloadButton>
    </div>
  </header>

  <main>
    <DataTable :value="store.entities" class="custom-table">
      <Column field="id" header="ID"></Column>
      <Column field="name" header="Название"></Column>
    </DataTable>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.Dropdown {
  margin: 0 5px 5px 0;
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

::v-deep(.p-datatable-table) {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
}

::v-deep(.p-datatable-header) {
  background: #3b82f6;
  color: white;
  text-align: left;
  font-weight: bold;
  padding: 12px;
}

::v-deep(.p-datatable-thead th) {
  background: #3b82f6;
  color: white;
  padding: 12px;
}

::v-deep(.p-datatable-tbody tr) {
  transition: background 0.3s;
}

::v-deep(.p-datatable-tbody tr:nth-child(odd)) {
  background: #f9f9f9;
}

::v-deep(.p-datatable-tbody td) {
  padding-left: 12px;
  color: #333;
}


::v-deep(.p-datatable-tbody tr:hover) {
  background: #f1f1f1;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }


  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>