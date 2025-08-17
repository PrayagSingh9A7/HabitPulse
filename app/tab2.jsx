import { View, Text, Dimensions, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LineChart } from "react-native-chart-kit";

export default function Analysis() {
  const [data, setData] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("Arr").then((value) => {
      if (value) {
        const history = JSON.parse(value);
        const chartData = history.map((tasks) => {
          const total = tasks.length;
          const completed = tasks.filter((t) => t.completed).length;
          return total > 0 ? Math.round((completed / total) * 100) : 0;
        });
        setData(chartData);
      }
    });
  }, []);

  const chartWidth = Dimensions.get("window").width - 32;

  return (
    <ScrollView contentContainerStyle={{ padding: 16, backgroundColor: "#e6eeff", flexGrow: 1}}>
      <Text style={{fontSize: 26,fontWeight: "500",marginBottom: 20,color: "#b3ccff",textAlign: "center",marginBottom:60,marginTop:70}}>📈 Your Daily Progress</Text>
      {data.length > 0 ? (
      <LineChart data={{labels: data.map((_, i) => `D${i + 1}`), datasets: [{ data }]}}
          width={chartWidth} height={260} yAxisSuffix="%" fromZero={true} yAxisInterval={1}
          chartConfig={{ backgroundColor: "#ffffff", backgroundGradientFrom: "#dbeafe",backgroundGradientTo: "#bfdbfe",decimalPlaces: 0,
            color: (opacity = 1) => `rgba(30, 64, 175, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(30, 41, 59, ${opacity})`,
            propsForDots: { r: "5",strokeWidth: "2", stroke: "#3b82f6" },
            propsForBackgroundLines: {stroke: "#cbd5e1"},
            style: { marginLeft: -10, }
          }}
          bezier
          style={{marginVertical: 10,borderRadius: 16, elevation: 3, shadowColor: "#000",shadowOpacity: 0.1,shadowRadius: 5, shadowOffset: { width: 0, height: 2 },paddingLeft: 8,}}
        />) : (
        <Text style={{ fontSize: 16, color: "#6b7280", textAlign: "center" }}>
          No data available yet. Start completing tasks to see your progress.
        </Text>
      )}
    </ScrollView>
  );
}
