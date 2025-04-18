import Testimonial from "./(hpcomponent)/testimonial";

import DefaultLayout from '@/components/DefaultLayout/DefaultLayout';

const Home = () => {
  return (
    <DefaultLayout>
      <h1>home</h1>
      <div>
        <Testimonial />
      </div>
    </div>
    </DefaultLayout>

  );
};

export default Home;
