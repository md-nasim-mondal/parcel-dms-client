import React from "react";

interface ChartDataPoint {
  name: string;
  value: number;
}

interface BarChartProps {
  data: { month: string; count: number }[];
}

export const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const maxValue = Math.max(...data.map((item) => item.count));
  
  return (
    <div className="w-full h-80">
      <div className="flex h-full items-end space-x-2">
        {data.map((item, index) => {
          const height = item.count ? (item.count / maxValue) * 100 : 0;
          
          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div 
                className="w-full bg-primary rounded-t-md" 
                style={{ height: `${height}%` }}
              />
              <div className="text-xs mt-2 text-muted-foreground">{item.month}</div>
              <div className="text-sm font-medium">{item.count}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface PieChartProps {
  data: ChartDataPoint[];
}

export const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const colors = [
    "var(--chart-1)", 
    "var(--chart-2)", 
    "var(--chart-3)", 
    "var(--chart-4)", 
    "var(--chart-5)"
  ];
  
  return (
    <div className="w-full h-80 flex items-center justify-center">
      <div className="relative w-48 h-48">
        {data.map((item, index) => {
          const percentage = total > 0 ? (item.value / total) * 100 : 0;
          const startAngle = data
            .slice(0, index)
            .reduce((sum, d) => sum + (d.value / total) * 360, 0);
          const endAngle = startAngle + (item.value / total) * 360;
          
          if (percentage === 0) return null;
          
          return (
            <div 
              key={index}
              className="absolute inset-0"
              style={{
                background: `conic-gradient(${colors[index % colors.length]} ${startAngle}deg, ${colors[index % colors.length]} ${endAngle}deg, transparent ${endAngle}deg)`,
                borderRadius: "50%"
              }}
            />
          );
        })}
        <div className="absolute inset-4 bg-background rounded-full" />
      </div>
      <div className="ml-8 space-y-2">
        {data.map((item, index) => {
          const percentage = total > 0 ? (item.value / total) * 100 : 0;
          if (percentage === 0) return null;
          
          return (
            <div key={index} className="flex items-center">
              <div 
                className="w-3 h-3 mr-2 rounded-sm" 
                style={{ backgroundColor: colors[index % colors.length] }}
              />
              <span className="text-sm">
                {item.name}: {item.value} ({percentage.toFixed(1)}%)
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};