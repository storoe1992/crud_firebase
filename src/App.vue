<template>
  <div id="app">
    <div id="nav">
      <router-link to="/list">Usuarios</router-link> |
      <router-link to="/user">Usuario</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>

import firebase from 'firebase'
import User from './classes/User'
import {mapMutations} from 'vuex'

export default {
  name : 'App',
  methods: {
    ...mapMutations(['addUser'])
  },
  created(){
    try{
    let db = firebase.firestore();
    db.collection("usuarios").get().then((query) => {
      query.forEach(user => {
          const userMapped = new User(user.id,user.data().email,user.data().name);
          this.addUser(userMapped);
      });
    });
    }catch(error){
      alert("Error cargando base de datos firebase")
    }
  }
}
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-active {
      color: #42b983;
    }
  }
}
</style>
