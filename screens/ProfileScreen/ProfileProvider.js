import React from 'react'


const ProfileContext = React.createContext()

class ProfileProvider extends React.Component {
    
    constructor(props) {
        super(props)

        this.state = {
            image: null,
            profileImage: null,
            showAddImage: null,

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

    render() {
        return(
            <ProfileContext.Provider value={{
                image: this.state.image,
                setImage: this.setImage,
                profileImage: this.state.profileImage,
                setProfileImage: this.setProfileImage,
                showAddImage: this.state.showAddImage,
                setShowAddImage: this.setShowAddImage
            }}>
                {this.props.children}
            </ProfileContext.Provider>
        )
    }
}

export {ProfileProvider, ProfileContext}