

import axios from 'axios';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Listitem from './Listitem';


class App extends Component {

  constructor() {
    super();
    this.state = {
      newTodo: '',
      editing: false,
      editingIndex: null,
      notification: null,

      todos: []

    };

    this.apiUrl = 'https://5b46507b9f3653001445d256.mockapi.io';

    this.alert = this.alert.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
  
    this.handleChange = this.handleChange.bind(this);

  }





  async componentDidMount() {

    const response = await axios.get(`${this.apiUrl}/todosapp`);
    
      console.log(response);

    this.setState({

       todos: response.data

    });

  }


    handleChange(event) {

      this.setState({

        newTodo: event.target.value

      });
      

    }

    

     

     async addTodo() {

      

      const response = await axios.post(`${this.apiUrl}/todosapp`, {

        name: this.state.newTodo

      });

    console.log(response);

      const todos = this.state.todos;

      todos.push(response.date);

      this.setState({

        todos: todos,

        newTodo: ''

      });

      this.alert('Todo added successfully.');


    }

    editTodo(index) {

      const todo = this.state.todos[index];

      this.setState({

        editing: true,

        newTodo: todo.name,

        editingIndex: index

      });

    }


    updateTodo() {

      const todo = this.state.todos[this.state.editingIndex];

      todo.name = this.state.newTodo;




      const todos = this.state.todos;

      todos[this.state.editingIndex] = todo;

      this.setState({ todos, editing: false, editingIndex: null, newTodo: '' });

      this.alert('Todo updated successfully.');

    }

    alert(notification) {

      this.setState({

        notification

      });

      setTimeout(() => {

        this.setState({
          notification: null

        });

      }, 2000);

    }


    deleteTodo(index) {

     const todos = this.state.todos;

     delete todos[index];

     this.setState({ todos });
     this.alert('Todo deleted successfully.');

    }


  render() {

    console.log(this.state.newTodo);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">CRUD REACT</h1>
        </header>
        <div className="container">
        {

          this.state.notification &&

        <div className="alert mt-3 alert-success">
          <p className="text-center">{this.state.notification}</p>

        </div>
      }

        <input type="text" 

        name="todo"

        className="my-4 form-control"

        placeholder="Add a new todo"

        onChange={this.handleChange}

        value={this.state.newTodo}
        />

        <button 

        onClick={this.state.editing ? this.updateTodo : this.addTodo}

        className="btn-success mb-3 form-control"
        
        disabled={this.state.newTodo.length < 5}
        >

        {this.state.editing ? 'Update todo' : 'Add todo'}

        </button>
        {

          !this.state.editing &&


        <ul className="list-group">

        {this.state.todos.map((item, index) => {

          return <Listitem

          key={item.id}

            item={item}

            editTodo={() => { this.editTodo(index); }}

            deleteTodo={() => { this.deleteTodo(index); }}

          />;

          

        })}
          
          </ul>
        }

       </div>
        
      </div>
    );
  }
}

export default App;
