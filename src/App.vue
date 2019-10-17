<template>
<div >
    <header class="header">
      <h1>Vue CRUD Vuex</h1>
      <input autofocus autocomplete="off" placeholder="Write up sth" @keyup.enter="addTodo">
    </header>
    <div  v-show="loadItems.length" >
      <ul>
        <li v-for="(item, index) in loadItems" :key="index" > 
          <span @dblclick="enterEditing(index)" v-if="!editing || newIndex !== index">{{item.text}}</span>
          <input v-show="editing" v-if="newIndex === index" focus="editing" :value="item.text" @keyup.enter="updateItem" @keyup.esc="editing = false">
          <span @click="deleteItem(index)"> &nbsp; &nbsp; &nbsp; &nbsp;X </span></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      editing: false,
      newIndex: null
    }
  },
  computed: {
    loadItems () {
      return this.$store.state.Items
    }
  },
  methods: {
    addTodo (e) {
      const text = e.target.value
      if (text.trim()) {
        this.$store.dispatch('createItem', {text: text})
      }
      e.target.value = ''
    },
    updateItem(e) {
        const newValue = e.target.value.trim()
        this.$store.dispatch('updateItem', {index: this.newIndex, text: newValue}).then(() => {
          this.editing = false
          this.newIndex = null
          this.loadItems
        })
    },
    deleteItem(index) {
      this.$store.dispatch('deleteItem', index).then(() => {
        this.loadItems
      })
    },
    enterEditing(index) {
      this.editing = true
      this.newIndex = index
    }
  }
}
</script>