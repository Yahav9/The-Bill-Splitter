import express, { Express, Request, Response } from 'express';
import multer from 'multer';
import tesseract from 'node-tesseract-ocr';
import cv from 'opencv4nodejs';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import { json } from 'body-parser';

const app: Express = express();

app.use(cors())
    .use(json());

app.use((_req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

const upload = multer();

app.post('/process-bill', upload.single('image'), async (req: Request, res: Response) => {
    try {
        const file = req.file;
        const imagePath = path.join(__dirname, 'uploads/image.jpg');
        //@ts-ignore
        fs.writeFileSync(imagePath, file?.buffer);

        // Read the image
        const image = cv.imread(imagePath);
        let grayImage = image.bgrToGray();

        // Apply dilation and erosion to remove some noise
        const kernel = cv.getStructuringElement(cv.MORPH_RECT, new cv.Size(1, 1));
        grayImage.dilate(kernel);
        grayImage.erode(kernel);

        // Write the image to a temporary file to apply OCR
        const tempFilePath = path.join(__dirname, 'uploads/temp.jpg');
        cv.imwrite(tempFilePath, grayImage);

        // Apply OCR
        const text = await tesseract.recognize(tempFilePath);
        console.log(text)
        // Extract items and prices
        const lines = text.split('\n');
        const items = [];
        let index: number = 0;
        for (const line of lines) {
            if (
                line.trim() === '' ||
                line.toLowerCase().includes('total') ||
                line.toLowerCase().includes('cash') ||
                line.toLowerCase().includes('change') ||
                line.toLowerCase().includes('bank') ||
                line.toLowerCase().includes('date') ||
                line.includes('סה"כ') ||
                line.includes('לתשלום') ||
                line.includes("טל'") ||
                line.includes('טלפון') ||
                line.includes('שולחן') ||
                line.includes('תאריך') ||
                line.includes('שעה')
            ) {
                continue;
            }

            const words: string[] = line.split(' ');
            if (
                words[words.length - 1].includes('$') ||
                words[words.length - 1].includes('₪') ||
                words[words.length - 1].includes('€')
            ) {
                items.push(
                    {
                        name: words.slice(0, -1).join(' '),
                        price: Number(words[words.length - 1].slice(1)),
                        index
                    }
                );
                index++;
            } else if (
                Number(words[words.length - 1]) < 10000 &&
                Number(words[words.length - 1]) > 0 &&
                (
                    words[words.length - 1].includes('.') ||
                    words[words.length - 1].includes('00')
                )
            ) {
                items.push(
                    {
                        name: words.slice(0, -1).join(' '),
                        price: Number(words[words.length - 1]),
                        index
                    }
                );
                index++;
            }
        }

        fs.unlinkSync(imagePath);
        fs.unlinkSync(tempFilePath);

        res.send(items);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
