import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class SettingScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            first_name: "",
            last_name: "",
            address: "",
            contact: "",
            docID: ""
        }
    }

    getData = () => {
        var user = firebase.auth().currentUser;
        var email = user.email;
        db.collection("users").where("email", "==", email).get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    var data = doc.data();
                    this.setState({
                        first_name: data.first_name,
                        last_name: data.last_name,
                        address: data.address,
                        contact: data.mobile_number,
                        docID: doc.id
                    })
                })
            })
    }

    updateData = () => {
        db.collection("users").doc(this.state.docID).update({
            "first_name": this.state.first_name,
            "last_name": this.state.last_name,
            "address": this.state.address,
            "mobile_number": this.state.contact
        })
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.input} placeholder="First Name" maxLength={8} onChangeText={(text) => { this.setState({ first_name: text }) }} />
                <TextInput style={styles.input} placeholder="Last Name" maxLength={8} onChangeText={(text) => { this.setState({ last_name: text }) }} />
                <TextInput style={styles.input} placeholder="Address" multiline={true} onChangeText={(text) => { this.setState({ address: text }) }} />
                <TextInput style={styles.input} placeholder="Contact" keyboardType={"number-pad"} onChangeText={(text) => { this.setState({ contact: text }) }} />
                <View>
                    <TouchableOpacity style={styles.button} onPress={this.updateData()}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ff9a76",
        width: '100%',
    },

    input: {
        borderWidth: 1.3,
        borderColor: "#ffeadb",
        marginTop: 30,
        paddingLeft: 9,
        alignSelf: "center",
        width: 180,
        height: 27,
    },

    button: {
        marginTop: 20,
        alignSelf: "center",
        backgroundColor: "#f7c5a8",
        width: 100,
        height: 25,
        borderRadius: 10,
    },

    buttonText: {
        color: "#1c2b2d",
        alignSelf: "center",
        textAlign: "center",
        marginTop: 1.5,
        fontWeight: "400",
        textAlignVertical: "center"
    },
})