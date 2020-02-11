import React, { useState } from 'react';
import { Box, Grid, Typography, makeStyles, withStyles } from '@material-ui/core';

const TabPanel = props => {
  const { children, value, index, ...other } = props;

  return (
    <Box
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Box>
  );
};

export default TabPanel;
