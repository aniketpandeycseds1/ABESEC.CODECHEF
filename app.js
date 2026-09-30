/* =====================================================
   CodeChef ABESEC Chapter - Event Management App
   Complete JavaScript Application
   ===================================================== */

// ==================== SEED DATA ====================
const SEED_EVENTS = [
    {
        id: 'e1',
        name: 'Clash of Coders 4.0',
        date: '2026-11-15',
        time: '10:00',
        venue: 'Seminar Hall, Block A',
        category: 'competition',
        description: 'The flagship competitive programming contest of CodeChef ABESEC Chapter! Battle through 3 intense rounds of algorithmic challenges. Top performers win exciting prizes and recognition. Open to all years.',
        featured: true
    },
    {
        id: 'e2',
        name: 'HackFusion 2026',
        date: '2026-12-05',
        time: '09:00',
        venue: 'Innovation Lab, CS Block',
        category: 'hackathon',
        description: '24-hour hackathon where teams of 3-4 build innovative solutions. Themes include HealthTech, EdTech, and Sustainability. Mentorship from industry professionals included.',
        featured: false
    },
    {
        id: 'e3',
        name: 'Web Dev Bootcamp',
        date: '2026-11-20',
        time: '14:00',
        venue: 'Lab 301, CS Block',
        category: 'workshop',
        description: 'Hands-on workshop covering React, Node.js, and MongoDB. Build a full-stack project from scratch in one session. Laptops required. Prior HTML/CSS knowledge recommended.',
        featured: false
    },
    {
        id: 'e4',
        name: 'AI/ML Talk: Future of GenAI',
        date: '2026-11-28',
        time: '16:00',
        venue: 'Auditorium, Main Building',
        category: 'seminar',
        description: 'Industry expert talk on the latest trends in Generative AI, LLMs, and their real-world applications. Q&A session and networking opportunity included.',
        featured: false
    },
    {
        id: 'e5',
        name: 'CP Practice Night',
        date: '2026-10-25',
        time: '20:00',
        venue: 'Online (Discord)',
        category: 'meetup',
        description: 'Weekly competitive programming practice session. Solve problems together, discuss strategies, and improve your rating. All skill levels welcome.',
        featured: false
    },
    {
        id: 'e6',
        name: 'DSA Marathon',
        date: '2026-12-01',
        time: '11:00',
        venue: 'Lab 201, CS Block',
        category: 'workshop',
        description: 'Intensive Data Structures & Algorithms workshop covering Trees, Graphs, DP, and Greedy algorithms. Perfect for placement preparation.',
        featured: false
    },
    {
        id: 'e7',
        name: 'Open Source Sprint',
        date: '2026-12-10',
        time: '10:00',
        venue: 'Innovation Lab, CS Block',
        category: 'hackathon',
        description: 'Contribute to real open-source projects! Learn Git workflows, code review practices, and make your first meaningful contribution to the community.',
        featured: false
    },
    {
        id: 'e8',
        name: 'CodeChef Monthly Contest',
        date: '2026-10-30',
        time: '18:00',
        venue: 'Online (CodeChef Platform)',
        category: 'competition',
        description: 'Monthly rated contest on the CodeChef platform. 5 problems across difficulty levels. Improve your competitive programming rating!',
        featured: false
    }
];

const SEED_REGISTRATIONS = [
    { id: 'r1', eventId: 'e1', name: 'Rahul Sharma', email: 'rahul@example.com', college: '2nd Year B.Tech', phone: '9876543210', timestamp: '2026-10-01T10:30:00' },
    { id: 'r2', eventId: 'e1', name: 'Priya Gupta', email: 'priya@example.com', college: '3rd Year B.Tech', phone: '9876543211', timestamp: '2026-10-02T14:20:00' },
    { id: 'r3', eventId: 'e2', name: 'Aman Verma', email: 'aman@example.com', college: '2nd Year B.Tech', phone: '9876543212', timestamp: '2026-10-03T09:15:00' },
    { id: 'r4', eventId: 'e3', name: 'Sneha Patel', email: 'sneha@example.com', college: '1st Year B.Tech', phone: '9876543213', timestamp: '2026-10-04T16:45:00' },
    { id: 'r5', eventId: 'e1', name: 'Vikash Kumar', email: 'vikash@example.com', college: '4th Year B.Tech', phone: '9876543214', timestamp: '2026-10-05T11:00:00' },
];

