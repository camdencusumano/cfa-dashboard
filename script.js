// Google Sheets API configuration
const SHEET_ID = '1fK6-itRBNb_6R8C4GiJ2_EbMrYWFsjR_Sc3z7zPFePI';
const API_KEY = 'AIzaSyD11ci9BCpFABOp09iNT6G_0sw6cmMKx3k';
const SHEET_NAME = 'Form Responses 1'; // UPDATE if tab name differs
const BASE_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(SHEET_NAME)}!A1:BI1000?key=${API_KEY}`;

// Assessment types and their display columns
const assessmentTypes = {
    tab1: {
        name: 'Nuggets Breader',
        columns: [
            'Timestamp', 'Score', 'Name of employee being graded', 'Name of grader',
            'MEDIUM: Nuggets meet color requirement',
            'HIGH: Nuggets are entirely covered in a generous layer of seasoned coater, free of large lumps or uncooked coater',
            'MEDIUM: Nuggets are free of bare spots'
        ]
    },
    tab2: {
        name: 'Nuggets Assembler',
        columns: [
            'Timestamp', 'Score', 'Name of employee being graded', 'Name of grader',
            'Internal temperature of cooked Nuggets (Diagnostic Only)',
            'LOW: Nugget box has “N” tab pressed',
            'LOW: Outside of menu tab box is free of excessive staining collectively larger than a nickel',
            'LOW: CFA Nugget box contains no more than one scrap',
            'HIGH: Number of Chick-fil-A Nuggets present (no more or less than 8)',
            'MEDIUM: Nuggets are free of bare spots'
        ]
    },
    tab3: {
        name: 'Waffle Fries Assembler',
        columns: [
            'Timestamp', 'Score', 'Name of employee being graded', 'Name of grader',
            'INFORMATIONAL: Internal Temperature of Waffle Potato Fries',
            'HIGH: Waffle Potato Fry package appears full',
            'INFORMATIONAL: Outside of packaging is free of residue, product, or excessive fingerprints, or smudges',
            'HIGH: Waffle Potato Fries are evenly cooked (crisp on outside and soft inside) not scorched or soggy',
            'MEDIUM: Waffle Potato Fries meet color requirements',
            'MEDIUM: There are not an excessive number of small pieces'
        ]
    },
    tab4: {
        name: 'Grilled Assembler',
        columns: [
            'Timestamp', 'Score', 'Name of employee being graded', 'Name of grader',
            'Internal Temperature of Grilled Filet (Diagnostic Only)',
            'LOW: Clamshell is securely closed with both locking tabs secured, product not protruding from clamshell',
            'LOW: Outside of clamshell is free of excessive staining larger than a quarter',
            'LOW: Grilled Chicken Sandwich is served in a sandwich sleeve inside clamshell',
            'LOW: Best grill marks on grilled filet are facing up',
            'MEDIUM: Multigrain brioche bun is not torn or crushed, with no flaking or peeling',
            'MEDIUM: There are 2 whole slices (3 if small) of tomato. (3/16" thick)',
            'LOW: Tomato slices have no visible core, no hole in center, no end slices',
            'MEDIUM: There are 2 Green Leaf lettuce leaves on grilled sandwich',
            'LOW: Lettuce leaf diameter is approximately 4" (+/-0.5")',
            'HIGH: Grilled filet has acceptable bun coverage',
            'HIGH: Grilled filet is free of excessive carbon build up (both sides)'
        ]
    },
    tab5: {
        name: 'Grilled Breader',
        columns: [
            'Timestamp', 'Score', 'Name of employee being graded', 'Name of grader',
            'LOW: Grilled chicken is correct color (best grill marks side)',
            'HIGH: Grilled filet is free of excessive carbon build up (both sides)',
            'HIGH: Grilled filet has acceptable bun coverage',
            'Weight of cooked grilled filet (Diagnostic)'
        ]
    },
    tab6: {
        name: 'CFA Buns',
        columns: [
            'Timestamp', 'Score', 'Name of employee being graded', 'Name of grader',
            'MEDIUM: There are 2 well drained pickle chips (3 if small) on sandwich',
            'LOW: Pickles overlap by no more than a quarter of pickle area',
            'LOW: Pickles are not hanging off bun heel',
            'LOW: White hamburger-style bun crown (top) is buttered with butter-flavored oil',
            'LOW: White hamburger-style bun crown is toasted evenly to correct color',
            'LOW: White hamburger-style bun heel is toasted evenly to correct color',
            'LOW: White hamburger-style bun heel (bottom) is buttered with butter-flavored oil',
            'MEDIUM: White bun is not torn or crushed, with no flaking or peeling'
        ]
    },
    tab7: {
        name: 'Grilled Buns',
        columns: [
            'Timestamp', 'Score', 'Name of employee being graded', 'Name of grader',
            'MEDIUM: Multigrain brioche bun is not torn or crushed, with no flaking or peeling',
            'LOW: Multigrain brioche bun crown (top) is toasted evenly to correct color',
            'LOW: Multigrain brioche bun heel (bottom) is toasted evenly to correct color'
        ]
    },
    tab8: {
        name: 'CFA Assembler',
        columns: [
            'Timestamp', 'Score', 'Name of employee being graded', 'Name of grader',
            'LOW: Outside of packaging is free of excessive staining collectively larger than a quarter (Chick-fil-A Sandwich)',
            'LOW: Top of foil bag is pressed in and folded down twice (each fold 1/2” in width) to cover and secure opening of bag',
            'MEDIUM: White hamburger-style bun is not torn or crushed, with no flaking or peeling',
            'HIGH: Chick-fil-A regular filet has acceptable bun coverage',
            'MEDIUM: Chick-fil-A regular filet is golden brown in appearance',
            'HIGH: Side facing up: Chick-fil-A filet is entirely covered in a generous layer of seasoned coater, free of large lumps or uncooked coater',
            'MEDIUM: Total area of bare spots on Chick-fil-A regular filet is no larger than a quarter'
        ]
    },
    tab9: {
        name: 'CFA Breader',
        columns: [
            'Timestamp', 'Score', 'Name of employee being graded', 'Name of grader',
            'HIGH: Side facing up: Chick-fil-A filet is entirely covered in a generous layer of seasoned coater, free of large lumps or uncooked coater',
            'INFORMATIONAL: Weight of cooked Chick-fil-A regular filet is at least 3.3 oz',
            'MEDIUM: Total area of bare spots on Chick-fil-A regular filet is no larger than a quarter (side facing up only)',
            'MEDIUM: Chick-fil-A regular filet is golden brown in appearance',
            'HIGH: Chick-fil-A filet has acceptable bun coverage'
        ]
    }
};

// Tab navigation
function openTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-link').forEach(link => link.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    document.querySelector(`.tab-link[onclick="openTab('${tabId}')"]`).classList.add('active');
}

// Fetch and render data for a tab
async function loadTabData(tabId) {
    const table = document.getElementById(`table${tabId.slice(3)}`);
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        if (!data.values || data.values.length === 0) {
            table.innerHTML = `<tr><td colspan="${assessmentTypes[tabId].columns.length}">No data available</td></tr>`;
            return;
        }

        // Convert API response to array of objects
        const headers = data.values[0];
        const rows = data.values.slice(1).map(row => {
            const obj = {};
            headers.forEach((header, i) => {
                obj[header] = row[i] || '';
            });
            return obj;
        });

        // Filter rows by Type of Assessment
        const filteredRows = rows.filter(row => row['Type of Assessment'] === assessmentTypes[tabId].name);

        // Render table
        table.innerHTML = '';
        const thead = document.createElement('thead');
        const tr = document.createElement('tr');
        assessmentTypes[tabId].columns.forEach(col => {
            const th = document.createElement('th');
            th.textContent = col;
            tr.appendChild(th);
        });
        thead.appendChild(tr);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        filteredRows.forEach(row => {
            const tr = document.createElement('tr');
            assessmentTypes[tabId].columns.forEach(col => {
                const td = document.createElement('td');
                td.textContent = row[col] || 'N/A';
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);

        // Render chart for tabs 1, 3, 5, 7
        if ([1, 3, 5, 7].includes(parseInt(tabId.slice(3)))) {
            const scores = {};
            filteredRows.forEach(row => {
                const name = row['Name of employee being graded'];
                const score = parseFloat(row['Score']) || 0; // Include zeroes for selected section
                if (name) {
                    if (!scores[name]) scores[name] = { total: 0, count: 0 };
                    scores[name].total += score;
                    scores[name].count += 1;
                }
            });

            const labels = Object.keys(scores);
            const avgScores = labels.map(name => scores[name].total / scores[name].count);

            if (labels.length > 0) {
                new Chart(document.getElementById(`chart${tabId.slice(3)}`), {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Average Test Score',
                            data: avgScores,
                            backgroundColor: 'rgba(0, 123, 255,retien
                            borderColor: 'rgba(0, 123, 255, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                                title: { display: true, text: 'Average Score' }
                            },
                            x: {
                                title: { display: true, text: 'Employee' }
                            }
                        },
                        plugins: {
                            title: { display: true, text: `${assessmentTypes[tabId].name} Scores` },
                            legend: { display: false }
                        }
                    }
                });
            }
        }
    } catch (error) {
        console.error(`Error loading data for ${tabId}:`, error);
        table.innerHTML = `<tr><td colspan="${assessmentTypes[tabId].columns.length}">Error loading data: ${error.message}</td></tr>`;
    }
}

// Calculate summary data and render chart
async function loadSummaryData() {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();

        if (!data.values || data.values.length === 0) {
            return;
        }

        const headers = data.values[0];
        const rows = data.values.slice(1).map(row => {
            const obj = {};
            headers.forEach((header, i) => {
                obj[header] = row[i] || '';
            });
            return obj;
        });

        const summary = {};
        Object.keys(assessmentTypes).forEach(tabId => {
            const type = assessmentTypes[tabId].name;
            const filteredRows = rows.filter(row => row['Type of Assessment'] === type);

            let totalScore = 0;
            let scoreCount = 0;
            let totalEntries = filteredRows.length;
            let completedEntries = 0;

            filteredRows.forEach(row => {
                const score = parseFloat(row['Score']) || 0; // Include zeroes for selected section
                if (row['Score'] !== '') {
                    totalScore += score;
                    scoreCount += 1;
                    completedEntries += 1;
                }
            });

            summary[tabId] = {
                avgScore: scoreCount > 0 ? totalScore / scoreCount : 0,
                completion: totalEntries > 0 ? (completedEntries / totalEntries) * 100 : 0
            };
        });

        const labels = Object.values(assessmentTypes).map(type => type.name);
        const avgScores = Object.values(summary).map(s => s.avgScore);
        const completions = Object.values(summary).map(s => s.completion);

        new Chart(document.getElementById('summaryChart'), {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Average Test Score',
                        data: avgScores,
                        backgroundColor: 'rgba(0, 123, 255, 0.6)',
                        borderColor: 'rgba(0, 123, 255, 1)',
                        borderWidth: 1,
                        yAxisID: 'y'
                    },
                    {
                        label: 'Completion Status (%)',
                        data: completions,
                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: 'Average Score' },
                        position: 'left'
                    },
                    y1: {
                        beginAtZero: true,
                        title: { display: true, text: 'Completion (%)' },
                        position: 'right',
                        grid: { drawOnChartArea: false }
                    },
                    x: {
                        title: { display: true, text: 'Assessment Type' }
                    }
                },
                plugins: {
                    title: { display: true, text: 'Summary: Test Scores and Completion Status' },
                    legend: { display: true, position: 'top' }
                }
            }
        });
    } catch (error) {
        console.error('Error loading summary data:', error);
    }
}

// Load all tabs and summary on page load
document.addEventListener('DOMContentLoaded', () => {
    Object.keys(assessmentTypes).forEach(tabId => loadTabData(tabId));
    loadSummaryData();
});
