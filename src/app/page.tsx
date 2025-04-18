import DefaultLayout from '@/components/DefaultLayout/DefaultLayout';
import Featured from '@/components/Home/Featured/Featured';
import Testimonial from '@/components/Home/Testimonial/Testimonial';

const Home = () => {
  return (
    <DefaultLayout>
      <Featured />
      <Testimonial />
    </DefaultLayout>
  );
};

export default Home;
