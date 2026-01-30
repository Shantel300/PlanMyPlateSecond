document.addEventListener('DOMContentLoaded', function () {
    highlightCurrentDay();
    loadSavedPlan();

    document.getElementById('savePlanBtn').addEventListener('click', savePlan);
});

function highlightCurrentDay() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    const dayName = days[today.getDay()];

    const dayCard = document.querySelector(`.day-card[data-day="${dayName}"]`);
    if (dayCard) {
        // Highlight logic
        const cardInner = dayCard.querySelector('.card');
        cardInner.classList.remove('border-0');
        cardInner.classList.add('border-primary', 'border-2', 'shadow');

        // Add a "Today" badge
        const header = dayCard.querySelector('.card-header');
        header.classList.add('text-primary');
        header.innerHTML += ' <span class="badge bg-primary text-white ms-2" style="font-size: 0.6em; vertical-align: middle;">TODAY</span>';
    }
}

function savePlan() {
    const inputs = document.querySelectorAll('.meal-input, textarea');
    const plan = {};

    inputs.forEach(input => {
        const day = input.dataset.day;
        const type = input.dataset.type;

        if (!plan[day]) plan[day] = {};
        plan[day][type] = input.value;
    });

    localStorage.setItem('mealPlan', JSON.stringify(plan));
    alert('Meal plan saved successfully!');
}

function loadSavedPlan() {
    const savedPlan = localStorage.getItem('mealPlan');
    if (!savedPlan) return;

    const plan = JSON.parse(savedPlan);

    // Iterate over days and types to populate fields
    for (const [day, meals] of Object.entries(plan)) {
        for (const [type, value] of Object.entries(meals)) {
            const input = document.querySelector(`[data-day="${day}"][data-type="${type}"]`);
            if (input) {
                input.value = value;
            }
        }
    }
}
