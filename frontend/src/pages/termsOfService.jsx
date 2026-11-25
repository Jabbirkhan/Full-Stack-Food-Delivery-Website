import React from 'react';
import {
  FiShoppingBag,
  FiFileText,
  FiShield,
  FiCreditCard,
  FiTruck,
  FiRefreshCw,
  FiUser,
  FiAlertCircle,
  FiGlobe,
  FiMail,
  FiCheckCircle,
  FiArrowUpRight,
  FiChevronRight,
  FiLock,
  FiPackage,
  FiCalendar,
  FiInfo
} from 'react-icons/fi';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-[#fff8f7] text-gray-800">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#b52330] px-5 py-20 text-white sm:px-8 lg:py-28">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-black/10 blur-3xl"></div>

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-2xl">
              <FiShoppingBag />
            </div>
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
              Customer Information
            </span>
          </div>

          <div className="max-w-3xl">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium">
              <FiFileText />
              Terms & Conditions
            </span>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-7xl">
              Terms of <span className="text-white/70">Service.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
              Welcome to our store. These terms explain the rules and conditions
              that apply when you browse our website, create an account, or
              purchase products from us.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4 text-sm text-white/80">
              <span className="flex items-center gap-2">
                <FiCalendar />
                Last Updated: November 2, 2026
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-white/60 sm:block"></span>
              <span className="flex items-center gap-2">
                <FiShield />
                Customer Agreement
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="px-5 pt-14 sm:px-8 lg:pt-20">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl border border-[#b52330]/10 bg-white p-7 shadow-sm sm:p-10 lg:p-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#b52330]/10 text-2xl text-[#b52330]">
                <FiInfo />
              </div>

              <div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  Please read these terms carefully
                </h2>
                <p className="mt-4 text-sm leading-8 text-gray-600 sm:text-base">
                  These Terms of Service govern your access to and use of
                  <strong className="text-[#b52330]"> [Your Store Name] </strong>
                  and its website, products, and services. By accessing our
                  website or placing an order, you agree to be bound by these
                  terms. If you do not agree with any part of these terms,
                  please do not use our website or services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-5 py-14 sm:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[280px_1fr] lg:gap-14">

          {/* Sidebar */}
          <aside className="h-fit lg:sticky lg:top-8">
            <div className="rounded-3xl border border-[#b52330]/10 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900">
                On this page
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Explore our terms and conditions.
              </p>

              <nav className="mt-6 space-y-1">
                <a href="#acceptance" className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-gray-600 transition hover:bg-[#fff8f7] hover:text-[#b52330]">
                  Acceptance of Terms <FiChevronRight />
                </a>
                <a href="#eligibility" className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-gray-600 transition hover:bg-[#fff8f7] hover:text-[#b52330]">
                  Eligibility & Accounts <FiChevronRight />
                </a>
                <a href="#products" className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-gray-600 transition hover:bg-[#fff8f7] hover:text-[#b52330]">
                  Products & Pricing <FiChevronRight />
                </a>
                <a href="#orders" className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-gray-600 transition hover:bg-[#fff8f7] hover:text-[#b52330]">
                  Orders & Payments <FiChevronRight />
                </a>
                <a href="#shipping" className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-gray-600 transition hover:bg-[#fff8f7] hover:text-[#b52330]">
                  Shipping & Delivery <FiChevronRight />
                </a>
                <a href="#returns" className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-gray-600 transition hover:bg-[#fff8f7] hover:text-[#b52330]">
                  Returns & Refunds <FiChevronRight />
                </a>
                <a href="#prohibited" className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-gray-600 transition hover:bg-[#fff8f7] hover:text-[#b52330]">
                  Prohibited Activities <FiChevronRight />
                </a>
                <a href="#liability" className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-gray-600 transition hover:bg-[#fff8f7] hover:text-[#b52330]">
                  Liability & Disclaimer <FiChevronRight />
                </a>
                <a href="#changes" className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-gray-600 transition hover:bg-[#fff8f7] hover:text-[#b52330]">
                  Changes to Terms <FiChevronRight />
                </a>
                <a href="#contact" className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-gray-600 transition hover:bg-[#fff8f7] hover:text-[#b52330]">
                  Contact Us <FiChevronRight />
                </a>
              </nav>

              <div className="mt-7 rounded-2xl bg-[#fff8f7] p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#b52330] text-lg text-white">
                  <FiMail />
                </div>
                <h4 className="mt-4 font-bold text-gray-900">
                  Need assistance?
                </h4>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Contact our support team if you have questions about these terms.
                </p>
                <a href="mailto:support@yourstore.com" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#b52330] hover:underline">
                  Contact Support <FiArrowUpRight />
                </a>
              </div>
            </div>
          </aside>

          {/* Terms Content */}
          <div className="space-y-6">

            {/* Section 1 */}
            <section id="acceptance" className="scroll-mt-8 rounded-3xl border border-[#b52330]/10 bg-white p-7 shadow-sm sm:p-9">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#b52330]/10 text-xl text-[#b52330]">
                  <FiFileText />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#b52330]">01 / General</span>
                  <h2 className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
                    Acceptance of Terms
                  </h2>
                </div>
              </div>

              <div className="mt-6 space-y-4 text-sm leading-8 text-gray-600 sm:text-base">
                <p>
                  By visiting, browsing, registering on, or making a purchase
                  through our website, you acknowledge that you have read,
                  understood, and agreed to these Terms of Service.
                </p>
                <p>
                  These terms apply to all visitors, customers, registered
                  users, and anyone who accesses or uses our services.
                </p>
                <p>
                  We reserve the right to update or modify these terms when
                  necessary. Your continued use of the website after changes
                  are published constitutes acceptance of the updated terms.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section id="eligibility" className="scroll-mt-8 rounded-3xl border border-[#b52330]/10 bg-white p-7 shadow-sm sm:p-9">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#b52330]/10 text-xl text-[#b52330]">
                  <FiUser />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#b52330]">02 / Account</span>
                  <h2 className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
                    Eligibility & User Accounts
                  </h2>
                </div>
              </div>

              <div className="mt-6 space-y-4 text-sm leading-8 text-gray-600 sm:text-base">
                <p>
                  To use certain features of our website, you may need to create
                  an account and provide accurate, complete, and current
                  information.
                </p>
                <p>You agree to:</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <FiCheckCircle className="mt-1 shrink-0 text-[#b52330]" />
                    Provide truthful and accurate registration information.
                  </li>
                  <li className="flex items-start gap-3">
                    <FiCheckCircle className="mt-1 shrink-0 text-[#b52330]" />
                    Keep your account credentials confidential.
                  </li>
                  <li className="flex items-start gap-3">
                    <FiCheckCircle className="mt-1 shrink-0 text-[#b52330]" />
                    Notify us promptly if you suspect unauthorized access.
                  </li>
                  <li className="flex items-start gap-3">
                    <FiCheckCircle className="mt-1 shrink-0 text-[#b52330]" />
                    Take responsibility for activities performed through your account.
                  </li>
                </ul>
                <p>
                  We reserve the right to suspend or terminate accounts that
                  violate these terms, provide false information, or engage in
                  fraudulent activities.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section id="products" className="scroll-mt-8 rounded-3xl border border-[#b52330]/10 bg-white p-7 shadow-sm sm:p-9">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#b52330]/10 text-xl text-[#b52330]">
                  <FiPackage />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#b52330]">03 / Store</span>
                  <h2 className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
                    Products, Descriptions & Pricing
                  </h2>
                </div>
              </div>

              <div className="mt-6 space-y-4 text-sm leading-8 text-gray-600 sm:text-base">
                <p>
                  We make reasonable efforts to display product descriptions,
                  images, specifications, availability, and prices accurately.
                  However, we do not guarantee that all website content will
                  always be complete, current, or error-free.
                </p>
                <p>
                  Product colors and appearance may vary depending on your
                  device display and screen settings.
                </p>
                <p>
                  Prices, promotions, discounts, and product availability may
                  change without prior notice. We reserve the right to correct
                  pricing errors and discontinue products at any time.
                </p>
                <p>
                  If a product is listed with an incorrect price or description
                  due to an error, we may contact you to confirm the correct
                  information or cancel the affected order.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section id="orders" className="scroll-mt-8 rounded-3xl border border-[#b52330]/10 bg-white p-7 shadow-sm sm:p-9">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#b52330]/10 text-xl text-[#b52330]">
                  <FiCreditCard />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#b52330]">04 / Purchase</span>
                  <h2 className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
                    Orders & Payments
                  </h2>
                </div>
              </div>

              <div className="mt-6 space-y-4 text-sm leading-8 text-gray-600 sm:text-base">
                <p>
                  When placing an order, you agree to provide accurate billing,
                  shipping, and contact information. Please review your order
                  carefully before submitting it.
                </p>
                <p>
                  An order confirmation does not necessarily mean that your
                  order has been accepted. We reserve the right to reject,
                  cancel, or limit orders for reasons including product
                  unavailability, payment issues, suspected fraud, or pricing
                  errors.
                </p>
                <p>
                  We may offer different payment methods, including credit or
                  debit cards, online payment gateways, and cash on delivery,
                  where available.
                </p>
                <p>
                  Payments processed through third-party payment providers are
                  also subject to their respective terms and privacy policies.
                  We do not store complete payment card details unless expressly
                  stated in our applicable payment arrangements.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section id="shipping" className="scroll-mt-8 rounded-3xl border border-[#b52330]/10 bg-white p-7 shadow-sm sm:p-9">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#b52330]/10 text-xl text-[#b52330]">
                  <FiTruck />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#b52330]">05 / Delivery</span>
                  <h2 className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
                    Shipping & Delivery
                  </h2>
                </div>
              </div>

              <div className="mt-6 space-y-4 text-sm leading-8 text-gray-600 sm:text-base">
                <p>
                  We aim to process and deliver orders within the estimated
                  timeframes displayed during checkout or communicated to you
                  after purchase.
                </p>
                <p>
                  Delivery estimates are not guaranteed. Delays may occur due
                  to courier services, weather conditions, public holidays,
                  customs procedures, incorrect addresses, or circumstances
                  beyond our reasonable control.
                </p>
                <p>
                  Customers are responsible for providing a complete and
                  accurate delivery address and contact number. Additional
                  delivery charges may apply where applicable.
                </p>
                <p>
                  Risk of loss and ownership of products will transfer in
                  accordance with applicable law and the delivery arrangements
                  for your order.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section id="returns" className="scroll-mt-8 rounded-3xl border border-[#b52330]/10 bg-white p-7 shadow-sm sm:p-9">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#b52330]/10 text-xl text-[#b52330]">
                  <FiRefreshCw />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#b52330]">06 / Customer Care</span>
                  <h2 className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
                    Returns, Exchanges & Refunds
                  </h2>
                </div>
              </div>

              <div className="mt-6 space-y-4 text-sm leading-8 text-gray-600 sm:text-base">
                <p>
                  Our returns, exchanges, and refund procedures are governed
                  by our separate Return and Refund Policy, where available.
                  Please review that policy before making a purchase.
                </p>
                <p>
                  Products may need to meet certain conditions to qualify for
                  a return or exchange, such as being unused, undamaged, and
                  returned with original packaging and proof of purchase.
                </p>
                <p>
                  Some products may be excluded from returns where permitted
                  by applicable law. Any applicable refund will be processed
                  using the original payment method or another agreed method.
                </p>
                <p>
                  Nothing in these terms limits any consumer rights that
                  cannot legally be excluded.
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section id="prohibited" className="scroll-mt-8 rounded-3xl border border-[#b52330]/10 bg-white p-7 shadow-sm sm:p-9">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#b52330]/10 text-xl text-[#b52330]">
                  <FiAlertCircle />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#b52330]">07 / Website Use</span>
                  <h2 className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
                    Prohibited Activities
                  </h2>
                </div>
              </div>

              <div className="mt-6 space-y-4 text-sm leading-8 text-gray-600 sm:text-base">
                <p>You agree not to:</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <FiAlertCircle className="mt-1 shrink-0 text-[#b52330]" />
                    Use our website for unlawful, fraudulent, or unauthorized purposes.
                  </li>
                  <li className="flex items-start gap-3">
                    <FiAlertCircle className="mt-1 shrink-0 text-[#b52330]" />
                    Attempt to gain unauthorized access to our systems or accounts.
                  </li>
                  <li className="flex items-start gap-3">
                    <FiAlertCircle className="mt-1 shrink-0 text-[#b52330]" />
                    Interfere with website functionality, security, or performance.
                  </li>
                  <li className="flex items-start gap-3">
                    <FiAlertCircle className="mt-1 shrink-0 text-[#b52330]" />
                    Submit false, misleading, or inaccurate information.
                  </li>
                  <li className="flex items-start gap-3">
                    <FiAlertCircle className="mt-1 shrink-0 text-[#b52330]" />
                    Copy, reproduce, or exploit website content without permission.
                  </li>
                  <li className="flex items-start gap-3">
                    <FiAlertCircle className="mt-1 shrink-0 text-[#b52330]" />
                    Use automated tools to access or collect website data without authorization.
                  </li>
                </ul>
                <p>
                  We may restrict or terminate access to our website if we
                  reasonably believe that a user has violated these rules.
                </p>
              </div>
            </section>

            {/* Section 8 */}
            <section id="liability" className="scroll-mt-8 rounded-3xl border border-[#b52330]/10 bg-white p-7 shadow-sm sm:p-9">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#b52330]/10 text-xl text-[#b52330]">
                  <FiShield />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#b52330]">08 / Legal</span>
                  <h2 className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
                    Disclaimer & Limitation of Liability
                  </h2>
                </div>
              </div>

              <div className="mt-6 space-y-4 text-sm leading-8 text-gray-600 sm:text-base">
                <p>
                  Our website and services are provided on an "as available"
                  basis, subject to applicable law. We make reasonable efforts
                  to maintain website availability and accuracy, but do not
                  guarantee uninterrupted or error-free access.
                </p>
                <p>
                  To the extent permitted by applicable law, we will not be
                  liable for indirect, incidental, special, or consequential
                  losses arising from your use of the website or inability to
                  access our services.
                </p>
                <p>
                  Nothing in these terms excludes or limits liability that
                  cannot legally be excluded or limited under applicable law.
                </p>
              </div>
            </section>

            {/* Section 9 */}
            <section id="changes" className="scroll-mt-8 rounded-3xl border border-[#b52330]/10 bg-white p-7 shadow-sm sm:p-9">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#b52330]/10 text-xl text-[#b52330]">
                  <FiGlobe />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#b52330]">09 / Updates</span>
                  <h2 className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
                    Changes to These Terms
                  </h2>
                </div>
              </div>

              <div className="mt-6 space-y-4 text-sm leading-8 text-gray-600 sm:text-base">
                <p>
                  We may revise these Terms of Service from time to time to
                  reflect changes in our business, website features, services,
                  or legal requirements.
                </p>
                <p>
                  Updated terms will be published on this page with a revised
                  "Last Updated" date. We encourage you to review this page
                  periodically to stay informed.
                </p>
              </div>
            </section>

            {/* Section 10 */}
            <section id="contact" className="scroll-mt-8 rounded-3xl border border-[#b52330]/10 bg-white p-7 shadow-sm sm:p-9">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#b52330]/10 text-xl text-[#b52330]">
                  <FiMail />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#b52330]">10 / Support</span>
                  <h2 className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
                    Contact Information
                  </h2>
                </div>
              </div>

              <p className="mt-6 text-sm leading-8 text-gray-600 sm:text-base">
                If you have questions, concerns, or requests regarding these
                Terms of Service, please contact our support team using the
                information below.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-[#fff8f7] p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#b52330] text-lg text-white">
                    <FiMail />
                  </div>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Email Support
                  </p>
                  <a href="mailto:support@yourstore.com" className="mt-2 block break-all font-bold text-[#b52330] hover:underline">
                    support@yourstore.com
                  </a>
                </div>

                <div className="rounded-2xl bg-[#fff8f7] p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#b52330] text-lg text-white">
                    <FiGlobe />
                  </div>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Website
                  </p>
                  <a href="https://www.yourstore.com" target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 font-bold text-[#b52330] hover:underline">
                    www.yourstore.com <FiArrowUpRight />
                  </a>
                </div>
              </div>
            </section>

            {/* Final Notice */}
            <div className="rounded-3xl bg-[#b52330] p-7 text-white sm:p-9">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-2xl">
                  <FiLock />
                </div>
                <div>
                  <h3 className="text-xl font-bold sm:text-2xl">
                    Thank you for shopping with us.
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-white/80">
                    We appreciate your trust and look forward to providing you
                    with a reliable and convenient shopping experience.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      
    </div>
  );
};

export default TermsOfService;