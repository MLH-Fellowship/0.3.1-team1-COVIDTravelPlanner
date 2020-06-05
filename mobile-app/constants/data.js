import districts from "./districts.json"
import Constants from "expo-constants";
const { manifest } = Constants;


module.exports = {
    DISTRICTS: districts,
    SEVERITY: {
        LOW: 0,
        MEDIUM: 10,
        HIGH: 50
    },
    COLOR_CODES: {
        LOW: "#53CC9D",
        MEDIUM: "#F8B123",
        HIGH: "#E54B25",
    },
    HOST_URI: `http://${manifest.debuggerHost.split(":").shift()}:8081`,
    // HOST_URI: "http://192.168.42.102:8081"
}