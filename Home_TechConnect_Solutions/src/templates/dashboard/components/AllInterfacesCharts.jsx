import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MetricChart from './MetricChart';

const interfaces = ['POP Tirol', 'Zona Norte', 'POP Praia do Meio', 'POP Ponta Negra'];
const metrics = ['lat', 'pot', 'trafficIN', 'trafficOUT'];

export default function AllInterfaceCharts() {
  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Métricas por Interface
      </Typography>

      {interfaces.map((iface) => (
        <div key={iface} style={{ marginBottom: '3rem' }}>
          <Typography variant="h6" sx={{ mb: 1, width:'200px', height:'120x'}}>
            {iface}
          </Typography>
          <Grid container spacing={2}>
            {metrics.map((metric) => (
              <Grid item xs={12} sm={6} md={6} lg={3} key={metric}>
                <MetricChart interfaceName={iface} metric={metric} />
              </Grid>
            ))}
          </Grid>
        </div>
      ))}
    </div>
  );
}
