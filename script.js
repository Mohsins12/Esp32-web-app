const SUPABASE_URL = "https://hvxyydtubqvbtmheluec.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2eHl5ZHR1YnF2YnRtaGVsdWVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5OTg2NzMsImV4cCI6MjA3NzU3NDY3M30.am66MDwDqnCKHDNPT8a-S_dUwuEoMzDrHgk802uWKDU";

const tableName = "Esp_data_log"; // your exact table name

async function fetchLatestData() {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/${tableName}?select=sensor_value,deflection&order=id.desc&limit=1`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Supabase REST error:", response.status, errorText);
      return;
    }

    const data = await response.json();
    console.log("Fetched data:", data);

    if (data.length > 0) {
      const sensor = data[0].sensor_value;
      const deflection = data[0].deflection;

      document.getElementById("sensorValue").textContent = sensor ?? "--";
      document.getElementById("deflection").textContent = deflection ?? "--";

      const statusEl = document.getElementById("status");
      if (deflection > 50) {
        statusEl.textContent = "⚠️ ON";
        statusEl.style.color = "red";
      } else {
        statusEl.textContent = "✅ OFF";
        statusEl.style.color = "green";
      }
    } else {
      console.warn("No data found in table.");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Fetch every 2 seconds
setInterval(fetchLatestData, 2000);
fetchLatestData();
