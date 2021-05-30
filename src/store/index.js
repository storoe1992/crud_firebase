import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users : [],
    userToUpdate: null
  },
  getters: {
    getUserToUpdate: state => {
      return state.userToUpdate;
    },
    getUserById: (state) => (userid) => {
      return state.users.find(user => user.id === userid);
    }
  },
  mutations: {
    addUser(state,user){
      state.users.push(user);
    },
    deleteUser(state,userId){
      try{
      let index = state.users.findIndex( user => user.id === userId );
      state.users.splice(index,1);
      }catch(error){
        alert('Ocurrió un error actualizando la base de datos local')
      }
    },
    updateUser(state,userToUpdate){
      try{
        let user = state.users.find( user => user.id === userToUpdate.id );
        user.update(userToUpdate);
        }catch(error){
          alert('Ocurrió un error actualizando la base de datos local')
        }
    }
  },
  actions: {
    async deleteUser({commit},userId){
      try{
        let db = firebase.firestore();
        await db.collection('usuarios').doc(userId).delete();
        commit('deleteUser',userId);
      }catch(error){
        alert("Ocurrió un error mientras se actualizaba la base de datos firebase")
      }
    },
    async addUser({commit},userToAdd){
      try{
        let db = firebase.firestore();
        const docRef = await db.collection("usuarios").add(JSON.parse( JSON.stringify(userToAdd)));
        userToAdd.id= docRef.id;
        commit('addUser',userToAdd);
        alert('Usuario agregado correctamente')
      }catch(error){
        alert(error);
      }
    },
    async updateUser({commit},userToUpdate){
      try{
        let db = firebase.firestore();
        const docRef = await db.collection("usuarios").doc(userToUpdate.id).set(JSON.parse( JSON.stringify(userToUpdate)));
        commit('updateUser',userToUpdate);
        alert('Usuario actualizado correctamente')
      }catch(error){
        alert(error);
      }
    }
  },
  modules: {
  }
})
