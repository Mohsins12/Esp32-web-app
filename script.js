// --- Supabase configuration ---
const SUPABASE_URL = "https://hvxyydtubqvbtmheluec.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2eHl5ZHR1YnF2YnRtaGVsdWVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5OTg2NzMsImV4cCI6MjA3NzU3NDY3M30.am66MDwDqnCKHDNPT8a-S_dUwuEoMzDrHgk802uWKDU";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// --- Update HTML function ---
async function loadData() {
  const { data, error } = await supabase
    .from("esp_data_log") // your table name
    .select("*")
    .order("id", { ascending: false })
    .limit(1); // get latest row only

  if (error) {
    console.error("Error fetching data:", error);
    return;
  }

  if (data.length === 0) {
    console.log("No data found.");
    return;
  }

  const latest = data[0];
  console.log("Latest row:", latest);

  // Update HTML values
  document.getElementById("sensorValue").textContent =
    latest.sensor_value?.toFixed(2) ?? "--";
  document.getElementById("deflection").textContent =
    latest.deflection ?? "--";

  // Determine status based on deflection value
  const statusElement = document.getElementById("status");
  if (latest.deflection > 10) {
    statusElement.textContent = "ON";
    statusElement.style.color = "green";
  } else {
    statusElement.textContent = "OFF";
    statusElement.style.color = "red";
  }
}

// Refresh every 5 seconds
setInterval(loadData, 5000);
loadData();
