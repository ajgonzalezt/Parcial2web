

import React, { useEffect, useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import * as d3 from "d3";

function TitleLenguage() {
  let lenguage = navigator.language || navigator.userLanguage;
  if (lenguage.startsWith("es")) {
    return "Uso de poder (KwH) - Hoy";
  } else if (lenguage.startsWith("en")) {
    return "Power usage (KwH) - Today";
  } else {
    return "Power usage (KwH) - Today";
  }
}

function Charts(props) {
  const Charts = useRef(null);

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    setRooms(props.rooms);
    const iWidth = 300;
    const iHeight = 300;
    const radius = 100;

    // Define size and pos of svg
    const svg = d3
      .select(Charts.current)
      .attr("width", iWidth)
      .attr("height", iHeight)
      .append("g")
      .attr("transform", `translate(${iWidth / 2}, ${iHeight / 2})`);

    svg
      .append("text")
      .attr("x", 0)
      .attr("y", -radius - 20)
      .attr("text-anchor", "middle")
      .style("font-size", "23px")
      .text(TitleLenguage());

    const chartData = d3.pie().value((d) => d.powerUsage.value)(rooms);

    // Define arcs for graph and label

    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const colors = d3.scaleOrdinal().range(d3.schemeDark2);

    // Add tooltip
    const tooldiv = d3
      .select("#chartD3")
      .append("div")
      .style("visibility", "hidden")
      .style("position", "absolute")
      .style("background-color", "Cyan");

    svg
      .append("g")
      .selectAll("path")
      .data(chartData)
      .join("path")
      .attr("d", arc)
      .attr("fill", (d, i) => colors(i))
      .attr("stroke", "white")
      .on("mousemove", function (e) {
        tooldiv
          .style("top", e.pageY - 30 + "px")
          .style("left", e.pageX - 50 + "px");
      })
      .on("mouseover", (e, d) => {
        tooldiv
          .style("visibility", "visible")
          .text(
            `${d.data.name}: ${d.data.powerUsage.value} ${d.data.powerUsage.unit}`
          );
      })
      .on("mouseout", () => {
        tooldiv.style("visibility", "hidden");
      });
  }, [props.rooms, rooms]);

  return (
    <div>
      <h2
        className="roomTitle"
        style={{ textAlign: "left", marginLeft: "2rem" }}
      >
        <FormattedMessage id="charts" />
      </h2>
      <div id="chart">
        <svg ref={Charts}></svg>
      </div>
    </div>
  );
}

export default Charts;