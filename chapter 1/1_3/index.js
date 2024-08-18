import { createObjectCsvWriter } from "csv-writer";
import prompt from "prompt";
prompt.message = "";

prompt.start();

const csvWriter = createObjectCsvWriter({
  path: "./contacts.csv",
  append: true,
  header: [
    { id: "name", title: "NAME" },
    { id: "number", title: "NUMBER" },
    { id: "email", title: "EMAIL" },
  ],
});

class Person {
  constructor(name = "", number = "", email = "") {
    this.name = name;
    this.number = number;
    this.email = email;
  }

  async saveToCSV() {
    try {
      const { name, number, email } = this;
      await csvWriter.writeRecords([{ name, number, email }]); // Await the async operation
      console.log(`${name} Saved!`);
    } catch (err) {
      console.error(err);
    }
  }
}

const startApp = async () => {
  const person = new Person();
  const responses = await prompt.get([
    {
      name: "name",
      description: "Contact Name",
    },
    {
      name: "number",
      description: "Contact Number",
    },
    {
      name: "email",
      description: "Contact Email",
    },
  ]);

  Object.assign(person, responses);
  await person.saveToCSV();

  const { again } = await prompt.get([
    {
      name: "again",
      description: "Continue? [y to continue]",
    },
  ]);

  if (again.toLowerCase() === "y") await startApp();
};

startApp();
