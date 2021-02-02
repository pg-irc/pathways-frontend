// tslint:disable: no-expression-statement
import React from 'react';
import * as R from 'ramda';
import { Icon, View } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { colors } from '../../application/styles';
import { ChooseRatingAction } from '../../stores/reviews/actions';
import { Rating } from '../../stores/reviews';
import { Id } from '../../stores/services';

export interface RatingsProps {
    readonly rating: Rating;
    readonly serviceId: Id;
    readonly chooseRating: (rating: number, serviceId: Id) => ChooseRatingAction;
}

export interface RatingIcon {
    readonly name: string;
    readonly value: Rating;
}

const iconsList: ReadonlyArray<RatingIcon> = [
    {
        name: 'frown',
        value: Rating.One,
    },
    {
        name: 'meh',
        value: Rating.Two,
    },
    {
        name: 'smile',
        value: Rating.Three,
    },
];

export const RatingsComponent = (props: RatingsProps): JSX.Element => (
    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center' }}>
        <RatingsIconsComponent
            rating={props.rating}
            serviceId={props.serviceId}
            chooseRating={props.chooseRating}
            iconsList={iconsList}
        />
    </View>
);

interface RatingsIconsProps {
    readonly rating: Rating;
    readonly serviceId: Id;
    readonly iconsList: ReadonlyArray<RatingIcon>;
    readonly chooseRating: (rating: Rating, serviceId: Id) => void;
}

const RatingsIconsComponent = (props: RatingsIconsProps): JSX.Element => (
    <>
        {
            R.map((icon: RatingIcon): JSX.Element => {
                return (
                    <RatingIconComponent
                        key={icon.name}
                        isChosen={icon.value === props.rating}
                        icon={icon}
                        onPress={(): void => props.chooseRating(icon.value, props.serviceId)}
                    />
                );
            }, props.iconsList)}
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