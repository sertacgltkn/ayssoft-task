import React from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

const DetailScreen = () => {
  const route = useRoute();
  const { item } = route.params;

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
          <MaterialIcons name="mail" size={24} color="#000" />
          <Text style={styles.email}>{item.email}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.nameCompany}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.company}>{item.website}</Text>
        </View>
        <Text style={styles.phone}>Phone : {item.phone}</Text>
        <Text style={styles.website}>Company : {item.company.name}</Text>
      </View>
      
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
    marginRight: 15,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  nameMail: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  nameCompany: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  avatar: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: "#555",
  },
  city: {
    fontSize: 14,
    color: "#555",
  },
  card: {
    backgroundColor: "#fff",
    margin: 15,
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  company: {
    fontSize: 16,
    color: "#8B8588",
    fontWeight: "bold",
    marginBottom: 8,
    borderWidth: 0.1,
    borderColor: "#000000",
    borderRadius: 4,
    padding: 5,
  },
  phone: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
  },
  website: {
    fontSize: 16,
    color: "#555",
    marginBottom: 15,
  },
  postContainer: {
    margin: 5,
    padding: 2,
  },
  mailContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default DetailScreen;
