import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../application/store';
import { Component, Props, Actions } from './explore_all';

const mapStateToProps = (_: Store): Props => ({
});

const mapDispatchToProps = (_: Dispatch<Store>): Actions => ({
});

export const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(Component);
