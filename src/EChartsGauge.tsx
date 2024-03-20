import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { TextField } from "@consta/uikit/TextField";
import { useState } from "react";
import { Card } from "@consta/uikit/Card";


interface EChartsGaugePrips {
  player: {
    name:string | null,
    id:number,
    rate:number
  },
  mode: string
}

const EChartsGauge:React.FC<EChartsGaugePrips> = ({ player, mode }) => {
  const chartRef = useRef(null);
  let myChart = null;

  const [additionalRate, setAdditionalRate] = useState(0); 

  useEffect(() => {
    myChart = echarts.init(chartRef.current);
    const option = {
      tooltip: {
        formatter: "Текущий результат {c}",
      },

      series: [
        {
          splitNumber: 8,
          pointer: {
            length: "70%",
          },
          axisLabel: {
            show: true,
            formatter: function (value: number) {
              return Math.floor(value);
            },
          },
          splitLine: {
            length: 1,
          },
          max: mode, 
          name: "Pressure",
          type: "gauge",
          progress: {
            show: true,
          },
          detail: {
            valueAnimation: true,
            formatter: "{value}",
          },
          data: [
            {
              title: {
                offsetCenter: ["0%", "100%"],
              },
              value: player.rate + additionalRate,
              name: player.name,
            },
          ],
        },
      ],
    };

    option && myChart.setOption(option);
  }, [mode, player, additionalRate]);

  {
    if (additionalRate === Number(mode)) {
      alert(`Победил: ${player.name}`);
    }
  }
  return (
    <Card verticalSpace="m" horizontalSpace="l">
      <p>
        Осталось: <strong>{Number(mode) - additionalRate}</strong>
      </p>
      <div ref={chartRef} style={{ width: "100%", height: "400px" }}></div>
      <TextField
        label="Попытки"
        placeholder="Введите число"
        onInput={(event) =>
          setAdditionalRate(eval((event.target as HTMLInputElement).value))
        }
      />
    </Card>
  );
};

export default EChartsGauge;
