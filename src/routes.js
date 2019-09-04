import {createStackNavigator} from 'react-navigation';

import Main from './pages/main';

export default createStackNavigator({
    Main,
},{
    navigationOptions:{
        headerStyle: {
            backgroundColor: "#7129C2",
        },
        headerTintColor: "#FFF",
    },
});