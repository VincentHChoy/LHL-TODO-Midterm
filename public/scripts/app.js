const dummyData = [
  { label: "apple", y: 10 },
  { label: "orange", y: 15 },
  { label: "banana", y: 25 },
  { label: "mango", y: 30 },
  { label: "grape", y: 28 },
];

$(document).ready(function () {
  //drag and drop UI
  $(function () {
    $(".sortable").sortable();
  });

  //ChartJS

  const chartOptions = (dataRaw, type) => {
    const getData = (data) => {
      const labels = [];
      const values = [];
      for (const dataPoints of data) {
        labels.push(dataPoints.label);
        values.push(dataPoints.y);
      }
      return { labels, values };
    };

    // const randomColor = (howMany) => {
    //   const output = [];
    //   const colors = ["crimson", "blue", "aqua", "HotPink",'purple'];
    //   for (let i = 0; i < howMany; i++) {
    //     output.push('#' + Math.floor(Math.random()*16777215).toString(16));
    //   }
    //   return output
    // };

    const dataPoints = getData(dataRaw);
    const colorsList = randomColor(dataPoints.labels.length)
    console.log(colorsList)

    const data = {
      labels: dataPoints.labels,
      datasets: [
        {
          label: "My First Dataset",
          data: dataPoints.values,
          backgroundColor: [
            "crimson",
            "orange",
            "gold",
            "green",
            "DodgerBlue",
            "indigo",
            "pink",
          ],
          hoverOffset: 4,
        },
      ],
    };

    return {
      type: type,
      data: data,
      options: {
        plugins: {
          legend: {
            position: "right",
          },
        },
      },
    };
  };

  const myChart = new Chart(
    document.getElementById("myChart"),
    chartOptions(dummyData, "pie")
  );

  //copy to clipboard

  const copyToClipboard = function () {
    /* Get the text field */
    var copyText = document.getElementById("myInput");

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);

    /* Alert the copied text */
    alert("Copied the text: " + copyText.value);
  };

  $("#copy-button").click(copyToClipboard);
});
