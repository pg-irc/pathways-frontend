import React from 'react';

import PropTypes from 'prop-types';

import {inject, observer} from 'mobx-react';

import {Map, TileLayer} from 'react-leaflet';

import ServiceMapMarkersGroup from 'components/ServiceMapMarkersGroup';

@inject('serviceProvidersStore')
@observer
export default class ServiceMap extends React.Component {
    static propTypes = {
        serviceProvidersStore: PropTypes.object.isRequired,
        children: PropTypes.object
    };

    render() {
        const {serviceProvidersStore, children, ...other} = this.props;

        const position = [49.2827, -123.1207];
        const zoom = 13;
        const maxZoom = 15;
        const allLocations = serviceProvidersStore.toArray();

        return (
            <Map ref={(elem) => this._map = elem} center={position} zoom={zoom} maxZoom={maxZoom} {...other}>
                <TileLayer
                    attribution={`&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors`}
                    url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                />
                <ServiceMapMarkersGroup locations={allLocations} />
                {children}
            </Map>
        );
    }
}
