import React from 'react';
import Modal from 'react-native-modal';
import { Trans } from '@lingui/react';
import { Content, Text, View } from 'native-base';
import { ParagraphComponent } from '../paragraph/paragraph_component';
import { values, colors, textStyles } from '../../application/styles';
import { Link } from '../link/link';
import { CloseButtonComponent } from '../close_button_component';
import { LinkIcon } from '../link_icon_component';

type Props = {
    readonly isVisible: boolean;
    readonly closeModal: () => void;
};

export const DisclaimerComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    const welcomeBcUrl = 'https://www.welcomebc.ca';
    const bc211Url = 'https://www.bc211.ca';
    return (
        <Modal isVisible={props.isVisible}>
            <View padder style={{ backgroundColor: colors.white, borderRadius: 5, flex: 1 }}>
                <CloseButtonComponent
                    onPress={props.closeModal}
                    color={colors.black}
                    additionalStyle={{ paddingTop: 0, paddingRight: 0 }}
                />
                <Content>
                    <Text style={[textStyles.headlineH1StyleBlackLeft, { paddingHorizontal: values.backgroundTextPadding }]}>
                        <Trans>Disclaimer</Trans>
                    </Text>
                    <ParagraphComponent>
                        <Trans>
                            Arrival Advisor contains information from the BC Government’s Newcomer’s Guide, available
                            at <Link href={welcomeBcUrl} style={textStyles.link} >www.welcomebc.ca</Link><LinkIcon />,
                            and the BC211 database of service providers, available at <Link href={bc211Url}
                                style={textStyles.link} >www.bc211.ca</Link><LinkIcon />.
                        </Trans>
                    </ParagraphComponent>
                    <ParagraphComponent>
                        <Trans>
                            The app provides information about relevant newcomer services, and is intended for general guidance
                            and reference only. While we aim to provide accurate and timely information, we do not have
                            control over the ongoing accuracy of the information or the quality of the services provided.
                            If you discover that a piece of information is outdated or not useful, please let us know in the
                            feedback section of the app. The inclusion of services and resources in this app does not imply
                            an endorsement or recommendation of those services over others.  Utilization of services located
                            through the app is undertaken at the risk of the user.
                    </Trans>
                    </ParagraphComponent>
                    <ParagraphComponent>
                        <Trans>
                            Arrival Advisor respects and maintains the privacy and anonymity of its users. Users do not need
                            to provide personal information in order to use the app. The questionnaire is designed to assist
                            in personalizing services and resources required by the user, and answers are only saved to enhance
                            the usability of the app over time. Users of the Arrival Advisor app do so at their own discretion.
                            The answers you provide will be used for the operation of this tool to provide you with guidance on
                            resources and services that can help you adjust to life in Canada. Users cannot be identified by their
                            answers to the questionnaire. The information is not used by Immigration, Refugees and Citizenship
                            Canada for any other purpose and is not used for any immigration decision making.
                    </Trans>
                    </ParagraphComponent>
                    <ParagraphComponent>
                        <Trans>
                            PeaceGeeks is not liable for any damages incurred as a result of or related to the use of the app.
                            PeaceGeeks is not an immigration consultancy network, and therefore cannot provide advice or support
                            directly related to immigration. Arrival Advisor exists to offer newcomers a directory of services
                            and resources to assist settlement in Metro Vancouver and does not exist in an official Immigration
                            Service capacity.
                    </Trans>
                    </ParagraphComponent>
                </Content>
            </View>
        </Modal>
    );
};
