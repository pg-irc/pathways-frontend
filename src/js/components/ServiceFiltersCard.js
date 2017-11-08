import React from 'react';

import PropTypes from 'prop-types';

import {inject, observer} from 'mobx-react';

import {PaperCard} from 'polymer/paper-card';
import {PaperChip} from 'polymer/paper-chip';
import {PaperIconButton} from 'polymer/paper-icon-button';
import {PaperProgress} from 'polymer/paper-progress';

import MapAttribution from 'components/MapAttribution';

@inject('serviceProvidersStore')
@observer
export default class ServiceFiltersCard extends React.Component {
    static propTypes = {
        serviceProvidersStore: PropTypes.object.isRequired,
        data: PropTypes.object,
        onDataChange: PropTypes.func,
        onEditOpen: PropTypes.func
    };

    render() {
        const {serviceProvidersStore, data} = this.props;

        const isLoading = serviceProvidersStore.isRequest('fetching');
        const loadingElem = isLoading ? <PaperProgress indeterminate /> : null;

        const filterElems = Object.entries(data || {}).filter(
            ([key, value]) => Boolean(key && value)
        ).map(
            ([key, value]) => (
                <PaperChip key={`filter-chip-${key}`} animate={true} multi-line={true} removable={true} onRemove={this._onFilterChipRemove.bind(this, key)}>
                    <div slot="label" className="label">
                        {key}
                    </div>
                    <div slot="caption" className="caption">
                        {value}
                    </div>
                </PaperChip>
            )
        );

        const selectedFilters = (filterElems.length > 0) ? (
            <span>
                {filterElems}
            </span>
        ) : (
            <span>
                No filters selected.
            </span>
        )

        return (
            <PaperCard className="service-map-overlay">
                <div className="card-content">
                    <div className="filters-container">
                        {selectedFilters}
                        <PaperIconButton icon="editor:mode-edit" onClick={this._onEditButtonClick.bind(this)} />
                    </div>
                    <MapAttribution />
                    {loadingElem}
                </div>
            </PaperCard>
        );
    }

    _onEditButtonClick() {
        this._onEditOpen();
    }

    _onFilterChipRemove(filter) {
        const data = {...this.props.data};
        data[filter] = undefined;
        this._onDataChange(data);
    }

    _onDataChange(data) {
        this.props.onDataChange(data);
    }

    _onEditOpen() {
        this.props.onEditOpen();
    }
}
