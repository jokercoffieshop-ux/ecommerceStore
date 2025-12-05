import { useState } from 'react';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'استفسار',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // محاكاة إرسال النموذج
    setTimeout(() => {
      setStatus({
        type: 'success',
        message: 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً 🎉'
      });
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        type: 'استفسار',
        subject: '',
        message: ''
      });
      
      setTimeout(() => setStatus({ type: '', message: '' }), 5000);
    }, 1500);
  };

  return (
    <div style={{ 
      fontFamily: 'Cairo, sans-serif',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8f5f0 0%, #fff 100%)',
      padding: '2rem 1rem'
    }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #654321 0%, #8B4513 40%, #A0522D 100%)',
        color: 'white',
        padding: '6rem 2rem',
        textAlign: 'center',
        borderRadius: '24px',
        marginBottom: '4rem',
        boxShadow: '0 20px 60px rgba(101, 67, 33, 0.4)',
        position: 'relative',
        overflow: 'hidden',
        maxWidth: '1400px',
        margin: '0 auto 4rem'
      }}>
        <div style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.15) 0%, transparent 50%)',
          animation: 'float 8s ease-in-out infinite'
        }} />
        
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ marginBottom: '2rem', fontSize: '5rem' }}>📞</div>
          <h1 style={{
            fontSize: '3.5rem',
            marginBottom: '1rem',
            fontWeight: 900,
            textShadow: '4px 4px 8px rgba(0, 0, 0, 0.5)'
          }}>
            اتصل بنا
          </h1>
          <p style={{
            fontSize: '1.5rem',
            opacity: 0.95,
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
          }}>
            نحن هنا للإجابة على جميع استفساراتك وشكاويك
          </p>
        </div>
      </div>

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2rem',
        marginBottom: '4rem'
      }}>
        {/* معلومات الاتصال */}
        {[
          { icon: '📱', title: 'الهاتف', content: ['+20 123 456 7890', '+20 100 111 2222'] },
          { icon: '📧', title: 'البريد الإلكتروني', content: ['info@binturki.com', 'support@binturki.com'] },
          { icon: '📍', title: 'العنوان', content: ['القاهرة، مصر', 'شارع النيل، الدقي'] }
        ].map((item, idx) => (
          <ContactCard key={idx} {...item} />
        ))}
      </div>

      {/* نموذج الاتصال */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        background: 'white',
        padding: '3rem',
        borderRadius: '24px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          color: '#654321',
          marginBottom: '2rem',
          textAlign: 'center',
          fontWeight: 900
        }}>
          أرسل لنا رسالة
        </h2>

        {status.message && (
          <div style={{
            padding: '1.2rem',
            borderRadius: '12px',
            marginBottom: '2rem',
            background: status.type === 'success' ? 
              'linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)' : 
              'linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%)',
            color: status.type === 'success' ? '#155724' : '#721c24',
            border: `2px solid ${status.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
            fontSize: '1.1rem',
            fontWeight: 600,
            textAlign: 'center'
          }}>
            {status.message}
          </div>
        )}

        <div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '1.5rem'
          }}>
            <InputField 
              label="الاسم *"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <InputField 
              label="البريد الإلكتروني *"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              ltr
            />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '1.5rem'
          }}>
            <InputField 
              label="رقم الهاتف"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              ltr
            />

            <SelectField 
              label="نوع الرسالة *"
              name="type"
              value={formData.type}
              onChange={handleChange}
              options={[
                { value: 'استفسار', label: 'استفسار عام' },
                { value: 'شكوى', label: 'شكوى' },
                { value: 'اقتراح', label: 'اقتراح' },
                { value: 'طلب', label: 'استفسار عن طلب' },
                { value: 'منتج', label: 'استفسار عن منتج' }
              ]}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <InputField 
              label="الموضوع *"
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#654321',
              fontWeight: 700,
              fontSize: '1.1rem'
            }}>
              الرسالة *
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="6"
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '12px',
                border: '2px solid #e0e0e0',
                fontSize: '1rem',
                fontFamily: 'Cairo, sans-serif',
                transition: 'all 0.3s ease',
                boxSizing: 'border-box',
                resize: 'vertical'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#8B4513';
                e.target.style.boxShadow = '0 0 0 4px rgba(139, 69, 19, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e0e0e0';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '1.3rem',
              background: isSubmitting ? 
                'linear-gradient(135deg, #bdc3c7 0%, #95a5a6 100%)' :
                'linear-gradient(135deg, #654321 0%, #8B4513 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1.3rem',
              fontWeight: 800,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              transition: 'all 0.4s ease',
              fontFamily: 'Cairo, sans-serif',
              boxShadow: '0 8px 20px rgba(101, 67, 33, 0.3)'
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 12px 30px rgba(101, 67, 33, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 8px 20px rgba(101, 67, 33, 0.3)';
            }}
          >
            {isSubmitting ? '⏳ جاري الإرسال...' : '📤 إرسال الرسالة'}
          </button>
        </div>
      </div>

      {/* أوقات العمل */}
      <div style={{
        maxWidth: '900px',
        margin: '4rem auto 0',
        background: 'linear-gradient(135deg, #654321 0%, #8B4513 100%)',
        padding: '3rem 2rem',
        borderRadius: '24px',
        boxShadow: '0 15px 45px rgba(101, 67, 33, 0.3)',
        textAlign: 'center',
        color: 'white'
      }}>
        <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>⏰</div>
        <h2 style={{
          fontSize: '2.5rem',
          marginBottom: '2rem',
          fontWeight: 900,
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
        }}>
          أوقات العمل
        </h2>
        <div style={{ fontSize: '1.3rem', lineHeight: 2 }}>
          <p>السبت - الخميس: 9:00 صباحاً - 10:00 مساءً</p>
          <p>الجمعة: 2:00 مساءً - 10:00 مساءً</p>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap');
        
        @keyframes float {
          0%, 100% { 
            transform: translate(0, 0) scale(1); 
            opacity: 0.6;
          }
          50% { 
            transform: translate(30px, -30px) scale(1.1); 
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

function ContactCard({ icon, title, content }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      style={{
        background: 'linear-gradient(135deg, #fff 0%, #f8f5f0 100%)',
        padding: '3rem 2rem',
        borderRadius: '20px',
        boxShadow: isHovered ? '0 15px 45px rgba(111, 78, 55, 0.2)' : '0 8px 25px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.4s ease',
        border: `2px solid ${isHovered ? 'rgba(111, 78, 55, 0.2)' : 'transparent'}`,
        transform: isHovered ? 'translateY(-10px)' : 'translateY(0)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>{icon}</div>
      <h3 style={{
        fontSize: '1.8rem',
        color: '#654321',
        marginBottom: '1rem',
        fontWeight: 800,
        textAlign: 'center'
      }}>
        {title}
      </h3>
      {content.map((text, idx) => (
        <p key={idx} style={{
          fontSize: '1.2rem',
          color: '#666',
          textAlign: 'center',
          direction: title === 'الهاتف' || title === 'البريد الإلكتروني' ? 'ltr' : 'rtl',
          marginTop: idx > 0 ? '0.5rem' : 0
        }}>
          {text}
        </p>
      ))}
    </div>
  );
}

function InputField({ label, type, name, value, onChange, required, ltr }) {
  return (
    <div>
      <label style={{
        display: 'block',
        marginBottom: '0.5rem',
        color: '#654321',
        fontWeight: 700,
        fontSize: '1.1rem'
      }}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        style={{
          width: '100%',
          padding: '1rem',
          borderRadius: '12px',
          border: '2px solid #e0e0e0',
          fontSize: '1rem',
          fontFamily: 'Cairo, sans-serif',
          transition: 'all 0.3s ease',
          boxSizing: 'border-box',
          direction: ltr ? 'ltr' : 'rtl',
          textAlign: ltr ? 'right' : 'right'
        }}
        onFocus={(e) => {
          e.target.style.borderColor = '#8B4513';
          e.target.style.boxShadow = '0 0 0 4px rgba(139, 69, 19, 0.1)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '#e0e0e0';
          e.target.style.boxShadow = 'none';
        }}
      />
    </div>
  );
}

function SelectField({ label, name, value, onChange, options }) {
  return (
    <div>
      <label style={{
        display: 'block',
        marginBottom: '0.5rem',
        color: '#654321',
        fontWeight: 700,
        fontSize: '1.1rem'
      }}>
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required
        style={{
          width: '100%',
          padding: '1rem',
          borderRadius: '12px',
          border: '2px solid #e0e0e0',
          fontSize: '1rem',
          fontFamily: 'Cairo, sans-serif',
          transition: 'all 0.3s ease',
          boxSizing: 'border-box',
          cursor: 'pointer',
          background: 'white'
        }}
        onFocus={(e) => {
          e.target.style.borderColor = '#8B4513';
          e.target.style.boxShadow = '0 0 0 4px rgba(139, 69, 19, 0.1)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '#e0e0e0';
          e.target.style.boxShadow = 'none';
        }}
      >
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}