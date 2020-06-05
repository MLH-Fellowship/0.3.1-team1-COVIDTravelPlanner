import React from "react";
import { Easing, Animated, Dimensions } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createSwitchNavigator, createAppContainer } from "react-navigation";

import { Block } from "galio-framework";

// screens
import Home from "../screens/Home";
import Onboarding from "../screens/Onboarding";
import Pro from "../screens/Pro";
import Profile from "../screens/Profile";
import Register from "../screens/Register";
import Elements from "../screens/Elements";
import Articles from "../screens/Articles";

import LoginRegister from "../screens/LoginRegister";
import Dashboard from "../screens/Dashboard";
import Schedule from "../screens/Schedule";
import AddEvent from "../screens/Add";
// drawer
import CustomDrawerContent from "./Menu";

// header for screens
import { Icon, Header } from "../components";
import { argonTheme, tabs } from "../constants";

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeStack(props) {
    return (
        <Stack.Navigator mode="card" headerMode="screen">
            <Stack.Screen
                name="Home"
                component={Dashboard}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header
                            title="home"
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" },
                }}
            />
        </Stack.Navigator>
    );
}

// const HomeStack = createStackNavigator({
//     Home: {
//         screen: Dashboard,
//         navigationOptions: ({ navigation, scene }) => ({
//             header: <Header title="Home" navigation={navigation} scene={scene} />
//         }),
//     },
// }, {
//         cardStyle: { backgroundColor: "#F8F9FE" },
// });

// const AddStack = createStackNavigator(
//     {
//         AddEvent: {
//             screen: AddEvent,
//             navigationOptions: ({ navigation, scene }) => ({
//                 header: (
//                     <Header
//                         title="Add Event"
//                         navigation={navigation}
//                         scene={scene}
//                     />
//                 ),
//             }),
//         },
//     },
//     {
//         cardStyle: { backgroundColor: "#F8F9FE" },
//     }
// );

// const ScheduleStack = createStackNavigator(
//     {
//         Schedule: {
//             screen: Schedule,
//             navigationOptions: ({ navigation, scene }) => ({
//                 header: (
//                     <Header
//                         title="Your Schedule"
//                         navigation={navigation}
//                         scene={scene}
//                     />
//                 ),
//             }),
//         },
//     },
//     {
//         cardStyle: { backgroundColor: "#F8F9FE" },
//     }
// );

function AddStack(props) {
    return (
        <Stack.Navigator mode="card" headerMode="screen">
            <Stack.Screen
                name="AddEvent"
                component={AddEvent}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header
                            title="Add Event"
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" },
                }}
            />
        </Stack.Navigator>
    );
}
function ScheduleStack(props) {
    return (
        <Stack.Navigator mode="card" headerMode="screen">
            <Stack.Screen
                name="Schedule"
                component={Schedule}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header
                            title="Your Schedule"
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" },
                }}
            />
        </Stack.Navigator>
    );
}

// const AppStack = createDrawerNavigator({
//     Home: {
//         screen: HomeStack
//     },
//     AddEvent: {
//         screen: AddStack
//     },
//     Schedule: {
//         screen: ScheduleStack
//     }
// }, {
//     style: { flex: 1 },
//     drawerContent: (props) => <CustomDrawerContent {...props} />,
//     drawerStyle:{
//         backgroundColor: "white",
//         width: width * 0.8,
//     },
//     drawerContentOptions: {
//         activeTintcolor: "white",
//         inactiveTintColor: "#000",
//         activeBackgroundColor: "transparent",
//         itemStyle: {
//             width: width * 0.75,
//             backgroundColor: "transparent",
//             paddingVertical: 16,
//             paddingHorizonal: 12,
//             justifyContent: "center",
//             alignContent: "center",
//             alignItems: "center",
//             overflow: "hidden",
//         },
//         labelStyle: {
//             fontSize: 18,
//             marginLeft: 12,
//             fontWeight: "normal",
//         },
//     },
//     initialRouteName: "Home" 
// });

function AppStack(props) {
    return (
        <Drawer.Navigator
            style={{ flex: 1 }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            drawerStyle={{
                backgroundColor: "white",
                width: width * 0.8,
            }}
            drawerContentOptions={{
                activeTintcolor: "white",
                inactiveTintColor: "#000",
                activeBackgroundColor: "transparent",
                itemStyle: {
                    width: width * 0.75,
                    backgroundColor: "transparent",
                    paddingVertical: 16,
                    paddingHorizonal: 12,
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                },
                labelStyle: {
                    fontSize: 18,
                    marginLeft: 12,
                    fontWeight: "normal",
                },
            }}
            initialRouteName="Login">
            <Drawer.Screen name="Login" component={LoginRegister} />
            <Drawer.Screen name="Home" component={HomeStack} />
            <Drawer.Screen name="AddEvent" component={AddStack} />
            <Drawer.Screen name="Schedule" component={ScheduleStack} />
        </Drawer.Navigator>
    );
}

// const RootStack = createSwitchNavigator({
//     Login: LoginRegister,
//     App: AppStack,
// }, {
//     initialRouteName: "Login",
// });

// export default AppContainer = createAppContainer(RootStack);

// export default function OnboardingStack(props) {
//     return (
//         <Switch.Navigator initialRouteName="Login">
//             <Switch.Screen name="Login" component={LoginRegister}/>
//             <Switch.Screen name="App" component={AppStack}/>
//         </Switch.Navigator>
//     );
// }

export default function OnboardingStack(props) {
    return (
        <Stack.Navigator mode="card" headerMode="none">
            <Stack.Screen name="App" component={AppStack} />
        </Stack.Navigator>
    );
}
