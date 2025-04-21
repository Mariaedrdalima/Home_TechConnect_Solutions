import * as React from 'react';
import { useColorScheme } from '@mui/material/styles';

import TcLogoLight from '../../assets/tc_complete.svg';
import TcLogoDark from '../../assets/tc_complete_dark.svg';

export default function TcLogo() {
  const { mode } = useColorScheme();

  const logoSrc = mode === 'dark' ? TcLogoDark : TcLogoLight;

  console.log('[TcLogo] Modo atual:', mode);

  return (
    <div>
      <img src={logoSrc} width={200} height={200} alt="TcLogo" />
    </div>
  );
}