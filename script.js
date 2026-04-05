/* 
 * Created by: ZodiaKGalXy
 * Assisted with: GitHub Copilot
 * Creation date: 2025-03-08
 * Contributed for: The Wii Homebrew Community
 * 
 * This JS file contains logic for the HTML file.
 */

"use strict";

const cellData = [
    // Classic Controller Buttons
    { imageUrl: "./img/WiiClassicA.png", text: "Wii Classic A" },
    { imageUrl: "./img/WiiClassicB.png", text: "Wii Classic B" },
    { imageUrl: "./img/WiiClassicL.png", text: "Wii Classic L" },
    { imageUrl: "./img/WiiClassicR.png", text: "Wii Classic R" },
    { imageUrl: "./img/WiiClassicX.png", text: "Wii Classic X" },
    { imageUrl: "./img/WiiClassicY.png", text: "Wii Classic Y" },
    { imageUrl: "./img/WiiClassicZL.png", text: "Wii Classic ZL" },
    { imageUrl: "./img/WiiClassicZR.png", text: "Wii Classic ZR" },
    { imageUrl: "./img/WiiClassicSTART.png", text: "Wii Classic START" },
    { imageUrl: "./img/WiiClassicSELECT.png", text: "Wii Classic SELECT" },
    // Wii Remote Buttons
    { imageUrl: "./img/WiiRemoteA.png", text: "Wii Remote A" },
    { imageUrl: "./img/WiiRemoteB.png", text: "Wii Remote B" },
    { imageUrl: "./img/WiiRemote1.png", text: "Wii Remote 1" },
    { imageUrl: "./img/WiiRemote2.png", text: "Wii Remote 2" },
    // Other Buttons
    { imageUrl: "./img/WiiRemote-DPAD.png", text: "Directional Pad" },
    { imageUrl: "./img/WiiHomeButton.png", text: "Home Button" },
    { imageUrl: "./img/WiiPlusButton.png", text: "Plus Button" },
    { imageUrl: "./img/WiiMinusButton.png", text: "Minus Button" }
];

// Fills the input cells with the corresponding text based on the image in the same row.
function fillTextCellFromImage() {
    // Select all rows in the table body
    const rows = document.querySelectorAll('tbody tr');

    rows.forEach(row => {
        // Find the image in the current row
        const img = row.querySelector('.Image-Cell');
        if (img) {
            // Get the image source (full URL) and convert to relative path
            const fullSrc = img.src;
            const baseUrl = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, '/');
            const relativeSrc = './' + fullSrc.replace(baseUrl, '');  // Prepend './' to match cellData

            // Find the matching entry in cellData
            const data = cellData.find(item => item.imageUrl === relativeSrc);
            if (data) {
                // Update the input cell with the matching text
                const inputCell = row.querySelector('.Input-Column');
                if (inputCell) {
                    inputCell.textContent = data.text;
                }
            }
        }
    });
}

// Prevents the Enter key from being pressed in all text cells.
function noEnterKeyInCells() {
    const editableCells = document.querySelectorAll('[contenteditable="true"]');
    
    editableCells.forEach(cell => {
        cell.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
            }
        });
    });
}

