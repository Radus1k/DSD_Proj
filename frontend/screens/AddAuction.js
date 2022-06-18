import { useNavigation } from '@react-navigation/core'
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput } from 'react-native'
import { auth } from '../firebase';


const AddAuction = () => {
  const navigation = useNavigation()

  const [text, setText] = useState('');


  handleSendData

  const handleSendData = () => {
    console.log("sending...");
    fetch('http://localhost:3000/api/auctions/', {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    // body: JSON.stringify({
    //     name: 'Mercesdes Benz',
    //     price: 3000,
    //     expires: '2025-09-09'
    // })
    })
    .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Something went wrong on API server!');
        }
      })
      .then(response => {
        console.debug(response);
        // ...
      }).catch(error => {
        console.error(error);
      });
  };

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

  return (
    <View style={styles.container}>
       <View style={{padding: 10}}>
      <TextInput
        style={styles.input}
        placeholder="Add auction name..."
        onChangeText={newText => setText(newText)}
        
      />
      <TextInput
        s style={styles.input}
        placeholder="Add auction price..."
         onChangeText={newText => setText(newText)}
      />  
      <TextInput
         style={styles.input}
        placeholder="Add auction expiring date..."
        onChangeText={newText => setText(newText)}
      />
    </View> 

      {/* <Image source={require('../assets/dreamcar.jpg')} style={styles.imageStyle} /> */}
      <TouchableOpacity
        onPress={handleSendData}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Add Auction</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>

  )
}

export default AddAuction

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34568B',
    justifyContent: 'center',
    alignItems: 'center'
  },
   button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  imageStyle: {
    position: 'absolute',
    right: 100,
    top: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
  },
})
