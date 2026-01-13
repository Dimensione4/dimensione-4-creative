import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { useTranslation } from "react-i18next";

export default function PrivacyPolicy() {
  const { t, i18n } = useTranslation();
  const isItalian = i18n.language === "it";

  return (
    <Layout>
      <SEO
        title={t("legal.privacyPolicy")}
        description={
          isItalian
            ? "Informativa sulla privacy di Dimensione4. Scopri come trattiamo i tuoi dati personali."
            : "Privacy Policy of Dimensione4. Learn how we handle your personal data."
        }
        canonical="/privacy-policy"
      />

      <section className="section-padding pt-32">
        <div className="container-wide">
          <article className="prose prose-lg dark:prose-invert max-w-none">
            <h1 className="font-display text-hero-mobile md:text-[3rem] font-bold mb-8">
              {t("legal.privacyPolicy")}
            </h1>

            <p className="text-muted-foreground mb-8">
              {isItalian
                ? "Ultimo aggiornamento: Gennaio 2026"
                : "Last updated: January 2026"}
            </p>

            {isItalian ? (
              <>
                <h2>1. Titolare del Trattamento</h2>
                <p>
                  Il Titolare del trattamento dei dati personali è:
                  <br />
                  <strong>Dimensione4</strong>
                  <br />
                  P.IVA: 04678930167
                  <br />
                  Email: dariomarcobellini@dimensione4.it
                </p>

                <h2>2. Tipologie di Dati Raccolti</h2>
                <p>
                  I dati personali raccolti attraverso questo sito web
                  includono:
                </p>
                <ul>
                  <li>
                    <strong>Dati di contatto:</strong> nome, indirizzo email,
                    sito web (opzionale), messaggio
                  </li>
                  <li>
                    <strong>Dati di navigazione:</strong> indirizzo IP, tipo di
                    browser, sistema operativo, pagine visitate
                  </li>
                  <li>
                    <strong>Cookie:</strong> cookie tecnici e, previo consenso,
                    cookie analitici
                  </li>
                </ul>

                <h2>3. Finalità del Trattamento</h2>
                <p>
                  I tuoi dati personali sono trattati per le seguenti finalità:
                </p>
                <ul>
                  <li>
                    Rispondere alle richieste inviate tramite il modulo di
                    contatto
                  </li>
                  <li>Gestire la prenotazione di appuntamenti</li>
                  <li>Migliorare l'esperienza di navigazione sul sito</li>
                  <li>Adempiere agli obblighi di legge</li>
                </ul>

                <h2>4. Base Giuridica del Trattamento</h2>
                <p>Il trattamento dei tuoi dati personali si basa su:</p>
                <ul>
                  <li>
                    <strong>Consenso:</strong> per l'invio di comunicazioni e
                    l'utilizzo di cookie non tecnici
                  </li>
                  <li>
                    <strong>Esecuzione di un contratto:</strong> per rispondere
                    alle richieste di servizi
                  </li>
                  <li>
                    <strong>Legittimo interesse:</strong> per garantire la
                    sicurezza del sito
                  </li>
                </ul>

                <h2>5. Periodo di Conservazione</h2>
                <p>
                  I dati raccolti tramite il modulo di contatto vengono
                  conservati per il tempo necessario a rispondere alla richiesta
                  e successivamente per un periodo massimo di 24 mesi.
                </p>

                <h2>6. Condivisione dei Dati</h2>
                <p>
                  I tuoi dati personali non vengono venduti a terzi. Possono
                  essere condivisi con:
                </p>
                <ul>
                  <li>Fornitori di servizi tecnici (hosting, email)</li>
                  <li>Autorità competenti, se richiesto dalla legge</li>
                </ul>

                <h2>7. Diritti dell'Interessato</h2>
                <p>Ai sensi del GDPR, hai diritto a:</p>
                <ul>
                  <li>Accedere ai tuoi dati personali</li>
                  <li>Rettificare dati inesatti</li>
                  <li>Cancellare i tuoi dati ("diritto all'oblio")</li>
                  <li>Limitare il trattamento</li>
                  <li>Portabilità dei dati</li>
                  <li>Opporti al trattamento</li>
                  <li>Revocare il consenso in qualsiasi momento</li>
                </ul>
                <p>
                  Per esercitare questi diritti, contattaci all'indirizzo:
                  dariomarcobellini@dimensione4.it
                </p>

                <h2>8. Sicurezza</h2>
                <p>
                  Adottiamo misure di sicurezza tecniche e organizzative
                  appropriate per proteggere i tuoi dati personali da accessi
                  non autorizzati, perdita o distruzione.
                </p>

                <h2>9. Modifiche alla Privacy Policy</h2>
                <p>
                  Ci riserviamo il diritto di modificare questa informativa. Le
                  modifiche saranno pubblicate su questa pagina con la data di
                  aggiornamento.
                </p>

                <h2>10. Contatti</h2>
                <p>
                  Per qualsiasi domanda relativa al trattamento dei tuoi dati
                  personali, puoi contattarci all'indirizzo:
                  dariomarcobellini@dimensione4.it
                </p>
              </>
            ) : (
              <>
                <h2>1. Data Controller</h2>
                <p>
                  The Data Controller is:
                  <br />
                  <strong>Dimensione4</strong>
                  <br />
                  VAT: IT04678930167
                  <br />
                  Email: dariomarcobellini@dimensione4.it
                </p>

                <h2>2. Types of Data Collected</h2>
                <p>Personal data collected through this website includes:</p>
                <ul>
                  <li>
                    <strong>Contact data:</strong> name, email address, website
                    (optional), message
                  </li>
                  <li>
                    <strong>Navigation data:</strong> IP address, browser type,
                    operating system, pages visited
                  </li>
                  <li>
                    <strong>Cookies:</strong> technical cookies and, with
                    consent, analytics cookies
                  </li>
                </ul>

                <h2>3. Purpose of Processing</h2>
                <p>
                  Your personal data is processed for the following purposes:
                </p>
                <ul>
                  <li>
                    Responding to inquiries submitted through the contact form
                  </li>
                  <li>Managing appointment bookings</li>
                  <li>Improving the browsing experience</li>
                  <li>Complying with legal obligations</li>
                </ul>

                <h2>4. Legal Basis for Processing</h2>
                <p>The processing of your personal data is based on:</p>
                <ul>
                  <li>
                    <strong>Consent:</strong> for sending communications and
                    using non-technical cookies
                  </li>
                  <li>
                    <strong>Contract performance:</strong> to respond to service
                    requests
                  </li>
                  <li>
                    <strong>Legitimate interest:</strong> to ensure website
                    security
                  </li>
                </ul>

                <h2>5. Retention Period</h2>
                <p>
                  Data collected through the contact form is retained for the
                  time necessary to respond to the request and subsequently for
                  a maximum period of 24 months.
                </p>

                <h2>6. Data Sharing</h2>
                <p>
                  Your personal data is not sold to third parties. It may be
                  shared with:
                </p>
                <ul>
                  <li>Technical service providers (hosting, email)</li>
                  <li>Competent authorities, if required by law</li>
                </ul>

                <h2>7. Your Rights</h2>
                <p>Under GDPR, you have the right to:</p>
                <ul>
                  <li>Access your personal data</li>
                  <li>Rectify inaccurate data</li>
                  <li>Delete your data ("right to be forgotten")</li>
                  <li>Restrict processing</li>
                  <li>Data portability</li>
                  <li>Object to processing</li>
                  <li>Withdraw consent at any time</li>
                </ul>
                <p>
                  To exercise these rights, contact us at:
                  dariomarcobellini@dimensione4.it
                </p>

                <h2>8. Security</h2>
                <p>
                  We implement appropriate technical and organizational security
                  measures to protect your personal data from unauthorized
                  access, loss, or destruction.
                </p>

                <h2>9. Changes to this Privacy Policy</h2>
                <p>
                  We reserve the right to modify this policy. Changes will be
                  published on this page with the update date.
                </p>

                <h2>10. Contact</h2>
                <p>
                  For any questions regarding the processing of your personal
                  data, you can contact us at: dariomarcobellini@dimensione4.it
                </p>
              </>
            )}
          </article>
        </div>
      </section>
    </Layout>
  );
}