// Adds a new row to the table body with empty cells (no default image or text).
function addRow() {
    const tbody = document.querySelector('tbody');
    if (!tbody) return;

    // The maximum number of rows is 5, not counting the header row.
    const rows = tbody.querySelectorAll('tr');
    if (rows.length >= 5) {
        alert('Can\'t add more rows.');
        return;
    }

    // Create a new row element
    const newRow = document.createElement('tr');

    // Create the image cell (empty, no default image)
    const imageCell = document.createElement('td');
    imageCell.className = 'Image-Column';
    imageCell.contentEditable = 'true';  // Make the image cell editable

    // Add drag-over and drop listeners for future image replacement
    imageCell.addEventListener('dragover', e => {
        e.preventDefault();  // Allow drop
    });
    imageCell.addEventListener('drop', e => {
        e.preventDefault();
        const droppedSrc = e.dataTransfer.getData('text/plain');
        if (droppedSrc) {
            // Create or update the img element
            let img = imageCell.querySelector('.Image-Cell');
            if (!img) {
                img = document.createElement('img');
                img.className = 'Image-Cell';
                imageCell.appendChild(img);
            }
            img.src = droppedSrc;
            // Update alt text if needed
            const data = cellData.find(item => item.imageUrl === droppedSrc);
            if (data) img.alt = data.text;
            // Make the image draggable
            setupImage(img);
            fillTextCellFromImage();
        }
    });

    // Add paste listener for editing
    imageCell.addEventListener('paste', e => {
        e.preventDefault();
        const text = e.clipboardData.getData('text/plain');
        if (text) {
            let img = imageCell.querySelector('.Image-Cell');
            if (!img) {
                img = document.createElement('img');
                img.className = 'Image-Cell';
                imageCell.appendChild(img);
            }
            img.src = text;
            // Update alt if possible
            const data = cellData.find(item => item.imageUrl === text);
            if (data) img.alt = data.text;
            // Make the image draggable
            setupImage(img);
            fillTextCellFromImage();
        }
    });

    newRow.appendChild(imageCell);

    // Create the first editable text cell (empty)
    const inputCell = document.createElement('td');
    inputCell.className = 'Input-Column Text-Column-Font';
    inputCell.contentEditable = 'true';
    // Prevent drops on text cells
    inputCell.addEventListener('dragover', e => e.preventDefault());
    inputCell.addEventListener('drop', e => e.preventDefault());
    newRow.appendChild(inputCell);

    // Create the second editable text cell (empty)
    const resultCell = document.createElement('td');
    resultCell.className = 'Text-Column Text-Column-Font';
    resultCell.contentEditable = 'true';
    // Prevent drops on text cells
    resultCell.addEventListener('dragover', e => e.preventDefault());
    resultCell.addEventListener('drop', e => e.preventDefault());
    newRow.appendChild(resultCell);

    // Append the new row to the tbody
    tbody.appendChild(newRow);

    // Re-run functions to apply logic to the new row (prevent Enter)
    noEnterKeyInCells();
}

// Removes the last row from the table body, if any exist.
function removeRow() {
    const tbody = document.querySelector('tbody');
    if (!tbody) return;

    // The minimum number of rows is 1, not counting the header row.
    const rows = tbody.querySelectorAll('tr');
    if (rows.length > 1) {
        tbody.removeChild(rows[rows.length - 1]);  // Remove the last row
    } else {
        alert('Can\'t remove more rows!');  // Optional: Prevent removal if no rows
    }
}

// Populate the image palette with draggable images from cellData
function populatePalette() {
    const palette = document.getElementById('image-palette');
    if (!palette) return;

    cellData.forEach(item => {
        const img = document.createElement('img');
        img.src = item.imageUrl;
        img.alt = item.text;
        img.className = 'palette-image';  // Optional: Add a class for styling
        img.draggable = true;  // Make it draggable
        img.addEventListener('dragstart', handleDragStart);
        palette.appendChild(img);
    });
}

// Handle drag start for palette images
function handleDragStart(e) {
    // Store the image source in the data transfer
    e.dataTransfer.setData('text/plain', e.target.src);
}

// Handle drag start for images in table cells
function handleImageDragStart(e) {
    // Store the row index in the data transfer
    const cell = e.target.parentElement; // td
    const row = cell.parentElement; // tr
    const tbody = row.parentElement;
    const rowIndex = Array.from(tbody.children).indexOf(row);
    e.dataTransfer.setData('text/plain', rowIndex.toString());
}

// Setup image to be draggable
function setupImage(img) {
    img.draggable = true;
    img.addEventListener('dragstart', handleImageDragStart);
}