// ==================== DATA LAYER ====================
function getEvents() {
    let events = JSON.parse(localStorage.getItem('club_events'));
    if (!events) {
        events = SEED_EVENTS;
        localStorage.setItem('club_events', JSON.stringify(events));
    }
    return events;
}

function saveEvents(events) {
    localStorage.setItem('club_events', JSON.stringify(events));
}

function getRegistrations() {
    let regs = JSON.parse(localStorage.getItem('club_registrations'));
    if (!regs) {
        regs = SEED_REGISTRATIONS;
        localStorage.setItem('club_registrations', JSON.stringify(regs));
    }
    return regs;
}

function saveRegistrations(regs) {
    localStorage.setItem('club_registrations', JSON.stringify(regs));
}

// ==================== UTILITIES ====================
function generateId() {
    return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
}

function formatDate(dateStr) {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatTime(timeStr) {
    const [h, m] = timeStr.split(':');
    const hour = parseInt(h);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const h12 = hour % 12 || 12;
    return `${h12}:${m} ${ampm}`;
}

function getDateParts(dateStr) {
    const d = new Date(dateStr + 'T00:00:00');
    return {
        day: d.getDate(),
        month: d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
        year: d.getFullYear()
    };
}

const CATEGORY_ICONS = {
    competition: '⚔️',
    hackathon: '💻',
    workshop: '🛠️',
    seminar: '🎤',
    meetup: '👥'
};

const CATEGORY_GRADIENTS = {
    competition: 'linear-gradient(135deg, #1a0505, #2d0a0a)',
    hackathon: 'linear-gradient(135deg, #0f051a, #1a0a2d)',
    workshop: 'linear-gradient(135deg, #051a0f, #0a2d1a)',
    seminar: 'linear-gradient(135deg, #05101a, #0a1a2d)',
    meetup: 'linear-gradient(135deg, #1a1505, #2d250a)'
};

// ==================== NAVIGATION ====================
let currentPage = 'home';

function navigateTo(page) {
    currentPage = page;
    // Update pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById('page-' + page);
    if (target) target.classList.add('active');

    // Update nav links
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.querySelectorAll(`.nav-link[data-page="${page}"]`).forEach(l => l.classList.add('active'));

    // Close mobile nav
    document.getElementById('navLinks').classList.remove('active');
    document.getElementById('navToggle').classList.remove('active');

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Render content
    if (page === 'home') renderHome();
    if (page === 'events') renderEventsPage();
    if (page === 'admin') renderAdminPage();
}

function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ==================== TOAST NOTIFICATIONS ====================
function showToast(type, title, message) {
    const container = document.getElementById('toastContainer');
    const icons = {
        success: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
        error: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
        info: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
    };
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-icon">${icons[type]}</div>
        <div class="toast-content">
            <strong>${title}</strong>
            <span>${message}</span>
        </div>
    `;
    container.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('toast-out');
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// ==================== EVENT CARD RENDERER ====================
function renderEventCard(event) {
    const dp = getDateParts(event.date);
    const icon = CATEGORY_ICONS[event.category] || '📅';
    const gradient = CATEGORY_GRADIENTS[event.category] || CATEGORY_GRADIENTS.meetup;
    return `
        <div class="event-card" data-category="${event.category}">
            <div class="event-card-visual">
                <div class="event-card-gradient" style="background: ${gradient};"></div>
                <div class="event-card-bg">${icon}</div>
                <div class="event-card-date">
                    <span class="day">${dp.day}</span>
                    <span class="month">${dp.month}</span>
                </div>
                <span class="event-card-category category-${event.category}">${event.category}</span>
            </div>
            <div class="event-card-body">
                <h3>${event.name}</h3>
                <div class="event-card-meta">
                    <div class="event-card-meta-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        ${formatDate(event.date)} • ${formatTime(event.time)}
                    </div>
                    <div class="event-card-meta-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        ${event.venue}
                    </div>
                </div>
                <p>${event.description}</p>
                <button class="btn btn-primary btn-glow" onclick="openRegistration('${event.id}')">
                    Register Now
                </button>
            </div>
        </div>
    `;
}

// ==================== HOME PAGE ====================
function renderHome() {
    const events = getEvents();
    // Featured event
    const featured = events.find(e => e.featured) || events[0];
    if (featured) {
        const dp = getDateParts(featured.date);
        const icon = CATEGORY_ICONS[featured.category] || '📅';
        const gradient = CATEGORY_GRADIENTS[featured.category] || CATEGORY_GRADIENTS.meetup;
        document.getElementById('featuredEvent').innerHTML = `
            <div class="featured-visual" style="background: ${gradient};">
                <div class="featured-bg-art">${icon}</div>
                <span class="featured-category-badge">${featured.category}</span>
                <div class="featured-date-badge">
                    <span class="day">${dp.day}</span>
                    <span class="month">${dp.month}</span>
                    <span class="year">${dp.year}</span>
                </div>
            </div>
            <div class="featured-info">
                <h3>${featured.name}</h3>
                <div class="featured-meta">
                    <div class="featured-meta-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        ${formatDate(featured.date)} at ${formatTime(featured.time)}
                    </div>
                    <div class="featured-meta-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        ${featured.venue}
                    </div>
                </div>
                <p>${featured.description}</p>
                <button class="btn btn-primary btn-glow" onclick="openRegistration('${featured.id}')">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
                    Register Now
                </button>
            </div>
        `;
    }

    // Upcoming events preview (next 3)
    const upcoming = events.filter(e => !e.featured).slice(0, 3);
    document.getElementById('upcomingEventsPreview').innerHTML = upcoming.map(renderEventCard).join('');

    // Animate stats
    animateStats();
}

function animateStats() {
    document.querySelectorAll('.stat-number[data-count]').forEach(el => {
        const target = parseInt(el.dataset.count);
        let current = 0;
        const step = target / 40;
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = Math.floor(current);
        }, 30);
    });
}

// ==================== EVENTS PAGE ====================
let activeCategory = 'all';
let searchQuery = '';

function renderEventsPage() {
    const events = getEvents();
    let filtered = events;

    if (activeCategory !== 'all') {
        filtered = filtered.filter(e => e.category === activeCategory);
    }
    if (searchQuery) {
        const q = searchQuery.toLowerCase();
        filtered = filtered.filter(e => e.name.toLowerCase().includes(q) || e.description.toLowerCase().includes(q));
    }

    const grid = document.getElementById('eventsGrid');
    const noResults = document.getElementById('noResults');

    if (filtered.length === 0) {
        grid.innerHTML = '';
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
        grid.innerHTML = filtered.map(renderEventCard).join('');
    }
}

// ==================== EVENT REGISTRATION ====================
function openRegistration(eventId) {
    const events = getEvents();
    const event = events.find(e => e.id === eventId);
    if (!event) return;

    document.getElementById('regEventId').value = eventId;
    document.getElementById('modalEventName').textContent = event.name;
    document.getElementById('registrationForm').style.display = '';
    document.getElementById('regSuccess').style.display = 'none';
    document.getElementById('registrationForm').reset();
    document.getElementById('regEventId').value = eventId;
    document.getElementById('registrationModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('registrationModal').classList.remove('active');
    document.body.style.overflow = '';
}

function submitRegistration(e) {
    e.preventDefault();
    const reg = {
        id: generateId(),
        eventId: document.getElementById('regEventId').value,
        name: document.getElementById('regName').value.trim(),
        email: document.getElementById('regEmail').value.trim(),
        college: document.getElementById('regCollege').value,
        phone: document.getElementById('regPhone').value.trim(),
        timestamp: new Date().toISOString()
    };

    const regs = getRegistrations();
    regs.push(reg);
    saveRegistrations(regs);

    document.getElementById('registrationForm').style.display = 'none';
    document.getElementById('regSuccess').style.display = '';

    const events = getEvents();
    const event = events.find(ev => ev.id === reg.eventId);
    showToast('success', 'Registered!', `You're registered for ${event ? event.name : 'the event'}`);
}

// ==================== ADMIN ====================
let isAdminLoggedIn = false;

function adminLogin(e) {
    e.preventDefault();
    const user = document.getElementById('adminUser').value;
    const pass = document.getElementById('adminPass').value;

    if (user === 'admin' && pass === 'admin123') {
        isAdminLoggedIn = true;
        document.getElementById('adminLogin').style.display = 'none';
        document.getElementById('adminDashboard').style.display = '';
        renderAdminPage();
        showToast('success', 'Welcome Admin', 'You are now logged in');
    } else {
        showToast('error', 'Login Failed', 'Invalid username or password');
    }
}

function adminLogout() {
    isAdminLoggedIn = false;
    document.getElementById('adminLogin').style.display = '';
    document.getElementById('adminDashboard').style.display = 'none';
    document.getElementById('adminUser').value = '';
    document.getElementById('adminPass').value = '';
    showToast('info', 'Logged Out', 'You have been logged out');
}

function renderAdminPage() {
    if (!isAdminLoggedIn) return;
    renderDashboardStats();
    renderAdminEvents();
    renderRegistrations();
}

function renderDashboardStats() {
    const events = getEvents();
    const regs = getRegistrations();
    const categories = [...new Set(events.map(e => e.category))];

    document.getElementById('dashboardStats').innerHTML = `
        <div class="dashboard-stat">
            <div class="dashboard-stat-icon" style="background: rgba(0,168,255,0.15); color: #00a8ff;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            </div>
            <div class="dashboard-stat-info">
                <h4>${events.length}</h4>
                <span>Total Events</span>
            </div>
        </div>
        <div class="dashboard-stat">
            <div class="dashboard-stat-icon" style="background: rgba(16,185,129,0.15); color: #10b981;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <div class="dashboard-stat-info">
                <h4>${regs.length}</h4>
                <span>Registrations</span>
            </div>
        </div>
        <div class="dashboard-stat">
            <div class="dashboard-stat-icon" style="background: rgba(168,85,247,0.15); color: #a855f7;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </div>
            <div class="dashboard-stat-info">
                <h4>${categories.length}</h4>
                <span>Categories</span>
            </div>
        </div>
        <div class="dashboard-stat">
            <div class="dashboard-stat-icon" style="background: rgba(255,107,53,0.15); color: #ff6b35;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
            </div>
            <div class="dashboard-stat-info">
                <h4>${events.filter(e => e.featured).length}</h4>
                <span>Featured</span>
            </div>
        </div>
    `;
}

function renderAdminEvents() {
    const events = getEvents();
    const list = document.getElementById('adminEventsList');

    if (events.length === 0) {
        list.innerHTML = '<div class="no-results"><h3>No Events</h3><p>Click "Add Event" to create your first event.</p></div>';
        return;
    }

    list.innerHTML = events.map(event => {
        const dp = getDateParts(event.date);
        const regs = getRegistrations().filter(r => r.eventId === event.id).length;
        return `
            <div class="admin-event-item">
                <div class="admin-event-date">
                    <span class="day">${dp.day}</span>
                    <span class="month">${dp.month}</span>
                </div>
                <div class="admin-event-info">
                    <h4>${event.name} ${event.featured ? '⭐' : ''}</h4>
                    <span>${event.venue} • ${regs} registration${regs !== 1 ? 's' : ''} • <span class="event-card-category category-${event.category}" style="font-size:11px;padding:2px 8px;">${event.category}</span></span>
                </div>
                <div class="admin-event-actions">
                    <button class="btn btn-outline btn-sm" onclick="editEvent('${event.id}')">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        Edit
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="deleteEvent('${event.id}')">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                        Delete
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// ==================== ADMIN EVENT FORM ====================
function openEventForm(eventId) {
    document.getElementById('eventFormTitle').textContent = eventId ? 'Edit Event' : 'Add New Event';
    document.getElementById('eventForm').reset();
    document.getElementById('eventId').value = '';

    if (eventId) {
        const event = getEvents().find(e => e.id === eventId);
        if (event) {
            document.getElementById('eventId').value = event.id;
            document.getElementById('eventName').value = event.name;
            document.getElementById('eventDate').value = event.date;
            document.getElementById('eventTime').value = event.time;
            document.getElementById('eventVenue').value = event.venue;
            document.getElementById('eventCategory').value = event.category;
            document.getElementById('eventDescription').value = event.description;
            document.getElementById('eventFeatured').checked = event.featured;
        }
    }

    document.getElementById('eventFormModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeEventForm() {
    document.getElementById('eventFormModal').classList.remove('active');
    document.body.style.overflow = '';
}

function editEvent(id) {
    openEventForm(id);
}

function saveEvent(e) {
    e.preventDefault();
    const events = getEvents();
    const id = document.getElementById('eventId').value;

    const eventData = {
        name: document.getElementById('eventName').value.trim(),
        date: document.getElementById('eventDate').value,
        time: document.getElementById('eventTime').value,
        venue: document.getElementById('eventVenue').value.trim(),
        category: document.getElementById('eventCategory').value,
        description: document.getElementById('eventDescription').value.trim(),
        featured: document.getElementById('eventFeatured').checked
    };

    if (id) {
        // Edit
        const idx = events.findIndex(ev => ev.id === id);
        if (idx !== -1) {
            events[idx] = { ...events[idx], ...eventData };
        }
        showToast('success', 'Event Updated', `"${eventData.name}" has been updated`);
    } else {
        // Add
        eventData.id = generateId();
        events.push(eventData);
        showToast('success', 'Event Created', `"${eventData.name}" has been added`);
    }

    // If featured, unmark others
    if (eventData.featured) {
        events.forEach(ev => {
            if (ev.id !== (id || eventData.id)) ev.featured = false;
        });
    }

    saveEvents(events);
    closeEventForm();
    renderAdminPage();
}

function deleteEvent(id) {
    const events = getEvents();
    const event = events.find(e => e.id === id);
    if (!event) return;

    if (!confirm(`Delete "${event.name}"? This cannot be undone.`)) return;

    const filtered = events.filter(e => e.id !== id);
    saveEvents(filtered);

    // Also delete related registrations
    const regs = getRegistrations().filter(r => r.eventId !== id);
    saveRegistrations(regs);

    showToast('success', 'Event Deleted', `"${event.name}" has been removed`);
    renderAdminPage();
}

// ==================== REGISTRATIONS VIEW ====================
let regSearchQuery = '';
let regEventFilter = 'all';

function renderRegistrations() {
    const regs = getRegistrations();
    const events = getEvents();

    // Populate event filter chips
    const filterContainer = document.getElementById('regFilterChips');
    filterContainer.innerHTML = `<button class="chip ${regEventFilter === 'all' ? 'active' : ''}" data-event-filter="all">All Events</button>` +
        events.map(ev => `<button class="chip ${regEventFilter === ev.id ? 'active' : ''}" data-event-filter="${ev.id}">${ev.name}</button>`).join('');

    // Bind filter clicks
    filterContainer.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', () => {
            regEventFilter = chip.dataset.eventFilter;
            filterContainer.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            renderRegistrations();
        });
    });

    // Filter registrations
    let filtered = regs;
    if (regEventFilter !== 'all') {
        filtered = filtered.filter(r => r.eventId === regEventFilter);
    }
    if (regSearchQuery) {
        const q = regSearchQuery.toLowerCase();
        filtered = filtered.filter(r =>
            r.name.toLowerCase().includes(q) ||
            r.email.toLowerCase().includes(q) ||
            r.phone.includes(q)
        );
    }

    const tbody = document.getElementById('registrationsBody');
    const noRegs = document.getElementById('noRegs');
    const tableWrap = document.querySelector('.registrations-table-wrap');

    if (filtered.length === 0) {
        tbody.innerHTML = '';
        tableWrap.style.display = 'none';
        noRegs.style.display = 'block';
    } else {
        noRegs.style.display = 'none';
        tableWrap.style.display = '';
        tbody.innerHTML = filtered.map(r => {
            const event = events.find(e => e.id === r.eventId);
            return `
                <tr>
                    <td><strong>${r.name}</strong></td>
                    <td>${r.email}</td>
                    <td>${r.college}</td>
                    <td>${r.phone}</td>
                    <td>${event ? event.name : 'Unknown'}</td>
                    <td>${new Date(r.timestamp).toLocaleDateString('en-IN')}</td>
                </tr>
            `;
        }).join('');
    }
}

// ==================== TERMINAL TYPING EFFECT ====================
const TERMINAL_LINES = [
    { text: 'welcome_to("CodeChef ABESEC")', delay: 60 },
    { text: 'init_events()', delay: 80 },
    { text: 'loading_community(500+ coders)', delay: 50 },
    { text: 'status: 🚀 Ready to code!', delay: 70 }
];

let termLineIdx = 0;
let termCharIdx = 0;

function typeTerminal() {
    const typingEl = document.getElementById('typingText');
    const bodyEl = document.getElementById('terminalBody');
    if (!typingEl || !bodyEl) return;

    if (termLineIdx >= TERMINAL_LINES.length) {
        // Reset after pause
        setTimeout(() => {
            termLineIdx = 0;
            termCharIdx = 0;
            bodyEl.innerHTML = '<div class="terminal-line"><span class="prompt">$</span> <span class="typing" id="typingText"></span><span class="cursor">▋</span></div>';
            typeTerminal();
        }, 3000);
        return;
    }

    const line = TERMINAL_LINES[termLineIdx];
    if (termCharIdx < line.text.length) {
        typingEl.textContent += line.text[termCharIdx];
        termCharIdx++;
        setTimeout(typeTerminal, line.delay);
    } else {
        // Line complete, add output and new prompt
        const outputs = [
            '<div class="terminal-output"><span class="success">✓</span> Chapter initialized</div>',
            '<div class="terminal-output"><span class="highlight">8</span> events loaded</div>',
            '<div class="terminal-output"><span class="success">✓</span> Community online</div>',
            '<div class="terminal-output"><span class="success">✓</span> System ready</div>',
        ];

        setTimeout(() => {
            // Replace cursor line with completed line + output
            const currentLine = bodyEl.querySelector('.terminal-line:last-child');
            if (currentLine) {
                const cursor = currentLine.querySelector('.cursor');
                if (cursor) cursor.remove();
            }
            bodyEl.innerHTML += outputs[termLineIdx] || '';

            termLineIdx++;
            termCharIdx = 0;

            if (termLineIdx < TERMINAL_LINES.length) {
                bodyEl.innerHTML += '<div class="terminal-line"><span class="prompt">$</span> <span class="typing" id="typingText"></span><span class="cursor">▋</span></div>';
                setTimeout(typeTerminal, 500);
            } else {
                typeTerminal(); // Trigger reset
            }
        }, 400);
    }
}

// ==================== PARTICLES ====================
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDelay = Math.random() * 8 + 's';
        p.style.animationDuration = (6 + Math.random() * 6) + 's';
        const colors = ['#00a8ff', '#a855f7', '#ff6b35', '#10b981'];
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        container.appendChild(p);
    }
}

// ==================== EVENT LISTENERS ====================
document.addEventListener('DOMContentLoaded', () => {
    // Nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(link.dataset.page);
        });
    });

    // Logo click
    document.querySelectorAll('.nav-logo[data-page]').forEach(logo => {
        logo.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo('home');
        });
    });

    // Mobile nav toggle
    document.getElementById('navToggle').addEventListener('click', () => {
        document.getElementById('navLinks').classList.toggle('active');
        document.getElementById('navToggle').classList.toggle('active');
    });

    // Scroll effect on nav
    window.addEventListener('scroll', () => {
        document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
    });

    // Event search
    document.getElementById('eventSearch').addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderEventsPage();
    });

    // Category filter chips
    document.getElementById('filterChips').addEventListener('click', (e) => {
        const chip = e.target.closest('.chip');
        if (!chip) return;
        activeCategory = chip.dataset.category;
        document.querySelectorAll('#filterChips .chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        renderEventsPage();
    });

    // Admin tabs
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById('panel-' + tab.dataset.tab).classList.add('active');
        });
    });

    // Registration search
    document.getElementById('regSearch').addEventListener('input', (e) => {
        regSearchQuery = e.target.value;
        renderRegistrations();
    });

    // Close modals on overlay click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // ESC key to close modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.active').forEach(m => {
                m.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
    });

    // Init
    createParticles();
    renderHome();
    setTimeout(typeTerminal, 800);
});
