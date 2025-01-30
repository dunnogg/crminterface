<script setup>
import { ref, defineEmits } from 'vue';
const emit = defineEmits(['update:selectedItem']);

const items = [
  { key: 'none', value: 'Не выбрано' },
  { key: 'leads', value: 'Сделка' },
  { key: 'contacts', value: 'Контакт' },
  { key: 'companies', value: 'Компания' }
];

const selectedItem = ref(items[0]);
const isOpen = ref(false);

const selectItem = (item) => {
  selectedItem.value = item;
  emit('update:selectedItem', item);
  isOpen.value = false;
};
</script>

<template>
  <div class="dropdown-container">
    <button class="dropdown-button" @click="isOpen = !isOpen">
      {{ selectedItem.value }}
      <span class="dropdown-arrow">▼</span>
    </button>

    <ul v-if="isOpen" class="dropdown-menu">
      <li
          v-for="item in items"
          :key="item.key"
          @click="selectItem(item)"
          :class="['dropdown-item', selectedItem.key === item.key ? 'selected' : '']"
      >
        <span v-if="selectedItem.key === item.key" class="checkmark">✔</span>
        {{ item.value }}
      </li>
    </ul>
  </div>
</template>

<style>
.dropdown-container {
  position: relative;
  width: 250px;
  font-family: Arial, sans-serif;
}

.dropdown-button {
  width: 100%;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 2px;
  text-align: left;
  font-size: 14px;
  cursor: pointer;
  position: relative;
}

.dropdown-button:hover {
  border-color: #888;
}

.dropdown-arrow {
  float: right;
  font-size: 12px;
  color: #666;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  margin: 5px 0;
  padding: 0;
  list-style: none;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.dropdown-item {
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  color: black;
  align-items: center;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
}

.checkmark {
  margin-right: 10px;
  color: #007bff;
}


</style>
