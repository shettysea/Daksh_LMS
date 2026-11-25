LMS.lesson('m1', {
  id: 'p1', minutes: 35,
  title: 'Data analytics from scratch',
  intro: 'By the end you can explain what data analytics is, run its six steps on a real problem, tell the four types apart and calculate engagement rate and retention rate.',
  sections: [
    { title: 'Data, information and insight', blocks: [
      { t: 'html', html:
        '<p>These three words are used loosely, but they mean different things. Seeing the difference is the first step to thinking like an analyst.</p>' +
        LMS.tbl(['Level', 'What it is', 'Example (media)', 'Example (other industry)'], [
          ['<b>Data</b>', 'Raw facts with no meaning yet', '4,300', '27'],
          ['<b>Information</b>', 'Data with a label and context', '4,300 views on our reel posted Friday', '27 customer complaints this week'],
          ['<b>Insight</b>', 'What it means and what to do about it', 'Friday reels get double the views of Monday reels, so shift posting to Fridays', 'Complaints doubled after the new packaging, so review the packaging supplier']
        ]) + '<p>Analytics is the journey from the first row of this table to the last.</p>' }
    ] },
    { title: 'What is data analytics?', blocks: [
      { t: 'callout', title: 'Definition', html: '<p><b>Data analytics is the process of collecting, cleaning, analysing and interpreting data so that people can make better decisions.</b></p><p>The key word is decisions. A pile of numbers that changes no decision is just storage. A single number that stops a client wasting ₹1 lakh is analytics at work.</p>' },
      { t: 'html', html: '<p>Three words people confuse:</p>' + LMS.ul([
        '<b>Data analysis</b> is the step where you examine the data (calculate, compare, find patterns). It is one part of analytics.',
        '<b>Data analytics</b> is the whole journey, from the question to the decision.',
        '<b>Statistics</b> is the mathematics used inside analysis. You will use only basic statistics here: totals, averages, percentages.']) }
    ] },
    { title: 'The six-step analytics process', blocks: [
      { t: 'html', html: '<p>Every analytics project in every industry follows these six steps. The example below follows a D2C skincare brand that spent ₹2,00,000 on Instagram ads in November while sales stayed flat.</p>' },
      { t: 'stepper', title: 'Walk through the six steps', help: 'Click a step or use Next. Watch how the numbers lead to a decision.', exampleLabel: 'D2C skincare: ', steps: [
        { title: 'Ask', text: 'Define the question or problem clearly. A vague question gives a vague answer.', example: 'Why did ₹2 lakh of ads not lift sales? Was it the ad, the audience or the website?' },
        { title: 'Collect', text: 'Gather the data that can answer the question, from the right sources.', example: 'Ad dashboard: 4,00,000 impressions, 8,000 clicks, ₹2,00,000 spend. Website data: 8,000 visitors from ads, 80 purchases.' },
        { title: 'Clean', text: 'Fix errors, remove duplicates, flag gaps and standardise formats. Module 2 covers this in depth.', example: 'Remove two test campaigns that were not part of the real spend. Make every date use the same format.' },
        { title: 'Analyse', text: 'Calculate, sort, filter, compare and look for patterns.', example: '8,000 clicks from 4,00,000 impressions is a 2% click rate, which is healthy. But only 80 of 8,000 visitors bought, a 1% conversion rate. Cost per purchase is ₹2,500.' },
        { title: 'Visualise and communicate', text: 'Turn the findings into charts, dashboards and short reports people can understand. Module 3 covers this.', example: 'A simple funnel: impressions, clicks, purchases, showing the big drop at the last step.' },
        { title: 'Act and review', text: 'Make the decision, then check later whether it worked. The result becomes new data for the next round.', example: 'The ad works but the product page does not convince. Fix the page (photos, reviews, price clarity), run a two-week test and compare.' }
      ] },
      { t: 'callout', kind: 'warn', title: 'Notice', html: '<p>The data did not say "cut the ad budget". It pointed to the real problem. That is why we analyse before we decide.</p>' }
    ] },
    { title: 'The four types of analytics', blocks: [
      { t: 'html', html: LMS.tbl(['Type', 'Question it answers', 'Media example', 'Other industry example'], [
        ['<b>Descriptive</b>', 'What happened?', 'Our reels averaged 5,000 views last month', 'A cricket team won 6 of its last 10 matches'],
        ['<b>Diagnostic</b>', 'Why did it happen?', 'Views dropped because we posted at 11 pm, when our audience is asleep', 'Ticket sales fell because the match clashed with exam week'],
        ['<b>Predictive</b>', 'What is likely to happen?', 'Based on past trends, this series trailer will reach about 2 lakh views', 'A film\'s opening weekend can be estimated from pre-booking numbers'],
        ['<b>Prescriptive</b>', 'What should we do?', 'Post three reels a week at 7 pm and test one carousel', 'Add two extra evening shows and lower weekday ticket prices']
      ]) + '<p>This module and the next two focus on <b>descriptive</b> analytics and the start of <b>diagnostic</b> analytics. Predictive and prescriptive work is built on top of them, so a strong base here matters.</p>' },
      { t: 'classify', id: 'm1p1-types', title: 'Which type is it?', prompt: 'Which type of analytics is this?',
        categories: ['Descriptive', 'Diagnostic', 'Predictive', 'Prescriptive'], items: [
          { text: 'A cricket team won 6 of its last 10 matches.', answer: 0, why: 'It states what already happened.' },
          { text: 'Ticket sales fell because the match clashed with exam week.', answer: 1, why: 'It explains why something happened.' },
          { text: 'Opening weekend collections estimated from pre-bookings.', answer: 2, why: 'It looks forward and estimates what is likely.' },
          { text: 'Add two extra evening shows and lower weekday ticket prices.', answer: 3, why: 'It recommends what to do.' },
          { text: 'Our reels averaged 5,000 views last month.', answer: 0, why: 'A summary of the past is descriptive.' },
          { text: 'Views dropped because we posted at 11 pm when the audience is asleep.', answer: 1, why: 'It gives a reason, so it is diagnostic.' }
        ] }
    ] },
    { title: 'Why analytics matters', blocks: [
      { t: 'html', html: LMS.ol([
        '<b>It replaces guesswork with evidence.</b> Opinions in a meeting are loud. Numbers are clear.',
        '<b>It shows who your audience really is.</b> You may assume your viewers are 18 to 24, but the data may show most are 25 to 34.',
        '<b>It saves money.</b> Brands that test and measure stop paying for what does not work.',
        '<b>It proves value.</b> Clients, editors and bosses ask "what did we get for this?". Data is your answer.',
        '<b>It makes you employable.</b> Marketing, content, PR and journalism roles now routinely list data skills.']) }
    ] },
    { title: 'Key terms you will use all module', blocks: [
      { t: 'filterTable', title: 'Key terms', help: 'Type a word such as KPI or row to filter.', placeholder: 'Filter terms', headers: ['Term', 'Meaning', 'Example'], rows: [
        ['<b>Data</b>', 'Raw facts and numbers', '4,300 views'],
        ['<b>Dataset</b>', 'Data organised in rows and columns', 'A sheet of 30 Instagram posts, or 200 online orders'],
        ['<b>Record (row)</b>', 'One item in the dataset', 'One post, one order, one news article'],
        ['<b>Variable (column)</b>', 'One property recorded for every record', 'Post date, likes, reach, city'],
        ['<b>Metric</b>', 'A number that measures something', 'Likes, reach, watch time, sales'],
        ['<b>Dimension</b>', 'A category you use to group metrics', 'Platform, format, city, month'],
        ['<b>KPI</b>', 'The key metric tied to your goal', 'Engagement rate for an awareness campaign, conversion rate for an online store'],
        ['<b>Benchmark</b>', 'A standard to compare against', 'The industry average, or your own last month'],
        ['<b>Sample</b>', 'A part of the whole that you study', '30 posts out of 500'],
        ['<b>Insight</b>', 'What the numbers mean and what to do next', 'Carousels beat reels for our audience, so make more carousels']
      ] }
    ] },
    { title: 'Two worked calculations', blocks: [
      { t: 'html', html: '<p><b>Engagement rate (social media).</b> Divide the actions people took by the number of people who saw the post.</p><div class="formula">Engagement rate = (Likes + Comments + Shares) / Reach x 100</div><p>Post A reached 12,000 people and got 840 actions: 7%. Post B reached 4,000 and got 400: 10%. Post A has more total engagement, but Post B connected better with the people who saw it. That is an insight, not just a number.</p>' },
      { t: 'calc', title: 'Engagement rate calculator', help: 'Change the numbers. Try Post A (12,000 and 840) and Post B (4,000 and 400).', fields: [
        { id: 'reach', label: 'Reach', value: 12000 }, { id: 'likes', label: 'Likes', value: 600 }, { id: 'comments', label: 'Comments', value: 90 }, { id: 'shares', label: 'Shares', value: 150 }],
        outputs: [
          { label: 'Total engagement', fn: function (v) { return v.likes + v.comments + v.shares; } },
          { label: 'Engagement rate', fmt: 'pct', fn: function (v) { return (v.likes + v.comments + v.shares) / v.reach; } }] },
      { t: 'html', html: '<p><b>Retention rate (OTT series).</b> The same logic works in streaming: a part divided by a whole.</p><div class="formula">Retention rate = Viewers at a later episode / Viewers at episode 1 x 100</div>' },
      { t: 'calc', title: 'Retention rate calculator', help: 'Episode 1 had 10,000 viewers and episode 3 had 6,500. What share stayed?', fields: [
        { id: 'first', label: 'Viewers at episode 1', value: 10000 }, { id: 'later', label: 'Viewers at episode 3', value: 6500 }],
        outputs: [
          { label: 'Retention', fmt: 'pct', fn: function (v) { return v.later / v.first; } },
          { label: 'Viewers lost', fmt: 'pct', fn: function (v) { return 1 - v.later / v.first; } }],
        takeaway: 'Retention of 65% means 35% left before episode 3. The question for the team becomes: what happens in episodes 1 and 2 that makes a third of the audience leave?' }
    ] },
    { title: 'Check yourself', blocks: [
      { t: 'reveal', title: 'Try it and cue questions', items: [
        { q: 'Try it: a restaurant had 200 table bookings and 150 customers came. What is the show-up rate?', a: '<p>150 / 200 x 100 = <b>75%</b>. Part divided by whole, times 100.</p>' },
        { q: 'Try it: take one of your own recent posts. Find its reach and total likes, comments and shares. Calculate its engagement rate.', a: '<p>Use the calculator above. Write the result and the post in your log book.</p>' },
        { q: 'What is the difference between data, information and insight?', a: '<p>Data is raw facts. Information is data with a label and context. Insight is what it means and what to do about it.</p>' },
        { q: 'List the six steps of the analytics process.', a: '<p>Ask, Collect, Clean, Analyse, Visualise and communicate, Act and review.</p>' },
        { q: 'Which type of analytics answers "why did this happen?"', a: '<p>Diagnostic analytics.</p>' },
        { q: 'Why can a post with fewer likes still be the better performer?', a: '<p>Because rate matters, not just totals. A smaller post can connect with a bigger share of the people who saw it.</p>' },
        { q: 'What is the difference between a metric and a KPI?', a: '<p>A metric is any number that measures something. A KPI is the one key metric tied to your goal.</p>' }
      ] },
      { t: 'quiz', id: 'm1p1-quiz', title: 'Lesson 1 quiz', questions: [
        { q: 'Which statement best defines data analytics?', options: ['Collecting as many numbers as possible', 'Collecting, cleaning, analysing and interpreting data to make better decisions', 'Making charts in Excel', 'Using statistics to prove a point'], answer: 1, why: 'The goal is better decisions, and the work covers the whole journey, not just charts.' },
        { q: 'Which step comes right after Collect?', options: ['Analyse', 'Visualise', 'Clean', 'Act'], answer: 2, why: 'Raw data has errors and gaps, so you clean it before analysing.' },
        { q: 'Which type of analytics answers "why did this happen?"', options: ['Descriptive', 'Diagnostic', 'Predictive', 'Prescriptive'], answer: 1, why: 'Diagnostic analytics explains causes.' },
        { type: 'num', q: 'A post reached 12,000 people and got 840 likes, comments and shares combined. What is the engagement rate?', answer: 7, unit: '%', why: '840 / 12,000 = 0.07, which is 7%.' },
        { type: 'num', q: 'Episode 1 had 10,000 viewers and episode 3 had 6,500. What is the retention rate?', answer: 65, unit: '%', why: '6,500 / 10,000 = 0.65, which is 65%.' }
      ] }
    ] }
  ]
});
