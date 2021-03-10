var margin = {
    top : 20,
    right : 20,
    bottom : 30,
    left : 40
}, width = 725 - margin.left - margin.right, height = 600 - margin.top - margin.bottom;

var x = d3.scaleLinear()
    .range([0, width]);

var y = d3.scaleLinear()
    .range([height, 0]);

var formatCurrency = d3.format(",");

var div = d3.select("body")
    .append("div")
        .attr("id", "schoolinfo")
        .style("opacity", 0);

//var color = d3.scale.category10();
var color = d3.scaleOrdinal()
    .domain([1, 2, 3])
    .range(["rgb(53,135,212)", "rgb(77, 175, 74)", "rgb(228, 26, 28)"]);

// var xAxis = d3.svg.axis()
//     .scale(x)
//     .orient("bottom");

var x_axis = d3.axisBottom(x)

var y_axis = d3.axisLeft(y)

// Title


var svg = d3.select("#chart")
    .append("svg")
        .attr("class", "chart")
        .attr("viewBox", "0 0 725 700")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom )
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 10 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("Undergraduate Costs of Universities in Illinois from 2007 - 2019");
//legend x and y position
var LYP = 300, 
    LXP = 600;
    
svg.append("text").attr("class", "label").attr("x", LXP - 5).attr("y", LYP).text("Institution Type").style("font-weight", "bold");

//legend colors
svg.append("circle").attr("cx", LXP).attr("cy", LYP + 20).attr("r", 12).style("fill", "rgb(77, 175, 74)").attr("stroke", "#000");
svg.append("text").attr("class", "label").attr("x", LXP + 15).attr("y", LYP + 25).style("text-anchor", "start").text(function(d) {
    return "Public";
});
svg.append("circle").attr("cx", LXP).attr("cy", LYP + 50).attr("r", 12).style("fill", "rgb(53, 135, 212)").attr("stroke", "#000");
svg.append("text").attr("class", "label").attr("x", LXP + 15).attr("y", LYP + 55).style("text-anchor", "start").text(function(d) {
    return "Nonprofit";
});
svg.append("circle").attr("cx", LXP).attr("cy", LYP + 80).attr("r", 12).style("fill", "rgb(228, 26, 28)").attr("stroke", "#000");
svg.append("text").attr("class", "label").attr("x", LXP + 15).attr("y", LYP + 85).style("text-anchor", "start").text(function(d) {
    return "For-profit";
});
svg.append("text").attr("class", "label").attr("x", LXP - 5).attr("y", LYP + 110).text("Enrollment").style("font-weight", "bold");

//legend sizing
svg.append("circle").attr("cx", LXP).attr("cy", LYP + 30 + 110).attr("r", 20).style("fill", "#bbb").attr("stroke", "#000");
svg.append("text").attr("class", "label").attr("x", LXP + 25).attr("y", LYP + 140).style("text-anchor", "start").text("27,000+");
svg.append("circle").attr("cx", LXP).attr("cy", LYP + 60 + 110).attr("r", 15).style("fill", "#bbb").attr("stroke", "#000");
svg.append("text").attr("class", "label").attr("x", LXP + 25).attr("y", LYP + 170).style("text-anchor", "start").text("18,000+");
svg.append("circle").attr("cx", LXP).attr("cy", LYP + 80 + 110).attr("r", 9).style("fill", "#bbb").attr("stroke", "#000");
svg.append("text").attr("class", "label").attr("x", LXP + 25).attr("y", LYP + 190).style("text-anchor", "start").text("9,000+");
svg.append("circle").attr("cx", LXP).attr("cy", LYP + 93 + 110).attr("r", 4).style("fill", "#bbb").attr("stroke", "#000");
svg.append("text").attr("class", "label").attr("x", LXP + 25).attr("y", LYP + 210).style("text-anchor", "start").text("100+");

