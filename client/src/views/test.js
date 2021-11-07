<script>

function PaginationTable(data=hotels) {

    const pageLength 	    = 10;
    const opacity         = 0.8
    const showInfoSection = true;
    const showButtons     = true;


    const table 		  = document.querySelector(".table");
    const pagination  = document.querySelector(".pagination-hide");
    const counter     = document.querySelector(".pagination-navigation-info-section");
    const buttons     = document.querySelector(".pagination-navigation-button-section");
    const first 		  = document.querySelector(".first");
    const previous	  = document.querySelector(".previous");
    const next  		  = document.querySelector(".next");
    const last  		  = document.querySelector(".last");

    const rows        = data.length;
    const lastPage    = rows - (rows % pageLength); 

    let   array       = [];
    let   page 			  = 0;
    var   to          = 0;

    for (let i=0; i < rows; i++){

      let tr              = document.createElement("tr");
      let td              = document.createElement("td");
      let checkbox        = document.createElement("input");
      let label           = document.createElement("label");
      
      label.classname="form-check-label" ;
      label.for="check-"+i;

      checkbox.type       = "checkbox";
      checkbox.className  = "form-check-input";
      checkbox.id         = 'check'+i;

      td.appendChild(checkbox);
      tr.appendChild(td);

      td = document.createElement("td");
      td.textContent = data[i].Addressbook_id;
      tr.appendChild(td);

      td = document.createElement("td");
      td.textContent = data[i].Organisation;
      tr.appendChild(td);

      td = document.createElement("td");
      td.textContent = data[i].City;
      tr.appendChild(td);

      td = document.createElement("td");
      td.textContent = data[i].StateName != undefined ? data[i].StateName+', '+data[i].Country : data[i].Country;
      tr.appendChild(td);

      td = document.createElement("td");
      td.innerHTML = "<button class='edit' tabindex='0' type='button' title=''><span class='edit'><svg class='edit' focusable='false' viewbox='0 0 24 24' aria-hidden='true' role='presentation'><path d='M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z'><path fill='none' d='M0 0h24v24H0z'></svg></span></button>";
      tr.appendChild(td);

      td = document.createElement("td");
      td.innerHTML = "";
      tr.appendChild(td);

      array.push(tr);
    }

    if (showInfoSection == false){
      counter.style.visibility = "hidden";
    }
    if (showButtons == false){
      buttons.style.visibility = "hidden";
    }


    for (let i=0; i< (page + pageLength); i++){
      if(array[i] != undefined){
        table.appendChild(array[i]);
      }
    }
    first.style.opacity       = opacity;
    previous.style.opacity    = opacity;
    counter.innerText = "Showing 1 to "+(page + pageLength)+" of "+rows+" rows";

    if (rows <= pageLength) {
      pagination.style.display = "none";
    } else {
      pagination.style.display = "flex";
    }


    next.addEventListener('click',()=>{

      if (page != lastPage){
        page == (rows - pageLength) ? page = 0  : page += pageLength;

        table.innerHTML = "";
        to = 0;

        for (let i=page; i< (page + pageLength); i++){
          if(array[i] != undefined){
            table.appendChild(array[i]);
            to = i + 1;
          }
        }

        if ( to == rows ) {
          next.style.opacity      = opacity;
          last.style.opacity      = opacity;
        };
        first.style.opacity       = 1;
        previous.style.opacity    = 1;

        counter.innerText = "Showing "+(page+1)+" to "+to+" of "+rows+" rows";
      };
    });


    previous.addEventListener('click',()=>{

      (page - pageLength) < 0 ?  page = 0 : page -= pageLength;

      table.innerHTML = "";

      for (let i=page; i< page + pageLength; i++){
        table.appendChild(array[i]);
      }

      if ( page == 0) {
        previous.style.opacity  = opacity;
        first.style.opacity     = opacity;
      };
      next.style.opacity        = 1;
      last.style.opacity        = 1;

      counter.innerText= "Showing "+(page+1)+" to "+(page+pageLength)+" of "+rows+" rows";
    });


    first.addEventListener('click',()=>{

      page = 0 ;
      table.innerHTML = "";

      for (let i=page; i< page + pageLength; i++){
        table.appendChild(array[i]);
      }

      first.style.opacity       = opacity;
      previous.style.opacity    = opacity;
      next.style.opacity        = 1;
      last.style.opacity        = 1;

      counter.innerText = "Showing 1 to "+pageLength+" of "+rows+" rows";
    });


    last.addEventListener('click',()=>{

      page = lastPage;

      table.innerHTML = "";

      for (i=page; i< rows; i++){
        table.appendChild(array[i]);
      };

      first.style.opacity       = 1;
      previous.style.opacity    = 1;
      next.style.opacity        = opacity;
      last.style.opacity        = opacity;

      counter.innerText = "Showing "+lastPage+" to "+rows+" of "+rows+" rows";
    });

};

PaginationTable();

// Vanilla JS table filter
// Source: https://blog.pagesd.info/2019/10/01/search-filter-table-javascript/

(function () {
  "use strict";

  var TableFilter = (function () {
    var search;

    function dquery(selector) {
      // Returns an array of elements corresponding to the selector
      return Array.prototype.slice.call(document.querySelectorAll(selector));
    }

    function onInputEvent(e) {
      // Retrieves the text to search
      var input = e.target;
      search = input.value.toLocaleLowerCase();
      // Get the lines where to search
      // (the data-table attribute of the input is used to identify the table to be filtered)
      //var selector = input.getAttribute("data-table") + " tbody tr";
      //var rows = dquery(selector);
      // Searches for the requested text on all rows of the table
      [].forEach.call(data, filter);
      // Updating the line counter (if there is one defined)
      // (the data-count attribute of the input is used to identify the element where to display the counter)
      var writer = input.getAttribute("data-count");
      if (writer) {
        // If there is a data-count attribute, we count visible rows
        var count = rows.reduce(function (t, x) { return t + (x.style.display === "none" ? 0 : 1); }, 0);
        // Then we display the counter
        dquery(writer)[0].textContent = count;
      }
    }

    function filter(row) {
      // Caching the tr line in lowercase
      if (row.lowerTextContent === undefined)
        row.lowerTextContent = row.textContent.toLocaleLowerCase();
      // Hide the line if it does not contain the search text
      row.style.display = row.lowerTextContent.indexOf(search) === -1 ? "none" : "table-row";
    }

    return {
      init: function () {
        // get the list of input fields with a data-table attribute
        var inputs = dquery("input[data-table]");
        [].forEach.call(inputs, function (input) {
          // Triggers the search as soon as you enter a search filter
          input.oninput = onInputEvent;
          // If we already have a value (following navigation back), we relaunch the search
          if (input.value !== "") input.oninput({ target: input });
        });
      }
    };

  })();

  TableFilter.init();
})();



function settings(e){
  let checkbox  = document.getElementById('col'+e);
  let column    = document.getElementById('col-'+e);
  
  checkbox.checked == true ? column.style.visibility = 'visible' : column.style.visibility = 'collapse';
};

document.getElementById("agents").addEventListener("click", (event) => { PaginationTable(agents) });
document.getElementById("hotels").addEventListener("click", (event) => { PaginationTable(hotels) });


</script>