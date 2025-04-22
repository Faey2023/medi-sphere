import DefaultLayout from '@/components/DefaultLayout/DefaultLayout';

const About = () => {
  return (
    <DefaultLayout>
      <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-md">
          <h1 className="mb-6 text-3xl font-bold text-teal-700">
            About Medi Sphere
          </h1>

          <p className="mb-4 text-gray-700">
            At <span className="font-semibold text-teal-600">Medi Sphere</span>,
            we are committed to revolutionizing healthcare by making trusted
            medicines and wellness products accessible to everyone, everywhere.
          </p>

          <p className="mb-4 text-gray-700">
            Founded with a vision to simplify the way people manage their
            health, Medi Sphere offers a seamless online experience where users
            can order genuine medicines, consult experts, and access reliable
            healthcare content—all from the comfort of their home.
          </p>

          <p className="mb-4 text-gray-700">
            Whether it&apos;s chronic condition management, daily wellness, or
            urgent prescriptions, we strive to serve with speed, safety, and
            sincerity. Our mission is to build a healthier tomorrow by
            empowering individuals with the right healthcare tools today.
          </p>

          <h2 className="mt-8 mb-4 text-2xl font-semibold text-teal-700">
            Why Choose Us?
          </h2>
          <ul className="list-inside list-disc space-y-2 text-gray-700">
            <li>Certified and authentic medicines</li>
            <li>Fast and secure delivery</li>
            <li>Expert pharmacist and doctor consultations</li>
            <li>Easy-to-use and mobile-friendly platform</li>
            <li>24/7 customer support</li>
          </ul>

          <h2 className="mt-8 mb-4 text-2xl font-semibold text-teal-700">
            Our Vision
          </h2>
          <p className="text-gray-700">
            To become the most trusted digital pharmacy brand, bringing
            affordable healthcare to every doorstep across the nation and
            beyond.
          </p>

          <div className="mt-10 text-sm text-gray-500">
            <p>📍 Head Office: 123 Wellness Road, Dhaka, Bangladesh</p>
            <p>📞 Helpline: +880 123 456 789</p>
            <p>📧 Email: care@medisphere.com</p>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default About;
