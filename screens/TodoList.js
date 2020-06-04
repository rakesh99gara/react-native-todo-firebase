import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  CheckBox,
  Image,
  Alert,
} from "react-native";
import * as firebase from "firebase";
import { firebaseConfig } from "../config";

firebase.initializeApp(firebaseConfig);

function Item({
  title,
  id,
  imp,
  index,
  category,
  remarks,
  gotoEdit,
  deleteMe,
}) {
  return (
    <TouchableOpacity>
      <View style={styles.item}>
        <Text
          style={[
            styles.title,
            { textDecorationLine: imp ? "line-through" : "none" },
          ]}
        >
          {title}
        </Text>
        <TouchableOpacity
          style={styles.delete}
          onPress={() => gotoEdit(id, imp, title, category, remarks)}
        >
          <Image
            source={require("../assets/edit.png")}
            style={{ height: 30, width: 30 }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.delete}
          onPress={() => deleteMe(id, imp, index)}
        >
          <Image
            source={require("../assets/delete.png")}
            style={{ height: 30, width: 30 }}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

function TodoList({ route, navigation }) {
  useEffect(() => {
    if (route.params) {
      setFireTodo([]);
      const todosRef = firebase.database().ref("/todos/");
      todosRef.once("value", (snapshot) => {
        snapshot.forEach((childSnapShot) => {
          var childKey = childSnapShot.key;
          var childData = childSnapShot.val();
          setFireTodo((fireTodo) => [
            ...fireTodo,
            {
              id: childKey,
              todo: childData.todo,
              remarks: childData.remarks,
              imp: childData.imp,
              category: childData.category,
            },
          ]);
        });
        console.log(fireTodo);
      });
      setTodos({
        id: route.params.id,
        todo: route.params.todo,
        remarks: route.params.remarks,
        imp: route.params.imp,
        category: route.params.category,
      });
    }
  }, [route.params]);

  const [todos, setTodos] = useState([]);

  const pressHandler = () => {
    navigation.navigate("AddTodo");
  };

  const gotoEdit = (id, imp, title, category, remarks) => {
    const editTodo = {
      id: id,
      imp: imp,
      title: title,
      category: category,
      remarks: remarks,
    };
    navigation.navigate("EditTodo", editTodo);
  };

  const deleteMe = (id, imp, index) => {
    firebase
      .database()
      .ref("todos/" + id)
      .remove();
    getFirebaseData();
  };

  const [fireTodo, setFireTodo] = useState([]);

  // getFirebaseTodos();

  // useEffect(() => {
  //   const todosRef = firebase.database().ref("/todos/").orderByKey();
  //   todosRef.once("child_added").then((snapshot) => {
  //     snapshot.forEach((childSnapshot) => {
  //       var key = childSnapshot.key;
  //       var childData = childSnapshot;
  //       setTodos([childData]);
  //     });
  //     console.log(todos);
  //   });
  // });

  const getFirebaseData = () => {
    setFireTodo([]);
    const todosRef = firebase.database().ref("/todos/");
    todosRef.once("value", (snapshot) => {
      snapshot.forEach((childSnapShot) => {
        var childKey = childSnapShot.key;
        var childData = childSnapShot.val();
        setFireTodo((fireTodo) => [
          ...fireTodo,
          {
            id: childKey,
            todo: childData.todo,
            remarks: childData.remarks,
            imp: childData.imp,
            category: childData.category,
          },
        ]);
      });
      console.log(fireTodo);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={pressHandler} style={styles.add}>
        <Text style={styles.addText}>+</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity onPress={getFirebaseData}>
        <Text>Get Todo</Text>
      </TouchableOpacity> */}
      <FlatList
        data={fireTodo}
        renderItem={({ item, index }) => (
          <Item
            title={item.todo}
            category={item.category}
            remarks={item.remarks}
            imp={item.imp}
            id={item.id}
            index={index}
            gotoEdit={gotoEdit}
            deleteMe={deleteMe}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      {/* <Button title="addTodo" onPress={addTodo} /> */}
    </SafeAreaView>
  );
}
export default TodoList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Constants.statusBarHeight,
    backgroundColor: "#e3e0d8",
  },
  item: {
    backgroundColor: "#c7b692",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    color: "#ffffff",
    flex: 4,
    paddingLeft: 10,
  },
  delete: {
    alignItems: "flex-end",
    flex: 1,
  },
  add: {
    position: "absolute",
    top: 650,
    left: 340,
    height: 60,
    width: 60,
    backgroundColor: "#f2a40c",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    zIndex: 2,
  },
  addText: {
    fontSize: 40,
    color: "#ffffff",
  },
});

/* <TouchableOpacity style={styles.addButton} onPress={pressHandler}>
  <Text style={styles.addButtonText}>Add New Todo</Text>
</TouchableOpacity>; 


const pressHandler = () => {
  if (newTodo.todo != "" && newTodo.remarks != "") {
    navigation.navigate("TodoList", newTodo);
  } else {
    Alert.alert("Do fill all the fields");
  }
}; */
