import React from 'react';
import { NightVision } from 'night-vision'
import { Pane } from 'night-vision/dist/types';

function App() {

  const didLogRef = React.useRef(false);
  React.useEffect(() => {
    // In this case, whether we are mounting or remounting,
    // we use a ref so that we only log an impression once.
    if (didLogRef.current == false) {
      didLogRef.current = true;

      // let data = [
      //   [1648360800000, 13.92, 14.083, 13.5025, 13.92, 10379666.97],
      //   [1648364400000, 13.92, 14.2455, 13.871, 14.157, 19149600.5],
      //   [1648368000000, 14.157, 14.3755, 14.013, 14.2695, 12874309.69],
      // ];

      const chart = new NightVision('chart-container', {
        autoResize: true,
        colors: {
          back: "#111113",
          grid: "#2e2f3055",
          candleDw: "#0c5b3bff",
          candleUp: "#41a35bff",
          volDw: "#29595555",
          volUp: "#5ba38d3f",
          wickDw: "#0c5b3b88",
          wickUp: "#41a35088"
        },
      });

      (async () => {
        const win = window as any;
        const response = await win.eel.get_klines()();
        console.log(response);

        chart.data = {
          panes: [{
            id: 0,
            uuid: '',
            overlays: [{
              id: 0,
              uuid: '',
              dataSubset: [],
              dataView: {},
              name: 'BTC / JPY - 1hour - GMO',
              type: 'Candles',
              main: true,
              data: response,
            }]
          }],
        };

      })();

    }
  }, []);

  return (
    <div id="chart-container"></div>
  );
};

export default App;
