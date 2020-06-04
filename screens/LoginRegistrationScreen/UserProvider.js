import React from 'react'

const UserContext = React.createContext()

export default class UserProvider extends React.Component {

    state = {
        username: null,
        jwt: null,
    }

    setJwt = (jwt) => {
        this.setState({ jwt })
    }


    render() {
        return (
            <UserContext.Provider value={{
                jwt: this.state.jwt,
                setJwt: this.setJwt
            }}>

            </UserContext.Provider>
        )
    }
}