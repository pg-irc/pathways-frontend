import React from 'react';
import { applicationStyles } from '../../application/styles';
import { Service } from '../../selectors/services';
import { View } from 'native-base';
import { Text } from 'react-native';

interface Props {
    readonly service: Service;
}

export function ServiceComponent(props: Props): JSX.Element {
    return (
        <View>
            <Text style={[
            	applicationStyles.bold,
            	{ textAlign: 'left' },
        	]}>
        		{props.service.name}
    		</Text>
            <Text style={[{ textAlign: 'left' }]}><Text style={{ color: 'darkgrey' }}>Address: </Text>123 Main St, Vancouver BC</Text>
            <Text style={[{ textAlign: 'left' }]}><Text style={{ color: 'darkgrey' }}>Hours: </Text>Mon - Fri: 9:00am - 5:00pm</Text>
            {/* <Text>{props.service.description}</Text> */}
        </View>
    );
}