LMS.lesson('m1', {
  id: 'p7', minutes: 40,
  title: 'Practice test and Module 1 recap',
  intro: 'Twenty auto-graded questions covering the whole module, then a one page recap and a review routine that makes it stick.',
  sections: [
    { title: 'Practice test', blocks: [
      { t: 'quiz', id: 'm1p7-test', title: 'Module 1 practice test (20 questions)', questions: [
        { q: 'Which best describes data analytics?', options: ['Storing numbers', 'Collecting, cleaning, analysing and interpreting data to support decisions', 'Designing charts only', 'Writing reports'], answer: 1, why: 'The goal is better decisions.' },
        { q: 'Which is information rather than raw data?', options: ['4200', 'Instagram', 'Reels got 35% more reach than static posts', '2026-11-03'], answer: 2, why: 'Information is data given meaning.' },
        { q: 'What is the correct order of the analytics process?', options: ['Collect, ask, clean, decide', 'Ask, collect, clean, analyse, visualise, decide', 'Clean, ask, decide, collect', 'Visualise, ask, collect'], answer: 1, why: 'Start with the question.' },
        { q: '"What will our reach be next month?" is which type of analytics?', options: ['Descriptive', 'Diagnostic', 'Predictive', 'Prescriptive'], answer: 2, why: 'It looks forward.' },
        { q: 'Which role mainly uses share of voice and sentiment?', options: ['Media buyer', 'PR executive', 'Copywriter', 'Editor'], answer: 1, why: 'PR tracks mentions and mood.' },
        { q: 'Comments such as "the ending felt rushed" are...', options: ['Quantitative', 'Qualitative', 'Impressions', 'Reach'], answer: 1, why: 'Words are qualitative.' },
        { q: 'Which counts unique people?', options: ['Impressions', 'Reach', 'Clicks', 'Frequency'], answer: 1, why: 'Reach is unique people.' },
        { type: 'num', q: '2,40,000 impressions and 1,00,000 reach. Frequency?', answer: 2.4, unit: '', tol: 0.01, why: '2,40,000 / 1,00,000 = 2.4.' },
        { type: 'num', q: '1,200 clicks from 60,000 impressions. CTR in %?', answer: 2, unit: '%', why: '1,200 / 60,000 = 2%.' },
        { type: 'num', q: 'Spend ₹6,000, clicks 1,200. CPC in rupees?', answer: 5, unit: '₹', why: '6,000 / 1,200 = ₹5.' },
        { type: 'num', q: 'Spend ₹3,000, impressions 60,000. CPM in rupees?', answer: 50, unit: '₹', why: '3,000 / 60,000 x 1,000 = ₹50.' },
        { type: 'num', q: '1,200 clicks, 60 purchases. Conversion rate in %?', answer: 5, unit: '%', why: '60 / 1,200 = 5%.' },
        { type: 'num', q: 'Revenue ₹36,000 on spend ₹6,000. ROAS?', answer: 6, unit: '', why: '36,000 / 6,000 = 6.' },
        { type: 'num', q: 'Followers grew from 10,000 to 10,600. Growth rate in %?', answer: 6, unit: '%', why: '(10,600 - 10,000) / 10,000 = 6%.' },
        { type: 'num', q: '1,000 viewers started a video and 250 reached the end. Retention in %?', answer: 25, unit: '%', why: '250 / 1,000 = 25%.' },
        { type: 'num', q: 'A discount code was offered to 5,000 people and 30 used it. Redemptions per 1,000 offers?', answer: 6, unit: '', why: '30 / 5,000 x 1,000 = 6.' },
        { q: 'Which value breaks the rules in a numeric column?', options: ['2500', '4.2K', '1900', '310'], answer: 1, why: 'Text breaks formulas.' },
        { q: 'Which formula adds F2 to F11?', options: ['=SUM(F2:F11)', '=F2+F11', '=COUNT(F2:F11)', '=MAX(F2:F11)'], answer: 0, why: 'SUM adds a range.' },
        { q: 'Which reference stays fixed when copied down?', options: ['F12', '$F$12', 'F$', 'F12:F13'], answer: 1, why: 'Dollar signs lock a cell.' },
        { q: 'Which error appears when dividing by an empty cell?', options: ['#NAME?', '#REF!', '#DIV/0!', '#VALUE!'], answer: 2, why: 'Zero denominator.' }
      ] }
    ] },
    { title: 'Module 1 on one page', blocks: [
      { t: 'html', html: LMS.tbl(['Topic', 'Keep this in mind'], [
        ['<b>Analytics</b>', 'Data, then information, then insight, then decision.'],
        ['<b>Process</b>', 'Ask, collect, clean, analyse, visualise, decide.'],
        ['<b>Four types</b>', 'Descriptive, diagnostic, predictive, prescriptive.'],
        ['<b>Media data</b>', 'Audience, engagement, content. Quantitative and qualitative.'],
        ['<b>Metrics</b>', 'Frequency = impressions / reach. CTR = clicks / impressions. CPC = spend / clicks. CPM = spend / impressions x 1,000. Conversion = conversions / clicks. CPA = spend / conversions. ROAS = revenue / spend. Growth = (new - old) / old.'],
        ['<b>Datasets</b>', 'One row per record, one column per variable, plain numbers, one date format, same spellings, no duplicates.'],
        ['<b>Spreadsheets</b>', 'SUM, AVERAGE, MAX, MIN, COUNT, absolute references, fix errors.'],
        ['<b>Ethics</b>', 'Use data you may use, protect personal data, credit sources.']]) }
    ] },
    { title: 'Make it stick', blocks: [
      { t: 'callout', kind: 'tip', title: 'Feynman test', html: '<p>Explain the six-step analytics process to a friend who has never heard of it, without using the notes. Where you hesitate is where you reread.</p>' },
      { t: 'checklist', id: 'm1p7-review', title: 'Next-morning review', items: [
        'Without looking, list the six steps of the process', 'Without looking, write the seven metric formulas', 'Retake the practice test and beat my last score', 'Redo one calculation using Dataset B', 'Add one line to my log book'] },
      { t: 'html', html: '<p>Module 1 is done. Next up: Data Cleaning and Basic Analysis.</p>' }
    ] }
  ]
});
