const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

const mockData = require('./mockData.json')

function json(data){
    return {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
}

describe('Test', async function(){
    this.timeout(60000)

    let page, browser;

    before(async ()=> {
        browser = await chromium.launch({headless: false, slowMo:500});
    });

    after(async () => {
        browser.close()
    });

    beforeEach(async () => {
        page = await browser.newPage();
    });

    afterEach(async ()=> {
        await page.close();
    });

    it('loads and display all books', async () => {

        await page.route('**/jsonstore/collections/books*', (route) => {
            route.fulfill(json(mockData.books))
        })
        
        await page.goto('http://localhost:3000');
       
        await page.click('text=Load All Books');

        await page.waitForSelector('text=Harry Potter')

        const rows = await page.$$eval('tr', (rows) => rows.map(r => r.textContent.trim()))
        
        // await page.route(
        //     '**/jsonstore/collections/books*',
        //     request => request.fulfill(json(mockData.books))
        // )

        expect(rows[1]).to.contains('Harry Potter');
        expect(rows[1]).to.contains('Rowling');
        expect(rows[2]).to.contains('C# Fundamentals');
        expect(rows[2]).to.contains('Nakov');



    
    });

    it('can create book', async () =>{
        
        await page.goto('http://localhost:3000');

        await page.fill('form#createForm >> input[name="title"]', 'Title')
        await page.fill('form#createForm >> input[name="author"]', 'Author')
        
        const [request] = await Promise.all([
            page.waitForRequest(request => request.method() == 'POST'),
            page.click('form#createForm >> text=Submit')

        ]);
        
        const data = JSON.parse(request.postData());

        expect(data.title).to.equal('Title')
        expect(data.author).to.equal('Author')

    });
    
    it('after click button Edit - correct form should be made visible', async () => {
        await page.goto('http://localhost:3000');

        await page.click('#loadBooks');

        await page.click('button.editBtn');

        const visible = await page.isVisible('#editForm');
        const notVisible = await page.isVisible('#createForm');

        const title = await page.$eval('form#editForm >> input[name="title"]', el => el.value);
        const author = await page.$eval('form#editForm >> input[name="author"]', el => el.value);

        expect(visible).to.be.true;
        expect(notVisible).to.be.false;

        expect(title).to.equal('Harry Potter and the Philosopher\'s Stone');
        expect(author).to.equal('J.K.Rowling');
    });

    it('edit book', async () => {
        await page.goto('http://localhost:3000');

        await page.click('#loadBooks');

        await page.click('button.editBtn');

        await page.fill('form#editForm >> input[name="title"]', 'Harry Potter and the Philosopher\'s Stone edited');
        await page.fill('form#editForm >> input[name="author"]', 'J.K.Rowling edited');

        await page.click('form#editForm >> button')

        await page.click('#loadBooks');

        const rows = await page.$$eval('tr', (rows) => rows.map(r => r.textContent.trim()))

        expect(rows[1]).includes('Harry Potter and the Philosopher\'s Stone edited');
        expect(rows[1]).includes('J.K.Rowling edited');
    });

    it.only('delete book', async () => {
        await page.goto('http://localhost:3000');

        await page.click('#loadBooks');
        
        page.on('dialog', async dialog => {
            await dialog.accept();
        });

       
        const [request] = await Promise.all([
            page.waitForRequest(request => request.method() == 'DELETE'),
            page.click('button.deleteBtn')

        ]);

        await page.click('#loadBooks');

        const books = await page.$$eval('tbody > tr > td', r => r.map(td => td.textContent));

        expect(books[0]).to.equal('C# Fundamentals');
        expect(books[1]).to.equal('Svetlin Nakov');
    })

});