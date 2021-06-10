const puppeteer = require('puppeteer');
const randomWord = require('./words');
const notifier = require('node-notifier');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://www.swagbucks.com/');
  await page.click("#sbLogInCta");
  await page.waitForTimeout(1000);
  await page.type("#sbxJxRegEmail", '', {delay: 100 + getRandomInt(10,50)})
  await page.type("#sbxJxRegPswd", '', {delay: 100 + getRandomInt(10,50)})
  await page.waitForTimeout(1000);
  await page.click("#loginBtn");
  await page.waitForTimeout(5000);
  await page.click("#sbMainNavToggle");
  await page.waitForTimeout(1000);
  await page.click("a[href='/surveys']");
  await page.waitForTimeout(5000);
    for (let i = 0; i < 100; i++) {
        try {
            await page.click(".questionDropdownContainer");
            await page.waitForTimeout(2000);
            const elements = await page.$x('//*[@id="middleInner"]/div[1]/div[2]/div[2]/div[2]/div/div[2]/div/div[1]/div/div/span[1]')
            await elements[0].click() 
            await page.waitForTimeout(2000 + getRandomInt(100,500));
            await page.click(".surveyDashboardCTA");
            await page.waitForTimeout(2000 + getRandomInt(100,500));
            console.log("Done " + i);
        } catch (error) {
            console.log(error.message);
        }
    }
    for (let i = 0; i < 100; i++) {
        try {
            const randomWordA = randomWord.randomWord();
            console.log(randomWordA);
            await page.click("#sbGlobalNavSearchInputWeb");
            await page.type("#sbGlobalNavSearchInputWeb", randomWord.randomBrand() + " " + randomWordA, {delay: 100 + getRandomInt(10,50)});
            await page.waitForTimeout(2000);
            await page.click("#sbGlobalNavSearchSubmit");
            await page.waitForTimeout(2000 + getRandomInt(100,500));
            try {
                await page.waitForSelector("#topWinMsg", {timeout: 2000});
                await page.waitForTimeout(200000 + getRandomInt(100,500));
                await notifier.notify('Encontré algo');
            } catch(error) {
                console.log("error", error.message)
                await page.evaluate( () => document.getElementById("sbGlobalNavSearchInputWeb").value = "")
                await page.waitForTimeout(2000 + getRandomInt(100,500));
                console.log("Done " + i);
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    //await browser.close();
})();