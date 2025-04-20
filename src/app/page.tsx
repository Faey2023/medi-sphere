import DefaultLayout from '@/components/DefaultLayout/DefaultLayout';
import Featured from '@/components/Home/Featured/Featured';
import Testimonial from '@/components/Home/Testimonial/Testimonial';
import FeaturedBrandsSlider from '@/components/Home/FeaturedBrand/FeaturedBrandsSlider';

const Home = () => {
  return (
    <DefaultLayout>
      <Featured />
      <FeaturedBrandsSlider />
      <Testimonial />
    </DefaultLayout>
  );
};

export default Home;
