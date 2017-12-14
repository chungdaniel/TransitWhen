import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';
// import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
// import icoMoonConfig from '../../../styles/icons/icomoon.json';

// const IcoMoon = createIconSetFromIcoMoon(icoMoonConfig);

export default type => {
    switch (type) {
        case 'Entypo':
            return Entypo;
        case 'EvilIcons':
            return EvilIcons;
        case 'Feather':
            return Feather;
        case 'FontAwesome':
            return FontAwesome;
        case 'Foundation':
            return Foundation;
        // case 'IcoMoon':
        //     return IcoMoon;
        case 'Ionicons':
            return Ionicons;
        case 'MaterialCommunityIcons':
            return MaterialCommunityIcons;
        case 'MaterialIcons':
            return MaterialIcons;
        case 'Octicons':
            return Octicons;
        case 'SimpleLineIcons':
            return SimpleLineIcons;
        case 'Zocial':
            return Zocial;
        default:
            return Ionicons;
    }
};
