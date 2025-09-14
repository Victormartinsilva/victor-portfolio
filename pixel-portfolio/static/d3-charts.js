// D3.js Charts para Portfolio - Victor Martins
class PortfolioCharts {
    constructor() {
        this.colors = {
            primary: '#4a90e2',
            secondary: '#22c55e',
            accent: '#f59e0b',
            danger: '#ef4444',
            info: '#06b6d4',
            purple: '#8b5cf6'
        };
    }

    // 1. Gráfico Radar de Competências
    createSkillsRadar(containerId, data) {
        const container = d3.select(`#${containerId}`);
        const margin = { top: 50, right: 50, bottom: 50, left: 50 };
        const width = 400 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;
        const radius = Math.min(width, height) / 2;

        // Limpar container
        container.selectAll("*").remove();

        const svg = container.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);

        const g = svg.append("g")
            .attr("transform", `translate(${width/2 + margin.left}, ${height/2 + margin.top})`);

        // Configurar escalas
        const angleScale = d3.scaleLinear()
            .domain([0, data.length])
            .range([0, 2 * Math.PI]);

        const radiusScale = d3.scaleLinear()
            .domain([0, 100])
            .range([0, radius]);

        // Criar grades concêntricas
        const levels = [20, 40, 60, 80, 100];
        levels.forEach(level => {
            g.append("circle")
                .attr("r", radiusScale(level))
                .attr("fill", "none")
                .attr("stroke", "#374151")
                .attr("stroke-width", 1)
                .attr("opacity", 0.3);

            g.append("text")
                .attr("x", 5)
                .attr("y", -radiusScale(level))
                .text(`${level}%`)
                .attr("font-size", "10px")
                .attr("fill", "#9ca3af");
        });

