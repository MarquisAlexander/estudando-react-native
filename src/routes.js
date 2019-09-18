import {createStackNavigator} from "react-navigation";

import Main from "./pages/main";
import Product from "./pages/product";

export default createStackNavigator({
    Main,
    Product
},
{
    navigationOptions:{
        headerStyle: {
            backgroundColor: "#7129C2",
        },
        headerTintColor: "#FFF",
    },
});