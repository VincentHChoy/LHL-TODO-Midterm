// Client facing scripts here
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

    const dataPoints = getData(dataRaw);

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
    navigator.clipboard.writeText(window.location.href);
    // /* Alert the copied text */
    alert("Copied the url");
  };

  $("#copy-button").click(copyToClipboard);

  const getListvalues = function () {
    const output = [];
    $("#ranking li").each(function () {
      // console.log(this.id);
      output.push(this.id);

      //targets value within list
      //  console.log($(this).text());
    });

    return output;
  };

  const handleSubmit = () => {
    $.ajax({
      url: `http://localhost:8080/poll`, // `http://localhost:/poll/:id/options`
      method: "POST",
      data: getListvalues(),
    })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);

        if (error.status === 404) {
          console.log("error");
        }
      });
  };

  $("#submit-ranking").click(handleSubmit);

  const getPollOptions = function () {
    $("#poll-options input").each(function () {
      console.log(this.value);
      // output.push(this.id);

      //targets value within list
      //  console.log($(this).text());
    });
  };

  // $("#submit-poll").click(getPollOptions);
});
