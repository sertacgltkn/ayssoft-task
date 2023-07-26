import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";

const UpdateModal = ({
  modalVisible,
  setModalVisible,
  item,
  handleInputChange,
}) => {
  return (
    <Modal visible={modalVisible} transparent animationType="slide">
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <View style={styles.modalContent}>
        <Text style={styles.text}>Update User Information</Text>
        <View>
          <Text>Name:</Text>
          <TextInput
            style={styles.input}
            value={item.name}
            onChangeText={(text) => handleInputChange(text, "name")}
          />
        </View>
        <View>
          <Text>Email:</Text>
          <TextInput
            style={styles.input}
            value={item.email}
            onChangeText={(text) => handleInputChange(text, "email")}
          />
        </View>
        <View>
          <Text>Username:</Text>
          <TextInput
            style={styles.input}
            value={item.username}
            onChangeText={(text) => handleInputChange(text, "username")}
          />
        </View>
        <View>
          <Text>Phone:</Text>
          <TextInput
            style={styles.input}
            value={item.phone}
            onChangeText={(text) => handleInputChange(text, "phone")}
          />
        </View>
        <View>
          <Text>Website:</Text>
          <TextInput
            style={styles.input}
            value={item.website}
            onChangeText={(text) => handleInputChange(text, "website")}
          />
        </View>
        <View>
          <Text>Company:</Text>
          <TextInput
            style={styles.input}
            value={item.company.name}
            onChangeText={(text) => handleInputChange(text, "company")}
          />
        </View>
        <View>
          <Text>City:</Text>
          <TextInput
            style={styles.input}
            value={item.address.city}
            onChangeText={(text) => handleInputChange(text, "city")}
          />
        </View>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setModalVisible(false)}
        >
          <Text style={styles.buttonText}>Close Modal</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "#ffff",
  },
  modalContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 16,
  },
  text: {
    margin: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    alignSelf: "flex-end",
    margin: 16,
    backgroundColor: "#dc3545",
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  input: {
    margin: 5,
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 4,
    padding: 7,
  },
});

export default UpdateModal;
