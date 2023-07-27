import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import UpdateModal from "../screens/UpdateModal";
import { useNavigation } from "@react-navigation/native";

const CustomCard = ({ item, onPressDelete, onPressUpdate }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const handleUpdate = () => {
    setModalVisible(!modalVisible);
  };

  const handleUpdateUser = (updatedUserData) => {
    onPressUpdate(item.id, updatedUserData);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("DetailScreen", { item })}
      >
        <TouchableOpacity style={styles.mailIconContainer}>
          <MaterialIcons name="mail" size={24} color="orange" />
          <Text style={styles.email}> {item.email}</Text>
        </TouchableOpacity>
        <View style={styles.cardHeader}>
          <View style={styles.photoContainer}>
            <Image source={{ uri: item.photo.url }} style={styles.photo} />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.username}>{item.username}</Text>
          </View>
        </View>
        <FlatList
          data={item.posts}
          keyExtractor={(post) => post.id.toString()}
          renderItem={({ item: post }) => (
            <Text style={styles.postTitle}>{post.title}</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C9C9C9",
  },
  card: {
    margin: 10,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#8C8C8C",
    position: "relative",
  },
  mailIconContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    margin: 9,
    padding: 15,
  },
  email: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    alignItems: "flex-end",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  photoContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#000000",
  },
  photo: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  userInfo: {
    flex: 1,
    flexDirection: "row",
  },
  username: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 8,
  },
  updateButton: {
    backgroundColor: "orange",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    flex: 1,
    marginRight: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  postTitle: {
    color: "white",
    fontSize: 12,
    margin: 5,
    padding: 1,
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    flex: 1,
    marginLeft: 8,
  },
});

export default CustomCard;
