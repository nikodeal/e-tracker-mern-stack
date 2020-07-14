import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import axios from "axios";

const Statistics = () => {
  const [users, setUsers] = useState(0);
  const [exercises, setExercises] = useState(0);
  useEffect(() => {
    axios.get("https://e-tracker-mern.herokuapp.com/exercises/").then((res) => {
      console.log(res.data);
      setExercises(res.data.length);
    });
    axios.get("https://e-tracker-mern.herokuapp.com/users/").then((res) => {
      setUsers(res.data.length);
      console.log(res.data);
    });

    return () => {
      console.log("clean up chart");
    };
  }, []);

  const pie = [
    ["Task", "Hours per Day"],
    ["Work", 8],
    ["Eat", 2],
    ["Workout", 1.4],
    ["Socialize", 1.6],
    ["Sleep", 7], // CSS-style declaration
  ];
  const options = {
    title: "My Daily Activities",
    pieHole: 0.4,
    is3D: false,
  };
  const data = [
    ["Element", "Density", { role: "style" }],
    ["Users", Number(users), "yellow"], // RGB value
    ["Exercises", Number(exercises), "blue"], // English color name
    ["Currently Logged", 2, "green"],
    // ["Platinum", 21.45, "color: #e5e4e2"] // CSS-style declaration
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        margin: "auto",
      }}
    >
      <div style={{ width: "20rem" }}>
        <Chart
          chartType="ColumnChart"
          width="100%"
          height="300px"
          data={data}
        />
      </div>
      <div style={{ width: "20rem" }}>
        <Chart
          chartType="PieChart"
          width="100%"
          height="300px"
          data={pie}
          options={options}
        />
      </div>
    </div>
  );
};

export default Statistics;
