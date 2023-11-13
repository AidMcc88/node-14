document.addEventListener('DOMContentLoaded', () => {
    loadTitans();
    document.getElementById('add-titan-button').addEventListener('click', toggleAddTitanForm);
    document.getElementById('titan-form').addEventListener('submit', handleFormSubmit);
});

async function loadTitans() {
    try {
        const response = await fetch('/api/titans');
        const titans = await response.json();
        displayTitans(titans);
    } catch (error) {
        console.error('Error loading titans:', error);
    }
}

function displayTitans(titans) {
    const titanList = document.getElementById('titan-list');
    titanList.innerHTML = '';
    titans.forEach(titan => {
        const titanElement = document.createElement('section');
        titanElement.classList.add('titan');
        titanElement.innerHTML = `
            <h3>${titan.name}</h3>
            <p><strong>Class:</strong> ${titan.class}</p>
            <p><strong>Weapon:</strong> ${titan.weapon}</p>
            <p><strong>Ability 1:</strong> ${titan.ability1}</p>
            <p><strong>Ability 2:</strong> ${titan.ability2}</p>
            <p><strong>Ability 3:</strong> ${titan.ability3}</p>
        `;
        titanList.appendChild(titanElement);
    });
}


function toggleAddTitanForm() {
    const formContainer = document.getElementById('titan-form-container');
    formContainer.classList.toggle('hidden');
}

async function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
        const response = await fetch('/api/titans', {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        displayTitans(result);
        toggleAddTitanForm();
        event.target.reset();
    } catch (error) {
        console.error('Error submitting form:', error);
    }
}