const FileReceiver = require("../browser/file-receiver");
const Textile = require("../../index");

const THREAD_NAME = "test-media";

const container = document.querySelector("#dropZone");
const fr = new FileReceiver();

fr.on("item.skipped", evt => {
  console.log("Skipped Item", evt);
});

fr.on("file.received", async data => {
  console.log("File Received", data);
  const { data: file } = data;

  const textile = new Textile();

  const thread = await textile.threads.getByName(THREAD_NAME);
  if (!thread) {
    alert(
      `Uh oh. We couldn't find a thread named '${THREAD_NAME}'. Please add it and try again!`
    );
    return;
  }

  const form = new FormData();
  form.append("file", file, file.name);

  try {
    const added = await textile.threads.addFile(thread.id, form, {
      caption: "Dropped file"
    });

    // Just add the json string to the document
    const element = document.createElement("pre");
    const node = document.createTextNode(JSON.stringify(added, null, 2));
    element.appendChild(node);
    document.body.appendChild(element);
  } catch (ex) {
    console.error(ex);
  }
});

// Make sure to prevent both these events, or the drop
// event will never fire
container.ondragenter = evt => {
  evt.preventDefault();
};
container.ondragover = evt => {
  evt.preventDefault();
  container.classList.add("hover");
};
container.ondragleave = evt => {
  evt.preventDefault();
  container.classList.remove("hover");
};

container.ondrop = evt => {
  evt.preventDefault();
  fr.getEventImages(evt);
};

console.log("Ready to go!");
