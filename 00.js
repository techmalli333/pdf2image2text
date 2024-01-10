const fs = require("fs");
const pdf2pic = require("pdf2pic");
const tesseract = require("node-tesseract-ocr");

const filePath = "./pdf_1.pdf"; // mention ur pdf path
const outputImageDir = "./images/"; // create a images folder
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
    const data = await pdf2pic.fromPath(filePath, pdf2picOptions).bulk(-1);

    console.log("PDF converted to images:", data);
    return data;
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

      outputText += text;
      console.log(`Text successfully  extracted from  ${path}`);
    }
  } catch (error) {
    console.error(`Error extracting text from image:`, error);
    throw error;
  }
}

async function main() {
  try {
    const imageInfo = await convertPdfToImages();

    await extractTextFromImages(imageInfo);
    console.log(outputText);
  } catch (error) {
    console.error("Error in main process:", error);
  }
}

main();
