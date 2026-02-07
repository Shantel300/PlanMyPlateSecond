document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('saved-meals-container');
    const savedPlan = localStorage.getItem('mealPlan');

    // If no saved plan exists, show empty state immediately
    if (!savedPlan) {
        displayEmptyState(container);
        return;
    }

    let plan;
    try {
        plan = JSON.parse(savedPlan);
    } catch (e) {
        console.error("Error parsing meal plan:", e);
        displayEmptyState(container);
        return;
    }

    // Check if plan object is empty
    if (Object.keys(plan).length === 0) {
        displayEmptyState(container);
        return;
    }

    const daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let hasMeals = false;

    // Create a wrapper for our cards
    const wrapper = document.createElement('div');

    // Title
    const title = document.createElement('h2');
    title.className = 'mb-4 text-success fw-bold';
    title.innerHTML = '<i class="fas fa-utensils me-2"></i>My Planned Meals';
    wrapper.appendChild(title);

    // Grid row
    const row = document.createElement('div');
    row.className = 'row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4';

    daysOrder.forEach(day => {
        if (plan[day]) {
            const dayMeals = plan[day];
            // Check if there's any non-empty meal data for this day
            const hasData = ['breakfast', 'lunch', 'supper', 'notes'].some(key =>
                dayMeals[key] && dayMeals[key].trim() !== ''
            );

            if (hasData) {
                hasMeals = true;
                const col = document.createElement('div');
                col.className = 'col';
                col.innerHTML = createDayCard(day, dayMeals);
                row.appendChild(col);
            }
        }
    });

    if (!hasMeals) {
        displayEmptyState(container);
    } else {
        wrapper.appendChild(row);
        container.appendChild(wrapper);
    }
});

function displayEmptyState(container) {
    container.innerHTML = `
        <div class="text-center py-5 bg-light rounded-3">
            <div class="mb-3">
                <i class="fas fa-calendar-times fa-4x text-muted opacity-50"></i>
            </div>
            <h3 class="text-muted fw-bold">No meals saved yet</h3>
            <p class="lead text-secondary mb-4">Start planning your week to see your meals here!</p>
            <a href="planner.html" class="btn btn-success btn-lg shadow-sm">
                <i class="fas fa-edit me-2"></i>Go to Meal Planner
            </a>
        </div>
    `;
}

function createDayCard(day, meals) {
    // Helper to check if a specific field has content
    const hasContent = (text) => text && text.trim().length > 0;

    return `
        <div class="card h-100 shadow-sm border-0 meal-card">
            <div class="card-header bg-success text-white fw-bold text-center py-2 text-uppercase letter-spacing-1">
                ${day}
            </div>
            <div class="card-body">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item d-flex justify-content-between align-items-center px-0 py-2">
                        <span class="text-muted small"><i class="fas fa-coffee text-warning me-2"></i>Breakfast</span>
                        <span class="text-end fw-medium ${hasContent(meals.breakfast) ? 'text-dark' : 'text-muted fst-italic'}">
                            ${hasContent(meals.breakfast) ? meals.breakfast : 'Not set'}
                        </span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center px-0 py-2">
                        <span class="text-muted small"><i class="fas fa-utensils text-success me-2"></i>Lunch</span>
                        <span class="text-end fw-medium ${hasContent(meals.lunch) ? 'text-dark' : 'text-muted fst-italic'}">
                            ${hasContent(meals.lunch) ? meals.lunch : 'Not set'}
                        </span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center px-0 py-2">
                        <span class="text-muted small"><i class="fas fa-moon text-primary me-2"></i>Supper</span>
                        <span class="text-end fw-medium ${hasContent(meals.supper) ? 'text-dark' : 'text-muted fst-italic'}">
                            ${hasContent(meals.supper) ? meals.supper : 'Not set'}
                        </span>
                    </li>
                </ul>
                ${hasContent(meals.notes) ? `
                <div class="mt-3 pt-3 border-top bg-light rounded p-2">
                    <small class="text-uppercase text-muted fw-bold d-block mb-1" style="font-size: 0.7rem;"><i class="fas fa-sticky-note me-1"></i>Notes</small>
                    <p class="small mb-0 text-dark">${meals.notes}</p>
                </div>
                ` : ''}
            </div>
        </div>
    `;
}
