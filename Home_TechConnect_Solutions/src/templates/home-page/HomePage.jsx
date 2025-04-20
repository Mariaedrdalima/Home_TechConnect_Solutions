import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import AppTheme from '../shared-theme/AppTheme';
import AppAppBar from './components/AppAppBar';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import Contacts from './components/Contacts';
import Features from './components/Features';
import Footer from './components/Footer';

export default function MarketingPage(props) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <Hero />
      <div>
        <Features />
        <Divider />
        <Highlights />
        <Divider />
        <Contacts />
        <Divider />
        <Footer />
      </div>
    </AppTheme>
  );
}
