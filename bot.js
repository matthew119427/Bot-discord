const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

function separer(text) {
	var i;
	var temp = '';
	var full = ['fin'];
	for (i = 1; i < text.length; i++){
		if ((text[i] != ' ') & (text[i] != '')){
			temp += text[i];
		}
		if ((text[i] == ' ') | (text[i] == '') | (i == text.length - 1)) {
			full[full.length] = temp;
			temp = '';
		}
	}
	full.shift();
	return full;
}

var cmdList = [
	'help',
	'ping',
	'chybre',
	'DBFZ',
	'jdr'
];
var cmdDesc = [
	'Voici la liste de toutes les commandes dispos :',
	'Fait répondre "pong" au bot',
	'Profane en tts une insulte adressé à la personne passée en argument',
	'description a faire',
	'- de <nombre de faces> <nombre de lancer> : retourne vos lancés\n - gemstone <nom> : affiche le dossier gemstone de la personne voulue'
];

var args = [];
var cmd = '';
var song_repeat = 1;
var last_song = '';

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	if (msg.author.bot) return;
	if ((msg.content[0] === '!') & (msg.content[1] != ' ' | msg.content[1] != '')) {
		args = separer(msg.content);
		if (args !== 'nothing'){
			cmd = args[0];
			args.shift();
			console.log("Commande requise : " + cmd + " arguments : " + args)
			switch(cmd){
				case cmdList[0]: //help
					console.log(args)
					if (args[0] != null){
						for (i = 0; i < cmdList.length; i++){
							if (args[0] == cmdList[i]){
								msg.channel.send('Description de la commande ' + cmdList[i] + ' :\n' + cmdDesc[i]);
								break;
							}
						}
					} else {
						var temp = '';
						for (i = 0; i < cmdList.length; i++){
							temp += '  - ' + cmdList[i] + '\n';
						}
						msg.channel.send(cmdDesc[0] + '\n' + temp);
					}
					break;
				case cmdList[1]: //ping
					msg.reply('pong');
					break;
				case cmdList[2]: //chybre
					msg.channel.send(args[0] + ' est un gros chybre', {tts: true});
					break;
				case cmdList[3]: //DBFZ
					switch(args[0]){
						case 'test':
							var obj = require("./DBFZ/Sessions.json");
							var session;
							for (session in obj){
								console.log(session);
							}
					}
				case cmdList[4]: //jdr
					switch(args[0]){
						case 'de':
							var to_send = "";
							const de1 = client.emojis.find("name", "de1");
							const de2 = client.emojis.find("name", "de2");
							const de3 = client.emojis.find("name", "de3");
							const de4 = client.emojis.find("name", "de4");
							const de5 = client.emojis.find("name", "de5");
							const de6 = client.emojis.find("name", "de6");
							var emojiList = [de1, de2, de3, de4, de5, de6];
							for (i = 0; i < args[2]; i++) {
								if (args[1] == 6){
									to_send += "|" + emojiList[Math.floor((Math.random() * args[1]) + 1) - 1];
								} else {
									to_send += "|" + String(Math.floor((Math.random() * args[1]) + 1));
								}
							}
							to_send += "|";
							msg.channel.send('Voici les résultats des/du lancé : ' + to_send);
							break;
						case 'test':
							msg.channel.send(de1 + "|" + de2 + "|" + de3 + "|" + de4 + "|" + de5 + "|" + de6);
							break;
						case 'gemstone':
							var dossiers = require("./Hexagon/Gemstone-persos_1.json");
							if (dossiers.gemstone[args[1]] != null){
								msg.channel.send(args[1] + ' : ' + dossiers.gemstone[args[1]]);
							} else {
								if (args[1] == 'Nouch') {
									msg.channel.send('NOUCH ELLE EST DANS DES PUTAINS DE TOILETTES SECHES');
								} else {
									msg.channel.send(args[1] + ' : ' + 'Inconnu');
								}
							}
							break;
						case 'log_in':
						    if (msg.member.voiceChannel) {
						      msg.member.voiceChannel.join()
						        .then(connection => { // Connection is an instance of VoiceConnection
						          msg.channel.send('Je suis en ligne les ptiauds!');
						        })
						        .catch(console.log);
						    } else {
						      msg.channel.send("Soyez au moins connectés sur le canal avant de m'appeller!");
						    }
						  break;
						case 'log_out':
							msg.channel.send("A plus les jeunes !")
							connection.disconnect();
							break;
						case 'musique':
							switch(args[1]) {
								case 'play':
									const dispatcher = connection.playFile('./Hexagon/' + args[1] + '.mp3');
									last_song = args[1];
									break;
								case 'pause':
									dispatcher.pause();
									break;
								case 'stop':
									dispatcher.end();
									break;
								case 'resume':
									dispatcher.resume();
									break;
								case 'volume':
									dispatcher.setVolume(args[2]);
									break;
								case 'repeat':
									switch(args[2]) {
										case 'on':
											song_repeat = 1;
											break;
										case 'off':
											song_repeat = 0;
											break;
									}
									break;
							}
							break;
						case 'notes':
							switch(args[1]){
								case 'add':
									switch(args[2]){
										case 'section':
											break;
										case 'info':
											break;
									}
									break;
								case 'display':
									break;
							}
							break;
					}
				case 'private':
					switch(args[0]){
						case 'love':
							msg.channel.send("Raphaël t'aime plus que l'infini et je suis la pour te le rappeler :wink:");
							break;
						case 'aime':
							msg.channel.send("Je t'aiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiime !!!");
							for (var i = 0; i < 1000; i++) {
								msg.channel.send("Je t'aime ! <3");
							}
							msg.channel.send("Je t'aiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiime ma amour !!!");
							break;
					}
			}
		}
	}
});

dispatcher.on('end', () => {
  if(song_repeat === 1) {
  	dispatcher.playFile('./Hexagon/' + last_song + '.mp3');
  }
});


client.login(''); //Removing your token from GitHub
