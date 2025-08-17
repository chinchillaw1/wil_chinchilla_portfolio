// Check if jsPDF is loaded
console.log('jsPDF library check:', typeof window.jsPDF !== 'undefined');
if (typeof window.jsPDF !== 'undefined') {
    console.log('jsPDF object:', window.jsPDF);
}

// Simple modular progress bar animation
function animateBar(selector, percentage) {
    const bar = document.querySelector(selector);
    if (bar) {
        bar.style.width = percentage + '%';
    }
}

// Animate multiple bars at once
function animateBars(bars) {
    bars.forEach((bar, index) => {
        setTimeout(() => {
            animateBar(bar.selector, bar.percentage);
        }, index * 300); // 300ms delay between each bar
    });
}

// Auto-animate all bars with data-width attribute
function animateAllBars() {
    const progressBars = document.querySelectorAll('.progress-bar[data-width]');
    progressBars.forEach((bar, index) => {
        setTimeout(() => {
            const percentage = bar.getAttribute('data-width');
            if (percentage && !isNaN(percentage)) {
                bar.style.width = percentage + '%';
            }
        }, index * 300);
    });
}

// Trigger animations when page loads
window.addEventListener('load', function() {
    setTimeout(() => {
        animateAllBars();
    }, 1000);
});

// Manual trigger function
function triggerProgressBars() {
    animateAllBars();
}


