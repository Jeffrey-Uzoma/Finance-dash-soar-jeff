import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface ActivityData {
  day: string;
  deposit: number;
  withdraw: number;
}

const ActivityChart = ({ data }: { data: ActivityData[] }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [parentWidth, setParentWidth] = useState(0);

  useEffect(() => {
    const updateDimensions = () => {
      const container = svgRef.current?.parentElement;
      if (container) {
        setParentWidth(container.clientWidth);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!svgRef.current || !data.length || parentWidth === 0) return;

    // Clear any existing chart
    d3.select(svgRef.current).selectAll('*').remove();

    // Modified dimensions for a taller chart
    const margin = { top: 40, right: 30, bottom: 30, left: 40 };
    const width = parentWidth - margin.left - margin.right;
    const height = 340 - margin.top - margin.bottom; // Increased from 250 to 400

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr('width', parentWidth)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create scales
    const x0 = d3.scaleBand()
      .domain(data.map(d => d.day))
      .rangeRound([0, width])
      .paddingInner(0.3);

    const x1 = d3.scaleBand()
      .domain(['withdraw', 'deposit'])
      .rangeRound([0, x0.bandwidth()])
      .padding(0.5);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => Math.max(d.deposit, d.withdraw)) || 0])
      .nice()
      .rangeRound([height, 0]);

    // Add X axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x0).tickSize(0))
      .call(g => g.select('.domain').remove())
      .selectAll('text')
      .style('font-size', '12px')
      .style('fill', '#6b7280');

    // Add Y axis
    svg.append('g')
      .call(
        d3.axisLeft(y)
          .ticks(5)
          .tickSize(-width)
          .tickFormat(d => `${d}`)
      )
      .call(g => g.select('.domain').remove())
      .call(g => g.selectAll('.tick line')
        .attr('stroke', '#f0f0f0')
        .attr('stroke-dasharray', '0'))
      .call(g => g.selectAll('.tick text')
        .style('font-size', '12px')
        .style('fill', '#6b7280'));

    // Create and add the bar groups
    const barGroups = svg.append('g')
      .selectAll('g')
      .data(data)
      .join('g')
      .attr('transform', d => `translate(${x0(d.day)},0)`);

    // Add withdraw bars
    barGroups.append('rect')
      .attr('x', x1('withdraw'))
      .attr('y', d => y(d.withdraw))
      .attr('width', x1.bandwidth())
      .attr('height', d => height - y(d.withdraw))
      .attr('fill', '#1f2937')
      .attr('rx', 10)
      .attr('ry', 10);

    // Add deposit bars
    barGroups.append('rect')
      .attr('x', x1('deposit'))
      .attr('y', d => y(d.deposit))
      .attr('width', x1.bandwidth())
      .attr('height', d => height - y(d.deposit))
      .attr('fill', '#3b82f6')
      .attr('rx', 10)
      .attr('ry', 10);

    // Add hover event for showing tooltips
    barGroups.selectAll('rect')
      .on('mouseover', function(event, d) {
        const bar = d3.select(this);
        const isWithdraw = bar.attr('x') === x1('withdraw');
        const value = isWithdraw ? d.withdraw : d.deposit;
        const label = isWithdraw ? 'Withdraw' : 'Deposit';

        if (tooltipRef.current) {
          tooltipRef.current.style.display = 'block';
          tooltipRef.current.innerHTML = `${label}: ${value}`;
        }

        const [xPos, yPos] = d3.pointer(event);
        const tooltip = tooltipRef.current;
        if (tooltip) {
          tooltip.style.left = `${xPos + 10}px`;
          tooltip.style.top = `${yPos + 10}px`;
        }
      })
      .on('mouseout', function() {
        if (tooltipRef.current) {
          tooltipRef.current.style.display = 'none';
        }
      });

    // Add legend with dynamic positioning
    const legend = svg.append('g')
      .attr('transform', `translate(${width - 120}, ${-30})`);

    // Deposit legend
    legend.append('circle')
      .attr('cx', 70)
      .attr('cy', 0)
      .attr('r', 4)
      .style('fill', '#3b82f6');

    legend.append('text')
      .attr('x', 80)
      .attr('y', 4)
      .text('Deposit')
      .style('font-size', '12px')
      .style('fill', '#6b7280');

    // Withdraw legend
    legend.append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', 4)
      .style('fill', '#1f2937');

    legend.append('text')
      .attr('x', 10)
      .attr('y', 4)
      .text('Withdraw')
      .style('font-size', '12px')
      .style('fill', '#6b7280');
  }, [data, parentWidth]);

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-6">Weekly Activity</h2>
      <div className="h-[425px] bg-white rounded-xl pb-10 pt-10 relative"> {/* Increased height from 350px to 500px */}
        <svg ref={svgRef} className="w-full h-full" />
        <div
          ref={tooltipRef}
          className="absolute bg-black text-white p-2 rounded opacity-0 pointer-events-none"
          style={{ display: 'none', transition: 'opacity 0.2s' }}
        />
      </div>
    </div>
  );
};

export default ActivityChart;