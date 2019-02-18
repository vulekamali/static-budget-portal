// import React, { Fragment } from 'react';
// import styled from 'styled-components';
// import Paper from '@material-ui/core/Paper';
// import Button from '@material-ui/core/Button';
// import LeftIcon from '@material-ui/icons/KeyboardArrowLeft';
// import RightIcon from '@material-ui/icons/KeyboardArrowRight';
// import { darken } from 'polished';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   ReferenceLine,
// } from 'recharts';

// import trimValues from '../../helpers/trimValues';


// const data = [
//   {
//     name: '\'15', Actual: 400000000,
//   },
//   {
//     name: '\'16', Actual: 30000000,
//   },
//   {
//     name: '\'17', Actual: 200000000,
//   },
//   {
//     name: '\'18', Actual: 27800000, Connection: 27800000,
//   },
//   {
//     name: '\'19', Projected: 189000000, Connection: 189000000,
//   },
//   {
//     name: '\'20', Projected: 239000000,
//   },
//   {
//     name: '\'21', Projected: 34900000,
//   },
//   {
//     name: '\'22', Projected: 34900000,
//   },
// ];


// const xAxisStyles = {
//   fontSize: '12px',
//   fontFamily: 'Lato',
//   fontWeight: 700,
//   fill: 'black',
// }


// const yAxisStyles = {
//   fontSize: '12px',
//   fontFamily: 'Lato',
//   fontWeight: 700,
//   fill: 'black',
// }


// const axisTrimValue = value => trimValues(value, true)


// const StyledTooltip = styled(Paper)`
//   && {
//     background: #76b649;
//     border-radius: 5px;
//     color: white;
//     font-size: 16px;
//     font-family: Lato;
//     padding: 10px;
//   }
// `

// const Content = ({ payload = [] }) => {
//   const filtered = payload.filter(({ name }) => name !== 'Connection');
//   const { name, value } = payload[0] || {};

//   return (
//     <Fragment>
//       <StyledTooltip>
//         {name}: R{trimValues(value, true)}
//       </StyledTooltip>
//     </Fragment>
//   )
// }


// const Selected = ({ viewBox }) => {
//   if (!viewBox) {
//     return null;
//   }

//   const { height, width, x, y } = viewBox || {};

//   const extraTooltip = (
//     <Fragment>
//       <rect
//         x={x - 22}
//         y={y - 10}
//         width="45"
//         height="20"
//         rx="5"
//         ry="5"
//       />
//       <text
//         fill="white"
//         x={x - 12}
//         y={y + 3}
//         style={{
//           fontFamily: 'Lato',
//           fontSize: '10px',
//         }}
//       >
//         R11m
//       </text>
//     </Fragment>
//   )

//   return (
//     <Fragment>
//       <line
//         x1={x}
//         y1={y}
//         x2={x}
//         y2={height}
//         stroke="black"
//       />
//       {extraTooltip}
//     </Fragment>
//   )


//   // console.log(params)
//   // return null;
//   // const [first, second] = points;

//   // const isMobile = window.innerWidth < 500;
//   // const { payload: innerPayload } = payload.length > 0 ? payload[0] : [];
//   // const { name } = innerPayload || {};

//   // const extraTooltip = (
//   //   <Fragment>
//   //     <rect
//   //       x={first.x - 20}
//   //       y={first.y - 10}
//   //       width="40"
//   //       height="20"
//   //       rx="5"
//   //       ry="5"
//   //     />
//   //     <text
//   //       fill="white"
//   //       x={first.x - 12}
//   //       y={first.y + 3}
//   //       style={{
//   //         fontFamily: 'Lato',
//   //         fontSize: '10px',
//   //       }}
//   //     >
//   //       {name}
//   //     </text>
//   //   </Fragment>
//   // )

//   // return (
//   //   <Fragment>
//   //     <line
//   //       x1={first.x}
//   //       y1={first.y}
//   //       x2={second.x}
//   //       y2={second.y}
//   //       stroke="black"
//   //     />
//   //     {isMobile && extraTooltip}
//   //   </Fragment>
//   // )
// }


