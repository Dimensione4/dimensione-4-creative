import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { useTranslation } from "react-i18next";

export default function TermsConditions() {
  const { t, i18n } = useTranslation();
  const isItalian = i18n.language === "it";

  return (
    <Layout>
      <SEO 
        title={t("legal.termsConditions")}
        description={isItalian ? "Termini e Condizioni di Dimensione4. Leggi le condizioni di utilizzo del sito." : "Terms and Conditions of Dimensione4. Read the terms of use for the website."}
        canonical="/termini-condizioni"
      />
      
      <section className="section-padding pt-32">
        <div className="container-tight">
          <article className="prose prose-lg dark:prose-invert max-w-none">
            <h1 className="font-display text-hero-mobile md:text-[3rem] font-bold mb-8">
              {t("legal.termsConditions")}
            </h1>
            
            <p className="text-muted-foreground mb-8">
              {isItalian ? "Ultimo aggiornamento: Gennaio 2026" : "Last updated: January 2026"}
            </p>

            {isItalian ? (
              <>
                <h2>1. Informazioni Generali</h2>
                <p>
                  Il presente sito web è gestito da:<br />
                  <strong>Dimensione4</strong><br />
                  P.IVA: 04678930167<br />
                  Email: info@dimensione4.it
                </p>
                <p>
                  L'utilizzo di questo sito web implica l'accettazione integrale 
                  dei presenti Termini e Condizioni.
                </p>

                <h2>2. Servizi Offerti</h2>
                <p>
                  Dimensione4 offre servizi di consulenza e sviluppo web, tra cui:
                </p>
                <ul>
                  <li>Sviluppo di applicazioni web e MVP</li>
                  <li>Consulenza tecnica e strategica</li>
                  <li>Supporto e manutenzione</li>
                  <li>Servizi in abbonamento</li>
                </ul>
                <p>
                  Le specifiche condizioni dei servizi sono definite in accordi 
                  separati stipulati con ciascun cliente.
                </p>

                <h2>3. Proprietà Intellettuale</h2>
                <p>
                  Tutti i contenuti presenti su questo sito (testi, immagini, loghi, grafica, 
                  codice sorgente) sono protetti da diritto d'autore e sono di proprietà 
                  di Dimensione4 o dei rispettivi titolari.
                </p>
                <p>
                  È vietata la riproduzione, distribuzione o modifica dei contenuti 
                  senza autorizzazione scritta.
                </p>

                <h2>4. Limitazione di Responsabilità</h2>
                <p>
                  Dimensione4 si impegna a mantenere il sito aggiornato e funzionante, 
                  tuttavia non garantisce:
                </p>
                <ul>
                  <li>La disponibilità continua e ininterrotta del sito</li>
                  <li>L'assenza di errori o virus</li>
                  <li>L'accuratezza o completezza delle informazioni</li>
                </ul>
                <p>
                  L'uso del sito avviene a proprio rischio e pericolo.
                </p>

                <h2>5. Link a Siti Esterni</h2>
                <p>
                  Questo sito può contenere link a siti web esterni. Dimensione4 non è 
                  responsabile del contenuto o delle pratiche sulla privacy di tali siti.
                </p>

                <h2>6. Modulo di Contatto</h2>
                <p>
                  Utilizzando il modulo di contatto, l'utente garantisce che le informazioni 
                  fornite sono veritiere e si impegna a non utilizzare il servizio per:
                </p>
                <ul>
                  <li>Inviare contenuti illegali, diffamatori o offensivi</li>
                  <li>Attività di spam o phishing</li>
                  <li>Qualsiasi attività contraria alla legge</li>
                </ul>

                <h2>7. Prenotazione Appuntamenti</h2>
                <p>
                  Le prenotazioni effettuate tramite il sistema integrato (Calendly) sono 
                  soggette alle condizioni del servizio di prenotazione. Dimensione4 si 
                  riserva il diritto di annullare o riprogrammare appuntamenti con 
                  ragionevole preavviso.
                </p>

                <h2>8. Modifiche ai Termini</h2>
                <p>
                  Dimensione4 si riserva il diritto di modificare questi Termini e Condizioni 
                  in qualsiasi momento. Le modifiche saranno efficaci dalla data di 
                  pubblicazione su questa pagina.
                </p>

                <h2>9. Legge Applicabile e Foro Competente</h2>
                <p>
                  I presenti Termini e Condizioni sono regolati dalla legge italiana. 
                  Per qualsiasi controversia sarà competente il Foro del luogo di 
                  residenza del consumatore, ove applicabile, o in alternativa 
                  il Foro di Bergamo.
                </p>

                <h2>10. Contatti</h2>
                <p>
                  Per qualsiasi domanda relativa a questi Termini e Condizioni, 
                  contattaci all'indirizzo: info@dimensione4.it
                </p>
              </>
            ) : (
              <>
                <h2>1. General Information</h2>
                <p>
                  This website is operated by:<br />
                  <strong>Dimensione4</strong><br />
                  VAT: IT04678930167<br />
                  Email: info@dimensione4.it
                </p>
                <p>
                  Use of this website implies full acceptance 
                  of these Terms and Conditions.
                </p>

                <h2>2. Services Offered</h2>
                <p>
                  Dimensione4 offers web consulting and development services, including:
                </p>
                <ul>
                  <li>Web application and MVP development</li>
                  <li>Technical and strategic consulting</li>
                  <li>Support and maintenance</li>
                  <li>Subscription services</li>
                </ul>
                <p>
                  Specific service conditions are defined in separate agreements 
                  with each client.
                </p>

                <h2>3. Intellectual Property</h2>
                <p>
                  All content on this site (text, images, logos, graphics, 
                  source code) is protected by copyright and is owned by 
                  Dimensione4 or respective owners.
                </p>
                <p>
                  Reproduction, distribution, or modification of content 
                  without written authorization is prohibited.
                </p>

                <h2>4. Limitation of Liability</h2>
                <p>
                  Dimensione4 strives to keep the site updated and functioning, 
                  however does not guarantee:
                </p>
                <ul>
                  <li>Continuous and uninterrupted availability of the site</li>
                  <li>Absence of errors or viruses</li>
                  <li>Accuracy or completeness of information</li>
                </ul>
                <p>
                  Use of the site is at your own risk.
                </p>

                <h2>5. External Links</h2>
                <p>
                  This site may contain links to external websites. Dimensione4 is not 
                  responsible for the content or privacy practices of such sites.
                </p>

                <h2>6. Contact Form</h2>
                <p>
                  By using the contact form, users guarantee that the information 
                  provided is truthful and commit not to use the service for:
                </p>
                <ul>
                  <li>Sending illegal, defamatory, or offensive content</li>
                  <li>Spam or phishing activities</li>
                  <li>Any activity contrary to the law</li>
                </ul>

                <h2>7. Appointment Booking</h2>
                <p>
                  Bookings made through the integrated system (Calendly) are 
                  subject to the booking service conditions. Dimensione4 reserves 
                  the right to cancel or reschedule appointments with 
                  reasonable notice.
                </p>

                <h2>8. Changes to Terms</h2>
                <p>
                  Dimensione4 reserves the right to modify these Terms and Conditions 
                  at any time. Changes will be effective from the date of 
                  publication on this page.
                </p>

                <h2>9. Applicable Law and Jurisdiction</h2>
                <p>
                  These Terms and Conditions are governed by Italian law. 
                  For any dispute, the competent court shall be that of the 
                  consumer's place of residence, where applicable, or alternatively 
                  the Court of Bergamo.
                </p>

                <h2>10. Contact</h2>
                <p>
                  For any questions about these Terms and Conditions, 
                  contact us at: info@dimensione4.it
                </p>
              </>
            )}
          </article>
        </div>
      </section>
    </Layout>
  );
}
