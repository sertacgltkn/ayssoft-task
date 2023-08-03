import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal } from "react-native";
import styles from "../styles";

const CreateModal = ({ modalVisible, setModalVisible, handleCreate }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [post, setPost] = useState("");

  const handleCreatePress = () => {
    handleCreate(username, post, name, website, email);
    setModalVisible(false);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
        <Text style={styles.text}>UserName</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
          <Text style={styles.text}>Email</Text>
          <TextInput style={styles.input}
          placeholder= "Mail"
          value={email}
          onChangeText={(text) => setEmail(text)}
          />
          <Text style={styles.text}>Name</Text>
          <TextInput style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
          />
          <Text style={styles.text}>Website</Text>
          <TextInput style={styles.input}
          placeholder="Website"
          value={website}
          onChangeText={(text) => setWebsite(text)}
          />
          <Text style={styles.text}>Post</Text>
           <TextInput
            style={styles.input}
            placeholder="Post"
            value={post}
            onChangeText={(text) => setPost(text)}
            multiline={true}
            numberOfLines={10}
          />
          <View
          style={styles.buttonsContainer}
          >
          <TouchableOpacity style={[styles.button,styles.createButton]} onPress={handleCreatePress}>
            <Text style={styles.buttonText}>Create</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button,styles.cancelButton]} onPress={() => setModalVisible(false)}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CreateModal;
