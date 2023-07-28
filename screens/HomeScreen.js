import React, { useEffect, useState } from "react";
import { View, FlatList, Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomCard from "../components/CustomCard";

const HomeScreen = () => {
  const [usersWithPosts, setUsersWithPosts] = useState([]);  // verilerin tutulması

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {  // API'dan veri çekimi
    try {
      const usersResponse = await axios.get(   // users verileri
        "https://jsonplaceholder.typicode.com/users"
      );
      const users = usersResponse.data;
      const usersWithPosts = await Promise.all(
        users.map(async (user) => {
          const postsResponse = await axios.get(
            `https://jsonplaceholder.typicode.com/users/${user.id}/posts`   // posts verileri
          );
          const posts = postsResponse.data;

          const randomPhotoId = Math.floor(Math.random() * 5000) + 1;
          const photoResponse = await axios.get(
            `https://jsonplaceholder.typicode.com/photos/${randomPhotoId}`  // photo verileri
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

  const handleDelete = async (userId) => {  // kullanıcı silme
    try {
      Alert.alert(
        "Delete User",
        "Are you sure you want to delete this user?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Delete",
            onPress: async () => {    // silinen kullanıcıları storageden çıkar
              const updatedUsers = usersWithPosts.filter((user) => user.id !== userId);

              await AsyncStorage.setItem(
                "usersWithPosts",
                JSON.stringify(updatedUsers)
              );

              setUsersWithPosts(updatedUsers);
            },
            style: "destructive",
          },
        ]
      );
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleUpdate = async (userId, updatedUserData) => {  // kullanıcı güncelleme
    try {
      const updatedUsers = usersWithPosts.map((user) =>
        user.id === userId ? { ...user, ...updatedUserData } : user
      );
  
      await AsyncStorage.setItem("usersWithPosts", JSON.stringify(updatedUsers));  // storagede guncelleme
  
      setUsersWithPosts(updatedUsers);
    } catch (error) {
      console.error("Error updating user:", error);
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
            onPressUpdate={(userId, updatedUserData) => handleUpdate(userId, updatedUserData)}
          />
        )}
      />
    </View>
  );
};

export default HomeScreen;
