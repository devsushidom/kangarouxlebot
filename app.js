const Discord = require('discord.js');
const client = new Discord.Client();

const config = require("./config.json");
const fs = require("fs");
let points = JSON.parse(fs.readFileSync("./points.json", "utf8"));

client.on('ready', () => {
  console.log('I am ready!');
});

let variant = "kangaroux";

client.on('message', message => {
  if (message.author.bot) return;

  let command = message.content.split(" ")[0];
  command = command.slice(config.prefix.length);

  const args = message.content;
  const va = message.content.split(" ")[1];
  const ruler = message.guild.roles.find("name", "kangarouxler");

  if (!points[message.author.id]) points[message.author.id] = {
    points: 0,
  };

  if(command === "rule") {
      message.delete();
      if(message.member.roles.has(ruler.id)) {
        message.channel.send('@everyone Variant of the day: "' + va + '". Once again, all messages are case sensitive.');
      } else {
        points[message.author.id].points++;
        if(points[message.member.id].points < 3) {
          message.guild.channels.find("name", "bangaroux").send(message.author + ', this is your first warning for a violation of Rule 1 of r/kangaroux. Your message: "' + args + '". Acceptable messages: ' + variant + '. Your total amount of bot warnings is ' + points[message.member.id].points + ". Punishments are subject to the kangarouxler.");
        } else {
          message.guild.channels.find("name", "bangaroux").send(message.author + ', this is your first warning for a violation of Rule 1 of r/kangaroux. Your message: "' + args + '". Acceptable messages: ' + variant + '. Your total amount of bot warnings is ' + points[message.member.id].points + ". Further punishments are required and are subject to kangarouxler <@195637381121048577>");
        }
      }
  }

  if (message.content !== variant) {
    if(message.guild.channels.find("name", "kangarouxm")) {
      if(message.member.roles.has(ruler.id)){
      } else {
        message.delete();
        points[message.author.id].points++;
        if(points[message.member.id].points < 3) {
          message.guild.channels.find("name", "bangaroux").send(message.author + ', this is your first warning for a violation of Rule 1 of r/kangaroux. Your message: "' + args + '". Acceptable messages: ' + variant + '. Your total amount of bot warnings is ' + points[message.member.id].points + ". Punishments are subject to the kangarouxler.");
        } else {
          message.guild.channels.find("name", "bangaroux").send(message.author + ', this is your first warning for a violation of Rule 1 of r/kangaroux. Your message: "' + args + '". Acceptable messages: ' + variant + '. Your total amount of bot warnings is ' + points[message.member.id].points + ". Further punishments are required and are subject to kangarouxler <@195637381121048577>");
        }
      }
    }
  }

  fs.writeFile("./points.json", JSON.stringify(points), (err) => {
    if (err) console.error(err)
  });

});

client.login(config.token);
