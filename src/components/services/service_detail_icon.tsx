import React from 'react';
import { Icon } from 'native-base';
import { colors, values } from '../../application/styles';

interface Props {
    readonly name: string;
}

export const ServiceDetailIconComponent = (props: Props): JSX.Element => (
    <Icon
        name={props.name}
        type={'FontAwesome'}
        style={{ color: colors.teal, fontSize: values.smallIconSize, paddingRight: 10 }}
    />
);