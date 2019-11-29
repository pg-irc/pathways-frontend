import { Dispatch } from 'redux';
import { History } from 'history';
import { connect } from 'react-redux';
import { Store } from '../../stores';
import { NewTopicsModalProps, NewTopicsModalComponent, NewTopicsModalActions } from './new_topics_modal_component';

type OwnProps = {
    readonly history: History;
    readonly isVisible: boolean;
    readonly onModalButtonPress: () => void;
};

const mapStateToProps = (_: Store, ownProps: OwnProps): NewTopicsModalProps => ({
    isVisible: ownProps.isVisible,
});

const mapDispatchToProps = (_: Dispatch, ownProps: OwnProps): NewTopicsModalActions => ({
    onModalButtonPress: ownProps.onModalButtonPress,
});

export const NewTopicsModalConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(NewTopicsModalComponent);