        // Criar linhas dos eixos
        data.forEach((d, i) => {
            const angle = angleScale(i) - Math.PI / 2;
            const lineEnd = {
                x: Math.cos(angle) * radius,
                y: Math.sin(angle) * radius
            };

            g.append("line")
                .attr("x1", 0)
                .attr("y1", 0)
                .attr("x2", lineEnd.x)
                .attr("y2", lineEnd.y)
                .attr("stroke", "#374151")
                .attr("stroke-width", 1)
                .attr("opacity", 0.3);

            // Labels dos eixos
            const labelPos = {
                x: Math.cos(angle) * (radius + 20),
                y: Math.sin(angle) * (radius + 20)
            };

            g.append("text")
                .attr("x", labelPos.x)
                .attr("y", labelPos.y)
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "middle")
                .text(d.skill)
                .attr("font-size", "12px")
                .attr("font-weight", "bold")
                .attr("fill", this.colors.primary);
        });

        // Criar área do radar
        const line = d3.lineRadial()
            .angle((d, i) => angleScale(i))
            .radius(d => radiusScale(d.value))
            .curve(d3.curveLinearClosed);

        const area = d3.areaRadial()
            .angle((d, i) => angleScale(i))
            .innerRadius(0)
            .outerRadius(d => radiusScale(d.value))
            .curve(d3.curveLinearClosed);

        // Adicionar área preenchida
        g.append("path")
            .datum(data)
            .attr("d", area)
            .attr("fill", this.colors.primary)
            .attr("fill-opacity", 0.3)
            .attr("stroke", this.colors.primary)
            .attr("stroke-width", 2);

        // Adicionar pontos
        data.forEach((d, i) => {
            const angle = angleScale(i) - Math.PI / 2;
            const pointPos = {
                x: Math.cos(angle) * radiusScale(d.value),
                y: Math.sin(angle) * radiusScale(d.value)
            };

            g.append("circle")
                .attr("cx", pointPos.x)
                .attr("cy", pointPos.y)
                .attr("r", 4)
                .attr("fill", this.colors.primary)
                .attr("stroke", "#ffffff")
                .attr("stroke-width", 2);
        });

        // Título
        svg.append("text")
            .attr("x", (width + margin.left + margin.right) / 2)
            .attr("y", 30)
            .attr("text-anchor", "middle")
            .text("Competências Técnicas")
            .attr("font-size", "18px")
            .attr("font-weight", "bold")
            .attr("fill", this.colors.primary);
    }

    // 2. Timeline Animada da Carreira
    createCareerTimeline(containerId, data) {
        const container = d3.select(`#${containerId}`);
        const margin = { top: 50, right: 50, bottom: 50, left: 150 };
        const width = 800 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;

        container.selectAll("*").remove();

        const svg = container.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);

        const g = svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // Converter datas
        const parseDate = d3.timeParse("%Y-%m");
        data.forEach(d => {
            d.startDate = parseDate(d.start);
            d.endDate = d.end === "Atual" ? new Date() : parseDate(d.end);
        });

        // Escala temporal
        const xScale = d3.scaleTime()
            .domain(d3.extent([...data.map(d => d.startDate), ...data.map(d => d.endDate)]))
            .range([0, width]);

        const yScale = d3.scaleBand()
            .domain(data.map(d => d.company))
            .range([0, height])
            .padding(0.2);

        // Eixos
        const xAxis = d3.axisBottom(xScale)
            .tickFormat(d3.timeFormat("%Y"));

        g.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis)
            .selectAll("text")
            .attr("fill", "#9ca3af");

        const yAxis = d3.axisLeft(yScale);

        g.append("g")
            .call(yAxis)
            .selectAll("text")
            .attr("fill", "#9ca3af")
            .attr("font-size", "12px");

        // Barras da timeline
        const bars = g.selectAll(".timeline-bar")
            .data(data)
            .enter()
            .append("g")
            .attr("class", "timeline-bar");

        bars.append("rect")
            .attr("x", d => xScale(d.startDate))
            .attr("y", d => yScale(d.company))
            .attr("width", 0) // Iniciar com largura 0 para animação
            .attr("height", yScale.bandwidth())
            .attr("fill", (d, i) => Object.values(this.colors)[i % Object.keys(this.colors).length])
            .attr("rx", 4)
            .transition()
            .duration(1000)
            .delay((d, i) => i * 200)
            .attr("width", d => xScale(d.endDate) - xScale(d.startDate));

        // Labels dos cargos
        bars.append("text")
            .attr("x", d => xScale(d.startDate) + 10)
            .attr("y", d => yScale(d.company) + yScale.bandwidth()/2)
            .attr("dy", "0.35em")
            .text(d => d.position)
            .attr("font-size", "11px")
            .attr("font-weight", "bold")
            .attr("fill", "#ffffff")
            .attr("opacity", 0)
            .transition()
            .duration(500)
            .delay((d, i) => i * 200 + 1000)
            .attr("opacity", 1);

        // Título
        svg.append("text")
            .attr("x", (width + margin.left + margin.right) / 2)
            .attr("y", 30)
            .attr("text-anchor", "middle")
            .text("Timeline da Carreira")
            .attr("font-size", "18px")
            .attr("font-weight", "bold")
            .attr("fill", this.colors.primary);
    }

    // 3. Word Cloud das Tecnologias
    createTechWordCloud(containerId, technologies) {
        const container = d3.select(`#${containerId}`);
        const width = 600;
        const height = 400;

        container.selectAll("*").remove();

        const svg = container.append("svg")
            .attr("width", width)
            .attr("height", height);

        // Configurar layout do word cloud
        const layout = d3.layout.cloud()
            .size([width, height])
            .words(technologies.map(d => ({ text: d.name, size: d.level })))
            .padding(5)
            .rotate(() => ~~(Math.random() * 2) * 90)
            .font("Orbitron")
            .fontSize(d => d.size)
            .on("end", draw);

        layout.start();

        function draw(words) {
            const g = svg.append("g")
                .attr("transform", `translate(${width/2}, ${height/2})`);

            g.selectAll("text")
                .data(words)
                .enter()
                .append("text")
                .style("font-size", d => `${d.size}px`)
                .style("font-family", "Orbitron")
                .style("font-weight", "bold")
                .style("fill", (d, i) => Object.values(this.colors)[i % Object.keys(this.colors).length])
                .attr("text-anchor", "middle")
                .attr("transform", d => `translate(${d.x}, ${d.y})rotate(${d.rotate})`)
                .text(d => d.text)
                .style("opacity", 0)
                .transition()
                .duration(1000)
                .delay((d, i) => i * 100)
                .style("opacity", 1);
        }

        // Título
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", 30)
            .attr("text-anchor", "middle")
            .text("Nuvem de Tecnologias")
            .attr("font-size", "18px")
            .attr("font-weight", "bold")
            .attr("fill", this.colors.primary);
    }

    // 4. Mapa Interativo de Projetos
    createProjectsMap(containerId, projects) {
        const container = d3.select(`#${containerId}`);
        const width = 800;
        const height = 500;

        container.selectAll("*").remove();

        const svg = container.append("svg")
            .attr("width", width)
            .attr("height", height);

        // Simulação de força para posicionamento dos projetos
        const simulation = d3.forceSimulation(projects)
            .force("charge", d3.forceManyBody().strength(-300))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force("collision", d3.forceCollide().radius(50));

        // Criar grupos para cada projeto
        const projectNodes = svg.selectAll(".project-node")
            .data(projects)
            .enter()
            .append("g")
            .attr("class", "project-node")
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

        // Círculos dos projetos
        projectNodes.append("circle")
            .attr("r", d => d.complexity * 5 + 20)
            .attr("fill", (d, i) => Object.values(this.colors)[i % Object.keys(this.colors).length])
            .attr("stroke", "#ffffff")
            .attr("stroke-width", 3)
            .attr("opacity", 0.8);

        // Ícones dos projetos
        projectNodes.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "0.35em")
            .text(d => d.icon)
            .attr("font-size", "24px");

        // Labels dos projetos
        projectNodes.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "3em")
            .text(d => d.name)
            .attr("font-size", "12px")
            .attr("font-weight", "bold")
            .attr("fill", "#ffffff");

        // Atualização da simulação
        simulation.on("tick", () => {
            projectNodes.attr("transform", d => `translate(${d.x}, ${d.y})`);
        });

        // Funções de drag
        function dragstarted(event, d) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }

        function dragended(event, d) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        // Título
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", 30)
            .attr("text-anchor", "middle")
            .text("Mapa Interativo de Projetos")
            .attr("font-size", "18px")
            .attr("font-weight", "bold")
            .attr("fill", this.colors.primary);
    }
}

// Inicialização automática quando D3 estiver carregado
window.portfolioCharts = new PortfolioCharts();
