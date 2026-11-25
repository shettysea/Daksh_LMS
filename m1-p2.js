LMS.lesson('m1', {
  id: 'p2', minutes: 35,
  title: 'Analytics across industries and careers',
  intro: 'Media skills travel. See where data skills are used beyond newsrooms, which careers run on them, and how journalism, PR, advertising and digital media each use data.',
  sections: [
    { title: 'Where media data skills are used', blocks: [
      { t: 'html', html: '<p>Every organisation that talks to an audience needs people who can read audience data. That is why media graduates are hired far beyond newsrooms. Use the filter to explore: try typing <b>sales</b>, <b>trust</b> or <b>viewers</b>.</p>' },
      { t: 'filterTable', title: 'Industry explorer', placeholder: 'Filter industries', headers: ['Industry', 'Media-related roles', 'Questions their data answers', 'Common data sources'], rows: [
        ['<b>News and publishing</b>', 'Reporter, editor, digital producer, data journalist', 'Which stories do readers finish? When should we send alerts?', 'Website analytics, newsletter reports, public datasets'],
        ['<b>Advertising agencies</b>', 'Media planner, copywriter, account executive', 'Which creative performed better? Where should the budget go?', 'Ad platform dashboards, brand surveys'],
        ['<b>PR and corporate communication</b>', 'PR executive, communication manager', 'What is being said about us? Did our launch earn coverage?', 'Media monitoring tools, news clippings, social mentions'],
        ['<b>FMCG and consumer brands</b>', 'Brand executive, social media manager', 'Did the festive campaign raise awareness and sales?', 'Social insights, retail sales, surveys'],
        ['<b>E-commerce and D2C</b>', 'Content marketer, performance marketer', 'Which ad brings buyers, not just clicks?', 'Ad dashboards, website analytics, order data'],
        ['<b>OTT, film and TV</b>', 'Content marketer, producer, audience researcher', 'Which trailer drives sign-ups? Where do viewers drop off?', 'Streaming dashboards, trailer views, social buzz'],
        ['<b>Music and entertainment</b>', 'Artist manager, label marketing executive', 'Which city should the tour visit first?', 'Streaming and social analytics'],
        ['<b>Sports</b>', 'Digital manager, broadcast producer', 'Which players and moments get the most engagement?', 'Social insights, ticketing, viewership data'],
        ['<b>Education (colleges, ed-tech)</b>', 'Admissions marketer, content creator', 'Which channel brings applications?', 'Social insights, web analytics, enquiry forms'],
        ['<b>Banking, fintech and insurance</b>', 'Content writer, social media executive', 'Which explainer videos build trust and lead to sign-ups?', 'Social insights, landing page data, surveys'],
        ['<b>Healthcare and pharma</b>', 'Communication executive', 'Did our awareness drive reach the right age group?', 'Campaign data, surveys, social insights'],
        ['<b>NGOs, government and politics</b>', 'Communication officer, campaign manager', 'Which message gets people to attend or donate?', 'Social insights, surveys, event sign-ups'],
        ['<b>Events, travel and hospitality</b>', 'Event marketer, content creator', 'Which post filled the seats?', 'Social insights, booking data']
      ] }
    ] },
    { title: 'Careers that run on data', blocks: [
      { t: 'filterTable', title: 'Career finder', help: 'Pay attention to the right-hand column. Those few metrics are the language of the job.', placeholder: 'Filter careers or metrics', headers: ['Role', 'What they do with data', 'Metrics they live by'], rows: [
        ['<b>Social media manager</b>', 'Plans posts, reviews weekly performance, reports to the brand', 'Reach, engagement rate, follower growth'],
        ['<b>Content strategist</b>', 'Decides which topics and formats to produce', 'Watch time, saves, shares, search traffic'],
        ['<b>Digital marketing executive</b>', 'Runs and optimises paid campaigns', 'CTR, CPC, conversion rate'],
        ['<b>Brand manager</b>', 'Checks whether the brand is growing in awareness and preference', 'Brand recall, share of voice, sales'],
        ['<b>PR executive</b>', 'Tracks coverage and public mood', 'Mentions, reach of coverage, sentiment'],
        ['<b>Media planner and buyer</b>', 'Chooses where ads run and for how long', 'Reach, frequency, CPM'],
        ['<b>Data journalist</b>', 'Finds and verifies stories hidden in datasets', 'Accuracy of data, source quality'],
        ['<b>Audience researcher</b>', 'Studies who the viewers or readers are', 'Demographics, survey results, ratings'],
        ['<b>Influencer marketing manager</b>', 'Picks creators and measures their impact', 'Engagement rate, audience match, cost per result'],
        ['<b>Community manager</b>', 'Keeps the audience active and happy', 'Comments, replies, response time']
      ] }
    ] },
    { title: 'The four media fields in depth', blocks: [
      { t: 'tabs', title: 'Pick a field', tabs: [
        { label: 'Journalism', html:
          LMS.ul(['<b>Data used:</b> page views, unique visitors, average time on page, scroll depth, traffic source (search, social, direct), newsletter opens, plus public datasets (budgets, census, court records, pollution readings) used to find stories.',
            '<b>Decisions it drives:</b> which stories to follow up, which headline to use, when to send a push alert, which topics deserve a series.']) +
          '<div class="callout"><strong>Mini case (fictional city newsroom)</strong><div><p>Story X on water cuts got 40,000 views with an average read of 35 seconds. Story Y, an explainer on the same topic, got 9,000 views, an average read of 3 minutes 10 seconds, and 600 newsletter sign-ups.</p><p>X attracts clicks, Y builds loyal readers. If the goal is ad revenue, X matters. If the goal is subscriptions, Y matters. The numbers do not decide the goal. People do.</p></div></div>' },
        { label: 'Public relations', html:
          LMS.ul(['<b>Data used:</b> media mentions, reach of coverage, share of voice (your brand\'s mentions compared with competitors), sentiment (positive, neutral, negative), and event or campaign sign-ups.',
            '<b>Decisions it drives:</b> how fast to respond to a crisis, which outlets to prioritise, whether a launch earned the attention it needed.']) +
          '<div class="callout"><strong>Mini case (fictional packaged-food brand)</strong><div><p>A false rumour starts. Mentions jump from 200 a day to 3,500 a day and 70% are negative. The team traces it to one viral post at 9 pm, releases a clarification video the next morning, and mentions fall back to 400 within two days.</p><p>Without monitoring, they would have found out from the news.</p></div></div>' },
        { label: 'Advertising', html:
          LMS.ul(['<b>Data used:</b> impressions, reach, frequency, clicks, conversions, cost metrics (CPC, CPM) and brand surveys.',
            '<b>Decisions it drives:</b> which creative to scale, where to move the budget, which audience to target.']) +
          '<div class="callout"><strong>Mini case (fictional sneaker brand)</strong><div><p>Two ad creatives each got ₹10,000 and 1,00,000 impressions. Creative A earned 1,500 clicks. Creative B earned 600. Use the calculator below to compare them, then move the budget.</p></div></div>' },
        { label: 'Digital media', html:
          LMS.ul(['<b>Data used:</b> followers, views, watch time, audience retention, saves, shares, traffic sources, subscriber growth.',
            '<b>Decisions it drives:</b> video length, format (short or long, reel or carousel), posting time, collaboration partners.']) +
          '<div class="callout"><strong>Mini case (fictional YouTube channel)</strong><div><p>Videos under 8 minutes keep 62% of viewers on average. Videos over 15 minutes keep 31%.</p><p>The creator keeps the long format only for interviews and tightens the first 30 seconds of everything else.</p></div></div>' }
      ] },
      { t: 'calc', title: 'Sneaker brand: which creative wins?', help: 'Defaults are the case numbers. Change them to test your own idea.', fields: [
        { id: 'sa', label: 'Spend A (₹)', value: 10000 }, { id: 'ia', label: 'Impressions A', value: 100000 }, { id: 'ca', label: 'Clicks A', value: 1500 },
        { id: 'sb', label: 'Spend B (₹)', value: 10000 }, { id: 'ib', label: 'Impressions B', value: 100000 }, { id: 'cb', label: 'Clicks B', value: 600 }],
        outputs: [
          { label: 'CTR of A', fmt: 'pct', fn: function (v) { return v.ca / v.ia; }, note: 'clicks / impressions' },
          { label: 'CTR of B', fmt: 'pct', fn: function (v) { return v.cb / v.ib; } },
          { label: 'CPC of A', fmt: 'inr', fn: function (v) { return v.sa / v.ca; }, note: 'spend / clicks' },
          { label: 'CPC of B', fmt: 'inr', fn: function (v) { return v.sb / v.cb; } },
          { label: 'Better creative', fn: function (v) { var a = v.sa / v.ca, b = v.sb / v.cb; return a < b ? 'Creative A' : a > b ? 'Creative B' : 'Tie'; }, note: 'lower CPC wins' }],
        takeaway: 'Creative A costs about ₹6.67 per click against ₹16.67 for B. The agency moves the remaining budget to A.' },
      { t: 'callout', kind: 'warn', title: 'A warning every analyst learns early', html: '<p>Data tells you what happened. It does not always tell you why. Always ask, "What else could explain this?" before you act.</p>' }
    ] },
    { title: 'Check yourself', blocks: [
      { t: 'reveal', title: 'Try it and cue questions', items: [
        { q: 'Try it: choose an industry from the explorer that you might work in. Write three questions its data could answer.', a: '<p>Use the "Questions their data answers" column as a model. Keep each question specific, such as "Which format brings the most enquiries?".</p>' },
        { q: 'Try it: for one career, write which metrics that person checks first on a Monday, and why.', a: '<p>For a social media manager: reach, engagement rate and follower growth, because they show whether last week\'s content worked.</p>' },
        { q: 'Name four industries outside news and TV that hire media graduates, and one data question each asks.', a: '<p>Examples: FMCG (did the festive campaign raise sales?), banking (which explainer builds trust?), sports (which moments get engagement?), healthcare (did the awareness drive reach the right age group?).</p>' },
        { q: 'Why might a newsroom prefer Story Y over Story X even though X had more views?', a: '<p>Because Y held readers for over three minutes and earned 600 sign-ups. If the aim is subscriptions, depth matters more than raw clicks.</p>' },
        { q: 'What is share of voice and why does PR care?', a: '<p>Your brand\'s mentions compared with competitors\' mentions. It shows who owns the conversation in your market.</p>' },
        { q: 'In advertising, why is a lower CPC usually better?', a: '<p>Each click costs less, so the same budget brings more visitors.</p>' }
      ] },
      { t: 'quiz', id: 'm1p2-quiz', title: 'Lesson 2 quiz', questions: [
        { q: 'A PR team wants to know how fast a rumour is spreading about their brand. Which data helps most?', options: ['Follower growth rate', 'Media mentions over time and sentiment', 'Ad CPM', 'Newsletter open rate'], answer: 1, why: 'Mentions and sentiment show the size and mood of the conversation.' },
        { type: 'num', q: 'Creative A had 1,500 clicks from 1,00,000 impressions. What is its CTR?', answer: 1.5, unit: '%', why: '1,500 / 1,00,000 = 1.5%.' },
        { type: 'num', q: 'Creative B cost ₹10,000 and earned 600 clicks. What is its CPC in rupees (to the nearest paisa)?', answer: 16.67, unit: '₹', why: '10,000 / 600 = ₹16.67.' },
        { q: 'A newsroom wants more paying subscribers. Which story should it learn from?', options: ['The one with the most views', 'The one with the longest read time and the most newsletter sign-ups', 'The one posted earliest', 'The one with the shortest headline'], answer: 1, why: 'Loyalty signals matter more than raw clicks when the goal is subscriptions.' },
        { q: 'Which career mainly lives by CTR, CPC and conversion rate?', options: ['Data journalist', 'Digital marketing executive', 'Audience researcher', 'Community manager'], answer: 1, why: 'Paid campaign performance is measured with these three.' }
      ] }
    ] }
  ]
});
