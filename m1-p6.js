LMS.lesson('m1', {
  id: 'p6', minutes: 90,
  title: 'Practical activities',
  intro: 'Two hands-on activities that become your log book entries and the foundation of your mini project. Work through them in a real spreadsheet.',
  sections: [
    { title: 'Activity 1: collect data from two platforms', blocks: [
      { t: 'html', html: '<p><b>Goal:</b> build a dataset of 30 records from two platforms (for example Instagram and YouTube) for an account you are allowed to use, such as a college club page, your own page or a brand page you manage.</p>' +
        LMS.ol(['Write your collection plan using the plan builder in Lesson 4.',
          'Open the insights of each platform and choose a fixed date range.',
          'Record 15 posts from each platform with the columns in the data dictionary: post_id, date, platform, format, topic, reach, likes, comments, shares.',
          'Follow the ten dataset rules. Test your CSV in the dataset doctor.',
          'Note the date of collection and the source of every number.']) },
      { t: 'checklist', id: 'm1p6-a1', title: 'Activity 1 checklist', items: [
        'I wrote the goal, variables, period and sample size', 'I have 30 records, 15 per platform', 'Row 1 has unique column names',
        'Numbers are plain numbers, not 4.2K', 'Dates use YYYY-MM-DD', 'Platform and format spellings are consistent',
        'There are no duplicate rows', 'My dataset passed the dataset doctor', 'I wrote down my source and collection date'] }
    ] },
    { title: 'Activity 2: build your analysis workbook', blocks: [
      { t: 'html', html: '<p><b>Goal:</b> turn your raw data into a tidy workbook with first answers. Create five sheets:</p>' +
        LMS.tbl(['Sheet name', 'What goes in it'], [
          ['<b>Raw_Data</b>', 'Your collected data, untouched. Never edit this sheet.'],
          ['<b>Working</b>', 'A copy where you add engagements and engagement rate'],
          ['<b>Summary</b>', 'Totals, averages, max, min and counts by platform and format'],
          ['<b>Data_Dictionary</b>', 'Every column explained'],
          ['<b>Notes</b>', 'Source, collection date, problems you fixed, assumptions']]) +
        '<p>On Summary, answer at least three questions in one sentence each. Example: "Reels on Instagram earned the highest average reach (4,733)." Every sentence needs a number.</p>' },
      { t: 'checklist', id: 'm1p6-a2', title: 'Activity 2 checklist', items: [
        'The workbook has the five sheets', 'Working has engagements and engagement rate for every row', 'Summary shows SUM, AVERAGE, MAX, MIN and COUNT',
        'Summary compares the two platforms', 'I used at least one absolute reference', 'The Summary has three written findings, each with a number',
        'Notes lists problems I fixed and my engagement rate definition', 'The file name is clear, such as Surname_Module1_Workbook'] }
    ] },
    { title: 'Your log book', blocks: [
      { t: 'notepad', id: 'm1p6-log', title: 'Log book entry', help: 'Saved in this browser. Copy it into your log book when done.', placeholder: 'Date, what I did, what I found, what went wrong, what I would do differently',
        text: 'Date:\nActivity:\nWhat I did:\nWhat I found (with numbers):\nProblems and fixes:\nWhat I learned:\nNext step:' },
      { t: 'html', html: '<h4>Self-assessment</h4>' + LMS.tbl(['I can...', 'Yes / Not yet'], [
        ['Explain analytics in my own words', ''], ['Name five industries that use media data', ''], ['Tell reach from impressions', ''],
        ['Calculate CTR, CPC, CPM, conversion and ROAS', ''], ['Build a clean dataset', ''], ['Use SUM, AVERAGE, MAX, MIN and COUNT', ''],
        ['Fix a formula error', ''], ['Write one finding with a number', '']]) + '<p class="muted">Answer these on paper or in your log book. If you wrote "Not yet" for any, reread that lesson and retry its quiz.</p>' }
    ] }
  ]
});
