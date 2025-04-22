import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { LineChart } from '@mui/x-charts/LineChart';

function AreaGradient({ color, id }) {
  return (
    <defs>
      <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity={0.5} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  );
}

AreaGradient.propTypes = {
  color: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default function MetricChart({ interfaceName, metric }) {
  const theme = useTheme();
  const [dataPoints, setDataPoints] = React.useState([]);
  const [labels, setLabels] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const colors = {
    lat: theme.palette.primary.main,
    pot: theme.palette.warning.main,
    trafficIN: theme.palette.success.main,
    trafficOUT: theme.palette.error.main,
  };

  React.useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:3335/api/down-history?interfaceName=${encodeURIComponent(
            interfaceName
          )}&metric=${metric}`
        );
        const json = await res.json();

        const values = json.data.map((item) => item.value);
        const timestamps = json.data.map((item) =>
          new Date(item.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        );

        setDataPoints(values);
        setLabels(timestamps);
      } catch (err) {
        console.error('Erro ao buscar dados:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [interfaceName, metric]);

  if (loading) {
    return <Typography variant="body2">Carregando gráfico...</Typography>;
  }

  return (
    <Card variant="outlined" sx={{ width: '100%', mt: 2 }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          {metric.toUpperCase()} - {interfaceName}
        </Typography>

        <LineChart
          xAxis={[{ scaleType: 'point', data: labels }]}
          series={[
            {
              id: metric,
              label: metric,
              showMark: false,
              curve: 'linear',
              area: true,
              data: dataPoints,
              color: colors[metric] || theme.palette.grey[500],
            },
          ]}
          height={250}
          margin={{ left: 50, right: 20, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          slotProps={{ legend: { hidden: true } }}
        >
          <AreaGradient color={colors[metric] || theme.palette.grey[500]} id={metric} />
        </LineChart>
      </CardContent>
    </Card>
  );
}

MetricChart.propTypes = {
  interfaceName: PropTypes.string.isRequired,
  metric: PropTypes.string.isRequired,
};
