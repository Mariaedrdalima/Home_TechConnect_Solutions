import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Copied to clipboard:', text);
  } catch (err) {
    console.log('ERROR: Copied to clipboard FAIL', err);
  }
};

export default function Pricing() {
  return (
    <Stack
    id="contacts"
    sx={{
      pt: { xs: 4, sm: 12 },
      pb: { xs: 8, sm: 16 },
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: { xs: 3, sm: 6 },
    }}
    >
      <Box
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ color: 'text.primary' }}
        >
          Message us on WhatsApp
        </Typography>
        <Box
          component="form"
          sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
            <IconButton
                color="inherit"
                size="medium"
                href="https://api.whatsapp.com/send/?phone=5584991119296&text=Hello+W&type=phone_number&app_absent=0"
                aria-label="WhatsApp"
                sx={{ alignSelf: 'center' }}
                target='_blank'
                rel="noopener noreferrer"
                >
                <WhatsAppIcon />
              </IconButton>
              <Typography
                    variant="h7"
                    component="h4"
                    gutterBottom
                    sx={{ color: 'text.primary' }}
                    translate="no"
                  >
                <Button onClick={copyToClipboard('contact@tcsolutions.com')}>
                    contact@tcsolutions.com
                </Button>
                </Typography>
        </Box>
      </Box>
    </Stack>
  );
}
