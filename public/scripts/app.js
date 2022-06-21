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

  const data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const config = {
    type: "pie",
    data: data,
    options: {
      plugins: {
        legend: {
          position: "right",
        },
      },
    },
  };

  const myChart = new Chart(document.getElementById("myChart"), config);

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
