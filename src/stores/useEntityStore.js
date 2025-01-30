import { defineStore } from 'pinia';

export const useEntityStore = defineStore('entityStore', {
    state: () => ({
        entities: JSON.parse(localStorage.getItem('entities')) || [],
    }),
    actions: {
        addEntity(id, name) {
            this.entities.push({ id: id, name });

            localStorage.setItem('entities', JSON.stringify(this.entities));
        },
    },
});
