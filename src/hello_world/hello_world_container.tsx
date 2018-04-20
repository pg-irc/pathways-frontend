import { Output, TwiceTheOutput, MyButton, Greeting } from './components';
import React from 'react';
import { View, TextInput } from 'react-native';
import * as counter from '../stores/counter';
import * as message from '../stores/message';

export interface Props {
    counterInProps: counter.Store;
    messageInProps: message.Store;
}

export interface Actions {
    increment(store: counter.Store): counter.SetCounterAction;
    decrement(store: counter.Store): counter.SetCounterAction;
    setMessage(newMessage: string): message.MessageAction;
}

export const HelloWorldContainer: React.StatelessComponent<Props & Actions> = (props: Props & Actions): JSX.Element => {
    const { counterInProps, messageInProps, increment, decrement, setMessage }: Props & Actions = props;
    return (
        <View style={{ alignItems: 'center' }}>
            <Greeting name='Valeera' />
            <View style={{ flexDirection: 'row', padding: 20 }}>
                <MyButton title='Increment' onPress={() => increment(counterInProps)} />
                <MyButton title='Decrement' onPress={() => decrement(counterInProps)} />
            </View>
            <Output value={counterInProps.value} />
            <TwiceTheOutput value={counterInProps.value} />
            <View>
                <TextInput value={messageInProps.message} onChangeText={(text: string) => setMessage(text)} />
                <Output value={messageInProps.message} />
            </View>
        </View >
    );
};
