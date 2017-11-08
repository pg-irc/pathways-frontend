import React from 'react';

import PropTypes from 'prop-types';

import {inject, observer} from 'mobx-react';

import {Pane} from 'react-leaflet';

import SimpleAppView from 'ui-components/SimpleAppView';

import ServiceFiltersCard from 'components/ServiceFiltersCard';
import ServiceFiltersDialog from 'components/ServiceFiltersDialog';
import ServiceMap from 'components/ServiceMap';

@inject('serviceProvidersStore')
@observer
class ServiceMapView_Main extends React.Component {
    static propTypes = {
        initialSearch: PropTypes.object,
        serviceProvidersStore: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            search: props.initialSearch || null,
            isFiltersDialogOpen: false
        };
    }

    componentWillMount() {
        const {serviceProvidersStore} = this.props;
        if (serviceProvidersStore.isEmpty()) {
            serviceProvidersStore.fetch();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.initialSearch && !this.state.search) {
            this.setState({search: nextProps.initialSearch});
        }
    }

    render() {
        const {serviceProvidersStore} = this.props;
        const {search} = this.state;

        const isLoading = serviceProvidersStore.isRequest('fetching');

        return (
            <div className="service-map-view">
                <ServiceMap attributionControl={false}>
                    <Pane className="service-map-filters-pane">
                        <ServiceFiltersCard
                            data={search}
                            loading={isLoading}
                            onDataChange={this._onEditDataChange.bind(this)}
                            onEditOpen={this._onEditOpen.bind(this)}
                        />
                    </Pane>
                </ServiceMap>
                <ServiceFiltersDialog
                    data={search}
                    isOpen={this.state.isFiltersDialogOpen}
                    onDataChange={this._onEditDataChange.bind(this)}
                    onRequestClose={this._onEditRequestClose.bind(this)}
                />
            </div>
        );
    }

    _onEditOpen() {
        this.setState({isFiltersDialogOpen: true});
    }

    _onEditDataChange(data) {
        this.setState({search: data});
    }

    _onEditRequestClose() {
        this.setState({isFiltersDialogOpen: false});
    }
}

export default class ServiceMapView extends SimpleAppView {
    constructor(props) {
        super({
            ...props,
            title: "Services",
            parent: '/',
            mainComponent: ServiceMapView_Main,
            className: 'pathways-view--fullscreen'
        });
    }
}
