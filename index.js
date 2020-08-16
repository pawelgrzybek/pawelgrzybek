const fs = require("fs");
const { spawn } = require("child_process");
const fetch = require("node-fetch");
const parser = require("xml2json");

const FEED_URL = "https://pawelgrzybek.com/feed.xml";
const TITLE = "Hi y'all 👋";
const DESCRIPTION =
  "I am a self-taught front-end developer looking for an opportunity to work with the latest web technologies. Coming from a background in photography, I have progressed through UI/UX design into front-end development with a growing interest in other bleeding edge technologies. Over time I have become strongly involved in the open-source community where I regularly contribute and create projects, frequently attend conferences and follow other liked-minded geeks. This enables me to always stay fresh in finding the best solutions for technical problems. When I’m not learning or working on another blog post, I indulge my passion for jazz and funk music that helps me to maintain a balance between my virtual and real life.";
const TITLE_MOST_RECENT_POSTS = "Recent blog posts";

const pad = (v) => v.toString().padStart(2, "0");

const getDateFormatted = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  return `${year}.${pad(month)}.${pad(day)}`;
};

const fetchArticles = async () => {
  const articles = await fetch(FEED_URL);
  const articlesText = await articles.text();
  const articlesJSON = parser.toJson(articlesText);
  const newC = JSON.parse(articlesJSON).rss.channel.item.slice(0, 5);

  return newC.map(({ title, link }) => `- [${title}](${link})`).join("\n");
};

async function main() {
  const posts = await fetchArticles();

  const readme = `
# ${TITLE}

![Fetch recent blog posts](https://github.com/pawelgrzybek/pawelgrzybek/workflows/Fetch%20recent%20blog%20posts/badge.svg)

${DESCRIPTION}

## ${TITLE_MOST_RECENT_POSTS}

<!-- FEED-START -->
<!-- FEED-END -->

${posts}

Visit [https://pawelgrzybek.com](https://pawelgrzybek.com) to read more.

Last update: ${getDateFormatted()}

`;

  fs.writeFileSync("./README.md", readme);

  // commitFile();
}

try {
  main();
} catch (error) {
  console.error(errors);
}
