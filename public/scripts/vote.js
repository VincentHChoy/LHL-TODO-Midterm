$(document).ready(function () {
  //drag and drop UI
  $(function () {
    $(".sortable").sortable();
  });

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
        window.location = `http://localhost:8080/poll/${id}/results`;
      })
      .catch((error) => {
        console.log(error);

        if (error.status === 404) {
          console.log("error");
        }
      });
  };

  $("#submit-ranking").click(handleSubmit);


});
