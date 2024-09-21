import React from 'react';
import { Box, Typography } from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const NewsRibbon = () => {
  return (
    <Box 
      sx={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#ff9800',
        color: 'white',
        whiteSpace: 'nowrap',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        animation: 'scroll 9s linear infinite',
      }}
    >
      <NotificationsActiveIcon sx={{ marginRight: 2, fontSize: 30 }} />
      <Typography variant="h6" component="div">
        Important News: Keep an eye on local announcements and updates!
      </Typography>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </Box>
  );
};

export default NewsRibbon;
