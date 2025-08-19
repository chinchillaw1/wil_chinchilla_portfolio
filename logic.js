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

// Performance optimization: Intersection Observer for images
function optimizeImageLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize image optimization
document.addEventListener('DOMContentLoaded', optimizeImageLoading);

// Fade-in animation on scroll
function initFadeInAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    if ('IntersectionObserver' in window) {
        const fadeObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        fadeElements.forEach(element => {
            fadeObserver.observe(element);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        fadeElements.forEach(element => {
            element.classList.add('visible');
        });
    }
}

// Manual trigger function
function triggerProgressBars() {
    animateAllBars();
}

// Initialize fade-in animations
document.addEventListener('DOMContentLoaded', initFadeInAnimations);


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
                    label: 'Individual Contributor',
                    data: totalProjects.map((total, i) => total - projectsLed[i]),
                    backgroundColor: '#3b82f6',
                    borderWidth: 0,
                    borderRadius: 6,
                    borderSkipped: false,
                }, {
                    label: 'Leadership',
                    data: projectsLed,
                    backgroundColor: '#f59e0b',
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
                            usePointStyle: true,
                            padding: 20,
                            font: {
                                size: 14,
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
                                const datasetIndex = context.datasetIndex;
                                const total = totalProjects[index];
                                const led = projectsLed[index];
                                
                                if (datasetIndex === 0) {
                                    // Individual Contributor dataset
                                    return `🔧 Individual Contributor: ${context.parsed.y} projects`;
                                } else {
                                    // Leadership dataset
                                    return `👑 Leadership: ${context.parsed.y} projects`;
                                }
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        stacked: true,
                        ticks: {
                            stepSize: 1,
                            color: '#64748b',
                            font: {
                                weight: 500,
                                size: 14
                            }
                        },
                        grid: {
                            color: 'rgba(226, 232, 240, 0.5)'
                        }
                    },
                    x: {
                        stacked: true,
                        ticks: {
                            maxRotation: 45,
                            minRotation: 45,
                            color: '#64748b',
                            font: {
                                weight: 500,
                                size: 14
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
    
    // New Visualization Placeholder
    const ctx2 = document.getElementById('leadershipChart');
    if (ctx2) {
        // Placeholder for new visualization
        ctx2.style.display = 'flex';
        ctx2.style.alignItems = 'center';
        ctx2.style.justifyContent = 'center';
        ctx2.style.backgroundColor = '#f8fafc';
        ctx2.style.border = '2px dashed #cbd5e1';
        ctx2.style.borderRadius = '8px';
        ctx2.style.minHeight = '300px';
        ctx2.innerHTML = `
            <div style="text-align: center; color: #64748b;">
                <div style="font-size: 48px; margin-bottom: 16px;">📊</div>
                <div style="font-size: 18px; font-weight: 600; margin-bottom: 8px;">New Visualization</div>
                <div style="font-size: 14px;">Coming soon...</div>
            </div>
        `;
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
        doc.setTextColor(0, 0, 0); // Black for professional look
        
        // Header
        doc.text('Wilbert (Wil) Chinchilla', 20, 30);
        doc.setFontSize(16);
        doc.setTextColor(100, 100, 100);
        doc.text('Senior Data Analytics Manager', 20, 40);
        
        // Contact Information
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.text('Email: wil.chinchilla@professional.com', 20, 55);
        doc.text('LinkedIn: linkedin.com/in/wilchinchilla', 20, 62);
        doc.text('Location: San Diego, California', 20, 69);
        
        // Professional Summary
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'bold');
        doc.text('PROFESSIONAL SUMMARY', 20, 85);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        const summary = 'Senior Data Analytics Manager with 8+ years of experience leading enterprise analytics implementations across 12+ industries. Expert in data architecture, team leadership, and turning complex data challenges into business solutions.';
        const summaryLines = doc.splitTextToSize(summary, 170);
        doc.text(summaryLines, 20, 95);
        
        // Key Achievements Table
        let yPosition = 115;
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('KEY ACHIEVEMENTS', 20, yPosition);
        yPosition += 15;
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        const achievements = [
            '• Led teams of 8+ data engineers and analysts',
            '• Processed 10TB+ daily data with 60% speed improvement',
            '• Increased customer retention by 25% through ML models',
            '• Managed $2.1M analytics budget with 15% under-budget delivery',
            '• Supported 500+ business users with real-time dashboards',
            '• Saved $800K annually through cloud migration',
            '• Improved marketing ROI by 35% with predictive models'
        ];
        
        achievements.forEach(item => {
            const lines = doc.splitTextToSize(item, 170);
            doc.text(lines, 20, yPosition);
            yPosition += lines.length * 5 + 2;
        });
        
        // Professional Experience
        yPosition += 10;
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('PROFESSIONAL EXPERIENCE', 20, yPosition);
        yPosition += 15;
        
        // Current Company
        doc.setFontSize(12);
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
        
        // Earlier Company
        yPosition += 5;
        doc.setFont('helvetica', 'bold');
        doc.text('Earlier Company (2018 - 2020)', 20, yPosition);
        yPosition += 8;
        doc.setFont('helvetica', 'normal');
        doc.text('Senior Data Analyst', 20, yPosition);
        yPosition += 12;
        
        const earlierExp = [
            '• Designed and implemented automated reporting systems for C-level executives',
            '• Created predictive models that improved marketing ROI by 35%',
            '• Collaborated with cross-functional teams to deliver data-driven insights'
        ];
        
        earlierExp.forEach(item => {
            const lines = doc.splitTextToSize(item, 170);
            doc.text(lines, 20, yPosition);
            yPosition += lines.length * 5 + 2;
        });
        
        // Industry Experience Table
        yPosition += 10;
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('INDUSTRY EXPERIENCE', 20, yPosition);
        yPosition += 15;
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        const industries = [
            'Worked across 12+ industry verticals including:',
            '• Entertainment & Media (6 projects, 4 led)',
            '• Healthcare & Medical (2 projects, 2 led)',
            '• Technology & Software (2 projects, 2 led)',
            '• Consumer Goods, Manufacturing, Financial Services (2 projects each)',
            '• Sports, Pharmaceutical, Internet Infrastructure (1 project each)',
            '• Media & Marketing, Retail Technology, Travel & Hospitality (1 project each)'
        ];
        
        industries.forEach(item => {
            const lines = doc.splitTextToSize(item, 170);
            doc.text(lines, 20, yPosition);
            yPosition += lines.length * 5 + 2;
        });
        
        // Technical Skills
        yPosition += 10;
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('TECHNICAL SKILLS', 20, yPosition);
        yPosition += 15;
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        const skills = [
            'Programming Languages: JavaScript (React, Node.js, ES6+), HTML, CSS, SQL, Python, R',
            'Analytics Tools: Adobe Analytics, Google Analytics, Customer Journey Analytics, Power BI, Tableau',
            'Cloud Platforms: AWS, Azure, Snowflake, Sevalla',
            'Data Governance: Cookie Compliance, Data Privacy, Data QA, Analytics Audit',
            'Leadership: Cross-Functional Team Management, Stakeholder Communication, Strategic Planning'
        ];
        
        skills.forEach(skill => {
            const lines = doc.splitTextToSize(skill, 170);
            doc.text(lines, 20, yPosition);
            yPosition += lines.length * 5 + 3;
        });
        
        // Education
        yPosition += 10;
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('EDUCATION', 20, yPosition);
        yPosition += 15;
        
        doc.setFontSize(12);
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
        
        // Certifications
        yPosition += 15;
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('CERTIFICATIONS & AWARDS', 20, yPosition);
        yPosition += 15;
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        const certs = [
            '• AWS Certified Solutions Architect (Amazon Web Services, 2023)',
            '• Tableau Desktop Certified Professional (Tableau, 2022)',
            '• Data Science Excellence Award (Current Company, 2023)',
            '• Machine Learning Specialization (Stanford University, 2021)'
        ];
        
        certs.forEach(cert => {
            const lines = doc.splitTextToSize(cert, 170);
            doc.text(lines, 20, yPosition);
            yPosition += lines.length * 5 + 2;
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
Email: wilchinchilla@gmail.com
LinkedIn: linkedin.com/in/wilchinchilla
Location: San Diego, California

PROFESSIONAL SUMMARY
Senior Data Analytics Manager with 14+ years of experience leading cross-functional teams and delivering enterprise-grade analytics solutions. Proven track record of architecting scalable data platforms that drive business growth and improve operational efficiency. Expert in data architecture, analytics implementation, and team leadership with successful technical initiatives resulting in 40% performance improvements and $2M+ cost savings.

RELEVANT WORK EXPERIENCE

EY - MANAGER, DATA & ANALYTICS (September 2019 – August 2025)
• Current engagement has grown from $700K Total Engagement Revenue (TER) to $1.5M TER within 4 years
• Lead a team of 4 senior technical consultants for a large media account while overseeing engagement economics, manage account relationships, and discover new engagement opportunities
• Data collection/digital analytics lead for 4 large scale transformation projects that were key accounts that surpassed the $5 million mark
• Led multi-year martech strategy and implementation for a Fortune 500 media client across 6 brands, 26 websites, mobile apps, OTT, and STB platforms
• Managed Adobe Launch and Adobe WebSDK implementations, enabling privacy-compliant data collection into Adobe Experience Platform (CDP)
• Directed teams of 4+ consultants (onshore and offshore), delivering on-time, scalable instrumentation and analytics enablement across platforms
• Delivered KPI frameworks and executive dashboards to track site performance and customer behavior, resulting in faster decision-making and improved CX
• Collaborated across product, engineering, brand, and UX teams to align global tech and content roadmaps with regional priorities
• Played key role in multi-million dollar digital transformation programs, modernizing data architecture and streamlining vendor integrations
• Consult EY clients across various industries on the delivery, architecture, and strategy of data collection/digital marketing analytics products

EY - SENIOR CONSULTANT, DATA & ANALYTICS (April 2017 – September 2019)
• Managed, in client facing consultative role, end-to-end digital architecture for Adobe Analytics SDK for both iOS and Android as part of a large digital transformation project for a client within the travel industry
• Executed Adobe Analytics SDK instrumentation across mobile and web for travel and publishing clients undergoing full-stack digital modernization
• Managed client relationships with stakeholders and represented clients in product meetings to execute data governance strategy and documentation
• Created and executed client facing workshops for Adobe Analytics reporting, QA, documentation, governance, as well as other tools within the Adobe Marketing Cloud Suite like Test and Target
• Created Adobe Data feed to leverage clickstream data to push into databases in order to use SQL
• Provided support for OneTrust implementation and guidance around GDPR in regards to data collection
• Migrated over 200+ 3rd Party Marketing tags for a large scale migration from one tag management system to another for a large publishing brand, improving governance and load performance
• Facilitated Agile ceremonies and collaborated across cross-functional squads to deliver high-quality digital experiences
• Created collateral in technical sales presentations and provided various client facing support
• Developed various analytics tracking solutions for clients using Adobe Dynamic Tag Management (DTM) to implement Omniture/Site Catalyst/Adobe Analytics (AA) using jQuery, Angular JS, and Javascript
• Provided recommendations and strategies for updating code methodologies for delivering data to reporting tools for both mobile and desktop

EY (FORMERLY SOCIETY CONSULTING) - CONSULTANT, DATA & ANALYTICS (August 2015 – April 2017)
• Delivered custom data collection strategies using Adobe DTM, JavaScript (jQuery, AngularJS), and modern front-end frameworks
• Developed various analytics tracking solutions for clients using Adobe Dynamic Tag Management (DTM) to implement Omniture/Site Catalyst/Adobe Analytics (AA) using jQuery, Angular JS, and Javascript
• Supported clients with analytics QA, data layer design, and site/app instrumentation for clickstream and video analytics
• Helped define tracking plans and stakeholder goals, turning ambiguous requirements into measurable data capture
• Provided recommendations and strategies for updating code methodologies for delivering data to reporting tools for both mobile and desktop
• Presented in technical sales presentations and provided various client facing support

NUMERIC ANALYTICS - SENIOR CONSULTANT, SOLUTION ARCHITECTURE (August 2014 – August 2015)
• Developed various analytics tracking solutions for clients using Adobe Dynamic Tag Management (DTM) to implement Omniture/Site Catalyst/Adobe Analytics (AA) using jQuery and Javascript
• Provided recommendations for optimizing current analytical reports and updating tracking methodologies for various clients
• Provided analytics QA support for various technologies including mobile web, mobile native apps, and desktop for clients from Fortune 100 to Fortune 500 companies in various different marketing verticals

BARCLAYCARD US - ADOBE ANALYTICS (OMNITURE) TECH LEAD (September 2013 – August 2014)
• Created technical documentation for implementing clickstream analytics tool, Adobe Analytics (Omniture) for bPay and Barclaycard US Servicing mobile apps for iPhone, iPad, and Android devices
• Created analytic data presentation and automated dashboards for bPay app to various business owners in the mobile and community groups of Barclaycard US
• Coordinated with Agile Scrum mobile teams to fix defects, which included Business Analysts, Project Managers, and Mobile App Developers
• Coordinated reporting requirements with internal customers to meet business objectives for mobile department

CONTRACTOR FOR BRIDGEPOINT EDUCATION VIA AQUENT - INTERNET MARKETING SPECIALIST (March 2013 – September 2013)
• Created, optimized (A/B testing), and sent email marketing messages to students and faculty of Ashford University and University of the Rockies using ESP Lyris
• Managed an inherited Adobe Analytics (a.k.a. Omniture or Site Catalyst) implementation project and within two months went from 66% to 96% completion of project
• Managed and provided business requirements for tag management for over 4 major web development projects with 3rd party tags like Kenshoo, C3, DFA Floodlight, Lightning Bolt, Bing Adwords Conversion Tag, Google Adwords Conversion Tag, and Google Remarketing
• Executed various SEO projects such as content optimization, site speed analysis, image optimization, HTML email SEO, daily SEO traffic reporting (branded vs. generic keywords), monthly SERP traffic reporting, link building, and site audits of recommended improvements

ASK US INTERNATIONAL, INC. - MARKETING MANAGER (October 2012 – March 2013)
• Traditional and digital marketing storyteller for new B2B start-up SaaS consumer tool within the health insurance industry
• Executed implementation of standard Google Analytics tracking along with custom tracking and reporting for multiple web properties
• Developed social media channels and community marketing channels

NRG (PREVIOUSLY RELIANT) - WEB ANALYST/COPYWRITER (May 2011 – September 2012)
• Managed content refresh projects in English and Spanish that included coordinating with UX managers and designers, Visual Designers, Copywriters, and IT Developers
• Initiated shared resource role to implement web marketing projects on reporting using Adobe Omniture tools: SiteCatalyst and Test & Target
• Executed Test & Target test with team to measure the impact of different experiences to see which experience could lead an increase to conversions and revenue of B2B customers. Results in this test increased conversions 32% against the baseline
• Proofread copy for the Spanish side of reliant.com and provided small translations for creative assets, web pages, and other online components resulting in numerous completed projects on schedule

GETGROUBY.COM (SOLD TO CROWDSAVINGS.COM) - WEB CONTENT & COMMUNITY MANAGER (October 2010 – May 2011)
• Managed online social media marketing, e-commerce marketing, and public relations in four different markets — Houston, Austin, San Antonio, and Dallas
• Edited web copy for GetGrouby.com as manager of four freelance writers
• Managed a daily e-mail marketing campaign with providers MailChimp and Exact Target
• Edited press releases and provided in-house PR support. Generated coverage in a publication with a circulation of 200,000 and coverage by Houston's ABC-13 News Program

EDUCATION

UNIVERSITY OF HOUSTON - DOWNTOWN
Bachelor of Science, Professional Writing (English Minor)
Graduated: August 2010

International Experience:
• London Summer Program, May 2008
• Paris Summer Program, May 2009

VOLUNTEER SERVICE

HUMAN RIGHTS CAMPAIGN (HRC), HOUSTON CHAPTER
Marketing and Communications Steering Committee Co-Chair (October 2010 – September 2012)
• Edited press releases resulting in event listings and local coverage
• Managed social media marketing campaigns utilizing Facebook, Twitter, and Email
• Maintained Houston.HRC.org website with events and copy using a corporate content management system
• Recruited and managed marketing team of volunteers that included photographers, graphic designers, and public relations support

SELECTED LECTURES

UNIVERSITY OF HOUSTON – DOWNTOWN
Guest Lecturer (November 22, 2011)
Topic: "Lateral Reporting & Online Marketing"
Course: Writing for the Media (ENG 3333/COMM 3311)

CERTIFICATIONS & AWARDS
• Adobe Certified Expert - Adobe Customer Journey Analytics Developer (Adobe, May 2, 2025 - May 2, 2027)
• Adobe Certified Master - Adobe Analytics Architect (Adobe, Oct 15, 2023 - Oct 16, 2025)

KEY SKILLS & TECHNOLOGIES

Analytics Platforms:
• Adobe Analytics, Adobe Experience Platform (CDP), Adobe Launch, Adobe DTM, Omniture/Site Catalyst, Google Analytics

Programming & Frameworks:
• JavaScript, jQuery, AngularJS, WebSDK, HTML, CSS

Marketing Technology:
• Tag Management Systems (TMS), OneTrust, Privacy Compliance, GDPR, Test & Target, Adobe Marketing Cloud Suite

Data Management:
• Adobe Data Feeds, SQL, Database Integration, Clickstream Analytics

Email Marketing:
• ESP Lyris, MailChimp, Exact Target, A/B Testing

SEO & Optimization:
• Content optimization, Site speed analysis, Image optimization, SERP reporting, Link building

Tag Management:
• Kenshoo, C3, DFA Floodlight, Lightning Bolt, Bing Adwords, Google Adwords, Google Remarketing

Project Management:
• Agile methodologies, Scrum, Cross-functional team leadership, Client relationship management

Languages:
• English, Spanish (Translation and Copywriting)

Content Management:
• CMS platforms, Social media marketing, Public relations, Community management

Client Industries:
• Media & Entertainment, Travel, Publishing, Financial Services, Education, Healthcare, Energy

Specializations:
• Digital transformation, Data architecture, Martech strategy, Mobile SDK implementation

TECHNICAL PROFICIENCY

Programming Languages + Skills:
• JavaScript (React, Node.js, ES6+), HTML, CSS, JS, jQuery & AngularJS, Adobe WebSDK
• Schema Design + JSON, API Integration - OAuth, JWT, Code Repositories - Github, Bitbucket
• SQL (90%), Python (95%), ETL/ELT Pipeline Dev (65%), R (65%), Mobile App Dev Exp (60%)

Analytics Implementation:
• Data Layer - EDDL, WC3, Adobe Analytics - AA, Customer Journey Analytics - CJA
• Google Analytics, Adobe Launch - TMS, Google Tag Manager - TMS, Tealium - TMS, Ensighten - TMS
• 3rd Party Marketing Tags

Reporting & BI Tools:
• Excel "Ol' Faithful", Adobe Analytics Workspace, Customer Journey Analytics, Power BI (90%), Tableau (90%)

Marketing Technology Exp:
• Adobe Experience Cloud, Adobe Experience Platform - CDP (80%), Salesforce (80%), Marketo (80%)
• Adobe Campaign (80%), Google 360/Ad Platform (80%), Optimization (Target, Optimizely) (75%)
• Adobe Experience Manager - CMS (75%), OneTrust & Privacy Compliance, Adobe DTM, Adobe Data Feeds & SQL Integration

Email Marketing & SEO:
• Email Marketing (Lyris, MailChimp, ExactTarget), A/B Testing & Optimization
• SEO (Content, Speed, SERP, Link Building), 3rd Party Marketing Tags (Kenshoo, C3, DFA, etc.)

Soft Skills:
• Analytics Project Lead, Led Stakeholder Interviews, PM Software - JIRA, ADO, Asana
• Roadmap Planning, Marketing Technology Assessment, People Process Improvement
• Account Management, Billing, Cross-Functional Team Leadership (85%), Scrum Agile Lead (85%)

Cloud Platforms for Data:
• Sevalla, Azure (65%), Snowflake (50%), AWS (40%)

Data Governance & Compliance:
• Cookie Compliance, Data Privacy and Consent Management, Data QA and Validation
• Analytics Audit and Optimization, Data Documentation + Labeling

Artificial Intelligence Skills:
• Generative AI Platforms: Claude, ChatGPT, AI-Powered Development - Cursor IDE
• Workflow Optimization: AI-assisted coding, analysis, documentation
• Business Applications: Report generation, data analysis, process automation
• Prompt Optimization (65%), ML/LLM Development (40%)

Languages & Content Management:
• English (Native), Spanish (Translation & Copywriting), CMS Platforms & Content Management
• Social Media Marketing & PR

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