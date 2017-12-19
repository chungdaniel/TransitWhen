import { TabNavigator, StackNavigator } from 'react-navigation';
import BusPredictions from 'bus/screens/BusPredictions';
import SubwayPredictions from 'subway/screens/SubwayPredictions';
import Experimentation from 'experimentation/Experimentation';
import SubwayExperimentation from 'experimentation/SubwayExperimentation';

const TransitWhen = TabNavigator({
    BusPredictions: {
        screen: Experimentation
    },
    Notifications: {
        screen: SubwayExperimentation
    },
    Experimentation: {
        screen: BusPredictions
    }
}, {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    tabBarOptions: {
        activeTintColor: '#e91e63'
    }
});

export default TransitWhen;
