import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface IHistorical {
   time_open: string;
   time_close: string;
   open: number;
   high: number;
   low: number;
   close: number;
   volume: number;
   market_cap: number;
}

interface ChartProps {
   coinId: string;

}
function Chart({ coinId }: ChartProps) {
   const isDark = useRecoilValue(isDarkAtom)

   const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
      fetchCoinHistory(coinId), {
      refetchInterval: 10000,
   }
   );
   return (
      <div>
         {isLoading ? (
            "Loading chart..."
         ) : (
            <ApexChart
               type="candlestick"
               series={[
                  {
                     name: "Price",
                     data: data?.map((price) => ({
                        x: new Date(price.time_close),
                        y: [price.open, price.high, price.low, price.close].map(Number),
                     })) as []
                  },
               ]}
               options={{
                  theme: {
                     mode: isDark ? "dark" : "light",
                     // mode: "dark",
                  },
                  chart: {
                     height: 300,
                     width: 500,
                     toolbar: {
                        show: false,
                     },
                     background: "transparent",
                  },
                  grid: { show: false },
                  // stroke: {
                  //    curve: "smooth",
                  //    width: 4,
                  // },
                  yaxis: {
                     show: false,
                  },
                  xaxis: {
                     axisBorder: { show: false },
                     axisTicks: { show: false },
                     labels: { show: false },
                     type: "datetime",
                     categories: data?.map((price) => price.time_close),
                  },
                  // fill: {
                  //    type: "gradient",
                  //    gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
                  // },
                  // colors: ["#0fbcf9"],
                  // tooltip: {
                  //    y: {
                  //       formatter: (value) => `$${value.toFixed(2)}`,
                  //    },
                  // },
               }}
            />
         )}
      </div>
   );
}

export default Chart;