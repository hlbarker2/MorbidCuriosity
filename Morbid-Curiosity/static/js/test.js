function testBuild() {
    d3.json(`/?outputs=${outputs}`).then((data) => {

        buildGauge(data.outputs);
    });
}

testBuild();