// Handle drop on recycle bin
function handleRecycleDrop(e) {
    e.preventDefault();
    const rowIndex = parseInt(e.dataTransfer.getData('text/plain'));
    if (!isNaN(rowIndex)) {
        const tbody = document.querySelector('tbody');
        const row = tbody.children[rowIndex];
        if (row) {
            // Clear image cell
            const imageCell = row.querySelector('.Image-Column');
            if (imageCell) {
                const img = imageCell.querySelector('.Image-Cell');
                if (img) img.remove();
            }
            // Clear input cell
            const inputCell = row.querySelector('.Input-Column');
            if (inputCell) inputCell.textContent = '';
        }
    }
}

// Clear content button functionality
function clearContent() {
    const tbody = document.querySelector('tbody');
    if (!tbody) return;
    const cells = tbody.querySelectorAll('td');
    cells.forEach(cell => {
        cell.textContent = '';
        const img = cell.querySelector('img');
        if (img) img.remove();
    });
}

// Make image cells droppable and handle drops
function makeCellsDroppable() {
    const imageCells = document.querySelectorAll('td.Image-Column');

    imageCells.forEach(cell => {
        cell.addEventListener('dragover', e => {
            e.preventDefault();  // Allow drop
        });

        cell.addEventListener('drop', e => {
            e.preventDefault();
            const droppedSrc = e.dataTransfer.getData('text/plain');
            if (droppedSrc) {
                // Create or update the img element
                let img = cell.querySelector('.Image-Cell');
                if (!img) {
                    img = document.createElement('img');
                    img.className = 'Image-Cell';
                    cell.appendChild(img);
                }
                img.src = droppedSrc;
                // Update alt text if needed
                const data = cellData.find(item => item.imageUrl === droppedSrc);
                if (data) img.alt = data.text;
                // Make the image draggable
                setupImage(img);
                // Update the text in the User Input column for this row
                fillTextCellFromImage();  // Re-run to update text based on new image
            }
        });

        // Add paste listener for editing
        cell.addEventListener('paste', e => {
            e.preventDefault();
            const text = e.clipboardData.getData('text/plain');
            if (text) {
                let img = cell.querySelector('.Image-Cell');
                if (!img) {
                    img = document.createElement('img');
                    img.className = 'Image-Cell';
                    cell.appendChild(img);
                }
                img.src = text;
                // Update alt if possible
                const data = cellData.find(item => item.imageUrl === text);
                if (data) img.alt = data.text;
                // Make the image draggable
                setupImage(img);
                fillTextCellFromImage();
            }
        });
    });
}

// Call all made functions here.
function script() {
    fillTextCellFromImage();
    noEnterKeyInCells();
    populatePalette();
    makeCellsDroppable();

    // Make existing images draggable
    const existingImages = document.querySelectorAll('.Image-Cell');
    existingImages.forEach(setupImage);

    // Make all image columns editable (only td, not th)
    const imageColumns = document.querySelectorAll('td.Image-Column');
    imageColumns.forEach(cell => {
        cell.contentEditable = 'true';
    });

    // Prevent drops on text columns
    const textColumns = document.querySelectorAll('.Input-Column, .Text-Column');
    textColumns.forEach(cell => {
        cell.addEventListener('dragover', e => e.preventDefault());
        cell.addEventListener('drop', e => e.preventDefault());
    });

    // Add event listeners for the buttons
    const addBtn = document.getElementById('add-row-btn');
    const removeBtn = document.getElementById('remove-row-btn');
    const clearBtn = document.getElementById('clear-content-btn');
    if (addBtn) addBtn.addEventListener('click', addRow);
    if (removeBtn) removeBtn.addEventListener('click', removeRow);
    if (clearBtn) clearBtn.addEventListener('click', clearContent);

    // Make recycle bin droppable
    const recycleBin = document.querySelector('.recycle-bin');
    if (recycleBin) {
        recycleBin.addEventListener('dragover', e => e.preventDefault());
        recycleBin.addEventListener('drop', handleRecycleDrop);
    }

    // Get the dropdown and header elements
    const controlStyleSelect = document.getElementById('control-style');
    const headerText = document.getElementById('header-text');

    // Update header when dropdown changes
    controlStyleSelect.addEventListener('change', function() {
        headerText.textContent = this.value;
    });
}

// Execute the script when the file loads
script();