import React from 'react'
import { AsyncStorage } from 'react-native'

const SettingsContext = React.createContext()

export default class SettingsProvider extends React.Component {

    state = {
        maxCardlevel: 6
    }

    setMaxCardLevel(level) {
        this.setState({ maxCardlevel: level })
        this.storeSettingOnDevice()

    }

    async retrieveSettignsfromDevice() {

        try {
            const settings = await AsyncStorage.getItem('settings')
            if (settings != null) {
                let data = JSON.parse(loginData)
                this.state.maxCardLevel = data.maxCardLevel

                return true
            }
        } catch (error) {
            console.log(error)
            return false
        }
    }


    storeSettingOnDevice() {
        try {
            AsyncStorage.setItem(
                'settings',
                JSON.stringify({
                    maxCardLevel: this.state.maxCardlevel
                })
            );
        } catch (error) {
            console.log("Fehler beim speichern der Einstellungen :" + error)
        }
    }

    render() {
        return (
            <SettingsContext.Provider value={{
                maxCardlevel: this.state.maxCardlevel,
                setMaxCardLevel: this.setMaxCardLevel,
                storeSettingOnDevice: this.storeSettingOnDevice,
                retrieveSettignsfromDevice: this.retrieveSettignsfromDevice
            }}>
                {this.props.children}
            </SettingsContext.Provider>
        )
    }
}

export { SettingsProvider, SettingsContext }