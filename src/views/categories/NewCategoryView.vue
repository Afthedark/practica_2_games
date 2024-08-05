<template>
    <div>
        <h1>Registrar Categoria</h1>
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="name">Nombre:</label>
                <input type="text" id="name" v-model="form.name" :class="{ 'is-invalid': errors.name }"
                    placeholder="Ingrese el nombre" />
                <div v-if="errors.name" class="invalid-feedback">{{ errors.name }}</div>
            </div>

            <button type="submit" class="btn btn-primary">Registrar</button>
        </form>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
    name: 'NewCategoryView',
    data() {
        return {
            clienteList: [],
            form: {
                name: '',
            },
            errors: {}
        };
    },
    methods: {
        ...mapActions(['increment']),
        validateForm() {
            this.errors = {};

            if (!this.form.name) {
                this.errors.name = 'El nombre es obligatorio.';
            }

            return Object.keys(this.errors).length === 0;
        },

        submitForm() {
            console.log("submitForm");
            if (this.validateForm()) {
                // Enviar los datos al servidor
                this.save();
                // Reiniciar el formulario
                this.form = {
                    name: '',
                };
            }
        },
        save() {
            const vm = this;
            this.axios.post("http://localhost:4000" + "/categories", this.form)
                .then(function (response) {
                    if (response.status == '201') {
                        vm.$emit('on-register', response.data);
                    }
                    vm.itemList = response.data;
                })
                .catch(function (error) {
                    console.error(error);
                });
        },
    },
    computed: {
        // propiedades computadas que dependen de otras propiedades reactivas
        ...mapState(['count']),
        ...mapGetters(['doubleCount', 'getBaseUrl']),
        baseUrl() {
            return this.getBaseUrl
        }
    },
}
</script>

<style scoped></style>