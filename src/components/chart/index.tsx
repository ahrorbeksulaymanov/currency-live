import { useState, useEffect } from "react";
import { Area } from "@ant-design/plots";
import axios from "axios";
import { BASE_URL, KEY_API } from "../../constants";
import { Spin } from "antd";
import { chartConfig } from "./chartConfig";
import RefreshFunc from "../../functoins";

type dataType = {
  Date: string;
  Rub: number;
};

const ChartValyuta = () => {

  const [data, setData] = useState<dataType[]>([]);
  const [loading, setloading] = useState<boolean>(true);

  useEffect(() => {
    let tenDaysAgo = new Date();
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 9)
    let tenDaysAgo2 = tenDaysAgo.toISOString().slice(0, 10)
    let today = new Date().toISOString().slice(0, 10);
    setloading(true);
    axios
      .request({
        method: "GET",
        url: `${BASE_URL}/historical?apikey=${KEY_API}&base_currency=USD&date_from=${tenDaysAgo2}&date_to=${today}`,
      })
      .then(function (response) {
        const newArray = Object.keys(response?.data?.data).map((i: any) => {
          return {
            Rub: Number(String(response?.data?.data[i]["RUB"]).slice(0, 8)),
            Date: i,
          };
        });
        setData(newArray);
        setloading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [RefreshFunc(loading)]);

  
  return (
    <div className="p-4">
      <h5>
        The last 10 days report of 1 US Dollar is against the ruble(calculated on average)
      </h5>
      <div className="chart-width">
        <Spin spinning={loading} delay={500}>
          <Area {...chartConfig(data)} />
        </Spin>
      </div>
    </div>
  );
};
export default ChartValyuta;
