import React from 'react'
import { AsyncStorage } from 'react-native'
import { UserContext } from '../LoginRegistrationScreen/UserProvider'

const SettingsContext = React.createContext()

export default class SettingsProvider extends React.Component {
    static contextType = UserContext
    constructor(props) {
        super(props)

        this.setMaxCardLevel = this.setMaxCardLevel.bind(this)
        this.setMaxCardLevelIncluded = this.setMaxCardLevelIncluded.bind(this)
        this.setShuffleCards = this.setShuffleCards.bind(this)
        this.retrieveSettignsfromDevice = this.retrieveSettignsfromDevice.bind(this)
    }

    state = {
        maxCardlevel: 6,
        maxCardLevelIncluded: false,
        shuffleCards: false,

    }

    componentDidUpdate() {
        this.storeSettingOnDevice()
    }

    setMaxCardLevel(level) {
        this.setState({ maxCardlevel: level })
    }

    setMaxCardLevelIncluded(value) {
        this.setState({ maxCardLevelIncluded: value })
    }

    setShuffleCards(value) {
        this.setState({ shuffleCards: value })
    }



    async retrieveSettignsfromDevice(username) {

        try {
            const settings = await AsyncStorage.getItem(`${username}-settings`)
            if (settings != null) {

                let data = JSON.parse(settings)
                console.log(data.maxCardLevel)
                this.state.maxCardLevelIncluded = data.maxCardLevelIncluded
                this.state.shuffleCards = data.shuffleCards
                this.state.maxCardLevel = data.maxCardLevel
                console.log("Gespeicherte Einstellungen wurden wiederhergestellt")

                return true
            }
        } catch (error) {
            console.log("Gespeicherte Einstellungen konnten nicht hergestellt werden und wurden auf standard gesetzt:" + error)
            return false
        }
    }


    storeSettingOnDevice() {
        const user = this.context
        try {
            AsyncStorage.setItem(
                `${user.username}-settings`,
                JSON.stringify({
                    maxCardLevel: this.state.maxCardlevel,
                    maxCardLevelIncluded: this.state.maxCardLevelIncluded,
                    shuffleCards: this.state.shuffleCards
                })

            );
            console.log("Einstellungen wurden auf dem Gerät gespeichert")
        } catch (error) {
            console.log("Fehler beim speichern der Einstellungen :" + error)
        }
    }

    render() {
        return (
            <SettingsContext.Provider value={{
                maxCardLevel: this.state.maxCardlevel,
                setMaxCardLevel: this.setMaxCardLevel,
                storeSettingOnDevice: this.storeSettingOnDevice,
                retrieveSettignsfromDevice: this.retrieveSettignsfromDevice,
                maxCardLevelIncluded: this.state.maxCardLevelIncluded,
                setMaxCardLevelIncluded: this.setMaxCardLevelIncluded,
                shuffleCards: this.state.shuffleCards,
                setShuffleCards: this.setShuffleCards
            }}>
                {this.props.children}
            </SettingsContext.Provider>
        )
    }
}

export { SettingsProvider, SettingsContext }