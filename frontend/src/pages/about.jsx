// About.jsx

import React from "react";

import {
  FaAward,
  FaUtensils,
  FaClock,
  FaHandshake,
  FaShoppingBag,
  FaStar,
  FaTruck,
  FaUsers,
} from "react-icons/fa";

const About = () => {
  const features = [
    {
      icon: <FaUtensils size={28} />,
      title: "Premium Gourmet Foods",
      desc: "Fresh salads, creamy pasta, delicious sweets, noodles, and gourmet dishes crafted with quality ingredients.",
    },
    {
      icon: <FaTruck size={28} />,
      title: "Fast Delivery",
      desc: "Lightning-fast delivery to your doorstep while keeping freshness and taste intact.",
    },
    {
      icon: <FaHandshake size={28} />,
      title: "Trusted Quality",
      desc: "Every meal is selected carefully to maintain premium taste and exceptional quality.",
    },
    {
      icon: <FaShoppingBag size={28} />,
      title: "Easy Shopping",
      desc: "Simple ordering experience with smooth browsing and secure checkout.",
    },
  ];

  const stats = [
    { number: "15K+", title: "Happy Customers" },
    { number: "120+", title: "Gourmet Dishes" },
    { number: "99%", title: "Customer Satisfaction" },
    { number: "24/7", title: "Customer Support" },
  ];

  const testimonials = [
    {
      name: "Sarah Williams",
      review:
        "The pasta and gourmet desserts are absolutely amazing. Premium quality and fast delivery.",
    },
    {
      name: "Michael Smith",
      review:
        "Beautiful food presentation and great taste. GourmetDash feels premium.",
    },
    {
      name: "Emma Watson",
      review:
        "Fresh salads and sweets delivered quickly. Highly recommended.",
    },
  ];

  const faqs = [
    {
      q: "What type of food does GourmetDash offer?",
      a: "We provide premium gourmet dishes including salads, pasta, noodles, sweets, desserts, and more.",
    },
    {
      q: "How fast is delivery?",
      a: "We aim to deliver your gourmet items quickly while maintaining freshness and quality.",
    },
    {
      q: "Do you provide customer support?",
      a: "Yes, our support team is available to assist you whenever needed.",
    },
  ];

  return (
    <div className="bg-[#fff8f7] min-h-screen text-gray-800 overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="bg-[#b52330]/10 text-[#b52330] px-4 py-2 rounded-full text-sm font-semibold">
              Premium Gourmet Experience
            </span>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight mt-6">
              Bringing Luxury Taste To Your{" "}
              <span className="text-[#b52330]">Dining Experience</span>
            </h1>

            <p className="text-gray-600 text-lg mt-6 leading-8">
              GourmetDash offers premium salads, noodles, sweets, pasta,
              desserts, and gourmet dishes crafted with quality and delivered
              fresh to your doorstep.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <button className="bg-[#b52330] text-white px-8 py-4 rounded-full hover:scale-105 transition duration-300 shadow-lg">
                Explore Menu
              </button>

              <button className="border-2 border-[#b52330] text-[#b52330] px-8 py-4 rounded-full hover:bg-[#b52330] hover:text-white transition duration-300">
                Learn More
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-linear-to-br from-[#b52330] to-red-900 rounded-[40px] p-10 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1547592180-85f173990554"
                alt="Food"
                className="rounded-[30px] h-125 w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto bg-white rounded-[40px] shadow-xl p-10 md:p-16">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <img
              src="https://images.unsplash.com/photo-1551218808-94e220e084d2"
              alt="story"
              className="rounded-[30px] h-125 object-cover w-full"
            />

            <div>
              <h2 className="text-4xl font-bold mb-6">
                Our Gourmet Story
              </h2>

              <p className="text-gray-600 leading-8">
                At GourmetDash, we believe premium food should be accessible,
                elegant, and unforgettable. We carefully curate gourmet meals,
                desserts, salads, and pasta that combine luxury with freshness.
              </p>

              <div className="grid grid-cols-2 gap-6 mt-10">
                <div className="bg-[#fff8f7] p-5 rounded-3xl">
                  <FaAward className="text-[#b52330] mb-3" />
                  <h4 className="font-bold">Premium Quality</h4>
                </div>

                <div className="bg-[#fff8f7] p-5 rounded-3xl">
                  <FaClock className="text-[#b52330] mb-3" />
                  <h4 className="font-bold">Fast Delivery</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold">
            Why Choose GourmetDash
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">
            {features.map((item, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-[30px] hover:-translate-y-3 transition duration-300 shadow-md hover:shadow-2xl"
              >
                <div className="bg-[#b52330] text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  {item.icon}
                </div>

                <h3 className="font-bold text-xl mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-[#b52330] text-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center px-6">
          {stats.map((item, index) => (
            <div key={index}>
              <h2 className="text-5xl font-bold">
                {item.number}
              </h2>
              <p className="mt-2 text-lg">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold">
            What Customers Say
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-14">
            {testimonials.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-[30px] p-8 shadow-lg"
              >
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className="fill-[#b52330] text-[#b52330]"
                    />
                  ))}
                </div>

                <p className="text-gray-600">
                  "{item.review}"
                </p>

                <h4 className="font-bold mt-6">
                  {item.name}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-5">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-3xl shadow-md"
              >
                <h3 className="font-bold text-lg mb-2">
                  {faq.q}
                </h3>
                <p className="text-gray-600">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;