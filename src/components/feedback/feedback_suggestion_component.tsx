import { Trans } from '@lingui/react';
import { Button, Container, Content, Footer, FooterTab, Icon, Item, Input, Label, Text } from 'native-base';
import React from 'react';
import Modal from 'react-native-modal';

import { colors, textStyles } from '../../application/styles';
import { CloseButtonComponent } from '../close_button/close_button_component';
import { MultiLineButtonComponent } from '../mutiline_button/multiline_button_component';
import { renderHeader } from '../main/render_header';

import styles from './styles';

type HeaderComponentProps = {
	readonly headerLabel: string;
	readonly onClose: () => void;
}

type ContentComponentProps = {
	readonly inputLabel: string;
	readonly placeholder: string;
}

type FooterComponentProps = {
	readonly disabled: boolean;
	readonly onSubmit: () => void;
};

type ModalProps = {
	readonly isVisible: boolean;
}

const HeaderComponent = (props: HeaderComponentProps) => {
	const leftButton = (
		<Button onPress={props.onClose} transparent>
			<Icon name='chevron-left' type='FontAwesome' style={styles.headerElement}/>
		</Button>
	);

	const rightButtons = [(
		<CloseButtonComponent
			color={colors.greyishBrown}
			additionalStyle={{ paddingTop: 0 }}
			onPress={props.onClose}
		/>
	)];

	const title = (
		<Text style={textStyles.headline6}>{props.headerLabel}</Text>
	);

	const noTopPadding = true;

	return renderHeader({
		backgroundColor: 'white',
		noTopPadding,
		title,
		leftButton,
		rightButtons,
	});
};

const ContentComponent = (props: ContentComponentProps) => {
	return (
		<Content padder>
			<Item placeholderLabel={true} stackedLabel>
				<Label style={styles.inputLabel}>{props.inputLabel}</Label>
				<Input
					multiline
					numberOfLines={5}
					placeholder={props.placeholder}
					placeholderTextColor={colors.darkerGrey}
					style={styles.input}
					textAlignVertical='top'
				/>
			</Item>
		</Content>
	);
}

const FooterComponent = (props: FooterComponentProps) => {
	const submitTextStyle = props.disabled
		? styles.submitText
		: styles.submitTextDisabled;

	const submitButtonStyle = props.disabled
		? [styles.submitButton, styles.submitButtonDisabled]
		: styles.submitButton;

	return (
		<Footer style={styles.footerContainer}>
			<FooterTab style={styles.footerTab}>
			<MultiLineButtonComponent
				onPress={props.onSubmit}
				additionalStyles={submitButtonStyle}
			>
				<Text style={submitTextStyle}>
					<Trans>Submit</Trans>
				</Text>
			</MultiLineButtonComponent>
			</FooterTab>
		</Footer>
	);
};

type FeedbackSuggestionProps = HeaderComponentProps & ContentComponentProps & ModalProps;

export const FeedbackSuggestionComponent = (props: FeedbackSuggestionProps) => {
	return (
		<Modal isVisible={props.isVisible} style={{ margin: 0 }}>
			<Container>
				<HeaderComponent headerLabel={props.headerLabel} onClose={props.onClose} />
				<ContentComponent inputLabel={props.inputLabel} placeholder={props.placeholder} />
				<FooterComponent disabled={true} onSubmit={() => {}} />
			</Container>
		</Modal>
	);
};
