import React from 'react';

import { Paper } from '@material-ui/core';

const WithBorder = WrappedComponent => props => {
  return (
    <Paper>
      <WrappedComponent {...props} />
    </Paper>
  );
};

export default WithBorder;
