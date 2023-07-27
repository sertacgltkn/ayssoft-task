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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C9C9C9",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    margin: 0,
    backgroundColor: "#8C8C8C",
    borderBottomWidth: 1,
    borderBottomColor: "orange",
    borderRadius: 10,
    borderTopStartRadius: 0,
    borderTopEndRadius: 0,
    elevation: 3,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
    marginRight: 15,
    borderWidth: 1,
    borderColor: "#ffffff",
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
    alignItems: "center",
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: "white",
  },
  email: {
    fontSize: 14,
    color: "white",
  },
  city: {
    fontSize: 14,
    color: "white",
  },
  card: {
    backgroundColor: "#8C8C8C",
    borderWidth: 1,
    borderColor: "#898989",
    margin: 15,
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 18,
    color: "orange",
  },
  company: {
    fontSize: 16,
    color: "white",
    margin: 5,
    padding: 5,
  },
  phone: {
    fontSize: 16,
    color: "white",
    marginBottom: 8,
    padding: 5,
    margin: 5,
  },
  website: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    marginBottom: 8,
    borderWidth: 1.5,
    borderColor: "orange",
    borderRadius: 14,
    padding: 10,
    margin: 5,
  },
  postContainer: {
    margin: 8,
    padding: 2,
    borderRadius: 1,
  },
  mailContainer: {
    flex: 1,
    alignItems: "center",
  },
  postHeader: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 0,
    alignSelf: "center",
    padding: 0,
    color: "white",
  },
  postTitle: {
    margin: 5,
    padding: 5,
  },
});

export default DetailScreen;
