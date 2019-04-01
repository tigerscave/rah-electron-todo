'use strict'

const Store = require('electron-store');

class DataStore extends Store {
    constructor(setting) {
        super(setting);

        this.todos = this.get('todos') || [];
        console.log('store')
    }

    saveTodos() {
        this.set('todos', this.todos);
        return this
    }

    getTodos () {
        this.todos = this.get('todos') || []

        return this
    }

    addTodo (todo){
        this.todos = [ ...this.todos, todo ]

        return this.saveTodos()
    }

    deleteTodo (todo) {
        this.todos = this.todos.filter(t => t !== todo )

        return this.saveTodos()
    }

}


module.exports = DataStore;
