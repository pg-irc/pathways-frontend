// tslint:disable:no-class no-expression-statement no-this
import React from 'react';
import * as R from 'ramda';
import { Icon, View, Button, Text } from 'native-base';
import { Dimensions } from 'react-native';
import { colors, applicationStyles, textStyles } from '../../application/styles';

export type FloatingActionButton = {
    readonly icon: string;
    readonly content: JSX.Element;
    readonly onPress: () => void;
};

export interface FloatingActionButtonsProps {
    readonly openIcon: string;
    readonly closedIcon: string;
    readonly buttons: ReadonlyArray<FloatingActionButton>;
}

interface FloatingActionButtonsState {
    readonly isOpen: boolean;
}

export class FloatingActionButtonsComponent extends React.Component<FloatingActionButtonsProps, FloatingActionButtonsState> {
    constructor(props: FloatingActionButtonsProps) {
        super(props);
        this.state = {
            isOpen: false,
        };
        this.toggleIsOpen = this.toggleIsOpen.bind(this);
    }

    render(): JSX.Element {
        return this.state.isOpen ? this.renderOpen() : this.renderClosed();
    }

    private renderOpen(): JSX.Element {
        const mapWithIndex = R.addIndex(R.map);
        return (
            <View style={this.getWrapperStyles()}>
                {mapWithIndex((button: FloatingActionButton, index: number) =>
                    <View key={index} style={{ marginTop: 10 }}>{this.buildButton(button)}</View>, this.props.buttons)
                }
                {this.renderOpenOrClosedButton()}
            </View>
        );
    }

    private buildButton(button: FloatingActionButton): JSX.Element {
        return (
            <Button
                onPress={button.onPress}
                style={[applicationStyles.whiteButton, applicationStyles.boxShadowBelow]}
            >
                <Icon name={button.icon} type={'FontAwesome'} style={{ color: colors.topaz }} />
                <Text style={textStyles.paragraphStyle}>
                    {button.content}
                </Text>
            </Button>
        );
    }

    private renderClosed(): JSX.Element {
        return (
            <View style={this.getWrapperStyles()}>
                {this.renderOpenOrClosedButton()}
            </View>
        );
    }

    private renderOpenOrClosedButton(): JSX.Element {
        return (
            <Button
                onPress={this.toggleIsOpen}
                style={[
                    applicationStyles.boxShadowBelow,
                    {
                        backgroundColor: colors.topaz,
                        alignSelf: 'flex-end',
                        marginTop: 20,
                    },
                ]}
            >
                <Icon
                    type='FontAwesome'
                    name={this.state.isOpen ? this.props.openIcon : this.props.closedIcon}
                />
            </Button>
        );
    }

    private toggleIsOpen(): void {
        this.setState({ isOpen: !this.state.isOpen });
    }

    private getWrapperStyles(): object {
        const height = Dimensions.get('screen').height;
        const position = Math.round(height / 25);
        return {
            flex: 1,
            alignItems: 'flex-end',
            position: 'absolute',
            right: position,
            bottom: position,
        };
    }
}
