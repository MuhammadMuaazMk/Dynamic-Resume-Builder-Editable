// Event listeners for form elements
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resumeForm');
    const addEducationBtn = document.getElementById('addEducation');
    const addExperienceBtn = document.getElementById('addExperience');
    const educationFields = document.getElementById('educationFields');
    const experienceFields = document.getElementById('experienceFields');
    const resumeOutput = document.getElementById('resumeOutput');

    // Add new education entry
    addEducationBtn?.addEventListener('click', () => {
        const newEducation = document.createElement('div');
        newEducation.className = 'education-entry';
        newEducation.innerHTML = `
            <div class="form-group">
                <label for="degree">Degree *</label>
                <input type="text" name="degree" required>
            </div>
            <div class="form-group">
                <label for="school">School *</label>
                <input type="text" name="school" required>
            </div>
            <div class="form-group">
                <label for="gradYear">Graduation Year *</label>
                <input type="number" name="gradYear" required>
            </div>
        `;
        educationFields?.appendChild(newEducation);
    });

    // Add new experience entry
    addExperienceBtn?.addEventListener('click', () => {
        const newExperience = document.createElement('div');
        newExperience.className = 'experience-entry';
        newExperience.innerHTML = `
            <div class="form-group">
                <label for="company">Company *</label>
                <input type="text" name="company" required>
            </div>
            <div class="form-group">
                <label for="position">Position *</label>
                <input type="text" name="position" required>
            </div>
            <div class="form-group">
                <label for="duration">Duration *</label>
                <input type="text" name="duration" required>
            </div>
            <div class="form-group">
                <label for="responsibilities">Responsibilities *</label>
                <textarea name="responsibilities" required></textarea>
            </div>
        `;
        experienceFields?.appendChild(newExperience);
    });

    // Handle form submission
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Gather form data
        const formData = new FormData(form);
        const personalInfo = {
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            phone: formData.get('phone')
        };

        // Generate resume preview with editable sections
        if (resumeOutput) {
            resumeOutput.innerHTML = `
               
                <div class="resume-content" contenteditable="false">
                    <h1>Personal Information</h1>
                    <h3>${personalInfo.fullName}</h3>
                    <p>Email: ${personalInfo.email}</p>
                    <p>Phone: ${personalInfo.phone}</p>
                    
                    <h1>Education</h1>
                    <div id="editableEducation">
                        ${generateEducationHTML(form)}
                    </div>
                    
                    <h1>Experience</h1>
                    <div id="editableExperience">
                        ${generateExperienceHTML(form)}
                    </div>
                    
                    <h1>Skills</h1>
                    <p>${formData.get('skills')?.toString().split(',').join(', ')}</p>
                </div>
                 <div class="resume-controls">
                    <button id="editResume" class="edit-btn">Edit Resume</button>
                    <button id="saveResume" class="save-btn" style="display:none">Save Changes</button>
                </div>
            `;

            // Add edit/save functionality
            setupEditControls();
        }
    });
});

// Helper function to generate education HTML
function generateEducationHTML(form) {
    const educationEntries = form.querySelectorAll('.education-entry');
    return Array.from(educationEntries).map(entry => {
        const degree = entry.querySelector('input[name="degree"]');
        const school = entry.querySelector('input[name="school"]');
        const gradYear = entry.querySelector('input[name="gradYear"]');
        return `
            <div class="education-item">
                <p>${degree.value} - ${school.value} (${gradYear.value})</p>
            </div>
        `;
    }).join('');
}

// Helper function to generate experience HTML
function generateExperienceHTML(form) {
    const experienceEntries = form.querySelectorAll('.experience-entry');
    return Array.from(experienceEntries).map(entry => {
        const company = entry.querySelector('input[name="company"]');
        const position = entry.querySelector('input[name="position"]');
        const duration = entry.querySelector('input[name="duration"]');
        const responsibilities = entry.querySelector('textarea[name="responsibilities"]');
        return `
            <div class="experience-item">
                <h3 class="position">${position.value} at ${company.value}</h3>
                <p class="duration"${duration.value}</p>
                <p class="responsibilities">${responsibilities.value}</p>
            </div>
        `;
    }).join('');
}

// Setup edit controls
function setupEditControls() {
    const editBtn = document.getElementById('editResume');
    const saveBtn = document.getElementById('saveResume');
    const resumeContent = document.querySelector('.resume-content');

    editBtn?.addEventListener('click', () => {
        resumeContent.contentEditable = 'true';
        resumeContent.style.backgroundColor = '#f8f9fa';
        editBtn.style.display = 'none';
        saveBtn.style.display = 'inline-block';
    });

    saveBtn?.addEventListener('click', () => {
        resumeContent.contentEditable = 'false';
        resumeContent.style.backgroundColor = 'transparent';
        saveBtn.style.display = 'none';
        editBtn.style.display = 'inline-block';
    });
}
