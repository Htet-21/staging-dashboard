/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LabelList,
} from 'recharts';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const formatDate = date => `${MONTH_NAMES[new Date(date).getMonth()]} ${new Date(date).getFullYear()}`;

const CustomizedAxisTick = (props) => {
  const {
    x, y, payload,
  } = props;
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">
        {formatDate(payload.value)}
      </text>
    </g>
  );
};

export default class TrendLineChart extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

  render() {
    const { color } = this.props;
    const { data } = this.props;
    return (
      <ResponsiveContainer width={500} height={250}>
        {data &&
          <LineChart
            data={data}
            margin={{
              top: 5, right: 0, left: 0, bottom: 40,
            }}
          >
            <CartesianGrid />
            <XAxis
              tick={<CustomizedAxisTick />}
              interval={0}
              dataKey="date"
              padding={{ left: 50, right: 50 }}
            />
            <YAxis padding={{ top: 40 }} />
            <Line dataKey="value" stroke={color} dot={{ fill: color }} strokeWidth={2}>
              <LabelList dataKey="value" position="top" />
            </Line>
          </LineChart>
          }
      </ResponsiveContainer>
    );
  }
}
