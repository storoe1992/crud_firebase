<template>
  <div class="user">
      <h2>Usuario</h2>
      <input v-model="name" placeholder="Nombre"/>
      <input v-model="email" placeholder="Correo"/>
      <button @click="add" placeholder="Correo" v-if="buttonAction">Agregar</button>
      <button @click="update" placeholder="Correo" v-if="!buttonAction">Modificar</button>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import User from '../classes/User'
export default {
  name: 'User',
  props: {
    userid : {
      type: String,
      require: false,
      default: ''
    }
  },
  data() {
    return {
      name: '',
      email: ''
    }
  },
  methods: {
    ...mapActions(['addUser','updateUser']),
    add(){
      try{
          this.validateData();
          let userToAdd = new User(null,this.email,this.name);
          this.addUser(userToAdd);
      }catch(error){
        alert(error);
      }
    },
    update(){
      try{
        this.validateData();
        let userToUpdate = new User(this.userid,this.email,this.name);
        this.updateUser(userToUpdate);
      }catch(error){
        alert(error);
      }
    },
    validateData(){
        if(this.name.trim() === '' || this.email.trim() === '')
            throw 'Debe especificar todos los datos'
    }
  },
  beforeRouteEnter(to,from,next){
    next( vm => {
      let userid = vm._props.userid;
      if(userid!=""){
        try{
        let userToUpdate = vm.$store.getters.getUserById(userid);
        if(userToUpdate){
          vm.name = userToUpdate.name;
          vm.email = userToUpdate.email;
        }
        }catch(error){
          alert(error)
        }
      }
    });
  },
  computed: {
    buttonAction() {
      console.log('imprimiendo propiedad userid')
      console.log(this.userid);
      return this.userid === '';
    }
  },

}
</script>


<style lang='scss' scoped>
.user{
  display: flex;
  align-items: center;
  justify-content: center;

  h2,input {
    margin-right: 10px;
  }

  
}
</style>

