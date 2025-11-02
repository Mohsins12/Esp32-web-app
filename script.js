const SUPABASE_URL = "https://hvxyydtubqvbtmheluec.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2eHl5ZHR1YnF2YnRtaGVsdWVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5OTg2NzMsImV4cCI6MjA3NzU3NDY3M30.am66MDwDqnCKHDNPT8a-S_dUwuEoMzDrHgk802uWKDU";

const tableName = "Esp_data_log";

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

      document.getElementById("touchValue").textContent = sensor ?? "--";
      document.getElementById("intValue").textContent = deflection ?? "--";

      const statusElement = document.getElementById("floatValue");
      if (deflection > 50) {
        statusElement.textContent = "⚠️ ON";
        statusElement.style.color = "red";
      } else {
        statusElement.textContent = "✅ OFF";
        statusElement.style.color = "green";
      }
    } else {
      console.warn("No data found in table.");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

setInterval(fetchLatestData, 2000);
fetchLatestData();