var myData = [];
d3.csv("/loanvscost.csv", function(error, data) {
    // console.log(error)
    myData.push(error)
    x.domain([0, 30000]).nice();
    y.domain([0, 11000]).nice();
    
    // .then((error) => console.log(myData))
    
    //x axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(x_axis)
        .append("text")
            .attr("class", "label")
            .attr("fill", "black")
            .attr("x", width/1.5)
            .attr("y", 35 )
            .style("text-anchor", "end")
            .text("In-District Tuition and Fees ($)");


    //y axis
    svg.append("g")
        .attr("class", "y axis")
        .call(y_axis)
        .append("text")
            .attr("class", "label")
            .attr("fill", "black")
            .attr("transform", "rotate(-90)")
            .attr("x", -270)
            .attr("y", -50)
            // .attr("dy", ".71em")
            .style("text-anchor", "middle")
            .text("Average Student Loan Total ($)")



    // svg.append("rect")
    // 	.attr("y", 150)
    //     .attr("x", 120)
    //     .attr("width", 600)
    //     .attr("height", 50)
    // 	.attr("fill", "url(#textBg)")
    // 	.attr("stroke", "black")

    //circles
    // svg.append('circle')
    // .attr('cx', 100)
    // .attr('cy', 100)
    // .attr('r', 50)
    // .attr('stroke', 'black')
    // .attr('fill', '#69a3b2');

    svg.selectAll(".dot")
        .data(myData)
        .enter()
        .append("circle")
            .attr("class", "dot")
            .attr("r", 
                function(d) {
                    // console.log(d.TotalEnrollment)
                    return (4 + (d.TotalEnrollment * .000655));
                })
            .attr("cx", 
                function(d) {
                    // console.log("test")
                    return x(d.TF9900);
                })
            .attr("cy", 
                function(d) {
                    return y(d.loan9900);
                })
            .style("fill", 
                function(d) {
                    if (d.type == 3) {
                        return "rgb(228, 26, 28)";
                    } else if (d.type == 2) {
                        return "rgb(53, 135, 212)";
                    } else {
                        return "rgb(77, 175, 74)";
                    }
                })
                ;
            

});

var running = false;
var timer;
$("button").on("click", function() {
    console.log("test")
    var duration = 3000,
        maxstep = 2011,
        minstep = 2000;
    
    if (running == true) {
    
        $("button").html("Play");
        running = false;
        clearInterval(timer);
        
    } 
    else if (running == false) {
    
        $("button").html("Pause");
        
        sliderValue = $("#slider").val();
        
        timer = setInterval( function(){
                if (sliderValue < maxstep){
                    sliderValue++;
                    console.log(sliderValue)
                    $("#slider").val(sliderValue);
                    $('#range').html(sliderValue);
                }
                $("#slider").val(sliderValue);
                update();
            
        }, duration);
        running = true;
        
        
    }

});

$("#slider").on("change", function(){
    update();
    $("#range").html($("#slider").val());
    clearInterval(timer);
    $("button").html("Play");
});

update = function() {

    d3.selectAll(".dot")
        .transition()
        .duration(1000)
        .attr("cy", function(d) {
    
            switch ($("#slider").val()) {
                case "2000":
                    return y(d.loan9900);
                    break;
                case "2001":
                    return y(d.loan0001);
                    break;
                case "2002":
                    return y(d.loan0102);
                    break;
                case "2003":
                    return y(d.loan0203);
                    break;
                case "2004":
                    return y(d.loan0304);
                    break;
                case "2005":
                    return y(d.loan0405);
                    break;
                case "2006":
                    return y(d.loan0506);
                    break;
                case "2007":
                    return y(d.loan0607);
                    break;
                case "2008":
                    return y(d.loan0708);
                    break;
                case "2009":
                    return y(d.loan0809);
                    break;
                case "2010":
                    return y(d.loan0910);
                    break;
                case "2011":
                    return y(d.loan1011);
                    break;
            }
        })
        .transition()
        .duration(1000)
        .attr("cx", function(d) {
            switch ($("#slider").val()) {
                case "2000":
                    return x(d.TF9900);
                    break;
                case "2001":
                    return x(d.TF0001);
                    break;
                case "2002":
                    return x(d.TF0102);
                    break;
                case "2003":
                    return x(d.TF0203);
                    break;
                case "2004":
                    return x(d.TF0304);
                    break;
                case "2005":
                    return x(d.TF0405);
                    break;
                case "2006":
                    return x(d.TF0506);
                    break;
                case "2007":
                    return x(d.TF0607);
                    break;
                case "2008":
                    return x(d.TF0708);
                    break;
                case "2009":
                    return x(d.TF0809);
                    break;
                case "2010":
                    return x(d.TF0910);
                    break;
                case "2011":
                    return x(d.TF1011);
                    break;
            }
        });
};

