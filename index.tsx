import React, { useState } from 'react';
import { Phone, Mail, MapPin, Menu, X } from 'lucide-react';

const VantoHandymanSite = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState('');
  
  const VantoLogo = ({ size = 48 }) => (
    <img 
      src="/logo.png" 
      alt="Vanto Services Group Logo" 
      style={{ width: size, height: 'auto' }}
    />
  );

  const services = [
    {
      title: "Fast fixes, zero stress",
      description: "Got leaks, squeaks, and broken bits we fix? We handle quick repairs for homes and businesses so you can get back to your day.",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&q=80"
    },
    {
      title: "Spaces refreshed your way",
      description: "Dreaming of a room refresh? We handle renovations from start to finish, making your vision a reality.",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=500&q=80"
    },
    {
      title: "Service you can trust",
      description: "We bring top-notch work and friendly service so you can relax knowing it's done right.",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&q=80"
    },
    {
      title: "Fast Concrete Repair",
      description: "Cracks, chips, or uneven slabs? We provide reliable concrete repairs that last.",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&q=80"
    },
    {
      title: "Concrete Sawing",
      description: "Precise cuts for any project. Our concrete sawing services handle structural openings, demo and more, safely and efficiently.",
      image: "https://images.unsplash.com/photo-1590673846749-e2f9f8d2e8d0?w=500&q=80"
    },
    {
      title: "Service you can trust",
      description: "Professional work, transparent pricing, and service that puts you first. We're here to help.",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&q=80"
    }
  ];

  const detailedServices = [
    {
      title: "Repairs",
      description: "Fix leaks, squeaks, and broken bits fast. We handle quick repairs for homes and businesses so you can get back to your day with hassle-free results.",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80"
    },
    {
      title: "Concrete Sawing",
      description: "Precision cuts for any project. Our concrete sawing services handle structural openings, demo safely and efficiently.",
      image: "https://images.unsplash.com/photo-1590673846749-e2f9f8d2e8d0?w=400&q=80"
    },
    {
      title: "Maintenance",
      description: "Keep things running smoothly. We offer regular maintenance so you can relax and enjoy your space.",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80"
    },
    {
      title: "Emergency",
      description: "Need urgent help? We're here for you 24/7. Fast, friendly service when you need it most.",
      image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&q=80"
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(''), 3000);
      return;
    }

    setSubmitStatus('submitting');

    try {
      const response = await fetch('https://firestore.googleapis.com/v1/projects/YOUR_PROJECT_ID/databases/(default)/documents/contact_submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            name: { stringValue: formData.name },
            email: { stringValue: formData.email },
            phone: { stringValue: formData.phone },
            message: { stringValue: formData.message },
            timestamp: { timestampValue: new Date().toISOString() },
            status: { stringValue: 'new' }
          }
        })
      });

      if (response.ok) {
        console.log('Form submitted successfully');
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        throw new Error('Submission failed');
      }
      
      setTimeout(() => setSubmitStatus(''), 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(''), 3000);
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gray-900 text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <VantoLogo size={48} />
              <div>
                <div className="text-lg font-bold">Vanto Services Group</div>
                <div className="text-xs text-gray-400">VSG</div>
              </div>
            </div>
            
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            <button 
              onClick={() => scrollToSection('contact')}
              className="hidden lg:block px-6 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-medium transition-colors"
            >
              Book
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-gray-800 text-white shadow-lg">
          <div className="px-4 py-4 space-y-3">
            <button 
              onClick={() => scrollToSection('services')} 
              className="block w-full text-left py-2 hover:text-emerald-400 transition-colors"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="block w-full text-left py-2 hover:text-emerald-400 transition-colors"
            >
              Contact
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="w-full px-6 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-medium transition-colors"
            >
              Book
            </button>
          </div>
        </div>
      )}

      <section className="bg-gray-900 text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Handyman help, hassle-free results
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Quick repairs, upgrades, and honest service. We handle home and business fixes so you can get back to your day.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-medium transition-colors shadow-lg"
                >
                  Get started
                </button>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="px-8 py-3 border-2 border-white hover:bg-white hover:text-gray-900 rounded-lg font-medium transition-colors"
                >
                  Our services
                </button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                alt="Professional handyman"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img 
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-4">Handyman help, just a call away</h2>
                <div className="flex items-center gap-2 text-gray-600 mb-6">
                  <Phone size={20} className="text-emerald-600" />
                  <a href="tel:+18081234567" className="hover:text-emerald-600 transition-colors">
                    +1 808 123 4567
                  </a>
                </div>
              </div>
              <div className="flex-shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80"
                  alt="Tools"
                  className="w-64 h-48 object-cover rounded-xl shadow-lg"
                />
              </div>
            </div>
            <button 
              onClick={() => scrollToSection('contact')}
              className="mt-6 px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
            >
              Get in touch
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Help is just a call away</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {detailedServices.map((service, index) => (
              <div key={index} className="text-center">
                <img 
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover rounded-xl mb-4 shadow-lg"
                />
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{service.description}</p>
                <a 
                  href="tel:+18081234567"
                  className="inline-block px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
                >
                  Call
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4">Get in touch today</h2>
          <p className="text-center text-gray-600 mb-12">Servicing all Vanto Services Group</p>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80"
                alt="Contact us"
                className="w-full rounded-2xl shadow-xl mb-8"
              />
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="text-emerald-600 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <div className="font-semibold mb-1">Email</div>
                    <a href="mailto:vantoservicesgroup@gmail.com" className="text-emerald-600 hover:underline break-all">
                      vantoservicesgroup@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Phone className="text-emerald-600 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <div className="font-semibold mb-1">Phone</div>
                    <a href="tel:+18081234567" className="text-emerald-600 hover:underline">
                      +1 808 123 4567
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <MapPin className="text-emerald-600 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <div className="font-semibold mb-1">Address</div>
                    <div className="text-gray-600">
                      123 Main Street<br />
                      Honolulu, HI 96813
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold mb-6">Contact Form</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First and Last name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    placeholder="(808) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Please type your issue here
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Describe your project or issue..."
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={submitStatus === 'submitting'}
                  className="w-full px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {submitStatus === 'submitting' ? 'Submitting...' : 'Submit'}
                </button>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800">
                    Thank you! We'll get back to you soon.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                    Please fill in all required fields.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-3">
              <VantoLogo size={48} />
              <div>
                <div className="text-lg font-bold">Vanto Services Group</div>
                <div className="text-xs text-gray-400">VSG</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm">© 2025 Vanto Services Group</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default VantoHandymanSite;