import PageLayout from "@/components/PageLayout";

const Privacy = () => (
  <PageLayout>
    <section className="section-padding bg-card">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto prose prose-lg">
          <h1 className="font-serif text-4xl font-bold text-primary mb-8">Privacy Policy & Disclaimer</h1>
          <h2>Privacy Policy</h2>
          <p>Your privacy is important to us. This policy outlines how we collect, use, and protect your information.</p>
          <h3>Information We Collect</h3>
          <p>We collect information you provide directly, such as when you subscribe to our newsletter or use our self-assessment tools. Assessment results are stored locally on your device only.</p>
          <h3>How We Use Your Information</h3>
          <p>We use your information to provide and improve our services, send newsletters (with your consent), and respond to inquiries.</p>
          <h2>Disclaimer</h2>
          <p><strong>Not Medical Advice:</strong> The content on this website is for informational and educational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment.</p>
          <p><strong>Self-Assessment Tools:</strong> Our tools are designed for self-reflection and are not diagnostic instruments. Results should not be used as a basis for medical decisions.</p>
          <p><strong>Crisis Support:</strong> If you are in crisis, please contact emergency services or a crisis helpline immediately.</p>
        </div>
      </div>
    </section>
  </PageLayout>
);
export default Privacy;
