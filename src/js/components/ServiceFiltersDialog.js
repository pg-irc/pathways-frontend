import React from 'react';

import PropTypes from 'prop-types';

import {inject, observer} from 'mobx-react';

import Form from 'react-jsonschema-form';

import Portal from 'react-portal';

import {PaperButton} from 'polymer/paper-button';
import {PaperDialog} from 'polymer/paper-dialog';
import {PaperDialogScrollable} from 'polymer/paper-dialog-scrollable';

@inject('serviceProvidersStore')
@observer
export default class ServiceFiltersDialog extends React.Component {
    static propTypes = {
        serviceProvidersStore: PropTypes.object.isRequired,
        data: PropTypes.object,
        isOpen: PropTypes.bool,
        onDataChange: PropTypes.func,
        onRequestClose: PropTypes.func
    };

    render() {
        const {serviceProvidersStore, data, isOpen, onRequestClose} = this.props;

        return (
            <Portal isOpened={true}>
                <PaperDialog opened={isOpen} with-backdrop={true} onClose={onRequestClose}>
                    <h2>Search</h2>
                    <PaperDialogScrollable>
                        <Form schema={serviceProvidersStore.searchSchema} formData={data} onSubmit={this._onFormSubmit.bind(this)}>
                            <button ref={(elem) => {this._submitButton = elem}} hidden={true} />
                        </Form>
                    </PaperDialogScrollable>
                    <div className="buttons">
                        <PaperButton dialog-dismiss>Cancel</PaperButton>
                        <PaperButton dialog-confirm onClick={this._onOkClick.bind(this)}>Accept</PaperButton>
                    </div>
                </PaperDialog>
            </Portal>
        );
    }

    _onFormSubmit({formData}) {
        this.props.onRequestClose();
        this._onDataChange(formData);
    }

    _onOkClick(event) {
        event.preventDefault();
        this._submitButton.click();
    }

    _onDataChange(data) {
        this.props.onDataChange(data);
    }
}
