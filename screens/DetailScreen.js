import React from "react";
import { View, Text, FlatList, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "../styles";

const DetailScreen = () => {
  const route = useRoute();  
  const { item } = route.params; // item is the user object

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.userInfo}>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.city}>{item.address.city}</Text>
        </View>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: item.photo.url }} style={styles.avatar} />
        </View>
        <View style={styles.mailContainer}>
          <MaterialIcons name="mail" size={24} color="orange" />
          <Text style={styles.email}>{item.email}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.nameCompany}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.website}>{item.website}</Text>
        </View>
        <Text style={styles.phone}>
          {" "}
          <MaterialIcons name="phone" size={24} color="orange" /> {item.phone}
        </Text>
        <Text style={styles.company}>
          {" "}
          <MaterialIcons name="business" size={24} color="orange" />{" "}
          {item.company.name}
        </Text>
      </View>
      <Text style={styles.postHeader}>POSTS</Text>
      <FlatList
        data={item.posts}
        keyExtractor={(post) => post.id.toString()}
        renderItem={({ item: post }) => (
          <View style={styles.postContainer}>
            <Text style={styles.postTitle}> - {post.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default DetailScreen;
