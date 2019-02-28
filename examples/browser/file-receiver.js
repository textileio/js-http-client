const { EventEmitter2 } = require("eventemitter2");

// Credit for all this parsing goes to github.com/carsonfarmer

/**
 * A helper class for processing drop events from the browser
 *
 * @param {object} options Options object
 * @param {object} [options.typeStartsWith="image"] Simple filter for the type file type received.
 * @param {bool} [options.throwOnNotImplemented] Throw an error when non-image types are processed
 *
 * @example
 * const container = document.querySelector("#dropZone");
 * const fr = new FileReceiver();
 * fr.on("file.received", file => {
 *   console.log("File Received", file);
 * });
 *
 * // Make sure to prevent both these events, or the drop
 * // event will never fire
 * container.ondragenter = evt => {
 *   evt.preventDefault();
 * };
 * container.ondragover = evt => {
 *   evt.preventDefault();
 * };
 *
 * container.ondrop = evt => {
 *   evt.preventDefault();
 *   fr.getEventImages(evt);
 * };
 */
class FileReceiver extends EventEmitter2 {
  constructor(options) {
    super();
    const opts = options || {};
    this.typeStartsWith = opts.typeStartsWith || "image";
    this.throwOnNotImplemented = opts.throwOnNotImplemented;
  }

  notImplemented(type) {
    if (this.throwOnNotImplemented) {
      throw new Error(`Processing '${type}' items is not yet implemented`);
    } else {
      this.emit("item.skipped", {
        msg: `An item of type '${type}' was skipped as this type is not yet implemented`
      });
    }
  }

  processImage(file) {
    this.emit("file.received", {
      msg: "File received",
      data: file
    });
    return file;
  }

  isDesiredType(itemType) {
    return itemType.startsWith(this.typeStartsWith);
  }

  processMobileFileDrop(event) {
    const {
      srcElement: { files }
    } = event;
    const imgs = [];
    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];
      let img = null;
      switch (true) {
        case this.isDesiredType(file.type):
          img = this.processImage(file);
          imgs.push(img);
          break;
        default:
          this.notImplemented(file.type);
      }
    }
    return imgs;
  }

  processDataTransferItems(items) {
    const imgs = [];
    for (let i = 0; i < items.length; i += 1) {
      const item = items[i];
      let img = null;
      if (item.kind !== "file") {
        this.notImplemented(item.kind);
      } else {
        const file = item.getAsFile();
        switch (true) {
          case this.isDesiredType(file.type):
            img = this.processImage(file);
            imgs.push(img);
            break;
          default:
            this.notImplemented(file.type);
        }
      }
    }
    return imgs;
  }

  processDataTransferFiles(files) {
    const imgs = [];
    for (let i = 0; i < files.length; i += 1) {
      let img = null;
      const file = files[i];
      switch (true) {
        case this.isDesiredType(file.type):
          img = this.processImage(file);
          imgs.push(img);
          break;
        default:
          this.notImplemented(file.type);
      }
    }
    return imgs;
  }

  processPcFileDrop(event) {
    if (event.dataTransfer.items) {
      return this.processDataTransferItems(event.dataTransfer.items);
    }
    if (event.dataTransfer.files) {
      return this.processDataTransferFiles(event.dataTransfer.files);
    }
    throw new Error("Nothing to process");
  }

  /**
   * Parses a browser drop event into an array of images
   * and fires a "file.received" event for every image found
   * during the process
   *
   * @param {object} event The browser drop event object
   */
  getEventImages(event) {
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      return this.processMobileFileDrop(event);
    }
    return this.processPcFileDrop(event);
  }
}

module.exports = FileReceiver;
