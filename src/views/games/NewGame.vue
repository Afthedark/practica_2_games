<template>
  <div>
    <h1>Registrar Nombre</h1>
    <form @submit.prevent="submitForm">
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

      <button type="submit" class="btn btn-primary">Registrar</button>
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "NewGame",
  data() {
    return {
      plataforms: ["PC", "PS4", "XBOX"],
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
        this.errors.category = "La categoria es obligatoria.";
      }

      return Object.keys(this.errors).length === 0;
    },
    getCategories() {
      const vm = this;
      this.axios
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
        this.form = {
          name: "",
          plataform: null,
          category: null,
        };
      }
    },
    save() {
      const vm = this;
      this.axios
        .post(this.baseUrl + "/games", {
          name: vm.form.name,
          platforms: [vm.form.plataform],
          categoryId: vm.form.category,
        })
        .then(function (response) {
          if (response.status == "201") {
            vm.$emit("on-register", response.data);
          }
          vm.itemList = response.data;
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
  },
};
</script>

<style scoped></style>
