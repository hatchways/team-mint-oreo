import React from 'react';

import { CardActionArea, Box, Paper } from '@material-ui/core';

const AsButton = WrappedComponent => ({ highlight = 'white', ...props }) => {
  return (
    <Paper>
      <CardActionArea fullWidth>
        <Box bgcolor={highlight} borderRadius="borderRadius">
          <WrappedComponent {...props} />
        </Box>
      </CardActionArea>
    </Paper>
  );
};

export default AsButton;
