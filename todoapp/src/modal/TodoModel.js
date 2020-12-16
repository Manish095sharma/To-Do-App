import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, Image, TextInput, Pressable } from "react-native";


const ModalNavigation = props => {
    const [text, settext] = useState(props.text)
    return (
        <Modal
            transparent={true}
            onRequestClose={() => { }}
            visible={props.visible}
        >
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(52, 52, 52, 0.9)",
                    position: "absolute",
                    elevation: 10,
                    flex: 1,
                    padding: 5,
                    width: "100%",
                    height: "100%"
                }}
            >
                <View
                    style={{
                        position: "relative",
                        elevation: 15,

                        backgroundColor: "white",
                        flexDirection: "column",
                        borderRadius: 5,

                        alignItems: "center",
                        width: "95%"
                    }}
                >
                    <TouchableOpacity
                        onPress={() => props.onClose()}
                        style={{
                            alignSelf: "flex-end",
                            height: 21,
                            width: 21,
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 20,
                            marginRight: 20
                        }}
                    >
                        <Image
                            resizeMode='contain'
                            source={{ uri: "https://icons-for-free.com/iconfiles/png/512/close+icon-1320184117228553763.png" }}
                            style={{ height: 30, width: 30, tintColor: "black" }}
                        />
                    </TouchableOpacity>
                    <View
                        style={{
                            padding: 20,
                            marginLeft: 10,
                            marginRight: 10,
                            width: "100%"
                        }}
                    >
                        <Text style={{ textAlign: "center", }}>
                            Enter To-do Name
                        </Text>

                        <TextInput value={text} onChangeText={text => settext(text)}
                            placeholder="Enter Todo Name" ></TextInput>
                        <Pressable onPress={() => {
                            props.onSubmit(text)
                            settext("")
                        }
                        } style={{ width: "40%", alignSelf: "center", backgroundColor: "blue", alignItems: "center", paddingVertical: 10, borderRadius: 10, marginVertical: 10 }} >

                            <Text style={{ color: "white" }}> {props.btnTxt}</Text>
                        </Pressable>

                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default ModalNavigation;