// Analytics Dashboard Data and Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Data
    const industries = [
        'Entertainment & Media',
        'Healthcare & Medical', 
        'Technology & Software',
        'Consumer Goods',
        'Manufacturing',
        'Financial Services',
        'Sports & Entertainment',
        'Pharmaceutical',
        'Internet Infrastructure',
        'Media & Marketing',
        'Retail Technology',
        'Travel & Hospitality'
    ];
    
    const totalProjects = [6, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1];
    const projectsLed = [4, 2, 2, 1, 1, 1, 1, 0, 0, 0, 0, 0];
    
    // Industry Bar Chart
    const ctx1 = document.getElementById('industryChart');
    if (ctx1 && typeof Chart !== 'undefined') {
        // Create gradients using CSS variables
        const primaryGradient = ctx1.getContext('2d').createLinearGradient(0, 0, 0, 400);
        primaryGradient.addColorStop(0, '#6366f1');
        primaryGradient.addColorStop(1, '#8b5cf6');
        
        const secondaryGradient = ctx1.getContext('2d').createLinearGradient(0, 0, 0, 400);
        secondaryGradient.addColorStop(0, '#3b82f6');
        secondaryGradient.addColorStop(1, '#06b6d4');
        
        new Chart(ctx1, {
            type: 'bar',
            data: {
                labels: industries,
                datasets: [{
                    label: 'Projects',
                    data: totalProjects,
                    backgroundColor: industries.map((_, i) => projectsLed[i] > 0 ? '#6366f1' : '#3b82f6'),
                    borderWidth: 0,
                    borderRadius: 6,
                    borderSkipped: false,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            generateLabels: function(chart) {
                                return [
                                    {
                                        text: '👑 Leadership Projects',
                                        fillStyle: '#6366f1',
                                        strokeStyle: '#6366f1',
                                        lineWidth: 0
                                    },
                                    {
                                        text: '🔧 Support Projects', 
                                        fillStyle: '#3b82f6',
                                        strokeStyle: '#3b82f6',
                                        lineWidth: 0
                                    }
                                ];
                            },
                            usePointStyle: true,
                            padding: 20,
                            font: {
                                size: 12,
                                weight: 600
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        titleColor: '#1e293b',
                        bodyColor: '#475569',
                        borderColor: '#e2e8f0',
                        borderWidth: 1,
                        cornerRadius: 8,
                        callbacks: {
                            afterLabel: function(context) {
                                const index = context.dataIndex;
                                const led = projectsLed[index];
                                if (led > 0) {
                                    return `👑 Led ${led} of ${context.parsed.y} projects`;
                                }
                                return '🔧 Support/Implementation role';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1,
                            color: '#64748b',
                            font: {
                                weight: 500
                            }
                        },
                        grid: {
                            color: 'rgba(226, 232, 240, 0.5)'
                        }
                    },
                    x: {
                        ticks: {
                            maxRotation: 45,
                            minRotation: 45,
                            color: '#64748b',
                            font: {
                                weight: 500,
                                size: 11
                            }
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
    
    // Leadership Timeline Chart
    const ctx2 = document.getElementById('leadershipChart');
    if (ctx2 && typeof Chart !== 'undefined') {
        new Chart(ctx2, {
            type: 'line',
            data: {
                labels: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
                datasets: [{
                    label: 'Total Projects',
                    data: [2, 3, 3, 1, 5, 1, 1, 2, 3],
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#6366f1',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 3,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }, {
                    label: 'Led Analytics',
                    data: [0, 2, 3, 1, 1, 1, 1, 2, 3],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    fill: false,
                    tension: 0.4,
                    pointBackgroundColor: '#3b82f6',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 3,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }, {
                    label: 'Led Teams',
                    data: [0, 0, 1, 0, 1, 0, 0, 2, 2],
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    fill: false,
                    tension: 0.4,
                    pointBackgroundColor: '#f59e0b',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 3,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 20,
                            font: {
                                size: 12,
                                weight: 600
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        titleColor: '#1e293b',
                        bodyColor: '#475569',
                        borderColor: '#e2e8f0',
                        borderWidth: 1,
                        cornerRadius: 8
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1,
                            color: '#64748b',
                            font: {
                                weight: 500
                            }
                        },
                        grid: {
                            color: 'rgba(226, 232, 240, 0.5)'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#64748b',
                            font: {
                                weight: 500
                            }
                        },
                        grid: {
                            color: 'rgba(226, 232, 240, 0.3)'
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    }

    // Animate counters
    function animateCounter(elementId, finalValue, duration = 2000, suffix = '') {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        const start = 0;
        const increment = finalValue / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= finalValue) {
                current = finalValue;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, 16);
    }

    // Start counter animations with delay
    setTimeout(() => {
        animateCounter('totalProjects', 24);
        animateCounter('industriesServed', 12);
        animateCounter('yearsLeading', 7);
        animateCounter('leadershipRate', 50, 2000, '%');
    }, 500);
    
    // Fallback for charts if Chart.js fails to load
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js not loaded. Charts will not be displayed.');
        const chartContainers = document.querySelectorAll('.chart-container');
        chartContainers.forEach(container => {
            container.innerHTML = '<p style="text-align: center; color: #64748b; padding: 2rem;">Chart loading failed. Please refresh the page.</p>';
        });
    }
});

// Resume Download Functions
function downloadPDF() {
    // Show loading state
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = '📄 Generating PDF...';
    btn.disabled = true;
    
    // Generate PDF
    setTimeout(() => {
        console.log('Starting PDF generation...');
        console.log('jsPDF available:', typeof window.jsPDF !== 'undefined');
        
        const pdfUrl = generatePDFContent();
        
        if (pdfUrl) {
            console.log('PDF generated successfully');
            // Create a link to download the PDF
            const link = document.createElement('a');
            link.href = pdfUrl;
            link.download = 'Wil_Chinchilla_CV.pdf';
            link.click();
            
            // Clean up the blob URL after a short delay
            setTimeout(() => {
                URL.revokeObjectURL(pdfUrl);
            }, 1000);
            
            // Reset button
            btn.textContent = originalText;
            btn.disabled = false;
            
            // Show success message
            showDownloadSuccess('PDF downloaded successfully!');
        } else {
            console.error('PDF generation failed');
            // Fallback if PDF generation fails
            btn.textContent = originalText;
            btn.disabled = false;
            showDownloadSuccess('PDF generation failed. Please try again.');
        }
    }, 2000);
}

function downloadText() {
    // Show loading state
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = '📝 Generating Text...';
    btn.disabled = true;
    
    // Generate text content
    setTimeout(() => {
        const textContent = generateTextContent();
        const blob = new Blob([textContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Wil_Chinchilla_CV.txt';
        link.click();
        
        // Clean up
        URL.revokeObjectURL(url);
        
        // Reset button
        btn.textContent = originalText;
        btn.disabled = false;
        
        // Show success message
        showDownloadSuccess('Text file downloaded successfully!');
    }, 1000);
}

function generatePDFContent() {
    // Check if jsPDF is available
    if (typeof window.jsPDF === 'undefined') {
        console.error('jsPDF library not loaded');
        return null;
    }

    try {
        // Try different ways to access jsPDF
        let jsPDF;
        if (window.jsPDF && window.jsPDF.jsPDF) {
            jsPDF = window.jsPDF.jsPDF;
        } else if (window.jsPDF) {
            jsPDF = window.jsPDF;
        } else {
            console.error('jsPDF not accessible');
            return null;
        }
        
        const doc = new jsPDF();
    
    // Set up fonts and styling
    doc.setFont('helvetica');
    doc.setFontSize(24);
    doc.setTextColor(99, 102, 241); // Primary color
    
    // Header
    doc.text('Wil Chinchilla', 20, 30);
    doc.setFontSize(16);
    doc.setTextColor(71, 85, 105);
    doc.text('Senior Data Analytics Manager', 20, 40);
    
    // Contact Information
    doc.setFontSize(12);
    doc.setTextColor(30, 41, 59);
    doc.text('Email: wil.chinchilla@professional.com', 20, 55);
    doc.text('LinkedIn: linkedin.com/in/wilchinchilla', 20, 62);
    doc.text('Location: San Diego, California', 20, 69);
    
    // Professional Summary
    doc.setFontSize(14);
    doc.setTextColor(99, 102, 241);
    doc.text('PROFESSIONAL SUMMARY', 20, 85);
    doc.setFontSize(10);
    doc.setTextColor(30, 41, 59);
    const summary = 'Senior Data Analytics Manager with 8+ years of experience leading enterprise analytics implementations across 12+ industries. Expert in data architecture, team leadership, and turning complex data challenges into business solutions.';
    doc.setFontSize(10);
    const summaryLines = doc.splitTextToSize(summary, 170);
    doc.text(summaryLines, 20, 95);
    
    // Professional Experience
    let yPosition = 120;
    doc.setFontSize(14);
    doc.setTextColor(99, 102, 241);
    doc.text('PROFESSIONAL EXPERIENCE', 20, yPosition);
    yPosition += 15;
    
    // Current Company
    doc.setFontSize(12);
    doc.setTextColor(30, 41, 59);
    doc.setFont('helvetica', 'bold');
    doc.text('Current Company (2022 - Present)', 20, yPosition);
    yPosition += 8;
    doc.setFont('helvetica', 'normal');
    doc.text('Senior Data Analytics Manager', 20, yPosition);
    yPosition += 12;
    
    const currentExp = [
        '• Lead a team of 8 data engineers and analysts to deliver enterprise-grade analytics solutions',
        '• Architected scalable data pipelines processing 10TB+ daily, improving processing speed by 60%',
        '• Implemented machine learning models that increased customer retention by 25%',
        '• Managed $2.1M analytics budget and delivered projects 15% under budget consistently'
    ];
    
    currentExp.forEach(item => {
        const lines = doc.splitTextToSize(item, 170);
        doc.text(lines, 20, yPosition);
        yPosition += lines.length * 5 + 2;
    });
    
    // Previous Company
    yPosition += 5;
    doc.setFont('helvetica', 'bold');
    doc.text('Previous Company (2020 - 2022)', 20, yPosition);
    yPosition += 8;
    doc.setFont('helvetica', 'normal');
    doc.text('Data Engineering Lead', 20, yPosition);
    yPosition += 12;
    
    const prevExp = [
        '• Built and maintained data infrastructure supporting 500+ business users',
        '• Developed real-time dashboards reducing executive decision-making time by 40%',
        '• Led migration to cloud-based analytics platform, saving $800K annually',
        '• Mentored junior developers and established data governance best practices'
    ];
    
    prevExp.forEach(item => {
        const lines = doc.splitTextToSize(item, 170);
        doc.text(lines, 20, yPosition);
        yPosition += lines.length * 5 + 2;
    });
    
    // Education
    yPosition += 10;
    doc.setFontSize(14);
    doc.setTextColor(99, 102, 241);
    doc.text('EDUCATION', 20, yPosition);
    yPosition += 15;
    
    doc.setFontSize(12);
    doc.setTextColor(30, 41, 59);
    doc.setFont('helvetica', 'bold');
    doc.text('Master of Science in Data Science', 20, yPosition);
    yPosition += 8;
    doc.setFont('helvetica', 'normal');
    doc.text('University Name (2016 - 2018)', 20, yPosition);
    yPosition += 8;
    doc.text('Specialized in Machine Learning and Statistical Analysis', 20, yPosition);
    yPosition += 12;
    
    doc.setFont('helvetica', 'bold');
    doc.text('Bachelor of Science in Computer Science', 20, yPosition);
    yPosition += 8;
    doc.setFont('helvetica', 'normal');
    doc.text('University Name (2012 - 2016)', 20, yPosition);
    yPosition += 8;
    doc.text('Magna Cum Laude, GPA: 3.8/4.0', 20, yPosition);
    
    // Technical Skills
    yPosition += 15;
    doc.setFontSize(14);
    doc.setTextColor(99, 102, 241);
    doc.text('TECHNICAL SKILLS', 20, yPosition);
    yPosition += 15;
    
    doc.setFontSize(10);
    doc.setTextColor(30, 41, 59);
    const skills = [
        'Programming Languages: JavaScript (React, Node.js, ES6+), HTML, CSS, SQL, Python, R',
        'Analytics Tools: Adobe Analytics, Google Analytics, Customer Journey Analytics, Power BI, Tableau',
        'Cloud Platforms: AWS, Azure, Snowflake, Sevalla',
        'Data Governance: Cookie Compliance, Data Privacy, Data QA, Analytics Audit'
    ];
    
    skills.forEach(skill => {
        const lines = doc.splitTextToSize(skill, 170);
        doc.text(lines, 20, yPosition);
        yPosition += lines.length * 5 + 3;
    });
    
        // Generate PDF blob
        const pdfBlob = doc.output('blob');
        return URL.createObjectURL(pdfBlob);
    } catch (error) {
        console.error('Error generating PDF:', error);
        
        // Fallback: Create a simple text-based PDF-like file
        try {
            const textContent = generateTextContent();
            const blob = new Blob([textContent], { type: 'application/pdf' });
            return URL.createObjectURL(blob);
        } catch (fallbackError) {
            console.error('Fallback also failed:', fallbackError);
            return null;
        }
    }
}

function generateTextContent() {
    return `WIL CHINCHILLA - SENIOR DATA ANALYTICS MANAGER
================================================================

CONTACT INFORMATION
Email: wil.chinchilla@professional.com
LinkedIn: linkedin.com/in/wilchinchilla
Location: San Diego, California

PROFESSIONAL SUMMARY
Senior Data Analytics Manager with 8+ years of experience leading enterprise analytics implementations across 12+ industries. Expert in data architecture, team leadership, and turning complex data challenges into business solutions.

KEY ACHIEVEMENTS
• Led teams of 8+ data engineers and analysts
• Processed 10TB+ daily data with 60% speed improvement
• Increased customer retention by 25% through ML models
• Managed $2.1M analytics budget with 15% under-budget delivery
• Supported 500+ business users with real-time dashboards
• Saved $800K annually through cloud migration
• Improved marketing ROI by 35% with predictive models

PROFESSIONAL EXPERIENCE

CURRENT COMPANY (2022 - Present)
Senior Data Analytics Manager
• Lead a team of 8 data engineers and analysts to deliver enterprise-grade analytics solutions
• Architected scalable data pipelines processing 10TB+ daily, improving processing speed by 60%
• Implemented machine learning models that increased customer retention by 25%
• Managed $2.1M analytics budget and delivered projects 15% under budget consistently

PREVIOUS COMPANY (2020 - 2022)
Data Engineering Lead
• Built and maintained data infrastructure supporting 500+ business users
• Developed real-time dashboards reducing executive decision-making time by 40%
• Led migration to cloud-based analytics platform, saving $800K annually
• Mentored junior developers and established data governance best practices

EARLIER COMPANY (2018 - 2020)
Senior Data Analyst
• Designed and implemented automated reporting systems for C-level executives
• Created predictive models that improved marketing ROI by 35%
• Collaborated with cross-functional teams to deliver data-driven insights

EDUCATION

MASTER OF SCIENCE IN DATA SCIENCE
University Name (2016 - 2018)
Specialized in Machine Learning and Statistical Analysis
Thesis: "Predictive Analytics in Enterprise Environments"

BACHELOR OF SCIENCE IN COMPUTER SCIENCE
University Name (2012 - 2016)
Magna Cum Laude, GPA: 3.8/4.0
Focus: Database Systems and Software Engineering

CERTIFICATIONS & AWARDS
• AWS Certified Solutions Architect (Amazon Web Services, 2023)
• Tableau Desktop Certified Professional (Tableau, 2022)
• Data Science Excellence Award (Current Company, 2023)
• Machine Learning Specialization (Stanford University, 2021)

TECHNICAL SKILLS

Programming Languages & Development:
• JavaScript (React, Node.js, ES6+)
• HTML, CSS, SQL
• Python, R
• API Integration (OAuth, JWT)
• Code Repositories (GitHub, Bitbucket)

Analytics Implementation:
• Adobe Analytics (AA)
• Customer Journey Analytics (CJA)
• Google Analytics
• Adobe Launch, Google Tag Manager, Tealium
• Data Layer (EDDL, WC3)

Reporting & BI Tools:
• Excel, Power BI, Tableau
• Adobe Analytics Workspace
• Customer Journey Analytics

Cloud Platforms:
• Sevalla, Azure, Snowflake, AWS

Data Governance & Compliance:
• Cookie Compliance
• Data Privacy and Consent Management
• Data QA and Validation
• Analytics Audit and Optimization
• Data Documentation and Labeling

LEADERSHIP & SOFT SKILLS
• Analytics Project Leadership
• Cross-Functional Team Leadership
• Stakeholder Communication
• Strategic Planning & Roadmapping
• Agile/Scrum Methodology
• Account Management & Billing
• People Process Improvement
• Marketing Technology Assessment

INDUSTRY EXPERIENCE
Worked across 12+ industry verticals including:
• Entertainment & Media
• Healthcare & Medical
• Technology & Software
• Consumer Goods
• Manufacturing
• Financial Services
• Sports & Entertainment
• Pharmaceutical
• Internet Infrastructure
• Media & Marketing
• Retail Technology
• Travel & Hospitality

PERSONALITY & WORKING STYLE
INTJ Personality Type - The Architect
Strategic thinker with collaborative leadership approach
Independent execution with collaborative spirit
Innovative problem-solving with practical application
`;
}

function showDownloadSuccess(message) {
    // Create success notification
    const notification = document.createElement('div');
    notification.className = 'download-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">✅</span>
            <span class="notification-text">${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}