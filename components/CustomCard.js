import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import UpdateModal from "../screens/UpdateModal";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles";

const CustomCard = ({ item, onPressDelete, onPressUpdate }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const handleUpdate = () => { // update modal
    setModalVisible(!modalVisible);
  };

  const handleUpdateUser = (updatedUserData) => { // update user
    onPressUpdate(item.id, updatedUserData);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.mainCard}
        onPress={() => navigation.navigate("DetailScreen", { item })}
      >
        <TouchableOpacity style={styles.mailIconContainer}>
          <MaterialIcons name="mail" size={24} color="orange" />
          <Text style={styles.mainEmail}> {item.email}</Text>
        </TouchableOpacity>
        <View style={styles.cardHeader}>
          <View style={styles.photoContainer}>
            <Image source={{ uri: item.photo.url }} style={styles.photo} />
          </View>
          <View style={styles.mainUserInfo}>
            <Text style={styles.username}>{item.username}</Text>
          </View>
        </View>
        <FlatList
          data={item.posts}
          keyExtractor={(post) => post.id.toString()}
          renderItem={({ item: post }) => (
            <Text style={styles.postsTitle}>{post.title}</Text>
          )}
        />

        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={handleUpdate} style={styles.updateButton}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onPressDelete(item.id)}
            style={styles.deleteButton}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
        <UpdateModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          item={item}
          handleInputChange={handleUpdate}
          handleUpdateUser={handleUpdateUser}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CustomCard;
