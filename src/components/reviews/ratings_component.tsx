// tslint:disable: no-expression-statement
import React from 'react';
import { Icon, View } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { colors } from '../../application/styles';

export interface RatingsProps {
    readonly rating: number;
    readonly onFinishRating: (rating: number) => void;
}

export const RatingsComponent = (props: RatingsProps): JSX.Element => (
    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center'}}>
        <RatingsIconsComponent onPress={props.onFinishRating} iconsList={[]}/>
    </View>
);

interface RatingsIconsProps {
    readonly iconsList: ReadonlyArray<string>;
    readonly onPress: (rating: number) => void;
}

const RatingsIconsComponent = (props: RatingsIconsProps): JSX.Element => {
    return (
        <React.Fragment>
            {
                props.iconsList.map((name: string): JSX.Element => {
                    return <RatingIconComponent key={name} name={name} onPress={props.onPress}/>;
                })
            }
        </React.Fragment>
    );
};

interface RatingIconProps {
    readonly name: string;
    readonly onPress: (value: number) => void;
}

const RatingIconComponent = (props: RatingIconProps): JSX.Element => (
    <TouchableOpacity style={{ padding: 20 }} onPress={(): void => props.onPress(1)}>
        <Icon
            name={props.name}
            type='FontAwesome5'
            style={{ color: colors.grey, fontSize: 50 }}
        />
    </TouchableOpacity>
);