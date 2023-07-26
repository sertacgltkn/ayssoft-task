import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UpdateModal from "./UpdateModal";
import { useNavigation } from "@react-navigation/native";


const CustomCard = ({ item, onPressDelete, onPressUpdate }) => {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);

  const handleUpdate = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <TouchableOpacity style={styles.card}
    onPress={() => navigation.navigate("DetailScreen", { item })}>
      <TouchableOpacity style={styles.mailIconContainer}>
        <MaterialIcons name="mail" size={24} color="#000" />
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
      {/* Rendering postssssssssss */}
      <FlatList
        data={item.posts}
        keyExtractor={(post) => post.id.toString()}
        renderItem={({ item: post }) => (
          <Text style={styles.postTitle}>{post.title}</Text>
        )}
      />

      <View style={styles.buttonsContainer}>
        {/* Deleteeeeeee */}
        <TouchableOpacity onPress={handleUpdate} style={styles.updateButton}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onPressDelete(item.id)}
          style={styles.deleteButton}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
        <UpdateModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        item={item}
        handleInputChange={handleUpdate}
      />
      </View>

    </TouchableOpacity>
  );
};

const HomeScreen = () => {
  const [usersWithPosts, setUsersWithPosts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const usersResponse = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      const users = usersResponse.data;
      const usersWithPosts = await Promise.all(
        users.map(async (user) => {
          const postsResponse = await axios.get(
            `https://jsonplaceholder.typicode.com/users/${user.id}/posts`
          );
          const posts = postsResponse.data;

          const randomPhotoId = Math.floor(Math.random() * 5000) + 1;
          const photoResponse = await axios.get(
            `https://jsonplaceholder.typicode.com/photos/${randomPhotoId}`
          );
          const photo = photoResponse.data;
          return { ...user, posts, photo, users: users };
        })
      );
      setUsersWithPosts(usersWithPosts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const updatedUsers = usersWithPosts.filter((user) => user.id !== userId);

      await AsyncStorage.setItem(
        "usersWithPosts",
        JSON.stringify(updatedUsers)
      );

      setUsersWithPosts(updatedUsers);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <View>
      <FlatList
        data={usersWithPosts}
        keyExtractor={(user) => user.id.toString()}
        renderItem={({ item }) => (
          <CustomCard
            item={item}
            onPressDelete={handleDelete}
            onPressUpdate={() => {}}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#ffff",
    position: "relative",
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
  email: {
    color: "#888",
    fontSize: 12,
    fontWeight: "bold",
    alignItems: "flex-end",
  },
  photo: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 8,
  },
  text: {
    margin: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    flex: 1,
    marginLeft: 8,
  },
  updateButton: {
    backgroundColor: "#DCBF69",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    flex: 1,
    marginRight: 8,
  },
  userInfo: {
    flex: 1,
    flexDirection: "row",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  postTitle: {
    color: "#888",
    fontSize: 12,
    margin: 1,
    padding: 1,
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
 
});

export default HomeScreen;
