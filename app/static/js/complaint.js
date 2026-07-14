document.addEventListener("DOMContentLoaded", () => {

    const analyzeBtn = document.getElementById("analyzeBtn");

    if (!analyzeBtn) return;

    analyzeBtn.addEventListener("click", analyzeComplaint);

});


async function analyzeComplaint() {

    const complaintBox = document.getElementById("complaintText");
    const thinkingCard = document.getElementById("thinkingCard");
    const results = document.getElementById("results");

    const complaint = complaintBox.value.trim();

    if (!complaint) {

        alert("Please enter a complaint.");

        return;

    }

    thinkingCard.style.display = "block";

    results.innerHTML = "";

    try {

        const response = await fetch("/api/analyze", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                complaint: complaint
            })

        });

        const data = await response.json();

        thinkingCard.style.display = "none";

        renderResults(data);

    }

    catch (error) {

        console.error(error);

        thinkingCard.style.display = "none";

        results.innerHTML = `

        <div class="alert alert-danger">

            Failed to analyze complaint.

        </div>

        `;

    }

}



function renderResults(data) {

    const results = document.getElementById("results");

    if (!results) return;

    results.innerHTML = `

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

        <p><strong>Name:</strong> ${data.complainant?.name || "-"}</p>

        <p><strong>Phone:</strong> ${data.complainant?.phone || "-"}</p>

    </div>


    <div class="glass result-card">

        <h3>
            <i class="fa-solid fa-location-dot"></i>
            Incident
        </h3>

        <p><strong>Location:</strong> ${data.incident?.location || "-"}</p>

        <p><strong>Date:</strong> ${data.incident?.date || "-"}</p>

        <p><strong>Time:</strong> ${data.incident?.time || "-"}</p>

    </div>


    <div class="glass result-card">

        <h3>
            <i class="fa-solid fa-brain"></i>
            AI Assessment
        </h3>

        <p><strong>Crime:</strong> ${data.crime_category || "-"}</p>

        <p><strong>Priority:</strong> ${data.priority || "-"}</p>

        <p><strong>Confidence:</strong> ${data.confidence || "-"}</p>

    </div>


    <div class="glass result-card">

        <h3>
            <i class="fa-solid fa-scale-balanced"></i>
            Suggested BNS Sections
        </h3>

        <ul>

            ${(data.suggested_bns_sections || []).map(item => `<li>${item}</li>`).join("")}

        </ul>

    </div>


    <div class="glass result-card">

        <h3>
            <i class="fa-solid fa-circle-question"></i>
            Missing Information
        </h3>

        <ul>

            ${(data.missing_information || []).map(item => `<li>${item}</li>`).join("")}

        </ul>

    </div>


    <div class="glass result-card">

        <h3>
            <i class="fa-solid fa-comments"></i>
            Suggested Questions
        </h3>

        <ul>

            ${(data.suggested_questions || []).map(item => `<li>${item}</li>`).join("")}

        </ul>

    </div>


    <div class="glass result-card">

        <h3>
            <i class="fa-solid fa-list-check"></i>
            Investigation Checklist
        </h3>

        <ul>

            ${(data.investigation_checklist || []).map(item => `<li>${item}</li>`).join("")}

        </ul>

    </div>


    <!-- ===========================
            LARGE FIR DOCUMENT
    ============================ -->

    <div class="glass result-card draft-fir-card">

        <h3>

            <i class="fa-solid fa-file-signature"></i>

            AI Generated Draft FIR

        </h3>

        <div class="fir-document">

            <pre>${data.draft_fir || "No FIR Generated."}</pre>

        </div>

    </div>

</div>

`;

}