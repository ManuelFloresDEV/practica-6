const argv = process.argv;
const fs = require("fs");

let names = argv[3];
let command = argv[2];

let json = { arrayName: [names] };

if (command) {
  command = command.toLowerCase();
}
if (names && (command === "add" || command === "rm")) {
  names = names.toLowerCase();
}

switch (command) {
  case "add":
    if (!fs.existsSync("DATA_BASE.json")) {
      if (!names) {
        console.log("please, enter a name");
        return process.exit(1);
      } else {
        fs.writeFileSync("DATA_BASE.json", JSON.stringify(json), "utf8");
      }
    } else {
      if (!names) {
        console.log("please, enter a name");
        return process.exit(1);
      } else {
        let data = fs.readFileSync("DATA_BASE.json", "utf8");
        let parseData = JSON.parse(data);
        parseData.arrayName.push(names);
        fs.writeFileSync("DATA_BASE.json", JSON.stringify(parseData)), "utf8";
        console.log(parseData);
      }
    }

    break;
  case "ls":
    if (names) {
      console.log(`remove  (${names}) from command`);
      process.exit(2);
    } else {
      let data = fs.readFileSync("DATA_BASE.json", "utf8");
      let parseData = JSON.parse(data);
      for (let i = 0; i < parseData.arrayName.length; i++) {
        console.log(`${i} ${parseData.arrayName[i]}`);
      }
    }
    break;
  case "rm":
    if (!names) {
      console.log("please, enter a name");
      process.exit(1);
    } else {
      let data = fs.readFileSync("DATA_BASE.json", "utf8");
      let parseData = JSON.parse(data);
      let deletName = parseData.arrayName.filter((name) => name !== names);
      console.log(parseData);
      parseData.arrayName = deletName;
      fs.writeFileSync("DATA_BASE.json", JSON.stringify(parseData)), "utf8";
      console.log(parseData.arrayName);
    }
    break;
  case "reset":
    if (names) {
      console.log(`remove  (${names}) from command`);
      process.exit(2);
    } else {
      let datos = fs.readFileSync("DATA_BASE.json", "utf8");
      let parseDatas = JSON.parse(datos);
      parseDatas.arrayName = [];
      fs.writeFileSync("DATA_BASE.json", JSON.stringify(parseDatas)), "utf8";
    }
    break;
  default:
    console.log("enter a command");
    console.log("to add name: node index.js add manuel");
    console.log("list names: node index.js ls");
    console.log("delet name: rm manuel");
    console.log("delete name list: reset");
    break;
}
