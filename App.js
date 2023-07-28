import React from "react";
import { View, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import DetailScreen from "./screens/DetailScreen";

const Stack = createStackNavigator();

function App() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="orange" barStyle="light-content" />

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{
              headerStyle: { backgroundColor: "#8C8C8C" },
              headerTitleStyle: { color: "white" },
            }}
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen
            options={{
              headerStyle: { backgroundColor: "#8C8C8C" },
              headerTitleStyle: { color: "white" },
              headerTintColor: "white",
            }}
            name="DetailScreen"
            component={DetailScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default App;
