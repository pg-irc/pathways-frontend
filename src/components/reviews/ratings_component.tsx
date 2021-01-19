// tslint:disable: no-expression-statement
import React from 'react';
import { Icon, View } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { colors } from '../../application/styles';

export interface RatingsProps {
    readonly rating: number;
    readonly onFinishRating: (rating: number) => void;
}

export interface RatingIcon {
    readonly name: string;
    readonly value: number;
}

const iconsList: ReadonlyArray<RatingIcon> = [
    {name: 'frown', value: 1},
    {name: 'meh', value: 2},
    {name: 'smile', value: 3},
];

export const RatingsComponent = (props: RatingsProps): JSX.Element => (
    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center'}}>
        <RatingsIconsComponent onPress={props.onFinishRating} iconsList={iconsList}/>
    </View>
);

interface RatingsIconsProps {
    readonly iconsList: ReadonlyArray<RatingIcon>;
    readonly onPress: (rating: number) => void;
}

const RatingsIconsComponent = (props: RatingsIconsProps): JSX.Element => {
    return (
        <React.Fragment>
            {
                props.iconsList.map((icon: RatingIcon): JSX.Element => {
                    return (
                        <RatingIconComponent
                            key={icon.name}
                            icon={icon}
                            onPress={props.onPress}/>
                    );
                })
            }
        </React.Fragment>
    );
};

interface RatingIconProps {
    readonly icon: RatingIcon;
    readonly onPress: (value: number) => void;
}

const RatingIconComponent = (props: RatingIconProps): JSX.Element => (
    <TouchableOpacity style={{ padding: 20 }} onPress={(): void => props.onPress(props.icon.value)}>
        <Icon
            name={props.icon.name}
            type='FontAwesome5'
            style={{ color: colors.grey, fontSize: 50 }}
        />
    </TouchableOpacity>
);