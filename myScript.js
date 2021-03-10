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
        .text("Undergraduate Costs of Universities in Oklahoma from 2009 - 2018");
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
    return "Private Nonprofit";
});
svg.append("circle").attr("cx", LXP).attr("cy", LYP + 80).attr("r", 12).style("fill", "rgb(228, 26, 28)").attr("stroke", "#000");
svg.append("text").attr("class", "label").attr("x", LXP + 15).attr("y", LYP + 85).style("text-anchor", "start").text(function(d) {
    return "Private For-profit";
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
var institutionType = {
    1: "Public",
    2: "Private Non-profit",
    3: "Private For-profit"
}
// Define the div for the tooltip
var tooltip = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);

d3.csv("./data/OklahomaDataCombinedCleaned1.csv", function(error, data) {
    // console.log(error)
    // console.log(data)
    myData.push(error)
    x.domain([0, 60000]).nice();
    y.domain([0, 40000]).nice();
    
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
                    console.log(d)
                    if(d.IC2009_AY_RV == "" || d.SFA0910_RV == ""){
                        return 0
                    }
                    return (4 + (d.TotalEnrollment * .000655));
                })
            .attr("cx", function(d) {
                    // Tuition and fees IC
                    // console.log(d.IC2009_AY_RV)

                    return x(d.IC2009_AY_RV);
                })
            .attr("cy", function(d) {
                    // Loan data SFA
                    return y(d.SFA0910_RV);
                })
            .style("fill", function(d) {
                    if (d.Control == 3) {
                        // console.log("3")
                        // Private for-profit
                        return "rgb(228, 26, 28)";
                    } else if (d.Control == 2) {
                        // Private non-profit
                        return "rgb(53, 135, 212)";
                    } else {
                        // public
                        return "rgb(77, 175, 74)";
                    }
                })
            .on("mouseover", function(event, d) {	
                console.log("mouseover"+d.Control)	
                tooltip.transition()		
                    .duration(200)		
                    .style("opacity", .9);		
                tooltip.html(d.InstitutionName+"<br/>"+institutionType[d.Control] + "<br/>")	
                    .style("left", (event.pageX) + "px")		
                    .style("top", (event.pageY - 28) + "px");	
            })
            .on("mouseout", function(event, d) {		
                tooltip.transition()		
                    .duration(500)		
                    .style("opacity", 0);	
            })
                ;
            

});

var running = false;
var timer;
$("button").on("click", function() {
    console.log("test")
    var duration = 3000,
        maxstep = 2018,
        minstep = 2009;
    
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
                    // console.log(sliderValue)
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
// function to filter by 
filter = function() {
    myData.filter()( function(college) {
        return "";
    })
}
update = function() {

    d3.selectAll(".dot")
        .attr("r", function(d){
            switch ($("#slider").val()) {
                case "2009":
                    if (d.SFA0910_RV == "" || d.IC2009_AY_RV == ""){
                        return 0
                    }
                    else{
                        return (4 + (d.TotalEnrollment * .000655));
                    }
                    break;
                case "2010":
                    if (d.SFA1011_RV == "" || d.IC2010_AY_RV == ""){
                        return 0
                    }
                    else{
                        return (4 + (d.TotalEnrollment * .000655));
                    }
                    break;
                case "2011":
                    // console.log("2011")
                    if (d.SFA1112_RV == "" || d.IC2011_AY_RV == ""){
                        console.log("0 radius")
                        return 0
                    }
                    else{
                        // console.log("non-zero radius"+d.SFA1112_RV)

                        return (4 + (d.TotalEnrollment * .000655));
                    }
                    break;
                case "2012":
                    if (d.SFA1213_RV == "" || d.IC2012_AY == ""){
                        return 0
                    }
                    else{
                        return (4 + (d.TotalEnrollment * .000655));
                    }
                    break;
                case "2013":
                    if (d.SFA1314_RV == "" || d.IC2013_AY == ""){
                        return 0
                    }
                    else{
                        return (4 + (d.TotalEnrollment * .000655));
                    }
                    break;
                case "2014":
                    if (d.SFA1415_RV == "" || d.IC2014_AY == ""){
                        return 0
                    }
                    else{
                        return (4 + (d.TotalEnrollment * .000655));
                    }
                    break;
                case "2015":
                    if (d.SFA1516_RV == "" || d.IC2015_AY == ""){
                        return 0
                    }
                    else{
                        return (4 + (d.TotalEnrollment * .000655));
                    }
                    break;
                case "2016":
                    if (d.SFA1617_RV == "" || d.IC2016_AY == ""){
                        return 0
                    }
                    else{
                        return (4 + (d.TotalEnrollment * .000655));
                    }
                    break;
                case "2017":
                    if (d.SFA1718_RV == "" || d.IC2017_AY == ""){
                        return 0
                    }
                    else{
                        return (4 + (d.TotalEnrollment * .000655));
                    }
                    // return y(d.SFA1718_RV);
                    break;
                case "2018":
                    if (d.SFA1819 == "" || d.IC2018_AY == ""){
                        return 0
                    }
                    else{
                        return (4 + (d.TotalEnrollment * .000655));
                    }
                    // return y(d.SFA1819);
                    break;
            }
        })
        .transition()
        .duration(1000)
        .attr("cy", function(d) {
    
            switch ($("#slider").val()) {
                case "2009":
                    return y(d.SFA0910_RV);
                    break;
                case "2010":
                    return y(d.SFA1011_RV);
                    break;
                case "2011":
                    return y(d.SFA1112_RV);
                    break;
                case "2012":
                    return y(d.SFA1213_RV);
                    break;
                case "2013":
                    return y(d.SFA1314_RV);
                    break;
                case "2014":
                    return y(d.SFA1415_RV);
                    break;
                case "2015":
                    return y(d.SFA1516_RV);
                    break;
                case "2016":
                    return y(d.SFA1617_RV);
                    break;
                case "2017":
                    return y(d.SFA1718_RV);
                    break;
                case "2018":
                    return y(d.SFA1819);
                    break;
            }
        })
        .transition()
        .duration(1000)
        .attr("cx", function(d) {
            switch ($("#slider").val()) {
                case "2009":
                    return x(d.IC2009_AY_RV);
                    break;
                case "2010":
                    return x(d.IC2010_AY_RV);
                    break;
                case "2011":
                    return x(d.IC2011_AY_RV);
                    break;
                case "2012":
                    return x(d.IC2012_AY);
                    break;
                case "2013":
                    return x(d.IC2013_AY);
                    break;
                case "2014":
                    return x(d.IC2014_AY);
                    break;
                case "2015":
                    return x(d.IC2015_AY);
                    break;
                case "2016":
                    return x(d.IC2016_AY);
                    break;
                case "2017":
                    return x(d.IC2017_AY);
                    break;
                case "2018":
                    return x(d.IC2018_AY);
                    break;
            }
        });
};

