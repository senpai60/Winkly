import React, { useState, useRef, useLayoutEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.faq-item', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const faqs = [
    {
      question: 'What is a Date NFT?',
      answer: 'A Date NFT is your access pass to a unique week-long dating experience. It\'s a blockchain-based token that unlocks exclusive interactions, activities, and potential rewards based on how well your date goes.'
    },
    {
      question: 'How does the reward system work?',
      answer: 'After your week-long date, both participants rate the experience. If both give positive ratings, your Date NFT increases in value and can be converted to rewards. The better the connection, the higher the rewards!'
    },
    {
      question: 'Is my data safe?',
      answer: 'Absolutely! We use blockchain technology for secure transactions and encrypted communication for all chats. Your personal data is protected with industry-leading security measures, and you have full control over what you share.'
    },
    {
      question: 'What happens if there\'s no match?',
      answer: 'If either person doesn\'t feel a connection or ratings are low, your NFT is safely returned to you. You can use it again for another date. We believe in fair play and second chances!'
    },
    {
      question: 'Can I sell my Date NFTs?',
      answer: 'Yes! After a successful date with high ratings, your NFT gains value and can be traded on our marketplace. Some users collect successful date NFTs as digital memories or trade them for profit.'
    },
    {
      question: 'How do I get started?',
      answer: 'Simply sign up, create your profile, and start swiping! Once you match with someone, you can purchase a Date NFT to begin your week-long experience. We\'ll guide you through every step of the journey.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div ref={sectionRef} className="w-full bg-gradient-to-b from-black to-zinc-950 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-zinc-400 text-lg">
            Got questions? We've got answers!
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="faq-item bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden hover:border-purple-500 transition-colors duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex justify-between items-center text-left"
              >
                <span className="text-white font-semibold text-lg pr-8">
                  {faq.question}
                </span>
                <FaChevronDown 
                  className={`text-purple-500 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  size={20}
                />
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <p className="px-6 pb-5 text-zinc-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FAQSection;