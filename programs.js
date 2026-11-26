/* Programs shown on the landing page, grouped by the `group` field.
   To add a program: register it here, then add its modules with LMS.module({program:'its-id', ...}).
   Keep soon:true until its first module is ready. */
LMS.program({
  id: 'dam', group: 'Media and communication', title: 'Data Analytics in Media',
  blurb: 'Learn to collect, clean, analyse and present media data using Excel and Google Sheets. Five modules from first principles to a guided project.',
  level: 'Beginner friendly'
});
LMS.program({ id: 'peg', soon: true, group: 'Foundation programmes', title: 'Prompt Engineering and Generative AI',
  blurb: 'Use AI tools for study, content creation and career building. Finish with an AI-built resume, a LinkedIn profile and a no-code chatbot.' });
LMS.program({ id: 'sql', soon: true, group: 'Foundation programmes', title: 'SQL for Data Analytics',
  blurb: 'Query and analyse business data. Finish with a sales report built from your own queries.' });
LMS.program({ id: 'pml', soon: true, group: 'Advanced programmes', title: 'Python and Machine Learning',
  blurb: 'Python programming and prediction models. Finish with a trained model that predicts an outcome from real data.' });
LMS.program({ id: 'dl', soon: true, group: 'Advanced programmes', title: 'Deep Learning',
  blurb: 'Neural networks for images and text. Finish with an image or text classifier.' });
LMS.program({ id: 'nlp', soon: true, group: 'Advanced programmes', title: 'NLP with Python',
  blurb: 'Work with text data. Finish with a sentiment analysis tool for customer reviews.' });
LMS.program({ id: 'llm', soon: true, group: 'Advanced programmes', title: 'LLM Building',
  blurb: 'Build and adapt language models. Finish with a fine-tuned small language model and a working demo.' });
LMS.program({ id: 'rag', soon: true, group: 'Advanced programmes', title: 'RAG Models',
  blurb: 'Make AI answer from your own documents. Finish with a chat-with-your-documents application.' });
LMS.program({ id: 'vdb', soon: true, group: 'Advanced programmes', title: 'Vector Databases',
  blurb: 'Store and search by meaning. Finish with a semantic search engine over a document set.' });
LMS.program({ id: 'agent', soon: true, group: 'Advanced programmes', title: 'Agentic AI',
  blurb: 'AI that plans and completes multi-step tasks. Finish with a working agent that carries out a task end to end.' });
LMS.program({ id: 'git', soon: true, group: 'Advanced programmes', title: 'Open Source and GitHub',
  blurb: 'Version control and open source contribution. Finish with a public GitHub portfolio and a contributed pull request.' });
LMS.program({ id: 'bd', soon: true, group: 'Advanced programmes', title: 'Big Data with Hadoop',
  blurb: 'Handle data too large for one machine. Finish with a processed big data pipeline and a summary output.' });
