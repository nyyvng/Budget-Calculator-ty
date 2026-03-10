/* fetch API this link https://eecu-data-server.vercel.app/data */
const careerList = [fetch(`https://eecu-data-server.vercel.app/data`)];

const [...sections] = document.querySelectorAll("section");
const all_inputs = sections.map((section) => section.querySelectorAll("input"));

/**
 * @param {NodeListOf<HTMLInputElement>} inputs
 */
function sum(inputs) {
  return [...inputs].reduce((a, b) => a + b.valueAsNumber, 0);
}

const canvas = document.querySelector("canvas");
let current_chart = null;

function update() {
    current_chart?.destroy();
    current_chart = new Chart(canvas, {
        type: 'doughnut',
        data: {
            labels: ['Education', 'Housing', `Essentials`, `Lifestyle`, `Savings`],
            datasets: [
                {
                    label: 'Monthly (USD)',
                    data: all_inputs.map(inputs => sum(inputs))
                }
            ]
        },
        options: {
            responsive: false,
            /*elements: {
                arc: {
                    borderWidth: 0
                }
            },*/
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

document.body.addEventListener('input', () => {
    update();
});

update();
