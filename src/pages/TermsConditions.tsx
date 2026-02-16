import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { ScrollText } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function TermsConditions() {
  const { t, i18n } = useTranslation();
  const isItalian = i18n.language === "it";

  return (
    <Layout enableSnap={false}>
      <SEO
        title={t("legal.termsConditions")}
        description={
          isItalian
            ? "Termini e Condizioni di Dimensione 4 di Dario Marco Bellini. Leggi le condizioni di utilizzo del sito."
            : "Terms and Conditions of Dimensione 4 di Dario Marco Bellini. Read the terms of use for the website."
        }
        canonical="/termini-condizioni"
      />

      <section className="section-padding pt-32">
        <div className="container-wide space-y-6 md:space-y-8">
          <div className="surface-card p-6 md:p-10 max-w-5xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
                <ScrollText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight">
                  {t("legal.termsConditions")}
                </h1>
                <p className="mt-3 text-sm md:text-base text-muted-foreground">
                  {isItalian
                    ? "Condizioni di utilizzo del sito e dei servizi Dimensione 4 di Dario Marco Bellini."
                    : "Terms of use for the website and Dimensione 4 di Dario Marco Bellini services."}
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

            <div className="max-w-none text-base leading-relaxed text-foreground/90 [&>h2]:font-display [&>h2]:text-primary [&>h2]:text-2xl [&>h2]:mt-12 [&>h2]:mb-4 [&>h2]:pt-6 [&>h2]:border-t [&>h2]:border-border/60 [&>h3]:font-display [&>h3]:text-xl [&>h3]:text-primary/90 [&>h3]:mt-8 [&>h3]:mb-3 [&>p]:mb-4 [&>ul]:mb-6 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&_strong]:text-foreground [&_a]:text-primary hover:[&_a]:text-primary/80">
              {isItalian ? (
                <>
                  <h2>1. Descrizione del servizio</h2>
                  <p>
                    Dimensione 4 di Dario Marco Bellini offre un servizio di
                    sviluppo web in abbonamento. Il servizio è organizzato in
                    modalita asincrona: dopo il pagamento ricevi una email con
                    il link di onboarding, fornisci accesso agli strumenti di
                    lavoro (es. Slack, Linear, GitHub) e assegni le attivita
                    tramite issue o task.
                  </p>
                  <p>
                    Le comunicazioni avvengono principalmente in forma scritta
                    asincrona; le call sincrone vengono usate solo quando
                    necessarie.
                  </p>

                  <h2>2. Piani di abbonamento</h2>
                  <ul>
                    <li>Mensile: € 2.800 / mese</li>
                    <li>Settimanale: € 800 / settimana</li>
                    <li>Consulenza: € 100 / ora</li>
                  </ul>
                  <p>
                    Tutti i prezzi indicati possono essere aggiornati in futuro.
                  </p>

                  <h2>3. Modalita operative</h2>
                  <p>
                    Il lavoro viene svolto dal lunedi al venerdi, senza orari
                    fissi. Sabato e domenica sono considerati giorni di
                    calendario e vengono conteggiati nel periodo di abbonamento,
                    anche senza lavoro attivo.
                  </p>

                  <h2>4. Pagamenti</h2>
                  <p>
                    Il pagamento avviene in modalita anticipata e ricorrente
                    tramite bonifico. L'abbonamento si rinnova automaticamente a
                    ogni ciclo, salvo disdetta da parte del cliente. Un
                    promemoria di rinnovo viene inviato via email 3 giorni
                    prima.
                  </p>

                  <h2>5. Sospensione e riattivazione</h2>
                  <p>
                    Il cliente può mettere in pausa l'abbonamento in qualsiasi
                    momento. I giorni rimanenti vengono congelati e possono
                    essere riutilizzati riattivando entro 60 giorni dalla data
                    di pausa.
                  </p>
                  <p>
                    Esempio: pausa il 15 settembre con 15 giorni residui;
                    riattivazione possibile fino al 15 novembre. Superati 60
                    giorni, i giorni residui decadono.
                  </p>

                  <h2>6. Diritto di recesso</h2>
                  <p>
                    Il cliente può interrompere l'abbonamento in qualsiasi
                    momento, anche in giornata. Se è Dimensione 4 di Dario Marco
                    Bellini a decidere di non proseguire la collaborazione su
                    piano mensile, viene fornito un preavviso minimo di 2
                    settimane prima del rinnovo successivo.
                  </p>

                  <h2>7. Rimborso</h2>
                  <p>
                    Piano mensile: è prevista 1 settimana di prova con rimborso
                    totale se il cliente non è soddisfatto del valore ricevuto.
                  </p>
                  <p>
                    Piano settimanale: al termine di ogni settimana, se il
                    cliente non è soddisfatto del lavoro, è previsto rimborso
                    totale della settimana.
                  </p>
                  <p>
                    Il rimborso è subordinato alla cessazione d'uso e alla
                    restituzione/eliminazione del materiale riservato ricevuto
                    durante la collaborazione, quando applicabile.
                  </p>

                  <h2>8. Proprieta intellettuale</h2>
                  <p>
                    I materiali creati e consegnati diventano di proprietà del
                    cliente al momento della consegna finale, salvo diversa
                    indicazione contrattuale.
                  </p>
                  <p>
                    Dimensione 4 di Dario Marco Bellini si riserva il diritto di
                    mostrare i lavori a scopo portfolio e promozionale, salvo
                    richiesta scritta contraria del cliente.
                  </p>

                  <h2>9. Limitazione di responsabilità</h2>
                  <p>
                    Dimensione 4 di Dario Marco Bellini non è responsabile per
                    eventuali danni diretti o indiretti derivanti dall'uso dei
                    servizi. In ogni caso, la responsabilità massima e limitata
                    all'importo effettivamente pagato per l'abbonamento in
                    corso.
                  </p>

                  <h2>10. Legge applicabile e foro competente</h2>
                  <p>
                    I presenti termini sono regolati dalla legge italiana. Per
                    ogni controversia è competente in via esclusiva il Foro di
                    Bergamo, salvo diversa previsione inderogabile a tutela del
                    consumatore.
                  </p>

                  <h2>11. Trattamento dei dati personali</h2>
                  <p>
                    Il trattamento dei dati personali avviene in conformita al
                    GDPR (Regolamento UE 2016/679). Maggiori informazioni sono
                    disponibili nella Privacy Policy.
                  </p>

                  <h2>12. Modifiche ai termini</h2>
                  <p>
                    Dimensione 4 di Dario Marco Bellini si riserva il diritto di
                    modificare in qualsiasi momento i presenti termini. Le
                    modifiche saranno comunicate via email e/o pubblicate sul
                    sito.
                  </p>

                  <h2>13. Contatti</h2>
                  <p>
                    Per domande sui termini di servizio:{" "}
                    dariomarcobellini@dimensione4.it
                  </p>
                </>
              ) : (
                <>
                  <h2>1. Service description</h2>
                  <p>
                    Dimensione 4 di Dario Marco Bellini provides
                    subscription-based web development services. The service is
                    asynchronous: once payment is completed, you receive an
                    onboarding email and can provide access to your tools (e.g.
                    Slack, Linear, GitHub), then assign work through issues or
                    tasks.
                  </p>
                  <p>
                    Communication is mainly async and written. Live calls are
                    used only when necessary.
                  </p>

                  <h2>2. Subscription plans</h2>
                  <ul>
                    <li>Monthly: € 2,800 / month</li>
                    <li>Weekly: € 800 / week</li>
                    <li>Consulting: € 100 / hour</li>
                  </ul>
                  <p>All listed prices may be updated in the future.</p>

                  <h2>3. Operating model</h2>
                  <p>
                    Work is delivered Monday to Friday, with no fixed daily
                    schedule. Saturday and Sunday are considered calendar days
                    and are counted within the subscription period, even when no
                    active delivery happens on those days.
                  </p>

                  <h2>4. Payments</h2>
                  <p>
                    Payments are made in advance via bank transfer and recur at
                    each cycle unless cancelled. A renewal reminder is sent by
                    email 3 days before renewal.
                  </p>

                  <h2>5. Pause and reactivation</h2>
                  <p>
                    The client can pause the subscription at any time. Remaining
                    days are frozen and can be reused by reactivating within 60
                    days from the pause date.
                  </p>
                  <p>
                    Example: paused on September 15 with 15 days left; those
                    days can be reused until November 15. After 60 days,
                    remaining days expire.
                  </p>

                  <h2>6. Cancellation rights</h2>
                  <p>
                    The client can cancel the subscription at any time,
                    including the same day. If Dimensione 4 di Dario Marco
                    Bellini decides not to continue a monthly collaboration, a
                    minimum 2-week notice is provided before the next renewal
                    date.
                  </p>

                  <h2>7. Refund policy</h2>
                  <p>
                    Monthly plan: full refund available within the first week if
                    the client is not satisfied with the value received.
                  </p>
                  <p>
                    Weekly plan: at the end of each week, if the client is not
                    satisfied with the work delivered, a full refund for that
                    week is available.
                  </p>
                  <p>
                    Refunds require discontinuation of use and return/removal of
                    confidential material provided during the collaboration,
                    where applicable.
                  </p>

                  <h2>8. Intellectual property</h2>
                  <p>
                    All materials created and delivered become the client's
                    property at final delivery, unless otherwise specified by
                    contract.
                  </p>
                  <p>
                    Dimensione 4 di Dario Marco Bellini retains the right to
                    showcase completed work for portfolio and promotional
                    purposes unless the client requests otherwise in writing.
                  </p>

                  <h2>9. Limitation of liability</h2>
                  <p>
                    Dimensione 4 di Dario Marco Bellini is not liable for direct
                    or indirect damages arising from the use of the services. In
                    any case, maximum liability is limited to the amount
                    actually paid for the current subscription.
                  </p>

                  <h2>10. Governing law and jurisdiction</h2>
                  <p>
                    These terms are governed by Italian law. Any dispute falls
                    under the exclusive jurisdiction of the Court of Bergamo,
                    unless mandatory consumer protection rules provide
                    otherwise.
                  </p>

                  <h2>11. Personal data processing</h2>
                  <p>
                    Personal data is processed in compliance with GDPR (EU
                    Regulation 2016/679). More details are available in the
                    Privacy Policy.
                  </p>

                  <h2>12. Changes to terms</h2>
                  <p>
                    Dimensione 4 di Dario Marco Bellini reserves the right to
                    update these terms at any time. Changes will be communicated
                    via email and/or published on the website.
                  </p>

                  <h2>13. Contact</h2>
                  <p>
                    For any question about these terms:{" "}
                    dariomarcobellini@dimensione4.it
                  </p>
                </>
              )}
            </div>
          </article>
        </div>
      </section>
    </Layout>
  );
}
