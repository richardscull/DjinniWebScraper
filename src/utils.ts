// funny prompt 💀
export const prompt = `I will send you a job proposal. I need you to summarize it in JSON format. 
It should include the "requirements" field with array of IT stack, so it should only have hard skills like frameworks, programming language or module. It should have values only from this list: " .NET Framework,  Agile Methodologies, Amazon Web Services (AWS), Android, AngularJS, ArcGIS, AWS, AWS Lambda, Bash, C, C#, C++, CSS, Django, Dreamweaver, Eclipse, Git, Google Analytics, Google Cloud Platform (GCP), Hadoop, HTML, Java, JavaScript, JQuery, JSON, Kotlin, Machine Learning, MATLAB, Maven,  Microsoft Azure, Microsoft T-SQL, MongoDB, MySQL, Node.js, NoSQL, Objective-C, Object-Oriented Programming, PHP, Python, R Programming, React.JS, REST API, Rhino 3D, Ruby-on-Rails, Scala, Search Engine Optimization (SEO), Spring Framework, Swift, Unity, Visual Basic for Applications (VBA), Windows Server, WordPress, XML"

Here's the example result you should give:
{
  "requirements": ["Node.js", "npm", "Express", "Telegram Bot API", "Git"] ,
}

Don't use anything except of that, because all data will be used for data science, so any undefined words will be bad!

Here's the prompt:`;

export const workPlaces = [
  "Office Work",
  "Full Remote",
  "Hybrid Remote",
  "Office or Remote",
];

export const englishLevels = [
  "Pre-Intermediate",
  "Intermediate",
  "Upper-Intermediate",
];
