import { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Header, AirbnbRating, Icon } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";
import axios from 'axios';
import { Card } from "react-native-elements/dist/card/Card";

export default class RecommendationScreen extends Component{
    constructor(props){
        super(props)
        this.state = {
            data:[]
        }
    }

    componentDidMount(){
        this.getData()
    }

    getData = () => {
        const url = "http://127.0.0.1:5000/recommended-movies"
        axios
        .get(url)
        .then(async response => {
            this.setState({
                data:response.data.data
            })
        })
        .catch(error => {
            console.log(error.message)
        })
    }

    timeConvert(num){
        var hours = Math.floor(num/60)
        var minutes = num%60
        return `${hours} hrs ${minutes} mins`
    }

    keyExtractor = (item,index) => toString()
    
    renderItems = ({item,index}) => {
        return (
            <Card
                key = {`card-${index}`}
                image = {{uri:item.poster_link}}
                imageProps = {{resizeMode:"cover"}}
                featuredTitle = {item.title}
                containerStyle = {styles.cardContainer}
                featuredTitleStyle = {styles.title}
                featuredSubTitle = {`${item.release_data.split("-")[0]}|${this.timeConvert(item.duration)}`}
                featuredSubTitleStyle = {styles.subtitle}
            >
            </Card>
        )
    }

    render(){
        const {data} = this.state()
        return(
            <View>
                <FlatList
                    data = {data}
                    keyExtractor = {this.keyExtractor}
                    renderItems = {this.renderItems}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    title: { color: "#fff", alignSelf: "flex-start", paddingLeft: RFValue(15), fontSize: RFValue(25), marginTop: RFValue(65) },
    subtitle: { fontWeight: "bold", alignSelf: "flex-start", paddingLeft: RFValue(15), fontSize: RFValue(15) },
    cardContainer: { flex: 1, borderRadius: RFValue(10), justifyContent: "center", height: RFValue(110), marginBottom: RFValue(20) }
});