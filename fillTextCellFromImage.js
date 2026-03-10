/* 
 * Created by: ZodiaKGalXy
 * Creation date: 2025-03-08
 * Contributed for: The WiiMart Team
 * 
 * This JS file contains logic for auto-assigning the "User Input"
 * text feild with their according image. Ex. (A) = Wii Remote A
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

function fillTextCellFromImage() {
    document.addEventListener('DOMContentLoaded', function() {
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
    });
}

// Call the function to fill text cells based on images
fillTextCellFromImage();