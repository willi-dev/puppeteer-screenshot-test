const puppeteer = require('puppeteer');

const bbxTest = {
  baseURL: 'http://alpha.bobobox.co.id',
  listPages: [
    {
      name: 'homepage',
      url: '/'
    },
    {
      name: 'about',
      url: '/about'
    },
    {
      name: 'career',
      url: '/career'
    },
    {
      name: 'terms-condition',
      url: '/terms-condition'
    },
    {
      name: 'privacy-policy',
      url: '/privacy-policy'
    },
    {
      name: 'partner',
      url: '/promo'
    },
    {
      name: 'franchise',
      url: '/franchise'
    },
    {
      name: 'why-bobobox',
      url: '/why-bobobox'
    },
    {
      name: 'contact',
      url: '/contact'
    },
    {
      name: 'promo',
      url: '/promo'
    },
    {
      name: 'faq',
      url: '/faq'
    }
  ],
  /**
   * array of viewport
   */
  viewport: [
    { // iphone 5/SE
      width: 320,
      height: 568
    },
    { // galaxy S5
      width: 360,
      height: 640
    },
    { // iphone 6/7/8
      width: 375,
      height: 667
    },
    { // iphone 6/7/8 plus
      width: 414,
      height: 736
    },
    { // pixel 2
      width: 411,
      height: 731
    },
    { // ipad or tablet portrait
      width: 768,
      height: 1024
    },
    { // ipad or tablet landscape
      width: 1024,
      height: 768
    },
    {
      width: 1366,
      height: 768
    },
    {
      width: 1600, 
      height: 1024
    },
    {
      width: 1920, 
      height: 1080
    }
  ],
  /**
   * headless value
   */
  headless: false,

  /**
   * runTest
   * @param {*} name 
   * @param {*} url 
   * @param {*} vpWidth 
   * @param {*} vpHeight 
   */
  runTest: async function(name, url, vpWidth, vpHeight) {
    let browser = await puppeteer.launch({ headless: this.headless });
    let page = await browser.newPage();
    await page.setViewport({ width: vpWidth, height: vpHeight });
    await page.goto(url);
    const bodyHandle = await page.$('body');
    const { width, height } = await bodyHandle.boundingBox();
    const screenshot = await page.screenshot({
      clip: {
        x: 0,
        y: 0,
        width,
        height
      },
      path: './screenshot/' + name + '-' + vpWidth + 'x' + vpHeight + '.jpg',
      type: 'jpeg'
    });
    await bodyHandle.dispose();
    await page.close();
    await browser.close();  
  },

  /**
   * run
   */
  run: async function() {
    for(var j = 0; j < this.listPages.length; j++) {
      for(var i=0; i < this.viewport.length; i++) {
        await this.runTest(this.listPages[j].name, this.baseURL + this.listPages[j].url, this.viewport[i].width, this.viewport[i].height);
      }
    }
  }
}

bbxTest.run();
