document.addEventListener("DOMContentLoaded", () => {

    initializeCounters();

    initializeCrimeTrendChart();

    initializeCrimePieChart();

});

/*=========================================================
                ANIMATED COUNTERS
=========================================================*/

function initializeCounters(){

    animateCounter("complaintCounter",248);

    animateCounter("firCounter",196);

    animateCounter("priorityCounter",12);

    animateCounter("solvedCounter",173);

}

function animateCounter(id,target){

    const element=document.getElementById(id);

    if(!element) return;

    let current=0;

    const duration=1500;

    const increment=Math.ceil(target/60);

    const timer=setInterval(()=>{

        current+=increment;

        if(current>=target){

            current=target;

            clearInterval(timer);

        }

        element.textContent=current;

    },duration/60);

}

/*=========================================================
                WEEKLY CRIME TREND
=========================================================*/

function initializeCrimeTrendChart(){

    const canvas=document.getElementById("crimeTrendChart");

    if(!canvas) return;

    new Chart(canvas,{

        type:"line",

        data:{

            labels:[

                "Mon",

                "Tue",

                "Wed",

                "Thu",

                "Fri",

                "Sat",

                "Sun"

            ],

            datasets:[{

                label:"Complaints",

                data:[

                    18,

                    26,

                    21,

                    34,

                    29,

                    40,

                    36

                ],

                fill:true,

                tension:.4,

                borderWidth:3,

                pointRadius:5

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:false,

            plugins:{

                legend:{

                    labels:{

                        color:"#ffffff"

                    }

                }

            },

            scales:{

                x:{

                    ticks:{

                        color:"#cbd5e1"

                    },

                    grid:{

                        color:"rgba(255,255,255,.06)"

                    }

                },

                y:{

                    beginAtZero:true,

                    ticks:{

                        color:"#cbd5e1"

                    },

                    grid:{

                        color:"rgba(255,255,255,.06)"

                    }

                }

            }

        }

    });

}

/*=========================================================
                PIE CHART
=========================================================*/

function initializeCrimePieChart(){

    const canvas=document.getElementById("crimePieChart");

    if(!canvas) return;

    new Chart(canvas,{

        type:"pie",

        data:{

            labels:[

                "Vehicle Theft",

                "Cyber Crime",

                "Assault",

                "Fraud",

                "Others"

            ],

            datasets:[{

                data:[

                    34,

                    22,

                    15,

                    18,

                    11

                ],

                backgroundColor:[

                    "#2563eb",

                    "#16a34a",

                    "#dc2626",

                    "#ea580c",

                    "#7c3aed"

                ]

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:false,

            plugins:{

                legend:{

                    position:"bottom",

                    labels:{

                        color:"#ffffff",

                        padding:20

                    }

                }

            }

        }

    });

}

/*=========================================================
                CARD HOVER EFFECT
=========================================================*/

document.querySelectorAll(".kpi-card").forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transform="translateY(-8px) scale(1.02)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="translateY(0px) scale(1)";

    });

});

/*=========================================================
                AUTO REFRESH DEMO
=========================================================*/

setInterval(()=>{

    const health=document.querySelectorAll(".health-dot.green");

    health.forEach(dot=>{

        dot.animate([

            {

                transform:"scale(1)"

            },

            {

                transform:"scale(1.4)"

            },

            {

                transform:"scale(1)"

            }

        ],{

            duration:900

        });

    });

},4000);