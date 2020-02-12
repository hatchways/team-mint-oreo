import React from 'react';

import { Paper, Box } from '@material-ui/core';

const WithBorder = WrappedComponent => ({ highlight = 'white', ...props }) => {
  return (
    <Paper>
      {
        // use grey.100 for inactive
      }
      <Box bgcolor={highlight} borderRadius="borderRadius">
        <WrappedComponent {...props} />
      </Box>
    </Paper>
  );
};

export default WithBorder;
