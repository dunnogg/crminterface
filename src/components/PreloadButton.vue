  <template>
    <div class="flex flex-col items-center gap-4">
      <button
          class="btn"
          :class="{ disabled: isDisabled, loading: isLoading }"
          @click="handleClick"
          :disabled="isDisabled || isLoading"
      >
        <span v-if="!isLoading" >{{ isDisabled ? 'Создать' : 'Сохранить' }}</span>
        <span v-else class="loader"></span>
      </button>
    </div>
  </template>

  <script>
  export default {
    props: {
      isDisabled: Boolean,
      isLoading: Boolean,
    },
    methods: {
      handleClick(event) {
        this.$emit('click', event);
      },
    },
  };
  </script>

  <style scoped>
  .btn {
    padding: 10px 20px;
    border: 1px solid #3b82f6;
    border-radius: 2px;
    background-color: #3b82f6;
    color: white;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s, border-color 0.3s;
  }
  .btn:hover {
    background-color: #4a8af6;
  }
  .btn.disabled {
    background-color: #e0e0e0;
    color: black;
    border-color: #dcdcdc;
    cursor: not-allowed;
  }
  .btn.loading {
    background-color: #3b82f6;
    color: white;
    border-color: #3b82f6;
  }
  .btn span {
    font-weight: bold;
  }

  .btn.disabled span {
    font-weight: 600;
  }

  .btn.loading span {
    font-weight: bold;
  }

  .loader {
    border: 2px solid #fff;
    border-top: 2px solid #3b82f6;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    animation: spin 0.8s linear infinite;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  </style>
