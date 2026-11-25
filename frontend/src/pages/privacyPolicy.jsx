import React from "react";
import {
  FiShield,
  FiLock,
  FiUser,
  FiShoppingBag,
  FiCreditCard,
  FiDatabase,
  FiGlobe,
  FiMail,
  FiCheckCircle,
  FiChevronRight,
  FiFileText,
} from "react-icons/fi";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#fff8f7] text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#b52330] mb-20">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-black/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/90">
            <FiShield />
            Your privacy matters
          </div>

          <div className="grid gap-12 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
            <div>
              <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Privacy Policy
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
                We believe shopping should feel secure and personal. This policy
                explains what information we collect, how we use it, and the
                choices you have when using our store.
              </p>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur">
              <div className="flex items-center gap-3 text-sm text-white/80">
                <FiFileText />
                Last updated: November 2, 2026
              </div>
              <p className="mt-4 text-sm leading-6 text-white/90">
                Please read this policy carefully to understand how your
                information is handled.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy highlights */}
      <section className="mx-auto -mt-8 max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-[#f0dedd] bg-white p-5 shadow-sm">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#b52330]/10 text-xl text-[#b52330]">
              <FiLock />
            </div>
            <h2 className="font-semibold">Secure by design</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              We use safeguards designed to protect your personal information.
            </p>
          </div>

          <div className="rounded-2xl border border-[#f0dedd] bg-white p-5 shadow-sm">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#b52330]/10 text-xl text-[#b52330]">
              <FiShoppingBag />
            </div>
            <h2 className="font-semibold">Shopping essentials</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              We use order details to process purchases and deliver products.
            </p>
          </div>

          <div className="rounded-2xl border border-[#f0dedd] bg-white p-5 shadow-sm">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#b52330]/10 text-xl text-[#b52330]">
              <FiUser />
            </div>
            <h2 className="font-semibold">Your choices</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              You can manage certain preferences and request access to your data.
            </p>
          </div>

          <div className="rounded-2xl border border-[#f0dedd] bg-white p-5 shadow-sm">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#b52330]/10 text-xl text-[#b52330]">
              <FiCreditCard />
            </div>
            <h2 className="font-semibold">Payment protection</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Payment information is handled by our payment service providers.
            </p>
          </div>
        </div>
      </section>

      {/* Policy content */}
      <main className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-12">
        {/* Sidebar */}
        <aside className="h-fit rounded-2xl border border-[#f0dedd] bg-white p-6 lg:sticky lg:top-8">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#b52330]">
            On this page
          </h2>

          <nav className="mt-5 space-y-1">
            <a href="#introduction" className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-slate-500 transition hover:bg-[#fff8f7] hover:text-[#b52330]">
              Introduction <FiChevronRight />
            </a>
            <a href="#information" className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-slate-500 transition hover:bg-[#fff8f7] hover:text-[#b52330]">
              Information We Collect <FiChevronRight />
            </a>
            <a href="#use" className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-slate-500 transition hover:bg-[#fff8f7] hover:text-[#b52330]">
              How We Use Information <FiChevronRight />
            </a>
            <a href="#orders" className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-slate-500 transition hover:bg-[#fff8f7] hover:text-[#b52330]">
              Orders & Payments <FiChevronRight />
            </a>
            <a href="#cookies" className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-slate-500 transition hover:bg-[#fff8f7] hover:text-[#b52330]">
              Cookies & Tracking <FiChevronRight />
            </a>
            <a href="#sharing" className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-slate-500 transition hover:bg-[#fff8f7] hover:text-[#b52330]">
              Sharing Information <FiChevronRight />
            </a>
            <a href="#rights" className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-slate-500 transition hover:bg-[#fff8f7] hover:text-[#b52330]">
              Your Privacy Rights <FiChevronRight />
            </a>
            <a href="#contact" className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-slate-500 transition hover:bg-[#fff8f7] hover:text-[#b52330]">
              Contact Us <FiChevronRight />
            </a>
          </nav>

          <div className="mt-8 rounded-xl bg-[#fff8f7] p-4">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <FiMail className="text-[#b52330]" />
              Have a question?
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Contact our privacy team for help with your information.
            </p>
            <a
              href="mailto:privacy@example.com"
              className="mt-3 inline-block text-sm font-semibold text-[#b52330] hover:underline"
            >
              privacy@example.com
            </a>
          </div>
        </aside>

        {/* Main policy */}
        <div className="space-y-6">
          <section id="introduction" className="scroll-mt-8 rounded-2xl border border-[#f0dedd] bg-white p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#b52330]/10 text-lg text-[#b52330]">
                <FiShield />
              </span>
              <h2 className="text-xl font-bold sm:text-2xl">1. Introduction</h2>
            </div>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-500 sm:text-base">
              <p>
                This Privacy Policy describes how [Your Store Name] (“we,” “us,”
                or “our”) collects, uses, stores, and shares personal information
                when you visit or make a purchase from [Your Website URL].
              </p>
              <p>
                By using our website, you acknowledge that you have read this
                policy. Where consent is required by applicable law, we will ask
                for it separately.
              </p>
            </div>
          </section>

          <section id="information" className="scroll-mt-8 rounded-2xl border border-[#f0dedd] bg-white p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#b52330]/10 text-lg text-[#b52330]">
                <FiDatabase />
              </span>
              <h2 className="text-xl font-bold sm:text-2xl">2. Information We Collect</h2>
            </div>
            <div className="mt-5 space-y-5 text-sm leading-7 text-slate-500 sm:text-base">
              <div>
                <h3 className="font-semibold text-slate-800">Information you provide</h3>
                <p>
                  This may include your name, email address, phone number,
                  billing and shipping addresses, account credentials, order
                  details, customer support messages, and product reviews.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Order and payment information</h3>
                <p>
                  We collect order items, purchase totals, delivery preferences,
                  and transaction status. Payment card details are generally
                  processed by our payment providers rather than stored on our
                  servers.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Device and usage information</h3>
                <p>
                  When you browse our store, we may collect your IP address,
                  browser type, device information, pages viewed, and interactions
                  with our website through cookies and similar technologies.
                </p>
              </div>
            </div>
          </section>

          <section id="use" className="scroll-mt-8 rounded-2xl border border-[#f0dedd] bg-white p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#b52330]/10 text-lg text-[#b52330]">
                <FiCheckCircle />
              </span>
              <h2 className="text-xl font-bold sm:text-2xl">3. How We Use Information</h2>
            </div>
            <p className="mt-5 text-sm leading-7 text-slate-500 sm:text-base">
              We may use your information to:
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-500 sm:text-base">
              <li className="flex gap-3"><FiCheckCircle className="mt-1 shrink-0 text-[#b52330]" /> Process orders, payments, returns, and refunds.</li>
              <li className="flex gap-3"><FiCheckCircle className="mt-1 shrink-0 text-[#b52330]" /> Create and manage customer accounts.</li>
              <li className="flex gap-3"><FiCheckCircle className="mt-1 shrink-0 text-[#b52330]" /> Arrange shipping and provide order updates.</li>
              <li className="flex gap-3"><FiCheckCircle className="mt-1 shrink-0 text-[#b52330]" /> Respond to questions and provide customer support.</li>
              <li className="flex gap-3"><FiCheckCircle className="mt-1 shrink-0 text-[#b52330]" /> Detect fraud, secure our services, and meet legal obligations.</li>
              <li className="flex gap-3"><FiCheckCircle className="mt-1 shrink-0 text-[#b52330]" /> Send marketing communications where permitted and according to your preferences.</li>
              <li className="flex gap-3"><FiCheckCircle className="mt-1 shrink-0 text-[#b52330]" /> Analyze and improve our products, services, and shopping experience.</li>
            </ul>
          </section>

          <section id="orders" className="scroll-mt-8 rounded-2xl border border-[#f0dedd] bg-white p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#b52330]/10 text-lg text-[#b52330]">
                <FiCreditCard />
              </span>
              <h2 className="text-xl font-bold sm:text-2xl">4. Orders & Payments</h2>
            </div>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-500 sm:text-base">
              <p>
                When you place an order, we use your information to confirm the
                purchase, process payment, prepare delivery, and communicate
                relevant order updates.
              </p>
              <p>
                Payments may be handled by third-party payment processors.
                Their collection and processing of payment information is
                governed by their own privacy policies and terms.
              </p>
              <p>
                We retain transaction and order records as needed for customer
                service, accounting, fraud prevention, and legal compliance.
              </p>
            </div>
          </section>

          <section id="cookies" className="scroll-mt-8 rounded-2xl border border-[#f0dedd] bg-white p-6 sm:p-8">
            <div className="flex items-center gap-3">
              {/* <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#b52330]/10 text-lg text-[#b52330]">
                <FiCookie />
              </span> */}
              <h2 className="text-xl font-bold sm:text-2xl">5. Cookies & Tracking</h2>
            </div>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-500 sm:text-base">
              <p>
                We may use cookies and similar technologies to keep your cart
                working, remember preferences, understand website usage, and
                support advertising or analytics.
              </p>
              <p>
                You can manage cookies through your browser settings. Disabling
                certain cookies may affect some store features. Where required,
                we will provide a consent mechanism for non-essential cookies.
              </p>
            </div>
          </section>

          <section id="sharing" className="scroll-mt-8 rounded-2xl border border-[#f0dedd] bg-white p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#b52330]/10 text-lg text-[#b52330]">
                <FiGlobe />
              </span>
              <h2 className="text-xl font-bold sm:text-2xl">6. Sharing Information</h2>
            </div>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-500 sm:text-base">
              <p>
                We may share personal information with service providers who
                help us operate our store, including payment processors,
                shipping partners, hosting providers, analytics services, and
                customer support tools.
              </p>
              <p>
                We may also disclose information when required by law, to
                protect our rights and users, or in connection with a business
                transfer such as a merger or acquisition.
              </p>
              <p>
                We do not sell personal information for money. If our use of
                advertising or analytics technologies is considered a “sale” or
                “sharing” under applicable privacy laws, we will provide any
                required notices and choices.
              </p>
            </div>
          </section>

          <section id="rights" className="scroll-mt-8 rounded-2xl border border-[#f0dedd] bg-white p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#b52330]/10 text-lg text-[#b52330]">
                <FiUser />
              </span>
              <h2 className="text-xl font-bold sm:text-2xl">7. Your Privacy Rights</h2>
            </div>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-500 sm:text-base">
              <p>
                Depending on where you live, you may have rights to access,
                correct, delete, or receive a copy of your personal information,
                or to object to or restrict certain processing.
              </p>
              <p>
                You may also opt out of marketing emails by using the
                unsubscribe link in those messages. To submit a privacy request,
                contact us using the details below. We may need to verify your
                identity before responding.
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-[#f0dedd] bg-white p-6 sm:p-8">
            <h2 className="text-xl font-bold sm:text-2xl">8. Data Security & Retention</h2>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-500 sm:text-base">
              <p>
                We use reasonable administrative, technical, and organizational
                measures to protect personal information. However, no method of
                transmission or storage is completely secure.
              </p>
              <p>
                We retain information for as long as necessary to provide our
                services, maintain business records, resolve disputes, prevent
                fraud, and comply with applicable laws.
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-[#f0dedd] bg-white p-6 sm:p-8">
            <h2 className="text-xl font-bold sm:text-2xl">9. Third-Party Links & Children’s Privacy</h2>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-500 sm:text-base">
              <p>
                Our website may contain links to third-party websites. We are
                not responsible for their privacy practices, so please review
                their policies separately.
              </p>
              <p>
                Our store is not intended for children under the age required
                by applicable law to provide consent to online data processing.
                We do not knowingly collect personal information from children
                without appropriate authorization.
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-[#f0dedd] bg-white p-6 sm:p-8">
            <h2 className="text-xl font-bold sm:text-2xl">10. Changes to This Policy</h2>
            <p className="mt-5 text-sm leading-7 text-slate-500 sm:text-base">
              We may update this Privacy Policy from time to time to reflect
              changes in our practices, services, or legal requirements. We will
              update the “Last updated” date when changes are made.
            </p>
          </section>

          {/* Contact */}
          <section id="contact" className="scroll-mt-8 overflow-hidden rounded-2xl bg-[#b52330] p-6 text-white sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-white/80">
                  <FiMail />
                  Privacy support
                </div>
                <h2 className="mt-3 text-2xl font-bold">Questions about your privacy?</h2>
                <p className="mt-3 max-w-xl text-sm leading-6 text-white/80">
                  Contact us if you have questions about this policy or want to
                  make a request concerning your personal information.
                </p>
              </div>
              <a
                href="mailto:privacy@example.com"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#b52330] transition hover:bg-[#fff8f7]"
              >
                Contact us <FiChevronRight />
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;