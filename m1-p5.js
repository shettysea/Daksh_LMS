(function () {
  // Results tables for Datasets B and C are computed from the data so they can never drift.
  var B = [['C01', 'Instagram', 20000, 400000, 6000, 120, 96000], ['C02', 'YouTube', 30000, 500000, 5000, 150, 150000], ['C03', 'Google Search', 25000, 150000, 7500, 300, 240000],
    ['C04', 'Instagram', 15000, 300000, 3000, 45, 31500], ['C05', 'YouTube', 10000, 200000, 1600, 32, 28800], ['C06', 'Google Search', 18000, 120000, 4800, 144, 129600]];
  var C = [['E1', 10000, 8200], ['E2', 8200, 6900], ['E3', 6900, 5100], ['E4', 5100, 4600], ['E5', 4600, 3500]];
  function r2(x) { return (Math.round(x * 100) / 100).toString(); }
  var bRows = B.map(function (r) { return [r[0], r[1], r2(r[4] / r[3] * 100) + '%', '₹' + r2(r[2] / r[4]), r2(r[5] / r[4] * 100) + '%', '₹' + r2(r[2] / r[5]), r2(r[6] / r[2])]; });
  var cRows = C.map(function (r) { return [r[0], r2(r[2] / r[1] * 100) + '%']; });

  LMS.lesson('m1', {
    id: 'p5', minutes: 60,
    title: 'Excel and Google Sheets from zero',
    intro: 'Learn the spreadsheet vocabulary, the five core functions, and the one rule about absolute references. Then practise in a live sheet right here before you open Excel.',
    sections: [
      { title: 'Excel and Sheets, side by side', blocks: [
        { t: 'html', html: '<p>Excel runs on your computer (Microsoft). Google Sheets runs in a browser and is shared by link. Formulas are almost identical, so you can learn one and use both.</p>' +
          LMS.tbl(['', 'Excel', 'Google Sheets'], [
            ['Where it runs', 'Installed app or Microsoft 365 online', 'Browser, free with a Google account'],
            ['Sharing', 'Send file or share through OneDrive', 'Share a link, edit together live'],
            ['Best at', 'Large files, advanced tools', 'Teamwork and quick sharing'],
            ['Formulas', 'Same names for everything in this module', 'Same names for everything in this module']]) },
        { t: 'html', html: '<h4>Vocabulary</h4>' + LMS.tbl(['Term', 'Meaning'], [
          ['<b>Workbook</b>', 'The whole file'], ['<b>Sheet</b> (tab)', 'One page inside the workbook'], ['<b>Cell</b>', 'One box, named by column letter and row number, such as F2'],
          ['<b>Range</b>', 'A block of cells, such as F2:F11'], ['<b>Formula</b>', 'A calculation that starts with = and updates when data changes'],
          ['<b>Function</b>', 'A built-in formula such as SUM'], ['<b>Header row</b>', 'Row 1 with column names']]) }
      ] },
      { title: 'Getting data in and tidy', blocks: [
        { t: 'stepper', title: 'Import a CSV in six moves', steps: [
          { title: 'Copy', html: '<p>In Lesson 4, press <b>Copy as CSV</b> under a dataset.</p>' },
          { title: 'Paste', html: '<p>Click cell A1 of a new sheet and paste. Everything lands in column A.</p>' },
          { title: 'Split', html: '<p>Excel: Data, then <b>Text to Columns</b>, choose Delimited, tick Comma. Sheets: Data, then <b>Split text to columns</b>.</p>' },
          { title: 'Freeze', html: '<p>View, then <b>Freeze Top Row</b>, so the headers stay visible while you scroll.</p>' },
          { title: 'Filter', html: '<p>Select the header row and turn on <b>Filter</b>. Now you can show only Instagram or only Reels.</p>' },
          { title: 'Format', html: '<p>Set dates to one format, numbers with thousands separators, and rates as percentages. Bold the header row.</p>' }] }
      ] },
      { title: 'Five core functions', blocks: [
        { t: 'html', html: '<p>Results below are for the Reach column of Dataset A (F2:F11).</p>' + LMS.tbl(['Function', 'What it does', 'Example', 'Result'], [
          ['<b>SUM</b>', 'Adds', '`=SUM(F2:F11)`', '40,500'],
          ['<b>AVERAGE</b>', 'Mean', '`=AVERAGE(F2:F11)`', '4,050'],
          ['<b>MAX</b>', 'Largest', '`=MAX(F2:F11)`', '7,200'],
          ['<b>MIN</b>', 'Smallest', '`=MIN(F2:F11)`', '1,900'],
          ['<b>COUNT</b>', 'Counts numbers', '`=COUNT(F2:F11)`', '10']]).replace(/`([^`]+)`/g, '<code>$1</code>') },
        { t: 'html', html: '<h4>Engagement per post</h4><p>Total engagements in J2 is <code>=G2+H2+I2</code>. Engagement rate in K2 is <code>=J2/F2</code>, formatted as a percentage. Drag the fill handle down to copy it to every row.</p>' +
          LMS.tbl(['Post', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], [['Engagement rate', '8.88%', '12.29%', '8.07%', '7.00%', '9.69%', '10.57%', '9.24%', '7.50%', '7.61%', '8.36%']]) +
          '<p>The average of the ten rates is 8.92%. The overall rate (total engagements / total reach) is 9.07%. They differ because big posts weigh more in the overall rate. Say which one you report.</p>' },
        { t: 'callout', kind: 'warn', title: 'Absolute references', html: '<p>When you copy a formula down, references shift. To lock one, add dollar signs: <code>$F$12</code>. Example: <code>=F2/$F$12</code> gives each post\'s share of total reach, and the total cell stays fixed. Press F4 (Excel) to toggle the dollars.</p>' },
        { t: 'html', html: '<h4>Preview: IF, COUNTIF, SUMIF</h4>' + LMS.tbl(['Formula', 'Meaning', 'Result on Dataset A'], [
          ['<code>=IF(K2&gt;=0.09,"Strong","Normal")</code>', 'Label a post by its rate', 'Strong for posts 2, 5, 6, 7'],
          ['<code>=COUNTIF(C2:C11,"Instagram")</code>', 'Count rows that match', '6'],
          ['<code>=SUMIF(D2:D11,"Reel",F2:F11)</code>', 'Add reach for one format', '14,200']]) }
      ] },
      { title: 'More practice results', blocks: [
        { t: 'html', html: '<h4>Dataset B: campaign results</h4><p>CTR = clicks / impressions. CPC = spend / clicks. Conversion = purchases / clicks. CPA = spend / purchases. ROAS = revenue / spend.</p>' + LMS.tbl(['Campaign', 'Channel', 'CTR', 'CPC', 'Conversion', 'CPA', 'ROAS'], bRows) +
          '<p>Search ads cost more per click but convert far better, so they earn the highest ROAS.</p>' },
        { t: 'html', html: '<h4>Dataset C: viewers kept</h4><p>Retention = viewers at end / viewers at start.</p>' + LMS.tbl(['Episode', 'Retention'], cRows) },
        { t: 'html', html: '<h4>Shortcuts</h4>' + LMS.tbl(['Action', 'Windows', 'Mac'], [
          ['Select whole table', 'Ctrl + A', 'Cmd + A'], ['Copy and paste', 'Ctrl + C, Ctrl + V', 'Cmd + C, Cmd + V'], ['Undo', 'Ctrl + Z', 'Cmd + Z'],
          ['Edit a cell', 'F2', 'Control + U'], ['Toggle absolute reference', 'F4', 'Cmd + T']]) },
        { t: 'html', html: '<h4>Common errors</h4>' + LMS.tbl(['Error', 'Cause', 'Fix'], [
          ['#DIV/0!', 'Dividing by zero or an empty cell', 'Check the denominator'],
          ['#NAME?', 'Misspelt function name', 'Fix the spelling'],
          ['#VALUE!', 'Text where a number is needed', 'Clean the cell'],
          ['#REF!', 'A referenced cell was deleted', 'Rebuild the reference']]) }
      ] },
      { title: 'Practice lab', blocks: [
        { t: 'sheetLab', title: 'Spreadsheet lab' }
      ] },
      { title: 'Check yourself', blocks: [
        { t: 'quiz', id: 'm1p5-quiz', title: 'Lesson 5 quiz', questions: [
          { q: 'Which formula gives the average of F2:F11?', options: ['=SUM(F2:F11)', '=AVERAGE(F2:F11)', '=MAX(F2:F11)', '=COUNT(F2:F11)'], answer: 1, why: 'AVERAGE returns the mean.' },
          { type: 'num', q: 'SUM of reach in Dataset A (F2:F11)?', answer: 40500, unit: '', why: 'The ten reach values add to 40,500.' },
          { q: 'Why use $F$12 in a formula?', options: ['It colours the cell', 'It locks the reference when the formula is copied', 'It adds F and 12', 'It hides the column'], answer: 1, why: 'Dollar signs make the reference absolute.' },
          { q: 'What does #DIV/0! mean?', options: ['A misspelt function', 'Division by zero', 'A deleted cell', 'Text in a number'], answer: 1, why: 'The denominator was zero or empty.' },
          { type: 'num', q: 'SUMIF reach for Reels in Dataset A?', answer: 14200, unit: '', why: '4,200 + 6,100 + 3,900 = 14,200.' },
          { q: 'Why can the average of rates differ from the overall rate?', options: ['Excel is wrong', 'Posts with larger reach weigh more in the overall rate', 'Rates cannot be averaged', 'Rounding only'], answer: 1, why: 'The overall rate is weighted by reach.' }
        ] }
      ] }
    ]
  });
})();
