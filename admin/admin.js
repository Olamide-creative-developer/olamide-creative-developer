if (sessionStorage.getItem("controlCenterUnlocked") !== "true") {
    window.location.href = "login.html";
}
const SUPABASE_URL = "https://ueqrmtgysofmlqabelma.supabase.co";
const SUPABASE_KEY = "sb_publishable_Ir-IRt2Y6im91q4P6NVsog_0juGH_Dy";

async function loadVisitorData() {
    const response = await fetch(
        `${SUPABASE_URL}/rest/v1/visitor_events?select=*`,
        {
            headers: {
                "apikey": SUPABASE_KEY,
                "Authorization": `Bearer ${SUPABASE_KEY}`
            }
        }
    );

    if (!response.ok) {
        throw new Error(`Supabase error: ${response.status}`);
    }

    const events = await response.json();

    console.log("Real visitor events:", events);
}

loadVisitorData();