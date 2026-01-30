/**
 * Components Injection Script
 * Injects Navbar and Footer to keep pages consistent.
 */

const navigationHTML = `
<nav class="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm">
    <div class="container">
        <a class="navbar-brand" href="index.html">
            <img src="images/logo.png" alt="PlanMyPlate Logo" class="navbar-logo me-2">PlanMyPlate
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                    <a class="nav-link" href="index.html">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="planner.html">Meal Planner</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="meals.html">My Meals</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="family.html">Family</a>
                </li>
            </ul>
             <div class="d-flex ms-lg-3">
                <a href="settings.html" class="btn btn-outline-primary btn-sm rounded-pill px-3">
                    <i class="fas fa-cog"></i>
                </a>
            </div>
        </div>
    </div>
</nav>
`;

const footerHTML = `
<footer class="text-center text-muted mt-5">
    <div class="container">
        <section class="mb-4">
            <a class="btn btn-outline-secondary btn-floating m-1 rounded-circle" href="https://www.facebook.com/Shantel Ndlovu" role="button"><i class="fab fa-facebook-f"></i></a>
            <a class="btn btn-outline-secondary btn-floating m-1 rounded-circle" href="#!" role="button"><i class="fab fa-twitter"></i></a>
            <a class="btn btn-outline-secondary btn-floating m-1 rounded-circle" href="#!" role="button"><i class="fab fa-instagram"></i></a>
            <button id="calc-trigger" class="btn btn-outline-success btn-floating m-1 rounded-circle" role="button" title="Calculator"><i class="fas fa-calculator"></i></button>
        </section>
        <p>© 2026 PlanMyPlate by Shantel. Nourish your life.</p>
    </div>
</footer>
`;

// Insert Nav and Footer
document.addEventListener('DOMContentLoaded', () => {
    // Insert Nav
    const headerPlaceholder = document.getElementById('navbar-placeholder');
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = navigationHTML;
        highlightCurrentPage();
    }

    // Insert Footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = footerHTML;
    }

    // Insert Calculator
    document.body.insertAdjacentHTML('beforeend', calculatorHTML);
    initCalculator();
});

const calculatorHTML = `
<div id="calculator-modal" class="calculator-modal">
    <div id="calculator-container" class="calculator-container">
        <div class="calc-header d-flex justify-content-between align-items-center mb-3">
            <h5 class="m-0 text-success"><i class="fas fa-calculator me-2"></i>Calculator</h5>
            <button id="close-calc" class="btn-close"></button>
        </div>
        <div class="calc-display mb-3">
            <input type="text" id="calc-screen" class="form-control text-end fs-4" readonly value="0">
        </div>
        <div class="calc-buttons d-grid gap-2">
            <div class="row g-2">
                <div class="col-3"><button class="btn btn-light w-100 calc-btn" data-val="C">C</button></div>
                <div class="col-3"><button class="btn btn-light w-100 calc-btn" data-val="(">(</button></div>
                <div class="col-3"><button class="btn btn-light w-100 calc-btn" data-val=")">)</button></div>
                <div class="col-3"><button class="btn btn-accent w-100 calc-btn" data-val="/">÷</button></div>
                
                <div class="col-3"><button class="btn btn-white w-100 calc-btn" data-val="7">7</button></div>
                <div class="col-3"><button class="btn btn-white w-100 calc-btn" data-val="8">8</button></div>
                <div class="col-3"><button class="btn btn-white w-100 calc-btn" data-val="9">9</button></div>
                <div class="col-3"><button class="btn btn-accent w-100 calc-btn" data-val="*">×</button></div>
                
                <div class="col-3"><button class="btn btn-white w-100 calc-btn" data-val="4">4</button></div>
                <div class="col-3"><button class="btn btn-white w-100 calc-btn" data-val="5">5</button></div>
                <div class="col-3"><button class="btn btn-white w-100 calc-btn" data-val="6">6</button></div>
                <div class="col-3"><button class="btn btn-accent w-100 calc-btn" data-val="-">−</button></div>
                
                <div class="col-3"><button class="btn btn-white w-100 calc-btn" data-val="1">1</button></div>
                <div class="col-3"><button class="btn btn-white w-100 calc-btn" data-val="2">2</button></div>
                <div class="col-3"><button class="btn btn-white w-100 calc-btn" data-val="3">3</button></div>
                <div class="col-3"><button class="btn btn-accent w-100 calc-btn" data-val="+">+</button></div>
                
                <div class="col-6"><button class="btn btn-white w-100 calc-btn" data-val="0">0</button></div>
                <div class="col-3"><button class="btn btn-white w-100 calc-btn" data-val=".">.</button></div>
                <div class="col-3"><button class="btn btn-success w-100 calc-btn" data-val="=">=</button></div>
            </div>
        </div>
    </div>
</div>
`;

function initCalculator() {
    const modal = document.getElementById('calculator-modal');
    const triggerBtn = document.getElementById('calc-trigger'); // Note: injected via footerHTML
    const closeBtn = document.getElementById('close-calc');
    const screen = document.getElementById('calc-screen');
    const buttons = document.querySelectorAll('.calc-btn');

    // Due to async injection of footer, we need to wait or delegate. 
    // Since this runs inside DOMContentLoaded, footer content *should* be there if sync.
    // However, footerHTML is assigned to innerHTML. 
    // We need to re-query triggerBtn or use delegation if it's not found immediately.

    // Better approach: Attach listener to body for delegation if trigger not found, 
    // or just re-query. simpler to retry briefly or use delegation.
    // Let's rely on event delegation for the trigger to be safe.

    document.addEventListener('click', (e) => {
        const btn = e.target.closest('#calc-trigger');
        if (btn) {
            modal.classList.add('active');
        }
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        screen.value = '0'; // Reset on close
    });

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            screen.value = '0';
        }
    });

    let currentInput = '';

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const val = btn.getAttribute('data-val');

            if (val === 'C') {
                currentInput = '';
                screen.value = '0';
            } else if (val === '=') {
                try {
                    // Safe evaluation
                    // Replace visual operators with JS operators if needed (already mostly done)
                    // Note: '×' passed as '*' and '÷' passed as '/' in data-val so it's clean.
                    if (currentInput) {
                        // eslint-disable-next-line no-eval
                        // Using Function constructor as a slightly safer alternative to direct eval, 
                        // though for simple math it's similar. 
                        // For a student project, simple eval or Function is acceptable for this scope.
                        // We will allow only numbers and operators.
                        if (/^[0-9+\-*/.() ]+$/.test(currentInput)) {
                            const result = new Function('return ' + currentInput)();
                            // Limit decimals
                            screen.value = Number(result.toFixed(8)).toString();
                            currentInput = screen.value;
                        } else {
                            screen.value = 'Error';
                            currentInput = '';
                        }
                    }
                } catch (e) {
                    screen.value = 'Error';
                    currentInput = '';
                }
            } else {
                if (screen.value === '0' && !['.', '+', '-', '*', '/'].includes(val)) {
                    currentInput = val;
                } else if (screen.value === 'Error') {
                    currentInput = val;
                } else {
                    currentInput += val;
                }
                screen.value = currentInput;
            }
        });
    });
}

function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}
