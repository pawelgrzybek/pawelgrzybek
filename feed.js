const fetch = require("node-fetch");
const parser = require("xml2json");
const fs = require("fs");

const FEED_URL = "https://pawelgrzybek.com/feed.xml";

const fetchArticles = async () => {
  const articles = await fetch(FEED_URL);
  const articlesText = await articles.text();
  const articlesJSON = parser.toJson(articlesText);
  const newC = JSON.parse(articlesJSON).rss.channel.item.slice(0, 5);

  console.log(newC.map(({ title, link }) => `[${title}](${link})`).join("\n"));

  // fs.writeFileSync("./test.json", articlesJSON);

  // console.log(JSON.stringify(articlesJSON.rss, null, 4));
  // return parser.toJson(JSON.stringify(JSON.parse(articlesText), null, 4));
};

fetchArticles();
