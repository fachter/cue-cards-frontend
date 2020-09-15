import React, { Component } from 'react';
import { View, Text } from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

class SwipeView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            myText: 'I\'m ready to get swiped!',
            gestureName: 'none',

        };
    }

    onSwipeUp(gestureState) {
        this.setState({ myText: 'You swiped up!' });
    }

    onSwipeDown(gestureState) {
        this.setState({ myText: 'You swiped down!' });
    }

    onSwipeLeft(gestureState) {
        this.setState({ myText: 'You swiped left!' });
    }

    onSwipeRight(gestureState) {
        this.setState({ myText: 'You swiped right!' });
    }

    onSwipe(gestureName, gestureState) {
        const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
        this.setState({ gestureName: gestureName });
        switch (gestureName) {
            case SWIPE_UP:
                break;
            case SWIPE_DOWN:
                this.props.onUpdateRooms()
                break;
            case SWIPE_LEFT:
                break;
            case SWIPE_RIGHT:

                break;
        }
    }

    render() {

        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };

        return (
            <GestureRecognizer
                onSwipe={(direction, state) => this.onSwipe(direction, state)}
                onSwipeUp={(state) => this.onSwipeUp(state)}
                onSwipeDown={(state) => this.onSwipeDown(state)}
                onSwipeLeft={(state) => this.onSwipeLeft(state)}
                onSwipeRight={(state) => this.onSwipeRight(state)}
                config={config}
                style={{
                    flex: 1,
                }}
            >
                {this.props.children}
            </GestureRecognizer>
        );
    }
}

export default SwipeView;