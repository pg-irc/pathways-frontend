// tslint:disable: no-expression-statement
import React from 'react';
import { Icon, View } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { colors } from '../../application/styles';
import { ChooseRatingAction } from '../../stores/reviews/actions';

export interface RatingsProps {
    readonly rating: number;
    readonly chooseRating: (rating: number) => ChooseRatingAction;
}

export interface RatingIcon {
    readonly name: string;
    readonly value: number;
}

const iconsList: ReadonlyArray<RatingIcon> = [
    {
        name: 'frown',
        value: 1,
    },
    {
        name: 'meh',
        value: 2,
    },
    {
        name: 'smile',
        value: 3,
    },
];

export const RatingsComponent = (props: RatingsProps): JSX.Element => (
    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center'}}>
        <RatingsIconsComponent rating={props.rating} chooseRating={props.chooseRating} iconsList={iconsList}/>
    </View>
);

interface RatingsIconsProps {
    readonly rating: number;
    readonly iconsList: ReadonlyArray<RatingIcon>;
    readonly chooseRating: (rating: number) => void;
}

const RatingsIconsComponent = (props: RatingsIconsProps): JSX.Element => (
    <>
        {
            props.iconsList.map((icon: RatingIcon): JSX.Element => {
                return (
                    <RatingIconComponent
                        key={icon.name}
                        isChosen={icon.value === props.rating}
                        icon={icon}
                        onPress={(): void => props.chooseRating(icon.value)}
                    />
                );
            })
        }
    </>
);
interface RatingIconProps {
    readonly isChosen: boolean;
    readonly icon: RatingIcon;
    readonly onPress: () => void;
}

const RatingIconComponent = (props: RatingIconProps): JSX.Element => (
    <TouchableOpacity style={{ padding: 20 }} onPress={props.onPress}>
        <Icon
            name={props.icon.name}
            type='FontAwesome5'
            style={{ color: props.isChosen ? colors.teal : colors.grey, fontSize: 50 }}
        />
    </TouchableOpacity>
);