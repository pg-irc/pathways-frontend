import React from 'react';
import { Container, Content, View, Icon, Text } from 'native-base';
import { ImageBackground } from 'react-native';
import { ExploreSection } from '../../selectors/explore';
import { Task } from '../../selectors/tasks';
import { RouterProps } from '../../application/routing';
import { colors } from '../../application/styles';

export interface ExploreSectionProps {
    readonly section: ExploreSection;
    readonly tasks: ReadonlyArray<Task>;
}

export interface ExploreSectionActions {
}

type AllExploreSectionProps = ExploreSectionProps & ExploreSectionActions & RouterProps;

export const ExploreSectionComponent: React.StatelessComponent<AllExploreSectionProps> =
    (props: AllExploreSectionProps): JSX.Element => {
        return <Container>
            <Content padder>
                <View style={[
                    {
                        flexDirection: 'column',
                        alignItems: 'stretch',
                    }]} >
                    <TitleComponent {...props} />
                </View>
            </Content>
        </Container >;
    };

// tslint:disable-next-line:no-var-requires
const sectionImage = require('../../../assets/images/icon.png');

const TitleComponent: React.StatelessComponent<AllExploreSectionProps> = (_: AllExploreSectionProps): JSX.Element => (
    <View>
        <ImageBackground
            source={sectionImage}
            style={[
                { width: '100%' },
            ]}>
            <View style={[
                { flexDirection: 'row' },
                { alignItems: 'stretch' },
                { marginTop: 120 },
                { backgroundColor: 'rgba(0,0,0,0.4)' },
            ]}>
                <Icon type='MaterialCommunityIcons' name='book-open-variant' style={[
                    { color: colors.white },
                    { fontSize: 40 },
                    { marginTop: 20 },
                    { marginLeft: 20 },
                    { marginRight: 20 },
                    { marginBottom: 20 },
                    { alignSelf: 'center' },
                ]} />
                <View style={[
                    { flex: 1 },
                    { flexDirection: 'column' },
                    { alignItems: 'flex-start' },
                    { marginTop: 20 },
                    { marginLeft: 0 },
                    { marginRight: 20 },
                    { marginBottom: 20 },
                ]}>
                    <Text style={[
                        { color: colors.white },
                        { fontWeight: 'bold' },
                    ]}>LEARN ABOUT</Text>
                    <Text style={[
                        { color: colors.white },
                        { fontSize: 30 },
                        { fontWeight: 'bold' },
                    ]}>Education</Text>
                </View>
                <Icon type='MaterialCommunityIcons' name='heart-outline' style={[
                    { color: colors.white },
                    { marginTop: 20 },
                    { marginLeft: 0 },
                    { marginRight: 20 },
                    { marginBottom: 20 },
                    { alignSelf: 'flex-end' },
                ]} />
                <Icon name='share' style={[
                    { color: colors.white },
                    { marginTop: 20 },
                    { marginLeft: 0 },
                    { marginRight: 20 },
                    { marginBottom: 20 },
                    { alignSelf: 'flex-end' },
                ]} />
            </View>
        </ImageBackground>
    </View>
);
