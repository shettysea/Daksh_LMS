LMS.lesson('m1', {
  id: 'p3', minutes: 45,
  title: 'Media data in depth',
  intro: 'Sort media data into types, learn where it comes from, and master the metrics every media job uses. You will also see why one metric name can hide three different formulas.',
  sections: [
    { title: 'Three families of media data', blocks: [
      { t: 'html', html: '<p>Media data falls into three families. <b>Audience data</b> says who the people are. <b>Engagement data</b> says what they did. <b>Content data</b> says what you published. Every useful analysis connects at least two of them.</p>' +
        LMS.tbl(['Family', 'Examples', 'Question it answers'], [
          ['<b>Audience</b>', 'Age, city, gender split, device, follower count, language', 'Who are we reaching?'],
          ['<b>Engagement</b>', 'Likes, comments, shares, saves, clicks, watch time, replies', 'What did they do?'],
          ['<b>Content</b>', 'Format, topic, length, posting time, headline, platform', 'What did we publish?']]) },
      { t: 'classify', id: 'm1p3-family', title: 'Sort the data point', prompt: 'Which family does each data point belong to?', categories: ['Audience', 'Engagement', 'Content'], items: [
        { text: '62% of followers live in Mumbai and Pune', answer: 'Audience', why: 'It describes who the people are.' },
        { text: 'A reel received 340 saves', answer: 'Engagement', why: 'Saves are an action by viewers.' },
        { text: 'The post was a 45-second video about monsoon fashion', answer: 'Content', why: 'Format, length and topic describe what was published.' },
        { text: 'Most viewers use Android phones', answer: 'Audience', why: 'Device describes the audience.' },
        { text: 'A newsletter had a 38% open rate', answer: 'Engagement', why: 'Opening is an action.' },
        { text: 'The post went live at 8 pm on a Friday', answer: 'Content', why: 'Posting time is a choice about content.' }
      ] },
      { t: 'html', html: '<h4>Quantitative and qualitative</h4><p><b>Quantitative</b> data is numbers you can add and average (reach, clicks, rupees). <b>Qualitative</b> data is words, images and opinions (comments, interview answers, open survey replies). Good analysis uses both: numbers show how much, words show why.</p>' },
      { t: 'classify', id: 'm1p3-quant', title: 'Quantitative or qualitative?', prompt: 'Classify each item.', categories: ['Quantitative', 'Qualitative'], items: [
        { text: 'Number of shares on a post', answer: 'Quantitative', why: 'A count.' },
        { text: 'A viewer comment: "The ending felt rushed"', answer: 'Qualitative', why: 'An opinion in words.' },
        { text: 'Average watch time of 2 min 40 s', answer: 'Quantitative', why: 'A measured number.' },
        { text: 'Answers to "What would you change about this app?"', answer: 'Qualitative', why: 'Open text.' },
        { text: 'Survey rating from 1 to 5', answer: 'Quantitative', why: 'Numbers you can average.' }
      ] },
      { t: 'html', html: '<h4>Watch the pairs</h4>' + LMS.tbl(['Looks similar', 'Difference'], [
        ['Reach vs impressions', 'Reach counts unique people. Impressions count every time the content was shown, so one person can add several.'],
        ['Follower vs viewer', 'A follower chose to subscribe. A viewer saw the content, often without following.'],
        ['Likes vs saves', 'A like is cheap and quick. A save signals the content is worth returning to.'],
        ['Click vs conversion', 'A click is a visit. A conversion is the desired action: a purchase, sign-up or download.'],
        ['Primary vs secondary data', 'Primary is collected by you for this purpose. Secondary was collected by someone else.']]) }
    ] },
    { title: 'Where the data comes from', blocks: [
      { t: 'html', html: LMS.tbl(['Source', 'What you get', 'Watch out for'], [
        ['<b>Platform insights</b> (Instagram, YouTube, LinkedIn)', 'Reach, views, audience, retention for your own account', 'Definitions vary by platform. Data is only for accounts you manage.'],
        ['<b>Website analytics</b>', 'Visits, time on page, sources, device', 'Needs tracking set up. Counts can miss people who block trackers.'],
        ['<b>Ad platforms</b>', 'Spend, impressions, clicks, conversions', 'Platforms report their own results, so cross-check with sales.'],
        ['<b>Surveys and forms</b>', 'Opinions, intent, demographics', 'Leading questions, small samples, self-selection.'],
        ['<b>Media monitoring</b>', 'Mentions, sentiment, share of voice', 'Sentiment tools misread sarcasm and local languages.'],
        ['<b>Public datasets</b>', 'Census, government, ratings bodies', 'Check the date, method and licence.'],
        ['<b>Manual collection</b>', 'Whatever you record by hand', 'Typos and inconsistency, so use fixed rules.']]) },
      { t: 'callout', kind: 'tip', title: 'Survey wording changes the answer', html: '<p>"How much did you love our excellent app?" pushes people to say yes. "How would you rate our app from 1 to 5?" is neutral. Always ask one thing per question and give balanced options.</p>' }
    ] },
    { title: 'The metrics glossary', blocks: [
      { t: 'html', html: '<p>Learn these as a family. Each metric is one idea; formulas are simple division. Filter by typing a name or category.</p>' },
      { t: 'filterTable', title: 'Metrics glossary', placeholder: 'Filter metrics', headers: ['Metric', 'Meaning', 'Formula', 'Example'], rows: [
        ['<b>Impressions</b>', 'Times content was displayed', 'Counted by the platform', '1,00,000 displays'],
        ['<b>Reach</b>', 'Unique people who saw it', 'Counted by the platform', '40,000 people'],
        ['<b>Frequency</b>', 'Average times each person saw it', 'Impressions / Reach', '1,00,000 / 40,000 = 2.5'],
        ['<b>CTR</b> (click-through rate)', 'Share of impressions that led to a click', 'Clicks / Impressions x 100', '2,000 / 1,00,000 = 2%'],
        ['<b>CPC</b> (cost per click)', 'Money spent per click', 'Spend / Clicks', '₹10,000 / 2,000 = ₹5'],
        ['<b>CPM</b> (cost per thousand impressions)', 'Cost to show the ad 1,000 times', 'Spend / Impressions x 1,000', '₹10,000 / 1,00,000 x 1,000 = ₹100'],
        ['<b>Conversion rate</b>', 'Share of clicks that became the goal action', 'Conversions / Clicks x 100', '50 / 2,000 = 2.5%'],
        ['<b>CPA</b> (cost per acquisition)', 'Money spent per conversion', 'Spend / Conversions', '₹10,000 / 50 = ₹200'],
        ['<b>ROAS</b> (return on ad spend)', 'Revenue earned per rupee of ad spend', 'Revenue / Spend', '₹50,000 / ₹10,000 = 5'],
        ['<b>Engagement rate</b>', 'Share of the audience that interacted', 'Engagements / Audience base x 100', 'See the next section'],
        ['<b>Retention</b>', 'Share of viewers who stayed to a point', 'Viewers at point / Starting viewers x 100', '300 / 1,000 = 30%'],
        ['<b>Growth rate</b>', 'Change compared with before', '(New - Old) / Old x 100', '(10,600 - 10,000) / 10,000 = 6%'],
        ['<b>Sentiment</b>', 'Positive, neutral or negative tone', 'Share of mentions in each tone', '70% negative']] },
      { t: 'calc', title: 'Campaign calculator', help: 'Start with a retail campaign. Change any input and watch every metric move.', fields: [
        { id: 'spend', label: 'Spend (₹)', value: 50000 }, { id: 'imp', label: 'Impressions', value: 500000 }, { id: 'reach', label: 'Reach', value: 200000 },
        { id: 'clicks', label: 'Clicks', value: 10000 }, { id: 'buys', label: 'Purchases', value: 250 }, { id: 'rev', label: 'Revenue (₹)', value: 250000 }],
        outputs: [
          { label: 'Frequency', fn: function (v) { return v.imp / v.reach; } },
          { label: 'CTR', fmt: 'pct', fn: function (v) { return v.clicks / v.imp; } },
          { label: 'CPC', fmt: 'inr', fn: function (v) { return v.spend / v.clicks; } },
          { label: 'CPM', fmt: 'inr', fn: function (v) { return v.spend / v.imp * 1000; } },
          { label: 'Conversion rate', fmt: 'pct', fn: function (v) { return v.buys / v.clicks; } },
          { label: 'CPA', fmt: 'inr', fn: function (v) { return v.spend / v.buys; } },
          { label: 'ROAS', fn: function (v) { return v.rev / v.spend; } }],
        takeaway: 'Frequency 2.5, CTR 2%, CPC ₹5, CPM ₹100, conversion 2.5%, CPA ₹200, ROAS 5. Every rupee spent returned five.' }
    ] },
    { title: 'One name, three formulas', blocks: [
      { t: 'html', html: '<p>"Engagement rate" has no single definition. Each platform and agency chooses a denominator. Compare how the same post looks under three versions. Always state which one you used.</p>' },
      { t: 'calc', title: 'Engagement rate versions', fields: [
        { id: 'er', label: 'Engagements (likes + comments + shares + saves)', value: 640 }, { id: 'rch', label: 'Reach', value: 8000 }, { id: 'imp2', label: 'Impressions', value: 10000 }, { id: 'fol', label: 'Followers', value: 20000 }],
        outputs: [
          { label: 'By reach', fmt: 'pct', fn: function (v) { return v.er / v.rch; } },
          { label: 'By impressions', fmt: 'pct', fn: function (v) { return v.er / v.imp2; } },
          { label: 'By followers', fmt: 'pct', fn: function (v) { return v.er / v.fol; } }],
        takeaway: '8%, 6.4% and 3.2% from the same post. Pick one definition and keep it constant when comparing posts.' }
    ] },
    { title: 'Check yourself', blocks: [
      { t: 'reveal', title: 'Try it and cue questions', items: [
        { q: 'Try it: a post had 5,000 impressions and 2,000 reach. Find the frequency.', a: '<p>5,000 / 2,000 = 2.5.</p>' },
        { q: 'Try it: an ad cost ₹4,000 and got 80 clicks. Find CPC.', a: '<p>4,000 / 80 = ₹50.</p>' },
        { q: 'Why can impressions be larger than reach?', a: '<p>One person can see the content more than once, and each view adds an impression but not a new reached person.</p>' },
        { q: 'Why is a high CTR not always good?', a: '<p>Clicks may not become purchases. Check conversion rate and CPA before celebrating.</p>' },
        { q: 'Why must you name the engagement rate formula you use?', a: '<p>The same post can score 3.2%, 6.4% or 8% depending on the denominator, so unlabeled numbers cannot be compared.</p>' }
      ] },
      { t: 'quiz', id: 'm1p3-quiz', title: 'Lesson 3 quiz', questions: [
        { q: 'Reach counts...', options: ['Every display of the content', 'Unique people who saw the content', 'Only followers', 'Only clicks'], answer: 1, why: 'Reach is unique people. Impressions count every display.' },
        { type: 'num', q: 'An ad had 3,00,000 impressions and 1,25,000 reach. What is the frequency?', answer: 2.4, unit: '', tol: 0.01, why: '3,00,000 / 1,25,000 = 2.4.' },
        { type: 'num', q: 'Spend ₹20,000 and 400 clicks. CPC in rupees?', answer: 50, unit: '₹', why: '20,000 / 400 = ₹50.' },
        { type: 'num', q: 'Spend ₹5,000 and 1,00,000 impressions. CPM in rupees?', answer: 50, unit: '₹', why: '5,000 / 1,00,000 x 1,000 = ₹50.' },
        { type: 'num', q: '500 clicks produced 25 purchases. Conversion rate in %?', answer: 5, unit: '%', why: '25 / 500 = 5%.' },
        { type: 'num', q: 'Revenue ₹1,20,000 on spend ₹20,000. ROAS?', answer: 6, unit: '', why: '1,20,000 / 20,000 = 6.' },
        { q: 'Which is qualitative data?', options: ['Number of likes', 'Open-text survey comments', 'Watch time', 'CTR'], answer: 1, why: 'Words and opinions are qualitative.' }
      ] }
    ] }
  ]
});
