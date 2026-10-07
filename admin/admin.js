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

    window.visitorEvents = events;
    renderVisitorChart(events, chartRange?.value || "Daily");

    const activityList = document.getElementById("activityList");

if (activityList) {
    activityList.innerHTML = events
        .slice(-10)
        .reverse()
        .map(event => `
            <div style="
                padding: 12px 15px;
                margin-bottom: 8px;
                background: rgba(0, 229, 255, 0.05);
                border: 1px solid rgba(0, 229, 255, 0.12);
                border-radius: 10px;
            ">
                <strong style="color:#00e5ff;">⚡ Page visit</strong>
                <div style="
                    margin-top: 5px;
                    color: #7f889f;
                    font-size: 12px;
                ">
                    ${new Date(event.created_at).toLocaleString()}
                </div>
            </div>
        `)
        .join("");
}

const todayVisitors = document.getElementById("todayVisitors");
const totalVisitors = document.getElementById("totalVisitors");
const weekVisitors = document.getElementById("weekVisitors");
const monthVisitors = document.getElementById("monthVisitors");
const trafficSources = document.getElementById("trafficSources");

const today = new Date().toISOString().split("T")[0];

const todayCount = events.filter(event =>
    event.created_at.startsWith(today)
).length;

todayVisitors.textContent = todayCount;

totalVisitors.textContent = events.length;

const weekStart = new Date();
weekStart.setDate(weekStart.getDate() - 6);
weekStart.setHours(0, 0, 0, 0);

const weekCount = events.filter(event =>
    new Date(event.created_at) >= weekStart
).length;

weekVisitors.textContent = weekCount;

const monthStart = new Date();
monthStart.setDate(1);
monthStart.setHours(0, 0, 0, 0);

const monthCount = events.filter(event =>
    new Date(event.created_at) >= monthStart
).length;

monthVisitors.textContent = monthCount;

// QUICK INSIGHTS

const peakDay = document.getElementById("peakDay");
const insightToday = document.getElementById("insightToday");
const insightTotal = document.getElementById("insightTotal");
const insightSource = document.getElementById("insightSource");

// Today's visits
if (insightToday) {
    insightToday.textContent = todayCount;
}

// Total visits
if (insightTotal) {
    insightTotal.textContent = events.length;
}

// Peak day
const dayCounts = {};

events.forEach(event => {
    const day = new Date(event.created_at).toLocaleDateString();

    dayCounts[day] = (dayCounts[day] || 0) + 1;
});

const peak = Object.entries(dayCounts)
    .sort((a, b) => b[1] - a[1])[0];

if (peakDay) {
    peakDay.textContent = peak
        ? `${peak[0]} (${peak[1]})`
        : "No data";
}

// Top traffic source
const insightSources = {};

events.forEach(event => {
    let source = "Direct";

    if (event.referrer) {
        try {
            source = new URL(event.referrer).hostname;
        } catch {
            source = "Other";
        }
    }

    insightSources[source] = (insightSources[source] || 0) + 1;
});

const topSource = Object.entries(insightSources)
    .sort((a, b) => b[1] - a[1])[0];

if (insightSource) {
    insightSource.textContent = topSource
        ? `${topSource[0]} (${topSource[1]})`
        : "No data";
}

const activityGauge = document.getElementById("activityGauge");

if (activityGauge) {
    const activityPercent = Math.min(monthCount * 5, 100);
    activityGauge.textContent = `${activityPercent}%`;
}

const chart = document.getElementById("visitorChart");

if (chart) {
    chart.innerHTML = `
        <div style="font-size:14px;color:#7f889f;margin-bottom:10px;">
            Total visits
        </div>

        <div style="font-size:32px;font-weight:bold;color:#00e5ff;">
            ${events.length}
        </div>

        <div style="margin-top:15px;color:#7f889f;">
            Real visitor activity from Supabase
        </div>
    `;
}

const sourceCounts = {};

events.forEach(event => {
    let source = "Direct";

    if (event.referrer) {
        try {
            source = new URL(event.referrer).hostname;
        } catch {
            source = "Other";
        }
    }

    sourceCounts[source] = (sourceCounts[source] || 0) + 1;
});

const sortedSources = Object.entries(sourceCounts)
    .sort((a, b) => b[1] - a[1]);

trafficSources.innerHTML = sortedSources.length
    ? sortedSources.map(([source, count]) =>
        `<p><strong>${source}</strong> — ${count} visit${count === 1 ? "" : "s"}</p>`
      ).join("")
    : "<p>No traffic data yet.</p>";

todayVisitors.textContent = todayCount;
}

function renderVisitorChart(events, range = "Daily") {
    const chart = document.getElementById("visitorChart");

    if (!chart) return;

    const now = new Date();
    let days = 7;

    if (range === "Weekly") days = 28;
    if (range === "Monthly") days = 180;

    const data = [];

    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(now.getDate() - i);

        const day = date.toISOString().split("T")[0];

        const count = events.filter(event =>
            event.created_at.startsWith(day)
        ).length;

        data.push({
            label: date.toLocaleDateString([], {
                day: "numeric",
                month: "short"
            }),
            count
        });
    }

    const max = Math.max(...data.map(item => item.count), 1);

    chart.innerHTML = `
        <div style="
            display:flex;
            align-items:flex-end;
            gap:8px;
            height:220px;
            padding:20px 10px;
            overflow-x:auto;
        ">
            ${data.map(item => `
                <div style="
                    min-width:32px;
                    height:100%;
                    display:flex;
                    flex-direction:column;
                    justify-content:flex-end;
                    align-items:center;
                ">
                    <span style="
                        color:#00e5ff;
                        font-size:11px;
                        margin-bottom:5px;
                    ">${item.count}</span>

                    <div style="
                        width:22px;
                        height:${Math.max((item.count / max) * 150, 4)}px;
                        background:linear-gradient(
                            to top,
                            #00e5ff,
                            #7c3aed,
                            #ff2fb3
                        );
                        border-radius:6px 6px 2px 2px;
                        box-shadow:0 0 12px rgba(0,229,255,.25);
                    "></div>

                    <span style="
                        color:#7f889f;
                        font-size:9px;
                        margin-top:7px;
                        white-space:nowrap;
                    ">${item.label}</span>
                </div>
            `).join("")}
        </div>
    `;
}

const chartRange = document.getElementById("chartRange");

if (chartRange) {
    chartRange.addEventListener("change", function () {
        renderVisitorChart(window.visitorEvents || [], this.value);
    });
}

loadVisitorData();