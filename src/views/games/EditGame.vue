<template>
  <div>
    <h1>Editar Categoría</h1>
    <form @submit.prevent="submitForm" v-if="form">
      <div class="form-group">
        <label for="name">Nombre:</label>
        <input
          type="text"
          id="name"
          v-model="form.name"
          :class="{ 'is-invalid': errors.name }"
          placeholder="Ingrese el nombre"
        />
        <div v-if="errors.name" class="invalid-feedback">{{ errors.name }}</div>
      </div>

      <div class="form-group">
        <label for="plataform">Plataforma:</label>
        <select
          id="plataform"
          v-model="form.plataform"
          :class="{ 'is-invalid': errors.plataform }"
        >
          <option
            v-for="plataform in plataforms"
            :key="plataform"
            :value="plataform"
          >
            {{ plataform }}
          </option>
        </select>
        <div v-if="errors.plataform" class="invalid-feedback">
          {{ errors.plataform }}
        </div>
      </div>

      <div class="form-group">
        <label for="category">Categoría:</label>
        <select
          id="category"
          v-model="form.category"
          :class="{ 'is-invalid': errors.category }"
        >
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
        <div v-if="errors.category" class="invalid-feedback">
          {{ errors.category }}
        </div>
      </div>

      <button type="submit" class="btn btn-primary">Actualizar</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "EditCategoryView",
  props: ["item"],
  data() {
    return {
      plataforms: ["PC", "PS4", "Nintendo Switch", "Xbox One"],
      form: {
        name: "",
        plataform: null,
        category: null,
      },
      errors: {},
      categories: [],
    };
  },
  methods: {
    validateForm() {
      this.errors = {};

      if (!this.form.name) {
        this.errors.name = "El nombre es obligatorio.";
      }

      if (!this.form.plataform) {
        this.errors.plataform = "La plataforma es obligatoria.";
      }

      if (!this.form.category) {
        this.errors.category = "La categoría es obligatoria.";
      }

      return Object.keys(this.errors).length === 0;
    },
    getCategories() {
      const vm = this;
      axios
        .get(this.baseUrl + "/categories")
        .then(function (response) {
          vm.categories = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    submitForm() {
      if (this.validateForm()) {
        this.save();
      }
    },
    save() {
      const vm = this;
      axios
        .patch(this.baseUrl + `/games/${this.item.id}`, {
          name: vm.form.name,
          platforms: [vm.form.plataform],
          categoryId: vm.form.category,
        })
        .then(function (response) {
          if (response.status == "200") {
            vm.$emit("on-update", response.data);
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    },
  },
  computed: {
    ...mapGetters(["getBaseUrl"]),
    baseUrl() {
      return this.getBaseUrl;
    },
  },
  mounted() {
    this.getCategories();
    this.initializeForm();
  },
  watch: {
    item: {
      handler() {
        this.initializeForm();
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions(["increment"]),
    validateForm() {
      this.errors = {};

      if (!this.form.name) {
        this.errors.name = "El nombre es obligatorio.";
      }

      if (!this.form.plataform) {
        this.errors.plataform = "La plataforma es obligatoria.";
      }

      if (!this.form.category) {
        this.errors.category = "La categoría es obligatoria.";
      }

      return Object.keys(this.errors).length === 0;
    },
    getCategories() {
      const vm = this;
      axios
        .get(this.baseUrl + "/categories")
        .then(function (response) {
          vm.categories = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    initializeForm() {
      this.form = {
        name: this.item.name || "",
        plataform: this.item.platforms ? this.item.platforms[0] : null,
        category: this.item.categoryId || null,
      };
    },
    submitForm() {
      if (this.validateForm()) {
        this.save();
      }
    },
    save() {
      const vm = this;
      axios
        .patch(this.baseUrl + "/games/" + this.item.id, {
          name: vm.form.name,
          platforms: [vm.form.plataform],
          categoryId: vm.form.category,
        })
        .then(function (response) {
          if (response.status == "200") {
            vm.$emit("on-update", response.data);
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    },
  },
};
</script>

<style scoped></style>
