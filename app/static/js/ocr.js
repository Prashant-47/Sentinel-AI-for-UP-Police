document.addEventListener("DOMContentLoaded", () => {

    const uploadArea = document.getElementById("uploadArea");
    const browseBtn = document.getElementById("browseBtn");
    const fileInput = document.getElementById("ocrFile");
    const previewImage = document.getElementById("previewImage");
    const extractBtn = document.getElementById("extractBtn");

    const thinkingCard = document.getElementById("ocrThinking");
    const textCard = document.getElementById("ocrTextCard");
    const textArea = document.getElementById("ocrText");
    const resultContainer = document.getElementById("ocrResults");

    let selectedFile = null;

    /*=========================================
                FILE PICKER
    =========================================*/

    browseBtn.addEventListener("click", () => {

        fileInput.click();

    });

    fileInput.addEventListener("change", (e) => {

        if (e.target.files.length > 0) {

            selectedFile = e.target.files[0];

            preview(selectedFile);

        }

    });

    /*=========================================
                DRAG DROP
    =========================================*/

    uploadArea.addEventListener("dragover", (e) => {

        e.preventDefault();

        uploadArea.classList.add("dragover");

    });

    uploadArea.addEventListener("dragleave", () => {

        uploadArea.classList.remove("dragover");

    });

    uploadArea.addEventListener("drop", (e) => {

        e.preventDefault();

        uploadArea.classList.remove("dragover");

        if (e.dataTransfer.files.length > 0) {

            selectedFile = e.dataTransfer.files[0];

            preview(selectedFile);

        }

    });

    /*=========================================
                PREVIEW
    =========================================*/

    function preview(file) {

        const reader = new FileReader();

        reader.onload = function (e) {

            previewImage.src = e.target.result;

            previewImage.style.display = "block";

        }

        reader.readAsDataURL(file);

    }

    /*=========================================
                OCR
    =========================================*/

    extractBtn.addEventListener("click", async () => {

        if (!selectedFile) {

            alert("Please select an image.");

            return;

        }

        thinkingCard.style.display = "block";

        textCard.style.display = "none";

        resultContainer.innerHTML = "";

        const formData = new FormData();

        formData.append("image", selectedFile);

        try {

            const response = await fetch("/api/ocr", {

                method: "POST",

                body: formData

            });

            const data = await response.json();

            thinkingCard.style.display = "none";

            if (!data.success) {

                throw new Error(data.error);

            }

            textCard.style.display = "block";

            textArea.value = data.ocr_text;

            renderAnalysis(data.analysis);

        }

        catch (err) {

            thinkingCard.style.display = "none";

            alert(err.message);

        }

    });
        /*=========================================
                RENDER AI ANALYSIS
    =========================================*/

    function renderAnalysis(data) {

        resultContainer.innerHTML = `

<div class="result-grid">

    <div class="glass result-card">

        <h3>
            <i class="fa-solid fa-file-lines"></i>
            Executive Summary
        </h3>

        <p>${data.summary || "-"}</p>

    </div>

    <div class="glass result-card">

        <h3>
            <i class="fa-solid fa-user"></i>
            Complainant
        </h3>

        <p><strong>Name :</strong> ${data.complainant?.name || "-"}</p>

        <p><strong>Phone :</strong> ${data.complainant?.phone || "-"}</p>

    </div>

    <div class="glass result-card">

        <h3>
            <i class="fa-solid fa-location-dot"></i>
            Incident Details
        </h3>

        <p><strong>Location :</strong> ${data.incident?.location || "-"}</p>

        <p><strong>Date :</strong> ${data.incident?.date || "-"}</p>

        <p><strong>Time :</strong> ${data.incident?.time || "-"}</p>

    </div>

    <div class="glass result-card">

        <h3>
            <i class="fa-solid fa-brain"></i>
            AI Assessment
        </h3>

        <p><strong>Crime :</strong> ${data.crime_category || "-"}</p>

        <p><strong>Priority :</strong> ${data.priority || "-"}</p>

        <p><strong>Confidence :</strong> ${data.confidence || "-"}</p>

    </div>

    <div class="glass result-card">

        <h3>
            <i class="fa-solid fa-scale-balanced"></i>
            Suggested BNS Sections
        </h3>

        <ul>

            ${(data.suggested_bns_sections || []).map(section =>

                `<li>${section}</li>`

            ).join("")}

        </ul>

    </div>

    <div class="glass result-card">

        <h3>
            <i class="fa-solid fa-circle-question"></i>
            Missing Information
        </h3>

        <ul>

            ${(data.missing_information || []).map(item =>

                `<li>${item}</li>`

            ).join("")}

        </ul>

    </div>

    <div class="glass result-card">

        <h3>
            <i class="fa-solid fa-comments"></i>
            Suggested Questions
        </h3>

        <ul>

            ${(data.suggested_questions || []).map(item =>

                `<li>${item}</li>`

            ).join("")}

        </ul>

    </div>

    <div class="glass result-card">

        <h3>
            <i class="fa-solid fa-list-check"></i>
            Investigation Checklist
        </h3>

        <ul>

            ${(data.investigation_checklist || []).map(item =>

                `<li>${item}</li>`

            ).join("")}

        </ul>

    </div>

    <div class="glass result-card" style="grid-column:1/-1;">

        <h3>
            <i class="fa-solid fa-file-signature"></i>
            AI Generated FIR Draft
        </h3>

        <pre style="white-space:pre-wrap;">${data.draft_fir || "-"}</pre>

    </div>

</div>

        `;

    }

});