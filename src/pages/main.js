import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import api from "../services/api";

    export default class Main extends Component {
    static navigationOptions ={
        title: "                             Sobre React-native",
    };

// armazenando status dos arquivos enviados do back end
    state = {
        productInfo: {},
        docs: [],
        page: 1,
    };

// Carregando produtos do back end
    componentDidMount() {
        this.loadProducts();
    };

    loadProducts = async(page = 1) => {
        const response = await api.get(`/products?page=${page}`);
        
        const { docs, ...productInfo } = response.data;

        this.setState({ 
            docs: [...this.state.docs, ...docs], 
            productInfo,
            page
         });
    };
//Renderizar os produtos em tela
    renderItem = ({ item }) => (
        <View style={styles.productContainer}>
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>

            <TouchableOpacity 
            style={styles.productButton} 
            onPress={() => {
                this.props.navigation.navigate("Product", { product: item});
            }}
            >
                <Text style={styles.productButtonText}>Acessar</Text>
            </TouchableOpacity>
        </View>
    );

//func para parar o carregamento de novas páginas quando elas chegarem ao fim
    loadMore = () => {
        const {page, productInfo} = this.state;

        if (page === productInfo.pages) return;

        const pageNumber = page + 1;

        this.loadProducts(pageNumber);
    };

//renderizando em tela os produtos do back end
    render() {
        return (
            <View style={styles.container}>
                <FlatList 
                contentContainerStyle={styles.list}
                    data={this.state.docs}
                    keyExtractor={item => item._id}
                    renderItem={this.renderItem}
//funcionalidade para carregar mais produtos em tela, a medida que o usuário for descendo o scroll
                    onEndReached={this.loadMore}
                    onEndReachedThreshold={0.1}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fafafa"
    },

    list: {
        padding: 20
    },

    productContainer: {
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#DDD",
        borderRadius: 5,
        padding: 20,
        marginBottom: 20
    },

    productTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333"
    },

    productDescription: {
        fontSize: 16,
        color: "#999",
        marginTop: 5,
        lineHeight: 24
    },

    productButton: {
        height: 42,
        borderRadius: 5,
        borderWidth: 2,
        borderColor:"#7129c2",
        backgroundColor: "#7129c2",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
    },

    productButtonText: {
        fontSize: 16,
        color: "#FFF",
        fontWeight: "bold"
    },
}); 