// const Dot = ({ cx, cy }) => {
//   if (!cx || !cy ) {
//     return null;
//   }

//   const isMobile = window.innerWidth < 500;

//   return (
//     <circle
//       {...{ cx, cy }}
//       fill={isMobile ? 'none' : '#76B649'}
//       stroke="none"
//       r="4"
//     />
//   )
// }

// const ActiveDot = ({ cx, cy }) => {
//   if (!cx || !cy ) {
//     return null;
//   }

//   return (
//     <circle
//       {...{ cx, cy }}
//       fill="#76B649"
//       stroke="none"
//       r="7"
//     />
//   )
// }



// const GreyButton = styled(Button)`
//   &&& {
//     background: black;
//     border-radius: 50px;
//     min-width: 36px;
//     width: 36px;
//     height: 36px;
//     color: black;
//     text-transform: none;
//     font-family: Lato;
//     font-size: 16px;
//     font-weight: 700;
//     box-shadow: none;
//     opacity: ${({ disabled }) => (disabled ? 0.2 : 1)};
//     margin-right: 4px;
//     margin-left: 4px;
//     fill: white;
//     color: white;

//     &:hover {
//       background: ${darken(0.1, '#C4C4C4')};
//     }
//   }
// `;


// const buttonMarkup = (disabled, reverse, clickEvent) => (
//   <GreyButton variant="contained" {...{ disabled }} onClick={clickEvent}>
//     {reverse ? <LeftIcon /> : <RightIcon />}
//   </GreyButton>
// );

// const ButtonsWrap = styled.div`
//   display: flex;
//   justify-content: space-between;
//   padding: 0 23px 0 33px;
// `;

// const buttons = (
//   <ButtonsWrap>
//     {buttonMarkup(false, true, console.log)}
//     {buttonMarkup(false, false, console.log)}
//   </ButtonsWrap>
// )


// const InfraChart = () => {
//   return (
//     <Fragment>
//       {buttons}
//       <ResponsiveContainer width="100%" height={340}>
//         <LineChart
//           width={500}
//           height={300}
//           data={data}
//           margin={{
//             top: 30, right: 30, left: 30, bottom: 30,
//           }}
//         >
//           <CartesianGrid stroke="#E6E6E6" />
//           <XAxis
//             dataKey="name"
//             tickLine={false}
//             dy={15}
//             style={xAxisStyles}
//             axisLine={{
//               stroke: 'black',
//               strokeWidth: 1
//             }}
//           />
//           <YAxis
//             tickFormatter={axisTrimValue}
//             dx={-15}
//             style={yAxisStyles}
//             tickLine={false}
//             axisLine={{
//               stroke: 'black',
//               strokeWidth: 1,
//             }}
//           />
//           <Line
//             dataKey="Actual"
//             stroke="#76B649"
//             strokeWidth={3}
//             dot={<Dot />}
//             activeDot={<ActiveDot />}
//             animationBegin={0}
//             animationEasing="linear"
//             animationDuration={750}
//           />
//           <Line
//             dataKey="Connection"
//             stroke="#76B649"
//             strokeWidth={3}
//             strokeDasharray="3 4"
//             dot={false}
//             activeDot={false}
//             animationBegin={750}
//             animationEasing="linear"
//             animationDuration={250}
//           />
//           <Line
//             dataKey="Projected"
//             stroke="#76B649"
//             strokeWidth={3}
//             strokeDasharray="3 4"
//             dot={<Dot />}
//             activeDot={<ActiveDot />}
//             animationBegin={1000}
//             animationEasing="linear"
//             animationDuration={750}
//             />
//           <Tooltip
//             active={false}
//             content={<Content />}
//             isAnimationActive={false}
//             cursor={{
//               stroke: 'black',
//             }}
//           />
//           <ReferenceLine x="'19" stroke="black" label={<Selected />} />
//         </LineChart>
//       </ResponsiveContainer>
//     </Fragment>
//   )
// }


// export default InfraChart;
