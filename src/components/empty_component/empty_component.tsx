import React from 'react';

// tslint:disable-next-line:no-null-keyword
export const EmptyComponent: React.StatelessComponent = (): JSX.Element => null;

export const emptyComponent = (): JSX.Element => <EmptyComponent />;
