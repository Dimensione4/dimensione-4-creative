import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { Cookie } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function CookiePolicy() {
  const { t, i18n } = useTranslation();
  const isItalian = i18n.language === "it";

  return (
    <Layout>
      <SEO
        title={t("legal.cookiePolicy")}
        description={
          isItalian
            ? "Cookie Policy di Dimensione 4 di Dario Marco Bellini. Scopri quali cookie utilizziamo e come gestirli."
            : "Cookie Policy of Dimensione 4 di Dario Marco Bellini. Learn what cookies we use and how to manage them."
        }
        canonical="/cookie-policy"
      />

      <section className="section-padding pt-32">
        <div className="container-wide space-y-6 md:space-y-8">
          <div className="surface-card p-6 md:p-10 max-w-5xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
                <Cookie className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight">
                  {t("legal.cookiePolicy")}
                </h1>
                <p className="mt-3 text-sm md:text-base text-muted-foreground">
                  {isItalian
                    ? "Informazioni su cookie tecnici, preferenze e consenso."
                    : "Information on technical cookies, preferences, and consent."}
                </p>
              </div>
            </div>
          </div>

          <article className="surface-card p-6 md:p-10 max-w-5xl mx-auto">
            <p className="text-sm md:text-base text-muted-foreground mb-8 pb-6 border-b border-border/70">
              {isItalian
                ? "Ultimo aggiornamento: Gennaio 2026"
                : "Last updated: January 2026"}
            </p>

            <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-headings:text-foreground prose-h2:text-2xl prose-h2:text-primary prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:text-primary/90 prose-p:text-foreground/90 prose-li:text-foreground/90 prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-primary/80">
              {isItalian ? (
                <>
                  <h2>1. Cosa sono i Cookie</h2>
                  <p>
                    I cookie sono piccoli file di testo che vengono memorizzati sul tuo dispositivo quando visiti un
                    sito web. Sono ampiamente utilizzati per far funzionare i siti web in modo piu efficiente e fornire
                    informazioni ai proprietari del sito.
                  </p>

                  <h2>2. Tipologie di Cookie Utilizzati</h2>

                  <h3>Cookie Tecnici (Necessari)</h3>
                  <p>
                    Questi cookie sono essenziali per il funzionamento del sito web e non possono essere disabilitati.
                    Includono:
                  </p>
                  <ul>
                    <li>
                      <strong>Cookie di sessione:</strong> necessari per la navigazione del sito
                    </li>
                    <li>
                      <strong>Cookie di preferenze:</strong> salvano le tue preferenze (lingua, tema)
                    </li>
                    <li>
                      <strong>Cookie di sicurezza:</strong> proteggono contro attacchi CSRF e bot
                    </li>
                  </ul>

                  <h3>Cookie Analitici (Previo Consenso)</h3>
                  <p>
                    Questi cookie ci permettono di analizzare l'utilizzo del sito per migliorarne le funzionalita. Vengono
                    attivati solo con il tuo consenso.
                  </p>

                  <h2>3. Cookie di Terze Parti</h2>
                  <p>Il nostro sito potrebbe utilizzare servizi di terze parti che installano cookie:</p>
                  <ul>
                    <li>
                      <strong>Calendly:</strong> per la gestione delle prenotazioni
                    </li>
                    <li>
                      <strong>Google reCAPTCHA:</strong> per la protezione anti-spam dei moduli
                    </li>
                  </ul>

                  <h2>4. Gestione dei Cookie</h2>
                  <p>
                    Al primo accesso al sito, ti verra mostrato un banner per la gestione dei cookie. Puoi modificare le
                    tue preferenze in qualsiasi momento cliccando sul link "Gestisci Cookie" nel footer del sito.
                  </p>
                  <p>Puoi anche gestire i cookie direttamente dal tuo browser:</p>
                  <ul>
                    <li>
                      <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">
                        Chrome
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://support.mozilla.org/it/kb/Attivare%20e%20disattivare%20i%20cookie"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Firefox
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://support.apple.com/it-it/guide/safari/sfri11471/mac"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Safari
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Edge
                      </a>
                    </li>
                  </ul>

                  <h2>5. Durata dei Cookie</h2>
                  <ul>
                    <li>
                      <strong>Cookie di sessione:</strong> vengono eliminati alla chiusura del browser
                    </li>
                    <li>
                      <strong>Cookie persistenti:</strong> rimangono memorizzati per un periodo definito (es. 12 mesi per
                      le preferenze)
                    </li>
                  </ul>

                  <h2>6. Aggiornamenti</h2>
                  <p>
                    Questa Cookie Policy puo essere aggiornata periodicamente. Ti invitiamo a consultarla regolarmente.
                  </p>

                  <h2>7. Contatti</h2>
                  <p>Per qualsiasi domanda sui cookie, contattaci: {' '}dariomarcobellini@dimensione4.it</p>
                </>
              ) : (
                <>
                  <h2>1. What are Cookies</h2>
                  <p>
                    Cookies are small text files that are stored on your device when you visit a website. They are widely
                    used to make websites work more efficiently and provide information to website owners.
                  </p>

                  <h2>2. Types of Cookies Used</h2>

                  <h3>Technical Cookies (Necessary)</h3>
                  <p>
                    These cookies are essential for the website to function and cannot be disabled. They include:
                  </p>
                  <ul>
                    <li>
                      <strong>Session cookies:</strong> necessary for site navigation
                    </li>
                    <li>
                      <strong>Preference cookies:</strong> save your preferences (language, theme)
                    </li>
                    <li>
                      <strong>Security cookies:</strong> protect against CSRF attacks and bots
                    </li>
                  </ul>

                  <h3>Analytics Cookies (With Consent)</h3>
                  <p>
                    These cookies allow us to analyze website usage to improve its functionality. They are only activated
                    with your consent.
                  </p>

                  <h2>3. Third-Party Cookies</h2>
                  <p>Our site may use third-party services that install cookies:</p>
                  <ul>
                    <li>
                      <strong>Calendly:</strong> for booking management
                    </li>
                    <li>
                      <strong>Google reCAPTCHA:</strong> for form spam protection
                    </li>
                  </ul>

                  <h2>4. Managing Cookies</h2>
                  <p>
                    On your first visit to the site, you will see a cookie management banner. You can change your
                    preferences at any time by clicking the "Manage Cookies" link in the site footer.
                  </p>
                  <p>You can also manage cookies directly from your browser:</p>
                  <ul>
                    <li>
                      <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">
                        Chrome
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Firefox
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Safari
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Edge
                      </a>
                    </li>
                  </ul>

                  <h2>5. Cookie Duration</h2>
                  <ul>
                    <li>
                      <strong>Session cookies:</strong> deleted when you close the browser
                    </li>
                    <li>
                      <strong>Persistent cookies:</strong> remain stored for a defined period (e.g., 12 months for
                      preferences)
                    </li>
                  </ul>

                  <h2>6. Updates</h2>
                  <p>This Cookie Policy may be updated periodically. Please check it regularly.</p>

                  <h2>7. Contact</h2>
                  <p>For any questions about cookies, contact us: {' '}dariomarcobellini@dimensione4.it</p>
                </>
              )}
            </div>
          </article>
        </div>
      </section>
    </Layout>
  );
}


