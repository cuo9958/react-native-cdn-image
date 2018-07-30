import React from 'react';
import {
    View,
} from 'react-native';

import Icon from "./UI/Icon"
import Background from "./UI/Background"

export default class extends React.Component {

    render() {
        return <View>
            <Icon name="test" style={{ width: 100, height: 100 }} />
            <View>
                <Background name="test" style={{ width: 100, height: 100 }} >
                    <View>
                        <Text>外层最好加一层View</Text>
                    </View>
                </Background>
            </View>
        </View>
    }
}