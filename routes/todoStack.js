import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import TodoList from "../screens/TodoList";
import AddTodo from "../screens/AddTodo";
import EditTodo from "../screens/EditTodo";

const Stack = createStackNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TodoList">
        <Stack.Screen
          name="TodoList"
          component={TodoList}
          options={{
            title: "Todo List",
            headerStyle: { backgroundColor: "#f2a40c" },
            headerTintColor: "#ffffff",
          }}
        />

        <Stack.Screen
          name="AddTodo"
          component={AddTodo}
          options={{
            title: "Add Todo",
            headerStyle: { backgroundColor: "#f2a40c" },
            headerTintColor: "#ffffff",
          }}
        />

        <Stack.Screen
          name="EditTodo"
          component={EditTodo}
          options={{
            title: "Edit Todo",
            headerStyle: { backgroundColor: "#f2a40c" },
            headerTintColor: "#ffffff",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
