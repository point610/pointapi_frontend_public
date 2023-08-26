import React, {useEffect, useRef, useState} from 'react';
import * as echarts from 'echarts';
import {listTopInvokeInterfaceInfoUsingGET} from "@/services/pointapi_backend/analysisController";

interface InterfaceInfoType {
  name: string,
  value: number
}

const PieChart: React.FC<any> = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const [data, setData] = useState<InterfaceInfoType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 发送后端请求获取数据
        const res = await listTopInvokeInterfaceInfoUsingGET();

        if (res.data) {
          const finalData = res.data.map((temp) => {
            return {
              name: temp.name,
              value: temp.totalNum
            } as InterfaceInfoType
          })
          console.log("finalData")
          console.log(finalData)
          setData(finalData);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartRef.current) {

      const chartInstance = echarts.init(chartRef.current);

      const option: echarts.EChartsOption = {
        title: {
          text: '调用次数最多的五个接口',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: data, // 使用从后端获取的数据
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };

      chartInstance.setOption(option);
      return () => {
        chartInstance.dispose();
      };
    }
  }, [data]);

  return <div ref={chartRef} style={{width: '100%', height: '400px'}}/>;
};

export default PieChart;
