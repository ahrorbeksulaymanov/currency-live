
type dataType = {
    Date: string;
    Rub: number;
};

export const chartConfig = (data:dataType[]) => {
    return {
        data: data,
        xField: "Date",
        yField: "Rub",
        autoFit: false,
        xAxis: {
          range: [0, 1],
          tickCount: 8,
        },
        yAxis: {
          minLimit: Math.min.apply(
            Math,
            data?.map(function (i: any) {
              return i.Rub;
            })
          ),
          maxLimit: Math.max.apply(
            Math,
            data?.map(function (i: any) {
              return i.Rub;
            })
          ),
          tickCount: data?.length,
        },
        areaStyle: () => {
          return {
            fill: "l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff",
          };
        },
      };
}