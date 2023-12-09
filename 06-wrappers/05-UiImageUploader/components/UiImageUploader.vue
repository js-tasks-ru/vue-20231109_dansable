<template>
  <div v-if="errorMessage" class="error">{{ errorMessage }}
  </div>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{
        'image-uploader__preview-loading': loading
      }"
      :style="previewStyle"
    >
      <span class="image-uploader__text">{{ labelText }}</span>
      <input
        @change="fileChange"
        @click="removeImage"
        v-bind="$attrs"
        type="file"
        accept="image/*"
        class="image-uploader__input"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',

  inheritAttrs: false,

  props: {
    preview: {
      type: String,
    },

    uploader: {
      type: Function,
    },
  },

  emits: {
    select: null,
    upload: null,
    error: null,
    remove: null,
  },

  data() {
    return {
      previewUrl: this.preview,
      loading: false,
      errorMessage: null,
    }
  },

  computed: {
    previewStyle() {
      return this.previewUrl ? `--bg-url: url('${this.previewUrl}')` : '';
    },
    labelText() {
      if (this.loading) {
        return "Загрузка...";
      }

      return this.previewUrl ? 'Удалить изображение' : 'Загрузить изображение';
    }
  },

  methods: {
    async fileChange(e) {
      const fileInput = e.target;
      const file = fileInput.files[0];

      this.errorMessage = null;

      if (!file) {
        return;
      }

      if (!file.type.startsWith('image/')) {
        this.errorMessage = 'Invalid file type. Please select an image.';
        return;
      }

      this.$emit('select', file);

      this.previewUrl = URL.createObjectURL(file);

      if (this.uploader) {
        this.loading = true;

        try {
          const response = await this.uploader(file);

          this.$emit('upload', response);
        } catch (error) {
          this.reset(fileInput);

          this.$emit('error', error);
          this.errorMessage = error.message;
        } finally {
          this.loading = false;
        }
      }
    },
    removeImage(e) {
      if (this.loading) {
        e.preventDefault();
        return;
      }

      if (!this.previewUrl) {
        return;
      }

      e.preventDefault();

      this.errorMessage = null;

      const fileInput = e.target;

      this.reset(fileInput);

      this.$emit('remove');
    },
    reset(fileInput) {
      this.resetState();
      this.clearFileInput(fileInput);
    },
    resetState() {
      this.previewUrl = null;
    },
    clearFileInput(fileInput) {
      fileInput.value = null;
      fileInput.files = null;
    }
  }
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
