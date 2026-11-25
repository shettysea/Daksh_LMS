LMS.lesson('m1', {
  id: 'p4', minutes: 45,
  title: 'Collecting data and building a dataset',
  intro: 'Plan what to collect before you collect it, gather it ethically, and shape it into a clean table that a spreadsheet can use. Then test your own data with the dataset doctor.',
  sections: [
    { title: 'Plan before you collect', blocks: [
      { t: 'html', html: '<p>Beginners open a platform and copy whatever they see. Analysts first decide the question. A plan keeps you from collecting 40 columns you never use, or missing the one column you needed.</p>' +
        LMS.tbl(['Plan item', 'Question to answer', 'Example'], [
          ['<b>Goal</b>', 'What decision will this data support?', 'Which content format should our college page post more?'],
          ['<b>Sources</b>', 'Where will it come from?', 'Instagram and YouTube insights for our own pages'],
          ['<b>Variables</b>', 'Which columns do we need?', 'date, platform, format, topic, reach, likes, comments, shares'],
          ['<b>Period</b>', 'Which dates?', '3 Nov to 24 Nov'],
          ['<b>Sample size</b>', 'How many records?', '30 posts, 15 per platform'],
          ['<b>Date of collection</b>', 'When did you pull it? Numbers keep changing.', '25 Nov 2026']]) },
      { t: 'planBuilder', title: 'Build your collection plan', fields: [
        { id: 'goal', label: 'Goal (one sentence)', wide: true, placeholder: 'Which content format brings the most reach?' },
        { id: 'source', label: 'Platforms or sources', placeholder: 'Instagram, YouTube' },
        { id: 'variables', label: 'Variables (comma separated)', wide: true, multiline: true, placeholder: 'date, platform, format, topic, reach, likes, comments, shares' },
        { id: 'period', label: 'Period', placeholder: '3 Nov to 24 Nov 2026' },
        { id: 'sample', label: 'Sample size', placeholder: '30 posts' },
        { id: 'date', label: 'Collection date', placeholder: '25 Nov 2026' }] }
    ] },
    { title: 'Ways to collect', blocks: [
      { t: 'html', html: '<h4>1. Platform dashboards</h4><p>Open the insights page of an account you manage, choose the date range, and note the figures per post. Many platforms also allow an export.</p>' +
        '<h4>2. Manual extraction</h4><p>When there is no export, record values by hand into a sheet. This is slow and typo-prone, so follow fixed rules: one row per post, same spelling every time, dates in one format.</p>' +
        '<h4>3. Surveys</h4><p>A Google Form feeds responses straight into a sheet. Keep questions neutral and short, and give every respondent the same options.</p>' +
        '<h4>4. Public sources</h4><p>Government portals, rating bodies and open data sites publish downloadable tables. Record the source, date and licence.</p>' },
      { t: 'callout', kind: 'warn', title: 'Ethics and law (India)', html: '<ul><li>Collect only data you are allowed to see: your own accounts, public data, or data people agreed to share.</li><li>Do not collect personal details such as phone numbers or home addresses unless needed and consented.</li><li>Do not scrape accounts against a platform\'s rules.</li><li>India\'s Digital Personal Data Protection Act, 2023 sets duties for handling personal data, including consent and purpose. Remove names and identifiers from classroom datasets.</li><li>Always credit the source.</li></ul>' }
    ] },
    { title: 'Rules for a clean dataset', blocks: [
      { t: 'html', html: '<p>A spreadsheet works only when the data is a plain table. Follow these ten rules and most problems never appear.</p>' +
        LMS.ol(['Row 1 holds column names, and every name is unique.',
          'One row equals one record (one post, one campaign, one episode).',
          'One column equals one variable. Do not mix reach and likes in one cell.',
          'No blank rows or columns inside the table.',
          'Store numbers as plain numbers. Write 4200, not "4.2K" or "4,200 views".',
          'Write dates in one format, ideally YYYY-MM-DD.',
          'Spell categories the same way every time: Instagram, not instagram or Insta.',
          'No merged cells and no decoration inside the data.',
          'Never leave a hidden duplicate. Remove repeated rows.',
          'Keep a data dictionary that explains every column.']) },
      { t: 'html', html: '<h4>Data dictionary example</h4>' + LMS.tbl(['Column', 'Meaning', 'Type', 'Allowed values'], [
        ['post_id', 'Unique number of the post', 'Number', '1, 2, 3 ...'],
        ['date', 'Publishing date', 'Date', 'YYYY-MM-DD'],
        ['platform', 'Where it was posted', 'Text', 'Instagram, YouTube'],
        ['format', 'Type of post', 'Text', 'Reel, Carousel, Static, Short, Video'],
        ['topic', 'Subject of the post', 'Text', 'Campus life, Exam tips, Events, Interview'],
        ['reach', 'Unique people who saw it', 'Number', 'Whole numbers'],
        ['likes, comments, shares', 'Counts of each action', 'Number', 'Whole numbers']]) }
    ] },
    { title: 'Dataset doctor', blocks: [
      { t: 'datasetDoctor', title: 'Test a dataset', help: 'The box holds a messy sample. Click Check dataset, fix the problems in the box, and check again. Or paste your own CSV.',
        messy: 'post_id,date,platform,format,topic,reach,likes,comments,shares\n1,2026-11-03,Instagram,Reel,Campus life,4200,310,22,41\n2,5 Nov,instagram,Carousel,Exam tips,3.1K,280,35,66\n3,2026-11-07,YouTube,Short,Campus life,5800,420,,30\n4,2026-11-10,Instagram,reels,Events,1900,120,8,5\n4,2026-11-10,Instagram,reels,Events,1900,120,8,5',
        clean: 'post_id,date,platform,format,topic,reach,likes,comments,shares\n1,2026-11-03,Instagram,Reel,Campus life,4200,310,22,41\n2,2026-11-05,Instagram,Carousel,Exam tips,3100,280,35,66\n3,2026-11-07,YouTube,Short,Campus life,5800,420,0,30\n4,2026-11-10,Instagram,Reel,Events,1900,120,8,5' }
    ] },
    { title: 'Practice datasets', blocks: [
      { t: 'html', html: '<p>These three datasets are used in Lessons 5 and 6. Copy them into a sheet. Dataset A is a college page. Dataset B is a retail campaign. Dataset C is an OTT series.</p>' },
      { t: 'datasets', title: 'Datasets A, B and C', sets: [
        { name: 'Dataset A: social posts', note: '10 posts from a fictional college page.', csv:
          'post_id,date,platform,format,topic,reach,likes,comments,shares\n1,2026-11-03,Instagram,Reel,Campus life,4200,310,22,41\n2,2026-11-05,Instagram,Carousel,Exam tips,3100,280,35,66\n3,2026-11-07,YouTube,Short,Campus life,5800,420,18,30\n4,2026-11-10,Instagram,Static,Events,1900,120,8,5\n5,2026-11-12,YouTube,Video,Interview,2600,190,40,22\n6,2026-11-14,Instagram,Reel,Exam tips,6100,510,47,88\n7,2026-11-17,YouTube,Short,Exam tips,7200,560,31,74\n8,2026-11-19,Instagram,Carousel,Events,2400,150,12,18\n9,2026-11-21,YouTube,Video,Campus life,3300,210,26,15\n10,2026-11-24,Instagram,Reel,Interview,3900,260,29,37' },
        { name: 'Dataset B: ad campaigns', note: '6 fictional retail ad campaigns.', csv:
          'campaign_id,channel,spend,impressions,clicks,purchases,revenue\nC01,Instagram,20000,400000,6000,120,96000\nC02,YouTube,30000,500000,5000,150,150000\nC03,Google Search,25000,150000,7500,300,240000\nC04,Instagram,15000,300000,3000,45,31500\nC05,YouTube,10000,200000,1600,32,28800\nC06,Google Search,18000,120000,4800,144,129600' },
        { name: 'Dataset C: OTT episodes', note: '5 fictional episodes of a web series.', csv:
          'episode,viewers_start,viewers_end,minutes_watched_avg,rating\nE1,10000,8200,38,4.4\nE2,8200,6900,35,4.2\nE3,6900,5100,31,3.9\nE4,5100,4600,36,4.3\nE5,4600,3500,29,3.7' }
      ] }
    ] },
    { title: 'Common mistakes', blocks: [
      { t: 'html', html: LMS.tbl(['Mistake', 'Why it hurts', 'Fix'], [
        ['Numbers saved as text (4.2K)', 'Formulas cannot add them', 'Convert to 4200'],
        ['Mixed date formats', 'Sorting and filtering break', 'One format, YYYY-MM-DD'],
        ['instagram vs Instagram vs Insta', 'Counts split into three groups', 'Pick one spelling'],
        ['Blank cells with no meaning', 'Unclear if zero or missing', 'Use 0 or a stated note'],
        ['Duplicate rows', 'Inflates totals', 'Remove repeats'],
        ['Merged cells', 'Filters and sorting fail', 'Unmerge, repeat the value']]) }
    ] },
    { title: 'Check yourself', blocks: [
      { t: 'quiz', id: 'm1p4-quiz', title: 'Lesson 4 quiz', questions: [
        { q: 'What should you do before collecting data?', options: ['Open every platform', 'Write the goal, variables and period', 'Start a dashboard', 'Hide the source'], answer: 1, why: 'A plan keeps collection focused.' },
        { q: 'Which cell value breaks the rules for a numeric column?', options: ['4200', '3100', '4.2K', '1900'], answer: 2, why: '4.2K is text. Write 4200.' },
        { q: 'Which date format do we use?', options: ['5 Nov', '05/11', 'YYYY-MM-DD', 'Nov-5'], answer: 2, why: 'A single machine-friendly format keeps sorting correct.' },
        { q: 'Why remove names from a classroom dataset?', options: ['To save space', 'To protect personal data', 'Because formulas need it', 'It is optional'], answer: 1, why: 'Personal data needs consent and care under the DPDP Act, 2023.' },
        { q: 'Instagram and instagram in the same column cause...', options: ['No problem', 'Two separate groups in counts', 'Faster sorting', 'Colour changes'], answer: 1, why: 'Filters and counts treat them as different values.' }
      ] }
    ] }
  ]
});
