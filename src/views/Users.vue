<template>
  <div class="home">
    <h1>Lista de usuarios</h1>
    <table>
      <tr>
        <th>Nombre</th>    
        <th>Correo</th>    
        <th></th>    
        <th></th>    
      </tr>
      <tr v-for="user in users" :key="user.id">
        <td v-text="user.name"></td>
        <td v-text="user.email"></td>
        <td><button @click="deleteUser(user.id)">Eliminar</button></td>
        <td><button @click="updateUser(user.id)">Modificar</button></td>
      </tr>
    </table>
  </div>
</template>

<script>
import {mapState,mapMutations, mapActions} from 'vuex'
export default {
  name: 'Usuarios',
  methods: {
    ...mapMutations(['setupUserToUpdate']),
    ...mapActions(['deleteUser']),
    updateUser: function(userid){
      this.$router.push(`/user/${userid}`);
    }
  },
  computed: {
    ...mapState(['users'])
  },
}
</script>

<style lang="scss" scoped>
table{

   width: 100%;
  
   th, td {
      border: 1px solid black;
   }
}
</style>
