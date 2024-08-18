const parseName = (name: string): string => {
  let counter = 0;
  let newName = "";

  for (let i = 0; i < name.length; i++) {
    let char = name[i];
    if (counter === 0) {
      char = char.toUpperCase();
      counter++;
      newName += char;
    }
    if (char === " ") {
      newName += name[i + 1];
    }
    counter++;
  }

  return newName;
};

export default parseName;
