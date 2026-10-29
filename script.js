const root = document.documentElement;
const header = document.querySelector('header');
const nav = document.querySelector('#siteNav');
const menu = document.querySelector('#menuBtn');
const theme = document.querySelector('#themeBtn');
const links = [...document.querySelectorAll('nav a')];

const saved = localStorage.getItem('portfolio-theme');
if (saved) root.dataset.theme = saved;

function setThemeIcon() {
  theme.textContent = root.dataset.theme === 'light' ? '☾' : '☼';
  theme.setAttribute('aria-label', root.dataset.theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
}
setThemeIcon();

theme.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
  localStorage.setItem('portfolio-theme', root.dataset.theme);
  setThemeIcon();
});

menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
});

links.forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
}));

const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
    entry.target.classList.add('visible');
    reveal.unobserve(entry.target);
  }
}), { threshold: .12 });

document.querySelectorAll('.reveal').forEach(el => reveal.observe(el));

const sectionObs = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
  }
}), { rootMargin: '-40% 0px -50% 0px' });

document.querySelectorAll('main section[id]').forEach(section => sectionObs.observe(section));
addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 8), { passive: true });

document.querySelector('#year').textContent = new Date().getFullYear();

const vmwareArchitecture = document.querySelector('img[src="assets/vmware-infrastructure-architecture.jpg"]');
if (vmwareArchitecture) vmwareArchitecture.src = 'assets/vmware-infrastructure-architecture.png';

const factoryCard = [...document.querySelectorAll('.project')].find(card => card.querySelector('h3')?.textContent.trim() === 'Factory Network Redesign');
if (factoryCard) {
  factoryCard.querySelector('h3').textContent = 'Factory Network Redesign & Wi-Fi Upgrade';
  const summary = factoryCard.querySelector('p');
  if (summary) summary.textContent = 'Redesigned and rebuilt the aging factory network with an 8-core fiber backbone, four structured distribution points, dedicated PoE switching for wireless access points and IP phones, and separate data switching to support the Smart Factory initiative.';
  const tags = factoryCard.querySelector('.tags');
  if (tags) tags.innerHTML = '<span>8-Core Fiber</span><span>PoE</span><span>Wi-Fi</span><span>Switching</span><span>Smart Factory</span>';
  if (!factoryCard.querySelector('a[href="factory-network.html"]')) {
    const actions = document.createElement('div');
    actions.className = 'actions';
    actions.innerHTML = '<a class="btn secondary" href="factory-network.html">View Project →</a>';
    factoryCard.appendChild(actions);
  }
}

const projectsGrid = document.querySelector('.cards.projects');

function addProject(title, html) {
  if (!projectsGrid) return;
  if ([...projectsGrid.querySelectorAll('h3')].some(h => h.textContent.trim() === title)) return;
  const card = document.createElement('article');
  card.className = 'project reveal visible';
  card.innerHTML = html;
  projectsGrid.appendChild(card);
}

addProject('Employee Onboarding Request Automation', '<strong>14</strong><small>Automation · Employee Onboarding · Workflow</small><h3>Employee Onboarding Request Automation</h3><p>Automated the employee onboarding request process using Microsoft Power Automate, Microsoft Forms, SharePoint tracking, HOD approval and automatic Jira ticket creation, improving data completeness, early IT visibility and onboarding speed.</p><div class="tags"><span>Power Automate</span><span>Microsoft Forms</span><span>SharePoint</span><span>Approvals</span><span>Jira</span><span>Workflow Automation</span></div><div class="actions"><a class="btn secondary" href="onboarding-automation.html">View Project →</a></div>');

addProject('Offboarding Automation Flow', '<strong>15</strong><small>Automation · Access Governance · Offboarding</small><h3>Offboarding Automation Flow</h3><p>Automated employee offboarding across IT-managed systems, databases, DevOps platforms, marketplace systems and other applications using Power Automate, Microsoft Forms and centralized SharePoint tracking with twice-daily reminders for pending administrators.</p><div class="tags"><span>Power Automate</span><span>Microsoft Forms</span><span>SharePoint</span><span>Access Removal</span><span>Audit Trail</span><span>Automated Reminders</span></div><div class="actions"><a class="btn secondary" href="offboarding-automation.html">View Project →</a></div>');

addProject('Invoice Data Extraction Automation', '<strong>16</strong><small>AI Automation · Billing · Document Processing</small><h3>Invoice Data Extraction Automation</h3><p>Automated processing of more than 5,000 invoice files per week using SharePoint, Power Automate Cloud, Power Automate Desktop, LLM-based invoice analysis and structured Excel output for Billing review.</p><div class="tags"><span>Power Automate Cloud</span><span>Power Automate Desktop</span><span>LLM</span><span>SharePoint</span><span>Excel</span><span>PDF Processing</span></div><div class="actions"><a class="btn secondary" href="invoice-data-extraction.html">View Project →</a></div>');

addProject('Azure Site-to-Site VPN with FortiGate', '<strong>17</strong><small>Azure · Networking · Security · Hybrid Cloud</small><h3>Azure Site-to-Site VPN with FortiGate</h3><p>Implemented a secure route-based Site-to-Site IPsec VPN between an on-premises FortiGate environment and Azure VPN Gateway, enabling private bidirectional connectivity to multiple Azure workloads with IKEv2, static routing, firewall policies and NAT Traversal.</p><div class="tags"><span>Azure VPN Gateway</span><span>FortiGate</span><span>IPsec</span><span>IKEv2</span><span>Static Routing</span><span>NAT-T</span></div><div class="actions"><a class="btn secondary" href="azure-fortigate-s2s-vpn.html">View Project →</a></div>');

const skillCards = [...document.querySelectorAll('.cards.skills .card')];
const cyberSkill = skillCards.find(card => card.querySelector('h3')?.textContent.trim() === 'Cybersecurity');
if (cyberSkill) {
  const p = cyberSkill.querySelector('p');
  if (p) p.textContent = 'Zero Trust access, WAF, CrowdStrike endpoint protection, MFA, SIEM/logging, hardening, monitoring and incident-oriented administration.';
  const tags = cyberSkill.querySelector('.tags');
  if (tags) tags.innerHTML = '<span>Zero Trust</span><span>WAF</span><span>CrowdStrike</span><span>MFA</span><span>EDR</span><span>SIEM</span>';
}

const aiSkill = skillCards.find(card => card.querySelector('h3')?.textContent.trim() === 'AI Infrastructure');
if (aiSkill) {
  const p = aiSkill.querySelector('p');
  if (p) p.textContent = 'Local LLM environments, RAG, AI agents, Azure AI Foundry, n8n, Power Automate, LangGraph and secure enterprise AI integrations.';
  const tags = aiSkill.querySelector('.tags');
  if (tags) tags.innerHTML = '<span>Azure AI Foundry</span><span>n8n</span><span>Power Automate</span><span>Ollama</span><span>RAG</span><span>LangGraph</span><span>Agents</span>';
}

const contactCopy = document.querySelector('#contact .contact-box > div');
if (contactCopy && !contactCopy.querySelector('.contact-details')) {
  const details = document.createElement('div');
  details.className = 'contact-details';
  details.style.cssText = 'display:flex;flex-wrap:wrap;gap:18px;margin-top:18px;font-weight:800;';
  details.innerHTML = '<a href="mailto:rajarathna.jay@cymax.com" style="color:var(--text);text-decoration:none;">✉ rajarathna.jay@cymax.com</a><a href="tel:+16049081755" style="color:var(--text);text-decoration:none;">☎ +1 604 908 1755</a>';
  contactCopy.appendChild(details);
}