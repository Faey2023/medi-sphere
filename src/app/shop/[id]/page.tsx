import MedicineDetails from '@/components/Medicine/MedicineDetails';

interface MedicineDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function MedicineDetailsPage({
  params,
}: MedicineDetailsPageProps) {
  const { id } = params;
  console.log(id);

  return (
    <div>
      <MedicineDetails id={id}></MedicineDetails>
    </div>
  );
}
