/* 
 * Created by: ZodiaKGalXy
 * Assisted with: GitHub Copilot
 * Creation date: 2025-03-08
 * Contributed for: WiiMart, and the Wii Homebrew Community
 * 
 * This JS file contains logic for the HTML file.
 */

"use strict";

const cellData = [
    // Classic Controller Buttons
    { imageUrl: "./img/WiiClassicA.png", text: "Classic Controller A" },
    { imageUrl: "./img/WiiClassicB.png", text: "Classic Controller B" },
    { imageUrl: "./img/WiiClassicL.png", text: "Classic Controller L" },
    { imageUrl: "./img/WiiClassicR.png", text: "Classic Controller R" },
    { imageUrl: "./img/WiiClassicX.png", text: "Classic Controller X" },
    { imageUrl: "./img/WiiClassicY.png", text: "Classic Controller Y" },
    { imageUrl: "./img/WiiClassicZL.png", text: "Classic Controller ZL" },
    { imageUrl: "./img/WiiClassicZR.png", text: "Classic Controller ZR" },
    { imageUrl: "./img/WiiClassicSTART.png", text: "Classic Controller START" },
    { imageUrl: "./img/WiiClassicSELECT.png", text: "Classic Controller SELECT" },
    // Wii Remote Buttons
    { imageUrl: "./img/WiiRemote-DPAD.png", text: "Wii Remote D-Pad" },
    { imageUrl: "./img/WiiRemoteA.png", text: "Wii Remote A" },
    { imageUrl: "./img/WiiRemoteB.png", text: "Wii Remote B" },
    { imageUrl: "./img/WiiRemote1.png", text: "Wii Remote 1" },
    { imageUrl: "./img/WiiRemote2.png", text: "Wii Remote 2" },
    // Other Buttons
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

// Adds a new row to the table body with a default structure (placeholder image and empty editable cells).
function addRow() {
    const tbody = document.querySelector('tbody');
    if (!tbody) return;

    // The maximum number of rows is 6.
    const rows = tbody.querySelectorAll('tr');
    if (rows.length >= 5) {
        alert('Can\'t add more rows.');
        return;
    }

    // Create a new row element
    const newRow = document.createElement('tr');

    // Create the image cell (using a default image, e.g., the first in cellData)
    const imageCell = document.createElement('td');
    imageCell.className = 'Image-Column';
    const img = document.createElement('img');
    img.className = 'Image-Cell';
    img.src = cellData[0].imageUrl;  // Default to first image; change as needed
    img.alt = cellData[0].text;
    imageCell.appendChild(img);
    newRow.appendChild(imageCell);

    // Create the first editable text cell
    const inputCell = document.createElement('td');
    inputCell.className = 'Input-Column Text-Column-Font';
    inputCell.contentEditable = 'true';
    newRow.appendChild(inputCell);

    // Create the second editable text cell
    const resultCell = document.createElement('td');
    resultCell.className = 'Text-Column Text-Column-Font';
    resultCell.contentEditable = 'true';
    newRow.appendChild(resultCell);

    // Append the new row to the tbody
    tbody.appendChild(newRow);

    // Re-run functions to apply logic to the new row (e.g., fill text, prevent Enter)
    fillTextCellFromImage();
    noEnterKeyInCells();
}

// Removes the last row from the table body, if any exist.
function removeRow() {
    const tbody = document.querySelector('tbody');
    if (!tbody) return;

    // The minimum number of rows is 2.
    const rows = tbody.querySelectorAll('tr');
    if (rows.length > 2) {
        tbody.removeChild(rows[rows.length - 1]);  // Remove the last row
    } else {
        alert('Can\'t remove more rows!');  // Optional: Prevent removal if no rows
    }
}

// Call all made functions here.
function script() {
    fillTextCellFromImage();
    noEnterKeyInCells();

    // Add event listeners for the buttons
    const addBtn = document.getElementById('add-row-btn');
    const removeBtn = document.getElementById('remove-row-btn');
    if (addBtn) addBtn.addEventListener('click', addRow);
    if (removeBtn) removeBtn.addEventListener('click', removeRow);
}

// Execute the script when the file loads
script();