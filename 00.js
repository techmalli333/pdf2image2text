const fs = require("fs");
const pdf2pic = require("pdf2pic");
const tesseract = require("node-tesseract-ocr");

const filePath = "./MED_235155_20240104-PMGround122823.pdf";
const outputImageDir = "./images/";
let outputText = "";

const pdf2picOptions = {
  density: 300, // output pixels per inch
  saveFilename: "page", // base file name
  savePath: outputImageDir, // output directory
  format: "png",
  width: 787,
  height: 1400,
};

async function convertPdfToImages() {
  try {
    const pdf2picConverter = await pdf2pic
      .fromPath(filePath, pdf2picOptions)
      .bulk(-1);

    console.log("PDF converted to images:", pdf2picConverter);
    return pdf2picConverter;
  } catch (error) {
    console.error("Error converting PDF to images:", error);
    throw error;
  }
}

async function extractTextFromImages(imageInfo) {
  try {
    const config = {
      lang: "eng",
      oem: 1,
      psm: 3,
    };
    for (const { path } of imageInfo) {
      const text = await tesseract.recognize(path, config);

      outputText += "/n" + text;
      console.log(`Text extracted from $and saved to ${text}`);
    }
  } catch (error) {
    console.error("Error extracting text from images:", error);
    throw error;
  }
}

async function main() {
  try {
    // const imageInfo = await convertPdfToImages();
    const imageInfo = [
      {
        name: "page.1.png",
        size: "787x1400",
        fileSize: 127.287,
        path: "./images/page.1.png",
        page: 1,
      },
      {
        name: "page.2.png",
        size: "787x1400",
        fileSize: 130.452,
        path: "./images/page.2.png",
        page: 2,
      },
      {
        name: "page.3.png",
        size: "787x1400",
        fileSize: 132.958,
        path: "./images/page.3.png",
        page: 3,
      },
      {
        name: "page.4.png",
        size: "787x1400",
        fileSize: 122.092,
        path: "./images/page.4.png",
        page: 4,
      },
      {
        name: "page.5.png",
        size: "787x1400",
        fileSize: 117.378,
        path: "./images/page.5.png",
        page: 5,
      },
      {
        name: "page.6.png",
        size: "787x1400",
        fileSize: 106.902,
        path: "./images/page.6.png",
        page: 6,
      },
      {
        name: "page.7.png",
        size: "787x1400",
        fileSize: 92.336,
        path: "./images/page.7.png",
        page: 7,
      },
      {
        name: "page.8.png",
        size: "787x1400",
        fileSize: 92.979,
        path: "./images/page.8.png",
        page: 8,
      },
    ];
    await extractTextFromImages(imageInfo);
    console.log(outputText)
  } catch (error) {
    console.error("Error in main process:", error);
  }
}

main();
