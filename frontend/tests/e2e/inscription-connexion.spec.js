import { test, expect } from '@playwright/test';

/**
 * Test E2E: Inscription et connexion d'un nouveau client
 * Ce test vérifie le parcours complet d'un utilisateur qui:
 * 1. S'inscrit sur la plateforme
 * 2. Se connecte avec ses identifiants
 * 3. Accède à son tableau de bord client
 */

test.describe('Inscription et Connexion Client', () => {
  // Générer un email unique pour chaque exécution
  const uniqueEmail = `testclient_${Date.now()}@fixiotech.com`;
  const userInfo = {
    nom_complet: 'Jean Dupont',
    courriel: uniqueEmail,
    mot_de_passe: 'TestPassword123!',
  };

  test('Parcours complet: Inscription → Connexion → Accès client', async ({ page }) => {
    // ÉTAPE 1: Inscription
    console.log('ÉTAPE 1: Navigation vers la page d\'inscription');
    await page.goto('/inscription');
    
    // Vérifier qu'on est sur la page d'inscription
    await expect(page.locator('h2')).toContainText('Inscription');

    console.log('ÉTAPE 2: Remplissage du formulaire d\'inscription');
    // Remplir le formulaire d'inscription
    await page.fill('input[name="nom_complet"]', userInfo.nom_complet);
    await page.fill('input[name="courriel"]', userInfo.courriel);
    await page.fill('input[name="mot_de_passe"]', userInfo.mot_de_passe);
    await page.fill('input[name="confirmer_mot_de_passe"]', userInfo.mot_de_passe);

    console.log('ÉTAPE 3: Soumission du formulaire');
    // Soumettre le formulaire (plus fiable que click sur Firefox)
    const inscriptionForm = page.locator('form');
    await inscriptionForm.evaluate(form => form.requestSubmit());

    // Attendre la redirection vers la page de connexion
    await page.waitForURL('/login', { timeout: 10000 });
    
    console.log('ÉTAPE 4: Vérification de la redirection vers login');
    await expect(page).toHaveURL('/login');

    // ÉTAPE 2: Connexion
    console.log('ÉTAPE 5: Remplissage du formulaire de connexion');
    await expect(page.locator('h2')).toContainText(/Connexion|Se connecter/);

    // Remplir le formulaire de connexion
    await page.fill('input[name="courriel"]', userInfo.courriel);
    await page.fill('input[name="mot_de_passe"]', userInfo.mot_de_passe);

    console.log('ÉTAPE 6: Soumission de la connexion');
    // Se connecter (plus fiable que click sur Firefox)
    const loginForm = page.locator('form');
    await loginForm.evaluate(form => form.requestSubmit());

    // Attendre la redirection vers la page client
    await page.waitForURL('/client', { timeout: 10000 });

    // ÉTAPE 3: Vérification de l'accès au tableau de bord client
    console.log('ÉTAPE 7: Vérification du tableau de bord client');
    await expect(page).toHaveURL('/client');
    
    // Vérifier que le nom de l'utilisateur apparaît dans le header
    const welcomeMessage = page.locator('text=/Bienvenue|Bonjour/i');
    await expect(welcomeMessage).toBeVisible({ timeout: 5000 });

    // Vérifier la présence des éléments du dashboard client
    await expect(page.locator('h1:has-text("Mes rendez-vous")')).toBeVisible();

    // Vérifier le bouton de déconnexion
    const logoutButton = page.locator('button:has-text("Déconnexion"), a:has-text("Déconnexion")');
    await expect(logoutButton).toBeVisible();

    console.log('✅ Test réussi: Inscription et connexion complétées avec succès');
    console.log(`   Email utilisé: ${userInfo.courriel}`);
  });

  test('Inscription avec email déjà existant devrait échouer', async ({ page }) => {
    // Utiliser l'email déjà créé dans le test précédent
    await page.goto('/inscription');

    await page.fill('input[name="nom_complet"]', 'Nouveau Test');
    await page.fill('input[name="courriel"]', uniqueEmail);
    await page.fill('input[name="mot_de_passe"]', 'Password123!');
    await page.fill('input[name="confirmer_mot_de_passe"]', 'Password123!');

    await page.click('button[type="submit"]');

    // Vérifier qu'un message d'erreur s'affiche ou qu'on reste sur la page
    const errorMessage = page.locator('.message-erreur, .error, [class*="error"], [class*="alert"]');
    const hasError = await errorMessage.isVisible().catch(() => false);
    const stillOnPage = await page.url().includes('/inscription');
    
    expect(hasError || stillOnPage).toBeTruthy();

    console.log('✅ Test réussi: Duplication d\'email correctement rejetée');
  });

  test('Connexion avec mauvais mot de passe devrait échouer', async ({ page }) => {
    await page.goto('/login');

    await page.fill('input[name="courriel"]', 'client.test@fixiotech.com');
    await page.fill('input[name="mot_de_passe"]', 'MauvaisMotDePasse123!');
    
    // Soumettre le formulaire (plus fiable que click sur Firefox)
    const loginForm = page.locator('form');
    await loginForm.evaluate(form => form.requestSubmit());

    // Vérifier qu'un message d'erreur s'affiche ou qu'on reste sur login
    await page.waitForTimeout(2000);
    const errorMessage = page.locator('.message-erreur, .error, [class*="error"], [class*="alert"]');
    const hasError = await errorMessage.isVisible().catch(() => false);
    const stillOnLogin = await page.url().includes('/login');
    
    expect(hasError || stillOnLogin).toBeTruthy();
    
    console.log('✅ Test réussi: Mauvais mot de passe correctement rejeté');
  });
});
