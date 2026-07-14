document.addEventListener("DOMContentLoaded", () => {

    const policeStation = document.getElementById("policeStation");
    const district = document.getElementById("district");
    const complainantName = document.getElementById("complainantName");
    const mobileNumber = document.getElementById("mobileNumber");
    const incidentDescription = document.getElementById("incidentDescription");

    const generateBtn = document.getElementById("generateFirBtn");

    const thinking = document.getElementById("firThinking");

    const resultCard = document.getElementById("firResult");

    generateBtn.addEventListener("click", generateFIR);

    async function generateFIR(){

        if(incidentDescription.value.trim().length < 20){

            alert("Please enter a proper incident description.");

            return;

        }

        generateBtn.disabled = true;

        generateBtn.innerHTML =
        `<i class="fa-solid fa-spinner fa-spin"></i> Generating FIR...`;

        thinking.style.display = "block";

        resultCard.style.display = "none";

        try{

            const response = await fetch("/api/generate-fir",{

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({

                    police_station:policeStation.value,

                    district:district.value,

                    complainant:complainantName.value,

                    mobile:mobileNumber.value,

                    complaint:incidentDescription.value

                })

            });

            const json = await response.json();

            if(!json.success){

                throw new Error(json.error);

            }

            populateFIR(json.data);

        }

        catch(error){

            alert(error);

        }

        finally{

            thinking.style.display="none";

            generateBtn.disabled=false;

            generateBtn.innerHTML=

            `<i class="fa-solid fa-wand-magic-sparkles"></i>

            Generate FIR`;

        }

    }

    function populateFIR(data){

        resultCard.style.display="block";

        document.getElementById("firNumber").textContent =
        data.fir_number;

        document.getElementById("firDate").textContent =
        new Date().toLocaleDateString();

        document.getElementById("firPoliceStation").textContent =
        data.police_station;

        document.getElementById("firDistrict").textContent =
        data.district;

        document.getElementById("firComplainant").textContent =
        data.complainant;

        document.getElementById("firMobile").textContent =
        data.mobile;

        document.getElementById("firNarrative").value =
        data.fir_narrative;

        renderSections(data);

        renderInvestigation(data);

        renderNextActions(data);

    }
        function renderSections(data){

        const container =
            document.getElementById("firSections");

        container.innerHTML = "";

        if(
            !data.bns_sections ||
            data.bns_sections.length === 0
        ){

            container.innerHTML =
            `
            <span class="badge badge-medium">
                No BNS Section Suggested
            </span>
            `;

            return;

        }

        data.bns_sections.forEach(section=>{

            const badge = document.createElement("span");

            badge.className = "badge badge-info";

            badge.style.marginRight = "10px";

            badge.style.marginBottom = "10px";

            badge.textContent = section;

            container.appendChild(badge);

        });

    }

    function renderInvestigation(data){

        let card = document.getElementById(
            "investigationNotes"
        );

        if(!card){

            card = document.createElement("div");

            card.id = "investigationNotes";

            card.className = "result-card";

            card.innerHTML =

            `
            <h3>

                <i class="fa-solid fa-list-check"></i>

                Investigation Notes

            </h3>

            <ul class="result-list"></ul>
            `;

            resultCard.appendChild(card);

        }

        const list = card.querySelector("ul");

        list.innerHTML = "";

        if(
            !data.investigation_notes ||
            data.investigation_notes.length===0
        ){

            list.innerHTML =
            "<li>No investigation notes generated.</li>";

            return;

        }

        data.investigation_notes.forEach(note=>{

            const li = document.createElement("li");

            li.textContent = note;

            list.appendChild(li);

        });

    }

    function renderNextActions(data){

        let card = document.getElementById(
            "nextActions"
        );

        if(!card){

            card = document.createElement("div");

            card.id = "nextActions";

            card.className = "result-card";

            card.innerHTML =

            `
            <h3>

                <i class="fa-solid fa-forward"></i>

                Recommended Next Actions

            </h3>

            <ul class="result-list"></ul>
            `;

            resultCard.appendChild(card);

        }

        const list = card.querySelector("ul");

        list.innerHTML = "";

        if(
            !data.next_actions ||
            data.next_actions.length===0
        ){

            list.innerHTML =
            "<li>No recommendations available.</li>";

            return;

        }

        data.next_actions.forEach(action=>{

            const li = document.createElement("li");

            li.textContent = action;

            list.appendChild(li);

        });

        resultCard.scrollIntoView({

            behavior:"smooth",

            block:"start"

        });

    }
        /*=========================================
        COPY FIR
    =========================================*/

    const copyBtn = document.getElementById("copyFirBtn");

    if(copyBtn){

        copyBtn.addEventListener("click", () => {

            const fir = document.getElementById("firNarrative").value;

            navigator.clipboard.writeText(fir);

            showToast(
                "FIR copied to clipboard.",
                "success"
            );

        });

    }

    /*=========================================
        PRINT FIR
    =========================================*/

    const printBtn = document.getElementById("printFirBtn");

    if(printBtn){

        printBtn.addEventListener("click", () => {

            const fir = document.getElementById("firNarrative").value;

            const win = window.open("", "_blank");

            win.document.write(`

                <html>

                <head>

                    <title>Generated FIR</title>

                    <style>

                        body{

                            font-family:Arial;

                            padding:40px;

                            line-height:1.8;

                        }

                        h1{

                            text-align:center;

                        }

                    </style>

                </head>

                <body>

                    <h1>FIRST INFORMATION REPORT</h1>

                    <hr>

                    <pre style="white-space:pre-wrap;font-size:16px;">

${fir}

                    </pre>

                </body>

                </html>

            `);

            win.document.close();

            win.print();

        });

    }

    /*=========================================
        DOWNLOAD PDF (HOOK)
    =========================================*/

    const pdfBtn =
        document.getElementById("downloadFirBtn");

    if(pdfBtn){

        pdfBtn.addEventListener("click", () => {

            showToast(

                "PDF Generator will be connected in next module.",

                "info"

            );

        });

    }

    /*=========================================
        SAVE DRAFT (HOOK)
    =========================================*/

    const saveBtn =
        document.getElementById("saveDraftBtn");

    if(saveBtn){

        saveBtn.addEventListener("click", () => {

            localStorage.setItem(

                "sentinel_fir_draft",

                document.getElementById("firNarrative").value

            );

            showToast(

                "Draft saved successfully.",

                "success"

            );

        });

    }

    /*=========================================
        TOAST
    =========================================*/

    function showToast(message,type){

        const toast = document.createElement("div");

        toast.className = "sentinel-toast";

        toast.innerHTML = message;

        document.body.appendChild(toast);

        if(type==="success"){

            toast.style.background="#16a34a";

        }

        if(type==="info"){

            toast.style.background="#2563eb";

        }

        setTimeout(()=>{

            toast.classList.add("show");

        },100);

        setTimeout(()=>{

            toast.classList.remove("show");

            setTimeout(()=>{

                toast.remove();

            },300);

        },3000);

    }

});