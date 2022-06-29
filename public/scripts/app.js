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
      output.push($(this).text());
    });
    return output.map((word) =>
      word.replace(/\r?\n|\r/g, "").replace(/ /g, "")
    );
  };

  const getInitalValues = function () {
    const output = {
      options: [
        {
          id: 0,
          text: "",
          points: -1,
        },
        {
          id: 1,
          text: "",
          points: -1,
        },
        {
          id: 2,
          text: "",
          points: -1,
        },
        {
          id: 3,
          text: "",
          points: -1,
        },
      ],
    };

    const options = getListvalues();

    let i = 0;
    for (const object of output.options) {
      object.text = options[i];
      i++;
    }
    return output;
  };

  const initalValues = getInitalValues();

  const assignPoints = function (initalValues) {
    const points = [3, 2, 1, 0];
    const rankings = []; //[1,3,0,2]

    $("#ranking li").each(function () {
      rankings.push(parseInt(this.id));
    });

    console.log("this is rankings", rankings);

    for (let i = 0; i < points.length; i++) {
      let id = rankings.indexOf(initalValues.options[i].id); // find id relation to rankings
      initalValues.options[i].points = points[id];
    }

    console.log(initalValues);
    return initalValues;
  };

  const handleSubmit = function (event) {
    event.preventDefault();
    const id = $(this).attr("poll-id");

    $.ajax({
      url: `http://localhost:8080/poll/${id}`, // `http://localhost:/poll/:id/options`
      method: "POST",
      data: { votes: assignPoints(initalValues) },
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

  const handleResults = function (event) {
    // event.preventDefault();
    const id = $("#myChart").data("poll-id");

    $.ajax({
      url: `http://localhost:8080/api/poll/${id}/results`, // `http://localhost:/poll/:id/options`
      method: "GET",
    })
      .then((data) => {
        console.log(data);
        const myChart = new Chart(
          document.getElementById("myChart"),
          chartOptions(data.options, "pie")
        );
      })
      .catch((error) => {
        console.log(error);

        if (error.status === 404) {
          console.log("error");
        }
      });
  };
  console.log("hello world");
  handleResults();
});
