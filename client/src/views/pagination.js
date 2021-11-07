// ============================================================================
//    Author: Kenneth Perkins
//    Date:   Aug 5, 2020
//    Taken From: http://programmingnotes.org/
//    File:  TablePagination.js
//    Description: Namespace which handles html table pagination
//    Example:
//        // Add Pagination to a table
//        TablePagination.page({
//            table: document.querySelector('table'), 
//            rowsPerPage: 10
//        });
// ============================================================================ 
/**
* NAMESPACE: TablePagination
* USE: Handles html table pagination.
*/
var TablePagination = TablePagination || {};
(function(namespace) {
    'use strict';   
    
// -- Public data --
    // Property to hold public variables and functions
    let exposed = namespace;
        
    // Set class names and other shared data
    const settings = {
        // Misc settings
        defaultRowsPerPage: 5,
        defaultPosition: 'bottom',
        defaultVisibleButtons: 3,
        onRenderDescFirstPage: 'first_page',
        onRenderDescPrevPage: 'previous_page',
        onRenderDescPageNumber: 'page_number',
        onRenderDescNextPage: 'next_page',
        onRenderDescLastPage: 'last_page',
        onRenderDescGoInput: 'go_input',
        buttonOptionFirst: 'first',
        buttonOptionPrevious: 'previous',
        buttonOptionNext: 'next',
        buttonOptionLast: 'last',
        navigationPositionTop: 'top',
        navigationPositionBottom: 'bottom',
        onTextRender: (text) => text,
        
        // Element class names
        classNameHide: '.pagination-hide',
        classNameButton: 'pagination-btn', 
        classNameButtonActive: 'active',
        classNameButtonFirst: 'first',
        classNameButtonPrevious: 'previous',
        classNameButtonPageNumber: 'page-number',
        classNameButtonNext: 'next',
        classNameButtonLast: 'last',
        classNameButtonGo: 'go',
        classNameButtonHide: 'hide',
        classNameNavigation: 'pagination-navigation',
        classNameNavigationTop: 'top',
        classNameNavigationBottom: 'bottom',
        classNameNavigationInfoSection: 'pagination-navigation-info-section',
        classNameNavigationControlSection: 'pagination-navigation-control-section',
        classNameNavigationButtonSection: 'pagination-navigation-button-section',
        classNameNavigationInputSection: 'pagination-navigation-input-section',
        classNameNavigationInput: 'pagination-navigation-input',
        
        // Element data names
        dataNamePageNumber: 'data-pageNumber',
        dataNameTotalPages: 'data-totalPages',
        dataNameRowsPerPage: 'data-rowsPerPage',
        dataNameCurrentPageNumber: 'data-currentPageNumber',
        dataNameNavigationId: 'data-navigationId',
        dataNameNavigationInfoId: 'data-navigationInfoId',
        dataNameNavigationInputId: 'data-navigationInputId',
        dataNameNavigationButtonsId: 'data-navigationButtonsId',
        dataNameVisiblePageButtons: 'data-visiblePageButtons',
        cleanClassName: (str) => {
            return str ? str.trim().replace('.', '') : '';
        },
    };    
    
    exposed.settings = settings;    
                                                                
    /**
    * FUNCTION: page
    * USE: Initializes & renders pagination for the given table elements
    * @param options: An object of initialization options.
    *   Its made up of the following properties:
    *   {
    *       table: One or more Javascript elements of the tables to page.
    *       rowsPerPage: Optional. The number of rows per page. Default is page 5
    *       initialPage: Optional. The initial page to display. Posible values: Numeric value 
    *          or 'first/last'. Default is page 1
    *       navigationPosition: Optional. The navigation position. Posible values: 'top/bottom'.
    *          Default is 'bottom'  
    *       showFirstPageButton: Optional. Boolean that indicates if the first page 
    *          button should be displayed. Default is true
    *       showLastPageButton: Optional. Boolean that indicates if the last page 
    *          button should be displayed. Default is true
    *       showPreviousPageButton: Optional. Boolean that indicates if the previous page 
    *          button should be displayed. Default is true
    *       showNextPageButton: Optional. Boolean that indicates if the next page 
    *          button should be displayed. Default is true 
    *       showPageNumberButtons: Optional. Boolean that indicates if the page number buttons 
    *          should be displayed. Default is true
    *       showNavigationInput: Optional. Specifies if the 'Go' search functionality is shown.
    *          Default is true  
    *       showNavigationInfoText: Optional. Specifies if the navigation info text is shown. 
    *          Default is true
    *       visiblePageNumberButtons: Optional. The maximum number of visible page number buttons. 
    *          Default is 3. Set to null to show all buttons 
    *       onButtonClick(pageNumber, event): Optional. Function that allows to do something on  
    *          button click 
    *       onButtonTextRender(text, desc): Optional. Function that allows to format the button text 
    *       onButtonTitleRender(title, desc): Optional. Function that allows to format the button title 
    *       onNavigationInfoTextRender(text, rowInfo): Optional. Function that allows to format  
    *          the navigation info text 
    *       navigationBindTo: Optional. Javascript element of the container where the navigation controls    
    *          are bound to. If not specified, default destination is above or below the table element, 
    *          depending on the 'navigationPosition' value    
    *   }
    * @return: N/A.
    */ 
    exposed.page = (options) => {
        // Make sure the required options are valid
        if (isNull(options)) {
            // Check to see if there are options
            throw new TypeError('There are no options specified.');
        } else if (typeof options !== 'object' || isElement(options) || isArrayLike(options)) {
            // Check to see if a table is specified
            let table = options;
            options = {};
            options.table = table;
        }
        // Make sure the table is an array
        if (!isArrayLike(options.table)) {
            options.table = [options.table];
        }       
        
        // Make sure additional options are valid
        if (!isNull(options.rowsPerPage) && !isNumeric(options.rowsPerPage)) {
            // Check to see if a rowsPerPage is valid
            throw new TypeError(`Unable to process rowsPerPage of type: ${typeof options.rowsPerPage}. Reason: '${options.rowsPerPage}' is not a numeric value.`);              
        } else if (!isNull(options.navigationBindTo) && !isElement(options.navigationBindTo)) {
            // Check to see if the navigation bind to element is an HTMLElement
            throw new TypeError(`Unable to process navigationBindTo of type: ${typeof options.navigationBindTo}. Reason: '${options.navigationBindTo}' is not an HTMLElement.`);            
        } else if (!isNull(options.onButtonTitleRender) && !isFunction(options.onButtonTitleRender)) {
            // Check to see if callback is a function
            throw new TypeError(`Unable to call onButtonTitleRender of type: ${typeof options.onButtonTitleRender}. Reason: '${options.onButtonTitleRender}' is not a function.`);
        } else if (!isNull(options.onButtonTextRender) && !isFunction(options.onButtonTextRender)) {
            // Check to see if callback is a function
            throw new TypeError(`Unable to call onButtonTextRender of type: ${typeof options.onButtonTextRender}. Reason: '${options.onButtonTextRender}' is not a function.`);
        } else if (!isNull(options.onButtonClick) && !isFunction(options.onButtonClick)) {
            // Check to see if callback is a function
            throw new TypeError(`Unable to call onButtonClick of type: ${typeof options.onButtonClick}. Reason: '${options.onButtonClick}' is not a function.`);
        } else if (!isNull(options.visiblePageNumberButtons) && !isNumeric(options.visiblePageNumberButtons)) {
            // Check to see if a visiblePageNumberButtons is valid
            throw new TypeError(`Unable to process visiblePageNumberButtons of type: ${typeof options.visiblePageNumberButtons}. Reason: '${options.visiblePageNumberButtons}' is not a numeric value.`);               
        } else if (!isNull(options.onNavigationInfoTextRender) && !isFunction(options.onNavigationInfoTextRender)) {
            // Check to see if callback is a function
            throw new TypeError(`Unable to call onNavigationInfoTextRender of type: ${typeof options.onNavigationInfoTextRender}. Reason: '${options.onNavigationInfoTextRender}' is not a function.`);
        }
        
        // Get the tables and remove the property from the object
        let tables = options.table;
        delete options.table;
        
        // Page the tables
        for (let index = 0; index < tables.length; ++index) {
            // Get the table and make sure its valid
            let table = tables[index];
            if (!isTable(table)) {
                // Check to see if the table is an HTMLTableElement
                throw new TypeError(`Unable to process ${getTableDisplayName(table)} of type: ${typeof table}. Reason: '${table}' is not an HTMLTableElement.`);
            }
        
            // Build the table navigation controls
            buildNavigation(table, options)
            
            // Add click events for the navigation controls
            addClickEvents(table, options);
            
            // Show the initial page
            showPage(table, {pageNumber: getInitialPage(table, options.initialPage), pageOptions: options});            
        }
    }
    
    /**
    * FUNCTION: remove
    * USE: Removes the rendered table pagination
    * @param table: JavaScript elements of the paged tables.
    * @return: True if table pagination controls were removed from all tables, false otherwise.
    */  
    exposed.remove = (tables) => {
        if (isNull(tables)) {
            return false;
        } else if (!isArrayLike(tables)) {
            tables = [tables];
        }
        let allRemoved = true;
        for (let index = 0; index < tables.length; ++index) {
            let table = tables[index];          
            if (!isTable(table)) {
                // Check to see if the table is an HTMLTableElement
                throw new TypeError(`Unable to process ${getTableDisplayName(table)} of type: ${typeof table}. Reason: '${table}' is not an HTMLTableElement.`);
            }
            if (!removeNavigation(table)) {
                allRemoved = false;
            }
        }       
        return allRemoved;
    }
    
// -- Private data --  
    let getRows = (table) => {
        let rows = table.rows;
        let results = [];
        // Only return data rows
        for (let indexRow = 0; indexRow < rows.length; ++indexRow) {
            let row = rows[indexRow];
            let isTDRow = true; 
            for (let indexCell = 0; indexCell < row.cells.length; ++indexCell) {
                let cell = row.cells[indexCell];                
                if (cell.tagName.toLowerCase() !== 'td') {
                    isTDRow = false;
                    break;
                }
            }
            if (isTDRow) {
                results.push(row);
            }
        }
        return results;
    }
 
    let buildNavigation = (table, options) => {
        // Remove the previous navigation
        removeNavigation(table);
        
        // Set the max rows per page
        let rowsPerPage = options.rowsPerPage || settings.defaultRowsPerPage;
        setRowsPerPage(table, rowsPerPage);     
        
        // Calculate the number of pages needed and set its value
        let totalPages = calculateTotalPagesRequired(table);
        setTotalPages(table, totalPages);
        if (totalPages < 1) {
            throw new Error(`${totalPages} pages calculated in order to page the table. Exiting...`);
        }
        
        // Get the current options 
        let position = (options.navigationPosition || settings.defaultPosition).trim().toLowerCase();
        let showNavigationInfoText = !isNull(options.showNavigationInfoText) ? options.showNavigationInfoText : true;
        let navigationBindTo = options.navigationBindTo || table.parentNode;
        let isCustomBinding = !isNull(options.navigationBindTo);
    
        // Add the navigation controls to the page
        let navigationContainer = attachNavigation({
            table: table, 
            container: navigationBindTo, 
            isCustomBinding: isCustomBinding,
            position: position,
            classes: getNavigationClasses(position),
            data: [{key: 'tabindex', value: 0}]
        }); 
        
        // Show page info
        if (showNavigationInfoText) {
            attachNavigationInfo({
                table: table, 
                container: navigationContainer,
                classes: [settings.classNameNavigationInfoSection]
            });
        }       
        
        // Add navigation buttons
        attatchNavigationButtons({
            table: table,
            pageOptions: options,
            container: navigationContainer,         
            classes: [settings.classNameNavigationControlSection]
        }); 
    }
    
    let addClickEvents = (table, options) => {
        let paginationButtons = getNavigationButtons(table);
        let inputButton = getInputButton(table);
        let inputTextbox = getInputTextbox(table);
        let navigation = document.querySelector(`#${getNavigationId(table)}`);
        
        // Make sure there are visible navigation buttons
        let navigationVisible = (!isNull(paginationButtons) && paginationButtons.length > 0) 
            || (!isNull(inputButton) && !isNull(inputTextbox));
        
        // Throw an error if there are no visible navigation buttons
        if (!navigationVisible) { 
            throw new Error(`The settings chosen on ${getTableDisplayName(table)} do not allow for any visible navigation buttons!`);
        }
        // Function to go to a page
        let navigateToPage = (pageNumber, event) => { 
            pageNumber = translatePageNumber(table, pageNumber);
            if (!isNumeric(pageNumber)) {
                return false;
            }
            // Show the page
            showPage(table, {pageNumber: pageNumber, pageOptions: options});
            
            // Call the on click function if specified
            if (options.onButtonClick) {
                options.onButtonClick.call(this, pageNumber, event);
            }
            return true;
        }
        // Add click events for the navigation buttons
        if (!isNull(paginationButtons)) {
            paginationButtons.forEach((paginationButton, index) => {
                // Add button click
                paginationButton.addEventListener('click', (event) => {
                    event.preventDefault();             
                    let pageNumber = getButtonPageNumber(paginationButton);
                    navigateToPage(pageNumber, event);
                    navigation.focus({preventScroll:true});
                });
            });
        }
        // Add click event for the input button
        if (!isNull(inputButton)) {
            inputButton.addEventListener('click', (event) => {
                event.preventDefault();
                // Get the input textbox
                let pageNumber = getInputValue(table, inputTextbox);
                navigateToPage(pageNumber, event);
            });
        }
        // Add click event for the input textbox
        if (!isNull(inputTextbox)) {
            inputTextbox.addEventListener('keyup', (event) => {
                event = event || window.event; 
                let keyCode = event.key || event.keyCode;
                // Check to see if the enter button was clicked
                switch (String(keyCode)) {
                    case 'Enter': case '13':
                        inputButton.click();
                        break;
                }
            });         
        }
        // Add click events for the left/right keyboard buttons
        if (!isNull(navigation)) {
            navigation.addEventListener('keydown', (event) => {
                event = event || window.event; 
                let keyCode = event.key || event.keyCode;
                let pageNumber = getCurrentPageNumber(table);               
                // Check to see if an arrow key was clicked
                switch (String(keyCode)) {
                    case 'ArrowLeft': case 'Left': case '37':
                        --pageNumber;
                        break;
                    case 'ArrowRight': case 'Right': case '39':
                        ++pageNumber;
                        break;
                    default:
                        return;
                        break;
                }
                navigateToPage(pageNumber, event);              
            });         
        }
    }
    
    let getTableId = (table) => {
        let tableId = !isNull(table.id) && table.id.length > 0 ? table.id : null;
        return tableId;
    }
    
    let getTableDisplayName = (table) => {
        let tableId = getTableId(table);
        let tableName = 'Table' + (tableId ? ' id: "' + tableId + '"' : '');
        return tableName;
    }   
    
    let getInitialPage = (table, initialPage) => {
        let initialActivePage = 1;
        if (!isNull(initialPage)) {
            let possiblePageNumber = translatePageNumber(table, initialPage);
            if (isNumeric(possiblePageNumber)) {
                initialActivePage = possiblePageNumber;
            }
        }
        return initialActivePage;
    }
    
    let translatePageNumber = (table, pageNumber) => {
        if (!isNull(pageNumber) && !isNumeric(pageNumber)) { 
            pageNumber = String(pageNumber).trim().toLowerCase();
            switch (pageNumber) {
                case settings.buttonOptionFirst.trim().toLowerCase():
                    pageNumber = 1;
                    break;
                case settings.buttonOptionLast.trim().toLowerCase():
                    pageNumber = getTotalPages(table);  
                    break;
                case settings.buttonOptionPrevious.trim().toLowerCase():
                    pageNumber = getCurrentPageNumber(table) - 1;   
                    break;
                case settings.buttonOptionNext.trim().toLowerCase():
                    pageNumber = getCurrentPageNumber(table) + 1; 
                    break;                  
            }
        }
        return pageNumber;
    }
    
    let getNavigationClasses = (position) => {
        let navigationClasses = []
        navigationClasses.push(settings.classNameNavigation);
        if (position == settings.navigationPositionTop.trim().toLowerCase()) { 
            navigationClasses.push(settings.classNameNavigationTop);
        } else { 
            navigationClasses.push(settings.classNameNavigationBottom);
        }   
        return navigationClasses;
    }   
    
    let hideAllRows = (table) => { 
        let totalPages = getTotalPages(table);
        for (let pageNumber = 1; pageNumber <= totalPages; ++pageNumber) {
            hidePage(table, {pageNumber: pageNumber});
        }
    }
 
    let hidePage = (table, options) => {  
        let pageNumber = options.pageNumber;
        let rowInfo = getRowInfo(table, pageNumber);
        let rowIndexStart = rowInfo.rowIndexStart;
        let rowIndexEnd = rowInfo.rowIndexEnd;      
        hideRows(table, rowIndexStart, rowIndexEnd);
    }
 
    let hideRows = (table, rowIndexStart, rowIndexEnd) => { 
        let tableRows = getRows(table);
        for (let index = rowIndexStart; index <= rowIndexEnd && index < tableRows.length; ++index) {
            let tableRow = tableRows[index];
            hideRow(tableRow);
        }
    }
 
    let hideRow = (tableRow) => { 
        addClass(tableRow, settings.classNameHide); 
    }
 
    let showAllRows = (table) => { 
        let totalPages = getTotalPages(table);
        for (let pageNumber = 1; pageNumber <= totalPages; ++pageNumber) {
            showPage(table, {
                pageNumber: pageNumber,
                hidePreviousRows: false
            });
        }
    }
 
    let showPage = (table, options) => { 
        if (isNull(options.hidePreviousRows) || options.hidePreviousRows) {
            hideAllRows(table);
        } 
        
        let rowInfo = getRowInfo(table, options.pageNumber);
        let rowIndexStart = rowInfo.rowIndexStart;
        let rowIndexEnd = rowInfo.rowIndexEnd;
        let pageNumber = rowInfo.pageNumber;
 
        showRows(table, rowIndexStart, rowIndexEnd);
        setCurrentPageNumber(table, pageNumber);
        highlightButton(table, pageNumber);
        
        showPageButtons(table, pageNumber);
        updateInfoText(table, rowInfo, options.pageOptions);
        clearInputValue(table);
    }
    
    let showRows = (table, rowIndexStart, rowIndexEnd) => { 
        let tableRows = getRows(table);
        for (let index = rowIndexStart; index <= rowIndexEnd && index < tableRows.length; ++index) {
            let tableRow = tableRows[index];
            showRow(tableRow);
        }
    }
 
    let showRow = (tableRow) => { 
        removeClass(tableRow, settings.classNameHide);
    }
    
    let clearInputValue = (table, inputTextbox = null) => {
        inputTextbox = inputTextbox || getInputTextbox(table);
        if (!isNull(inputTextbox)) {
            inputTextbox.value = null;
        }
    }
    
    let getInputValue = (table, inputTextbox = null) => {
        inputTextbox = inputTextbox || getInputTextbox(table);
        return !isNull(inputTextbox) ? inputTextbox.value : null;
    }
    
    let updateInfoText = (table, rowInfo, pageOptions) => {
        let navigationInfo = getNavigationInfo(table);
        if (isNull(navigationInfo)) {
            return;
        }
        let text = `Showing ${rowInfo.itemCountStart} to ${rowInfo.itemCountEnd} of ${rowInfo.totalItems} entries.`;
        text += `<br />`;
        text += `Page ${rowInfo.pageNumber} of ${rowInfo.totalPages}`;
        let onNavigationInfoTextRender = settings.onTextRender;
        if (!isNull(pageOptions) && !isNull(pageOptions.onNavigationInfoTextRender)) {
            onNavigationInfoTextRender = pageOptions.onNavigationInfoTextRender;
        }
        navigationInfo.innerHTML = onNavigationInfoTextRender.call(this, text, rowInfo);
    }   
    
    let showPageButtons = (table, pageNumber) => { 
        let visibleButtons = getTotalVisiblePageButtons(table);
        if (!isNumeric(visibleButtons)) {
            return;
        }       
        let totalPages = getTotalPages(table);
        let firstVisiblePage = Math.max(0, getPreviousMultiple(pageNumber, visibleButtons)) + 1;
        let lastVisiblePage = Math.min(totalPages, getNextMultiple(pageNumber, visibleButtons));     
        
        // Make sure there are at least 'visibleButtons' total buttons shown 
        let difference = (visibleButtons - 1) - (lastVisiblePage - firstVisiblePage); 
        if (difference > 0) {           
            firstVisiblePage -= difference;
        }
        
        getNavigationButtons(table).forEach((btn, index) => { 
            let buttonPageNumber = getButtonPageNumber(btn);
            if (isNumeric(buttonPageNumber)) {
                buttonPageNumber = Number(buttonPageNumber);
                addClass(btn, settings.classNameButtonHide);
                if (buttonPageNumber >= firstVisiblePage && buttonPageNumber <= lastVisiblePage) {
                    removeClass(btn, settings.classNameButtonHide);
                }
            }
        }); 
    }
 
    let getRowInfo = (table, pageNumber) => {
        let totalPages = getTotalPages(table);
        let rows = getRows(table);
        
        // Make sure the page number is within valid range [1 to last page number]
        pageNumber = Math.max(1, Math.min(pageNumber, totalPages));
        
        let totalItems = rows.length;
        let rowsPerPage = getRowsPerPage(table);
        let rowIndexStart = (pageNumber - 1) * rowsPerPage;
        let rowIndexEnd = Math.min(rowIndexStart + (rowsPerPage - 1), totalItems - 1);
        let rowInfo = {
            rowIndexStart: rowIndexStart,
            rowIndexEnd: rowIndexEnd,
            pageNumber: pageNumber,
            totalPages: totalPages,
            totalItems: totalItems,
            rowsPerPage: rowsPerPage,
            itemCountStart: rowIndexStart + 1,
            itemCountEnd: rowIndexEnd + 1,          
        };
        return rowInfo;
    }   
 
    let getCurrentPageNumber = (table) => {
        let pageNumber = getData(table, settings.dataNameCurrentPageNumber);
        return isNull(pageNumber) ? 0 : Number(pageNumber);
    }
 
    let setCurrentPageNumber = (table, pageNumber) => { 
        addData(table, {key: settings.dataNameCurrentPageNumber, value: pageNumber});       
    }
    
    let highlightButton = (table, pageNumber) => {
        let paginationButton = null;
        let paginationButtons = getNavigationButtons(table);
        if (isNull(paginationButtons)) {
            return;
        }
        // Reset the previous page button colors 
        resetButtonColors(paginationButtons);
        
        // Mark the selected button as active
        paginationButtons.forEach((btn, index) => { 
            let buttonPageNumber = getButtonPageNumber(btn);
            if (isNumeric(buttonPageNumber) 
                && Number(pageNumber) === Number(buttonPageNumber)) {
                paginationButton = btn;
                return false;
            }
        });
        if (!isNull(paginationButton)) {
            addClass(paginationButton, settings.classNameButtonActive);
        }       
    }
    
    let resetButtonColors = (paginationButtons) => { 
        if (isNull(paginationButtons)) {
            return;
        }
        paginationButtons.forEach((paginationButton, index) => { 
            let buttonPageNumber = getButtonPageNumber(paginationButton);
            if (isNumeric(buttonPageNumber)) {
                removeClass(paginationButton, settings.classNameButtonActive);
            }
        }); 
    }   
    
    let getButtonPageNumber = (btn) => {
        let pageNumber = getData(btn, settings.dataNamePageNumber);
        return String(!isNull(pageNumber) ? pageNumber : 0);
    }
    
    let setNavigationId = (table, navigationId) => {
        addData(table, {key: settings.dataNameNavigationId, value: navigationId});      
    }
    
    let getNavigationId = (table) => {
        return getData(table, settings.dataNameNavigationId);
    }
 
    let setNavigationInfoId = (table, navigationInfoId) => {
        addData(table, {key: settings.dataNameNavigationInfoId, value: navigationInfoId});      
    }
    
    let getNavigationInfoId = (table) => {
        return getData(table, settings.dataNameNavigationInfoId);
    }
    
    let setNavigationInputId = (table, navigationInputId) => {
        addData(table, {key: settings.dataNameNavigationInputId, value: navigationInputId});        
    }
    
    let getNavigationInputId = (table) => {
        return getData(table, settings.dataNameNavigationInputId);
    }   
    
    let getNavigationButtons = (table) => {
        let selector = `#${getNavigationButtonsId(table)} a`;
        return document.querySelectorAll(selector);
    }   
    
    let getInputButton = (table) => {
        let selector = `#${getNavigationInputId(table)} a`;
        return document.querySelector(selector);
    }   
    
    let getInputTextbox = (table) => {
        let selector = `#${getNavigationInputId(table)} input`;
        return document.querySelector(selector);
    }   
 
    let getNavigationInfo = (table) => {
        let selector = `#${getNavigationInfoId(table)}`;
        return document.querySelector(selector);
    }
    
    let setNavigationButtonsId = (table, navigationButtonsId) => {
        addData(table, {key: settings.dataNameNavigationButtonsId, value: navigationButtonsId});        
    }
    
    let getNavigationButtonsId = (table) => {
        return getData(table, settings.dataNameNavigationButtonsId);
    }   
 
    let getTotalVisiblePageButtons = (table) => {
        let value = getData(table, settings.dataNameVisiblePageButtons);
        return !isNull(value) ? Number(value) : value;
    }
 
    let setTotalVisiblePageButtons = (table, visiblePageButtons) => {
        addData(table, {key: settings.dataNameVisiblePageButtons, value: visiblePageButtons});      
    }   
    
    let setRowsPerPage = (table, rowsPerPage) => { 
        addData(table, {key: settings.dataNameRowsPerPage, value: rowsPerPage});
    }
    
    let getRowsPerPage = (table) => {
        let value = getData(table, settings.dataNameRowsPerPage);
        return !isNull(value) ? Number(value) : value;
    }
 
    let setTotalPages = (table, totalPages) => { 
        addData(table, {key: settings.dataNameTotalPages, value: totalPages});      
    }   
        
    let getTotalPages = (table) => {
        let value = getData(table, settings.dataNameTotalPages);
        return !isNull(value) ? Number(value) : value;
    }
    
    let calculateTotalPagesRequired = (table) => {
        let rowsPerPage = getRowsPerPage(table);
        let totalRows = getRows(table).length;
        let totalPages = totalRows / rowsPerPage;
        if (totalRows % rowsPerPage !== 0) {
            totalPages = Math.floor(++totalPages);
        }
        return totalPages;      
    }   
    
    let addClass = (element, cssClass) => {
        cssClass = settings.cleanClassName(cssClass);
 
        let modified = false;
        if (cssClass.length > 0 && !hasClass(element, cssClass)) {
            element.classList.add(cssClass)
            modified = true;
        }
        return modified;
    }
 
    let removeClass = (element, cssClass) => {
        cssClass = settings.cleanClassName(cssClass);
 
        let modified = false;
        if (cssClass.length > 0 && hasClass(element, cssClass)) {
            element.classList.remove(cssClass);
            modified = true;
        }
        return modified;
    }
 
    let hasClass = (element, cssClass) => {
        cssClass = settings.cleanClassName(cssClass);
        return element.classList.contains(cssClass);
    }
 
    let isNull = (item) => {
        return isUndefined(item) || null === item;
    } 
 
    let isUndefined = (item) => {
        return undefined === item;
    } 
    
    let isFunction = (item) => {
        return 'function' === typeof item
    }   
    
    let isTable = (item) => {
        return isElement(item) && item instanceof HTMLTableElement;
    }
    
    let isElement = (item) => {
        let value = false;
        try { 
            value = item instanceof HTMLElement || item instanceof HTMLDocument;
        }
        catch (e) {
            value = (typeof item==="object") && 
                (item.nodeType===1) && (typeof item.style === "object") &&
                (typeof item.ownerDocument ==="object");
        }
        return value;
    }   
    
    let randomFromTo = (from, to) => {
        return Math.floor(Math.random() * (to - from + 1) + from);
    }
    
    let isNumeric = (n) => {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    
    let generateNavigationId = (table) => {
        let tableId = getTableId(table);
        return 'tablePaginationNavigation_' + (tableId ? tableId : randomFromTo(1271991, 7281987));
    }
    
    let removeNavigation = (table) => {
        let modified = false;
        let previousNavigationId = getNavigationId(table);
        
        // Remove the previous table navigation 
        if (!isNull(previousNavigationId)) {
            let previousElement = document.querySelector(`#${previousNavigationId}`);
            if (!isNull(previousElement)) {             
                previousElement.parentNode.removeChild(previousElement);
                showAllRows(table);
                modified = true;
            }
        }
        return modified;
    }
    
    let attachNavigation = (options) => {
        // Create the table navigation control div
        let navigationContainer = document.createElement('div');
        navigationContainer.id = generateNavigationId(options.table);
        
        // Determine the navigation position
        let position = options.position.trim().toLowerCase();
        if (!options.isCustomBinding) {
            if (position === settings.navigationPositionTop) {
                // Insert navigation before the table
                options.container.insertBefore(navigationContainer, options.table);         
            } else {
                // Insert navigation after the table
                options.container.insertBefore(navigationContainer, options.table.nextSibling);         
            }
        } else {
            if (position === settings.navigationPositionTop) {
                // Insert navigation at the beginning of the container
                options.container.insertBefore(navigationContainer, options.container.firstChild);
            } else {
                // Insert navigation ar end of the container
                options.container.insertBefore(navigationContainer, options.container.lastChild);           
            }
        }
        // Add classes and data
        addClasses(navigationContainer, options.classes);
        addData(navigationContainer, options.data);
        
        // Set the current table navigation control id
        setNavigationId(options.table, navigationContainer.id);
        setNavigationInfoId(options.table, null);
        
        return navigationContainer;
    }
    
    let attachButton = (options) => {
        let btn = document.createElement('a');
        btn.href = '#';
        
        addClasses(btn, options.classes);
        addData(btn, options.data);
        
        btn.insertAdjacentHTML('beforeend', options.text);
        btn.title = options.title;
        options.container.appendChild(btn);
        return btn;
    }
    
    let attatchNavigationButtons = (options) => {
        let pageOptions = options.pageOptions;
        let table = options.table;
        
        // Create the table navigation info control div
        let navigationButtonSection = document.createElement('div');
        navigationButtonSection.id = options.container.id + '_control_section';
        options.container.appendChild(navigationButtonSection);
            
        // Add classes and data
        addClasses(navigationButtonSection, options.classes);
        addData(navigationButtonSection, options.data);
                
        let showFirstPageButton = !isNull(pageOptions.showFirstPageButton) ? pageOptions.showFirstPageButton : true;
        let showLastPageButton = !isNull(pageOptions.showLastPageButton) ? pageOptions.showLastPageButton : true;
        let showPreviousPageButton = !isNull(pageOptions.showPreviousPageButton) ? pageOptions.showPreviousPageButton : true;
        let showNextPageButton = !isNull(pageOptions.showNextPageButton) ? pageOptions.showNextPageButton : true;
        let showPageNumberButtons = !isNull(pageOptions.showPageNumberButtons) ? pageOptions.showPageNumberButtons : true;
        let showNavigationInput = !isNull(pageOptions.showNavigationInput) ? pageOptions.showNavigationInput : true;
        
        let onButtonTitleRender = pageOptions.onButtonTitleRender || settings.onTextRender; 
        let onButtonTextRender = pageOptions.onButtonTextRender || settings.onTextRender; 
        let defaultVisibleButtons = !isUndefined(pageOptions.visiblePageNumberButtons) ? pageOptions.visiblePageNumberButtons : settings.defaultVisibleButtons;
        if (isNumeric(defaultVisibleButtons) && defaultVisibleButtons < 1) {
            showPageNumberButtons = false;
        }
        
        // Set the total visible page number buttons
        setTotalVisiblePageButtons(table, defaultVisibleButtons);
        
        // Create the buttons div
        let navigationButtons = document.createElement('div');
        navigationButtons.id = navigationButtonSection.id + '_buttons';
        navigationButtonSection.appendChild(navigationButtons);
 
        // Set the current table navigation butons id 
        setNavigationButtonsId(table, navigationButtons.id);
        
        addClasses(navigationButtons, [settings.classNameNavigationButtonSection]);
        
        // Add the first page button
        if (showFirstPageButton) { 
            attachButton({
                container: navigationButtons,
                classes: [settings.classNameButton, settings.classNameButtonFirst],
                data: {key: settings.dataNamePageNumber, value: settings.buttonOptionFirst},
                text: onButtonTextRender.call(this, '⇠ First', settings.onRenderDescFirstPage),
                title: onButtonTitleRender.call(this, 'First Page', settings.onRenderDescFirstPage),
            });
        }
        // Add the previous page button
        if (showPreviousPageButton) { 
            attachButton({
                container: navigationButtons,
                classes: [settings.classNameButton, settings.classNameButtonPrevious],
                data: {key: settings.dataNamePageNumber, value: settings.buttonOptionPrevious},
                text: onButtonTextRender.call(this, '⮜', settings.onRenderDescPrevPage),
                title: onButtonTitleRender.call(this, 'Previous Page', settings.onRenderDescPrevPage),
            });         
        }   
        // Add the page number buttons
        if (showPageNumberButtons) {
            let totalPages = getTotalPages(table);
            for (let index = 1; index <= totalPages; ++index) {
                attachButton({
                    container: navigationButtons,
                    classes: [settings.classNameButton, settings.classNameButtonPageNumber],
                    data: {key: settings.dataNamePageNumber, value: index},
                    text: onButtonTextRender.call(this, String(index), settings.onRenderDescPageNumber),
                    title: onButtonTitleRender.call(this, 'Page ' + index, settings.onRenderDescPageNumber),
                });
            }           
        }   
        // Add the next page button
        if (showNextPageButton) {
            attachButton({
                container: navigationButtons,
                classes: [settings.classNameButton, settings.classNameButtonNext],
                data: {key: settings.dataNamePageNumber, value: settings.buttonOptionNext},
                text: onButtonTextRender.call(this, '⮞', settings.onRenderDescNextPage),
                title: onButtonTitleRender.call(this, 'Next Page', settings.onRenderDescNextPage),
            });
        }
        // Add the last page button
        if (showLastPageButton) {
            attachButton({
                container: navigationButtons,
                classes: [settings.classNameButton, settings.classNameButtonLast],
                data: {key: settings.dataNamePageNumber, value: settings.buttonOptionLast},
                text: onButtonTextRender.call(this, 'Last ⤑', settings.onRenderDescLastPage),
                title: onButtonTitleRender.call(this, 'Last Page', settings.onRenderDescLastPage),
            });         
        }   
        // Add navigation input
        if (showNavigationInput) {
            attachNavigationInput({
                table: table, 
                pageOptions: pageOptions,
                container: navigationButtonSection,
                classes: [settings.classNameNavigationInputSection]
            });             
        }           
        return navigationButtonSection;
    }   
    
    let attachNavigationInfo = (options) => {
        // Create the table navigation info control div
        let navigationInfo = document.createElement('div');
        
        navigationInfo.id = options.container.id + '_info_section';
        options.container.appendChild(navigationInfo);
            
        // Add classes and data
        addClasses(navigationInfo, options.classes);
        addData(navigationInfo, options.data);
        
        // Set the current table navigation info id 
        setNavigationInfoId(options.table, navigationInfo.id);
        
        return navigationInfo;
    }   
    
    let attachNavigationInput = (options) => {
        let pageOptions = options.pageOptions;
        let onButtonTitleRender = pageOptions.onButtonTitleRender || settings.onTextRender; 
        let onButtonTextRender = pageOptions.onButtonTextRender || settings.onTextRender; 
        
        // Create the table navigation input control div
        let navigationInputContainer = document.createElement('div');
        navigationInputContainer.id = options.container.id + '_input';
        options.container.appendChild(navigationInputContainer);
        
        // Add classes and data
        addClasses(navigationInputContainer, options.classes);
        addData(navigationInputContainer, options.data);        
        
        // Add the input textbox
        let navigationGoInput = document.createElement('input');
        navigationGoInput.type = 'text';
        navigationInputContainer.appendChild(navigationGoInput);
        
        // Add input classes
        addClasses(navigationGoInput, [settings.classNameNavigationInput]);
        
        // Add the Go button
        attachButton({
            container: navigationInputContainer,
            classes: [settings.classNameButton, settings.classNameButtonGo],
            text: onButtonTextRender.call(this, 'Go', settings.onRenderDescGoInput),
            title: onButtonTitleRender.call(this, 'Go To Page', settings.onRenderDescGoInput),
        }); 
        
        // Set the current table navigation input id 
        setNavigationInputId(options.table, navigationInputContainer.id);
        
        return navigationInputContainer;
    }   
    
    let addClasses = (element, classes) => {
        if (isNull(classes)) {
            return;
        } else if (!Array.isArray(classes)) {
            classes = [classes];
        }
        classes.forEach(item => {
            addClass(element, item);
        }); 
    }
    
    let removeClasses = (element, classes) => {
        if (isNull(classes)) {
            return;
        } else if (!Array.isArray(classes)) {
            classes = [classes];
        }
        classes.forEach(item => {
            removeClass(element, item);
        });     
    }   
    
    let addData = (element, data) => {
        if (isNull(data)) {
            return;
        } else if (!Array.isArray(data)) {
            data = [data];
        }
        data.forEach(item => {
            if (!isNull(item.value)) {
                element.setAttribute(item.key, item.value);
            } else {
                removeData(element, item);
            }
        });         
    }
    
    let removeData = (element, data) => {
        if (isNull(data)) {
            return;
        } else if (!Array.isArray(data)) {
            data = [data];
        }
        data.forEach(item => {
            let key = item.key || item;
            element.removeAttribute(key);
        });         
    }
    
    let getData = (element, data) => {
        if (isNull(data)) {
            return null;
        } else if (!Array.isArray(data)) {
            data = [data];
        }
        let results = [];
        data.forEach(item => {
            let key = item.key || item;
            results.push(element.getAttribute(key));
        });
        return results.length == 1 ? results[0] : results;
    }
        
    let getNextMultiple = (number, multiple, skipAlreadyMultiple = false) => {
        let retVal = 0;
        if (multiple !== 0) {
            let remainder = (number % multiple);
            if (!skipAlreadyMultiple && remainder === 0) {
                retVal = number;
            } else {
                retVal = number + (multiple - remainder);
            }            
        }
        return retVal;
    }
        
    let getPreviousMultiple = (number, multiple, skipAlreadyMultiple = false) => {     
        return getNextMultiple(number, multiple, !skipAlreadyMultiple) - multiple;
    }   
    
    // see if it looks and smells like an iterable object, and do accept length === 0
    let isArrayLike = (item) => {
        return (
            Array.isArray(item) || 
            (!!item &&
                typeof item === "object" &&
                typeof (item.length) === "number" && 
                (item.length === 0 ||
                    (item.length > 0 && 
                        (item.length - 1) in item)
                )
            )
        );
    }   
 
    (function (factory) {
        if (typeof define === 'function' && define.amd) {
            define([], factory);
        } else if (typeof exports === 'object') {
            module.exports = factory();
        }
    }(function() { return namespace; })); 
}(TablePagination)); // http://programmingnotes.org/
