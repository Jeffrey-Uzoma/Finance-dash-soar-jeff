import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const data = [
  { month: 'Jul', balance: 100 },
  { month: 'Aug', balance: 300 },
  { month: 'Sep', balance: 200 },
  { month: 'Oct', balance: 600 },
  { month: 'Nov', balance: 200 },
  { month: 'Dec', balance: 500 },
  { month: 'Jan', balance: 400 },
];

const BalanceHistory = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [parentWidth, setParentWidth] = useState(0);

  useEffect(() => {
    const updateDimensions = () => {
      const container = svgRef.current?.parentElement;
      if (container) {
        setParentWidth(container.clientWidth);
      }
    };

    // Update dimensions initially and on window resize
    updateDimensions();
    const debouncedResize = debounce(updateDimensions, 250);
    window.addEventListener('resize', debouncedResize);

    return () => window.removeEventListener('resize', debouncedResize);
  }, []);

  // Debounce function to prevent excessive rerenders
  function debounce(func: Function, wait: number) {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  useEffect(() => {
    if (!svgRef.current || parentWidth === 0) return;

    // Clear existing SVG content
    d3.select(svgRef.current).selectAll('*').remove();

    // Set chart margins and dimensions
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = parentWidth - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    // Create SVG element
    const svg = d3.select(svgRef.current)
      .attr('width', parentWidth)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create scales
    const x = d3.scaleBand()
      .domain(data.map(d => d.month))
      .range([0, width])
      .padding(0.3);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.balance) || 0])
      .nice()
      .range([height, 0]);

    // Create gradient for the area chart
    svg.append('defs')
      .append('linearGradient')
      .attr('id', 'balanceGradient')
      .attr('x1', '0')
      .attr('y1', '0')
      .attr('x2', '0')
      .attr('y2', '1')
      .selectAll('stop')
      .data([
        { offset: '0%', color: '#3b82f6', opacity: 0.6 },
        { offset: '100%', color: '#3b82f6', opacity: 0 }
      ])
      .enter()
      .append('stop')
      .attr('offset', d => d.offset)
      .attr('stop-color', d => d.color)
      .attr('stop-opacity', d => d.opacity);

    // Create curved line generator
    const line = d3.line<any>()
      .x(d => x(d.month)! + x.bandwidth() / 2)
      .y(d => y(d.balance))
      .curve(d3.curveMonotoneX); // Use monotone curve for smooth transitions

    // Create curved area generator
    const area = d3.area<any>()
      .x(d => x(d.month)! + x.bandwidth() / 2)
      .y0(height)
      .y1(d => y(d.balance))
      .curve(d3.curveMonotoneX);

    // Add area chart
    svg.append('path')
      .datum(data)
      .attr('fill', 'url(#balanceGradient)')
      .attr('d', area)
      .attr('fill-opacity', 0.3);

    // Add curved line
    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#3b82f6')
      .attr('stroke-width', 2)
      .attr('d', line);

    // Add X axis
    svg.append('g')
      .selectAll('text')
      .data(data)
      .join('text')
      .attr('x', d => x(d.month)! + x.bandwidth() / 2)
      .attr('y', height + 20)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill', '#6b7280')
      .text(d => d.month);

    // Add Y axis
    svg.append('g')
      .call(d3.axisLeft(y).ticks(5))
      .selectAll('text')
      .style('font-size', '12px')
      .style('fill', '#6b7280');

    // Add tooltips
    const tooltip = svg.append('g')
      .attr('class', 'tooltip')
      .style('display', 'none');

    tooltip.append('rect')
      .attr('x', 10)
      .attr('y', 10)
      .attr('width', 80)
      .attr('height', 30)
      .attr('fill', '#fff')
      .attr('stroke', '#e5e7eb')
      .attr('stroke-width', 1)
      .attr('rx', 4)
      .attr('ry', 4);

    tooltip.append('text')
      .attr('x', 15)
      .attr('y', 25)
      .style('font-size', '12px')
      .style('fill', '#3b82f6')
      .text('');

    // Add invisible overlay for better tooltip interaction
    const bisect = d3.bisector((d: any) => x(d.month)! + x.bandwidth() / 2).left;

    svg.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .on('mousemove', function(event) {
        const [xPos] = d3.pointer(event);
        const index = bisect(data, xPos);
        const d = data[Math.min(index, data.length - 1)];
        
        tooltip.style('display', 'block')
          .attr('transform', `translate(${x(d.month)! + x.bandwidth() / 2 - 40},${y(d.balance) - 40})`);
        
        tooltip.select('text')
          .text(`${d.month}: $${d.balance}`);
      })
      .on('mouseout', function() {
        tooltip.style('display', 'none');
      });

    // Adjust left axis line to be very light from 600 to zero
    svg.select('.domain')
      .attr('stroke', '#e5e7eb')
      .attr('stroke-opacity', 0.3);

  }, [parentWidth]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Balance History</h2>
      </div>
      <div className="h-[350px] bg-white rounded-lg shadow-lg p-6">
        <svg ref={svgRef} />
      </div>
    </div>
  );
};

export default BalanceHistory;
