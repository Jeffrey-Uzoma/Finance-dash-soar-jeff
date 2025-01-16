import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface ExpenseData {
  name: string;
  value: number;
  color: string;
}

const ExpenseChart = ({ data }: { data: ExpenseData[] }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [chartSize, setChartSize] = useState({ width: 400, height: 400 });

  useEffect(() => {
    const updateChartSize = () => {
      const container = containerRef.current;
      if (container) {
        const newWidth = container.clientWidth;
        const newHeight = Math.min(newWidth, 500); // Max height for responsiveness
        setChartSize({ width: newWidth, height: newHeight });
      }
    };

    // Update chart size initially and on window resize
    updateChartSize();
    window.addEventListener('resize', updateChartSize);

    return () => {
      window.removeEventListener('resize', updateChartSize);
    };
  }, []);

  useEffect(() => {
    if (!svgRef.current || !data.length || chartSize.width === 0 || chartSize.height === 0) return;

    // Clear any existing chart
    d3.select(svgRef.current).selectAll('*').remove();

    const margin = 40;
    const radius = Math.min(chartSize.width, chartSize.height) / 2 - margin;

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr('width', chartSize.width)
      .attr('height', chartSize.height)
      .append('g')
      .attr('transform', `translate(${chartSize.width / 2},${chartSize.height / 2})`);

    // Compute the total value
    const totalValue = d3.sum(data, d => d.value);

    // Sort the data into the order you want (Entertainment, Bill Expense, Others, Investment)
    const orderedData = [
      data.find(d => d.name === 'Entertainment'),
      data.find(d => d.name === 'Bill Expense'),
      data.find(d => d.name === 'Others'),
      data.find(d => d.name === 'Investment')
    ].filter(Boolean); // Filter out any undefined values

    // Create pie generator
    const pie = d3.pie<ExpenseData>()
      .value(d => d.value)
      .padAngle(0.02);

    // Create arc generator
    const arc = d3.arc<d3.PieArcDatum<ExpenseData>>()
      .innerRadius(0)
      .outerRadius(radius);

    // Create the pie chart segments
    const arcs = svg.selectAll('path')
      .data(pie(orderedData))
      .join('path')
      .attr('d', (d, i) => {
        // Apply scaling to the Bill Expense segment to make it larger
        const adjustedArc = i === 1 ? d3.arc<d3.PieArcDatum<ExpenseData>>()
          .innerRadius(0)
          .outerRadius(radius * 1.2) // Scale Bill Expense by 1.2
          : i === 3 ? d3.arc<d3.PieArcDatum<ExpenseData>>()
            .innerRadius(0)
            .outerRadius(radius * 0.9) // Scale Investment by 0.9
            : arc;
        return adjustedArc(d);
      })
      .attr('fill', d => d.data.color)
      .attr('stroke', 'white')
      .style('stroke-width', '2px');

    // Add labels with dynamic size and positions
    const labelArc = d3.arc<d3.PieArcDatum<ExpenseData>>()
      .innerRadius(radius - 50)
      .outerRadius(radius - 50);

    // Add percentage text above each segment (centrally aligned within the slice)
    svg.selectAll('text.percentage')
      .data(pie(orderedData))
      .join('text')
      .attr('class', 'percentage')
      .attr('transform', d => `translate(${labelArc.centroid(d)})`)
      .attr('dy', '-1em') // Position the percentage text above the center
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .style('font-size', '14px')
      .style('font-weight', 'bold')
      .text(d => `${((d.data.value / totalValue) * 100).toFixed(1)}%`);

    // Add category name text below the percentage text (centrally aligned within the slice)
    svg.selectAll('text.name')
      .data(pie(orderedData))
      .join('text')
      .attr('class', 'name')
      .attr('transform', d => `translate(${labelArc.centroid(d)})`)
      .attr('dy', '1em')  // Position the category name text below the percentage
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .style('font-size', '12px')
      .style('font-weight', 'bold')
      .text(d => d.data.name);

    // Add hover effects
    arcs.on('mouseover', function(event, d) {
      d3.select(this)
        .transition()
        .duration(200)
        .attr('opacity', 0.8);
    })
    .on('mouseout', function(event, d) {
      d3.select(this)
        .transition()
        .duration(200)
        .attr('opacity', 1);
    });

  }, [data, chartSize]);

  return (
    <div className="max-w-[40em] mx-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Expense Statistics</h2>
      <div ref={containerRef} className="bg-white rounded-3xl shadow-lg p-4 flex items-center justify-center">
        <svg ref={svgRef} width="100%" height="100%" />
      </div>
    </div>
  );
};

export default ExpenseChart;
