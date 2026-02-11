// Function to hide project column
function hideProjectColumn($table) {
  $table.find("th").each(function (index) {
    var headerText = $(this).text().toLowerCase();
    if (headerText.indexOf("project") !== -1) {
      var columnIndex = index;
      // Hide header
      $(this).hide();
      // Hide all cells in this column
      $table.find("tr").each(function () {
        $(this).find("td").eq(columnIndex).hide();
      });
    }
  });
}

// add bootstrap classes to tables
$(document).ready(function () {
  $("table").each(function () {
    if (determineComputedTheme() == "dark") {
      $(this).addClass("table-dark");
    } else {
      $(this).removeClass("table-dark");
    }

    // only select tables that are not inside an element with "news" (about page) or "card" (cv page) class
    if (
      $(this).parents('[class*="news"]').length == 0 &&
      $(this).parents('[class*="card"]').length == 0 &&
      $(this).parents('[class*="archive"]').length == 0 &&
      $(this).parents("code").length == 0
    ) {
      // make table use bootstrap-table
      $(this).attr("data-toggle", "table");
      // add some classes to make the table look better
      // $(this).addClass('table-sm');
      $(this).addClass("table-hover");
    }

    // Hide project column
    hideProjectColumn($(this));
  });

  // Also hide project column after bootstrap-table initializes (if it recreates the table)
  $(document).on("post-body.bs.table", function (e) {
    hideProjectColumn($(e.target));
  });
});
