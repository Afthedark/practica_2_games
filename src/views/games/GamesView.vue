<template>
  <div class="">

    <div class="row justify-content-start">
      <div class="col-md-2">
        <button class="btn btn-primary" @click="showModalNuevo = true">Agregar Juegos</button>
        <button @click="buscar()" class="btn btn-lith" style="float:right">Buscar</button>
        <input type="search" style="float:right" v-model="textToSearch" @search="buscar()">
      </div>
    </div>
  
    <Modal v-model:modelValue="showModalEdit">
      <EditGame @on-update="onUpdate($event)" :item="itemToEdit" />
    </Modal>

    <Modal v-model:modelValue="showModalNuevo">
      <NewGame @on-register="onRegister($event)" />
    </Modal>
  </div>

  <div class="">
    <br>
    <table class="table table-dark table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Plataforma</th>
          <th scope="col">Categoria</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in games" :key="index">
          <td scope="row">{{ index + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.platforms.join(", ") }}</td>
          <td>{{ item.category.name }}</td>
          <td><button @click="edit(item)" class="btn btn-dark" style="margin-right: 15px;">Editar</button>
            <button @click="eliminar(item.id)" class="btn btn-danger">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Modal from '../../components/Modal.vue'
import EditGame from './EditGame.vue';
import NewGame from './NewGame.vue';

export default {
  name: "JuegosView",
  data() {
    return {
      showModalNuevo: false,
      showModalEdit: false,
      itemToEdit: null,
      textToSearch: '',
      games: []
    }
  },
  components: {
    Modal,
    EditGame,
    NewGame
  },
  methods: {
    ...mapActions(['increment']),
    getGames() {
      const vm = this;
      this.axios.get("http://localhost:4000/games?_expand=category&q=" + this.textToSearch)
        .then(function (response) {
          vm.games = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    edit(item) {
      this.itemToEdit = Object.assign({}, item);
      this.showModalEdit = true;
    },
    buscar() {
            this.getGames();
        },
    eliminar(id) {
      if (confirm("¿Esta Seguro de eliminar el registro?")) {
        const vm = this;
        this.axios.delete(this.baseUrl + "/games/" + id)
          .then(function (response) {
            vm.getGames();
            vm.$toast.show("Registro eliminado.", "danger");
          })
          .catch(function (error) {
            console.error(error);
          });
      }

    },
    onRegister(event) {
      this.getGames();
      this.showModalNuevo = false;
      this.$toast.show('Registro exitoso', 'success');
    },
    onUpdate(event) {
      this.getGames();
      this.showModalEdit = false;
      this.itemToEdit = null;
      this.$toast.show('Edicion exitosa', 'info');
    },
    showToast(message, type) {
      this.$toast.show(message, type);
    }
  },
  computed: {
    // propiedades computadas que dependen de otras propiedades reactivas
    ...mapState(['count']),
    ...mapGetters(['doubleCount', 'getBaseUrl']),
    baseUrl() {
      return this.getBaseUrl
    }
  },
  props: {
    // propiedades que el componente puede recibir.
  },
  mounted() {
    this.getGames();
  },
}

</script>
