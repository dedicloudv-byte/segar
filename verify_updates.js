import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    console.log('Navigating to Home Page...');
    await page.goto('http://localhost:8787');
    await page.waitForTimeout(2000);

    // Verify Product Card elements
    const productCard = page.locator('.group').first();
    const hasStars = await productCard.locator('.fa-star').count() > 0;
    const hasStock = await productCard.locator('text=/pcs/').count() > 0;
    const hasBeliButton = await productCard.locator('text=BELI SEKARANG').count() > 0;

    console.log(`Product Card - Stars: ${hasStars}, Stock: ${hasStock}, Beli Button: ${hasBeliButton}`);

    if (!hasStars || !hasStock || !hasBeliButton) {
      console.error('Frontend verification failed!');
      process.exit(1);
    }

    // Add to cart
    await productCard.locator('text=BELI SEKARANG').click();
    await page.waitForTimeout(500);

    // Toggle cart
    await page.click('button:has-text("Keranjang")');
    await page.waitForTimeout(1000);

    // Verify Cart elements
    const cartPanel = page.locator('#cart-panel');
    const hasThumbnail = await cartPanel.locator('img').count() > 0;
    const hasPaymentMethods = await cartPanel.locator('input[name="payment_method"]').count() === 3;
    const hasPesanSekarang = await cartPanel.locator('text=Pesan Sekarang').count() > 0;

    console.log(`Cart - Thumbnail: ${hasThumbnail}, Payment Methods: ${hasPaymentMethods}, Pesan Sekarang Button: ${hasPesanSekarang}`);

    if (!hasThumbnail || !hasPaymentMethods || !hasPesanSekarang) {
      console.error('Cart verification failed!');
      process.exit(1);
    }

    // Take screenshot
    await page.screenshot({ path: 'updated_ui.png', fullPage: true });
    console.log('Screenshot saved as updated_ui.png');

    // Verify Admin Dashboard
    console.log('Navigating to Admin Dashboard...');
    // Credentials are admin:sujudnanas123
    await page.setExtraHTTPHeaders({
        'Authorization': 'Basic ' + Buffer.from('admin:sujudnanas123').toString('base64')
    });
    await page.goto('http://localhost:8787/admin');
    await page.waitForTimeout(2000);

    const hasStockInput = await page.locator('input[name="stock"]').count() > 0;
    const hasRatingInput = await page.locator('input[name="rating"]').count() > 0;

    console.log(`Admin - Stock Input: ${hasStockInput}, Rating Input: ${hasRatingInput}`);

    if (!hasStockInput || !hasRatingInput) {
        console.error('Admin verification failed!');
        process.exit(1);
    }

    await page.screenshot({ path: 'updated_admin.png' });
    console.log('Admin screenshot saved as updated_admin.png');

    console.log('All verifications passed!');

  } catch (error) {
    console.error('Error during verification:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
