import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

const ListItem = ({
  item,
  deleteItem,
  editItem,
  isEditing,
  editItemDetail,
  saveEditItem,
  handleEditChange,
}) => {

  console.log(item)

  return (
    <TouchableOpacity style={styles.listItem}>
      <View style={styles.listItemView}>
        {isEditing && editItemDetail.id === item.id ? (
          <TextInput
            placeholder="Edit Item..."
            style={styles.editItemInput}
            onChangeText={handleEditChange}
            value={editItemDetail.name}
          />
        ) : (
          <Text
            style={styles.listItemText}>
            {item.name}
          </Text>
        )}
        <View style={styles.iconView}>
          {isEditing && editItemDetail.id === item.id ? (
            <Icon
              name="check"
              size={20}
              color="black"
              onPress={() => saveEditItem(editItemDetail)}
            />
          ) : (
            (
              <Icon
                name="edit"
                size={20}
                color="black"
                onPress={() => editItem(item)}
              />
            )
          )}
          <Icon
            name="close"
            size={20}
            color="black"
            onPress={() => deleteItem(item.id)}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  listItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItemText: {
    fontSize: 18,
  },
  iconView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 70,
  },
  editItemInput: {
    padding: 0,
    fontSize: 18,
  },
});

export default ListItem;