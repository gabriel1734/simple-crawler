import express from 'express';
import puppeteer from 'puppeteer';

const server = express();

server.get('/', async(req, res) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://alura.com.br/formacao-front-end");
    
    const pageContent = await page.evaluate(() => {
        return {
            subtile: document.querySelector('h1').innerHTML,
        }
    });
    
    console.log(pageContent);

    //await page.screenshot({ path: "alura.png" });
    //Pegar dados da página da Alura
    await browser.close();

    res.send(JSON.stringify({
        'message': 'Hello World',
        "subtitle": pageContent.subtile,
    }));
});

server.get('/:q', async (req, res) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://${req.params.q}`);

    const pageContent = await page.evaluate(() => {
        return {
            subtile: document.querySelector('main').innerHTML,
        }
    });

    if (!pageContent) {
        res.send(JSON.stringify({
            'message': 'not found',
        }));
    }

    res.send(pageContent.subtile,);
});
server.listen(3000, () => {
    console.log('Server started on port 3000');
});