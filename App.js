import React from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';

import Header from './components/Header';
import ListItem from './components/ListItem';
import AddItem from './components/AddItem';

class App extends React.Component {

  state = {
    items: [],
    editStatus: false,
    editItemDetail: {},
    checkedItems: []
  }

  componentDidMount() {
    fetch('http://192.168.100.4:3333/api/teams')
      .then(response => response.json())
      .then(teams => this.setState({ items: teams }))
      .catch(err => alert(err))
  }

  deleteItem = id => {
    console.log('delete clicked')
    fetch(`http://192.168.100.4:3333/api/teams/${id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(() => this.setState({
        ...this.state, items: [...this.state.items.filter(item => item.id !== id)]
      }))
      .catch(err => alert(err))

  };

  saveEditItem = editedItem => {
    console.log(editedItem)
    fetch(`http://192.168.100.4:3333/api/teams/${editedItem.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editedItem)
    })
      .then(response => response.json())
      .then(team => this.setState({ ...this.state, editStatus: !this.state.editStatus, items: this.state.items.map(item => item.id === this.state.editItemDetail.id ? team : item) }))
      .catch(err => alert(err))

  };

  handleEditChange = name => {
    this.setState({ ...this.state, editItemDetail: { id: this.state.editItemDetail.id, name } });
  };

  addItem = text => {
    if (!text) {
      Alert.alert(
        'No item entered',
        'Please enter a name',
        [
          {
            text: 'Understood',
            style: 'cancel',
          },
        ],
        { cancelable: true },
      );
    } else {
      fetch('http://192.168.100.4:3333/api/teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: text })
      })
        .then(response => response.json())
        .then(team => this.setState({ ...this.state, items: [...this.state.items, team] }))
        .catch(err => alert(err))
    }
  };

  editItem = (item) => {
    console.log(item)
    this.setState({ ...this.state, editItemDetail: item, editStatus: !this.state.editStatus })
  };

  render() {
    return (
      <View style={styles.container} >
        <Header title="Team List" />
        <AddItem addItem={this.addItem} />
        <FlatList
          data={this.state.items}
          renderItem={({ item }) => (
            <ListItem
              key={item.id}
              item={item}
              deleteItem={this.deleteItem}
              editItem={this.editItem}
              isEditing={this.state.editStatus}
              editItemDetail={this.state.editItemDetail}
              saveEditItem={this.saveEditItem}
              handleEditChange={this.handleEditChange}
            />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;