/* fetch API this link https://eecu-data-server.vercel.app/data */
const careerList = [fetch(`https://eecu-data-server.vercel.app/data`)];

const [...sections] = document.querySelectorAll("section");
const all_inputs = sections.map((section) => section.querySelectorAll("input"));

const wiseUpTip = document.querySelector('#popUp')

/**
 * @param {NodeListOf<HTMLInputElement>} inputs
 */
function sum(inputs) {
  return [...inputs].reduce((a, b) => a + b.valueAsNumber, 0);
}

const canvas = document.querySelector("canvas");
let current_chart = null;

function update() {
    const inputData = all_inputs.map(inputs => sum(inputs))
    console.log(inputData)

    current_chart?.destroy();
    current_chart = new Chart(canvas, {
        type: 'doughnut',
        data: {
            labels: ['Education', 'Housing', `Essentials`, `Lifestyle`, `Savings`],
            datasets: [
                {
                    label: 'Monthly (USD)',
                    data: inputData
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


    // Get the total expense amount
    const amtTotal = inputData.reduce((a, b) => a + b, 0);
    if (!Number.isNaN(amtTotal)) {
        // Get savings amount
        const savingsAmt = inputData[4]
        // See if savings is less than 10% of total
        const lessThan10Percent = (savingsAmt/amtTotal) < 0.1

        if ( lessThan10Percent ) {
            wiseUpTip.classList.remove('hidden')
        } else {
            wiseUpTip.classList.add('hidden') 
        }
    } else {
        // Done if an input field is unfilled
        wiseUpTip.classList.add('hidden')
    }
}

document.body.addEventListener('input', () => {
    update();
});

update();
