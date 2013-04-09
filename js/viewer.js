function draw() {

    var location = "#post"
    var graph_width = 700;
    var graph_height = 400;

    var values = _.pluck(data, 'num');
    var min_val = d3.min(values);
    var max_val = d3.max(values);
    var v_scale = graph_height / max_val;


    var y = d3.scale.linear()
        .domain([0, graph_height])
        .range([0, max_val]);

    var x = d3.scale.linear([min_val, max_val]).range([0, graph_width]);

    var chart = d3.select(location).append("svg")
        .attr("class", "chart")
        .attr("width", graph_width + 20)
        .attr("height", graph_height + 20).
        call(d3.behavior.zoom().x(x).scaleExtent([1, 8]).on("zoom", zoom));

    var lines = chart.selectAll("line");

//    var brush = d3.svg.brush()
//        .x(x)
//        .y(y)
//        .on("brushstart", brushstart)
//        .on("brush", brushmove)
//        .on("brushend", brushend);

    lines
        .data(y.ticks(5))
        .enter().append("line")
        .attr("x1", x)
        .attr("x2", x)
        .attr("y1", function (d) {
            return graph_height;
        })
        .attr("y2", graph_height)
        .style("stroke", "#ccc")
        .style("stroke-width", ".5");

    lines
        .data(x.ticks(1))
        .enter().append("line")
        .attr("x1", 0)
        .attr("x2", graph_width)
        .attr("y1", y)
        .attr("y2", y);


    xAxis = d3.svg.axis().scale(x);
    yAxis = d3.svg.axis().scale(y).orient("left");

    chart.append("svg:g")
        .attr("transform", "translate(0,400)")

        .attr("class", "axis-x")
        .call(xAxis);

    chart.append("svg:g")
        .attr("transform", "translate(25,0)")
        .attr("class", "axis-y")
        .call(yAxis);

    var rect = chart.selectAll("rect")
        .data(data).enter()
        .append("rect")
        .attr("x", function (d, i) {
            return d["id"] + 20;
        })
        .attr("y",function (d, i) {
            return graph_height - (d["num"] * v_scale);
        }).attr("fill", "#ccc")
        .attr("width", 1)
        .attr("height",function (d, i) {
            return d["num"] * v_scale;
        }).on("mouseover",function () {
            d3.select(this).attr("fill", "#F15A29");
        }).on("mouseout", function () {
            d3.select(this).attr("fill", "#ccc");
        }).on("click", function (d) {
            alert(d["num"]);
            $('#myModal').modal('show');
        });



    function zoom() {
        chart.select(".axis-x").call(xAxis);
        chart.select(".axis-y").call(yAxis);
        chart.selectAll(".chart rect").attr("transform", "translate(" + d3.event.translate[0] + ",0)scale(" + d3.event.scale + ", 1)");
    }

//    var brushCell;
//
//    // Clear the previously-active brush, if any.
//    function brushstart(p) {
//        if (brushCell !== p) {
//            cell.call(brush.clear());
//            x.domain(domainByTrait[p.x]);
//            y.domain(domainByTrait[p.y]);
//            brushCell = p;
//        }
//    }
//
//    // Highlight the selected circles.
//    function brushmove(p) {
//        var e = brush.extent();
//        svg.selectAll(".chart rect").classed("hidden", function(d) {
//            return e[0][0] > d[p.x] || d[p.x] > e[1][0]
//                || e[0][1] > d[p.y] || d[p.y] > e[1][1];
//        });
//    }
//
//    // If the brush is empty, select all circles.
//    function brushend() {
//        if (brush.empty()) svg.selectAll(".hidden").classed("hidden", false);
//    }

}
draw();
