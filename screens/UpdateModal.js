import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";

const UpdateModal = ({
  modalVisible,
  setModalVisible,
  item,
  handleUpdateUser,
}) => {
  const [updatedUser, setUpdatedUser] = useState(item);
  const [inputError, setInputError] = useState("");

  const handleInputChange = (text, field) => {
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [field]: text,
    }));
  };

  const handleUpdate = () => {
    if (validateInputs()) {
      handleUpdateUser(updatedUser);
      setModalVisible(false);
    }
  };

  const validateInputs = () => {
    // FORM VALIDATION
    if (
      updatedUser.name.trim() === "" ||
      updatedUser.email.trim() === "" ||
      updatedUser.username.trim() === ""
    ) {
      setInputError("Please fill in all required fields.");
      return false;
    }
    setInputError("");
    return true;
  };

  const screenHeight = Dimensions.get("window").height;
  const modalHeight = screenHeight - 200;

  return (
    <ScrollView>
      <Modal visible={modalVisible} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View
          style={[
            styles.modalContent,
            { top: (screenHeight - modalHeight) / 2, alignItems: "center" },
          ]}
        >
          <Text style={[styles.text, styles.headerText]}>Update User</Text>

          <View>
            <Text style={styles.text}>Name</Text>
            <TextInput
              style={styles.input}
              value={updatedUser.name}
              onChangeText={(text) => handleInputChange(text, "name")}
            />
          </View>
          <View>
            <Text style={styles.text}>Email</Text>
            <TextInput
              style={styles.input}
              value={updatedUser.email}
              onChangeText={(text) => handleInputChange(text, "email")}
            />
          </View>
          <View>
            <Text style={styles.text}>Username</Text>
            <TextInput
              style={styles.input}
              value={updatedUser.username}
              onChangeText={(text) => handleInputChange(text, "username")}
            />
          </View>
          <View>
            <Text style={styles.text}>Phone</Text>
            <TextInput
              style={styles.input}
              value={updatedUser.phone}
              onChangeText={(text) => handleInputChange(text, "phone")}
            />
          </View>
          <View>
            <Text style={styles.text}>Website</Text>
            <TextInput
              style={styles.input}
              value={updatedUser.website}
              onChangeText={(text) => handleInputChange(text, "website")}
            />
          </View>
          <View>
            <Text style={styles.text}>Company</Text>
            <TextInput
              style={styles.input}
              value={updatedUser.company.name}
              onChangeText={(text) => handleInputChange(text, "company")}
            />
          </View>
          <View>
            <Text style={styles.text}>City</Text>
            <TextInput
              style={styles.input}
              value={updatedUser.address.city}
              onChangeText={(text) => handleInputChange(text, "city")}
            />
          </View>

          {inputError ? (
            <Text style={styles.errorText}>{inputError}</Text>
          ) : null}

          {/* Save and Close BUTTON */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleUpdate}
            >
              <Text style={{ color: "white" }}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.closeButton]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ color: "white" }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    alignSelf: "auto",
    justifyContent: "center",
    backgroundColor: "#8C8C8C",
    margin: 20,
    padding: 10,
    borderWidth: 3,
    borderColor: "white",
    borderRadius: 15,
    elevation: 20,
  },
  text: {
    margin: 5,
    fontWeight: "bold",
    color: "orange",
  },
  headerText: {
    fontSize: 18,
    alignSelf: "center",
  },
  errorText: {
    color: "red",
    marginVertical: 5,
    fontSize: 14,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 5,
    marginTop: 15,
  },
  button: {
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 100,
  },
  closeButton: {
    backgroundColor: "#dc3545",
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: "#007bff",
  },
  input: {
    margin: 5,
    fontSize: 13,
    borderWidth: 1,
    borderColor: "#C9C9C9",
    color: "white",
    borderRadius: 14,
    padding: 8,
    width: 250,
  },
});

export default UpdateModal;
