import DefaultLayout from '@/components/DefaultLayout/DefaultLayout';
import Featured from '@/components/Home/Featured/Featured';
import Testimonial from '@/components/Home/Testimonial/Testimonial';
import FeaturedBrandsSlider from '@/components/Home/FeaturedBrand/FeaturedBrandsSlider';
import HeroSlider from '@/components/Home/HeroSlider/HeroSlider';
import MediCard from '@/components/Home/MediCard';
import DealProduct from '@/components/Home/DealProduct';
import Newsletter from '@/components/Home/NewsLetter/Newsletter';

const Home = () => {
  return (
    <DefaultLayout>
      <HeroSlider />
      <div className="mx-auto mt-5 max-w-7xl space-y-5">
        <MediCard />
        <FeaturedBrandsSlider />
        <div className="px-12">
          <Featured />
        </div>
        <DealProduct />

        <Testimonial />

        <Newsletter />
      </div>
    </DefaultLayout>
  );
};

export default Home;
