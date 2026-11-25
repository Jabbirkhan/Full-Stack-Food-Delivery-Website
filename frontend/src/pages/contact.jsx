// Contact.jsx
import { useContext, useState } from "react";
import {
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaPaperPlane,
  FaTwitter,
} from "react-icons/fa";
import { Context } from "../context/context";
import axiosInstance from "../utils/axiosInstance.js";
import { toast } from "react-toastify";
import Loader from "../components/loader.jsx";

const Contact = () => {

  const { authState, navigate } = useContext(Context);

  const [name, setName] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [loader, setLoader] = useState(false);

  const sendContactMessage = async (e) => {
    e.preventDefault();
    try {
      if (authState !== 'authenticated') {
        return navigate('/login');
      }

      setLoader(true);
      const response = await axiosInstance.post(`/api/v1/user/send-contact-message`, { name, orderNumber, subject, message });
      if (response.data.success) {
        toast.success(response.data.message);
      }

    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoader(false);
    }
  }

  if (loader) {
    return <Loader />
  }

  const contactCards = [
    {
      icon: <FaPhone size={28} />,
      title: "Phone Number",
      info: "+92 300 1234567",
      desc: "Call us anytime for quick support.",
    },
    {
      icon: <FaEnvelope size={28} />,
      title: "Email Address",
      info: "support@gourmetdash.com",
      desc: "Send us your queries anytime.",
    },
    {
      icon: <FaMapMarkerAlt size={28} />,
      title: "Our Location",
      info: "Islamabad, Pakistan",
      desc: "Serving premium gourmet food.",
    },
  ];

  const faqs = [
    {
      question: "How can I place an order?",
      answer:
        "You can browse our menu, add gourmet items to cart, and checkout securely.",
    },
    {
      question: "Do you offer same-day delivery?",
      answer:
        "Yes, depending on your location and item availability.",
    },
    {
      question: "How do I contact support?",
      answer:
        "You can contact us via phone, email, or the contact form below.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fff8f7] overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <span className="bg-[#b52330]/10 text-[#b52330] px-5 py-2 rounded-full font-semibold">
            Contact GourmetDash
          </span>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mt-6">
            We’d Love To Hear From You
          </h1>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-6 leading-8">
            Have questions about gourmet meals, pasta, sweets,
            salads, or delivery? Our team is here to help.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contactCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-4xl p-8 shadow-md hover:shadow-2xl transition duration-300 hover:-translate-y-2"
            >
              <div className="bg-[#b52330] text-white w-16 h-16 rounded-2xl flex items-center justify-center mb-5">
                {card.icon}
              </div>

              <h3 className="text-2xl font-bold text-gray-900">
                {card.title}
              </h3>

              <p className="text-[#b52330] font-semibold mt-3">
                {card.info}
              </p>

              <p className="text-gray-600 mt-2">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto bg-white rounded-[40px] shadow-2xl overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Left */}
            <div className="bg-[#b52330] p-10 md:p-14 text-white relative">
              <h2 className="text-4xl font-bold">
                Let’s Talk
              </h2>

              <p className="mt-5 text-white/80 leading-8">
                Whether you have feedback, inquiries,
                partnerships, or order-related questions,
                GourmetDash support team is always here for you.
              </p>

              <div className="space-y-8 mt-12">
                <div className="flex gap-5 items-start">
                  <FaPhone className="mt-1" />
                  <div>
                    <h4 className="font-semibold">
                      Phone
                    </h4>
                    <p className="text-white/80">
                      +92 300 1234567
                    </p>
                  </div>
                </div>

                <div className="flex gap-5 items-start">
                  <FaEnvelope className="mt-1" />
                  <div>
                    <h4 className="font-semibold">
                      Email
                    </h4>
                    <p className="text-white/80">
                      support@gourmetdash.com
                    </p>
                  </div>
                </div>

                <div className="flex gap-5 items-start">
                  <FaClock className="mt-1" />
                  <div>
                    <h4 className="font-semibold">
                      Working Hours
                    </h4>
                    <p className="text-white/80">
                      Mon - Sun : 9AM - 11PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="flex gap-4 mt-12">
                <button className="bg-white/20 p-4 rounded-full hover:bg-white hover:text-[#b52330] transition">
                  <FaFacebookF />
                </button>

                <button className="bg-white/20 p-4 rounded-full hover:bg-white hover:text-[#b52330] transition">
                  <FaInstagram />
                </button>

                <button className="bg-white/20 p-4 rounded-full hover:bg-white hover:text-[#b52330] transition">
                  <FaTwitter />
                </button>
              </div>
            </div>

            {/* Right Form */}
            <div className="p-10 md:p-14">
              <h2 className="text-4xl font-bold text-gray-900">
                Send Message
              </h2>

              <form onSubmit={sendContactMessage} className="space-y-6 mt-10">
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="Your Name"
                    onChange={(e) => setName(e.target.value)} value={name}
                    className="w-full bg-[#fff8f7] rounded-2xl px-5 py-4 outline-none border-2 border-transparent focus:border-[#b52330]"
                  />
                </div>

                <div className="w-full">
                  <input
                    type="text"
                    onChange={(e) => setOrderNumber(e.target.value)} value={orderNumber}
                    placeholder="e.g. ORD-10025 (Optional) (If your message is regarding an order)"
                    className="w-full bg-[#fff8f7] rounded-2xl px-5 py-4 outline-none border-2 border-transparent focus:border-[#b52330]"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Subject"
                  onChange={(e) => setSubject(e.target.value)} value={subject}
                  className="w-full bg-[#fff8f7] rounded-2xl px-5 py-4 outline-none border-2 border-transparent focus:border-[#b52330]"
                />

                <textarea
                  rows="6"
                  placeholder="Write your message..."
                  onChange={(e) => setMessage(e.target.value)} value={message}
                  className="w-full bg-[#fff8f7] rounded-2xl px-5 py-4 outline-none border-2 border-transparent focus:border-[#b52330] resize-none"
                />

                <button
                  type="submit"
                  className="bg-[#b52330] hover:scale-105 transition duration-300 text-white px-8 py-4 rounded-full flex items-center gap-3 shadow-lg"
                >
                  Send Message
                  <FaPaperPlane size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto rounded-[40px] overflow-hidden shadow-xl">
          {/* <iframe
            title="map"
            src="https://www.google.com/maps/@31.506432,74.3211008,10z?entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D"
            className="w-full h-112.5 border-0"
            loading="lazy"
          /> */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d425289.99053323205!2d72.75643905071773!3d33.61625093699601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbfd07891722f%3A0x6059515c3bdb02b6!2sIslamabad%2C%20Pakistan!5e0!3m2!1sen!2s!4v1780141496324!5m2!1sen!2s"
            className="w-full h-112.5 border-0"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>

            <p className="text-gray-600 mt-4">
              Everything you need to know about GourmetDash.
            </p>
          </div>

          <div className="space-y-5">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-[28px] shadow-md p-7"
              >
                <h3 className="font-bold text-lg text-gray-900">
                  {faq.question}
                </h3>

                <p className="text-gray-600 mt-3 leading-7">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto bg-[#b52330] rounded-[40px] p-10 md:p-16 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold">
            Stay Updated With GourmetDash
          </h2>

          <p className="text-white/80 mt-5 max-w-2xl mx-auto leading-8">
            Get updates on premium dishes, gourmet sweets,
            exclusive offers, and fresh arrivals.
          </p>

          <div className="max-w-2xl mx-auto mt-10 flex flex-col md:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-5 rounded-full outline-none bg-white text-gray-900"
            />

            <button className="bg-white text-[#b52330] font-semibold px-8 py-5 rounded-full hover:scale-105 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;