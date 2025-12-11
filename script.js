const daySelect = document.getElementById("daySelect");
const scheduleDiv = document.getElementById("schedule");

let dayPeriods = {};
let classes = [];

// Load JSON files
Promise.all([
    fetch("rotate.json").then(res => res.json()),
    fetch("schedule.json").then(res => res.json())
]).then(([dayData, classData]) => {
    dayPeriods = dayData;
    classes = classData;
}).catch(err => console.error("Error loading JSON files:", err));

daySelect.addEventListener("change", () => {
    const day = daySelect.value;
    scheduleDiv.innerHTML = ""; // clear previous schedule

    if (!day || Object.keys(dayPeriods).length === 0) return;

    const periods = dayPeriods[day];

    // Create table
    const table = document.createElement("table");

    // Table header
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    ["Period", "Class Name", "Subject", "Teacher", "Room"].forEach(text => {
        const th = document.createElement("th");
        th.textContent = text;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Table body
    const tbody = document.createElement("tbody");

    periods.forEach(period => {
        const cls = classes.find(c => c.period === period);
        if (cls) {
            const row = document.createElement("tr");

            const cells = [
                cls.period,
                cls.className,
                cls.subject,
                cls.teacher,
                cls.room
            ];

            cells.forEach(text => {
                const td = document.createElement("td");
                td.textContent = text;
                row.appendChild(td);
            });

            tbody.appendChild(row);
        }
    });

    table.appendChild(tbody);
    scheduleDiv.appendChild(table);
});
