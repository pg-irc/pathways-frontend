require('typeface-roboto');

require('leaflet/dist/leaflet.css');

require('index.scss');

import React from 'react';
import ReactDOM from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';

import Pathways from './Pathways';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render(
  <Pathways />,
  document.getElementById('root')
);
