import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomCard from "../components/CustomCard";
import CreateModal from "./CreateModal";
import styles from "../styles";
import { useNavigation } from "@react-navigation/native";


const HomeScreen = () => {

  const navigation = useNavigation();

  const [usersWithPosts, setUsersWithPosts] = useState([]); // verilerin tutulması
  const [modalVisible, setModalVisible] = useState(false); 

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // API'dan veri çekimi
    try {
      const usersResponse = await axios.get(
        // users verileri
        "https://jsonplaceholder.typicode.com/users"
      );
      const users = usersResponse.data;
      const usersWithPosts = await Promise.all(
        users.map(async (user) => {
          const postsResponse = await axios.get(
            `https://jsonplaceholder.typicode.com/users/${user.id}/posts` // posts verileri
          );
          const posts = postsResponse.data;

          const randomPhotoId = Math.floor(Math.random() * 5000) + 1;
          const photoResponse = await axios.get(
            `https://jsonplaceholder.typicode.com/photos/${randomPhotoId}` // photo verileri
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
    // kullanıcı silme
    try {
      Alert.alert("Delete User", "Are you sure you want to delete this user?", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            const updatedUsers = usersWithPosts.filter(
              (user) => user.id !== userId
            );

            await AsyncStorage.setItem(
              "usersWithPosts",
              JSON.stringify(updatedUsers)
            );

            setUsersWithPosts(updatedUsers);
          },
          style: "destructive",
        },
      ]);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleUpdate = async (userId, updatedUserData) => {
    // kullanıcı güncelleme
    try {
      const updatedUsers = usersWithPosts.map((user) =>
        user.id === userId ? { ...user, ...updatedUserData } : user
      );

      await AsyncStorage.setItem(
        "usersWithPosts",
        JSON.stringify(updatedUsers)
      ); // storagede guncelleme

      setUsersWithPosts(updatedUsers);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleCreate = (username, post, name, website, email) => {
    const newPost = {
      id: usersWithPosts.length + 1,
      username: username,
      email: email,
      posts: [
        {
          id: usersWithPosts.length + 1,
          title: post,
        },
      ],
      name: name,
      website: website,
      photo: {
        url: "https://via.placeholder.com/150",
      },
    };
  
    setUsersWithPosts([...usersWithPosts, newPost]);
    setModalVisible(false);
  };

  const handleCardPress = (item) => {
    navigation.navigate("DetailScreen", { item, usersWithPosts });
  };

  return (
    <ImageBackground
      source={require("../assets/icon.png")}
      style={styles.backgroundImage}
      resizeMode="repeat"
    >
      <TouchableOpacity
        style={styles.newUserButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.newUserButtonText}>New User/Post</Text>
      </TouchableOpacity>
      <CreateModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleCreate={handleCreate}
      />

<FlatList
  data={usersWithPosts}
  keyExtractor={(user) => user.id.toString()}
  renderItem={({ item }) => (
    <CustomCard
      item={item}
      onPressDelete={handleDelete}
      onPressUpdate={(userId, updatedUserData) =>
        handleUpdate(userId, updatedUserData)
      }
      onPressCard={() => handleCardPress(item)}
      navigation={navigation} 
    />
  )}
/>
    </ImageBackground>
  );
};

export default HomeScreen;
