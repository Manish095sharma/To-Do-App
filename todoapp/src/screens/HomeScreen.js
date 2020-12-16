import React, { useState, useEffect, useRef } from 'react'
import { View, Pressable, Image, Text, FlatList, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from "react-redux";
import { addTodo, editTodo, removeTodo } from "../actions/TodoAction"
import CheckBox from '@react-native-community/checkbox';

import TodoModal from "../modal/TodoModel"
export default function HomeScreen() {
    const { todo_List, error } = useSelector(state => state.todo_data)
    const dispatch = useDispatch();
    const ref = React.useRef(false)
    const [isActiveList, setisActiveList] = useState(true)
    const [isModalVisible, setisModalVisible] = useState(false)
    const [selectedIndex, setselectedIndex] = useState(-1)
    const [idxText, setidxText] = useState('')



    const handleUpdateButton = (index, text, isMarkasComplete) => {
        setisModalVisible(false);
        setselectedIndex(-1);
        setidxText("")
        dispatch(editTodo(text, index, todo_List, isMarkasComplete))

    }

    const handleRemoveButton = (index) => {
        dispatch(removeTodo(index, todo_List))
    }
    const handleAddButton = (text) => {
        setisModalVisible(false)

        dispatch(addTodo(text, todo_List))
    }


    const renderItem = (item, index,) => {

        return <View style={styles.itemRoot}>
            <Text style={styles.itemText}>{item.todoName}</Text>

            <View style={styles.itemBtnRoot} >

                <Pressable style={{ padding: 5 }} onPress={() => {

                    setselectedIndex(index)
                    setidxText(item.todoName)
                    setisModalVisible(true)


                }}
                >
                    <Image resizeMode="contain" style={{ width: 20, height: 20 }} source={{ uri: "https://image.flaticon.com/icons/png/512/84/84380.png" }}></Image>
                </Pressable>
                <Pressable style={{ padding: 5 }} onPress={() => handleRemoveButton(index)}>
                    <Image resizeMode="contain" style={{ width: 20, height: 20, tintColor: "red" }} source={{ uri: "https://cdn.iconscout.com/icon/premium/png-512-thumb/delete-1432400-1211078.png" }}></Image>
                </Pressable>
                <CheckBox disabled={false} value={item.mark_as_complete} onValueChange={(isChecked) => handleUpdateButton(index, todo_List[index].todoName, isChecked)} ></CheckBox>




            </View>

        </View>

    }


    return (

        <View style={styles.root} >
            <TodoModal btnTxt={selectedIndex === -1 ? "Add" : "Update"} text={idxText} onSubmit={(text) => selectedIndex === -1 ? handleAddButton(text) : handleUpdateButton(selectedIndex, text, todo_List[selectedIndex].mark_as_complete)} onClose={() => {
                setisModalVisible(false)
                setidxText("");
                setselectedIndex(-1)
            }} visible={isModalVisible} ></TodoModal>
            <View style={styles.tabContainer}>


                <Pressable onPress={() => setisActiveList(true)} style={[styles.tabButton, { backgroundColor: isActiveList ? "blue" : "white", }]} ><Text style={{ color: isActiveList ? "white" : "blue" }}>New</Text></Pressable>
                <Pressable onPress={() => setisActiveList(false)} style={[styles.tabButton, { backgroundColor: isActiveList ? "white" : "blue", }]} ><Text style={{ color: isActiveList ? "blue" : "white" }}>Completed</Text></Pressable>

            </View>

            <View style={styles.innerConatiner}>

                <Text style={styles.headingText}>TO-DO LIST</Text>


                <FlatList
                    keyExtractor={(item, index) => `item${index}`}
                    data={todo_List} renderItem={({ item, index }) => {
                        return item.mark_as_complete === isActiveList ? null : renderItem(item, index,)
                    }}
                    style={{ width: "100%" }} ></FlatList>
            </View>

            <Pressable onPress={() => setisModalVisible(true)} style={styles.addBtn}>
                <Image resizeMode="contain" source={{ uri: "https://cdn4.iconfinder.com/data/icons/ios7-essence/22/add_plus-512.png" }} style={styles.addBtnImage} ></Image>
            </Pressable>



        </View >
    )
}

const styles = StyleSheet.create({
    root: {
        width: "100%",
        height: "100%",
        backgroundColor: "white"
    },
    tabContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    innerConatiner: {
        width: "100%"
    },
    tabButton: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        margin: 10,
        borderRadius: 10
    },
    headingText: {
        fontSize: 16, fontWeight: "600",
        backgroundColor: "#e5e5e5",
        paddingVertical: 5,
        paddingHorizontal: 5
    },
    addBtn: {
        backgroundColor: "blue",
        width: 50, height: 50,
        borderRadius: 50 / 2,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 30,
        right: 30
    },
    addBtnImage: {
        width: 30,
        height: 30,
        tintColor: "white",
    },
    itemRoot: {
        width: "100%",
        backgroundColor: "white",
        borderBottomColor: "gray",
        borderBottomWidth: 1,
        justifyContent: "space-between",
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10
    },
    itemText: {
        fontWeight: "bold",
        fontSize: 16,
        flexWrap: "nowrap",
        width: "70%"
    }, itemBtnRoot: {
        flexDirection: "row",
        alignItems: "center"
    }
})
