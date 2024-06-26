import React from 'react'


const ProfileContext = React.createContext()

class ProfileProvider extends React.Component {
    
    constructor(props) {
        super(props)

        this.state = {
            image: null,
            profileImage: null,
            showAddImage: null,
            showChangePassword: null
        }
    }

    setImage = (image) => {
        this.setState({image})
    }

    setProfileImage = (profileImage) => {
        this.setState({ profileImage })
    }

    setShowAddImage = (showAddImage) => {
        this.setState({showAddImage})
    }

    setShowChangePassword = (showChangePassword) => {
        this.setState({showChangePassword})
    }

    render() {
        return(
            <ProfileContext.Provider value={{
                image: this.state.image,
                setImage: this.setImage,
                profileImage: this.state.profileImage,
                setProfileImage: this.setProfileImage,
                showAddImage: this.state.showAddImage,
                setShowAddImage: this.setShowAddImage,
                showChangePassword: this.state.showChangePassword,
                setShowChangePassword: this.setShowChangePassword
            }}>
                {this.props.children}
            </ProfileContext.Provider>
        )
    }
}

export {ProfileProvider, ProfileContext}